import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { HeaderList } from './HeaderList';
import Button from '@mui/material/Button';
import { CodeBlock, dracula } from "react-code-blocks";
import AccountTreeIcon from '@mui/icons-material/AccountTree';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function RequestViewerPanel(props) {
  const [requestTabIndex, setRequestTabIndex] = React.useState(0);
  const [responseTabIndex, setResponseTabIndex] = React.useState(0);

  if (!props.request) {
    return <Typography>Select a request to view details.</Typography>
  }

  const formatResponeBody = (headers, rawText) => {
    if(determineLanguage(headers) === "json") {
      return JSON.stringify(JSON.parse(rawText), null, 2);
    } else {
      return rawText;
    }
  }

  const determineLanguage = (headers) => {
    const contentTypeHeader = headers.find(h => h[0] == 'Content-Type');
    if(!contentTypeHeader) { return "text"; }
    if(contentTypeHeader[1][0].includes('application/json')) { return "json"; }
    if(contentTypeHeader[1][0].includes('text/html')) { return "html"; }
    if(contentTypeHeader[1][0].includes('application/xml')) { return "xml"; }
    if(contentTypeHeader[1][0].includes('+xml')) { return "xml"; }
    return "text";
  }

  return (
    <Stack sx={{height: 'calc(100vh - 80px)', mt: 1, mr: 1}} direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={1}>
      <Box sx={{ width: '100%', height: '50%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={requestTabIndex} onChange={(e, tabIndex) => setRequestTabIndex(tabIndex)}>
            <Tab label="Headers" />
            <Tab label="Body" />
            <Tab label="Mock" />
          </Tabs>
        </Box>
        <TabPanel value={requestTabIndex} index={0}>
          <HeaderList headers={props.request.requestHeaders} />
        </TabPanel>
        <TabPanel value={requestTabIndex} index={1}>
          {props.request.requestBody && <CodeBlock
            customStyle={{height: 'calc(100vh - 740px)'}}
            text={formatResponeBody(props.request.requestHeaders, props.request.requestBody)}
            language={determineLanguage(props.request.requestHeaders)}
          />}
          {!props.request.requestBody && <Typography>No request body.</Typography>}
        </TabPanel>
        <TabPanel value={requestTabIndex} index={2}>
          <Box sx={{m:1}}>
            <Button variant="outlined" startIcon={<AccountTreeIcon />} onClick={props.onCreateMockClick}>
              Create Mock from Request
            </Button>
          </Box>
        </TabPanel>
      </Box>
      <Box sx={{ width: '100%', height: '50%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={responseTabIndex} onChange={(e, tabIndex) => setResponseTabIndex(tabIndex)}>
            <Tab label="Headers" />
            <Tab label="Body" />
            <Tab label="Mock" />
          </Tabs>
        </Box>
        <TabPanel value={responseTabIndex} index={0}>
          <HeaderList headers={props.request.responseHeaders} />
        </TabPanel>
        <TabPanel value={responseTabIndex} index={1}>
          {props.request.responseBody && <CodeBlock
            customStyle={{height: 'calc(100vh - 740px)'}}
            text={formatResponeBody(props.request.responseHeaders, props.request.responseBody)}
            language={determineLanguage(props.request.responseHeaders)}
          />}
          {!props.request.responseBody && <Typography>No response body.</Typography>}
        </TabPanel>
        <TabPanel value={responseTabIndex} index={2}>
          This panel is under construction.
        </TabPanel>
      </Box>
    </Stack>
  );
}