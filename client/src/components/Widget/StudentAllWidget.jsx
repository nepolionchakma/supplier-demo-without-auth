import { useAuthContext } from "@/Supabase/AuthContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { FiEdit, FiMinimize, FiTrash } from "react-icons/fi";
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

const StudentAllWidget = ({ student, index, setStudents, students, setIndex, addWidget, tosifyError, }) => {
  const { handleDelete } = useAuthContext()

  const { tosifySuccess } = useAuthContext()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: student.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  useEffect(() => {
    setIndex(index)
  }, [addWidget])


  const onchangeInputWidget = (id, field, value) => {
    setStudents(students.map(student =>
      student.id === id ? { ...student, [field]: value } : student
    ));
  };

  const toggleMinimize = async (id) => {
    const updatedIs_minimized = students.map(student =>
      student.id === id ? { ...student, is_minimized: !student.is_minimized } : student
    );
    setStudents(updatedIs_minimized);
    // Send is_minimized value to Supabase table
    // const { data, error } = await supabase
    //   .from('student_widget_attributes')
    //   .upsert(updatedIs_minimized);
    // if (error) {
    //   console.error('Error updating student_widget_attributes:', error);
    // }
  };

  const handleDeleteStudent = async (id) => {
    console.log(id)
    setStudents(students.filter(student => student.id != id))
    handleDelete(id, 'students')
    handleDelete(id, 'student_widget_attributes')

    tosifySuccess('Successfully deleted Student .')
  }

  return (
    <div
      style={style}
    >
      <div
        className={`border-2 p-4 pt-0 shadow-xl ${student?.is_minimized ? 'w-[50%] p-2 shadow-green-500' : 'w-full shadow-slate-500'} mx-auto touch-none duration-700 rounded bg-slate-400 hover:shadow-green-600 `}
      >
        <div
          className="cursor-grab py-4"
          ref={setNodeRef}
          {...attributes}
          {...listeners}>
        </div>
        <div className="flex flex-row-reverse gap-2">

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="hover:bg-red-500 p-2 rounded-full">  <FiTrash /> </button>
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
                <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteStudent(student.id)}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <button onClick={() => toggleMinimize(student.id)} className="hover:bg-green-500 p-2 rounded-full"><FiMinimize /></button>
        </div>
        <div className=" ">
          <div className="flex gap-3 justify-center">
            <div className="flex flex-col items-center">
              <label htmlFor="">Student Name </label>
              <div className="  px-3 py-1 rounded">
                <input className="px-2 rounded w-[60%]" type="text" value={student.name} onChange={e => onchangeInputWidget(student.id, 'name', e.target.value)} />
              </div>
            </div>
            <div className={`flex flex-col items-center ${student?.is_minimized ? 'hidden' : 'visible  duration-500'}`}>
              <label htmlFor="">Department Name </label>
              <div className="  px-3 py-1 rounded">
                <input className="px-2 rounded w-[60%]" type="text" value={student.department} onChange={e => onchangeInputWidget(student.id, 'department', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StudentAllWidget