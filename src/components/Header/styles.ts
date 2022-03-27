import styled from "styled-components";

const Container = styled.div`
  padding: 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: var(--blue-500);

  h1 {
    color: white;
  }

  button {
    padding: 0.8rem;

    color: white;
    background-color: var(--red-300);

    transition: 0.2s ease;
    &:hover {
      background-color: var(--red-500);
    }
  }
`;

export default Container;
