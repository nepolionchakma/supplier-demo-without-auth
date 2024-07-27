import { useAuthContext } from "@/Supabase/AuthContext"
import UserTable from "../Table/FetchDataTable"

function AllUsers() {
  const { allUserData, isLoading, handleDelete, tosifySuccess } = useAuthContext()
  return (
    <div>
      <UserTable
        part={'AllUsers'}
        data={allUserData}
        isLoading={isLoading}
        handleDelete={handleDelete}
        tosifySuccess={tosifySuccess}
      />
    </div>
  )
}
export default AllUsers