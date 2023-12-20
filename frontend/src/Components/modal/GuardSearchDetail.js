import {
  Box,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { Chrono } from 'react-chrono';
import { InfoOutlineIcon, WarningTwoIcon, AddIcon } from '@chakra-ui/icons';

const GuardSearchDetail = ( {status, parkingSpaceId, currentCarId, parkTime, items, useRate} ) => {
    console.log("itemssss", items)
    console.log("p", status)
  return (
    <Card ipadding={5} rounded={20} shadow={'xl'} zIndex={3}>
      <CardHeader
        h={'8vh'}
        roundedTop={10}
        backgroundColor={status === 'OK' ? '#A3C561' : '#D9534F'}
      >
        <Center>
          <Text as={'b'} color={'white'}>
            {parkingSpaceId? parkingSpaceId : '查無車位'}
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
            <Text as="b" fontSize="lg" color={'blackAlpha.800'} mb={4} mt={2}>
            {currentCarId ? `車牌號碼 ${currentCarId}` : parkingSpaceId ? '空位' : ''}
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
                          {status === 'OK' ? '好寶寶車車' : parkingSpaceId? '停放時間異常':'查詢錯誤'}
                        </Text>
                      </HStack>
                    </Box>
                  </AccordionButton>
                </AccordionItem>
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
                        <Text as={'b'}>停放時間：{parkTime || ' '}</Text>
                      </HStack>
                    </Box>
                  </AccordionButton>
                </AccordionItem>
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
                        <Text as={'b'}>車位使用率：{useRate}</Text>
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
    </Card>
  );
};

export default GuardSearchDetail;
