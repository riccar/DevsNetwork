import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../UI/Button';

const Section = styled.section`
  position: relative;
  background: url('/images/landing.jpg') no-repeat center center/cover;
  height: 100vh;
  
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  color: #fff;
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  & h1 {
    font-size: ${props => props.theme.xLargeFont};
  }

  & p {
    font-size: ${props => props.theme.largeFont};
    font-weight: 900;
    padding: 1rem;
  }
`;

const Landing = () => {
  return (
    <Section>
      <Overlay>
        <Content>
          <h1>Developer Network</h1>
          <p>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div>
            <Button.Primary as={Link} to="/register">Sign Up</Button.Primary>
            <Button as={Link} to="/login">Login</Button>
          </div>
        </Content>
      </Overlay>
    </Section>
  )
}

export default Landing
