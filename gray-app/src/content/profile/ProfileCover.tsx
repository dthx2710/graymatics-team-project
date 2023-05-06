import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import NextLink from 'next/link';


const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};
    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const ProfileCover = ({ user }: any) => {
  return (
    <>
      <Box mb={3}>
        <Typography variant="h3" component="h3" gutterBottom>
          {user.username}
        </Typography>
        <Typography variant="subtitle2">This is a profile page.</Typography>
      </Box>
      <CardCover>
        <CardMedia image={user.coverImg} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.name} src={user.profilepic} />
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.username}
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {user.jobtitle} | {user.location}
        </Typography>
        <NextLink href="/management/settings" passHref>
        <IconButton color="primary" sx={{ p: 0.5 }}>
          Edit <EditIcon />
        </IconButton>
        </NextLink>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
