import {
  Stack,
  Box,
  Wrap,
  WrapItem,
  Button,
  ChakraProvider,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import ParkingEnterModal from '../modal/ParkingModal';
import { useState } from 'react';

export default function LotsNoMotor(props) {
  console.log('parkingMap in lots others', props.parkingMap);
  const parkingMap = props.parkingMap;
  const zoneA = parkingMap['A'];
  const zoneB = parkingMap['B'];
  const zoneC = parkingMap['C'];

  const isEmptyColor = '#A3C561';
  const isOccupiedColor = '#9E896A';
  const isPriorityColor = '#7A98D3';
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

  const allLots = [zoneA, zoneB, zoneC];
  return (
    <ChakraProvider>
      <Center>
        <Box
          display={'flex'}
          flexDirection={'row'}
          bg={bgColor}
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
              selectedSpaceId={selectedSpaceId}
            />
          ) : (
            <></>
          )}
          {/* Lot Section */}
          <Box overflowX={'scroll'} maxW={'1000px'}>
            {allLots.map((lots, cnt) => (
              <React.Fragment key={cnt}>
                {/* Zone Section */}
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  margin={'2vh'}
                  overflow={'scroll'}
                  borderColor={isOccupiedColor}
                  width={'900px'}
                >
                  <Box width={'100%'} bg={'white'} color={'black'}>
                    ZONE
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
      </Center>
    </ChakraProvider>
  );
}
