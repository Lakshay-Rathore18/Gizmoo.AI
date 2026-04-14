import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <img
          src="https://gizmoo.me/logo.png"
          width={320}
          height={82}
          style={{ objectFit: 'contain', marginBottom: '32px' }}
        />
        <div style={{ color: '#9fc82c', fontSize: '34px', textAlign: 'center', padding: '0 80px' }}>
          Every call answered. Every job booked. 24/7.
        </div>
        <div style={{ color: '#666666', fontSize: '22px', marginTop: '48px' }}>
          +61 489 072 416
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
