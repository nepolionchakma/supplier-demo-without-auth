import { FiArrowDown, FiCheck, FiCircle, FiDownloadCloud, FiDribbble, FiDroplet, FiInbox, FiList, FiMenu, FiPlus, FiSend, FiUser, FiUserPlus, FiUsers, FiX } from 'react-icons/fi';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { NavLink, Outlet, useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/Supabase/AuthContext';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSocket } from '@/Chat/SocketContext';
import { useAuthContext } from '@/Supabase/AuthContext';
import { ArrowDown, ArrowDown01, FileDownIcon } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../ui/button';


function Notifications() {
  const [collapsed] = useOutletContext();

  const [isActive, setIsActive] = useState(0)

  // --------------------------------------
  const socket = useSocket();
  const { session, allUserData, messageData, tosifySuccess, tosifyWarm, fakeUser, unReadMessages } = useAuthContext()
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiverIds, setReceiverIds] = useState('');
  const [status, setStatus] = useState('sent');
  const [selectId, setSelectId] = useState('')
  const [selectedUser, setSelectedUser] = useState('');

  // --------------------------------------
  const navLinks = [
    {
      name: 'Inbox',
      icon: <FiInbox className='text-2xl' />,
      link: 'inbox',
      msg_length: unReadMessages.length
    },
    {
      name: 'Sent',
      icon: <FiSend className='text-2xl' />,
      link: 'send'
    },
    {
      name: 'Draft',
      icon: <FiDownloadCloud className='text-2xl' />,
      link: 'draft'
    }
  ]
  const [onlineUsers, setOnlineUsers] = useState([])

  const [users, setUsers] = useState([])
  useEffect(() => {
    const users = async () => {
      const res = await fetch("http://127.0.0.1:3000/users")
      const data = await res.json()
      setUsers(data)
    }
    users()
    setIsActive(0)
  }, [])

  useEffect(() => {
    if (fakeUser[0]?.isLogin === true) {
      // socket.emit('login', session.user.id);
      socket.emit('login', { user_name: fakeUser[0]?.user_name, email: fakeUser[0]?.email });
      // socket.emit('login', { user_name: fakeUser[0]?.user_name, email: fakeUser[0]?.email });
      console.log(fakeUser)
      socket.on("sendAllUserMessage", (message) => {
        setMessages((prev) => [...prev, message])
      })

      socket.on('receiveMessage', (message) => {
        setMessages((prev) => [...prev, message]);
        console.log(message)
      });

      return () => socket.off('receiveMessage');
    } else return;
  }, [socket, session, fakeUser]);


  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserNames, setSelectedUserNames] = useState([]);
  const [allUserName, setAllUserName] = useState([])
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const toggleSelectAll = () => {
    if (selectedUserNames.length === users.length) {
      setSelectedUserNames([]);
      console.log('first 1')
    } else {
      setSelectedUserNames(users.map(user => user.user_name));
      console.log('first 2')
    }

  };
  const isAllSelected = selectedUserNames.length === users.length;
  const isIndeterminate = selectedUserNames.length > 0 && !isAllSelected;

  const handleCheckboxChange = (user_name) => {
    if (selectedUserNames.includes(user_name)) {
      setSelectedUserNames(selectedUserNames.filter((user) => user !== user_name));
    } else {
      setSelectedUserNames([...selectedUserNames, user_name]);
    }

  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    socket.on("getNotification", data => {
      console.log(data)
    })
  }, [socket])
  const popUpWidget = () => {
    setIsOpen(false)
  }
  const sendMessage = async (info) => {
    const senderName = fakeUser[0]?.user_name;
    // const senderId = session.user.id;
    // const receiverNameArray = selectedUserNames.map(id => id.trim());
    console.log(selectedUserNames, "all user selected to update")
    try {
      const updates = selectedUserNames.map(receiverName => ({
        sender_name: senderName,
        receiver_name: receiverName,
        subject: subject,
        message: message,
        status: info
      }))
      console.log(updates, "update info")

      if (info === 'draft') {
        const messageResponse = await fetch("http://127.0.0.1:3000/messages/upsert", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        })
        if (messageResponse.ok) {
          tosifySuccess('Message Save Draft Folder.')
        }

      } else {
        socket.emit('sendMessage', { senderName, selectedUserNames, subject, message });

        socket.emit("sendNotification", { senderName, selectedUserNames, subject, message })


        const messageResponse = await fetch("http://127.0.0.1:3000/messages/upsert", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        })
        if (messageResponse.ok) {
          tosifySuccess('Message sent.')
        }
        console.log(messageResponse)
      }
    } catch (error) {

      console.log(error, 'error')
    }
    // if (info === 'draft') {
    //   const { data, error } = await supabase
    //     .from('messages')
    //     .insert(receiverIdArray.map(receiverName => ({
    //       sender_id: senderName,
    //       receiver_id: receiverName,
    //       subject,
    //       message,
    //       status: info
    //     })))
    //     .select()
    //   tosifySuccess('draft success')

    // } else {

    //   socket.emit('sendMessage', { senderName, receiverIdArray, message });

    //   const { data, error } = await supabase
    //     .from('messages')
    //     .insert(receiverIdArray.map(receiverName => ({
    //       sender_id: senderName,
    //       receiver_id: receiverName,
    //       subject,
    //       message,
    //       status: info
    //     })))
    //     .select()
    //   tosifySuccess('Message sent.')
    //   console.log(data, error, 'sent')
    // }

    setMessages((prev) => [...prev, { sender_name: senderName, subject, message }]);
    setSelectedUserNames([])
    setMessage('');
    setSubject('');
  };

  // const fetchMessages = async (route) => {
  //   const { data, error } = await fetch(`http://localhost:5000/${route}`, {
  //     headers: {
  //       Authorization: `Bearer ${session.access_token}`
  //     }
  //   }).then(res => res.json());
  //   if (error) {
  //     console.error(`Error fetching ${route} messages:`, error);
  //   } else {
  //     setMessages(data);
  //   }
  // };

  if (fakeUser == null) return <div>Loading...</div>;



  // --------------------------
  const [query, setQuery] = useState('');
  // const [selectedUserNames, setSelectedUserNames] = useState([]);
  const [allUsers, setAllUsers] = useState([])
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      try {
        const response = await fetch(`http://localhost:3000/users/search?q=${value}`);
        if (response.ok) {
          const data = await response.json();
          setAllUsers(data)
          // Ensure the response data is an array before setting suggestions
          if (Array.isArray(data)) {
            setUsers(data);
          } else {
            setUsers([]);
          }
        } else {
          console.error('Error fetching suggestions:', response.statusText);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setUsers([]);
      }
    } else {
      setUsers([]);
    }
  };

  const handleSuggestionClick = (name) => {
    if (!selectedUserNames.includes(name)) {
      setSelectedUserNames(prev => [...prev, name]);
    }
    setQuery('');
    setUsers([]);
  };
  const handleRemoveEmail = (name) => {
    setSelectedUserNames(selectedUserNames.filter(selected => selected !== name));
  };

  // console.log(all)
  const allUserEmail = allUsers.map(user => user.user_name)
  const all = allUserEmail.map(userName => userName)
  const handleAllUsersSelect = () => {
    setSelectedUserNames(all)
    setAllUsers(allUserEmail)
    setQuery('');
    setUsers([]);
  }


  const openNewMessage = () => {
    setIsOpen(true)
  }
  const isActiveMenu = (id) => {
    localStorage.setItem('activeMessageMenu', JSON.stringify(id))
  }
  return (
    <div className=''>

      <div className='flex flex-col justify-between'>
        <div className="flex gap-4 p-4">
          <div className='flex flex-col gap-4 '>
            {
              navLinks.map((item, index) => (
                <NavLink
                  to={item.link}
                  key={index}
                  onClick={() => {
                    setIsActive(index)
                  }}
                  className={'mix-w-min text-slate-600 font-bold hover:bg-slate-200 px-8 py-3 rounded transition-all duration-500 shadow ' + (isActive == index ? 'bg-slate-200 text-slate-900 font-bold' : '')}
                >
                  <div className='flex gap-3 items-center'>
                    <span className='relative'>{item.icon}
                      {
                        item.msg_length > 0 && <p className='-top-2 -right-2 absolute bg-red-600 p-1 h-5 items-center justify-center flex text-white font-mono w-5 rounded-full'>{item.msg_length}</p>
                      }

                    </span>

                    {item.name}</div>
                </NavLink>
              ))
            }
            <div onClick={openNewMessage} className='mix-w-min text-slate-600 font-bold bg-slate-300 hover:bg-slate-200 px-8 py-3 rounded transition-all duration-500 shadow flex gap-4 items-center fixed bottom-6 cursor-pointer' >
              <FiPlus className='text-2xl' /> <span>New</span>
            </div>
          </div>
          <div className='w-full'>
            <Outlet context={[collapsed]} />
          </div>

          {/* <div className=''>
          <div className={tabIndex == 0 ? 'visible' : 'hidden'}>hello1</div>
          <div className={tabIndex == 1 ? 'visible' : 'hidden'}>hello2</div>
          <div className={tabIndex == 2 ? 'visible' : 'hidden'}>hello3</div>
        </div> */}
        </div>
        {
          isOpen && <div className={`fixed bottom-0 right-0 ${collapsed ? "w-[91.5%] h-[86%]" : "w-[80%] h-[86%]"}`}>
            <div className='h-[80%] w-[50%] absolute bottom-8 right-8 bg-slate-100 border border-[#07B28E]'>
              <div className='flex justify-between bg-[#07B28E] p-2'>
                <span className='text-white'>New Message</span>
                <FiX className='cursor-pointer' onClick={() => setIsOpen(false)} />
              </div>
              <div >
                {/* ---------------------------------------- */}
                <div className="p-2 flex flex-col gap-4">
                  <div className="relative">
                    <div className="flex flex-wrap gap-3 bg-white rounded items-center border p-2 w-full">
                      <label htmlFor="">To :</label>
                      {selectedUserNames?.map((userName, index) => (
                        <div key={index} className="flex items-center bg-gray-200 px-2 py-1 mr-2 mb-2 rounded">
                          <span className="mr-2">{userName}</span>
                          <FiX className="cursor-pointer" onClick={() => handleRemoveEmail(userName)} />
                        </div>
                      ))}

                      <input
                        autoFocus
                        type="text"
                        className="flex-grow p-2 outline-none "
                        value={query}
                        placeholder='Search User'
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      {users.length > 0 && query && (
                        <ul className="absolute bg-white border w-full mt-1 z-10">
                          <li
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleAllUsersSelect()}
                          >
                            <div className="flex items-center">
                              <div className="mr-2 flex gap-4 items-center  ">
                                <span>All</span>

                                {JSON.stringify(all) === JSON.stringify(selectedUserNames) && <div className='rounded-full p-3 border bg-slate-200'>
                                  <FiCheck className='text-xl' />
                                </div>}
                              </div>
                            </div>
                          </li>
                          <div className='overflow-y-scroll h-50 border'>
                            {users.map((user) => (
                              <li
                                key={user.id}
                                className="p-2 flex gap-3 items-center hover:bg-gray-100 cursor-pointer border"
                                onClick={() => handleSuggestionClick(user.user_name)}
                              >
                                <div className="flex flex-col">
                                  <span className="mr-2">{user.user_name}</span>
                                  <span className="text-gray-500">{user.email}</span>
                                </div>
                                {
                                  selectedUserNames.map(name => {
                                    return <div>
                                      {name === user.user_name && <div className='rounded-full p-3 border bg-slate-200'>
                                        <FiCheck className='text-xl' />
                                      </div>}

                                    </div>
                                  })
                                }

                              </li>
                            ))}
                          </div>
                        </ul>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    className='w-full rounded px-4 py-1 mt-'
                  />

                  <textarea
                    rows="8" cols="100"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className='w-full rounded px-4 py-1 overflow-y-scroll'
                  />
                </div>
                {/* ---------------------------------------- */}
                <div className='absolute bottom-3 flex right-3'>
                  <Button onClick={() => {
                    sendMessage('draft');
                    popUpWidget()
                  }} className='p-2 flex gap-2 rounded-l-full items-center ml-2 bg-[#07B28E] py-1 px-3'>
                    <FiSend /> <span>Draft</span>
                  </Button>
                  <Button onClick={() => {
                    sendMessage('sent');
                    popUpWidget()
                  }} className='p-2 flex gap-2 rounded-r-full items-center ml-[1px] bg-[#07B28E] py-1 px-3'>
                    <FiSend /> <span>Send</span>
                  </Button>

                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
export default Notifications

// first click new message alert < AlertDialog >
//             <AlertDialogTrigger>
//               <div className='bg-slate-400 rounded py-1 px-2 flex gap-2 items-center' >
//                 <FiPlus /> <span> New Compose</span>
//               </div>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <div className='flex items-center gap-2 flex-row-reverse justify-between'>
//                 <AlertDialogCancel className='hover:border-red-500  text-red-500 border-red-600 border-[2px] duration-300 hover:bg-red-100'><FiX className='text-xl' /></AlertDialogCancel>
//                 <p className='pl-6'>Create a Message</p>
//               </div>
//               <AlertDialogHeader>
//                 {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   This action .
//                 </AlertDialogDescription> */}
//                 <div>

//                   <CardContent>
//                     <div className='flex flex-col gap-3' >

//                       {/* <div className="relative inline-block text-left" ref={dropdownRef}>
//                         <div>
//                           <span className="rounded-md shadow-sm">
//                             <button
//                               type="button"
//                               className="inline-flex gap-1 items-center justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
//                               id="options-menu"
//                               aria-haspopup="true"
//                               aria-expanded="true"
//                               onClick={toggleDropdown}
//                             >
//                               <div>
//                                 {
//                                   isAllSelected ? "All Selected" : "Select Users"
//                                 }
//                               </div>
//                               <ArrowDown />
//                             </button>
//                           </span>
//                         </div>

//                         {isOpen && (
//                           <div
//                             className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5  overflow-scroll h-56"
//                             role="menu"
//                             aria-orientation="vertical"
//                             aria-labelledby="options-menu"
//                           >
//                             <div className="py-1">
//                               <label className="flex items-center justify-between px-4 py-2 text-sm text-gray-700" >
//                                 <span>All</span>
//                                 <input
//                                   type="checkbox"
//                                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                   onChange={toggleSelectAll}
//                                   checked={isAllSelected}
//                                   ref={(el) => {
//                                     if (el) {
//                                       el.indeterminate = isIndeterminate;
//                                     }
//                                   }}
//                                 />
//                               </label>
//                               {users.map((user, i) => (
//                                 <label
//                                   key={i}
//                                   className="flex items-center justify-between px-4 py-2 text-sm text-gray-700"
//                                 >
//                                   <div className='flex gap-1 items-center  '>

//                                     <span>
//                                       {
//                                         onlineUsers.map((u, i) => (
//                                           <span key={i}>{u.user.user_name === user.user_name ? <FiCircle className='bg-green-700 rounded-full text-green-700' /> : <FiCircle className='bg-slate-700 rounded-full text-slate-700' />}</span>
//                                         ))
//                                       }
//                                     </span>
//                                     <p className='flex items-center'>{user.user_name}</p>
//                                   </div>
//                                   <input
//                                     type="checkbox"
//                                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                                     onChange={() => handleCheckboxChange(user.user_name)}
//                                     checked={selectedUserNames.includes(user.user_name)}
//                                   />
//                                 </label>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div> */}
//                       {/* ---------------------------------------- */}
//                       <div className=" ">
//                         <div className="relative">
//                           <div className="flex flex-wrap gap-3 items-center border p-2 w-full">
//                             <label htmlFor="">To :</label>
//                             {selectedUserNames?.map((userName, index) => (
//                               <div key={index} className="flex items-center bg-gray-200 px-2 py-1 mr-2 mb-2 rounded">
//                                 <span className="mr-2">{userName}</span>
//                                 <FiX className="cursor-pointer" onClick={() => handleRemoveEmail(userName)} />
//                               </div>
//                             ))}

//                             <input
//                               type="text"
//                               className="flex-grow p-2 outline-none"
//                               value={query}
//                               placeholder='Search User'
//                               onChange={handleInputChange}
//                             />
//                           </div>
//                           <div>
//                             {users.length > 0 && query && (
//                               <ul className="absolute bg-white border w-full mt-1 z-10">
//                                 <li
//                                   className="p-2 hover:bg-gray-100 cursor-pointer"
//                                   onClick={() => handleAllUsersSelect()}
//                                 >
//                                   <div className="flex items-center">
//                                     <div className="mr-2 flex gap-4 items-center  ">
//                                       <span>All</span>

//                                       {JSON.stringify(all) === JSON.stringify(selectedUserNames) && <div className='rounded-full p-3 border bg-slate-200'>
//                                         <FiCheck className='text-xl' />
//                                       </div>}
//                                     </div>
//                                   </div>
//                                 </li>
//                                 <div className='overflow-y-scroll h-50 border'>
//                                   {users.map((user) => (
//                                     <li
//                                       key={user.id}
//                                       className="p-2 flex gap-3 items-center hover:bg-gray-100 cursor-pointer border"
//                                       onClick={() => handleSuggestionClick(user.user_name)}
//                                     >
//                                       <div className="flex flex-col">
//                                         <span className="mr-2">{user.user_name}</span>
//                                         <span className="text-gray-500">{user.email}</span>
//                                       </div>
//                                       {
//                                         selectedUserNames.map(name => {
//                                           return <div>
//                                             {name === user.user_name && <div className='rounded-full p-3 border bg-slate-200'>
//                                               <FiCheck className='text-xl' />
//                                             </div>}

//                                           </div>
//                                         })
//                                       }

//                                     </li>
//                                   ))}
//                                 </div>
//                               </ul>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       {/* ---------------------------------------- */}


//                       {/* <select
//                         onChange={handleUserSelect} value={selectedUser}
//                         className='w-full border border-slate-950 rounded px-4 py-1'
//                       >
//                         <option value="" disabled>Select User</option>
//                         {
//                           allUserData.map(user => (
//                             <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
//                           ))
//                         }
//                       </select> */}

//                       <input
//                         type="text"
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                         placeholder="Subject"
//                         className='w-full border border-slate-950 rounded px-4 py-1'
//                       />

//                       <textarea
//                         rows="4" cols="50"
//                         type="text"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         placeholder="Type a message"
//                         className='w-full border border-slate-950 rounded px-4 py-1'
//                       />
//                     </div>



//                     {/* <select onChange={(e) => setStatus(e.target.value)} value={status} className='my-2 rounded border border-slate-950'>
//                       <option value="sent">Send</option>
//                       <option value="draft">Save as Draft</option>
//                     </select>
//                     <br /> */}
//                     {/* <button className='bg-slate-400 rounded px-2' onClick={sendMessage}>{status === 'sent' ? 'Send' : 'Save Draft'}</button> */}
//                   </CardContent>
//                   {/* <CardFooter>
//                     <p>Card Footer</p>
//                   </CardFooter> */}
//                 </div>

//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel className='bg-sky-200 hover:bg-sky-400' onClick={() => sendMessage('draft')}>Draft</AlertDialogCancel>
//                 <AlertDialogAction className='bg-green-500 text-black hover:bg-green-600' onClick={() => sendMessage('sent')}>Send</AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
