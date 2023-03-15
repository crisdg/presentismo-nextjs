import React from "react"
import { useRouter } from "next/router"
import { useState } from "react"
import axios from "axios"
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react"

export default function login() {
  const [credentials, setCredentials] = useState({
    user: "",
    password: "",
  })
  const [userName, setUserName] = useState({
    userName: "",
  })
  const [error, setError] = useState(null)
  const router = useRouter()
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/auth/login", credentials)
      const usuario = await axios.post("/api/getProfile")
      await setUserName({
        userName: usuario.data.user.user,
      })

      console.log(res, usuario.data.user.user, userName)
      router.push("/")
    } catch (error) {
      console.log(error)
      setError(error, "desd index")
    }
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
            {error ? (
              <Alert status='error'>
                <AlertIcon />
                <AlertDescription>{error.response.data}</AlertDescription>
              </Alert>
            ) : (
              ""
            )}
            <form onSubmit={handleSubmit}>
              <Stack spacing='5'>
                <Stack spacing='5'>
                  <FormControl>
                    <FormLabel htmlFor='user'>User</FormLabel>
                    <Input
                      id='user'
                      type='text'
                      name='user'
                      onChange={handleChange}
                    />
                  </FormControl>
                </Stack>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  onChange={handleChange}
                ></Input>
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
