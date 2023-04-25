import { verify } from "jsonwebtoken"
import { serialize } from "cookie"
import cookie from "cookie"
export default async function handler(req, res) {
  const { myTokenName } = req.cookies
  const sec = process.env.JWT_SECRET
  if (!myTokenName) {
    return res.status(401).json({ error: "no token" })
  }
  try {
    verify(myTokenName, sec)
    const serialized = serialize("myTokenName", null, {
      httpOnly: true,
      secure: sec === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    })
    res.setHeader("Set-Cookie", serialized)
    res.status(201).json("logout succefully")
  } catch (error) {
    console.log(error)
  }
}
