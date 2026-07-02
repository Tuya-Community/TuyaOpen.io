/**
 * 日志工具模块
 * 提供统一的日志记录功能
 */
class Logger {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.logLevel = 'info'; // debug, info, warn, error
        this.logs = [];
        this.maxLogs = 1000; // 最大日志条数
        
        this.bindEvents();
    }
    
    bindEvents() {
        // 监听调试模式切换
        this.eventBus.on('debug:toggle', (enabled) => {
            this.logLevel = enabled ? 'debug' : 'info';
            this.debug('调试模式', enabled ? '已启用' : '已禁用');
        });
    }
    
    /**
     * 记录日志
     */
    log(level, message, data = null) {
        const timestamp = this.generateTimestamp();
        const logEntry = {
            timestamp,
            level,
            message,
            data,
            id: Date.now() + Math.random()
        };
        
        // 添加到日志数组
        this.logs.push(logEntry);
        
        // 限制日志数量
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        
        // 根据日志级别决定是否输出
        if (this.shouldLog(level)) {
            this.outputLog(logEntry);
        }
        
        // 触发日志事件
        this.eventBus.emit('log:added', logEntry);
    }
    
    /**
     * 调试日志
     */
    debug(message, data = null) {
        this.log('debug', message, data);
    }
    
    /**
     * 信息日志
     */
    info(message, data = null) {
        this.log('info', message, data);
    }
    
    /**
     * 警告日志
     */
    warn(message, data = null) {
        this.log('warn', message, data);
    }
    
    /**
     * 错误日志
     */
    error(message, data = null) {
        this.log('error', message, data);
    }
    
    /**
     * 判断是否应该记录此级别的日志
     */
    shouldLog(level) {
        const levels = { debug: 0, info: 1, warn: 2, error: 3 };
        return levels[level] >= levels[this.logLevel];
    }
    
    /**
     * 输出日志到控制台
     */
    outputLog(logEntry) {
        const { timestamp, level, message, data } = logEntry;
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
        
        const style = this.getLogStyle(level);
        
        if (data) {
            console.groupCollapsed(`%c${prefix} ${message}`, style);
            console.log(data);
            console.groupEnd();
        } else {
            console.log(`%c${prefix} ${message}`, style);
        }
    }
    
    /**
     * 获取日志样式
     */
    getLogStyle(level) {
        const styles = {
            debug: 'color: #6b7280; font-size: 12px;',
            info: 'color: #2563eb; font-size: 12px;',
            warn: 'color: #d97706; font-size: 12px; font-weight: bold;',
            error: 'color: #dc2626; font-size: 12px; font-weight: bold;'
        };
        return styles[level] || styles.info;
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
     * 获取所有日志
     */
    getLogs(level = null) {
        if (level) {
            return this.logs.filter(log => log.level === level);
        }
        return [...this.logs];
    }
    
    /**
     * 清空日志
     */
    clear() {
        this.logs = [];
        this.eventBus.emit('log:cleared');
    }
    
    /**
     * 导出日志
     */
    export(format = 'text') {
        if (format === 'json') {
            return JSON.stringify(this.logs, null, 2);
        }
        
        return this.logs.map(log => {
            const dataStr = log.data ? ` | ${JSON.stringify(log.data)}` : '';
            return `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}${dataStr}`;
        }).join('\n');
    }
    
    /**
     * 设置日志级别
     */
    setLevel(level) {
        if (['debug', 'info', 'warn', 'error'].includes(level)) {
            this.logLevel = level;
            this.info('日志级别已设置', level);
        }
    }
    
    /**
     * 销毁模块
     */
    destroy() {
        this.logs = [];
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.Logger = Logger;
} 