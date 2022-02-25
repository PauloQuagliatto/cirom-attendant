import styled from "styled-components";

const Container = styled.form`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-items-container {
    height: 20rem;
    width: 30%;
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: var(--white-300);

    border-radius: 8px;

    .form-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      label {
        margin-right: 0.4rem;
        font-size: 1.2rem;
      }

      input {
        width: 75%;
        padding: 0.4rem;
        font-size: 1.2rem;

        border: none;
        border-radius: 8px;
        &:focus {
          outline: none;
        }
      }

      & + .form-row {
        margin-top: 0.5rem;
      }
    }

    button {
      width: 100%;
      height: 2rem;

      margin-top: 0.5rem;

      color: white;
      background-color: var(--blue-500);

      transition: 0.2s ease filter;
      &:hover {
        filter: brightness(1.3);
      }
    }
  }
`;

export default Container;
