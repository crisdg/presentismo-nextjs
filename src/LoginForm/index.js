import React from "react"
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react"

export default function login() {
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("submit")
  }
  return (
    <>
      <Container
        maxW='lg'
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Stack spacing='6' textAlign='center'>
          <Heading>Login Page</Heading>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "none", sm: "xl" }}
            bg='white'
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing='5'>
                <Stack spacing='5'>
                  <FormControl>
                    <FormLabel htmlFor='user'>User</FormLabel>
                    <Input id='user' type='text' />
                  </FormControl>
                </Stack>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type='password'></Input>
                <Button variant='primary' type='submit' bg='palevioletred'>
                  Sign in
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
    </>
  )
}
