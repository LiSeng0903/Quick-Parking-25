import { Logo } from '../Logo';
import { WarningTwoIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { getParkingStatus } from '../axios.js';
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ChakraProvider,
  Box,
  Text,
  Grid,
  Icon,
  theme,
  Heading,
  HStack,
  Button,
  Stack,
  Highlight,
  Center,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const Homepage = () => {
  // let navigate = useNavigate();
  // const routeChange = () =>{
  //     let path = `/map`;
  //     navigate(path);
  // }
  const [carString, setCarString] = useState('');
  const [motorString, setMotorString] = useState('');

  useEffect(() => {
    // var res = getParkingStatus()
    // console.log(res)
    // res.json().then(data => {
    //   setCarString('剩餘汽車車位：' + data.car);
    //   setMotorString('剩餘機車車位：' + data.motor);
    // })

    // fetch('/api/parking/status').then(res =>
    //   res.json().then(data => {
    //     setCarString('剩餘汽車車位：' + data.car);
    //     setMotorString('剩餘機車車位：' + data.motor);
    //   })
    // );
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Grid textAlign="center" fontSize="xl" maxH="80vh" marginTop={'20vh'}>
        <Box maxH="80vh">
          <Logo
            h="30vh"
            pointerEvents="none"
            position="relative"
            right="10vw"
            top="8vw"
          />
          <Card
            maxW="sm"
            position="relative"
            left="15vw"
            bottom="30vh"
            w="30vw"
            rounded={40}
          >
            <CardBody>
              <Stack mt="6" spacing="3">
                <Heading
                  size="2xl"
                  textAlign="start"
                  color="#779341"
                  marginLeft={2}
                >
                  OOXX
                </Heading>
                <Heading
                  size="2xl"
                  marginLeft={2}
                  marginBottom={3}
                  textAlign="start"
                >
                  Parking Lot
                </Heading>
                <Box h="25vh" overflow="scroll">
                  <Accordion allowToggle>
                    <AccordionItem>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <HStack>
                            <Icon as={InfoOutlineIcon} />
                            <Text>
                              <Highlight
                                query="N"
                                styles={{
                                  px: '2',
                                  py: '1',
                                  rounded: '10px',
                                  color: 'red',
                                }}
                              >
                                {motorString}
                              </Highlight>
                            </Text>
                          </HStack>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      {/* <AccordionPanel pb={4}>
                        <Text>欸不要點開啦</Text>
                      </AccordionPanel> */}
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <HStack>
                            <Icon as={InfoOutlineIcon} />
                            <Text>
                              <Highlight
                                query="N"
                                styles={{
                                  px: '2',
                                  py: '1',
                                  rounded: '10px',
                                  color: 'red',
                                }}
                              >
                                {carString}
                              </Highlight>
                            </Text>
                          </HStack>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      {/* <AccordionPanel pb={4}>
                        <Text>欸不要點開啦</Text>
                      </AccordionPanel> */}
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <HStack>
                            <Icon as={WarningTwoIcon} />
                            <Text>五樓施工</Text>
                          </HStack>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      {/* <AccordionPanel pb={4}>
                        <Text>不要停</Text>
                      </AccordionPanel> */}
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <HStack>
                            <Icon as={WarningTwoIcon} />
                            <Text>三樓很空</Text>
                          </HStack>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      {/* <AccordionPanel pb={2}>快去停</AccordionPanel> */}
                    </AccordionItem>
                    <AccordionItem>
                      <AccordionButton>
                        <Box as="span" flex="1" textAlign="left">
                          <HStack>
                            <Icon as={WarningTwoIcon} />
                            <Text>嗨嗨</Text>
                          </HStack>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      {/* <AccordionPanel pb={2}>ㄏㄏㄏ</AccordionPanel> */}
                    </AccordionItem>
                  </Accordion>
                </Box>
              </Stack>
            </CardBody>
            <Divider />
            <Center>
              <CardFooter>
                <HStack>
                  <ButtonGroup
                    background="#E8F0D7"
                    paddingLeft={6}
                    paddingRight={6}
                    paddingTop={2}
                    paddingBottom={2}
                    rounded={40}
                  >
                    <Button
                      w="10vw"
                      variant="ghost"
                      color="#779341"
                      rounded={30}
                      fontSize={24}
                    >
                      開車
                    </Button>
                    <NavLink to="/parking-lot">
                      <Button
                        variant="solid"
                        bg="#779341"
                        color="#FFFFFF"
                        w="10vw"
                        rounded={30}
                        fontSize={24}
                      >
                        停車
                      </Button>
                    </NavLink>
                  </ButtonGroup>
                </HStack>
              </CardFooter>
            </Center>
          </Card>
        </Box>
      </Grid>
    </ChakraProvider>
  );
};
export default Homepage;
