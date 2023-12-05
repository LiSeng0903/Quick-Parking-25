import { Grid, Box } from '@chakra-ui/react';
import RootLayout from '../../Layouts/RootLayouts';
import OthersLayout from '../../Layouts/OthersLayouts';
import { useState, useEffect } from 'react';
import { getFloorMap } from '../../axios';

const ParkingLot = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [parkingMap, setParkingMap] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFloorMap(selectedFloor);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); 

    // fetch('/api/parking/map/' + selectedFloor).then(res =>
    //   res.json().then(data => {
    //     console.log(data);
    //   })
    // );
  }, [selectedFloor]);
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
