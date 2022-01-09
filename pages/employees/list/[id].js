import { useRouter } from "next/router"
import { useDisclosure } from "@chakra-ui/react"

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import UpdateEmployeeForm from "../../../src/updateEmployeeForm"

import { useEntry } from "../../../lib/swr-hooks"

export default function EditEntryPage() {
  const router = useRouter()
  const id = router.query.id
  const { data } = useEntry(id)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleDelete = async () => {
    let res = await fetch(`/api/deleteEmployee`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
    let json = await res.json()
    if (!res.ok) throw Error(json.message)
    router.push("/employees/list")
  }

  if (data) {
    return (
      <>
        <h1>Info de empleado</h1>
        <h2>{`${data[0].apeliido}  ${data[0].nombre}`}</h2>
        <Button
          onClick={onOpen}
          px='6'
          py='4'
          bg='green.100'
          rounded='md'
          _hover={{ bg: "green.300" }}
        >
          Actualizar datos
        </Button>
        <Button
          onClick={handleDelete}
          px='6'
          py='4'
          bg='red.200'
          rounded='md'
          _hover={{ bg: "red.300" }}
        >
          Eliminar
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UpdateEmployeeForm data={data} />
            </ModalBody>
          </ModalContent>
        </Modal>
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
