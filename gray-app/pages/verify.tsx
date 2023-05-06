import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ThemeProvider from 'src/theme/ThemeProvider';
import Head from 'next/head';

export default function SignIn() {
  return (
    <ThemeProvider theme="">
      <Head>
        <title>
          Sign in
        </title>
      </Head>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <img src="/static/images/graymatics.webp" alt="Graymatics" />
            <Typography component="h1" variant="h3">
            <b>Check your email</b>
            </Typography>
            <Typography component="span" variant="subtitle2">
                A sign in link has been sent to your email address.
            </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}