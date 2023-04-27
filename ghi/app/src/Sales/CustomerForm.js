import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerForm() {

  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/sales/customers');
    const data = {
      first_name,
      last_name,
      phone_number,
      address,
    };


    const customerUrl = 'http://localhost:8090/api/customers/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const customerResponse = await fetch(customerUrl, fetchOptions);
    if (customerResponse.ok) {
      const newcustomer = await customerResponse.json()
      console.log(newcustomer);
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setAddress('')
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

  const handleChangePhoneNumber = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
  }

  const handleChangeAddress = (event) => {
    const value = event.target.value;
    setAddress(value);
  }


    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
        <h1 className="text-center my-4">Add a New Customer</h1>
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
                    <input onChange={handleChangePhoneNumber} value= {phone_number} placeholder="Phone Number" required type="tel" name="phone_number" id="phone_number" className="form-control" />
                    <label htmlFor="phone_number">Phone Number</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={handleChangeAddress} value= {address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                    <label htmlFor="address">Address</label>
                  </div>
                <button className="btn btn-lg btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
    );
  }

export default CustomerForm;
