import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Dynamic hover classes for rakeback tiers
    'hover:border-gray-500/50',
    'hover:border-amber-500/50', 
    'hover:border-slate-500/50',
    'hover:border-yellow-500/50',
    'hover:border-purple-500/50',
    'hover:border-emerald-500/50',
    'hover:border-cyan-500/50',
    'hover:border-rose-500/50',
    'hover:border-fuchsia-500/50',
    // Background gradients for tiers
    'bg-gradient-to-r',
    'from-gray-600',
    'to-gray-400',
    'from-amber-600',
    'to-amber-400',
    'from-slate-600',
    'to-slate-400',
    'from-yellow-600',
    'to-yellow-400',
    'from-purple-600',
    'to-purple-400',
    'from-emerald-600',
    'to-emerald-400',
    'from-cyan-600',
    'to-cyan-400',
    'from-rose-600',
    'to-rose-400',
    'from-fuchsia-600',
    'to-fuchsia-400',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors for MeasterSkins
        purple: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Custom animations for MeasterSkins
        "animate-text": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        "pulse-slower": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        "twinkle": {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
          "100%": { opacity: "0.3" },
        },
        "pulse-glow": {
          "0%, 100%": { "box-shadow": "0 0 5px rgba(139, 92, 246, 0.5)" },
          "50%": { "box-shadow": "0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(34, 211, 238, 0.5)" },
        },
        "gradient-shift": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        "particle-float": {
          "0%": { transform: "translateY(0px) translateX(0px)", opacity: "0.7" },
          "33%": { transform: "translateY(-10px) translateX(5px)", opacity: "1" },
          "66%": { transform: "translateY(-5px) translateX(-5px)", opacity: "0.8" },
          "100%": { transform: "translateY(0px) translateX(0px)", opacity: "0.7" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Custom animations for MeasterSkins
        "text": "animate-text 4s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slower": "pulse-slower 7s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "twinkle": "twinkle 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "particle-float": "particle-float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config