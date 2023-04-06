import Filter from "bad-words"
import { query } from "../../lib/db"

const filter = new Filter()

const handler = async (req, res) => {
  const {
    id,
    apelliido,
    nombre,
    fecha_ingreso,
    dni,
    direccion,
    telefono,
    sector,
    puesto,
    turno,
  } = req.body

  try {
    if (!apelliido || !nombre) {
      return res
        .status(400)
        .json({ message: "`nombre` and `apellido` are both required" })
    }

    const results = await query(
      `
      INSERT INTO empleados 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        filter.clean(id),
        filter.clean(apelliido),
        filter.clean(turno),
        filter.clean(puesto),
        filter.clean(sector),
        filter.clean(telefono),
        filter.clean(direccion),
        filter.clean(dni),
        filter.clean(fecha_ingreso),
        filter.clean(nombre),
      ]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
