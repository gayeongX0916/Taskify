module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "0px",
      md: "768px", 
      lg: "1200px",
    },
    extend: {
      colors: {
        black_000000: "#000000",
        black_171717: "#171717",
        black_333236: "#333236",
        black_4B4B4B: "#4B4B4B",
        gray_787486: "#787486",
        gray_9FA6B2: "#9FA6B2",
        gray_D9D9D9: "#D9D9D9",
        gray_EEEEEE: "#EEEEEE",
        gray_FAFAFA: "#FAFAFA",
        white_FFFFFF: "#FFFFFF",

        violet_5534DA: "#5534DA",
        violet_8P: "#F1EFFD",
        red_D6173A: "#D6173A",
        green_7AC555: "#7AC555",
        purple_760DDE: "#760DDE",
        orange_FFA500: "#FFA500",
        blue_76A5EA: "#76A5EA",
        pink_E876EA: "#E876EA",
      },
      fontSize: {
        "3xl": ["32px", "42px"],
        "2xl": ["24px", "32px"],
        xl: ["20px", "32px"],
        "2lg": ["18px", "26px"],
        lg: ["16px", "26px"],
        md: ["14px", "24px"],
        sm: ["13px", "22px"],
        xs: ["12px", "18px"],
      },
    },
  },
  plugins: [],
};
