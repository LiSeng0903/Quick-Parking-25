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
            floor_ps_cnt = len(ParkingSpaceInterface.read_ps_of_floor(floor))

            # 產生停車位資料
            parking_space = ParkingSpace(
                space_id=str(floor) + str(floor_ps_cnt + 1).zfill(3),
                occupied=False,
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
    def read_all_ps():
        ps_mongo_objects = ParkingSpace.objects.all()
        ps_dicts = [ps.to_mongo().to_dict() for ps in ps_mongo_objects]

        for ps_dict in ps_dicts:
            ps_dict.pop("_id", None)

        return ps_dicts

    # TODO
    def read_ps_of_floor(floor):
        ps_mongo_objects = ParkingSpace.objects(floor=floor)

        ps_dicts = [ps.to_mongo().to_dict() for ps in ps_mongo_objects]

        for ps_dict in ps_dicts:
            ps_dict.pop("_id", None)

        return ps_dicts

    # Update
    # TODO
    @staticmethod
    def update_car_park(space_id, license_plate_number, start_time):
        parking_space = ParkingSpace.objects(space_id=space_id).first()

        if parking_space == None:
            return False

        parking_space.history.append(
            History(start_time=start_time, end_time=None, license_plate_number=license_plate_number)
        )

        parking_space.occupied = True

        parking_space.save()

        return True

    # TODO
    @staticmethod
    def update_car_leave(space_id, end_time):
        parking_space = ParkingSpace.objects(space_id=space_id).first()

        if parking_space == None:
            return False

        parking_space.history[-1].end_time = end_time
        parking_space.occupied = False

        parking_space.save()

        return True

    # TODO
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
