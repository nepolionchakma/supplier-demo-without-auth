import { useAuthContext } from "@/Supabase/AuthContext";
import { useState } from "react";
import { supabaseAdmin } from "@/Supabase/AuthContext";
function InviteUser() {
  const [first_name, setFirst_name] = useState('')
  const [middle_name, setMiddle_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { inviteUserByEmail, error, inviteViaMail, tosifySuccess, tosifyError } = useAuthContext()
  const handleMagicSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email)
    if (data) tosifySuccess('Successfully Invited.')
    if (error) tosifyError('Error ! Opps.')
  }
  const handleInvite = (e) => {
    e.preventDefault()
    inviteViaMail(email, password, first_name, middle_name, last_name)
    // generateInvite(email, first_name, middle_name, last_name)
  }
  return (
    <div className="flex gap-1">

      <div className="w-1/4 bg-slate-400 mx-auto p-4 rounded mt-8">
        <h3>Invite Your Friends Via Link</h3>
        <form onSubmit={handleMagicSubmit}>
          <input type="email" className="rounded px-2 w-full my-2 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="bg-green-600 rounded px-5 py-2">Invite</button>
        </form>
      </div>
      <div className="w-2/5 bg-slate-400 mx-auto p-4 rounded mt-8">
        <h3>Invite Your Friends Via Email</h3>
        <form onSubmit={handleInvite} >
          <div className="flex justify-between items-center my-2">
            <label htmlFor="first_name">First Name</label>
            <input value={first_name || ''} onChange={(e) => setFirst_name(e.target.value)} type="text" id="first_name" name="first_name" placeholder="First Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
          </div>

          <div className="flex justify-between items-center my-2">
            <label htmlFor="middle_name">Middle Name</label>
            <input value={middle_name || ''} onChange={(e) => setMiddle_name(e.target.value)} type="text" id="middle_name" name="middle_name" placeholder="Middle Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="last_name">Last Name</label>
            <input value={last_name || ''} onChange={(e) => setLast_name(e.target.value)} type="text" id="last_name" name="last_name" placeholder="Last Name" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Email" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
          </div>
          <div className="flex justify-between items-center my-2">
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="password" className="p-2 rounded ml-2  focus:text-orange-600 bg-slate-100" />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-emerald-500  px-6 py-2 my-4 rounded text-white font-bold">Invite</button>
          </div>
          <span>{error}</span>
          <span>{error?.message}</span>
        </form>
      </div>

    </div>
  )
}
export default InviteUser