import {Grid, TextField, Button, Typography} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import BasicLayout from '../components/BasicLayout'
import Listing from '../components/Listing'

//form validation - yup
const validationSchema = yup.object({
  taskName: yup
    .string()
    .required('List name is required'),
});

export default function Home() {

  const [listData, setListData] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

// POST data
  const postData = (newList) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newList)
    }
    fetch('https://api.npoint.io/154897131a76cb35d8c8', requestOptions)
    .then(res => setSending(false))
  }

  // set up formik
  const formik = useFormik({
    initialValues: {
      taskName: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values)
    },
  });

  function handleSubmit(values) {
    setSending(true)
    const newList = {
      "id": Date.now(),
      "taskName": values.taskName, // naming it taskName because of sorting in component Listing
      "task": false,
      "nOfActive": 0,
      "items": []
    } // add loading while posting DATA
    let data = []
    setListData((oldData)=> {
      data = [...oldData, newList]
      setListData(data)
      postData(data)
      formik.values.taskName = ''
    })
  }

  // fetch the data
  useEffect(()=> {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', mode: "no-cors"}
    }
    fetch('https://api.npoint.io/154897131a76cb35d8c8', requestOptions)
    .then(res => res.json())
    .then(data => {
      setListData(data)
      setLoading(false)
    })
  }, [])

  return (
    <BasicLayout>
      <form onSubmit={formik.handleSubmit}>
        {sending && <Typography textAlign='center'>Posting Data...</Typography>}
        <Grid container alignItems='center' justifyContent='center' spacing={3}>
            <Grid item md={8}>
              <TextField
              value={formik.values.taskName}
              name='taskName' 
              label="New list name" 
              variant='outlined' 
              sx={{width: '100%'}}
              onChange={formik.handleChange}
              error={formik.touched.taskName && Boolean(formik.errors.taskName)}
              helperText={formik.touched.taskName && formik.errors.taskName} />
            </Grid>

            <Grid item md={2}>
              <Button type="submit" variant='outlined'><AddCircleOutlineIcon />Add new</Button>
            </Grid>
            </Grid>
        </form>
            
            {!loading && <Listing listData={listData}></Listing>}
            {loading && <Typography variant='p'>Loading... (might take a while - slow API :D)</Typography>}
    </BasicLayout>
  )
}
