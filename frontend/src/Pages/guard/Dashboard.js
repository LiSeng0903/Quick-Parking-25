import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import {
  LightMode,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Button,
  Box,
  ChakraProvider,
  Text,
  HStack,
  Heading,
  VStack,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import ErrorLotModal from '../../Components/modal/ErrorLotModal';
import { getAllFloors, getGuardCarSpace } from '../../api';

const Dashboard = () => {
  // time
  const [time, setTime] = React.useState(new Date());
  const [carString, setCarString] = useState('');
  const [motorString, setMotorString] = useState('');
  const [priorityString, setPriorityString] = useState('');
  const [warningSpaceIds, setWarningSpaceIds] = useState([]);
  const [items, setItems] = useState([]);
  const [warningSpaceDetail, setWarningSpaceDetail] = useState({});
  const [itemIsLoaded, setItemIsLoaded] = useState(false);
  const totalUseRate = (
    ((660 -
      (parseInt(carString) +
        parseInt(priorityString) +
        parseInt(motorString))) /
      660) *
    100
  ).toFixed(2);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllFloors();
        setCarString(data.car.toString());
        setMotorString(data.motor.toString());
        setPriorityString(data.priority.toString());
        setWarningSpaceIds(data.warningParkingSpaceIds);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onClick = async spaceId => {
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
      console.log('his data', data.history);
      setWarningSpaceDetail(data);
      setItemIsLoaded(true);
      console.log(data.parkingSpaceId);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const intervalID = window.setInterval(() => {
      // console.log('過一秒囉');
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();

  const handleModalClose = () => {
    onErrorClose();
    setItemIsLoaded(false);
  };

  return (
    <ChakraProvider>
      <VStack>
        <Box w={'80vw'}>
          <Heading size={'2xl'} color={'#9E896A'}>
            {format(time, 'hh:mm:ss a')}
          </Heading>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <HStack spacing={10} mb={'3vh'}>
          {/* Motor */}
          <Box>
            <LightMode>
              <Card
                ipadding={5}
                rounded={20}
                shadow={'xl'}
                size={'sm'}
                width={''}
              >
                <CardHeader roundedTop={10} backgroundColor={'#9E896A'}>
                  <Center>
                    <Text as={'b'} color={'white'}>
                      剩餘機車車位
                    </Text>
                  </Center>
                </CardHeader>
                <CardBody
                  pb={6}
                  paddingTop={'3vh'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  bg={'#FFFFFF'}
                  roundedBottom={10}
                >
                  <Center>
                    <VStack>
                      <Text as="b" fontSize="4xl" color={'#806031'}>
                        {motorString}
                      </Text>
                    </VStack>
                  </Center>
                </CardBody>
              </Card>
            </LightMode>
          </Box>
          {/* Car */}
          <Box>
            <LightMode>
              <Card
                ipadding={5}
                rounded={20}
                shadow={'xl'}
                size={'sm'}
                width={''}
              >
                <CardHeader roundedTop={10} backgroundColor={'#9E896A'}>
                  <Center>
                    <Text as={'b'} color={'white'}>
                      剩餘汽車車位
                    </Text>
                  </Center>
                </CardHeader>
                <CardBody
                  pb={6}
                  paddingTop={'3vh'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  bg={'#FFFFFF'}
                  roundedBottom={10}
                >
                  <Center>
                    <VStack>
                      <Text as="b" fontSize="4xl" color={'#806031'}>
                        {carString}
                      </Text>
                    </VStack>
                  </Center>
                </CardBody>
              </Card>
            </LightMode>
          </Box>
          {/* Priority */}
          <Box>
            <LightMode>
              <Card
                ipadding={5}
                rounded={20}
                shadow={'xl'}
                size={'sm'}
                width={''}
              >
                <CardHeader roundedTop={10} backgroundColor={'#9E896A'}>
                  <Center>
                    <Text as={'b'} color={'white'}>
                      剩餘優先車位
                    </Text>
                  </Center>
                </CardHeader>
                <CardBody
                  pb={6}
                  paddingTop={'3vh'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  bg={'#FFFFFF'}
                  roundedBottom={10}
                >
                  <Center>
                    <VStack>
                      <Text as="b" fontSize="4xl" color={'#806031'}>
                        {priorityString}
                      </Text>
                    </VStack>
                  </Center>
                </CardBody>
              </Card>
            </LightMode>
          </Box>
          {/* Car Use Rate */}
          <Box>
            <LightMode>
              <Card
                ipadding={5}
                rounded={20}
                shadow={'xl'}
                size={'sm'}
                width={''}
              >
                <CardHeader roundedTop={10} backgroundColor={'#9E896A'}>
                  <Center>
                    <Text as={'b'} color={'white'}>
                      總車位使用率
                    </Text>
                  </Center>
                </CardHeader>
                <CardBody
                  pb={6}
                  paddingTop={'3vh'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  bg={'#FFFFFF'}
                  roundedBottom={10}
                >
                  <Center>
                    <VStack>
                      <Text as="b" fontSize="4xl" color={'#806031'}>
                        {totalUseRate + '%'}
                      </Text>
                    </VStack>
                  </Center>
                </CardBody>
              </Card>
            </LightMode>
          </Box>
        </HStack>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Box>
          <LightMode>
            <Card
              ipadding={5}
              rounded={20}
              shadow={'xl'}
              size={'sm'}
              width={'50vw'}
            >
              <CardHeader roundedTop={10} backgroundColor={'#9E896A'}>
                <Center>
                  <Text as={'b'} color={'white'}>
                    異常車位資訊
                  </Text>
                </Center>
              </CardHeader>
              <CardBody
                pb={6}
                paddingTop={'10vh'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                bg={'#FFFFFF'}
                maxH={'30vh'}
                overflowY={'scroll'}
              >
                <Center>
                  <HStack
                    flexWrap={'wrap'}
                    overflowY={'scroll'}
                    // marginTop="15vh"
                  >
                    {warningSpaceIds.map(id => (
                      <Button
                        key={id}
                        bg={'#E46565'}
                        color={'white'}
                        size={'lg'}
                        onClick={() => {
                          onClick(id);
                          onErrorOpen(); // Assuming you want to open the modal when the button is clicked
                        }}
                      >
                        {id}
                      </Button>
                    ))}
                  </HStack>
                </Center>
              </CardBody>
              <CardFooter bg={'#F0EFE5'} roundedBottom={10}></CardFooter>
            </Card>
          </LightMode>
          {itemIsLoaded ? (
            <ErrorLotModal
              isOpen={isErrorOpen}
              onClose={handleModalClose}
              items={items}
              warningSpaceDetail={warningSpaceDetail}
            />
          ) : (
            <></>
          )}
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default Dashboard;
