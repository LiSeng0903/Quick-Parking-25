import React from 'react';
import { Button } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import { IoCaretForwardCircle } from 'react-icons/io5';

const CustomButton = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;


  return (
    <NavLink to={to}>
      <Button
        variant="solid"
        rounded={40}
        shadow={'md'}
        bg={isActive ? '#9E896A' : '#EBE2D5'}
        paddingLeft={8}
        paddingRight={8}
        paddingTop={6}
        paddingBottom={6}
        fontSize={'24px'}
        rightIcon={<IoCaretForwardCircle />}
        
        mb={'2vh'}
      >
        {label}
      </Button>
    </NavLink>
  );
};

export default CustomButton;
