import pytest
from unittest.mock import Mock, call, patch
from application.database.db_functions.message_functions import get_all_message


@patch("application.database.db_functions.message_functions.connect_decorator")
def test_get_all_message(mock_decorator):
    mock_all_messages = [
        {"content": "message1"}, {"content": "message2"}, {"content": "message3"}
    ]
    msg_list = ["message1", "message2", "message3"]
    with patch(
        "application.database.db_functions.message_functions.MessageInterface.read_all_messages",
        return_value=mock_all_messages
    ):
        assert get_all_message() == (True, msg_list)
        
    with patch(
        "application.database.db_functions.message_functions.MessageInterface.read_all_messages",
        return_value=[]
    ):
        assert get_all_message() == (True, [])
    
    err_str = "testing errors"
    with patch(
        "application.database.db_functions.message_functions.MessageInterface.read_all_messages",
        side_effect=Exception(err_str)
    ):
        assert get_all_message() == (False, f"取得留言失敗：{err_str}")