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
import { useState, useContext } from 'react';
import { guardLogIn } from '../../api';
import { setAuthToken } from '../../utils/util';
import { AuthContext } from '../../protect';

const initialState = {
  account: '',
  password: '',
};

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  // const { setUser } = useContext(AuthContext);

  // handle login info
  const [formData, setformData] = useState(initialState);
  const { account, password } = formData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
    console.log(formData);
  };

  const isError = formData === '';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Submit the form
   * @param {*} e
   */
  const login = async e => {
    e.preventDefault();

    const userData = {
      account,
      password,
    };
    // console.log('userData', JSON.stringify(userData));

    // alert(account);
    if (!account || !password) {
      toast({
        title: 'All fields are required',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    } else {
      try {
        console.log('Before guardLogIn');
        const data = await guardLogIn(userData);
        console.log('After guardLogIn, data:', data);
        if (data.success === true) {
          console.log(data.message);
          toast({
            title: 'Log in successfully!',
            status: 'success',
            isClosable: true,
            position: 'top',
          });
          // Update the isLoggedIn state
          setIsLoggedIn(true);
          console.log(isLoggedIn);
        }
        toast({
          title: 'Log in successfully!',
          status: 'success',
          isClosable: true,
          position: 'top',
        });
        navigate('/guard/dashboard');
        toast({
          title: 'Log in successfully!',
          status: 'success',
          isClosable: true,
          position: 'top',
        });
        setAuthToken(data.access_token);

      } catch (error) {
        console.log('Error:', error);
        toast({
          title: "Guard account didn't exist!",
          status: 'error',
          isClosable: true,
          position: 'top',
        });
      }
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
                <FormControl mt={2} isInvalid={isError}>
                  <FormLabel>請輸入帳號</FormLabel>
                  <Input
                    type="account"
                    name="account"
                    borderColor={'#9E896A'}
                    color={'gray.700'}
                    placeholder="Username"
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
                    placeholder="Password"
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
                    type="submit"
                    onClick={login}
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

export const setLoggedIn = isLoggedIn => ({
  type: 'SET_LOGGED_IN',
  payload: isLoggedIn,
});

export default Login;
