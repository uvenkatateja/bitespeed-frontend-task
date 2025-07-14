import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Chatbot Flow Builder',
  description: 'Build and manage chatbot conversation flows',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <main className="h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
