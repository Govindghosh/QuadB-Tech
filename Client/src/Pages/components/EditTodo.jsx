import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BiSolidEdit } from "react-icons/bi";
import { useState } from "react";
import useEditTodo from "../../Hooks/useEditTodo";
import useShowToast from "../../Hooks/useShowToast";

const EditTodo = ({ taskId }) => {
  // Change todo._id to taskId
  const { updating, updateTodo } = useEditTodo();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    completed: false,
    media: null, // Add media property to store uploaded file
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setTodoData({ ...todoData, [name]: newValue });
  };

  const handleFileChange = (e) => {
    setTodoData({ ...todoData, media: e.target.files[0] }); // Store the uploaded file
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", todoData.title);
      formData.append("description", todoData.description);
      formData.append("completed", todoData.completed);
      formData.append("media", todoData.media); // Append the uploaded file to FormData
      console.log("formdata", formData);
      await updateTodo(taskId, formData); // Pass taskId and formData to updateTodo
      showToast("Success", "Update", "success");
      onClose();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <BiSolidEdit onClick={onOpen} />
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
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
                onChange={handleFileChange} // Handle file change
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={updating}
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

export default EditTodo;
