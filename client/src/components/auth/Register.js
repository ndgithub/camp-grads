import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  // Hooks so we don't need to create a class to hold state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('passwords don\'t match')
    } else {
      const newUser = {
        name,
        email,
        password
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post('api/users', body, config);
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
      console.log(formData)
    }
  }

  return <>
    <h1 class="large text-primary">Sign Up</h1>
    <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
    <form class="form" action="create-profile.html" onSubmit={(e) => onSubmit(e)}>
      <div class="form-group">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          required />
      </div>
      <div class="form-group">
        <input type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => onChange(e)} />
        <small class="form-text"
        >This site uses Gravatar so if you want a profile image, use a
          Gravatar email</small
        >
      </div>
      <div class="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          minLength="6"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={(e) => onChange(e)}
          minLength="6"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Register" />
    </form>
    <p class="my-1">
      Already have an account? <a href="login.html">Sign In</a>
    </p>
  </>
}

export default Register
