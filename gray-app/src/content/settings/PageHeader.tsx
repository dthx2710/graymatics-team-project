import { Typography } from '@mui/material';

function PageHeader() {
  const user = {
    username: 'Daryl',
  };

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        User Settings
      </Typography>
      <Typography variant="subtitle2">
        {user.username}, this could be your user settings panel.
      </Typography>
    </>
  );
}

export default PageHeader;