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

function HomePage() {
  const { isLoading, todos } = useGetUserTask();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" h="100vh">
      <Center color="white" h="100px">
        This is the Center
      </Center>

      <Flex flex="1">
        <VStack w="100%" p={4} spacing={6}>
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
