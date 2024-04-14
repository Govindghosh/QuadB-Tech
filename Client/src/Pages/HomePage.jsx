import { Text } from "@chakra-ui/react";
import useGetUserTask from "../Hooks/useGetUserTask";

function HomePage() {
  const { isLoading, todos } = useGetUserTask();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(todos);
  return (
    <>
      <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            <Text as="b">{todo?.title}</Text>
            <br />
          </div>
        ))}
      </div>
      {/* <Text as="b">Bold</Text>
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
      <Text as="s">Strikethrough</Text> */}
    </>
  );
}

export default HomePage;
