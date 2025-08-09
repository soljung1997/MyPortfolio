import React, { useEffect, useState } from 'react';
import './Contact.css';
import { isAuthenticated } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');
  const token = isAuthenticated()?.token;
  const user = isAuthenticated()?.user;
  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

    useEffect(() => {
    fetch('http://localhost:5000/api/contacts', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(() => setError('Failed to fetch contacts'));
    }, [token]);


  return (
    <div className="contact-list-page">
      <h1>All Contacts</h1>
      {error && <p className="error-message">{error}</p>}

      {isAdmin && (
        <button
          type="button"
          className="add-contact-button"
          onClick={() => navigate('/contacts/add')}
        >
          ➕ Add Contact
        </button>
      )}

      <ul className="contact-list">
        {Array.isArray(contacts) && contacts.map((contact) => (
          <li key={contact._id} className="contact-card">
            <h3>{contact.firstName} {contact.lastName}</h3>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.contactNumber}</p>
            <p><strong>Message:</strong> {contact.message}</p>

            {isAdmin && (
              <div className="admin-actions">
                <button
                  type="button"
                  onClick={() => navigate(`/contacts/edit/${contact._id}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
                    if (!confirmDelete) return;
                    try {
                      const res = await fetch(`http://localhost:5000/api/contacts/${contact._id}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      if (!res.ok) throw new Error('Failed to delete contact');
                      setContacts(contacts.filter(c => c._id !== contact._id));
                    } catch (err) {
                      alert('Error deleting contact: ' + err.message);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contact;
