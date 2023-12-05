import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
db_function_path = os.path.join(cwd, "../database/db_functions/")
connect_path = os.path.join(cwd, "../database/interfaces/")
sys.path.append(db_function_path)
sys.path.append(connect_path)

import manager_functions as mng_func
import message_functions as msg_func
import parking_space_functions as ps_func
from connection import connect_decorator


@connect_decorator
def get_parking_infos():
    """
    取得停車場空位資訊

    Args:
        None
    Returns:
        dict: {
            "car": int,
            "motor": int,
            "priority": int,
            "msgs": list,
        }
    """

    remain_space_cnt = ps_func.get_remain_space_cnt()
    success, msgs = msg_func.get_all_message()

    return {
        "car": remain_space_cnt["car"],
        "motor": remain_space_cnt["motor"],
        "priority": remain_space_cnt["priority"],
        "msgs": msgs,
    }


@connect_decorator
def get_space_by_floor(floor: int):
    """
    取得某樓層的停車位資訊

    Args:
        floor (int): 樓層
    Returns:

    """
    return ps_func.get_parking_space_by_floor(floor)


@connect_decorator
def park_car(space_id: str, car_id: str):
    """
    先檢查停車位存在且沒有被佔用、車子沒有停在別的停車位
    檢查都通過的話就可以停入車位

    Args:
        space_id (str): 停車位 ID
        car_id (str): 車輛 ID
    Returns:
        bool: 是否成功
        str: 訊息
    """

    can_p, msg = ps_func.can_park(space_id, car_id)
    if can_p == False:
        return False, msg

    try:
        ps_func.park_car(space_id, car_id)
        msg = f"車輛 {car_id} 已停入停車位 {space_id}"
        return True, msg

    except Exception as e:
        return False, str(e)


@connect_decorator
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

    return ps_func.find_car(space_id, car_id)
