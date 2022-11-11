import React, { useEffect } from "react"
import * as d3 from "d3"
import { Box, Flex } from "@chakra-ui/react"
function LineChart({ data }) {
  //ordena array alfabeticamente
  function compareMonth(a, b) {
    if (a.month.toLowerCase() < b.month.toLowerCase()) {
      return -1
    }
    if (a.month.toLowerCase() > b.month.toLowerCase()) {
      return 1
    }
    return 0
  }
  // filtra los datos eliminando las entradas con status "presente"
  const filteredData = data
    .filter((item) => item.status !== "presente")
    .map((item) => {
      const month = new Date(item.fecha).getMonth() + 1

      return month
    })
    .reduce((monthCont, date) => {
      monthCont[date] = (monthCont[date] || 0) + 1

      return monthCont
    }, {})
  // convierto el objeto en un array de ojetos
  let dataArr = Object.entries(filteredData).map((entrie, index) => {
    const date = new Date(2022, entrie[0] - 1)

    const dateStr = entrie[0] < 10 ? `0${entrie[0]}` : entrie[0]

    return {
      month: dateStr,
      date: date,
      value: entrie[1],
    }
  })

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ]

  months.forEach((month) => {
    const monthsData = dataArr.map((item) => item.month)

    const monthValidate = monthsData.includes(month)

    if (monthValidate === false) {
      dataArr.push({
        month: month,
        date: new Date(2022, month),
        value: 0,
      })
    }
  })

  dataArr.sort(compareMonth)

  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 700 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom

    // append the svg object to the body of the page
    const svg = d3
      .select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    //Read the data
    function populateChart(data) {
      // Add X axis --> it is a date format
      const x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return +d.date
          })
        )
        .range([0, width])
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%B")))

      // Add Y axis
      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d.value
          }),
        ])
        .range([height, 0])
      svg.append("g").call(d3.axisLeft(y))

      // Add the line
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (d) {
              return x(d.date)
            })
            .y(function (d) {
              return y(d.value)
            })
        )
    }

    populateChart(dataArr)
  }, [])

  return (
    <Flex
      bg='#fff'
      w='fit-content'
      h='400'
      id='my_dataviz'
      borderRadius='md'
      padding='9'
      boxShadow='lg'
      margin='5'
    ></Flex>
  )
}

export default LineChart
