import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

function TodoCard({ item, clickDetail }) {
  return (
    <Box bg="#ccc" textAlign="left" p={2} my={2}>
      <Flex>
        <Text fontSize="2xl">{item.title}</Text>
        <Spacer />
        <Button
          bg="#00b894"
          color="white"
          _hover={{ color: 'black', bg: '#55efc4' }}
          mr={2}
          onClick={() => clickDetail(item)}
        >
          <SearchIcon />
        </Button>
        <Button
          bg="#00b894"
          color="white"
          _hover={{ color: 'black', bg: '#55efc4' }}
          mr={2}
        >
          <EditIcon />
        </Button>
        <Button
          bg="tomato"
          color="white"
          _hover={{ color: 'black', bg: 'white' }}
        >
          <DeleteIcon />
        </Button>
      </Flex>
    </Box>
  );
}

export default TodoCard;
