import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
interface_path = os.path.join(cwd, "../interfaces/")
sys.path.append(interface_path)

import bcrypt
from GuardInterface import GuardInterface as GI


def check_password(account: str, password: str):
    guard = GI.read_guard_by_account(account)

    if guard == None:
        return False, f"帳號 {account} 不存在"

    hashed_password = guard["password"]
    if bcrypt.checkpw(password.encode(), hashed_password.encode()) == False:
        return False, "密碼錯誤"
    else:
        return True, "登入成功"
