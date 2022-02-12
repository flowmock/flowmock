import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { NameOpValueRow } from './NameOpValueRow';

const commonHeaders = [
  { label: 'Host' },
  { label: 'User-Agent' },
  { label: 'Accept' },
  { label: 'Accept-Language' },
  { label: 'Accept-Encoding' },
  { label: 'Referer' },
  { label: 'Connection' },
  { label: 'Cache-Control' },
  { label: 'Content-Type' },  
]

export const RequestHeaderComponent = ({ data }) => {
  const [headers, setHeaders] = React.useState([{name: "", op: "equals", value: ""}])
  
  React.useEffect(() => {
    if(data && data.headers) {
      setHeaders(data.headers);
    }
  }, [data])
  
  const handleHeaderChange = (oldKovRow, newKovRow) => {
    let newHeaders = headers.map((header) => header.name === oldKovRow.name ? {name: newKovRow.name, op: newKovRow.op, value: newKovRow.value} : header);
    setHeaders(newHeaders);
    data.headers = newHeaders;
    data.onChange(data);
  };

  const handleAddHeader = () => {
    let newHeaders = [...headers, {name: "", op: "equals", value: ""}];
    setHeaders(newHeaders);
    data.headers = newHeaders;
    data.onChange(data);
  }

  const handleRemoveHeader = (kovRow) => {
    let newHeaders = headers.filter(header => header.name !== kovRow.name);
    setHeaders(newHeaders);
    data.headers = newHeaders;
    data.onChange(data);
  }

  return (
    <Stack direction="column" spacing={1} sx={{
      pb: 1,
      pr: 8,
      pl: 4,
      display: 'flex',
      borderRadius: '3px',
      borderStyle: 'solid',
      borderWidth: '1px',
      backgroundColor: "#ffffff"
    }}>
      <Handle type="target" id="execIn" position={Position.Left} style={{ top: '20%', height: '12px', width: '12px', left: '-6px' }}>
        <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">ex</div>
      </Handle>
      {headers.map((header, index) => (
        <NameOpValueRow
          key={header.name}
          name={header.name}
          nameLabel={"Header"}
          nameSelectList={commonHeaders}
          op={header.op}
          value={header.value}
          showAdd={index===headers.length-1}
          onChange={handleHeaderChange}
          onAdd={handleAddHeader}
          onRemove={handleRemoveHeader}
        />))}
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ top: '30%', height: '12px', width: '12px', right: '-6px' }}
      >
        <Typography style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">true</Typography>
      </Handle>
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ top: '70%', height: '12px', width: '12px', right: '-6px' }}
      >
        <div style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">false</div>
      </Handle>
    </Stack>
  );
};