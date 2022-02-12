import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TheProblemPage = () => {
    return (<Box sx={{maxWidth: '800px' }}>
    <p><Typography variant='h4'>The Problem</Typography></p>
    <p><img src='images/environment_without_flowmock.png' alt='Enviornment without FlowMock' style={{width: '500px'}} /></p>
    <p><Typography variant='body1'>
      The diagram depicts a typical pre-production environment.  Here, we have a target service with two dependency services A and B.  If service A or B goes down, than the target service is unusable.         
    </Typography></p>
    <p><img src='images/environment_with_flowmock.png' alt='Environment with FlowMock' style={{width: '800px'}} /></p>
    <p><Typography variant='h4'>The Solution</Typography></p>
    <Typography variant='body1'>
      <p>FlowMock is designed to run in the environment as a dedicated service.  It acts as a proxy between the target service and its dependencies.  A single instance of FlowMock can route traffic to multiple services.</p>
      <p>In the diagram above, FlowMock is configured to route path <code>/proxy/servicea/api/foo</code> to service A's <code>/api/foo</code> and <code>/proxy/serviceb/api/bar</code> to service B's <code>/api/bar</code>.
        Target service is configured to use the FlowMock endpoints. FlowMock can now mock responses back to the target service by configuring rules.  This can be based on data in the request payload or FlowMock state 
        such as request iteration or environment variables.
      <p><img src='images/environment_with_flowmock_mocking.png' alt='Environment with FlowMock mocking' style={{width: '800px'}} /></p>
      <p>In the diagram above, mocks has been setup for service A.  Target service requests to service A are no longer proxied and if service A goes down, target service remains up.</p></p>
    </Typography>
  </Box>)
}