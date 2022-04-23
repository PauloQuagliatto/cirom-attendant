import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  label {
    width: 20%;
    font-size: 1.2rem;

    margin-right: 0.5rem;
  }

  input {
    width: 80%;
    font-size: 1.2rem;

    border: none;
    border-bottom: 1px solid black;

    &:focus {
      outline: none;
    }
  }

  .no-background-change {
    &:hover {
      background-color: white;
      color: black;
    }
  }
`;

export default Container;
