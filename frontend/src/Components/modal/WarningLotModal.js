// NO NEED!
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
    cardDetailedText: 'Occupied',
  },
  {
    cardTitle: '20231012',
    cardDetailedText: 'Empty',
  },
  {
    cardTitle: '20231011',
    cardDetailedText: 'ABC-4321',
  },
];
const WarningLotModal = ({ isOpen, onClose, initialRef, finalRef }) => {
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
          <ModalHeader h={'15vh'} roundedTop={10} backgroundColor={'#EBCC7A'}>
            <Center>
              <Text color={'white'}>1013</Text>
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
                  車牌號碼
                </Text>
                <Box h="25vh" overflow="scroll" pb={5} pt={2}>
                  <Accordion allowToggle>
                    <AccordionItem
                      bg={'#EB9316'}
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
                            <Text as={'b'}>未記名車牌</Text>
                          </HStack>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>

                      {/* <AccordionPanel pb={2}>快去停</AccordionPanel> */}
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
                            <Text as={'b'}>停放時間：？hr</Text>
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
          </ModalBody>
          <ModalFooter bg={'#F0EFE5'} roundedBottom={10}></ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default WarningLotModal;
