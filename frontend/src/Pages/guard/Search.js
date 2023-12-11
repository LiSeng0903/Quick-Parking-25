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

// 之後要改成可以回傳車車資訊進去 function
const items = [
  {
    cardTitle: 'Now',
    cardDetailedText: 'B09705059',
  },
  {
    cardTitle: '20231012',
    cardDetailedText: 'Empty',
  },
  {
    cardTitle: '20231011',
    cardDetailedText: 'Empty',
  },
];

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
  const [history, setHistory] = useState([]);
  const [parkTime, setparkTime] = useState(null);
  const [parkingSpaceId, setParkingSpaceId] = useState(null);
  const [status, setStatus] = useState(null);

  const handleSpaceIdInputChange = event => {
    setSpaceId(event.target.value);
  };
  
  const fetchData = async () => {
    try {
      const data = await getGuardCarSpace(spaceId);
      setCurrentCarId(data.currentCarId)
      setHistory(data.history)
      setparkTime(data.parkTime)
      setParkingSpaceId(data.parkingSpaceId)
      setStatus(data.status)
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
                  <FormControl mb={4}>
                    <FormLabel>請輸入車牌號碼</FormLabel>
                    <Input
                      type="text"
                      borderColor={'#9E896A'}
                      color={'gray.700'}
                      placeholder="B09705059"
                      fontWeight={600}
                      // onChange={handleInputChange}
                    />
                  </FormControl>
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
          <Card ipadding={5} rounded={20} shadow={'xl'} zIndex={3}>
            {/* <ModalContent bg={'#FBFBF9'} color={'#9E896A'} rounded={10}> */}
            <CardHeader h={'8vh'} roundedTop={10} backgroundColor={'#A3C561'}>
              <Center>
                <Text as={'b'} color={'white'}>
                  {parkingSpaceId}
                </Text>
              </Center>
            </CardHeader>
            <CardBody
              pb={6}
              paddingTop={'3vh'}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
              bg={'#F0EFE5'}
            >
              <Center>
                <VStack>
                  <Text
                    as="b"
                    fontSize="lg"
                    color={'blackAlpha.800'}
                    mb={4}
                    mt={2}
                  >
                    車牌號碼 {currentCarId || "null"}
                  </Text>
                  <Box h="25vh" overflow="scroll" pb={5} pt={2}>
                    <Accordion allowToggle>
                      <AccordionItem
                        bg={'#5CB85C'}
                        color={'white'}
                        rounded={10}
                        mb={2}
                        w={'18vw'}
                        shadow={'base'}
                      >
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            <HStack>
                              <Icon as={WarningTwoIcon} />
                              <Text as={'b'}>好寶寶車車</Text>
                            </HStack>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </AccordionItem>
                      <Spacer />
                      <AccordionItem
                        bg={'white'}
                        color={'#898989'}
                        rounded={10}
                        mb={2}
                        w={'18vw'}
                        shadow={'base'}
                      >
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            <HStack>
                              <Icon as={InfoOutlineIcon} />
                              <Text as={'b'}>停放時間：{parkTime || "null"}</Text>
                            </HStack>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </AccordionItem>

                      <AccordionItem
                        bg={'white'}
                        rounded={10}
                        w={'18vw'}
                        shadow={'base'}
                        color={'#898989'}
                      >
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            <HStack>
                              <Icon as={AddIcon} />
                              <Text as={'b'}>車位歷史紀錄</Text>
                            </HStack>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <Chrono
                            items={items}
                            slideShow
                            mode="VERTICAL"
                            // enableOutline
                            cardHeight="2px"
                            cardWidth="100px"
                            fontSizes="5px"
                            hideControls
                            titleDateFormat
                            disableClickOnCircle="true"
                            enableBreakPoint="false"
                            item
                            theme={{
                              cardBgColor: '#FFFFFF',
                              cardForeColor: '#FFFFFF',
                              titleColor: '#616161',
                              titleColorActive: 'white',
                              secondary: '#9C9C9C',
                              primary: 'black',
                            }}
                          />
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                </VStack>
              </Center>
            </CardBody>
            <CardFooter bg={'#F0EFE5'} roundedBottom={10}></CardFooter>
            {/* </ModalContent> */}
          </Card>
        </LightMode>
      </Box>
    </ChakraProvider>
  );
};

export default Search;
