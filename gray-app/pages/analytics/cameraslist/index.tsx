import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, styled, Modal } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import SidebarLayout from '@/layouts/SidebarLayout';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import Cameras from '@/Cameras/Cameras';
import Button from '@mui/material/Button';

const Button2 = styled(Button)({
  marginBottom: 20,
  marginLeft: 20
});

const ModalDiv = styled('div')({
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  marginLeft: 400,
  marginRight: 400
});

const LoadingDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
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

const Cameraslist = () => {
  const [cameras, setCameras] = useState([]);
  const [camerasModal, setCamerasModal] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [loadTable, setLoadTable] = useState(true);

  //State for adding cameras form
  const [user_id, setUserId] = useState('');
  const [is_assigned, setAssigned] = useState('');
  const [rstp_link, setRstp] = useState('');
  const [cam_name, setCamName] = useState('');
  const [cam_location, setCamLocation] = useState('');
  const [src, setSrc] = useState('');

  const getCameras = async () => {
    const res = await fetch(`http://localhost:3000/api/cameras/cameraslist`);
    const data = await res.json();
    setCameras(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cameraObject = {
      user_id,
      is_assigned,
      rstp_link,
      cam_name,
      cam_location,
      src
    };
    if (
      cameraObject.is_assigned == 'true' ||
      cameraObject.is_assigned == 'false'
    ) {
      setIsPending(true);
      fetch(`http://localhost:3000/api/cameras/cameraslist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cameraObject)
      })
        .then(() => {
          setIsPending(false);
        })
        .finally(() => {
          setCamerasModal(false);
          setLoadTable(true);
        });
    } else {
      setCamerasModal(false);
      alert('Failed to add camera. Please input only boolean(true/false) for "Assigned".');
    }
  };

  useEffect(() => {
    getCameras();
    setLoadTable(false);
  }, [loadTable]);

  return (
    <>
      <PageTitleWrapper>
        <Typography variant="h3" component="h3" gutterBottom>
          Cameras
        </Typography>
      </PageTitleWrapper>
      <Container>
        <Grid container direction="row" alignItems="stretch">
          <Button2 variant="contained" onClick={() => setCamerasModal(true)}>
            Add Camera
          </Button2>
          <Modal open={camerasModal} onClose={() => setCamerasModal(false)}>
            <ModalDiv>
              <div>
                <h2>Add a new camera</h2>
                <form onSubmit={handleSubmit}>
                  <FormLabel>Camera Name:</FormLabel>
                  <FormInput
                    type="text"
                    required
                    onChange={(e) => setCamName(e.target.value)}
                  />
                  <br />
                  <FormLabel>Camera Location:</FormLabel>
                  <FormInput
                    type="text"
                    required
                    onChange={(e) => setCamLocation(e.target.value)}
                  />
                  <br />
                  <FormLabel>User ID:</FormLabel>
                  <FormInput
                    type="text"
                    required
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  <br />
                  <FormLabel>Assigned:</FormLabel>
                  <FormInput
                    type="text"
                    required
                    onChange={(e) => setAssigned(e.target.value)}
                  />
                  <br />
                  <FormLabel>RTSP Link:</FormLabel>
                  <FormInput
                    type="text"
                    required
                    onChange={(e) => setRstp(e.target.value)}
                  />
                  <br />
                  <FormLabel>Source:</FormLabel>
                  <FormInput
                    type="text"
                    required
                    onChange={(e) => setSrc(e.target.value)}
                  />
                  <br />
                  {!isPending ? (
                    <Button2 variant="contained" type="submit">
                      Add Camera
                    </Button2>
                  ) : (
                    <Button2 variant="contained" disabled>
                      Adding Camera
                    </Button2>
                  )}
                </form>
              </div>
            </ModalDiv>
          </Modal>
          <Grid justifyContent="center" item xs={12}>
            {loadTable ? (
              <LoadingDiv>
                <CircularProgress />
              </LoadingDiv>
            ) : (
              <Cameras data={cameras} getCameras={getCameras} />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

Cameraslist.getLayout = (
  page:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
) => <SidebarLayout>{page}</SidebarLayout>;

export default Cameraslist;
