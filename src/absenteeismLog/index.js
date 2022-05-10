import React from "react"
import {
  Heading,
  Flex,
  Box,
  Text,
  Divider,
  Container,
  Progress,
  Image,
} from "@chakra-ui/react"

export default function absenteeismLog({ data }) {
  console.log(data)
  return (
    <Container bg='#fff'>
      <Flex size='container.xl'>
        <Box w='100%' alignContent='center'>
          <Heading size='md' mb='4'>
            Log de ausencias
          </Heading>
          {data.map((date) => {
            if (date.status !== "presente") {
              const itemDate = new Date(date.fecha).toLocaleDateString()
              return (
                <Box bg='#fff' h='10' mt='2' mb='2'>
                  <Text>{`${itemDate} - ${date.status}`}</Text>
                  <Divider />
                </Box>
              )
            }
          })}
        </Box>
      </Flex>
    </Container>
  )
}
