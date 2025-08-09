import React, { useState } from 'react';
import { signup } from '../../api/auth';
import './AuthForm.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  });

  

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    const res = await signup({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    console.log(res);

    if (res.error) {
      setValues({ ...values, error: res.error, success: false });
    } else {
      setValues({
        name: '',
        email: '',
        password: '',
        error: '',
        success: true
      });
    }


  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form>
        <input type="text" onChange={handleChange('name')} value={values.name} placeholder="Name" />
        <input type="email" onChange={handleChange('email')} value={values.email} placeholder="Email" />
        <input type="password" onChange={handleChange('password')} value={values.password} placeholder="Password" />
        <button onClick={clickSubmit}>Submit</button>
      </form>
      {values.success && <div>Signup successful. Please Sign in.</div>}
      {values.error && <div className="error-message">{values.error}</div>}
    </div>
  );
};



export default Signup;
