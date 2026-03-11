import Head from '@docusaurus/Head'
import { Redirect } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { clsx } from 'clsx'
import React from 'react'

import styles from './event-registration.module.css'

const EVENTS = [
  {
    id: 'duckyclaw',
    icon: 'fas fa-plug',
    title: 'DuckyClaw 开发者活动',
    status: 'active',
    description: '结合DuckyClaw，自定义更多硬件技能。期待大家能做出的更多功能。',
    cardClass: styles.eventCardWithBg,
    links: [
      { href: 'https://tuyaopen.ai/zh/duckyclaw#architecture', label: '查看详情' },
      { href: 'https://ourojj8n.jsjform.com/f/YoSrJr', label: '立即报名', primary: true },
    ],
  },
  {
    id: 'desktop',
    icon: 'fas fa-desktop',
    title: '开发者桌面搭子比赛',
    status: 'active',
    description: '参与「智造未来桌面搭子」黑客松大赛，定义下一代桌面智能终端的形态与标准',
    links: [
      { href: 'https://promotion.tuya.com/develop/816e1bcece49498ba82c#cms-id-d76264c2625afde', label: '查看详情' },
      { href: 'https://ourojj8n.jsjform.com/f/IuwGut', label: '立即报名', primary: true },
    ],
  },
  {
    id: 'tutorial',
    icon: 'fas fa-code',
    title: '开发者投稿教程贡献',
    status: 'active',
    description: '分享你的技术知识，为开发者社区贡献优质教程',
    links: [
      {
        href: 'https://images.tuyacn.com/rms-static/5aed7760-1d2a-11f1-bc69-dd9d99b0210c-1773220317654.pdf?tyName=2026%E5%BC%80%E5%8F%91%E8%80%85%E8%B4%A1%E7%8C%AE%EF%BC%9ADemo%20%E6%95%99%E7%A8%8B%E6%8A%95%E7%A8%BF%E6%B4%BB%E5%8A%A8.pdf',
        label: '查看详情',
      },
    ],
  },
  {
    id: 'eink',
    icon: 'fas fa-tablet-alt',
    title: '开发者墨水屏比赛',
    status: 'ended',
    description: '参与墨水屏应用开发比赛，展示创新技术',
    links: [
      {
        href: 'https://doc.weixin.qq.com/doc/w3_AeQA2gaJAKQCNdRaEdV0qReuiYQPt?scode=AGQAugfWAAkC1xAuOMAeQA2gaJAKQ',
        label: '查看详情',
      },
    ],
  },
]

const FEATURED_WORKS = [
  {
    id: 'zodiac',
    image:
      'https://images.tuyacn.com/rms-static/cd439f10-1d0c-11f1-95db-cfd3b8132c07-1773207624577.png?tyName=%E6%88%AA%E5%B1%8F2026-03-11%2013.38.47.png',
    imageAlt: '基于涂鸦T5的智能生肖墨水屏',
    title: '基于涂鸦T5的智能生肖墨水屏',
    developer: '开发者：乔楚',
    description:
      '基于涂鸦T5AI硬件，创新性地结合4英⼨E6全彩墨⽔屏、AI图⽚⽣成技术和⽹络同步机制，打造了⼀款融合传统⽂化与现代科技的智能展示设备。',
    links: [{ href: 'https://github.com/HonestQiao/e-Paper-Album', label: '开源代码', code: true }],
  },
  {
    id: 'epaper-reader',
    image:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=e-paper%20reader%20device%20with%20T5AI-Board%20text%20on%20screen&image_size=square',
    imageAlt: '基于涂鸦 T5AI-Board 的墨水屏阅读器',
    title: '基于涂鸦 T5AI-Board 的墨水屏阅读器',
    developer: '开发者：贾献华',
    description:
      '产品支持 SD 卡文件浏览、文本/图片阅读、横竖屏切换及网络时间同步，可在通勤、户外或会议等场景中实现类纸感静态内容展示。',
    links: [
      {
        href: 'https://mp.weixin.qq.com/s/gYr4v2M-IWmP05P7OQH0tw?mpshare=1&scene=1&srcid=0211OnlTf2MrYGk7lPBPuJcI&sharer_shareinfo=48d1e0aa58f476e0ee5ca59dd7031c52&sharer_shareinfo_first=d2b6d45d7ea466fe4d57441576254e8d&version=4.1.33.70494&platform=mac#rd',
        label: '查看详情',
      },
      {
        href: 'https://github.com/jiaxianhua/Tuya_T5_ePaper_Reader/blob/main/docs/WIKI.md',
        label: '开源代码',
        code: true,
      },
    ],
  },
  {
    id: 'lvgl-games',
    image:
      'https://images.tuyacn.com/rms-static/137fb440-1d0e-11f1-bc69-dd9d99b0210c-1773208171908.png?tyName=%E6%B8%B8%E6%88%8F%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_f8c773df-3b23-479b-95a3-9538556e5fa4.png',
    imageAlt: '基于涂鸦T5AI的开发板移植游戏',
    title: '基于涂鸦T5AI的开发板移植游戏',
    developer: '开发者：大树',
    description:
      '基于涂鸦 T5AI-Board 开发板,成功移植了五款经典游戏:植物大战僵尸、2048、羊了个羊、消消乐和华容道。通过 TuyaOpen 开发环境和 LVGL 图形库,实现了触摸交互和流畅的游戏体验。',
    links: [{ href: 'https://github.com/HangYongmao/lvgl_games', label: '开源代码', code: true }],
  },
]

function getStatusClass(status) {
  switch (status) {
    case 'active':
      return styles.statusActive
    case 'ended':
      return styles.statusEnded
    case 'upcoming':
      return styles.statusUpcoming
    default:
      return styles.statusActive
  }
}

function getStatusLabel(status) {
  switch (status) {
    case 'active':
      return '进行中'
    case 'ended':
      return '已截止'
    case 'upcoming':
      return '即将开始'
    default:
      return '进行中'
  }
}

export default function EventRegistration() {
  const { i18n } = useDocusaurusContext()
  if (i18n.currentLocale !== 'zh') {
    return <Redirect to="/zh/event-registration" />
  }

  return (
    <Layout title="活动报名" description="参与开发者社区活动，展示你的技术实力">
      <Head>
        <title>活动报名 | 开发者活动</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <main className={styles.root}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.headerTitle}>涂鸦开发者活动</h1>
            <p className={styles.headerSubtitle}>参与开发者社区活动，展示你的技术实力</p>
          </header>

          <div className={styles.eventCards}>
            {EVENTS.map((event) => (
              <div key={event.id} className={clsx(styles.eventCard, event.cardClass)}>
                <i className={`${event.icon} ${styles.eventCardIcon}`} aria-hidden />
                <h3 className={styles.eventCardTitle}>{event.title}</h3>
                <span className={clsx(styles.eventStatus, getStatusClass(event.status))}>
                  {getStatusLabel(event.status)}
                </span>
                <p className={styles.eventCardDesc}>{event.description}</p>
                <div className={styles.eventCardActions}>
                  {event.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={clsx(styles.eventLink, link.primary && styles.eventLinkPrimary)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <section className={styles.featuredWorks}>
            <h2 className={styles.worksSectionTitle}>涂鸦开发者优秀作品展示</h2>
            <div className={styles.worksGrid}>
              {FEATURED_WORKS.map((work) => (
                <div key={work.id} className={styles.workCard}>
                  <div className={styles.workImage}>
                    <img src={work.image} alt={work.imageAlt} />
                  </div>
                  <div className={styles.workContent}>
                    <h3 className={styles.workContentTitle}>{work.title}</h3>
                    <p className={styles.developer}>{work.developer}</p>
                    <p className={styles.workDescription}>{work.description}</p>
                    <div className={styles.workLinks}>
                      {work.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className={clsx(styles.workLink, link.code && styles.workLinkCode)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className={styles.footer}>
            <p>&copy; 2026 涂鸦开发者活动 版权所有</p>
          </footer>
        </div>
      </main>
    </Layout>
  )
}
