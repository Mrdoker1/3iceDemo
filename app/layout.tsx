import type { Metadata } from "next";
import "./globals.css";
import '@mantine/core/styles.css';
import Navigation from "@/components/Navigation";
import OxagileDisclaimer from "@/components/OxagileDisclaimer";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata: Metadata = {
  title: "3ICE - The Best Part Of Hockey",
  description: "3-on-3 hockey action. Watch games, check schedule, and shop official merchandise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Russo+One&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <MantineProvider 
          defaultColorScheme="dark"
          theme={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
            headings: { 
              fontFamily: 'Russo One, Impact, Arial Black, sans-serif',
              fontWeight: '400',
            },
            colors: {
              dark: [
                '#C1C2C5',
                '#A6A7AB',
                '#909296',
                '#5C5F66',
                '#373A40',
                '#2C2E33',
                '#25262b',
                '#1A1B1E',
                '#141517',
                '#101113',
              ],
            },
            primaryColor: 'blue',
            black: '#000000',
            other: {
              bodyBg: 'transparent',
            },
            components: {
              Button: {
                styles: {
                  root: {
                    backgroundColor: 'transparent',
                  }
                }
              },
              ActionIcon: {
                styles: {
                  root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(12px)',
                  }
                }
              },
              NumberInput: {
                styles: {
                  input: {
                    backgroundColor: 'rgba(31, 41, 55, 0.5)',
                    border: '1px solid rgba(55, 65, 81, 1)',
                  }
                }
              }
            }
          }}
        >
          <Navigation />
          <OxagileDisclaimer />
          <main className="pt-20 pl-20">
            {children}
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
