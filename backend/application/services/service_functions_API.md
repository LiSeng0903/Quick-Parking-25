# Function 使用方式

先引入函式所在 python 檔

```
import service_functions as ser_func
```

呼叫可以使用的函式

```
ser_func.get_parking_infos()
```

# 函式 API 說明

## `get_parking_infos()`

取得停車場的資訊，包含「汽車車位、機車車位、優先車位剩下的數量」、「公告訊息」

### Input

```
None
```

### Output

```
{
    "car": int,
    "motor": int,
    "priority": int,
    "msgs": list,
}
```

## `get_space_by_floor( floor )`

取得某層樓的停車位資訊，包含所屬區域、停車位編號、停車位類型、是否使用中

### Input

```
floor: int
```

### Output

```
{
    "A":[
        {
            "space_id": str, 
            "space_type": str,
            "occupied": bool
        }
    ]
    "B":[
        ...
    ]
}
```

## `park_car( space_id, car_id )`

### Input

```
space_id: str, 停車位編號
car_id: str, 要停車的車牌號
```

### Output

```
success, msg

success: bool, 成功與否
msg: 成功/失敗訊息。
```

### 其他說明

可能的狀況有三

1. 要停的停車位不存在（好好用介面的話應該不會發生）
   ```
   False, "停車位 XXX 不存在"
   ```
2. 要停的停車位占用中
   ```
   False, "停車位 XXX 已被佔用"
   ```
3. 要停的車已經停在其他停車位中
   ```
   False, "車輛 XXX 已經停在停車位 OOO 中"
   ```
4. 停車成功
   ```
   True, "車輛 XXX 已停入停車位 OOO"
   ```

## `find_car( space_id, car_id )`

### Input

```
space_id: str, 停車位編號
car_id: str, 車牌號
```

`space_id`, `car_id` 擇一即可。兩者都有且不一致時，以 `space_id` 為主。

### Output

```
{
    "spacesId": str,
    "floor": int,
    "carId": str,
    "parkTime": datetime.timedelta,
}
```

## `guard_get_space_info( space_id )`

### Input

```
space_id: str, 停車位編號
```

### Output

```
{
    "parkingSpaceId": str,
    "spaceType": "car" || "motor" || "priority",
    "currentCarId": str,
    "parkTime": datetime.timedelta,
    "status": "OK" || "WARNING" ,
    "history": [
        {
            "startTime": datetime,
            "carId": str,
            "endTime": datetime,
        },
        ...
    ],
}
```

## `guard_login( account, password )`

### Input

```
account: str, 帳號
password: str, 密碼
```

### Output

```
{
    "success": bool, 是否可以登入
    "message": str, 成功或失敗訊息
}
```

## `guard_get_parking_infos()`

### Input

```
None
```

### Output

```
{
    "car": int, 車子車位剩幾個
    "motor": int, 摩托車車位剩幾個
    "priority": int, 優先車位剩幾個
    "warningParkingSpaceIds": list[str], 異常狀態的車位編號
}
```
