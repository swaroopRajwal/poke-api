import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import IdContext from '../lib/context/IdContext';
import { useState } from 'react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [id, setId] = useState("")
  return (
    <QueryClientProvider
      client={queryClient}
    >

      <IdContext.Provider value={{id, setId}}>
        <div className='min-h-screen bg-black flex flex-col gap-6 p-5 debug-screens'>
          <Component {...pageProps} />
        </div>
      </IdContext.Provider>

      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default MyApp;
