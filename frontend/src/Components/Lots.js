import {
  Grid,
  GridItem,
  Stack,
  Box,
  Wrap,
  WrapItem,
  Button,
  ButtonGroup,
  ChakraProvider,
  theme,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function Lots() {
  const lotsCnt = 20;
  const lotsType = 'cars';
  const mockLots = [
    {
      lotId: '1',
      isEmpty: true,
      lotType: 'normal',
      floor: 1,
      status: true,
      history: [],
    },
    // {
    //   lotId: '2',
    //   isEmpty: false,
    //   lotType: 'disable',
    //   floor: 1,
    //   status: true,
    //   history: [],
    // },
    {
      lotId: '2',
      isEmpty: false,
      lotType: 'priority',
      floor: 1,
      status: true,
      history: [],
    },
    {
      lotId: '3',
      isEmpty: false,
      lotType: 'normal',
      floor: 1,
      status: true,
      history: [],
    },
    {
      lotId: '4',
      isEmpty: true,
      lotType: 'normal',
      floor: 1,
      status: true,
      history: [],
    },
  ];
  // console.log(mockLots);

  // Duplicate each element 20 times
  const motorLots = [];
  const carLots = [];
  const numberOfDuplicates = 10; // mock lot 的重複次數
  const isEmptyColor = '#A3C561';
  const isOccupiedColor = '#9E896A';
  const bgColor = '#F0EFE5';

  mockLots.forEach(lot => {
    for (let i = 0; i < numberOfDuplicates; i++) {
      motorLots.push({ ...lot });
      carLots.push({ ...lot });
    }
  });

  const allLots = [motorLots, motorLots, carLots];
  const newMotorLots = motorLots.slice(0, 30);
  // console.log(duplicatedLots);
  return (
    <ChakraProvider theme={theme}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        bg={bgColor}
        // h="100vh"
        // w={'100vw'}
        padding={5}
        maxHeight={'80vh'}
        height={'80vh'}
        maxWidth={'100vw'}
      >
        {/* Left Section */}
        <Box
          //   display={'flex'}
          //   flexDirection={'column'}
          width={'30%'}
          maxWidth={'30%'}
          overflow={'scroll'}
          //   maxHeight={'80vh'}
          padding={5}
          marginRight={5}
        >
          <Box
            borderWidth="1px"
            borderRadius="lg"
            display={'flex'}
            height={'10vh'}
            justifyContent={'center'}
            alignItems={'center'}
            // marginTop={'5vh'}
            marginBottom={'5vh'}
            borderColor={isOccupiedColor}
          >
            Guard
          </Box>
          <Box display={'flex'} flexDirection={'row'}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              display={'flex'}
              justifyContent={'center'}
              borderColor={isOccupiedColor}
            >
              <Stack direction="row" width={'65%'}>
                <Wrap spacing={'3'} width={'100%'}>
                  {newMotorLots.map(lot => (
                    <WrapItem width={'2vw'} key={lot.lotId}>
                      <Button
                        // colorScheme="red"
                        bg={isEmptyColor}
                        width={'100%'}
                        height={'3vh'}
                      ></Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </Stack>
              <Box style={{ writingMode: 'vertical-rl' }} bg={'white'}>
                ZONE
              </Box>
            </Box>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              display={'flex'}
              justifyContent={'center'}
              borderColor={isOccupiedColor}
            >
              <Stack direction="row" width={'65%'}>
                <Wrap spacing={'3'} width={'100%'}>
                  {newMotorLots.map(lot => (
                    <WrapItem width={'2vw'} key={lot.lotId}>
                      <Button
                        // colorScheme="red"
                        bg={isOccupiedColor}
                        width={'100%'}
                        height={'3vh'}
                      ></Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </Stack>
              <Box style={{ writingMode: 'vertical-rl' }} bg={'white'}>
                ZONE
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Right Section */}
        <Box height={'80vh'} overflow={'scroll'}>
          {allLots.map((lots, cnt) => (
            <React.Fragment key={cnt}>
              {/* Zone Section */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                width={'70vw'}
                margin={'2vh'}
                overflow={'scroll'}
                borderColor={isOccupiedColor}
              >
                <Box width={'100%'} bg={'white'}>
                  ZONE
                </Box>
                <Stack direction="column">
                  <Wrap spacing={1}>
                    {lots.map(lot => (
                      <WrapItem key={lot.lotId} width={'3vw'} margin={'1px'}>
                        <Button
                          bg={lot.isEmpty ? isEmptyColor : isOccupiedColor}
                          width={'1vw'}
                          height={'8vh'}
                          variant={'solid'}
                        >
                          {/* {lot.isEmpty ? 'isEmpty' : 'isNotEmpty'} */}
                        </Button>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Stack>
              </Box>
              {/* <Text>單行道</Text> */}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
}
