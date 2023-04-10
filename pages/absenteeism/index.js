import NavBar from "../../src/navBar"
import Attendance from "../../src/attendance"
import { WithAuth } from "../_middleware"
import { Box } from "@chakra-ui/react"

function Ausentismo() {
  return (
    <Box>
      <NavBar />
      <Attendance />
    </Box>
  )
}
export default WithAuth(Ausentismo)
