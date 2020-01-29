import React from 'react'
import MarkdownDocs from 'components/MarkDowns/MarkdownDocs'

const req = require.context('containers/views/radioform', false, /\.(md|js|tsx)$/)
const reqSource = require.context(
  '!raw-loader!containers/views/radioform',
  false,
  /\.(js|tsx)$/,
)
const reqPrefix = 'containers/views/radioform'

function Page() {
  return <MarkdownDocs
    disableAd req={req} reqPrefix={reqPrefix}
    reqSource={reqSource} />
}

export default Page