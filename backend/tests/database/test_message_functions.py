import pytest
from unittest.mock import Mock, call, patch
from application.database.db_functions.message_functions import get_all_message

from functools import wraps

def mock_decorator(*args, **kwargs):
    """Decorate by doing nothing."""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# PATCH THE DECORATOR HERE
patch('application.database.db_functions.message_functions.connect_decorator', mock_decorator).start()

def test_get_all_message():
    mock_all_messages = [
        {"content": "message1"}, {"content": "message2"}, {"content": "message3"}
    ]
    msg_list = ["message1", "message2", "message3"]
    with patch(
        "application.database.db_functions.message_functions.MessageInterface.read_all_messages",
        return_value=mock_all_messages
    ):
        assert get_all_message() == (True, msg_list)
    
    err_str = "testing errors"
    with patch(
        "application.database.db_functions.message_functions.MessageInterface.read_all_messages",
        side_effect=Exception(err_str)
    ):
        assert get_all_message() == (False, f"取得留言失敗：{err_str}")