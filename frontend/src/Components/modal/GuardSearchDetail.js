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
import { Chrono } from 'react-chrono';
import { InfoOutlineIcon, WarningTwoIcon, AddIcon } from '@chakra-ui/icons';

const GuardSearchDetail = ( {status, parkingSpaceId, currentCarId, parkTime, items} ) => {
    console.log("items", items)
  return (
        <Card ipadding={5} rounded={20} shadow={'xl'} zIndex={3}>
          {/* <ModalContent bg={'#FBFBF9'} color={'#9E896A'} rounded={10}> */}
          <CardHeader
            h={'8vh'}
            roundedTop={10}
            backgroundColor={status === 'OK' ? '#A3C561' : '#D9534F'}
          >
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
                  車牌號碼 {currentCarId || 'null'}
                </Text>
                <Box h="25vh" overflow="scroll" pb={5} pt={2}>
                  <Accordion allowToggle>
                    <AccordionItem
                      bg={status === 'OK' ? '#5CB85C' : '#D9534F'}
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
                            <Text as={'b'}>
                              {status === 'OK' ? '好寶寶車車' : '停放時間異常'}
                            </Text>
                          </HStack>
                        </Box>
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
                            <Text as={'b'}>停放時間：{parkTime || 'null'}</Text>
                          </HStack>
                        </Box>
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
                          cardHeight="2px"
                          cardWidth="100px"
                          fontSizes="5px"
                          hideControls
                          titleDateFormat
                          disableClickOnCircle={true}
                          enableBreakPoint={false}
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
  );
};

export default GuardSearchDetail;
