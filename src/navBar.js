import styles from "../styles/NavBar.module.css"
import Link from "next/link"
export default function NavBar() {
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
      </nav>
    </>
  )
}
