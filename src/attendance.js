import { useState, useEffect } from "react"
import { useDisclosure } from "@chakra-ui/react"

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
import { useEntries } from "../lib/swr-hooks"
import styles from "../styles/Attendance.module.css"
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

  console.log(globalStatus.map((item) => item.fecha))
  const dates = globalStatus.map((item) => item.fecha)
  console.log(dates)
  const uniqueDates = [...new Set(dates)]
  console.log(uniqueDates)

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
          <th className={styles.nameHeader}>Nombre</th>
          <th>Lu</th>
          <th>Ma</th>
          <th>Mi</th>
          <th>Ju</th>
          <th>Vi</th>
          <th>Sa</th>
          <th>Do</th>
          <th>Lu</th>
          <th>Ma</th>
          <th>Mi</th>
          <th>Ju</th>
          <th>Vi</th>
          <th>Sa</th>
          <th>Do</th>
          <th>Lu</th>
          <th>Ma</th>
          <th>Mi</th>
          <th>Ju</th>
          <th>Vi</th>
          <th>Sa</th>
          <th>Do</th>
          <th>Lu</th>
          <th>Ma</th>
          <th>Mi</th>
          <th>Ju</th>
          <th>Vi</th>
          <th>Sa</th>
          <th>Do</th>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr>
                <td>{`${employee.apeliido} ${employee.nombre}`}</td>
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
