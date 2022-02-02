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

const queryStringKeys = []

export const QueryStringComponent = ({ data }) => {
  const [queryStrings, setQueryStrings] = React.useState([{name: "foo", op: "equals", value: "bar"}, {name: "bar", op: "equals", value: "foo"}])

    const [operator, setOperator] = React.useState('equals');
  
    const handleChange = (event) => {
      setOperator(event.target.value);
    };

    const handleAddClick = () => {
      setQueryStrings([...queryStrings, {name: "", op: "equals", value: ""}]);
    }

    const handleRemoveClick = (header) => {
      setQueryStrings(queryStrings.filter(h => h != header));
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
        {queryStrings.map((queryString, index) => (
          <Stack key={queryString.name} direction="row" spacing={1}><Autocomplete
            disablePortal
            options={queryStringKeys}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} value={queryString.name} label="QueryString" />}
          />
          <Select
            sx={{ width: 130 }}
            value={queryString.op}
            label="Op"
            onChange={handleChange}
          >
            <MenuItem value='equals'>Equals</MenuItem>
            <MenuItem value='contains'>Contains</MenuItem>
            <MenuItem value='startsWith'>StartsWith</MenuItem>
            <MenuItem value={'endsWith'}>EndsWith</MenuItem>
            <MenuItem value={'regex'}>RegExMatch</MenuItem>
          </Select>
          <TextField sx={{ width: 200}} value={queryString.value} label="Field" variant="outlined" />
          <IconButton component="span" onClick={() => index===queryStrings.length-1 ? handleAddClick() : handleRemoveClick(queryString)}>
            {index===queryStrings.length-1 ? (<AddIcon />) : (<RemoveIcon />)}
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