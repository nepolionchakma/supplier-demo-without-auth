import { io } from "socket.io-client";

useEffect(() => {
  const socket = io("http://localhost:8000");
}, []);
