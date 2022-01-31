import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { RequestListPanel  } from '../components/RequestListPanel';
import { RequestViewerPanel } from '../components/RequestViewerPanel';
import { Typography } from '@mui/material';

export function MockViewPage() {
  return (
    <Stack sx={{ height: '100%' }} direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={1}>
      <Typography>This page is under construction.</Typography>
    </Stack>
  );
}
