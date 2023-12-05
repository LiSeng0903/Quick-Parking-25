import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))

schema_path = os.path.join(cwd, "../")
sys.path.append(schema_path)

from schema import Guard


class GuardInterface:
    # Create
    @staticmethod
    def create_guard(guard):
        """
        建立新的警衛資料。
        注意本函數不會加密密碼，guard["password"] 中的資料請先自己加密完畢！！！

        Args:
            guard (dict): 管理員資料，格式為
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
            new_guard = Guard(
                account=guard["account"],
                password=guard["password"],
                name=guard["name"],
                login=False,
            )

            new_guard.save()
            return True, "Create Guard Succes"
        except Exception as e:
            return False, f"Create Guard Fail: {e}"

    # Read
    @staticmethod
    def read_guard_by_account(account):
        guard_mongo_object = Guard.objects(account=account).first()
        if guard_mongo_object == None:
            return None

        guard = guard_mongo_object.to_mongo().to_dict()
        guard.pop("_id", None)

        return guard

    # Update
    @staticmethod
    def update_guard_info(new_guard):
        try:
            guard = Guard.objects(account=new_guard["account"]).first()
            if guard == None:
                raise Exception(f"{new_guard['account']} 帳號不存在")

            guard.password = new_guard["password"]
            guard.name = new_guard["name"]
            guard.save()

            return True, "Update Guard Succes"
        except Exception as e:
            return False, f"Update Guard Fail: {e}"

    def update_guard_login(account, login):
        try:
            guard = Guard.objects(account=account).first()
            if guard == None:
                raise Exception(f"{account} 帳號不存在")

            guard.login = login
            guard.save()

            return True, "Update Guard Succes"
        except Exception as e:
            return False, f"Update Guard Fail: {e}"

    # Delete
    def delete_guard(account):
        try:
            guard = guard.objects(account=account).get()
            guard.delete()
            return True, "Delete Guard Succes"
        except Exception as e:
            return False, f"Delete Guard Fail: {e}"
