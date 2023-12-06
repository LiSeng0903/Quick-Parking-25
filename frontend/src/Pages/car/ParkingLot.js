import { Grid, Box } from '@chakra-ui/react';
import RootLayout from '../../Layouts/RootLayouts';
import OthersLayout from '../../Layouts/OthersLayouts';
import { useState, useEffect } from 'react';
import { getFloorMap } from '../../api';

const ParkingLot = () => {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [parkingMap, setParkingMap] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFloorMap(selectedFloor);
        setParkingMap(data);
        setIsDataLoaded(true);
        console.log('parking lots in fetch', data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); 
  }, [selectedFloor]);
  return (
    <Grid>
      {selectedFloor === 1 ? (
        isDataLoaded && (
          <RootLayout
            setSelectedFloor={setSelectedFloor}
            selectedFloor={selectedFloor}
            parkingMap={parkingMap}
          />
        )
      ) : (
        <OthersLayout setSelectedFloor={setSelectedFloor} selectedFloor={selectedFloor}/>
      )}
      {/* <Box>我是停車格</Box> */}
    </Grid>
  );
  
};

export default ParkingLot;
