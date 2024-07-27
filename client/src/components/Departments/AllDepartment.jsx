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
import { supabase, useAuthContext } from "@/Supabase/AuthContext"
import { FilePenLineIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { FiTrash, FiTrash2 } from "react-icons/fi"
import { Link } from "react-router-dom"
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
function AllDepartment() {
  const { allDepartmentData, handleDelete, tosifySuccess } = useAuthContext()

  const handleDeleteItem = (id, info) => {
    handleDelete(id, info)
    tosifySuccess('Delete Successfully !')
  }
  return (
    <div className="w-1/2 mx-auto rounded bg-slate-200 p-3 mt-5">
      <h4 className="text-center font-bold text-2xl my-4">Departments Table</h4>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDepartmentData?.map((i) => (
            <TableRow key={i.department_id}>
              <TableCell>{i.department_id}</TableCell>
              <TableCell>{i.department_name}</TableCell>
              <TableCell>
                <div className='flex items-center gap-2 cursor-pointer'>
                  <Link className="p-1 rounded-full border-2 bg-green-400 text-xl" to={'edit/' + i.department_id}>{<FilePenLineIcon />}</Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="p-1 rounded-full border-2 bg-red-400 text-xl" >{<FiTrash2 />}</button>
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
                        <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteItem(i.department_id, 'departments')}>Confirm</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                </div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default AllDepartment