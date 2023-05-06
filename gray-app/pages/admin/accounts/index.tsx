import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel
} from '@mui/material';

import AdminSidebarLayout from '@/layouts/AdminSidebarLayout';
import FilterMenu from '@/Accounts/FilterMenu';
import Footer from 'src/components/Footer';
import AccountList from '@/Accounts/AccountList';

const Accounts = () => {
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("");
  const [activeCheck, setActiveCheck] = useState(false);
  let inputHandler = (e:any) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      <Box sx={{ p: 5, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" href='accounts/create'>
            Create Account
        </Button>
        <Box sx={{ pr: 3, display: 'flex' }}>
            <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            label="Search"
            sx={{mx: 1}}
            disabled = {filter === ""}
            />
            <FilterMenu setFilter = {setFilter} filter = {filter}/>
        </Box>
        <FormControlLabel control={<Checkbox checked={activeCheck}
          onChange={() => {
            setActiveCheck(!activeCheck);
          }}/>} label = "Show Active Accounts Only" />
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        paddingLeft= {5}
        paddingRight= {5}
      >
        <AccountList inputText = {inputText} filter = {filter} activeCheck = {activeCheck}/>
      </Grid>
      <Footer />
    </>
  );
};

Accounts.getLayout = (
  page:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
) => <AdminSidebarLayout>{page}</AdminSidebarLayout>;

export default Accounts;
