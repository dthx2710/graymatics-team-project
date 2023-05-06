import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

interface State {
  username: string;
  email: string;
  company: string;
  role: string;
  country: string;
  description: string;
  vms: string;
  admin: boolean;
  active: boolean;
  numCameras: number | null;
  numAnalytics: number | null;
  password: string;
  passwordConfirm: string;
  showPassword: boolean;
  error: any;
  errorHelper: any;
}

const AccountForm = (props: any) => {
  const { pageType, uid } = props;
  const initialValues: State = {
    username: '',
    email: '',
    company: '',
    role: '',
    country: '',
    description: '',
    vms: '',
    admin: false,
    active: true,
    numCameras: null,
    numAnalytics: null,
    password: '',
    passwordConfirm: '',
    showPassword: false,
    error: {},
    errorHelper: {}
  };
  const [account, setAccount] = useState<any>(null);
  const [values, setValues] = useState<State>({ ...initialValues });
  useEffect(() => {
    if (pageType === 'edit' && uid) {
      fetch('/api/users/' + uid)
        .then((res) => res.json())
        .then((data) => {
          const user = data[0];
          setAccount(user);
          setValues({
            ...values,
            username: user?.username,
            email: user?.email,
            company: user?.company,
            role: user?.role,
            country: user?.country,
            description: user?.description,
            active: user?.active
          });
        });
    }
  }, [props]);
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleSelectChange =
    (prop: keyof State) => (event: SelectChangeEvent) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleNumberFilter =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [prop]: event.target.value.split(/ /)[0].replace(/[^\d]/g, '')
      });
    };
  const handleRadioChange = (prop: keyof State, value: boolean) => () => {
    setValues({ ...values, [prop]: value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };
  const validateForm = () => {
    interface Errors {
      [key: string]: boolean | undefined;
    }
    interface Helpers {
      [key: string]: string | undefined;
    }
    const errors: Errors = {};
    const helpers: Helpers = {};
    if (values.username === '') {
      errors.username = true;
      helpers.username = 'Username is required';
    }
    if (values.email === '') {
      errors.email = true;
      helpers.email = 'Email is required';
    }
    if (
      (pageType === 'create' || values.password.length > 0) &&
      values.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      ) === null
    ) {
      errors.password = true;
      helpers.password =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
    }
    if (
      (pageType === 'create' || values.passwordConfirm.length > 0) &&
      values.passwordConfirm.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      ) === null
    ) {
      errors.passwordConfirm = true;
      helpers.passwordConfirm =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
    }
    if (values.password !== values.passwordConfirm) {
      errors.password = true;
      errors.passwordConfirm = true;
      helpers.password = 'Passwords do not match';
      helpers.passwordConfirm = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0 || Object.keys(helpers).length === 0) {
      setValues({
        ...values,
        error: {},
        errorHelper: {}
      });
      return true;
    } else {
      setValues({
        ...values,
        error: { ...errors },
        errorHelper: { ...helpers }
      });
      return false;
    }
  };
  const submitForm = async () => {
    if (validateForm()) {
      switch (pageType) {
        case 'edit':
          await fetch(`/api/users/${uid}`, {
            method: 'PUT',
            body: JSON.stringify(values)
          }).then(() => {
            window.location.href = '/admin/accounts';
          });
          break;
        case 'create':
          await fetch(`/api/users/create`, {
            method: 'POST',
            body: JSON.stringify(values)
          }).then(() => {
            window.location.href = '/admin/accounts';
          });
          break;
        default:
          break;
      }
    }
    else {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    return;
  };
  const algorithms = [
    { title: 'Facial Recognition', value: 'algo1' },
    { title: 'Person Climbing Barricade', value: 'algo2' },
    { title: 'Loitering Detection', value: 'algo3' },
    { title: 'D&C of human, animal and vehicle', value: 'algo4' },
    { title: 'Parking Violation', value: 'algo5' },
    { title: 'Speeding Vehicle', value: 'algo6' },
    { title: 'Helmet detection on two-wheeler', value: 'algo7' },
    { title: 'Banned vehicle detection', value: 'algo8' },
    { title: 'Wrong way or illegal turn detection', value: 'algo9' },
    { title: 'Graffiti & Vandalism detection', value: 'algo10' },
    { title: 'Debris & Garbage detection', value: 'algo11' },
    { title: 'Garbage bin, cleaned or not', value: 'algo12' },
    { title: 'People count', value: 'algo13' },
    { title: 'ANPR', value: 'algo14' },
    { title: 'Heatmap', value: 'algo15' },
    { title: 'Demographics', value: 'algo16' },
    { title: 'Abandoned Object', value: 'algo17' },
    { title: 'Intrusion Alert', value: 'algo18' },
    { title: 'Attendance Management', value: 'algo19' },
    { title: 'Violence', value: 'algo20' },
    { title: 'No Mask', value: 'algo21' },
    { title: 'Social Distancing', value: 'algo22' },
    { title: 'Queue Management', value: 'algo23' },
    { title: 'Helmet Detection', value: 'algo24' },
    { title: 'Vault Open', value: 'algo25' },
    { title: 'Barrier Not Closed', value: 'algo26' },
    { title: 'Vehicle Counting', value: 'algo27' },
    { title: 'Camera Tampering', value: 'algo28' },
    { title: 'Animals On Road', value: 'algo29' },
    { title: 'Accident Detection', value: 'algo30' }
  ];

  return (
    <Container>
      <Paper sx={{ padding: 3, mt: 4 }}>
        <form action="post">
          <Typography variant="h3">
            {pageType == 'create' ? 'Create' : 'Edit'} Account
          </Typography>
          <FormGroup sx={{ my: 1 }}>
            <FormControl sx={{ my: 1 }}>
              <TextField
                required
                label="Username"
                variant="standard"
                value={values.username}
                onChange={handleChange('username')}
                error={values.error.username}
                helperText={values.errorHelper.username}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }}>
              <TextField
                required
                label="Email"
                variant="standard"
                value={values.email}
                onChange={handleChange('email')}
                error={values.error.email}
                helperText={values.errorHelper.email}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }}>
              <TextField
                label="Company"
                variant="standard"
                value={values.company}
                onChange={handleChange('company')}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }}>
              <TextField
                label="Role"
                variant="standard"
                value={values.role}
                onChange={handleChange('role')}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }}>
              <TextField
                label="Country"
                variant="standard"
                value={values.country}
                onChange={handleChange('country')}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }}>
              <TextField
                label="Description"
                variant="standard"
                value={values.description}
                onChange={handleChange('description')}
              />
            </FormControl>
          </FormGroup>
          <FormGroup sx={{ my: 1 }}>
            <FormControl variant="standard">
              <InputLabel id="vms-select-standard-label">VMS</InputLabel>
              <Select
                variant="standard"
                labelId="vms-select-standard-label"
                id="vms-select-standard"
                value={values.vms}
                onChange={handleSelectChange('vms')}
                label="VMS"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Pelco</MenuItem>
                <MenuItem value={2}>Honeywell Maxpro</MenuItem>
                <MenuItem value={3}>Cognyte</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup sx={{ my: 2 }}>
            <FormControl>
              <FormLabel id="account-type-radio-buttons-group-label">
                Account Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="account-type-radio-buttons-group-label"
                defaultValue={
                  account
                    ? account.AccountType == 'Admin'
                      ? 'admin'
                      : 'client'
                    : 'client'
                }
                name="type-radio-buttons-group"
              >
                <FormControlLabel
                  value="client"
                  control={<Radio />}
                  label="Client"
                  onChange={handleRadioChange('admin', false)}
                  checked={!values.admin}
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                  onChange={handleRadioChange('admin', true)}
                  checked={values.admin}
                />
              </RadioGroup>
            </FormControl>
          </FormGroup>
          <FormGroup sx={{ my: 2 }}>
            <FormControl>
              <FormLabel id="user-active-radio-buttons-group-label">
                Active Status
              </FormLabel>
              <RadioGroup
                aria-labelledby="user-active-radio-buttons-group-label"
                defaultValue="active"
                name="active-radio-buttons-group"
              >
                <FormControlLabel
                  value="active"
                  control={<Radio />}
                  label="Active"
                  onChange={handleRadioChange('active', true)}
                  checked={values.active}
                />
                <FormControlLabel
                  value="inactive"
                  control={<Radio />}
                  label="Inactive"
                  onChange={handleRadioChange('active', false)}
                  checked={!values.active}
                />
              </RadioGroup>
            </FormControl>
          </FormGroup>
          <FormGroup sx={{ my: 2 }}>
            <FormControl sx={{ my: 1 }}>
              <TextField
                label="Number of Analytics"
                variant="standard"
                value={values.numAnalytics}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={handleNumberFilter('numAnalytics')}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }}>
              <TextField
                label="Number of Cameras"
                variant="standard"
                value={values.numCameras}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={handleNumberFilter('numCameras')}
              />
            </FormControl>
          </FormGroup>
          <FormGroup sx={{ my: 2 }}>
            <FormControl sx={{ my: 1 }}>
              <TextField
                label="Password"
                variant="standard"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                error={values.error.password}
                helperText={values.errorHelper.password}
              />
            </FormControl>
            <FormControl sx={{ my: 1 }}>
              <TextField
                label="Confirm Password"
                variant="standard"
                type={values.showPassword ? 'text' : 'password'}
                value={values.passwordConfirm}
                onChange={handleChange('passwordConfirm')}
                error={values.error.passwordConfirm}
                helperText={values.errorHelper.passwordConfirm}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox size="small" onClick={handleClickShowPassword} />
              }
              label={<Typography fontSize={12}>Show Password</Typography>}
            />
          </FormGroup>

          <FormGroup sx={{ my: 5 }}>
            <Typography variant="h4">Algorithms</Typography>
            <FormControl sx={{ my: 1 }}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={algorithms}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Select Algorithms"
                  />
                )}
              />
            </FormControl>
          </FormGroup>
          <FormGroup sx={{ my: 2 }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ m: 0.5 }}
              onClick={() => setValues({ ...initialValues })}
            >
              Clear
            </Button>
            <Button
              variant="outlined"
              color="success"
              sx={{ m: 0.5 }}
              onClick={submitForm}
            >
              Submit
            </Button>
          </FormGroup>
        </form>
      </Paper>
    </Container>
  );
};

export default AccountForm;
