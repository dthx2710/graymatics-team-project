import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar,GridRenderCellParams } from '@mui/x-data-grid';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import {  Typography,Box,styled} from '@mui/material';
import Chip from '@mui/material/Chip';
import Footer from 'src/components/Footer';
import { CancelRounded, CheckCircleRounded, WarningOutlined } from '@mui/icons-material';
import { blue, green, orange, red } from '@mui/material/colors';
import { ChipProps } from '@mui/material/Chip';
import { Container } from '@mui/system';
import EditForm from './EditForm';
import NewTicketForm from './NewTicketForm';
import dayjs from 'dayjs';
import TicketNotification from './TicketNotification';
import DeleteTicket from './DeleteTicket';
import { reloadTableContext } from 'pages/others/tickets';

interface Tickets{
  id: string;
  created_at: Date;
  occurance: string;
  status: string;
  type_of_alert: string;
  assigned_to: string;
  assigned_by:string;
  severity: string;
  reviewed: string;
}

const SeveritySymbolsBox = styled(Box)({
  margin:'0 auto',
  display:'flex'
})

const SeveritySymbolsBoxText = styled(Box)({
  marginLeft:'10px',
  maxWidth:'55%',
  paddingTop:'50px'
})



function getSeverityProps(params: GridRenderCellParams): ChipProps {

  if (String(params.row.severity).toLocaleLowerCase() === "High".toLocaleLowerCase()) {
    return {
      icon: <WarningOutlined style={{ fill: red[500] }} />,
      label: params.row.severity,
      style: {
        borderColor: red[500]
      }
    };
  } else if (params.row.severity.toLocaleLowerCase() === "Medium".toLocaleLowerCase()) {
   
    return {
      icon: <WarningOutlined style={{ fill: orange[500] }} />,
      label: params.row.severity,
      style: {
        borderColor: orange[500]
      }
    };
  }
  else{
    return {
      icon: <WarningOutlined style={{ fill: blue[500] }} />,
      label: params.row.severity,
      style: {
        borderColor: blue[500]
      }
    };
  }
}

function getReviwedParams(params: GridRenderCellParams): ChipProps {
  if (String(params.row.reviewed).toLocaleLowerCase() === "Yes".toLocaleLowerCase()) {
    return {
      icon: <CheckCircleRounded style={{ fill: green[500] }} />,
     
      style: {
        border:'None'
    
      }
    };
  } 
  else{
    return {
      icon: <CancelRounded style={{ fill: red[500] }} />,
     
      style: {
        border:'None'
      }
    };
  }
}

function getStatusParams(params: GridRenderCellParams): ChipProps {
  if (String(params.row.status).toLocaleLowerCase()  === "Open".toLocaleLowerCase()) {
    return {
      label: params.row.status,
      style: {
        color:'Green',
        backgroundColor:'transparent'
      }
    };
  } 
  else{
    return {
      label: params.row.status,
      style: {
        color:'red',
        backgroundColor:'transparent'
      }
    };
  }
}

const columns: GridColDef[] = [
  
  { field: 'id', headerName: 'ID', flex:1},
  { field: 'created_at', headerName: 'Date', flex:1, valueFormatter: params => dayjs(params.value).format('DD/MM/YYYY')},
  { field: 'occurance', headerName: 'Occurance', flex:1 },
  { field: 'status',headerName: 'Status',flex:1,
  renderCell: (params) => {
    return <Chip  {...getStatusParams(params)} />;
  },
},
  { field: 'type_of_alert', headerName: 'Alert Type', flex:1 },
  { field: 'assigned_to', headerName: 'Assigned To', flex:1 },
  { field: 'assigned_by', headerName: 'Assigned By', flex:1 },
  { field: 'severity',headerName: 'Severity',flex:1,
    renderCell: (params) => {
      return <Chip variant='outlined' {...getSeverityProps(params)} />;
    },
  },
  { field: 'reviewed',headerName: 'Reviewed',flex:1,
    renderCell: (params) => {
      return <Chip variant="outlined" {...getReviwedParams(params)} />;
  }
  },
  { field: 'actions',headerName: 'Actions',flex:1, align:'center',
  type:'actions',
  filterable:false,
  cellClassName:'actions',
  
  renderCell: (params) => {
    return (
      
      <div className='TicketActions'>
       <DeleteTicket {...params.row}/>
       <EditForm {...params.row}/>
      </div>
    )
  }
  },
];


export default function TicketsTable() {

  const reloadContext  = React.useContext(reloadTableContext)
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [ticketData, setTicketData] = React.useState<Tickets[]>([]);
  const [displayNotification, setDisplayNotification] = React.useState<boolean>(false);
  const [severityCount, setSeverityCount] = React.useState({
    low: 0,
    med: 0,
    high: 0
  })
 

  const getTicketData = async() =>{
    const response = await fetch('/api/tickets/ticketslist');
    const data = await response.json();
    setTicketData(data)
  }

  React.useEffect(() => {
    const lowSeverityData = ticketData.filter(ticket => ticket.severity === 'low');
    const medSeverityData = ticketData.filter(ticket => ticket.severity === 'medium');
    const highSeverityData = ticketData.filter(ticket => ticket.severity === 'high');
    setSeverityCount({
      low: lowSeverityData.length,
      med: medSeverityData.length,
      high: highSeverityData.length
    });
  }, [ticketData]);

  React.useEffect(() => {
    getTicketData();

    return ()=>{
      reloadContext.setReload(false);
    }
    
  }, [reloadContext.reload === true])
 

  
  return (
    <>
    <PageTitleWrapper>
      <Typography variant="h1"  gutterBottom>
        Tickets
      </Typography>
    </PageTitleWrapper>

    <Container sx={{marginBottom:"50px",display:'flex'}}>
       
       <SeveritySymbolsBox>
        <Box component='img' sx={{height:'150px',width:'150px',}} src='../static/images/LowSeverityIcon.png'/>
          <SeveritySymbolsBoxText>
            <Typography variant='h2'> {severityCount.low}</Typography>
            <Typography > Low Severity alerts</Typography>
          </SeveritySymbolsBoxText>
       </SeveritySymbolsBox>
        

       <SeveritySymbolsBox>
      <Box component='img' sx={{height:'150px',width:'150px'}} src='../static/images/MedSeverityIcon.png'/>
      <SeveritySymbolsBoxText>
        <Typography variant='h2'> {severityCount.med}</Typography>
        <Typography > Medium Severity alerts</Typography>
      </SeveritySymbolsBoxText>
      </SeveritySymbolsBox>

      <SeveritySymbolsBox>
      <Box component='img' sx={{height:'150px',width:'150px'}} src='../static/images/HighSeverityIcon.png'/>
      <SeveritySymbolsBoxText>
        <Typography variant='h2'> {severityCount.high}</Typography>
        <Typography > {"High Severity alerts"}</Typography>
      </SeveritySymbolsBoxText>
      </SeveritySymbolsBox>
    </Container>
    
    
    <div style={{ height: 600, width: '100%', paddingLeft: '5%', paddingRight: '5%', marginBottom:'5%', alignContent: 'center' }}>
     <NewTicketForm setNotifcation ={setDisplayNotification}/>
     <TicketNotification displayNotification = {displayNotification} setNotifcation ={setDisplayNotification}/>
        <DataGrid
          localeText={{
            toolbarColumns: "Edit Columns",
            toolbarFilters: "Search By..",
            toolbarDensity: "Density",
            toolbarExport: "Export"
          }}

          
          rows={ticketData}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10,20,30,40,50]}
          pagination
          components={{ Toolbar: GridToolbar }}
          editMode="row"
          
          />
         
      </div>
    
      <Footer />
      </>
  );
}
