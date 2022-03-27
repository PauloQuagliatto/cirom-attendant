import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .bottom-navigation {
    width: 95%;
    padding-left: 1rem;
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default Form;
