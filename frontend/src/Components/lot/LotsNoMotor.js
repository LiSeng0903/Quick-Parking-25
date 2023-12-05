import {
  Stack,
  Box,
  Wrap,
  WrapItem,
  Button,
  ChakraProvider,
} from '@chakra-ui/react';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import ParkingEnterModal from '../modal/ParkingModal';
import { useState } from 'react';

export default function LotsNoMotor(props) {
  const parkingMap = props.parkingMap;
  const zoneA = parkingMap['A'];
  const zoneB = parkingMap['B'];
  const zoneC = parkingMap['C'];

  const isEmptyColor = '#A3C561';
  const isOccupiedColor = '#9E896A';
  const bgColor = '#F0EFE5';

  // modal setting
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endModalOpen, setEndModelOpen] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // modal

  const allLots = [zoneA, zoneB, zoneC];
  return (
    <ChakraProvider>
      <Box
        display={'flex'}
        flexDirection={'row'}
        bg={bgColor}
        // h="100vh"
        // w={'100vw'}
        padding={5}
        maxHeight={'80vh'}
        height={'80vh'}
        maxWidth={'100vw'}
      >
        {/* Pop-out Modal Section */}
        {isOpen || !endModalOpen ? (
          <ParkingEnterModal
            isOpen={isOpen}
            onClose={onClose}
            initialRef={initialRef}
            finalRef={finalRef}
            endModalOpen={endModalOpen}
            setEndModelOpen={setEndModelOpen}
          />
        ) : (
          <></>
        )}
        {/* Left Section */}
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'40%'}
          justifyContent={'center'}
        >
          <Box
            borderWidth="1px"
            borderRadius="lg"
            display={'flex'}
            height={'30vh'}
            justifyContent={'center'}
            alignItems={'center'}
            marginTop={'5vh'}
            marginBottom={'10vh'}
          >
            {/* <Box width={'80%'}>繳費機</Box> */}
          </Box>
        </Box>
        {/* Right Section */}
        <Box>
          {allLots.map((lots, cnt) => (
            <React.Fragment key={cnt}>
              {/* Zone Section */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                width={'70vw'}
                margin={'2vh'}
                overflow={'scroll'}
                borderColor={isOccupiedColor}
              >
                <Box width={'100%'} bg={'white'} color={'black'}>
                  ZONE
                </Box>
                <Stack direction="column">
                  <Wrap spacing={1}>
                    {lots.map(lot => (
                      <WrapItem key={lot.lotId} width={'3vw'} margin={'1px'}>
                        <Button
                          bg={lot.occupied ? isOccupiedColor : isEmptyColor}
                          width={'1vw'}
                          height={'8vh'}
                          variant={'solid'}
                          onClick={onOpen}
                        >
                          {/* {lot.isEmpty ? 'isEmpty' : 'isNotEmpty'} */}
                        </Button>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Stack>
              </Box>
              {/* <Text>單行道</Text> */}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
}
