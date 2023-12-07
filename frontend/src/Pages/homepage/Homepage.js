import { WarningTwoIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
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
  Image,
  Spacer,
  LightMode,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { getFloorMap } from '../../api';
import { useNavigate } from "react-router-dom";
import { getParkingStatus } from '../../api';

const Homepage = () => {
  // let navigate = useNavigate();
  // const navigateToParkingLot = () =>{
  //   navigate('/parking-lot', state: {

  //   });
  // }
  const [carString, setCarString] = useState('');
  const [motorString, setMotorString] = useState('');
  const [priorityString, setPriorityString] = useState('');
  const [msgsList, setMsgsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParkingStatus();
        setCarString(data.car.toString());
        setMotorString(data.motor.toString());
        setPriorityString(data.priority.toString())
        setMsgsList(data.msgs)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(); 
  }, []);
  
  return (
    <ChakraProvider theme={theme}>
      <Grid textAlign="center" fontSize="xl" maxH="80vh" marginTop={'20vh'}>
        <HStack maxH="80vh">
          <Box ml={'15vw'}>
            <NavLink to="/login">
              <Image
                borderRadius="10px"
                boxSize="400px"
                src={
                  'https://img.icons8.com/isometric/512/1FB141/car-theft.png'
                }
                alt={'ok'}
                cursor={'pointer'}
                marginRight={10}
              />
            </NavLink>
          </Box>
          <LightMode>
            <Box ml={'5vw'}>
              <Card maxW="sm" position="relative" w="30vw" rounded={40}>
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
                                  機車車位剩餘：
                                  <Highlight
                                    query={motorString}
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
                          </AccordionButton>
                        </AccordionItem>

                        <AccordionItem>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <HStack>
                                <Icon as={InfoOutlineIcon} />
                                <Text>
                                  汽車車位剩餘：
                                  <Highlight
                                    query={carString}
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
                          </AccordionButton>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <HStack>
                                <Icon as={InfoOutlineIcon} />
                                <Text>
                                  優先車位剩餘：
                                  <Highlight
                                    query={priorityString}
                                    styles={{
                                      px: '2',
                                      py: '1',
                                      rounded: '10px',
                                      color: 'red',
                                    }}
                                  >
                                    {priorityString}
                                  </Highlight>
                                </Text>
                              </HStack>
                            </Box>
                          </AccordionButton>
                        </AccordionItem>
                        {msgsList.map((msg, index) => (
                          <AccordionItem key={index}>
                            <AccordionButton>
                              <Box as="span" flex="1" textAlign="left">
                                <HStack>
                                  <Icon as={WarningTwoIcon} />
                                  <Text>{msg}</Text>
                                </HStack>
                              </Box>
                            </AccordionButton>
                          </AccordionItem>
                        ))}
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
                        <NavLink to="/find-car">
                          <Button
                            w="10vw"
                            variant="ghost"
                            color="#779341"
                            rounded={30}
                            fontSize={24}
                          >
                            開車
                          </Button>
                        </NavLink>
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
          </LightMode>
        </HStack>
      </Grid>
    </ChakraProvider>
  );
};
export default Homepage;
