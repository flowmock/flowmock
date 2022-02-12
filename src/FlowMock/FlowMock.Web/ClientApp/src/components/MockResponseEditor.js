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

import { ResponseHeaderRow } from './ResponseHeaderRow';

export function MockResponseEditor(props) {
  const [responseHeaders, setResponseHeaders] = React.useState([]);
  const [responseStatus, setResponseStatus] = React.useState('');
  const [responseBody, setResponseBody] = React.useState('');
  
  React.useEffect(() => {
    if(props.mock) {
      setResponseHeaders(props.mock.responseHeaders);
      setResponseStatus(props.mock.responseStatus);
      setResponseBody(props.mock.responseBody);
    }
  }, [props.mock]);

  const handleAddClick = () => {
    setResponseHeaders([...props.mock.responseHeaders, {name: "", value: ""}]);
    props.mock.responseHeaders = [...props.mock.responseHeaders, {name: "", value: ""}]
    props.setMock(props.mock);
  }

  const handleRemoveHeader = (header) => {
    setResponseHeaders(props.mock.responseHeaders.filter(p => p !== header));
    props.mock.reponseHeaders = props.mock.responseHeaders.filter(p => p !== header)
    props.setMock(props.mock);
  }

  const handleStatusChange = (event) => {
    setResponseStatus(event.target.value);
    props.mock.responseStatus = event.target.value;
    props.setMock(props.mock);
  }

  const handleBodyChange = (event) => {
    setResponseBody(event.target.value);
    props.mock.responseBody = event.target.value;
    props.setMock(props.mock);
  }

  const handleHeaderChange = (oldHeader, newHeader) => {
    let newHeaders = responseHeaders.map((header) => header.name === oldHeader.name ? {name: newHeader.name, value: newHeader.value} : header);
    props.mock.responseHeaders = [...newHeaders];
    props.setMock(props.mock);
  }

  return (
    <Stack
      component="form"
      noValidate
      autoComplete="off"
      spacing={2}
      mt={1}
    >      
      <TextField label="Status" variant="outlined" size="small" value={responseStatus} onChange={handleStatusChange} />
      <TextField label="Body" multiline rows={4} variant="outlined" size="small" value={responseBody} onChange={handleBodyChange} />
      <TableContainer component={Paper}>
        <Table sx={{width: '100%'}} size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: '0px'}}></TableCell>
              <TableCell>Headers</TableCell>
              <TableCell>Value</TableCell>            
            </TableRow>
          </TableHead>
          <TableBody>
            {responseHeaders.map((header) => (
              <ResponseHeaderRow key={header.name} header={header} onChange={handleHeaderChange} onRemove={handleRemoveHeader} />
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
  </Stack>);
}