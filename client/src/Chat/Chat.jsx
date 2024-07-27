import React, { useEffect, useState } from 'react';
import { useSocket } from './SocketContext';
import { useAuthContext } from '@/Supabase/AuthContext';
import { supabase } from '@/Supabase/AuthContext';

const Chat = () => {
  const socket = useSocket();
  const { session, allUserData, messageData } = useAuthContext()
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiverIds, setReceiverIds] = useState('');
  const [status, setStatus] = useState('sent');
  const [selectId, setSelectId] = useState('')
  // console.log(socket)
  useEffect(() => {
    if (socket == null || session == null) return;

    socket.emit('login', session.user.id);

    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off('receiveMessage');
  }, [socket, session]);

  console.log(session?.user.id)
  console.log(messageData)
  const sendMessage = async () => {
    const senderId = session.user.id;
    const receiverIdArray = receiverIds.split(',').map(id => id.trim());
    console.log(receiverIdArray)

    if (status === 'draft') {
      const { data, error } = await supabase
        .from('messages')
        .insert(receiverIdArray.map(receiverId => ({
          sender_id: senderId,
          receiver_id: receiverId,
          subject,
          message,
          status
        })))
        .select()
      console.log(data, error, 'draft')
    } else if (status === 'sent') {

      const { data, error } = await supabase
        .from('messages')
        .insert(receiverIdArray.map(receiverId => ({
          sender_id: senderId,
          receiver_id: receiverId,
          subject,
          message,
          status
        })))
        .select()
      console.log(data, error, 'sent')
    } else {
      socket.emit('sendMessage', { senderId, receiverIds: receiverIdArray, message });
    }

    setMessages((prev) => [...prev, { senderId, message }]);
    setMessage('');
  };

  const fetchMessages = async (route) => {
    const { data, error } = await fetch(`http://localhost:5000/${route}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    }).then(res => res.json());
    if (error) {
      console.error(`Error fetching ${route} messages:`, error);
    } else {
      setMessages(data);
    }
  };

  if (session == null) return <div>Loading...</div>;
  console.log(allUserData)
  return (
    <div>
      <div>
        <button onClick={() => fetchMessages('inbox')}>Inbox</button><br />
        <button onClick={() => fetchMessages('sent')}>Sent</button><br />
        <button onClick={() => fetchMessages('draft')}>Draft</button><br />
      </div>
      <div>
        {messageData.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <br />
      <div className='flex gap-3'>
        <select
          value={receiverIds}
          onChange={(e) => setReceiverIds(e.target.value)}
        >
          <option value="">Select User</option>
          {
            allUserData.map(u => (
              <option key={u.id} value={u.id}>{u.first_name} {u.last_name}</option>
            ))
          }
        </select>


        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="setSubject"
          className='w-full border border-slate-950 rounded'
        />

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className='w-full border border-slate-950 rounded'
        />
      </div>
      <select onChange={(e) => setStatus(e.target.value)} value={status} className='my-2 rounded border border-slate-950'>
        <option value="sent">Send</option>
        <option value="draft">Save as Draft</option>
      </select>
      <br />
      <button className='bg-slate-400 rounded px-2' onClick={sendMessage}>{status === 'sent' ? 'Send' : 'Save Draft'}</button>
    </div>
  );
};

export default Chat;
