import {
  Flex,
  SimpleGrid,
  Grid,
  VStack,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  Image,
  CardFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { VscAdd } from "react-icons/vsc";
import { AiTwotoneDelete } from "react-icons/ai";
import useGetUserTask from "../../Hooks/useGetUserTask";
import useDeleteTodo from "../../Hooks/useDeleteTodo";
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";

const PreviewTodos = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, todos } = useGetUserTask();
  const { deleting, deleteTodo, showToast } = useDeleteTodo();

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

  return (
    <>
      <Flex flex="1">
        <VStack w="100%" p={4} spacing={6}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
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
                    <Button>
                    <EditTodo taskId={todo?._id} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(todo?._id)}
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
      {isOpen && <AddTodo isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default PreviewTodos;
