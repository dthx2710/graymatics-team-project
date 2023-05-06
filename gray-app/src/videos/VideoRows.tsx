import React from 'react'
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import VideoMediaCard from './VideoMediaCard';
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import dayjs from 'dayjs';
import VideoDelete from './VideoDelete';
import VideoInfoEdit from './VideoInfoEdit';
import { reloadVideoContext } from 'pages/analytics/videos';


 interface Video{
        id: string;
        name: string;
        description: string;
        created_at: Date;
        type: string;
        url: string;
        thumbnail: string;
        location: string;
        video_uuid:string
    }


function VideoRows(props: any) {
    const reload = React.useContext(reloadVideoContext);
    
    const [open, setOpen] = React.useState('null');
    const [videoData, setVideoData] = React.useState<Video[]>([]);

    const getVideoData = async () => {
        const response = await fetch('/api/videos/VideosList');
        const data = await response.json();
        setVideoData(data);
    }

    React.useEffect(() => {
      getVideoData();
      return()=>{
        reload.setReload(false);
      }    
    }, [reload.reload === true]);
    

    type filterTypes = 'location' |'type'|'name';
    const filter = props.filter as filterTypes;
    
    
    const filteredData = videoData.filter((el)=>{
        if (props.inputText === '' || props.filter === '' || el[filter] === undefined || el[filter] === null) {
            return el;
        }
        //return the item which contains the user input
        if(filter === 'name')
        {
            if (el[filter].toLowerCase().indexOf(props.inputText) === 0) {
                return el[filter];
            }
        }
        else if (el[filter].toLowerCase().includes(props.inputText)) {
            return el[filter];
        }
    })

    const handleDescriptionButton = (dataId: any)=>{
        setOpen(currentId  => {
            if(currentId === dataId) return null
            return dataId;
        })
    }
  
    return(
            <React.Fragment>
                {filteredData.map((item) => (
                <React.Fragment key={item.id}>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                        <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleDescriptionButton(item.id)}
                        >
                            {open === item.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        </TableCell>
                        <TableCell  component="th" scope="row" >
                        <VideoMediaCard {...item}/>            
                        </TableCell>
                        <TableCell  align="center">{dayjs(item.created_at).format('DD/MM/YYYY')}</TableCell>
                        <TableCell  align="center">{item.type}</TableCell>  
                        <TableCell  align="center">{item.location}</TableCell>         
                        <TableCell  align="center">
                            <Box sx={{display:'flex'}}>
                               <VideoDelete id = {item.id} uuid = {item.video_uuid}/>
                               <VideoInfoEdit {...item}/>
                            </Box>
                        </TableCell>              
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8} >
                        <Collapse in={open === item.id} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 3 }}>
                            <Typography   component="div">
                                Description
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <p>{item.description}</p>
                            </Table>
                            </Box>
                        </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
                ))}
            </React.Fragment>
        
    );
}
export default VideoRows