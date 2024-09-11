import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.tsx';
import { AxiosErrorHandler } from './components/axios/index.ts';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/authContext.tsx';
import { ModalProvider } from './context/modalContext.tsx';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ModalProvider>
      <AxiosErrorHandler>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </AxiosErrorHandler>
    </ModalProvider>
  </AuthProvider>
);
