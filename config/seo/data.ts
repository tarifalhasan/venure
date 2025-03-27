import { Metadata, type Viewport } from "next";

const appName = process.env.NEXT_PUBLIC_APP_NAME || "Venure";
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://venure.vercel.app";

export const defaultSEOdata: Metadata = {
  // Dynamic title with fallback
  title: {
    default: `${appName} - Book the Perfect Venue for Your Events`,
    template: `%s | ${appName}`,
  },

  // Professional description with dynamic app name
  description: `${appName} is your premier platform for discovering and booking exceptional venues for weddings, conferences, parties, and more. Streamline your event planning with our curated selection of venues.`,

  // Comprehensive keywords optimized for SEO
  keywords: [
    `${appName.toLowerCase()} booking`,
    "event venues",
    "wedding venues",
    "conference venues",
    "party venues",
    "venue reservation",
    "event planning platform",
    "book venues online",
    "venue finder",
    "venue rental service",
    "event space booking",
    "professional venue management",
  ],

  // OpenGraph configuration with dynamic values
  openGraph: {
    title: `${appName} - Discover Your Perfect Venue`,
    description: `Plan your next event with ${appName}. Browse and book from a diverse selection of venues tailored to your unique requirements.`,
    url: appUrl,
    siteName: appName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${appUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${appName} - Venue Booking Platform`,
      },
    ],
  },

  // Twitter card configuration
  twitter: {
    title: `${appName} - Book Your Ideal Venue`,
    description: `Find and secure the perfect venue for any occasion with ${appName}. Simplify your event planning today.`,
    card: "summary_large_image",
    site: "@venureapp", // Keep this static unless you have a dynamic Twitter handle
    creator: "@venureapp",
  },

  // Apple Web App configuration
  appleWebApp: {
    title: `${appName} - Venue Booking`,
    capable: true,
    statusBarStyle: "default",
  },

  // Facebook configuration
  facebook: {
    appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "123456789",
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Dynamic icons configuration
  icons: {
    icon: [
      { url: `${appUrl}/favicon.ico`, type: "image/x-icon" },
      { url: `${appUrl}/apple-touch-icon.png`, type: "image/png" },
    ],
    shortcut: `${appUrl}/favicon.ico`,
    apple: `${appUrl}/apple-touch-icon.png`,
  },

  // Additional metadata
  applicationName: appName,
  authors: [{ name: `${appName} Team`, url: appUrl }],
  creator: appName,
  publisher: appName,
  category: "Venue Booking & Event Planning",

  // Verification codes (should come from environment variables)
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || "google-site-verification=1234567890",
    yandex: process.env.YANDEX_VERIFICATION_CODE || "yandex-verification=1234567890",
  },

  // Dynamic manifest
  manifest: `${appUrl}/manifest.webmanifest`,

  // App links
  appLinks: {
    web: [{ url: appUrl, should_fallback: true }],
  },
};

// Optimized viewport configuration
export const defaultViewPort: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow some zooming for accessibility
  minimumScale: 1,
  userScalable: true, // Better accessibility
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  colorScheme: "light dark", // Support both themes
};
