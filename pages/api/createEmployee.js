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
  } = req.body

  console.log(req.body, "desdeapi")
  try {
    if (!apelliido || !nombre) {
      return res
        .status(400)
        .json({ message: "`nombre` and `apellido` are both required" })
    }

    const results = await query(
      `
      INSERT INTO empleados 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      [
        filter.clean(id),
        filter.clean(apelliido),
        filter.clean(nombre),
        filter.clean(fecha_ingreso),
        filter.clean(dni),
        filter.clean(direccion),
        filter.clean(telefono),
        filter.clean(sector),
        filter.clean(puesto),
      ]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
