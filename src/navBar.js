import styles from "../styles/NavBar.module.css"

export default function NavBar() {
  const logout = () => {}
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
