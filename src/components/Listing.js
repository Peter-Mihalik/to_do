import { List, ListItem, ListItemText, Divider} from '@mui/material'

import Item from './Item'

export default function Listing({listData, deleteTask, checkTask}) {

  let sorted = listData.sort((a, b) => a.taskName.localeCompare(b.taskName))

  return (
    <List>
        {sorted.map((item, key) => {
            return <Item key={key} item={item} deleteTask={deleteTask} checkTask={checkTask}/>
        })}
    </List>
  )
}
