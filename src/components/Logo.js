import React from 'react';
import styled from 'styled-components';
import stripes from '../assets/images/stripes.svg';

const LogoStyles = styled.div`
  /* This value controls the entire size of the logo*/
  font-size: 6px;
  font-size: clamp(1px, 0.65vw, 8px);
  width: 30em;
  height: 30em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin: 0;
  --borderSize: 1em;
  background: white url(${stripes});
  background-size: 150em;
  border: var(--borderSize) solid white;
  display: flex;
  .inner {
    margin: var(--borderSize);
    flex: 1;
    background: white;
    display: grid;
    grid-template-rows: 20% 1fr 1fr;
    align-content: center;
  }
  .est {
    font-size: 1.5em;
    align-self: center;
    color: #e60000;
  }
  h1 {
    display: grid;
    grid-template-rows: 8fr 2fr;
    align-items: center;
    margin: 0;
    grid-row: 2 / span 2;
    grid-gap: 2em;
    transform: translateY(-0.7em);
  }
  .slices {
    font-size: 3.2em;
    letter-spacing: 0.2em;
    transform: translateY(-0.15em);
  }
  .slicks {
    transform: scale(1.4);
    display: block;
    text-shadow: 0.18em 0.18em 0 rgba(0, 0, 0, 0.05);
    perspective: 100px;
  }
  .letter {
    font-size: 5em;
    color: var(--red);
    --scale: 1;
    --rotate: -10deg;
    --translateX: 0;
    --translateY: 0;
    --rotateX: 0deg;
    transform: scale(var(--scale)) rotate(var(--rotate))
      translateX(var(--translateX)) translateY(var(--translateY))
      rotateX(var(--rotateX));
    display: inline-block;
    line-height: 1;
    transition: transform 0.3s;
    &.B {
      --translateX: -0.05;
    }
    &.O {
      --rotate: 2deg;
      --scale: 1.12;
      --translateX: 0.05em;
      --translateY: -0.05em;
    }
    &.o {
      --scale: 0.9;
      --translateY: -0.1em;
      --translateX: 0.1em;
    }
    &.o {
      --rotate: 3deg;
      --scale: 1;
      --translateX: 0.05em;
      --translateY: 0.13em;
    }
    &.k {
      --rotate: -12deg;
      --scale: 1.2;
      --translateX: 0.06em;
    }
    &.apos {
      --translateX: 0.1em;
    }
    &.s {
      --rotate: 12deg;
      --scale: 0.9;
      --translateY: -0.14em;
    }
  }
`;

export default function Logo() {
  return (
    <LogoStyles className="logo">
      <div className="inner">
        <span className="est">P.O.L. 1967</span>
        <h1>
          <span className="slicks">
            <span className="letter B">B</span>
            <span className="letter O">O</span>
            <span className="letter o">o</span>
            <span className="letter k">k</span>
            <span className="letter apos">'</span>
            <span className="letter s">s</span>
          </span>
          <span className="slices">slices</span>
        </h1>
      </div>
    </LogoStyles>
  );
}
