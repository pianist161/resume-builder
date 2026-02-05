import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { TooltipProviderWrapper } from "@/components/providers/tooltip-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Resume Builder — Конструктор резюме",
  description: "Создайте профессиональное резюме за минуты",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
        >
          Перейти к содержимому
        </a>
        <ThemeProvider>
          <TooltipProviderWrapper>
            <MotionProvider>
              <main id="main-content">{children}</main>
            </MotionProvider>
          </TooltipProviderWrapper>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
