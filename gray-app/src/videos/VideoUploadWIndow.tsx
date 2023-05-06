import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {TextField, Typography } from '@mui/material';
import { reloadVideoContext } from 'pages/analytics/videos';
import supabase from 'lib/supabase';
import { Stack } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';

const CDNURL = "https://xqybgvghopxoczhciphb.supabase.co/storage/v1/object/public/videos/"

interface Video {
  name: string;
  description: string;
  type: string;
  url: string;
  thumbnail: string;
  location: string;
  video_uuid:string
}

const defaultVideo : Video = {
  name: "",
  description: "",
  type: "",
  url: "",
  thumbnail: "",
  location: "",
  video_uuid:""
};



export default function VideoUploadWIndow() {
  const reload = React.useContext(reloadVideoContext);
  const [open, setOpen] = React.useState(false);
  const [data,setData] = React.useState(defaultVideo);
  const [file,setFile] =  React.useState<File | null>(null);
  const [fileName,setFileName]=  React.useState("")


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleFile = (e:any)=> {
    if (e.target.files.length > 0)
    {
      setData({...data,video_uuid:uuidv4()})
      setFileName(e.target.files[0].name)
      setFile(e.target.files[0])
    }
}


React.useEffect(() => {
  const newUrl = CDNURL + data.video_uuid;
  setData({...data,url:newUrl})
}, [data.video_uuid]);

 const handleFileUpload = async()=>
 {
    if(file){
      const {error} = await supabase
      .storage
      .from('videos')
      .upload(data.video_uuid,file)

      if (error) {
       console.log(error)
        };
    }
    
 }

  const handleVideoUpload = async ()=>
  {
    if(validateForm()){
      const requestOptions = {
        method  : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
  
      await fetch('/api/videos/VideosList',requestOptions)
      await handleFileUpload();
      handleClose()
    }
  }


  const handleChange = <P extends keyof Video>(prop:P, value:Video[P])=>{
    setData({...data,[prop]:value});
  };

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const validateForm = ()=>{
    if (data.name === "" ||  data.type === "")
        return false;

    return true;
  }

  const handleClose = () => {
    reload.setReload(true)
    setData(defaultVideo)
    setFileName("")
    setFile(null)
    setOpen(false)
  };

  return (
    <div>
       <Button sx={{paddingTop:'15px',paddingRight:'15px'}} variant="text" onClick={handleClickOpen}>
        Upload
      </Button>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        </DialogTitle>

        <DialogContent style={{overflow:'hidden'}}>
          <DialogContentText>
           Enter video name:
          </DialogContentText>       
            <TextField required = {true}   
              fullWidth defaultValue={data.name} 
              onChange = {(e) => handleChange('name',e.target.value)}
              error = {data.name === ''}
              helperText = {data.name ===''?"Field name cannot be empty": ""}/>       
        </DialogContent>

        <DialogContent style={{overflow:'hidden'}}>
          <DialogContentText>
           Choose video file:
          </DialogContentText> 
        <Stack  direction="row">
        <input
            hidden
            accept="video/*"
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFile}
          />
          <label htmlFor="raised-button-file">
            <Button sx={{paddingTop:'15px',paddingRight:'15px'}} variant='text' component="span">
              <Typography noWrap>Choose file</Typography>
            </Button>
          </label>    
          <TextField 
           disabled
           fullWidth
           id="outlined-disabled"
           label= {fileName}
           error = {file === null}
           helperText = {file === null?"File cannot be empty": ""}/>

        </Stack>
        </DialogContent>

        <DialogContent style={{overflow:'hidden'}}>
          <DialogContentText>
           Enter video Type:
          </DialogContentText>       
            <TextField 
            fullWidth defaultValue={data.type} 
            onChange = {(e) => handleChange('type',e.target.value)}
            error = {data.type === ''}
            helperText = {data.type ===''?"Field type cannot be empty": ""}/>       
        </DialogContent>

        <DialogContent style={{overflow:'hidden'}}>
          <DialogContentText>
           Enter video Location:
          </DialogContentText>       
            <TextField fullWidth defaultValue={data.location} onChange = {(e) => handleChange('location',e.target.value)}/>       
        </DialogContent>

        <DialogContent style={{overflow:'hidden'}}>
          <DialogContentText>
            Description
          </DialogContentText>  
          <TextField fullWidth defaultValue={data.description} onChange = {(e) => handleChange('description',e.target.value)}/>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleVideoUpload}>
            Upload
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  )
}
