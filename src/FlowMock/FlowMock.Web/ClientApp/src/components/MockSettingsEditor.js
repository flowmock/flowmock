import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { ParameterRow } from './ParameterRow';

export function MockSettingsEditor(props) {
  const [name, setName] = React.useState('');
  const [priority, setPriority] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [parameters, setParameters] = React.useState([]);

  React.useEffect(() => {
    if(props.mock) {
      setName(props.mock.name);
      setPriority(props.mock.priority);
      setDescription(props.mock.description);
      setParameters(props.mock.parameters);
    }
  }, [props.mock]);

  const handleAddClick = () => {
    setParameters([...parameters, {name: "", value: ""}])
    props.mock.parameters = [...parameters, {name: "", value: ""}]
    props.setMock(props.mock);
  }

  const handleRemoveClick = (param) => {
    setParameters(parameters.filter(p => p != param));
    props.mock.parameters = props.mock.parameters.filter(p => p != param);
    props.setMock(props.mock);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
    
    props.mock.name = event.target.value;
    props.setMock(props.mock);
  }

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);

    props.mock.priority = event.target.value;
    props.setMock(props.mock);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);

    props.mock.description = event.target.value;
    props.setMock(props.mock);
  }

  const handleParamChange = (oldParam, newParam) => {
    let newParams = parameters.map((param) => param.name == oldParam.name ? {name: newParam.name, value: newParam.value} : param);    
    setParameters([...newParams]);
    props.mock.parameters = [...newParams];
    props.setMock(props.mock);
  }

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      spacing={1}
      mt={1}
    >
      <TextField label="Name" variant="outlined" value={name} onChange={handleNameChange} />
      <TextField label="Priority" variant="outlined" value={priority} onChange={handlePriorityChange} />
      <TextField label="Description" multiline rows={4} variant="outlined" value={description} onChange={handleDescriptionChange} />
      <TableContainer component={Paper}>
      <Table sx={{width: '100%'}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '0px'}}></TableCell>
            <TableCell>Parameters</TableCell>
            <TableCell>Value</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.mock.parameters.map((parameter) => (
            <ParameterRow key={parameter.name} parameter={parameter} onRemove={handleRemoveClick} onChange={handleParamChange} />
          ))}
          <TableRow>
            <TableCell colSpan={3}>
              <IconButton component="span" onClick={handleAddClick}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Stack>
  );
}