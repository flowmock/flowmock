import * as React from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { MockViewerPanel } from '../components/MockViewerPanel';

export function MockViewPage() {
  const [activeMock, setActiveMock] = React.useState({});

  return (
    <Stack sx={{ height: '100%' }} direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={1}>
      <Box sx={{ width: '200px'}}>
        This section is under construction.        
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <MockViewerPanel mock={activeMock} />
      </Box>
    </Stack>
  );
}
