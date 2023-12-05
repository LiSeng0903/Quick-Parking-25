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
  Button,
  Image,
  Center,
  ButtonGroup,
  ChakraProvider,
} from '@chakra-ui/react';
import React from 'react';

const WarningLotModalModal = ({
  isOpenTest,
  onCloseTest,
  initialRefTest,
  finalRefTest,
}) => {
  return (
    <ChakraProvider>
      <Modal
        initialFocusRef={initialRefTest}
        finalFocusRef={finalRefTest}
        isOpen={isOpenTest}
        onClose={onCloseTest}
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
              Warning
            </ModalHeader>
            <FormControl>
              <FormLabel color={'black'}>請輸入車牌號碼</FormLabel>
              <Input
                ref={initialRefTest}
                placeholder="車號"
                borderColor={'#9E896A'}
                color={'gray.200'}
              />
            </FormControl>
          </ModalBody>

          {/* <ModalFooter justifyContent={'center'} paddingBottom={'4vh'}>
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
                onClick={onCloseTest}
              >
                取消
              </Button>
              <Button
                w="8vw"
                variant="solid"
                bg="#779341"
                color="#FFFFFF"
                rounded={30}
              >
                確認
              </Button>
            </ButtonGroup>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};


export default WarningLotModalModal;
