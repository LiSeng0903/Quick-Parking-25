import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Box,
  Heading,
  Flex,
  Button,
  ChakraProvider,
  Center,
  AbsoluteCenter,
  StackDivider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  ButtonGroup,
  Image,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const FindCar = () => {
  return (
    <ChakraProvider>
      <AbsoluteCenter>
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
              <FormControl mt={2}>
                <FormLabel>請輸入車位</FormLabel>
                <Input
                  type="text"
                  borderColor={'#9E896A'}
                  color={'gray.500'}
                  placeholder="B09"
                  fontWeight={600}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>請輸入車牌號碼</FormLabel>
                <Input
                  type="text"
                  borderColor={'#9E896A'}
                  color={'gray.500'}
                  placeholder="B09705059"
                  fontWeight={600}
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
                >
                  確認
                </Button>
              </NavLink>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </AbsoluteCenter>
    </ChakraProvider>
  );
};

export default FindCar;
