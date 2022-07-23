import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      <Component {...pageProps} />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default MyApp;
