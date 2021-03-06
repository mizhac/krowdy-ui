import React from 'react'
import { makeStyles } from '@krowdy-ui/styles'
import { Paper, Grid } from '@krowdy-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    color    : theme.palette.text.secondary,
    padding  : theme.spacing(1),
    textAlign: 'center'
  },
  root: {
    flexGrow: 1
  }
}))

export default function NestedGrid() {
  const classes = useStyles()

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid
          container item spacing={3}
          xs={12}>
          <FormRow />
        </Grid>
        <Grid
          container item spacing={3}
          xs={12}>
          <FormRow />
        </Grid>
        <Grid
          container item spacing={3}
          xs={12}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  )
}
