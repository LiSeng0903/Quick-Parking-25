import { Grid, GridItem, Stack, Box, Wrap, WrapItem, Button, ButtonGroup } from '@chakra-ui/react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';

// components
import Sidebar from '../Components/Sidebar';
import LotsNoMotor from '../Components/LotsNoMotor';

export default function SecLayout(props) {
  return (
    <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
      {/* sidebar */}
      {/* <GridItem
        as="aside"
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        bg="green.400"
        minHeight={{ lg: '100vh' }}
        p={{ base: '20px', lg: '30px' }}
      >
        <Sidebar />
      </GridItem> */}
      {/* main content & navbar */}
      <GridItem
        as="main"
        // colSpan={{ base: 6, lg: 4, xl: 5 }}
        p={10}
        width="100vw"
        height={'100vh'}
        bg="#F0EFE5"
        h="100vh"
      >
        <Navbar setSelectedFloor={props.setSelectedFloor} />
        <LotsNoMotor />
      </GridItem>
    </Grid>
  );
}
