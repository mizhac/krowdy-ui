import React from 'react'
import { Button } from '@krowdy-ui/core'
import clsx from 'clsx'
import { makeStyles } from '@krowdy-ui/styles'
import { Inputs, RadioForm } from '@krowdy-ui/views'
import { CardExpand } from '@krowdy-ui/views'
import { RemoveCircleOutline, DragIndicator/* , Info, ExpandMore */ } from '@material-ui/icons'

const useStyle = makeStyles({
  align: {
    verticalAlign: 'bottom'
  },
  alignSelf: {
    alignSelf: 'flex-start'
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
    margin  : 0,
    minWidth: 0,
    padding : 0
  },
  container: {
    margin: '30px 20px'
  },
  root: {
    alignItems   : 'center',
    display      : 'flex',
    flexDirection: 'row',
    justify      : 'space-between',
    margin       : '4%'
  },
  skillsContainer: {
    margin: 'auto',
    width : '100%'
  },
  styleLess: {
    '&:last-child': {
      paddingBottom: 0
    },
    margin : 0,
    padding: 0
  },
  text: {
    fontSize: 12
  }
})
const inputsInDrag = [
  {
    _id  : 1,
    label: 'label1',
    value: '1'
  },
  {
    _id  : 2,
    label: 'label2',
    value: 'value2'
  },
  {
    _id  : 3,
    label: 'label3',
    value: 'value3'
  }
]

export default function () {
  const classes = useStyle()

  return (
    <>
      <div className={classes.root} tabIndex='-1' >
        <div key='drag-icon' tabIndex='-1' >
          <DragIndicator color='disabled' />
        </div>

        <CardExpand
          colorCard='gray'
          content={
            <div>
              <span className={classes.cursive}>Selecciona el nivel que necesitas de esta competencia</span>
              <RadioForm
                inputs={inputsInDrag}
                isRow
                valueDefault='value2' />
              <span className={classes.text}>Capacidad para fijar politicas organizacionales y comunicarlas de manera clara y precisa en todos los niveles
              de la orgniazacion asi como tambien comunicar fracasos o acontecimientos negativos sin dobleces ni enganios, decir siempre
              la verdad y lo que siente.
              </span>
            </div>
          }
          title='Card Expand' />
        <div className={clsx(classes.styleLess)}>
          <Button
            className={classes.button}
            key='btn-delete'><RemoveCircleOutline color='error' /></Button>
        </div>
      </div>

      <div className={classes.root} tabIndex='-1' >
        <div className={clsx(classes.iconDragContainer, classes.styleLess)} key='drag-icon' tabIndex='-1' >
          <DragIndicator color='disabled' />
        </div>

        <Inputs
          item={{ _id: '123', instructions: '', questions: '' }}
          order={1}
          showInstructions />

        <div className={clsx(classes.alignSelf, classes.styleLess)}>
          <Button
            className={classes.button}
            key='btn-delete'><RemoveCircleOutline color='error' /></Button>
        </div>
      </div>
    </>
  )
}
