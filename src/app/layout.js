import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Pokemon Search App',
  description: 'Search for Pokemon',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
