import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const DelayComponent = ({ data }) => {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    if(data && data.time) {
      setTime(data.time);
    }
  }, [data])

  const handleTimeChange = (event) => {
    setTime(parseInt(event.target.value))
    data.time = parseInt(event.target.value)
    data.onChange();
  }

  return (
    <Box sx={{
      pl: 5,
      pb: 1,
      pt: 1,
      pr: 8,
      display: 'flex',
      width: 400,
    }}>
      <Handle type="target" id="execIn" position={Position.Left} style={{ top: '20%', height: '12px', width: '12px', left: '-6px' }}>
        <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">ex</div>
      </Handle>
      <TextField sx={{ width: '100%'}} label="Time" variant="outlined" size="small" value={time} onChange={handleTimeChange} />
      <Handle
        type="source"
        position={Position.Right}
        id="execOut"
        style={{ top: '30%', height: '12px', width: '12px', right: '-6px' }}
      >
        <Typography style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">ex</Typography>
      </Handle>
    </Box>
  );
};
