import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import useGetUserTask from "../Hooks/useGetUserTask";

function HomePage() {
  const { isLoading, todos } = useGetUserTask();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(todos);
  return (
    <>
      {/* <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            <Text as="b">{todo?.title}</Text>
            <br />
          </div>
        ))}
      </div> */}
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {todos.map((todo) => (
          <SimpleGrid
            key={todo._id}
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            p={"2px"}
            maxW={"full"}
          >
            <Card>
              <CardHeader>
                <Heading size="md"> {todo?.title}</Heading>
              </CardHeader>
              <CardBody>
                {todo.completed ? (
                  <Text as="s">{todo?.description}</Text>
                ) : (
                  <Text>{todo?.description}</Text>
                )}
              </CardBody>
            </Card>
          </SimpleGrid>
        ))}
      </Grid>
      <Text as="b">Bold</Text>
      <br />
      <Text as="u">Underline</Text>
      <br />
      <Text as="del">Deleted</Text>
      <br />
      <Text as="em">Emphasis</Text>
      <br />
      <Text as="ins">Inserted</Text>
      <br />
      <Text as="kbd">Ctrl + C</Text>
      <br />
      <Text as="mark">Highlighted</Text>
      <br />
      <Text as="s">Strikethrough</Text>
    </>
  );
}

export default HomePage;
