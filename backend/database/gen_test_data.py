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
        "type": "car",
        "floor": 1,
        "status": "OK",
        "history": [],
    }
    if i in range(120):
        space_info["type"] = "scooter"
    if i in range(120, 125):
        space_info["type"] = "pregnant"
    if i in range(125, 130):
        space_info["type"] = "disabled"

    collection.insert_one(space_info)


for floor in range(2, 6):
    for i in range(120):
        space_info = space_info = {
            "space_id": str(floor) + str(i + 1).zfill(3),
            "occupied": False,
            "type": "car",
            "floor": floor,
            "status": "OK",
            "history": [],
        }

        if i in range(5):
            space_info["type"] = "pregnant"
        if i in range(5, 10):
            space_info["type"] = "disabled"

        collection.insert_one(space_info)
