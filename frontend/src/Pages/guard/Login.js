import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  ChakraProvider,
  Center,
  AbsoluteCenter,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  ButtonGroup,
  Image,
  LightMode,
  useToast,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const initialState = {
  account: '',
  password: '',
};

const Login = () => {
  const toast = useToast();

  // handle login info
  const [formData, setformData] = useState(initialState);
  const { account, password } = formData;
  const handleInputChange = e => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async e => {
    e.preventDefault();

    // if (!account || !password) {
    //   toast({
    //     title: 'All fields are required',
    //     status: 'error',
    //     isClosable: true,
    //   });
    // }

    const userData = {
      account,
      password,
    };
    // setIsLoading(true);
    // try {
    //   const data = await loginUser(userData);
    //   console.log(data);
    //   await dispatch(SET_LOGIN(true));
    //   await dispatch(SET_NAME(data.name));
    //   navigate('/dashboard');
    //   //   setIsLoading(false);
    // } catch (error) {
    //   //   setIsLoading(false);
    // }
  };

  return (
    <ChakraProvider>
      <AbsoluteCenter>
        <LightMode>
          <Card padding={5} rounded={20} shadow={'xl'}>
            <CardHeader pb={0}>
              <Heading size="md" textAlign={'center'} color={'#9E896A'}>
                管理員登入系統
              </Heading>
            </CardHeader>

            <CardBody>
              <Center>
                <Image
                  borderRadius="10px"
                  boxSize="150px"
                  src={
                    'https://img.icons8.com/isometric/512/1FB141/user-female.png'
                  }
                  alt={'guard'}
                />
              </Center>
              <Stack>
                <FormControl mt={2} onSubmit={login}>
                  <FormLabel>請輸入帳號</FormLabel>
                  <Input
                    type="account"
                    name="account"
                    value={account}
                    borderColor={'#9E896A'}
                    color={'gray.500'}
                    placeholder="B09"
                    fontWeight={600}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>請輸入密碼</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    borderColor={'#9E896A'}
                    color={'gray.500'}
                    placeholder="B09705059"
                    fontWeight={600}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Stack>
            </CardBody>
            <CardFooter justifyContent={'center'}>
              <ButtonGroup
                background="#EEE8D7"
                paddingLeft={1}
                paddingRight={1}
                paddingTop={1}
                paddingBottom={1}
                rounded={40}
              >
                <NavLink to="/home">
                  <Button w="8vw" variant="ghost" color="#9E896A" rounded={30}>
                    取消
                  </Button>
                </NavLink>
                <NavLink to={'/guard/dashboard'}>
                  <Button
                    w="8vw"
                    variant="solid"
                    bg="#9E896A"
                    color="#FFFFFF"
                    rounded={30}
                    onClick={() =>
                      toast({
                        title: 'Log in successfully!',
                        status: 'success',
                        isClosable: true,
                        position: 'top-right',
                      })
                    }
                  >
                    登入
                  </Button>
                </NavLink>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </LightMode>
      </AbsoluteCenter>
    </ChakraProvider>
  );
};

export default Login;
