import React, { ChangeEvent, useState } from 'react';
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
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Overcrowding from '@/components/Chart/Heatmaps/Overcrowding';
import Loitering from '@/components/Chart/Heatmaps/Loitering';
import Violence from '@/components/Chart/Heatmaps/Violence';
import Suspicion from '@/components/Chart/Heatmaps/Suspicion';
import Footer from 'src/components/Footer';

const Heatmap = () => {
  const [currentTab, setCurrentTab] = useState<string>('overcrowding');
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

  const tabs = [
    { value: 'overcrowding', label: 'Overcrowding Detection' },
    { value: 'loitering', label: 'Loitering Detection' },
    { value: 'violence', label: 'Violence Detection' },
    { value: 'suspicion', label: 'Suspicion Detection' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Heatmap Overview
        </Typography>
        <Typography variant="subtitle2">
          Heatmap that provides real-time data in each section of Suntec City
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
          {currentTab === 'overcrowding' ? ( 
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Customer Count" />
                <Divider />
                <div style={styles.box}>
                  <Overcrowding />
                </div>
              </Card>
            </Grid>
          ) : (
            []
          )}
          {currentTab === 'loitering' ? (
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Loitering Probabilities" />
                <Divider />
                <div style={styles.box}>
                  <Loitering />
                </div>
              </Card>
            </Grid>
          ) : (
            []
          )}
          {currentTab === 'violence' ? (
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Violence Probabilities" />
                <Divider />
                <div style={styles.box}>
                  <Violence />
                </div>
              </Card>
            </Grid>
          ) : (
            []
          )}
          {currentTab === 'suspicion' ? (
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Suspicion Probabilities" />
                <Divider />
                <div style={styles.box}>
                  <Suspicion />
                </div>
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

let styles = {
  box: {
    marginTop:30,
    marginLeft:260,
    marginBottom:30
  }
};

Heatmap.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;

export default Heatmap;