import { useEffect, useState } from "react"
import { supabase, useAuthContext } from "@/Supabase/AuthContext"
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import StudentAllWidget from "../Widget/StudentAllWidget"
import { FiPlus, FiSave } from "react-icons/fi"
import StudentAddWidget from "../Widget/LeftSideEmptyWidget"
import LeftSideEmptyWidget from "../Widget/LeftSideEmptyWidget"
const StudentsDND3 = () => {
  const { tosifySuccess, tosifyError } = useAuthContext()
  const [students, setStudents] = useState([]);
  const [index, setIndex] = useState([])
  const maxValue = Math.max(...students.map(obj => obj.id));
  const id = students.length ? maxValue + 1 : 1
  const [leftWidgets, setLeftWidgets] = useState([{ id: id, name: '', department: '', is_minimized: false, position: index + 1, student_id: id }]);
  useEffect(() => {
    const studentData = async () => {
      try {
        let { data: students_data, error: students_error } = await supabase
          .from('students')
          .select('*')
        let { data: student_widget_attributes, error: student_widget_attributes_error } = await supabase
          .from('student_widget_attributes')
          .select('*')
        // Merge data based on common 'id' field
        const mergedData = students_data.map(student => ({
          ...student,
          ...(student_widget_attributes.find(attr => attr.student_id === student.id) || {}),
        }));

        const sortedData = [...mergedData.sort((a, b) => a.position - b.position)];
        setStudents(sortedData);
      } catch (error) {
        console.log(error)
      }

    }
    studentData()
  }, [])


  const handleSave = async () => {

    const emptyValueChecked = students.filter(student => student.name === '' || student.department === '')
    console.log(emptyValueChecked)
    if (emptyValueChecked.length > 0) return alert('Please fill all values.')
    const updateStudents = students.map(student => (
      {
        id: student.id,
        name: student.name,
        department: student.department
      }
    ))
    const updateStudentsAttributes = students.map((student, index) => (
      {
        student_id: student.student_id,
        position: index,
        is_minimized: student.is_minimized,
      }
    ))

    try {

      // Upsert users
      await supabase
        .from('students')
        .upsert(updateStudents, { onConflict: ['id'] });

      // Upsert departments
      await supabase
        .from('student_widget_attributes')
        .upsert(updateStudentsAttributes, { onConflict: ['student_id'] });

      tosifySuccess('Successfully save data.')
    } catch (error) {
      tosifyError('Error : ', error.message)
    }

  }

  const addWidget = () => {
    const maxValue = Math.max(...students.map(obj => obj.id));
    const id = students.length ? maxValue + 1 : 1

    const newWidget = { id: id, name: '', department: '', is_minimized: false, position: index + 1, student_id: id };
    setStudents([...students, newWidget]);
  };
  // console.log(students)
  // console.log(leftWidgets)

  // ----------------Drag And Drop Start
  const handleDragEnd = (event) => {
    const { active, over } = event;

    // console.log(active.id, over.id)


    if (active.id !== over.id) {


    }

    if (active.id !== over.id) {

      const activeIndexInLeft = leftWidgets.findIndex(widget => widget.id === active.id);
      const activeIndexInRight = students.findIndex(widget => widget.id === active.id);
      const overIndexInLeft = leftWidgets.findIndex(widget => widget.id === over.id);
      const overIndexInRight = students.findIndex(widget => widget.id === over.id);

      // console.log(activeIndexInRight, overIndexInRight, activeIndexInLeft, overIndexInLeft)
      if (activeIndexInRight === overIndexInRight || activeIndexInRight === -1) {
        const filterIfEmptyWidget = students.filter(student => student.name === '' || student.department === '')
        console.log(filterIfEmptyWidget)
        if (filterIfEmptyWidget.length === 0) {
          setStudents(prevState => [{ id: id, name: '', department: '', is_minimized: false, position: index + 1, student_id: id }, ...prevState]);
        } else {
          return tosifyError('Fields the widget first please')
        }
      }
      setStudents((students) => {
        const oldIndex = students.findIndex((student) => student.id === active.id);
        const newIndex = students.findIndex((student) => student.id === over.id);

        return arrayMove(students, oldIndex, newIndex);
      });
    }
  };

  // ----------------Drag And Drop End
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <div className="flex  gap-3">


      <div className="  mx-auto" >
        <div className=" ">
          <div className="flex gap-3  sticky top-20">
            <button onClick={handleSave} className="p-3 rounded-full bg-slate-500 hover:bg-green-500 shadow-md hover:shadow-red-400">
              <FiSave className="text-2xl " />
            </button>
            <button onClick={addWidget} className="p-3 rounded-full bg-slate-500 hover:bg-green-500 shadow-md hover:shadow-blue-400">
              <FiPlus className="text-2xl " />
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <div className="gap-6 flex flex-col">
              <SortableContext items={leftWidgets} strategy={verticalListSortingStrategy}>
                {leftWidgets.map((student) => (
                  <LeftSideEmptyWidget
                    key={student.id}
                    student={student}
                    students={students}
                    setStudents={setStudents}
                    setIndex={setIndex}
                    addWidget={addWidget}
                    tosifyError={tosifyError}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <div className="flex gap-5">

              <div className="gap-6 flex flex-col">
                <SortableContext
                  items={students}
                  strategy={verticalListSortingStrategy}
                >
                  {
                    students.map((student, index) => (

                      <StudentAllWidget
                        key={student.id}
                        index={index}
                        student={student}
                        students={students}
                        setStudents={setStudents}
                        setIndex={setIndex}
                        addWidget={addWidget}
                        tosifyError={tosifyError}
                      />
                    ))
                  }


                </SortableContext>
              </div>
            </div>
          </DndContext>
        </div>
      </div>

    </div>
  )
}
export default StudentsDND3