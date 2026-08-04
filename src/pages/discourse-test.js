import DiscourseTopicsList from '@site/src/components/DiscourseTopicsList'
import Layout from '@theme/Layout'
import React from 'react'

export default function DiscourseTestPage() {
  return (
    <Layout title="Discourse Topics" description="Discourse topics embedded via d-topics-list">
      <div style={{ width: '100%', minHeight: '100vh', padding: '1rem' }}>
        <DiscourseTopicsList perPage={20} />
      </div>
    </Layout>
  )
}
