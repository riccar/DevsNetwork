import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.darkBgColor};
  opacity: 0.9;

  & a {
    color: ${props => props.theme.homeFontColor};
    text-decoration: none;
    padding: 0.45rem;
  }

  & ul {
    display: flex;
    text-align: center;
    justify-content: center;
    list-style: none;
  }
`;

const NavBar = () => {
  return (
     
  <Nav>
    <h1>
      <a href="index.html"><i className="fas fa-code"></i> DevNetwork</a>
    </h1>
    <ul>
      <li><a href="profiles.html">Developers</a></li>
      <li><a href="register.html">Register</a></li>
      <li><a href="login.html">Login</a></li>
    </ul>
  </Nav>
    
  )
}

export default NavBar
