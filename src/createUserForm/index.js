import React from "react"
import Router from "next/router"
import { useState } from "react"
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

export default function createUserForm() {
  const [user, setUSer] = useState()
  const [password, setPassword] = useState()
  const [rol, setRol] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "0",
          rol: rol,
          password: password,
          user: user,
        }),
      })

      const json = await res.json()

      if (!res.ok) throw Error(json.message)
      Router.push("/")
    } catch (e) {
      throw Error(e.message)
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
          <Heading>Crear usuario</Heading>
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
                    <Input
                      id='user'
                      type='text'
                      onChange={(e) => setUSer(e.target.value)}
                    />
                  </FormControl>
                </Stack>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input
                  id='password'
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
                <FormLabel htmlFor='rol'>Rol</FormLabel>
                <Input
                  id='rol'
                  type='rol'
                  onChange={(e) => setRol(e.target.value)}
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
