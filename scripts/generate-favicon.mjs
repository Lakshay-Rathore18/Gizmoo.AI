import sharp from 'sharp'

// 32x32 favicon
await sharp('public/logo.png')
  .resize(32, 32, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  })
  .png()
  .toFile('public/favicon-32.png')

// 180x180 Apple touch icon
await sharp('public/logo.png')
  .resize(180, 180, {
    fit: 'contain',
    background: { r: 10, g: 10, b: 10, alpha: 255 }
  })
  .png()
  .toFile('public/apple-touch-icon.png')

// 512x512 for PWA manifest
await sharp('public/logo.png')
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 10, g: 10, b: 10, alpha: 255 }
  })
  .png()
  .toFile('public/icon-512.png')

console.log('All favicons generated successfully')
