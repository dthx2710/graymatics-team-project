import React from 'react'
import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { reloadVideoContext } from 'pages/analytics/videos';
import Typography from "@mui/material/Typography";



interface Video{
    id: string;
    name: string;
    description: string;
    type: string;
    url: string;
    thumbnail: string;
    location: string;
}

function VideoInfoEdit(props:Video) {

    const defaultVideo:Video = {
        id : props.id,
        name: props.name,
        description: props.description,
        type: props.type,
        url: props.url,
        thumbnail: props.thumbnail,
        location: props.location,
    };


    const reloadContext = React.useContext(reloadVideoContext);
    const [data,setData] = React.useState(defaultVideo)
    const [open,setOpen] = React.useState<boolean>(false)

    const handleChange = <P extends keyof Video>(prop:P,value:Video[P])=>{
        setData({...data,[prop]:value});
    }

    const handleClickOpen = ()=>{
        setOpen(true);
    }

    const handleClose = (update:boolean) => {
        if(update === true)
          reloadContext.setReload(true);
        //setData(defaultTicket);
        setOpen(false);
      };
    
    const handleEdit = async ()=>{
        const requestOptions = {
            method : 'PUT',
            headers : {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        }
        await fetch(`/api/videos/${data.id}`,requestOptions)
        .then(()=>handleClose(true));
    }
  return (
    <>
    <IconButton onClick={(handleClickOpen)}>
    <Edit/>
    </IconButton>
    <Dialog open = {open} onClose = {()=>handleClose(false)}>
        <DialogContent>
            <DialogTitle>Edit video</DialogTitle>

            <Typography> Type </Typography>
            <TextField onChange={(e)=>handleChange('type',e.target.value)} defaultValue={data.type}></TextField>

            <Typography> Location </Typography>
            <TextField defaultValue={data.location} onChange={(e)=>handleChange('location',e.target.value)}></TextField>

            <Typography> Description </Typography>
            <TextField fullWidth defaultValue={data.description} onChange={(e)=>handleChange('description',e.target.value)}></TextField>

            <DialogActions>
                <Button onClick={()=>handleClose(false)}>Cancel</Button>
                <Button onClick={handleEdit}>Save</Button>
            </DialogActions>
        </DialogContent>

    </Dialog>
    </>

  )
}

export default VideoInfoEdit