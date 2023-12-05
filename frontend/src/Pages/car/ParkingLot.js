import { Grid, Box } from '@chakra-ui/react';
import RootLayout from '../../Layouts/RootLayouts';
import OthersLayout from '../../Layouts/OthersLayouts';
import { useState, useEffect } from 'react';
import { getFloorMap } from '../../axios';

const ParkingLot = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [parkingMap, setParkingMap] = useState({});

  const getParkingMap = async(selectedFloor) => {
    const returnData = await getFloorMap(selectedFloor);
    setParkingMap(returnData);
    console.log("return data", returnData);
    return returnData;
  }

  // useEffect(() => {
  //   getParkingMap(selectedFloor)
  // }, [selectedFloor]);
  // console.log('This is the parking lot page...');

  return (
    <Grid>
      {selectedFloor === 1 ? (
        <RootLayout setSelectedFloor={setSelectedFloor} selectedFloor={selectedFloor} parkingMap={getParkingMap(selectedFloor)}/>
      ) : (
        <OthersLayout setSelectedFloor={setSelectedFloor} selectedFloor={selectedFloor} parkingMap={getParkingMap(selectedFloor)}/>
      )}
      {/* <Box>我是停車格</Box> */}
    </Grid>
  );
};

export default ParkingLot;
