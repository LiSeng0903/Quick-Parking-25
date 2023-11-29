import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))

schema_path = os.path.join(cwd, "../")
sys.path.append(schema_path)

from schema import Manager


class ManagerInterface:
    # Create
    @staticmethod
    def create_manager(manager):
        """
        建立新的管理員資料。
        注意本函數不會加密密碼，manager["password"] 中的資料請先自己加密完畢！！！

        Args:
            manager (dict): 管理員資料，格式為
                {
                    "account": str,
                    "password": str,
                    "name": str
                }
        Returns:
            bool: 是否成功
            str: 回傳訊息
        """

        try:
            new_manager = Manager(
                account=manager["account"],
                password=manager["password"],
                name=manager["name"],
                login=False,
            )

            new_manager.save()
            return True, "Create Manager Succes"
        except Exception as e:
            return False, f"Create Manager Fail: {e}"

    # Read
    @staticmethod
    def read_manager_by_account(account):
        manager_mongo_object = Manager.objects(account=account).first()
        if manager_mongo_object == None:
            return None

        manager = manager_mongo_object.to_mongo().to_dict()
        manager.pop("_id", None)

        return manager

    # Update
    @staticmethod
    def update_manager_info(new_manager):
        try:
            manager = Manager.objects(account=new_manager["account"]).first()
            if manager == None:
                raise Exception(f"{new_manager['account']} 帳號不存在")

            manager.password = new_manager["password"]
            manager.name = new_manager["name"]
            manager.save()

            return True, "Update Manager Succes"
        except Exception as e:
            return False, f"Update Manager Fail: {e}"

    def update_manager_login(account, login):
        try:
            manager = Manager.objects(account=account).first()
            if manager == None:
                raise Exception(f"{account} 帳號不存在")

            manager.login = login
            manager.save()

            return True, "Update Manager Succes"
        except Exception as e:
            return False, f"Update Manager Fail: {e}"

    # Delete
    def delete_manager(account):
        try:
            manager = Manager.objects(account=account).get()
            manager.delete()
            return True, "Delete Manager Succes"
        except Exception as e:
            return False, f"Delete Manager Fail: {e}"
