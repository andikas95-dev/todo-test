import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { contextApp } from '../App';

function ModalAdd({ isOpen, onClose, data }) {
  const { dispatch } = useContext(contextApp);
  const [dataSubmit, setDataSubmit] = useState({
    status: false,
  });

  useEffect(() => {
    if (data) {
      const handleData = {
        ...data,
        status: data.status === 1 ? true : false,
      };
      setDataSubmit(handleData);
    }
  }, [data]);

  const handleSubmit = () => {
    if (dataSubmit.title) {
      const data = {
        ...dataSubmit,
        status: Number(dataSubmit.status),
        createdAt: moment().format('YYYY-MM-DD hh:mm'),
      };
      dispatch({ type: 'add_todo', payload: data });
    }
    setDataSubmit({
      status: false,
    });
    onClose();
  };

  const handleEdit = () => {
    if (dataSubmit.title) {
      const data = {
        ...dataSubmit,
        status: Number(dataSubmit.status),
      };
      dispatch({ type: 'edit_todo', payload: data });
    }
    setDataSubmit({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data ? 'Edit To Do' : 'Add To Do'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Title</Text>
          <Input
            placeholder="Title"
            value={dataSubmit.title}
            onChange={e =>
              setDataSubmit({
                ...dataSubmit,
                title: e.target.value,
              })
            }
          />
          <Text>Description</Text>
          <Textarea
            placeholder="Description"
            value={dataSubmit.description}
            onChange={e =>
              setDataSubmit({
                ...dataSubmit,
                description: e.target.value,
              })
            }
          />
          <Checkbox
            value={dataSubmit.status}
            defaultChecked={dataSubmit.status}
            onChange={e =>
              setDataSubmit({
                ...dataSubmit,
                status: e.target.checked,
              })
            }
          >
            isDone
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => {
              setDataSubmit({
                status: false,
              });
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => (data ? handleEdit() : handleSubmit())}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalAdd;
