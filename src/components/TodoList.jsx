import { Box, Text, useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { contextApp } from '../App';
import ModalDetail from './ModalDetail';
import TodoCard from './TodoCard';

function TodoList({ isDone = false }) {
  const { state } = React.useContext(contextApp);
  const {
    isOpen: openModalDetail,
    onOpen: onOpenModalDetail,
    onClose: onCLoseModalDetail,
  } = useDisclosure();
  const [detail, setDetail] = useState({});

  if (state.data) {
    return (
      <Fragment>
        {state.data
          .sort((a, b) =>
            !isDone
              ? moment(b.createdAt) - moment(a.createdAt)
              : moment(a.createdAt) - moment(b.createdAt)
          )
          .map(item => (
            <TodoCard
              key={item.id}
              item={item}
              clickDetail={e => {
                setDetail(e);
                onOpenModalDetail();
              }}
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
