import { useState } from "react";
import useLogin from "../Hooks/useLogin";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Container,
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const LoginForm = () => {
  const navigate = useNavigate();
  const { loading, login } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    navigate("/home");
    setFormData({
      email: "",
      username: "",
      password: "",
    });
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        minW={"100vw"}
        justifyContent={"center"}
        alignItems={"center"}
        px={4}
      >
        <Container maxW={"container.md"} padding={0}>
          <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
            <Flex className="glass">
              <Box padding={10}>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  textAlign="center"
                  mb={4}
                  color="white"
                >
                  Login
                </Text>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel color="white">Email:</FormLabel>
                      <Input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        color="white"
                        _placeholder={{ color: "gray.500" }}
                        mt={2}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel color="white">Username:</FormLabel>
                      <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        color="white"
                        _placeholder={{ color: "gray.500" }}
                        mt={2}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel color="white">Password:</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        color="white"
                        _placeholder={{ color: "gray.500" }}
                        mt={2}
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      isLoading={loading}
                    >
                      Login
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default LoginForm;
