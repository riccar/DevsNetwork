import React from 'react';
import styled from 'styled-components';

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

const Btn = styled.a`
  display: inline-block;
  background: ${props => props.theme.lightBgColor};
  color: #333;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
  text-decoration: none;
`;

const BtnPrimary = styled(Btn)`
  background: ${props => props.theme.mainBgColor};
  color: ${props => props.theme.lightBgColor};

`

const Landing = () => {
  return (
    <Section className="landing">
      <Overlay className="dark-overlay">
        <Content className="landing-inner">
          <h1 className="x-large">Developer Network</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <BtnPrimary href="register.html" className="btn btn-primary">Sign Up</BtnPrimary>
            <Btn href="login.html" className="btn btn-light">Login</Btn>
          </div>
        </Content>
      </Overlay>
    </Section>
  )
}

export default Landing
