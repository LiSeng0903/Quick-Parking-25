import datetime


def now(add_eight=True):
    """取得目前的時間"""

    if add_eight:
        return datetime.datetime.now() + datetime.timedelta(hours=8)
    else:
        return datetime.datetime.now()


def datetime_delta_to_str(dt):
    """將 datetime.delta 轉換成字串"""

    return f"{dt.days * 24 + dt.seconds // 3600} 小時 {dt.seconds % 3600 // 60} 分"
