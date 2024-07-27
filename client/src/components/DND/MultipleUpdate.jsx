import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-anon-key'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

const EmployeeUpdateForm = () => {
  const [employees, setEmployees] = useState([
    { employee_id: 1, employee_name: '', job_title: '', email: '', department_id: '' },
    { employee_id: 2, employee_name: '', job_title: '', email: '', department_id: '' },
    { employee_id: 3, employee_name: '', job_title: '', email: '', department_id: '' },
    { employee_id: 4, employee_name: '', job_title: '', email: '', department_id: '' },
    { employee_id: 5, employee_name: '', job_title: '', email: '', department_id: '' },
  ]);

  const handleChange = (index, field, value) => {
    const newEmployees = [...employees];
    newEmployees[index][field] = value;
    setEmployees(newEmployees);
  };

  const updateEmployees = async () => {
    const updates = employees.map((update) => {
      return supabase
        .from('employees') // Replace 'employees' with your table name
        .update({
          employee_name: update.employee_name,
          job_title: update.job_title,
          email: update.email,
          department_id: update.department_id,
        })
        .eq('employee_id', update.employee_id);
    });

    try {
      const results = await Promise.all(updates);
      results.forEach((result, index) => {
        if (result.error) {
          console.error(`Error updating employee with ID ${employees[index].employee_id}:`, result.error);
        } else {
          console.log(`Successfully updated employee with ID ${employees[index].employee_id}`);
        }
      });
    } catch (error) {
      console.error('Error updating employees:', error);
    }
  };

  return (
    <div>
      {employees.map((employee, index) => (
        <div key={employee.employee_id}>
          <input
            type="text"
            placeholder="Employee Name"
            value={employee.employee_name}
            onChange={(e) => handleChange(index, 'employee_name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Job Title"
            value={employee.job_title}
            onChange={(e) => handleChange(index, 'job_title', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={employee.email}
            onChange={(e) => handleChange(index, 'email', e.target.value)}
          />
          <input
            type="number"
            placeholder="Department ID"
            value={employee.department_id}
            onChange={(e) => handleChange(index, 'department_id', e.target.value)}
          />
        </div>
      ))}
      <button onClick={updateEmployees}>Update Employees</button>
    </div>
  );
};

export default EmployeeUpdateForm;
