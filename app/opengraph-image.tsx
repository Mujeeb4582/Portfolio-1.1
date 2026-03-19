import { ImageResponse } from 'next/og'

export const alt = 'Mujeeb ur Rahman — Full-Stack Web Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1A1E23',
          fontFamily: 'sans-serif',
          gap: '16px',
          padding: '48px',
        }}
      >
        <div style={{ fontSize: '64px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-1px' }}>
          Mujeeb ur Rahman
        </div>
        <div style={{ fontSize: '32px', color: '#12F7D6', fontWeight: 500 }}>
          Full-Stack Web Developer
        </div>
        <div style={{ fontSize: '20px', color: '#98FAEC', marginTop: '8px', textAlign: 'center', maxWidth: '800px' }}>
          React · Next.js · TypeScript · React Native
        </div>
      </div>
    ),
    { ...size },
  )
}
