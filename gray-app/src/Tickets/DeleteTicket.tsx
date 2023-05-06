import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { reloadTableContext } from 'pages/others/tickets';




function DeleteTicket(props:any) {
  const reload  = React.useContext(reloadTableContext)
  const [open,setOpen] = React.useState<boolean>(false)

  const handleDelete = async (id: string) => {
   await fetch(`/api/tickets/${id}`, { method: 'DELETE' })
   .then(()=>handleClose())
  }

  const handleClose = ()=>{
    setOpen(false);
    reload.setReload(true);
  }

  return (
    <>
    <IconButton onClick={()=>setOpen(true)} aria-label="delete" color='error'>
        <DeleteIcon />
    </IconButton>

    <Dialog open={open}>
    <DialogTitle variant='h5'>Are you sure you want to delete ticket ID {props.id}?</DialogTitle>
    <DialogActions>
              <Button onClick={()=>handleDelete(props.id)}>Yes</Button>
              <Button onClick={handleClose}>No</Button>
          </DialogActions>
    </Dialog>
    </>
  )
}

export default DeleteTicket