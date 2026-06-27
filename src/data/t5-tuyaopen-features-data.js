/**
 * Tuya T5 reference feature list (left: connectivity/core/memory/clocks; right: power + peripherals + packaging).
 * Bilingual: English + Simplified Chinese. Technical specs (numbers, standards) are kept identical across locales.
 * @typedef {{ title: string, bullets: Array<string | { text: string, subBullets?: string[], modelDetails?: Array<{ name: string, meta: string, dimensions: string, image?: string, href?: string }> }> }} FeatureGroup
 */

const EN_GROUPS = [
  {
    title: 'Wi-Fi',
    bullets: [
      'IEEE 802.11b/g/n/ax 1x1 compliant',
      '20/40 MHz channel bandwidth for 2.4 GHz',
      'Supports downlink Multi-User Multiple-Input Multiple-Output (DL MU-MIMO)',
      'Supports Orthogonal Frequency Division Multiple Access (OFDMA)',
      'Supports Target Wake Time (TWT)',
      'TX and RX Low-Density Parity Check (LDPC) support for extended range',
      'WPA/WPA2/WPA3-Personal support for enhanced security',
      'Operating modes: STA and SoftAP',
      'Concurrent SoftAP + STA',
      'Integrated Bluetooth/Wi-Fi coexistence (PTA)',
      'TX power up to +20 dBm',
      'RX sensitivity −98 dBm',
    ],
  },
  {
    title: 'Bluetooth Low Energy',
    bullets: [
      'Bluetooth 5.4 Low Energy (LE)',
      'Supports Bluetooth Low Energy 1 Mbps, 2 Mbps, and long range (125 kbps and 500 kbps)',
      'Supported Bluetooth Low Energy features: LE Audio, Angle of Arrival (AoA) and Angle of Departure (AoD) direction finding, 2 Mbps, advertising extensions, and long range',
      'Supports an antenna array with up to 16 antennas for precise positioning',
    ],
  },
  {
    title: 'Core',
    bullets: [
      'ARMv8-M Star (M33F) MCU at up to 480 MHz',
      'Double-precision floating-point unit (FPU)',
      '16 KB ITCM + 16 KB DTCM',
      'Embedded TrustZone',
      'Supports DSP instructions with SIMD',
      '3.84 CoreMark/MHz',
      'UART flash download',
      'Serial Wire Debug (SWD) interface',
    ],
  },
  {
    title: 'Memory',
    bullets: ['Flash up to 16 MB', 'PSRAM up to 16 MB', '640 KB Share SRAM', '64 KB ROM', 'eFuse'],
  },
  {
    title: 'Clock Management',
    bullets: [
      'External oscillators: 26 MHz crystal oscillator (XTALH), 32.768 kHz crystal oscillator (XTALL)',
      'Internal oscillators: 32 kHz ring oscillator (ROSC), 26–360 MHz digitally controlled oscillator (DCO)',
      '320/480 MHz PLL (DPLL)',
      'Audio PLL (APLL)',
    ],
  },
  {
    title: 'Power Management',
    bullets: [
      '2.0 to 4.35 V VBAT supply',
      'On-chip Power-On Reset (POR) and Brown-Out Detector (BOD)',
      'Embedded buck (DC-DC) converters and LDO regulators',
      'Low power consumption:',
      'Active mode RX: 17.5 mA',
      'Sleep mode: 43 μA',
      'Deep sleep mode: 16 μA',
      'Shutdown mode: 2.5 μA',
    ],
  },
  {
    title: 'Peripherals',
    bullets: [
      '56 GPIOs',
      '2× SPI',
      '2× QSPI',
      '3× UART: 1 with hardware flow control and flash download support',
      '1× Smart Card controller',
      '1× SDIO',
      '2× I2C',
      '1× high-speed USB2.0 (HS)',
      '1× CAN controller with CAN FD',
      '1× LIN controller',
      '2× general-purpose DMA controller (GDMA), each with 8 channels',
      '1× DMA2D controller',
      '1× rotation module',
      '2× scaling module',
      '1× display controller supporting RGB and 8080 interfaces',
      '1× segment LCD controller for up to 8 × 28 segments',
      '1× JPEG hardware encoder',
      '1× JPEG hardware decoder',
      '1× 8-bit CIS DVP interface',
      '1× 720p H.264 video encoder',
      '1× Ethernet MAC interface',
      '12× 32-bit PWM channel',
      '3× I2S',
      '1× four-band digital hardware equalizer',
      '2× audio ADC',
      '1× audio DAC',
      '1× DMIC',
      '1× SBC accelerator',
      '12-bit AUX ADC, up to 11 channels',
      '6× 32-bit general-purpose timer',
      '2× watchdog timer',
      '1× real-time counter (RTC)',
      '1× IrDA',
      '1× temperature sensor',
      '1× touch sensor, up to 16 touch sensing I/Os',
    ],
  },
  {
    title: 'Packaging',
    bullets: [
      {
        text: 'Two module packages:',
        modelDetails: [
          {
            name: 'T5-E1',
            meta: 'Built-in antenna',
            dimensions: '18.00±0.35 mm (W) × 25.50±0.35 mm (L) × 2.8±0.15 mm (H)',
            image: 'https://images.tuyacn.com/content-platform/hestia/1706181963c31021f4f6f.png',
            href: 'https://developer.tuya.com/en/docs/iot/T5-E1-Module-Datasheet?id=Kdar6hf0kzmfi',
          },
          {
            name: 'T5-E1-IPEX',
            meta: 'IPEX connector for external antenna',
            dimensions: '18.00±0.35 mm (W) × 19.70±0.35 mm (L) × 2.8±0.15 mm (H)',
            image: 'https://images.tuyacn.com/content-platform/hestia/1721726203a311ac1c3c9.png',
            href: 'https://developer.tuya.com/en/docs/iot/T5-E1-IPEX-Module-Datasheet?id=Kdskxvxe835tq',
          },
        ],
      },
      'Packaging Hybrid LCC/LGA Module',
      'Operating temperature range: −40 to +85 °C',
    ],
  },
]

const ZH_GROUPS = [
  {
    title: 'Wi-Fi',
    bullets: [
      '符合 IEEE 802.11b/g/n/ax 1×1',
      '2.4 GHz 下支持 20/40 MHz 信道带宽',
      '支持下行多用户多输入多输出（DL MU-MIMO）',
      '支持正交频分多址（OFDMA）',
      '支持目标唤醒时间（TWT）',
      '收发均支持低密度奇偶校验（LDPC），扩展通信距离',
      '支持 WPA/WPA2/WPA3-Personal，增强安全性',
      '工作模式：STA 与 SoftAP',
      'SoftAP + STA 并发',
      '集成蓝牙/Wi-Fi 共存（PTA）',
      '发射功率最高 +20 dBm',
      '接收灵敏度 −98 dBm',
    ],
  },
  {
    title: '低功耗蓝牙',
    bullets: [
      '蓝牙 5.4 低功耗（LE）',
      '支持低功耗蓝牙 1 Mbps、2 Mbps 及远距离（125 kbps 与 500 kbps）',
      '支持的低功耗蓝牙特性：LE Audio、到达角（AoA）与离开角（AoD）测向、2 Mbps、广播扩展与远距离',
      '支持最多 16 天线的阵列，实现精准定位',
    ],
  },
  {
    title: '内核',
    bullets: [
      '最高 480 MHz 的 ARMv8-M Star（M33F）MCU',
      '双精度浮点单元（FPU）',
      '16 KB ITCM + 16 KB DTCM',
      '内置 TrustZone',
      '支持带 SIMD 的 DSP 指令',
      '3.84 CoreMark/MHz',
      'UART Flash 下载',
      '串行线调试（SWD）接口',
    ],
  },
  {
    title: '存储',
    bullets: ['Flash 最高 16 MB', 'PSRAM 最高 16 MB', '640 KB 共享 SRAM', '64 KB ROM', 'eFuse'],
  },
  {
    title: '时钟管理',
    bullets: [
      '外部振荡器：26 MHz 晶振（XTALH）、32.768 kHz 晶振（XTALL）',
      '内部振荡器：32 kHz 环形振荡器（ROSC）、26–360 MHz 数控振荡器（DCO）',
      '320/480 MHz 锁相环（DPLL）',
      '音频锁相环（APLL）',
    ],
  },
  {
    title: '电源管理',
    bullets: [
      'VBAT 供电 2.0 至 4.35 V',
      '片上上电复位（POR）与欠压检测（BOD）',
      '内置 Buck（DC-DC）转换器与 LDO 稳压器',
      '低功耗：',
      '工作模式 RX：17.5 mA',
      '睡眠模式：43 μA',
      '深度睡眠模式：16 μA',
      '关断模式：2.5 μA',
    ],
  },
  {
    title: '外设',
    bullets: [
      '56 个 GPIO',
      '2× SPI',
      '2× QSPI',
      '3× UART：其中 1 路支持硬件流控与 Flash 下载',
      '1× 智能卡控制器',
      '1× SDIO',
      '2× I2C',
      '1× 高速 USB2.0（HS）',
      '1× CAN 控制器（支持 CAN FD）',
      '1× LIN 控制器',
      '2× 通用 DMA 控制器（GDMA），各 8 通道',
      '1× DMA2D 控制器',
      '1× 旋转模块',
      '2× 缩放模块',
      '1× 显示控制器，支持 RGB 与 8080 接口',
      '1× 段式 LCD 控制器，最多 8 × 28 段',
      '1× JPEG 硬件编码器',
      '1× JPEG 硬件解码器',
      '1× 8 位 CIS DVP 接口',
      '1× 720p H.264 视频编码器',
      '1× 以太网 MAC 接口',
      '12× 32 位 PWM 通道',
      '3× I2S',
      '1× 四段数字硬件均衡器',
      '2× 音频 ADC',
      '1× 音频 DAC',
      '1× 数字麦克风（DMIC）',
      '1× SBC 加速器',
      '12 位 AUX ADC，最多 11 通道',
      '6× 32 位通用定时器',
      '2× 看门狗定时器',
      '1× 实时计数器（RTC）',
      '1× IrDA',
      '1× 温度传感器',
      '1× 触摸传感器，最多 16 个触摸感应 I/O',
    ],
  },
  {
    title: '封装',
    bullets: [
      {
        text: '两种模组封装：',
        modelDetails: [
          {
            name: 'T5-E1',
            meta: '内置天线',
            dimensions: '18.00±0.35 mm（宽）× 25.50±0.35 mm（长）× 2.8±0.15 mm（高）',
            image: 'https://images.tuyacn.com/content-platform/hestia/1706181963c31021f4f6f.png',
            href: 'https://developer.tuya.com/en/docs/iot/T5-E1-Module-Datasheet?id=Kdar6hf0kzmfi',
          },
          {
            name: 'T5-E1-IPEX',
            meta: 'IPEX 接口，外接天线',
            dimensions: '18.00±0.35 mm（宽）× 19.70±0.35 mm（长）× 2.8±0.15 mm（高）',
            image: 'https://images.tuyacn.com/content-platform/hestia/1721726203a311ac1c3c9.png',
            href: 'https://developer.tuya.com/en/docs/iot/T5-E1-IPEX-Module-Datasheet?id=Kdskxvxe835tq',
          },
        ],
      },
      '混合 LCC/LGA 模组封装',
      '工作温度范围：−40 至 +85 °C',
    ],
  },
]

const splitColumns = (groups) => ({
  // Left column: Wi-Fi through Clock Management. Right column: Power, Peripherals, Packaging.
  left: groups.slice(0, 5),
  right: [groups[5], ...groups.slice(6)],
})

/** Locale-keyed feature columns for the T5 specs section. */
export const T5_FEATURE_COLUMNS = {
  en: splitColumns(EN_GROUPS),
  zh: splitColumns(ZH_GROUPS),
}

export const T5_CHIPSET_DATASHEET_URL = 'https://developer.tuya.com/en/docs/iot/wifibt-dual-mode-chip?id=Ke3voh7uu0htz'
