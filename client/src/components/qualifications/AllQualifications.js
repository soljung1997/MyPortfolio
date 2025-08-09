import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import './AllQualifications.css';

const AllQualifications = () => {
  const [qualifications, setQualifications] = useState([]);
  const [error, setError] = useState('');
  const token = isAuthenticated()?.token;
  const user = isAuthenticated()?.user;
  const isAdmin = user?.role === 'admin';  // ✅ Admin check
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/qualifications', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setQualifications(data))
      .catch(() => setError('Failed to fetch qualifications'));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this qualification?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/qualifications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to delete');
      setQualifications(qualifications.filter(q => q._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="all-qualifications-container">
      <h2>All Qualifications</h2>

      {isAdmin && (
        <Link to="/qualifications/new" className="add-button">
          ➕ Add Qualification
        </Link>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul className="qualification-list">
        {qualifications.map(q => (
          <li key={q._id} className="qualification-item">
            <h3>{q.title}</h3>
            <p>{q.firstname} {q.lastname}</p>
            <p>{q.email}</p>
            <p>{new Date(q.completion).toLocaleDateString()}</p>
            <p>{q.description}</p>

            {isAdmin && (
              <>
                <button onClick={() => navigate(`/qualifications/edit/${q._id}`)}>Edit</button>
                <button onClick={() => handleDelete(q._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllQualifications;
