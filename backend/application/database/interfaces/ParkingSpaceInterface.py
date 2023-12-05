import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))

schema_path = os.path.join(cwd, "../")
sys.path.append(schema_path)

from schema import History, ParkingSpace


class ParkingSpaceInterface:
    # Create
    @staticmethod
    def create_ps(parking_space: dict):
        """
        建立停車格資料。預設
        1. occupied = False
        2. current_car_id = None
        3. status = "OK"

        Args:
            parking_space (dict): 停車格資料，內容為 {
                "space_id": str,
                "space_type": "car" || "motor" || "priority",
                "floor": int,
                "zone": "A" || "B" || "C" || "D" || "E",
            }
        Returns:
            bool: 是否成功
            str: 成功、失敗訊息
        """

        try:
            new_parking_space = ParkingSpace(
                space_id=parking_space["space_id"],
                occupied=False,
                current_car_id=None,
                space_type=parking_space["space_type"],
                floor=parking_space["floor"],
                status="OK",
                zone=parking_space["zone"],
                history=[],
            )

            new_parking_space.save()
            return True, "Create parking space Success"
        except Exception as e:
            return False, f"Create parking space failed: {e}"

    # Read
    def read_ps_by_space_id(space_id: str):
        """
        讀取停車格 space_id 的資料

        Args:
            space_id (str): 停車格編號
        Returns:
            dict: 停車格資料，內容與 schema 規範的相同。如果沒有找到的話會回傳 None
        """

        ps_mongo_object = ParkingSpace.objects(space_id=space_id).first()

        if ps_mongo_object == None:
            return None

        ps_dict = ps_mongo_object.to_mongo().to_dict()
        ps_dict.pop("_id", None)

        return ps_dict

    def read_ps_by_current_car_id(car_id: str):
        """
        讀取車牌號碼為 car_id 的車子的停車格資料

        Args:
            car_id (str): 車牌號碼
        Returns:
            dict: 停車格資料，內容與 schema 規範的相同。如果沒有找到的話會回傳 None。
        """

        ps_mongo_object = ParkingSpace.objects(current_car_id=car_id).first()

        if ps_mongo_object == None:
            return None

        ps_dict = ps_mongo_object.to_mongo().to_dict()
        ps_dict.pop("_id", None)

        return ps_dict

    def read_ps_by_floor(floor: int):
        """
        讀取某一層樓的所有停車格資料

        Args:
            floor (int): 樓層
        Returns:
            list[dict]: 某一層樓的所有停車格資料的 list，每個停車格資料是一個 dict，內容與 schema 規範的相同。如果沒有找到的話會回傳 []
        """

        ps_mongo_objects = ParkingSpace.objects(floor=floor)
        ps_dicts = [ps.to_mongo().to_dict() for ps in ps_mongo_objects]

        for ps_dict in ps_dicts:
            ps_dict.pop("_id", None)

        return ps_dicts

    def read_all_ps():
        """
        讀取所有停車格的資料

        Args:
            None
        Returns:
            list: 所有停車格資料的 list，每個停車格資料是一個 dict，內容與 schema 規範的相同
        """

        ps_mongo_objects = ParkingSpace.objects.all()
        ps_dicts = [ps.to_mongo().to_dict() for ps in ps_mongo_objects]

        for ps_dict in ps_dicts:
            ps_dict.pop("_id", None)

        return ps_dicts

    def read_ps_history(space_id: str):
        ps = ParkingSpaceInterface.read_ps_by_space_id(space_id)

        if ps == None:
            return []

        return ps["history"]

    # Update
    def update_ps_type(space_id: str, space_type: str):
        """
        更新停車格 space_id 種類
        """

        try:
            ps = ParkingSpace.objects(space_id=space_id).first()
            if ps == None:
                raise Exception(f"{space_id} 停車格不存在")

            ps.space_type = space_type
            ps.save()
            return True, "Update parking space type success"
        except Exception as e:
            return False, f"Update parking space type failed: {e}"

    def update_ps_floor(space_id: str, floor: int):
        """
        更新停車格 space_id 樓層
        """

        try:
            ps = ParkingSpace.objects(space_id=space_id).first()
            if ps == None:
                raise Exception(f"{space_id} 停車格不存在")

            ps.floor = floor
            ps.save()
            return True, "Update parking space floor success"
        except Exception as e:
            return False, f"Update parking space floor failed: {e}"

    def update_ps_zone(space_id: str, zone: str):
        """
        更新停車格 space_id 區域
        """

        try:
            ps = ParkingSpace.objects(space_id=space_id).first()
            if ps == None:
                raise Exception(f"{space_id} 停車格不存在")

            ps.zone = zone
            ps.save()
            return True, "Update parking space zone success"
        except Exception as e:
            return False, f"Update parking space zone failed: {e}"

    def update_ps_occupied(space_id: str, occupied: bool):
        """
        更新停車格 space_id 是否被佔據
        """

        try:
            ps = ParkingSpace.objects(space_id=space_id).first()
            if ps == None:
                raise Exception(f"{space_id} 停車格不存在")

            ps.occupied = occupied
            ps.save()
            return True, "Update parking space occupied success"
        except Exception as e:
            return False, f"Update parking space occupied failed: {e}"

    def update_ps_current_car_id(space_id: str, current_car_id: str):
        """
        更新停車格 space_id 目前停的車車牌
        """

        try:
            ps = ParkingSpace.objects(space_id=space_id).first()
            if ps == None:
                raise Exception(f"{space_id} 停車格不存在")

            ps.current_car_id = current_car_id
            ps.save()
            return True, "Update parking space current_car_id success"
        except Exception as e:
            return False, f"Update parking space current_car_id failed: {e}"

    def update_ps_status(space_id: str, status: str):
        """
        更新停車格 space_id 的狀態
        """

        try:
            ps = ParkingSpace.objects(space_id=space_id).first()
            if ps == None:
                raise Exception(f"{space_id} 停車格不存在")

            ps.status = status
            ps.save()
            return True, "Update parking space status success"
        except Exception as e:
            return False, f"Update parking space status failed: {e}"

    def update_ps_history(space_id: str, new_histories: list):
        """
        更新停車格 space_id 的歷史紀錄
        """

        new_histories = [
            History(
                start_time=his["start_time"],
                end_time=his["end_time"],
                car_id=his["car_id"],
            )
            for his in new_histories
        ]

        try:
            ps = ParkingSpace.objects(space_id=space_id).first()
            if ps == None:
                raise Exception(f"{space_id} 停車格不存在")

            ps.history = new_histories
            ps.save()
            return True, "Update parking space history success"
        except Exception as e:
            return False, f"Update parking space history failed: {e}"

    # Delete
    def delete_ps(space_id):
        """
        刪除停車格 space_id
        """

        try:
            ps = ParkingSpace.objects(space_id=space_id).first()
            if ps == None:
                raise Exception(f"{space_id} 停車格不存在")

            ps.delete()
            return True, "Delete parking space success"
        except Exception as e:
            return False, f"Delete parking space failed: {e}"
