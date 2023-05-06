import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import Hero from 'src/content/preview';

import { signIn, signOut, useSession } from 'next-auth/react';

import { useRouter } from 'next/router'

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const router = useRouter()
  const { data: session, status } = useSession();
  if (session && status === "authenticated") {
    router.push('/general/dashboard')
  }
  return (
    <OverviewWrapper>
      <Head>
        <title>Graymatics App</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  component={Link}
                  href="/login"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Potential Login Design
                </Button>
              </Box>
              {!session ? (
              <Box>
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={() => {signIn('credentials', { redirect: false, password: 'password' })}}
                >
                  NextAuth Login
                </Button>
              </Box>):(
              <Box>
                <Button
                  variant="contained"
                  sx={{ ml: 2 }}
                  onClick={() => {signOut({ redirect: false})}}
                >
                  NextAuth Logout
                </Button>
              </Box>)}
              <Box>
                <Button
                  component={Link}
                  href="/general/dashboard"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Enter Page
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          Crafted by TeamA
        </Typography>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
