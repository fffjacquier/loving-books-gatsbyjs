import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  fieldset {
    display: grid;
    gap: 1rem;
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    label {
      display: grid;
      gap: 1rem;
      align-content: start;
    }
    label + label {
      margin-top: 1rem;
    }
    &.order,
    &.booksList {
      grid-column: span 1;
    }
  }
  legend {
    display: inline;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
  }
  .pate {
    display: none;
  }
  @media (max-width: 900px) {
    fieldset.booksList,
    fieldset.order {
      grid-column: span 2;
    }
  }
`;

export default OrderStyles;
