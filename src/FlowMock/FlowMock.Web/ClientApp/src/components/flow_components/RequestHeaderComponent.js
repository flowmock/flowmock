import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const commonHeaders = [
  { label: 'Host' },
  { label: 'User-Agent' },
  { label: 'Accept' },
  { label: 'Accept-Language' },
  { label: 'Accept-Encoding' },
  { label: 'Referer' },
  { label: 'Connection' },
  { label: 'Cache-Control' },
]

export const RequestHeaderComponent = ({ data }) => {
  const [headers, setHeaders] = React.useState([{name: "Host", op: "equals", value: "google.com"}, {name: "Accept", op: "equals", value: "text/json"}])

    const [operator, setOperator] = React.useState('equals');
  
    const handleChange = (event) => {
      setOperator(event.target.value);
    };

    const handleAddClick = () => {
      setHeaders([...headers, {name: "", op: "equals", value: ""}]);
    }

    const handleRemoveClick = (header) => {
      setHeaders(headers.filter(h => h != header));
    }
  
    return (
      <Stack direction="column" spacing={1} sx={{
        pb: 1,
        pr: 8,
        pl: 4,
        display: 'flex',
        borderRadius: '3px',
        borderStyle: 'solid',
        borderWidth: '1px',
        backgroundColor: "#ffffff"
      }}>
        <Handle type="target" id="exec" position={Position.Left} style={{ top: '50%', borderRadius: 0 }}>
          <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">ex</div>
        </Handle>
        {headers.map((header, index) => (
          <Stack key={header.name} direction="row" spacing={1}><Autocomplete
            disablePortal
            options={commonHeaders}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} value={header.name} label="Header" />}
          />
          <Select
            sx={{ width: 130 }}
            value={header.op}
            label="Op"
            onChange={handleChange}
          >
            <MenuItem value='equals'>Equals</MenuItem>
            <MenuItem value='contains'>Contains</MenuItem>
            <MenuItem value='startsWith'>StartsWith</MenuItem>
            <MenuItem value={'endsWith'}>EndsWith</MenuItem>
            <MenuItem value={'regex'}>RegExMatch</MenuItem>
          </Select>
          <TextField sx={{ width: 200}} value={header.value} label="Field" variant="outlined" />
          <IconButton component="span" onClick={() => index===headers.length-1 ? handleAddClick() : handleRemoveClick(header)}>
            {index===headers.length-1 ? (<AddIcon />) : (<RemoveIcon />)}
          </IconButton>
          </Stack>))}
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