import os

from dotenv import load_dotenv
from pymongo import MongoClient

# Load environment variables from .env file
load_dotenv()
username = os.environ.get("DB_USERNAME")
password = os.environ.get("DB_PASSWORD")

client = MongoClient(f"mongodb+srv://{username}:{password}@cluster0.hcp2app.mongodb.net/?retryWrites=true&w=majority")

db = client["QuickParking"]
collection = db["parkingSpace"]

# Clear all data
collection.delete_many({})

# Floor 1
for i in range(180):
    space_info = {
        "space_id": "1" + str(i + 1).zfill(3),
        "occupied": False,
        "type": "",
        "floor": 1,
        "status": "OK",
        "history": [],
        "zone": "",
    }

    # Set type
    if i in range(120):
        space_info["type"] = "motor"
    elif i in range(120, 130):
        space_info["type"] = "disabled"
    elif i in range(130, 180):
        space_info["type"] = "car"

    # Set zone
    if i in range(60):
        space_info["zone"] = "A"
    elif i in range(60, 120):
        space_info["zone"] = "B"
    elif i in range(60, 120):
        space_info["zone"] = "C"

    collection.insert_one(space_info)


for floor in range(2, 6):
    for i in range(120):
        space_info = space_info = {
            "space_id": str(floor) + str(i + 1).zfill(3),
            "occupied": False,
            "type": "",
            "floor": floor,
            "status": "OK",
            "history": [],
            "zone": "",
        }

        # Set type
        if i in range(10):
            space_info["type"] = "disabled"
        elif i in range(10, 120):
            space_info["type"] = "car"

        # Set zone
        if i in range(40):
            space_info["zone"] = "A"
        elif i in range(40, 80):
            space_info["zone"] = "B"
        elif i in range(80, 120):
            space_info["zone"] = "C"

        collection.insert_one(space_info)
