import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React from 'react'

import { localePath } from '../utils/localePath'
import styles from './get-hardware.module.css'

const KO_HARDWARE = [
  {
    name: 'T5AI-Board',
    description: 'AI 애플리케이션을 위한 Tuya T5AI 개발보드로 멀티모달 AI 기능을 지원합니다.',
    image: 'https://images.tuyacn.com/fe-static/docs/img/c230edfa-ff75-400a-80c2-298cadfe5202.jpg',
    features: [
      'TuyaOpen 네이티브 지원',
      'Tuya T5 모듈 탑재',
      '멀티모달 AI 지원 (ASR/TTS/STT/LLM)',
      '오디오/비디오 기능 개발',
      '옵션 3.5인치 LCD 화면',
      '풍부한 하드웨어 인터페이스 및 전체 핀 브레이크아웃',
    ],
    cnLinks: [
      {
        name: 'Taobao 공식 스토어',
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
        name: 'Amazon',
        url: 'https://www.amazon.com/T5AI-Board-Voice-AI-Development-Kit/dp/B0FZKBVHP2',
        type: 'amazon',
      },
    ],
  },
  {
    name: 'T5AI-Core',
    description: '작은 크기의 Tuya T5AI 음성 개발 키트로 핀헤더와 브레드보드 개발에 적합합니다.',
    image: 'https://images.tuyacn.com/fe-static/docs/img/02037ea4-3282-4c8c-b2ec-c9c1894e8064.png',
    features: [
      'TuyaOpen 네이티브 지원',
      'Tuya T5 모듈 탑재',
      '멀티모달 AI 지원 (ASR/TTS/STT/LLM)',
      '오디오 및 음성 기능 개발',
      '44핀 헤더',
      '리튬 배터리 관리(배터리 별도 구매)',
    ],
    cnLinks: [
      {
        name: 'Taobao 공식 스토어',
        url: 'https://item.taobao.com/item.htm?id=978338733205&skuId=6099573727303&spm=a1z10.5-c-s.w4002-24402091062.12.27525cb0xGDZuY',
        type: 'taobao',
      },
    ],
    worldwideLinks: [
      { name: 'AliExpress - 출시 예정', url: '#', type: 'aliexpress', disabled: true },
      {
        name: 'Amazon',
        url: 'https://www.amazon.com/T5AI-Core-Development-Bluetooth-Cortex-M33-Prototyping/dp/B0G25MH2NF',
        type: 'amazon',
      },
    ],
  },
  {
    name: 'T5-E1/T5-E1-IPEX',
    description: 'Wi-Fi 6와 Bluetooth 5.4를 지원하는 임베디드 개발용 Tuya T5-E1 핵심 모듈입니다.',
    image: 'https://images.tuyacn.com/fe-static/docs/img/414f6718-35fb-4620-a667-ade6c3dd1b64.jpg',
    features: [
      'TuyaOpen 네이티브 지원',
      'Tuya T5-E1 모듈 탑재',
      'Wi-Fi 6 + Bluetooth 5.4',
      '고성능 ARM Cortex-M33F 프로세서',
      '멀티모달 AI 개발 지원',
    ],
    cnLinks: [
      {
        name: 'Taobao 공식 스토어',
        url: 'https://item.taobao.com/item.htm?id=955761378079&skuId=6046643070209&spm=a1z10.5-c-s.w4002-24402091062.10.27525cb0xGDZuY',
        type: 'taobao',
      },
    ],
    worldwideLinks: [
      { name: 'AliExpress - 출시 예정', url: '#', type: 'aliexpress', disabled: true },
      { name: 'Amazon - 출시 예정', url: '#', type: 'amazon', disabled: true },
    ],
  },
]

export default function Hardware() {
  const { siteConfig, i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale
  const isZh = locale === 'zh'
  const isKo = locale === 'ko'
  const ui = isZh
    ? {
        title: '硬件购买',
        description: 'TuyaOpen 硬件购买 - T5AI 开发板和核心开发套件',
        heading: '获取硬件',
        intro: '选择适合您项目的 TuyaOpen 硬件开发板，支持多种购买渠道',
        features: '主要特性',
        china: '中国地区',
        worldwide: '全球地区',
        more: '"更多"芯片平台和开发板支持',
        moreDesc: '查看我们的支持列表',
        moreCta: '查看支持列表',
        support: '技术支持',
        supportDesc: '需要技术支持或有其他问题？我们的团队随时为您提供帮助。',
        docs: '查看文档',
        code: '获取代码',
        contact: '联系支持',
      }
    : isKo
      ? {
          title: '하드웨어 구매',
          description: 'TuyaOpen 하드웨어 - T5AI 개발보드 및 핵심 개발 키트',
          heading: '하드웨어 선택',
          intro: '프로젝트에 맞는 TuyaOpen 하드웨어 개발보드를 선택하세요. 다양한 구매 채널을 제공합니다.',
          features: '주요 기능',
          china: '아시아/중국',
          worldwide: '전 세계',
          more: '더 많은 칩 플랫폼 및 보드 지원',
          moreDesc: '지원 목록을 확인하세요.',
          moreCta: '지원 목록 보기',
          support: '기술 지원',
          supportDesc: '기술 지원이 필요하거나 질문이 있나요? TuyaOpen 팀이 도와드립니다.',
          docs: '문서 보기',
          code: '코드 받기',
          contact: '지원 문의',
        }
      : {
          title: 'Get Hardware',
          description: 'TuyaOpen Hardware - T5AI Board and Core Development Kit',
          heading: 'Get Your Hardware',
          intro: 'Choose the right TuyaOpen hardware development board for your next AIoT project.',
          features: 'Key Features',
          china: 'Asia/China',
          worldwide: 'Worldwide',
          more: 'More Chip Platforms and Boards are Supported',
          moreDesc: 'See our support list',
          moreCta: 'View Support List',
          support: 'Technical Support',
          supportDesc: 'Need technical support or have questions? Our team is here to help.',
          docs: 'View Documentation',
          code: 'Get Code',
          contact: 'Contact Support',
        }

  // Hardware data based on locale
  const hardwareData =
    isZh || isKo
      ? isZh
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
                  name: 'Amazon',
                  url: 'https://www.amazon.com/T5AI-Board-Voice-AI-Development-Kit/dp/B0FZKBVHP2',
                  type: 'amazon',
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
                  name: 'Amazon',
                  url: 'https://www.amazon.com/T5AI-Core-Development-Bluetooth-Cortex-M33-Prototyping/dp/B0G25MH2NF',
                  type: 'amazon',
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
        : KO_HARDWARE
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
                name: 'Amazon',
                url: 'https://www.amazon.com/T5AI-Board-Voice-AI-Development-Kit/dp/B0FZKBVHP2',
                type: 'amazon',
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
                name: 'Amazon',
                url: 'https://www.amazon.com/T5AI-Core-Development-Bluetooth-Cortex-M33-Prototyping/dp/B0G25MH2NF',
                type: 'amazon',
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
    <Layout title={ui.title} description={ui.description}>
      <Head>
        <title>{isZh ? 'TuyaOpen 硬件购买' : isKo ? 'TuyaOpen 하드웨어' : 'TuyaOpen Hardware'}</title>
        <meta name="description" content={ui.description} />
        <meta
          name="keywords"
          content="ai hardware development board, edge ai development kit, buy ai development board, t5ai board, tuyaopen hardware"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{ui.heading}</h1>
            <p>{ui.intro}</p>
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
                    <h3>{ui.features}</h3>
                    <ul className={styles.featuresList}>
                      {hardware.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.purchaseLinks}>
                    <div className={styles.regionSection}>
                      <h3 className={styles.regionTitle}>{ui.china}</h3>
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
                      <h3 className={styles.regionTitle}>{ui.worldwide}</h3>
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
            <h2 className={styles.moreHardwareTitle}>{ui.more}</h2>
            <p className={styles.moreHardwareDescription}>{ui.moreDesc}</p>
            <div className={styles.moreHardwareLink}>
              <Link to={localePath(locale, '/docs/hardware')} className={styles.moreHardwareButton}>
                {ui.moreCta}
              </Link>
            </div>
          </div>

          <div className={styles.supportSection}>
            <h2>{ui.support}</h2>
            <p>{ui.supportDesc}</p>
            <div className={styles.supportLinks}>
              <Link to={localePath(locale, '/docs/about-tuyaopen')} className={styles.supportButton}>
                {ui.docs}
              </Link>
              <a
                href="https://github.com/tuya/TuyaOpen"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.supportButton}
              >
                {ui.code}
              </a>
              <a href="https://discord.com/invite/yPPShSTttG" className={styles.supportButton}>
                {ui.contact}
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
