import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Superapp Games",
  description: "All-in-one gaming strategy & tools hub",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-900 text-white">
        <Sidebar />
        <main className="md:ml-64 min-h-screen p-6 pt-16 md:pt-6">
          {children}
        </main>
      </body>
    </html>
  );
}
