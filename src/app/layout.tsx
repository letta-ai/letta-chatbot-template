import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { AgentProvider } from './(chat)/context/agent-context';
import { AgentDetailsProvider } from '@/components/ui/agent-details';
import { SidebarProvider } from '@/components/ui/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LettaAI - Demo Chat App',
  description: 'demo chat app by LettaAI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <SidebarProvider>
            <AgentProvider>
              <AgentDetailsProvider>{children}</AgentDetailsProvider>
            </AgentProvider>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
