import React from 'react';

export default function ChipRow({ chipData = [], imgWidth = 120, imgHeight = 120 }) {
  if (!chipData.length) return null;

  // Unify the image container height and width for all cards
  const maxWidth = Math.max(...chipData.map((chip) => chip.imgWidth || imgWidth), 120);
  const maxHeight = Math.max(...chipData.map((chip) => chip.imgHeight || imgHeight), 120);

  return (
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '2rem 0', alignItems: 'flex-start' }}>
      {chipData.map((chip) => {
        const width = chip.imgWidth || imgWidth;
        const height = chip.imgHeight || imgHeight;
        return (
          <a
            key={chip.name}
            href={chip.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textAlign: 'center',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: maxWidth,
            }}
          >
            <div
              style={{
                width: maxWidth,
                height: maxHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: 12,
                boxShadow: '0 2px 8px #0001',
                background: '#fff',
                margin: '0 auto',
              }}
            >
              <img
                src={chip.img}
                alt={chip.name}
                style={{ maxWidth: width, maxHeight: height, objectFit: 'contain', display: 'block', margin: '0 auto' }}
              />
            </div>
            <div
              style={{
                marginTop: 8,
                fontWeight: 'bold',
                fontSize: 18,
                width: '100%',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {chip.name}
            </div>
          </a>
        );
      })}
    </div>
  );
}