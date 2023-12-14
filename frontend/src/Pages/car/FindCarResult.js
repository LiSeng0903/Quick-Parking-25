import {
  Heading,
  Button,
  ChakraProvider,
  AbsoluteCenter,
  FormControl,
  FormLabel,
  Input,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  ButtonGroup,
  Image,
  LightMode,
} from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';

const FindCarResult = () => {
  const location = useLocation()
  var carData = location.state.carData
  return (
    <ChakraProvider>
      <AbsoluteCenter>
        <LightMode>
          <Card padding={5} rounded={20} shadow={'xl'}>
            <CardHeader pb={0}>
              <Heading size="md" textAlign={'center'} color={'#9E896A'}>
                車牌號碼 {carData.carId || 'null'}
              </Heading>
            </CardHeader>

            <CardBody>
              <Center>
                <Image
                  borderRadius="10px"
                  boxSize="150px"
                  src={
                    'https://img.icons8.com/isometric/512/1FB141/car-theft.png'
                  }
                  alt={'car'}
                />
              </Center>
              <Stack>
                <FormControl mt={2}>
                  <FormLabel>車位</FormLabel>
                  <Input
                    type="text"
                    color={'blackAlpha'}
                    value={carData.spaceId || 'null'}
                    variant="filled"
                    fontWeight={600}
                    cursor={'default'}
                    isReadOnly
                  />
                </FormControl>
                <FormControl mb={4}>
                  <FormLabel>停放時間</FormLabel>
                  <Input
                    type="text"
                    color={'blackAlpha'}
                    value={carData.parkTime || 'null'}
                    variant="filled"
                    fontWeight={600}
                    cursor={'default'}
                    isReadOnly
                  />
                </FormControl>
              </Stack>
            </CardBody>
            <CardFooter justifyContent={'center'}>
              {/* <ButtonGroup
                background="#E8F0D7"
                paddingLeft={1}
                paddingRight={1}
                paddingTop={1}
                paddingBottom={1}
                rounded={40}
              >
                <NavLink to="/home">
                  <Button w="8vw" variant="ghost" color="#779341" rounded={30}>
                    查我的車
                  </Button>
                </NavLink> */}
                <NavLink to="/home">
                  <Button
                    w="8vw"
                    variant="solid"
                    bg="#779341"
                    color="#FFFFFF"
                    rounded={30}
                  >
                    確認
                  </Button>
                </NavLink>
              {/* </ButtonGroup> */}
            </CardFooter>
          </Card>
        </LightMode>
      </AbsoluteCenter>
    </ChakraProvider>
  );
};

export default FindCarResult;
