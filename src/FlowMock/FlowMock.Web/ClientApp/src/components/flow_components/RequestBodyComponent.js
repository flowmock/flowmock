import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const RequestBodyComponent = ({ data }) => {
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
      <Select
        sx={{ width: '100%' }}
        value={op}
        label="Op"
        onChange={handleOpChange}
      >
        <MenuItem value='equals'>Equals</MenuItem>
        <MenuItem value='contains'>Contains</MenuItem>
        <MenuItem value='startsWith'>StartsWith</MenuItem>
        <MenuItem value={'endsWith'}>EndsWith</MenuItem>
        <MenuItem value={'regex'}>RegExMatch</MenuItem>
      </Select>
      <TextField sx={{ width: '100%'}} multiline rows={4} label="Field" variant="outlined" value={text} onChange={handleTextChange} />
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
