import React, { useEffect, useState } from 'react';
import { FiCheck, FiCheckCircle, FiX } from 'react-icons/fi';

function Noti2() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [allUsers, setAllUsers] = useState([])
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      try {
        const response = await fetch(`http://localhost:3000/search?q=${value}`);
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

  const handleSuggestionClick = (email) => {
    if (!selectedEmails.includes(email)) {
      setSelectedEmails(prev => [...prev, email]);
    }
    setQuery('');
    setUsers([]);
  };
  const handleRemoveEmail = (email) => {
    setSelectedEmails(selectedEmails.filter(selected => selected !== email));
  };

  // console.log(all)
  const allUserEmail = allUsers.map(user => user.email)
  const all = allUserEmail.map(email => email)
  const handleAllUsersSelect = () => {
    setSelectedEmails(all)
    setAllUsers(allUserEmail)
    setQuery('');
    setUsers([]);
  }
  console.log(all, 'all')
  console.log(allUserEmail, 'allemail')

  return (
    <div className="p-4">
      <div className="relative">
        <div className="flex flex-wrap gap-3 items-center border p-2 w-full">
          <label htmlFor="">To :</label>
          {selectedEmails.map((email, index) => (
            <div key={index} className="flex items-center bg-gray-200 px-2 py-1 mr-2 mb-2 rounded">
              <span className="mr-2">{email}</span>
              <FiX className="cursor-pointer" onClick={() => handleRemoveEmail(email)} />
            </div>
          ))}

          <input
            type="text"
            className="flex-grow p-2 outline-none"
            value={query}
            onChange={handleInputChange}
          />
        </div>
        {users.length > 0 && (
          <ul className="absolute bg-white border w-full mt-1 z-10">
            <li
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAllUsersSelect()}
            >
              <div className="flex items-center">
                <div className="mr-2 flex gap-4 items-center  ">
                  <span>All</span>

                  {JSON.stringify(all) === JSON.stringify(selectedEmails) && <div className='rounded-full p-3 border bg-slate-200'>
                    <FiCheck className='text-xl' />
                  </div>}
                </div>
              </div>
            </li>
            {users.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 flex gap-3 items-center hover:bg-gray-100 cursor-pointer border"
                onClick={() => handleSuggestionClick(suggestion.email)}
              >
                <div className="flex flex-col">
                  <span className="mr-2">{suggestion.name}</span>
                  <span className="text-gray-500">{suggestion.email}</span>
                </div>
                {
                  selectedEmails.map(email => {
                    return <div>
                      {email === suggestion.email && <div className='rounded-full p-3 border bg-slate-200'>
                        <FiCheck className='text-xl' />
                      </div>}

                    </div>
                  })
                }

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Noti2;
