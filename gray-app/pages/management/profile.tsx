import SidebarLayout from '@/layouts/SidebarLayout';
import Footer from '@/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from '@/content/profile/ProfileCover';
import RecentActivity from '@/content/profile/RecentActivity';
import Addresses from '@/content/profile/Addresses';
import { useSession } from 'next-auth/react';

function Profile() {
  const { data: session, status } = useSession({ required: true });
  interface User {
    username: string | null | undefined;
    coverImg: string;
    profilepic: string | null | undefined;
    description: string | null | undefined;
    jobtitle: string | null | undefined;
    location: string | null | undefined;
  }
  const user: User = {
    username: '',
    coverImg: '',
    profilepic: '',
    description:'',
    jobtitle: '',
    location: ''
  };
  if (session && status === 'authenticated') {
    user.username = session?.user?.username!; //non null asserting
    user.coverImg = '/static/images/placeholders/covers/5.jpg';
    user.profilepic = session?.user?.profilepic;
    user.description = session?.user?.description;
    user.jobtitle = session?.user?.role;
    user.location = session?.user?.country;
  }


  return (
    <>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={12}>
            <Addresses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Profile.getLayout = (page: any) => <SidebarLayout>{page}</SidebarLayout>;

export default Profile;
