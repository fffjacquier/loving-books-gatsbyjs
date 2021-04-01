import { Link } from 'gatsby';
import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

export default function ItemGrid({ items, base }) {
  return (
    <ItemsGrid>
      {items.map((item) => (
        <Link key={item._id} to={`${base}/${item.slug.current}`}>
          <ItemStyles title={item.name}>
            <p>
              <span className="mark">{item.name}</span>
            </p>
            <img
              src={`${item.image.asset.url}?w=400&h=300&fit=crop`}
              alt={item.name}
              width="400"
              height="300"
              style={{
                background: `url(${item.image.asset.metadata.lqip})`,
                backgroundSize: 'cover',
              }}
            />
          </ItemStyles>
        </Link>
      ))}
    </ItemsGrid>
  );
}
