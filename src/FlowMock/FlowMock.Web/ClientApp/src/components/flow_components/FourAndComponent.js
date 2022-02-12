import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const FourAndComponent = ({ data }) => {
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
        <Handle type="target" id="execIn" position={Position.Left} style={{ top: '20%', height: '12px', width: '12px', left: '-6px' }}>
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">ex</div>
        </Handle>
        <Handle type="target" id="a" position={Position.Left} style={{ top: '40%', height: '12px', width: '12px', left: '-6px' }} >
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">a</div>
        </Handle>
        <Handle type="target" id="b" position={Position.Left} style={{ top: '55%', height: '12px', width: '12px', left: '-6px' }}>
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px' }} variant="subtitle2" component="div">b</div>
        </Handle>
        <Handle type="target" id="c" position={Position.Left} style={{ top: '70%', height: '12px', width: '12px', left: '-6px' }} >
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">c</div>
        </Handle>
        <Handle type="target" id="d" position={Position.Left} style={{ top: '85%', height: '12px', width: '12px', left: '-6px' }}>
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px' }} variant="subtitle2" component="div">d</div>
        </Handle>
        <Typography sx={{lineHeight: '80px'}} variant="body1" component="div">AND</Typography>
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          style={{ top: '30%', height: '12px', width: '12px', right: '-6px' }}
        >
          <Typography style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">true</Typography>
        </Handle>
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          style={{ top: '70%', height: '12px', width: '12px', right: '-6px' }}
        >
          <div style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">false</div>
        </Handle>
      </Box>
    );
  };