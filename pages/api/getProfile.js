import { verify } from "jsonwebtoken"
export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies
  const sec = process.env.SECRET_HASH

  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" })
  }

  const user = verify(myTokenName, "secret")
  console.log(user)
  return res.json({
    user: user,
  })
}
