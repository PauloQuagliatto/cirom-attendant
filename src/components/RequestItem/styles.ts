import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;

  .wrapper {
    padding: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-radius: 8px;

    .service-status {
      width: 1.8rem;
      height: 1.8rem;

      border-radius: 50%;

      background-color: var(--red-300);
    }
  }
`;

export default Container;
