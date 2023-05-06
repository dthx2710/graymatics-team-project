import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VideoRows from "./VideoRows";


const VideoList = (props:any)=> {
  return (
    <TableContainer component={Paper} >
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow>
            <TableCell width={'5%'}/>
            <TableCell width={'20%'}  align="center">Name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell width={'20%'}   align="center"></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <VideoRows inputText={props.inputText} filter = {props.filter}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VideoList;