import * as React from 'react';
import ReactFlow, { addEdge, Controls, Background, removeElements } from 'react-flow-renderer';
import uuidv4 from 'uuid/v4';

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
  const [mousePosition, setMousePosition] = React.useState({ pageX: 0, pageY: 0, clientX: 0, clientY: 0 });
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.reactflowInstance && props.trigger.position) {
      const [x = 0, y = 0] = props.trigger.position;
      props.reactflowInstance.setTransform({ x, y, zoom: props.trigger.zoom || 0 });
    }
  }, [props.reactflowInstance]);

  const onLoad = React.useCallback(
    (rfi) => {
      if (!props.reactflowInstance) {
        props.setReactflowInstance(rfi);
      }
    },
    [props.reactflowInstance]
  );

  const onConnect = (params) => {
    props.trigger.elements = addEdge(params, props.trigger.elements);
    props.setTrigger(props.trigger);
  }

  const onElementsRemove = (elementsToRemove) => {
    props.trigger.elements = removeElements(elementsToRemove, props.trigger.elements)
    props.setTrigger(props.trigger);
  }

  const handleContextMenu = (event) => {    
    setMousePosition({ pageX: event.pageX, pageY: event.pageY });
    setMenuOpen(true);
    event.preventDefault();
  }

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleAddElement = (type) => {
    let projected = props.reactflowInstance.project({ x: mousePosition.pageX - 270, y: mousePosition.pageY - 110 });

    if (props.trigger.elements) {
      props.trigger.elements = [...props.trigger.elements, {
        id: `${type}-${uuidv4()}`,
        type: type,
        targetPosition: 'left',
        position: projected,
      }];
    } else {
      props.trigger.elements = [{
        id: `${type}-${uuidv4()}`,
        type: type,
        targetPosition: 'left',
        position: projected,
      }];
    }

    props.setTrigger(props.trigger);
    setMenuOpen(false);
  }

  if(!props.trigger) {
    return "No trigger available";
  }

  return (<Box sx={{ width: '100%', height: 'calc(100vh - 170px)' }} onContextMenu={handleContextMenu}>
    <ReactFlow elements={props.trigger.elements} nodeTypes={nodeTypes} onLoad={onLoad} onConnect={onConnect} onElementsRemove={onElementsRemove} snapToGrid={true} deleteKeyCode={46} >
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={{ top: mousePosition.pageY, left: mousePosition.pageX }}
        open={menuOpen}
        onClose={handleClose}
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