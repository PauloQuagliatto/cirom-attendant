import styled from "styled-components";

const Form = styled.form`
  overflow: auto;
  width: 100%;
  height: 700px;
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .bottom-navigation {
    width: 95%;
    margin-top: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default Form;
