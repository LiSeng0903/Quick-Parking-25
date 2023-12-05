import {
  Stack,
  Box,
  Wrap,
  WrapItem,
  Button,
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import ParkingEnterModal from '../modal/ParkingModal';
import { useState } from 'react';
// for test car lot info modal
import WarningLotModalModal from '../modal/WarningLotModal';
import ErrorLotModalModal from '../modal/WarningLotModal';
import NormalLotModalModal from '../modal/NormalLotModal';

export default function Lots() {
  const lotsCnt = 20;
  const lotsType = 'cars';
  const mockLots = [
    {
      space_id: '1001',
      occupied: true,
      current_car_id: 'BEP-1255',
      space_type: 'motor',
      floor: 1,
      status: 'OK',
      zone: 'A',
      history: [
        {
          start_time: {
            $date: '2023-11-29T12:45:35.872Z',
          },
          end_time: {
            $date: '2023-11-29T12:45:38.334Z',
          },
          car_id: 'BEP-1234',
        },
        {
          start_time: {
            $date: '2023-11-29T12:46:07.030Z',
          },
          car_id: 'BEP-1255',
        },
      ],
    },
    {
      space_id: '1010',
      occupied: false,
      current_car_id: '',
      space_type: 'car',
      floor: 2,
      status: 'OK',
      zone: 'B',
      history: [
        {
          start_time: {
            $date: '',
          },
          end_time: {
            $date: '',
          },
          car_id: '',
        },
        {
          start_time: {
            $date: '',
          },
          car_id: '',
        },
      ],
    },
    {
      space_id: '1059',
      occupied: true,
      current_car_id: 'B09705059',
      space_type: 'car',
      floor: 1,
      status: 'OK',
      zone: 'B',
      history: [
        {
          start_time: {
            $date: '2023-11-29T12:45:35.872Z',
          },
          end_time: {
            $date: '2023-11-29T12:45:38.334Z',
          },
          car_id: 'B09705059',
        },
        {
          start_time: {
            $date: '2023-11-29T12:46:07.030Z',
          },
          car_id: 'B09705059',
        },
      ],
    },
    {
      space_id: '1010',
      occupied: false,
      current_car_id: '',
      space_type: 'car',
      floor: 2,
      status: 'OK',
      zone: 'B',
      history: [
        {
          start_time: {
            $date: '',
          },
          end_time: {
            $date: '',
          },
          car_id: '',
        },
        {
          start_time: {
            $date: '',
          },
          car_id: '',
        },
      ],
    },
  ];
  // console.log(mockLots);

  // Duplicate each element 20 times
  const motorLots = [];
  const carLots = [];
  const numberOfDuplicates = 10; // mock lot 的重複次數
  const isEmptyColor = '#A3C561';
  const isOccupiedColor = '#9E896A';
  const bgColor = '#F0EFE5';

  mockLots.forEach(lot => {
    for (let i = 0; i < numberOfDuplicates; i++) {
      motorLots.push({ ...lot });
      carLots.push({ ...lot });
    }
  });

  const allLots = [carLots, carLots, carLots];
  const newMotorLots = motorLots.slice(0, 30);
  // console.log(duplicatedLots);

  // modal setting
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endModalOpen, setEndModelOpen] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // modal

  return (
    <ChakraProvider theme={theme}>
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
        {/* Pop-out Test Modal Section */}
        {/* {isOpen ? (
          <NormalLotModalModal
            isOpen={isOpen}
            onClose={onClose}
            initialRef={initialRef}
            finalRef={finalRef}
          />
        ) : (
          <></>
        )} */}
        {/* Left Section */}
        <Box
          width={'30%'}
          maxWidth={'30%'}
          overflow={'scroll'}
          padding={5}
          marginRight={5}
        >
          <Box
            borderWidth="1px"
            borderRadius="lg"
            display={'flex'}
            height={'10vh'}
            justifyContent={'center'}
            alignItems={'center'}
            // marginTop={'5vh'}
            marginBottom={'5vh'}
            borderColor={isOccupiedColor}
            color={'black'}
          >
            警衛室
          </Box>
          <Box display={'flex'} flexDirection={'row'}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              display={'flex'}
              justifyContent={'center'}
              borderColor={isOccupiedColor}
            >
              <Stack direction="row" width={'65%'}>
                <Wrap spacing={'3'} width={'100%'}>
                  {newMotorLots.map(lot => (
                    <WrapItem width={'2vw'} key={lot.lotId}>
                      <Button
                        // colorScheme="red"
                        bg={isEmptyColor}
                        width={'100%'}
                        height={'3vh'}
                        onClick={onOpen}
                      ></Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </Stack>
              <Box
                style={{
                  writingMode: 'vertical-rl',
                }}
                bg={'white'}
                color={'black'}
              >
                ZONE
              </Box>
            </Box>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              display={'flex'}
              justifyContent={'center'}
              borderColor={isOccupiedColor}
            >
              <Stack direction="row" width={'65%'}>
                <Wrap spacing={'3'} width={'100%'}>
                  {newMotorLots.map(lot => (
                    <WrapItem width={'2vw'} key={lot.lotId}>
                      <Button
                        // colorScheme="red"
                        bg={isOccupiedColor}
                        width={'100%'}
                        height={'3vh'}
                        onClick={onOpen}
                      ></Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </Stack>
              <Box
                style={{
                  writingMode: 'vertical-rl',
                }}
                bg={'white'}
                color={'black'}
              >
                ZONE
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Right Section */}
        <Box height={'80vh'} overflow={'scroll'}>
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
                          // onClick={function(){console.log('onclick');}}
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
