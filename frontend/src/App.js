import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  HStack,
} from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Homepage from './Pages/homepage/Homepage.js';
import ParkingLot from './Pages/car/ParkingLot.js';
import FindCar from './Pages/car/FindCar.js';
import FindCarResult from './Pages/car/FindCarResult.js';
import Login from './Pages/guard/Login.js';
import Dashboard from './Pages/guard/Dashboard.js';
import Sidebar from './Components/sidebar/Sidebar.js';
import Search from './Pages/guard/Search.js';
import Map from './Pages/guard/Map.js';

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Homepage />} />
      <Route path="home" element={<Homepage />} />
      <Route path="parking-lot" element={<ParkingLot />} />
      <Route path="find-car" element={<FindCar />} />
      <Route path="find-car/result" element={<FindCarResult />} />
      <Route path="login" element={<Login />} />
      <Route
        path="guard/dashboard"
        element={
          <ChakraProvider>
            <Sidebar />
            <Dashboard />
          </ChakraProvider>
        }
      />
      <Route
        path="guard/search"
        element={
          <ChakraProvider>
            <Sidebar />
            <Search />
          </ChakraProvider>
        }
      />
      <Route
        path="guard/map"
        element={
          <ChakraProvider>
            <Sidebar />
            <Map />
          </ChakraProvider>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg="#F0EFE5" h="100vh">
        <Grid>
          <HStack>
            <RouterProvider router={router} />
          </HStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
