import styled from 'styled-components';

const Paragraph = styled.p`
  margin: ${props => props.margin || '1rem'} 0;
`;

export default Paragraph;