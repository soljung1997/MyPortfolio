import React, { useState } from 'react';
import { signin, authenticate } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    const res = await signin({
      email: values.email,
      password: values.password
    });

    if (res.error) {
      setValues({ ...values, error: res.error });
    } else {
      authenticate(res, () => {
        setValues({ ...values, redirectToReferrer: true });
        navigate('/dashboard'); // replace with your desired route
      });
    }
  };

  return (
    <div className="auth-container">
      <h2>Signin</h2>
      <form>
        <input type="email" onChange={handleChange('email')} value={values.email} placeholder="Email" />
        <input type="password" onChange={handleChange('password')} value={values.password} placeholder="Password" />
        <button onClick={clickSubmit}>Submit</button>
      </form>
      {values.error && <div className="error-message">{values.error}</div>}
    </div>
  );
};

export default Signin;
