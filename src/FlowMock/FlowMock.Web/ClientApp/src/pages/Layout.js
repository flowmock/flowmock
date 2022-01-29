import React, { Component } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { AppBarPanel } from '../components/AppBarPanel';
import { SideNavPanel } from '../components/SideNavPanel';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <AppBarPanel sx={{flexShrink:1}} />
        <Stack
          sx={{flexGrow:1}}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
        <Box>
          <SideNavPanel />
        </Box>
        <Box sx={{flexGrow:1}}>
          {this.props.children}        
        </Box>
      </Stack>        

      </Box>
    );
  }
}
