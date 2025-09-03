import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}", // Here!
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      "2md": "890px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      gridTemplateColumns: {
        gallery: "repeat(3, minmax(200px, 1fr))",
      },
      backgroundImage: {
        "footer-texture": "url('/brush.svg')",
        president: "url('/icons/president-bg.png')",
      },
      fontSize: {
        "calc-md": "clamp(0.875rem, 0.875rem + 0.25vw, 1.125rem)",
        "calc-xl": "clamp(1rem, 1rem + 0.5vw, 1.5rem)",
        "calc-2xl": "clamp(1.5rem, 1.5rem + 1vw, 2.8rem)",
        // "calc-text-4xl": "clamp(1.5rem, 3vw, 2.25rem)",
      },
      fontFamily: {
        raleway: "var(--font-raleway)",
        montserrat: "var(--font-montserrat)",
      },
      colors: {
        abu_primary: "var(--abu-primary)",
        abu_primary_hover: "var(--abu-primary-hover)",
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
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 1.6s forwards",
        fadeOut: "fadeOut 1.6s forwards",
      },
      spacing: {
        // Accessibility-aware spacing
        "accessibility-xs": "var(--accessibility-spacing-xs, 0.25rem)",
        "accessibility-sm": "var(--accessibility-spacing-sm, 0.5rem)",
        "accessibility-md": "var(--accessibility-spacing-md, 1rem)",
        "accessibility-lg": "var(--accessibility-spacing-lg, 1.5rem)",
        "accessibility-xl": "var(--accessibility-spacing-xl, 2rem)",
      },
      minHeight: {
        // Accessibility-aware heights
        "accessibility-button": "var(--accessibility-button-height, 2.5rem)",
        "accessibility-input": "var(--accessibility-input-height, 2.5rem)",
      },
      minWidth: {
        // Accessibility-aware widths
        "accessibility-button": "var(--accessibility-button-width, 2.5rem)",
        "accessibility-touch-target":
          "var(--accessibility-touch-target, 2.75rem)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase, theme }) {
      addBase({
        // Accessibility base styles
        html: {
          fontSize: "var(--accessibility-font-size, 100%)",
        },
        body: {
          lineHeight: "var(--accessibility-line-height, 1.5)",
          letterSpacing: "var(--accessibility-letter-spacing, 0px)",
        },
        // Ensure minimum touch target sizes
        "button, [role='button'], input, select, textarea, a": {
          minHeight: "var(--accessibility-button-height, 2.5rem)",
          minWidth: "var(--accessibility-button-width, 2.5rem)",
        },
        // Focus styles
        "*:focus": {
          outline: "var(--accessibility-focus-outline, 2px solid #0066cc)",
          outlineOffset: "var(--accessibility-focus-offset, 2px)",
        },
        // Reduce motion
        "@media (prefers-reduced-motion: reduce)": {
          "*": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
            scrollBehavior: "auto !important",
          },
        },
        ".quill-content .ql-size-normal": {
          fontSize: theme("fontSize.calc-md"),
        },
        ".quill-content .ql-size-large": {
          fontSize: theme("fontSize.calc-xl"),
        },
        ".quill-content .ql-size-huge": {
          fontSize: theme("fontSize.calc-2xl"),
          fontWeight: theme("fontWeight.medium"),
        },
        ".quill-content a": {
          color: theme("colors.blue.500"),
          textDecoration: "underline",
        },
        ".quill-content ul": {
          listStyleType: "disc",
          paddingLeft: theme("spacing.5"),
        },
        ".quill-content ol": {
          listStyleType: "decimal",
          paddingLeft: theme("spacing.5"),
        },
        ".quill-content blockquote": {
          fontStyle: "italic",
          borderLeftWidth: theme("borderWidth.4"),
          borderLeftColor: theme("colors.gray.300"),
          paddingLeft: theme("spacing.4"),
          color: theme("colors.gray.700"),
        },
        ".quill-content img": {
          maxWidth: "100%",
          height: "auto",
        },
        ".quill-content code": {
          fontFamily: theme("fontFamily.mono"),
          backgroundColor: theme("colors.gray.100"),
          padding: theme("spacing.1"),
          borderRadius: theme("borderRadius.sm"),
        },
        ".quill-content pre": {
          fontFamily: theme("fontFamily.mono"),
          backgroundColor: theme("colors.gray.900"),
          color: theme("colors.white"),
          padding: theme("spacing.4"),
          borderRadius: theme("borderRadius.lg"),
          overflowX: "auto",
        },
        ".quill-content .ql-align-justify": {
          textAlign: "justify",
        },
        ".quill-content .ql-align-center": {
          textAlign: "center",
        },
      });
    }),
  ],
} satisfies Config;

export default config;
