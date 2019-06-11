import styled from 'styled-components';

const LargeHeader = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.primaryColor};

  @media (min-width: 700px) {
    font-size: 3rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
`;

export default LargeHeader;