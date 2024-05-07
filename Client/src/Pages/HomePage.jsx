import {
  Center,
  Flex,
  // Import Center component
} from "@chakra-ui/react";
import useGetCurrentUser from "../Hooks/useGetCurrentUser";
import PreviewTodos from "./components/PreviewTodos";
function HomePage() {
  const { currentUser } = useGetCurrentUser();
  return (
    <>
      <Flex direction="column" h="100vh">
        <Center color="white" h="100px">
          {currentUser ? (
            <div>
              <h2>Welcome, {currentUser?.data?.fullName} !</h2>
            </div>
          ) : (
            <div>No user logged in.</div>
          )}
        </Center>
        <PreviewTodos />
      </Flex>
    </>
  );
}

export default HomePage;
