import { createClient } from "@supabase/supabase-js";
import conf from "./conf";
import { createContext, useContext, useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// console.log(conf.supabase_url, conf.supabase_key)
export const supabase = createClient(conf.supabase_url, conf.supabase_key);
export const supabaseAdmin = createClient(conf.supabase_url, conf.supabase_admin_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
const AuthCreateContext = createContext();
export const useAuthContext = () => useContext(AuthCreateContext);

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [allUserData, setAllUserData] = useState([])
  const [allEmployeesData, setAllEmployeesData] = useState([])
  const [newEmployeesData, setNewEmployeesData] = useState([])
  const [allDepartmentData, setAllDepartmentData] = useState([])
  const [error, setError] = useState(null)
  const [session, setSession] = useState(null)
  const [messageInfo, setMessageInfo] = useState('')
  const [messageData, setMessageData] = useState([])
  const [myMessages, setMyMessages] = useState([])
  const [sentMessageData, setSentMessageData] = useState([])
  const [unReadMessages, setUnReadMessages] = useState([])
  const [draftMessageData, setDraftMessageData] = useState([])
  const [fakeUser, setFakeUser] = useState([])

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

  // Authentication Section
  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setIsLoading(false);
      })
    const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsLoading(false);
    })

    return () => subscription.unsubscribe()
  }, []);

  // Get Data
  useEffect(() => {
    const allUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('def_persons')
          .select('*')
        if (error) setError(error)
        if (data) setAllUserData(data)
        setIsLoading(false)
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    }
    allUsers()
  }, [allUserData])
  // All Employees
  useEffect(() => {
    const allEmployeesData = async () => {
      try {
        const { data, error } = await supabase
          .from('employees')
          .select('*')
        // .order('position', { ascending: true })
        if (error) setError(error)
        if (data) setAllEmployeesData(data)
        setIsLoading(false)
      } catch (error) {
        throw error
      } finally {
        setIsLoading(false)
      }
    }
    allEmployeesData()
  }, [allEmployeesData])

  //merge employee data
  useEffect(() => {
    const employeeData = async () => {
      try {
        let { data: employees_data } = await supabase.from('employees').select('*')
        let { data: employee_widget_attributes } = await supabase.from('employee_widget_attributes').select('*')

        // Merge data based on common 'id' field
        const mergedData = employees_data.map(employee => ({
          ...employee,
          ...(employee_widget_attributes.find(attr => attr.employee_id === employee.employee_id) || {}),
        }));

        const sortedData = [...mergedData.sort((a, b) => a.position - b.position)];

        setNewEmployeesData(sortedData);
      } catch (error) {
        console.log(error)
      }

    }
    employeeData()
  }, [newEmployeesData])
  // console.log(allEmployeesData)
  //messages
  useEffect(() => {
    const allMessages = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/messages")
        const data = await res.json()

        const sentMessage = data.filter(user => user.status === "sent")
        const draftMessage = data.filter(user => user.status === "draft")

        const myMessages = sentMessage.filter(user => user.receiver_name === fakeUser[0]?.user_name)
        const unReadMessageFilter = myMessages.filter(m => m.is_read_msg === 0)
        setMessageData(data)
        setUnReadMessages(unReadMessageFilter)
        setMyMessages(myMessages)
        setSentMessageData(sentMessage)
        setDraftMessageData(draftMessage)

      } catch (error) {
        console.log(error)
      }
    }
    allMessages()
  }, [messageData, sentMessageData, draftMessageData])


  useEffect(() => {
    const allDepartmentData = async () => {

      let { data: departments, error } = await supabase
        .from('departments')
        .select('*')
        .order('department_id', { ascending: true })
      setAllDepartmentData(departments)
    }
    allDepartmentData()
  }, [allDepartmentData])

  const addDepartment = async (department_id, department_name) => {
    const { data, error } = await supabase
      .from('departments')
      .insert([
        { department_id, department_name },
      ])
      .select()
    if (data) tosifySuccess('Add Department Successfully.')
    if (error) tosifyError('Error ! Filled all correctly Please.')
  }

  // create users
  const signUp = async (email, password, full_name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name
          }
        }
      })
      if (data) tosifySuccess('Successfully Created Account.')
      if (error) tosifyError('Error ! Filled all correctly Please.')
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }

  }
  // Create a user
  const createUser = async (email, password, user_name, first_name, middle_name, last_name, job_title, org_type, org_id, org_id_column_name, org_id_table_name, domain_name) => {

    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            email, password, user_name, first_name, middle_name, last_name, job_title, org_type, org_id, org_id_column_name, org_id_table_name, domain_name
          }
        }
      }
    )
    if (data) tosifySuccess('Add User Successfully.')
    if (error) tosifyError('Error ! Filled all correctly Please.')
  }
  // signIn Function & invok it
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email, password
      })
      console.log(data)
      if (error) return setError(error)
      if (data) {
        setError('')
      }
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleDelete = async (id, info) => {
    try {
      if (info == 'def_persons') {
        await supabase
          .from('def_persons')
          .delete()
          .eq('id', id)
      }

      if (info == 'employees') {
        await supabase
          .from('employees')
          .delete()
          .eq('employee_id', id)
      }
      if (info == 'departments') {
        await supabase
          .from('departments')
          .delete()
          .eq('department_id', id)
      }
      if (info == 'students') {
        await supabase
          .from('employees')
          .delete()
          .eq('id', id)
      }
      if (info == 'student_widget_attributes') {
        await supabase
          .from('employee_widget_attributes')
          .delete()
          .eq('student_id', id)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  const updateUserData = async (user_name, first_name, middle_name, last_name, job_title, org_type, org_id, org_id_column_name) => {
    const { data, error } = await supabase
      .from('employees')
      .update({ user_name, first_name, middle_name, last_name, job_title, org_type, org_id, org_id_column_name })
      .eq('user_id', id)
  }


  const addDataEmployeesTable = async (employee_id, employee_name, first_name, last_name, job_title, email, department_id) => {

    const { data, error } = await supabase
      .from('employees')
      .insert([
        { employee_id, employee_name, first_name, last_name, job_title, email, department_id }
      ])
      .select()


    if (data) tosifySuccess('Add Data Successfully.')
    if (error) tosifyError('Error ! Filled all correctly Please.')
  }
  const addEmployeesState = async (employee_id) => {

    const { data, error } = await supabase
      .from('employees_state')
      .insert([
        { employee_id }
      ])
      .select()


    if (data) tosifySuccess('Add Data Successfully.')
    if (error) tosifyError('Error ! Filled all correctly Please.')
  }

  //  inviteUser via Email with redirectURL ,password
  const inviteViaMail = async (email, password, first_name, middle_name, last_name) => {


    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          emailRedirectTo: 'https://stunning-llama-a5fdef.netlify.app/confirmaccount',
          data: {
            first_name, middle_name, last_name,
          },
        }
      }
    )
    console.log(data)
    console.log(error)
  }
  // invite by mail
  const inviteUserByEmail = async (email) => {
    try {
      const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email)
      if (data) tosifySuccess('Successfully Invited.')
      if (error) tosifyError('Error ! Opps.')
    } catch (error) {
      throw error
    }
  }

  // Confirm Account
  const confirmAccount = async (email, password, user_name, first_name, last_name) => {
    const { data, error } = await supabase.auth.updateUser({
      email,
      password,
      data: {
        user_name,
        first_name,
        last_name
      }
    })
    console.log(data)
    console.log(error)
  }

  // Generate Invite a User
  const generateInvite = async (email, first_name, middle_name, last_name) => {

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email
    })
    // const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    //   type: "invite",
    //   email,
    //   options: {
    //     redirectTo: `http://localhost:5173/confirmaccount/${email}`,
    //     data: {
    //       first_name, middle_name, last_name,
    //     },
    //   },
    // });
    if (error) setError(error)
    if (data) setData(data)
    console.log(data)
    console.log(error)
  }

  const fakeUserMake = (email, name, isLogin) => {
    setFakeUser(prev => [...prev, { email: email, user_name: name, isLogin: isLogin }])
  }

  const value = {
    signIn, signUp, createUser, data, isLoading, error, session, updateUserData, handleDelete, inviteMagicLinkUser: inviteUserByEmail, confirmAccount, generateInvite, messageInfo, tosifySuccess, tosifyError, allUserData, allEmployeesData, addDataEmployeesTable, inviteViaMail, allDepartmentData, addDepartment, addEmployeesState, newEmployeesData, tosifyWarm, messageData, fakeUserMake, fakeUser, sentMessageData, myMessages, unReadMessages, draftMessageData
  }
  return (
    <AuthCreateContext.Provider value={value}>
      {children}
    </AuthCreateContext.Provider>
  )
};