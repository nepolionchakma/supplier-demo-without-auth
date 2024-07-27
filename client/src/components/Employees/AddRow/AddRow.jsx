import { useAuthContext } from "@/Supabase/AuthContext"
import { useState } from "react"


function AddRow() {
  const [employee_name, setEmployee_name] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [job_title, setJob_title] = useState('')
  const [email, setEmail] = useState('')
  const [department_id, setDepartment_id] = useState('')
  const [org_type, setOrg_type] = useState('')
  const [org_id, setOrg_id] = useState('')
  const [org_id_column_name, setOrg_id_column_name] = useState('')
  const { addDataEmployeesTable } = useAuthContext()
  const handleAdd = (e) => {
    e.preventDefault()
    addDataEmployeesTable(employee_name, first_name, last_name, job_title, email, department_id)
  }
  return (
    <div className="w-1/3 mx-auto p-3 bg-slate-200 rounded">
      <h3 className="font-bold text-2xl text-center my-3">Add Employee</h3>
      <form onSubmit={handleAdd} >
        <div className="flex justify-between items-center my-2">
          <label htmlFor="employee_name">Employee Name</label>
          <input value={employee_name} onChange={(e) => setEmployee_name(e.target.value)} type="text" id="employee_name" name="employee_name" placeholder="Employee Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100 w-1/2 " />
        </div>

        <div className="flex justify-between items-center my-2">
          <label htmlFor="first_name">First Name</label>
          <input value={first_name} onChange={(e) => setFirst_name(e.target.value)} type="text" id="first_name" name="first_name" placeholder="First  Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100 w-1/2 " />
        </div>

        {/* <div className="flex justify-between items-center my-2">
          <label htmlFor="middle_name">Middle Name</label>
          <input value={middle_name} onChange={(e) => setMiddle_name(e.target.value)} type="text" id="middle_name" name="middle_name" placeholder="middle_name Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100 w-1/2 " />
        </div> */}

        <div className="flex justify-between items-center my-2">
          <label htmlFor="last_name">Last Name</label>
          <input value={last_name} onChange={(e) => setLast_name(e.target.value)} type="text" id="last_name" name="last_name" placeholder="last_name Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100 w-1/2 " />
        </div>

        <div className="flex justify-between items-center my-2">
          <label htmlFor="job_title">Job Title</label>
          <input value={job_title} onChange={(e) => setJob_title(e.target.value)} type="text" id="job_title" name="job_title" placeholder="job_title Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100 w-1/2 " />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="email" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100 w-1/2 " />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="department_id">Department</label>
          <select
            onChange={(e) => setDepartment_id(e.target.value)}
            className="w-1/2 p-2 rounded ml-2"
            name="department_id" id="department_id" form="department_id" >
            <option value='101'  >Human Resources Management</option>
            <option value='102'>Finance</option>
            <option value='103'>Marketing</option>
            <option value='104'>Sales</option>
            <option value='105'>Production</option>
            <option value='106'>Computers and Information Technology</option>
          </select>
        </div>
        {/* <div className="flex justify-between items-center my-2">
          <label htmlFor="org_type">Org Type</label>
          <input value={org_type} onChange={(e) => setOrg_type(e.target.value)} type="text" id="org_type" name="org_type" placeholder="org_type Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="org_id">Org Id</label>
          <input value={org_id} onChange={(e) => setOrg_id(e.target.value)} type="text" id="org_id" name="org_id" placeholder="org_id Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="org_id_column_name">Org Id Column Name</label>
          <input value={org_id_column_name} onChange={(e) => setOrg_id_column_name(e.target.value)} type="text" id="org_id_column_name" name="org_id_column_name" placeholder="org_id_column_name Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div> */}
        <div className="w-20 mx-auto">
          <button type="submit" className="bg-emerald-500 px-6 py-2 my-4 rounded text-white font-bold">Add</button>
        </div>
      </form>
    </div>
  )
}
export default AddRow