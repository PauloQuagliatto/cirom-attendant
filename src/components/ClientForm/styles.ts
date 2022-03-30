import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  padding: 0 10% 10% 10%;
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

    cursor: pointer;
  }

  img {
    max-width: 15rem;
    max-height: 15rem;
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
  }
`;

export default Container;
