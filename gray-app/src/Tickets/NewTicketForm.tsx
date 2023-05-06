import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select,styled,Box } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { reloadTableContext } from 'pages/others/tickets';



interface Ticket{
  occurance: string;
  status: string;
  type_of_alert: string;
  assigned_to: string;
  assigned_by:string;
  severity: string;
  reviewed: string;
}

const defaultTicket: Ticket = {
  occurance: "occurance 1",
  status: "open",
  type_of_alert: "type 1",
  assigned_to: "",
  assigned_by:"",
  severity: "low",
  reviewed: "no",
};

const DialogContentBox = styled(Box)({
  maxWidth:'100%',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-around',
  flexWrap:'wrap',
})

export default function NewTicketForm(props:any) {
  const reload  = React.useContext(reloadTableContext)

    const [data,setData] = useState<Ticket>(defaultTicket)
    const [open, setOpen] = React.useState(false);

  
    
    const handleChange = <P extends keyof Ticket>(prop: P, value:Ticket[P]) =>{
      setData({...data,[prop]:value});
    }
    
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleCreate = async () =>{
      if (validateForm()){
        const requestOptions = {
          method  : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
        
        await fetch('/api/tickets/ticketslist',requestOptions)
        .then(props.setNotifcation(true))
        .then(()=>handleClose())
      }
    }
  
    const handleClose = () => {
      setData(defaultTicket);
      reload.setReload(true);
      setOpen(false);

    };

    const validateForm = ()=>{
      if (data.assigned_by === "" || data.assigned_to === "")
        return false;
      
      return true;
    }

  
  
  return (
    <>  
      <Button id='add-ticket-btn' onClick={handleClickOpen} variant="outlined" startIcon={<AddIcon />}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{width:"100%"}}  >
          <DialogTitle variant='h2'>Edit Ticket</DialogTitle>
          <DialogContent >
            
            <DialogContentBox>

                <div>
                <DialogContentText variant='h5' >Occurance</DialogContentText>
              <Select
               
                labelId="occurance"
                id="occurance"
                defaultValue='occurance 1'
                value={data.occurance.toLowerCase()}
                onChange= {(e)=> handleChange('occurance',e.target.value)}
               >
               <MenuItem value={"occurance 1"}>Occurance 1</MenuItem>
               <MenuItem value={"occurance 2"}>Occurance 2</MenuItem>
               <MenuItem value={"occurance 3"}>Occurance 3</MenuItem>
               </Select>          
               </div>

              <DialogContentText variant='h5'>
                 Status
              </DialogContentText>
              <Select
                labelId="status"
                id="status"
                value={data.status.toLowerCase()}
                onChange= {(e)=> handleChange('status',e.target.value)}
               >
               <MenuItem value={"open"}>Open</MenuItem>
               <MenuItem value={"closed"}>Closed</MenuItem>
               </Select>      

               <DialogContentText variant='h5'>
                 Alert Type
              </DialogContentText>
              <Select
                labelId="AlertType"
                id="AlertType"
                value={data.type_of_alert.toLowerCase()}
                onChange= {(e)=> handleChange('type_of_alert',e.target.value)}
               >
               <MenuItem value={"type 1"}>type 1</MenuItem>
               <MenuItem value={"type 2"}>type 2</MenuItem>
               <MenuItem value={"type 3"}>type 3</MenuItem>
               <MenuItem value={"type 4"}>type 4</MenuItem>
               </Select> 


               <DialogContentText variant='h5'>
                 Assign To
              </DialogContentText>
              <TextField
                required = {true}
                id="assigned_to"
                error = {data.assigned_to === ''}
                helperText = {data.assigned_to ===''?"Field Assigned to cannot be empty": ""}
                value={data.assigned_to}
                onChange= {(e)=> handleChange('assigned_to',e.target.value)}
              />

              <DialogContentText variant='h5'>
                 Assigned By
              </DialogContentText>
              <TextField
                required = {true}
                error = {data.assigned_by === ''}
                helperText = {data.assigned_by ===''?"Field Assigned by cannot be empty": ""}
                id="assigned_by"
                value={data.assigned_by}
                onChange= {(e)=> handleChange('assigned_by',e.target.value)}
              />


              <DialogContentText variant='h5'>
                 Severity
              </DialogContentText>
              <Select
                labelId="severity"
                id="severity"
                value={data.severity.toLocaleLowerCase()}
                onChange= {(e)=> handleChange('severity',e.target.value)}
               >
               <MenuItem value={"low"}>Low</MenuItem>
               <MenuItem value={"medium"}>Medium</MenuItem>
               <MenuItem value={"high"}>High</MenuItem>
               </Select> 


               <DialogContentText variant='h5'>
                 Reviewed
              </DialogContentText>
              <Select
                labelId="reviewed"
                id="reviewed"
                value={data.reviewed.toLocaleLowerCase()}
                onChange= {(e)=> handleChange('reviewed',e.target.value)}
               >
               <MenuItem value={"yes"}>Yes</MenuItem>
               <MenuItem value={"no"}>No</MenuItem>
               </Select> 
               </DialogContentBox>
          </DialogContent>    
          <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button id='create_ticket_btn' onClick={handleCreate}>Create</Button>
          </DialogActions>
      </Dialog>
      </>
  )
}
