const t5ai = {
  id: 't5-ai',
  tags: ['wifi', 'bluetooth', 'ai', 'voice', 'display', 'camera', 'development-board'],
  specs: [
    { name: 'MCU Module', value: 'T5-E1-IPEX' },
    { name: 'CPU', value: 'ARMv8-M Star (M33F) @480MHz' },
    { name: 'Cache', value: '16KB ITCM and 16KB DTCM' },
    { name: 'Flash', value: '8 MB SiP flash memory' },
    { name: 'RAM', value: '16 MB SiP PSRAM' },
    { name: 'SRAM', value: '640 KB shared SRAM' },
    { name: 'Audio ADC', value: '2-channel 16-bit 48KHz' },
    { name: 'Audio DAC', value: '1-channel 16-bit 48KHz' },
    { name: 'Equalizer', value: '4-band digital equalizer' },
    { name: 'Camera Interface', value: 'DVP interfaces' },
    { name: 'Display Interface', value: 'RGB and 8080 interfaces' },
    { name: 'GPIO Pins', value: '56' },
    { name: 'Interfaces', value: '2x SPI, 2x QSPI, 3x UART, 2x I2C, 1x SDIO, 1x CAN, 12x PWM, 3x I2S' },
    { name: 'Wi-Fi', value: 'IEEE 802.11b/g/n/ax compliant' },
    { name: 'Bluetooth', value: 'Bluetooth LE 5.4' },
    { name: 'USB Type-C', value: 'Input: 5V@1A, Firmware Download and Debugging' },
    { name: 'TF Card Slot', value: 'Yes' },
    { name: 'Microphones', value: '2-Channel' },
    { name: 'Speaker', value: '1-Channel' },
  ],
  markdownFile: '/hardware-content/t5-ai-extra.mdx',
}

module.exports = t5ai
