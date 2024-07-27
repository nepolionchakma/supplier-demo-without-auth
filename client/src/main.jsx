import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Supabase/AuthContext.jsx'
import { LocalContextProvider } from './Supabase/localApiContext.jsx'
import { SocketProvider } from './Chat/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <AuthContextProvider>
      <LocalContextProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </LocalContextProvider>
    </AuthContextProvider>
  </>,
)
