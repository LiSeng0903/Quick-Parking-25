import {
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Navbar from '../Components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

// components
import Lots from '../Components/lot/Lots';

export default function RootLayout(props) {
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
        <Navbar setSelectedFloor={props.setSelectedFloor} />
        <Lots />
        <Outlet />
      </GridItem>
    </Grid>
  );
}
