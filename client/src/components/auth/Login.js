import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { loginUser } from '../../api/users';
import LargeHeader from '../UI/LargeHeader'
import Title from '../UI/Title';
import Form from '../UI/From';
import Paragraph from '../UI/Paragraph';
import Button from '../UI/Button';


const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    const res = await loginUser( {email, password} );
    console.log(res.data);
  };

  return (
    <>
      <LargeHeader>Sign In</LargeHeader>
      <Title><i className="fas fa-user"></i> Sign Into Your Account</Title>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.FormGroup>
          <input type="email" 
            placeholder="Email Address" 
            name="email"
            value={email} 
            onChange={e => onChange(e)} 
          />
          <Form.FormText>
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </Form.FormText>
        </Form.FormGroup>
        <Form.FormGroup>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={e => onChange(e)} 
            minLength="6"
          />
        </Form.FormGroup>
        <Button.Primary as="input" type="submit" value="Login" />
      </Form>
      <Paragraph>
        Don't have an account? <Link to='/register'>Get one here, is free!!!</Link>
      </Paragraph>
    </>
  )
}

export default Login
