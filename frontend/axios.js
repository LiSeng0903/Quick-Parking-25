import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:4000/api' });

const getParkingStatus = async () => {
  try {
    const response = await instance.get('/parking/status');
    return response.data; // return number of parking grid left
  } catch (error) {
    console.log(`Error getting parking status. ${error}`);
    throw error;
  }
};

const getFloorMap = async floor => {
  try {
    const response = await instance.get(`/parking/map/${floor}`, {
      params: { floor },
    });
    return response.data; // retrun map of selected floor
  } catch (error) {
    console.log(`Error getting map of floor ${floor}. ${error}`);
    throw error;
  }
};

const enterCarNum = async (carId, carSpaceId) => {
  try {
    const response = await instance.post('/car/enterNum', {
      carId,
      carSpaceId,
    });
    if (response.data.success) {
      console.log(
        `Car with number ${carId} entered successfully into parking space ${carSpaceId}.`
      );
      return { statusCode };
    } else {
      console.log(
        `Entering car with number ${carId} into parking space ${carSpaceId} failed.`
      );
      return { statusCode };
    }
  } catch (error) {
    console.log(
      `Error entering car number ${carId} into parking space ${carSpaceId}. ${error}`
    );
    throw error;
  }
};

const getCarSpace = async carId => {
  try {
    const response = await instance.get(`/car/find/${carId}`, {
      params: { carId },
    });
    return response.data; //return carSpaceId
  } catch (error) {
    console.log(`Error getting parking space the car number ${carId} parked`);
  }
};

const carExit = async carId => {
  try {
    const response = await instance.get(`/car/exit`, { params: { carId } });
    if (response.data.success) {
      console.log(`Car with number ${carId} left successfully.`);
      return { statusCode };
    } else {
      console.log(`Car with number ${carId} left failed.`);
      return { statusCode };
    }
  } catch (error) {
    console.log(`Error for car number ${carId} to leave. ${error}`);
    throw error;
  }
};

const carParkIn = async carSpaceId => {
  try {
    const response = await instance.post('/car/park', { carSpaceId });
    if (response.data.success) {
      console.log(`Park space ${carSpaceId} was parked successfully.`);
      return { statusCode };
    } else {
      console.log(`Park space ${carSpaceId} was parked failed.`);
      return { statusCode };
    }
  } catch (error) {
    console.log(`Error for park space ${carSpaceId} be parked. ${error}`);
    throw error;
  }
};

const guardLogIn = async (account, passward) => {
  try {
    const response = await instance.get('/guard/login', {
      params: { account, password },
    });
    if (response.data.success) {
      console.log(`Guard ${account} login successfully.`);
      return { statusCode };
    } else {
      console.log(`Guard ${account} login failed.`);
      return { statusCode };
    }
  } catch (error) {
    console.log(`Error for guard ${account} to login. ${error}`);
    throw error;
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
    const response = await instance.get(`guard/check/${carSpace}`, {
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
    const response = await instance.get('guard/allFloors');
    return response.data; // return information for all floors
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
  carParkIn,
  guardLogIn,
  getGuardFloorMap,
  getGuardCarSpace,
  getAllFloors
};