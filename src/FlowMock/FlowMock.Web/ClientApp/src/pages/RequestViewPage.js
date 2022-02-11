import * as React from 'react';
import { Outlet } from 'react-router';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { RequestListPanel  } from '../components/RequestListPanel';
  
export function RequestViewPage() {
  return (
    <Stack sx={{ height: '100%' }} direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1}>
      <Box sx={{ flexGrow: 1}}>
        <RequestListPanel />
      </Box>
      <Box sx={{ width: '600px'}}>
        <Outlet />
      </Box>
    </Stack>
  );
}
