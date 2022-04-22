import React, { createContext, useEffect, useReducer } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Center,
  Button,
  Spinner,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';
import { initialState, reducer } from './reducers';
import axios from 'axios';
import TodoList from './components/TodoList';
import ModalAdd from './components/ModalAdd';

export const contextApp = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    isOpen: openModalAdd,
    onOpen: onOpenModalAdd,
    onClose: onCLoseModalAdd,
  } = useDisclosure();

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
              onClick={onOpenModalAdd}
            >
              Add Task
            </Button>

            <Tabs>
              <TabList>
                <Tab> Todo List</Tab>
                <Tab>List Done</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {state.isLoading ? <Spinner /> : <TodoList />}
                </TabPanel>
                <TabPanel>
                  {state.isLoading ? <Spinner /> : <TodoList isDone />}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Center>

        <ModalAdd isOpen={openModalAdd} onClose={onCLoseModalAdd} />
      </contextApp.Provider>
    </ChakraProvider>
  );
}

export default App;
