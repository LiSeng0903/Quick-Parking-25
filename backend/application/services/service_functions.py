import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
db_function_path = os.path.join(cwd, "../database/db_functions/")

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
