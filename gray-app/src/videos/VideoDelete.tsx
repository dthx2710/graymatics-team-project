import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { reloadVideoContext } from 'pages/analytics/videos';
import supabase from 'lib/supabase';

function VideoDelete(props:any) {

    const reload  = React.useContext(reloadVideoContext)

    const [open,setOpen] = React.useState<boolean>(false)

    const handleVideoDelete = async() =>
    {
      const {error} = await supabase
      .storage
      .from('videos')
      .remove([props.uuid])

      if (error){
        console.log(error)
      }
    }

    const handleDelete = async(id:string)=>
    {
        await fetch(`/api/videos/${id}`, { method: 'DELETE' })
        await  handleVideoDelete()
        handleClose()
    }

    const handleClose = ()=>
    {
        setOpen(false);
        reload.setReload(true);
    }
  return (

    <>
    <IconButton onClick={() => setOpen(true)} aria-label="delete" color='error'>
          <DeleteIcon />
    </IconButton>

    <Dialog open={open}>
    <DialogTitle variant='h5'>Are you sure you want to delete Video Name: {props.name}?</DialogTitle>
    <DialogActions>
              <Button onClick={()=>handleDelete(props.id)}>Yes</Button>
              <Button onClick={handleClose}>No</Button>
          </DialogActions>
    </Dialog>
    </>
  )


}



export default VideoDelete