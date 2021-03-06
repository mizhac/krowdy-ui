import React from 'react'
import clsx from 'clsx'
import copy from 'clipboard-copy'
import { makeStyles } from '@krowdy-ui/styles'
import { Tooltip, IconButton, Collapse, MenuItem, Menu, useMediaQuery } from '@krowdy-ui/core'
import { fade } from '@krowdy-ui/core'
import {
  Code as CodeIcon,
  GitHub as GitHubIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon
} from '@material-ui/icons'
import DemoSandboxed from './DemoSandboxed'
import MarkdownElement from './MarkdownElement'
import getJsxPreview, { CODE_VARIANTS, t, compress, addHiddenInput } from './utils'
import DemoLanguages from './DemoLanguages'
import getDemoConfig from './getDemoConfig'

function getDemoData(codeVariant, demo, githubLocation) {
  if(codeVariant === CODE_VARIANTS.TS && demo.rawTS)
    return {
      Component     : demo.tsx,
      codeVariant   : CODE_VARIANTS.TS,
      githubLocation: githubLocation.replace(/\.js$/, '.tsx'),
      raw           : demo.rawTS,
      sourceLanguage: 'tsx'
    }

  return {
    Component     : demo.js,
    codeVariant   : CODE_VARIANTS.JS,
    githubLocation,
    raw           : demo.raw,
    sourceLanguage: 'jsx'
  }
}

function getDemoName(location) {
  return location.replace(/(.+?)(\w+)\.\w+$$/, '$2')
}

const useStyles = makeStyles(theme => ({
  anchorLink: {
    marginTop: -64, // height of toolbar
    position : 'absolute'
  },
  code: {
    '& pre': {
      lineHeight: 1.5,
      margin    : '0px !important',
      maxHeight : 1000,
      overflow  : 'auto'
    },
    display                     : 'none',
    marginBottom                : theme.spacing(1),
    marginRight                 : 0,
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    padding: 0
  },
  demo: {
    border                      : `1px solid ${fade(theme.palette.action.active, 0.12)}`,
    borderLeftWidth             : 0,
    borderRightWidth            : 0,
    display                     : 'flex',
    justifyContent              : 'center',
    margin                      : 'auto',
    outline                     : 0,
    padding                     : theme.spacing(3),
    position                    : 'relative',
    [theme.breakpoints.up('sm')]: {
      borderLeftWidth : 1,
      borderRadius    : theme.shape.borderRadius,
      borderRightWidth: 1
    }
  },
  demoBg: {
    backgroundColor: theme.palette.background.level2,
    border         : 'none'
  },
  demoHiddenHeader: {
    paddingTop                  : theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(3)
    }
  },
  header: {
    display                     : 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flip   : false,
      height : theme.spacing(6),
      right  : theme.spacing(1),
      top    : 0
    },
    justifyContent: 'space-between'
  },
  headerButtons: {
    margin: '2px 0'
  },
  root: {
    marginBottom                : 40,
    marginLeft                  : -theme.spacing(2),
    marginRight                 : -theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft : 0,
      marginRight: 0,
      padding    : theme.spacing(0, 1)
    }
  },
  tooltip: {
    zIndex: theme.zIndex.appBar - 1
  }
}), { name: 'Demo' })

export default function Demo(props) {
  const { demo, demoOptions, githubLocation } = props

  const [ codeVariant, setCodeVariant ] = React.useState('JS')
  const [ anchorEl, setAnchorEl ] = React.useState(null)
  const [ codeOpen, setCodeOpen ] = React.useState(demoOptions.defaultCodeOpen || false)
  const [ demoHovered, setDemoHovered ] = React.useState(false)
  const [ sourceHintSeen, setSourceHintSeen ] = React.useState(false)

  const classes = useStyles()

  const match = useMediaQuery(theme => theme.breakpoints.up('sm'))
  const demoData = getDemoData(codeVariant, demo, githubLocation)
  const demoName = getDemoName(demoData.githubLocation)
  const jsx = getJsxPreview(demoData.raw || '', demoOptions.defaultCodeOpen)

  const DemoComponent = demoData.Component
  const gaCategory = demoOptions.demo
  const showPreview = !demoOptions.hideHeader && jsx !== demoData.raw && jsx.split(/\n/).length <= 20
  const showSourceHint = demoHovered && !sourceHintSeen

  let showCodeLabel
  if(codeOpen)
    showCodeLabel = showPreview ? t('hideFullSource') : t('hideSource')
  else
    showCodeLabel = showPreview ? t('showFullSource') : t('showSource')

  const _handleDemoHover = event => {
    setDemoHovered(event.type === 'mouseenter')
  }

  const _handleCloseMore = () => {
    setAnchorEl(null)
  }

  const _handleClickCopy = async () => {
    try {
      await copy(demoData.raw)
    } finally {
      _handleCloseMore()
    }
  }

  const _handleClickMore = event => {
    setAnchorEl(event.currentTarget)
  }

  const _handleClickCodeOpen = () => {
    // document.cookie = `sourceHintSeen=true;path=/;max-age=31536000`;
    setCodeOpen(open => !open)
    setSourceHintSeen(true)
  }

  const _handleCodeLanguageClick = (event, clickedCodeVariant) => {
    if(codeVariant !== clickedCodeVariant) setCodeVariant(clickedCodeVariant)
  }

  const _handleClickCodeSandbox = () => {
    const demoConfig = getDemoConfig(demoData)
    const parameters = compress({
      files: {
        'package.json': {
          content: {
            dependencies   : demoConfig.dependencies,
            description    : demoConfig.description,
            devDependencies: {
              'react-scripts': 'latest',
              ...demoConfig.devDependencies
            },
            main   : demoConfig.main,
            scripts: demoConfig.scripts,
            title  : demoConfig.title
          }
        },
        ...Object.keys(demoConfig.files).reduce((files, name) => {
          files[name] = { content: demoConfig.files[name] }

          return files
        }, {})
      }
    })

    const form = document.createElement('form')
    form.method = 'POST'
    form.target = '_blank'
    form.action = 'https://codeSandbox.io/api/v1/sandboxes/define'
    addHiddenInput(form, 'parameters', parameters)
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  const _handleClickStackBlitz = () => {
    const demoConfig = getDemoConfig(demoData)
    const form = document.createElement('form')
    form.method = 'POST'
    form.target = '_blank'
    form.action = 'https://stackblitz.com/run'
    addHiddenInput(form, 'project[template]', 'javascript')
    addHiddenInput(form, 'project[title]', demoConfig.title)
    addHiddenInput(form, 'project[description]', demoConfig.description)
    addHiddenInput(form, 'project[dependencies]', JSON.stringify(demoConfig.dependencies))
    addHiddenInput(form, 'project[devDependencies]', JSON.stringify(demoConfig.devDependencies))
    Object.keys(demoConfig.files).forEach(key => {
      const value = demoConfig.files[key]
      addHiddenInput(form, `project[files][${key}]`, value)
    })
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
    _handleCloseMore()
  }

  const createHandleCodeSourceLink = anchor => async () => {
    try {
      await copy(`${window.location.href.split('#')[0]}#${anchor}`)
    } finally {
      _handleCloseMore()
    }
  }

  return (
    <div className={classes.root}>
      <div
        className={clsx(classes.demo, {
          [classes.demoHiddenHeader]: demoOptions.hideHeader,
          [classes.demoBg]          : demoOptions.bg
        })}
        onMouseEnter={_handleDemoHover}
        onMouseLeave={_handleDemoHover}
        tabIndex={-1}>
        <DemoSandboxed
          // style={demoSandboxedStyle}
          component={DemoComponent}
          iframe={demoOptions.iframe}
          name={demoName} />
      </div>
      <div className={classes.anchorLink} id={`${demoName}.js`} />
      <div className={classes.anchorLink} id={`${demoName}.tsx`} />

      {demoOptions.hideHeader ? null : (
        <div className={classes.header}>
          <DemoLanguages
            codeOpen={codeOpen}
            codeVariant={codeVariant}
            demo={demo}
            gaEventCategory={gaCategory}
            onLanguageClick={_handleCodeLanguageClick} />
          <div className={classes.headerButtons}>
            <Tooltip
              classes={{ popper: classes.tooltip }}
              key={showSourceHint}
              open={showSourceHint && match ? true : undefined}
              placement='top'
              PopperProps={{ disablePortal: true }}
              title={showCodeLabel}>
              <React.Fragment>
                <IconButton
                  aria-label={showCodeLabel}
                  color={demoHovered ? 'primary' : 'default'}
                  data-ga-event-action='expand'
                  data-ga-event-category={gaCategory}
                  onClick={_handleClickCodeOpen}>
                  <CodeIcon fontSize='small' />
                </IconButton>
              </React.Fragment>
            </Tooltip>
            <Tooltip
              classes={{ popper: classes.tooltip }}
              placement='top'
              title={t('viewGitHub')}>
              <React.Fragment>
                <IconButton
                  aria-label={t('viewGitHub')}
                  data-ga-event-action='github'
                  data-ga-event-category={gaCategory}
                  href={demoData.githubLocation}
                  rel='noopener nofollow'
                  target='_blank'>
                  <GitHubIcon fontSize='small' />
                </IconButton>
              </React.Fragment>
            </Tooltip>
            {
              demoOptions.hideEditButton ?
                null :
                (
                  <Tooltip
                    classes={{ popper: classes.tooltip }}
                    placement='top'
                    title={t('codesandbox')}>
                    <React.Fragment>
                      <IconButton
                        aria-label={t('codesandbox')}
                        data-ga-event-action='codesandbox'
                        data-ga-event-category={gaCategory}
                        onClick={_handleClickCodeSandbox}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </React.Fragment>
                  </Tooltip>
                )
            }
            <IconButton
              aria-haspopup='true'
              aria-label={t('seeMore')}
              aria-owns={anchorEl ? 'demo-menu-more' : undefined}
              onClick={_handleClickMore}>
              <MoreVertIcon fontSize='small' />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                horizontal: 'right',
                vertical  : 'top'
              }}
              getContentAnchorEl={null}
              id='demo-menu-more'
              onClose={_handleCloseMore}
              open={Boolean(anchorEl)}
              transformOrigin={{
                horizontal: 'right',
                vertical  : 'top'
              }}>
              <MenuItem
                data-ga-event-action='copy'
                data-ga-event-category={gaCategory}
                onClick={_handleClickCopy}>
                {t('copySource')}
              </MenuItem>
              {demoOptions.hideEditButton ? null : (
                <MenuItem
                  data-ga-event-action='stackblitz'
                  data-ga-event-category={gaCategory}
                  onClick={_handleClickStackBlitz}>
                  {t('stackblitz')}
                </MenuItem>
              )}
              <MenuItem
                data-ga-event-action='copy-js-source-link'
                data-ga-event-category={gaCategory}
                onClick={createHandleCodeSourceLink(`${demoName}.js`)}>
                {t('copySourceLinkJS')}
              </MenuItem>
              <MenuItem
                data-ga-event-action='copy-ts-source-link'
                data-ga-event-category={gaCategory}
                onClick={createHandleCodeSourceLink(`${demoName}.tsx`)}>
                {t('copySourceLinkTS')}
              </MenuItem>
            </Menu>
          </div>
        </div>
      )}

      <Collapse
        in={codeOpen || showPreview}
        unmountOnExit>
        <MarkdownElement
          className={classes.code}
          text={
            `\`\`\`${demoData.sourceLanguage}\n${codeOpen ? demoData.raw : jsx}\n\`\`\``
          } />
      </Collapse>
    </div>
  )
}
