import { verify } from "jsonwebtoken"
export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies

  const signature = process.env.JWT_SECRET

  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" })
  }

  const user = verify(myTokenName, signature)

  return res.json({
    user: user,
  })
}
