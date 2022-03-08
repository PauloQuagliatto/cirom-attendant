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
`;

export default Container;
