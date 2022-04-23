import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #photo-button {
    position: relative;
    bottom: 1.5rem;
    padding: 1.3rem;
    display: flex;

    background-color: var(--blue-300);

    border-radius: 50%;
    cursor: pointer;
  }

  canvas {
    position: fixed;
    z-index: -1;
  }
`;

export default Container;
