import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { PropTypes } from 'prop-types'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2)
    },
    '&& .MuiInputBase-root': {
      paddingRight: 24
    }
  }
}))

const InputChip = (props) => {
  const {
    onChange,
    values: commingValues = []
  } = props

  const classes = useStyles()
  const [ inputValue, setInputValue ] = useState('')
  const [ values, setValues ] = useState(() => commingValues.map(item => ({ title: item })))

  const existsTitle = title => values.some(value => value.title === title)

  useEffect(() => {
    onChange(values.map(({ title }) => title))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ values ])

  const _handleKeyDown = event => {
    if(event.keyCode === 13 && inputValue) {
      const exists = existsTitle(inputValue)
      if(!exists)
        setValues(prev => [ ...prev, { title: inputValue } ])

      setInputValue('')
    }
  }

  const _handleInputChange = (_, text) => {
    setInputValue(text)
  }

  const _handleChange = (_, values) => {
    setValues(values)
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        ChipProps={{
          color  : 'primary',
          variant: 'outlined'
        }}
        getOptionLabel={option => option.title}
        id='size-small-standard-multi'
        inputValue={inputValue}
        multiple
        onChange={_handleChange}
        onInputChange={_handleInputChange}
        onKeyDown={_handleKeyDown}
        open={false}
        options={[]}
        popupIcon={null}
        renderInput={params => (
          <TextField
            {...params}
            fullWidth
            placeholder='Valor'
            size='small' />
        )}
        size='small'
        value={values} />
    </div>
  )
}

InputChip.propTypes = {
  onChange: PropTypes.func.isRequired,
  values  : PropTypes.arrayOf(PropTypes.string).isRequired
}

export default InputChip
