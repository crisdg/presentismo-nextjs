import { useState, useEffect } from "react"
import Link from "next/link"
import * as d3 from "d3"

import { useDisclosure } from "@chakra-ui/react"

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  FormControl,
  Input,
  Box,
  Text,
} from "@chakra-ui/react"
import DayStatusForm from "./dayStatusForm"
import styles from "../styles/Attendance.module.css"

export default function Attendance() {
  const [employees, setEmployees] = useState([])
  const [globalStatus, setGlobalStatus] = useState([])
  const [firstDate, setFirstDate] = useState()
  const [lastDate, setLastDate] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    fetch("/api/getEmployees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
  }, [])

  useEffect(() => {
    fetch("/api/absenteeism/getGlobalStatus")
      .then((res) => res.json())
      .then((data) => setGlobalStatus(data))
  }, [])

  //Logica para visualizar las fechas en la tabla de ausentismo

  // toma las fechas de la db "presentismo" y completa las fechas faltantes entre la 1ª y la ultima carga

  const dates = globalStatus.map((item) => item.fecha)

  const uniqueDates = [...new Set(dates)]
  const uniqueDatesFormatted = uniqueDates.map((date) => new Date(date))

  const minDate = firstDate
    ? new Date(firstDate + "T00:00:00")
    : new Date(Math.min.apply(null, uniqueDatesFormatted))
  const maxDate = lastDate
    ? new Date(lastDate + "T00:00:00")
    : new Date(Math.max.apply(null, uniqueDatesFormatted))

  const range = d3.utcDay.range(
    new Date(minDate),
    d3.utcDay.offset(new Date(maxDate))
  )

  const fomatDate = d3.timeFormat("%d-%m")

  // construye un array con los empleados y el status diario de cada uno
  const status = employees.map((employee) => {
    const employeeFilter = globalStatus.filter(
      (status) => status.id_empleado === employee.id
    )
    return employeeFilter
  })

  // filtra por cada empleado el status diario y los datos del empleado
  const presentismo = employees.map((employee) => {
    const stat = globalStatus
      .filter((status) => status.id_empleado === employee.id)
      .map((item) => {
        return {
          status: item.status,
          fecha: item.fecha,
        }
      })

    return {
      nombre: employee.nombre,
      apellido: employee.apeliido,
      id: employee.id,
      dates: stat,
    }
  })
  // toma el array presentismo y completa el status de los dias sin carga dejandolos vacios.
  const completo = presentismo.map((employee) => {
    const employeeStatus = employee.dates.map((date) => {
      let statusDate = new Date(date.fecha)
      statusDate = statusDate.toLocaleDateString()

      return statusDate
    })

    const completeRange = range.map((rangeDate) => {
      const parseDate = new Date(rangeDate).toLocaleDateString()
      const verifyDate = employeeStatus.includes(parseDate)

      if (verifyDate === true) {
        const employeeStatus = employee.dates.filter((date) => {
          const formatDate = new Date(date.fecha).toLocaleDateString()

          if (formatDate === parseDate) {
            return date.status
          }
        })

        const finalStatus = employeeStatus[0].status

        return {
          nombre: employee.nombre,
          fecha: parseDate,
          status: finalStatus,
        }
      } else {
        return {
          nombre: employee.nombre,
          fecha: parseDate,
          status: " ",
        }
      }
    })

    return completeRange
  })
  console.log(firstDate, lastDate)
  return (
    <>
      <Flex justifyContent='space-between' mr='4' ml='4'>
        <Box>
          <Button
            mb='4'
            mt='4'
            onClick={onOpen}
            px='6'
            py='4'
            bg='green.100'
            rounded='md'
            _hover={{ bg: "green.300" }}
          >
            Cargar status
          </Button>
        </Box>
        <Box margin='2'>
          <Text>referencias:</Text>

          <Flex width='60'>
            <Box>
              <span className={styles.referencias}>
                Aus. C/A <span className={styles.ausenteconaviso}></span>
              </span>
              <span className={styles.referencias}>
                Aus. S/A <span className={styles.ausentesinaviso}></span>
              </span>
              <span className={styles.referencias}>
                Tarde <span className={styles.tarde}></span>
              </span>
              <span className={styles.referencias}>
                Retiro <span className={styles.retiro}></span>
              </span>
              <span className={styles.referencias}>
                Vacaciones <span className={styles.vacaciones}></span>
              </span>
              <span className={styles.referencias}>
                Cumpl. <span className={styles.cumpleanos}></span>
              </span>
            </Box>
          </Flex>
        </Box>
        <Box mr='4'>
          <FormControl>
            <Flex>
              <Input
                type='date'
                id='firstDate'
                size='sm'
                width='44'
                mt='4'
                mr='3'
                onChange={(e) => {
                  setFirstDate(e.target.value)
                }}
              />
              <Input
                type='date'
                id='lastDate'
                size='sm'
                width='44'
                mt='4'
                ml='3'
                onChange={(e) => {
                  setLastDate(e.target.value)
                }}
              />
            </Flex>
          </FormControl>
        </Box>
      </Flex>
      <div className={styles.tableContainer}>
        <table className={styles.mainTable}>
          <thead>
            <th className={styles.nameHeader} key={"1sd2"}>
              Nombre
            </th>
            {range.map((date, index) => (
              <th key={index}>{`${fomatDate(date)}`}</th>
            ))}
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={Math.random()}>
                  <td>
                    <Link href={`/absenteeism/${employee.id}`}>
                      <a>{`${employee.apeliido} ${employee.nombre}`}</a>
                    </Link>
                  </td>

                  {completo.map((item) => {
                    const filtrado = item.filter(
                      (stat) => stat.nombre === employee.nombre
                    )

                    return filtrado.map((item) => (
                      <td className={styles[item.status.replace(/ /g, "")]}>
                        {/* {item.status
                          .split(" ")
                          .map((str) => str.charAt(0))
                          .join("")
                          .toUpperCase()}
                          */}
                      </td>
                    ))
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Carga status diario</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <DayStatusForm />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
