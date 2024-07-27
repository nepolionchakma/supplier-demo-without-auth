import { useAuthContext } from "@/Supabase/AuthContext"
import { Edit, Pen, PenIcon, PenLineIcon, Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { FiEdit, FiMaximize, FiMaximize2, FiMinimize, FiMinimize2, FiMinus, FiSave, FiX } from "react-icons/fi"
import { supabase } from "@/Supabase/AuthContext"

function DepartmentDND() {
  const { allDepartmentData, allEmployeesData } = useAuthContext()
  const [department_id, setDepartment_id] = useState('')
  const [employee_id, setEmployee_id] = useState('')
  const [selectedDepartment_id, setSelectedDepartment_id] = useState('')
  const [department_name, setDepartment_name] = useState('')
  const [selectDepartmentID, setSelectDepartmentID] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState([])
  const [minimize, setMinimize] = useState([])
  const [selectedMinimize, setSelectedMinimize] = useState(false)
  // console.log(allDepartmentData)
  const [employee_name, setEmployee_name] = useState('')
  const [job_title, setJob_title] = useState('')
  const [email, setEmail] = useState('')
  const [empID, setEmpID] = useState(29)
  const [employeeData, setEmployeeData] = useState([])

  const [dpIDEmployees, setDpIDEmployees] = useState([])

  useEffect(() => {
    const handleEdit = async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('employee_id', empID)
        .single()
      if (data) {
        setEmployee_id(data?.employee_id)
        setEmployee_name(data?.employee_name)
        setJob_title(data?.job_title)
        setDepartment_id(data?.department_id)
        setEmail(data?.email)
      }
    }
    handleEdit()
  }, [empID])

  const handleEdit = async (empID) => {
    setEmpID(empID)
  }
  // console.log(employee_id, employee_name, job_title, email, department_id)

  const handleUpdateDepartment = (e) => {
    e.preventDefault()
    console.log(department_id, department_name)
  }
  const filterSingleDepartmentEmployees = allEmployeesData?.filter((item) => item.department_id === selectDepartmentID)

  useEffect(() => {
    const filterClickedDepartmentData = allDepartmentData?.filter((item) => item.department_id === selectDepartmentID)
    setSelectedDepartment(filterClickedDepartmentData)
  }, [selectDepartmentID])
  const handleDelete = () => { }
  const handleSave = () => {
    setEmployeeData((prev) => [...prev, { employee_id, employee_name, job_title, email, department_id }])
  }
  console.log(employeeData)
  const handleMinimize = (dpID) => {
    setMinimize((prev) => [...prev, dpID])
  }
  const handleMaximize = (dpID) => {
    setMinimize(minimize.filter(i => i != dpID))
  }

  // const sortingDataUserID = allDepartmentData?.sort((a, b) => a.department_id - b.department_id)
  return (
    <div>
      <div className="flex gap-5 w-full p-4">
        <div className="w-[30%]  p-3 rounded">
          {/* left Side  */}
          <div className="flex flex-col gap-2 ">
            {
              allDepartmentData?.sort((a, b) => a.department_id - b.department_id)?.map((i) => (
                <div onClick={() => setSelectDepartmentID(i.department_id)} className="bg-slate-200 rounded p-3 hover:bg-slate-100 cursor-pointer" key={i.department_id}>{i.department_name}</div>
              ), [])
            }
          </div>
        </div>
        {/* right side  */}
        <div className="w-[65%] h-[89vh] overflow-y-scroll scroll-smooth  border-slate-500 bg-slate-200 rounded border-2">
          {/* <hr className="borde   border-slate-700 " /> */}
          <div className="text-center my-3   p-2 overflow-hidden z-11 bg-slate-200">
            <h4>Department</h4>
          </div>
          <hr className="border-3 mb-3 border-slate-700 " />
          <div className="p-9">
            {
              selectedDepartment?.map((i) => (
                <div key={i.department_id}>
                  <form onSubmit={handleUpdateDepartment}>
                    <div className="flex flex-col gap-2">
                      <div className="">
                        <label htmlFor="dp_id">Department Id : </label>
                        <input value={i?.department_id} className="rounded" readOnly onChange={(e) => { setSelectedDepartment_id(e.target.value) }} type="text" />
                      </div>
                      <div className="">
                        <label htmlFor="dp_name">Department Name : </label>
                        <input value={i?.department_name} className="rounded  " onChange={(e) => { setDepartment_name(e.target.value) }} type="text" />
                      </div>
                    </div>
                  </form>
                  <br />
                  <div className="border-2  p-4 rounded bg-slate-400 border-slate-950 gap-4 flex flex-col">
                    <div className="">
                      <div className="flex flex-row-reverse gap-3 ">
                        <div>  <FiX /> </div>
                        <div><FiMinus /></div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex gap-3">
                        <label htmlFor="">Department Name </label>
                        <div className="w-[30%]">
                          <select name="" id="" className="rounded w-full">
                            <option value="" >{i?.department_name}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ), [])
            }
          </div>
          {/* <hr className="border-3 border-slate-700 " /> */}
          <div className=" overflow-hidden z-11 bg-slate-200">
            {/* ------------------------------------------ */}
            <hr className="borde   border-slate-700 " />
            <div className="text-center my-3">
              <h4>Employees Data</h4>
            </div>
            <hr className="border-3 border-slate-700 " />
          </div>

          <div className=" ">
            <div className="p-9 gap-10 flex flex-col">

              {
                filterSingleDepartmentEmployees?.map((i) => (
                  <div key={i.employee_id} className="border-2 p-4 rounded bg-slate-400 border-slate-950 ">

                    <div className="">
                      <div className="flex flex-row-reverse gap-3 ">
                        <div className="hover:bg-red-500 hover:text-white rounded-md p-1" onClick={handleDelete}>  <FiX /> </div>
                        <div className="hover:bg-green-500 hover:text-white rounded-md p-1" onClick={handleSave}>  <FiSave /> </div>
                        <div className="hover:bg-green-500 hover:text-white rounded-md p-1" onClick={() => handleEdit(i.employee_id)}>  <FiEdit /> </div>
                        {
                          minimize?.includes(i.employee_id) ? <div className="hover:bg-sky-500 hover:text-white rounded-md p-1" onClick={() => handleMaximize(i.employee_id)}>  <FiMaximize /></div> : <div className="hover:bg-sky-500 hover:text-white rounded-md p-1" onClick={() => handleMinimize(i.employee_id)}>  <FiMinimize2 /></div>
                        }


                      </div>
                    </div>

                    <div className=" flex flex-col gap-3">
                      <div className=" ">
                        <div className="flex gap-3">
                          <label htmlFor="">Employee Name </label>
                          <div className="  w-[30%]">
                            <select name="" id="" className="rounded w-full">
                              <option value="" >{i.employee_name}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className={`w-full ${minimize?.includes(i.employee_id) ? 'hidden' : 'visible'}`}>
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-3 w-[20%]">
                            <label htmlFor="">Employee Id</label>
                            <input type="text" value={handleEdit ? employee_id : i.employee_id} onChange={(e) => setEmployee_id(e.target.value)} />
                          </div>
                          <div className="flex flex-col gap-3 w-[30%]">
                            <label htmlFor="">Job Title</label>
                            <select name="" id="" className="rounded w-full">
                              <option value="">{i.job_title}</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-3 w-[30%]">
                            <label htmlFor="">Email</label>
                            <select name="" id="" className="rounded  w-full">
                              <option value="">{i.email}</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-3 w-[20%]">
                            <label htmlFor="">Department Id</label>
                            <select name="" id="" className="rounded  w-full">
                              <option value="">{i.department_id}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
export default DepartmentDND