import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  CardFooter, // Import Center component
} from "@chakra-ui/react";
import useGetUserTask from "../Hooks/useGetUserTask";
import useGetCurrentUser from "../Hooks/useGetCurrentUser";
import { VscAdd } from "react-icons/vsc";
import useAddTodo from "../Hooks/useAddTodo";
import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import useDeleteTodo from "../Hooks/useDeleteTodo";
function HomePage() {
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    completed: false,
    media: null,
  });
  const { adding, addTodo } = useAddTodo();
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, todos } = useGetUserTask();
  const { currentUser } = useGetCurrentUser();
  const { deleting, deleteTodo, showToast } = useDeleteTodo();
  console.log("current user", currentUser);
  const handleDelete = async (todoID) => {
    try {
      await deleteTodo(todoID);
      showToast("Success", "delete", "success");
      console.log("65 client todos._id", todoID);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("home page todos", todos);
  return (
    <>
      <Flex direction="column" h="100vh">
        <Center color="white" h="100px">
          {currentUser ? (
            <div>
              <h2>Welcome, {currentUser?.data?.fullName} !</h2>
              {/* Render other user info here */}
            </div>
          ) : (
            <div>No user logged in.</div>
          )}
        </Center>

        <Flex flex="1">
          <VStack w="100%" p={4} spacing={6}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              gap={6}
            >
              <SimpleGrid spacing={4} p={"2px"} maxW={"full"}>
                <Card justifyContent={"center"} alignItems={"center"}>
                  <VscAdd size={"40px"} onClick={onOpen} />
                </Card>
              </SimpleGrid>
              {todos.map((todo) => (
                <SimpleGrid key={todo._id} spacing={4} p={"2px"} maxW={"full"}>
                  <Card>
                    <CardHeader>
                      <Heading size="md">{todo?.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text as={todo.completed ? "s" : "span"}>
                        {todo?.description}
                      </Text>
                      {todo.media && (
                        <Image objectFit="cover" src={todo.media} alt="media" />
                      )}
                    </CardBody>
                    <CardFooter gap={2}>
                      <BiSolidEdit />
                      <Button
                        onClick={() => handleDelete(todo._id)}
                        isLoading={deleting}
                      >
                        <AiTwotoneDelete />
                      </Button>
                    </CardFooter>
                  </Card>
                </SimpleGrid>
              ))}
            </Grid>
          </VStack>
        </Flex>
      </Flex>
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
}

export default HomePage;
