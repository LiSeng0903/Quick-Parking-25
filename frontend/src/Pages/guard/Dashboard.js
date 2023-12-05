import React from 'react';
import { Box, ChakraProvider, Heading } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <ChakraProvider>
      <Heading>Hi!</Heading>
    </ChakraProvider>
  );
};

export default Dashboard;
