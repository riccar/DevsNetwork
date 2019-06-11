import styled from 'styled-components';

const Form = styled.form`
  & form-group {
    margin: 1.2rem 0;
  }
  & input[type='text'],
  & input[type='email'],
  & input[type='password'],
  & input[type='date'],
  & select,
  & textarea {
    display: block;
    width: 100%;
    padding: 0.4rem;
    font-size: 1.2rem;
    border: 1px solid #ccc;
  }
`;

const FormGroup =styled.div`
  margin: 1.2rem 0;
`;

const FormText = styled.small`
  display: block;
  margin-top: 0.3rem;
  color: #888;
`;

Form.FormText = FormText;
Form.FormGroup = FormGroup;

export default Form;