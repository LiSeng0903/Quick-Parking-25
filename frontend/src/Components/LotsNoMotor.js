import { Grid, GridItem, Stack, Box, Wrap, WrapItem, Button, ButtonGroup } from '@chakra-ui/react';
import React from 'react';


export default function Lots() {
    const lotsCnt = 20
    const lotsType = "cars"
    const mockLots = [
        {
            lotId: '1', 
            isEmpty: true,
            lotType: "normal",
            floor: 1,
            status: true,
            history: []
        }, {
            lotId: '2', 
            isEmpty: false,
            lotType: "disable",
            floor: 1,
            status: true,
            history: []
        }, {
            lotId: '3', 
            isEmpty: true,
            lotType: "pregnancy",
            floor: 1,
            status: true,
            history: []
        }, {
            lotId: '4',
            isEmpty: false,
            lotType: "normal",
            floor: 1,
            status: true,
            history: []
        }
    ]
    // console.log(mockLots);

    // Duplicate each element 20 times
    const motorLots = [];
    const carLots = []
    const numberOfDuplicates = 20;

    mockLots.forEach((lot) => {
        for (let i = 0; i < numberOfDuplicates; i++) {
            motorLots.push({ ...lot });
            carLots.push({...lot});
        }
    });

    const allLots = [motorLots, motorLots, carLots]
    const newMotorLots = motorLots.slice(0, 40);
    // console.log(duplicatedLots);
    return (
        <>
          <Box display={'flex'} flexDirection={'row'}>
            {/* Left Section */}
            <Box display={'flex'} flexDirection={'column'} width={'40%'} display={'flex'} justifyContent={'center'}>
                <Box borderWidth='1px' borderRadius='lg'  display={'flex'} height={'30vh'} justifyContent={'center'} alignItems={'center'} marginTop={'5vh'} marginBottom={'10vh'}>
                    <Box width={'80%'}>
                        繳費機
                    </Box>
                </Box>
            </Box>
            {/* Right Section */}
            <Box>
                {allLots.map((lots, cnt) => (
                <React.Fragment key={cnt}>
                    {/* Zone Section */}
                    <Box borderWidth='1px' borderRadius='lg' width={'70vw'} margin={'5vh'}>
                        <Box width={'100%'} bg={'gray.200'}>
                            ZONE
                        </Box>
                        <Stack direction='column'>
                            <Wrap spacing={1}>
                            {lots.map((lot) => (
                                <WrapItem key={lot.lotId} width={'3vw'} margin={'1px'}>
                                    <Button
                                        colorScheme={lot.isEmpty ? 'gray' : 'yellow'}
                                        width={'1vw'}
                                        height={'8vh'}
                                    >
                                        {/* {lot.isEmpty ? 'isEmpty' : 'isNotEmpty'} */}
                                    </Button>
                                </WrapItem>
                            ))}
                            </Wrap>
                        </Stack>
                    </Box>
                </React.Fragment>
                ))}
            </Box>
          </Box>
        </>
      );
      
}