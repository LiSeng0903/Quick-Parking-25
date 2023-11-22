import os
import sys
cwd = os.path.dirname(os.path.abspath(__file__))
app_path = os.path.join(cwd, '../')
sys.path.append(app_path)
from db_interface import DBInterface

def get_parking_info():
    """
    取得停車場概覽資料
    params:
        None
    return:
        {
        "success": bool,
        "message": str,
        "car": int,
        "motor": int,
        "disabled": int,
        "msgs": str,
        }
    """
    
    try:
        db_interface = DBInterface()

        # 取得汽車、機車、身障車位數量
        car = len(db_interface.find_documents("parkingSpace", {"type": "car", "occupied": False}))
        motor = len(db_interface.find_documents("parkingSpace", {"type": "motor", "occupied": False}))
        disabled = len(db_interface.find_documents("parkingSpace", {"type": "disabled", "occupied": False}))

        # 取得停車場訊息
        msgs = db_interface.find_documents("msg", {})

        return {
            "success": True,
            "message": "",
            "car": car,
            "motor": motor,
            "disabled": disabled,
            "msgs": msgs,
        }
    except Exception as e:
        print(f"An error occurred: {e}")
        return {
            "success": False,
            "message": e,
            "car": 0,
            "motor": 0,
            "disabled": 0,
            "msgs": "",
        }
    finally:
        # 關閉資料庫連線
        if 'db_interface' in locals():
            db_interface.close_connection()