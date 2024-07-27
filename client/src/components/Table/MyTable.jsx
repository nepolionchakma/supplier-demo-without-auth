// import { useAuthContext } from "@/Supabase/AuthContext"
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { FilePenIcon, FilePenLineIcon } from "lucide-react";

// import { FiPenTool, FiTrash } from 'react-icons/fi';
// import { Link } from "react-router-dom";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"

// function MyTable() {
//   const { data, isLoading, handleDelete, tosifySuccess } = useAuthContext()
//   const handleDeleteItem = (id) => {
//     handleDelete(id)
//     tosifySuccess('Delete Successfully !')
//   }
//   const sortingDataUserID = data?.sort((a, b) => b.user_id - a.user_id)
//   return (
//     <>
//       <div className="border">
//         {
//           isLoading ?
//             <div className="w-full h-full overflow-hidden flex items-center justify-center transition-all duration-700">
//               <img src='https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif' alt="" />
//             </div>
//             :
//             <Table className='border-0 m-5 w-[95%]'>
//               <TableCaption> </TableCaption>
//               <TableHeader>

//                 <TableRow>
//                   <TableHead>ID</TableHead>
//                   <TableHead>UserID</TableHead>
//                   {/* <TableHead className="w-[10px]">Email</TableHead> */}
//                   {/* <TableHead>User Id</TableHead> */}
//                   <TableHead>User Name</TableHead>
//                   <TableHead>First Name</TableHead>
//                   <TableHead>Middle Name</TableHead>
//                   <TableHead>Last Name</TableHead>
//                   <TableHead>Job Title</TableHead>
//                   <TableHead>Organization Type</TableHead>
//                   <TableHead>Organization Id</TableHead>
//                   <TableHead>Organization ID Column Name</TableHead>
//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {sortingDataUserID?.map((i) => (
//                   <TableRow key={i.id}>
//                     <TableCell>{i.id}</TableCell>
//                     <TableCell>{i.user_id}</TableCell>
//                     {/* <TableCell className="w-[10px]">{i.email}</TableCell> */}
//                     {/* <TableCell >{i.user_id}</TableCell> */}
//                     <TableCell >{i.user_name}</TableCell>
//                     <TableCell >{i.first_name}</TableCell>
//                     <TableCell >{i.middle_name}</TableCell>
//                     <TableCell >{i.last_name}</TableCell>
//                     <TableCell >{i.job_title}</TableCell>
//                     <TableCell >{i.org_type}</TableCell>
//                     <TableCell >{i.org_id}</TableCell>
//                     <TableCell >{i.org_id_column_name}</TableCell>
//                     <TableCell>
//                       <div className='flex items-center gap-2 cursor-pointer'>
//                         <Link className="p-1 rounded-full border-2 bg-green-400 text-xl" to={'/allusers/edituser/' + i.id}>{<FilePenLineIcon />}</Link>


//                         <AlertDialog>
//                           <AlertDialogTrigger asChild>
//                             <button className="p-1 rounded-full border-2 bg-red-400 text-xl" >{<FiTrash />}</button>
//                           </AlertDialogTrigger>
//                           <AlertDialogContent>
//                             <AlertDialogHeader>
//                               <AlertDialogTitle>Really Want To <span className="text-red-600">Delete</span> ?</AlertDialogTitle>
//                               <AlertDialogDescription>
//                                 This action cannot be undone. This will permanently <span className="text-red-600">delete</span> from
//                                 database and <span className="text-red-600">remove</span> your data from our servers.
//                               </AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel className='bg-green-700 text-white'>Cancel</AlertDialogCancel>
//                               <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteItem(i.id)}>Confirm</AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         </AlertDialog>

//                       </div></TableCell>
//                   </TableRow>
//                 ))
//                   // .sort((a, b) => a.user_name.localeCompare(b.user_name))
//                 }
//               </TableBody>
//             </Table>

//         }
//       </div>
//     </>
//   )
// }
// export default MyTable