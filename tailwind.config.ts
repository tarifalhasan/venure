import type { Config } from "tailwindcss";

import animatePlugin from "tailwindcss-animate";
export const PRIMARY_DARK = "#343A3F";
export const PRIMARY_BLUE = "#4589C6";
export const PRIMARY_ORANGE = "#FFA500";
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      background: {
        tab: "linear-gradient(0deg, #333 0%, #333 100%), rgba(166, 166, 166, 0.61)",
        tab_2:
          "linear-gradient(0deg, #333 0%, #333 100%), rgba(166, 166, 166, 0.70)",
      },
      colors: {
        primaryDark: {
          DEFAULT: PRIMARY_DARK, // For bg-primaryDark text-primaryDark-foreground and text-primaryDark
          hover: "#333333", // Hover color (slightly darker)
          foreground: "#ffffff", // Define a contrasting foreground color
        },
        primaryBlue: {
          DEFAULT: PRIMARY_BLUE, // For bg-primaryBlue text-primaryBlue-foreground and text-primaryBlue
          hover: "#34689A", // Hover color (slightly darker)
          foreground: "#1f2937", // Define a contrasting foreground color
        },
        primaryOrange: {
          DEFAULT: PRIMARY_ORANGE,
          hover: "#CC8400", // Hover color (slightly darker)
          foreground: "#ffffff", // Define a contrasting foreground color
        },
        skin: {
          black: "#343A3F",
          shade_gray_900: "#21272A",
          shade_gray_50: "#878D96",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      boxShadow: {
        "3xl": "0px 6px 16px 0px rgba(0, 0, 0, 0.12)",
        "2xl":
          "0px 2px 4px 0px rgba(58, 92, 144, 0.14), 0px 3px 4px 0px rgba(58, 92, 144, 0.12), 0px 1px 5px 0px rgba(58, 92, 144, 0.20)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;
