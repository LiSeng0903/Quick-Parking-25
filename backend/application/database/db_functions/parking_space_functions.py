import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
message_interface_path = os.path.join(cwd, "../interfaces/")
sys.path.append(message_interface_path)

from datetime import datetime

from ParkingSpaceInterface import ParkingSpaceInterface as PSI


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
    PSI.update_ps_history(space_id, history)


def find_car(space_id: str, car_id: str):
    """
    尋找車輛，space_id 和 car_id 擇一即可，兩者都有且不一致時以 space_id 為主

    回傳值無論如何都是 {"spacesId": str, "floor": int, "carId": str, "parkTime": datetime.timedelta}
    如果沒有找到車位，則會回傳有相應 key, 但 value 為 None 的 dict
    如果有找到車位，但目前沒有車輛停在該車位，則會回傳有相應 key, spacesId, floor 正常填寫；carId, parkTime 為 None 的 dict
    如果有找到車位，且目前有車輛正在停，才會回傳完整的 dict

    Args:
        space_id (str): 停車位 ID
        car_id (str): 車輛 ID
    Returns:
        info (dict): 車位資訊，內容為 {
            "spacesId": str,
            "floor": int,
            "carId": str,
            "parkTime": datetime.timedelta,
        }
    """

    # 基本回傳資訊
    info = {
        "spacesId": None,
        "floor": None,
        "carId": None,
        "parkTime": None,
    }

    # 尋找停車位，先以 space_id 為準，找不到再以 car_id 為準
    ps = PSI.read_ps_by_space_id(space_id)
    if ps == None:
        ps = PSI.read_ps_by_current_car_id(car_id)
    if ps == None:
        return info

    # 有找到停車格的話就先更新基本資訊
    info["spacesId"] = ps["space_id"]
    info["floor"] = ps["floor"]

    # 如果有正在進行的停車紀錄，就更新 carId, parkTime
    try:
        # 確保停車位最後一筆歷史紀錄還沒有離開
        current_history = ps["history"][-1]
        if current_history.get("end_time", None) != None:
            raise Exception(f"車輛 {car_id} 已離開停車位 {space_id}")

        info["carId"] = ps["current_car_id"]
        info["parkTime"] = datetime.now() - current_history["start_time"]

    except Exception as e:
        pass

    return info


def get_ps_all_info(space_id: str):
    """
    取得某個停車位的所有資訊，並且計算其停車時間

    Args:
        space_id (str): 停車位編號
    Returns:
        info (dict): 停車位資訊，內容為 {
            "parkingSpaceId": str,
            "spaceType": "car" || "motor" || "priority",
            "currentCarId": str,
            "parkTime": datetime.timedelta,
            "status": "OK" || "WARNING" ,
            "history": [
                {
                    "startTime": datetime,
                    "carId": str,
                    "endTime": datetime,
                },
                ...
            ],
        }
    """

    info = {
        "parkingSpaceId": None,
        "spaceType": None,
        "currentCarId": None,
        "parkTime": None,
        "status": "",
        "history": [
            {
                "startTime": datetime,
                "carId": str,
                "endTime": datetime,
            },
        ],
    }

    ps = PSI.read_ps_by_space_id(space_id)
    info["parkingSpaceId"] = ps["space_id"]
    info["spaceType"] = ps["space_type"]
    info["status"] = ps["status"]

    new_key_history = []
    for his in ps["history"]:
        new_key_history.append(
            {
                "startTime": his.get("start_time", None),
                "carId": his.get("car_id", None),
                "endTime": his.get("end_time", None),
            }
        )

    info["history"] = new_key_history

    # 計算 parkTime, currentCarId
    try:
        current_history = ps["history"][-1]  # 也許 ps["history"][-1] 沒有東西

        # 正有車子停在停車位上
        if current_history.get("end_time", None) == None:
            info["currentCarId"] = ps["current_car_id"]
            info["parkTime"] = datetime.now() - current_history["start_time"]
    except Exception as e:
        pass

    return info


def get_warning_ps_ids():
    """
    取得所有狀態為 WARNING 的停車位 ID

    Args:
        None
    Returns:
        list[str]: 所有狀態為 WARNING 的停車位編號
    """

    warning_ids = []
    warning_pss = PSI.read_ps_by_status("WARNING")

    for ps in warning_pss:
        warning_ids.append(ps["space_id"])

    return warning_ids
