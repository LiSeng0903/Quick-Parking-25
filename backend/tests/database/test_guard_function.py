import pytest
from unittest.mock import Mock, call, patch
from application.database.db_functions.guard_functions import check_password


def test_check_password():
    test_cases = [
        (None, None, (False, '帳號 account 不存在')),
        (
            {
                "account": "guard",
                "password": "hashed_password"
            },
            False,
            (False, "密碼錯誤")
        ),
        (
            {
                "account": "guard",
                "password": "hashed_password"
            },
            True,
            (True, "登入成功")
        )
    ]

    for sample_guard_dict, checkpwResult, expected_output in test_cases:
        with patch(
            "application.database.db_functions.guard_functions.GI.read_guard_by_account", 
            return_value = sample_guard_dict
        ), patch(
            "application.database.db_functions.guard_functions.bcrypt.checkpw", 
            return_value = checkpwResult
        ):
            assert check_password("account", "password") == expected_output