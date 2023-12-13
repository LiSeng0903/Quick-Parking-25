import { ChakraProvider, Box } from '@chakra-ui/react';
import RootLayout from '../../Layouts/RootLayouts';
import ParkingLot from '../car/ParkingLot';
import { getAllFloors } from '../../api';

const Map = ({getFloorAPI}) => {
  return (
    <ChakraProvider>
      <Box scale={'10%'}>
        <ParkingLot getFloorAPI={getFloorAPI} />
      </Box>
    </ChakraProvider>
  );
};

export default Map;
