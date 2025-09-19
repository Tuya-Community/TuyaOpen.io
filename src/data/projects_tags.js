const tagsData = {
  en: {
    iot: {
      label: 'IoT',
      color: '#3b82f6', // blue
      bgColor: '#dbeafe',
      borderColor: '#3b82f6',
    },
    ai: {
      label: 'AI',
      color: '#8b5cf6', // purple
      bgColor: '#ede9fe',
      borderColor: '#8b5cf6',
    },
    'smart-home': {
      label: 'Smart Home',
      color: '#10b981', // green
      bgColor: '#d1fae5',
      borderColor: '#10b981',
    },
    security: {
      label: 'Security',
      color: '#ef4444', // red
      bgColor: '#fee2e2',
      borderColor: '#ef4444',
    },
    voice: {
      label: 'Voice',
      color: '#f59e0b', // amber
      bgColor: '#fef3c7',
      borderColor: '#f59e0b',
    },
    environmental: {
      label: 'Environmental',
      color: '#06b6d4', // cyan
      bgColor: '#cffafe',
      borderColor: '#06b6d4',
    },
    automation: {
      label: 'Automation',
      color: '#ec4899', // pink
      bgColor: '#fce7f3',
      borderColor: '#ec4899',
    },
    industrial: {
      label: 'Industrial',
      color: '#6b7280', // gray
      bgColor: '#f3f4f6',
      borderColor: '#6b7280',
    },
    sensors: {
      label: 'Sensors',
      color: '#059669', // emerald
      bgColor: '#d1fae5',
      borderColor: '#059669',
    },
    monitoring: {
      label: 'Monitoring',
      color: '#7c3aed', // violet
      bgColor: '#ede9fe',
      borderColor: '#7c3aed',
    },
    contest: {
      label: 'Contest',
      color: '#7c3aed', // violet
      bgColor: '#ede9fe',
      borderColor: '#7c3aed',
    },
    'open-source': {
      label: 'Open Source',
      color: '#16a34a', // green
      bgColor: '#dcfce7',
      borderColor: '#16a34a',
    },
    'open-hardware': {
      label: 'Open Hardware',
      color: '#f97316', // orange
      bgColor: '#ffedd5',
      borderColor: '#f97316',
    },
    blockchain: {
      label: 'Blockchain',
      color: '#0ea5e9', // sky
      bgColor: '#e0f2fe',
      borderColor: '#0ea5e9',
    },
    nft: {
      label: 'NFT',
      color: '#a21caf', // fuchsia
      bgColor: '#fae8ff',
      borderColor: '#a21caf',
    },
    web3: {
      label: 'Web3',
      color: '#facc15', // yellow
      bgColor: '#fef9c3',
      borderColor: '#facc15',
    },
    robotics: {
      label: 'Robotics',
      color: '#2563eb', // indigo
      bgColor: '#dbeafe',
      borderColor: '#2563eb',
    },
    entertainment: {
      label: 'Entertainment',
      color: '#f43f5e', // rose
      bgColor: '#ffe4e6',
      borderColor: '#f43f5e',
    },
    'computer-vision': {
      label: 'Computer Vision',
      color: '#0d9488', // teal
      bgColor: '#ccfbf1',
      borderColor: '#0d9488',
    },
    social: {
      label: 'Social',
      color: '#f472b6', // pink
      bgColor: '#fce7f3',
      borderColor: '#f472b6',
    },
    bluetooth: {
      label: 'Bluetooth',
      color: '#3b82f6', // blue
      bgColor: '#dbeafe',
      borderColor: '#3b82f6',
    },
    wearable: {
      label: 'Wearable',
      color: '#14b8a6', // teal
      bgColor: '#ccfbf1',
      borderColor: '#14b8a6',
    },
    tutorial: {
      label: 'Tutorial',
      color: '#dc2626', // red
      bgColor: '#fee2e2',
      borderColor: '#dc2626',
    },
  },
  zh: {
    iot: {
      label: '物联网',
      color: '#3b82f6',
      bgColor: '#dbeafe',
      borderColor: '#3b82f6',
    },
    ai: {
      label: '人工智能',
      color: '#8b5cf6',
      bgColor: '#ede9fe',
      borderColor: '#8b5cf6',
    },
    'smart-home': {
      label: '智能家居',
      color: '#10b981',
      bgColor: '#d1fae5',
      borderColor: '#10b981',
    },
    security: {
      label: '安全',
      color: '#ef4444',
      bgColor: '#fee2e2',
      borderColor: '#ef4444',
    },
    voice: {
      label: '语音',
      color: '#f59e0b',
      bgColor: '#fef3c7',
      borderColor: '#f59e0b',
    },
    environmental: {
      label: '环境',
      color: '#06b6d4',
      bgColor: '#cffafe',
      borderColor: '#06b6d4',
    },
    automation: {
      label: '自动化',
      color: '#ec4899',
      bgColor: '#fce7f3',
      borderColor: '#ec4899',
    },
    industrial: {
      label: '工业',
      color: '#6b7280',
      bgColor: '#f3f4f6',
      borderColor: '#6b7280',
    },
    sensors: {
      label: '传感器',
      color: '#059669',
      bgColor: '#d1fae5',
      borderColor: '#059669',
    },
    monitoring: {
      label: '监控',
      color: '#7c3aed',
      bgColor: '#ede9fe',
      borderColor: '#7c3aed',
    },
    contest: {
      label: '竞赛',
      color: '#7c3aed',
      bgColor: '#ede9fe',
      borderColor: '#7c3aed',
    },
    'open-source': {
      label: '开源软件',
      color: '#16a34a',
      bgColor: '#dcfce7',
      borderColor: '#16a34a',
    },
    'open-hardware': {
      label: '开源硬件',
      color: '#f97316',
      bgColor: '#ffedd5',
      borderColor: '#f97316',
    },
    blockchain: {
      label: '区块链',
      color: '#0ea5e9',
      bgColor: '#e0f2fe',
      borderColor: '#0ea5e9',
    },
    nft: {
      label: 'NFT',
      color: '#a21caf',
      bgColor: '#fae8ff',
      borderColor: '#a21caf',
    },
    web3: {
      label: 'Web3',
      color: '#facc15',
      bgColor: '#fef9c3',
      borderColor: '#facc15',
    },
    robotics: {
      label: '机器人',
      color: '#2563eb',
      bgColor: '#dbeafe',
      borderColor: '#2563eb',
    },
    entertainment: {
      label: '娱乐',
      color: '#f43f5e',
      bgColor: '#ffe4e6',
      borderColor: '#f43f5e',
    },
    'computer-vision': {
      label: '计算机视觉',
      color: '#0d9488',
      bgColor: '#ccfbf1',
      borderColor: '#0d9488',
    },
    social: {
      label: '社交',
      color: '#f472b6',
      bgColor: '#fce7f3',
      borderColor: '#f472b6',
    },
    bluetooth: {
      label: '蓝牙',
      color: '#3b82f6',
      bgColor: '#dbeafe',
      borderColor: '#3b82f6',
    },
    wearable: {
      label: '可穿戴',
      color: '#a3e635', // lime
      bgColor: '#f7fee7',
      borderColor: '#a3e635',
    },
    tutorial: {
      label: '教程',
      color: '#dc2626', // red
      bgColor: '#fee2e2',
      borderColor: '#dc2626',
    },
  },
}

export default tagsData
