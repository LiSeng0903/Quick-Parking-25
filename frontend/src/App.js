import React from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import Homepage from './Pages/Homepage.js';
import ParkingLot from './Pages/ParkingLot';
// import RootLayout from './Layouts/'
// import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Homepage />} />
      <Route path="home" element={<Homepage />} />
      <Route path="parking-lot" element={<ParkingLot />} />
    </Route>
  )
);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" bg="#F0EFE5" h="100vh">
        <Grid maxH="80vh">
          {/* <ColorModeSwitcher justifySelf="flex-end" m={5} /> */}
          <VStack>
            <RouterProvider router={router} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
