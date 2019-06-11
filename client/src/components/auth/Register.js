import React from 'react'
import styled from 'styled-components';

import LargeHeader from '../UI/LargeHeader'
import Title from '../UI/Title';
import Form from '../UI/From';
import Paragraph from '../UI/Paragraph';
import Button from '../UI/Button';

const SubmitButton = styled(Button.Primary)`
  
`;

const Register = () => {
  return (
    <>
      <LargeHeader>Sign Up</LargeHeader>
      <Title><i className="fas fa-user"></i> Create Your Account</Title>
      <Form action="create-profile.html">
        <Form.FormGroup>
          <input type="text" placeholder="Name" name="name" required />
        </Form.FormGroup>
        <Form.FormGroup>
          <input type="email" placeholder="Email Address" name="email" />
          <Form.FormText>
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </Form.FormText>
        </Form.FormGroup>
        <Form.FormGroup>
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </Form.FormGroup>
        <Form.FormGroup>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </Form.FormGroup>
        <SubmitButton as="input" type="submit" value="Register" />
      </Form>
      <Paragraph>
        Already have an account? <a href="login.html">Sign In</a>
      </Paragraph>
    </>
  )
}

export default Register
