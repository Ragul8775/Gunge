import { Inter, Roboto_Mono, Oswald } from "next/font/google";
import "../styles/globals.css";
import { CartContextProvider } from "../components/CartContext"



const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

export const metadata = {
  title: "Grunge",
  description: "Clothing Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto_mono.variable} ${oswald.variable}`}
      >
<CartContextProvider>
        
          
        {children}

        
        </CartContextProvider>
      </body>
    </html>
  );
}
