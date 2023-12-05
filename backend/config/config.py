import os
from dotenv import load_dotenv

load_dotenv()
username = os.environ.get("DB_USERNAME")
password = os.environ.get("DB_PASSWORD")

class Config:
    DB_URL = f"mongodb+srv://{username}:{password}@cluster0.hcp2app.mongodb.net/?retryWrites=true&w=majority"
    DB_NAME = "QuickParking"