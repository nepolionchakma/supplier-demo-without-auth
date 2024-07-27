import { useAuthContext } from "@/Supabase/AuthContext"
import { Edit, Flag, Pen, PenIcon, PenLineIcon, Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import { FiActivity, FiEdit, FiMaximize, FiMaximize2, FiMinimize, FiMinimize2, FiMinus, FiPenTool, FiSave, FiTrash, FiTrash2, FiUserPlus, FiX } from "react-icons/fi"
import { supabase } from "@/Supabase/AuthContext"
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, closestCorners, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Widget1 from "../Widget/Widget1"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import AddEmployee from "./AddEmployee"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import Widget2 from "../Widget/Widget2"


function DepartmentDND2() {
  const { allDepartmentData, allEmployeesData, handleDelete, addDataEmployeesTable, tosifySuccess } = useAuthContext()
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
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [job_title, setJob_title] = useState('')
  const [email, setEmail] = useState('')
  const [empID, setEmpID] = useState(29)
  const [employeeData, setEmployeeData] = useState([])
  const [employees, setEmployees] = useState([]);
  const [newEmployees, setNewEmployees] = useState([]);
  const [dpIDEmployees, setDpIDEmployees] = useState([])
  const [isAddEmployeeShow, setIsAddEmployeeShow] = useState(false)
  const [useStateDefenceDence, setUseStateDefenceDence] = useState('')

  // const employeesDataAll=[...allEmployeesData]
  // useEffect(() => {
  //   const sortedEmployeesData = allEmployeesData.sort((a, b) => a.positions - b.positions)
  //   setNewEmployees(sortedEmployeesData)
  // }, [useStateDefenceDence, handleDelete, addDataEmployeesTable])

  useEffect(() => {
    const filterSingleDepartmentEmployees = allEmployeesData?.filter((item) => item.department_id === selectDepartmentID)
    setEmployees(filterSingleDepartmentEmployees)
  }, [selectDepartmentID])
  useEffect(() => {
    const filterClickedDepartmentData = allDepartmentData?.filter((item) => item.department_id === selectDepartmentID)
    setSelectedDepartment(filterClickedDepartmentData)
  }, [selectDepartmentID])

  // console.log(useStateDefenceDence)

  // ------------------------------------- Save All Data START
  const handleSaveData = async () => {
    const updates = employees.map((employee, index) => ({
      employee_id: employee.employee_id,
      employee_name: employee.employee_name,
      job_title: employee.job_title,
      email: employee.email,
      department_id: employee.department_id,
      positions: index,
      min_n_max: employee.min_n_max
    }));
    tosifySuccess('Update Successfully.')

    const { data, error } = await supabase
      .from('employees')  // Make sure this matches your table name in Supabase
      .upsert(updates, { onConflict: ['employee_id'] });

    if (error) {
      console.error('Error updating employees:', error);
    } else {
      console.log('Employees updated:', data);
    }
  };
  // --------------------------END


  const handleUpdateDepartment = (e) => {
    e.preventDefault()
    console.log(department_id, department_name)
  }

  const handleDeleteEmployee = (id, info) => {
    handleDelete(id, info)
    setUseStateDefenceDence(id)
    tosifySuccess(' Successfully Deleted.')
  }
  const handleSave = () => {
    setEmployeeData((prev) => [...prev, { employee_id, employee_name, job_title, email, department_id }])
  }
  const handleMinimize = (dpID) => {
    setMinimize((prev) => [...prev, dpID])
  }
  const handleMaximize = (dpID) => {
    setMinimize(minimize.filter(i => i != dpID))
  }


  // add employee start
  // add Employee
  const handleAddEmployee = async () => {
    if (employee_id == '' ||
      employee_name == '' ||
      first_name == '' ||
      last_name == '' ||
      job_title == '' ||
      email == '' ||
      department_id == '') alert('Please fill all input filled')
    if (employee_id != '' &&
      employee_name != '' &&
      first_name != '' &&
      last_name != '' &&
      job_title != '' &&
      email != '' &&
      department_id != '') {
      setUseStateDefenceDence(department_id)
      addDataEmployeesTable(employee_id, employee_name, first_name, last_name, job_title, email, department_id)
      setIsAddEmployeeShow(!isAddEmployeeShow)
      setEmployee_id('')
      setEmployee_name('')
      setFirst_name('')
      setLast_name('')
      setJob_title('')
      setEmail('')
      setDepartment_id('')
    }

  }
  // add employee end




  // ----------------------Drag And Drop START


  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log(active.id, 'active id')
    console.log(over.id, 'over id')

    if (active.id !== over.id) {
      setEmployees((employees) => {
        const oldIndex = employees.findIndex((employee) => employee.employee_id === active.id.employee_id);
        const newIndex = employees.findIndex((employee) => employee.employee_id === over.id.employee_id);

        return arrayMove(employees, oldIndex, newIndex);
      });
    }
  };

  // ----------------Drag And Drop End
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )




  // const sortingDataUserID = allDepartmentData?.sort((a, b) => a.department_id - b.department_id)
  return (
    <div>

      <div className="flex gap-5 w-full p-4">
        <div className="w-[30%]  p-3 rounded">
          {/* left Side  */}
          <div className="flex flex-col gap-4 ">
            {
              allDepartmentData?.sort((a, b) => a.department_id - b.department_id)?.map((i) => (
                <div
                  onClick={() => setSelectDepartmentID(i.department_id)}
                  className="bg-slate-200 rounded p-3 hover:bg-slate-100 cursor-pointer shadow-md"
                  key={i.department_id}>{i.department_name}</div>
              ), [])
            }
          </div>
        </div>


        {/* right side  */}
        <div className="w-[65%] h-[89vh] overflow-y-scroll scroll-smooth  border-slate-500 bg-slate-200 rounded border-2">
          {/* <hr className="borde   border-slate-700 " /> */}
          <div className="text-center my-3 z-10 p-2 pb-4 sticky top-0 shadow-lg shadow-slate-400 overflow-hidden z-11 bg-slate-200">
            <h4>Department</h4>
          </div>
          {/* <hr className="border-3 mb-3 border-slate-700 " /> */}
          <div className="p-9">
            {
              selectedDepartment?.map((i) => (
                <div key={i.department_id}>
                  <form onSubmit={handleUpdateDepartment}>
                    <div className="flex flex-col gap-2">
                      <div className="">
                        <label htmlFor="dp_id">Department Id : </label>
                        <input readOnly value={i?.department_id} className="rounded px-2" onChange={(e) => { setSelectedDepartment_id(e.target.value) }} type="text" />
                      </div>
                      <div className="">
                        <label htmlFor="dp_name">Department Name : </label>
                        <input readOnly value={i?.department_name} className="rounded px-2 " onChange={(e) => { setDepartment_name(e.target.value) }} type="text" />
                      </div>
                    </div>
                  </form>
                  <br />
                  <div className="border-2 sticky top-60 p-4 shadow-xl hover:shadow-green-300 duration-500 rounded bg-slate-400  gap-4 flex flex-col">
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
          <div className=" overflow-hidden sticky shadow-lg shadow-slate-400 top-0 z-20 bg-slate-200">
            {/* ------------------------------------------ */}
            <hr className="borde   border-slate-700 " />
            <div className="text-center my-3">
              <h4>Employees Data</h4>
            </div>
            {/* <hr className="border-3 border-slate-700 " /> */}
          </div>
          {
            selectDepartmentID && <div className="m-4 flex flex-row-reverse items-center gap-2 sticky z-30 top-14">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={handleSaveData} className='p-3 bg-white shadow-lg shadow-green-600 hover:shadow-slate-900 hover:bg-green-600 duration-300 hover:text-white text-green-600 rounded-full'>
                    <FiSave className="text-2xl " />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save All Data</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div
                onClick={() => setIsAddEmployeeShow(!isAddEmployeeShow)}
                className='p-4 shadow-lg bg-white hover:bg-green-600 duration-300 hover:text-white shadow-green-600 hover:shadow-slate-900  text-green-600 rounded-full'>
                <FiUserPlus />
              </div>
            </div>
          }






          {/* --------------ADD -------------START DND */}
          {/* add Employee row */}


          <div className=" ">
            <div className="p-9 gap-10 flex flex-col">

              {
                isAddEmployeeShow && <div className={`border-2 p-4 shadow-xl  shadow-slate-600 duration-700 rounded bg-slate-400  mx-auto`}>

                  <AddEmployee
                    setIsAddEmployeeShow={setIsAddEmployeeShow}
                    handleAddEmployee={handleAddEmployee}
                    employee_name={employee_name}
                    setEmployee_name={setEmployee_name}
                    first_name={first_name}
                    setFirst_name={setFirst_name}
                    last_name={last_name}
                    setLast_name={setLast_name}
                    employee_id={employee_id}
                    setEmployee_id={setEmployee_id}
                    job_title={job_title}
                    setJob_title={setJob_title}
                    email={email}
                    setEmail={setEmail}
                    department_id={department_id}
                    setDepartment_id={setDepartment_id}
                    allDepartmentData={allDepartmentData} />
                </div>

              }

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="gap-6 flex flex-col">
                  <SortableContext
                    items={employees}
                    strategy={verticalListSortingStrategy}
                  >
                    {
                      employees.map((employee, index) => (

                        <Widget2
                          key={employee.employee_id}
                          index={index}
                          employee={employee}
                          setEmployees={setEmployees}
                          employees={employees}
                          handleDeleteEmployee={handleDeleteEmployee}
                          minimize={minimize}
                          handleMaximize={handleMaximize}
                          handleMinimize={handleMinimize} />
                      ))
                    }
                  </SortableContext>
                </div>
              </DndContext>
              {/* </SortableContext> */}
            </div>
          </div>
          {/* </DndContext> */}
          {/* ---------------------------END DND */}
        </div >
      </div >

    </div >
  )
}
export default DepartmentDND2