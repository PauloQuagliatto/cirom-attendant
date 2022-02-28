import styled from "styled-components";

const Container = styled.div`
  padding: 0.8rem;

  .dashboard-wrapper {
    margin: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    button {
      padding: 0.4rem;
      display: flex;
      align-items: center;

      color: white;

      background-color: var(--blue-300);

      transition: 0.2s ease;
      &:hover {
        filter: brightness(1.2);
      }
    }
  }
`;

export default Container;
