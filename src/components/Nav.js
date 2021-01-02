import React from 'react';
// import { Link, navigate } from 'gatsby';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Logo from './Logo';

/* function gotoAuthors() {
  setTimeout(() => {
    // console.log('Go to authors');
    navigate('/authors', { replace: true });
  }, 2000);
} */

const NavStyles = styled.nav`
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
    margin-top: -6rem;
  }
  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1.2deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.4deg;
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    display: block;
    &:hover {
      color: var(--red);
    }
    &[aria-current='page'] {
      color: var(--red);
    }
    @media (max-width: 800px) {
      font-size: 2rem;
    }
  }
  @media (max-width: 600px) {
    --columns: 4;
    margin-bottom: 2rem;
    ul {
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--columns), 1fr);
      justify-items: center;
    }
    .logo-item {
      order: 0;
      grid-column: 1 / -1;
    }
    .logo {
      transform: none;
    }
  }
  @media (max-width: 500px) {
    --columns: 2;
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li className="logo-item">
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/authors">Authors</Link>
        </li>
        <li>
          <Link to="/order">Order now!</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
