import styles from "../styles/NavBar.module.css"
import Link from "next/link"
export default function NavBar() {
  const logout = () => {}
  return (
    <>
      <nav className={styles.nav}>
        <Link href='/employees/list'>
          <a>empleados</a>
        </Link>
        <Link href='/absenteeism'>
          <a>Ausencias</a>
        </Link>
        <Link href='/reports/dashboard'>
          <a>Reportes</a>
        </Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </>
  )
}
