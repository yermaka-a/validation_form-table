import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const createWrapper = ()=>{
 const queryClient = new QueryClient( {defaultOptions: {
      queries: {
        retry: false,
      },
    }})
  return (children: ReactNode) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
export default createWrapper