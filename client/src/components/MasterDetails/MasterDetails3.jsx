import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FilePen, FilePenIcon, FilePenLineIcon, FileScanIcon } from "lucide-react";

import { FiCircle, FiPenTool, FiSave, FiTrash, FiX } from 'react-icons/fi';
import { Link } from "react-router-dom";
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
import { useAuthContext } from "@/Supabase/AuthContext";
import { supabase } from "@/Supabase/AuthContext";
import Pagination from "../Pagination/Pagination";
function MasterDetails3() {
  const [searchValue, setSearchValue] = useState('')
  const [searchValueById, setSearchValueById] = useState('')
  const [dataMapEmployee, setDataMapEmployee] = useState([])
  const [action, setAction] = useState('')
  const [isShowDepartment, setIsShowDepartment] = useState(false)
  const [isShowEmployee, setIsShowEmployee] = useState(false)
  const [isCheckedDepartment, setIsCheckedDepartment] = useState('');
  const [isCheckedEmployee, setIsCheckedEmployee] = useState('');
  const [isShowDepartmentData, setIsShowDepartmentData] = useState(false)
  const [isEditableDepartmentId, setIsEditableDepartmentId] = useState('')
  const [isEditableEmployeeId, setIsEditableEmployeeId] = useState('')
  const [department_id, setDepartment_id] = useState('')
  const [employee_id, setEmployee_id] = useState('')
  const [department_name, setDepartment_name] = useState('')
  const [actionButton, setActionButton] = useState(false)
  const [isCheckBoxTrue, setIsCheckBoxTrue] = useState(true)
  const [employee_name, setEmployee_name] = useState('')
  const [searchEmployeesNameData, setSearchEmployeesNameData] = useState([])
  const [searchEmployeesData, setSearchEmployeesData] = useState([])
  const [searchEmployeesDataByFilteredDepartment, setSearchEmployeesDataByFilteredDepartment] = useState([])
  const [searchEmployeesNameDataFilteredDepartment, setSearchEmployeesNameDataFilteredDepartment] = useState([])

  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [job_title, setJob_title] = useState('')
  const [email, setEmail] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const { allEmployeesData, allDepartmentData, addDepartment, addDataEmployeesTable, tosifySuccess, tosifyError, handleDelete } = useAuthContext()
  const sortingDataUserID = allDepartmentData?.sort((a, b) => a.department_id - b.department_id)




  // console.log(...Array)
  // ---------------------


  // showAddToDepartment
  const showToAddDepartment = () => {
    setDepartment_id('')
    setDepartment_name('')
    setIsShowDepartment(!isShowDepartment)
    setIsEditableDepartmentId(false)
  }
  // showAddToEmployee
  const showToAddEmployee = () => {
    setEmployee_id('')
    setEmployee_name('')
    setJob_title('')
    setFirst_name('')
    setLast_name('')
    setEmail('')
    setActionButton('')
    setIsShowEmployee(!isShowEmployee)
    setIsEditableEmployeeId(false)
    setIsCheckedEmployee(false)
  }
  const showDepartment = () => {
    setDepartment_id('')
    setDepartment_name('')
    setIsShowDepartmentData(!isShowDepartmentData)
    setIsEditableDepartmentId(false)
  }
  // add department
  const handleAddDeparment = async (e) => {

    e.preventDefault()
    addDepartment(department_id, department_name)
    setIsShowDepartment(!isShowDepartment)
    setDepartment_id('')
    setDepartment_name('')
  }
  // add Employee
  const handleAddEmployee = async (e) => {

    e.preventDefault()
    addDataEmployeesTable(employee_id, employee_name, first_name, last_name, job_title, email, department_id)
    setIsShowEmployee(!isShowEmployee)
    setEmployee_id('')
    setEmployee_name('')
  }
  // get department
  const getDepartmentData = async (id) => {
    console.log(id)
    let { data, error } = await supabase
      .from('departments')
      .select()
      .eq('department_id', id)
      .single()

    if (data) {
      setDepartment_id(data?.department_id)
      setDepartment_name(data?.department_name)
      setIsLoading(false)
    }
  }
  // get Employee
  const getEmployeeData = async (id) => {
    console.log(id)
    let { data, error } = await supabase
      .from('employees')
      .select()
      .eq('employee_id', id)
      .single()

    if (data) {
      setEmployee_id(data?.employee_id)
      setEmployee_name(data?.employee_name)
      setFirst_name(data?.first_name)
      setLast_name(data?.last_name)
      setJob_title(data.job_title)
      setEmail(data?.email)
      setIsLoading(false)
    }
  }
  // edit department
  const editDepartment = (department_id) => {
    setIsShowDepartment(false)
    if (department_id == false) return setIsEditableDepartmentId(false)
    setIsLoading(true)
    setDepartment_id('')
    setDepartment_name('')
    setIsEditableDepartmentId(department_id)
    getDepartmentData(department_id)

  }
  // edit Employee
  const editEmployee = (employee_id) => {
    setIsShowEmployee(false)
    if (employee_id == false) return setIsEditableEmployeeId(false)
    setIsLoading(true)
    setEmployee_id('')
    setEmployee_name('')
    setFirst_name('')
    setLast_name('')
    setJob_title('')
    setEmail('')
    setIsEditableEmployeeId(employee_id)
    getEmployeeData(employee_id)

  }
  // update department
  const handleUpdateDeparment = async () => {

    const { data, error } = await supabase
      .from('departments')
      .update({ department_id, department_name })
      .eq('department_id', department_id)
      .select()

    if (data) {

      setIsEditableDepartmentId(false)
      tosifySuccess('Update Successfully.')
    }
    if (error) tosifyError('Error ! Filled all correctly Please.')
  }
  // update employee
  const handleUpdateEmployee = async () => {

    const { data, error } = await supabase
      .from('employees')
      .update({ employee_id, employee_name, first_name, last_name, job_title, email, department_id })
      .eq('employee_id', employee_id)
      .select()

    if (data) {

      setIsEditableEmployeeId(false)
      tosifySuccess('Update Successfully.')
    }
    if (error) tosifyError('Error ! Filled all correctly Please.')
  }

  // delete department
  const handleDeleteDepartmentItem = (id, info) => {
    handleDelete(id, info)
    tosifySuccess('Delete Successfully.')
  }
  // delete employee
  const handleDeleteEmployeeItem = (id, info) => {
    handleDelete(id, info)
    tosifySuccess('Delete Successfully.')
  }

  // Search By Name
  const filterEmployeeDataByName = (employee_name) => {
    setIsCheckBoxTrue(false)
    setSearchEmployeesNameDataFilteredDepartment('')
    setSearchValueById('')
    setSearchEmployeesNameData(employee_name)
    const newFilteredData = allEmployeesData?.filter((item) => item?.employee_name.toUpperCase().includes(employee_name.toUpperCase()))
    setSearchEmployeesData(newFilteredData)
  }
  useEffect(() => {
    if (searchEmployeesNameData != '') setDataMapEmployee(searchEmployeesData)
    if (searchEmployeesNameDataFilteredDepartment != '') setDataMapEmployee(searchEmployeesDataByFilteredDepartment)
    if (searchEmployeesNameDataFilteredDepartment == '' &&
      searchValueById != '') setDataMapEmployee(searchEmployeesData)
    if (searchEmployeesNameData == searchValueById) setDataMapEmployee(allEmployeesData)
  }, [allEmployeesData, isCheckedDepartment, searchEmployeesNameData, searchEmployeesNameDataFilteredDepartment, searchValueById, handleUpdateEmployee, handleUpdateDeparment, editEmployee, editDepartment, handleUpdateDeparment, handleUpdateEmployee])

  // -----------------------------Pagination Start-------------------------------
  const [pageDepartment, setPageDepartment] = useState(0);

  // Number of items per page
  const itemsPerPageDepartment = 3;
  // Calculate the total number of pages
  const totalPagesDepartment = Math.ceil(sortingDataUserID?.length / itemsPerPageDepartment);

  // Handle page change
  const handleSelectPageDepartment = (newPage) => {
    if (newPage >= 0 && newPage < totalPagesDepartment) {
      setPageDepartment(newPage);
    }
  };
  // Slice data for the current page
  const sliceDataForPaginationDepartment = sortingDataUserID?.slice(pageDepartment * itemsPerPageDepartment, (pageDepartment + 1) * itemsPerPageDepartment);

  // Check if the length is valid
  const pageArrayLengthDepartment = Number.isFinite(totalPagesDepartment) ? totalPagesDepartment : 0;
  // -----------------------------Pagination end--------------------------------

  // -----------------------------Pagination Start-------------------------------
  const [pageEmployee, setPageEmployee] = useState(0);

  // Number of items per page
  const itemsPerPageEmployee = 4;
  // Calculate the total number of pages
  const totalPagesEmployee = Math.ceil(dataMapEmployee?.length / itemsPerPageEmployee);

  // Handle page change
  const handleSelectPageEmployee = (newPage) => {
    if (newPage >= 0 && newPage < totalPagesEmployee) {
      setPageEmployee(newPage);
    }
  };
  const sortEmployee = dataMapEmployee?.sort((a, b) => a.employee_id - b.employee_id);
  // Slice data for the current page
  const sliceDataForPaginationEmployee = sortEmployee?.slice(pageEmployee * itemsPerPageEmployee, (pageEmployee + 1) * itemsPerPageEmployee)

  // Check if the length is valid
  const pageArrayLengthEmployee = Number.isFinite(totalPagesEmployee) ? totalPagesEmployee : 0;
  // -----------------------------Pagination end--------------------------------

  // Search By Name but every filter departments
  const filterEmployeeDataByNameFilteredDepartment = (employee_name) => {

    setSearchEmployeesNameDataFilteredDepartment(employee_name)
    const newFilteredData = searchEmployeesData?.filter((item) => item?.employee_name.toUpperCase().includes(employee_name.toUpperCase()))
    setSearchEmployeesDataByFilteredDepartment(newFilteredData)
  }
  // Search By ID
  const filterEmployeeDataById = (department_id) => {
    setSearchEmployeesNameData('')
    setSearchEmployeesNameDataFilteredDepartment('')
    setSearchValueById(department_id)
    const newFilteredData = allEmployeesData?.filter((item) => item?.department_id == department_id)
    setSearchEmployeesData(newFilteredData)
    // console.log(newFilteredData, 'newitems')
  }
  const handleClickCheckedDepartment = (department_id, department_name) => {
    setIsCheckedDepartment(department_id)
    setSearchEmployeesNameData('')
    setSearchEmployeesNameDataFilteredDepartment('')
    setSearchValueById(department_id)
    const newFilteredData = allEmployeesData?.filter((item) => item?.department_id == department_id)
    setSearchEmployeesData(newFilteredData)

    setPageEmployee(0)
  }
  const handleClickCheckedEmployee = (employee_id) => {
    setIsCheckedEmployee(employee_id)
    setActionButton(employee_id)
    setIsShowEmployee(false)
  }
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex gap-3 p-2 border-2 border-b-0 items-center justify-between">

          {/* search & add department */}
          <div className="flex gap-4">
            <input
              value={searchEmployeesNameData}
              onChange={(e) => filterEmployeeDataByName(e.target.value)}
              className=" border-2 py-1 px-2 rounded" type="text" placeholder="Search by Employee Name"
            />

            <Button className='bg-green-400 hover:bg-green-300' onClick={showToAddDepartment}>Add Department</Button>
          </div>
          <div>
            <h3 className="font-bold  ">Departments Data</h3>
          </div>
          {/* section option */}
        </div>
        <div className="border-2 h-[250px]">

          {/* departments table  */}

          <Table className=''>
            <TableCaption> </TableCaption>

            <TableHeader className='sticky top-0 overflow-hidden bg-white shadow  shadow-green-600'>
              <TableRow className=' '>
                <TableHead>Check</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Department Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* add department row */}
              {
                isShowDepartment && <TableRow >
                  <TableCell className='w-4'><input type="checkbox" checked readOnly className="w-4" /></TableCell>
                  <TableCell className='p-0 m-0 w-11'>
                    <input value={department_id} onChange={(e) => setDepartment_id(e.target.value)} type="text" id="departmentId" name="departmentId" placeholder="ID" className="p-2 rounded  focus:text-orange-600 bg-slate-100 w-11 " />
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[50%]'>
                    <input value={department_name} onChange={(e) => setDepartment_name(e.target.value)} type="text" id="department_name" name="department_name" placeholder="Department name" className="p-2 rounded   focus:text-orange-600 bg-slate-100 w-[50%] " />
                  </TableCell>
                  <TableCell className='w-20'>
                    <div className='flex items-center cursor-pointer'>
                      <button onClick={handleAddDeparment} className="p-1 rounded-full border-2 bg-green-400 text-2xl" ><FiSave /></button>
                      {/* cancle */}
                      <button onClick={() => setIsShowDepartment(false)} className="p-1 rounded-full border-2 bg-green-400 text-2xl" >
                        <FiX />
                      </button>
                    </div></TableCell>
                </TableRow>
              }
              {/* departments table  const sortingDataUserID = allDepartmentData?.sort((a, b) => a.user_id - b.user_id)*/}

              {sliceDataForPaginationDepartment?.map((i) => (
                <TableRow key={i.department_id}>
                  <TableCell className="w-4">
                    <input onClick={() => handleClickCheckedDepartment(i.department_id, i.department_name)} type="checkbox" checked={isCheckedDepartment == i.department_id && isCheckBoxTrue} readOnly className="w-4 " />
                  </TableCell>
                  <TableCell className='p-0 m-0 w-11 '>
                    {
                      isEditableDepartmentId == i.department_id ?
                        <input disabled value={
                          isLoading ? '000' : department_id} onChange={(e) => setDepartment_id(e.target.value)} type="text" id="department_id" name="department_id" placeholder="department_id" className="p-2 rounded cursor-pointer w-11 " />
                        :
                        <span onClick={() => handleClickCheckedDepartment(i.department_id, i.department_name)} className="p-2 w-11 cursor-pointer">{i.department_id}</span>
                    }
                  </TableCell>

                  <TableCell className='p-0 m-0 w-[50%] '>
                    {
                      isEditableDepartmentId == i.department_id ? <input value={isLoading ? 'loading' : department_name} onChange={(e) => setDepartment_name(e.target.value)} type="text" id="department_name" name="department_name" placeholder="Department name" className="p-2 rounded  focus:text-orange-600 bg-slate-100 w-[50%] " />
                        :
                        <span onClick={() => handleClickCheckedDepartment(i.department_id, i.department_name)} className="p-2 w-[50%] cursor-pointer">{i.department_name}</span>
                    }
                  </TableCell>
                  <TableCell className='w-20'>
                    <div className='flex items-center'>
                      {
                        isEditableDepartmentId == i.department_id ? <div className="">

                          {
                            department_id != i.department_id || department_name != i.department_name &&
                            <button onClick={handleUpdateDeparment} className="p-1 rounded-full border-2 bg-green-400 text-2xl cursor-pointer" >
                              <FiSave />
                            </button>
                          }
                          <button onClick={() => editDepartment(false)} className="p-1 rounded-full border-2 bg-green-400 text-2xl cursor-pointer" >
                            <FiX />
                          </button>
                        </div>
                          :
                          <button onClick={() => editDepartment(i.department_id)} className="p-1 rounded-full border-2 bg-green-400 text-xl cursor-pointer" ><FilePen /></button>
                      }



                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="p-1 rounded-full border-2 bg-red-400 text-xl" >{<FiTrash />}</button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Really Want To <span className="text-red-600">Delete</span> ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently <span className="text-red-600">delete</span> from
                              database and <span className="text-red-600">remove</span> your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className='bg-green-700 text-white'>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteDepartmentItem(i.department_id, 'departments')}>Confirm</AlertDialogAction>

                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                    </div>
                  </TableCell>
                </TableRow>

              ))
              }

            </TableBody>
          </Table>
        </div>
        {/*--------------------------------- pagination start--------------------------- */}
        <div className="border flex items-center justify-center gap-1 p-1">
          <button
            className={pageDepartment > 0 ? 'cursor-pointer px-2 py-1 border-2 hover:bg-green-300' : 'disabled cursor-pointer px-2 py-1 border-2 bg-slate-300 hidden'}
            onClick={() => handleSelectPageDepartment(pageDepartment - 1)}
          >
            Prev
          </button>
          {[...Array(pageArrayLengthDepartment)].map((_, i) => (
            <button
              key={i}
              className={pageDepartment === i ? 'cursor-pointer px-2 bg-green-300 py-1 border-2' : 'cursor-pointer px-2 py-1 border-2 hover:bg-green-300'}
              onClick={() => handleSelectPageDepartment(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={pageDepartment < totalPagesDepartment - 1 ? 'cursor-pointer px-2 py-1 border-2 hover:bg-green-300' : 'disabled cursor-pointer px-2 py-1 border-2 bg-slate-300 hidden '}
            onClick={() => handleSelectPageDepartment(pageDepartment + 1)}
          >
            Next
          </button>
        </div>
        {/*--------------------------------- pagination End--------------------------- */}
      </div>
      <div>
        <div className="flex gap-3 p-2 border-2 border-b-0 items-center justify-between">
          {/* search employee */}
          <div className="flex gap-4">
            <input
              value={searchEmployeesNameDataFilteredDepartment}
              onChange={(e) => filterEmployeeDataByNameFilteredDepartment(e.target.value)}
              className=" border-2 p-2 rounded" type="text" placeholder="Search by Name"
            />
            <Button onClick={showToAddEmployee} className='bg-green-400'>Add Employee</Button>
          </div>
          <div>
            <h3 className="font-bold  "> Employees Data</h3>
          </div>
        </div>
        <hr />
        <div className="h-[270px] overflow-auto border-2">

          {/* Employees table  */}

          <Table className='border-0  '>
            <TableCaption> </TableCaption>
            <TableHeader className='sticky top-0 overflow-hidden bg-white shadow  shadow-green-600'>
              <TableRow>
                <TableHead className='p-2'>Check</TableHead>
                <TableHead className='p-2'>ID</TableHead>
                <TableHead className='p-2'>Employee Name</TableHead>
                <TableHead className='p-2'>Job Title</TableHead>
                <TableHead className='p-2'>First Name</TableHead>
                <TableHead className='p-2'>Last Name</TableHead>
                <TableHead className='p-2'>Email</TableHead>
                <TableHead className='p-2'>DP</TableHead>
                <TableHead className='p-2 w-[18%]'>Action</TableHead>
              </TableRow>
            </TableHeader>
            {
              isShowEmployee && <TableBody>
                {/* add Employee row */}
                <TableRow >
                  <TableCell className='w-4'><input type="checkbox" checked readOnly className="w-4" /></TableCell>
                  <TableCell className='p-0 m-0 w-11'>
                    <input value={employee_id} onChange={(e) => setEmployee_id(e.target.value)} type="text" id="employee_id" name="employee_id" placeholder="ID" className="p-2 rounded  focus:text-orange-600 bg-slate-100  w-[95%]" />
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[10%]'>
                    <input value={employee_name} onChange={(e) => setEmployee_name(e.target.value)} type="text" id="Employee_name" name="Employee_name" placeholder="Employee name" className="p-2 rounded   focus:text-orange-600 bg-slate-100 w-[95%] " />
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[15%]'>
                    <input value={job_title} onChange={(e) => setJob_title(e.target.value)} type="text" id="job_title" name="job_title" placeholder="Job Title" className="p-2 rounded   focus:text-orange-600 bg-slate-100 w-[95%] " />
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[15%]'>
                    <input value={first_name} onChange={(e) => setFirst_name(e.target.value)} type="text" id="first_name" name="first_name" placeholder="First name" className="p-2 rounded   focus:text-orange-600 bg-slate-100 w-[95%] " />
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[15%]'>
                    <input value={last_name} onChange={(e) => setLast_name(e.target.value)} type="text" id="last_name" name="last_name" placeholder="Last name" className="p-2 rounded   focus:text-orange-600 bg-slate-100 w-[95%] " />
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[20%]'>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Email" className="p-2 rounded   focus:text-orange-600 bg-slate-100 w-[95%] " />
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[7%]'>
                    {/* section option */}
                    <div className="flex justify-between items-center my-2  w-[100%]">
                      <select
                        value={department_id}
                        onChange={(e) => setDepartment_id(e.target.value)}
                        className=" p-2 rounded  bg-slate-100 w-[100%]"
                        name="action" id="action" form="action" >
                        <option >Select</option>
                        <option value='101'>Human Resources Management</option>
                        <option value='102'>Finance</option>
                        <option value='103'>Marketing</option>
                        <option value='104'>Sales</option>
                        <option value='105'>Production</option>
                        <option value='106'>Computers and Information Technology</option>
                      </select>
                    </div>
                  </TableCell>
                  <TableCell className='w-[15%]'>
                    <div className='flex items-center cursor-pointer'>
                      <button onClick={handleAddEmployee} className="p-1 rounded-full border-2 bg-green-400 text-xl" ><FiSave /></button>
                      {/* cancle */}
                      <button onClick={() => setIsShowEmployee(false)} className="p-1 rounded-full border-2 bg-green-400 text-xl" >
                        <FiX />
                      </button>
                    </div></TableCell>
                </TableRow>

              </TableBody>}


            {/* search by all  */}
            <TableBody>
              {sliceDataForPaginationEmployee?.map((i) => (
                <TableRow key={i.employee_id}>


                  <TableCell className="w-4">
                    <input onClick={() => handleClickCheckedEmployee(i.employee_id)} type="checkbox" checked={isCheckedEmployee == i.employee_id && true} readOnly className="w-4  " />
                  </TableCell>
                  <TableCell className='p-0 m-0 w-11 '>
                    {
                      isEditableEmployeeId == i.employee_id ?
                        <input disabled value={
                          isLoading ? '00' : employee_id} onChange={(e) => setEmployee_id(e.target.value)} type="text" id="employee_id" name="employee_id" placeholder="employee_id" className="p-2 rounded cursor-pointer w-[95%] " />
                        :
                        <span onClick={() => handleClickCheckedEmployee(i.employee_id)} className="p-2 w-11 cursor-pointer">{i.employee_id}</span>
                    }
                  </TableCell>

                  <TableCell className='p-0 m-0 w-[10%] '>
                    {
                      isEditableEmployeeId == i.employee_id ? <input value={isLoading ? 'loading' : employee_name} onChange={(e) => setEmployee_name(e.target.value)} type="text" id="department_name" name="employee_name" placeholder="employee name" className="p-2 rounded  focus:text-orange-600 bg-slate-100 w-[95%] " />
                        :
                        <span onClick={() => handleClickCheckedEmployee(i.employee_id)} className="p-2 w-[10%] cursor-pointer">{i.employee_name}</span>
                    }
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[15%] '>
                    {
                      isEditableEmployeeId == i.employee_id ? <input value={isLoading ? 'loading' : job_title} onChange={(e) => setJob_title(e.target.value)} type="text" id="job_title" name="job_title" placeholder="job title" className="p-2 rounded  focus:text-orange-600 bg-slate-100 w-[95%] " />
                        :
                        <span onClick={() => handleClickCheckedEmployee(i.employee_id)} className="p-2 w-[15%] cursor-pointer">{i.job_title}</span>
                    }
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[15%] '>
                    {
                      isEditableEmployeeId == i.employee_id ? <input value={isLoading ? 'loading' : first_name} onChange={(e) => setFirst_name(e.target.value)} type="text" id="first_name" name="first_name" placeholder="First name" className="p-2 rounded  focus:text-orange-600 bg-slate-100 w-[95%] " />
                        :
                        <span onClick={() => handleClickCheckedEmployee(i.employee_id)} className="p-2 w-[15%] cursor-pointer">{i.first_name}</span>
                    }
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[15%] '>
                    {
                      isEditableEmployeeId == i.employee_id ? <input value={isLoading ? 'loading' : last_name} onChange={(e) => setLast_name(e.target.value)} type="text" id="last_name" name="last_name" placeholder="Last name" className="p-2 rounded  focus:text-orange-600 bg-slate-100 w-[95%] " />
                        :
                        <span onClick={() => handleClickCheckedEmployee(i.employee_id)} className="p-2 w-[15%] cursor-pointer">{i.last_name}</span>
                    }
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[17%] '>
                    {
                      isEditableEmployeeId == i.employee_id ? <input value={isLoading ? 'loading' : email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="email" className="p-2 rounded  focus:text-orange-600 bg-slate-100 w-[95%] " />
                        :
                        <span onClick={() => handleClickCheckedEmployee(i.employee_id)} className="p-2 w-[20%] cursor-pointer">{i.email}</span>
                    }
                  </TableCell>
                  <TableCell className='p-0 m-0 w-[7%] '>
                    {
                      // isEditableEmployeeId == i.employee_id ? <div>
                      //   {/* section option */}
                      //   <div className="flex justify-between items-center my-2  w-[100%]">
                      //     <select
                      //       value={i.department_id}
                      //       onChange={(e) => setDepartment_id(e.target.value)}
                      //       className=" p-2 rounded ml-2  bg-slate-100 w-[100%]"
                      //       name="action" id="action" form="action" >
                      //       <option >Select</option>
                      //       <option value='101'>Human Resources Management</option>
                      //       <option value='102'>Finance</option>
                      //       <option value='103'>Marketing</option>
                      //       <option value='104'>Sales</option>
                      //       <option value='105'>Production</option>
                      //       <option value='106'>Computers and Information Technology</option>
                      //     </select>
                      //   </div>
                      // </div>
                      //   :
                      <span onClick={() => handleClickCheckedEmployee(i.employee_id)} className="p-2 w-[7%] cursor-pointer">{i.department_id}</span>
                    }
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center w-[18%]'>
                      {
                        actionButton == i.employee_id ? <>
                          {
                            isEditableEmployeeId == i.employee_id
                              ? <div className="flex">

                                {
                                  employee_name != i.employee_name || job_title != i.job_title || first_name != i.first_name || last_name != i.last_name || email != i.email ?
                                    <button onClick={handleUpdateEmployee} className="p-1 rounded-full border-2 bg-green-400 text-xl cursor-pointer" >
                                      <FiSave />
                                    </button> : <></>
                                }
                                <button onClick={() => editEmployee(false)} className="p-1 rounded-full border-2 bg-green-400 text-xl cursor-pointer" >
                                  <FiX />
                                </button>
                              </div>
                              :
                              <button onClick={() => editEmployee(i.employee_id)} className="p-1 rounded-full border-2 bg-green-400 text-xl cursor-pointer" ><FilePen /></button>
                          }

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button className="p-1 rounded-full border-2 bg-red-400 text-xl" >{<FiTrash />}</button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Really Want To <span className="text-red-600">Delete</span> ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently <span className="text-red-600">delete</span> from
                                  database and <span className="text-red-600">remove</span> your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className='bg-green-700 text-white'>Cancel</AlertDialogCancel>
                                <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteEmployeeItem(i.employee_id, 'employees')}>Confirm</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </>
                          :
                          <></>
                      }
                    </div>
                  </TableCell>
                </TableRow>
              ))
                // .sort((a, b) => a.user_name.localeCompare(b.user_name))

              }
            </TableBody>
          </Table>
        </div>
        {/*--------------------------------- pagination start--------------------------- */}
        <div className="border flex items-center justify-center gap-1 p-1">
          <button
            className={pageEmployee > 0 ? 'cursor-pointer px-2 py-1 border-2 hover:bg-green-300' : 'disabled cursor-pointer px-2 py-1 border-2 bg-slate-300 '}
            onClick={() => handleSelectPageEmployee(pageEmployee - 1)}
          >
            Prev
          </button>
          {[...Array(pageArrayLengthEmployee)].map((_, i) => (
            <button
              key={i}
              className={pageEmployee === i ? 'cursor-pointer px-2 bg-green-300 py-1 border-2' : 'cursor-pointer px-2 py-1 border-2 hover:bg-green-300'}
              onClick={() => handleSelectPageEmployee(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={pageEmployee < totalPagesEmployee - 1 ? 'cursor-pointer px-2 py-1 border-2 hover:bg-green-300' : 'disabled cursor-pointer px-2 py-1 border-2 bg-slate-300'}
            onClick={() => handleSelectPageEmployee(pageEmployee + 1)}
          >
            Next
          </button>
        </div>
        {/*--------------------------------- pagination End--------------------------- */}
      </div>
    </div>
  )
}
export default MasterDetails3
