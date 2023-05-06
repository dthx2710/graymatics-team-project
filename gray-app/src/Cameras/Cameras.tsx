import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NextLink from 'next/link';
import { Button, CircularProgress } from '@mui/material';
import ModalVideo from 'react-modal-video';
import { FaRegTrashAlt, FaPlay,FaAtom } from 'react-icons/fa';
import axios from "axios";

import styles from './mystyle.module.css';

interface Video {
  cam_name: string;
  cam_location: string;
  src: string;
}


function Row(props: { row: Video, onDelete : Function }) {
  var { row } = props;
  var { onDelete } = props;
  const [vidOpen, setVidOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const deleteVideo = async (data: any) => {
    setLoading(true)
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (confirmDelete) {
      await axios.delete(`http://localhost:3000/api/cameras/cameraslist?id=${data.cam_id}`)
      console.log("Successfully delete video ")
      onDelete();
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      {loading ? <CircularProgress/> :
      (
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row" align="center">
          <h3>{row.cam_name}</h3>
        </TableCell>
        <TableCell align="center">
          <Button onClick={() => setVidOpen(true)} className={styles.btn}>
            <FaPlay
              className={styles.btncontent}
              style={{ color: 'limegreen' }}
            />
          </Button>
          <ModalVideo
            channel="custom"
            isOpen={vidOpen}
            url={row.src}
            onClose={() => setVidOpen(false)}
          />
        </TableCell>
        <TableCell align="center">
          <h3>{row.cam_location}</h3>
        </TableCell>
        <TableCell align="center">
          <NextLink href="/analytics/cameraslist/algorithms" passHref>
            <Button className={styles.btn}>
              <FaAtom
                className={styles.btncontent}
                style={{ color: 'orange' }}
              />
            </Button>
          </NextLink>
        </TableCell>
        <TableCell align="center">
          <Button onClick={() => deleteVideo(row)} className={styles.btn}>
            <FaRegTrashAlt
              className={styles.btncontent}
              style={{ color: 'grey' }}
            />
          </Button>
        </TableCell>
      </TableRow>)}
    </React.Fragment>
  );
}

export default function Cameras(props: any) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
      <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Play</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Algorithms</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((VideoData: any) => (
            <Row key={VideoData.cam_id} row={VideoData} onDelete={props.getCameras} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
