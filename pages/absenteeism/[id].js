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
  Image,
} from "@chakra-ui/react"
import Calendar from "../../src/calendar/calendar.js/calendar"
import CalendarSm from "../../src/calendarSm"
import AbsenteeismLog from "../../src/absenteeismLog"
import PieChart from "../../src/pieChart"
import LineChart from "../../src/lineChart"

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
  //**array de prueba para pieChart */
  const testData = [
    { label: "presente", value: 40 },
    { label: "ausente con aviso", label: "ausente sin aviso", value: 25 },
    { label: "Vacaciones", value: 15 },
    { label: "Tarde", value: 8 },
    { label: "Retiro", value: 2 },
  ]
  function employeeName(d) {
    const lastName = d[0].apellido
    const name = d[0].nombre

    const employeeName = `${lastName} ${name}`
    return employeeName
  }
  if (data) {
    const empName = employeeName(data)

    return (
      <Box height='100%' mr='10' ml='10'>
        <Flex mt='10' height='40' shadow='md' bg='#fff' borderRadius='md'>
          <Box marginRight='4' ml='4' width='container.sm' textAlign='center'>
            <Heading size='md'>{empName}</Heading>
            <Flex
              boxSize='28'
              alignItems='center'
              justifyContent='center'
              alignContent='center'
              w='full'
            >
              <Box boxSize='24'>
                <Image src='/profile.svg' />
              </Box>
            </Flex>
          </Box>

          <Flex flexDirection='row' width='full' justifyContent='space-between'>
            <Flex
              flexDirection='column'
              justifyContent='space-around'
              ml='3'
              mr='3'
            >
              <Box mr='4' textAlign='center'>
                <Text textAlign='center'>Presente </Text>
              </Box>
              <Divider />
              <Box textAlign='center'>
                <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                  {data.filter((item) => item.status === "presente").length}
                </Text>
              </Box>
              <Box h='10'>
                <Progress
                  value={
                    (data.filter((item) => item.status === "presente").length *
                      100) /
                    data.length
                  }
                  mt='5'
                  size='xs'
                  colorScheme='green'
                />
              </Box>
            </Flex>

            <Flex
              flexDirection='column'
              justifyContent='space-around'
              ml='3'
              mr='3'
            >
              <Box mr='4' textAlign='center'>
                <Text>Aus. con aviso </Text>
              </Box>
              <Divider />
              <Box textAlign='center'>
                <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                  {
                    data.filter((item) => item.status === "ausente con aviso")
                      .length
                  }
                </Text>
              </Box>
              <Box h='10'>
                <Progress
                  value={
                    (data.filter((item) => item.status === "ausente con aviso")
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

            <Flex
              flexDirection='column'
              justifyContent='space-around'
              ml='3'
              mr='3'
            >
              <Box mr='4' textAlign='center'>
                <Text>Aus. sin aviso</Text>
              </Box>
              <Divider />
              <Box textAlign='center'>
                <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                  {
                    data.filter((item) => item.status === "ausente sin aviso")
                      .length
                  }
                </Text>
              </Box>
              <Box h='10'>
                <Progress
                  value={
                    (data.filter((item) => item.status === "ausente sin aviso")
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
            <Flex
              flexDirection='column'
              justifyContent='space-around'
              ml='3'
              mr='3'
            >
              <Box mr='4' textAlign='center'>
                <Text>Vacaciones</Text>
              </Box>
              <Divider />
              <Box textAlign='center'>
                <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                  {data.filter((item) => item.status === "vacaciones").length}
                </Text>
              </Box>
              <Box h='10'>
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
            <Flex
              flexDirection='column'
              justifyContent='space-around'
              ml='3'
              mr='3'
            >
              <Box mr='4' textAlign='center'>
                <Text>Tarde</Text>
              </Box>
              <Divider />
              <Box textAlign='center'>
                <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                  {data.filter((item) => item.status === "tarde").length}
                </Text>
              </Box>
              <Box h='10'>
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

            <Flex
              flexDirection='column'
              justifyContent='space-around'
              ml='3'
              mr='3'
            >
              <Box mr='4' textAlign='center'>
                <Text>Retiro ant.</Text>
              </Box>
              <Divider />
              <Box textAlign='center'>
                <Text fontSize='x-large' fontWeight='semibold' mt='2'>
                  {data.filter((item) => item.status === "retiro").length}
                </Text>
              </Box>
              <Box h='10'>
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
            <Box>
              <Calendar
                data={data}
                contentHeight='350px'
                width='container.sm'
                aspectRatio='1.15'
              />
            </Box>
            <Flex
              width='container.lg'
              flexDirection='row'
              flexWrap='wrap'
              ml='4'
            >
              {initialDates.map((date, index) => {
                return (
                  <Box width='30%' m='2' mb='2' mt='2' shadow='lg' key={index}>
                    <CalendarSm data={data} initialDate={date}></CalendarSm>
                  </Box>
                )
              })}
            </Flex>
          </Flex>
          <Flex>
            <PieChart data={testData} statData={data} />
            <LineChart data={data} />
          </Flex>
          <Flex alignItems='flex-start'>
            <AbsenteeismLog data={data} />
          </Flex>
        </Container>
      </Box>
    )
  } else {
    return <h1>Loading...</h1>
  }
}
