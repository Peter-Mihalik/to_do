import { AppBar, Typography, Link} from "@mui/material"

export default function Header() {
  return (
    <AppBar>
      <Link href='/' color='inherit' underline='none'>
        <Typography textAlign="center" variant="h2" component='h1'>doLists</Typography>
      </Link>
    </AppBar>
  )
}
