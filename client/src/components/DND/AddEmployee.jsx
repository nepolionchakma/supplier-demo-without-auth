import { useAuthContext } from "@/Supabase/AuthContext"
import { FiSave, FiX } from "react-icons/fi"

function AddEmployee({ setIsAddEmployeeShow, handleAddEmployee, employee_name, setEmployee_name, first_name, setFirst_name, last_name, setLast_name, employee_id, setEmployee_id, job_title, setJob_title, email, setEmail, department_id, setDepartment_id }) {
  const { allDepartmentData } = useAuthContext()
  return (
    <div>
      <div>
        <div className="flex flex-row-reverse gap-3 ">
          <div className="hover:bg-red-500 hover:text-white rounded-md p-1 cursor-pointer" onClick={() => setIsAddEmployeeShow(false)}>  <FiX /></div>
          <div className="hover:bg-green-500 hover:text-white rounded-md p-1 cursor-pointer" onClick={() => handleAddEmployee()}>  <FiSave /></div>
        </div>

        <div className=" flex flex-col gap-3">
          <div className=" ">
            <div className="flex gap-3">
              <div className="flex flex-col gap-3 w-[30%]">
                <label htmlFor="">Employee Name </label>
                <input value={employee_name} onChange={(e) => setEmployee_name(e.target.value)} type="text" id="Employee_name" name="Employee_name" placeholder="Employee name" className="px-2 rounded   focus:text-orange-600 bg-slate-100  " />
              </div>
              <div className="flex flex-col gap-3 w-[30%]">
                <label htmlFor="">First Name</label>
                <input value={first_name} onChange={(e) => setFirst_name(e.target.value)} type="text" id="first_name" name="first_name" placeholder="First Name" className="px-2 rounded  focus:text-orange-600 bg-slate-100  w-[95%]" />
              </div>
              <div className="flex flex-col gap-3 w-[30%]">
                <label htmlFor="">Last Name</label>
                <input value={last_name} onChange={(e) => setLast_name(e.target.value)} type="text" id="last_name" name="last_name" placeholder="Last Name" className="px-2 rounded  focus:text-orange-600 bg-slate-100  w-[95%]" />
              </div>
            </div>
          </div>
          <div className=''>
            <div className="flex gap-5">
              <div className="flex flex-col gap-3 w-[15%]">
                <label htmlFor="">Employee Id</label>
                <input value={employee_id} onChange={(e) => setEmployee_id(e.target.value)} type="text" id="employee_id" name="employee_id" placeholder="ID" className="px-2 rounded  focus:text-orange-600 bg-slate-100  w-[95%]" />
              </div>
              <div className="flex flex-col gap-3 w-[25%]">
                <label htmlFor="">Job Title</label>
                <input value={job_title} onChange={(e) => setJob_title(e.target.value)} type="text" id="job_title" name="job_title" placeholder="Job Title" className="px-2 rounded   focus:text-orange-600 bg-slate-100 w-[95%] " />
              </div>
              <div className="flex flex-col gap-3 w-[30%]">
                <label htmlFor="">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Email" className="px-2 rounded   focus:text-orange-600 bg-slate-100 w-[95%] " />
              </div>
              <div className="flex flex-col gap-3 w-[20%]">
                <label htmlFor="">Department Id</label>
                <select
                  value={department_id}
                  onChange={(e) => setDepartment_id(e.target.value)}
                  className=" px-2 rounded  bg-slate-100 w-[100%]"
                  name="action" id="action" form="action" >
                  {
                    allDepartmentData.map(i => (
                      <option key={i.department_id} value={i.department_id}>{i.department_name}</option>
                    ))
                  }

                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddEmployee