import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { Bounce, ToastContainer, toast } from "react-toastify"


const LoaclApiContext = createContext();
export const useLocalApi = () => useContext(LoaclApiContext);

export const LocalContextProvider = ({ children }) => {

  const [employeesData, setEmployeesData] = useState([])
  const [employeesWidgetState, setEmployeesWidgetState] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // tosify
  const tosifySuccess = (info) => toast.success(info, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
  const tosifyWarm = (info) => toast.warn(info, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
  const tosifyError = (info) => toast.error(info, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  // get data fron local employees
  useEffect(() => {

    const employeeData = async () => {
      const res = await fetch("http://localhost:3000/employees")
      const data = await res.json()
      setEmployeesData(data)
    }

    employeeData()
  }, [])
  // get data fron local Widget State
  useEffect(() => {

    const employeesWidgetState = async () => {
      const res = await fetch("http://localhost:3000/employees-widget-state")
      const data = await res.json()
      setEmployeesWidgetState(data)
    }

    employeesWidgetState()
  }, [])

  // get data fron local Departments
  useEffect(() => {

    const employeeData = async () => {
      const res = await fetch("http://localhost:3000/departments")
      const data = await res.json()
      setDepartmentData(data)
    }

    employeeData()
  }, [])
  // Merge data
  const mergeEmployeeData = employeesData.map(e => ({
    ...e,
    ...(departmentData.find(dp => dp.department_id === e.department_id)),
    ...(employeesWidgetState.find(emp => emp.employee_id === e.employee_id))
  }))


  const handleEmployeeDelete = async (id, info) => {

    if (info === 'employees') {
      const resEmployee = await fetch(`http://localhost:3000/employees/delete/${id}`, {
        method: 'DELETE'
      })
      const resState = await fetch(`http://localhost:3000/employees-widget-state/delete/${id}`, {
        method: 'DELETE'
      })
      if (resEmployee.ok && resState.ok) {
        tosifySuccess('successfully emloyee deleted')
      }
    }
  }
  const handleMessageDelete = async (id, info) => {
    if (info == "draft") {
      await fetch(`http://127.0.0.1:3000/messages/delete/${id}`, {
        method: 'DELETE'
      })
    } else {
      const resEmployee = await fetch(`http://127.0.0.1:3000/messages/delete/${id}`, {
        method: 'DELETE'
      })

      if (resEmployee.ok) {
        tosifySuccess('successfully message deleted')
      }
    }

  }
  const [singleMessage, setSingleMessage] = useState([])
  // get single message
  const getSingleMessage = async (id) => {
    setIsLoading(true)
    const res = await fetch(`http://127.0.0.1:3000/messages/${id}`)
    const data = await res.json()
    setSingleMessage(data)
    setIsLoading(false)
  }

  //merge employee data
  // useEffect(() => {
  //   const employeeData = async () => {
  //     try {

  //       // Merge data based on common 'id' field
  //       const mergedData = employees_data.map(employee => ({
  //         ...employee,
  //         ...(employee_widget_attributes.find(attr => attr.employee_id === employee.employee_id) || {}),
  //       }));

  //       const sortedData = [...mergedData.sort((a, b) => a.position - b.position)];

  //       setNewEmployeesData(sortedData);

  //     } catch (error) {
  //       console.log(error)
  //     }

  //   }
  //   employeeData()
  // }, [newEmployeesData])

  const value = {
    employeesData, employeesWidgetState, departmentData, mergeEmployeeData, handleEmployeeDelete, tosifySuccess, tosifyWarm, tosifyError, handleMessageDelete, getSingleMessage, singleMessage, isLoading
  };
  return (
    <LoaclApiContext.Provider value={value}>
      {children}
    </LoaclApiContext.Provider>
  );
};
