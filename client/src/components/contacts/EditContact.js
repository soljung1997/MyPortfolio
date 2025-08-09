// contacts/EditContact.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../api/auth';
import './Contact.css';

const EditContact = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = isAuthenticated()?.token;

  useEffect(() => {
    fetch(`http://localhost:5000/api/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(() => setError('Failed to fetch contact'));
  }, [id, token]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error('Failed to update contact');
      navigate('/contacts');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="edit-contact-form">
      <h2>Edit Contact</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={contact.firstName || ''}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={contact.lastName || ''}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={contact.email || ''}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="contactNumber"
          value={contact.contactNumber || ''}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <textarea
          name="message"
          value={contact.message || ''}
          onChange={handleChange}
          placeholder="Message"
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditContact;
