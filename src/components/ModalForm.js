import { Paper, TextField, Button, Grid, Modal, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CloseIcon from '@mui/icons-material/Close';

import { useFormik } from 'formik'
import * as yup from 'yup'

const StyledTextField = styled(TextField)`
    width: 20em;
    @media only screen and (max-width: 600px) {
        width: 10em;
    }
`


const CustomCloseIcon = styled(CloseIcon)`
    position: absolute;
    left: 0;
    cursor: pointer;
    width: 35px;
    height: 35px;
    &:hover {
        color: grey;
    }
    disp
`

//form validation - yup
const validationSchema = yup.object({
    taskName: yup
      .string()
      .required('List name is required'),
    taskDescription: yup
      .string()
      .required('List description is required'),
    taskDeadline: yup
    .string()
    .required('Deadline date is requested')
  });

export default function ModalForm({open, handleClose, handleSubmit, sending}) {

    // set up formik
    const formik = useFormik({
        initialValues: {
        taskName: '',
        taskDescription: '',
        taskDeadline: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
            // reset input values
            formik.values.taskDeadline = ''
            formik.values.taskDescription = ''
            formik.values.taskName = ''
        },
    })
    
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
            width: '65%',
            margin: '100px auto',
        }}
      >
        <Paper sx={{paddingX: 5, pb: 5}}>
            <CustomCloseIcon onClick={handleClose}/>
            <form onSubmit={formik.handleSubmit}>
                <Grid container alignItems='center' direction='column' spacing={2}>
                    <Grid item>
                        <Typography variant='h4' element='p' textAlign='center'>Add new task</Typography>
                    </Grid>
                    <Grid item>
                        <StyledTextField sx label='Task'
                        value={formik.values.taskName}
                        name='taskName' 
                        onChange={formik.handleChange}
                        error={formik.touched.taskName && Boolean(formik.errors.taskName)}
                        helperText={formik.touched.taskName && formik.errors.taskName} />
                    </Grid>
                    <Grid item>
                        <StyledTextField label='Description' rows={3}
                        value={formik.values.taskDescription}
                        name='taskDescription' 
                        onChange={formik.handleChange}
                        error={formik.touched.taskDescription && Boolean(formik.errors.taskDescription)}
                        helperText={formik.touched.taskDescription && formik.errors.taskDescription} />
                    </Grid>
                    <Grid item>
                    <StyledTextField
                        id="datetime-local"
                        label="Deadline"
                        type="datetime-local"
                        defaultValue="2017-05-24T10:30"
                        sx={{ width: 250 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value={formik.values.taskDeadline}
                        name='taskDeadline' 
                        onChange={formik.handleChange}
                        error={formik.touched.taskDeadline && Boolean(formik.errors.taskDeadline)}
                        helperText={formik.touched.taskDeadline && formik.errors.taskDeadline} />
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' type='submit'><LibraryAddIcon /> Add</Button>
                    </Grid>
                    <Grid item>
                        {sending && <Typography>Posting data/pls wait/...</Typography>}
                    </Grid>
                </Grid>
            </form>
        </Paper>
      </Modal>
  )
}
