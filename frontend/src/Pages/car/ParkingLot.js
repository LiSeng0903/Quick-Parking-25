import { Grid, Box } from '@chakra-ui/react';
import RootLayout from '../../Layouts/RootLayouts';
import OthersLayout from '../../Layouts/OthersLayouts';
import { useState, useEffect } from 'react';
import { getFloorMap } from '../../api';
import { IoConstructOutline } from 'react-icons/io5';

const ParkingLot = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [parkingMap, setParkingMap] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [parkingLotsDataLen, setParkingLotsDataLen] = useState(5)

  // 在 ParkingLot.js 中
  const fetchData = async floor => {
    try {
      const data = await getFloorMap(floor);
      setParkingLotsDataLen(Object.keys(data).length);
      setParkingMap(data);
      setIsDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  // 在 ParkingLot.js 中
  useEffect(() => {
    fetchData(selectedFloor);
  }, [selectedFloor]);

  return (
    <Grid>
      {parkingLotsDataLen === 5 ? (
        isDataLoaded && (
          <RootLayout
            setSelectedFloor={setSelectedFloor}
            selectedFloor={selectedFloor}
            parkingMap={parkingMap}
            fetchData={fetchData}
          />
        )
      ) : (
        <OthersLayout
          setSelectedFloor={setSelectedFloor}
          selectedFloor={selectedFloor}
          parkingMap={parkingMap}
          fetchData={fetchData}
        />
      )}
      {/* <Box>我是停車格</Box> */}
    </Grid>
  );
};

export default ParkingLot;
