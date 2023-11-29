import os
import sys

cwd = os.path.dirname(os.path.abspath(__file__))

schema_path = os.path.join(cwd, "../")
sys.path.append(schema_path)

from schema import Message


class MessageInterface:
    # Create
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
