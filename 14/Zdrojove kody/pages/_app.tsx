import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
