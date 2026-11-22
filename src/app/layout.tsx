import type { Metadata } from "next";
import './globals.css';
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: 'Peaking - RPG Habit Tracker',
  description: 'Level up you life by completing tasks and tracking habits.',
};

export default function RootLayout({
  children,
}: {
    children: React.ReactNode;
  }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
