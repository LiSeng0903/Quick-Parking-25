import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
message_interface_path = os.path.join(cwd, "../interfaces/")
sys.path.append(message_interface_path)

from connection import connect_decorator
from ParkingSpaceInterface import ParkingSpaceInterface


@connect_decorator
def get_remain_space_cnt():
    all_ps = ParkingSpaceInterface.read_all_ps()

    remain_space_cnt = {"car": 0, "motor": 0, "priority": 0}

    for ps in all_ps:
        if ps["occupied"] == True:
            continue

        remain_space_cnt[ps["space_type"]] += 1

    return remain_space_cnt


@connect_decorator
def get_parking_space_by_floor(floor: int):
    spaces = {}
    ps_of_floor = ParkingSpaceInterface.read_ps_by_floor(floor)

    for ps in ps_of_floor:
        ps_info = {
            "space_id": ps["space_id"],
            "space_type": ps["space_type"],
            "occupied": ps["occupied"],
        }

        if ps["zone"] in spaces.keys():
            spaces[ps["zone"]].append(ps_info)
        else:
            spaces[ps["zone"]] = [ps_info]

    return spaces
