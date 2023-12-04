import { Grid, Box } from '@chakra-ui/react';
import RootLayout from "../Layouts/RootLayouts";
import OthersLayout from "../Layouts/OthersLayouts"
import { useState, useEffect } from 'react';

const ParkingLot = () => {
    const [selectedFloor, setSelectedFloor] = useState(1);
    const [parkingMap, setParkingMap] = useState({});
    useEffect(() => {
      fetch('/api/parking/map/' + selectedFloor).then(res =>
        res.json().then(data => {
          setParkingMap(data);
        })
      );
      // fetch('/api/car/enterNum', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     "spaceId": "1001",
      //     "carId": "BEP-1255"
      //   }),
      // }
      // );
      console.log(parkingMap)
    }, [selectedFloor]);
    console.log('This is the parking lot page...')
    return (
      <Grid>
        {selectedFloor === 1 ? <RootLayout setSelectedFloor = {setSelectedFloor} parkingMap={parkingMap}/> : <OthersLayout setSelectedFloor = {setSelectedFloor} parkingMap={parkingMap}/>}
        {/* <Box>我是停車格</Box> */}
      </Grid>
    );
}

export default ParkingLot;