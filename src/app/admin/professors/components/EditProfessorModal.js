import { useState, useEffect } from "react"
import Modal from "../../../../components/Modal"
import ProfessorForm from "./ProfessorForm"
import { updateProfessor } from "@/lib/adminApi"
import { useAdmin } from "../../../../contexts/AdminContext"

export default function EditProfessorModal({ isOpen, onClose, professor }) {
  const { professors, setProfessors } = useAdmin()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)

  const handleEditProfessor = async (e) => {
    if (e) e.preventDefault()
    if (!formData.name || !formData.email) {
      setError("Name and email are required")
      return
    }

    try {
      setSubmitLoading(true)
      const data = await updateProfessor(professor.id, formData)
      setProfessors(professors.map((p) => (p.id === professor.id ? data : p)))
      onClose()
      setFormData({ name: "", email: "", password: "" })
      setError("")
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  useEffect(() => {
    if (professor) {
      setFormData({ name: professor.name, email: professor.email, password: "" })
      setError("")
    }
  }, [professor])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Professor"
      footerButtons={{
        cancel: {
          text: "Cancel",
          onClick: onClose,
        },
        confirm: {
          text: submitLoading ? "Updating..." : "Update Professor",
          onClick: handleEditProfessor,
          disabled: submitLoading,
        },
      }}
    >
      {/* error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* form */}
      <ProfessorForm formData={formData} setFormData={setFormData} mode="edit" />
    </Modal>
  )
}
