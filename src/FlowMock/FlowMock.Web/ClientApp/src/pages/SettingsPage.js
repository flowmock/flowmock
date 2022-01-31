import * as React from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { ProxyMappingsPanel } from '../components/ProxyMappingsPanel';
import { GeneralSettingsPanel } from '../components/GeneralSettingsPanel';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export function SettingsPage() {
  const [hasChanges, setHasChanges] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [settings, setSettings] = React.useState([]);
  const [proxyMappings, setProxyMappings] = React.useState([]);

  async function fetchSettings() {
    let response = await axios.get('/api/setting');
    let settings = await response.data;
    setSettings(settings);
  }

  async function fetchProxyMappings() {
    let response = await axios.get('/api/proxymapping');
    let proxyMappings = await response.data;
    setProxyMappings(proxyMappings);
  }

  async function saveSettings() {
    await axios.post('/api/setting', settings);
  }

  async function saveProxyMappings() {
    await axios.post('/api/proxymapping', proxyMappings);
  }

  const handleProxyMappingChange = () => {
    setProxyMappings([...proxyMappings]);    
    setHasChanges(true);
  }


  React.useEffect(() => {
    fetchSettings();
    fetchProxyMappings();
  }, []);

  const handleSettingChange = (setting) => {
    setSettings([...settings]);    
    setHasChanges(true);
  }

  const handleAddProxyMapping = () => {
    setProxyMappings([...proxyMappings, {basePath: 'service', proxyToBaseUrl: 'https://base/url/to/service'}]);    
    setHasChanges(true);
  }

  const handleDeleteProxyMapping = (selected) => {
    console.log(selected);
    setProxyMappings(proxyMappings.filter(mapping => selected.some(select => mapping.basePath !== select)));    
    setHasChanges(true);
  }

  const handleSaveClick = async () => {
    await saveSettings();
    await saveProxyMappings();
    setHasChanges(false);
  }

  return (
    <Stack direction="column" spacing={1}>
      <Box sx={{ width: '100%', m:1 }}>
        <Button variant="contained" disabled={!hasChanges} onClick={handleSaveClick}>Save</Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(e, tabIndex) => setTabIndex(tabIndex)}>
            <Tab label="General" />
            <Tab label="Proxy Mappings" />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <GeneralSettingsPanel settings={settings} onSettingChanged={handleSettingChange} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <ProxyMappingsPanel proxyMappings={proxyMappings} onAddProxyMapping={handleAddProxyMapping} onDeleteProxyMapping={handleDeleteProxyMapping} onProxyMappingChanged={handleProxyMappingChange} />
        </TabPanel>
      </Box>
    </Stack>
  );
}
