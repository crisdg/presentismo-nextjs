import Filter from "bad-words"
import { query } from "../../lib/db"

const filter = new Filter()

const handler = async (req, res) => {
  const {
    id,
    apeliido,
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
    if (!id) {
      return res
        .status(400)
        .json({ message: "`id`,`title`, and `content` are all required" })
    }

    const results = await query(
      `
      UPDATE empleados SET  
    
      apeliido = ?,
      nombre = ?,
      fecha_ingreso = ?,
      dni = ?,
      direccion = ?,
      telefono = ?,
      sector = ?,
      puesto = ?,
      turno = ?
      WHERE id = ?
      `,
      [
        filter.clean(apeliido),
        filter.clean(nombre),
        filter.clean(fecha_ingreso),
        filter.clean(dni),
        filter.clean(direccion),
        filter.clean(telefono),
        filter.clean(sector),
        filter.clean(puesto),
        filter.clean(turno),
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
