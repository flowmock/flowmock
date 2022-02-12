import React from 'react';
import { Outlet } from 'react-router';
import { Layout } from './pages/Layout';

const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;