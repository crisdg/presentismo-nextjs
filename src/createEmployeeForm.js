import React from "react"
import Router from "next/router"
import { useState } from "react"
import styles from "../styles/createEmployeeForm.module.css"
export default function CreateEmployeeForm() {
  const [id, setId] = useState("")
  const [apeliido, setApellido] = useState()
  const [nombre, setNombre] = useState()
  const [fecha_ingreso, setFechaIngreso] = useState()
  const [dni, setDni] = useState()
  const [direccion, setDireccion] = useState()
  const [telefono, setTelefono] = useState()
  const [sector, setSector] = useState()
  const [puesto, setPuesto] = useState()
  const [turno, setTurno] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch("/api/createEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          apelliido: apeliido,
          nombre: nombre,
          fecha_ingreso: fecha_ingreso,
          dni: dni,
          direccion: direccion,
          telefono: telefono,
          sector: sector,
          puesto: puesto,
          turno: turno,
        }),
      })

      const json = await res.json()

      if (!res.ok) throw Error(json.message)
      Router.push("/employees/list")
    } catch (e) {
      throw Error(e.message)
    }
  }
  return (
    <>
      <form action='POST' className={styles.createForm} onSubmit={handleSubmit}>
        <label htmlFor='id'>ID</label>
        <input
          type='text'
          name='id'
          required
          onChange={(e) => {
            setId(e.target.value)
          }}
        />
        <label htmlFor='apellido'>APELLIDO</label>
        <input
          type='text'
          name='apellido'
          required
          onChange={(e) => {
            setApellido(e.target.value)
          }}
        />
        <label htmlFor='nombre'>NOMBRE</label>
        <input
          type='text'
          name='nombre'
          required
          onChange={(e) => {
            setNombre(e.target.value)
          }}
        />
        <label htmlFor='fechaIngreso'>FECHA DE INGRESO</label>
        <input
          type='text'
          name='fechaIngreso'
          required
          onChange={(e) => {
            setFechaIngreso(e.target.value)
          }}
        />
        <label htmlFor='dni'>DNI</label>
        <input
          type='text'
          name='dni'
          required
          onChange={(e) => {
            setDni(e.target.value)
          }}
        />
        <label htmlFor='direccion'>DIRECCION</label>
        <input
          type='text'
          name='direccion'
          required
          onChange={(e) => {
            setDireccion(e.target.value)
          }}
        />
        <label htmlFor='telefono'>TELEFONO</label>
        <input
          type='text'
          name='telefono'
          required
          onChange={(e) => {
            setTelefono(e.target.value)
          }}
        />
        <label htmlFor='sector'>SECTOR</label>
        <input
          type='text'
          name='sector'
          required
          onChange={(e) => {
            setSector(e.target.value)
          }}
        />
        <label htmlFor='puesto'>PUESTO</label>
        <input
          type='text'
          name='puesto'
          required
          onChange={(e) => {
            setPuesto(e.target.value)
          }}
        />
        <label htmlFor='puesto'>TURNO</label>
        <input
          type='text'
          name='turno'
          required
          onChange={(e) => {
            setTurno(e.target.value)
          }}
        />

        <input type='submit' />
      </form>
    </>
  )
}
