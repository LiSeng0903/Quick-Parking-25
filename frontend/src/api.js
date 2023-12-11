import axios from 'axios';

const instance = axios.create({ baseURL: 'http://127.0.0.1:5000/api' });

const getParkingStatus = async () => {
  try {
    const response = await fetch('api/parking/status');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error getting parking status. ${error.message}`);
    throw error;
  }
};

const getFloorMap = async selectedFloor => {
  try {
    const response = await fetch('/api/parking/map/' + selectedFloor);
    const data = await response.json();
    return data; // retrun map of selected floor
  } catch (error) {
    console.log(
      `Error getting map of floor ${selectedFloor}. ${selectedFloor}`
    );
    throw error;
  }
};

const enterCarNum = async (carSpaceId, carId) => {
  try {
    const response = await fetch('/api/car/enterNum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spaceId: carSpaceId,
        carId: carId,
      }),
    });
    const data = await response.json();
    if (data.success) {
      console.log(
        `Car with number ${carId} entered successfully into parking space ${carSpaceId}.`
      );
    } else {
      console.log(
        `Entering car with number ${carId} into parking space ${carSpaceId} failed.`
      );
    }
  } catch (error) {
    console.log(
      `Error entering car number ${carId} into parking space ${carSpaceId} on floor. ${error}`
    );
    throw error;
  }
};

const getCarSpace = async (carId, carSpaceId) => {
  try {
    const response = await fetch('/api/car/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spaceId: carSpaceId,
        carId: carId,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(`Error getting parking space the car number ${carId} parked`);
    throw error;
  }
};

const carExit = async carId => {
  try {
    const response = await instance.get(`/car/exit`, { params: { carId } });
    if (response.data.success) {
      console.log(`Car with number ${carId} left successfully.`);
    } else {
      console.log(`Car with number ${carId} left failed.`);
    }
  } catch (error) {
    console.log(`Error for car number ${carId} to leave. ${error}`);
    throw error;
  }
};

/**
 * Get some hash.
 * @param {*} account
 * @param {*} password
 */

//  Guard Login 應該是 POST 嗎？
const guardLogIn = async (account, password) => {
  try {
    const response = await fetch('/guard/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: account,
        password: password,
      }),
    });
    if (response.data.success) {
      console.log(`Guard ${account} login successfully.`);
      localStorage.setItem('token', response.data.access_token);
    } else {
      console.log(`Guard ${account} login failed.`);
    }
  } catch (error) {
    console.log(`Error for guard ${account} to login. ${error}`);
    throw error;
  }
};

// 使用存儲的 token 進行其他請求
const fetchDataWithToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    // 將 token 加入請求的 Authorization header
    fetch('/protected', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('受保護的資源:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    console.log('沒有找到 token');
  }
};

const getGuardFloorMap = async floor => {
  try {
    const response = await instance.get(`/guard/map/${floor}`, {
      params: { floor },
    });
    return response.data; // retrun map for guard of selected floor
  } catch (error) {
    console.log(`Error getting map for guard of floor ${floor}. ${error}`);
    throw error;
  }
};

const getGuardCarSpace = async (carId, carSpaceId) => {
  try {
    const response = await instance.get(`guard/check/${carSpaceId}`, {
      params: { carId, carSpaceId },
    });
    return response.data; // retrun car or park grid information for guard
  } catch (error) {
    console.log(
      `Error getting car or park grid information for guard. ${error}`
    );
    throw error;
  }
};

const getAllFloors = async () => {
  try {
    const response = await fetch('/api/guard/allFloors');
    const data = await response.json();
    return data; // retrun map of selected floor
  } catch (error) {
    console.log(`Error getting information for all floors. ${error}`);
    throw error;
  }
};

export {
  getParkingStatus,
  getFloorMap,
  enterCarNum,
  getCarSpace,
  carExit,
  guardLogIn,
  getGuardFloorMap,
  getGuardCarSpace,
  getAllFloors,
};
