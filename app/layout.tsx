// import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { generateSEO, generateViewport } from "@/config/seo/seo";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Inter } from "next/font/google";
import "react-phone-input-2/lib/style.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = generateSEO({});

export const viewport = generateViewport({});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body
        className={`${inter.className} bg-background antialiased`} // Use Inter font here
      >
        {/* <SessionProvider session={session}> */}
        <ReactQueryProvider>
          {/* <Navbar /> */}
          {children}
        </ReactQueryProvider>
        {/* </SessionProvider> */}

        <Toaster />
      </body>
    </html>
  );
}
