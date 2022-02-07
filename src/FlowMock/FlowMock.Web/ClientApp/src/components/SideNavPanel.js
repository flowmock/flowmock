import * as React from 'react';
import { useHistory, useLocation } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';

export function SideNavPanel() {
  const history = useHistory();
  const location = useLocation();

  return (
    <List>
      <Tooltip title="Requests" placement="right">
        <ListItem button selected={location.pathname==='/' || location.pathname==='/requests'} onClick={() => history.push('/requests')}>
          <ManageSearchIcon sx={{mt:1,mb:1}} />
        </ListItem>
      </Tooltip>
      <Tooltip title="Mocks" placement="right">
        <ListItem button selected={location.pathname==='/mocks'} onClick={() => history.push('/mocks')}>
          <AccountTreeIcon sx={{mt:1,mb:1}} />
        </ListItem>
      </Tooltip>
      <Divider />
      <Tooltip title="Settings" placement="right">
        <ListItem button selected={location.pathname==='/settings'} onClick={() => history.push('/settings')}>
          <SettingsIcon sx={{mt:1,mb:1}} />
        </ListItem>
      </Tooltip>
    </List>)
}

