import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
interface_path = os.path.join(cwd, "../interfaces/")
sys.path.append(interface_path)

import json

import bcrypt
from connection import connect_to_db
from ManagerInterface import ManagerInterface
from MessageInterface import MessageInterface
from mongoengine import Document, DynamicDocument
from ParkingSpaceInterface import ParkingSpaceInterface


def clear_all_data():
    """刪除 mongoDB 上的所有資料"""

    connect_to_db()

    document_classes = Document.__subclasses__()
    for document_class in document_classes:
        if issubclass(document_class, Document) and document_class not in [Document, DynamicDocument]:
            document_class.objects.delete()


def gen_parking_space_data():
    """產生停車格的測試資料"""

    connect_to_db()

    # 一樓
    for i in range(180):
        new_ps = {
            "space_id": "1" + str(i + 1).zfill(3),
            "space_type": "",
            "floor": 1,
            "zone": "",
        }

        # Set type
        if i in range(120):
            new_ps["space_type"] = "motor"
        elif i in range(120, 130):
            new_ps["space_type"] = "priority"
        elif i in range(130, 180):
            new_ps["space_type"] = "car"

        # Set zone
        if i in range(60):
            new_ps["zone"] = "A"
        elif i in range(60, 120):
            new_ps["zone"] = "B"
        elif i in range(120, 140):
            new_ps["zone"] = "C"
        elif i in range(140, 160):
            new_ps["zone"] = "D"
        elif i in range(160, 180):
            new_ps["zone"] = "E"

        ParkingSpaceInterface.create_ps(new_ps)

    # 二樓到五樓
    for floor in range(2, 6):
        for i in range(120):
            new_ps = {
                "space_id": str(floor) + str(i + 1).zfill(3),
                "space_type": "",
                "floor": 1,
                "zone": "",
            }

            # Set type
            if i in range(10):
                new_ps["space_type"] = "priority"
            elif i in range(10, 120):
                new_ps["space_type"] = "car"

            # Set zone
            if i in range(40):
                new_ps["zone"] = "A"
            elif i in range(40, 80):
                new_ps["zone"] = "B"
            elif i in range(80, 120):
                new_ps["zone"] = "C"

            ParkingSpaceInterface.create_ps(new_ps)


def gen_message_data():
    """產生提示訊息的資料"""

    # 連接資料庫
    connect_to_db()

    # 取得所有公告訊息
    msgs = ["五樓整修中", "四樓無障礙車位故障，請暫停使用"]
    for msg in msgs:
        MessageInterface.create_message({"content": msg})


def gen_manager_accounts():
    """產生管理員帳號"""

    # 連接資料庫
    connect_to_db()

    with open(os.path.join(cwd, "../managers.json"), "r", encoding="utf-8") as f:
        managers = json.load(f)["managers"]

    for manager in managers:
        manager_dict = {
            "account": manager["account"],
            "password": bcrypt.hashpw(manager["password"].encode("utf-8"), bcrypt.gensalt()),
            "name": manager["name"],
        }

        ManagerInterface.create_manager(manager)


def gen_all_data():
    """產生全部資料"""

    gen_parking_space_data()
    gen_message_data()
    gen_manager_accounts()


if __name__ == "__main__":
    clear_all_data()
    gen_all_data()
    # gen_manager_accounts()
