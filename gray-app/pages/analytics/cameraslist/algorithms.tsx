import React, { useState } from 'react';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardHeader,
  Divider,
  styled
} from '@mui/material';
import { FiChevronDown, FiChevronUp} from "react-icons/fi";
import { Button } from 'antd';

import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import BasicTable from '@/components/Table';
import TableData from '@/Algorithms/test.json';
// import DrawingCanvas from '@/components/Canvas';

const VideoGrid = styled(Grid)(
  ({ theme }) => `
  background: ${theme.colors.alpha.white[100]};
  `
);

const VideoDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 50,
  paddingBottom: 50,
});

const SidebarGrid = styled(Grid)(
  ({ theme }) => `
  background: ${theme.colors.alpha.black[10]};
  `
);

const SidebarHeader = styled(CardHeader)(
  ({ theme }) => `
  background: ${theme.colors.alpha.black[10]};
  `,
  {
    display: 'grid',
  }
);

const SidebarHeader2 = styled(CardHeader)(
  ({ theme }) => `
  background: ${theme.colors.alpha.black[10]};
  `,
  {
    display: 'flex',
    position: 'relative',
  }
);

const SidebarCard = styled(Card)(
  ({ theme }) => `
  background: ${theme.colors.alpha.black[10]};
  `,
  {
    overflow: 'hidden',
    overflowY: 'scroll',
    maxHeight: 465,
    minHeight: 465,
  }
);

const SidebarCard2 = styled(Card)({
  margin: 20,
});


const ChevronButton = styled(Button)({
  position: 'absolute',
  right: 0,
  marginRight: 10,
  backgroundColor: 'transparent',
  borderColor: 'transparent'
});


const Algorithms = () => {

  const [people, setPeople] = useState(false)
  const [traffic, setTraffic] = useState(false)
  const [security, setSecurity] = useState(false)

  return (
    <>
      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Algorithms
        </Typography>
      </PageTitleWrapper>
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <VideoGrid item xs={7}>
            <Card>
              <CardHeader title="Backdoor Camera 1 " />
              <Divider />
              <VideoDiv>
                {/* <DrawingCanvas/> */}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/LjqcFgLBP3o"
                  title="YouTube video"
                ></iframe>
              </VideoDiv>
            </Card>
          </VideoGrid>
          <SidebarGrid item xs={5}>
            <SidebarCard>
              <SidebarHeader title="Algorithm Settings" />
              <Divider />
              <SidebarCard2>
                <SidebarHeader2 title={<>People Algorithm <ChevronButton onClick={()=> setPeople(!people)}>{people?<FiChevronUp />:<FiChevronDown />}</ChevronButton></>} />
                <Divider />
                {(people)?<BasicTable data={TableData}/>:[]} 
              </SidebarCard2>
              <SidebarCard2>
              <SidebarHeader2 title={<>Traffic Algorithm <ChevronButton onClick={()=> setTraffic(!traffic)}>{traffic?<FiChevronUp />:<FiChevronDown />}</ChevronButton></>} />
                <Divider />
                {(traffic)?<BasicTable data={TableData}/>:[]}
              </SidebarCard2>
              <SidebarCard2>
              <SidebarHeader2 title={<>Security Algorithm <ChevronButton onClick={()=> setSecurity(!security)}>{security?<FiChevronUp />:<FiChevronDown />}</ChevronButton></>} />
                <Divider />
                {(security)?<BasicTable data={TableData}/>:[]}
              </SidebarCard2>
            </SidebarCard>
          </SidebarGrid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

Algorithms.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;

export default Algorithms;
