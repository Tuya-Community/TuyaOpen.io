import MDXComponents from '@theme-original/MDXComponents'
import React from 'react'

import BackToProjects from './BackToProjects'

export default {
  ...MDXComponents,
  BackToProjects,
  Details: (props) => <details {...props} />,
  Summary: (props) => <summary {...props} />,
}
