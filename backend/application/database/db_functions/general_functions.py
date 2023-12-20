import datetime


def now():
    """取得目前的時間"""

    return datetime.datetime.now() + datetime.timedelta(hours=8)


def datetime_delta_to_str(dt):
    """將 datetime.delta 轉換成字串"""

    return f"{dt.days * 24 + dt.seconds // 3600} 小時 {dt.seconds % 3600 // 60} 分"
