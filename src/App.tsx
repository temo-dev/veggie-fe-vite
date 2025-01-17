import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Layout } from '@/components/Layout/Layout';
import { Provider } from 'react-redux';
import store, { persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { ReactQueryDevtools } from 'react-query/devtools';


export default function App() {
  /**
   * Set enableMock(Default true) to true at configs/app.config.js
   * If you wish to enable mock api
   */
  return (
    <>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <Notifications position="bottom-right"/>
          <ModalsProvider>
              <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                  <Layout />
                </BrowserRouter>
              </PersistGate>
          </ModalsProvider>
        </MantineProvider>
      </Provider>
    </>
      
  );
}
