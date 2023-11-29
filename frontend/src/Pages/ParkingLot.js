import { Grid, Box } from '@chakra-ui/react';
import RootLayout from "../Layouts/RootLayouts";
import OthersLayout from "../Layouts/OthersLayouts"
import { useState, useEffect } from 'react';

const ParkingLot = () => {
    const [selectedFloor, setSelectedFloor] = useState(1);
    useEffect(() => {
      fetch('/api/parking/map/' + selectedFloor).then(res =>
        res.json().then(data => {
          console.log(data);
        })
      );
    }, [selectedFloor]);
    console.log('This is the parking lot page...')

    return (
      <Grid>
        {selectedFloor === 1 ? <RootLayout setSelectedFloor = {setSelectedFloor}/> : <OthersLayout setSelectedFloor = {setSelectedFloor}/>}
        {/* <Box>我是停車格</Box> */}
      </Grid>
    );
}

export default ParkingLot;