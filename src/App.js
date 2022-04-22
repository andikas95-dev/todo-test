import React, { createContext, useEffect, useReducer } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Center,
  Button,
  Flex,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import TodoCard from './components/TodoCard';
import { initialState, reducer } from './reducers';
import axios from 'axios';
import TodoList from './components/TodoList';

export const contextApp = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: 'loading' });
    try {
      const res = await axios.get(
        'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list'
      );
      dispatch({ type: 'fetch_done', payload: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: 'loading' });
    }
  };
  console.log(state);

  return (
    <ChakraProvider theme={theme}>
      <contextApp.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Center height="100vh">
          <Box borderWidth="1px" textAlign="center" width={700}>
            <Text fontSize="4xl">To Do App</Text>
            <Button
              width="100%"
              variant="solid"
              mt={5}
              leftIcon={<SmallAddIcon />}
            >
              Add Task
            </Button>
            <Flex align="center">
              <Divider />
              <Text padding="2" w="100%">
                Todo List
              </Text>
              <Divider />
            </Flex>
            {state.isLoading ? <Spinner /> : <TodoList />}
          </Box>
        </Center>
      </contextApp.Provider>
    </ChakraProvider>
  );
}

export default App;
