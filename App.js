import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AdminDashboard = () => {
  const [filter, setFilter] = useState('all');
  
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', date: '2025-03-10' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', date: '2025-02-15' }
  ]);

  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Mike Johnson', email: 'mike@example.com', status: 'Pending', date: '2025-03-12' },
    { id: 2, name: 'Sarah Lee', email: 'sarah@example.com', status: 'Approved', date: '2025-01-20' }
  ]);

  const toggleStatus = (type, id) => {
    if (type === 'customer') {
      setCustomers(customers.map(user => user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user));
    } else {
      setDrivers(drivers.map(user => user.id === id ? { ...user, status: user.status === 'Pending' ? 'Approved' : 'Pending' } : user));
    }
  };

  const filterData = (data) => {
    const now = new Date();
    return data.filter(user => {
      const userDate = new Date(user.date);
      if (filter === 'day') {
        return userDate.toDateString() === now.toDateString();
      } else if (filter === 'month') {
        return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
      } else if (filter === 'year') {
        return userDate.getFullYear() === now.getFullYear();
      }
      return true;
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      
      <div className="mb-4">
        <label className="font-semibold mr-2">Filter By:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
          <option value="all">All</option>
          <option value="day">Today</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Customers</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterData(customers).map(customer => (
              <tr key={customer.id} className="border">
                <td className="p-2">{customer.name}</td>
                <td className="p-2">{customer.email}</td>
                <td className="p-2">{customer.status}</td>
                <td className="p-2">{customer.date}</td>
                <td className="p-2">
                  <Button onClick={() => toggleStatus('customer', customer.id)}>{customer.status === 'Active' ? 'Deactivate' : 'Activate'}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-2">Drivers</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterData(drivers).map(driver => (
              <tr key={driver.id} className="border">
                <td className="p-2">{driver.name}</td>
                <td className="p-2">{driver.email}</td>
                <td className="p-2">{driver.status}</td>
                <td className="p-2">{driver.date}</td>
                <td className="p-2">
                  <Button onClick={() => toggleStatus('driver', driver.id)}>{driver.status === 'Pending' ? 'Approve' : 'Revoke'}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-purple-600">Wedding Car Booking</h1>
        </header>

        <div className="flex justify-center gap-4 mb-6">
          <Link to="/admin">
            <Button className="px-6 py-3 text-lg">Admin Dashboard</Button>
          </Link>
        </div>

        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
