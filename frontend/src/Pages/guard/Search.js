import React, { useState } from 'react';
import {
  ChakraProvider,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
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
import { getGuardCarSpace } from '../../api';
import GuardSearchDetail from '../../Components/modal/GuardSearchDetail';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [spaceId, setSpaceId] = useState('');
  const [currentCarId, setCurrentCarId] = useState(null);
  const [items, setItems] = useState([]);
  const [parkTime, setparkTime] = useState(null);
  const [parkingSpaceId, setParkingSpaceId] = useState(null);
  const [status, setStatus] = useState(null);
  const [itemIsLoaded, setItemIsLoaded] = useState(false);

  const handleSpaceIdInputChange = event => {
    setItemIsLoaded(false);
    setSpaceId(event.target.value);
  };

  const fetchData = async () => {
    try {
      const data = await getGuardCarSpace(spaceId);
      // 讓現在在停放的排前面
      const sortedHistory = data.history.slice().sort((a, b) => {
        if (!a.endTime && !b.endTime) return 0; // 如果都沒有結束時間，保持原始順序
        if (!a.endTime) return -1; // a 沒有結束時間，排在最前面
        if (!b.endTime) return 1; // b 沒有結束時間，排在後面
        return new Date(b.endTime) - new Date(a.endTime); // 比較結束時間，時間較晚的排在前面
      });
      setCurrentCarId(data.currentCarId);
      setItems(
        sortedHistory.map(item => ({
          cardTitle: '車牌號碼： ' + item.carId,
          cardDetailedText: [
            item.endTime
              ? '結束停放時間： ' + item.endTime.replace('T', ' ')
              : '🚗 停放中',
            '開始停放時間： ' + item.startTime.replace('T', ' '),
          ],
        }))
      );
      setItemIsLoaded(true);
      console.log(data.history);
      setparkTime(data.parkTime);
      setParkingSpaceId(data.parkingSpaceId);
      setStatus(data.status);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChakraProvider>
      <Box ml={'10vw'}>
        <Center>
          <LightMode>
            <Card padding={5} rounded={20} shadow={'xl'} zIndex={3}>
              <CardHeader pb={0}>
                <Heading size="md" textAlign={'center'} color={'#9E896A'}>
                  查詢
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
                  <FormControl
                    mt={2}
                    //onSubmit={search}
                  >
                    <FormLabel>請輸入車位</FormLabel>
                    <Input
                      type="text"
                      borderColor={'#9E896A'}
                      color={'gray.700'}
                      placeholder="B09"
                      fontWeight={600}
                      onChange={handleSpaceIdInputChange}
                    />
                  </FormControl>
                  {/* <FormControl mb={4}>
                    <FormLabel>請輸入車牌號碼</FormLabel>
                    <Input
                      type="text"
                      borderColor={'#9E896A'}
                      color={'gray.700'}
                      placeholder="B09705059"
                      fontWeight={600}
                      // onChange={handleInputChange}
                    />
                  </FormControl> */}
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
                  <Button w="8vw" variant="ghost" color="#9E896A" rounded={30}>
                    取消
                  </Button>
                  <Button
                    w="8vw"
                    variant="solid"
                    bg="#9E896A"
                    color="#FFFFFF"
                    rounded={30}
                    onClick={() => {
                      fetchData();
                      setIsOpen(true);
                    }}
                  >
                    確認
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </LightMode>
        </Center>
      </Box>
      <Box style={{ display: isOpen ? 'flex' : 'none' }} ml={'5vw'}>
        <LightMode>
          {itemIsLoaded ? (
            <GuardSearchDetail
              status={status}
              parkingSpaceId={parkingSpaceId}
              currentCarId={currentCarId}
              parkTime={parkTime}
              items={items}
            />
          ) : (
            <></>
          )}
        </LightMode>
      </Box>
    </ChakraProvider>
  );
};

export default Search;
