import './globals.css'
import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'

export const metadata = {
  title: 'Arindam Shukla - AI/ML Specialist',
  description: 'Portfolio of Arindam Shukla - AI/ML Specialist & Computer Science Student',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="particles-bg"></div>
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

