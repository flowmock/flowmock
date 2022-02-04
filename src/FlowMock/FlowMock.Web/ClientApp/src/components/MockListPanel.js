import * as React from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export function MockListPanel(props) {

  const handleClick = (event, row) => {
    if(props.onSelected) { props.onSelected(row); }
  };

  return (
    <Box sx={{overflowY: 'scroll', height: 'calc(100vh - 80px)', mt: 1}}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Priority</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.mocks.map((mock) => (
            <TableRow
              hover
              onClick={(event) => handleClick(event, mock)}
              selected={mock==props.selected} 
              key={mock.id}>
              <TableCell>{mock.priority}</TableCell>
              <TableCell>{mock.name}</TableCell>              
            </TableRow>))}
        </TableBody>
      </Table>
    </Box>);
}
