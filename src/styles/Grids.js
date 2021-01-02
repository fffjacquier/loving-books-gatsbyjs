import styled from 'styled-components';

const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
  --columns: 2;
  @media (max-width: 800px) {
    --columns: 1;
  }
`;

export default HomePageGrid;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(var(--columns), minmax(auto, 1fr));
`;

export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    height: auto;
    font-size: 0;
  }
  p {
    position: absolute;
    top: 0;
    transform: rotate(-2deg) translateY(-10px);
    width: 100%;
    left: 0;
    margin: 0;
    font-size: 2rem;
    font-size: clamp(12px, 5vw, 20px);
  }
  .mark {
    display: inline;
  }
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 20px);
    display: inline-block;
  }

  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }

  img.loading {
    --shine: white;
    --bg: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--bg) 0px,
      var(--shine) 40px,
      var(--bg) 80px
    );
    background-size: 450px;
    animation: shine 1s infinite linear;
  }
`;
