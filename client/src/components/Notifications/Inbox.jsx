import { useAuthContext } from "@/Supabase/AuthContext"
import { useLocalApi } from "@/Supabase/localApiContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from 'date-fns';
import { useEffect, useState } from "react";
import { FiTrash, FiX } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useNavigate, useNavigation } from 'react-router-dom';

function Inbox() {
  const { fakeUser, sentMessageData } = useAuthContext()
  const { handleMessageDelete, getSingleMessage } = useLocalApi()
  const [myMessages, setMyMessages] = useState([])
  let unReadMessages = []

  useEffect(() => {
    const myMessages = sentMessageData.filter(user => user.receiver_name === fakeUser[0].user_name)
    setMyMessages(myMessages)
  }, [sentMessageData])
  const unReadMessageFilter = myMessages.filter(m => m.is_read_msg === 0)
  unReadMessages.push(unReadMessageFilter)

  const handleDelete = (id) => {
    handleMessageDelete(id, "delete")
  }

  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/messages/${id}`);
    // getSingleMessage(id)
    handleAddRead(id)

  };

  const handleAddRead = async (id) => {

    if (unReadMessages[0].length > 0) {
      const messageResponse = await fetch(`http://127.0.0.1:3000/messages/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

      })
      if (messageResponse.ok) {
        console.log(alert("working"))
      }
    }


  }
  return (
    <div className="border  ">

      {/* {navigation.state === "loading" && "loading.........."} */}
      {/* <h2 className="font-bold ml-9 mt-8">Inbox</h2> */}
      <Table className='border-0 '>
        <TableCaption> </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">From</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right w-[150px]">Time</TableHead>
            <TableHead className="text-right w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myMessages.map((m) => (

            <TableRow
              key={m.id}
              className={`cursor-pointer ${m.is_read_msg === 0 && "bg-slate-100"}`}
              onClick={() => {
                handleRowClick(m.id);
              }}>
              <TableCell className="font-medium">{m.sender_name.slice(0, 15)}{m.sender_name.length > 15 && "..."}</TableCell>
              <TableCell>{m.message.slice(0, 80)} {m.message.length > 80 && "..."}</TableCell>
              <TableCell className="text-right">
                <span>{format(new Date(m.created_at), 'dd-mm-yyy')}</span>
                <br />
                <span>{format(new Date(m.created_at), 'hh:mm:ss a')}</span>
              </TableCell>
              <TableCell className="text-right cursor-pointer" onClick={(e) => e.stopPropagation()}>

                <AlertDialog>
                  <AlertDialogTrigger><FiTrash className="text-red-700" /></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(m.id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default Inbox