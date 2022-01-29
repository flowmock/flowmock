import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

export function SettingsPage() {
  return (
    <Stack sx={{ height: '100%' }} direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={1}>
      <Typography>This page is under construction.</Typography>
    </Stack>
  );
}
