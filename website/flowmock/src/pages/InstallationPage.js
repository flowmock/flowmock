import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CodeBlock } from "react-code-blocks";

export const InstallationPage = () => {
  const code = `# Start the service with test data.
  docker run -it -p 8080:80 -d -e INCLUDE_TEST_DATA=true flowmock/flowmock
  
  # Sample requests
  curl http://localhost:8080/proxy/chucknorris/jokes/random
  curl http://localhost:8080/proxy/excuse
  
  # Navigate to the FAP in a web browser.
  http://localhost:8080/`

  return (<Box sx={{maxWidth: '800px' }}>
    <p><Typography variant='h4'>Installation</Typography></p>
    <p><Typography variant='body1'>
      FlowMock is designed to run as a service in the environment.  It is available as a Docker image:
    </Typography></p>
    <CodeBlock text={code} language='bash' showLineNumbers={false} />
  </Box>)
}