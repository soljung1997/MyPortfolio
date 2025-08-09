import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../api/auth';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const token = isAuthenticated()?.token;

  const [form, setForm] = useState({
    title: '',
    description: '',
    link: '',
    error: '',
    success: false
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title,
          description: data.description,
          link: data.link || '',
          error: '',
          success: false
        });
      })
      .catch(() => setForm({ ...form, error: 'Failed to load project' }));
  }, [projectId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          link: form.link
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');

      setForm({ ...form, success: true });
      setTimeout(() => navigate('/projects'), 1000);
    } catch (err) {
      setForm({ ...form, error: err.message });
    }
  };

  return (
    <div className="add-project-container">
      <h2>Edit Project</h2>
      <form className="add-project-form" onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Project Title" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Live Link (optional)" />
        <button type="submit">Update</button>
      </form>
      {form.success && <p className="success-message">✅ Project updated!</p>}
      {form.error && <p className="error-message">{form.error}</p>}
    </div>
  );
};

export default EditProject;
