import {

    Card,
    CardHeader,
    Divider,
    Button,

  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  
  const Button2 = styled(Button)({
    margin: 25,
  })

  const Card2 = styled(Card)({
    alignItems: 'center',
    justifyContent: 'center',
  })

  
  function ActivityTab({setTheme}: {setTheme: any}) {

    return (
      <Card2>
        <CardHeader
          titleTypographyProps={{ variant: 'h4' }}
          subheaderTypographyProps={{ variant: 'subtitle2' }}
          title="Theme Colors"
          subheader={
            <>
              Choose the different theme colors 
            </>
          }
        />
        <Divider />
      <Button2 style = {{backgroundColor: "#CB3C1D"}} variant="contained" onClick={() => setTheme('DarkSpacesTheme')}>Dark Spaces Theme</Button2>
      <Button2 style = {{backgroundColor: "#5569ff"}} variant="contained" onClick={() => setTheme('GraymaticsBaseTheme')}>Graymatics Base Theme</Button2>
      <Button2 style = {{backgroundColor: "#44a574"}} variant="contained" onClick={() => setTheme('GreenFieldsTheme')}>Green Fields Theme</Button2>
      <Button2 style = {{backgroundColor: "#8C7CF0"}} variant="contained" onClick={() => setTheme('NebulaFighterTheme')}>Nebula Fighter Theme</Button2>
      </Card2>
    );
  }
  
  export default ActivityTab;