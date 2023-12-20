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
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import ParkingEnterModal from '../modal/ParkingModal';
import { useState } from 'react';
// for test car lot info modal
import NormalLotModal from '../../Components/modal/NormalLotModal';
import ErrorLotModal from '../../Components/modal/ErrorLotModal';
import { getGuardCarSpace } from '../../api';

export default function Lots(props) {
  const parkingMap = props.parkingMap;
  const isGuard = props.isGuard;

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
  const isWarningColor = '#E46565';
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

  const [endModalOpen, setEndModelOpen] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState('');
  const [items, setItems] = useState([]);
  const [spaceDetail, setSpaceDetail] = useState({});
  const [itemIsLoaded, setItemIsLoaded] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const getButtonBackgroundColor = lot => {
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
      // 讓現在在停放的排前面
      const sortedHistory = data.history.slice().sort((a, b) => {
        if (!a.endTime && !b.endTime) return 0; // 如果都沒有結束時間，保持原始順序
        if (!a.endTime) return -1; // a 沒有結束時間，排在最前面
        if (!b.endTime) return 1; // b 沒有結束時間，排在後面
        return new Date(b.endTime) - new Date(a.endTime); // 比較結束時間，時間較晚的排在前面
      });
      setItems(
        sortedHistory.map(item => ({
          cardTitle: '車牌號碼： ' + item.carId,
          cardDetailedText: [
            item.endTime
              ? '結束停放時間： ' + item.endTime.replace('T', ' ')
              : '🚗 停放中',
            '開始停放時間： ' + item.startTime.replace('T', ' '),
          ],
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
  console.log('isGuard', isGuard);
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
          {itemIsLoaded && isGuard ? (
            spaceDetail.status === 'OK' ? (
              <NormalLotModal
                isOpen={isDetailOpen}
                onClose={handleSpaceDetailClose}
                initialRef={initialRef}
                finalRef={finalRef}
                items={items}
                normalSpaceDetail={spaceDetail}
              />
            ) : (
              <ErrorLotModal
                isOpen={isDetailOpen}
                onClose={handleSpaceDetailClose}
                initialRef={initialRef}
                finalRef={finalRef}
                items={items}
                warningSpaceDetail={spaceDetail}
              />
            )
          ) : (
            (isParkOpen || !endModalOpen) && (
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
                          bg={getButtonBackgroundColor(lot)}
                          width={'100%'}
                          height={'3vh'}
                          onClick={() => {
                            setSelectedSpaceId(lot.space_id);
                            if (isGuard) {
                              spaceDetailClick(lot.space_id);
                              onDetailOpen();
                            } else {
                              console.log('occupied', lot);
                              onDetailClose();
                              lot.occupied ? onParkClose() : onParkOpen();
                            }
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
                            setSelectedSpaceId(lot.space_id);
                            if (isGuard) {
                              spaceDetailClick(lot.space_id);
                              onDetailOpen();
                            } else {
                              console.log('occupied', lot);
                              onDetailClose();
                              lot.occupied ? onParkClose() : onParkOpen();
                            }
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
                              if (isGuard) {
                                spaceDetailClick(lot.space_id);
                                onDetailOpen();
                              } else {
                                console.log('occupied', lot.occupied);
                                onDetailClose();
                                lot.occupied ? onParkClose() : onParkOpen();
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
      </LightMode>
    </ChakraProvider>
  );
}
