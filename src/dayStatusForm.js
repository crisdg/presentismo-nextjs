import React, { useEffect, useState } from "react"

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Button,
  Input,
  Flex,
} from "@chakra-ui/react"

import swal from "sweetalert"

export default function DayStatusForm() {
  const [employeesData, setEmployeesData] = useState([])
  const [indexControl, setIndexControl] = useState(1)
  const [date, setDate] = useState("")

  const [error, setError] = useState()

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
          fecha: date,
          id_empleado: e.target.id_empleado.value,
          campaña: e.target.campaña.value,
          validator: `${e.target.id_empleado.value}${date}`,
        }),
      })

      const json = await res.json()
      setIndexControl(indexControl + 1)

      if (!res.ok) {
        return setError(json)
      }
    } catch (e) {
      throw Error({ message: e.message })
    }
  }

  //verifica si hay error, de haber lanza el sweetAlert
  error &&
    swal("Error", error.message, "error")
      .then(setError())
      .then(setIndexControl(indexControl - 1))

  return (
    <>
      {employeesData
        .slice(indexControl - 1, indexControl)
        .map((employee, index) => {
          return (
            <>
              <form onSubmit={saveStatus}>
                <FormControl>
                  <Flex
                    alignContent='space-around'
                    justifyContent='space-between'
                  >
                    <Input
                      type='date'
                      onChange={(e) => {
                        setDate(e.target.value)
                      }}
                      value={date}
                      required
                      id='fecha'
                      size='sm'
                      width='36'
                      mb='2.5'
                    />

                    <Flex>
                      <FormLabel>Camp.</FormLabel>
                      <Select name='campaña' id='campaña' size='sm' width='16'>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                        <option value='13'>13</option>
                        <option value='14'>14</option>
                        <option value='15'>15</option>
                        <option value='16'>16</option>
                        <option value='17'>17</option>
                        <option value='18'>18</option>
                      </Select>
                    </Flex>
                    <Flex>
                      <FormLabel>ID</FormLabel>
                      <Input
                        type='text'
                        value={employee.id}
                        readOnly
                        required
                        id='id_empleado'
                        size='sm'
                        width='10'
                        mb='2.5'
                      />
                    </Flex>
                  </Flex>
                  <Flex>
                    <Input
                      type='text'
                      value={employee.apeliido}
                      id='apellido'
                      mb='2.5'
                      mr='2.5'
                    />
                    <Input
                      type='text'
                      value={employee.nombre}
                      id='nombre'
                      mb='2.5'
                      ml='2.5'
                    />
                  </Flex>
                  <Flex>
                    <Select
                      name='status'
                      id='status'
                      defaultValue='Presente'
                      mb='2.5'
                      mr='2.5'
                    >
                      <option value='presente'>Presente</option>
                      <option value='ausente con aviso'>Aus. con aviso</option>
                      <option value='ausente sin aviso'>Aus. sin aviso</option>
                      <option value='tarde'>Tarde</option>
                      <option value='retiro'>Retiro</option>
                      <option value='cumpleaños'>Cumpleaños</option>
                      <option value='vacaciones'>Vacaciones</option>
                    </Select>
                    <Select
                      name='puesto'
                      id='puesto'
                      defaultValue='picking'
                      mb='2.5'
                      ml='2.5'
                    >
                      <option value='picking'>Picking</option>
                      <option value='periferia'>Periferia</option>
                      <option value='externo'>Externo</option>
                    </Select>
                  </Flex>
                  <Flex justifyContent='flex-end'>
                    <Button mr='4' mt='2.5' type='submit' colorScheme='green'>
                      Cargar
                    </Button>
                    <Button
                      mt='2.5'
                      ml='4'
                      onClick={() => {
                        setIndexControl(indexControl + 1)
                      }}
                    >
                      Siguiente
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </>
          )
        })}
    </>
  )
}
