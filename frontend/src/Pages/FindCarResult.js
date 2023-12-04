import {
  Box,
  Heading,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ChakraProvider,
  AbsoluteCenter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  StackDivider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  ButtonGroup,
  Image,
  Fade,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useNavigate, useState, useDisclosure } from 'react';

function FindCarEndModal({ isEndOpen }) {
  let navigate = useNavigate();
  const navigateToHome = () => {
    let path = `/home`;
    navigate(path);
  };

  return (
    <ChakraProvider>
      <Modal
        isOpen={isEndOpen}
        // onClose={onEndClose}
        isCentered
      >
        <ModalOverlay bg={'blackAlpha.700'} />
        <ModalContent>
          {/* <ModalCloseButton /> */}
          <ModalBody
            pb={6}
            paddingTop={'10vh'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
          >
            <Box width={'80%'} height={'40vh'} bgColor={'blue.200'}>
              放圖案誒所在
            </Box>
            <ModalHeader textAlign={'center'}>您已完成停車</ModalHeader>
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            <Button colorScheme="blue" onClick={navigateToHome}>
              回首頁
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

const FindCarResult = () => {
  // const searchInput = useLocation();
  const [openModal, setOpenModal] = useState(false);

  return (
    // <Flex minWidth={'60vw'} justifyContent={'center'} height={'100vh'} alignItems={'center'}>
    //     <Box bg={'white'} width={'50%'} borderRadius={'10px'} padding={'5'}>
    //         <Heading size="lg">車牌號碼 B09705059</Heading>
    //         <Flex flexDirection={'column'} alignItems={'center'}>
    //             <Box bg={'ButtonHighlight'} mt={5} textAlign={'left'} padding={'10px'} borderRadius={'5px'} width={'80%'}>
    //                 車位
    //             </Box>
    //             <Box bg={'ButtonHighlight'} mt={5} mb={5} textAlign={'left'} padding={'10px'} borderRadius={'5px'} width={'80%'}>
    //                 停放時間
    //             </Box>
    //         </Flex>
    //         <Box display={'flex'} justifyContent={'space-evenly'} mt={4}>
    //             <NavLink to="/home" >
    //                 <Button>取消</Button>
    //             </NavLink>
    //                 <Button colorScheme='blue' onClick={setOpenModal}>確認</Button>
    //         </Box>
    //     </Box>
    // </Flex>
    <ChakraProvider>
      <AbsoluteCenter>
        <Card padding={5} rounded={20} shadow={'xl'}>
          <CardHeader pb={0}>
            <Heading size="md" textAlign={'center'} color={'#9E896A'}>
              車牌號碼 B09705059
            </Heading>
          </CardHeader>

          <CardBody>
            <Center>
              <Image
                borderRadius="10px"
                boxSize="150px"
                src={
                  'https://img.icons8.com/isometric/512/1FB141/car-theft.png'
                }
                alt={'car'}
              />
            </Center>
            <Stack>
              <FormControl mt={2}>
                <FormLabel>車位</FormLabel>
                <Input
                  type="text"
                  //   borderColor={'#9E896A'}
                  color={'blackAlpha'}
                  value={'B09'}
                  variant="filled"
                  fontWeight={600}
                  cursor={'default'}
                  isReadOnly
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>停放時間</FormLabel>
                <Input
                  type="text"
                  //   borderColor={'#9E896A'}
                  color={'blackAlpha'}
                  value={'5hr'}
                  variant="filled"
                  fontWeight={600}
                  cursor={'default'}
                  isReadOnly
                />
              </FormControl>
            </Stack>
          </CardBody>
          <CardFooter>
            <ButtonGroup
              background="#E8F0D7"
              paddingLeft={1}
              paddingRight={1}
              paddingTop={1}
              paddingBottom={1}
              rounded={40}
            >
              <NavLink to="/home">
                <Button w="8vw" variant="ghost" color="#779341" rounded={30}>
                  我要取車
                </Button>
              </NavLink>
              <NavLink to="/home">
                <Button
                  w="8vw"
                  variant="solid"
                  bg="#779341"
                  color="#FFFFFF"
                  rounded={30}
                >
                  確認
                </Button>
              </NavLink>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </AbsoluteCenter>
    </ChakraProvider>
  );
};

export default FindCarResult;
