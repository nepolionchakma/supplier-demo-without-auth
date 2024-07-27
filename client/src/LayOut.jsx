import { RouterProvider, createBrowserRouter } from "react-router-dom"
import RootHome from "./components/RootHome"
import HomePortal from "./components/HomePortal/HomePortal"
import Notifications from "./components/Notifications/Notifications"
import Inbox from "./components/Notifications/Inbox"
import Draft from "./components/Notifications/Draft"
import Send from "./components/Notifications/Sent"
import Items from "./components/Items/Items"
import Profile from "./components/Profile/Profile"
import AllUsers from "./components/UserManagement/AllUsers"
import EditUser from "./components/UserManagement/EditUser/EditUser"
import AddUser from "./components/UserManagement/AddUser/AddUser"
import Employees from "./components/Employees/Employees"
import Error from "./components/Error/Error"
import InviteUser from "./components/UserManagement/InviteUser/InviteUser"
import LogIn from "./components/Profile/LogIn"
import ConfirmAccount from "./components/ConfirmAccount/ConfirmAccount"
import Update from "./components/Employees/Update/Update"
import AddRow from "./components/Employees/AddRow/AddRow"
import AccessToken from "./components/QRCode/AccessToken"
import OrgId from "./components/QRCode/OrgId"
import AllDepartment from "./components/Departments/AllDepartment"
import AddDepartment from "./components/Departments/AddDepartment"
import UpdateDepartment from "./components/Departments/UpdateDepartment"
import Bell from "./components/Bell/Bell"
import SignUp from "./components/Profile/SignUp"
import MasterDetails1 from "./components/MasterDetails/MasterDetails1"
import MasterDetails2 from "./components/MasterDetails/MasterDetails2"
import MasterDetails3 from "./components/MasterDetails/MasterDetails3"
import DNDTodo from "./components/DND/DNDTodo"
import DepartmentDND from "./components/DND/DepartmentDND"
import DepartmentDND2 from "./components/DND/DepartmentDND2"
import DepartmentDND3 from "./components/DND/DepartmentDND3"
import StudentsDND from "./components/DND/StudentsDND"
import DepartmentDND4 from "./components/DND/DepartmentDND4"
import StudentsDND2 from "./components/DND/StudentsDND2"
import StudentsDND3 from "./components/DND/StudentsDND3"
import DepartmentAPITest from "./components/DND/DepartmentAPITest"
import Chat from "./Chat/Chat"
import Noti2 from "./components/Notifications/Noti2"
import MessageDetails from "./components/Notifications/MessageDetails"

function LayOut() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootHome />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <HomePortal />
        },

        {
          path: '/allusers',
          element: <AllUsers />,
        },
        {
          path: '/adduser',
          element: <AddUser />,
        },
        {
          path: '/allusers/edituser/:id',
          element: <EditUser />
        },
        {
          path: '/inviteuser',
          element: <InviteUser />
        },
        {
          path: '/items',
          element: <Items />
        },
        {
          path: '/bell',
          element: <Bell />
        },
        {
          path: '/noti2',
          element: <Noti2 />
        },
        {
          path: '/employees',
          element: <Employees />
        },
        {
          path: '/adddata',
          element: <AddRow />
        },
        {
          path: '/employees/edit/:employee_id',
          element: <Update />
        },
        {
          path: '/alldepartment',
          element: <AllDepartment />
        },
        {
          path: '/adddepartment',
          element: <AddDepartment />
        },
        {
          path: '/masterdetails1',
          element: <MasterDetails1 />
        },
        {
          path: '/masterdetails2',
          element: <MasterDetails2 />
        },
        {
          path: '/masterdetails3',
          element: <MasterDetails3 />
        },
        {
          path: '/alldepartment/edit/:id',
          element: <UpdateDepartment />
        },
        {
          path: '/todos',
          element: <DNDTodo />
        },
        {
          path: '/departmentdnd',
          element: <DepartmentDND />
        },
        {
          path: '/departmentdnd2',
          element: <DepartmentDND2 />
        },
        {
          path: '/departmentdnd3',
          element: <DepartmentDND3 />
        },
        {
          path: '/departmentdnd4',
          element: <DepartmentDND4 />
        },
        {
          path: '/departmentapitest',
          element: <DepartmentAPITest />
        },
        {
          path: '/students',
          element: <StudentsDND />
        },
        {
          path: '/students2',
          element: <StudentsDND2 />
        },
        {
          path: '/students3',
          element: <StudentsDND3 />
        },
        {
          path: '/orgid',
          element: <OrgId />
        },
        {
          path: '/accesstoken',
          element: <AccessToken />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/profile/update/:id',
          element: <Profile />
        },

        {
          path: '/login',
          element: <LogIn />
        },
        {
          path: '/chat',
          element: <Chat />
        },
        {
          path: '/messages',
          element: <Notifications />,
          children: [
            {
              path: '',
              element: <Inbox />
            },
            {
              path: 'inbox',
              element: <Inbox />
            },
            {
              path: 'send',
              element: <Send />
            },
            {
              path: 'draft',
              element: <Draft />
            }
          ]
        },
        {
          path: "/messages/:id",
          // loader: async ({ params }) => {
          //   const res = await fetch(`http://127.0.0.1:3000/messages/${params.id}`)
          //   const data = await res.json()
          //   return data[0]
          // },
          element: < MessageDetails />,
        }
      ]
    },
    {
      path: '/confirmaccount',
      element: <ConfirmAccount />,
    },
    {
      path: '/accountconfirm',
      element: <SignUp />,
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}
export default LayOut