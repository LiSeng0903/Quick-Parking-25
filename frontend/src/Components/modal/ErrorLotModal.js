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

const ErrorLotModal = ({ isOpen, onClose, initialRef, finalRef, items, warningSpaceDetail }) => {
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
          <ModalHeader h={'15vh'} roundedTop={10} backgroundColor={'#D9534F'}>
            <Center>
              <Text color={'white'}>
                {warningSpaceDetail.parkingSpaceId || 'null'}
              </Text>
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
                  車牌號碼 {warningSpaceDetail.currentCarId || 'null'}
                </Text>
                <Box h="25vh" overflow="scroll" pb={5} pt={2}>
                  <Accordion allowToggle>
                    <AccordionItem
                      bg={'#D9534F'}
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
                            <Text as={'b'}>停放時間異常</Text>
                          </HStack>
                        </Box>
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
                            <Text as={'b'}>
                              停放時間：{warningSpaceDetail.parkTime || 'null'}
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
                            <Text as={'b'}>
                              車位使用率：{warningSpaceDetail.useRate}
                            </Text>
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

export default ErrorLotModal;
