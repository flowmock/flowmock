import * as React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { NameOpValueRow } from './NameOpValueRow';

export const QueryStringComponent = ({ data }) => {
  const [queryStrings, setQueryStrings] = React.useState([{name: "", op: "equals", value: ""}])

  React.useEffect(() => {
    if(data && data.queryStrings) {
      setQueryStrings(data.queryStrings);
    }
  }, [data])

  const handleQueryStringChange = (oldKovRow, newKovRow) => {
    let newQueryStrings = queryStrings.map((queryString) => queryString.name === oldKovRow.name ? {name: newKovRow.name, op: newKovRow.op, value: newKovRow.value} : queryString);
    setQueryStrings(newQueryStrings);
    data.queryStrings = newQueryStrings;
    data.onChange();
  };

  const handleAddQueryString = () => {
    let newQueryStrings = [...queryStrings, {name: "", op: "equals", value: ""}];
    setQueryStrings(newQueryStrings);
    data.queryStrings = newQueryStrings;
    data.onChange();
  }

  const handleRemoveQueryString = (header) => {
    let newQueryStrings = queryStrings.filter(h => h !== header);
    setQueryStrings(newQueryStrings);
    data.queryStrings = newQueryStrings;
    data.onChange();
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
      <Handle type="target" id="exec" position={Position.Left} style={{ top: '50%', borderRadius: 0 }}>
        <div style={{ position: 'absolute', bottom: '-5px', left: '16px'}} variant="subtitle2" component="div">ex</div>
      </Handle>
      {queryStrings.map((queryString, index) => (
        <NameOpValueRow
          key={queryString.name}
          name={queryString.name}
          nameLabel={"QueryString"}
          nameSelectList={[]}
          op={queryString.op}
          value={queryString.value}
          showAdd={index===queryStrings.length-1}
          onChange={handleQueryStringChange}
          onAdd={handleAddQueryString}
          onRemove={handleRemoveQueryString}
        />))}
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        style={{ top: '30%', borderRadius: 0 }}
      >
        <Typography style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">true</Typography>
      </Handle>
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ top: '70%', borderRadius: 0 }}
      >
        <div style={{ position: 'absolute', bottom: '-4px', right: '16px' }} variant="subtitle2" component="div">false</div>
      </Handle>
    </Stack>
  );
};