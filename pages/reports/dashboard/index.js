import NavBar from "../../../src/navBar"
import { WithAuth } from "../../_middleware"

function Dashboard() {
  return (
    <div>
      <NavBar />
      <h1>Panel de control reportes</h1>
    </div>
  )
}
export default WithAuth(Dashboard)
