import json
from flask import Flask, jsonify
from app.application.services import *

app = Flask(__name__)

# 取得停車場概覽資料
@app.route("/api/parking/status")
def getParkingStatus():
    status = get_parking_info()
    return json.dumps(status)

@app.route("/api/parking/map/<int:floor>", methods=['GET'])
def getFloorMap(floor):
    return f"get floor {floor} map"

if __name__ == "__main__":
    app.run(debug=True, port=8000)