import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeForm() {

  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [employee_id, setEmployeeId] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/sales/employees');
    const data = {
      first_name,
      last_name,
      employee_id,
    };

    const employeeUrl = 'http://localhost:8090/api/salespeople/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const customerResponse = await fetch(employeeUrl, fetchOptions);
    if (customerResponse.ok) {
      const newcustomer = await customerResponse.json()
      console.log(newcustomer);
      setFirstName('');
      setLastName('');
      setEmployeeId('');
    }
  }

  const handleChangeFirstName = (event) => {
    const value = event.target.value;
    setFirstName(value);
  }

  const handleChangeLastName = (event) => {
    const value = event.target.value;
    setLastName(value);
  }

  const handleChangeEmployeeId = (event) => {
    const value = event.target.value;
    setEmployeeId(value);
  }


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a New Customer</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">
                  <div className="form-floating mb-3">
                    <input onChange={handleChangeFirstName} value= {first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
                    <label htmlFor="first_name">First Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleChangeLastName} value= {last_name} placeholder="Last Name" required type="text" name="style_name" id="last_name" className="form-control" />
                    <label htmlFor="last_name">Last Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleChangeEmployeeId} value= {employee_id} placeholder="Emplyee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
                    <label htmlFor="employee_id">Employee ID</label>
                  </div>
                <button className="btn btn-lg btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
    );
  }

export default EmployeeForm;
