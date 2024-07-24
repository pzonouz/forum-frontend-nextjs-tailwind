import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import ReduxProvider from "./components/ReduxProvider";
import { ToastContainer } from "react-toastify";

const iranSans = localFont({
  src: [
    {
      path: "../public/Fonts/IRANSansXFaNum-Thin.woff2",
      weight: "100",
    },
    {
      path: "../public/Fonts/IRANSansXFaNum-UltraLight.woff2",
      weight: "200",
    },
    {
      path: "../public/Fonts/IRANSansXFaNum-Light.woff2",
      weight: "300",
    },
    {
      path: "../public/Fonts/IRANSansXFaNum-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/Fonts/IRANSansXFaNum-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/Fonts/IRANSansXFaNum-DemiBold.woff2",
      weight: "600",
    },
    {
      path: "../public/Fonts/IRANSansXFaNum-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/Fonts/IRANSansXFaNum-ExtraBold.woff2",
      weight: "800",
    },
    {
      path: "../public/Fonts/IRANSansXFaNum-Black.woff2",
      weight: "900",
    },
  ],
  preload: false,
});

export const metadata = {
  title: "انجمن تخصصی برق خودرو",
  description: "پرسش و پاسخ در زمینه برق خودرو",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl" data-theme="light">
      <body className={iranSans.className}>
        <ToastContainer />
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
