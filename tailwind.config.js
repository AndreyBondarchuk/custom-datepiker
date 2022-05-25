module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0000FF",
        primaryactive: "#9999FF",
        unscoped: "#E1E4EA",
        grayborder: "#A5AEC0",
        hoverb: "#CCCCFF",
        bcolor: "#F6F7F9",
        choosedate: "#535F78",
      },
      boxShadow: {
        cont: "0 0 12px rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        main: [
          "Apercu",
          "Avenir",
          "-apple-system",
          "BlinkMacSystemFont",
          "Helvetica Neue",
          "Helvetica",
          "Calibri",
          "Roboto",
          "Arial",
          "sans-serif",
        ],

        mono: [
          "Apercu Mono",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
