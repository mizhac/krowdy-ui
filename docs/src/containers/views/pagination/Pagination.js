import React from 'react'
import { Pagination } from '@krowdy-ui/views'

export default function () {
  return (
    <div style={{
      alignItems    : 'center',
      display       : 'flex',
      flexDirection : 'column',
      height        : 400,
      justifyContent: 'space-evenly',
      margin        : '50px',
      width         : 'auto'
    }}>
      <Pagination />
    </div>
  )
}
