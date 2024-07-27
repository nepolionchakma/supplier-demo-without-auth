import { useSocket } from "@/Chat/SocketContext";
import { useAuthContext } from "@/Supabase/AuthContext"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { useEffect, useRef, useState } from "react";
import { FiCheck, FiFolderPlus, FiSend, FiTrash, FiX } from "react-icons/fi";
import { Button } from "../ui/button";
import { useOutletContext } from "react-router-dom";
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
} from "@/components/ui/alert-dialog"

function Draft() {
  const [collapsed] = useOutletContext();

  const { handleMessageDelete } = useLocalApi()
  const { session, tosifySuccess, fakeUser, draftMessageData } = useAuthContext()
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const myMessages = draftMessageData.filter(user => user.sender_name === fakeUser[0].user_name)
  const [users, setUsers] = useState([])
  const [selectedUserNames, setSelectedUserNames] = useState([]);
  const [query, setQuery] = useState('');
  const [allUsers, setAllUsers] = useState([])

  // --------------------------------------
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [messages, setMessages] = useState([]);
  // --------------------------------------

  const [onlineUsers, setOnlineUsers] = useState([])


  useEffect(() => {
    const users = async () => {
      const res = await fetch("http://127.0.0.1:3000/users")
      const data = await res.json()
      setUsers(data)
    }
    users()
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

      socket.on("onlineUsers", (onlineUsers) => {
        setOnlineUsers(prev => [...prev, onlineUsers])
      })

      socket.on('receiveMessage', (message) => {
        setMessages((prev) => [...prev, message]);
        console.log(message)
      });

      return () => socket.off('receiveMessage');
    } else return;
  }, [socket, session]);

  const [id, setId] = useState()

  const handleEditMessage = async (id) => {
    setIsLoading(true)
    const res = await fetch(`http://127.0.0.1:3000/messages/${id}`)
    const data = await res.json()
    console.log(data)
    setMessage(data[0].message)
    setSubject(data[0].subject)
    selectedUserNames.push(data[0].receiver_name)
    setIsLoading(false)
  }
  const emptyAllField = () => {
    setMessage('')
    setSubject('')
    setSelectedUserNames([])
  }
  useEffect(() => {
    socket.on("getNotification", data => {
      console.log(data)
    })
  }, [socket])

  const sendMessage = async (info) => {
    const senderName = fakeUser[0]?.user_name;
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
    setMessages((prev) => [...prev, { sender_name: senderName, subject, message }]);
    setSelectedUserNames([])
    setMessage('');
    setSubject('');
  };
  if (fakeUser == null) return <div>Loading...</div>;

  // --------------------------

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
  const tableRef = useRef(null);
  const openNewMessage = () => {
    setIsOpen(true)
  }
  const popUpWidget = (info) => {
    setIsOpen(info)
  }
  return (
    <div className="border ">
      {/* <h2 className="font-bold ml-9 mt-8">Draft</h2> */}
      <div>
        <Table className='border-0 m-5 w-[95%]'>
          <TableCaption> </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">To</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myMessages.map((m, i) => (
              <TableRow key={i} onClick={() => {
                openNewMessage();
                setId(m.id)
                handleEditMessage(m.id)
              }}
                className="cursor-pointer">
                <TableCell>{m.receiver_name}</TableCell>
                <TableCell>{m.subject}</TableCell>
                <TableCell>{m.message}</TableCell>
                <TableCell className="text-right">
                  <span>{format(new Date(m.created_at), 'dd-mm-yyy')}</span>
                  <br />
                  <span>{format(new Date(m.created_at), 'hh:mm:ss a')}</span>
                </TableCell>
                <TableCell className="text-right cursor-pointer" onClick={(e) => e.stopPropagation()}>

                  <AlertDialog >
                    <AlertDialogTrigger ><FiTrash className="text-red-700" /></AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleMessageDelete(m.id, "delete")}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        {
          isOpen && <div className={`fixed bottom-0 right-0 ${collapsed ? "w-[91.5%] h-[86%]" : "w-[80%] h-[86%]"}`}>
            <div className='h-[80%] w-[50%] absolute bottom-8 right-8 bg-slate-100 border border-[#07B28E]'>
              <div className='flex justify-between bg-[#07B28E] p-2'>
                <span className='text-white'>New Message</span>
                <FiX className='cursor-pointer' onClick={() => {
                  setIsOpen(false);
                  emptyAllField()
                }} />
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
                        type="text"
                        className="flex-grow p-2 outline-none"
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
                    popUpWidget(false)
                  }} className='p-2 flex gap-2 rounded-l-full items-center ml-2 bg-[#07B28E] py-1 px-3'>
                    <FiFolderPlus /> <span>Draft</span>
                  </Button>
                  <Button onClick={() => {
                    sendMessage('sent');
                    popUpWidget(false)
                    handleMessageDelete(id, "draft")
                  }} className='p-2 flex gap-2 rounded-r-full items-center ml-[1px] bg-[#07B28E] py-1 px-3'>
                    <FiSend /> <span>Send</span>
                  </Button>

                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div >
  )
}
export default Draft
