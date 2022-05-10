import "@fullcalendar/common/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"
import "../styles/globals.css"
import { extendTheme } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#e8eaf6",
        color: "#000000",
      },
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
