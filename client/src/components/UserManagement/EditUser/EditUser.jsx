import { supabase, useAuthContext } from "@/Supabase/AuthContext"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Bounce, ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function EditUser() {
  const [user_name, setUser_name] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [middle_name, setMiddle_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [job_title, setJob_title] = useState('')
  const [org_type, setOrg_type] = useState('')
  const [org_id, setOrg_id] = useState('')
  const [org_id_column_name, setOrg_id_column_name] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState('')
  const { id } = useParams()
  const { updateUserData, tosifySuccess, tosifyError } = useAuthContext()
  const navigate = useNavigate()
  // console.log(user_name, first_name, middle_name, last_name, job_title, org_type, org_id, org_id_column_name)
  // console.log(data)
  // tosify
  // const tosifySuccess = () => toast.success('Success', {
  //   position: "bottom-right",
  //   autoClose: 2000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  //   transition: Bounce,
  // });
  // const tosifyError = () => toast.error({ messageInfo }, {
  //   position: "bottom-right",
  //   autoClose: 12000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  //   transition: Bounce,
  // });

  useEffect(() => {
    const getSingleData = async () => {
      const { data, error } = await supabase
        .from('def_persons')
        .select()
        .eq('id', id)
        .single()
      if (error) {
        navigate('/')
      }
      if (data) {
        setData(data)
        setUser_name(data?.user_name)
        setFirst_name(data?.first_name)
        setMiddle_name(data?.middle_name)
        setLast_name(data?.last_name)
        setJob_title(data?.job_title)
        setOrg_type(data?.org_type)
        setOrg_id(data?.org_id)
        setOrg_id_column_name(data?.org_id_column_name)
      }
    }
    getSingleData()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('def_persons')
        .update({ user_name, first_name, middle_name, last_name, job_title, org_type, org_id, org_id_column_name })
        .eq('id', id)
        .select()
      if (data) tosifySuccess('Update User Successfully.')
      if (error) tosifyError('Error ! Filled all correctly Please.')
      // if (data) navigate('/allusers')
    } catch (error) {
      setError(error)
      tosifyError()
    } finally {
      setIsLoading(false)

    }
  }
  // console.log(user_name, first_name, middle_name, last_name, job_title, org_type, org_id, org_id_column_name)
  return (
    <div className="w-1/3 bg-slate-500 p-4 mx-auto my-6 shadow-2xl rounded ">
      <h3 className="font-bold text-2xl text-center my-3">Update Data</h3>
      <form onSubmit={handleUpdate} >
        <div className="flex justify-between items-center my-2">
          <label htmlFor="user_name">User Name</label>
          <input value={user_name || ''} onChange={(e) => setUser_name(e.target.value)} type="text" id="user_name" name="user_name" placeholder="User Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>

        <div className="flex justify-between items-center my-2">
          <label htmlFor="first_name">First Name</label>
          <input value={first_name || ''} onChange={(e) => setFirst_name(e.target.value)} type="text" id="first_name" name="first_name" placeholder="First  Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>

        <div className="flex justify-between items-center my-2">
          <label htmlFor="middle_name">Middle Name</label>
          <input value={middle_name || ''} onChange={(e) => setMiddle_name(e.target.value)} type="text" id="middle_name" name="middle_name" placeholder="middle_name Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>

        <div className="flex justify-between items-center my-2">
          <label htmlFor="last_name">Last Name</label>
          <input value={last_name || ''} onChange={(e) => setLast_name(e.target.value)} type="text" id="last_name" name="last_name" placeholder="last_name Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>

        <div className="flex justify-between items-center my-2">
          <label htmlFor="job_title">Job Title</label>
          <input value={job_title || ''} onChange={(e) => setJob_title(e.target.value)} type="text" id="job_title" name="job_title" placeholder="job_title Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>

        <div className="flex justify-between items-center my-2">
          <label htmlFor="org_type">Org Type</label>
          <input value={org_type || ''} onChange={(e) => setOrg_type(e.target.value)} type="text" id="org_type" name="org_type" placeholder="org_type Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="org_id">Org Id</label>
          <input value={org_id || ''} onChange={(e) => setOrg_id(e.target.value)} type="text" id="org_id" name="org_id" placeholder="org_id Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="org_id_column_name">Org Id Column Name</label>
          <input value={org_id_column_name || ''} onChange={(e) => setOrg_id_column_name(e.target.value)} type="text" id="org_id_column_name" name="org_id_column_name" placeholder="org_id_column_name Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <button type="submit" className="bg-emerald-500 px-6 py-2 my-4 rounded text-white font-bold">Update</button>
        <span>{error}</span>
        <span>{error.message}</span>
      </form>

    </div>
  )
}
export default EditUser