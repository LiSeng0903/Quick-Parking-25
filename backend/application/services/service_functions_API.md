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
