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
import RemoveIcon from '@mui/icons-material/Remove';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export function MockSettingsEditor(props) {
  
  const handleAddClick = () => {
    props.mock.parameters = [...props.mock.parameters, {name: "", value: ""}]
    props.setMock(props.mock);
  }

  const handleRemoveClick = (param) => {
    props.mock.parameters = props.mock.parameters.filter(p => p != param)
    props.setMock(props.mock);
  }

  const handleNameChange = (event) => {
    props.mock.name = event.target.value;
    props.setMock(props.mock);
  }

  const handlePriorityChange = (event) => {
    props.mock.priority = event.target.value;
    props.setMock(props.mock);
  }

  const handleDescriptionChange = (event) => {
    props.mock.description = event.target.value;
    props.setMock(props.mock);
  }

  const handleParamNameChange = (event, parameter) => {
    parameter.name = event.target.value; 
    props.setMock(props.mock);
  }

  const handleParamValueChange = (event, parameter) => {
    parameter.value = event.target.value;
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
      <TextField label="Name" variant="outlined" value={props.mock.name} onChange={handleNameChange} />
      <TextField label="Priority" variant="outlined" value={props.mock.priority} onChange={handlePriorityChange} />
      <TextField label="Description" multiline rows={4} variant="outlined" value={props.mock.description} onChange={handleDescriptionChange} />
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
            <TableRow key={parameter.name}>
              <TableCell>
                <IconButton component="span" onClick={() => handleRemoveClick(parameter)}>
                  <RemoveIcon />
                </IconButton>
              </TableCell>
              <TableCell><TextField label="Name" variant="outlined" value={parameter.name} fullWidth onChange={(e) => handleParamNameChange(e, parameter)} /></TableCell>
              <TableCell><TextField label="Value" variant="outlined" value={parameter.value} fullWidth onChange={(e) => handleParamValueChange(e, parameter)} /></TableCell>
            </TableRow>
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