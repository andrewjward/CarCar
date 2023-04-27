import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SaleForm() {

  const navigate = useNavigate();
  const [automobile, setAutomobile] = useState([]);
  const [automobiles, setAutomobiles] = useState([]);
  const [sales_people, setSalesPeople] = useState([]);
  const [sales_person, setSalesPerson] = useState([]);
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState('');
  const [price, setPrice] = useState(0)

  const fetchAutoData = async () => {
    const automobilesurl = `http://localhost:8100/api/automobiles/`;
    const response = await fetch(automobilesurl);
    if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos);
    }
  }

  const fetchEmployeeData = async () => {
    const customersurl = `http://localhost:8090/api/salespeople/`;
    const response = await fetch(customersurl);
    if (response.ok) {
        const data = await response.json();
        setSalesPeople(data.people);
    }
  }

  const fetchCustomerData = async () => {
    const customersurl = `http://localhost:8090/api/customers/`;
    const response = await fetch(customersurl);
    if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers);
    }
  }

  useEffect(() => {
    fetchAutoData();
    fetchEmployeeData();
    fetchCustomerData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate('/sales/sales');
    const data = {
      automobile,
      sales_person,
      customer,
      price,
    };
    const salesUrl = `http://localhost:8090/api/sales/`;
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const saleResponse = await fetch(salesUrl, fetchOptions);
    if (saleResponse.ok) {
      const newsale = await saleResponse.json()
      console.log(newsale);
      setAutomobile('');
      setSalesPerson('');
      setCustomer('');
      setPrice('')
    }
  }


const handleChangeAutomobile = (event) => {
    const value = event.target.value;
    setAutomobile(value);
}

const handleChangeSalesPerson = (event) => {
    const value = event.target.value;
    setSalesPerson(value);
}

const handleChangeCustomer = (event) => {
    const value = event.target.value;
    setCustomer(value);
}

const handleChangePrice = (event) => {
  const value = event.target.value;
  setPrice(value);
}


    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a Sale</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">
                  <div className="mb-3">
                      <select onChange={handleChangeAutomobile} value= {automobile} name="automobile" id="automobile" className='form-select' required>
                        <option value=''>Choose Automobile</option>
                        {automobiles.map(auto => {
                          return (
                            <option key={auto.href} value={auto.id}>{auto.vin}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="mb-3">
                      <select onChange={handleChangeSalesPerson} value= {sales_person} name="employee" id="employee" className='form-select' required>
                        <option value=''>Choose Sales Person</option>
                        {sales_people.map(employee => {
                          return (
                            <option key={employee.id} value={employee.id}>{employee.first_name} {employee.last_name} Emp. ID #{employee.employee_id}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="mb-3">
                      <select onChange={handleChangeCustomer} value= {customer} name="customer" id="customer" className='form-select' required>
                        <option value=''>Choose Customer</option>
                        {customers.map(customer => {
                          return (
                            <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name} ID #{customer.id}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChangePrice} value= {price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                        <label htmlFor="price">Price</label>
                    </div>
                <button className="btn btn-lg btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
    );
  }

export default SaleForm;
