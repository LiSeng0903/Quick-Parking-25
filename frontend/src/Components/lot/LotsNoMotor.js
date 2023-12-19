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
import NormalLotModal from '../../Components/modal/NormalLotModal';
import ErrorLotModal from '../../Components/modal/ErrorLotModal';
import { getGuardCarSpace } from '../../api';

export default function LotsNoMotor(props) {
  console.log('parkingMap in lots others', props.parkingMap);
  const parkingMap = props.parkingMap;
  const zoneA = parkingMap['A'];
  const zoneB = parkingMap['B'];
  const zoneC = parkingMap['C'];
  const isGuard = props.isGuard;
  console.log(isGuard)

  const isEmptyColor = '#A3C561';
  const isOccupiedColor = '#9E896A';
  const isPriorityColor = '#7A98D3';
  const isWarningColor = '#D9534F';
  const bgColor = '#F0EFE5';

  // modal setting
  const {
    isOpen: isParkOpen,
    onOpen: onParkOpen,
    onClose: onParkClose,
  } = useDisclosure();
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [endModalOpen, setEndModelOpen] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState('');
  const [items, setItems] = useState([]);
  const [spaceDetail, setSpaceDetail] = useState({});
  const [itemIsLoaded, setItemIsLoaded] = useState(false);
  

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const getButtonBackgroundColor = (lot) => {
    if (isGuard && lot.status === 'WARNING') {
      return isWarningColor;
    }
  
    if (!lot.occupied) {
      return lot.space_type === 'priority' ? isPriorityColor : isEmptyColor;
    }
  
    return isOccupiedColor;
  };
  
  const spaceDetailClick = async spaceId => {
    try {
      const data = await getGuardCarSpace(spaceId);
      setItems(
        data.history.map(item => ({
          cardTitle: item.startTime.replace('T', ' '),
          cardDetailedText: item.carId,
        }))
      );
      console.log('data', data);
      setSpaceDetail(data);
      setItemIsLoaded(true);
      console.log(data.parkingSpaceId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpaceDetailClose = () => {
    onDetailClose();
    setItemIsLoaded(false);
  };

  
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
          {itemIsLoaded
            ? isGuard
              ? spaceDetail.status === 'OK'
                ? (console.log('Normal'),
                  (
                    <NormalLotModal
                      isOpen={isDetailOpen}
                      onClose={handleSpaceDetailClose}
                      initialRef={initialRef}
                      finalRef={finalRef}
                      items={items}
                      normalSpaceDetail={spaceDetail}
                    />
                  ))
                : (console.log('Error'),
                  (
                    <ErrorLotModal
                      isOpen={isDetailOpen}
                      onClose={handleSpaceDetailClose}
                      initialRef={initialRef}
                      finalRef={finalRef}
                      items={items}
                      warningSpaceDetail={spaceDetail}
                    />
                  ))
              : (isParkOpen || !endModalOpen) && (
                  <ParkingEnterModal
                    isOpen={isParkOpen}
                    onClose={onParkClose}
                    initialRef={initialRef}
                    finalRef={finalRef}
                    endModalOpen={endModalOpen}
                    setEndModelOpen={setEndModelOpen}
                    setCarId={props.setCarId}
                    selectedSpaceId={selectedSpaceId}
                  />
                )
            : <></>}
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
                              if (isGuard) {
                                spaceDetailClick(lot.space_id);
                                onDetailOpen();
                              } else {
                                onDetailClose();
                                lots.occupied
                                  ? onParkClose()
                                  : onParkOpen();
                              }
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
