import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
manager_interface_path = os.path.join(cwd, "../interfaces/")
sys.path.append(manager_interface_path)

import bcrypt
from connection import connect_decorator
from ManagerInterface import ManagerInterface


@connect_decorator
def manager_login(account, password):
    """
    管理員登入
    """

    try:
        manager = ManagerInterface.read_manager_by_account(account)
        if manager == None:
            raise Exception("帳號錯誤")

        hashed_password = manager["password"]
        if bcrypt.checkpw(password.encode(), hashed_password.encode()) == False:
            raise Exception("密碼錯誤")

        ManagerInterface.update_manager_login(account=account, login=True)
        return True, "登入成功"

    except Exception as e:
        return False, f"登入失敗：{e}"


@connect_decorator
def manager_logout(account):
    """
    管理員登出
    """

    try:
        connect_to_db()
        ManagerInterface.update_manager_login(account=account, login=False)
        return True, "登出成功"
    except Exception as e:
        return False, f"登出失敗：{e}"
