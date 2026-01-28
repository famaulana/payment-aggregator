import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";

import { muiTheme, openSansFont } from "@/styles/_config";

// import createCache from "@emotion/cache";

// ✅ Create client cache with prepend
// const clientSideEmotionCache = createCache({ key: "css", prepend: true });

export default function App({
  Component,
  pageProps,
  //   emotionCache = clientSideEmotionCache,
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    // <CacheProvider value={emotionCache}>
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <main className={openSansFont.className}>
          <ThemeProvider theme={muiTheme}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            <CssBaseline />
            <Component {...pageProps} />
            {/* <ModalGlobal /> */}
            {/* <Toaster /> */}
            {/* </LocalizationProvider> */}
          </ThemeProvider>
        </main>
      </HydrationBoundary>
    </QueryClientProvider>
    //</CacheProvider>
  );
}
