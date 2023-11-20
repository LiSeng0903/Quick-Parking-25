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
        "car": len(list(collection.find({"type": "car", "occupied": False}))),
        "motor": len(list(collection.find({"type": "motor", "occupied": False}))),
        "disabled": len(list(collection.find({"type": "disabled", "occupied": False}))),
    }

    collection = db["msg"]
    msgs = []
    for m in collection.find({}):
        msgs.append(m["message"])

    return {
        "car": parking_infos["car"],
        "motor": parking_infos["motor"],
        "disabled": parking_infos["disabled"],
        "msgs": msgs,
    }


if __name__ == "__main__":
    # pass
    print(get_parking_infos())
