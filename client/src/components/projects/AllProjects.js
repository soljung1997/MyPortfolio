import React, { useEffect, useMemo, useState } from 'react';
import { isAuthenticated } from '../../api/auth';
import './AllProjects.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000'; // change to your deployed API later

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [q, setQ]               = useState('');

  const token = isAuthenticated()?.token;
  const user  = isAuthenticated()?.user;
  const isAdmin = user?.role === 'admin';

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/projects`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal
        });
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [token]);

  const filtered = useMemo(() => {
    if (!q.trim()) return projects;
    const k = q.toLowerCase();
    return projects.filter(p =>
      [p.title, p.description, p.link]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(k))
    );
  }, [q, projects]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this project?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to delete');
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  };

  return (
    <div className="projects-wrap">
      <div className="projects-header">
        <div>
          <h2 className="projects-title">All Projects</h2>
          <p className="projects-sub">
            {loading ? 'Loading…' : `${filtered.length} project${filtered.length === 1 ? '' : 's'}`}
          </p>
        </div>

        <div className="projects-actions">
          <input
            aria-label="Search projects"
            className="projects-search"
            type="search"
            placeholder="Search by title, description, or link…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          {isAdmin && (
            <button
              className="btn btn-add"
              onClick={() => navigate('/projects/new')}
            >
              ➕ Add Project
            </button>
          )}
        </div>
      </div>

      {error && <div className="alert">{error}</div>}

      {loading ? (
        <div className="grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card skeleton" aria-hidden="true" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          <p>No projects found.</p>
          {isAdmin && (
            <button className="btn btn-add" onClick={() => navigate('/projects/new')}>
              Add your first project
            </button>
          )}
        </div>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <article key={p._id} className="card">
              <header className="card-header">
                <h3 className="card-title">{p.title}</h3>
                {p.tag && <span className="badge">{p.tag}</span>}
              </header>

              <p className="card-desc">
                {p.description || 'No description provided.'}
              </p>

              <div className="card-links">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    aria-label={`Open live link for ${p.title}`}
                  >
                    Live Link
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    aria-label={`Open repository for ${p.title}`}
                  >
                    GitHub
                  </a>
                )}
              </div>

              {isAdmin && (
                <div className="card-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => navigate(`/projects/edit/${p._id}`)}
                    aria-label={`Edit ${p.title}`}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(p._id)}
                    aria-label={`Delete ${p.title}`}
                  >
                    Delete
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProjects;
