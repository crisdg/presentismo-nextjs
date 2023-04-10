import { useEffect, useState } from "react"
import { useDisclosure } from "@chakra-ui/react"
import { WithAuth } from "../../_middleware"
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"

import Link from "next/link"
import NavBar from "../../../src/navBar"
import Styles from "../../../styles/createEmployeeForm.module.css"
import CreateEmployeeForm from "../../../src/createEmployeeForm"
import UpdateEmployeeForm from "../../../src/updateEmployeeForm"

function EmployeesList() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch("/api/getEmployees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data)
        console.log(data)
      })
  }, [])

  return (
    <>
      <div>
        <NavBar />
        <Heading>Lista de empleados</Heading>
        <Link href='/employees/createEmployee'>
          <a>+</a>
        </Link>
        <div className={Styles.container}>
          <div className={Styles.nombreList}>
            <Table variant='striped' size='lg' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Apellido</Th>
                  <Th>Nombre</Th>
                  <Th>Sector</Th>
                  <Th>Puesto</Th>
                  <Th>Turno</Th>
                  <Th>Info</Th>
                </Tr>
              </Thead>
              <Tbody>
                {employees.map((employee) => {
                  return (
                    <>
                      <Tr>
                        <Td>{employee.id}</Td>
                        <Td>{employee.apelliido}</Td>
                        <Td>{employee.nombre}</Td>
                        <Td>{employee.sector}</Td>
                        <Td>{employee.puesto}</Td>
                        <Td>{employee.turno}</Td>
                        <Td>
                          <Link
                            href={`http://localhost:3000/employees/list/${employee.id}`}
                          >
                            <a> INFO</a>
                          </Link>
                        </Td>
                      </Tr>
                    </>
                  )
                })}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default WithAuth(EmployeesList)
