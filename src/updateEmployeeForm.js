import React from "react"
import Router from "next/router"
import { useState } from "react"
import { Button, Input, FormControl } from "@chakra-ui/react"
import styles from "../styles/createEmployeeForm.module.css"

export default function CreateEmployeeForm(props) {
  const { data } = props

  const dateIn = new Date(data[0].fecha_ingreso)
  const year = dateIn.getFullYear()
  const month = dateIn.getMonth()
  const day = dateIn.getDate()

  const formatedDate = "2021-05-10"

  const [id, setId] = useState(data[0].id)
  const [apeliido, setApellido] = useState(data[0].apeliido)
  const [nombre, setNombre] = useState(data[0].nombre)
  const [fecha_ingreso, setFechaIngreso] = useState(formatedDate)
  const [dni, setDni] = useState(data[0].dni)
  const [direccion, setDireccion] = useState(data[0].direccion)
  const [telefono, setTelefono] = useState(data[0].telefono)
  const [sector, setSector] = useState(data[0].sector)
  const [puesto, setPuesto] = useState(data[0].puesto)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch("/api/updateEmployee", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          apeliido: apeliido,
          nombre: nombre,
          fecha_ingreso: fecha_ingreso,
          dni: dni.toString(),
          direccion: direccion,
          telefono: telefono.toString(),
          sector: sector,
          puesto: puesto,
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
        <FormControl>
          <Input
            type='text'
            name='id'
            variant='flushed'
            placeholder='ID'
            value={id}
            required
            isDisabled='true'
            onChange={(e) => {
              setId(e.target.value)
            }}
            size='md'
          />
        </FormControl>

        <Input
          type='text'
          name='apellido'
          variant='flushed'
          placeholder='Apellido'
          value={apeliido}
          required
          onChange={(e) => {
            setApellido(e.target.value)
          }}
          size='md'
        />

        <Input
          type='text'
          name='nombre'
          variant='flushed'
          placeholder='Nombre'
          value={nombre}
          required
          onChange={(e) => {
            setNombre(e.target.value)
          }}
          size='md'
        />

        <Input
          type='date'
          name='fechaIngreso'
          variant='flushed'
          placeholder='Fecha de ingreso'
          value={fecha_ingreso}
          required
          onChange={(e) => {
            setFechaIngreso(e.target.value)
          }}
          size='md'
        />

        <Input
          type='text'
          name='dni'
          variant='flushed'
          placeholder='DNI'
          value={dni}
          required
          onChange={(e) => {
            setDni(e.target.value)
          }}
          size='md'
        />

        <Input
          type='text'
          name='direccion'
          variant='flushed'
          placeholder='Direccion'
          value={direccion}
          required
          onChange={(e) => {
            setDireccion(e.target.value)
          }}
          size='md'
        />

        <Input
          type='text'
          name='telefono'
          variant='flushed'
          placeholder='Telefono'
          value={telefono}
          required
          onChange={(e) => {
            setTelefono(e.target.value)
          }}
          size='md'
        />

        <Input
          type='text'
          name='sector'
          variant='flushed'
          placeholder='Sector'
          value={sector}
          required
          onChange={(e) => {
            setSector(e.target.value)
          }}
          size='md'
        />

        <Input
          type='text'
          name='puesto'
          variant='flushed'
          placeholder='Puesto'
          value={puesto}
          required
          onChange={(e) => {
            setPuesto(e.target.value)
          }}
          size='md'
        />
        <FormControl>
          <Button
            type='submit'
            colorScheme='teal'
            variant='solid'
            width='full'
            mt={4}
          >
            Enviar
          </Button>
        </FormControl>
      </form>
    </>
  )
}
