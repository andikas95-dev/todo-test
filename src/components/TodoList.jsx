import { Box, Text, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { contextApp } from '../App';
import ModalAdd from './ModalAdd';
import ModalDetail from './ModalDetail';
import TodoCard from './TodoCard';

function TodoList({ isDone = false }) {
  const { state } = React.useContext(contextApp);
  const {
    isOpen: openModalDetail,
    onOpen: onOpenModalDetail,
    onClose: onCLoseModalDetail,
  } = useDisclosure();
  const {
    isOpen: openModalEdit,
    onOpen: onOpenModalEdit,
    onClose: onCLoseModalEdit,
  } = useDisclosure();
  const [detail, setDetail] = useState({});

  if (state.data) {
    return (
      <Fragment>
        {state.data
          .filter(item => (!isDone ? item.status === 0 : item.status === 1))
          .sort((a, b) =>
            !isDone
              ? moment(b.createdAt) - moment(a.createdAt)
              : moment(a.createdAt) - moment(b.createdAt)
          )
          .map(item => (
            <TodoCard
              key={item.id}
              item={item}
              clickEdit={e => {
                setDetail(e);
                onOpenModalEdit();
              }}
              clickDetail={e => {
                setDetail(e);
                onOpenModalDetail();
              }}
              isDone={!!item.status}
            />
          ))}
        <ModalDetail
          isOpen={openModalDetail}
          onClose={() => {
            setDetail({});
            onCLoseModalDetail();
          }}
          data={detail}
        />
        <ModalAdd
          isOpen={openModalEdit}
          onClose={() => {
            setDetail({});
            onCLoseModalEdit();
          }}
          data={detail}
        />
      </Fragment>
    );
  }
  return (
    <Box textAlign="center" w={'100%'}>
      <Text> no Data</Text>
    </Box>
  );
}

export default TodoList;
