import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .no-image {
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--white-300);

    border-radius: 50%;
  }
`;

export default Container;
