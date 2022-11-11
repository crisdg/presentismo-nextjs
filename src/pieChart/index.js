import React, { useEffect, useRef } from "react"
import { Flex, Box, List, ListItem } from "@chakra-ui/react"

import drawChart from "../drawChart.js"

const DonutChart = ({ statData }) => {
  statData.map((item) => console.log(item.status))
  const ref = useRef(null)
  const pieData = [
    {
      label: "presente",
      value: Math.round(
        (statData.filter((item) => item.status === "presente").length * 100) /
          statData.length
      ),
    },

    {
      label: "ausente con aviso",
      value: Math.round(
        (statData.filter((item) => item.status === "ausente con aviso").length *
          100) /
          statData.length
      ),
    },
    {
      label: "ausente sin aviso",
      value: Math.round(
        (statData.filter((item) => item.status === "ausente sin aviso").length *
          100) /
          statData.length
      ),
    },
    {
      label: "tarde",
      value: Math.round(
        (statData.filter((item) => item.status === "tarde").length * 100) /
          statData.length
      ),
    },
    {
      label: "retiro",
      value: Math.round(
        (statData.filter((item) => item.status === "retiro").length * 100) /
          statData.length
      ),
    },
    {
      label: "vacaciones",
      value: Math.round(
        (statData.filter((item) => item.status === "vacaciones").length * 100) /
          statData.length
      ),
    },

    {
      label: "cumpleaños",
      value: Math.round(
        (statData.filter((item) => item.status === "cumpleaños").length * 100) /
          statData.length
      ),
    },
  ]

  useEffect(() => {
    if (ref.current) {
      drawChart(ref.current, pieData)
    }
  }, [ref])

  return (
    <Flex
      boxSize='400'
      className='graph'
      ref={ref}
      padding='9'
      boxShadow='lg'
      bg='#fff'
      borderRadius='md'
      margin='5'
    >
      <Box mr='10'>
        <List>
          <ListItem
            bg='#05BBD2'
            borderRadius='md'
            color='#fff'
            key='1'
            padding='1.5'
          >
            Presente
          </ListItem>
          <ListItem bg='#2070C4' borderRadius='md' color='#fff' key='2'>
            Aus. C/A
          </ListItem>
          <ListItem bg='#EB80F1' borderRadius='md' color='#fff' key='3'>
            Aus. S/A
          </ListItem>
          <ListItem bg='#F5C842' borderRadius='md' color='#fff' key='4'>
            Tarde
          </ListItem>
          <ListItem bg='#37D400' borderRadius='md' color='#fff' key='5'>
            Retiro
          </ListItem>
          <ListItem bg='red' borderRadius='md' color='#fff' key='5'>
            Vacaciones
          </ListItem>
          <ListItem bg='brown' borderRadius='md' color='#fff' key='5'>
            Cumpleaños
          </ListItem>
        </List>
      </Box>
    </Flex>
  )
}

export default React.memo(DonutChart)
