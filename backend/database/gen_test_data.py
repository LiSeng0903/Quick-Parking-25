import json
import os

import bcrypt
import mongoengine
from dotenv import load_dotenv
from interface import MessageInterface, ParkingSpaceInterface
from mongoengine import Document, DynamicDocument
from schema import Manager, Message, ParkingSpace

cwd = os.path.dirname(os.path.abspath(__file__))


def clear_all_data():
    """刪除 mongoDB 上的所有資料"""

    document_classes = Document.__subclasses__()

    for document_class in document_classes:
        if issubclass(document_class, Document) and document_class not in [Document, DynamicDocument]:
            document_class.objects.delete()


def gen_parking_space_data():
    """產生停車格的測試資料"""

    for i in range(180):
        type = ""
        floor = 1
        zone = ""

        # Set type
        if i in range(120):
            type = "motor"
        elif i in range(120, 130):
            type = "disabled"
        elif i in range(130, 180):
            type = "car"

        # Set zone
        if i in range(60):
            zone = "A"
        elif i in range(60, 120):
            zone = "B"
        elif i in range(120, 180):
            zone = "C"

        ParkingSpaceInterface.create_empty_ps(floor, type, zone)

    # 二樓到五樓
    for floor in range(2, 6):
        for i in range(120):
            type = ""
            zone = ""

            # Set type
            if i in range(10):
                type = "disabled"
            elif i in range(10, 120):
                type = "car"

            # Set zone
            if i in range(40):
                zone = "A"
            elif i in range(40, 80):
                zone = "B"
            elif i in range(80, 120):
                zone = "C"

            ParkingSpaceInterface.create_empty_ps(floor, type, zone)


def gen_message_data():
    """產生提示訊息的資料"""

    msgs = [Message(content="五樓整修中"), Message(content="四樓無障礙車位故障，請暫停使用")]

    for msg in msgs:
        msg.save()


def gen_manager_accounts():
    """產生管理員帳號"""

    with open(cwd + "/managers.json", "r", encoding="utf-8") as f:
        managers = json.load(f)["managers"]

    for manager in managers:
        m = Manager(
            account=manager["account"],
            password=bcrypt.hashpw(manager["password"].encode("utf-8"), bcrypt.gensalt()),
            login=False,
            name=manager["name"],
        )

        m.save()


def gen_all_data():
    """產生全部資料"""

    clear_all_data()
    gen_parking_space_data()
    gen_message_data()
    gen_manager_accounts()


if __name__ == "__main__":
    load_dotenv()
    username = os.environ.get("DB_USERNAME")
    password = os.environ.get("DB_PASSWORD")

    mongoengine.connect(
        "QuickParking",
        host=f"mongodb+srv://{username}:{password}@cluster0.hcp2app.mongodb.net/?retryWrites=true&w=majority",
    )

    gen_all_data()
    # gen_manager_accounts()
