import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))

schema_path = os.path.join(cwd, "../")
sys.path.append(schema_path)

from schema import Message


class MessageInterface:
    # Create
    @staticmethod
    def create_message(msg):
        """
        創造新的訊息

        Args:
            msg (dict): 訊息資料，格式為
                {
                    "content": str
                }
        Returns:
            bool: 是否成功
            str: 回傳訊息
        """

        try:
            new_msg = Message(content=msg["content"])
            new_msg.save()
            return True, "Create Message Success"
        except Exception as e:
            return False, f"Create Message Fail: {e}"

    # Read
    @staticmethod
    def read_all_messages():
        msg_mongo_objects = Message.objects.all()
        msg_dicts = [msg.to_mongo().to_dict() for msg in msg_mongo_objects]

        for msg_dict in msg_dicts:
            msg_dict.pop("_id", None)

        return msg_dicts

    # Update
    # Delete
