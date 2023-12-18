import pytest
from unittest.mock import patch
from datetime import datetime, timedelta
from application.database.db_functions.parking_space_functions import (
    get_remain_space_cnt, 
    get_parking_space_by_floor,
    can_park,
    can_leave,
    leave_car
)

def test_get_remain_space_cnt():
    all_ps = [
        {"space_type": "car", "occupied": True},
        {"space_type": "motor", "occupied": False},
        {"space_type": "priority", "occupied": True},
    ]
    with patch(
        "application.database.db_functions.parking_space_functions.PSI.read_all_ps",
        return_value=all_ps
    ):
        assert get_remain_space_cnt() == {"car": 0, "motor": 1, "priority": 0}
        
def test_get_parking_space_by_floor():
    ps_of_floor = [
        {
            "space_id": "1001", 
            "space_type": "car", 
            "occupied": True, 
            "status": True,
            "zone": "A"
        },
        {
            "space_id": "1002", 
            "space_type": "motor", 
            "occupied": False,
            "status": False,
            "zone": "B"
        },
        {
            "space_id": "1003", 
            "space_type": "priority", 
            "occupied": True,
            "status": False,
            "zone": "C"
        },
    ]
    with patch(
        "application.database.db_functions.parking_space_functions.PSI.read_ps_by_floor",
        return_value=ps_of_floor
    ):
        # Define the expected output
        expected_result = {
            "A": [
                {
                    "space_id": "1001",
                    "space_type": "car",
                    "occupied": True,
                    "status": True,
                },
            ],
            "B": [
                {
                    "space_id": "1002",
                    "space_type": "motor",
                    "occupied": False,
                    "status": False,
                },
            ],
            "C": [
                {
                    "space_id": "1003",
                    "space_type": "priority",
                    "occupied": True,
                    "status": False,
                },
            ],
        }

        # Assert that the actual result matches the expected result
        assert get_parking_space_by_floor(1, with_status=True) == expected_result
        
def test_can_park():
    with patch(
        "application.database.db_functions.parking_space_functions.PSI.read_ps_by_space_id",
        return_value=None
    ):
        assert can_park("space_id", "car_id") == (False, "停車位 space_id 不存在")
    
    with patch(
        "application.database.db_functions.parking_space_functions.PSI.read_ps_by_space_id",
        return_value={
            "space_id": "1003",
            "space_type": "priority",
            "occupied": True,
            "status": False,
        }
    ):
        assert can_park("space_id", "car_id") == (False, "停車位 space_id 已被佔用")
    
    with patch(
        "application.database.db_functions.parking_space_functions.PSI.read_ps_by_space_id",
        return_value={
            "space_id": "1003",
            "space_type": "priority",
            "occupied": False,
            "status": False,
        }
    ), patch(
        "application.database.db_functions.parking_space_functions.PSI.read_ps_by_current_car_id",
        return_value={
            "space_id": "1003",
            "space_type": "priority",
            "occupied": False,
            "status": False,
        }
    ):
        assert can_park("space_id", "car_id") == (False, "車輛 car_id 已經停在停車位 1003 中")
        
    with patch(
        "application.database.db_functions.parking_space_functions.PSI.read_ps_by_space_id",
        return_value={
            "space_id": "1003",
            "space_type": "priority",
            "occupied": False,
            "status": False,
        }
    ), patch(
        "application.database.db_functions.parking_space_functions.PSI.read_ps_by_current_car_id",
        return_value=None
    ):
        assert can_park("space_id", "car_id") == (True, "")
        
def test_can_leave():
    with patch(
        "application.database.db_functions.parking_space_functions.PSI.read_ps_by_current_car_id",
        return_value={"status": "can_leave"}
    ):
        assert can_leave("car_id") == (True, "")
    
    with patch(
        "application.database.db_functions.parking_space_functions.PSI.read_ps_by_current_car_id",
        return_value=None
    ):
        assert can_leave("car_id") == (False, "車輛 car_id 不在停車場")
        
# def test_leave_car():
#     history = [
#         {"start_time": "mock_start_time1", "end_time": "mock_end_time1"},
#         {"start_time": "mock_start_time2", "end_time": "mock_end_time2"},
#         {"start_time": "mock_start_time3", "end_time": "mock_end_time3"}
#     ]
#     with patch(
#         "application.database.db_functions.parking_space_functions.PSI.read_ps_by_current_car_id"
#     ), patch(
#         "application.database.db_functions.parking_space_functions.PSI.update_ps_current_car_id"
#     ), patch(
#         "application.database.db_functions.parking_space_functions.PSI.update_ps_occupied"
#     ), patch(
#         "application.database.db_functions.parking_space_functions.PSI.read_ps_history",
#         return_value=history
#     ), patch(
#         "application.database.db_functions.parking_space_functions.PSI.update_ps_history"
#     ):
        
# @patch('application.database.db_functions.parking_space_functions.PSI.read_ps_by_current_car_id')
# @patch('application.database.db_functions.parking_space_functions.PSI.update_ps_current_car_id')
# @patch('application.database.db_functions.parking_space_functions.PSI.update_ps_occupied')
# @patch('application.database.db_functions.parking_space_functions.PSI.read_ps_history')
# @patch('application.database.db_functions.parking_space_functions.PSI.update_ps_history')
# def test_leave_car(mock_update_ps_history, mock_read_ps_history, mock_update_ps_occupied, mock_update_ps_current_car_id, mock_read_ps_by_current_car_id):
#     # Mock the current time
#     # mock_now.return_value = datetime(2023, 1, 1, 12, 0, 0)
#     mock_now = datetime.now()
#     # Mock the database interactions
#     mock_read_ps_by_current_car_id.return_value = {"space_id": "123"}
#     mock_update_ps_current_car_id.return_value = None
#     mock_update_ps_occupied.return_value = None
#     mock_read_ps_history.return_value = [
#         {"start_time": datetime(2023, 1, 1, 10, 0, 0), "end_time": None},
#         {"start_time": datetime(2023, 1, 1, 11, 0, 0), "end_time": mock_now},
#     ]
#     mock_update_ps_history.return_value = None

#     # Call the function with the test input
#     result = leave_car("CAR001")

#     # Assert that the actual result is the expected result
#     assert result == timedelta(hours=1)

#     # Assert that the database functions were called with the expected arguments
#     mock_update_ps_current_car_id.assert_called_once_with("123", None)
#     mock_update_ps_occupied.assert_called_once_with("123", False)
#     mock_update_ps_history.assert_called_once_with("123", [
#         {"start_time": datetime(2023, 1, 1, 10, 0, 0), "end_time": datetime(2023, 1, 1, 12, 0, 0)},
#         {"start_time": datetime(2023, 1, 1, 11, 0, 0), "end_time": None},
#     ])
