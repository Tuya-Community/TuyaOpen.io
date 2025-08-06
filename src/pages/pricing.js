import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Translate from '@docusaurus/Translate'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React from 'react'

import styles from './pricing.module.css'

export default function Pricing() {
  const { siteConfig, i18n } = useDocusaurusContext()

  // Pricing data based on locale
  const pricingData =
    i18n.currentLocale === 'zh'
      ? [
          {
            title: '开源开发者',
            price: '免费',
            unit: '',
            features: [
              '适用于创客或个人开发者',
              '面向IoT的开源OS系统',
              '可开发 WIFI/蓝牙/音视频/Camera/摄像头应用',
              '支持芯片平台: Tuya MCUs/ESP32/Raspberry Pi',
              '完整文档',
              '社区支持',
            ],
            buttonText: '见文档',
            buttonLink: '/docs/about-tuyaopen',
            featured: false,
          },
          {
            title: '授权码- IoT连接',
            price: '￥5',
            unit: '/设备',
            features: [
              '所有免费的能力，加上....',
              '将您的设备连接到涂鸦云',
              'IoT连接',
              '自定义IoT产品设备',
              '可自定义App云服务',
            ],
            buttonText: '购买',
            buttonLink: 'https://www.tuyaopen.ai/docs/quick-start/unboxing#obtaining-a-license-key',
            featured: false,
          },
          {
            title: '授权码- IoT连接 + AI',
            price: '￥12',
            unit: '/设备',
            features: [
              '所有免费和IoT连接功能，加上....',
              '多模态AI (ASR/TTS/STT/LLM/AI-Agent/Vision/Text/AI Pipelining)',
              '云端LLM tokens',
              'Tuya模块量产及固件烧录服务',
              'TuyaOpen商业量产就绪',
            ],
            buttonText: '购买',
            buttonLink: 'https://www.tuyaopen.ai/docs/quick-start/unboxing#obtaining-a-license-key',
            featured: true,
          },
          {
            title: '企业定制解决方案',
            price: '联系我们',
            unit: '',
            features: [
              '基于TuyaOS的商业框架',
              '定制产品和解决方案',
              'OEM/ODM服务',
              'OTA服务',
              '受5,800+全球客户信赖',
              '超过2亿台商业设备连接',
            ],
            buttonText: '联系销售',
            buttonLink: 'mailto:service@tuya.com',
            featured: false,
          },
        ]
      : [
          {
            title: 'Open Source Developer',
            price: 'Free',
            unit: '',
            features: [
              'For makers or individual developers',
              'Open-source OS for IoT',
              'Develop Wi-Fi/Bluetooth/Audio/Camera applications',
              'Supported chip platforms: Tuya MCUs / ESP32 / Raspberry Pi',
              'Comprehensive documentation',
              'Community support',
            ],
            buttonText: 'See Docs',
            buttonLink: '/docs/about-tuyaopen',
            featured: false,
          },
          {
            title: 'License Key - IoT Connection',
            price: '$0.7',
            unit: '/device',
            features: [
              'All Free features, plus...',
              'Connect your device to Tuya Cloud',
              'IoT connection',
              'Custom IoT product devices',
              'Customizable App cloud services',
            ],
            buttonText: 'Buy',
            buttonLink: 'https://www.tuyaopen.ai/docs/quick-start/unboxing#obtaining-a-license-key',
            featured: false,
          },
          {
            title: 'License Key - IoT Connection + AI',
            price: '$1.7',
            unit: '/device',
            features: [
              'All Free and IoT Connection features, plus...',
              'Multimodal AI (ASR/TTS/STT/LLM/AI-Agent/Vision/Text/AI Pipelining)',
              'Cloud LLM tokens',
              'Tuya module mass production & firmware flashing service',
              'TuyaOpen commercial mass production ready',
            ],
            buttonText: 'Buy',
            buttonLink: 'https://www.tuyaopen.ai/docs/quick-start/unboxing#obtaining-a-license-key',
            featured: true,
          },
          {
            title: 'Enterprise Custom Solution',
            price: 'Contact Us',
            unit: '',
            features: [
              'Commercial framework based on TuyaOS',
              'Custom products and solutions',
              'OEM/ODM services',
              'OTA services',
              'Trusted by 5,800+ global customers',
              'Over 200 million commercial devices connected',
            ],
            buttonText: 'Contact Sales',
            buttonLink: 'mailto:service@tuya.com',
            featured: false,
          },
        ]

  // FAQ data based on locale
  const faqData =
    i18n.currentLocale === 'zh'
      ? [
          {
            question: '为什么需要授权码？',
            answer: '授权码用于设备身份认证和安全访问。一次性购买后，每个设备都有唯一的授权码用于识别。',
          },
          {
            question: '连接其他云服务是否需要授权码？',
            answer: '不需要。TuyaOpen未来将支持更多IoT或AI云服务，认证机制将根据每个直连提供商的要求进行调整。',
          },
          {
            question: '项目是否按月计费？',
            answer: '不是。所有费用都是按连接设备一次性购买模块云授权码，不是按月订阅。',
          },
          {
            question: '免费计划包括什么？',
            answer: '免费计划提供基本功能和支持多种芯片平台的IoT OS框架，适合评估或小型定制项目。',
          },
          {
            question: '我可以随时升级或降级授权码功能吗？',
            answer: '可以。不同的授权码可以随时烧录到芯片设备中，但每个授权码仅适用于单个设备，不能共享。',
          },
          {
            question: '初创公司或教育机构是否有折扣？',
            answer: '是的。我们为初创公司、教育机构和非营利组织提供专属折扣。请联系我们了解详情。',
          },
          {
            question: '如何联系销售获取企业解决方案？',
            answer:
              '您可以点击上方的"联系销售"按钮或发送邮件至 <a href="mailto:service@tuya.com">service@tuya.com</a> 讨论您的需求并获得定制报价。',
          },
        ]
      : [
          {
            question: 'Why do I need a license key?',
            answer:
              'The License Key is used for device identity authentication and secure access. After a one-time purchase, each device has a unique License for identification.',
          },
          {
            question: 'Do I need a license key to connect to other cloud services?',
            answer:
              "No. TuyaOpen will support more IoT or AI cloud services in the future, and the authentication mechanism will be adapted according to each direct connection provider's requirements.",
          },
          {
            question: 'Is the project billed monthly?',
            answer:
              'No. All fees are for the one-time purchase of a module cloud License Key per connected device, not a monthly subscription.',
          },
          {
            question: 'What does the Free plan include?',
            answer:
              'The Free plan provides basic features and an IoT OS framework supporting multiple chip platforms, ideal for evaluation or small custom projects.',
          },
          {
            question: 'Can I upgrade or downgrade the license key capability at any time?',
            answer:
              'Yes. Different license keys can be flashed to the chip device at any time, but each license key is for a single device only and cannot be shared.',
          },
          {
            question: 'Are there discounts for startups or educational institutions?',
            answer:
              'Yes. We offer exclusive discounts for startups, educational institutions, and non-profits. Please contact us for details.',
          },
          {
            question: 'How do I contact sales for enterprise solutions?',
            answer:
              'You can click the "Contact Sales" button above or email <a href="mailto:service@tuya.com">service@tuya.com</a> to discuss your needs and get a custom quote.',
          },
        ]

  const [openFaq, setOpenFaq] = React.useState(null)

  const toggleFAQ = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <Layout
      title={i18n.currentLocale === 'zh' ? '服务计划' : 'Services'}
      description={
        i18n.currentLocale === 'zh'
          ? 'TuyaOpen 服务计划 - 简单的一次性授权模式，适用于 IoT 开发'
          : 'TuyaOpen Services - Simple, one-time licensing structure for IoT development'
      }
    >
      <Head>
        <title>{i18n.currentLocale === 'zh' ? 'TuyaOpen 服务计划' : 'TuyaOpen Services'}</title>
        <meta
          name="description"
          content={
            i18n.currentLocale === 'zh'
              ? 'TuyaOpen 服务计划 - 简单的一次性授权模式，适用于 IoT 开发'
              : 'TuyaOpen Services - Simple, one-time licensing structure for IoT development'
          }
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>{i18n.currentLocale === 'zh' ? 'TuyaOpen 服务计划' : 'TuyaOpen Services'}</h1>
            <p>
              <strong>
                {i18n.currentLocale === 'zh'
                  ? '只有当您的设备需要接入"涂鸦云"时，才需要购买 TuyaOpen 授权码。对于不连接涂鸦云的通用蓝牙、Wi-Fi 项目、简单应用或第三方 API 调用等场景，无需购买云服务授权码，可免费使用 TuyaOpen。'
                  : 'Buy a TuyaOpen license only if your device connects to Tuya Cloud. For other projects (Bluetooth, Wi-Fi, simple apps, or third-party APIs), no license is needed—use for free.'}
              </strong>
            </p>
            <p>
              {i18n.currentLocale === 'zh'
                ? '我们致力于提供极低的硬件服务的成本，提供简单的一次性授权模式，确保所有用户都能获得可扩展且可靠的服务。'
                : 'We are committed to providing a simple, one-time licensing structure at minimal cost, ensuring scalability and reliable service for all users.'}
            </p>
          </div>

          <div className={styles.pricingGrid}>
            {pricingData.map((card, index) => (
              <div key={index} className={`${styles.pricingCard} ${card.featured ? styles.featured : ''}`}>
                <div>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardPrice}>
                    {card.price}
                    <span className={styles.unit}>{card.unit}</span>
                  </p>
                  <ul className={styles.cardFeatures}>
                    {card.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <Link to={card.buttonLink} className={styles.cardButton}>
                  {card.buttonText}
                </Link>
              </div>
            ))}
          </div>

          <div className={styles.faqSection}>
            <h2>{i18n.currentLocale === 'zh' ? '常见问题' : 'FAQ'}</h2>
            <div className={styles.faqContainer}>
              {faqData.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <div
                    className={`${styles.faqQuestion} ${openFaq === index ? styles.active : ''}`}
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                  </div>
                  <div className={`${styles.faqAnswer} ${openFaq === index ? styles.show : ''}`}>
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
