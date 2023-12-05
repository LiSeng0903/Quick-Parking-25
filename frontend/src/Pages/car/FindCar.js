import React, { useState } from 'react';
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

const initialState = {
  spacesId: '',
  carId: '',
};

const FindCar = () => {
  const toast = useToast();

  // handle search data
  const [formData, setformData] = useState(initialState);
  const { spacesId, carId } = formData;
  const handleInputChange = e => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const findCar = async e => {
    e.preventDefault();
    const userData = {
      spacesId,
      carId,
    };
  };

  return (
    <ChakraProvider>
      <AbsoluteCenter>
        <LightMode>
          <Card padding={5} rounded={20} shadow={'xl'}>
            <CardHeader pb={0}>
              <Heading size="md" textAlign={'center'} color={'#9E896A'}>
                找我的車子
              </Heading>
            </CardHeader>

            <CardBody>
              <Center>
                <Image
                  borderRadius="10px"
                  boxSize="150px"
                  src={'https://img.icons8.com/isometric/512/1FB141/car.png'}
                  alt={'car'}
                />
              </Center>
              <Stack>
                <FormControl mt={2} onSubmit={findCar}>
                  <FormLabel>請輸入車位</FormLabel>
                  <Input
                    type="spacesID"
                    value={spacesId}
                    borderColor={'#9E896A'}
                    color={'gray.500'}
                    placeholder="B09"
                    fontWeight={600}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>請輸入車牌號碼</FormLabel>
                  <Input
                    type="carID"
                    value={carId}
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
                background="#E8F0D7"
                paddingLeft={1}
                paddingRight={1}
                paddingTop={1}
                paddingBottom={1}
                rounded={40}
              >
                <NavLink to="/home">
                  <Button w="8vw" variant="ghost" color="#779341" rounded={30}>
                    取消
                  </Button>
                </NavLink>
                <NavLink to={'/find-car/result'}>
                  <Button
                    w="8vw"
                    variant="solid"
                    bg="#779341"
                    color="#FFFFFF"
                    rounded={30}
                    onClick={() =>
                      toast({
                        title: 'Submitted uccessfully!',
                        status: 'success',
                        isClosable: true,
                        position: 'top-right',
                      })
                    }
                  >
                    確認
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

export default FindCar;
