import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Homepage = () => {
    return (<Box sx={{maxWidth: '800px' }}>
    <p><Typography variant='h4'>FlowMock</Typography></p>
    <p><img src='images/flowmock_screenshot.jpg' alt='Flowmock screenshot' style={{width: '800px'}} /></p>
    <p><p><Typography variant='body1'><a href='https://github.com/flowmock/flowmock'>https://github.com/flowmock/flowmock</a></Typography></p></p>
    <p><Typography variant='body1'>
      A flow-based high performance programmable HTTP mocker and proxy, designed to enable testing of difficult to setup 
      scenarios or to support/replace 3rd party sandbox environments in pre-production environment.            
    </Typography></p>
    <p><Typography variant='h5' component="p">Features</Typography></p>
    <ul>
      <li>Visually define mock behavior using a flow-based programming model.</li>
      <li>Pass-through proxy with logging.</li>
      <li>Intuitively convert requests in logs into mocks.</li>
      <li>Complex trigger condition for mocks.</li>
      <li>Templatable response using placeholder variables.</li>
      <li>FlowMock Admin Portal (FAP) with backing API.</li>
    </ul>
  </Box>)
}