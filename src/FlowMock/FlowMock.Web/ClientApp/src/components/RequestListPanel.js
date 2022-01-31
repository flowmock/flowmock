import * as React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export function RequestListPanel(props) {

  const handleClick = (event, row) => {
    if(props.onSelected) { props.onSelected(row); }
  };

  return (
    <Box sx={{overflowY: 'scroll', height: 'calc(100vh - 80px)', mt: 1}}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Host</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Body</TableCell>
            <TableCell>Mocked?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.requests.map((request) => (
            <TableRow
              hover
              onClick={(event) => handleClick(event, request)}
              selected={request==props.selected} 
              key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.responseStatus}</TableCell>
              <TableCell>{new URL(request.url).host}</TableCell>
              <TableCell>{request.requestMethod}</TableCell>
              <TableCell>{new URL(request.url).pathname}</TableCell>
              <TableCell>{request.responseBody.length}</TableCell>
              <TableCell>No</TableCell>
            </TableRow>))}
        </TableBody>
      </Table>
    </Box>);
}
