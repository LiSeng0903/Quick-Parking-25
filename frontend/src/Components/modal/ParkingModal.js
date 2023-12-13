import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Image,
  Center,
  ButtonGroup,
  ChakraProvider,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { enterCarNum } from '../../api';
/**
 * @param {Object} param0
 * @param {*} param0.isOpen
 * @param {*} param0.onClose
 * @param {*} param0.initialRef
 * @param {*} param0.finalRef
 * @param {*} param0.endModalOpen
 * @param {*} param0.setEndModelOpen
 * @param {*} param0.selectedSpaceId
 */
function ParkingEnterModal({
  isOpen,
  onClose,
  initialRef,
  finalRef,
  endModalOpen,
  setEndModelOpen,
  selectedSpaceId,
}) {
  const [carId, setCarId] = useState('');
  const handleCarIdChange = event => {
    setCarId(event.target.value);
    localStorage.setItem('carID', event.target.value);
  };
  // Store the user's parking information in localStorage
  localStorage.setItem('spaceID', selectedSpaceId);

  const fetchData = async () => {
    try {
      const response = await enterCarNum(selectedSpaceId, carId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = () => {
    setEndModelOpen(true);
    fetchData();
  };

  return (
    <ChakraProvider>
      {endModalOpen ? <ParkingEndModal isEndOpen={endModalOpen} /> : <></>}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={'xs'}
        rounded={50}
      >
        <ModalOverlay bg={'blackAlpha.900'} />
        <ModalContent bg={'#FBFBF9'} color={'#9E896A'}>
          <ModalCloseButton />
          <ModalBody
            pb={6}
            paddingTop={'6vh'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
          >
            <Center>
              <Image
                borderRadius="10px"
                boxSize="150px"
                src={'https://img.icons8.com/isometric/512/1FB141/car.png'}
                alt={'car'}
              />
            </Center>

            <ModalHeader textAlign={'center'} color={'#9E896A'}>
              我要停車
            </ModalHeader>
            <FormControl>
              <FormLabel color={'black'}>請輸入車牌號碼</FormLabel>
              <Input
                ref={initialRef}
                placeholder="車號"
                borderColor={'#9E896A'}
                color={'gray.700'}
                onChange={handleCarIdChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={'center'} paddingBottom={'4vh'}>
            <ButtonGroup
              background="#E8F0D7"
              paddingLeft={1}
              paddingRight={1}
              paddingTop={1}
              paddingBottom={1}
              rounded={40}
            >
              <Button
                w="8vw"
                variant="ghost"
                color="#779341"
                rounded={30}
                onClick={onClose}
              >
                取消
              </Button>
              <Button
                w="8vw"
                variant="solid"
                bg="#779341"
                color="#FFFFFF"
                rounded={30}
                onClick={handleConfirm}
              >
                確認
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

function ParkingEndModal({ isEndOpen }) {
  let navigate = useNavigate();
  const navigateToHome = () => {
    let path = `/home`;
    navigate(path);
  };

  // Get the parking information from localStorage.
  const userCarID = localStorage.getItem('carID');
  const userSpaceID = localStorage.getItem('spaceID');

  return (
    <ChakraProvider>
      <Modal
        isOpen={isEndOpen}
        // onClose={onEndClose}
        isCentered
        size={'xs'}
        rounded={50}
      >
        <ModalOverlay bg={'blackAlpha.900'} />
        <ModalContent bg={'#FBFBF9'} color={'#9E896A'}>
          {/* <ModalCloseButton /> */}
          <ModalHeader textAlign={'center'}>您已完成停車</ModalHeader>
          <ModalBody
            pb={6}
            paddingTop={'3vh'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
          >
            <Center>
              <VStack>
                <Image
                  borderRadius="10px"
                  boxSize="150px"
                  src={'https://img.icons8.com/isometric/512/1FB141/ok.png'}
                  alt={'ok'}
                  mb={'2vh'}
                />
                {/* {console.log(userCarID)} */}
                <Text>車牌號碼：{userCarID}</Text>
                {/* {console.log(userSpaceID)} */}
                <Text>車位號碼：{userSpaceID}</Text>
              </VStack>
            </Center>
          </ModalBody>

          <ModalFooter justifyContent={'center'} paddingBottom={'4vh'}>
            <ButtonGroup
              background="#E8F0D7"
              paddingLeft={1}
              paddingRight={1}
              paddingTop={1}
              paddingBottom={1}
              rounded={40}
            >
              <Button
                w="8vw"
                variant="ghost"
                color="#779341"
                rounded={30}
                onClick={navigateToHome}
              >
                回首頁x87
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default ParkingEnterModal;
