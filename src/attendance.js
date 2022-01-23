import { useState, useEffect } from "react"
import * as d3 from "d3"

import { cookieStorageManager, useDisclosure } from "@chakra-ui/react"

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import DayStatusForm from "./dayStatusForm"
import styles from "../styles/Attendance.module.css"
import { scaleRadial } from "d3"

export default function Attendance() {
  const [employees, setEmployees] = useState([])
  const [globalStatus, setGlobalStatus] = useState([])
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

  const minDate = new Date(Math.min.apply(null, uniqueDatesFormatted))
  const maxDate = new Date(Math.max.apply(null, uniqueDatesFormatted))

  const range = d3.utcDay.range(
    new Date(minDate),
    d3.utcDay.offset(new Date(maxDate))
  )

  const fomatDate = d3.timeFormat("%d-%m")

  // construye un array con los empleados y el status diario de cada uno ****/// falta completar status de fechas faltantes ///*******
  const status = employees.map((employee) => {
    const employeeFilter = globalStatus.filter(
      (status) => status.id_empleado === employee.id
    )
    return employeeFilter
  })

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
          status: "vacio",
        }
      }
    })

    return completeRange
  })

  console.log(completo)

  return (
    <div className={styles.tableContainer}>
      <Button
        onClick={onOpen}
        px='6'
        py='4'
        bg='green.100'
        rounded='md'
        _hover={{ bg: "green.300" }}
      ></Button>
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
                <td>{`${employee.apeliido} ${employee.nombre}`}</td>

                {completo.map((item) => {
                  const filtrado = item.filter(
                    (stat) => stat.nombre === employee.nombre
                  )

                  return filtrado.map((item) => <td>{item.status}</td>)
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DayStatusForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
