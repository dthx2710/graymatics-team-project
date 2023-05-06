import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { Button } from 'antd';

const StatusButton = styled(Button)({
  backgroundColor: 'transparent',
  borderColor: 'transparent'
});

export default function BasicTable(props: any) {

  const [status, setStatus] = useState(false)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Rol</TableCell>
            <TableCell align="center">Confidence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row: any) => (
            <TableRow
              key={props.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                <StatusButton onClick={()=>{row.status=!row.status;setStatus(!status);}}>
                  {row.status ? (
                    <BsToggleOn style={{ width: 30, height: 25 }} />
                  ) : (
                    <BsToggleOff style={{ width: 30, height: 25 }} />
                  )}
                </StatusButton>
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.rol}</TableCell>
              <TableCell align="center">{row.confidence}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
