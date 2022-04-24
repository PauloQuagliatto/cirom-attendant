import styled from "styled-components";

interface IProps {
  isSelected: boolean;
}

const Container = styled.div<IProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .check-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .check-button {
      width: 1rem;
      height: 1rem;
      margin-right: 1.2rem;

      background-color: ${(props) =>
        props.isSelected ? "var(--blue-300)" : "var(--red-300)"};

      border: 1px solid black;
      border-radius: 50%;
    }
  }

  & + .service-info {
    margin-top: 0.8rem;
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    button {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: white;

      border: 1px solid black;
      border-radius: 3px;

      transition: 0.2s ease;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }
`;

export default Container;
