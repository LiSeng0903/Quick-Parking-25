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
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useNavigate, useState } from 'react';

function FindCarEndModal({isEndOpen}) {

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

const FindCarResult = () => {
    // const searchInput = useLocation();
    const [openModal, setOpenModal] = useState(false);

    return(
        <Flex minWidth={'60vw'} justifyContent={'center'} height={'100vh'} alignItems={'center'}>
            <Box bg={'white'} width={'50%'} borderRadius={'10px'} padding={'5'}>
                <Heading size="lg">車牌號碼 B09705059</Heading>
                <Flex flexDirection={'column'} alignItems={'center'}>
                    <Box bg={'ButtonHighlight'} mt={5} textAlign={'left'} padding={'10px'} borderRadius={'5px'} width={'80%'}>
                        車位
                    </Box>
                    <Box bg={'ButtonHighlight'} mt={5} mb={5} textAlign={'left'} padding={'10px'} borderRadius={'5px'} width={'80%'}>
                        停放時間
                    </Box>
                </Flex>
                <Box display={'flex'} justifyContent={'space-evenly'} mt={4}>
                    <NavLink to="/home" >
                        <Button>取消</Button>
                    </NavLink>
                        <Button colorScheme='blue' onClick={setOpenModal}>確認</Button>
                </Box>
            </Box>
        </Flex>
    )
}

export default FindCarResult;