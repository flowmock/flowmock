import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CodeBlock } from "react-code-blocks";

export const TutorialPage = () => {
    const code1 = `
      > curl https://uselessfacts.jsph.pl/random.json?language=en
      {"id":"f8eea461-5ffb-4cad-ada1-8d99f75df952","text":"It takes 3,000 cows to supply the NFL 
      with enough leather for a year's supply of footballs.","source":"djtech.net","source_url":
      "http://www.djtech.net/humor/useless_facts.htm","language":"en","permalink":
      "https://uselessfacts.jsph.pl/f8eea461-5ffb-4cad-ada1-8d99f75df952"}
    `

    const code2 = `
      > docker run -it -p 8080:80 -d flowmock/flowmock
    `

    const code3 = `
      > curl -X POST http://localhost:8080/api/proxymapping \\
      -H 'Content-Type: application/json' \\
      -d '[{"basePath":"uselessfacts","proxyToBaseUrl":"https://uselessfacts.jsph.pl/"}]'
    `

    const code4 = `
      > curl http://localhost:8080/proxy/uselessfacts/random.json?language=en
      {"id":"f8eea461-5ffb-4cad-ada1-8d99f75df952","text":"It takes 3,000 cows to supply the NFL 
      with enough leather for a year's supply of footballs.","source":"djtech.net","source_url":
      "http://www.djtech.net/humor/useless_facts.htm","language":"en","permalink":
      "https://uselessfacts.jsph.pl/f8eea461-5ffb-4cad-ada1-8d99f75df952"}
    `

    return (<Box sx={{maxWidth: '800px' }}>
    <p><Typography variant='h4'>Tutorials</Typography></p>
    <Typography variant='body1'>
    <p>
      For this tutorial, we're going to use this public API that returns useless facts: <a href="https://uselessfacts.jsph.pl/">https://uselessfacts.jsph.pl/</a>.
    </p>
    <p>
      First, let's look at what the response looks like with curl:
      <CodeBlock text={code1} language='bash' showLineNumbers={false} />
    </p>
    <p>
      No let's run FlowMock on port 8080:
      <CodeBlock text={code2} language='bash' showLineNumbers={false} />
    </p>
    <p>
      The first thing we need to do is configure a route for the API.  By default, FlowMock will
      handle requests that starts with '/proxy'.  We will route '/proxy/uselessfacts' to 
      'https://uselessfacts.jsph.pl/':
      <CodeBlock text={code3} language='bash' showLineNumbers={false} />
    </p>
    <p>
      And just like that, we can now make requests to the proxy endpoint:
      <CodeBlock text={code4} language='bash' showLineNumbers={false} />
    </p>
    
    </Typography>
  </Box>)
}