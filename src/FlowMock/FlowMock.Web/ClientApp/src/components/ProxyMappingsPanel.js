import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

const ProxyMappingTableRow = (props) => {
  const [selected, setSelected] = React.useState(false);
  const [basePath, setBasePath] = React.useState();
  const [proxyToBaseUrl, setProxyToBaseUrl] = React.useState();

  React.useEffect(() => {
    setSelected(props.selected);
    setBasePath(props.proxyMapping.basePath);
    setProxyToBaseUrl(props.proxyMapping.proxyToBaseUrl);
  }, [props]);

  const handleSelection = () => {
    props.onSelected(props.proxyMapping.basePath);
  }

  const handleProxyMappingChange = () => {
    props.proxyMapping.basePath = basePath;
    props.proxyMapping.proxyToBaseUrl = proxyToBaseUrl;
    props.onProxyMappingChanged(props.proxyMapping);
  }

  return (<TableRow
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell padding="checkbox">
      <Checkbox
        color="primary"
        checked={selected}
        onClick={handleSelection}
      />
    </TableCell>
    <TableCell>
      <TextField sx={{width: '100%' }} value={basePath} variant="outlined" onChange={(e) => setBasePath(e.target.value)} onBlur={handleProxyMappingChange} />
    </TableCell>
    <TableCell>
      <TextField sx={{width: '100%' }} value={proxyToBaseUrl} variant="outlined" onChange={(e) => setProxyToBaseUrl(e.target.value)} onBlur={handleProxyMappingChange} />
    </TableCell>
  </TableRow>);
}

export function ProxyMappingsPanel(props) {
  const [selected, setSelected] = React.useState([]);

  const handleAddClick = () => {
    if(props.onAddProxyMapping) {
      props.onAddProxyMapping();
    }
  }

  const handleDeleteClick = () => {
    if(props.onDeleteProxyMapping) {
      props.onDeleteProxyMapping(selected);
    }
    setSelected([]);
  }

  const handleRowClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box>
      <Box sx={{ display: 'flex', m:1}}>
        {selected.length > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Box
            sx={{ flex: '1 1 100%' }}
          >
          </Box>
        )}

        {selected.length > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add">
            <IconButton onClick={handleAddClick}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Base Path</TableCell>
              <TableCell>Proxy-To Base URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.proxyMappings.map((proxyMapping) =>
              <ProxyMappingTableRow
                key={proxyMapping.basePath}
                proxyMapping={proxyMapping}
                selected={isSelected(proxyMapping.basePath)}
                onSelected={handleRowClick}
                onProxyMappingChanged={props.onProxyMappingChanged} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
