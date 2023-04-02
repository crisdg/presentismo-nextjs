import { db } from "../../../lib/db"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { serialize } from "cookie"

export default async function loginHandler(req, res) {
  const { user, password } = req.body
  console.log(user, password, "desde req")
  try {
    const resultado = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM usuarios WHERE user = ? LIMIT 1;"
      db.query(query, [user], (error, results) => {
        if (error) reject(error)
        resolve(results[0])
      })
    })

    console.log(resultado, "resultado desde db")

    if (!resultado) {
      console.log("no resultado de db")
      return res.status(401).json("usuario o contraseña incorrectos")
    }

    const esContraseñaValida = await bcrypt.compare(
      password,
      resultado.hashedPass
    )
    console.log(esContraseñaValida, "desde compare")
    if (!esContraseñaValida) {
      console.log(esContraseñaValida, "cont invalida")
      res.status(401).json("Contraseña o correo incorrectos")
    }
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + (60 + 60),
        user: user,
      },
      "secret"
    )
    const serialized = serialize("myTokenName", token, {
      httpOnly: true,
      secure: "secret" === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    })
    if (resultado && esContraseñaValida) {
      res.setHeader("Set-Cookie", serialized)

      return res.json("login route")
    }
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
