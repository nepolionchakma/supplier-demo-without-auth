
import { useEffect } from 'react';
import './App.css'
import LayOut from './LayOut'
import { io } from "socket.io-client";
import { useSocket } from './Chat/SocketContext';
import { useAuthContext } from './Supabase/AuthContext';


function App() {
  const socket = useSocket();
  const { fakeUser } = useAuthContext()

  useEffect(() => {
    if (fakeUser[0]?.isLogin === true) {
      socket.emit('login', { user_name: fakeUser[0]?.user_name, email: fakeUser[0]?.email });

    } else return;
  }, [socket, fakeUser]);

  return (
    <div>
      <LayOut />
    </div>
  )
}

export default App

// useEffect(() => {
//   const socket = io("http://localhost:8000");
//   console.log(socket.on('firstEvent', (msg) => {
//     console.log(msg)
//   }))
// }, []);