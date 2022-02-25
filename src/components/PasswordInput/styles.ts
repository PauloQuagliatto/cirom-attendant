import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  border-radius: 8px;

  input {
    width: 80%;
    padding: 0.4rem;
    font-size: 1.2rem;
    border: none;

    &:focus {
      outline: none;
    }
  }

  .button {
    display: flex;
    justify-content: center;
    margin: 0.4rem;
    cursor: pointer;
  }
`;

export default Container;
