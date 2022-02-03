import * as React from 'react';
import ReactFlow, { addEdge, Controls, Background, removeElements } from 'react-flow-renderer';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
  const [mousePosition, setMousePosition] = React.useState({ pageX: 0, pageY: 0, clientX: 0, clientY: 0 });
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (reactflowInstance && props.elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, []);

  const onLoad = React.useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
      }
    },
    [reactflowInstance]
  );

  const onConnect = (params) => props.setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) => props.setElements((els) => removeElements(elementsToRemove, els));

  const handleContextMenu = (event) => {    
    setMousePosition({ pageX: event.pageX, pageY: event.pageY });
    setMenuOpen(true);
    event.preventDefault();
  }

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleAddElement = (type) => {
    let projected = reactflowInstance.project({ x: mousePosition.pageX - 270, y: mousePosition.pageY - 110 });

    props.setElements([...props.elements, {
      id: `${type}-foo`,
      type: type,
      targetPosition: 'left',
      position: projected,
    }]);

    setMenuOpen(false);
  }

  return (<Box sx={{ width: '100%', height: 'calc(100vh - 121px)' }} onContextMenu={handleContextMenu}>
    <ReactFlow elements={props.elements} nodeTypes={nodeTypes} onLoad={onLoad} onConnect={onConnect} onElementsRemove={onElementsRemove} snapToGrid={true} deleteKeyCode={46} >
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={{ top: mousePosition.pageY, left: mousePosition.pageX }}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleAddElement('gotRequest')}>Got Request</MenuItem>
        <MenuItem onClick={() => handleAddElement('returnMockResponse')}>Return Mock Response</MenuItem>
        <MenuItem onClick={() => handleAddElement('returnProxyResponse')}>Return Proxy Response</MenuItem>
        <MenuItem onClick={() => handleAddElement('requestHeader')}>Request Header</MenuItem>
        <MenuItem onClick={() => handleAddElement('queryString')}>QueryString</MenuItem>
        <MenuItem onClick={() => handleAddElement('requestBody')}>Body</MenuItem>
        <MenuItem onClick={() => handleAddElement('twoAnd')}>AND</MenuItem>
        <MenuItem onClick={() => handleAddElement('twoOr')}>OR</MenuItem>
      </Menu>
      <Controls />
      <Background variant="lines" />
    </ReactFlow>
  </Box>)
}