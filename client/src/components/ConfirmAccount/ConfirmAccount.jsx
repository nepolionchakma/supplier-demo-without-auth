import { useAuthContext } from "@/Supabase/AuthContext"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "@/Supabase/AuthContext"

function ConfirmAccount() {
  const [user_name, setUser_name] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conf_password, setConf_Password] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState('')
  const { id } = useParams()
  const { confirmAccount } = useAuthContext()
  const [session, setSession] = useState('')
  const navigate = useNavigate()


  // console.log(session.user.user_metadata, 'session')
  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser_name(session?.user?.user_metadata?.user_name)
        setFirst_name(session?.user?.user_metadata?.first_name)
        setLast_name(session?.user?.user_metadata?.last_name)
        setEmail(session?.user?.user_metadata?.email)
        setIsLoading(false);
      })
  }, [])

  if (isLoading) return <div
    className='flex items-center justify-center'>
    <img src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt="" />
  </div>

  const handleConfirmAccount = async (e) => {
    e.preventDefault()
    confirmAccount(email, password, user_name, first_name, last_name)
    navigate('/')
  }
  return (

    <div className="w-1/3 mx-auto bg-slate-300 p-4 rounded my-8">
      <form onSubmit={handleConfirmAccount} >
        <div className="flex justify-between items-center my-2">
          <label htmlFor="user_name">User Name</label>
          <input value={user_name || ''} onChange={(e) => setUser_name(e.target.value)} type="text" id="user_name" name="user_name" placeholder="User Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>

        <div className="flex justify-between items-center my-2">
          <label htmlFor="first_name">First Name</label>
          <input value={first_name || ''} onChange={(e) => setFirst_name(e.target.value)} type="text" id="first_name" name="first_name" placeholder="First  Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="last_name">Last Name</label>
          <input value={last_name || ''} onChange={(e) => setLast_name(e.target.value)} type="text" id="last_name" name="last_name" placeholder="last_name Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="email" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="password" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="conf_password">Confirm Password</label>
          <input value={conf_password} onChange={(e) => setConf_Password(e.target.value)} type="password" id="conf_password" name="conf_password" placeholder="Confirm Password" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-emerald-500  px-6 py-2 my-4 rounded text-white font-bold">Confirm Account</button>
        </div>
        <span>{error}</span>
        <span>{error.message}</span>
      </form>
    </div>
  )
  // if (session?.user.user_metadata.user_name == null) {

  // }
  // set if not username staye here if had go home
  // if (!session?.user.user_metadata.user_name) return navigate('/')
}
export default ConfirmAccount