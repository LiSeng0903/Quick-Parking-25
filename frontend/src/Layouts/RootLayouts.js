import {
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Navbar from '../Components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

// components
import Lots from '../Components/lot/Lots';

export default function RootLayout(props) {
  console.log('parking lots in root',props.parkingMap)
  return (
    <Grid bg="#F0EFE5">
      <GridItem
        as="main"
        p={10}
        width="100vw"
        height={'100vh'}
        bg="#F0EFE5"
        h="100vh"
      >
        <Navbar setSelectedFloor={props.setSelectedFloor} selectedFloor={props.selectedFloor}/>
        <Lots parkingMap={props.parkingMap}/>
        <Outlet />
      </GridItem>
    </Grid>
  );
}
