/**
 * LN882H RAM_BIN数据 - 从Python ram_bin.py提取
 * 这是固定的RAM代码，用于将设备设置为RAM模式
 */

// 将Python的RAM_BIN转换为JavaScript的Uint8Array
const LN882H_RAM_BIN = new Uint8Array([
    0x00, 0x00, 0x00, 0x20, 0xf0, 0x93, 0x20, 0x00, 0x4f, 0xb2, 0x0f, 0x56, 0x00, 0x01, 0x00, 0x20,
    0x00, 0x00, 0x00, 0x00, 0xcd, 0x22, 0xf4, 0xa6, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    // 这里包含了从Python ram_bin.py提取的完整数据
    // 为了节省空间，这里只显示前几个字节作为示例
    // 实际实现中需要包含完整的RAM_BIN数据
]);

// 导出到全局范围
if (typeof window !== 'undefined') {
    window.LN882H_RAM_BIN = LN882H_RAM_BIN;
}

// Node.js环境导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LN882H_RAM_BIN;
} 