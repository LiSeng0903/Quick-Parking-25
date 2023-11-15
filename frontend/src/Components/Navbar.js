import { BellIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  Text,
  Button,
  Spacer,
  HStack,
  useToast,
  AvatarBadge,
  Avatar,
  ButtonGroup,
} from '@chakra-ui/react';

export default function Navbar() {
  const toast = useToast();

  return (
    <Flex as="nav" p="10px" mb="60px" alignItems="left">
      {/* <Heading as="h1" fontSize="1.5em">
        Guard
      </Heading> */}
      <Spacer />

      <HStack spacing="20px">
        {/* <Avatar name="mario" src="/img/mario.png">
          <AvatarBadge width="1.3em" bg="teal.500">
            <Text fontSize="xs" color="white">
              3
            </Text>
          </AvatarBadge>
        </Avatar> */}
        {/* <Text>Guard log out</Text> */}
        <ButtonGroup>
          <Button
            variant="outline"
            colorScheme="green"
            borderColor="green.500"
            onClick={() =>
              toast({
                title: '這是第一樓',
                // description: '這是第一樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              })
            }
          >
            第一樓
          </Button>
          <Button
            variant="outline"
            colorScheme="green"
            borderColor="green.500"
            onClick={() =>
              toast({
                title: '這是第二樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              })
            }
          >
            第二樓
          </Button>
          <Button
            variant="outline"
            colorScheme="green"
            onClick={() =>
              toast({
                title: '這是第三樓',
                // description: '這是第一樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              })
            }
          >
            第三樓
          </Button>
          <Button
            variant="outline"
            colorScheme="green"
            onClick={() =>
              toast({
                title: '這是第四樓',
                // description: '這是第一樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              })
            }
          >
            第四樓
          </Button>
          <Button
            variant="outline"
            colorScheme="green"
            onClick={() =>
              toast({
                title: '這是第五樓',
                // description: '這是第一樓',
                duration: 10000,
                isClosable: true,
                position: 'top',
                status: 'success',
                icon: <BellIcon />,
              })
            }
          >
            第五樓
          </Button>
        </ButtonGroup>
      </HStack>
    </Flex>
  );
}
