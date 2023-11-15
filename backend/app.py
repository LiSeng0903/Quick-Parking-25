from flask import Flask, jsonify

app = Flask(__name__)

# 取得停車場概覽資料
@app.route("api/parking/status")
def getParkingStatus():
    status = {
        "car": 200,
        "motor": 150,
    }
    return jsonify(status)