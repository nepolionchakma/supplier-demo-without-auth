import { useAuthContext } from "@/Supabase/AuthContext"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conf_password, setConf_Password] = useState('')
  const navigate = useNavigate()
  const { signUp } = useAuthContext();

  const handleSignUp = (e) => {
    e.preventDefault()
    if (password !== conf_password) {
      return alert('Password MisMatch')
    }
    signUp(email, password, fullName)
    navigate('/')
  }
  return (
    <div className="mx-auto w-1/4 my-5 bg-slate-400 p-6 rounded">
      <h3 className="font-bold text-2xl text-center my-6">Create Account</h3>
      <form onSubmit={handleSignUp}>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="full_name">Full Name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" id="full_name" name="full_name" placeholder="Full Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Email" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="password" >Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Password" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <div className="flex justify-between items-center my-2">
          <label htmlFor="conf_password" >Confirm Password</label>
          <input value={conf_password} onChange={(e) => setConf_Password(e.target.value)} type="password" id="conf_password" name="conf_password" placeholder="Confirm Password" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
        </div>
        <br />
        <div className="w-1/3 mx-auto">
          <button className="bg-emerald-500 px-6 py-2 my-4 hover:bg-green-800 rounded text-white font-bold">Confirm</button>
        </div>
      </form>
    </div>
  )
}
export default SignUp