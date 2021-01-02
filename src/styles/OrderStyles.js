import styled from 'styled-components';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: flex;
    flex-direction: column
    gap: 1rem;
    align-content: start;
    &.order,
    &.booksList {
      grid-column: span 1;
    }
  }
  legend {
    display: inline;
    padding: 0 0.5rem;
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
