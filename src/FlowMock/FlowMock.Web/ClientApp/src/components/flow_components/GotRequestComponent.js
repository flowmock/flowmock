import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const GotRequestComponent = ({ data }) => {

    return (
      <Box sx={{
        p: 4
      }}>
        <Typography>Got Request</Typography>
        <Handle
          type="source"
          position={Position.Right}
          id="execOut"
          style={{ top: '20%', height: '12px', width: '12px', right: '-6px' }}
        />
      </Box>
    );
  };