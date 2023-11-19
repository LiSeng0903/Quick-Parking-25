import { Grid, Box } from '@chakra-ui/react';
import RootLayout from "../Layouts/RootLayouts";

const ParkingLot = () => {
    console.log('This is the parking lot page...')

    return (
      <Grid>
        <RootLayout />
        {/* <Box>我是停車格</Box> */}
      </Grid>
    );
}

export default ParkingLot;