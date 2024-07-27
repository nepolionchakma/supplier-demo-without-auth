import React, { useState } from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import SignUp from "./SignUp"
import { useAuthContext } from "@/Supabase/AuthContext";
import conf from "@/Supabase/conf";
import UpdateProfile from "./UpdateProfile";
import { Link } from "react-router-dom";
function Profile() {
  const consfValue = String(conf.supabase_url + '&' + conf.supabase_key)
  const consfValueSlice = consfValue.slice(0, 10)
  const { session } = useAuthContext()
  // console.log(session)

  return (
    <div className=" ">

      <div className="flex gap-4">
        <div className="border p-4 m-8">
          <h5>Name:{session?.user.user_metadata.first_name} {session?.user.user_metadata.last_name}</h5>
          <h5>Email:{session?.user.user_metadata.email}</h5>
          <h5>UserName:{session?.user.user_metadata.user_name}</h5>
          <h5>Jobtitle:{session?.user.user_metadata.job_title}</h5>
          <br />
          <Link className="bg-green-500 px-4 py-2 rounded text-white my-4" to={'/profile/update/' + session?.user.id}>Update Profile</Link>

        </div>
        <div className="border p-3 rounded w-32 h-44 mt-8">
          <div className=""  >
            <h2>Site QR Code</h2>
            <QRCode
              size={256}
              style={{ height: "auto", width: "100%" }}
              value={String(conf.supabase_url + '&' + conf.supabase_key)}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>


      </div>

    </div>
  )
}
export default Profile