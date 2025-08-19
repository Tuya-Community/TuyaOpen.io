import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React from 'react'

import projectsData from '../data/projects'
import tagsData from '../data/tags'
import styles from './projects.module.css'

export default function Projects() {
  const { siteConfig, i18n } = useDocusaurusContext()
  const currentLocale = i18n.currentLocale
  const projects = projectsData[currentLocale] || projectsData.en
  const tags = tagsData[currentLocale] || tagsData.en

  return (
    <Layout title="Projects" description="Explore our collection of innovative IoT and AI projects built with TuyaOpen">
      <Head>
        <title>Projects - {siteConfig.title}</title>
        <meta
          name="description"
          content="Explore our collection of innovative IoT and AI projects built with TuyaOpen"
        />
      </Head>

      <main className={styles.projectsPage}>
        <div className="tw-container tw-mx-auto tw-px-4 tw-py-12">
          {/* Header Section */}
          <div className="tw-text-center tw-mb-16">
            <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-mb-6 tw-text-gray-900 dark:tw-text-white">
              {currentLocale === 'zh' ? '项目展示' : 'Projects'}
            </h1>
            <p className="tw-text-xl tw-text-gray-600 dark:tw-text-gray-300 tw-max-w-3xl tw-mx-auto">
              {currentLocale === 'zh'
                ? '探索我们使用 TuyaOpen 构建的创新物联网和人工智能项目集合'
                : 'Explore our collection of innovative IoT and AI projects built with TuyaOpen'}
            </p>
          </div>

          {/* Official Projects */}
          <h2 className={styles.sectionTitle}>{currentLocale === 'zh' ? '涂鸦官方项目' : 'Tuya Official Projects'}</h2>
          <div className={styles.sectionDivider}></div>
          <div className="tw-mb-16">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
              {projects
                .filter((project) => project.tags && project.tags.includes('tuya-official'))
                .map((project) => (
                  <div
                    key={project.id}
                    className={styles.projectCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.add(styles.cardHover)
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.remove(styles.cardHover)
                    }}
                  >
                    <Link to={project.markdownFile} className={styles.cardLink}>
                      <div className={styles.cardImageContainer}>
                        <img src={useBaseUrl(project.image)} alt={project.title} className={styles.cardImage} />
                        <div className={styles.cardOverlay}>
                          <div className={styles.overlayContent}>
                            <span className={styles.viewProject}>
                              {currentLocale === 'zh' ? '查看项目' : 'View Project'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{project.title}</h3>
                        <p className={styles.cardDescription}>{project.description}</p>
                        <div className={styles.cardTags}>
                          {project.tags &&
                            project.tags.map((tagKey) => {
                              const tag = tags[tagKey]
                              if (!tag) return null
                              return (
                                <span
                                  key={tagKey}
                                  className={styles.tag}
                                  style={{
                                    backgroundColor: tag.bgColor,
                                    color: tag.color,
                                    borderColor: tag.borderColor,
                                  }}
                                >
                                  {tag.label}
                                </span>
                              )
                            })}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Community Projects */}
          <h2 className={styles.sectionTitle}>{currentLocale === 'zh' ? '社区项目' : 'Community Projects'}</h2>
          <div className={styles.sectionDivider}></div>
          <div className="tw-mb-16">
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
              {projects
                .filter((project) => project.tags && project.tags.includes('community'))
                .map((project) => (
                  <div
                    key={project.id}
                    className={styles.projectCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.add(styles.cardHover)
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.remove(styles.cardHover)
                    }}
                  >
                    <Link to={project.markdownFile} className={styles.cardLink}>
                      <div className={styles.cardImageContainer}>
                        <img src={useBaseUrl(project.image)} alt={project.title} className={styles.cardImage} />
                        <div className={styles.cardOverlay}>
                          <div className={styles.overlayContent}>
                            <span className={styles.viewProject}>
                              {currentLocale === 'zh' ? '查看项目' : 'View Project'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{project.title}</h3>
                        <p className={styles.cardDescription}>{project.description}</p>
                        <div className={styles.cardTags}>
                          {project.tags &&
                            project.tags.map((tagKey) => {
                              const tag = tags[tagKey]
                              if (!tag) return null
                              return (
                                <span
                                  key={tagKey}
                                  className={styles.tag}
                                  style={{
                                    backgroundColor: tag.bgColor,
                                    color: tag.color,
                                    borderColor: tag.borderColor,
                                  }}
                                >
                                  {tag.label}
                                </span>
                              )
                            })}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="tw-text-center tw-mt-16">
            <div className="tw-bg-gradient-to-r tw-from-blue-50 tw-to-indigo-50 dark:tw-from-gray-800 dark:tw-to-gray-700 tw-rounded-2xl tw-p-8">
              <h2 className="tw-text-2xl tw-font-bold tw-mb-4 tw-text-gray-900 dark:tw-text-white">
                {currentLocale === 'zh' ? '开始构建您的项目' : 'Start Building Your Project'}
              </h2>
              <p className="tw-text-gray-600 dark:tw-text-gray-300 tw-mb-6">
                {currentLocale === 'zh'
                  ? '准备好创建您自己的物联网项目了吗？查看我们的文档开始您的开发之旅。'
                  : 'Ready to create your own IoT project? Check out our documentation to start your development journey.'}
              </p>
              <Link to="/docs/about-tuyaopen" className="tw-btn !tw-btn-primary tw-text-lg tw-px-8 tw-py-3">
                {currentLocale === 'zh' ? '查看文档' : 'View Documentation'}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
