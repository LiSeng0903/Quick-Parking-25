import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
message_interface_path = os.path.join(cwd, "../interfaces/")
sys.path.append(message_interface_path)

import datetime

from general_functions import datetime_delta_to_str, now
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


def get_parking_space_by_floor(floor: int, with_status: bool = False):
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

        if with_status:
            ps_info["status"] = ps["status"]

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
    1. current_car_id -> car_id
    2. occupied -> True
    3. history -> 新增一筆停車紀錄，並不包含離開時間

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
            "start_time": now(),
            "end_time": None,
        }
    )
    PSI.update_ps_history(space_id, history)


def can_leave(car_id: str):
    """
    檢查車輛 car_id 是否可以離開停車位
    總共會檢查
    1. 車輛 car_id 是否在停車場

    Args:
        car_id (str): 車輛 ID
    Returns:
        bool: 是否可以離開
        str: 訊息
    """

    # 檢查車輛是否在停車場
    ps = PSI.read_ps_by_current_car_id(car_id)
    if ps == None:
        return False, f"車輛 {car_id} 不在停車場"

    return True, ""


def leave_car(car_id: str):
    """
    車子離開，更新停車位資訊，會更新
    1. current_car_id -> None
    2. occupied -> False
    3. history -> 更新最後一筆停車紀錄的離開時間
    4. status -> "OK"
    """

    space_id = PSI.read_ps_by_current_car_id(car_id)["space_id"]

    PSI.update_ps_current_car_id(space_id, None)
    PSI.update_ps_occupied(space_id, False)

    history = PSI.read_ps_history(space_id)
    history[-1]["end_time"] = now()
    PSI.update_ps_history(space_id, history)

    PSI.update_ps_status(space_id, "OK")

    park_time = now() - history[-1]["start_time"]

    # TODO: isoformat
    return park_time


def find_car(space_id: str, car_id: str):
    """
    尋找車輛，space_id 和 car_id 擇一即可，兩者都有且不一致時以 space_id 為主

    回傳值無論如何都是 {"spaceId": str, "floor": int, "carId": str, "parkTime": datetime.timedelta}
    如果沒有找到車位，則會回傳有相應 key, 但 value 為 None 的 dict
    如果有找到車位，但目前沒有車輛停在該車位，則會回傳有相應 key, spaceId, floor 正常填寫；carId, parkTime 為 None 的 dict
    如果有找到車位，且目前有車輛正在停，才會回傳完整的 dict

    Args:
        space_id (str): 停車位 ID
        car_id (str): 車輛 ID
    Returns:
        info (dict): 車位資訊，內容為 {
            "spaceId": str,
            "floor": int,
            "carId": str,
            "parkTime": datetime.timedelta,
        }
    """

    # 基本回傳資訊
    info = {
        "spaceId": None,
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
    info["spaceId"] = ps["space_id"]
    info["floor"] = ps["floor"]

    # 如果有正在進行的停車紀錄，就更新 carId, parkTime
    try:
        # 確保停車位最後一筆歷史紀錄還沒有離開
        current_history = ps["history"][-1]
        if current_history.get("end_time", None) != None:
            raise Exception(f"車輛 {car_id} 已離開停車位 {space_id}")

        info["carId"] = ps["current_car_id"]
        park_time = now() - current_history["start_time"]
        info["parkTime"] = datetime_delta_to_str(park_time)

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

    # 產生基本回傳資訊
    info = {
        "parkingSpaceId": None,
        "spaceType": None,
        "currentCarId": None,
        "parkTime": None,
        "status": "",
        "useRate": 0,
        "history": [],
    }

    # 嘗試以 space_id 找到停車位
    ps = PSI.read_ps_by_space_id(space_id)

    # 填入停車位資訊
    info["parkingSpaceId"] = ps["space_id"]
    info["spaceType"] = ps["space_type"]
    info["status"] = ps["status"]

    # 整理 ps["history"]，並將其放入 info["history"]
    for his in ps["history"]:
        formated_his = {}

        formated_his["carId"] = his.get("car_id", None)
        try:
            formated_his["startTime"] = his.get("start_time").isoformat()
        except:
            formated_his["startTime"] = ""

        try:
            formated_his["endTime"] = his.get("end_time").isoformat()
        except:
            formated_his["endTime"] = ""

        info["history"].append(formated_his)

    # 計算 parkTime, currentCarId
    try:
        current_history = ps["history"][-1]  # 也許 ps["history"][-1] 沒有東西

        # 正有車子停在停車位上
        if ps.get("occupied") == True:
            info["currentCarId"] = ps["current_car_id"]
            info["parkTime"] = datetime_delta_to_str(now() - current_history["start_time"])
    except Exception as e:
        pass

    # 計算當天使用率
    today_usage = datetime.timedelta(0)
    for his in ps["history"]:
        today = now().replace(hour=0, minute=0, second=0, microsecond=0)
        if his.get("end_time") == None:
            print(his["start_time"])
            today_usage += now() - max(today, (his["start_time"]))
        elif his["end_time"].date() == now().date():
            print(his["end_time"])
            today_usage += his["end_time"] - max(today, (his["start_time"]))

    info["useRate"] = f"{today_usage / (now() - today)*100:.1f}%"

    return info


def get_warning_ps_ids():
    """
    取得所有狀態為 WARNING 的停車位 ID

    Args:
        None
    Returns:
        list[str]: 所有狀態為 WARNING 的停車位編號
    """

    # 取得所有狀態為 WARNING 的停車位
    warning_pss = PSI.read_ps_by_status("WARNING")
    warning_ids = [ps["space_id"] for ps in warning_pss]

    return warning_ids


def check_pss_status():
    """
    檢查停車位狀態；

    Args:
        None
    Returns:
        None
    """

    pss = PSI.read_all_ps()

    for ps in pss:
        # 狀態正常 & 沒有停車中的停車位 => 跳過
        if (ps.get("status") == "OK") and (ps.get("occupied") == False):
            continue

        try:
            if now() - ps.get("history")[-1].get("start_time") > datetime.timedelta(hours=24):
                PSI.update_ps_status(ps.get("space_id"), "WARNING")
            else:
                PSI.update_ps_status(ps.get("space_id"), "OK")
        except Exception as e:
            print(e)
            pass
