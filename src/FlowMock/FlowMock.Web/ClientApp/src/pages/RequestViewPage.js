import * as React from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import axios from 'axios';

import { RequestListPanel  } from '../components/RequestListPanel';
import { RequestViewerPanel } from '../components/RequestViewerPanel';

export function RequestViewPage() {
  const [requests, setRequests] = React.useState([]);
  const [activeRequest, setActiveRequest] = React.useState(null);

  const fetchRequests = async () => {
    let response = await axios.get('/api/request');
    let requests = await response.data;

    setRequests(requests.map(request => {
      request.requestHeaders = Object.entries(JSON.parse(request.requestHeaders));
      request.responseHeaders = Object.entries(JSON.parse(request.responseHeaders));
      return request;
    }));
  }

  React.useEffect(() => {
    fetchRequests();
  }, []);

  const handleOnCreateMockClick = async () => {
    const mock = {
      priority: 100,
      name: `A simple mock from #${activeRequest.id}.`,
      description: 'A description for a simple mock',
      parameters: [],
      trigger: {},
      responseHeaders: [],
      responseStatus: 200,
      responseBody: ''
    }

    let sendMock = {...mock}
    sendMock.parameters = JSON.stringify(mock.parameters);
    sendMock.trigger = JSON.stringify(mock.trigger);
    sendMock.responseHeaders = JSON.stringify(mock.responseHeaders);
  
    await axios.post(`/api/mock`, sendMock);     
  }

  const handleOnRequestListSelected = (request) => {
    setActiveRequest(request);
  }

  return (
    <Stack sx={{ height: '100%' }} direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={1}>
      <Box sx={{ flexGrow: 1}}>
        <RequestListPanel requests={requests} selected={activeRequest} onSelected={handleOnRequestListSelected} />
      </Box>
      <Box sx={{ width: '600px'}}>
        <RequestViewerPanel request={activeRequest} onCreateMockClick={handleOnCreateMockClick} />
      </Box>
    </Stack>
  );
}
