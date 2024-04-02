import { Text } from "@chakra-ui/react";
function HomePage() {
  return (
    <>
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
