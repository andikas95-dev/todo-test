import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { contextApp } from '../App';

function TodoCard({ item, clickDetail, clickEdit, isDone }) {
  const { dispatch } = useContext(contextApp);
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
          onClick={() => clickEdit(item)}
        >
          <EditIcon />
        </Button>
        {!isDone && (
          <Button
            bg="tomato"
            color="white"
            _hover={{ color: 'black', bg: 'white' }}
            onClick={e => {
              dispatch({ type: 'delete_todo', payload: item.id });
            }}
          >
            <DeleteIcon />
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default TodoCard;
