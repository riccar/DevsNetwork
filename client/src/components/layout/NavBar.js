import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
      <Link to="/"><i className="fas fa-code"></i> DevNetwork</Link>
    </h1>
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </Nav>
    
  )
}

export default NavBar
