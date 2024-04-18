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
  Box,
  Center, // Import Center component
} from "@chakra-ui/react";
import useGetUserTask from "../Hooks/useGetUserTask";
import useGetCurrentUser from "../Hooks/useGetCurrentUser";
import { VscAdd } from "react-icons/vsc";
function HomePage() {
  const { isLoading, todos } = useGetUserTask();
  const { currentUser } = useGetCurrentUser();
  console.log("current user", currentUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("home page todos", todos);
  return (
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
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
            <SimpleGrid spacing={4} p={"2px"} maxW={"full"}>
              <Card>
                <CardBody>
                  <VscAdd />
                </CardBody>
              </Card>
            </SimpleGrid>
          </Grid>
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
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
                  </CardBody>
                </Card>
              </SimpleGrid>
            ))}
          </Grid>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default HomePage;
