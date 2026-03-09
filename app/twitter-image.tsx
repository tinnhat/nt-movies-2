import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'NT Movies - Discover Movies & TV Shows';
export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            marginBottom: '30px',
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 80,
                fontWeight: 'bold',
                letterSpacing: '-0.05em',
              }}
            >
              NT Movies
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 'normal',
                opacity: 0.9,
                marginTop: '-15px',
              }}
            >
              Discover Movies & TV Shows
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '40px',
            fontSize: 24,
            opacity: 0.8,
            marginTop: '20px',
          }}
        >
          <span>🎬 Movies</span>
          <span>📺 TV Shows</span>
          <span>⭐ Ratings</span>
          <span>🎭 Cast</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
