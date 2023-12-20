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
  space,
} from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCarSpace } from '../../api';

const initialState = {
  spacesId: '',
  carId: '',
};

const FindCar = () => {
  const toast = useToast();
  const navigate = useNavigate();

  // handle search data
  // const [formData, setformData] = useState(initialState);
  const [carId, setCarId] = useState(null);
  const [spaceId, setSpaceId] = useState(null);
  // const { spacesId, carId } = formData;
  // const handleInputChange = e => {
  //   const { name, value } = e.target;
  //   setformData({ ...formData, [name]: value });
  //   console.log(formData)
  // };

  const handleCarIdInputChange = event => {
    setCarId(event.target.value);
  };

  const handleSpaceIdInputChange = event => {
    setSpaceId(event.target.value);
  };

  const findCar = async e => {
    // e.preventDefault();
    // const userData = {
    //   spacesId,
    //   carId,
    // };

    try {
      const carSpaceData = await getCarSpace(carId, spaceId);

      // 在這裡處理 carSpaceData，可能是顯示在介面上或者進一步的邏輯
      console.log('Car space data:', carSpaceData);
      console.log(typeof(spaceIdProp))
      navigate('/find-car/result', { state: { carData: carSpaceData } });
      toast({
        title: 'Submitted successfully!',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.error('Error fetching car space data:', error);

      toast({
        title: 'Error submitting!',
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    }
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
                    // value={formData.spacesId}
                    borderColor={'#9E896A'}
                    color={'gray.700'}
                    placeholder="例如：1011"
                    fontWeight={600}
                    onChange={handleSpaceIdInputChange}
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>請輸入車牌號碼</FormLabel>
                  <Input
                    type="carID"
                    // value={formData.carId}
                    borderColor={'#9E896A'}
                    color={'gray.700'}
                    placeholder="例如：NTUIMgood"
                    fontWeight={600}
                    onChange={handleCarIdInputChange}
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
                <Button
                  w="8vw"
                  variant="solid"
                  bg="#779341"
                  color="#FFFFFF"
                  rounded={30}
                  onClick={findCar}
                >
                  確認
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </LightMode>
      </AbsoluteCenter>
    </ChakraProvider>
  );
};

export default FindCar;
