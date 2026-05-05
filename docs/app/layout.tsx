import { Fraunces, Source_Sans_3 } from 'next/font/google';
import { Provider } from '@/components/provider';
import './global.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-claude-serif',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-claude-sans',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${sourceSans.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
