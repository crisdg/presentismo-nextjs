import mysql from "serverless-mysql"

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT),
  },
})

export async function query(q, values) {
  try {
    const results = await db.query(q, values)
    await db.end()

    return results
  } catch (e) {
    if (e.errno === 1062) {
      throw {
        errno: e.errno,
        name: e.code,
        message: "El registro ya se encontraba en la base",
      }
    } else {
      throw Error(e.message)
    }
  }
}
