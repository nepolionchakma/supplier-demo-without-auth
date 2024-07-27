
import { FiEdit, FiMaximize, FiMinimize2, FiMove, FiSave, FiTrash, FiX } from "react-icons/fi"
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
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { supabase } from "@/Supabase/AuthContext";

function Widget1(
  { employee, setEmployees, index, employees, handleDeleteEmployee, minimize, handleMaximize, handleMinimize }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: employee });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (index, field, value) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index][field] = value;
    setEmployees(updatedEmployees);

  };

  const handleToggle = async (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].min_n_max = !updatedEmployees[index].min_n_max;
    setEmployees(updatedEmployees);

    const { data, error } = await supabase
      .from('employees')
      .update({ min_n_max: updatedEmployees[index].min_n_max })
      .eq('employee_id', updatedEmployees[index].employee_id);

    if (error) {
      console.error('Error updating min_n_max:', error);
    } else {
      console.log('min_n_max updated:', data);
    }
  };

  return (
    <div
      style={style}
    >

      <div className={`border-2 p-4 pt-0 shadow-xl  touch-none duration-700 rounded bg-slate-400 w-[100%] mx-auto   ${employee.min_n_max ? 'shadow-green-300 w-[80%] duration-700 mx-auto  ' : 'shadow-slate-600'} `}>
        <div
          className="cursor-grab py-4"
          ref={setNodeRef}
          {...attributes}
          {...listeners}>
        </div>
        <div className="flex flex-row-reverse gap-3 ">

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="hover:bg-red-500 hover:text-white rounded-md p-1">  <FiTrash /> </div>
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
                <AlertDialogAction className='bg-red-600' onClick={() => handleDeleteEmployee(employee.employee_id, 'employees')}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* {
            minimize?.includes(employee.employee_id)
              ?
              <div className="hover:bg-sky-500 hover:text-white rounded-md p-1" onClick={() => handleMaximize(employee.employee_id)}>  <FiMaximize /></div>
              :
              <div className="hover:bg-sky-500 hover:text-white rounded-md p-1" onClick={() => handleMinimize(employee.employee_id)}>  <FiMinimize2 /></div>
          } */}


          <div className="hover:bg-sky-500 hover:text-white rounded-md p-1" onClick={() => handleToggle(index)}>{employee.min_n_max ? <FiMaximize /> : <FiMinimize2 />}  </div>



        </div>

        <div className=" flex flex-col gap-3">
          <div className=" ">
            <div className="flex gap-3">
              <label htmlFor="">Employee Name </label>
              <div className="  px-3 py-1 rounded">
                <input className="px-2 rounded" type="text" value={employee.employee_name}
                  onChange={e => handleChange(index, 'employee_name', e.target.value)} />
              </div>
            </div>
          </div>
          <div className={`  ${employee.min_n_max ? 'hidden' : 'visible'}`}>
            <div className="flex gap-5">
              <div className="flex flex-col gap-3 w-[15%]">
                <label htmlFor="">Employee Id</label>
                <input readOnly className="px-2 rounded" type="text" value={employee.employee_id}
                  onChange={e => handleChange(index, 'employee_id', e.target.value)} />
              </div>
              <div className="flex flex-col gap-3 w-[25%]">
                <label htmlFor="">Job Title</label>
                <input className="px-2 rounded" type="text" value={employee.job_title}
                  onChange={e => handleChange(index, 'job_title', e.target.value)} />
              </div>
              <div className="flex flex-col gap-3 w-[30%]">
                <label htmlFor="">Email</label>
                <input className="px-2 rounded" type="text" value={employee.email}
                  onChange={e => handleChange(index, 'email', e.target.value)} />
              </div>
              <div className="flex flex-col gap-3 w-[20%]">
                <label htmlFor="">Department Id</label>
                <input readOnly className="px-2 rounded" type="text" value={employee.department_id}
                  onChange={e => handleChange(index, 'department_id', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default Widget1