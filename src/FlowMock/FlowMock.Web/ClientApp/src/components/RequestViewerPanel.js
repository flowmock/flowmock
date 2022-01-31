import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { HeaderList } from './HeaderList';
import ReactJson from 'react-json-view';

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
          {props.request.requestBody && <ReactJson src={JSON.parse(props.request.requestBody)} />}
          {!props.request.requestBody && <Typography>No request body.</Typography>}
        </TabPanel>
        <TabPanel value={requestTabIndex} index={2}>
          This panel is under construction.
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
          {props.request.responseBody && <ReactJson src={JSON.parse(props.request.responseBody)} />}
          {!props.request.responseBody && <Typography>No response body.</Typography>}
        </TabPanel>
        <TabPanel value={responseTabIndex} index={2}>
          This panel is under construction.
        </TabPanel>
      </Box>
    </Stack>
  );
}