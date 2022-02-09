import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const httpMethods = [
  "GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"
]

export const RequestHttpMethodComponent = ({ data }) => {
  const [method, setMethod] = React.useState('');

  React.useEffect(() => {
    if(data && data.method) {
      setMethod(data.method);
    }
  }, [data])

  const handleMethodChange = (_, newValue) => {    
    setMethod(newValue);
    data.method = newValue;
    data.onChange();
  }

  return (
    <Stack direction="row" spacing={1} sx={{
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
      <Autocomplete
        disablePortal
        options={httpMethods}
        sx={{ width: 300 }}
        value={method}
        onChange={handleMethodChange}
        renderInput={(params) => <TextField {...params} label="HTTP Method" />}
      />
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
    </Stack>
  );
};
