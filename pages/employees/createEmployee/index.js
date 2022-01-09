import React, { useState } from "react"

import { Flex, Box, Container, HStack } from "@chakra-ui/react"

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react"

export default function CreateEmployee() {
  const [employeeData, setEmployeeData] = useState({})

  const saveEmployee = async (e) => {
    const res = await fetch("/api/createEmployee", {
      body: JSON.stringify({
        id: e.target.ID.value,
        apelliido: e.target.apellido.value,
        nombre: e.target.nombre.value,
        fecha_ingreso: e.target.fechaIngreso.value,
        dni: e.target.dni.value,
        direccion: e.target.direccion.value,
        telefono: e.target.telefono.value,
        sector: e.target.sector.value,
        puesto: e.target.puesto.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    const result = await res.json()
    // result.user => 'Ada Lovelace'
    console.log(result)
  }

  return (
    <>
      <Container height='sm'>
        <h1>Carga de nuevo empleado</h1>
        <form onSubmit={saveEmployee}>
          <FormControl>
            <Input
              id='ID'
              type='text'
              size='md'
              variant='flushed'
              placeholder='ID'
            />

            <Input
              id='apellido'
              type='text'
              size='md'
              variant='flushed'
              placeholder='Apellido'
            />

            <Input
              id='nombre'
              type='text'
              size='md'
              variant='flushed'
              placeholder='Nombre'
            />

            <Input
              id='fechaIngreso'
              type='date'
              size='md'
              variant='flushed'
              placeholder='Fecha de ingreso'
            />

            <Input
              id='dni'
              type='text'
              size='md'
              variant='flushed'
              placeholder='DNI'
            />

            <Input
              id='direccion'
              type='text'
              size='md'
              variant='flushed'
              placeholder='Direccion'
            />

            <Input
              id='telefono'
              type='text'
              size='md'
              variant='flushed'
              placeholder='Telefono'
            />

            <Input
              id='sector'
              type='text'
              size='md'
              variant='flushed'
              placeholder='Sector'
            />

            <Input
              id='puesto'
              type='text'
              size='md'
              variant='flushed'
              placeholder='Puesto'
            />
            <Button type='submit' mt='6' alignSelf='flex-end'>
              Enviar
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  )
}
