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

// 之後要改成可以回傳車車資訊進去 function
// const items = [
//   {
//     cardTitle: 'Now',
//     cardDetailedText: 'Occupied',
//   },
//   {
//     cardTitle: '20231012',
//     cardDetailedText: 'Empty',
//   },
//   {
//     cardTitle: '20231011',
//     cardDetailedText: 'ABC-4321',
//   },
// ];

const Dashboard = () => {
  // time
  const [time, setTime] = React.useState(new Date());
  const [carString, setCarString] = useState('');
  const [motorString, setMotorString] = useState('');
  const [priorityString, setPriorityString] = useState('');
  const [warningSpaceIds, setWarningSpaceIds] = useState([]);
  const [items, setItems] = useState([]);
  const [warningSpaceDetail, setWarningSpaceDetail] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllFloors();
        setCarString(data.car.toString());
        setMotorString(data.motor.toString());
        setPriorityString(data.priority.toString());
        setWarningSpaceIds(data.warningParkingSpaceIds);
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onClick = async (spaceId) => {
    try {
      const data = await getGuardCarSpace(spaceId);
      setItems(data.history.map(item => ({
        cardTitle: item.startTime.replace('T', ' '),
        cardDetailedText: item.carId,
      })));
      setWarningSpaceDetail(data)
      console.log(data.parkingSpaceId)
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

  // modal setting
  // const {
  //   isOpen: isNormalOpen,
  //   onOpen: onNormalOpen,
  //   onClose: onNormalClose,
  // } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  // const {
  //   isOpen: isWarningOpen,
  //   onOpen: onWarningOpen,
  //   onClose: onWarningClose,
  // } = useDisclosure();

  // I quit to modulize.
  // const [modalContent, setModalContent] = React.useState('');
  // const initialRef = React.useRef(null);
  // const finalRef = React.useRef(null);
  // const btnRef = React.useRef(null);

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
                <CardHeader roundedTop={10} backgroundColor={'#C2B39D'}>
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
                      <Text as="b" fontSize="4xl" color={'#908472'}>
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
                <CardHeader roundedTop={10} backgroundColor={'#C2B39D'}>
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
                      <Text as="b" fontSize="4xl" color={'#908472'}>
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
                <CardHeader roundedTop={10} backgroundColor={'#C2B39D'}>
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
                      <Text as="b" fontSize="4xl" color={'#908472'}>
                        {priorityString}
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
              <CardHeader
                // h={'10vh'}
                roundedTop={10}
                backgroundColor={'#C2B39D'}
              >
                <Center>
                  <Text as={'b'} color={'white'}>
                    異常車位資訊
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
                maxH={'30vh'}
                overflowY={'scroll'}
              >
                <Center>
                  <HStack flexWrap={'wrap'} overflowY={'scroll'}>
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
          {/* <NormalLotModal isOpen={isNormalOpen} onClose={onNormalClose} /> */}
          <ErrorLotModal isOpen={isErrorOpen} onClose={onErrorClose} items = {items}  warningSpaceDetail = {warningSpaceDetail}/>
          {/* <WarningLotModal isOpen={isWarningOpen} onClose={onWarningClose} /> */}
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default Dashboard;
