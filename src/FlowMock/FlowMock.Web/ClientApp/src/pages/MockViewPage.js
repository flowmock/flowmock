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

  return (
    <Stack sx={{ height: '100%' }} direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={1}>
      <Box sx={{ width: '300px'}}>
        <MockListPanel mocks={mocks} selected={activeMock} onSelected={handleOnMockListSelected} />       
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <MockViewerPanel mock={activeMock} setMock={handleSetMock} onSave={handleSave} reactflowInstance={reactflowInstance} setReactflowInstance={setReactflowInstance} />
      </Box>
    </Stack>
  );
}
