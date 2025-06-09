import "@/styles/globals.css"; // or '../styles/globals.css' depending on structure
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* Ensure all components are wrapped */}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
