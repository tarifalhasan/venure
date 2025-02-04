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
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col w-full`} // Use Inter font here
      >
        <div className="flex-grow ">
          {/* <SessionProvider session={session}> */}
          <ReactQueryProvider>
            {/* <Navbar /> */}
            {children}
          </ReactQueryProvider>
          {/* </SessionProvider> */}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
