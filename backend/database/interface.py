import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))

schema_path = cwd
sys.path.append(schema_path)

config_path = os.path.join(cwd, "../config")
sys.path.append(config_path)

import mongoengine
from config import Config
from schema import History, Message, ParkingSpace


class ParkingSpaceInterface:
    @staticmethod
    def connect_to_db():
        mongoengine.connect(Config.DB_NAME, host=Config.DB_URL)

    # Create
    @staticmethod
    def create_empty_ps(floor, type, zone):
        """
        產生新的停車格資料

        Args:
            floor (int): 樓層
            type (str): 停車格種類，有三種：car, motor, disabled
            zone (str): 停車格區域，有三種：A, B, C
        Returns:
            bool: 是否成功
        """

        try:
            # 看看目前該層樓有多少個停車位
            floor_ps_cnt = len(ParkingSpaceInterface.read_ps_by_floor(floor))

            # 產生停車位資料
            parking_space = ParkingSpace(
                space_id=str(floor) + str(floor_ps_cnt + 1).zfill(3),
                occupied=False,
                current_car_id=None,
                type=type,
                floor=floor,
                status="OK",
                history=[],
                zone=zone,
            )

            parking_space.save()
            return True

        except Exception as e:
            print(e)
            return False

    # Read
    @staticmethod
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

    @staticmethod
    def read_ps_by_car_id(car_id: str):
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

    @staticmethod
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

    @staticmethod
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

    # Update
    @staticmethod
    def update_car_park(space_id, car_id, start_time):
        """
        更新停車格資料。車子停入停車格時，設定相關的資料。
        包含
        1. 新增一筆正在進行中的停車紀錄（沒有結束時間）
        2. 將停車格的 occupied 設為 True

        Args:
            space_id (str): 停車格編號
            license_plate_number (str): 車牌號碼
            start_time (datetime): 車子停入停車格的時間
        Returns:
            None
        Exceptions:
            Exception: space_id 停車格不存在
            Exception: space_id 停車格正在使用中
        """

        # 取得停車格
        parking_space = ParkingSpace.objects(space_id=space_id).first()

        # 檢查不該停的狀況
        # 停車格不存在
        if parking_space == None:
            raise Exception(f"{space_id} 停車格不存在")
        # 停車格正在使用中
        if parking_space.occupied == True:
            raise Exception(f"{space_id} 正在使用中")
        # TODO: 檢查開始時間是否在上一筆資料之後

        # 新增進行中的停車紀錄
        new_history = History(
            start_time=start_time,
            end_time=None,
            car_id=car_id,
        )
        parking_space.history.append(new_history)
        parking_space.occupied = True
        parking_space.current_car_id = car_id

        parking_space.save()

    @staticmethod
    def update_car_leave(space_id, end_time):
        """
        更新停車格資料。車子離開停車格時，設定相關的資料。
        包含
        1. 更新正在進行中的停車紀錄（新增結束時間）
        2. 將停車格的 occupied 設為 False

        Args:
            space_id (str): 停車格編號
            end_time (datetime): 車子離開停車格的時間
        Returns:
            None
        Exceptions:
            Exception: space_id 停車格不存在
            Exception: space_id 並非使用中
            Exception: 結束時間比開始時間早
        """

        # 取得停車格
        parking_space = ParkingSpace.objects(space_id=space_id).first()

        # 檢查不該使車子離開的狀況
        if parking_space == None:
            raise Exception(f"{space_id} 停車格不存在")
        if parking_space.occupied == False:
            raise Exception(f"{space_id} 並非使用中")
        if end_time < parking_space.history[-1].start_time:
            raise Exception("結束時間早於開始時間")

        # 更新進行中的停車紀錄
        parking_space.history[-1].end_time = end_time
        parking_space.occupied = False
        parking_space.current_car_id = None

        parking_space.save()

    # TODO
    @staticmethod
    def update_parking_space_status(status):
        pass

    # Delete


class MessageInterface:
    @staticmethod
    def connect_to_db():
        mongoengine.connect(Config.DB_NAME, host=Config.DB_URL)

    # Create
    # Read
    @staticmethod
    def read_all_messages():
        msg_mongo_objects = Message.objects.all()
        msg_dicts = [msg.to_mongo().to_dict() for msg in msg_mongo_objects]

        for msg_dict in msg_dicts:
            msg_dict.pop("_id", None)

        return msg_dicts

    # Update
    # Delete
