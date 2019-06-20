import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../api/users';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

import LargeHeader from '../UI/LargeHeader'
import Title from '../UI/Title';
import Form from '../UI/From';
import Paragraph from '../UI/Paragraph';
import Button from '../UI/Button';


const Register = ({ setAlert }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match', 'danger', 5000);
    } else {
      const res = await registerUser( {name, email, password} );
      console.log(res.data);
    }
  };

  return (
    <>
      <LargeHeader>Sign Up</LargeHeader>
      <Title><i className="fas fa-user"></i> Create Your Account</Title>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.FormGroup>
          <input type="text" 
            placeholder="Name" 
            name="name" 
            value={name} 
            onChange={e => onChange(e)} 
            required 
          />
        </Form.FormGroup>
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
        <Form.FormGroup>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} 
            onChange={e => onChange(e)} 
            minLength="6"
          />
        </Form.FormGroup>
        <Button.Primary as="input" type="submit" value="Register" />
      </Form>
      <Paragraph>
        Already have an account? <Link to="/login">Sign In</Link>
      </Paragraph>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null, 
  { setAlert }
)(Register);
