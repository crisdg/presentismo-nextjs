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
  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "`id`,`title`, and `content` are all required" })
    }
    console.log(
      id,
      apelliido,
      nombre,
      fecha_ingreso,
      dni,
      direccion,
      telefono,
      sector,
      puesto
    )
    const results = await query(
      `
      UPDATE empleados SET  
    
      apelliido = ?,
      nombre = ?,
      fecha_ingreso = ?,
      dni = ?,
      direccion = ?,
      telefono = ?,
      sector = ?,
      puesto = ?
      WHERE id = ?
      `,
      [
        filter.clean(apelliido),
        filter.clean(nombre),
        filter.clean(fecha_ingreso),
        filter.clean(dni),
        filter.clean(direccion),
        filter.clean(telefono),
        filter.clean(sector),
        filter.clean(puesto),
        id,
      ]
    )

    return res.json(results)
  } catch (e) {
    console.log(req.body)
    res.status(500).json({ message: e.message })
  }
}

export default handler
