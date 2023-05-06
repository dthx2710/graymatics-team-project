import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ThemeProvider from 'src/theme/ThemeProvider';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router'

export default function SignIn() {
  const router = useRouter()
  const { data: session, status } = useSession();
  if (session && status === "authenticated") {
    router.push('/general/dashboard')
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signIn("email", { email: data.get('email') })
  };

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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in with Email
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}