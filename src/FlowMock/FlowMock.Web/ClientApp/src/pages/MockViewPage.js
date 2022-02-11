import * as React from 'react';
import axios from 'axios';
import { Outlet } from 'react-router';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { MockListPanel  } from '../components/MockListPanel';

export function MockViewPage() {
  return (
    <Stack sx={{ height: '100%' }} direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={1}>
      <Box sx={{ width: '300px'}}>
        <MockListPanel />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Stack>
  );
}
