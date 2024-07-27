import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
const DNDTodo = () => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState(
    ['A', "B"]
  )
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('tasks')))
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    setTasks((prev) => {
      const list = [...prev, task]
      localStorage.setItem('tasks', JSON.stringify(list))
      return list
    })
  }
  console.log(tasks)
  return (
    <div className="flex flex-col gap-9 bg-slate-200 rounded p-4 h-[85vh]">
      <div className="text-center">
        <h4>create todo</h4>
        <div className="my-5">
          <form onSubmit={handleSubmit}>
            <input value={task.name} onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })} type="text" className="px-4 py-2" />
            <button className="bg-green-500 rounded px-4 py-2">Add</button>
          </form>
        </div>
      </div>
      <div className="flex gap-5 items-center ">
        <div className="bg-white rounded p-3 w-[30%]">
          <div>Todos</div>
          <div>
            {
              tasks?.map((i) => (
                <div key={i.id}>{i.name}</div>
              ))
            }
          </div>
        </div>
        <div className="bg-white rounded p-3 w-[30%]">Progresses</div>
        <div className="bg-white rounded p-3 w-[30%]">Done</div>
      </div>
    </div>
  )
}
export default DNDTodo