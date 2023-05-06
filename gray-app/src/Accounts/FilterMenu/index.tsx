import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const FilterMenu = (props:any) => {
    const {filter, setFilter} = props;
    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value as string);
    };

  
    return (
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter by...</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Filter by"
            onChange={handleChange}
          >
            <MenuItem value={"Username"}>Username</MenuItem>
            <MenuItem value={"Email"}>Email</MenuItem>
            <MenuItem value={"Company"}>Company</MenuItem>
            <MenuItem value={"Role"}>Role</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}

export default FilterMenu