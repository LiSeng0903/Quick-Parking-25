import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
username = os.environ.get("DB_USERNAME")
password = os.environ.get("DB_PASSWORD")


def get_parking_infos():
    client = MongoClient(
        f"mongodb+srv://{username}:{password}@cluster0.hcp2app.mongodb.net/?retryWrites=true&w=majority"
    )

    db = client["QuickParking"]
    collection = db["parkingSpace"]

    parking_infos = {
        "scooter": len(list(collection.find({"type": "scooter", "occupied": False}))),
        "car": len(list(collection.find({"type": "car", "occupied": False}))),
        "disabled": len(list(collection.find({"type": "disabled", "occupied": False}))),
        "pregnant": len(list(collection.find({"type": "pregnant", "occupied": False}))),
    }

    return parking_infos


if __name__ == "__main__":
    pass
    # get_parking_infos()
