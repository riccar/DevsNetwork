import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.div`
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

const Primary = styled(Button)`
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.lightBgColor};
`

Button.Primary = Primary;

export default Button;
