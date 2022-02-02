import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const TwoOrComponent = ({ data }) => {
    return (
      <Box sx={{
        padding: '10px',
        borderRadius: '3px',
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: "#ffffff",
        width: 150,
        height: 80,
        textAlign: 'center'
      }}>
        <Handle type="target" id="a" position={Position.Left} style={{ top: '30%', borderRadius: 0 }} >
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">a</div>
        </Handle>
        <Handle type="target" id="b" label='B' position={Position.Left} style={{ top: '70%', borderRadius: 0 }}>
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px' }} variant="subtitle2" component="div">b</div>
        </Handle>
        <Typography sx={{lineHeight: '80px'}} variant="body1" component="div">OR</Typography>
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          style={{ top: '30%', borderRadius: 0 }}
        >
          <Typography style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">true</Typography>
        </Handle>
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          style={{ top: '70%', borderRadius: 0 }}
        >
          <div style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">false</div>
        </Handle>
      </Box>
    );
  };
  