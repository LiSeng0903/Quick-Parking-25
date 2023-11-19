import { Grid, GridItem, Stack, Box, Wrap, WrapItem, Button, ButtonGroup } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

// components
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Lots from '../Components/Lots';

export default function RootLayout() {
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
      <GridItem as="main" colSpan={{ base: 6, lg: 4, xl: 5 }} p="40px" width="100vw" height="100%">
        <Navbar />
        <Lots />
        <Outlet />
      </GridItem>
    </Grid>
  );
}
