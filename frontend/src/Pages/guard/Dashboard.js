import React from 'react';
import format from 'date-fns/format';
import {
  LightMode,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Button,
  Box,
  ChakraProvider,
  Text,
  HStack,
  Heading,
  VStack,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
} from '@chakra-ui/react';
import { InfoOutlineIcon, WarningTwoIcon, AddIcon } from '@chakra-ui/icons';
import { Chrono } from 'react-chrono';
import NormalLotModal from '../../Components/modal/NormalLotModal';
import WarningLotModal from '../../Components/modal/WarningLotModal';
import ErrorLotModal from '../../Components/modal/ErrorLotModal';

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

// failed to modulize
// const NormalModalContent = () => {
//   <ModalContent bg={'#FBFBF9'} color={'#9E896A'} rounded={10}>
//     <ModalHeader h={'15vh'} roundedTop={10} backgroundColor={'#A3C561'}>
//       <Center>
//         <Text color={'white'}>1013</Text>
//       </Center>
//     </ModalHeader>
//     <ModalBody
//       pb={6}
//       paddingTop={'3vh'}
//       display={'flex'}
//       flexDirection={'column'}
//       justifyContent={'center'}
//       bg={'#F0EFE5'}
//       rounded={10}
//     >
//       <Center>
//         <VStack>
//           <Text as="b" fontSize="lg" color={'blackAlpha.800'} mb={4} mt={2}>
//             車牌號碼 B09705038
//           </Text>
//           <Box h="25vh" overflow="scroll" pb={5} pt={2}>
//             <Accordion allowToggle>
//               <AccordionItem
//                 bg={'#5CB85C'}
//                 color={'white'}
//                 rounded={10}
//                 mb={2}
//                 w={'18vw'}
//                 shadow={'base'}
//               >
//                 <AccordionButton>
//                   <Box as="span" flex="1" textAlign="left">
//                     <HStack>
//                       <Icon as={WarningTwoIcon} />
//                       <Text as={'b'}>好寶寶車車</Text>
//                     </HStack>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </AccordionItem>
//               <Spacer />
//               <AccordionItem
//                 bg={'white'}
//                 color={'#898989'}
//                 rounded={10}
//                 mb={2}
//                 w={'18vw'}
//                 shadow={'base'}
//               >
//                 <AccordionButton>
//                   <Box as="span" flex="1" textAlign="left">
//                     <HStack>
//                       <Icon as={InfoOutlineIcon} />
//                       <Text as={'b'}>停放時間：5hr</Text>
//                     </HStack>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </AccordionItem>

//               <AccordionItem
//                 bg={'white'}
//                 rounded={10}
//                 w={'18vw'}
//                 shadow={'base'}
//                 color={'#898989'}
//               >
//                 <AccordionButton>
//                   <Box as="span" flex="1" textAlign="left">
//                     <HStack>
//                       <Icon as={AddIcon} />
//                       <Text as={'b'}>車位歷史紀錄</Text>
//                     </HStack>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//                 <AccordionPanel pb={4}>
//                   <Chrono
//                     items={items}
//                     slideShow
//                     mode="VERTICAL"
//                     // enableOutline
//                     cardHeight="2px"
//                     cardWidth="100px"
//                     fontSizes="5px"
//                     hideControls
//                     titleDateFormat
//                     disableClickOnCircle="true"
//                     enableBreakPoint="false"
//                     item
//                     theme={{
//                       cardBgColor: '#FFFFFF',
//                       cardForeColor: '#FFFFFF',
//                       titleColor: '#616161',
//                       titleColorActive: 'white',
//                       secondary: '#9C9C9C',
//                       primary: 'black',
//                     }}
//                   />
//                 </AccordionPanel>
//               </AccordionItem>
//             </Accordion>
//           </Box>
//         </VStack>
//       </Center>
//     </ModalBody>
//     <ModalFooter bg={'#F0EFE5'} roundedBottom={10}></ModalFooter>
//   </ModalContent>;
// };

// const WarningModalContent = () => {
//   <ModalContent bg={'#FBFBF9'} color={'#9E896A'} rounded={10}>
//     <ModalHeader h={'15vh'} roundedTop={10} backgroundColor={'#EBCC7A'}>
//       <Center>
//         <Text color={'white'}>1012</Text>
//       </Center>
//     </ModalHeader>
//     <ModalBody
//       pb={6}
//       paddingTop={'3vh'}
//       display={'flex'}
//       flexDirection={'column'}
//       justifyContent={'center'}
//       bg={'#F0EFE5'}
//       rounded={10}
//     >
//       <Center>
//         <VStack>
//           <Text as="b" fontSize="lg" color={'blackAlpha.800'} mb={4} mt={2}>
//             車牌號碼
//           </Text>
//           <Box h="25vh" overflow="scroll" pb={5} pt={2}>
//             <Accordion allowToggle>
//               <AccordionItem
//                 bg={'#EB9316'}
//                 color={'white'}
//                 rounded={10}
//                 mb={2}
//                 w={'18vw'}
//                 shadow={'base'}
//               >
//                 <AccordionButton>
//                   <Box as="span" flex="1" textAlign="left">
//                     <HStack>
//                       <Icon as={WarningTwoIcon} />
//                       <Text as={'b'}>未記名車牌</Text>
//                     </HStack>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>

//                 {/* <AccordionPanel pb={2}>快去停</AccordionPanel> */}
//               </AccordionItem>
//               <Spacer />
//               <AccordionItem
//                 bg={'white'}
//                 color={'#898989'}
//                 rounded={10}
//                 mb={2}
//                 w={'18vw'}
//                 shadow={'base'}
//               >
//                 <AccordionButton>
//                   <Box as="span" flex="1" textAlign="left">
//                     <HStack>
//                       <Icon as={InfoOutlineIcon} />
//                       <Text as={'b'}>停放時間：？hr</Text>
//                     </HStack>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </AccordionItem>

//               <AccordionItem
//                 bg={'white'}
//                 rounded={10}
//                 w={'18vw'}
//                 shadow={'base'}
//                 color={'#898989'}
//               >
//                 <AccordionButton>
//                   <Box as="span" flex="1" textAlign="left">
//                     <HStack>
//                       <Icon as={AddIcon} />
//                       <Text as={'b'}>車位歷史紀錄</Text>
//                     </HStack>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//                 <AccordionPanel pb={4}>
//                   <Chrono
//                     items={items}
//                     slideShow
//                     mode="VERTICAL"
//                     // enableOutline
//                     cardHeight="2px"
//                     cardWidth="100px"
//                     fontSizes="5px"
//                     hideControls
//                     titleDateFormat
//                     disableClickOnCircle="true"
//                     enableBreakPoint="false"
//                     item
//                     theme={{
//                       cardBgColor: '#FFFFFF',
//                       cardForeColor: '#FFFFFF',
//                       titleColor: '#616161',
//                       titleColorActive: 'white',
//                       secondary: '#9C9C9C',
//                       primary: 'black',
//                     }}
//                   />
//                 </AccordionPanel>
//               </AccordionItem>
//             </Accordion>
//           </Box>
//         </VStack>
//       </Center>
//     </ModalBody>
//     <ModalFooter bg={'#F0EFE5'} roundedBottom={10}></ModalFooter>
//   </ModalContent>;
// };

// const ErrorModalContent = () => {
//   <ModalContent bg={'#FBFBF9'} color={'#9E896A'} rounded={10}>
//     <ModalHeader h={'15vh'} roundedTop={10} backgroundColor={'#D9534F'}>
//       <Center>
//         <Text color={'white'}>1011</Text>
//       </Center>
//     </ModalHeader>
//     <ModalBody
//       pb={6}
//       paddingTop={'3vh'}
//       display={'flex'}
//       flexDirection={'column'}
//       justifyContent={'center'}
//       bg={'#F0EFE5'}
//       rounded={10}
//     >
//       <Center>
//         <VStack>
//           <Text as="b" fontSize="lg" color={'blackAlpha.800'} mb={4} mt={2}>
//             車牌號碼 B09705059
//           </Text>
//           <Box h="25vh" overflow="scroll" pb={5} pt={2}>
//             <Accordion allowToggle>
//               <AccordionItem
//                 bg={'#D9534F'}
//                 color={'white'}
//                 rounded={10}
//                 mb={2}
//                 w={'18vw'}
//                 shadow={'base'}
//               >
//                 <AccordionButton>
//                   <Box as="span" flex="1" textAlign="left">
//                     <HStack>
//                       <Icon as={WarningTwoIcon} />
//                       <Text as={'b'}>停放時間異常</Text>
//                     </HStack>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>

//                 {/* <AccordionPanel pb={2}>快去停</AccordionPanel> */}
//               </AccordionItem>
//               <Spacer />
//               <AccordionItem
//                 bg={'white'}
//                 color={'#898989'}
//                 rounded={10}
//                 mb={2}
//                 w={'18vw'}
//                 shadow={'base'}
//               >
//                 <AccordionButton>
//                   <Box as="span" flex="1" textAlign="left">
//                     <HStack>
//                       <Icon as={InfoOutlineIcon} />
//                       <Text as={'b'}>停放時間：40hr</Text>
//                     </HStack>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </AccordionItem>

//               <AccordionItem
//                 bg={'white'}
//                 rounded={10}
//                 w={'18vw'}
//                 shadow={'base'}
//                 color={'#898989'}
//               >
//                 <AccordionButton>
//                   <Box as="span" flex="1" textAlign="left">
//                     <HStack>
//                       <Icon as={AddIcon} />
//                       <Text as={'b'}>車位歷史紀錄</Text>
//                     </HStack>
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//                 <AccordionPanel pb={4}>
//                   <Chrono
//                     items={items}
//                     slideShow
//                     mode="VERTICAL"
//                     // enableOutline
//                     cardHeight="2px"
//                     cardWidth="100px"
//                     fontSizes="5px"
//                     hideControls
//                     titleDateFormat
//                     disableClickOnCircle="true"
//                     enableBreakPoint="false"
//                     item
//                     theme={{
//                       cardBgColor: '#FFFFFF',
//                       cardForeColor: '#FFFFFF',
//                       titleColor: '#616161',
//                       titleColorActive: 'white',
//                       secondary: '#9C9C9C',
//                       primary: 'black',
//                     }}
//                   />
//                 </AccordionPanel>
//               </AccordionItem>
//             </Accordion>
//           </Box>
//         </VStack>
//       </Center>
//     </ModalBody>
//     <ModalFooter bg={'#F0EFE5'} roundedBottom={10}></ModalFooter>
//   </ModalContent>;
// };

const Dashboard = () => {
  // time
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const intervalID = window.setInterval(() => {
      // console.log('過一秒囉');
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  // modal setting
  const {
    isOpen: isNormalOpen,
    onOpen: onNormalOpen,
    onClose: onNormalClose,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const {
    isOpen: isWarningOpen,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();
  
  // I quit to modulize.
  // const [modalContent, setModalContent] = React.useState('');
  // const initialRef = React.useRef(null);
  // const finalRef = React.useRef(null);
  // const btnRef = React.useRef(null);

  return (
    <ChakraProvider>
      <VStack>
        <Box w={'80vw'}>
          <Heading size={'2xl'} color={'#9E896A'}>
            {format(time, 'hh:mm:ss a')}
          </Heading>
        </Box>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <HStack spacing={10} mb={'3vh'}>
          {/* Motor */}
          <Box>
            <LightMode>
              <Card
                ipadding={5}
                rounded={20}
                shadow={'xl'}
                size={'sm'}
                width={''}
              >
                <CardHeader roundedTop={10} backgroundColor={'#C2B39D'}>
                  <Center>
                    <Text as={'b'} color={'white'}>
                      剩餘機車車位
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
                  roundedBottom={10}
                >
                  <Center>
                    <VStack>
                      <Text as="b" fontSize="4xl" color={'blackAlpha.800'}>
                        200
                      </Text>
                    </VStack>
                  </Center>
                </CardBody>
              </Card>
            </LightMode>
          </Box>
          {/* Car */}
          <Box>
            <LightMode>
              <Card
                ipadding={5}
                rounded={20}
                shadow={'xl'}
                size={'sm'}
                width={''}
              >
                <CardHeader roundedTop={10} backgroundColor={'#C2B39D'}>
                  <Center>
                    <Text as={'b'} color={'white'}>
                      剩餘汽車車位
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
                  roundedBottom={10}
                >
                  <Center>
                    <VStack>
                      <Text as="b" fontSize="4xl" color={'blackAlpha.800'}>
                        150
                      </Text>
                    </VStack>
                  </Center>
                </CardBody>
              </Card>
            </LightMode>
          </Box>
          {/* Priority */}
          <Box>
            <LightMode>
              <Card
                ipadding={5}
                rounded={20}
                shadow={'xl'}
                size={'sm'}
                width={''}
              >
                <CardHeader roundedTop={10} backgroundColor={'#C2B39D'}>
                  <Center>
                    <Text as={'b'} color={'white'}>
                      剩餘優先車位
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
                  roundedBottom={10}
                >
                  <Center>
                    <VStack>
                      <Text as="b" fontSize="4xl" color={'blackAlpha.800'}>
                        5
                      </Text>
                    </VStack>
                  </Center>
                </CardBody>
              </Card>
            </LightMode>
          </Box>
        </HStack>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <Box>
          <LightMode>
            <Card
              ipadding={5}
              rounded={20}
              shadow={'xl'}
              size={'sm'}
              width={'50vw'}
            >
              <CardHeader
                // h={'10vh'}
                roundedTop={10}
                backgroundColor={'#C2B39D'}
              >
                <Center>
                  <Text as={'b'} color={'white'}>
                    異常車位資訊
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
                  <HStack>
                    <Button
                      bg={'#A3C561'}
                      color={'white'}
                      size={'lg'}
                      // onClick={() => {
                      //   setModalContent(<NormalModalContent />);
                      //   onOpen();
                      // }}
                      onClick={onNormalOpen}
                    >
                      1011
                    </Button>
                    <Button
                      bg={'#E46565'}
                      color={'white'}
                      size={'lg'}
                      // onClick={() => {
                      //   setModalContent(<ErrorModalContent />);
                      //   onOpen();
                      // }}
                      onClick={onErrorOpen}
                    >
                      1012
                    </Button>
                    <Button
                      bg={'#EBCC7A'}
                      color={'white'}
                      size={'lg'}
                      // onClick={() => {
                      //   setModalContent(<WarningModalContent />);
                      //   onOpen();
                      //   console.log('isWarning');
                      // }}
                      onClick={onWarningOpen}
                    >
                      1013
                    </Button>
                  </HStack>
                </Center>
              </CardBody>
              <CardFooter bg={'#F0EFE5'} roundedBottom={10}></CardFooter>
            </Card>
          </LightMode>
          <NormalLotModal isOpen={isNormalOpen} onClose={onNormalClose} />
          <ErrorLotModal isOpen={isErrorOpen} onClose={onErrorClose}/>
          <WarningLotModal isOpen={isWarningOpen} onClose={onWarningClose}/>
        </Box>
      </VStack>
    </ChakraProvider>
  );
};

export default Dashboard;
