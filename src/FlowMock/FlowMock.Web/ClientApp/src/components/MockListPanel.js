import * as React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export function MockListPanel(props) {
  const { mockId } = useParams();
  const [mocks, setMocks] = React.useState([]);
  const navigate = useNavigate();

  async function fetchMocks() {
    let response = await axios.get('/api/mock?fields=id,name,priority');
    let mocks = await response.data; 
    setMocks(mocks);
  }

  const handleAddMock = async () => {
    const mock = {
      priority: 100,
      name: 'A simple mock.',
      description: 'A description for a simple mock',
      parameters: [],
      trigger: {},
      responseHeaders: [],
      responseStatus: 200,
      responseBody: ''
    };

    let sendMock = {...mock}

    sendMock.parameters = JSON.stringify(mock.parameters);
    sendMock.trigger = JSON.stringify(mock.trigger);
    sendMock.responseHeaders = mock.responseHeaders ? JSON.stringify(mock.responseHeaders) : "[]";
    let response = await axios.post(`/api/mock/`, sendMock);   
    navigate(`/mocks/${response.data.id}`);
  }

  React.useEffect(() => {
    fetchMocks();
  }, [mockId]);

  const handleClick = (mockId) => {
    navigate(`/mocks/${mockId}`);
  };

  return (
    <Box sx={{overflowY: 'scroll', height: 'calc(100vh - 80px)', mt: 1}}>
      <IconButton component="span" onClick={handleAddMock}>
        <AddIcon />
      </IconButton>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Priority</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mocks.map((mock) => (
            <TableRow
              hover
              onClick={() => handleClick(mock.id)}
              selected={mock.id===parseInt(mockId)} 
              key={mock.id}>
              <TableCell>{mock.priority}</TableCell>
              <TableCell>{mock.name}</TableCell>              
            </TableRow>))}
        </TableBody>
      </Table>
    </Box>);
}
