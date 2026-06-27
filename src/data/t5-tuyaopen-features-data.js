/**
 * Tuya T5 reference feature list (left: connectivity/core/memory/clocks; right: power + peripherals + packaging).
 * @type {{ title: string, bullets: Array<string | { text: string, subBullets?: string[], modelDetails?: Array<{ name: string, meta: string, dimensions: string, image?: string, href?: string }> }> }[]}
 */
const T5_FEATURE_GROUPS_ALL = [
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

export const T5_CHIPSET_DATASHEET_URL = 'https://developer.tuya.com/en/docs/iot/wifibt-dual-mode-chip?id=Ke3voh7uu0htz'

/** Left column: Wi-Fi through Clock Management */
export const T5_FEATURE_GROUPS_LEFT = T5_FEATURE_GROUPS_ALL.slice(0, 5)

/** Right column: Power Management, then Peripherals, then Packaging */
export const T5_FEATURE_GROUPS_RIGHT = [T5_FEATURE_GROUPS_ALL[5], ...T5_FEATURE_GROUPS_ALL.slice(6)]
