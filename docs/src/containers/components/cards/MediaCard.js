import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@krowdy-ui/core'

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
}, { name: 'MediaCard' })

export default function MediaCard() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image='https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
          title='Contemplative Reptile' />
        <CardContent>
          <Typography component='h2' gutterBottom variant='h5'>
            Lizard
          </Typography>
          <Typography color='textSecondary' component='p' variant='body2'>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color='primary' size='small'>
          Share
        </Button>
        <Button color='primary' size='small'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
