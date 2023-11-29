import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
interface_path = cwd
sys.path.append(interface_path)

import datetime

import bcrypt
from interface import ManagerInterface, MessageInterface, ParkingSpaceInterface


def get_parking_infos():
    parking_infos = {
        "car": 0,
        "motor": 0,
        "disabled": 0,
        "msg": [],
    }

    # Start query parking spaces
    ParkingSpaceInterface.connect_to_db()
    all_parking_spaces = ParkingSpaceInterface.read_all_ps()
    for ps in all_parking_spaces:
        if ps["occupied"] == True:
            continue

        if ps["space_type"] == "car":
            parking_infos["car"] += 1
        elif ps["space_type"] == "motor":
            parking_infos["motor"] += 1
        elif ps["space_type"] == "disabled":
            parking_infos["disabled"] += 1

    MessageInterface.connect_to_db()
    all_messages = MessageInterface.read_all_messages()
    for msg in all_messages:
        parking_infos["msg"].append(msg["content"])

    return parking_infos


def get_floor_map(floor):
    pss = {"spaces": {"A": [], "B": [], "C": []}}

    ParkingSpaceInterface.connect_to_db()
    parking_spaces = ParkingSpaceInterface.read_ps_by_floor(floor)

    for ps in parking_spaces:
        ps_info = {
            "space_id": ps["space_id"],
            "type": ps["space_type"],
            "occupied": ps["occupied"],
        }

        pss["spaces"][ps["zone"]].append(ps_info)

    return pss


def get_car_id_ps(car_id):
    """
    取得 car_id 所在的車位資訊

    Args:
        car_id (str): 車輛編號
    Returns:
        dict: 車位資訊
    """

    ParkingSpaceInterface.connect_to_db()

    ps = ParkingSpaceInterface.read_ps_by_car_id(car_id)

    return ps


def park(space_id, car_id):
    """
    將車輛停入指定的車位。只需輸入停車格編號及車牌號，停入時間以呼叫本函式的時間為準。

    Args:
        space_id (str): 停車格編號
        car_id (str): 車輛編號
    Returns:
        bool: 是否成功
        str: 回傳訊息
    """
    # 取得現在時間
    current_time = datetime.datetime.now()

    ParkingSpaceInterface.connect_to_db()
    success = False
    result = ""

    # 檢查是否可以停車
    ps = ParkingSpaceInterface.read_ps_by_space_id(space_id)
    if ps["occupied"] == True:
        # 車位已經被佔用
        success = False
        result = f"車位 {space_id} 正在使用中"
    elif ParkingSpaceInterface.read_ps_by_car_id(car_id) != None:
        # 車輛已經停在其他車位
        success = False
        result = f"車輛 {car_id} 已經停在其他車位"
    else:
        try:
            # 更新停車格資料
            ParkingSpaceInterface.update_car_park(space_id, car_id, current_time)
            success = True
            result = f"車輛 {car_id} 成功停在車位 {space_id}"
        except Exception as e:
            success = False
            result = f"車輛 {car_id} 停在車位 {space_id} 失敗，因為 {e}"

    return success, result


def leave(car_id):
    success = False
    result = ""

    current_time = datetime.datetime.now()
    ParkingSpaceInterface.connect_to_db()

    # 檢查是否可以離開
    # 車子沒有停在車位上

    ParkingSpaceInterface.update_car_leave(car_id, current_time)

    pass


def manager_login(account, password):
    """
    管理員登入
    """

    ManagerInterface.connect_to_db()

    hashed_password = ManagerInterface.read_manger_password(account)

    if hashed_password == None:
        return False, "登入失敗：帳號錯誤"

    if bcrypt.checkpw(password.encode(), hashed_password.encode()) == False:
        return False, "登入失敗：密碼錯誤"
    else:
        ManagerInterface.update_login(account, True)
        return True, "登入成功"


def manager_logout(account):
    """
    管理員登出
    """

    ManagerInterface.connect_to_db()
    ManagerInterface.update_login(account, False)

    return True, "登出成功"