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
  return (
    <Container
      bg='#fff'
      w='container.sm'
      h='400'
      overflow='scroll'
      overflowX='hidden'
      borderRadius='md'
      shadow='dark-lg'
      marginBottom='9'
      alignSelf='flex-start'
      sx={{
        "&::-webkit-scrollbar": {
          width: "16px",
          borderRadius: "8px",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
      }}
    >
      <Flex>
        <Box w='100%' alignContent='center'>
          <Heading size='md' mb='4'>
            Log de ausencias
          </Heading>
          {data.map((date, index) => {
            if (date.status !== "presente") {
              const itemDate = new Date(date.fecha).toLocaleDateString()
              return (
                <Box bg='#fff' h='10' mt='2' mb='2' key={index}>
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
