import React from 'react'
import MarkdownDocs from 'components/MarkDowns/MarkdownDocs'

const req = require.context('containers/views/main', false, /\.(md|js|tsx)$/)
const reqSource = require.context(
  '!raw-loader!containers/views/main',
  false,
  /\.(js|tsx)$/,
)
const reqPrefix = 'containers/views/main'

export default () => (
  <MarkdownDocs
    disableAd
    req={req}
    reqPrefix={reqPrefix}
    reqSource={reqSource} />
)
