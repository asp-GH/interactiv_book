import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Живая книга: Преступление и наказание',
  description: 'Персонажи говорят с тобой во время чтения',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
