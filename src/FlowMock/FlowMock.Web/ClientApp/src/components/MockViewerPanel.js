import * as React from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from "react-router-dom";

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
  const params = useParams();
  const navigate = useNavigate();
  const [mock, setMock] = React.useState(null);
  const [reactflowInstance, setReactflowInstance] = React.useState(null);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleSaveClick = async () => {
    let sendMock = {...mock}

    sendMock.parameters = JSON.stringify(mock.parameters);

    if(reactflowInstance) {
      sendMock.trigger = JSON.stringify(reactflowInstance.toObject());
    } else {
      sendMock.trigger = JSON.stringify(mock.trigger);
    }

    sendMock.responseHeaders = mock.responseHeaders ? JSON.stringify(mock.responseHeaders) : "[]";

    await axios.put(`/api/mock/${sendMock.id}`, sendMock);
  }

  const handleDeleteClick = async () => {
    await axios.delete(`/api/mock/${mock.id}`);
    navigate(`/mocks/`);
  }

  const fetchMock = async (id) => {
    let response = await axios.get(`/api/mock/${id}`);
    let mock = await response.data;
    mock.parameters = JSON.parse(mock.parameters);
    mock.trigger = JSON.parse(mock.trigger);
    mock.responseHeaders = JSON.parse(mock.responseHeaders);
    setMock(mock);
  }

  React.useEffect(() => {
    if(params.mockId) {
      fetchMock(params.mockId);
    } else {
      setMock(null);
    }
  }, [params.mockId]);

  if (!mock) {
    return <Box sx={{m:1, mt: 4, textAlign: 'center'}}><Typography>Select a mock to view details.</Typography></Box>
  }

  const handleSetTrigger = (trigger) => {    
    mock.trigger = trigger;
    setMock(mock);
  }

  const handleReactFlowinstanceLoad = (reactflowInstance) => {
    setReactflowInstance(reactflowInstance);
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
        <MockSettingsEditor mock={mock} setMock={setMock} />
      </TabPanel>
      <TabPanel sx={{ width: '100%', height: '100%' }} value={tabIndex} index={1}>
        <MockTriggerEditor trigger={mock.trigger} setTrigger={handleSetTrigger} onReactFlowInstanceLoad={handleReactFlowinstanceLoad} />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <MockResponseEditor mock={mock} setMock={setMock} />
      </TabPanel>
    </Box>
  );
}