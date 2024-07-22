import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./responsive.css";

import ThemeProvider from "@/context/ThemeProvider";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer/index";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
