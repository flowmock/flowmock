import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleDeleteClick = async () => {
    props.onDelete(props.mock);
  }

  if (!props.mock) {
    return <Box sx={{m:1, mt: 4, textAlign: 'center'}}><Typography>Select a mock to view details.</Typography></Box>
  }

  const handleSetTrigger = (trigger) => {    
    props.mock.trigger = trigger;
    props.setMock(props.mock);
  }

  const handleReactFlowinstanceLoad = (reactflowInstance) => {
    props.onReactFlowInstanceLoad(reactflowInstance);
  }

  return (
    <Box sx={{mt: 1, mr: 1}}>
      <Box sx={{ width: '100%', m:1 }}>
        <IconButton component="span" onClick={handleSaveClick}>
          <EditIcon />
        </IconButton>
        <IconButton component="span" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
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
        <MockTriggerEditor trigger={props.mock.trigger} setTrigger={handleSetTrigger} onReactFlowInstanceLoad={handleReactFlowinstanceLoad} />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <MockResponseEditor mock={props.mock} setMock={props.setMock} />
      </TabPanel>
    </Box>
  );
}