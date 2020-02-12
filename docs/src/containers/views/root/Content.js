import React from 'react'
import { Root } from '@krowdy-ui/views'
import {
  Home as HomeIcon,
  AttachMoney as AttachMoneyIcon,
  Backup as BackupIcon,
  CalendarToday as CalendarTodayIcon,
  Folder as FolderIcon,
  Dashboard as DashboardIcon,
  Add as AddIcon
} from '@material-ui/icons'
import { Paper } from '@krowdy-ui/core'

export default function () {
  return (
    <Root
      menus={[
        {
          icon : <HomeIcon />,
          title: 'Home',
          url  : '/'
        },
        {
          icon : <BackupIcon />,
          title: 'Ir a Google',
          url  : 'http://google.com'
        },
        {
          icon : <DashboardIcon />,
          title: 'Dashboard',
          url  : '/views/dashboard'
        },
        {
          icon  : <AttachMoneyIcon />,
          target: '_self',
          title : 'Main',
          url   : '/views/main'
        },
        {
          icon : <CalendarTodayIcon />,
          title: 'Calendar',
          url  : '/'
        },
        {
          icon : <BackupIcon />,
          title: 'Ir a Google',
          url  : 'http://google.com'
        },
        {
          icon : <DashboardIcon />,
          title: 'Dashboard',
          url  : '/views/dashboard'
        },
        {
          icon  : <AttachMoneyIcon />,
          target: '_self',
          title : 'Groups',
          url   : 'https://google.com'
        },
        {
          icon : <CalendarTodayIcon />,
          title: 'Calendar',
          url  : '/'
        },
        {
          icon : <BackupIcon />,
          title: 'Ir a Google',
          url  : 'http://google.com'
        },
        {
          icon : <DashboardIcon />,
          title: 'Dashboard',
          url  : '/views/dashboard'
        },
        {
          icon  : <AttachMoneyIcon />,
          target: '_self',
          title : 'Groups',
          url   : 'https://google.com'
        },
        {
          icon : <CalendarTodayIcon />,
          title: 'Calendar',
          url  : '/'
        },
        {
          icon   : <FolderIcon />,
          options: [
            {
              title: 'Panal Aguijón',
              url  : '/'
            },
            {
              title: 'Panal Polen',
              url  : '/'
            }
          ],
          title: 'Accesos Directos'
        }
      ]}
      optionBottom={{
        icon   : <AddIcon />,
        onClick: () => {
          console.log('fixed Button')
        },
        title: 'Crear Empresa'
      }}>
      <Paper style={{ flex: 1 }} variant='outlined'>
        Mi App
      </Paper>
    </Root>
  )
}
