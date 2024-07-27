import { useAuthContext } from "@/Supabase/AuthContext"
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
import { FilePenIcon, FilePenLineIcon } from "lucide-react";

import { FiPenTool, FiTrash } from 'react-icons/fi';
import { Link } from "react-router-dom";
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
function UserTable({ part, data, isLoading, handleDelete, tosifySuccess }) {
  const handleDeleteItem = (id, info) => {
    handleDelete(id, info)
    tosifySuccess('Delete Successfully !')
  }
  const sortingDataUserID = data?.sort((a, b) => a.user_id - b.user_id)
  return (
    <>
      <div className="border ">
        <h3 className="font-bold text-2xl text-center my-3">{part == 'ReadAll' ? 'Employees' : 'Users'} Table</h3>
        {
          isLoading ?
            <div className="w-full h-full overflow-hidden flex items-center justify-center transition-all duration-700">
              <img src='https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif' alt="" />
            </div>
            :
            <Table className='border-0 m-5 w-[95%]'>
              <TableCaption> </TableCaption>
              <TableHeader>

                <TableRow>
                  <TableHead>{part == 'AllUsers' ? 'User Id' : 'Employee Id'}</TableHead>
                  <TableHead>First Name</TableHead>
                  {/* <TableHead>Middle Name</TableHead> */}
                  <TableHead>Last Name</TableHead>
                  <TableHead>Job Title</TableHead>
                  {/*<TableHead>Organization Type</TableHead>
                  <TableHead>Organization Id</TableHead>
                  <TableHead>Organization ID Column Name</TableHead> */}
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortingDataUserID?.map((i) => (
                  <TableRow key={part == 'AllUsers' ? i.user_id : i.employee_id}>
                    <TableCell>{part == 'AllUsers' ? i.user_id : i.employee_id}</TableCell>
                    <TableCell >{i.first_name}</TableCell>
                    <TableCell >{i.last_name}</TableCell>
                    <TableCell >{i.job_title}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2 cursor-pointer'>
                        {
                          part == 'ReadAll' && <Link className="p-1 rounded-full border-2 bg-green-400 text-xl" to={'/employees/edit/' + i.employee_id}>{<FilePenLineIcon />}</Link>
                        }
                        {
                          part == 'AllUsers' && <Link className="p-1 rounded-full border-2 bg-green-400 text-xl" to={'/allusers/edituser/' + i.id}>{<FilePenLineIcon />}</Link>
                        }

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="p-1 rounded-full border-2 bg-red-400 text-xl" >{<FiTrash />}</button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Really Want To <span className="text-red-600">Delete</span> ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently <span className="text-red-600">delete</span> from
                                database and <span className="text-red-600">remove</span> your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className='bg-green-700 text-white'>Cancel</AlertDialogCancel>
                              {
                                part == 'ReadAll' ?
                                  <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteItem(i.employee_id, 'employees')}>Confirm</AlertDialogAction>
                                  :
                                  <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteItem(i.id, 'def_persons')}>Confirm</AlertDialogAction>
                              }

                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                      </div></TableCell>
                  </TableRow>
                ))
                  // .sort((a, b) => a.user_name.localeCompare(b.user_name))
                }
              </TableBody>
            </Table>

        }
      </div>
    </>
  )
}
export default UserTable