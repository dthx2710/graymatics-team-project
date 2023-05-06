import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AccountRows from "@/Accounts/AccountRows";


const AccountList = (props:any)=> {
  return (
    <TableContainer component={Paper} >
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow>
            <TableCell width={'20%'}  align="center">Username</TableCell>
            <TableCell width={'20%'}   align="center">Email</TableCell>
            <TableCell width={'5%'}   align="center">Company</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Active</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AccountRows inputText={props.inputText} filter = {props.filter} activeCheck={props.activeCheck}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AccountList;