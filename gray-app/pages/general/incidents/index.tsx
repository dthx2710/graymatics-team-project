import SidebarLayout from '@/layouts/SidebarLayout';
import IncidentsTable from '@/incidents/IncidentsTable';

const Incidents = () => {
  return (
    <IncidentsTable/>
    
  )
}

Incidents.getLayout = (page : any) => <SidebarLayout>{page}</SidebarLayout>;

export default Incidents