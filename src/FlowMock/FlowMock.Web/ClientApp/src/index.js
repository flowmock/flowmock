import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { RequestViewerPanel } from './components/RequestViewerPanel'
import { RequestViewPage } from './pages/RequestViewPage';
import { MockViewPage } from './pages/MockViewPage';
import { SettingsPage } from './pages/SettingsPage';
import { MockViewerPanel } from './components/MockViewerPanel';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Routes>
      <Route path="/" element={<App />} >
        <Route index element={<RequestViewPage />} />
        <Route path='requests' element={<RequestViewPage />}>
          <Route index element={<RequestViewerPanel />} />
          <Route path=':requestId' element={<RequestViewerPanel />} />
        </Route>
        <Route path='mocks' element={<MockViewPage />}>
          <Route index element={<MockViewerPanel />} />
          <Route path=':mockId' element={<MockViewerPanel />} />
        </Route>
        <Route path='settings' element={<SettingsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
