import axios from 'axios';
import { getAuthToken } from './utils/util';
import { toast } from 'react-toastify';

// const instance = axios.create({ baseURL: 'http://127.0.0.1:5000/api' });

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

// const carExit = async carId => {
//   try {
//     const response = await instance.get(`/car/exit`, { params: { carId } });
//     if (response.data.success) {
//       console.log(`Car with number ${carId} left successfully.`);
//     } else {
//       console.log(`Car with number ${carId} left failed.`);
//     }
//   } catch (error) {
//     console.log(`Error for car number ${carId} to leave. ${error}`);
//     throw error;
//   }
// };

/**
 * Get some hash.
 * @param {*} account
 * @param {*} password
 */
const guardLogIn = async userData => {
  try {
    const response = await fetch('/api/guard/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    if (response.ok) {
      if (responseData.success) {
        console.log(`Guard ${userData.account} login successfully.`);
        toast.success('Login Successfully...');
        localStorage.setItem('token', responseData.access_token);
        return responseData;
      }
    } else {
      console.log(`Guard ${userData.account} login failed.`);
      console.log(userData, JSON.stringify(userData));
      // return responseData;
      throw new Error(
        `Guard ${userData.account} login failed. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.log(`Error for guard ${userData.account} to login. ${error}`);
    throw error;
  }
};


const getGuardFloorMap = async selectedFloor => {
  try {
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    if (!accessToken) {
      // Handle the case when the access token is not available
      throw new Error('Access token not available');
    }

    const response = await fetch('/api/guard/map/' + selectedFloor, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    const data = await response.json();
    return data; // return map for guard of selected floor
  } catch (error) {
    console.log(`Error getting map for guard of floor ${selectedFloor}.`);
    throw error;
  }
};

const getGuardCarSpace = async carSpaceId => {
  
  try {
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    if (!accessToken) {
      // Handle the case when the access token is not available
      throw new Error('Access token not available');
    }

    const response = await fetch('/api/guard/check/' + carSpaceId, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data; // return map of selected floor
  } catch (error) {
    console.log(
      `Error getting car or park grid information for guard. ${error}`
    );
    throw error;
  }
};

const getAllFloors = async () => {
  try {
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    if (!accessToken) {
      // Handle the case when the access token is not available
      throw new Error('Access token not available');
    }

    const response = await fetch('/api/guard/allFloors', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data; // return map of selected floor
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
  // carExit,
  guardLogIn,
  getGuardFloorMap,
  getGuardCarSpace,
  getAllFloors,
};
