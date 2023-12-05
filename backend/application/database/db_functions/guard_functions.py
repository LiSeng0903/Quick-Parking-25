import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
interface_path = os.path.join(cwd, "../interfaces/")
sys.path.append(interface_path)

import bcrypt
from connection import connect_decorator
from GuardInterface import GuardInterface as GI


@connect_decorator
def guard_login(account, password):
    """
    管理員登入
    """

    try:
        guard = GI.read_guard_by_account(account)
        if guard == None:
            raise Exception("帳號錯誤")

        hashed_password = guard["password"]
        if bcrypt.checkpw(password.encode(), hashed_password.encode()) == False:
            raise Exception("密碼錯誤")

        GI.update_guard_login(account=account, login=True)
        return True, "登入成功"

    except Exception as e:
        return False, f"登入失敗：{e}"


@connect_decorator
def guard_logout(account):
    """
    管理員登出
    """

    try:
        GI.update_guard_login(account=account, login=False)
        return True, "登出成功"
    except Exception as e:
        return False, f"登出失敗：{e}"
