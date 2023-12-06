import React, { useState } from 'react';
import {
  Box,
  Center,
  Image,
  Button,
  VStack,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';
import format from 'date-fns/format';

const Sidebar = props => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const logout = async () => {
    // await logoutUser();
    // await dispatch(SET_LOGIN(false));
    navigate('/');
  };
  const goHome = () => {
    // await logoutUser();
    // await dispatch(SET_LOGIN(false));
    navigate('/');
  };
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const intervalID = window.setInterval(() => {
      console.log('過一秒囉');
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <Box
      className="layout"
      left={0}
      width={'10vw'}
      background={'#FBFBF9'}
      height={'100vh'}
      style={{ width: isOpen ? '20vw' : '5vw', transition: 'all .5s' }}
    >
      <Button color={'black'} onClick={toggle} position={'revert'}>
        <HamburgerIcon />
      </Button>
      <Center>
        <VStack>
          <Image
            borderRadius="10px"
            boxSize="150px"
            src={'https://img.icons8.com/isometric/512/1FB141/user-female.png'}
            alt={'guard'}
            marginTop={'10vh'}
            style={{ width: isOpen ? '150px' : '0vw' }}
            cursor={'pointer'}
            onClick={goHome}
          />
          <Spacer />
          <Spacer />
          <Spacer />
          <Text
            color={'#9E896A'}
            style={{ display: isOpen ? 'flex' : 'none', transition: 'all .3s' }}
          >
            您好！辛苦了！
          </Text>
          <Text
            as={'b'}
            color={'#9E896A'}
            style={{ display: isOpen ? 'flex' : 'none', transition: 'all .3s' }}
          >
            {format(time, 'hh:mm:ss a')}
          </Text>
        </VStack>
      </Center>

      <Box>
        <VStack
          mt={'5vh'}
          style={{ display: isOpen ? 'flex' : 'none', transition: 'all .3s' }}
        >
          <CustomButton to="/guard/dashboard" label="一覽" />
          <CustomButton to="/guard/search" label="查詢" />
          <CustomButton to="/guard/map" label="地圖" />
          <CustomButton to="/" label="登出" onClick={logout} />
        </VStack>
      </Box>
    </Box>
  );
};

export default Sidebar;
