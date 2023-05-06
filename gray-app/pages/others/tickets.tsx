import React from 'react'
import SidebarLayout from '@/layouts/SidebarLayout';
import TicketsTable from '@/Tickets/TicketsTable';
import { Dispatch} from "react";



type reloadTableContext ={
  reload:boolean,
  setReload: Dispatch<React.SetStateAction<boolean>>
}

const iReloadContextState = {
  reload :false,
  setReload:()=>{}
}

 export const reloadTableContext = React.createContext<reloadTableContext>(iReloadContextState)

const Tickets = () => {
   const [reload, setReload] = React.useState<boolean>(false);
 
  return (
    <reloadTableContext.Provider value = {{reload,setReload}}>
    <TicketsTable />
    </reloadTableContext.Provider>
    
  )
}

Tickets.getLayout = (page : any) => <SidebarLayout>{page}</SidebarLayout>;

export default Tickets