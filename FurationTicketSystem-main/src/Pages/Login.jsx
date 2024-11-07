import { Box, Flex, Image, useToast, VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/users/user.actions";
import Loading from "./Loading";
import axios from "axios";

const Login = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const toast = useToast();

  useEffect(() => {}, []);
  const user = useSelector((state) => console.log(state.userReducer));

  const handleLogin = (e) => {
    e.preventDefault();
    const loginUser = {
      email,
      password,
    };
    dispatch(login(loginUser, nav));
  };

  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  };
 

  return (
    <Flex padding={4} w="100%">
      <VStack w={"100%"}>
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            </Stack>
            <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email...."
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password...."
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Stack>
                  <Button
                    onClick={handleLogin}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default Login;
