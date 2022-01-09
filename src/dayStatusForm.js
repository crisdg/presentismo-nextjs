import React, { useEffect, useState } from "react"
import { Button, Input, FormControl } from "@chakra-ui/react"

export default function DayStatusForm() {
  const [employeesData, setEmployeesData] = useState([])
  const [indexControl, setIndexControl] = useState(1)
  const [date, setDate] = useState("")
  const [regId, setRegId] = useState()

  useEffect(() => {
    fetch("/api/getEmployees")
      .then((res) => res.json())
      .then((data) => {
        setEmployeesData(data)
      })
  }, [])

  //funcion para guardar status en BD
  const saveStatus = async (e) => {
    e.preventDefault()

    console.log("save")

    try {
      const res = await fetch("/api/absenteeism/createDayStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          puesto: e.target.puesto.value,
          status: e.target.status.value,
          nombre: e.target.nombre.value,
          apellido: e.target.apellido.value,

          fecha: e.target.fecha.value,
          id_empleado: e.target.id_empleado.value,
        }),
      })

      const json = await res.json()

      if (!res.ok) throw Error(json.message)
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <>
      {employeesData
        .slice(indexControl - 1, indexControl)
        .map((employee, index) => (
          <>
            <form onSubmit={saveStatus}>
              <input
                type='date'
                onChange={(e) => {
                  setDate(e.target.value)
                }}
                value={date}
                required
                id='fecha'
              />
              <input
                type='text'
                value={employee.id}
                readOnly
                required
                id='id_empleado'
              />
              <input type='text' value={employee.apeliido} id='apellido' />
              <input type='text' value={employee.nombre} id='nombre' />
              <select name='puesto' id='puesto'>
                <option value='picking'>Picking</option>
                <option value='periferia'>Periferia</option>
                <option value='externo'>Externo</option>
              </select>
              <select name='status' id='status'>
                <option value='presente'>Presente</option>
                <option value='ausente con aviso'>Aus. con aviso</option>
                <option value='ausente sin aviso'>Aus. sin aviso</option>
                <option value='tarde'>Tarde</option>
                <option value='retiro'>Retiro</option>
              </select>
              <button
                onClick={() => {
                  setIndexControl(indexControl + 1)
                }}
              >
                Next
              </button>
            </form>
          </>
        ))}
    </>
  )
}