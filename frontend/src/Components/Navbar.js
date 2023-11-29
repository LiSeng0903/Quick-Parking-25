import { BellIcon } from '@chakra-ui/icons';
import {
  Flex,
  Button,
  Spacer,
  HStack,
  useToast,
  ButtonGroup,
  Center,
  Image
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


export default function Navbar(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const navigateToHome = () => {
    let path = `/home`;
    navigate(path);
  };

  return (
    <Flex as="nav" p="10px" mb="10px" alignItems="center">
      {/* <Heading as="h1" fontSize="1.5em">
        Guard
      </Heading> */}
      <Image
        borderRadius="10px"
        boxSize="50px"
        src={'https://img.icons8.com/isometric/512/1FB141/home.png'}
        alt={'ok'}
        cursor={'pointer'}
        onClick={navigateToHome}
      />
      <Spacer />
      <HStack spacing="20px">
        <ButtonGroup
          spacing={5}
          bg={'white'}
          paddingLeft={6}
          paddingRight={6}
          paddingTop={2}
          paddingBottom={2}
          rounded={40}
        >
          <Button
            variant="solid"
            bg="#9E896A"
            color={'white'}
            rounded={30}
            fontSize={24}
            onClick={() => {
              props.setSelectedFloor(1);
              toast({
                title: '這是第一樓',
                // description: '這是第一樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              });
            }}
          >
            第一樓
          </Button>
          <Spacer />

          <Button
            variant="solid"
            bg="#9E896A"
            color={'white'}
            rounded={30}
            fontSize={24}
            onClick={() => {
              props.setSelectedFloor(2);
              toast({
                title: '這是第二樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              });
            }}
          >
            第二樓
          </Button>
          <Spacer />

          <Button
            variant="solid"
            bg="#9E896A"
            color={'white'}
            rounded={30}
            fontSize={24}
            onClick={() => {
              props.setSelectedFloor(3);
              toast({
                title: '這是第三樓',
                // description: '這是第一樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              });
            }}
          >
            第三樓
          </Button>
          <Spacer />

          <Button
            variant="solid"
            bg="#9E896A"
            color={'white'}
            rounded={30}
            fontSize={24}
            onClick={() => {
              props.setSelectedFloor(4);
              toast({
                title: '這是第四樓',
                // description: '這是第一樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              });
            }}
          >
            第四樓
          </Button>
          <Spacer />

          <Button
            variant="solid"
            bg="#9E896A"
            color={'white'}
            rounded={30}
            fontSize={24}
            onClick={() => {
              props.setSelectedFloor(4);
              toast({
                title: '這是第五樓',
                // description: '這是第一樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              });
            }}
          >
            第五樓
          </Button>
        </ButtonGroup>
      </HStack>
      <Spacer />
    </Flex>
  );
}
