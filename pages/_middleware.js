import jwt from "jsonwebtoken"
import Router from "next/router"
import cookie from "cookie"

export function WithAuth(Component) {
  const AuthComponent = (props) => {
    const sec = props.sec
    //obtenemos el jwt de la solicitud
    let token = props.token

    if (!token) {
      //si no hay token redirreciona a login
      if (typeof window !== "undefined") {
        Router.replace("/login")
      }
      return null
    }

    try {
      //verificamos el jwt con la clave del servido

      const decoded = jwt.verify(token, sec)

      //si el token es valido podemos agregar la informacion de las props al componente
      const newProp = { ...props, user: decoded }

      //si el user esta autenticado renderiza el componente original
      return <Component {...newProp} />
    } catch (error) {
      console.log(error, "desde catch middleware")
      //si el token no es valido el user no esta autenticado
      return <p>Debe iniciar sesion para ver esta pagina</p>
    }
  }

  //necesitamos agregar el parametro 'req' a las props del componente para acceder al JWT
  AuthComponent.getInitialProps = async (ctx) => {
    const { req, res } = ctx
    const sec = process.env.JWT_SECRET
    let token = ""
    if (req) {
      const cookies = cookie.parse(req.headers.cookie || "")
      token = cookies.myTokenName || ""
    }

    if (!token && res) {
      //si no hay token redireccionamos a login
      res.writeHead(302, { Location: "/login" })
      res.end()
    }
    return { token, sec }
  }

  return AuthComponent
}
