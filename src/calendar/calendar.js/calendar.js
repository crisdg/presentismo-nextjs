import React from "react"
import { useState, useEffect } from "react"
import * as d3 from "d3"
import FullCalendar from "@fullcalendar/react" // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!

export default function Calendar({ data }) {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const colorStatus = {
    presente: "#04b043",
    ausenteconaviso: "#f20226",
    ausentesinaviso: "#ff2b4f",
    tarde: "#faac25",
    retiro: "#24c7f0",
    vacaciones: "#73016b",
  }

  //logica para crear el array con los datos para completar el calendario

  //crear rango de fechas
  const range = d3.utcDay.range(startDate, d3.utcDay.offset(endDate))

  //formatear el rango
  const formattedRange = range.map((item) => {
    return item.toLocaleDateString()
  })
  // verificar si la fecha del item en al array data se encuentra dentro del rango
  const verifyDate = data.map((item) => {
    const verifyDate = formattedRange.includes(
      new Date(item.fecha).toLocaleDateString()
    )

    if (verifyDate === true) {
      return item
    }
  })
  // array final con datos filtrados dentro del rango
  const monthData = verifyDate.filter((item) => item !== undefined)

  //

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      aspectRatio='1'
      contentHeight={450}
      fixedWeekCount={false}
      events={monthData.map((item) => {
        const start = new Date(item.fecha)
          .toISOString()
          .replace("T", " ")
          .substring(0, 10)
        const end = new Date(item.fecha)
          .toISOString()
          .replace("T", " ")
          .substring(0, 10)

        return {
          start: start,
          end: end,

          display: "background",
          backgroundColor: colorStatus[item.status.replace(/ /g, "")],
        }
      })}
      datesSet={(dateInfo) => {
        setStartDate(dateInfo.start)
        setEndDate(dateInfo.end)
      }}
    />
  )
}
