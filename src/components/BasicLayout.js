import {Grid, Paper, TextField, Button} from '@mui/material'

import Header from "../components/Header"

export default function BasicLayout(props) {
  return (
    <Grid container direction='column'>

      <Grid item>
        <Header></Header>
      </Grid>

      <Grid item container justifyContent='center' alignItems='center'>
        <Grid item md={8}>
          <Paper elevation={3} sx={{mt: 13, padding: 5}}>

            {props.children}

          </Paper>
        </Grid>
      </Grid>

    </Grid>
  )
}
