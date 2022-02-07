import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const GotRequestComponent = ({ data }) => {

    return (
      <Box sx={{
        p: 4,
        borderRadius: '10px',
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: "#ffffff"
      }}>
        <Typography>Got Request</Typography>
        <Handle
          type="source"
          position={Position.Right}
          id="execOut"
          style={{ top: '20%', borderRadius: 0 }}
        />
      </Box>
    );
  };