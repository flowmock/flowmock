import * as React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import { RequestListPanel  } from '../components/RequestListPanel';
import { RequestViewerPanel } from '../components/RequestViewerPanel';
  
const generateGetTrigger = (request) => {
  return {
    "elements": [
      {
        "id":"gotRequest-xhfpfqU6hVLrp2V",
        "type":"gotRequest",
        "position":{"x":480,"y":180},
        "data":{}
      },
      {
        "id":"returnMockResponse-NHIJyWxrabi9Ae9",
        "type":"returnMockResponse",
        "position":{"x":1155,"y":285},
        "data":{}
      },
      {
        "id":"requestUrl-cgwFNJiz7CEPCc6",
        "type":"requestUrl",
        "position":{"x":135,"y":300},
        "data":{"op":"contains","text":new URL(request.url).pathname}
      },
      {
        "id":"requestHttpMethod-PDO0B2NP7pOFXLB",
        "type":"requestHttpMethod",
        "position":{"x":134.99999999999994,"y":390},
        "data":{"method":request.requestMethod}
      },
      {
        "id":"twoAnd-ta7Au9JDXXn65NZ",
        "type":"twoAnd",
        "position":{"x":855,"y":285},
        "data":{}
      },
      {
        "source":"requestHttpMethod-PDO0B2NP7pOFXLB",
        "sourceHandle":"true",
        "target":"twoAnd-ta7Au9JDXXn65NZ",
        "targetHandle":"b",
        "id":"reactflow__edge-requestHttpMethod-PDO0B2NP7pOFXLBtrue-twoAnd-ta7Au9JDXXn65NZb",
        "type":"default"
      },
      {
        "source":"requestUrl-cgwFNJiz7CEPCc6",
        "sourceHandle":"true",
        "target":"twoAnd-ta7Au9JDXXn65NZ",
        "targetHandle":"a",
        "id":"reactflow__edge-requestUrl-cgwFNJiz7CEPCc6true-twoAnd-ta7Au9JDXXn65NZa",
        "type":"default"
      },
      {
        "source":"gotRequest-xhfpfqU6hVLrp2V",
        "sourceHandle":"execOut",
        "target":"twoAnd-ta7Au9JDXXn65NZ",
        "targetHandle":"execIn",
        "id":"reactflow__edge-gotRequest-xhfpfqU6hVLrp2VexecOut-twoAnd-ta7Au9JDXXn65NZexecIn",
        "type":"default"
      },
      {
        "source":"twoAnd-ta7Au9JDXXn65NZ",
        "sourceHandle":"true",
        "target":"returnMockResponse-NHIJyWxrabi9Ae9",
        "targetHandle":"execIn",
        "id":"reactflow__edge-twoAnd-ta7Au9JDXXn65NZtrue-returnMockResponse-NHIJyWxrabi9Ae9execIn",
        "type":"default"
      }
    ],
    "position":[-114.32801276935334,50.67318435754197],
    "zoom":1.5802075019952113}
}

const generatePostTrigger = (request) => {
  return {
    "elements": [
      {
        "id":"gotRequest-xhfpfqU6hVLrp2V",
        "type":"gotRequest",
        "position":{"x":480,"y":180},
        "data":{}
      },
      {
        "id":"requestBody-DcjlDrJe07YGTSb",
        "type":"requestBody",
        "position":{"x":135,"y":570},
        "data":{"op":"equals","text":request.requestBody}
      },
      {
        "id":"returnMockResponse-NHIJyWxrabi9Ae9",
        "type":"returnMockResponse",
        "position":{"x":1395,"y":540},"data":{}
      },
      {
        "id":"fourAnd-GhgChRCVGRu8VCp",
        "type":"fourAnd",
        "position":{"x":1125,"y":510},"data":{}
      },
      {
        "id":"requestUrl-cgwFNJiz7CEPCc6",
        "type":"requestUrl",
        "position":{"x":135,"y":300},
        "data":{"op":"contains","text":new URL(request.url).pathname}
      },
      {
        "id":"requestHeader-Xs7pujR8oi6oIay",
        "type":"requestHeader",
        "position":{"x":-150,"y":480},
        "data":{"headers":[{"name":"Content-Type","op":"equals","value":"application/json"}]}
      },
      {
        "id":"requestHttpMethod-PDO0B2NP7pOFXLB",
        "type":"requestHttpMethod","position":{"x":134.99999999999994,"y":390},
        "data":{"method":request.requestMethod}
      },
      {
        "source":"gotRequest-xhfpfqU6hVLrp2V",
        "sourceHandle":"execOut",
        "target":"fourAnd-GhgChRCVGRu8VCp",
        "targetHandle":"execIn",
        "id":"reactflow__edge-gotRequest-xhfpfqU6hVLrp2VexecOut-fourAnd-GhgChRCVGRu8VCpexecIn",
        "type":"default",
        "data":{}
      },
      {
        "source":"requestUrl-cgwFNJiz7CEPCc6",
        "sourceHandle":"true",
        "target":"fourAnd-GhgChRCVGRu8VCp",
        "targetHandle":"a",
        "id":"reactflow__edge-requestUrl-cgwFNJiz7CEPCc6true-fourAnd-GhgChRCVGRu8VCpa",
        "type":"default",
        "data":{}
      },
      {
        "source":"requestBody-DcjlDrJe07YGTSb",
        "sourceHandle":"true",
        "target":"fourAnd-GhgChRCVGRu8VCp",
        "targetHandle":"d",
        "id":"reactflow__edge-requestBody-DcjlDrJe07YGTSbtrue-fourAnd-GhgChRCVGRu8VCpd",
        "type":"default",
        "data":{}
      },
      {
        "source":"fourAnd-GhgChRCVGRu8VCp",
        "sourceHandle":"true",
        "target":"returnMockResponse-NHIJyWxrabi9Ae9",
        "targetHandle":"execIn",
        "id":"reactflow__edge-fourAnd-GhgChRCVGRu8VCptrue-returnMockResponse-NHIJyWxrabi9Ae9execIn",
        "type":"default",
        "data":{}
      },
      {
        "source":"requestHeader-Xs7pujR8oi6oIay",
        "sourceHandle":"true",
        "target":"fourAnd-GhgChRCVGRu8VCp",
        "targetHandle":"c",
        "id":"reactflow__edge-requestHeader-Xs7pujR8oi6oIaytrue-fourAnd-GhgChRCVGRu8VCpc",
        "type":"default","data":{}
      },
      {
        "source":"requestHttpMethod-PDO0B2NP7pOFXLB",
        "sourceHandle":"true",
        "target":"fourAnd-GhgChRCVGRu8VCp",
        "targetHandle":"b",
        "id":"reactflow__edge-requestHttpMethod-PDO0B2NP7pOFXLBtrue-fourAnd-GhgChRCVGRu8VCpb",
        "type":"default","data":{}
      }
    ],
    "position":[266.0416197975254,22.18278965129366],
    "zoom":1.1136107986501687
  }
}

export function RequestViewPage() {
  const [requests, setRequests] = React.useState([]);
  const [activeRequest, setActiveRequest] = React.useState(null);
  const navigate = useNavigate();
  
  const fetchRequests = async () => {
    let response = await axios.get('/api/request');
    let requests = await response.data;

    setRequests(requests.map(request => {
      request.requestHeaders = Object.entries(JSON.parse(request.requestHeaders));
      request.responseHeaders = Object.entries(JSON.parse(request.responseHeaders));
      return request;
    }));
  }

  React.useEffect(() => {
    fetchRequests();
  }, []);

  const handleOnCreateMockClick = async () => {
    const mock = {
      priority: 100,
      name: `A mock created from request #${activeRequest.id}.`,
      description: 'A mock created from a request.',
      parameters: [],
      trigger: activeRequest.requestMethod == "GET" ? generateGetTrigger(activeRequest) : generatePostTrigger(activeRequest),
      responseHeaders: activeRequest.responseHeaders.map((header) => ({name: header[0], value: header[1].join(';')})),
      responseStatus: activeRequest.responseStatus,
      responseBody: activeRequest.responseBody
    }

    let sendMock = {...mock}
    sendMock.parameters = JSON.stringify(mock.parameters);
    sendMock.trigger = JSON.stringify(mock.trigger);
    sendMock.responseHeaders = JSON.stringify(mock.responseHeaders);
  
    await axios.post(`/api/mock`, sendMock);
    
    navigate('/mocks');
  }

  const handleOnRequestListSelected = (request) => {
    setActiveRequest(request);
  }

  return (
    <Stack sx={{ height: '100%' }} direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={1}>
      <Box sx={{ flexGrow: 1}}>
        <RequestListPanel requests={requests} selected={activeRequest} onSelected={handleOnRequestListSelected} />
      </Box>
      <Box sx={{ width: '600px'}}>
        <RequestViewerPanel request={activeRequest} onCreateMockClick={handleOnCreateMockClick} />
      </Box>
    </Stack>
  );
}
