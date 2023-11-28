import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Heading,
    Flex,
    Button
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const FindCar = () => {

    return(
        <Flex minWidth={'60vw'} justifyContent={'center'} height={'100vh'} alignItems={'center'}>
            <Box bg={'white'} width={'50%'} borderRadius={'10px'} padding={'5'}>
                <Heading size="lg">找我的車子</Heading>
                <FormControl mt={6}>
                    <FormLabel>請輸入車位</FormLabel>
                    <Input type='email' />
                </FormControl>
                <FormControl mt={4} mb={8}>
                    <FormLabel>請輸入車牌號碼</FormLabel>
                    <Input type='email' />
                </FormControl>
                <Box display={'flex'} justifyContent={'space-evenly'}>
                    <NavLink to="/home" >
                        <Button>取消</Button>
                    </NavLink>
                    <NavLink to={"/find-car/result"}>
                        <Button colorScheme='blue'>確認</Button>
                    </NavLink>
                </Box>
            </Box>
        </Flex>
    )
}

export default FindCar;