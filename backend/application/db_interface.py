import os
import sys
cwd = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(cwd, '../config/')
sys.path.append(config_path)
from pymongo import MongoClient
from config import Config


class DBInterface:
    def __init__(self, db_url=Config.DB_URL, db_name=Config.DB_NAME):
        self.client = MongoClient(db_url)
        self.db = self.client[db_name]

    def insert_document(self, collection_name, document):
        collection = self.db[collection_name]
        result = collection.insert_one(document)
        return result.inserted_id

    def find_documents(self, collection_name, query=None):
        collection = self.db[collection_name]
        if query is None:
            documents = collection.find()
        else:
            documents = collection.find(query)
        return list(documents)

    # Add other CRUD operations as needed

    def close_connection(self):
        self.client.close()