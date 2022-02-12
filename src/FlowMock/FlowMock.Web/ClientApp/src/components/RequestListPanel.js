import * as React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";


import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export function RequestListPanel() {
  const { requestId } = useParams();
  const [requests, setRequests] = React.useState([]);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    let response = await axios.get('/api/request?limit=1000&fields=id,response_status,url,request_method,url,response_body,mock_id');
    let requests = await response.data;
    setRequests(requests);
  }

  React.useEffect(() => {
    fetchRequests();
  }, [requestId]);

  const handleClick = (requestId) => {    
    navigate(`/requests/${requestId}`);
  };

  return (
    <Box sx={{overflowY: 'scroll', height: 'calc(100vh - 63px)', mt: 1}}>
      <Table stickyHeader size="small">
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
          {requests.map((request) => (
            <TableRow
              hover
              onClick={() => handleClick(request.id)}
              selected={request.id===parseInt(requestId)}
              key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.responseStatus}</TableCell>
              <TableCell>{request.url ? new URL(request.url).host : 'N/A'}</TableCell>
              <TableCell>{request.requestMethod}</TableCell>
              <TableCell>{request.url ?new URL(request.url).pathname : 'N/A'}</TableCell>
              <TableCell>{request.responseBody.length}</TableCell>
              <TableCell>{request.mockId ? 'Yes' : 'No'}</TableCell>
            </TableRow>))}
        </TableBody>
      </Table>
    </Box>);
}
