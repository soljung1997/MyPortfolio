// src/components/qualifications/EditQualification.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../api/auth';
import './EditQualification.css';

const EditQualification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = isAuthenticated()?.token;

  const [form, setForm] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: '',
    error: '',
    success: false
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/qualifications/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setForm({ ...data, success: false, error: '' }))
      .catch(() => setForm({ ...form, error: 'Failed to load data' }));
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/qualifications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Failed to update');
      setForm({ ...form, success: true });
      setTimeout(() => navigate('/qualifications'), 1000);
    } catch (err) {
      setForm({ ...form, error: err.message });
    }
  };

  return (
    <div className="edit-qualification-container">
      <h2>Edit Qualification</h2>
      <form onSubmit={handleSubmit} className="edit-qualification-form">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="firstname" value={form.firstname} onChange={handleChange} placeholder="First Name" required />
        <input name="lastname" value={form.lastname} onChange={handleChange} placeholder="Last Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="completion" type="date" value={form.completion?.slice(0,10)} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <button type="submit">Update</button>
      </form>
      {form.success && <p className="success-message">Updated successfully</p>}
      {form.error && <p className="error-message">{form.error}</p>}
    </div>
  );
};

export default EditQualification;