import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const NameOpValueRow = (props) => {
  const [name, setName] = React.useState('')
  const [op, setOp] = React.useState('equals');
  const [value, setValue] = React.useState('');
  const [nameInputChangeTimer, setNameInputChangeTimer] = React.useState(null);

  React.useEffect(() => {    
    setName(props.name);
    setOp(props.op);
    setValue(props.value);    
  }, [props.name, props.op, props.value])

  const handleNameChange = (_, newValue) => {    
    setName(newValue);
    props.onChange({name: props.name, op: props.op, value: props.value}, {name: newValue ? newValue.label : '', op, value});
  }

  const handleNameInputChange = (_, newValue) => {
    setName(newValue);

    clearTimeout(nameInputChangeTimer);
    setNameInputChangeTimer(
      setTimeout(() => {
        props.onChange({name: props.name, op: props.op, value: props.value}, {name: newValue, op, value});
    }, 1000));
  }

  const handleOpChange = (e) => {
    setOp(e.target.value);
    props.onChange({name: props.name, op: props.op, value: props.value}, {name, op: e.target.value, value});
  }

  const handleValueChange = (e) => {
    setValue(e.target.value);
    props.onChange({name: props.name, op: props.op, value: props.value}, {name, op, value: e.target.value});
  }

  return (
    <Stack direction="row" spacing={1}>
      <Autocomplete
        disablePortal
        freeSolo
        options={props.nameSelectList}
        sx={{ width: 300 }}
        value={name}
        onChange={handleNameChange}
        onInputChange={handleNameInputChange}
        renderInput={(params) => <TextField {...params} label={props.nameLabel} />}
      />
      <Select
        sx={{ width: 130 }}
        size="small"
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
      <TextField sx={{ width: 200 }} label="Field" size="small" value={value} onChange={handleValueChange} variant="outlined" />
      <IconButton component="span" onClick={() => props.showAdd ? props.onAdd() : props.onRemove({name, op, value})}>
        {props.showAdd ? (<AddIcon />) : (<RemoveIcon />)}
      </IconButton>
    </Stack>);
}