import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
interface_path = cwd

sys.path.append(interface_path)
from interface import MessageInterface, ParkingSpaceInterface


def get_parking_infos():
    parking_infos = {
        "car": 0,
        "motor": 0,
        "disabled": 0,
        "msg": [],
    }

    # Start query parking spaces
    ParkingSpaceInterface.connect_to_db()
    all_parking_spaces = ParkingSpaceInterface.read_all_parking_spaces()
    for ps in all_parking_spaces:
        if ps["occupied"] == True:
            continue

        if ps["type"] == "car":
            parking_infos["car"] += 1
        elif ps["type"] == "motor":
            parking_infos["motor"] += 1
        elif ps["type"] == "disabled":
            parking_infos["disabled"] += 1

    MessageInterface.connect_to_db()
    all_messages = MessageInterface.read_all_messages()
    for msg in all_messages:
        parking_infos["msg"].append(msg["content"])

    return parking_infos
