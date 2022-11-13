import Filter from "bad-words"
import { query } from "../../lib/db"
import { hashPassword } from "../../lib/authSevice"

const filter = new Filter()

const handler = async (req, res) => {
  const { id, rol, password, user } = req.body

  const hashedPass = await hashPassword(password)

  try {
    if (!user || !password) {
      return res
        .status(400)
        .json({ message: "user ans password are both required" })
    }

    const results = await query(
      `
      INSERT INTO usuarios 
      VALUES (?, ?, ?, ? );
      `,
      [
        filter.clean(id),
        filter.clean(rol),
        filter.clean(hashedPass),
        filter.clean(user),
      ]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
