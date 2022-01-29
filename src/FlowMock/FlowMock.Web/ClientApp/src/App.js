import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './pages/Layout';
import { RequestViewPage } from './pages/RequestViewPage';
import { MockViewPage } from './pages/MockViewPage';
import { SettingsPage } from './pages/SettingsPage';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path={['/', '/requests']} component={RequestViewPage} />
        <Route path='/mocks' component={MockViewPage} />
        <Route path='/settings' component={SettingsPage} />
      </Layout>
    );
  }
}
