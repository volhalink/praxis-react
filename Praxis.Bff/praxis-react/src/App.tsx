import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Layout from './components/Layout';
import { UserProvider } from './contexts/user-context';

function App() {
  return (
      <BrowserRouter>
        <UserProvider>
            <Layout>
                <Routes />
            </Layout>
        </UserProvider>
      </BrowserRouter>
  );
}

export default App;
