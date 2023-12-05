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
    """
    取得停車場剩餘空位數量

    Args:
        None
    Returns:
        dict: 停車場剩餘空位數量，內容為 {
            "car": int,
            "motor": int,
            "priority": int,
        }
    """

    # 取得所有停車位
    all_ps = PSI.read_all_ps()

    # 計算剩餘空位數量
    remain_space_cnt = {"car": 0, "motor": 0, "priority": 0}
    for ps in all_ps:
        if ps["occupied"] == True:
            continue
        remain_space_cnt[ps["space_type"]] += 1

    return remain_space_cnt


@connect_decorator
def get_parking_space_by_floor(floor: int):
    """
    回傳該層樓的停車位資訊

    Args:
        floor (int): 樓層
    Returns:
        dict: 該樓層的停車位資訊。內容為 {
            "A": [
                {
                    "space_id": str,
                    "space_type": "car" || "motor" || "priority",
                    "occupied": bool,
                },
                ...
            ],
            "B": [
                ...
            ],
            ...
        }
    """

    spaces = {}  # 停車位資訊

    # 取得該樓層的所有停車位
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
    """
    檢查停車位 space_id 是否可以停入車輛 car_id
    總共會檢查
    1. 停車位 space_id 是否存在
    2. 停車位 space_id 是否已被佔用
    3. 車輛 car_id 是否已經停在別的停車位

    Args:
        space_id (str): 停車位 ID
        car_id (str): 車輛 ID
    Returns:
        bool: 是否可以停入
        str: 訊息
    """

    # 停車位 space_id 是否存在
    ps = PSI.read_ps_by_space_id(space_id)
    if ps == None:
        return False, f"停車位 {space_id} 不存在"

    # 停車位 space_id 是否已被佔用
    if ps["occupied"] == True:
        return False, f"停車位 {space_id} 已被佔用"

    # 車輛 car_id 是否已經停在別的停車位
    car_parked_ps = PSI.read_ps_by_current_car_id(car_id)
    if car_parked_ps != None:
        return False, f"車輛 {car_id} 已經停在停車位 {car_parked_ps['space_id']} 中"

    return True, ""


@connect_decorator
def park_car(space_id: str, car_id: str):
    """
    停車，更新停車位資訊，會更新
    1. current_car_id
    2. occupied
    3. history，新增一筆停車紀錄，尚未包含離開時間

    Args:
        space_id (str): 停車位 ID
        car_id (str): 車輛 ID
    Returns:
        None
    """

    # 更新 current_car_id
    PSI.update_ps_current_car_id(space_id, car_id)

    # 更新 occcupied
    PSI.update_ps_occupied(space_id, True)

    # 更新 history
    history = PSI.read_ps_history(space_id)
    history.append(
        {
            "car_id": car_id,
            "start_time": datetime.now(),
            "end_time": None,
        }
    )
