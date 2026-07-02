/**
 * 数据处理模块
 * 负责串口数据的接收、处理、显示
 */
class DataProcessor {
    constructor(eventBus) {
        this.eventBus = eventBus;
        
        // 数据缓冲区，用于按行显示
        this.receiveBuffer = '';
        
        // 统计计数
        this.rxCount = 0;
        this.txCount = 0;
        
        // ANSI颜色映射表
        this.ansiColors = window.ANSI_COLORS || {
            '30': '#000000', '31': '#ff4444', '32': '#44ff44', '33': '#ffff44',
            '34': '#4444ff', '35': '#ff44ff', '36': '#44ffff', '37': '#ffffff',
            '90': '#808080', '91': '#ff6b6b', '92': '#51cf66', '93': '#ffd43b',
            '94': '#74c0fc', '95': '#f06292', '96': '#22d3ee', '97': '#f8f9fa'
        };
        
        this.ansiBgColors = window.ANSI_BG_COLORS || {
            '40': '#000000', '41': '#8b0000', '42': '#006400', '43': '#8b8000',
            '44': '#000080', '45': '#8b008b', '46': '#008b8b', '47': '#c0c0c0',
            '100': '#404040', '101': '#800000', '102': '#008000', '103': '#808000',
            '104': '#000080', '105': '#800080', '106': '#008080', '107': '#808080'
        };
        
        this.bindEvents();
    }
    
    bindEvents() {
        // 监听串口数据接收
        this.eventBus.on('serial:data-received', (data) => {
            this.handleReceivedData(data);
        });
        
        // 监听数据发送
        this.eventBus.on('serial:data-sent', (data) => {
            this.handleSentData(data);
        });
        
        // 监听清空请求
        this.eventBus.on('data:clear', () => {
            this.clearData();
        });
        
        // 监听保存请求
        this.eventBus.on('data:save', () => {
            this.saveData();
        });
    }
    
    /**
     * 处理接收到的数据
     */
    handleReceivedData(data) {
        // 在ASCII模式下，过滤掉0x00字符，并且不计入统计
        let filteredData = data;
        let actualDataLength = data.length;
        
        // 检查是否包含0x00字符
        const hasNullBytes = Array.from(data).some(byte => byte === 0x00);
        
        if (hasNullBytes) {
            // 过滤掉0x00字符
            filteredData = new Uint8Array(Array.from(data).filter(byte => byte !== 0x00));
            actualDataLength = filteredData.length;
            
            // 调试信息：显示过滤的字节数
            const filteredCount = data.length - actualDataLength;
            if (filteredCount > 0) {
                this.eventBus.emit('log:debug', {
                    message: `过滤了 ${filteredCount} 个空字符`,
                    data: { original: data.length, filtered: actualDataLength }
                });
            }
        }
        
        // 只统计实际有效的数据长度（不包含0x00字符）
        this.rxCount += actualDataLength;
        
        // 更新计数显示
        this.eventBus.emit('data:rx-count-updated', this.rxCount);

        // 如果过滤后没有数据，直接返回
        if (actualDataLength === 0) {
            return;
        }

        // 转换数据为字符串，过滤控制字符
        const decoder = new TextDecoder();
        const text = decoder.decode(filteredData);
        
        // 过滤其他不可见控制字符，但保留换行符（注意：0x00已经在上面过滤了）
        const filteredText = text.replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

        // 将数据添加到缓冲区
        this.receiveBuffer += filteredText;

        // 查找换行符并按行显示
        this.processReceiveBuffer();
    }
    
    /**
     * 处理发送的数据
     */
    handleSentData(data) {
        // 更新发送计数
        this.txCount += data.length;
        
        // 更新计数显示
        this.eventBus.emit('data:tx-count-updated', this.txCount);
        
        // 触发发送数据显示事件
        this.eventBus.emit('data:display', {
            type: 'sent',
            data: data,
            timestamp: this.generateTimestamp()
        });
    }
    
    /**
     * 处理接收缓冲区
     */
    processReceiveBuffer() {
        // 查找换行符 \r\n, \n, \r
        let lines = [];
        let lastIndex = 0;
        
        for (let i = 0; i < this.receiveBuffer.length; i++) {
            const char = this.receiveBuffer[i];
            if (char === '\n' || char === '\r') {
                // 找到换行符，提取一行
                let line = this.receiveBuffer.substring(lastIndex, i);
                if (line.length > 0) {
                    // 限制单行最大长度，防止显示异常
                    if (line.length > 200) {
                        // 将过长的行分割成多行
                        while (line.length > 200) {
                            lines.push(line.substring(0, 200));
                            line = line.substring(200);
                        }
                        if (line.length > 0) {
                            lines.push(line);
                        }
                    } else {
                        lines.push(line);
                    }
                }
                
                // 处理 \r\n 的情况，跳过下一个字符如果是配对的换行符
                if (char === '\r' && i + 1 < this.receiveBuffer.length && this.receiveBuffer[i + 1] === '\n') {
                    i++; // 跳过 \n
                }
                
                lastIndex = i + 1;
            }
        }
        
        // 显示完整的行
        lines.forEach(line => {
            this.eventBus.emit('data:display', {
                type: 'received',
                text: line,
                timestamp: this.generateTimestamp()
            });
        });
        
        // 保留未完成的行在缓冲区中
        this.receiveBuffer = this.receiveBuffer.substring(lastIndex);
        
        // 如果缓冲区太大，强制显示并清空（防止内存泄漏）
        if (this.receiveBuffer.length > 500) {
            if (this.receiveBuffer.trim()) {
                let remainingData = this.receiveBuffer;
                // 同样限制长度
                while (remainingData.length > 200) {
                    this.eventBus.emit('data:display', {
                        type: 'received',
                        text: remainingData.substring(0, 200),
                        timestamp: this.generateTimestamp()
                    });
                    remainingData = remainingData.substring(200);
                }
                if (remainingData.length > 0) {
                    this.eventBus.emit('data:display', {
                        type: 'received',
                        text: remainingData,
                        timestamp: this.generateTimestamp()
                    });
                }
            }
            this.receiveBuffer = '';
        }
    }
    
    /**
     * 对显示文本进行安全处理
     */
    sanitizeDisplayText(text) {
        if (!text) return '';
        
        this.eventBus.emit('log:debug', {
            message: '开始处理显示文本',
            data: { input: text }
        });
        
        // 检查是否包含ANSI颜色序列
        const ansiColorRegex = /(?:(?:\x1b|\u001b)\[([0-9;]*)m|\[([0-9;]*)m)/g;
        ansiColorRegex.lastIndex = 0;
        const hasAnsiColors = ansiColorRegex.test(text);
        
        this.eventBus.emit('log:debug', {
            message: 'ANSI颜色检测结果',
            data: { hasAnsiColors }
        });
        
        if (hasAnsiColors) {
            // 如果包含ANSI颜色序列，解析并应用颜色
            return this.parseAnsiColors(text);
        }
        
        // 替换所有控制字符和特殊字符为可见的替代符
        let sanitized = text
            .replace(/\x00/g, '\\0')      // null字符显示为\0
            .replace(/\t/g, '    ')       // tab转换为4个空格
            .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // 其他控制字符
        
        // 限制单行最大显示长度
        if (sanitized.length > 200) {
            sanitized = sanitized.substring(0, 200) + '...';
        }
        
        return sanitized;
    }
    
    /**
     * 解析ANSI颜色序列
     */
    parseAnsiColors(text) {
        this.eventBus.emit('log:debug', {
            message: '开始解析ANSI颜色',
            data: { input: text }
        });
        
        // 支持两种ANSI格式的正则表达式
        const ansiRegex = /(?:(?:\x1b|\u001b)\[([0-9;]*)m|\[([0-9;]*)m)/g;
        let match;
        let currentColor = null;
        let currentBgColor = null;
        let bold = false;
        
        // 查找所有ANSI序列
        while ((match = ansiRegex.exec(text)) !== null) {
            this.eventBus.emit('log:debug', {
                message: '找到ANSI匹配',
                data: { match }
            });
            
            // match[1] 是标准格式的代码，match[2] 是缺少转义字符格式的代码
            const codes = (match[1] || match[2] || '').split(';').filter(code => code !== '');
            
            for (const code of codes) {
                if (code === '0') {
                    // 重置所有样式
                    currentColor = null;
                    currentBgColor = null;
                    bold = false;
                } else if (code === '1') {
                    // 粗体/加亮
                    bold = true;
                } else if (code === '22') {
                    // 关闭粗体
                    bold = false;
                } else if (code === '39') {
                    // 默认前景色
                    currentColor = null;
                } else if (code === '49') {
                    // 默认背景色
                    currentBgColor = null;
                } else if (this.ansiColors[code]) {
                    // 前景色
                    currentColor = this.ansiColors[code];
                } else if (this.ansiBgColors[code]) {
                    // 背景色
                    currentBgColor = this.ansiBgColors[code];
                }
            }
        }
        
        // 移除ANSI序列，保留纯文本
        let cleanText = text.replace(ansiRegex, '');
        
        // 替换其他控制字符
        cleanText = cleanText
            .replace(/\x00/g, '\\0')
            .replace(/\t/g, '    ')
            .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        
        // 限制长度
        if (cleanText.length > 200) {
            cleanText = cleanText.substring(0, 200) + '...';
        }
        
        const result = {
            text: cleanText,
            color: currentColor,
            bgColor: currentBgColor,
            bold: bold,
            hasAnsi: true
        };
        
        this.eventBus.emit('log:debug', {
            message: 'ANSI解析完成',
            data: { result }
        });
        
        return result;
    }
    
    /**
     * 生成时间戳
     */
    generateTimestamp() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' +
               now.getMinutes().toString().padStart(2, '0') + ':' +
               now.getSeconds().toString().padStart(2, '0') + '.' +
               now.getMilliseconds().toString().padStart(3, '0');
    }
    
    /**
     * 清空数据
     */
    clearData() {
        this.receiveBuffer = '';
        this.rxCount = 0;
        this.txCount = 0;
        
        this.eventBus.emit('data:rx-count-updated', 0);
        this.eventBus.emit('data:tx-count-updated', 0);
        this.eventBus.emit('data:cleared');
    }
    
    /**
     * 保存数据
     */
    saveData() {
        this.eventBus.emit('data:save-request');
    }
    
    /**
     * 获取统计信息
     */
    getStats() {
        return {
            rxCount: this.rxCount,
            txCount: this.txCount,
            bufferSize: this.receiveBuffer.length
        };
    }
    
    /**
     * 销毁模块
     */
    destroy() {
        this.receiveBuffer = '';
        this.rxCount = 0;
        this.txCount = 0;
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.DataProcessor = DataProcessor;
} 