import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))
message_interface_path = os.path.join(cwd, "../interfaces/")
sys.path.append(message_interface_path)

from connection import connect_to_db
from MessageInterface import MessageInterface


def get_all_message():
    """
    取得所有留言
    """

    try:
        connect_to_db()
        all_messages = MessageInterface.read_all_messages()

        message_list = []

        for msg in all_messages:
            message_list.append(msg["content"])

        return True, message_list
    except Exception as e:
        return False, f"取得留言失敗：{e}"
