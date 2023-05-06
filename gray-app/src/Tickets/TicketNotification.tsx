import * as React from 'react';
import Alert from '@mui/material/Alert';



export default function TicketNotification(props:any) {

    const handleClose = () =>{
        props.setNotifcation(false)
    }

  if(props.displayNotification)
  {
      return (
          <Alert severity='success' onClose={handleClose}>Ticket succesfully created!</Alert>
      );
  }
  else
    return <></>
}