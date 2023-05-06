import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardHeader,
  Divider,
  styled,
  Tab,
  Tabs,
  Box
} from '@mui/material';

import SidebarLayout from '@/layouts/SidebarLayout';
import Piechart from 'src/components/Chart/Piechart';
import Bargraph from 'src/components/Chart/Bargraph';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import DashboardCard from 'src/components/Cards/dashboardcard';

const ForCards = styled('div')(
  () => `
  margin: 40px;
  `
);

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;
      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }
      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;
          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }
      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;
              .MuiTouchRipple-root {
                opacity: .1;
              }
              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }
              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }
          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};
              &:after {
                height: 0;
              }
          }
      }
  `
);

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState<string>('loitering');
  const [totalDetection, setTotalDetection] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);
  const [totalCamera, setTotalCamera] = useState(0);
  const [loiteringData, setLoiteringData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [abandonedData, setAbandonedData] = useState([]);
  const [intrusionData, setIntrusionData] = useState([]);
  const [crowdData, setCrowdData] = useState([]);
  

  const getTotalDetections = async () => {
    const res = await fetch(`http://localhost:3000/api/dashboard/total_detections`);
    const data = await res.json();
    setTotalDetection(data);
  };

  const getTotalTickets = async () => {
    const res = await fetch(`http://localhost:3000/api/dashboard/total_tickets`);
    const data = await res.json();
    setTotalTicket(data);
  };

  const getTotalCameras = async () => {
    const res = await fetch(`http://localhost:3000/api/dashboard/total_cameras`);
    const data = await res.json();
    setTotalCamera(data);
  };

  const getLoiteringData = async () => {
    const res = await fetch(`http://localhost:3000/api/dashboard/loitering`);
    const data = await res.json();
    setLoiteringData(data);
  };

  const getPeopleData = async () => {
    const res = await fetch(`http://localhost:3000/api/dashboard/people`);
    const data = await res.json();
    setPeopleData(data);
  };

  const getAbandonedData = async () => {
    const res = await fetch(`http://localhost:3000/api/dashboard/abandoned`);
    const data = await res.json();
    setAbandonedData(data);
  };

  const getIntrusionData = async () => {
    const res = await fetch(`http://localhost:3000/api/dashboard/intrusion`);
    const data = await res.json();
    setIntrusionData(data);
  };

  const getCrowdData = async () => {
    const res = await fetch(`http://localhost:3000/api/dashboard/crowd`);
    const data = await res.json();
    setCrowdData(data);
  };

  useEffect(() => {
    getTotalDetections();
    getTotalTickets();
    getTotalCameras();
    getLoiteringData();
    getPeopleData();
    getAbandonedData();
    getIntrusionData();
    getCrowdData();
  }, []);

  const tabs = [
    { value: 'loitering', label: 'Loitering Detection' },
    { value: 'people', label: 'People Count' },
    { value: 'abandoned', label: 'Abandoned Object' },
    { value: 'intrusion', label: 'Intrusion Alert' },
    { value: 'crowd', label: 'Crowd' }
  ];
  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="subtitle2">
          Dashboard that gives an overview of all detection
        </Typography>
      </PageTitleWrapper>
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Summary" />
              <Divider />
              <ForCards>
                <DashboardCard detections={totalDetection} tickets={totalTicket} cameras={totalCamera}/>
              </ForCards>
            </Card>
          </Grid>
          <TabsContainerWrapper>
            <Tabs
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
            </Tabs>
          </TabsContainerWrapper>
          {currentTab === 'loitering' ? (
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Loitering Overview" />
                <Divider />
                <Piechart data={loiteringData} />
              </Card>
            </Grid>
          ) : (
            []
          )}
          {currentTab === 'people' ? (
            <Grid item xs={12}>
              <Card>
                <CardHeader title="People Count Overview" />
                <Divider />
                <Bargraph data={peopleData}/>
              </Card>
            </Grid>
          ) : (
            []
          )}
          {currentTab === 'abandoned' ? (
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Abandoned Object Overview" />
                <Divider />
                <Bargraph data={abandonedData}/>
              </Card>
            </Grid>
          ) : (
            []
          )}
          {currentTab === 'intrusion' ? (
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Intrusion Overview" />
                <Divider />
                <Bargraph data={intrusionData}/>
              </Card>
            </Grid>
          ) : (
            []
          )}
          {currentTab === 'crowd' ? (
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Crowd Overview" />
                <Divider />
                <Bargraph data={crowdData}/>
              </Card>
            </Grid>
          ) : (
            []
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

Dashboard.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;

export default Dashboard;
