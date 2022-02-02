import * as React from 'react';
import Box from '@mui/material/Box';
import ReactFlow, { addEdge, Controls, Background } from 'react-flow-renderer';

import { QueryStringComponent } from './flow_components/QueryStringComponent';
import { GotRequestComponent } from './flow_components/GotRequestComponent';
import { RequestBodyComponent } from './flow_components/RequestBodyComponent';
import { RequestHeaderComponent } from './flow_components/RequestHeaderComponent';
import { ReturnMockComponent } from './flow_components/ReturnMockComponent';
import { ReturnProxyComponent } from './flow_components/ReturnProxyComponent';
import { TwoAndComponent } from './flow_components/TwoAndComponent';
import { TwoOrComponent } from './flow_components/TwoOrComponent';

const initialElements = [
  {
    id: '1',
    type: 'gotRequest', // input node
    sourcePosition: 'right',
    data: { label: 'Got Request' },
    position: { x: 25, y: 25 },
  },
  // default node
  {
    id: '2',
    type: 'requestHeader',
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 300, y: 100 },
    data: { text: 'A custom node' },
  },  
  {
    id: '3',
    type: 'returnMockResponse', // output node
    targetPosition: 'left',
    data: { label: 'Return Mock Response' },
    position: { x: 1500, y: 250 },
  },
  {
    id: '8',
    type: 'returnProxyResponse', // output node
    targetPosition: 'left',
    data: { label: 'Return Proxy Response' },
    position: { x: 1500, y: 350 },
  },
  {
    id: '4',
    type: 'requestBody',
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 300, y: 500 },
    data: { text: 'A custom node' },
  },
  {
    id: '5',
    type: 'twoAnd',
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 1200, y: 250 },
    data: { text: 'A custom node' },
  },
  {
    id: '6',
    type: 'twoOr',
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 25, y: 500 },
    data: { text: 'A custom node' },
  },
  {
    id: '7',
    type: 'queryString',
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 300, y: 1000 },
    data: { text: 'A custom node' },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2'},
  { id: 'e2-5', source: '2', target: '5', targetHandle: 'a' },
  { id: 'e3-5', source: '4', target: '5', targetHandle: 'b' },
  { id: 'e5-3', source: '5', sourceHandle: 'true', target: '3'},
];
  
const nodeTypes = {
  gotRequest: GotRequestComponent,
  requestHeader: RequestHeaderComponent,
  requestBody: RequestBodyComponent,
  returnMockResponse: ReturnMockComponent,
  returnProxyResponse: ReturnProxyComponent,
  queryString: QueryStringComponent,
  twoAnd: TwoAndComponent,
  twoOr: TwoOrComponent,  
};
  
export function MockTriggerEditor(props) {
  const [reactflowInstance, setReactflowInstance] = React.useState(null);
  const [elements, setElements] = React.useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));
    
  React.useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);

  const onLoad = React.useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
      }
    },
    [reactflowInstance]
  );

  return (<Box sx={{ width: '100%', height: 'calc(100vh - 121px)' }}>        
    <ReactFlow elements={elements} nodeTypes={nodeTypes} onLoad={onLoad} onConnect={onConnect}>
      <Controls />
      <Background variant="lines" />
    </ReactFlow>
  </Box>)
}