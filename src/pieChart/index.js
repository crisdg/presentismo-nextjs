import React, { useEffect, useRef } from "react"
import {
  Flex,
  Box,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Heading,
} from "@chakra-ui/react"

import drawChart from "../drawChart.js"

const DonutChart = ({ statData }) => {
  const ref = useRef(null)
  const pieData = [
    {
      label: "presente",
      value: Math.trunc(
        (statData.filter((item) => item.status === "presente").length * 100) /
          statData.length
      ),
    },

    {
      label: "ausente con aviso",
      value: Math.trunc(
        (statData.filter((item) => item.status === "ausente con aviso").length *
          100) /
          statData.length
      ),
    },
    {
      label: "Vacaciones",
      value: Math.trunc(
        (statData.filter((item) => item.status === "vacaciones").length * 100) /
          statData.length
      ),
    },
    {
      label: "Tarde",
      value: Math.trunc(
        (statData.filter((item) => item.status === "tarde").length * 100) /
          statData.length
      ),
    },
    {
      label: "Retiro",
      value: Math.trunc(
        (statData.filter((item) => item.status === "retiro").length * 100) /
          statData.length
      ),
    },
  ]
  useEffect(() => {
    if (ref.current) {
      drawChart(ref.current, pieData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <ListItem bg='#05BBD2' borderRadius='md' color='#fff'>
            Presente
          </ListItem>
          <ListItem bg='#2070C4' borderRadius='md' color='#fff'>
            Aus. C/A
          </ListItem>
          <ListItem bg='#EB80F1' borderRadius='md' color='#fff'>
            Aus. S/A
          </ListItem>
          <ListItem bg='#F5C842' borderRadius='md' color='#fff'>
            Tarde
          </ListItem>
          <ListItem bg='#37D400' borderRadius='md' color='#fff'>
            Retiro
          </ListItem>
        </List>
      </Box>
    </Flex>
  )
}

export default React.memo(DonutChart)
