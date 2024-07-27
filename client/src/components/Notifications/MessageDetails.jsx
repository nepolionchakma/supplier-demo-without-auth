import { useAuthContext } from "@/Supabase/AuthContext";
import { useLocalApi } from "@/Supabase/localApiContext"
import { format } from 'date-fns';
import moment from "moment";
import { useEffect, useState } from "react"
import { FiArrowLeft, FiUser } from "react-icons/fi"
import { useLoaderData, useNavigate, useNavigation, useParams } from "react-router-dom"
const MessageDetails = () => {
  // const [singleMessage, setSingleMessage] = useState([])
  const [message, setMessage] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { fakeUser } = useAuthContext()
  const { id } = useParams()
  const navigate = useNavigate()
  const navigation = useNavigation();
  console.log(id)
  useEffect(() => {
    const result = async () => {
      setIsLoading(true)
      const res = await fetch(`http://127.0.0.1:3000/messages/${id}`)
      const data = await res.json()
      setMessage(data[0])
      setIsLoading(false)
    }
    result()
  }, [id])


  const handleGoBack = () => {
    navigate(-1);
    // setMessage('');
  }
  const date = new Date(message.created_at);

  // Extract the components
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

  // Determine AM/PM period and convert to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert hour to 12-hour format

  // Pad the hours if necessary
  const formattedHours = hours.toString().padStart(2, '0');

  // Format the date and time
  const formattedDateTime = `${day}-${month}-${year} ${formattedHours}:${minutes}  ${period}`;

  return (
    <div className="flex items-center justify-center">
      {
        isLoading ? <img src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt="" />
          : <div className="flex flex-col p-4 justify-between border border-[#18B192] mt-6 w-[70%] m-auto">
            <div className="flex gap-5 items-center">
              <div
                className="border p-1 border-bg-[#18B192] cursor-pointer"
                onClick={handleGoBack}>
                <FiArrowLeft className="text-[#18B192]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center flex-col items-center">
                <div className=" border border-black p-4 text-black rounded-full">
                  <FiUser className="text-2xl" />
                </div>
                <span className="font-bold">{message.receiver_name === fakeUser[0].user_name ? "Receive From : " : "Sent To :"} {message.sender_name}</span>
                <div>
                  {formattedDateTime}
                </div>
              </div>
              <div className="flex flex-col p-4 mt-6 ">
                <div className="flex flex-col">
                  <span className="font-bold">Subject : {message.subject}</span>
                  <p><span className="font-bold">Message</span> : {message.message}</p>
                </div>

              </div>
            </div>
          </div>
      }
    </div>
  )
}
export default MessageDetails