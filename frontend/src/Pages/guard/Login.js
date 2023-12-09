import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
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
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { guardLogIn } from '../../api';

const initialState = {
  account: '',
  password: '',
};

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  // handle login info
  const [formData, setformData] = useState(initialState);
  const { account, password } = formData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const isError = formData === '';

  const login = async (e) => {
    e.preventDefault();

    if (!account || !password) {
      toast({
        title: 'All fields are required',
        status: 'error',
        isClosable: true,
      });
    }

    const userData = {
      account,
      password,
    };

    try {
      const data = await guardLogIn(userData);
      console.log(data);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
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
                <FormControl mt={2} isInvalid={isError} onSubmit={login}>
                  <FormLabel>請輸入帳號</FormLabel>
                  <Input
                    type="account"
                    name="account"
                    borderColor={'#9E896A'}
                    color={'gray.700'}
                    placeholder="B09"
                    fontWeight={600}
                    value={account}
                    onChange={handleInputChange}
                  />
                  {!isError ? (
                    <FormHelperText>Enter the account.</FormHelperText>
                  ) : (
                    <FormErrorMessage>Account is required.</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>請輸入密碼</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    borderColor={'#9E896A'}
                    color={'gray.700'}
                    placeholder="B09705059"
                    fontWeight={600}
                    value={password}
                    onChange={handleInputChange}
                  />
                  {!isError ? (
                    <FormHelperText>Enter the password.</FormHelperText>
                  ) : (
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                  )}
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
