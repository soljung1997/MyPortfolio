import React, { useState } from 'react';
import './AddProject.css';


const AddProject = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    link: '',
    success: false,
    error: ''
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem('jwt'))?.token;

    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: project.title,
          description: project.description,
          link: project.link
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create project');

      setProject({ title: '', description: '', link: '', success: true, error: '' });
    } catch (err) {
      setProject({ ...project, error: err.message, success: false });
    }
  };

  return (
    <div className="add-project-container">
      <h2>Add New Project</h2>
      <form className="add-project-form" onSubmit={handleSubmit}>
        <input name="title" value={project.title} onChange={handleChange} placeholder="Project Title" required />
        <input name="description" value={project.description} onChange={handleChange} placeholder="Description" required />
        <input name="link" value={project.link} onChange={handleChange} placeholder="Live Link (optional)" />
        <button type="submit">Add Project</button>
      </form>

      {project.success && <p className="success-message">✅ Project added!</p>}
      {project.error && <p className="error-message">{project.error}</p>}
    </div>
  );

};

export default AddProject;
