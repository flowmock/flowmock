import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import axios from 'axios';

import { MockListPanel  } from '../components/MockListPanel';
import { MockViewerPanel } from '../components/MockViewerPanel';

export function MockViewPage() {
  const [mocks, setMocks] = React.useState([]);
  const [activeMock, setActiveMock] = React.useState(null);
  const [reactflowInstance, setReactflowInstance] = React.useState(null);

  async function fetchMocks() {
    let response = await axios.get('/api/mock');
    let mocks = await response.data;
    mocks.map((mock) => {
      mock.parameters = JSON.parse(mock.parameters);
      mock.trigger = JSON.parse(mock.trigger);
      mock.responseHeaders = JSON.parse(mock.responseHeaders);
    })    
    setMocks(mocks);
  }

  React.useEffect(() => {
    fetchMocks();
  }, []);

  const handleOnMockListSelected = (request) => {
    setActiveMock(request);
  }

  const handleSetMock = (mock) => {
    setActiveMock({...mock});
    setMocks(mocks);
  }

  const handleSave = async (mock) => {
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

  const handleAddMock = () => {
    setMocks([...mocks, {
      priority: 100,
      name: 'A simple mock.',
      description: 'A description for a simple mock',
      parameters: [],
      trigger: {},
      responseHeaders: [],
      responseStatus: 200,
      responseBody: ''
    }]);
  }

  const handleDelete = async (mock) => {
    await axios.delete(`/api/mock/${mock.id}`);
    await fetchMocks();
  }

  const handleReactFlowInstanceLoad = (reactflowInstance) => {
    setReactflowInstance(reactflowInstance);
  }

  return (
    <Stack sx={{ height: '100%' }} direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={1}>
      <Box sx={{ width: '300px'}}>
        <MockListPanel mocks={mocks} selected={activeMock} onSelected={handleOnMockListSelected} onAdd={handleAddMock} />       
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <MockViewerPanel mock={activeMock} setMock={handleSetMock} onSave={handleSave} onDelete={handleDelete} onReactFlowInstanceLoad={handleReactFlowInstanceLoad} />
      </Box>
    </Stack>
  );
}
