import * as React from 'react';
import ReactFlow, { isEdge, addEdge, MiniMap, Controls, Background, removeElements } from 'react-flow-renderer';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { QueryStringComponent } from './flow_components/QueryStringComponent';
import { GotRequestComponent } from './flow_components/GotRequestComponent';
import { RequestBodyComponent } from './flow_components/RequestBodyComponent';
import { RequestHeaderComponent } from './flow_components/RequestHeaderComponent';
import { ReturnMockComponent } from './flow_components/ReturnMockComponent';
import { ReturnProxyComponent } from './flow_components/ReturnProxyComponent';
import { TwoAndComponent } from './flow_components/TwoAndComponent';
import { TwoOrComponent } from './flow_components/TwoOrComponent';
import { DelayComponent } from './flow_components/DelayComponent';
import { RequestHttpMethodComponent } from './flow_components/RequestHttpMethodComponent';  
import { RequestUrlComponent } from './flow_components/RequestUrlComponent';
import { FourAndComponent } from './flow_components/FourAndComponent';

const nodeTypes = {
  gotRequest: GotRequestComponent,
  requestHeader: RequestHeaderComponent,
  requestBody: RequestBodyComponent,
  returnMockResponse: ReturnMockComponent,
  returnProxyResponse: ReturnProxyComponent,
  queryString: QueryStringComponent,
  twoAnd: TwoAndComponent,
  fourAnd: FourAndComponent,
  twoOr: TwoOrComponent,
  delay: DelayComponent,
  requestHttpMethod: RequestHttpMethodComponent,
  requestUrl: RequestUrlComponent
};
  
export function MockTriggerEditor({trigger, onReactFlowInstanceLoad}) {
  const [reactflowInstance, setReactflowInstance] = React.useState(null);
  const [elements, setElements] = React.useState([]);

  const [mousePosition, setMousePosition] = React.useState({ pageX: 0, pageY: 0, clientX: 0, clientY: 0 });
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if(trigger.elements) {
      setElements(trigger.elements.map(e => {
        e.data = {...e.data, onChange: handleElementChange}
        return e;
      }));
    }

    if (reactflowInstance && trigger.position) {
      const [x = 0, y = 0] = trigger.position;
      reactflowInstance.setTransform({ x, y, zoom: trigger.zoom || 0 });      
    }

    if (reactflowInstance) {
      onReactFlowInstanceLoad(reactflowInstance);
    }

  }, [trigger, onReactFlowInstanceLoad, reactflowInstance]);

  const onConnect = (params) => {
      setElements((els) => addEdge(params, els))
  };

  const onLoad = React.useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
      }
    },
    [reactflowInstance]
  );

  const onElementsRemove = (elementsToRemove) =>
  setElements((els) => removeElements(elementsToRemove, els));

  const handleContextMenu = (event) => {    
    setMousePosition({ pageX: event.pageX, pageY: event.pageY });
    setMenuOpen(true);
    event.preventDefault();
  }

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleElementChange = (data) => {
    setElements((els) => els.map((e) => {
      if (isEdge(e) || e.data !== data) {
        return e;
      }

      return {
        ...e,
        data: {
          ...e.data
        },
      };
    }))
  };

  const randomString = (length, chars) => {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  
  const handleAddElement = (type) => {
    let projected = reactflowInstance.project({ x: mousePosition.pageX - 270, y: mousePosition.pageY - 110 });

    setElements([...elements, {
      id: `${type}-${randomString(15, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}`,
      type: type,
      position: projected,
      data: { onChange: handleElementChange }
    }]);

    setMenuOpen(false);
  }

  return (<Box sx={{ width: '100%', height: 'calc(100vh - 160px)' }} onContextMenu={handleContextMenu}>
    <ReactFlow elements={elements} nodeTypes={nodeTypes} onLoad={onLoad} onConnect={onConnect} onElementsRemove={onElementsRemove} snapToGrid={true} deleteKeyCode={46} key="edges">
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={{ top: mousePosition.pageY, left: mousePosition.pageX }}
        open={menuOpen}
        onClose={handleClose}
      >
        <Divider><Typography variant='caption'>Inputs/Outputs</Typography></Divider>
        <MenuItem onClick={() => handleAddElement('gotRequest')}>Got Request Event</MenuItem>
        <MenuItem onClick={() => handleAddElement('returnMockResponse')}>Return Mock Response</MenuItem>
        <MenuItem onClick={() => handleAddElement('returnProxyResponse')}>Return Proxy Response</MenuItem>
        <Divider><Typography variant='caption'>Requests</Typography></Divider>
        <MenuItem onClick={() => handleAddElement('requestUrl')}>Request URL</MenuItem>
        <MenuItem onClick={() => handleAddElement('requestHttpMethod')}>Request HTTP Method</MenuItem>
        <MenuItem onClick={() => handleAddElement('requestHeader')}>Request Header</MenuItem>
        <MenuItem onClick={() => handleAddElement('queryString')}>QueryString</MenuItem>
        <MenuItem onClick={() => handleAddElement('requestBody')}>Body</MenuItem>
        <Divider><Typography variant='caption'>Conditions</Typography></Divider>
        <MenuItem onClick={() => handleAddElement('twoAnd')}>2-AND</MenuItem>
        <MenuItem onClick={() => handleAddElement('twoOr')}>2-OR</MenuItem>
        <MenuItem onClick={() => handleAddElement('fourAnd')}>4-AND</MenuItem>
        <Divider><Typography variant='caption'>Utilities</Typography></Divider>
        <MenuItem onClick={() => handleAddElement('delay')}>Delay</MenuItem>
      </Menu>
      <Controls />
      <Background variant="lines" color="#dfdfdf" />
    </ReactFlow>
  </Box>)
}