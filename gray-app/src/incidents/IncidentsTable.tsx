import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Typography, Box, styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import Footer from 'src/components/Footer';
import { WarningOutlined } from '@mui/icons-material';
import { blue, orange, red } from '@mui/material/colors';
import { ChipProps } from '@mui/material/Chip';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { Container } from '@mui/system';
import dayjs from 'dayjs';

interface Incident {
  id: string;
  type: string;
  date: Date;
  time: string;
  camera: string;
  severity: string;
}

const SeveritySymbolsBox = styled(Box)({
  margin: '0 auto',
  display: 'flex'
});

const SeveritySymbolsBoxText = styled(Box)({
  marginLeft: '10px',
  maxWidth: '55%',
  paddingTop: '50px'
});

function getSeverityLabelProps(params: GridRenderCellParams): ChipProps {
  var severity = params.value;
  if (severity === 'High') {
    return {
      icon: <WarningOutlined style={{ fill: red[500] }} />,
      label: severity,
      style: {
        borderColor: red[500]
      }
    };
  } else if (severity === 'Medium') {
    return {
      icon: <WarningOutlined style={{ fill: orange[500] }} />,
      label: severity,
      style: {
        borderColor: orange[500]
      }
    };
  } else {
    return {
      icon: <WarningOutlined style={{ fill: blue[500] }} />,
      label: severity,
      style: {
        borderColor: blue[500]
      }
    };
  }
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'type', headerName: 'Incident Type', flex: 1 },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    flex: 1,
    valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY')
  },
  { field: 'time', headerName: 'Time', flex: 1 },
  { field: 'camera', headerName: 'Camera', flex: 1 },
  {
    field: 'photo_url',
    headerName: 'Snapshot',
    flex: 1,
    renderCell: (params) => (
      <img src={params.value as string} alt="incident" height={50} />
    )
  },
  { field: 'category', headerName: 'Category', flex: 1 },
  {
    field: 'severity',
    headerName: 'Severity',
    flex: 1,
    renderCell: (params) => {
      return <Chip variant="outlined" {...getSeverityLabelProps(params)} />;
    },
    editable: true,
    type: 'singleSelect',
    valueOptions: ['Low', 'Medium', 'High']
  }
];

export default function IncidentsTable() {
  const [incidentData, setIncidentData] = React.useState<Incident[]>([]);

  const getIncidentData = async () => {
    const response = await fetch(
      'http://localhost:3000/api/incidents/IncidentsList'
    );
    const data = await response.json();
    setIncidentData(data);
  };

  React.useEffect(() => {
    getIncidentData();
  }, []);

  const [pageSize, setPageSize] = React.useState<number>(10);

  return (
    <>
      <PageTitleWrapper>
        <Typography variant="h1" gutterBottom>
          Incidents
        </Typography>
      </PageTitleWrapper>

      <Container sx={{ marginBottom: '50px', display: 'flex' }}>
        <SeveritySymbolsBox>
          <Box
            component="img"
            sx={{ height: '150px', width: '300px' }}
            src="../static/images/LowSeverityIncidentIcon.png"
          />
          <SeveritySymbolsBoxText>
            <Typography variant="h2">
              {incidentData.filter((item) => item.severity === 'Low').length}
            </Typography>
            <Typography> Low Severity Incidents</Typography>
          </SeveritySymbolsBoxText>
        </SeveritySymbolsBox>
        <SeveritySymbolsBox>
          <Box
            component="img"
            sx={{ height: '150px', width: '300px' }}
            src="../static/images/MediumSeverityIncidentIcon.png"
          />
          <SeveritySymbolsBoxText>
            <Typography variant="h2">
              {incidentData.filter((item) => item.severity === 'Medium').length}
            </Typography>
            <Typography> Medium Severity Incidents</Typography>
          </SeveritySymbolsBoxText>
        </SeveritySymbolsBox>

        <SeveritySymbolsBox>
          <Box
            component="img"
            sx={{ height: '150px', width: '300px' }}
            src="../static/images/HighSeverityIncidentIcon.png"
          />
          <SeveritySymbolsBoxText>
            <Typography variant="h2">
              {incidentData.filter((item) => item.severity === 'High').length}
            </Typography>
            <Typography> High Severity Incidents</Typography>
          </SeveritySymbolsBoxText>
        </SeveritySymbolsBox>
      </Container>

      <div
        style={{
          height: 600,
          width: '100%',
          paddingLeft: '5%',
          paddingRight: '5%',
          marginBottom: '5%',
          alignContent: 'center'
        }}
      >
        <DataGrid
          localeText={{
            toolbarColumns: 'Edit Columns',
            toolbarFilters: 'Search',
            toolbarDensity: 'Density',
            toolbarExport: 'Export'
          }}
          rows={incidentData}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 30, 40, 50]}
          pagination
          components={{ Toolbar: GridToolbar }}
          editMode="row"
        />
      </div>
      <Footer />
    </>
  );
}