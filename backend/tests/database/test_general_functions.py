import datetime

import pytest
from application.database.db_functions.general_functions import datetime_delta_to_str, now

# def test_now():
#     # Get the current datetime when the function is called
#     current_time = datetime.datetime.now()

#     # Call the now function
#     result = now()

#     # Check if the result is a datetime object
#     assert isinstance(result, datetime.datetime)

#     # Check if the result is close to the current time (within a small tolerance)
#     # This accounts for any slight delay between calling datetime.datetime.now() and the now function
#     time_difference = result - current_time
#     assert abs(time_difference.total_seconds()) < 1.0


def test_datetime_delta_to_str():
    # Test case 1: Check for a positive time delta
    delta1 = datetime.timedelta(days=2, hours=5, minutes=30)
    result1 = datetime_delta_to_str(delta1)
    assert result1 == "53 小時 30 分"

    # Test case 2: Check for a time delta with only minutes
    delta2 = datetime.timedelta(minutes=45)
    result2 = datetime_delta_to_str(delta2)
    assert result2 == "0 小時 45 分"

    # Test case 3: Check for a time delta with only hours
    delta3 = datetime.timedelta(hours=12)
    result3 = datetime_delta_to_str(delta3)
    assert result3 == "12 小時 0 分"

    # Test case 4: Check for a time delta with 0 hours and 0 minutes
    delta4 = datetime.timedelta(days=3)
    result4 = datetime_delta_to_str(delta4)
    assert result4 == "72 小時 0 分"
