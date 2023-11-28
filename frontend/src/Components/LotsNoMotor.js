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
import ParkingEnterModal from './ParkingModal';
import { useState } from 'react';

export default function LotsNoMotor() {
  const lotsCnt = 20;
  const lotsType = 'motors';
  const mockLots = [
    {
      lotId: '1',
      isEmpty: true,
      lotType: 'normal',
      floor: 1,
      status: true,
      history: [],
    },
    // {
    //   lotId: '2',
    //   isEmpty: false,
    //   lotType: 'disable',
    //   floor: 1,
    //   status: true,
    //   history: [],
    // },
    {
      lotId: '2',
      isEmpty: false,
      lotType: 'priority',
      floor: 1,
      status: true,
      history: [],
    },
    {
      lotId: '3',
      isEmpty: false,
      lotType: 'normal',
      floor: 1,
      status: true,
      history: [],
    },
    {
      lotId: '4',
      isEmpty: true,
      lotType: 'normal',
      floor: 1,
      status: true,
      history: [],
    },
  ];
  // console.log(mockLots);

  // Duplicate each element 20 times
  const motorLots = [];
  const carLots = [];
  const numberOfDuplicates = 10;
  const isEmptyColor = '#A3C561';
  const isOccupiedColor = '#9E896A';
  const bgColor = '#F0EFE5';

  // modal setting
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endModalOpen, setEndModelOpen] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // modal

  mockLots.forEach(lot => {
    for (let i = 0; i < numberOfDuplicates; i++) {
      motorLots.push({ ...lot });
      carLots.push({ ...lot });
    }
  });

  const allLots = [carLots, carLots, carLots];
  // console.log(duplicatedLots);
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
                          bg={lot.isEmpty ? isEmptyColor : isOccupiedColor}
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
