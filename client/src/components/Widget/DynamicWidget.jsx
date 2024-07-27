
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

function DynamicWidget(
  { name, id1, id2, title, email, data, index, setDatas, datas,
    handleDelete, min_n_max, setMin_n_max, onchange_name, onchange_id1, onchange_title, onchange_email, onchange_id2 }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: data });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = (index, field, value) => {
    const updatedEmployees = [...datas];
    updatedEmployees[index][field] = value;
    setDatas(updatedEmployees);

  };
  const handleMinMax = (index, id1) => {
    const updatedMin_n_max = [...min_n_max];
    updatedMin_n_max[index].employee_id = id1;
    updatedMin_n_max[index].min_n_max = !updatedMin_n_max[index].min_n_max;
    setMin_n_max(updatedMin_n_max);
  }

  return (
    <div
      style={style}
    >

      <div className={`border-2 p-4 pt-0 shadow-xl  touch-none duration-700 rounded bg-slate-400 w-[100%] mx-auto hover:shadow-slate-600  ${min_n_max ? 'shadow-green-300 w-[80%] duration-700 mx-auto  ' : 'shadow-slate-400'} `}>
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
                <AlertDialogAction className='bg-red-600' onClick={() => handleDelete(data.employee_id, 'employees')}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="hover:bg-sky-500 hover:text-white rounded-md p-1" onClick={() => handleMinMax(index, id1)}>  {min_n_max ? <FiMaximize /> : <FiMinimize2 />}  </div>


        </div>

        <div className=" flex flex-col gap-3">
          <div className=" ">
            <div className="flex gap-3">
              <label htmlFor="">Employee Name </label>
              <div className="  px-3 py-1 rounded">
                <input className="px-2 rounded" type="text" value={name}
                  onChange={e => handleChange(index, { onchange_name }, e.target.value)} />
              </div>
            </div>
          </div>
          <div className={`  ${data.min_n_max ? 'hidden' : 'visible'}`}>
            <div className="flex gap-5">
              <div className="flex flex-col gap-3 w-[15%]">
                <label htmlFor="">Employee Id</label>
                <input readOnly className="px-2 rounded" type="text" value={id1}
                  onChange={e => handleChange(index, { onchange_id1 }, e.target.value)} />
              </div>
              <div className="flex flex-col gap-3 w-[25%]">
                <label htmlFor="">Job Title</label>
                <input className="px-2 rounded" type="text" value={title}
                  onChange={e => handleChange(index, { onchange_title }, e.target.value)} />
              </div>
              <div className="flex flex-col gap-3 w-[30%]">
                <label htmlFor="">Email</label>
                <input className="px-2 rounded" type="text" value={email}
                  onChange={e => handleChange(index, { onchange_Email: onchange_email }, e.target.value)} />
              </div>
              <div className="flex flex-col gap-3 w-[20%]">
                <label htmlFor="">Department Id</label>
                <input readOnly className="px-2 rounded" type="text" value={id2}
                  onChange={e => handleChange(index, { onchange_id2 }, e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default DynamicWidget