import DiscourseComments from '@site/src/components/DiscourseComments'
import DiscourseTopicsList from '@site/src/components/DiscourseTopicsList'
import MDXComponents from '@theme-original/MDXComponents'
import React from 'react'

import BackToProjects from './BackToProjects'

export default {
  ...MDXComponents,
  BackToProjects,
  DiscourseTopicsList,
  DiscourseComments,
  Details: (props) => <details {...props} />,
  Summary: (props) => <summary {...props} />,
}
