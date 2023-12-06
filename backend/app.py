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
    isSuccess, msg = park_car(space_id, car_id)
    response = jsonify({'success': isSuccess, 'message': msg})
    
    return response

@app.route("/api/car/find", methods=['GET'])
def findCar():
    data = request.get_json()
    space_id = str(data['spaceId'])
    car_id = data['carId']
    info = find_car(space_id, car_id)
    return info

@app.route("/api/guard/check/<int:carSpace>", methods=['GET'])
def checkCar(carSpace):
    spaceStr = str(carSpace)
    info = guard_get_space_info(spaceStr)
    return info

@app.route("/api/guard/login", methods=['POST'])
def guardLogin():
    data = request.get_json()
    account = data['account']
    password = data['password']
    can_login, msg = guard_login(account, password)
    return can_login, msg

@app.route("/api/guard/allFloors", methods=['GET'])
def getAllFloors():
    parking_infos = guard_get_parking_info()
    return parking_infos

if __name__ == "__main__":
    app.run(debug=True, port=4000)