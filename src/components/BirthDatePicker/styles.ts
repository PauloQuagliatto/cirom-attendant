import styled from "styled-components";

const Container = styled.div`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  label {
    font-size: 1.2rem;
    margin: 0 0.8rem;
  }

  input {
    font-size: 1.2rem;
    border: none;
    border-bottom: 1px solid black;

    &:focus {
      outline: none;
    }
  }
`;

export default Container;
