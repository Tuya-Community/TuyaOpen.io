import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './FeatureCardGrid.module.css';

export default function FeatureCardGrid({ items = [], columns = 3 }) {
  if (!items.length) return null;

  const colClass = `col--${Math.max(1, Math.round(12 / columns))}`;

  return (
    <div className="row">
      {items.map((item) => (
        <div key={item.href} className={clsx('col', colClass, 'margin-bottom--lg')}>

          <Link to={item.href} className={clsx('card', styles.card)}>
            {item.icon && (
              <span className={styles.icon} aria-hidden>
                {item.icon}
              </span>
            )}
            <span className={styles.title}>{item.title}</span>
            <span className={styles.description}>{item.description}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
