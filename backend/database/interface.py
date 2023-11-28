import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))

schema_path = cwd
sys.path.append(schema_path)

config_path = os.path.join(cwd, "../config")
sys.path.append(config_path)

import mongoengine
from config import Config
from schema import Message, ParkingSpace


class ParkingSpaceInterface:
    @staticmethod
    def connect_to_db():
        mongoengine.connect(Config.DB_NAME, host=Config.DB_URL)

    # Create
    # TODO
    def create_empty_parking_space(floor, type):
        pass

    # Read
    @staticmethod
    def read_all_parking_spaces():
        ps_mongo_objects = ParkingSpace.objects.all()
        ps_dicts = [ps.to_mongo().to_dict() for ps in ps_mongo_objects]

        for ps_dict in ps_dicts:
            ps_dict.pop("_id", None)

        return ps_dicts

    # TODO
    def read_parking_spaces_by_floor(floor):
        pass

    # Update
    # TODO
    def update_car_park(space_id):
        pass

    # TODO
    def update_car_leave(space_id):
        pass

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
