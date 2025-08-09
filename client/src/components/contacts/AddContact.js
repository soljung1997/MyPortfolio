// contacts/AddContact.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../api/auth';
import './Contact.css';

const AddContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    message: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = isAuthenticated()?.token;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add contact');

      navigate('/contacts');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="edit-contact-form">
      <h2>Add New Contact</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Phone Number" />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
