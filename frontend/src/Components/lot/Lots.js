import {
  Stack,
  Box,
  Wrap,
  WrapItem,
  Button,
  ChakraProvider,
  theme,
  LightMode,
  Spacer,
  Text
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

  console.log('parkingMap in lots root', props.parkingMap);

  const motorLotsA = parkingMap['A'];
  const motorLotsB = parkingMap['B'];
  const carLotsC = parkingMap['C'];
  const carLotsD = parkingMap['D'];
  const motorLotsE = parkingMap['E'];
  const allLots = [carLotsC, carLotsD, motorLotsE];
  const allLotsZone = ['C', 'D', 'E'];

  const isEmptyColor = '#A3C561';
  const isOccupiedColor = '#9E896A';
  const isPriorityColor = '#7A98D3';
  const isWarningColor = '#D9534F';
  const bgColor = '#F0EFE5';
  const getButtonBackgroundColor = lot => {
    if (!lot.occupied) {
      return lot.space_type === 'priority' ? isPriorityColor : isEmptyColor;
    } else {
      return isOccupiedColor;
    }
  };

  // modal setting
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endModalOpen, setEndModelOpen] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState('');
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // modal

  return (
    <ChakraProvider theme={theme}>
      <LightMode>
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
              setCarId={props.setCarId}
              selectedSpaceId={selectedSpaceId}
            />
          ) : (
            <></>
          )}
          {/* Left Section */}
          <Box
            width={'20%'}
            maxWidth={'25%'}
            overflow={'scroll'}
            padding={5}
            marginRight={10}
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
              // borderColor={isOccupiedColor}
              color={isOccupiedColor}
              bg={'#D9D9D9'}
            >
              <Text fontSize={'2xl'} color={'#616161'}>
                警衛室
              </Text>
            </Box>
            <Box display={'flex'} flexDirection={'row'} height={'max-content'}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                display={'flex'}
                justifyContent={'center'}
                borderColor={isOccupiedColor}
              >
                <Stack direction="row" height={'540px'}>
                  <Wrap spacing={'3'} width={'100%'}>
                    {motorLotsA.map(lot => (
                      <WrapItem
                        width={'2vw'}
                        key={lot.lotId}
                        justifyContent={'space-evenly'}
                      >
                        <Button
                          // colorScheme="red"
                          bg={isEmptyColor}
                          width={'100%'}
                          height={'3vh'}
                          onClick={() => {
                            motorLotsB.occupied ? onClose() : onOpen();
                          }}
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
                <Stack direction="row" height={'540px'}>
                  <Wrap spacing={'3'} width={'100%'}>
                    {motorLotsB.map(lot => (
                      <WrapItem
                        width={'2vw'}
                        key={lot.lotId}
                        justifyContent={'space-evenly'}
                      >
                        <Button
                          bg={getButtonBackgroundColor(lot)}
                          width={'100%'}
                          height={'3vh'}
                          onClick={() => {
                            motorLotsB.occupied ? onClose() : onOpen();
                          }}
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
          <Box height={'80vh'} overflowX={'scroll'}>
            {allLots.map((lots, cnt) => (
              <React.Fragment key={cnt}>
                {/* Zone Section */}
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  margin={'2vh'}
                  overflow={'scroll'}
                  borderColor={isOccupiedColor}
                  maxWidth={'1000px'}
                >
                  <Box width={'900px'} bg={'white'} color={'black'}>
                    ZONE {allLotsZone[cnt]}
                  </Box>
                  <Stack direction="column">
                    <Wrap spacing={1} width={'900px'} pl={3}>
                      {lots.map(lot => (
                        <WrapItem
                          key={lot.lotId}
                          justifyContent={'space-evenly'}
                        >
                          <Button
                            bg={getButtonBackgroundColor(lot)}
                            width={'1vw'}
                            height={'8vh'}
                            variant={'solid'}
                            onClick={() => {
                              setSelectedSpaceId(lot.space_id);
                              lot.occupied ? onClose() : onOpen();
                            }}
                          ></Button>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Stack>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </LightMode>
    </ChakraProvider>
  );
}
