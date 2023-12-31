import React, { memo } from "react";
import Head from "next/head";

import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Mall</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default memo(App);