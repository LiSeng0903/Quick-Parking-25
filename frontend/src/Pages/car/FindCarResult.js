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
import { NavLink } from 'react-router-dom';

const FindCarResult = () => {
  return (
    <ChakraProvider>
      <AbsoluteCenter>
        <LightMode>
          <Card padding={5} rounded={20} shadow={'xl'}>
            <CardHeader pb={0}>
              <Heading size="md" textAlign={'center'} color={'#9E896A'}>
                車牌號碼 B09705059
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
                    //   borderColor={'#9E896A'}
                    color={'blackAlpha'}
                    value={'B09'}
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
                    //   borderColor={'#9E896A'}
                    color={'blackAlpha'}
                    value={'5hr'}
                    variant="filled"
                    fontWeight={600}
                    cursor={'default'}
                    isReadOnly
                  />
                </FormControl>
              </Stack>
            </CardBody>
            <CardFooter>
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
                    我要取車
                  </Button>
                </NavLink>
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
              </ButtonGroup>
            </CardFooter>
          </Card>
        </LightMode>
      </AbsoluteCenter>
    </ChakraProvider>
  );
};

export default FindCarResult;
