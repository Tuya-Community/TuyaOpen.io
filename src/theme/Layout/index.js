import AnnouncementBar from '@site/src/components/AnnouncementBar'
import Layout from '@theme-original/Layout'
import React from 'react'

export default function LayoutWrapper(props) {
  return (
    <>
      <AnnouncementBar />
      <Layout {...props} />
    </>
  )
}
