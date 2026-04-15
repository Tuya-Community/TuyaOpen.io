import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import styles from './tyutool.module.css';

// 英文内容
const enContent = {
  title: 'TyuTool - A Universal Serial Port Tool for Tuya',
  subtitle: 'Cross-platform serial port utility for IoT developers',
  overview: {
    title: 'Overview',
    content: 'TyuTool is a cross-platform serial port utility designed for Internet of Things (IoT) developers to flash and read firmware for various mainstream chips. It provides both a simple Graphical User Interface (GUI) and a powerful Command-Line Interface (CLI) to streamline development and debugging workflows.'
  },
  features: {
    title: '✨ Features',
    items: [
      'Dual-Mode Operation: Offers both an intuitive GUI and a flexible CLI to meet the needs of different scenarios',
      'Core Serial Functions: Supports firmware flashing (writing to Flash) and firmware reading (reading from Flash)',
      'Cross-Platform Support: Fully compatible with Windows, Linux, and macOS (x86 & ARM64)',
      'Multi-Chip Support: Built-in flashing protocols for a variety of chips, easily handling different projects',
      'User-Friendly: Clean user interface, with the CLI providing detailed progress bars and status feedback',
      'Standalone Executables: Provides portable executables that run without needing a Python environment'
    ]
  },
  supportedChips: {
    title: '⚡ Supported Chips',
    content: 'This tool currently supports (but is not limited to) the following chip platforms:',
    chips: [
      'BK7231N / BK7231T',
      'RTL8720CF', 
      'ESP32 / ESP32-C3 / ESP32-S3',
      'LN882H',
      'T5AI/T3/T2',
      '...'
    ]
  },
  versions: {
    title: '📦 Dual Versions',
    content: 'tyuTool provides two versions to meet different development needs:',
    cli: {
      title: 'Command Line Interface (CLI)',
      description: 'Powerful command-line tool for automation and batch operations',
      features: ['Detailed progress feedback', 'Script automation support', 'Batch processing capabilities']
    },
    gui: {
      title: 'Graphical User Interface (GUI)', 
      description: 'Intuitive graphical interface for easy operation',
      features: ['Visual progress display', 'Point-and-click operation', 'Real-time status monitoring']
    }
  },
  platforms: {
    title: '🌐 Cross-Platform Support',
    content: 'tyuTool supports all major operating systems:',
    platforms: [
      { name: 'Windows', icon: '/img/tyutool/windows.png' },
      { name: 'Linux', icon: '/img/tyutool/linux.png' },
      { name: 'macOS', icon: '/img/tyutool/apple.png' }
    ]
  },
  download: {
    title: '📥 Download',
    content: 'Choose your preferred platform to download:',
    github: {
      title: 'GitHub',
      source: 'https://github.com/tuya/tyutool',
      release: 'https://github.com/tuya/tyutool/releases'
    },
    gitee: {
      title: 'Gitee', 
      source: 'https://gitee.com/tuya-open/tyutool',
      release: 'https://gitee.com/tuya-open/tyutool/releases'
    }
  },
  documentation: {
    title: '📚 Documentation',
    content: 'Need help getting started? Check out our comprehensive usage guide.',
    link: '/docs/tos-tools/tools-tyutool',
    linkText: 'GUI - tyutool Graphical Tool'
  }
};

// 中文内容
const zhContent = {
  title: 'TyuTool - 涂鸦通用串口工具',
  subtitle: '为物联网开发者设计的跨平台串口工具',
  overview: {
    title: '概述',
    content: 'TyuTool 是一款为物联网（IoT）开发者设计的、跨平台的串口工具，用于烧录和读取多种主流芯片的固件。它提供简洁的图形用户界面（GUI）和强大的命令行界面（CLI），旨在简化开发和调试流程。'
  },
  features: {
    title: '✨ 功能特性',
    items: [
      '双模式操作: 提供直观的图形界面 (GUI) 和灵活的命令行 (CLI)，满足不同场景下的使用需求',
      '核心串口功能: 支持固件烧录（写入 Flash）和固件读取（从 Flash 读出）',
      '跨平台支持: 完美兼容 Windows, Linux, 和 macOS (x86 & ARM64)',
      '多芯片支持: 内置多种芯片的烧录协议，轻松应对不同项目',
      '用户友好: 操作界面简洁，CLI 提供详细的进度条和状态反馈',
      '独立打包: 提供免安装的绿色可执行文件，无需配置 Python 环境即可使用'
    ]
  },
  supportedChips: {
    title: '⚡ 支持芯片',
    content: '本工具目前主要支持（但不限于）以下芯片平台：',
    chips: [
      'BK7231N / BK7231T',
      'RTL8720CF',
      'ESP32 / ESP32-C3 / ESP32-S3', 
      'LN882H',
      'T5AI/T3/T2',
      '...'
    ]
  },
  versions: {
    title: '📦 双版本支持',
    content: 'TyuTool 提供两个版本以满足不同的开发需求：',
    cli: {
      title: '命令行界面 (CLI)',
      description: '强大的命令行工具，支持自动化和批量操作',
      features: ['详细的进度反馈', '脚本自动化支持', '批量处理能力']
    },
    gui: {
      title: '图形用户界面 (GUI)',
      description: '直观的图形界面，操作简单便捷',
      features: ['可视化进度显示', '点击式操作', '实时状态监控']
    }
  },
  platforms: {
    title: '🌐 跨平台支持',
    content: 'TyuTool 支持所有主流操作系统：',
    platforms: [
      { name: 'Windows', icon: '/img/tyutool/windows.png' },
      { name: 'Linux', icon: '/img/tyutool/linux.png' },
      { name: 'macOS', icon: '/img/tyutool/apple.png' }
    ]
  },
  download: {
    title: '📥 下载',
    content: '选择您偏好的平台进行下载：',
    github: {
      title: 'GitHub',
      source: 'https://github.com/tuya/tyutool',
      release: 'https://github.com/tuya/tyutool/releases'
    },
    gitee: {
      title: 'Gitee',
      source: 'https://gitee.com/tuya-open/tyutool', 
      release: 'https://gitee.com/tuya-open/tyutool/releases'
    }
  },
  documentation: {
    title: '📚 使用说明',
    content: '需要帮助开始使用吗？查看我们的详细使用指南。',
    link: '/zh/docs/tos-tools/tools-tyutool',
    linkText: 'GUI - tyutool 图形化工具'
  }
};

export default function TyutoolPage() {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const isZh = location.pathname.includes('/zh/');
  const content = isZh ? zhContent : enContent;

  return (
    <Layout title={content.title} description="TyuTool cross-platform serial port utility for IoT developers">
      <main className={styles.container}>
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link to="/">Home</Link> / tyutool
          </div>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
        </div>

        <div className={styles.content}>
          {/* Overview Section */}
          <section className={styles.section}>
            <h2>{content.overview.title}</h2>
            <p>{content.overview.content}</p>
          </section>

          {/* Features Section */}
          <section className={styles.section}>
            <h2>{content.features.title}</h2>
            <ul className={styles.featureList}>
              {content.features.items.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Supported Chips Section */}
          <section className={styles.section}>
            <h2>{content.supportedChips.title}</h2>
            <p>{content.supportedChips.content}</p>
            <div className={styles.chipGrid}>
              {content.supportedChips.chips.map((chip, index) => (
                <div key={index} className={styles.chipItem}>
                  {chip}
                </div>
              ))}
            </div>
          </section>

          {/* Versions Section */}
          <section className={styles.section}>
            <h2>{content.versions.title}</h2>
            <p>{content.versions.content}</p>
            <div className={styles.versionGrid}>
              <div className={styles.versionCard}>
                <h3>{content.versions.cli.title}</h3>
                <p>{content.versions.cli.description}</p>
                <ul className={styles.versionFeatures}>
                  {content.versions.cli.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.versionCard}>
                <h3>{content.versions.gui.title}</h3>
                <p>{content.versions.gui.description}</p>
                <ul className={styles.versionFeatures}>
                  {content.versions.gui.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Platforms Section */}
          <section className={styles.section}>
            <h2>{content.platforms.title}</h2>
            <p>{content.platforms.content}</p>
            <div className={styles.platformGrid}>
              {content.platforms.platforms.map((platform, index) => (
                <div key={index} className={styles.platformCard}>
                  <div className={styles.platformIcon}>
                    <img src={platform.icon} alt={platform.name} className={styles.platformImage} />
                  </div>
                  <h3>{platform.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Download Section */}
          <section className={styles.section}>
            <h2>{content.download.title}</h2>
            <p>{content.download.content}</p>
            <div className={styles.downloadGrid}>
              <div className={styles.downloadCard}>
                <h3>{content.download.github.title}</h3>
                <div className={styles.downloadLinks}>
                  <a href={content.download.github.source} target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
                    📦 {isZh ? '源码' : 'Source Code'}
                  </a>
                  <a href={content.download.github.release} target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
                    🚀 {isZh ? '发布版' : 'Releases'}
                  </a>
                </div>
              </div>
                             <div className={styles.downloadCard}>
                 <h3>{content.download.gitee.title}</h3>
                 <div className={styles.downloadLinks}>
                   <a href={content.download.gitee.source} target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
                     📦 {isZh ? '源码' : 'Source Code'}
                   </a>
                   <a href={content.download.gitee.release} target="_blank" rel="noopener noreferrer" className={styles.downloadLink}>
                     🚀 {isZh ? '发布版' : 'Releases'}
                   </a>
                 </div>
               </div>
            </div>
          </section>

          {/* Documentation Section */}
          <section className={styles.section}>
            <h2>{content.documentation.title}</h2>
            <p>{content.documentation.content}</p>
            <div className={styles.documentationCenter}>
              <Link 
                to={content.documentation.link} 
                className={styles.documentationLink}
              >
                📚 {content.documentation.linkText}
              </Link>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
} 