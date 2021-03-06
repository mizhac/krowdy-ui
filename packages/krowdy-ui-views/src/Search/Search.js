import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@krowdy-ui/styles'
import { InputBase, InputAdornment } from '@krowdy-ui/core'
import {
  Search as SearchIcon
} from '@material-ui/icons'
import clsx from 'clsx'

export const styles = theme => ({
  icon: {
    color      : theme.palette.grey[600],
    fontSize   : 18,
    marginRight: theme.spacing(1)
  },
  inputBase: {
    flex      : 1,
    fontSize  : 14,
    fontStyle : 'normal',
    fontWeight: 'normal',
    lineHeight: 16,
    marginLeft: theme.spacing(1.375)
  },
  paperBottomPrimary: {
    '&:active': {
      borderBottom: `1px solid ${theme.palette.grey[500]}`
    },
    '&:focus': {
      borderBottom: `1px solid ${theme.palette.primary[600]}`
    },
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.primary[400]}`
    },
    alignItems  : 'center',
    background  : theme.palette.primary['contrastText'],
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    display     : 'flex',
    minHeight   : 40,
    width       : '100%'
  },
  paperPrimary: {
    '&:active': {
      border: `1px solid ${theme.palette.grey[500]}`
    },
    '&:focus': {
      border: `1px solid ${theme.palette.primary[600]}`
    },
    '&:hover': {
      border: `1px solid ${theme.palette.primary[400]}`
    },
    alignItems  : 'center',
    background  : theme.palette.primary['contrastText'],
    border      : `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 4,
    boxShadow   : 'none',
    boxSizing   : 'border-box',
    display     : 'flex',
    minHeight   : 40,
    width       : '100%'
  }
})

const Search = props => {
  const {
    classes,
    className,
    type = '',
    ...restProps
  } = props

  return (
    <div
      className={clsx(type === 'border-bottom' ? classes.paperBottomPrimary : classes.paperPrimary, className)}>
      <InputBase
        className={classes.inputBase}
        endAdornment={
          <InputAdornment className={classes.icon} >
            <SearchIcon />
          </InputAdornment>}
        inputProps={{
          'aria-label': 'search'
        }}
        {...restProps} />
    </div >
  )
}

Search.propTypes = {
  classes   : PropTypes.object,
  searchIcon: PropTypes.node,
  type      : PropTypes.string
}

Search.muiName = 'Search'

export default withStyles(styles, { name: 'KrowdySearch' })(Search)
