import styles from "../styles/NavBar.module.css"
import { useRouter } from "next/router"

import { destroyCookie, parseCookies } from "nookies"

export default function NavBar() {
  const router = useRouter()
  const logout = async () => {
    const response = await fetch("/api/auth/logout")

    if (response.ok) {
      console.log("entra en respose ok")
      // Eliminar el token de acceso localmente

      // Redirigir al usuario a la página de inicio de sesión
      router.push("/login")
    }
  }
  return (
    <>
      <nav className={styles.nav}>
        <button colorScheme='facebook'>
          <a href='/employees/list'>empleados</a>
        </button>
        <button>
          <a href='/absenteeism'>Ausencias</a>
        </button>
        <button>
          <a href='/reports/dashboard'>Reportes</a>
        </button>
        <button onClick={logout}>Logout</button>
      </nav>
    </>
  )
}
