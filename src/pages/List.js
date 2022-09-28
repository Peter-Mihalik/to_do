import {Grid, TextField, Button, Typography} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BasicLayout from '../components/BasicLayout';
import Listing from "../components/Listing";
import ModalForm from '../components/ModalForm';

export default function List() {

  const params = useParams()

  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // for fetching data
  const [fetchedListData, setFetchedListData] = useState([])
  const [listData, setListData] = useState([])
  const [allListItems, setAllListItems] = useState([])
  // for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // for search
  const [query, setQuery] = useState(null)
  const [searched, setSearched] = useState(false)

  // fetch the data
  useEffect(()=> {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', mode: "no-cors"}
    }
    fetch(' https://api.npoint.io/3375379da57edfa87587', requestOptions)
    .then(res => res.json())
    .then(data => {
      let rightList = data.filter((obj)=> {
        setAllListItems(data)
        return obj.listId === params.id
      })
      setListData(rightList)
      setFetchedListData(rightList)
      setLoading(false)
    })
  }, [])

  const postData = (newList, status) => {
    setSending(true)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newList)
    }
    fetch('https://api.npoint.io/3375379da57edfa87587', requestOptions)
    .then(res => { 
      if (res.status === 200) {
        // setStates (refresh)
        let newListData = newList.filter((obj) => {
          return obj.listId === params.id
        })
        if (status === 'deleting/checking') {
          setFetchedListData(newListData)
          setListData(newListData)
          setSending(false)
          setDeleting(false)
        }
        else if (status === 'adding') {
          setFetchedListData(newListData)
          setListData(newListData)
          setSending(false)
          handleClose()
        }
      }
    })
  }

  const deleteTask = (task, id) => {
    setDeleting(true)
    let filteredList = allListItems.filter((obj) => {
      return obj.id !== id
    })
    setAllListItems(filteredList)
    postData(filteredList, 'deleting/checking')
  }

  const checkTask = (task, id) => {
    task.checked = !task.checked
    // I have to 'rebuilt' list array
    // 1. delete this task from array
    let filteredArray = allListItems.filter(obj => {
      return obj.id !== id
    })
    // Spread out tasks and this checked/unchecked task
    let newArray = [...filteredArray, task]
    // post array
    postData(newArray, 'deleting/checking')
  }

  const searchItems = () => {
    // not using formik because i dont have to validate anything 'empty query is a valid one'
    if (query) {
      let searchedList = listData.filter(obj => {
        return obj.taskName === query
      })

      setListData(searchedList)
      setSearched(true)
    }
    else {
      // I had to create another state to store currnet list items. if query is empty I want return all list items. But 
      // I cant use first 'listData' because it may contain previus query
      setListData(fetchedListData)
      setQuery(null)
      setSearched(false)
    }
  }

  const handleSubmit = (values) => {
    // format date
    const fromatedDate = values.taskDeadline.replace('T', " ")
    const newTask = {
        id: Date.now(),
        listId: params.id,
        taskName: values.taskName,
        description: values.taskDescription,
        date: fromatedDate,
        checked: false,
        task: true
    }

    const list = [...allListItems, newTask]
    setAllListItems(list)
    
    postData(list, 'adding')
  }

  const filter = (status) => {
    if (status === 'all') {
      setListData(fetchedListData)
    }
    else if (status === 'completed') {
      const completedItems = fetchedListData.filter(obj => {
        return obj.checked
      })
      setListData(completedItems)
    }
    else if (status === 'uncompleted') {
      const uncompletedItems = fetchedListData.filter(obj => {
        return !obj.checked
      })
      setListData(uncompletedItems)
    }
  }

  return (

    <BasicLayout>

      {/* {!loading &&<Typography textAlign='center' variant='h3'>{currentList.listName}</Typography>}
      {loading &&<Typography textAlign='center' variant='h3'>Loading list name...</Typography>} */}

      <Grid container justifyContent='center' alignItems='center' spacing={2}>



        <Grid item md={8}>
          <TextField label='Search for item' sx={{width: '100%'}} onChange={(e) => setQuery(e.target.value)} value={query}/>
        </Grid>
        
        <Grid item md={2}>
          <Button variant='outlined' onClick={searchItems}><SearchIcon /> Search</Button>
        </Grid>

        <Grid item md={2}>
          <Button variant='outlined' onClick={handleOpen}><AddCircleOutlineIcon /> Add Task</Button>
        </Grid>
      </Grid>

      {deleting && <Typography variant='p' alignText='center'>Deleting item...</Typography>}
      {searched && <Typography variant='p' alignText='center'>Results for' {query}' (search empty to get all results):</Typography>}

      <Grid container justifyContent='center' alignItems='center' spacing={2} 
      sx={{mt:2}}>
        <Grid item>
          <Button onClick={() => filter('all')} variant='outlined'>All</Button>
        </Grid>

        <Grid item>
          <Button  onClick={() => filter('uncompleted')} variant='outlined'>Uncompleted</Button>
        </Grid>

        <Grid item>
          <Button variant='outlined' onClick={() => filter('completed')} >Completed</Button>
        </Grid>

      </Grid>

      {!loading && <Listing listData={listData} deleteTask={deleteTask} checkTask={checkTask}></Listing>}
      {loading && <Typography variant='p'>Loading...</Typography>}

      <ModalForm listId={params.id} handleClose={handleClose} handleSubmit={handleSubmit} sending={sending} open={open}></ModalForm>

    </BasicLayout>
  )
}
