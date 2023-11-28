import os

import mongoengine
from dotenv import load_dotenv
from interface import MessageInterface, ParkingSpaceInterface
from mongoengine import Document, DynamicDocument
from schema import Manager, Message, ParkingSpace

# Load environment variables from .env file
load_dotenv()
username = os.environ.get("DB_USERNAME")
password = os.environ.get("DB_PASSWORD")

# Connect to mongoDB Atlas
mongoengine.connect(
    "QuickParking",
    host=f"mongodb+srv://{username}:{password}@cluster0.hcp2app.mongodb.net/?retryWrites=true&w=majority",
)

# 刪除舊資料
document_classes = Document.__subclasses__()
for document_class in document_classes:
    if issubclass(document_class, Document) and document_class not in [Document, DynamicDocument]:
        document_class.objects.delete()

# 停車格資料
# 一樓
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

# 警告訊息資料
msgs = [Message(content="五樓整修中"), Message(content="四樓無障礙車位故障，請暫停使用")]
for msg in msgs:
    msg.save()
