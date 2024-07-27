
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
import { useAuthContext } from "@/Supabase/AuthContext";

function Widget4(
  { employee, id, index, setEmployees, employees, handleDeleteEmployee, widget_state, setWidget_state }) {
  const { allDepartmentData } = useAuthContext()
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
  const handleMinMax = (index, employee_id) => {
    const updatedWidget_state = [...employees];
    updatedWidget_state[index].employee_id = employee_id;
    updatedWidget_state[index].widget_state = !updatedWidget_state[index].widget_state;
    setWidget_state(updatedWidget_state);
  }
  // const handleToggle = async (index) => {
  //   const updatedEmployees = [...employees];
  //   updatedEmployees[index].widget_state = !updatedEmployees[index].widget_state;
  //   setEmployees(updatedEmployees);

  //   const { data, error } = await supabase
  //     .from('employees')
  //     .update({ widget_state: updatedEmployees[index].widget_state })
  //     .eq('employee_id', updatedEmployees[index].employee_id);

  //   if (error) {
  //     console.error('Error updating widget_state:', error);
  //   } else {
  //     console.log('widget_state updated:', data);
  //   }
  // };

  return (
    <div
      style={style}
    >

      <div className={`border-2 p-4 pt-0 shadow-xl  touch-none duration-700 rounded bg-slate-400 w-[100%] mx-auto hover:shadow-slate-600  ${employee.widget_state ? 'shadow-green-300 w-[80%] duration-700 mx-auto  ' : 'shadow-slate-400'} `}>
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

          <div className="hover:bg-sky-500 hover:text-white rounded-md p-1" onClick={() => handleMinMax(index, employee.employee_id)}>  {employee.widget_state ? <FiMaximize /> : <FiMinimize2 />}  </div>


        </div>

        <div className=" flex flex-col gap-3">
          <div className=" ">
            <div className="flex gap-3">
              <label htmlFor="">User Name </label>
              <div className="  px-3 py-1 rounded">
                <input className="px-2 rounded" type="text" value={employee.employee_name}
                  onChange={e => handleChange(index, 'employee_name', e.target.value)} />
              </div>
            </div>
          </div>
          <div className={`  ${employee.widget_state ? 'hidden' : 'visible'}`}>
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
                <input className="px-2 rounded" type="email" value={employee.email}
                  onChange={e => handleChange(index, 'email', e.target.value)} />
              </div>
              <div className="flex flex-col gap-3 w-[20%]">
                <label htmlFor="department_id">Department</label>
                <div className="flex justify-between items-center  ">
                  <select
                    value={employee.department_id}
                    onChange={(e) => handleChange(index, 'department_id', e.target.value)}
                    className=" w-[90%] rounded m-0"
                    name="department_id" id="department_id" form="department_id" >

                    {
                      allDepartmentData.map(d => (

                        <option key={d.department_id} value={d.department_id} >{d.department_name}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default Widget4