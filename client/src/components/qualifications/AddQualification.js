import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../api/auth';
import './AddQualification.css';

const AddQualification = () => {
  const [form, setForm] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: '',
    success: false,
    error: ''
  });

  const navigate = useNavigate();
  const token = isAuthenticated()?.token;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/qualifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create qualification');

      setForm({
        title: '', firstname: '', lastname: '', email: '',
        completion: '', description: '',
        success: true, error: ''
      });

      setTimeout(() => navigate('/qualifications'), 1000);
    } catch (err) {
      setForm({ ...form, error: err.message });
    }
  };

  return (
    <div className="add-qualification-container">
      <h2>Add Qualification</h2>
      <form className="add-qualification-form" onSubmit={handleSubmit}>
        <input name="title" onChange={handleChange} value={form.title} placeholder="Title" required />
        <input name="firstname" onChange={handleChange} value={form.firstname} placeholder="First Name" required />
        <input name="lastname" onChange={handleChange} value={form.lastname} placeholder="Last Name" required />
        <input name="email" type="email" onChange={handleChange} value={form.email} placeholder="Email" required />
        <input name="completion" type="date" onChange={handleChange} value={form.completion} required />
        <textarea name="description" onChange={handleChange} value={form.description} placeholder="Description" />

        <button type="submit">Submit</button>
      </form>
      {form.success && <p className="success-message">✅ Saved!</p>}
      {form.error && <p className="error-message">{form.error}</p>}
    </div>
  );
};

export default AddQualification;
