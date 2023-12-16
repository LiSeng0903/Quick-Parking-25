import React, { useState } from 'react';
import {
  ChakraProvider,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  AbsoluteCenter,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  ButtonGroup,
  Image,
  LightMode,
  Flex,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Icon,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { InfoOutlineIcon, WarningTwoIcon, AddIcon } from '@chakra-ui/icons';
import { Chrono } from 'react-chrono';
import { getGuardCarSpace } from '../../api';
import GuardSearchDetail from '../../Components/modal/GuardSearchDetail';
// 之後要改成可以回傳車車資訊進去 function
  // const items = [
  //   {
  //     cardTitle: 'Now',
  //     cardDetailedText: 'B09705059',
  //   },
  //   {
  //     cardTitle: '20231012',
  //     cardDetailedText: 'Empty',
  //   },
  //   {
  //     cardTitle: '20231011',
  //     cardDetailedText: 'Empty',
  //   },
  // ];

const initialState = {
  spacesId: '',
  carId: '',
};

const Search = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  // // handle search data
  // const [formData, setformData] = useState(initialState);
  // const { spacesId, carId } = formData;
  // const handleInputChange = e => {
  //   const { name, value } = e.target;
  //   setformData({ ...formData, [name]: value });
  // };

  const [spaceId, setSpaceId] = useState("");
  const [currentCarId, setCurrentCarId] = useState(null);
  const [items, setItems] = useState([]);
  const [parkTime, setparkTime] = useState(null);
  const [parkingSpaceId, setParkingSpaceId] = useState(null);
  const [status, setStatus] = useState(null);
  const [itemIsLoaded, setItemIsLoaded] = useState(false);

  const handleSpaceIdInputChange = event => {
    setItemIsLoaded(false)
    setSpaceId(event.target.value);
  };
  
  const fetchData = async () => {
    try {
      const data = await getGuardCarSpace(spaceId);
      setCurrentCarId(data.currentCarId)
      setItems(data.history.map(item => ({
        cardTitle: item.startTime.replace('T', ' '),
        cardDetailedText: item.carId,
      })));
      setItemIsLoaded(true)
      console.log(data.history)
      setparkTime(data.parkTime)
      setParkingSpaceId(data.parkingSpaceId)
      setStatus(data.status)
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };


  //const search = async e => {
    // e.preventDefault();
    // const userData = {
    //   spacesId,
    //   carId,
    // };
  //};

  return (
    <ChakraProvider>
      <Box ml={'10vw'}>
        <Center>
          <LightMode>
            <Card padding={5} rounded={20} shadow={'xl'} zIndex={3}>
              <CardHeader pb={0}>
                <Heading size="md" textAlign={'center'} color={'#9E896A'}>
                  查詢
                </Heading>
              </CardHeader>

              <CardBody>
                <Center>
                  <Image
                    borderRadius="10px"
                    boxSize="150px"
                    src={'https://img.icons8.com/isometric/512/1FB141/car.png'}
                    alt={'car'}
                  />
                </Center>
                <Stack>
                  <FormControl mt={2} 
                  //onSubmit={search}
                  >
                    <FormLabel>請輸入車位</FormLabel>
                    <Input
                      type="text"
                      borderColor={'#9E896A'}
                      color={'gray.700'}
                      placeholder="B09"
                      fontWeight={600}
                      onChange={handleSpaceIdInputChange}
                    />
                  </FormControl>
                  {/* <FormControl mb={4}>
                    <FormLabel>請輸入車牌號碼</FormLabel>
                    <Input
                      type="text"
                      borderColor={'#9E896A'}
                      color={'gray.700'}
                      placeholder="B09705059"
                      fontWeight={600}
                      // onChange={handleInputChange}
                    />
                  </FormControl> */}
                </Stack>
              </CardBody>
              <CardFooter justifyContent={'center'}>
                <ButtonGroup
                  background="#EEE8D7"
                  paddingLeft={1}
                  paddingRight={1}
                  paddingTop={1}
                  paddingBottom={1}
                  rounded={40}
                >
                  <Button w="8vw" variant="ghost" color="#9E896A" rounded={30}>
                    取消
                  </Button>
                  <Button
                    w="8vw"
                    variant="solid"
                    bg="#9E896A"
                    color="#FFFFFF"
                    rounded={30}
                    onClick={() => {
                      fetchData();
                      setIsOpen(true);
                    }}
                  >
                    確認
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </LightMode>
        </Center>
      </Box>
      <Box style={{ display: isOpen ? 'flex' : 'none' }} ml={'5vw'}>
        <LightMode>
          {itemIsLoaded?
          <GuardSearchDetail status = {status} parkingSpaceId ={parkingSpaceId} currentCarId = {currentCarId} parkTime = {parkTime} items = {items}/>: <></>}
        </LightMode>
      </Box>
    </ChakraProvider>
  );
};

export default Search;
