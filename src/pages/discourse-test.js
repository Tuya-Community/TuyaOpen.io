import DiscourseComments from '@site/src/components/DiscourseComments'
import Layout from '@theme/Layout'
import React from 'react'

export default function DiscourseTestPage() {
  return (
    <Layout title="Discourse Embed Test" description="Test page for Discourse embedding">
      <div style={{ width: '100%', minHeight: '100vh' }}>
        <DiscourseComments embedHeight="calc(100vh - 60px)" />
      </div>
    </Layout>
  )
}
