import React from "react"
import { useRouter } from "next/router"
import { useEmployeeStat, useEntry } from "../../lib/swr-hooks"
import { useEffect, useState } from "react"
import {
  Heading,
  Flex,
  Box,
  Text,
  Divider,
  Container,
  Progress,
} from "@chakra-ui/react"

export default function employeeStat() {
  const router = useRouter()
  const id = router.query.id
  const { data } = useEmployeeStat(id)
  const [employeeData, setEmployeeData] = useState()

  if (data) {
    return (
      <>
        <Container maxW='container.xl' mt='10'>
          <Flex mt='10' height='32' justifyContent='space-between' shadow='md'>
            <Box marginRight='4' width='container.sm' textAlign='center'>
              <Heading size='md'>Estadisticas de empleado</Heading>
              <Heading size='sm'>
                {/* {data[0].nombre} {data[0].apellido} */}
              </Heading>
            </Box>

            <Flex
              flexDirection='row'
              width='full'
              justifyContent='space-evenly'
            >
              <Box>
                <Flex flexDirection='column'>
                  <Box mr='4' textAlign='center'>
                    <Text textAlign='center'>Presente </Text>
                  </Box>
                  <Divider />
                  <Box textAlign='center'>
                    <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                      {data.filter((item) => item.status === "presente").length}
                    </Text>
                    <Progress
                      value={
                        (data.filter((item) => item.status === "presente")
                          .length *
                          100) /
                        data.length
                      }
                      mt='5'
                      size='xs'
                      colorScheme='green'
                    ></Progress>
                  </Box>
                </Flex>
              </Box>
              <Box>
                <Flex flexDirection='column'>
                  <Box mr='4' textAlign='center'>
                    <Text>Ausente con aviso </Text>
                  </Box>
                  <Divider />
                  <Box textAlign='center'>
                    <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                      {
                        data.filter(
                          (item) => item.status === "ausente con aviso"
                        ).length
                      }
                    </Text>
                    <Progress
                      value={
                        (data.filter(
                          (item) => item.status === "ausente con aviso"
                        ).length *
                          100) /
                        data.length
                      }
                      mt='5'
                      size='xs'
                      colorScheme='green'
                    ></Progress>
                  </Box>
                </Flex>
              </Box>
              <Flex flexDirection='column'>
                <Box mr='4' textAlign='center'>
                  <Text>Ausente sin aviso</Text>
                </Box>
                <Divider />
                <Box textAlign='center'>
                  <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                    {
                      data.filter((item) => item.status === "ausente sin aviso")
                        .length
                    }
                  </Text>
                  <Progress
                    value={
                      (data.filter(
                        (item) => item.status === "ausente sin aviso"
                      ).length *
                        100) /
                      data.length
                    }
                    mt='5'
                    size='xs'
                    colorScheme='green'
                  ></Progress>
                </Box>
              </Flex>
              <Flex flexDirection='column'>
                <Box mr='4' textAlign='center'>
                  <Text>Vacaciones</Text>
                </Box>
                <Divider />
                <Box textAlign='center'>
                  <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                    {data.filter((item) => item.status === "vacaciones").length}
                  </Text>
                  <Progress
                    value={
                      (data.filter((item) => item.status === "vacaciones")
                        .length *
                        100) /
                      data.length
                    }
                    mt='5'
                    size='xs'
                    colorScheme='green'
                  ></Progress>
                </Box>
              </Flex>
              <Flex flexDirection='column'>
                <Box mr='4' textAlign='center'>
                  <Text>Ingreso tarde</Text>
                </Box>
                <Divider />
                <Box textAlign='center'>
                  <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                    {data.filter((item) => item.status === "tarde").length}
                  </Text>
                  <Progress
                    value={
                      (data.filter((item) => item.status === "tarde").length *
                        100) /
                      data.length
                    }
                    mt='5'
                    size='xs'
                    colorScheme='green'
                  ></Progress>
                </Box>
              </Flex>

              <Flex flexDirection='column'>
                <Box mr='4' textAlign='center'>
                  <Text>Retiro anticipado</Text>
                </Box>
                <Divider />
                <Box textAlign='center'>
                  <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                    {data.filter((item) => item.status === "retiro").length}
                  </Text>
                  <Progress
                    value={
                      (data.filter((item) => item.status === "retiro").length *
                        100) /
                      data.length
                    }
                    mt='5'
                    size='xs'
                    colorScheme='green'
                  ></Progress>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </>
    )
  } else {
    return <h1>Loading...</h1>
  }
}
