import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
    <Stack direction="column" spacing={1} sx={{
      pl: 5,
      pb: 1,
      pt: 1,
      pr: 8,
      display: 'flex',
      borderRadius: '3px',
      borderStyle: 'solid',
      borderWidth: '1px',
      backgroundColor: "#ffffff",
      width: 400,
    }}>
      <Handle type="target" id="execIn" position={Position.Left} style={{ top: '20%', borderRadius: 0 }}>
        <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">ex</div>
      </Handle>
      <TextField sx={{ width: '100%'}} label="Time" variant="outlined" value={time} onChange={handleTimeChange} />
      <Handle
        type="source"
        position={Position.Right}
        id="execOut"
        style={{ top: '30%', borderRadius: 0 }}
      >
        <Typography style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">ex</Typography>
      </Handle>
    </Stack>
  );
};
