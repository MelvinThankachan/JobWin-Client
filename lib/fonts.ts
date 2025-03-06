import localFont from "next/font/local";

const epilogue = localFont({
  src: "../public/fonts/Epilogue-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-epilogue",
});

const clashDisplay = localFont({
  src: "../public/fonts/ClashDisplay-Variable.ttf",
  display: "swap",
  variable: "--font-clash-display",
});

const jetBrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-VariableFont_wght.ttf",
  display: "swap",
  variable: "--font-jetbrains-mono",
});


export { epilogue, clashDisplay, jetBrainsMono };
