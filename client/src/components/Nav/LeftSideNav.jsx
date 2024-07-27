import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FiActivity, FiCode, FiCrosshair, FiDatabase, FiDivideCircle, FiDroplet, FiFeather, FiFile, FiHardDrive, FiInfo, FiList, FiMenu, FiPlus, FiSend, FiServer, FiTarget, FiUser, FiUserPlus, FiUsers, FiX } from 'react-icons/fi';
import { FingerprintIcon, GaugeCircle } from 'lucide-react';
function LeftSideNav() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isTrue, setIsTrue] = useState(false)
  const [index, setIndex] = useState(null)
  const [collapsed, setCollapsed] = useState(false);
  const nav = [
    {
      id: 1,
      title: 'Users Menagement',
      icon: <FiUserPlus className='text-2xl' />,
      cate: [
        {
          id: 1,
          name: 'Add User',
          icon: <FiUserPlus className='text-2xl' />,

          link: "/adduser"
        },
        {
          id: 2,
          name: 'All User',
          icon: <FiUsers className='text-2xl' />,
          link: '/allusers'
        },
        {
          id: 3,
          name: 'Invite User',
          icon: <FiSend className='text-2xl' />,
          link: '/inviteuser'
        },
      ]
    },
    {
      id: 2,
      title: 'Employees',
      icon: <FiHardDrive className='text-2xl' />,
      cate: [
        {
          id: 1,
          name: 'Add Employee',
          icon: <FiPlus className='text-2xl' />,
          link: "/adddata"
        },
        {
          id: 2,
          name: 'All Employee Data',
          icon: <FiFile className='text-2xl' />,
          link: '/employees'
        }
      ]
    },
    {
      id: 3,
      title: 'Departments',
      icon: <FiDatabase className='text-2xl' />,
      cate: [
        {
          id: 1,
          name: 'Add Department',
          icon: <FiUserPlus className='text-2xl' />,
          link: "/adddepartment"
        },
        {
          id: 2,
          name: 'All Department',
          icon: <FiUsers className='text-2xl' />,
          link: '/alldepartment'
        },
        {
          id: 3,
          name: 'Master Details 1',
          icon: <FingerprintIcon className='text-2xl' />,
          link: '/masterdetails1'
        },
        {
          id: 4,
          name: 'Master Details 2',
          icon: <GaugeCircle className='text-2xl' />,
          link: '/masterdetails2'
        },
        {
          id: 5,
          name: 'Master Details 3',
          icon: <FiServer className='text-2xl' />,
          link: '/masterdetails3'
        },
      ]
    },
    {
      id: 4,
      title: 'DND',
      icon: <FiDroplet className='text-2xl' />,
      cate: [
        {
          id: 1,
          name: 'Todos',
          icon: <FiTarget className='text-2xl' />,
          link: "/todos"
        },
        {
          id: 2,
          name: 'Department DND',
          icon: <FiFile className='text-2xl' />,
          link: '/departmentdnd'
        },
        {
          id: 3,
          name: 'Department DND 2',
          icon: <FiCrosshair className='text-2xl' />,
          link: '/departmentdnd2'
        },
        {
          id: 4,
          name: 'Department DND 3',
          icon: <FiActivity className='text-2xl' />,
          link: '/departmentdnd3'
        },
        {
          id: 5,
          name: 'Department DND 4',
          icon: <FiActivity className='text-2xl' />,
          link: '/departmentdnd4'
        },
        {
          id: 6,
          name: 'Students',
          icon: <FiFeather className='text-2xl' />,
          link: '/students'
        },
        {
          id: 7,
          name: 'departmentapitest',
          icon: <FiCode className='text-2xl' />,
          link: '/departmentapitest'
        },
      ]
    },
    // {
    //   id: 4,
    //   title: 'Profile',
    //   icon: <FiUser className='text-2xl' />,
    //   link: 'profile'
    // },
  ]
  // console.log(nav)
  return (
    <div className="p-4 ">
      <nav className='flex gap-4'>
        <div style={{ display: 'flex', }} className='  h-[85vh]' >

          <Sidebar collapsed={collapsed} transitionDuration={1000}>


            <main
              className='m-4 flex justify-center cursor-pointer'
            >
              <div className='border rounded p-2' onClick={() => setCollapsed(!collapsed)}>
                {
                  collapsed ? <FiMenu /> : <FiX />
                }
              </div>
            </main>

            <Menu
              menuItemStyles={{
                button: ({ level, active, disabled }) => {
                  // only apply styles on first level elements of the tree
                  if (level === 0)
                    return {
                      // color: disabled ? '#f5d9ff' : '#d359ff',
                      backgroundColor: active ? '#eecef9' : '',
                    };
                },
              }}
            >
              {
                nav?.map(item => (
                  <div key={item.id}>
                    <SubMenu
                      label={item.title}
                      icon={item.icon}
                      // open={index == item.id && true}
                      onOpenChange={() => {
                        // setIsOpenMenu(!isOpenMenu)
                        setIndex(item.id)
                      }}
                    >
                      {
                        item?.cate?.map(i => (
                          <MenuItem
                            key={i.id}
                            component={<NavLink to={i.link} />}
                            icon={i.icon}
                            style={({ isActive, isPending }) => {
                              return {
                                color: isActive ? "red" : "inherit",
                              };
                            }}
                            className={({ isActive, isPending }) => {
                              return isActive ? "active" : isPending ? "pending" : "";
                            }}
                          >
                            {i.name}
                          </MenuItem>
                        ))
                      }
                    </SubMenu>
                  </div>
                ))
              }
              <MenuItem
                style={({ isActive, isPending }) => {
                  return {
                    color: isActive ? "red" : "inherit",
                  };
                }}
                className={({ isActive, isPending }) => {
                  return isActive ? "active" : isPending ? "pending" : "";
                }}
                component={<NavLink to="profile" />}
                icon={<FiUser className='text-2xl' />}> Profiles </MenuItem>

              {/* <MenuItem
                style={({ isActive }) => {
                  return {
                    color: isActive ? "red" : "inherit",
                  };
                }}
                className={({ isActive }) => isActive ? "active" : ""}

                component={<NavLink to="information" />}
                icon={<FingerprintIcon className='text-2xl' />}> Information </MenuItem>
 */}

              {/* <SubMenu label="User Menagement" onOpenChange={() => setIsOpenMenu(!isOpenMenu, 'users')} open={isOpenMenu} icon={<FiUserPlus className='text-2xl' />}>
                <MenuItem
                  component={<NavLink to="/adduser" />}
                  icon={<FiUserPlus className='text-2xl' />}> Add User </MenuItem>
                <MenuItem
                  component={<NavLink to="/allusers" />}
                  icon={<FiUsers className='text-2xl' />}> All Users </MenuItem>
                <MenuItem component={<NavLink to="/inviteuser" />}
                  icon={<FiSend className='text-2xl' />}> Invite a User </MenuItem>
              </SubMenu>

              <SubMenu label="Employees" onOpenChange={() => setIsOpenMenu(!isOpenMenu)} open={!isOpenMenu} icon={<FiDatabase className='text-2xl' />}>
                <MenuItem
                  component={<NavLink to="/adddata" />}
                  icon={<FiPlus className='text-2xl' />}> Add</MenuItem>
                <MenuItem
                  component={<NavLink to="employees" />}
                  icon={<FiFile className='text-2xl' />}>All Data</MenuItem>
              </SubMenu>
              <SubMenu label="Departments" onOpenChange={() => setIsOpenMenu(!isOpenMenu)} open={!isOpenMenu} icon={<FiHardDrive className='text-2xl' />}>
                <MenuItem
                  component={<NavLink to="/adddepartment" />}
                  icon={<FiPlus className='text-2xl' />}> Add Department</MenuItem>
                <MenuItem
                  component={<NavLink to="alldepartment" />}
                  icon={<FiFile className='text-2xl' />}>All Department</MenuItem>
              </SubMenu>

              <SubMenu label="QR Code" onOpenChange={() => setIsOpenMenu(!isOpenMenu)} open={!isOpenMenu} icon={<FiCode className='text-2xl' />}>
                <MenuItem
                  component={<NavLink to="/orgid" />}
                  icon={<FiInfo className='text-2xl' />}> Org Id </MenuItem>
                <MenuItem
                  component={<NavLink to="accesstoken" />}
                  icon={<FiServer className='text-2xl' />}>Access Token</MenuItem>
              </SubMenu>

              <MenuItem
                component={<NavLink to="items" />}
                icon={<FiList className='text-2xl' />}> Items </MenuItem>

              <MenuItem
                component={<NavLink to="profile" />}
                icon={<FiUser className='text-2xl' />}> Profiles </MenuItem> */}
            </Menu>
          </Sidebar>

        </div>
        <div className={'  ' + (!collapsed ? 'w-full' : 'w-full')}>
          <Outlet context={[collapsed]} />
        </div>
      </nav>
    </div>
  )
}
export default LeftSideNav