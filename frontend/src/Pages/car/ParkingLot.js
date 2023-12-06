import { Grid, Box } from '@chakra-ui/react';
import RootLayout from '../../Layouts/RootLayouts';
import OthersLayout from '../../Layouts/OthersLayouts';
import { useState, useEffect } from 'react';
import { getFloorMap } from '../../api';

const ParkingLot = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [parkingMap, setParkingMap] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFloorMap(selectedFloor);
        setParkingMap(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); 
  }, [selectedFloor]);
  return (
    <Grid>
      {selectedFloor === 1 ? (
        <RootLayout setSelectedFloor={setSelectedFloor} selectedFloor={selectedFloor} parkingMap = {parkingMap}/>
      ) : (
        <OthersLayout setSelectedFloor={setSelectedFloor} selectedFloor={selectedFloor} parkingMap = {parkingMap}/>
      )}
      {/* <Box>我是停車格</Box> */}
    </Grid>
  );
};

export default ParkingLot;
