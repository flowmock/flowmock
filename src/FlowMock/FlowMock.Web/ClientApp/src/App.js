import React, { Component } from 'react';
import { Outlet } from 'react-router';
import { Layout } from './pages/Layout';

export default () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
