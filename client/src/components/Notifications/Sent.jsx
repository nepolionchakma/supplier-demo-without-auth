import { useAuthContext } from "@/Supabase/AuthContext"
import { useLocalApi } from "@/Supabase/localApiContext"
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
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
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
import { FiTrash } from "react-icons/fi"

function Send() {

  const { fakeUser, sentMessageData } = useAuthContext()
  const { handleMessageDelete, getSingleMessage } = useLocalApi()
  const myMessages = sentMessageData.filter(user => user.sender_name === fakeUser[0].user_name)
  const handleDelete = (id) => {
    handleMessageDelete(id, 'delete')
  }
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/messages/${id}`);
    getSingleMessage(id)
  };
  return (
    <div className="border">
      {/* <h2 className="font-bold ml-9 mt-8">Send</h2> */}
      <Table className='border-0 m-5 w-[95%]'>
        <TableCaption> </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">To</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="text-right">Date</TableHead>
            <TableHead className="text-right">action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myMessages.map((m) => (

            <TableRow key={m.id} className='cursor-pointer' onClick={() => handleRowClick(m.id)}>
              <TableCell className="font-medium">{m.receiver_name.slice(0, 15)}{m.receiver_name.length > 15 && "..."}</TableCell>
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
      </Table >
    </div >
  )
}
export default Send