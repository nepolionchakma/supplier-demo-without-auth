import { Link } from "react-router-dom"

function Error() {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <p>Not Found</p>
      <Link to='/' className="bg-green-600 p-4 my-4 rounded-md">Home</Link>
    </div>
  )
}
export default Error