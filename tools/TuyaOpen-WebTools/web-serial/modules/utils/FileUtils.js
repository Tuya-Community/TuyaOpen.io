/**
 * 文件操作工具模块
 * 提供文件读取、保存等功能
 */
class FileUtils {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.bindEvents();
    }
    
    /**
     * 绑定事件监听
     */
    bindEvents() {
        // 监听HEX转换请求
        this.eventBus.on('data:hex-to-bytes', (data) => {
            try {
                const bytes = this.hexStringToBytes(data.hexString);
                if (data.callback && typeof data.callback === 'function') {
                    data.callback(bytes);
                } else {
                    this.eventBus.emit('data:hex-converted', bytes);
                }
            } catch (error) {
                this.eventBus.emit('error', error);
            }
        });
        
        // 监听文件保存请求
        this.eventBus.on('file:save-text', (data) => {
            this.saveTextToFile(data.content, data.filename, data.mimeType);
        });
        
        this.eventBus.on('file:save-json', (data) => {
            this.saveJsonToFile(data.data, data.filename);
        });
    }
    
    /**
     * 将十六进制字符串转换为字节数组
     */
    hexStringToBytes(hexString) {
        // 移除空格和非十六进制字符
        const cleanHex = hexString.replace(/[^0-9A-Fa-f]/g, '');
        
        if (cleanHex.length % 2 !== 0) {
            throw new Error(i18n.t('hex_length_error'));
        }

        const bytes = new Uint8Array(cleanHex.length / 2);
        for (let i = 0; i < cleanHex.length; i += 2) {
            bytes[i / 2] = parseInt(cleanHex.substr(i, 2), 16);
        }

        return bytes;
    }
    
    /**
     * 读取文件为ArrayBuffer
     */
    readFileAsArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(file);
        });
    }
    
    /**
     * 读取文件为文本
     */
    readFileAsText(file, encoding = 'utf-8') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file, encoding);
        });
    }
    
    /**
     * 保存文本到文件
     */
    saveTextToFile(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        this.downloadBlob(blob, filename);
    }
    
    /**
     * 保存JSON到文件
     */
    saveJsonToFile(data, filename) {
        const content = JSON.stringify(data, null, 2);
        this.saveTextToFile(content, filename, 'application/json');
    }
    
    /**
     * 下载Blob对象
     */
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // 清理URL对象
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);
    }
    
    /**
     * 生成带时间戳的文件名
     */
    generateTimestampedFilename(baseName, extension) {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        return `${baseName}_${timestamp}.${extension}`;
    }
    
    /**
     * 验证文件类型
     */
    validateFileType(file, allowedTypes) {
        if (!allowedTypes.includes(file.type)) {
            throw new Error(`不支持的文件类型: ${file.type}`);
        }
        return true;
    }
    
    /**
     * 验证文件大小
     */
    validateFileSize(file, maxSize) {
        if (file.size > maxSize) {
            throw new Error(`文件过大: ${file.size} > ${maxSize}`);
        }
        return true;
    }
    
    /**
     * 格式化文件大小
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    /**
     * 获取文件扩展名
     */
    getFileExtension(filename) {
        return filename.split('.').pop().toLowerCase();
    }
    
    /**
     * 检查文件是否为二进制文件
     */
    isBinaryFile(filename) {
        const binaryExtensions = ['bin', 'exe', 'dll', 'so', 'dylib', 'img', 'iso'];
        const extension = this.getFileExtension(filename);
        return binaryExtensions.includes(extension);
    }
    
    /**
     * 转义HTML字符
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * 检测浏览器类型
     */
    detectBrowser() {
        const userAgent = navigator.userAgent.toLowerCase();
        const vendor = navigator.vendor.toLowerCase();
        
        // 检测Chrome、Edge、Opera、Brave等基于Chromium的浏览器
        const isChrome = userAgent.includes('chrome') && vendor.includes('google');
        const isEdge = userAgent.includes('edg/') || userAgent.includes('edge/');
        const isOpera = userAgent.includes('opr/') || userAgent.includes('opera/');
        const isBrave = userAgent.includes('brave/');
        const isChromium = userAgent.includes('chromium');
        
        // 排除非Chromium浏览器
        const isFirefox = userAgent.includes('firefox');
        const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');
        const isIE = userAgent.includes('trident') || userAgent.includes('msie');
        
        if (isFirefox) return { name: 'Firefox', isChromium: false };
        if (isSafari) return { name: 'Safari', isChromium: false };
        if (isIE) return { name: 'Internet Explorer', isChromium: false };
        if (isEdge) return { name: 'Edge', isChromium: true };
        if (isOpera) return { name: 'Opera', isChromium: true };
        if (isBrave) return { name: 'Brave', isChromium: true };
        if (isChrome) return { name: 'Chrome', isChromium: true };
        if (isChromium) return { name: 'Chromium', isChromium: true };
        
        return { name: 'Unknown', isChromium: false };
    }
    
    /**
     * 检查Web Serial API支持
     */
    checkWebSerialSupport() {
        return 'serial' in navigator;
    }
    
    /**
     * 复制文本到剪贴板
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.eventBus.emit('notification', { 
                type: 'success', 
                message: '已复制到剪贴板' 
            });
        } catch (error) {
            this.eventBus.emit('notification', { 
                type: 'error', 
                message: '复制失败: ' + error.message 
            });
            throw error;
        }
    }
    
    /**
     * 销毁模块
     */
    destroy() {
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.FileUtils = FileUtils;
} 