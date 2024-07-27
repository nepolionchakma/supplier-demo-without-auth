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
function MasterDetails1() {
  const [searchValue, setSearchValue] = useState('')
  const [searchValueById, setSearchValueById] = useState('')
  const [action, setAction] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [isShowDepartmentData, setIsShowDepartmentData] = useState(false)
  const [isEditableId, setIsEditableId] = useState('')
  const [department_id, setDepartment_id] = useState('')
  const [department_name, setDepartment_name] = useState('')
  const [searchEmployeesNameData, setSearchEmployeesNameData] = useState([])
  const [searchEmployeesData, setSearchEmployeesData] = useState([])
  const [searchEmployeesDataByFilteredDepartment, setSearchEmployeesDataByFilteredDepartment] = useState([])
  const [searchEmployeesNameDataFilteredDepartment, setSearchEmployeesNameDataFilteredDepartment] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { allEmployeesData, allDepartmentData, addDepartment, tosifySuccess, tosifyError, handleDelete } = useAuthContext()
  const sortingDataUserID = allDepartmentData?.sort((a, b) => a.department_id - b.department_id)
  // add new department
  const showToAddDepartment = () => {

    setDepartment_id('')
    setDepartment_name('')
    setIsShow(!isShow)
    setIsEditableId(false)
  }
  const showDepartment = () => {
    setDepartment_id('')
    setDepartment_name('')
    setIsShowDepartmentData(!isShowDepartmentData)
    setIsEditableId(false)
  }
  const handleAddDeparment = async (e) => {

    e.preventDefault()
    addDepartment(department_id, department_name)
    setIsShow(!isShow)
    setDepartment_id('')
    setDepartment_name('')
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
  // edit department
  const editDepartment = (department_id) => {
    setIsShow(false)
    if (department_id == false) return setIsEditableId(false)
    setIsLoading(true)
    setDepartment_id('')
    setDepartment_name('')
    setIsEditableId(department_id)
    getDepartmentData(department_id)

  }
  // console.log(isEditableId)
  // update department
  const handleUpdateDeparment = async () => {

    const { data, error } = await supabase
      .from('departments')
      .update({ department_id, department_name })
      .eq('department_id', department_id)
      .select()

    if (data) {

      setIsEditableId(false)
      tosifySuccess('Update Successfully.')
    }
    if (error) tosifyError('Error ! Filled all correctly Please.')
  }

  // delete department
  const handleDeleteItem = (id, info) => {
    handleDelete(id, info)
    tosifySuccess('Delete Successfully.')
  }

  // Search By Name
  const filterEmployeeDataByName = (employee_name) => {
    setSearchEmployeesNameDataFilteredDepartment('')
    setSearchValueById('')
    setSearchEmployeesNameData(employee_name)
    const newFilteredData = allEmployeesData?.filter((item) => item?.employee_name.toUpperCase().includes(employee_name.toUpperCase()))
    setSearchEmployeesData(newFilteredData)
  }
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
  // by search name
  // useEffect(() => {
  //   setSearchValueById('')
  //   const allEmployeesData = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('employees')
  //         .select("*")
  //         .eq('employee_name', searchValue)
  //       // if (error) setError(error)
  //       if (data) setSearchEmployeesNameData(data)
  //       setIsLoading(false)
  //     } catch (error) {
  //       throw error
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   allEmployeesData()
  // }, [searchValue])
  // by id
  // useEffect(() => {
  //   setSearchValue('')
  //   const allEmployeesData = async () => {
  //     try {
  //       const { data, error } = await supabase
  //         .from('employees')
  //         .select("*")
  //         .eq('department_id', searchValueById)
  //       // if (error) setError(error)
  //       if (data) setSearchEmployeesData(data)
  //       setIsLoading(false)
  //     } catch (error) {
  //       throw error
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   allEmployeesData()
  // }, [searchValueById])

  // console.log(searchEmployeesIdData)
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex gap-3 p-4 bg-slate-400 items-center  justify-center ">
          {/* search */}
          <div>
            <input
              value={searchEmployeesNameData}
              onChange={(e) => filterEmployeeDataByName(e.target.value)}
              className="  p-2 rounded" type="text" placeholder="Search by Name"
            />
          </div>
          {/* section option */}
          <div className="flex justify-between items-center my-2">
            <select
              value={searchValueById}
              onChange={(e) => filterEmployeeDataById(e.target.value)}
              className=" p-2 rounded ml-2"
              name="action" id="action" form="action" >
              <option >Filter Department</option>
              <option value='101'>Human Resources Management</option>
              <option value='102'>Finance</option>
              <option value='103'>Marketing</option>
              <option value='104'>Sales</option>
              <option value='105'>Production</option>
              <option value='106'>Computers and Information Technology</option>
            </select>
          </div>
          {/* <Button className='bg-green-400'>Edit</Button> */}
          <Button className='bg-green-400' onClick={showDepartment}>View Department</Button>
          {
            isShowDepartmentData && <Button className='bg-green-400' onClick={showToAddDepartment}>Add Department</Button>
          }
        </div>
        <hr />
        <div className="bg-green-300">

          {/* departments table  */}

          {
            isShowDepartmentData && <Table className='border-0 m-5 w-[95%]  '>
              <TableCaption> </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Check</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Department Name</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* add department row */}
                {
                  isShow && <TableRow >
                    <TableCell className='w-4'><input type="checkbox" className="w-4" /></TableCell>
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
                        <button onClick={() => setIsShow(false)} className="p-1 rounded-full border-2 bg-green-400 text-2xl" >
                          <FiX />
                        </button>
                      </div></TableCell>
                  </TableRow>
                }
                {/* departments table  const sortingDataUserID = allDepartmentData?.sort((a, b) => a.user_id - b.user_id)*/}

                {sortingDataUserID?.map((i) => (
                  <TableRow key={i.department_id} >
                    <TableCell className="w-4">
                      <input type="checkbox" className="w-4" />
                    </TableCell>
                    <TableCell className='p-0 m-0 w-11 '>
                      {
                        isEditableId == i.department_id ?
                          <input disabled value={
                            isLoading ? '000' : department_id} onChange={(e) => setDepartment_id(e.target.value)} type="text" id="department_id" name="department_id" placeholder="department_id" className="p-2 rounded  w-11 " />
                          :
                          <span className="p-2 w-11">{i.department_id}</span>
                      }
                    </TableCell>
                    <TableCell className='p-0 m-0 w-[50%] '>
                      {
                        isEditableId == i.department_id ? <input value={isLoading ? 'loading' : department_name} onChange={(e) => setDepartment_name(e.target.value)} type="text" id="department_name" name="department_name" placeholder="Department name" className="p-2 rounded   focus:text-orange-600 bg-slate-100 w-[50%] " />
                          :
                          <span className="p-2 w-[50%]">{i.department_name}</span>
                      }
                    </TableCell>
                    <TableCell className='w-20'>
                      <div className='flex items-center cursor-pointer'>
                        {
                          isEditableId == i.department_id ? <div className="">

                            {
                              department_id != i.department_id || department_name != i.department_name &&
                              <button onClick={handleUpdateDeparment} className="p-1 rounded-full border-2 bg-green-400 text-2xl" >
                                <FiSave />
                              </button>
                            }
                            <button onClick={() => editDepartment(false)} className="p-1 rounded-full border-2 bg-green-400 text-2xl" >
                              <FiX />
                            </button>
                          </div>
                            :
                            <button onClick={() => editDepartment(i.department_id)} className="p-1 rounded-full border-2 bg-green-400 text-xl" ><FilePen /></button>
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
                              <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteItem(i.department_id, 'departments')}>Confirm</AlertDialogAction>

                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </div></TableCell>
                  </TableRow>

                ))
                }

              </TableBody>
            </Table>
          }
        </div>
      </div>
      <div>
        <div className="flex gap-3 p-4 bg-slate-400 items-center justify-center">
          {/* search employee */}
          <div>
            <input
              value={searchEmployeesNameDataFilteredDepartment}
              onChange={(e) => filterEmployeeDataByNameFilteredDepartment(e.target.value)}
              className="  p-2 rounded" type="text" placeholder="Search by Name"
            />
          </div>

          {/* <div className="flex justify-between items-center my-2">
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-1/2 p-2 rounded ml-2"
              name="action" id="action" form="action" >
              <option >Action</option>
              <option value='101' >Human Resources Management</option>
              <option value='102'>Finance</option>
              <option value='103'>Marketing</option>
              <option value='104'>Sales</option>
              <option value='105'>Production</option>
              <option value='106'>Computers and Information Technology</option>
            </select>
          </div> */}
          {/* <Button className='bg-green-400'>Edit</Button> */}

          <Button className='bg-green-400'>Add</Button>
        </div>
        <hr />
        <div className="bg-green-300">

          {/* Employees table  */}

          <Table className='border-0 m-5 w-[95%]'>
            <TableCaption> </TableCaption>
            <TableHeader>

              <TableRow>
                <TableHead>Check</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Employee Name</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {/* search by name  */}
            {
              searchEmployeesNameData != '' && <TableBody>
                {searchEmployeesData?.map((i) => (
                  <TableRow key={i.employee_id}>
                    <TableCell><input type="checkbox" name="" id="" /></TableCell>
                    <TableCell>{i.employee_id}</TableCell>
                    <TableCell>{i.employee_name}</TableCell>
                    <TableCell >{i.job_title}</TableCell>
                    <TableCell >{i.first_name}</TableCell>
                    <TableCell >{i.last_name}</TableCell>
                    <TableCell >{i.email}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2 cursor-pointer'>
                        <Link className="p-1 rounded-full border-2 bg-green-400 text-xl" to={'/employees/edit/' + i.employee_id}>{<FilePenLineIcon />}</Link>

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
                              <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteItem(i.employee_id, 'employees')}>Confirm</AlertDialogAction>

                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </div></TableCell>
                  </TableRow>
                ))
                  // .sort((a, b) => a.user_name.localeCompare(b.user_name))
                }
              </TableBody>
            }
            {
              searchEmployeesNameDataFilteredDepartment != '' && <TableBody>
                {searchEmployeesDataByFilteredDepartment?.map((i) => (
                  <TableRow key={i.employee_id}>
                    <TableCell><input type="checkbox" name="" id="" /></TableCell>
                    <TableCell>{i.employee_id}</TableCell>
                    <TableCell>{i.employee_name}</TableCell>
                    <TableCell >{i.job_title}</TableCell>
                    <TableCell >{i.first_name}</TableCell>
                    <TableCell >{i.last_name}</TableCell>
                    <TableCell >{i.email}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2 cursor-pointer'>
                        <Link className="p-1 rounded-full border-2 bg-green-400 text-xl" to={'/employees/edit/' + i.employee_id}>{<FilePenLineIcon />}</Link>

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
                              <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteItem(i.employee_id, 'employees')}>Confirm</AlertDialogAction>

                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </div></TableCell>
                  </TableRow>
                ))
                  // .sort((a, b) => a.user_name.localeCompare(b.user_name))
                }
              </TableBody>
            }
            {/* search by id  */}
            {searchEmployeesNameDataFilteredDepartment == '' &&
              searchValueById != '' && <TableBody>
                {searchEmployeesData?.map((i) => (
                  <TableRow key={i.employee_id}>
                    <TableCell><input type="checkbox" name="" id="" /></TableCell>
                    <TableCell>{i.employee_id}</TableCell>
                    <TableCell>{i.employee_name}</TableCell>
                    <TableCell >{i.job_title}</TableCell>
                    <TableCell >{i.first_name}</TableCell>
                    <TableCell >{i.last_name}</TableCell>
                    <TableCell >{i.email}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2 cursor-pointer'>
                        <Link className="p-1 rounded-full border-2 bg-green-400 text-xl" to={'/employees/edit/' + i.employee_id}>{<FilePenLineIcon />}</Link>

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
                              <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteItem(i.employee_id, 'employees')}>Confirm</AlertDialogAction>

                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </div></TableCell>
                  </TableRow>
                ))
                  // .sort((a, b) => a.user_name.localeCompare(b.user_name))
                }
              </TableBody>
            }

            {/* search by all  */}
            {
              searchEmployeesNameData == searchValueById && <TableBody>
                {allEmployeesData?.map((i) => (
                  <TableRow key={i.employee_id}>
                    <TableCell><input type="checkbox" name="" id="" /></TableCell>
                    <TableCell>{i.employee_id}</TableCell>
                    <TableCell>{i.employee_name}</TableCell>
                    <TableCell >{i.job_title}</TableCell>
                    <TableCell >{i.first_name}</TableCell>
                    <TableCell >{i.last_name}</TableCell>
                    <TableCell >{i.email}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2 cursor-pointer'>
                        <Link className="p-1 rounded-full border-2 bg-green-400 text-xl" to={'/employees/edit/' + i.employee_id}>{<FilePenLineIcon />}</Link>

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
                              <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteItem(i.employee_id, 'employees')}>Confirm</AlertDialogAction>

                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </div></TableCell>
                  </TableRow>
                ))
                  // .sort((a, b) => a.user_name.localeCompare(b.user_name))
                }
              </TableBody>
            }

          </Table>
        </div>
      </div>
    </div>
  )
}
export default MasterDetails1