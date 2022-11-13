const bcrypt = require("bcrypt")

export const hashPassword = async (pass) => {
  const rounds = 10
  const hash = await bcrypt.hash(pass, rounds)
  return hash
}
