import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
  Box,
  ChakraProvider,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Icon,
  VStack,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { InfoOutlineIcon, WarningTwoIcon, AddIcon } from '@chakra-ui/icons';
import { Chrono } from 'react-chrono';

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
const NormalLotModal = ({ isOpen, onClose, initialRef, finalRef, items, normalSpaceDetail }) => {
  return (
    <ChakraProvider>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={'xs'}
      >
        <ModalOverlay bg={'blackAlpha.900'} />
        <ModalContent bg={'#FBFBF9'} color={'#9E896A'} rounded={10}>
          <ModalHeader h={'15vh'} roundedTop={10} backgroundColor={'#A3C561'}>
            <Center>
              <Text color={'white'}>{normalSpaceDetail.parkingSpaceId || 'null'}</Text>
            </Center>
          </ModalHeader>
          <ModalBody
            pb={6}
            paddingTop={'3vh'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            bg={'#F0EFE5'}
            rounded={10}
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
                  車牌號碼 {normalSpaceDetail.currentCarId || '空位'}
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
                            <Text as={'b'}>停放時間：{normalSpaceDetail.parkTime || '空位'}</Text>
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
          </ModalBody>
          <ModalFooter bg={'#F0EFE5'} roundedBottom={10}></ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default NormalLotModal;
