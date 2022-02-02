import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ReturnMockComponent = ({ data }) => {

    return (
      <Box sx={{
        p: 4,
        borderRadius: '10px',
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: "#ffffff"
      }}>
        <Handle type="target" id="exec" position={Position.Left} style={{ top: '25%', borderRadius: 0 }}>
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">ex</div>
        </Handle>
        <Typography>Return Mock Response</Typography>
        <Handle
          type="source"
          position={Position.Right}
          id="execOut"
          style={{ top: '50%', borderRadius: 0 }}
        />
      </Box>
    );
  };