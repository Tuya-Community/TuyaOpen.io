/**
 * 事件总线 - 模块间通信的核心
 * 用于解耦各模块之间的依赖关系
 */
class EventBus {
    constructor() {
        this.events = {};
    }

    /**
     * 订阅事件
     * @param {string} eventName 事件名称
     * @param {function} callback 回调函数
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    /**
     * 取消订阅事件
     * @param {string} eventName 事件名称
     * @param {function} callback 回调函数
     */
    off(eventName, callback) {
        if (!this.events[eventName]) return;
        
        this.events[eventName] = this.events[eventName].filter(
            cb => cb !== callback
        );
    }

    /**
     * 触发事件
     * @param {string} eventName 事件名称
     * @param {*} data 事件数据
     */
    emit(eventName, data) {
        if (!this.events[eventName]) return;
        
        this.events[eventName].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Event handler error for ${eventName}:`, error);
            }
        });
    }

    /**
     * 一次性事件订阅
     * @param {string} eventName 事件名称
     * @param {function} callback 回调函数
     */
    once(eventName, callback) {
        const onceCallback = (data) => {
            callback(data);
            this.off(eventName, onceCallback);
        };
        this.on(eventName, onceCallback);
    }

    /**
     * 清空所有事件监听器
     */
    clear() {
        this.events = {};
    }

    /**
     * 获取事件统计信息
     */
    getStats() {
        const stats = {};
        for (const eventName in this.events) {
            stats[eventName] = this.events[eventName].length;
        }
        return stats;
    }
}

// 创建全局事件总线实例
const eventBus = new EventBus();

// 导出
if (typeof window !== 'undefined') {
    window.EventBus = EventBus;
    window.eventBus = eventBus;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EventBus, eventBus };
} 