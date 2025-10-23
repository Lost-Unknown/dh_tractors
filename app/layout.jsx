import "./globals.css";
import NavBar from "@/Components/NavBar";
import { Suspense } from "react";
export const metadata = {
  title: "DH Tractors",
  description: "Digital platform for DH Tractors",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
        <link
          rel="icon"
          href="/favicon.svg"
        />
      </head>
      <body
        className={`antialiased`}
      >
        <Suspense>
          <NavBar></NavBar>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
