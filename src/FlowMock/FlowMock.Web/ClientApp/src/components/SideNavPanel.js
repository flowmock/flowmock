import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';

export function SideNavPanel() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <List>
      <Tooltip title="Requests" placement="right">
        <ListItem button selected={location.pathname==='/' || location.pathname==='/requests'} onClick={() => navigate('/requests')}>
          <ManageSearchIcon sx={{mt:1,mb:1}} />
        </ListItem>
      </Tooltip>
      <Tooltip title="Mocks" placement="right">
        <ListItem button selected={location.pathname==='/mocks'} onClick={() => navigate('/mocks')}>
          <AccountTreeIcon sx={{mt:1,mb:1}} />
        </ListItem>
      </Tooltip>
      <Divider />
      <Tooltip title="Settings" placement="right">
        <ListItem button selected={location.pathname==='/settings'} onClick={() => navigate('/settings')}>
          <SettingsIcon sx={{mt:1,mb:1}} />
        </ListItem>
      </Tooltip>
    </List>)
}

