import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/settings/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';

import ActivityTab from '@/content/settings/ActivityTab';
import EditProfileTab from '@/content/settings/EditProfileTab';
import NotificationsTab from '@/content/settings/NotificationsTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings({setTheme}: any) {
  const [currentTab, setCurrentTab] = useState<string>('general');

  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'notifications', label: 'Notifications' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>User Settings - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'general' && <ActivityTab setTheme={setTheme} />}
            {currentTab === 'edit_profile' && <EditProfileTab />}
            {currentTab === 'notifications' && <NotificationsTab />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserSettings.getLayout = (page: any) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;