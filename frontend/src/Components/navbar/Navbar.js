import { IoCaretForwardCircle } from 'react-icons/io5';
import {
  Flex,
  Button,
  Spacer,
  HStack,
  ButtonGroup,
  Image,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar(props) {
  const navigate = useNavigate();
  const navigateToHome = () => {
    let path = `/home`;
    navigate(path);
  };

  const handleButtonClick = async (floor) => {
    await props.setSelectedFloor(floor);
    props.fetchData(floor);
    // console.log('floor', floor);
  }
  
  return (
    <Flex as="nav" p="10px" mb="10px" alignItems="center">
      <Image
        borderRadius="10px"
        boxSize="50px"
        src={'https://img.icons8.com/isometric/512/1FB141/home.png'}
        alt={'ok'}
        cursor={'pointer'}
        onClick={navigateToHome}
      />
      <Spacer />
      <HStack spacing="20px">
        <ButtonGroup
          spacing={5}
          bg={'white'}
          paddingLeft={6}
          paddingRight={6}
          paddingTop={2}
          paddingBottom={2}
          rounded={40}
          shadow={'md'}
        >
          {[1, 2, 3, 4, 5].map((floorNumber, index) => (
            <Button
              key={index}
              variant="solid"
              bg={floorNumber === props.selectedFloor ? '#9E896A' : '#EBE2D5'}
              color={'white'}
              // color={floorNumber === props.selectedFloor ? 'white' : '#CDB89A'}
              rounded={30}
              fontSize={24}
              rightIcon={<IoCaretForwardCircle />}
              onClick={() => handleButtonClick(floorNumber)}
            >
              {floorNumber}F
            </Button>
          ))}
        </ButtonGroup>
      </HStack>
      <Spacer />
    </Flex>
  );
}