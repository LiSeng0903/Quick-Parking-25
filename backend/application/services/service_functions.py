import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
db_function_path = os.path.join(cwd, "../database/db_functions/")
sys.path.append(db_function_path)

import manager_functions as mng_func
import message_functions as msg_func
import parking_space_functions as ps_func


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


def get_space_by_floor(floor: int):
    """
    取得某樓層的停車位資訊

    Args:
        floor (int): 樓層
    Returns:

    """
    return ps_func.get_parking_space_by_floor(floor)


def park_car(space_id: str, car_id: str):
    """
    停車

    Args:
        space_id (str): 停車位 ID
        car_id (str): 車輛 ID
    Returns:
        bool: 是否成功
        str: 訊息
    """

    try:
        ps_func.park_car(space_id, car_id)
        msg = f"車輛 {car_id} 已停入停車位 {space_id}"
        return True, msg
    except Exception as e:
        msg = str(e)
        return False, msg
