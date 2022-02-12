import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function GeneralSettingsPanel(props) {

  const handleFieldChange = (e, setting) => {
    if(props.onSettingChanged) {
      setting.value = e.target.value;
      props.onSettingChanged(setting);
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.settings.map((setting) => (
              <TableRow
                key={setting.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{width: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{setting.key}</TableCell>
                <TableCell>
                  <TextField sx={{width: '100%' }} value={setting.value} size="small" onChange={(e) => handleFieldChange(e, setting)} variant="outlined" />
                </TableCell>
                <TableCell>
                  <Typography>
                    {setting.description}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
