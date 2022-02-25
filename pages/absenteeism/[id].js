import React from "react"
import { useRouter } from "next/router"
import { useEmployeeStat, useEntry } from "../../lib/swr-hooks"

import {
  Heading,
  Flex,
  Box,
  Text,
  Divider,
  Container,
  Progress,
} from "@chakra-ui/react"
import Calendar from "../../src/calendar/calendar.js/calendar"
import CalendarSm from "../../src/calendarSm"

export default function employeeStat() {
  const router = useRouter()
  const id = router.query.id
  const { data } = useEmployeeStat(id)
  const initialDates = [
    "2022-01-01",
    "2022-02-02",
    "2022-03-01",
    "2022-04-01",
    "2022-05-01",
    "2022-06-01",
    "2022-07-01",
    "2022-08-02",
    "2022-09-01",
    "2022-10-01",
    "2022-11-01",
    "2022-12-01",
  ]

  if (data) {
    return (
      <>
        <Container maxW='container.xl' mt='10'>
          <Flex mt='10' height='40' justifyContent='space-between' shadow='md'>
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
          <Container maxW='container.xl' mt='6'>
            <Flex flexDirection='row'>
              <Box height='fit-content' shadow='lg'>
                <Calendar
                  data={data}
                  contentHeight='350px'
                  width='container.sm'
                  aspectRatio='1.15'
                />
              </Box>
              <Flex width='container.lg' flexDirection='row' flexWrap='wrap'>
                {initialDates.map((date) => {
                  return (
                    <Box
                      bg='lightgray'
                      width='30%'
                      m='2'
                      mb='1'
                      mt='1'
                      shadow='lg'
                    >
                      <CalendarSm data={data} initialDate={date}></CalendarSm>
                    </Box>
                  )
                })}
                {/* <Flex w='100%' mt='1'>
                  <Box bg='lightgray' width='33%' h='100%' m='2' mb='1' mt='1'>
                    <CalendarSm data={data}></CalendarSm>
                  </Box>
                  <Box
                    bg='yellow'
                    width='33%'
                    h='100%'
                    m='2'
                    mb='1'
                    mt='1'
                  ></Box>
                  <Box bg='blue' width='33%' h='100%' m='2' mb='1' mt='1'></Box>
                </Flex> */}
              </Flex>
            </Flex>
          </Container>
        </Container>
      </>
    )
  } else {
    return <h1>Loading...</h1>
  }
}
