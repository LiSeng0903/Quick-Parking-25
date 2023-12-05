import {
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Navbar from '../Components/navbar/Navbar';

// components
import LotsNoMotor from '../Components/lot/LotsNoMotor';

export default function SecLayout(props) {
  return (
    <Grid templateColumns="repeat(6, 1fr)" bg="gray.50">
      {/* sidebar */}
      <GridItem
        as="main"
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
