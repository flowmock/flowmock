import * as React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { HeaderList } from './HeaderList';
import Button from '@mui/material/Button';
import { CodeBlock } from "react-code-blocks";
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const HTTP_STATUS_CODES = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported'
};

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
        "style": {strokeWidth: "3"},
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function RequestViewerPanel(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = React.useState(null);
  const [requestTabIndex, setRequestTabIndex] = React.useState(0);
  const [responseTabIndex, setResponseTabIndex] = React.useState(0);

  const fetchRequest = async (id) => {
    let response = await axios.get(`/api/request/${id}`);
    let request = await response.data;
    request.requestHeaders = Object.entries(JSON.parse(request.requestHeaders));
    request.responseHeaders = Object.entries(JSON.parse(request.responseHeaders));
    setRequest(request);
  }

  React.useEffect(() => {
    if(params.requestId) {
      fetchRequest(params.requestId);
    }
  }, [params.requestId]);

  if (!request) {
    return <Box sx={{m:1, mt: 4, textAlign: 'center'}}><Typography>Select a request to view details.</Typography></Box>
  }

  const formatResponeBody = (headers, rawText) => {
    if(determineLanguage(headers) === "json") {
      return JSON.stringify(JSON.parse(rawText), null, 2);
    } else {
      return rawText;
    }
  }

  const determineLanguage = (headers) => {
    const contentTypeHeader = headers.find(h => h[0] === 'Content-Type');
    if(!contentTypeHeader) { return "text"; }
    if(contentTypeHeader[1][0].includes('application/json')) { return "json"; }
    if(contentTypeHeader[1][0].includes('text/html')) { return "html"; }
    if(contentTypeHeader[1][0].includes('application/xml')) { return "xml"; }
    if(contentTypeHeader[1][0].includes('+xml')) { return "xml"; }
    return "text";
  }

  const handleOnCreateMockClick = async (request) => {
    const mock = {
      priority: 100,
      name: `A mock created from request #${request.id}.`,
      description: 'A mock created from a request.',
      parameters: [],
      trigger: request.requestMethod === "GET" ? generateGetTrigger(request) : generatePostTrigger(request),
      responseHeaders: request.responseHeaders.map((header) => ({name: header[0], value: header[1].join(';')})),
      responseStatus: request.responseStatus,
      responseBody: request.responseBody
    }

    let sendMock = {...mock}
    sendMock.parameters = JSON.stringify(mock.parameters);
    sendMock.trigger = JSON.stringify(mock.trigger);
    sendMock.responseHeaders = JSON.stringify(mock.responseHeaders);
  
    let response = await axios.post(`/api/mock`, sendMock);
    navigate(`/mocks/${response.data.id}`);
  }

  return (
    <Stack sx={{height: 'calc(100vh - 85px)', mt: 1, mr: 1}} direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={1}>
      <Box sx={{ width: '100%', height: '50%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={requestTabIndex} onChange={(e, tabIndex) => setRequestTabIndex(tabIndex)}>
            <Tab label="Headers" />
            <Tab label="Body" />
            <Tab label="Mock" />
          </Tabs>
        </Box>
        <TabPanel value={requestTabIndex} index={0}>
          <HeaderList headers={request.requestHeaders} />
        </TabPanel>
        <TabPanel value={requestTabIndex} index={1}>
          <CodeBlock
            customStyle={{height: 'calc(50vh - 85px)'}}
            text={formatResponeBody(request.requestHeaders, request.requestBody)}
            language={determineLanguage(request.requestHeaders)}
            showLineNumbers={false}
          />
        </TabPanel>
        <TabPanel value={requestTabIndex} index={2}>
          <Box sx={{m:1}}>
            <Button variant="outlined" startIcon={<AccountTreeIcon />} onClick={() => handleOnCreateMockClick(request)}>
              Create Mock from Request
            </Button>
          </Box>
        </TabPanel>
      </Box>
      <Box sx={{ width: '100%', height: '50%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={responseTabIndex} onChange={(e, tabIndex) => setResponseTabIndex(tabIndex)}>
            <Tab label="Headers" />
            <Tab label="Body" />
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', mb:1, mr:1}}>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box sx={{ pl:1, pr:1 }}><Typography variant="body2">Status: {request.responseStatus} {HTTP_STATUS_CODES[request.responseStatus]}</Typography></Box>
              <Box sx={{ pl:1, pr:1 }}><Typography variant="body2">Time: {request.responseTime}ms</Typography></Box>
              <Box sx={{ pl:1, pr:1 }}><Typography variant="body2">Size: {request.responseBody.length}B</Typography></Box>
            </Box>
          </Tabs>
        </Box>
        <TabPanel value={responseTabIndex} index={0}>
          <HeaderList headers={request.responseHeaders} />
        </TabPanel>
        <TabPanel value={responseTabIndex} index={1}>
          <CodeBlock
            customStyle={{height: 'calc(50vh - 85px)'}}
            text={formatResponeBody(request.responseHeaders, request.responseBody)}
            language={determineLanguage(request.responseHeaders)}
            showLineNumbers={false}
          />
        </TabPanel>
      </Box>
    </Stack>
  );
}