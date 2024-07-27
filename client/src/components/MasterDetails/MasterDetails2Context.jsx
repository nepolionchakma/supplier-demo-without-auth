import { useState, useEffect } from "react"


// add new department
export const showToAddDepartment = () => {

  setDepartment_id('')
  setDepartment_name('')
  setIsShow(!isShow)
  setIsEditableId(false)
}
// const showDepartment = () => {
//   setDepartment_id('')
//   setDepartment_name('')
//   setIsShowDepartmentData(!isShowDepartmentData)
//   setIsEditableId(false)
// }
export const handleAddDeparment = async (e) => {

  e.preventDefault()
  addDepartment(department_id, department_name)
  setIsShow(!isShow)
  setDepartment_id('')
  setDepartment_name('')
}
// get department
export const getDepartmentData = async (id) => {
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
export const editDepartment = (department_id) => {
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
export const handleUpdateDeparment = async () => {

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
export const handleDeleteItem = (id, info) => {
  handleDelete(id, info)
  tosifySuccess('Delete Successfully.')
}

// Search By Name
export const filterEmployeeDataByName = (employee_name) => {
  setSearchEmployeesNameDataFilteredDepartment('')
  setSearchValueById('')
  setSearchEmployeesNameData(employee_name)
  const newFilteredData = allEmployeesData?.filter((item) => item?.employee_name.toUpperCase().includes(employee_name.toUpperCase()))
  setSearchEmployeesData(newFilteredData)
}
// Search By Name but every filter departments
export const filterEmployeeDataByNameFilteredDepartment = (employee_name) => {

  setSearchEmployeesNameDataFilteredDepartment(employee_name)
  const newFilteredData = searchEmployeesData?.filter((item) => item?.employee_name.toUpperCase().includes(employee_name.toUpperCase()))
  setSearchEmployeesDataByFilteredDepartment(newFilteredData)
}
// Search By ID
export const filterEmployeeDataById = (department_id) => {
  setSearchEmployeesNameData('')
  setSearchEmployeesNameDataFilteredDepartment('')
  setSearchValueById(department_id)
  const newFilteredData = allEmployeesData?.filter((item) => item?.department_id == department_id)
  setSearchEmployeesData(newFilteredData)
  // console.log(newFilteredData, 'newitems')
}



function MasterDetails2Context() {
  return (
    <div>MasterDetails2Context</div>
  )
}
export default MasterDetails2Context