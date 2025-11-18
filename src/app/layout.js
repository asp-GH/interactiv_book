  import './globals.css'

export const metadata = {
title: 'Живая книга: Преступление и наказание',
  description: 'Персонажи говорят с тобой во время чтения',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
