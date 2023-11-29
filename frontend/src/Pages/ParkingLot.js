import { Grid, Box } from '@chakra-ui/react';
import RootLayout from "../Layouts/RootLayouts";
import OthersLayout from "../Layouts/OthersLayouts"
import { useState } from 'react';

const ParkingLot = () => {
    const [selectedFloor, setSelectedFloor] = useState(1);
    console.log('This is the parking lot page...')
    return (
      <Grid>
        {selectedFloor === 1 ? <RootLayout setSelectedFloor = {setSelectedFloor}/> : <OthersLayout setSelectedFloor = {setSelectedFloor}/>}
        {/* <Box>我是停車格</Box> */}
      </Grid>
    );
}

export default ParkingLot;