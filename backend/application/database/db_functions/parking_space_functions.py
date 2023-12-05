import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
message_interface_path = os.path.join(cwd, "../interfaces/")
sys.path.append(message_interface_path)

from datetime import datetime

from connection import connect_decorator
from ParkingSpaceInterface import ParkingSpaceInterface as PSI


@connect_decorator
def get_remain_space_cnt():
    all_ps = PSI.read_all_ps()

    remain_space_cnt = {"car": 0, "motor": 0, "priority": 0}

    for ps in all_ps:
        if ps["occupied"] == True:
            continue

        remain_space_cnt[ps["space_type"]] += 1

    return remain_space_cnt


@connect_decorator
def get_parking_space_by_floor(floor: int):
    spaces = {}
    ps_of_floor = PSI.read_ps_by_floor(floor)

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


@connect_decorator
def can_park(space_id: str, car_id: str):
    # Check ps exist
    ps = PSI.read_ps_by_space_id(space_id)
    if ps == None:
        return False, f"停車位 {space_id} 不存在"

    # Check ps is not occupied
    if ps["occupied"] == True:
        return False, f"停車位 {space_id} 已被佔用"

    # Check car is not parked
    car_parked_ps = PSI.read_ps_by_current_car_id(car_id)
    if car_parked_ps != None:
        return False, f"車輛 {car_id} 已經停在停車位 {car_parked_ps['space_id']} 中"

    return True, ""


@connect_decorator
def park_car(space_id: str, car_id: str):
    # update current_car_id
    PSI.update_ps_current_car_id(space_id, car_id)

    # update occcupied
    PSI.update_ps_occupied(space_id, True)

    # update history
    history = PSI.read_ps_history(space_id)
    history.append(
        {
            "car_id": car_id,
            "start_time": datetime.now(),
            "end_time": None,
        }
    )
