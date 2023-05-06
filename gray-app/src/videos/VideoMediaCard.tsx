import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ModalVideo from 'react-modal-video'


export default function ActionAreaCard(props:any) {

  const [vidOpen,setVidOpen]= React.useState(false);
  const [_hover,setHover]= React.useState(false);

  return (
    <Card  sx={{ maxWidth: 300, textAlign:"center"}}>
      <CardActionArea onClick={()=>setVidOpen(true)} onMouseEnter={()=>setHover(true)}>
        <CardMedia component="video"
          height="120"
          src= {props.url}
          >
         
          </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <ModalVideo  channel="custom"  isOpen={vidOpen} url = {props.url} onClose={() => setVidOpen(false)} />
    </Card>
  );
}
