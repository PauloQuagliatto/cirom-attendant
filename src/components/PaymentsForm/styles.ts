import styled from "styled-components";

interface IProps {
  isSelected: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button[type="submit"] {
    padding: 0 1.5rem;
    height: 1.5rem;
    background: var(--green-300);

    transition: 0.2s ease;
    &:hover {
      filter: brightness(0.6);
    }
  }
`;

const PaymentInfo = styled.div<IProps>`
  width: 17rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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

  & + .payment-info {
    margin-top: 0.8rem;
  }
`;

export { Container, PaymentInfo };
