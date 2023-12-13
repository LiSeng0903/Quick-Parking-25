import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  HStack,
  LightMode,
} from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './Redux/store.js';
import { AuthContext } from './protect.js';
import Homepage from './Pages/homepage/Homepage.js';
import ParkingLot from './Pages/car/ParkingLot.js';
import FindCar from './Pages/car/FindCar.js';
import FindCarResult from './Pages/car/FindCarResult.js';
import Login from './Pages/guard/Login.js';
import Dashboard from './Pages/guard/Dashboard.js';
import Sidebar from './Components/sidebar/Sidebar.js';
import Search from './Pages/guard/Search.js';
import Map from './Pages/guard/Map.js';
import ProtectedRoute from './utils/ProtectedRoute.js';
import { getAllFloors, getFloorMap } from './api.js';

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Homepage />} />
      <Route path="home" element={<Homepage />} />
      <Route
        path="parking-lot"
        element={<ParkingLot getFloorAPI={getFloorMap} />}
      />
      <Route path="find-car" element={<FindCar />} />
      <Route path="find-car/result" element={<FindCarResult />} />
      <Route path="guard/login" element={<Login />} />
      <Route
        path="guard/dashboard"
        element={
          <ChakraProvider>
            {/* <ProtectedRoute> */}
            <Sidebar />
            <Dashboard />
            {/* </ProtectedRoute> */}
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
            <Map getFloorAPI={getFloorMap} />
          </ChakraProvider>
        }
      />
    </Route>
  )
);

function App() {
  // const [user, setUser] = useState(null);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   async function loginStatus() {
  //     const status = await getLoginStatus();
  //     dispatch(SET_LOGIN(status));
  //   }
  //   loginStatus();
  // }, [dispatch]);
  return (
    // <Provider store={store}>
      <ChakraProvider theme={theme}>
        <LightMode>
          <Box textAlign="center" fontSize="xl" bg="#F0EFE5" h="100vh">
            <Grid>
              <HStack>
                <RouterProvider router={router} />
              </HStack>
            </Grid>
          </Box>
        </LightMode>
      </ChakraProvider>
    // </Provider>
  );
}

export default App;
