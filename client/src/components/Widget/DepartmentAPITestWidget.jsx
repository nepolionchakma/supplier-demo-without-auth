import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";



const DepartmentAPITestWidget = ({ id, name, email, widget, rightWidgets }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: widget });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="widget bg-slate-200 p-4 shadow-md rounded-md mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold">{name || 'Empty Widget'}</h4>
          <p>{email || 'No Department'}</p>
        </div>
      </div>
    </div>
  );
};
export default DepartmentAPITestWidget