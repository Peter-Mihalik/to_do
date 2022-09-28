import { Typography, Grid, ListItem, ListItemText, Divider, Button, Link} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Item({item, deleteTask, checkTask}) {
    if (item.task) {
        return (
            <>
                <ListItem> 
                    <Grid container direction='column' justifyContent='center' 
                    alignItems='center'>
                        <Grid item>
                            <Typography sx={{wordBreak: 'break-all'}} variant='h5' element='p'>
                                {item.checked && <CheckIcon />}
                                {item.taskName}
                                </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{wordBreak: 'break-all'}} variant='p'>{item.description}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='p'>{item.date}</Typography>
                        </Grid>

                        <Grid container justifyContent='center' alignItems='center'>
                            <Grid sx={{m: 1}} item>
                                {!item.checked && (
                                    <Button variant='outlined' onClick={()=> checkTask(item, item.id)}><CheckIcon />Check</Button>
                                )}
                                {item.checked && (
                                    <Button variant='outlined' onClick={()=> checkTask(item, item.id)}><CloseIcon />Uncheck</Button>
                                )}
                            </Grid>
                            <Grid item>
                                <Button variant='outlined' onClick={()=> deleteTask(item, item.id)}><DeleteIcon />Delete</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </ListItem>
                <Divider />
            </>
        )
    }
    else {
        return (
                <Link href={`/list/${item.id}`} color='inherit' underline='none'>
                    <ListItem button>
                        <ListItemText primary={item.taskName} secondary={'Click me to see more...'}/>
                    </ListItem>
                    <Divider />
                </Link>
        )
    }
}
