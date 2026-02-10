import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { AppProvider } from '@/context/app-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nutri-Tech - Smart Nutrition for Nigerian Students',
  description: 'AI-powered meal planning and nutrition tracking for Nigerian university students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
