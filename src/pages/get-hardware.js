import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React from 'react'

import styles from './get-hardware.module.css'

export default function Hardware() {
  const { siteConfig, i18n } = useDocusaurusContext()

  // Hardware data based on locale
  const hardwareData =
    i18n.currentLocale === 'zh'
      ? [
          {
            name: 'T5AI-Board',
            description: 'Tuya T5AI 开发板，专为 AI 应用设计，支持多模态 AI 功能',
            image: 'https://images.tuyacn.com/fe-static/docs/img/c230edfa-ff75-400a-80c2-298cadfe5202.jpg',
            features: [
              'TuyaOpen 原生支持',
              '搭载 Tuya T5 模组',
              '支持多模态 AI (ASR/TTS/STT/LLM)',
              '音频/视频 能力开发',
              '可选 3.5" LCD屏幕',
              '丰富硬件接口-全引脚引出',
            ],
            cnLinks: [
              {
                name: '淘宝官方店',
                url: 'https://item.taobao.com/item.htm?id=941011375911&skuId=5841899505907&spm=a1z10.5-c-s.w4002-24402091062.14.27525cb0xGDZuY',
                type: 'taobao',
              },
            ],
            worldwideLinks: [
              {
                name: 'AliExpress',
                url: 'https://www.aliexpress.com/item/1005008614513677.html?_source=41a17b46c3deebf2d22cde3e2540fe45&gatewayAdapt=glo2fra',
                type: 'aliexpress',
              },
              {
                name: 'Amazon - Coming Soon...',
                url: '#',
                type: 'amazon',
                disabled: true,
              },
            ],
          },
          {
            name: 'T5AI-Core',
            description: 'Tuya T5AI 核心语音开发套件，小尺寸开发板，适合插板/面包板开发',
            image: 'https://images.tuyacn.com/fe-static/docs/img/02037ea4-3282-4c8c-b2ec-c9c1894e8064.png',
            features: [
              'TuyaOpen 原生支持',
              '搭载 Tuya T5 模组',
              '支持多模态 AI (ASR/TTS/STT/LLM)',
              '音频语音能力开发',
              '44P 排针',
              '锂电池管理（*电池另外购买）',
            ],
            cnLinks: [
              {
                name: '淘宝官方店',
                url: 'https://item.taobao.com/item.htm?id=978338733205&skuId=6099573727303&spm=a1z10.5-c-s.w4002-24402091062.12.27525cb0xGDZuY',
                type: 'taobao',
              },
            ],
            worldwideLinks: [
              {
                name: 'AliExpress - Coming Soon...',
                url: '#',
                type: 'aliexpress',
                disabled: true,
              },
              {
                name: 'Amazon - Coming Soon...',
                url: '#',
                type: 'amazon',
                disabled: true,
              },
            ],
          },
          {
            name: 'T5-E1/T5-E1-IPEX',
            description: 'Tuya T5-E1 核心模块，支持 Wi-Fi 6 + 蓝牙 5.4，适合嵌入式开发',
            image: 'https://images.tuyacn.com/fe-static/docs/img/414f6718-35fb-4620-a667-ade6c3dd1b64.jpg',
            features: [
              'TuyaOpen 原生支持',
              '搭载 Tuya T5-E1 模组',
              'Wi-Fi 6 + 蓝牙 5.4',
              '高性能 ARM Cortex-M33F 处理器',
              '支持多模态 AI 开发',
            ],
            cnLinks: [
              {
                name: '淘宝官方店',
                url: 'https://item.taobao.com/item.htm?id=955761378079&skuId=6046643070209&spm=a1z10.5-c-s.w4002-24402091062.10.27525cb0xGDZuY',
                type: 'taobao',
              },
            ],
            worldwideLinks: [
              {
                name: 'AliExpress - Coming Soon...',
                url: '#',
                type: 'aliexpress',
                disabled: true,
              },
              {
                name: 'Amazon - Coming Soon...',
                url: '#',
                type: 'amazon',
                disabled: true,
              },
            ],
          },
        ]
      : [
          {
            name: 'T5AI-Board',
            description: 'Tuya T5AI development board, suitable for AI applications with multimodal AI support',
            image: 'https://images.tuyacn.com/fe-static/docs/img/c230edfa-ff75-400a-80c2-298cadfe5202.jpg',
            features: [
              'Native TuyaOpen support',
              'Equipped with Tuya T5 module',
              'Supports multimodal AI (ASR/TTS/STT/LLM)',
              'Audio/Video capability development',
              'Optional 3.5" LCD screen',
              'Rich hardware interfaces - full pin breakout',
            ],
            cnLinks: [
              {
                name: 'Taobao',
                url: 'https://item.taobao.com/item.htm?id=941011375911&skuId=5841899505907&spm=a1z10.5-c-s.w4002-24402091062.14.27525cb0xGDZuY',
                type: 'taobao',
              },
            ],
            worldwideLinks: [
              {
                name: 'AliExpress',
                url: 'https://www.aliexpress.com/item/1005008614513677.html?_source=41a17b46c3deebf2d22cde3e2540fe45&gatewayAdapt=glo2fra',
                type: 'aliexpress',
              },
              {
                name: 'Amazon - Coming Soon...',
                url: '#',
                type: 'amazon',
                disabled: true,
              },
            ],
          },
          {
            name: 'T5AI-Core',
            description: 'Tuya T5AI core voice development kit, compact board suitable for breadboarding',
            image: 'https://images.tuyacn.com/fe-static/docs/img/02037ea4-3282-4c8c-b2ec-c9c1894e8064.png',
            features: [
              'Native TuyaOpen support',
              'Equipped with Tuya T5 module',
              'Supports multimodal AI (ASR/TTS/STT/LLM)',
              'Audio and voice capability development',
              '44-pin header',
              'Lithium battery management (*battery sold separately)',
            ],
            cnLinks: [
              {
                name: 'Taobao',
                url: 'https://item.taobao.com/item.htm?id=978338733205&skuId=6099573727303&spm=a1z10.5-c-s.w4002-24402091062.12.27525cb0xGDZuY',
                type: 'taobao',
              },
            ],
            worldwideLinks: [
              {
                name: 'AliExpress - Coming Soon...',
                url: '#',
                type: 'aliexpress',
                disabled: true,
              },
              {
                name: 'Amazon - Coming Soon...',
                url: '#',
                type: 'amazon',
                disabled: true,
              },
            ],
          },
          {
            name: 'T5-E1/T5-E1-IPEX',
            description: 'Tuya T5-E1 core module with Wi-Fi 6 + Bluetooth 5.4, ideal for embedded development',
            image: 'https://images.tuyacn.com/fe-static/docs/img/414f6718-35fb-4620-a667-ade6c3dd1b64.jpg',
            features: [
              'TuyaOpen native support',
              'Powered by Tuya T5-E1 module',
              'Wi-Fi 6 + Bluetooth 5.4',
              'High-performance ARM Cortex-M33F processor',
              'Multimodal AI development support',
            ],
            cnLinks: [
              {
                name: 'Taobao',
                url: 'https://item.taobao.com/item.htm?id=955761378079&skuId=6046643070209&spm=a1z10.5-c-s.w4002-24402091062.10.27525cb0xGDZuY',
                type: 'taobao',
              },
            ],
            worldwideLinks: [
              {
                name: 'AliExpress - Coming Soon...',
                url: '#',
                type: 'aliexpress',
                disabled: true,
              },
              {
                name: 'Amazon - Coming Soon...',
                url: '#',
                type: 'amazon',
                disabled: true,
              },
            ],
          },
        ]

  return (
    <Layout
      title={i18n.currentLocale === 'zh' ? '硬件购买' : 'Get Hardware'}
      description={
        i18n.currentLocale === 'zh'
          ? 'TuyaOpen 硬件购买 - T5AI 开发板和核心开发套件'
          : 'TuyaOpen Hardware - T5AI Board and Core Development Kit'
      }
    >
      <Head>
        <title>{i18n.currentLocale === 'zh' ? 'TuyaOpen 硬件购买' : 'TuyaOpen Hardware'}</title>
        <meta
          name="description"
          content={
            i18n.currentLocale === 'zh'
              ? 'TuyaOpen 硬件购买 - T5AI 开发板和核心开发套件'
              : 'TuyaOpen Hardware - T5AI Board and Core Development Kit'
          }
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{i18n.currentLocale === 'zh' ? '获取硬件' : 'Get Your Hardware'}</h1>
            <p>
              {i18n.currentLocale === 'zh'
                ? '选择适合您项目的 TuyaOpen 硬件开发板，支持多种购买渠道'
                : 'Choose the right TuyaOpen hardware development board for your next AIoT project.'}
            </p>
          </div>

          <div className={styles.hardwareGrid}>
            {hardwareData.map((hardware, index) => (
              <div key={index} className={styles.hardwareCard}>
                <div className={styles.hardwareImage}>
                  <img src={hardware.image} alt={hardware.name} />
                </div>

                <div className={styles.hardwareContent}>
                  <h2 className={styles.hardwareName}>{hardware.name}</h2>
                  <p className={styles.hardwareDescription}>{hardware.description}</p>

                  <div className={styles.features}>
                    <h3>{i18n.currentLocale === 'zh' ? '主要特性' : 'Key Features'}</h3>
                    <ul className={styles.featuresList}>
                      {hardware.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.purchaseLinks}>
                    <div className={styles.regionSection}>
                      <h3 className={styles.regionTitle}>{i18n.currentLocale === 'zh' ? '中国地区' : 'Asia/China'}</h3>
                      <div className={styles.linkButtons}>
                        {hardware.cnLinks.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.purchaseButton} ${styles[link.type]}`}
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className={styles.regionSection}>
                      <h3 className={styles.regionTitle}>{i18n.currentLocale === 'zh' ? '全球地区' : 'Worldwide'}</h3>
                      <div className={styles.linkButtons}>
                        {hardware.worldwideLinks.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target={link.disabled ? undefined : '_blank'}
                            rel={link.disabled ? undefined : 'noopener noreferrer'}
                            className={`${styles.purchaseButton} ${styles[link.type]} ${link.disabled ? styles.disabled : ''}`}
                            style={link.disabled ? { pointerEvents: 'none' } : {}}
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.moreHardwareSection}>
            <h2 className={styles.moreHardwareTitle}>
              {i18n.currentLocale === 'zh'
                ? '"更多"芯片平台和开发板支持'
                : 'More Chip Platforms and Boards are Supported'}
            </h2>
            <p className={styles.moreHardwareDescription}>
              {i18n.currentLocale === 'zh' ? '查看我们的支持列表' : 'See our support list'}
            </p>
            <div className={styles.moreHardwareLink}>
              <Link to="/docs/hardware-specific" className={styles.moreHardwareButton}>
                {i18n.currentLocale === 'zh' ? '查看支持列表' : 'View Support List'}
              </Link>
            </div>
          </div>

          <div className={styles.supportSection}>
            <h2>{i18n.currentLocale === 'zh' ? '技术支持' : 'Technical Support'}</h2>
            <p>
              {i18n.currentLocale === 'zh'
                ? '需要技术支持或有其他问题？我们的团队随时为您提供帮助。'
                : 'Need technical support or have questions? Our team is here to help.'}
            </p>
            <div className={styles.supportLinks}>
              <Link to="/docs/about-tuyaopen" className={styles.supportButton}>
                {i18n.currentLocale === 'zh' ? '查看文档' : 'View Documentation'}
              </Link>
              <a
                href="https://github.com/tuya/TuyaOpen"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.supportButton}
              >
                {i18n.currentLocale === 'zh' ? '获取代码' : 'Get Code'}
              </a>
              <a href="https://discord.com/invite/yPPShSTttG" className={styles.supportButton}>
                {i18n.currentLocale === 'zh' ? '联系支持' : 'Contact Support'}
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
