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
    Box
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useDisclosure } from '@chakra-ui/react';
import React from 'react';


function ParkingEnterModal({isOpen, onClose, initialRef, finalRef, endModalOpen, setEndModelOpen}) {

    return (
        <>
            {
                endModalOpen?
                <ParkingEndModal isEndOpen={endModalOpen} /> : <></>
            }
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay bg={'blackAlpha.700'}/>
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody pb={6} paddingTop={'10vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Box width={'80%'} height={'40vh'} bgColor={'blue.200'}>放圖案誒所在</Box>
                        <ModalHeader textAlign={'center'}>我要停車</ModalHeader>
                        <FormControl>
                        <FormLabel>請輸入車牌號碼</FormLabel>
                        <Input ref={initialRef} placeholder='車號' />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter justifyContent={'center'}>
                        <Button mr={3} onClick={onClose} width={'60%'}>
                        取消
                        </Button>
                        <Button onClick={setEndModelOpen} colorScheme='blue'>確認</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
        
    )
}

function ParkingEndModal({isEndOpen}) {

    let navigate = useNavigate(); 
    const navigateToHome = () =>{ 
        let path = `/home`; 
        navigate(path);
    }

    return(
        <>
            <Modal
                isOpen={isEndOpen}
                // onClose={onEndClose}
                isCentered
            >
                <ModalOverlay bg={'blackAlpha.700'}/>
                <ModalContent>
                    {/* <ModalCloseButton /> */}
                    <ModalBody pb={6} paddingTop={'10vh'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                        <Box width={'80%'} height={'40vh'} bgColor={'blue.200'}>放圖案誒所在</Box>
                        <ModalHeader textAlign={'center'}>您已完成停車</ModalHeader>
                    </ModalBody>

                    <ModalFooter justifyContent={'center'}>
                        <Button colorScheme='blue' onClick={navigateToHome}>回首頁</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
    </>
    )
}

export default ParkingEnterModal;