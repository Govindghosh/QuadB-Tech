import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import useAddTodo from "../../Hooks/useAddTodo";


const AddTodo = ({ isOpen, onClose }) => {
  const { adding, addTodo } = useAddTodo();
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    completed: false,
    media: null,
  });
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue = type === "checkbox" ? checked : files ? files[0] : value;
    setTodoData({ ...todoData, [name]: newValue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addTodo(todoData);

    setTodoData({
      title: "",
      description: "",
      completed: false,
      media: null,
    });
  };
  return (
    <>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={todoData.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <textarea
                name="description"
                value={todoData.description}
                onChange={handleChange}
                placeholder="Description"
                required
              />
              <label>
                Completed:
                <input
                  type="checkbox"
                  name="completed"
                  checked={todoData.completed}
                  onChange={handleChange}
                />
              </label>
              <input
                type="file"
                name="media"
                onChange={(e) =>
                  setTodoData({ ...todoData, media: e.target.files[0] })
                }
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={adding}
              onClick={handleSubmit}
            >
              Save
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTodo;
