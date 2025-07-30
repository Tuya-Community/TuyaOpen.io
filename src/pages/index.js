import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { clsx } from 'clsx'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect } from 'react'

import IconGithub from '../../static/img/icons/github.svg'
import IconHelp from '../../static/img/icons/help.svg'
import IconLibrary from '../../static/img/icons/library.svg'
import IconOctocat from '../../static/img/icons/octocat.svg'
import Card from '../components/Card'
import ChaosdFeatures from '../components/ChaosdFeatures'
import CodeGrid from '../components/CodeGrid'
import Features from '../components/Features'
import Mesh from '../components/Mesh'
import PickVersion from '../components/PickVersion'
import whoIsUsing from '../data/whoIsUsing'
import styles from './index.module.css'

gsap.registerPlugin(ScrollTrigger)

const description =
  'TuyaOpen provides a free, open-source IoT operating system featuring industry leading connectivity, security, device and peripheral management, and A.I. Multimodal capabilities. Develop your next A.I. product using our comprehensive development tools, extensive code examples, and wide variety of microcontroller development boards available.'

function Home() {
  const { siteConfig, i18n } = useDocusaurusContext()

  useEffect(() => {
    document.querySelector('.navbar__inner').classList.add('tw-container', 'tw-mx-auto')

    gsap.from('.scroll-to-display', {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.25,
      scrollTrigger: {
        trigger: '.scroll-to-display',
        toggleActions: 'restart none none none',
      },
    })

    gsap.from('.scroll-to-display-x', {
      duration: 1,
      opacity: 0,
      x: 0,
      y: 100,
      stagger: 0.25,
      scrollTrigger: {
        trigger: '.scroll-to-display-x',
        toggleActions: 'restart none none none',
      },
    })
  }, [])

  return (
    <Layout description={translate({ message: description, id: 'home.desc' })}>
      <Head>
        <title>TuyaOpen: {siteConfig.tagline}</title>
      </Head>
      <main>
        <div className="hero tw-relative tw-h-[768px] tw-pt-0 tw-overflow-hidden">
          <BrowserOnly>{() => <Mesh />}</BrowserOnly>
          <div className="tw-container tw-mx-auto tw-z-10">
            <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-justify-between lg:tw-items-center">
              <div className="tw-flex-[.8] 2xl:tw-flex-[.6] tw-p-6 lg:tw-p-3">
                <h1
                  className={clsx(
                    'tw-inline-block tw-text-5xl xl:tw-text-6xl tw-text-left tw-rounded-2xl tw-backdrop-blur-sm lg:tw-backdrop-blur',
                    styles.heroTitle,
                  )}
                >
                  {/* Since the following texts are not simple strings, we can't use <Translate /> here. */}
                  {i18n.currentLocale === 'en' && (
                    <>
                      <span>Build Next</span>
                      <br />
                      <span>AI+IoT Hardware with</span>
                      <br />
                      <span>TuyaOpen</span>
                    </>
                  )}
                  {i18n.currentLocale === 'zh' && (
                    <>
                      <span>用 TuyaOpen</span>
                      <br />
                      <span className="tw-text-3xl">创造你下个 AI+IoT 硬件</span>
                    </>
                  )}
                </h1>
                <p className="lg:tw-text-lg tw-font-medium tw-rounded-2xl tw-backdrop-blur-sm lg:tw-backdrop-blur">
                  <Translate id="home.desc">{description}</Translate>
                </p>
                <div className="tw-flex tw-gap-3">
                  <Link to="/docs/about-tuyaopen" className="tw-btn !tw-btn-primary hover:-tw-translate-y-[3px]">
                    <Translate id="home.getstarted">Get Started →</Translate>
                  </Link>
                  <Link
                    to="https://github.com/tuya/TuyaOpen"
                    className="tw-btn !tw-btn-neutral tw-gap-2 dark:tw-glass hover:-tw-translate-y-[3px]"
                  >
                    <IconOctocat className="tw-w-4 tw-h-4 tw-fill-white" />
                    GitHub
                  </Link>
                </div>
              </div>

              {/* <div className="lg:max-xl:tw-w-[500px] tw-p-6 lg:tw-p-3">
                <h2 className="tw-inline-block tw-text-base lg:tw-text-lg tw-font-semibold tw-rounded-2xl tw-backdrop-blur-sm lg:tw-backdrop-blur">
                  <Translate id="home.tryitout">Try it out with the following command 👇</Translate>
                </h2>
                <PickVersion className="!tw-mb-0">
                  curl -sSL https://mirrors.chaos-mesh.org/latest/install.sh | bash
                </PickVersion>
              </div> */}
            </div>
          </div>
        </div>

        <div className="hero">
          <div className="tw-container tw-mx-auto max-lg:tw-px-4">
            <div className="tw-max-w-[800px] tw-mb-12 tw-mx-auto tw-text-center">
              <h2 className="tw-text-4xl xl:tw-text-5xl">
                {/* Since the following texts are not simple strings, we can't use <Translate /> here. */}
                {i18n.currentLocale === 'en' && (
                  <span>
                    Make <span className={styles.heroTitle}>AI+IoT Development</span> simple and straightforward
                  </span>
                )}
                {i18n.currentLocale === 'zh' && (
                  <span>
                    让<span className={styles.heroTitle}>AI+IoT 开发</span>变得简单直接
                  </span>
                )}
              </h2>
              <p className="lg:tw-text-lg tw-font-medium">
                <Translate id="home.features.desc">Endless Possibilities</Translate>
              </p>
            </div>

            <div className="tw-grid tw-gap-8 lg:tw-grid-rows-2 lg:tw-grid-cols-6">
              <Features />
            </div>
          </div>
        </div>

        <div className="hero">
          <div className="tw-container tw-mx-auto max-lg:tw-px-4">
            <div className="tw-max-w-[800px] tw-mx-auto tw-text-center">
              <h2 className="tw-text-4xl xl:tw-text-5xl">
                {/* Since the following texts are not simple strings, we can't use <Translate /> here. */}
                {i18n.currentLocale === 'en' && (
                  <span>
                    <span className={styles.heroTitle}>TuyaOpen SDK</span> modularized Hardware-Software development
                  </span>
                )}
                {i18n.currentLocale === 'zh' && (
                  <span>
                    <span className={styles.heroTitle}>TuyaOpen SDK</span>模块化软硬件开发
                  </span>
                )}
              </h2>
              <p className="lg:tw-text-lg tw-font-medium">
                <Translate id="home.failuretypes.desc">
                  TuyaOpen is open-sourced from industry leading TuyaOS Archtecture. Proven by 1.3 Million developers
                  world-wide. It Provides a well-defined API to develop your C/C++ application that support different
                  MCUs. Abstract the complexity of peferial connection, clould connection, and security. This framework
                  accelerate your development process with simple codeing experience needed. Allows you to build AI+IoT
                  product faster and easier.
                </Translate>
              </p>
            </div>
            <img
              className={clsx(
                'tw-block tw-mx-auto tw-select-none dark:tw-invert-[.85] dark:tw-saturate-0',
                styles.chaosCategory,
              )}
              src="img/home/chaos-category.svg"
              alt="Chaos Category"
            />

            {/* <div className="tw-flex tw-justify-center tw-mt-12">
              <Link
                to="https://github.com/tuya/TuyaOpen/blob/master/README.md"
                className="tw-btn !tw-btn-primary tw-gap-2 hover:-tw-translate-y-[3px]"
              >
                <IconLibrary className="tw-w-4 tw-h-4 tw-fill-primary-content" />
                <Translate id="home.exploremore">Explore More</Translate>
              </Link>
            </div> */}
            <div className="tw-grid tw-gap-8 lg:tw-grid-cols-3 tw-my-12">{/* <CodeGrid /> */}</div>
          </div>
        </div>

        <div className="hero">
          <div className="tw-container tw-mx-auto max-lg:tw-px-4">
            {/* Row 1 */}
            <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center tw-gap-8">
              <div className={clsx('tw-relative tw-flex-1 tw-flex tw-items-center tw-overflow-hidden xl:tw-h-[640px]')}>
                <img className="tw-absolute tw-w-[90%]" src="/img/home/chaosd-bg.svg" />
                <div className="tw-flex tw-justify-center tw-items-center xl:tw-w-[75%] lg:tw-h-[100%]">
                  {/* <ChaosdFeatures /> */}
                  <img
                    className="scroll-to-display tw-w-[60%]"
                    style={{ width: 700 }}
                    src="img/features/Printed circuit board-bro.svg"
                  />
                </div>
              </div>
              <div className="tw-flex-[1.5] tw-z-10">
                <h2 className="tw-text-4xl xl:tw-text-5xl">
                  {/* Due to the below texts are not simple strings, so we can't use <Translate /> here. */}
                  {i18n.currentLocale === 'en' && (
                    <span>
                      Meet <span className={styles.heroTitle}>Tuya T5 MCU</span>: Next Generation AI+IoT MCU
                    </span>
                  )}
                  {i18n.currentLocale === 'zh' && (
                    <span>
                      认识<span className={styles.heroTitle}>Tuya T5 芯片</span>：下一代 AI+IoT MCU 芯片
                    </span>
                  )}
                </h2>
                <p className="lg:tw-text-lg tw-font-medium">
                  <Translate
                    id="home.t5.hardware.desc"
                    values={{
                      link: (
                        <Link className="tw-underline dark:tw-no-underline" to="/docs/simulate-physical-machine-chaos">
                          PhysicalMachineChaos
                        </Link>
                      ),
                    }}
                  >
                    {
                      'Tuya T5 chip/module is a high-performance embedded Wi-Fi 6 + Bluetooth 5.4 dual-mode communication module, embedded with ARMv8-M Star (M33F) processor, with a main frequency up to 480MHz, specially designed for smart audio-video applications.'
                    }
                  </Translate>
                </p>
                <Link
                  to="/docs/hardware-specific/t5-ai-board/overview-t5-ai-board"
                  className="tw-btn !tw-btn-primary tw-gap-2 hover:-tw-translate-y-[3px]"
                >
                  <Translate id="home.learnmore">Learn More →</Translate>
                </Link>
              </div>
            </div>

            {/* Row 2 */}
            <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center tw-gap-8">
              <div className="tw-flex-[1.5] tw-z-10">
                <h2 className="tw-text-4xl xl:tw-text-5xl">
                  {/* Due to the below texts are not simple strings, so we can't use <Translate /> here. */}
                  {i18n.currentLocale === 'en' && (
                    <span>
                      Meet <span className={styles.heroTitle}>Tuya AI</span>: Powerful Multimodal AI Interaction Model
                    </span>
                  )}
                  {i18n.currentLocale === 'zh' && (
                    <span>
                      <span className={styles.heroTitle}>Tuya AI</span>：强大的多模態 AI 交互模型
                    </span>
                  )}
                </h2>
                <p className="lg:tw-text-lg tw-font-medium">
                  <Translate
                    id="home.tuya.ai.desc"
                    values={{
                      link: (
                        <Link className="tw-underline dark:tw-no-underline" to="/docs/simulate-physical-machine-chaos">
                          PhysicalMachineChaos
                        </Link>
                      ),
                    }}
                  >
                    {
                      'Tuya AI: Multimodal Edge-Cloud Intelligence with edge AI inference and cloud agent hub, enabling access to leading AI models (DeepSeek, ChatGPT, Claude, Gemini) and cross-modal functions including voice/text interaction and image/video generation for edge devices.'
                    }
                  </Translate>
                </p>
                <Link to="https://tuya.ai" className="tw-btn !tw-btn-primary tw-gap-2 hover:-tw-translate-y-[3px]">
                  <Translate id="home.learnmore">Learn More →</Translate>
                </Link>
              </div>

              <div className={clsx('tw-relative tw-flex-1 tw-flex tw-items-center tw-overflow-hidden xl:tw-h-[640px]')}>
                <img className="tw-absolute tw-w-[90%]" src="/img/home/chaosd-bg.svg" />
                <div className="tw-flex tw-justify-center tw-items-center xl:tw-w-[75%] lg:tw-h-[100%]">
                  {/* <ChaosdFeatures /> */}
                  <img
                    className="scroll-to-display tw-w-[60%]"
                    style={{ width: 700 }}
                    src="img/features/Smart home-amico.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero">
          <div className="tw-container tw-mx-auto max-lg:tw-px-4">
            <div className="tw-max-w-[800px] tw-mb-12 tw-mx-auto tw-text-center">
              <h2 className="tw-text-4xl xl:tw-text-5xl">
                {/* Due to the below texts are not simple strings, so we can't use <Translate /> here. */}
                {i18n.currentLocale === 'en' && (
                  <span>
                    Building the Whole Community <span className={styles.heroTitle}>Together</span>
                  </span>
                )}
                {i18n.currentLocale === 'zh' && (
                  <span>
                    <span className={styles.heroTitle}>共建</span>社区，共同前行
                  </span>
                )}
              </h2>
              <p className="lg:tw-text-lg tw-font-medium">
                <Translate id="home.buildcommunity.desc">
                  Join the community and interact with maintainers and other users. Your suggestions can make TuyaOpen
                  better.
                </Translate>
              </p>
            </div>
            <div className="tw-grid lg:tw-grid-cols-3 tw-gap-8 tw-mb-12 lg:tw-w-[80%] lg:tw-mx-auto">
              <Card>
                <IconGithub className="tw-w-12 tw-h-12 dark:tw-fill-white" />
                <p>
                  <Translate id="home.buildcommunity.beacontributor">
                    Be a contributor to building the future of IoT with TuyaOpen.
                  </Translate>
                </p>
                <Link
                  to="https://github.com/tuya/TuyaOpen"
                  className="tw-btn tw-bg-[#f2f2f2] tw-text-[#1f2937] dark:tw-text-[#a6adba] hover:!tw-bg-[#e6e6e6] tw-normal-case dark:tw-glass dark:hover:!tw-bg-transparent dark:hover:tw-text-white"
                >
                  GitHub
                </Link>
              </Card>
              <Card>
                <IconHelp className="tw-w-12 tw-h-12 dark:tw-fill-white" />
                <p>
                  <Translate id="home.buildcommunity.help">
                    Experiencing any issues? Don't hesitate to reach out to us for assistance.
                  </Translate>
                </p>
                <div className="tw-flex tw-gap-3">
                  <Link
                    to="https://github.com/tuya/TuyaOpen/issues"
                    className="tw-btn tw-bg-[#f2f2f2] tw-text-[#1f2937] dark:tw-text-[#a6adba] hover:!tw-bg-[#e6e6e6] tw-normal-case dark:tw-glass dark:hover:!tw-bg-transparent dark:hover:tw-text-white"
                  >
                    GitHub Issues
                  </Link>
                  <Link
                    to="https://github.com/tuya/TuyaOpen/discussions"
                    className="tw-btn tw-bg-[#f2f2f2] tw-text-[#1f2937] dark:tw-text-[#a6adba] hover:!tw-bg-[#e6e6e6] tw-normal-case dark:tw-glass dark:hover:!tw-bg-transparent dark:hover:tw-text-white"
                  >
                    GitHub Discussions
                  </Link>
                </div>
              </Card>
              <Card>
                {/* Discord SVG icon */}
                <svg
                  className="tw-w-12 tw-h-12 dark:tw-fill-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.2a.074.074 0 0 0-.079.037c-.34.607-.719 1.395-.984 2.01a18.524 18.524 0 0 0-5.59 0 12.51 12.51 0 0 0-.995-2.01.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.069.069 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.056c2.128 1.565 4.195 2.51 6.229 3.13a.077.077 0 0 0 .084-.027c.48-.66.91-1.356 1.273-2.084a.076.076 0 0 0-.041-.104c-.676-.256-1.32-.568-1.938-.936a.077.077 0 0 1-.008-.127c.13-.098.26-.2.384-.304a.074.074 0 0 1 .077-.01c4.06 1.855 8.447 1.855 12.47 0a.075.075 0 0 1 .078.009c.124.104.254.206.385.304a.077.077 0 0 1-.007.127 12.298 12.298 0 0 1-1.939.936.076.076 0 0 0-.04.105c.36.728.792 1.424 1.272 2.084a.076.076 0 0 0 .084.028c2.04-.62 4.106-1.565 6.23-3.13a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.548-13.625a.061.061 0 0 0-.03-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z" />
                </svg>
                <p>
                  <Translate id="home.buildcommunity.discord">
                    Join our Discord community to chat, ask questions, and connect with other TuyaOpen users.
                  </Translate>
                </p>
                <Link
                  to="https://discord.gg/cbGrBjx7"
                  className="tw-btn tw-bg-[#5865F2] tw-text-white hover:!tw-bg-[#4752c4] tw-normal-case dark:tw-glass dark:hover:!tw-bg-transparent"
                >
                  Join Discord Server
                </Link>
              </Card>
            </div>
            <p className="tw-font-medium tw-text-center">
              TuyaOpen is a{' '}
              <Link className="tw-underline dark:tw-no-underline" to="https://www.tuya.com/">
                Tuya Inc
              </Link>{' '}
              incubating Open-Source project.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
