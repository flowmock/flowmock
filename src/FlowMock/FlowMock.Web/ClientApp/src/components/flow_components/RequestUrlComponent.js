import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const RequestUrlComponent = ({ data }) => {
  const [op, setOp] = React.useState('equals');
  const [text, setText] = React.useState('');
  const [textChangeTimer, setTextChangeTimer] = React.useState(null);

  React.useEffect(() => {
    if(data.op) {
      setOp(data.op);
    }
    if(data.text) {
      setText(data.text);
    }
  }, [data])

  const handleOpChange = (event) => {
    setOp(event.target.value);
    data.op = event.target.value;
    data.text = text;
    data.onChange();
  };

  const handleTextChange = (event) => {
    setText(event.target.value)

    clearTimeout(textChangeTimer);
    setTextChangeTimer(
      setTimeout(() => {
        data.op = op;
        data.text = event.target.value;
        data.onChange();
    }, 1000));
  }


  return (
    <Box sx={{
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
      <Stack direction="row" spacing={1} sx={{
        width: '100%'
      }}>
        <Handle type="target" id="execIn" position={Position.Left} style={{ top: '20%', height: '12px', width: '12px', left: '-6px' }}>
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">ex</div>
        </Handle>
        <Select
          sx={{ width: '100%' }}
          value={op}
          label="Op"
          size="small"
          onChange={handleOpChange}
        >
          <MenuItem value='equals'>Equals</MenuItem>
          <MenuItem value='contains'>Contains</MenuItem>
          <MenuItem value='startsWith'>StartsWith</MenuItem>
          <MenuItem value={'endsWith'}>EndsWith</MenuItem>
          <MenuItem value={'regex'}>RegExMatch</MenuItem>
        </Select>
        <TextField sx={{ width: '100%'}} label="URL" variant="outlined" size="small" value={text} onChange={handleTextChange} />
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
      </Stack>
    </Box>
  );
};
