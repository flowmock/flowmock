import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const ParameterRow = (props) => {
  const [name, setName] = React.useState('')
  const [value, setValue] = React.useState('');
  const [nameInputChangeTimer, setNameInputChangeTimer] = React.useState(null);

  React.useEffect(() => {    
    setName(props.parameter.name);
    setValue(props.parameter.value);    
  }, [props.name, props.value])

  const handleNameChange = (e) => {
    setName(e.target.value);

    clearTimeout(nameInputChangeTimer);
    setNameInputChangeTimer(
      setTimeout(() => {
        props.onChange({name: props.parameter.name, value: props.parameter.value}, {name: e.target.value, value});
    }, 1000));
  }

  const handleValueChange = (e) => {
    setValue(e.target.value);
    props.onChange({name: props.name, value: props.value}, {name, value: e.target.value});
  }

  return (
    <TableRow>
      <TableCell>
      <IconButton component="span" onClick={() => props.onRemove(props.parameter)}>
          <RemoveIcon />
      </IconButton>
      </TableCell>
      <TableCell><TextField label="Name" variant="outlined" value={name} fullWidth onChange={handleNameChange} /></TableCell>
      <TableCell><TextField label="Value" variant="outlined" value={value} fullWidth onChange={handleValueChange} /></TableCell>
    </TableRow>);
}