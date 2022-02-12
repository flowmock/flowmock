
import * as React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DownloadIcon from '@mui/icons-material/Download';
import HikingIcon from '@mui/icons-material/Hiking';
import CookieIcon from '@mui/icons-material/Cookie';

import { Homepage } from './pages/HomePage';
import { InstallationPage } from './pages/InstallationPage';
import { RecipesPage } from './pages/RecipesPage';
import { TheProblemPage } from './pages/TheProblemPage';
import { TutorialPage } from './pages/TutorialPage';

const drawerWidth = 240;

function App() {
  const [page, setPage] = React.useState("home");

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            FlowMock
          </Typography>
          <IconButton
                size="large"
                onClick={() => window.open('https://www.github.com/flowmock/flowmock', '_blank', 'noopener,noreferrer')}
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button selected={page==='home'}  onClick={() => setPage('home')} >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
            <ListItem button selected={page==='problem'}  onClick={() => setPage('problem')}>
              <ListItemIcon>
                <QuestionMarkIcon />
              </ListItemIcon>
              <ListItemText primary='The Problem' />
            </ListItem>
            <ListItem button selected={page==='install'}  onClick={() => setPage('install')}>
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText primary='Installation' />
            </ListItem>
            <ListItem button selected={page==='tutorial'}  onClick={() => setPage('tutorial')}>
              <ListItemIcon>
                <HikingIcon />
              </ListItemIcon>
              <ListItemText primary='Tutorial' />
            </ListItem>
            <ListItem button selected={page==='recipes'}  onClick={() => setPage('recipes')}>
              <ListItemIcon>
                <CookieIcon />
              </ListItemIcon>
              <ListItemText primary='Recipes' />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {page==='home' && <Homepage />}
        {page==='install' && <InstallationPage />}
        {page==='recipes' && <RecipesPage />}
        {page==='problem' && <TheProblemPage />}
        {page==='tutorial' && <TutorialPage />}
      </Box>
    </Box>
  );
}

export default App;
