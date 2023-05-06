import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';

function AccountRows(props: any) {
  const [accountData, setAccountData] = useState<any>([]);
  useEffect(() => {
    fetch('/api/users/all')
      .then((res) => res.json())
      .then((data) => {
        setAccountData(data);
      });
  }, []);
  type filterTypes = 'username' | 'email' | 'company' | 'role';
  const filter = (props.filter).toLowerCase() as filterTypes;
  const searchboxFilteredData = accountData.filter((el: any) => {
    if (props.inputText === '' || props.filter === '') {
      return el;
    }
    // return the item which contains the user input
    else if (el[filter].toLowerCase().includes(props.inputText)) {
      console.log(el.active)
      return el[filter];
    }
  });

  const activeFilterData = searchboxFilteredData.filter((el: any) => {
    if (el.active === true) {
      return el;
    }
  });

  const filteredData =
    props.activeCheck === true ? activeFilterData : searchboxFilteredData;

  const deleteAccount = async (id: string, Name: string) => {
    if (window.confirm(`Delete Account ${Name}?`)) {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      window.alert(`Account ${Name} (${id}) deleted`);
    }
    // remove account id
  };

  return (
    <React.Fragment>
      {filteredData.map((item: any) => (
        <React.Fragment key={item.id}>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row" align="center">
              {item.username}
            </TableCell>
            <TableCell align="center">{item.email}</TableCell>
            <TableCell align="center">{item.company}</TableCell>
            <TableCell align="center">{item.role}</TableCell>
            {item.active ? (
              <TableCell align="center">
                <CheckCircleIcon />
              </TableCell>
            ) : (
              <TableCell align="center">
                <CancelIcon />
              </TableCell>
            )}
            <TableCell align="center">
              <Link
                as={`accounts/edit/${item.id}`}
                href="accounts/edit/[item.id]"
              >
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            </TableCell>
            <TableCell align="center">
              <IconButton
                onClick={() => {
                  deleteAccount(item.id, item.username);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
export default AccountRows;
