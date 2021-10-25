import { useRouter } from "next/router"

import { useEntry } from "../../../lib/swr-hooks"

export default function EditEntryPage() {
  const router = useRouter()
  const id = router.query.id
  const { data } = useEntry(id)
  console.log(id, data)
  if (data) {
    return (
      <>
        <h1>Info de empleado</h1>
        <h2>{`${data[0].apelliido}  ${data[0].nombre}`}</h2>
      </>
    )
  } else {
    return (
      <>
        <h1 className='font-bold text-3xl my-2'>...</h1>
        <p>...</p>
      </>
    )
  }
}
