import { useAuthContext } from "@/Supabase/AuthContext"
import { useState } from "react"
import QRCode from "react-qr-code"

function orgid() {

  const [isShow, setIsShow] = useState(false)
  const { session } = useAuthContext()
  return (
    <div>
      <div className=" p-3 rounded mt-8 flex gap-4">
        <div className=""  >
          <button className="bg-green-500 px-4 py-2 rounded text-white cursor-pointer" onClick={() => setIsShow(!isShow)}>Generate QR Code</button>
          <div className={
            isShow ? "opacity-100 my-4" : "opacity-0"
          }>
            <QRCode
              size={256}
              style={{ height: "auto", width: "100%" }}
              value={'user_token: ' + session?.access_token + '&' + 'user_id: ' + session?.user.id}
              viewBox={`0 0 256 256`}
            />
            <h4>using access token, user ID,</h4>
          </div>
        </div>
        {/* <div className=""  >

          <h4>using access token, user ID,</h4>
          <div>
            <QRCode
              size={256}
              style={{ height: "auto", width: "100%" }}
              value={'user_token: ' + session?.access_token + '&' + 'user_id: ' + session?.user.id}
              viewBox={`0 0 256 256`}
            />

          </div>
        </div> */}
      </div>
    </div>
  )
}
export default orgid