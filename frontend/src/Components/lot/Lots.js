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
import NormalLotModal from '../../Components/modal/NormalLotModal';
import WarningLotModal from '../../Components/modal/WarningLotModal';
import ErrorLotModal from '../../Components/modal/ErrorLotModal';

export default function Lots(props) {
  const lotsCnt = 20;
  const lotsType = 'cars';
  const parkingMap = props.parkingMap;
  
  // const parkingMap = {
  //   "A":[
  //     {
  //       "space_id": "1001",
  //       "space_type": "motor", 
  //       "occupied": false
  //     }
  //   ],
  //   "B":[
  //     {
  //       "space_id": "1002",
  //       "space_type": "motor", 
  //       "occupied": true
  //     }
  //   ], 
  //   "C":[
  //     {
  //       "space_id": "1003",
  //       "space_type": "car", 
  //       "occupied": false
  //     }
  //   ],
  //   "D":[
  //     {
  //       "space_id": "1004",
  //       "space_type": "car", 
  //       "occupied": false
  //     }
  //   ],
  //   "E":[
  //     {
  //       "space_id": "1005",
  //       "space_type": "motor", 
  //       "occupied": false
  //     }
  //   ]
  // }

  const motorLotsA = parkingMap['A'];
  const motorLotsB = parkingMap['B'];
  const carLotsC = parkingMap['C'];
  const carLotsD = parkingMap['D'];
  const motorLotsE = parkingMap['E'];
  const allLots = [carLotsC, carLotsD, motorLotsE];
  const allLotsZone = ['C', 'D', 'E'];

  const isEmptyColor = '#A3C561';
  const isOccupiedColor = '#9E896A';
  const bgColor = '#F0EFE5';

  // modal setting
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endModalOpen, setEndModelOpen] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState("");
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
            setCarId = {props.setCarId}
            selectedSpaceId={selectedSpaceId}
          />
        ) : (
          <></>
        )}
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
          <Box display={'flex'} flexDirection={'row'} height={'max-content'}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              display={'flex'}
              justifyContent={'center'}
              borderColor={isOccupiedColor}
            >
              <Stack direction="row" width={'80%'}>
                <Wrap spacing={'3'} width={'100%'}>
                  {motorLotsA.map(lot => (
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
                width={'20%'}
              >
                ZONE A
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
                  {motorLotsB.map(lot => (
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
                ZONE B
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Right Section */}
        <Box height={'80vh'} overflow={'unset'}>
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
                  ZONE {allLotsZone[cnt]}
                </Box>
                <Stack direction="column">
                  <Wrap spacing={1}>
                    {lots.map(lot => (
                      <WrapItem key={lot.lotId} justifyContent={'space-evenly'}>
                        <Button
                          bg={lot.occupied ? isOccupiedColor : isEmptyColor}
                          width={'1vw'}
                          height={'8vh'}
                          variant={'solid'}
                          // onClick={function(){console.log('onclick');}}
                          onClick={() => {
                            setSelectedSpaceId(lot.space_id)
                            onOpen()
                          }}
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
