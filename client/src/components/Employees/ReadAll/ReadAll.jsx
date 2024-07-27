import { useAuthContext } from "@/Supabase/AuthContext"
import UserTable from "@/components/Table/FetchDataTable"

function ReadAll() {
  const { allEmployeesData, isLoading, handleDelete, tosifySuccess } = useAuthContext()
  return (
    <div>
      <UserTable
        part={'ReadAll'}
        data={allEmployeesData}
        isLoading={isLoading}
        handleDelete={handleDelete}
        tosifySuccess={tosifySuccess}
      />
    </div>
  )
}
export default ReadAll