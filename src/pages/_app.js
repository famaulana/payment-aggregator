import "@/styles/globals.css";
import { useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import { muiTheme, openSansFont } from "@/styles/_config";
import { GlobalModalComponent } from "@/components/organisms/global";
import { MainLayout } from "@/components/MainLayouts";

// ✅ Create client cache with prepend
const clientSideEmotionCache = createCache({ key: "css", prepend: true });

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: false, refetchOnWindowFocus: false },
          mutations: { retry: false },
        },
      }),
  );

  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <main className={openSansFont.className}>
            <ThemeProvider theme={muiTheme}>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
              <GlobalModalComponent />
              {/* <Toaster /> */}
              {/* </LocalizationProvider> */}
            </ThemeProvider>
          </main>
        </HydrationBoundary>
      </QueryClientProvider>
    </CacheProvider>
  );
}
