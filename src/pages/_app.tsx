import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/store";
import RootWrapper from "@/components/RootWrapper";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Provider store={store}>
      <RootWrapper>
        {/* <OverlayLoader visible={isLoading} /> */}
        <Component {...pageProps} />
      </RootWrapper>
    </Provider>
  );
}
