import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import DepartmentAPITestWidget from "../Widget/DepartmentAPITestWidget";
import { CSS } from "@dnd-kit/utilities";
import { useLocalApi } from "@/Supabase/localApiContext";
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
} from "@/components/ui/alert-dialog";
import {
  FiMaximize,
  FiMinimize2,
  FiPlus,
  FiSave,
  FiTrash,
} from "react-icons/fi";
import EmptyWidgetDepartmentDND4 from "../Widget/EmptyWidgetDepartmentDND4";
import { useAuthContext } from "@/Supabase/AuthContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
const Widget = ({
  employee,
  employees,
  setEmployees,
  index,
  setWidget_state,
  widget_state,
  handleDeleteEmployee,
}) => {
  const { departmentData } = useLocalApi();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: employee });

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
    updatedWidget_state[index].position = index;
    updatedWidget_state[index].widget_state =
      !updatedWidget_state[index].widget_state;
    setEmployees(updatedWidget_state);
  };

  return (
    <div style={style}>
      <div
        className={`border-2 p-4 pt-0 shadow-xl  touch-none duration-700 rounded bg-slate-400 w-[100%] mx-auto hover:shadow-slate-600  ${
          widget_state
            ? "shadow-green-300 w-[60%] duration-700 mx-auto  "
            : "shadow-slate-400"
        } `}
      >
        <div
          className="cursor-grab py-4"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        ></div>
        <div className="flex flex-row-reverse gap-3 ">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="hover:bg-red-500 hover:text-white rounded-md p-1">
                {" "}
                <FiTrash />{" "}
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Really Want To <span className="text-red-600">Delete</span> ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently{" "}
                  <span className="text-red-600">delete</span> from database and{" "}
                  <span className="text-red-600">remove</span> your data from
                  our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-green-700 text-white">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600"
                  onClick={() =>
                    handleDeleteEmployee(employee.employee_id, "employees")
                  }
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div
            className="hover:bg-sky-500 hover:text-white rounded-md p-1"
            onClick={() => handleMinMax(index, employee.employee_id)}
          >
            {" "}
            {widget_state ? <FiMaximize /> : <FiMinimize2 />}{" "}
          </div>
        </div>
        <div className={`flex flex-col gap-5 `}>
          <div className={` flex gap-5 `}>
            <div
              className={`${
                widget_state
                  ? "flex  items-center gap-3 mx-auto"
                  : "flex flex-col w-[30%]"
              } `}
            >
              <label htmlFor="">User Name</label>
              <input
                className="px-2 rounded  "
                type="text"
                value={employee.user_name}
                onChange={(e) =>
                  handleChange(index, "user_name", e.target.value)
                }
              />
            </div>
            <div
              className={`${
                widget_state ? "hidden" : "visible"
              } flex flex-col w-[30%]`}
            >
              <label htmlFor="">First Name </label>
              <input
                className="px-2 rounded"
                type="text"
                value={employee.first_name}
                onChange={(e) =>
                  handleChange(index, "first_name", e.target.value)
                }
              />
            </div>
            <div
              className={`${
                widget_state ? "hidden" : "visible"
              }  flex flex-col w-[30%]`}
            >
              <label htmlFor="">Last Name </label>
              <input
                className="px-2 rounded"
                type="text"
                value={employee.last_name}
                onChange={(e) =>
                  handleChange(index, "last_name", e.target.value)
                }
              />
            </div>
          </div>

          <div className={` flex gap-5 ${widget_state ? "hidden" : "visible"}`}>
            <div className="flex flex-col w-[25%]">
              <label htmlFor="">Job Title</label>
              <input
                className="px-2 rounded"
                type="text"
                value={employee.job_title}
                onChange={(e) =>
                  handleChange(index, "job_title", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col w-[30%]">
              <label htmlFor="">Email</label>
              <input
                className="px-2 rounded"
                type="email"
                value={employee.email}
                onChange={(e) => handleChange(index, "email", e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[40%]">
              <label htmlFor="department_id">Department</label>
              <div className="flex justify-between items-center  ">
                <select
                  value={employee.department_id}
                  onChange={(e) =>
                    handleChange(index, "department_id", e.target.value)
                  }
                  className=" w-full rounded m-0"
                  name="department_id"
                  id="department_id"
                  form="department_id"
                >
                  <option value="">Select DP</option>
                  {departmentData.map((d) => (
                    <option
                      defaultValue={d.department_id}
                      key={d.department_id}
                      value={d.department_id}
                    >
                      {d.department_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const DepartmentAPITest = () => {
  const {
    mergeEmployeeData,
    handleEmployeeDelete,
    tosifySuccess,
    tosifyWarm,
    tosifyError,
    employeesData,
    employeesWidgetState,
    departmentData,
  } = useLocalApi();
  const [employees, setEmployees] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [widget_state, setWidget_state] = useState([]);

  const id = Math.floor(Math.random() * 1000 + 1);
  const [leftEmptyWidget, setLeftEmptyWidget] = useState([
    {
      employee_id: id,
      user_name: "",
      first_name: "",
      last_name: "",
      email: "",
      job_title: "",
      department_id: "",
      position: 0,
      widget_state: true,
    },
  ]);

  console.log(employees);
  const handleSaveData = async () => {
    const filterIfEmptyWidget = employees.filter(
      (employee) =>
        employee.user_name === "" ||
        employee.job_title === "" ||
        employee.email === "" ||
        employee.department_id === ""
    );
    if (filterIfEmptyWidget.length === 0) {
      // const changesEmployees = employees.filter(employee => {
      //   const changes = employeesData.map(e => (
      //     employee.user_name !== e.user_name ||
      //     employee.first_name !== e.first_name ||
      //     employee.last_name !== e.last_name ||
      //     employee.job_title !== e.job_title ||
      //     employee.email !== e.email ||
      //     employee.department_id !== e.department_id
      //   ))
      //   return changes
      // })
      // console.log(changesEmployees)
      console.log(employees);
      try {
        // Ensure employees and widget_state are arrays and contain expected properties
        if (!Array.isArray(employees)) {
          throw new Error("Invalid input: employees should be an array.");
        }

        if (!Array.isArray(widget_state)) {
          throw new Error("Invalid input: widget_state should be an array.");
        }

        const updates = employees.map((employee) => ({
          employee_id: employee.employee_id,
          user_name: employee.user_name,
          first_name: employee.first_name,
          last_name: employee.last_name,
          job_title: employee.job_title,
          email: employee.email,
          department_id: employee.department_id,
        }));

        const updatesWidget_state = employees.map((employee, index) => ({
          employee_id: employee.employee_id,
          position: index,
          widget_state: employee.widget_state,
        }));

        // Employees Update
        const employeesResponse = await fetch(
          "http://localhost:3000/employees/upsert",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updates),
          }
        );

        const widgetStateResponse = await fetch(
          "http://localhost:3000/employees-widget-state/upsert",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatesWidget_state),
          }
        );

        if (employeesResponse.ok && widgetStateResponse.ok) {
          tosifySuccess(" Successfully Save.");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      tosifyWarm("Fields the widget first please");
    }
  };

  // Merge arrays on component mount
  useEffect(() => {
    const mergeArrays = (
      employeesData,
      employeesWidgetState,
      departmentData
    ) => {
      const employeesWidgetStateMap = employeesWidgetState.reduce(
        (acc, attribute) => {
          acc[attribute.employee_id] = attribute;
          return acc;
        },
        {}
      );
      const departmentDataMap = departmentData.reduce((acc, attribute) => {
        acc[attribute.department_id] = attribute;
        return acc;
      }, {});

      return employeesData.map((employee) => ({
        ...employee,
        ...employeesWidgetStateMap[employee.employee_id],
        ...departmentDataMap[employee.department_id],
      }));
    };
    try {
      const merged = mergeArrays(
        employeesData,
        employeesWidgetState,
        departmentData
      );
      const sortedMerged = merged.sort((a, b) => a.positions - b.positions);

      setEmployees(sortedMerged);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false)
    }
  }, [employeesData, employeesWidgetState, departmentData]);

  console.log(employeesData, employeesWidgetState, departmentData);

  // useEffect(() => {
  //   const id = employeesData.length ? Math.max(...employees.map(obj => obj.employee_id)) + 1 : 1
  //   setId(id)
  //   console.log(id)
  // }, [leftEmptyWidget.length, employees.length])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id.employee_id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (active.id !== over.id) {
      const activeIndexInLeft = leftEmptyWidget.findIndex(
        (widget) => widget.employee_id === active.id.employee_id
      );
      const activeIndexInRight = employees.findIndex(
        (widget) => widget.employee_id === active.id.employee_id
      );
      const overIndexInLeft = leftEmptyWidget.findIndex(
        (widget) => widget.employee_id === over.id.employee_id
      );
      const overIndexInRight = employees.findIndex(
        (widget) => widget.employee_id === over.id.employee_id
      );

      setEmployees((employees) => {
        return arrayMove(employees, activeIndexInRight, overIndexInRight);
      });

      if (activeIndexInLeft !== -1) {
        const newLeftWidgets = [...leftEmptyWidget];
        const movedItem = newLeftWidgets.splice(activeIndexInLeft, 1)[0];
        movedItem.widget_state = false;

        if (overIndexInRight !== -1) {
          const newRightWidgets = [...employees];
          newRightWidgets.splice(overIndexInRight, 0, movedItem); // Insert after the hovered item
          setEmployees(newRightWidgets);
        } else if (overIndexInLeft !== -1) {
          newLeftWidgets.splice(overIndexInLeft, 0, movedItem);
        } else {
          const newRightWidgets = [...employees, movedItem]; // Insert at the bottom if no specific position
          setEmployees(leftEmptyWidget);
        }

        setLeftEmptyWidget(newLeftWidgets);
        if (newLeftWidgets.length === 0) {
          setLeftEmptyWidget([
            {
              employee_id: id,
              user_name: "",
              first_name: "",
              last_name: "",
              email: "",
              job_title: "",
              department_id: "",
              position: 0,
              widget_state: true,
            },
          ]);
        }
      }
    }
  };

  const handleChange = (id, field, value) => {
    setLeftEmptyWidget(
      leftEmptyWidget.map((widget) =>
        widget.employee_id === id ? { ...widget, [field]: value } : widget
      )
    );
    setEmployees(
      employees.map((widget) =>
        widget.employee_id === id ? { ...widget, [field]: value } : widget
      )
    );
  };
  const renderActiveItem = () => {
    const activeWidget =
      leftEmptyWidget.find((widget) => widget.employee_id === activeId) ||
      employees.find((widget) => widget.employee_id === activeId);
    return activeWidget ? (
      <EmptyWidgetDepartmentDND4 employee={activeWidget} />
    ) : null;
  };
  const handleAddEmployee = async () => {
    const filterIfEmptyWidget = employees.filter(
      (employee) =>
        employee.employee_name === "" ||
        employee.job_title === "" ||
        employee.email === "" ||
        employee.department_id === ""
    );

    if (filterIfEmptyWidget.length === 0) {
      setEmployees((prevState) => [
        {
          employee_id: id,
          employee_name: "",
          job_title: "",
          email: "",
          department_id: "",
          widget_state: false,
          position: 1,
        },
        ...prevState,
      ]);
    } else tosifyError("Field all first please");
  };
  const handleDeleteEmployee = (id, info) => {
    const deleteFilter = mergeEmployeeData.filter((e) => e.employee_id === id);
    const deleteNewEmployee = employees.filter((e) => e.employee_id !== id);
    console.log(id);
    if (deleteFilter === id) {
      handleEmployeeDelete(id, info);
      setEmployees(deleteNewEmployee);
    } else {
      setEmployees(deleteNewEmployee);
    }
  };
  return (
    <div className="w-full">
      <div>
        <div className="flex flex-row-reverse">
          <div
            className=" bg-green-600 rounded-full p-2 cursor-pointer"
            onClick={handleSaveData}
          >
            <FiSave />
          </div>
          <div
            className=" bg-green-600 rounded-full p-2 cursor-pointer"
            onClick={handleAddEmployee}
          >
            <FiPlus />
          </div>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 ">
            <div className="w-[35%]">
              <SortableContext
                items={leftEmptyWidget}
                strategy={verticalListSortingStrategy}
              >
                {leftEmptyWidget.map((employee, index) => (
                  <EmptyWidgetDepartmentDND4
                    key={employee.employee_id}
                    id={employee.employee_id}
                    index={index}
                    employee={employee}
                    setEmployees={setEmployees}
                    employees={employees}
                    // widget_state={widget_state}
                    setWidget_state={setWidget_state}
                    handleDeleteEmployee={handleDeleteEmployee}
                    // minimize={minimize}
                    // handleMaximize={handleMaximize}
                    // handleMinimize={handleMinimize}
                  />
                ))}
              </SortableContext>
            </div>
            <div className="flex flex-col gap-4 w-[65%] ">
              <SortableContext
                items={employees}
                strategy={verticalListSortingStrategy}
              >
                {employees.map((employee, index) => (
                  <Widget
                    key={employee.employee_id}
                    id={employee.employee_id}
                    index={index}
                    employee={employee}
                    setEmployees={setEmployees}
                    employees={employees}
                    // widget_state={widget_state}
                    setWidget_state={setWidget_state}
                    handleDeleteEmployee={handleDeleteEmployee}
                    widget_state={employee.widget_state}

                    // minimize={minimize}
                    // handleMaximize={handleMaximize}
                    // handleMinimize={handleMinimize}
                  />
                ))}
                {employees.map((employee, index) =>
                  console.log(employee.widget_state)
                )}
              </SortableContext>
            </div>
          </div>
          <DragOverlay>{activeId ? renderActiveItem() : null}</DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};
export default DepartmentAPITest;
