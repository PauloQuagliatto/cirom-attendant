import styled from "styled-components";

const Container = styled.div`
  margin: 1.6rem;

  label {
    margin-right: 0.8rem;

    font-size: 1.2rem;
  }

  input {
    width: 80%;
    margin-bottom: 5rem;

    font-size: 1.2rem;

    border: none;
    border-bottom: 1px solid black;

    &:focus {
      outline: none;
    }
  }

  h3 {
    font-size: 1.6rem;
  }
  .dentists-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .dentist-info {
      width: 80%;
      padding: 1.3rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      background-color: var(--white-300);

      border-radius: 8px;

      cursor: pointer;

      transition: 0.2s ease;
      &:hover {
        background-color: var(--blue-300);
        color: white;
      }

      & + .dentist-info {
        margin-top: 1rem;
      }
    }
  }
`;

export default Container;
