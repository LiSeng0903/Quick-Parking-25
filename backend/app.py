import json
from flask import Flask, jsonify, request
# from app.application.services import *
# from app.application.services.get_status import get_parking_info
# from app.application.services.service_functions import *
# from application.services.get_status import get_parking_info
from app.application.services.service_functions import *

app = Flask(__name__)

# 取得停車場概覽資料
@app.route("/api/parking/status", methods=['GET'])
def getParkingStatus():
    status = get_parking_infos()
    return json.dumps(status)

@app.route("/api/parking/map/<int:floor>", methods=['GET'])
def getFloorMap(floor):
    floor_data = get_space_by_floor(floor)
    return floor_data

@app.route("/api/car/enterNum", methods=['POST'])
def parkCar():
    data = request.get_json()
    car_id = data['carId']
    space_id = str(data['spaceId'])
    isSuceess, msg = park_car(space_id, car_id)
    return isSuceess, msg

if __name__ == "__main__":
    app.run(debug=True, port=4000)