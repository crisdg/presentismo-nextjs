import Filter from "bad-words"
import { query } from "../../../lib/db"

const filter = new Filter()

const handler = async (req, res) => {
  const { puesto, status, nombre, apellido, fecha, id_empleado } = req.body

  console.log(req.body, "desdeapi")
  try {
    if (!apellido || !nombre) {
      return res
        .status(400)
        .json({ message: "`nombre` and `apellido` are both required" })
    }

    const results = await query(
      `
      INSERT INTO ausentismo 
      VALUES (id, ?, ?, ?, ?, ?, ?);
      `,
      [
        filter.clean(puesto),
        filter.clean(status),
        filter.clean(nombre),
        filter.clean(apellido),
        filter.clean(fecha),
        filter.clean(id_empleado),
      ]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
