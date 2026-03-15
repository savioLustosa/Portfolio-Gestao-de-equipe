import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Muito mais que dados - Gestão de Projetos e Tickets",
  description: "Plataforma de alta performance para equipes de TI e DevOps",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
