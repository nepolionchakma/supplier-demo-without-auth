import { useAuthContext } from "@/Supabase/AuthContext"
import { useState } from "react"

function AddDepartment() {
  const [department_id, setDepartment_id] = useState('')
  const [department_name, setDepartment_name] = useState('')
  const { addDepartment } = useAuthContext()
  const handleAddDeparment = async (e) => {
    e.preventDefault()
    addDepartment(department_id, department_name)
  }
  return (
    <div className="w-1/3 bg-slate-500 p-4 rounded mx-auto">
      <h5 className="font-bold text-2xl text-center my-3">Add Department</h5>
      <form onSubmit={handleAddDeparment}>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="department_id">Department Id :</label>
          <input value={department_id || ''} onChange={(e) => setDepartment_id(e.target.value)} type="text" id="department_id" name="department_id" placeholder="Department Id" className="p-2 rounded ml-2  focus:text-orange-600 bg-white" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="department_name">Department Name :</label>
          <input value={department_name || ''} onChange={(e) => setDepartment_name(e.target.value)} type="text" id="department_name" name="department_name" placeholder="Department Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-white" />
        </div>
        <button type="submit" className="bg-emerald-500 px-6 py-2 my-4 rounded text-white font-bold">Submit</button>
      </form>
    </div>
  )
}
export default AddDepartment