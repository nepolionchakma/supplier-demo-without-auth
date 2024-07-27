import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase, useAuthContext } from "@/Supabase/AuthContext"

function UpdateDepartment() {
  const [department_id, setDepartment_id] = useState('')
  const [department_name, setDepartment_name] = useState('')
  const { id } = useParams()
  const { tosifySuccess, tosifyError } = useAuthContext()
  // console.log(departmentId, departmentName)
  useEffect(() => {
    const getDepartmentData = async () => {

      let { data, error } = await supabase
        .from('departments')
        .select()
        .eq('department_id', id)
        .single()

      if (data) {
        setDepartment_id(data?.department_id)
        setDepartment_name(data?.department_name)
      }
    }
    getDepartmentData()
  }, [id])

  const handleUpdateDeparment = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('departments')
      .update({ department_id, department_name })
      .eq('department_id', id)
      .select()

    if (data) tosifySuccess('Update Table Successfully.')
    if (error) tosifyError('Error ! Filled all correctly Please.')
  }
  return (
    <div className="w-1/3 bg-slate-500 p-4 rounded mx-auto">
      <h5 className="font-bold text-2xl text-center my-3">Update Department</h5>
      <form onSubmit={handleUpdateDeparment}>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="department_id">Department Id :</label>
          <input value={department_id || ''} onChange={(e) => setDepartment_id(e.target.value)} type="text" id="department_id" name="department_id" placeholder="Department Id" className="p-2 rounded ml-2  focus:text-orange-600 bg-white" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="department_name">Department Name :</label>
          <input value={department_name || ''} onChange={(e) => setDepartment_name(e.target.value)} type="text" id="department_name" name="department_name" placeholder="Department Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-white" />
        </div>
        <button type="submit" className="bg-emerald-500 px-6 py-2 my-4 rounded text-white font-bold">Update</button>
      </form>
    </div>
  )
}
export default UpdateDepartment