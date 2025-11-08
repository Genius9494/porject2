import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ weight: ["300", "400", "700"], subsets: ["latin"] });

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import QueryProvider from "@/lib/QueryProvider";
import { ThemeProvider } from "next-themes";
import { TranslationProvider } from "@/lib/TranslationProvider";

import { Toaster } from "react-hot-toast";
import { CollectedProvider } from "./context/CollectedContext";

export const metadata: Metadata = {
  title: "Genius Gaming",
  description: "this is a gaming website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <TranslationProvider>
              <CollectedProvider>
                <ToastContainer
                  position="top-center"
                  autoClose={2500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  pauseOnFocusLoss
                  pauseOnHover={false}
                  theme="dark"
                />
                {children}
                <Toaster position="top-center" reverseOrder={false} />
                </CollectedProvider >
            </TranslationProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

