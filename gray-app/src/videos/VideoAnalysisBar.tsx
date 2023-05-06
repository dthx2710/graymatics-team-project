import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Typography } from '@mui/material';
import Piechart from '@/components/Chart/Piechart';
import { Divider } from '@mui/material';
import { IconButton } from '@mui/material';


function VideoAnalysisBar(props:any) {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    return(

        <>
        <IconButton color='success' onClick={()=>setIsDrawerOpen(true)}><ShowChartIcon/></IconButton>
        <Drawer anchor='right' open = {isDrawerOpen} onClose = {()=>setIsDrawerOpen(false)}>

            <Box p={2} width = '750px' textAlign={'center'}>
                <Typography variant='h2'>
                    {props.name}
                </Typography>
                    <Box display={'flex'} flexDirection={"row"} textAlign={'center'} justifyContent={'space-between'}>
                    <Card sx={{  width: 300, textAlign:"center",backgroundColor:'#E0E7EA'}}>
                        <CardContent>
                            <Typography variant = 'h2' color={'red'}>
                               5
                            </Typography>
                            <Typography variant = 'h3' color={'red'}>
                                High level alert(s)
                            </Typography>                          
                        </CardContent>       
                    </Card>
                    <Card sx={{ width: 300, textAlign:"center",backgroundColor:'#E0E7EA'}}>
                        <CardContent>
                            <Typography variant = 'h2' color={'green'}>
                               2
                            </Typography>
                            <Typography variant = 'h3' color={'green'}>
                                Low level alert(s)
                            </Typography>
                        </CardContent>       
                    </Card>
                    </Box>                
                    <Divider/>
                <Piechart data={props.name}/>
               
            </Box>

        </Drawer>

        </>
    )
    
   
}

export default VideoAnalysisBar