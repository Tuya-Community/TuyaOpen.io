import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import React from 'react'

import styles from './BackToProjects.module.css'

export default function BackToProjects() {
  const { i18n } = useDocusaurusContext()
  const currentLocale = i18n.currentLocale

  return (
    <div className={styles.backToProjects}>
      <Link to="/projects" className={styles.backButton}>
        ← {currentLocale === 'zh' ? '返回项目列表' : 'Back to Projects'}
      </Link>
    </div>
  )
}
