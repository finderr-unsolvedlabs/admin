import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { OverlayLoader } from "@/components/Loader/OverlayLoader";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-number-input/style.css";

import { RootWrapper } from "@/components/RootWrapper";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // loading state on page load
    const handleRouteChange = (url: any, { shallow }: any) => {
      setIsLoading(true);
      return;
    };

    const handleRouteComplete = () => {
      setIsLoading(false);
      return;
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete); // If the component is unmounted, unsubscribe

    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <RootWrapper>
        <OverlayLoader visible={isLoading} />
        <Component {...pageProps} />
      </RootWrapper>
    </Provider>
  );
}
