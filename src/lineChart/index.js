import React, { useEffect } from "react"
import * as d3 from "d3"
import { Box } from "@chakra-ui/react"
function LineChart({ data }) {
  const chartData = [
    { date: new Date("2022-01-01"), value: 2 },
    { date: new Date("2022-01-03"), value: 2 },
    { date: new Date("2022-02-02"), value: 0 },
    { date: new Date("2022-03-02"), value: 1 },
    { date: new Date("2022-04-02"), value: 4 },
    { date: new Date("2022-05-02"), value: 2 },
    { date: new Date("2022-06-02"), value: 3 },
    { date: new Date("2022-07-02"), value: 2 },
    { date: new Date("2022-08-02"), value: 0 },
    { date: new Date("2022-09-02"), value: 1 },
    { date: new Date("2022-10-02"), value: 5 },
    { date: new Date("2022-11-02"), value: 2 },
    { date: new Date("2022-12-02"), value: 2 },
  ]
  useEffect(() => {
    // set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 700 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom

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

    populateChart(chartData)

    // d3.csv(
    //   "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

    //   // When reading the csv, I must format variables:
    //   function (d) {
    //     return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
    //   }
    // ).then(
    //   // Now I can use this dataset:
    //   function (data) {
    //     // Add X axis --> it is a date format
    //     const x = d3
    //       .scaleTime()
    //       .domain(
    //         d3.extent(data, function (d) {
    //           return d.date
    //         })
    //       )
    //       .range([0, width])
    //     svg
    //       .append("g")
    //       .attr("transform", `translate(0, ${height})`)
    //       .call(d3.axisBottom(x))

    //     // Add Y axis
    //     const y = d3
    //       .scaleLinear()
    //       .domain([
    //         0,
    //         d3.max(data, function (d) {
    //           return +d.value
    //         }),
    //       ])
    //       .range([height, 0])
    //     svg.append("g").call(d3.axisLeft(y))

    //     // Add the line
    //     svg
    //       .append("path")
    //       .datum(data)
    //       .attr("fill", "none")
    //       .attr("stroke", "steelblue")
    //       .attr("stroke-width", 2)
    //       .attr(
    //         "d",
    //         d3
    //           .line()
    //           .x(function (d) {
    //             return x(d.date)
    //           })
    //           .y(function (d) {
    //             return y(d.value)
    //           })
    //       )
    //   }
    // )
  }, [])

  return <Box bg='#fff' w='fit-content' id='my_dataviz'></Box>
}

export default LineChart
