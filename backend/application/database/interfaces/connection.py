import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))

config_path = os.path.join(cwd, "../../../config")
sys.path.append(config_path)

import mongoengine
from config import Config


def connect_to_db():
    """
    連線到資料庫

    Args:
        None
    Returns:
        bool: 資料庫連線是否成功
    """

    try:
        mongoengine.connect(Config.DB_NAME, host=Config.DB_URL, uuidRepresentation='standard')
        return True
    except Exception as e:
        print(e)
        return False


def connect_decorator(func):
    def wrapper(*args, **kwargs):
        connect_to_db()
        return func(*args, **kwargs)

    return wrapper
