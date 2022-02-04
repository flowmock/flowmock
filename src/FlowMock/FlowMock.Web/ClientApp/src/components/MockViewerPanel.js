import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

import { MockSettingsEditor } from './MockSettingsEditor';
import { MockTriggerEditor } from './MockTriggerEditor';
import { MockResponseEditor } from './MockResponseEditor';

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

export function MockViewerPanel(props) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleSaveClick = async () => {
    props.onSave(props.mock);
  }

  if (!props.mock) {
    return <Typography>Select a mock to view details.</Typography>
  }

  const handleSetTrigger = (trigger) => {    
    props.mock.trigger = trigger;
    props.setMock(props.mock);
  }

  return (
    <Box sx={{mt: 1, mr: 1}}>
      <Box sx={{ width: '100%', m:1 }}>
        <Button variant="contained" onClick={handleSaveClick}>Save</Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={(e, tabIndex) => setTabIndex(tabIndex)}>
          <Tab label="General" />
          <Tab label="Trigger" />
          <Tab label="Response" />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <MockSettingsEditor mock={props.mock} setMock={props.setMock} />
      </TabPanel>
      <TabPanel sx={{ width: '100%', height: '100%' }} value={tabIndex} index={1}>
        <MockTriggerEditor trigger={props.mock.trigger} setTrigger={handleSetTrigger} reactflowInstance={props.reactflowInstance} setReactflowInstance={props.setReactflowInstance} />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <MockResponseEditor mock={props.mock} setMock={props.setMock} />
      </TabPanel>
    </Box>
  );
}