const projectsData = {
  en: [
    {
      id: 't5ai-core-ai-chatbot',
      title: 'Build AI Chatbot with T5AI-Core',
      description:
        'Quickly build an AI chatbot using the T5AI-Core development board and ST7789 screen. Features include real-time emotion display, voice input/output, and easy configuration with TuyaOpen SDK.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/62704802-0b90-42c0-8020-55e0da9cbd38.png',
      markdownFile: '/docs/projects/2025-09-15-t5ai-core-ai-chatbot',
      tags: ['iot', 'ai', 'chatbot', 'voice', 'open-source', 'open-hardware', 'tutorial'],
    },
    {
      id: 'simple-iot-switch',
      title: 'Simple IoT Switch',
      description:
        'A simple cloud-connected IoT switch project built with Tuya, featuring app-based remote control and secure device authentication.',
      image: '/img/projects/project-iot-switch.png',
      markdownFile: '/docs/projects/2025-09-15-project-iot-switch',
      tags: ['iot', 'smart-home', 'automation', 'open-source', 'open-hardware'],
    },
    {
      id: 'lvgl-font-change-tutorial',
      title: 'LVGL Font Change Tutorial',
      description:
        'A step-by-step guide to customizing and applying fonts in LVGL, including local/global font setup, default font modification, and adding custom icons for embedded UI projects.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/3cff6dfb-ccff-4fde-8386-78babc9578b3.png',
      markdownFile: '/docs/projects/2025-09-15-lvgl-font-change-tutorial',
      tags: ['tutorial'],
    },
    {
      id: 't5-2m-asr-pro-custom-asr',
      title: 'T5+2M-ASR-PRO Custom Wake Words',
      description:
        'A tutorial for adding a 2M ASR PRO speech recognition module to the T5 development board, enabling custom wake words, offline recognition, and multi-role support. Includes wiring, firmware, and example code for serial and IO wakeup.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/e7b390c6-10bf-4a92-a499-c7bacea116d5.jpg',
      markdownFile: '/docs/projects/2025-09-19-T5+2M-ASR-PRO-custom-asr',
      tags: ['iot', 'ai', 'voice', 'tutorial'],
    },
    {
      id: 'star-tracker',
      title: 'Star Tracker',
      description:
        'A new-style compass based on Tuya T5AI-CORE development board with T5-E1 chip module, capable of pointing to stars and implementing astronomical Agent dialogue.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/11fcf2a4-25b6-4a90-8f3a-bc6e5f0dde38.jpg',
      markdownFile: '/docs/projects/2025-08-01-star-tracker',
      tags: ['iot', 'contest', 'ai', 'voice'],
    },
    {
      id: 'cyber-glass',
      title: 'Dynamic Light Effect DIDI Glasses',
      description:
        'Create immersive entertainment with heartbeat and rhythm becoming visible light. Music beats flow through the frame.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/303c2850-621d-4c50-84c2-b964e8c83d0f.jpg',
      markdownFile: '/docs/projects/2025-08-01-cyber-glass',
      tags: ['iot', 'contest', 'entertainment', 'wearable', 'voice'],
    },
    {
      id: 'nft-plent-collector',
      title: 'CyberPlant',
      description:
        'A blockchain-based plant NFT project including frontend interface, backend API and smart contracts.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/fd0ed95b-c96d-4106-938b-7d203a45675c.jpg',
      markdownFile: '/docs/projects/2025-08-01-cyberplant',
      tags: ['blockchain', 'nft', 'web3'],
    },
    {
      id: 'robot-arm',
      title: 'Auraflow',
      description:
        'An intelligent companion tomato timer robot designed for users who easily fall into deep focus, helping them rest scientifically through personalized intervention mechanisms.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/74f40f1e-8650-4e59-9593-837255081cc9.jpg',
      markdownFile: '/docs/projects/2025-08-01-auraflow',
      tags: ['iot', 'ai', 'robotics', 'voice'],
    },
    {
      id: 'rdk-x5',
      title: 'TuyaOpen With RDK-X5',
      description:
        'Running TuyaOpen multi-modal agent with powerful local AI powerhouse RDK X5 SBC. Seamlessly integrate IoT and Cloud multi-modal capabilities with local NPU AI processing for edge computing applications.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/7a0fcb92-b721-4f38-8b32-3cb84aca785e.jpg',
      markdownFile: '/docs/projects/2025-08-01-rdk-x5',
      tags: ['iot', 'ai', 'robotics', 'computer-vision', 'voice'],
    },
    {
      id: 'rolling-ball',
      title: 'Soccer Star',
      description:
        'A spherical robot that looks exactly like a soccer ball. It can run independently and walk to the opposite goal.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/61811184-3563-4a14-93e1-c603dcb29395.jpg',
      markdownFile: '/docs/projects/2025-08-01-soccer-star',
      tags: ['iot', 'robotics', 'entertainment'],
    },
    {
      id: 'ai-social-badge',
      title: 'Smart Social Badge',
      description:
        'In offline social situations, when someone with common language appears near you, both necklaces flash the same light, helping us spend more time with people who share common interests.',
      image: 'https://images.tuyacn.com/fe-static/docs/img/206894ec-546e-4a6d-a0ce-9b521d574ccb.jpg',
      markdownFile: '/docs/projects/2025-08-01-smart-necklace',
      tags: ['iot', 'social', 'bluetooth', 'wearable'],
    },
  ],
  zh: [
    {
      id: 't5ai-core-ai-chatbot',
      title: 'T5AI-Core 聊天机器人',
      description:
        '基于 T5AI-Core 开发板和 ST7789 屏幕，快速搭建 AI 聊天机器人。支持实时情感显示、语音输入输出，并可通过 TuyaOpen SDK 便捷配置。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/62704802-0b90-42c0-8020-55e0da9cbd38.png',
      markdownFile: '/docs/projects/2025-09-15-t5ai-core-ai-chatbot',
      tags: ['iot', 'ai', 'chatbot', 'voice', 'open-source', 'open-hardware', 'tutorial'],
    },
    {
      id: 'simple-iot-switch',
      title: '简单物联网开关',
      description: '一个基于涂鸦平台的简单云端连接物联网开关项目，支持 App 远程控制和安全设备认证。',
      image: '/img/projects/project-iot-switch.png',
      markdownFile: '/docs/projects/2025-09-15-project-iot-switch',
      tags: ['iot', 'smart-home', 'automation', 'open-source', 'open-hardware'],
    },
    {
      id: 'lvgl-font-change-tutorial',
      title: 'LVGL 字体变更',
      description: '详细介绍如何在嵌入式项目中设置、引用和全局配置 LVGL 字体，包括自定义字体制作与全局生效方法。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/3cf655aa-37ed-46b5-9700-784c84a7b2b6.png',
      markdownFile: '/docs/projects/2025-09-15-lvgl-font-change-tutorial',
      tags: ['tutorial'],
    },
    {
      id: 't5-2m-asr-pro-custom-asr',
      title: 'T5+2M-ASR-PRO 定制唤醒词',
      description:
        '本教程介绍如何为 T5 开发板增加 2M ASR PRO 语音识别模组，实现自定义唤醒词、离线识别及多角色支持。内容涵盖硬件接线、固件烧录、串口与 IO 唤醒示例代码。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/5e634b99-003f-48c9-b7d1-04d086785b46.jpg',
      markdownFile: '/docs/projects/2025-09-19-T5+2M-ASR-PRO-custom-asr',
      tags: ['iot', 'ai', 'voice', 'tutorial'],
    },
    {
      id: 'star-tracker',
      title: '觅星',
      description: '一款基于涂鸦T5AI-CORE 核心开发板 搭载T5-E1芯片模组，能够指向星星和实现天文Agent对话的新式指南针',
      image: 'https://images.tuyacn.com/fe-static/docs/img/11fcf2a4-25b6-4a90-8f3a-bc6e5f0dde38.jpg',
      markdownFile: '/docs/projects/2025-08-01-star-tracker',
      tags: ['iot', 'contest', 'ai', 'voice'],
    },
    {
      id: 'cyber-glass',
      title: '动感光效DIDI眼镜',
      description: '让心跳与节拍变成看得见的光 音乐节拍流动于镜框',
      image: 'https://images.tuyacn.com/fe-static/docs/img/303c2850-621d-4c50-84c2-b964e8c83d0f.jpg',
      markdownFile: '/docs/projects/2025-08-01-cyber-glass',
      tags: ['iot', 'contest', 'entertainment', 'wearable'],
    },
    {
      id: 'nft-plent-collector',
      title: 'CyberPlant 赛博植物',
      description: '这是一个基于区块链技术的植物NFT项目，包含前端界面、后端API和智能合约。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/fd0ed95b-c96d-4106-938b-7d203a45675c.jpg',
      markdownFile: '/docs/projects/2025-08-01-cyberplant',
      tags: ['blockchain', 'nft', 'web3'],
    },
    {
      id: 'robot-arm',
      title: 'Auraflow 心流空间',
      description: '一款智能陪伴式番茄钟机器人，专为易陷入深度专注的用户设计，通过个性化干预机制帮助其科学休息。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/74f40f1e-8650-4e59-9593-837255081cc9.jpg',
      markdownFile: '/docs/projects/2025-08-01-auraflow',
      tags: ['iot', 'ai', 'robotics', 'voice'],
    },
    {
      id: 'rdk-x5',
      title: 'TuyaOpen 与 RDK-X5',
      description:
        '在强大的本地AI算力平台RDK X5单板计算机上运行TuyaOpen多模态智能体。无缝集成物联网和云端多模态能力，结合本地NPU AI处理，实现边缘计算应用。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/7a0fcb92-b721-4f38-8b32-3cb84aca785e.jpg',
      markdownFile: '/docs/projects/2025-08-01-rdk-x5',
      tags: ['iot', 'ai', 'robotics', 'computer-vision', 'voice'],
    },
    {
      id: 'rolling-ball',
      title: '国足之星',
      description: '一个球形机器人，和足球外形完全一致。可以独立运行，自己走到对面的球门。',
      image: 'https://images.tuyacn.com/fe-static/docs/img/61811184-3563-4a14-93e1-c603dcb29395.jpg',
      markdownFile: '/docs/projects/2025-08-01-soccer-star',
      tags: ['iot', 'robotics', 'entertainment'],
    },
    {
      id: 'ai-social-badge',
      title: '友念智能社交项链',
      description:
        '在线下社交场合，让每个和你有共同语言的人出现在你身边时，双方项链都闪烁相同的光，把我们更多的时间花在有共同语言的人身上',
      image: 'https://images.tuyacn.com/fe-static/docs/img/206894ec-546e-4a6d-a0ce-9b521d574ccb.jpg',
      markdownFile: '/docs/projects/2025-08-01-smart-necklace',
      tags: ['iot', 'social', 'bluetooth', 'wearable'],
    },
  ],
}

export default projectsData
