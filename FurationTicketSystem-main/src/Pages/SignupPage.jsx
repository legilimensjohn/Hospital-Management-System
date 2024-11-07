import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { register } from "../Redux/users/user.actions";

const SignupPage = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.userReducer.user);

 

  const handleSignup = async () => {
    setLoading(true);

    const payload = {
      name,
      email,
      password,
      cart: [],
    };

    dispatch(register(payload))
      .then(() => {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        nav("/login");
      })
      .catch((error) => {
        toast({
          title: "Error.",
          description: "Failed to create your account.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex padding={4} w="100%">
      <VStack w={"100%"}>
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Register Your Account</Heading>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8} bg={"white"}>
              <Stack spacing={4}>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name..."
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email..."
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="password..."
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  ></Stack>
                    <Button
                      onClick={handleSignup}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign up
                    </Button>
                    </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </VStack>
      </Flex>
    );
  }
 
export default SignupPage;
