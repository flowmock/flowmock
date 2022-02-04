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

export function MockResponseEditor(props) {

  const handleAddClick = () => {
    props.mock.responseHeaders = [...props.mock.responseHeaders, {name: "", value: ""}]
    props.setMock(props.mock);
  }

  const handleRemoveClick = (header) => {
    props.mock.reponseHeaders = props.mock.responseHeaders.filter(p => p != header)
    props.setMock(props.mock);
  }

  const handleStatusChange = (event) => {
    props.mock.responseStatus = event.target.value;
    props.setMock(props.mock);
  }

  const handleBodyChange = (event) => {
    props.mock.responseBody = event.target.value;
    props.setMock(props.mock);
  }

  const handleHeaderNameChange = (event, header) => {
    header.name = event.target.value; 
    props.setMock(props.mock);
  }

  const handleHeaderValueChange = (event, header) => {
    header.value = event.target.value;
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
      <TextField label="Status" variant="outlined" value={props.mock.responseStatus} onChange={handleStatusChange} />
      <TableContainer component={Paper}>
      <Table sx={{width: '100%'}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: '0px'}}></TableCell>
            <TableCell>Headers</TableCell>
            <TableCell>Value</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.mock.responseHeaders.map((header) => (
            <TableRow key={header.name}>
              <TableCell>
                <IconButton component="span" onClick={() => handleRemoveClick(header)}>
                  <RemoveIcon />
                </IconButton>
              </TableCell>
              <TableCell><TextField label="Name" variant="outlined" value={header.name} fullWidth onChange={(e) => handleHeaderNameChange(e, header)} /></TableCell>
              <TableCell><TextField label="Value" variant="outlined" value={header.value} fullWidth onChange={(e) => handleHeaderValueChange(e, header)} /></TableCell>
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
      <TextField label="Body" multiline rows={4} variant="outlined" value={props.mock.responseBody} onChange={handleBodyChange} />
    </Stack>
  );
}