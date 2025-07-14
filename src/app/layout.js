import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Chatbot Flow Builder | BiteSpeed Frontend Task',
  description: 'A simple chatbot flow builder using React Flow',
  keywords: ['chatbot', 'flow builder', 'react flow', 'bitespeed'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
