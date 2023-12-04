import json
from flask import Flask, jsonify, request
# from app.application.services import *
from app.application.services.get_status import get_parking_info
from app.database.db_functions import *

app = Flask(__name__)

# 取得停車場概覽資料
@app.route("/api/parking/status", methods=['GET'])
def getParkingStatus():
    status = get_parking_info()
    return json.dumps(status)

@app.route("/api/parking/map/<int:floor>", methods=['GET'])
def getFloorMap(floor):
    floor_data = get_floor_map(floor)
    return floor_data

@app.route("/api/parking/car/enterNum", methods=['POST'])
def carEnterNum():
    data = request.json
    space_Id = str(data['spaceId'])
    car_Id = data['carId']
    park(space_Id, car_Id)
    return "carEnterNum"

if __name__ == "__main__":
    app.run(debug=True, port=4000)