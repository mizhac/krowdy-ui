import React from 'react'
import { makeStyles } from '@krowdy-ui/styles'
import { Paper, Grid, Avatar, Typography } from '@krowdy-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    margin  : `${theme.spacing(1)}px auto`,
    maxWidth: 400,
    padding : theme.spacing(2)
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding : theme.spacing(0, 3)
  }
}))

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `

export default function AutoGridNoWrap() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} wrap='nowrap'>
          <Grid item>
            <Avatar>AL</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container spacing={2} wrap='nowrap'>
          <Grid item>
            <Avatar>AL</Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container spacing={2} wrap='nowrap'>
          <Grid item>
            <Avatar>AL</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
