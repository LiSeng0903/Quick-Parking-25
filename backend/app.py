import os
import sys
cwd = os.getcwd()
sys.path.append(cwd)
import json
from flask import Flask, jsonify, request, send_from_directory
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from dotenv import load_dotenv
from application.services.service_functions import *

load_dotenv()

app = Flask(__name__, static_folder='../frontend/build')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
jwt = JWTManager(app)

@app.route("/")
def index():
    return send_from_directory('../frontend/build', 'index.html')

@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory("../frontend/build/static", filename)

# 取得停車場概覽資料
@app.route("/api/parking/status", methods=['GET'])
def getParkingStatus():
    status = get_parking_info()
    return json.dumps(status)

@app.route("/api/parking/map/<int:floor>", methods=['GET'])
def getFloorMap(floor):
    floor_data = get_space_by_floor(floor)
    return json.dumps(floor_data)

@app.route("/api/car/enterNum", methods=['POST'])
def parkCar():
    data = request.get_json()
    car_id = data['carId']
    space_id = str(data['spaceId'])
    isSuccess, msg = park_car(space_id, car_id)
    response = jsonify({'success': isSuccess, 'message': msg})
    
    return response

@app.route("/api/car/find", methods=['POST'])
def findCar():
    data = request.get_json()
    space_id = str(data['spaceId'])
    car_id = data['carId']
    info = find_car(space_id, car_id)
    return json.dumps(info)

@app.route("/api/guard/check/<int:carSpace>", methods=['GET'])
@jwt_required()
def checkCar(carSpace):
    spaceStr = str(carSpace)
    info = guard_get_space_info(spaceStr)
    return json.dumps(info)

@app.route("/api/guard/login", methods=['POST'])
def guardLogin():
    data = request.get_json()
    account = data['account']
    password = data['password']
    can_login, msg = guard_login(account, password)
    if can_login:
        access_token = create_access_token(identity=account)
        response = jsonify({'success': can_login, 'message': msg, 'access_token': access_token})
    else:
        response = jsonify({'success': can_login, 'message': msg})
    return response

@app.route("/api/guard/allFloors", methods=['GET'])
@jwt_required()
def getAllFloors():
    parking_info = guard_get_parking_info()
    return json.dumps(parking_info)

@app.route("/api/guard/map/<int:floor>", methods=['POST'])
def getGuardFloorMap(floor):
    floor_data = guard_get_space_by_floor(floor)
    return json.dumps(floor_data)


if __name__ == "__main__":
    app.run(debug=True, port=4000)