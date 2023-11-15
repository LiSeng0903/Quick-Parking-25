import { Logo } from '../Logo';
import { WarningTwoIcon, InfoOutlineIcon } from '@chakra-ui/icons';
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
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid maxH="80vh" p={0}>
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
          >
            <CardBody>
              <Stack mt="6" spacing="3">
                <Heading size="2xl" marginBottom={5}>
                  <Highlight
                    query="OOXX"
                    styles={{
                      px: '2',
                      py: '1',
                      rounded: '10px',
                      color: 'green',
                    }}
                  >
                    OOXX Parking Lot
                  </Highlight>
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
                                剩餘機車車位：N
                              </Highlight>
                            </Text>
                          </HStack>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Text>欸不要點開啦</Text>
                      </AccordionPanel>
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
                                剩餘汽車車位：N
                              </Highlight>
                            </Text>
                          </HStack>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <Text>欸不要點開啦</Text>
                      </AccordionPanel>
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
                      <AccordionPanel pb={4}>
                        <Text>不要停</Text>
                      </AccordionPanel>
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

                      <AccordionPanel pb={2}>快去停</AccordionPanel>
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

                      <AccordionPanel pb={2}>ㄏㄏㄏ</AccordionPanel>
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
                    background="whiteAlpha.100"
                    paddingLeft={3}
                    paddingRight={3}
                    paddingTop={1}
                    paddingBottom={1}
                    rounded={10}
                  >
                    <Button variant="solid" colorScheme="green" w="10vw">
                      開車
                    </Button>
                    <NavLink to="/parking-lot">
                      <Button variant="ghost" colorScheme="green" w="10vw">
                        停車
                      </Button>
                    </NavLink>
                  </ButtonGroup>
                </HStack>
              </CardFooter>
            </Center>
          </Card>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}
export default Homepage;
