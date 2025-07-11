import './global.css';
import { Inter } from 'next/font/google';
import ThemeRegistry from './ThemeRegistry';
import { LanguageProvider } from '../contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IA Catalyst - Disrupt with intelligence, scale with purpose.',
  description: 'SaaS platform for design, product and customer experience teams that apply AI to accelerate validation and improvement of digital experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </LanguageProvider>
      </body>
    </html>
  );
}
