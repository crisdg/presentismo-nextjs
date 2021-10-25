import { useEffect, useState } from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import ReactDOM from "react-dom"
import Link from "next/link"
import NavBar from "../../../src/navBar"
import Styles from "../../../styles/createEmployeeForm.module.css"
import CreateEmployeeForm from "../../../src/createEmployeeForm"
export default function EmployeesList() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch("/api/getEmployees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
  }, [])

  return (
    <>
      <div>
        <NavBar />
        <h1>Lista de empleados</h1>
        <div className={Styles.container}>
          <div className={Styles.nombreList}>
            {employees.map((employee) => {
              return (
                <>
                  <div className={Styles.nombre} key={employee.id}>
                    <span
                      className={Styles.nameList}
                    >{`${employee.nombre}  ${employee.apelliido}`}</span>
                    <button>Eliminar</button>
                    <button>Actualizar</button>
                    <Link
                      href={`http://localhost:3000/employees/list/${employee.id}`}
                    >
                      <a> INFO</a>
                    </Link>
                  </div>
                </>
              )
            })}
          </div>
          <div>
            <CreateEmployeeForm />
          </div>
        </div>
      </div>
    </>
  )
}
