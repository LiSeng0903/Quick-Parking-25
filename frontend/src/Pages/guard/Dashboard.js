import React from 'react';
import { Box, ChakraProvider, Heading } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <ChakraProvider>
        <Box w={'80vw'}>
          <Heading color={'black'}>Hi!</Heading>
        </Box>
    </ChakraProvider>
  );
};

export default Dashboard;
