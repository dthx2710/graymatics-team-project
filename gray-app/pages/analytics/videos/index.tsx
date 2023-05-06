import React, {Dispatch, useState } from 'react';
import {
  Grid,
  Stack,
  TextField
} from '@mui/material';

import SidebarLayout from '@/layouts/SidebarLayout';
import VideoUploadWIndow from '@/videos/VideoUploadWIndow';
import FilterMenu from '@/videos/FilterMenu';
import Footer from 'src/components/Footer';
import VideoList from '@/videos/VideoList';


type reloadVideosContext ={
  reload:boolean,
  setReload: Dispatch<React.SetStateAction<boolean>>
}

const iReloadContextState = {
  reload :false,
  setReload:()=>{}
}

 export const reloadVideoContext = React.createContext<reloadVideosContext>(iReloadContextState)

 

const MyVideos = () => {
  const [reload, setReload] = React.useState<boolean>(false);
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState("");
  let inputHandler = (e:any) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
 


  return (
    <>
      <reloadVideoContext.Provider value = {{reload,setReload}}>


        <Stack direction={'row'} spacing = {3} justifyContent={'center'} paddingTop={5}>
        <VideoUploadWIndow/>
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          label="Search"
        />
         <FilterMenu setFilter = {setFilter} filter = {filter}/>

        </Stack>
      <Grid
        container
        direction="row"
        justifyContent="center"
        paddingLeft= {5}
        paddingRight= {5}
      >
        <VideoList inputText = {inputText} filter = {filter}/>
      </Grid>
      <Footer />
      </reloadVideoContext.Provider>
    </>
  );
};

MyVideos.getLayout = (
  page:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
) => <SidebarLayout>{page}</SidebarLayout>;

export default MyVideos;
