import type { Metadata } from 'next'
import '../src/styles/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

export const metadata: Metadata = {
  title: 'SkillLinkup - Connect, Learn & Grow',
  description: 'Your professional learning platform - Connect with experts, learn new skills, and grow your career with SkillLinkup',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
