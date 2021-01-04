import React from 'react';
import styled from 'styled-components';
import JSONData from '../content/fresh-books-list.json';

const FreshlyHarvestedStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  flex-direction: column;
  padding: 0;
  &:before {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    background-color: var(--red);
    left: 50%;
    width: 2px;
    transform: translateX(-1px);
    content: '';
  }
  .entry {
    position: relative;
    width: 50%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    > div {
      margin: 0.5rem 2rem;
    }
  }
  .entry:nth-child(odd) {
    align-self: flex-end;
    padding-left: 0;
  }
  .entry:nth-child(2n) {
    align-self: flex-start;
    padding-right: 0;
    text-align: right;
  }
  .entry .dot {
    position: absolute;
    background-color: var(--grey);
    top: 50%;
  }
  .entry:nth-child(odd) .dot {
    left: 0;
    transform: translate(-50%, -50%);
  }
  .entry:nth-child(2n) .dot {
    right: 0;
    transform: translate(50%, -50%);
  }
  .entry:first-child .dot {
    background-color: var(--red);
    &:after {
      background-color: gold;
    }
  }
  .dot {
    display: inline-block;
    border-radius: 50%;
    position: relative;
    width: 24px;
    height: 24px;
    &:after {
      position: absolute;
      background-color: #fff;
      border-radius: 9999px;
      top: 8px;
      left: 8px;
      right: 8px;
      bottom: 8px;
      content: '';
    }
  }
  h5 .author {
    font-variant: smallcaps;
    font-size: 0.8em;
  }
`;

export default function EnteringBooks() {
  return (
    <div>
      <p />
      <h2>
        <span className="mark tilt">Freshly harvested</span>
      </h2>
      <FreshlyHarvestedStyles className="left">
        {JSONData.content.map((data, idx) => (
          <div className="entry" key={idx}>
            <span className="dot" />
            <div>
              <h5>
                {data.date}{' '}
                {data.src && (
                  <span className="author">- Source: {data.src}</span>
                )}
              </h5>
              <h4>
                <span className="mark">{data.title}</span>,{' '}
                <span className="author">{data.author}</span>
              </h4>
            </div>
          </div>
        ))}
      </FreshlyHarvestedStyles>
    </div>
  );
}
