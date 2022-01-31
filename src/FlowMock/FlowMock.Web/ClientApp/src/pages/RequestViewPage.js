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

  async function fetchRequests() {
    let response = await axios.get('/api/request');
    let requests = await response.data;
    setRequests(requests);
  }

  React.useEffect(() => {
    fetchRequests();
  }, []);

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
        <RequestViewerPanel request={activeRequest} />
      </Box>
    </Stack>
  );
}
