import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  Modal
} from '@mui/material';

import { useState } from 'react';
import { styled } from '@mui/material/styles';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from '@/components/Text';
import Label from '@/components/Label';
import { signIn, useSession } from 'next-auth/react';
import supabase from 'lib/supabase';

const ModalDiv = styled('div')({
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50,
  marginLeft: 400,
  marginRight: 400
});

const FormLabel = styled('label')({
  textAlign: 'left',
  display: 'block'
});

const FormInput = styled('input')({
  width: 200,
  padding: 3,
  display: 'block'
});

const Button2 = styled(Button)({
  marginBottom: 20,
  marginLeft: 20,
  marginTop: 20
});

function EditProfileTab() {
  const [editProfile, setEditProfile] = useState(false);
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [job, setJob] = useState('');
  const [logo, setLogo] = useState<File | string>('');

  const uploadLogo = async (filename: String) => {
    if (typeof logo === "string") {
      console.error("Logo is not a file");
      return;
    }
    const { error } = await supabase.storage
      .from('logo')
      .upload(`${filename}`, logo)
    if (error) {
      console.error(error)
      return
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filename = `${user.username}-logo-${Date.now()}.png`;
    await uploadLogo(filename);
    const logoUrl = `https://${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/logo/${filename}`
    const userObj = {
      username: user.username,
      description: description,
      country: country,
      role: job,
      logo: logoUrl,
    };
    fetch(`http://localhost:3000/api/profile/editProfile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObj)
    })
      .then(() => {
        setEditProfile(!editProfile);
      })
      .finally(async () => {
        //refresh token
        await signIn('jwt', { redirect: false, id: session?.user?.id });
      });
  };

  const { data: session, status } = useSession({ required: true });
  interface User {
    username: string | null | undefined;
    coverImg: string;
    profilepic: string | null | undefined;
    description: string | null | undefined;
    jobtitle: string | null | undefined;
    location: string | null | undefined;
    email: string | null | undefined;
  }
  const user: User = {
    username: '',
    coverImg: '',
    profilepic: '',
    description: '',
    jobtitle: '',
    location: '',
    email: ''
  };
  if (session && status === 'authenticated') {
    user.username = session?.user?.username!; //non null asserting
    user.coverImg = '/static/images/placeholders/covers/5.jpg';
    user.profilepic = session?.user?.profilepic;
    user.description = session?.user?.description;
    user.jobtitle = session?.user?.role;
    user.location = session?.user?.country;
    user.email = session?.user?.email;
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="subtitle2">
                Manage informations related to your personal details
              </Typography>
            </Box>
            <Button
              variant="text"
              startIcon={<EditTwoToneIcon />}
              onClick={() => setEditProfile(true)}
            >
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Name:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{user.username}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Role:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{user.jobtitle}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Location:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">{user.location}</Text>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Modal open={editProfile} onClose={() => setEditProfile(false)}>
            <ModalDiv>
              <div>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                  <FormLabel>Description:</FormLabel>
                  <FormInput
                    type="text"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br />
                  <FormLabel>Country:</FormLabel>
                  <FormInput
                    type="text"
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <br />
                  <FormLabel>Job role:</FormLabel>
                  <FormInput
                    type="text"
                    required
                    onChange={(e) => setJob(e.target.value)}
                  />
                  <br />
                  <FormLabel htmlFor="file">Upload new logo image:</FormLabel>
                  <FormInput
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files && setLogo(e.target.files[0])
                    }
                  />
                  <Button2 variant="contained" type="submit">
                    Confirm Edit
                  </Button2>
                </form>
              </div>
            </ModalDiv>
          </Modal>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Account Settings
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your account
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Language:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>English (US)</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Timezone:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>GMT +2</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Account status:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Label color="success">
                    <DoneTwoToneIcon fontSize="small" />
                    <b>Active</b>
                  </Label>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Email Addresses
              </Typography>
              <Typography variant="subtitle2">
                Manage details related to your associated email addresses
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{user.email}</b>
                  </Text>
                  <Box pl={1} component="span">
                    <Label color="success">Primary</Label>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EditProfileTab;
