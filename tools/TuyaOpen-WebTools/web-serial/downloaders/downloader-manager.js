/**
 * 下载器管理器
 * 统一管理所有芯片下载器的创建和配置
 */
class DownloaderManager {
    constructor() {
        // 支持的芯片列表
        this.supportedChips = {
            T5AI: { 
                displayName: 'T5AI',
                downloader: 'T5Downloader',
                order: 1,
                scriptPath: './downloaders/t5ai/t5ai-downloader.js',
                downloaderClass: 'T5Downloader'
            },
            T3: { 
                displayName: 'T3',
                downloader: 'T5Downloader',
                order: 2,
                scriptPath: './downloaders/t5ai/t5ai-downloader.js',
                downloaderClass: 'T5Downloader'
            },
            T2: { 
                displayName: 'T2',
                downloader: 'T5Downloader',
                order: 3,
                scriptPath: './downloaders/t5ai/t5ai-downloader.js',
                downloaderClass: 'T5Downloader'
            },
            BK7231N: { 
                displayName: 'BK7231N',
                downloader: 'BK7231NDownloader',
                order: 4,
                scriptPath: './downloaders/bk7231n/bk7231n-downloader.js',
                downloaderClass: 'BK7231NDownloader'
            },
            LN882H: { 
                displayName: 'LN882H',
                downloader: 'LN882HDownloader',
                order: 5,
                scriptPath: './downloaders/ln882h/ln882h-downloader.js',
                downloaderClass: 'LN882HDownloader'
            },
            'ESP32-Series': { 
                displayName: 'ESP32-Series',
                downloader: 'ESP32EsptoolJSWrapper',
                order: 6,
                description: '100%使用esptool-js原生功能，支持ESP32全系列芯片自动检测',
                scriptPath: './downloaders/esp32/esp32-esptool-js-wrapper.js',
                downloaderClass: 'ESP32EsptoolJSWrapper'
            }
        };
        
        // 已加载的下载器类
        this.loadedDownloaders = {};
        
        // 当前可见的芯片列表（统一管理）
        this.visibleChips = ['T5AI', 'T3', 'ESP32-Series'];
    }

    /**
     * 获取当前可见的芯片列表
     */
    getVisibleChips() {
        return this.visibleChips;
    }

    /**
     * 设置可见的芯片列表
     */
    setVisibleChips(chipList) {
        this.visibleChips = chipList;
    }

    /**
     * 获取支持的芯片列表
     */
    getSupportedChips() {
        // 使用统一的可见芯片列表
        const visibleChips = this.getVisibleChips();
        
        return Object.keys(this.supportedChips)
            .filter(chipName => visibleChips.includes(chipName)) // 只返回可见的芯片
            .map(chipName => ({
                name: chipName,
                displayName: this.supportedChips[chipName].displayName,
                description: this.supportedChips[chipName].description
            }))
            .sort((a, b) => {
                const orderA = this.supportedChips[a.name].order || 999;
                const orderB = this.supportedChips[b.name].order || 999;
                return orderA - orderB;
            });
    }

    /**
     * 检查芯片是否支持
     */
    isChipSupported(chipName) {
        return chipName in this.supportedChips;
    }

    /**
     * 动态加载下载器脚本
     */
    async loadDownloaderScript(chipName) {
        if (!this.isChipSupported(chipName)) {
            throw new Error(`不支持的芯片类型: ${chipName}`);
        }

        const chipConfig = this.supportedChips[chipName];
        
        // 如果已经加载过，直接返回
        if (this.loadedDownloaders[chipName]) {
            return this.loadedDownloaders[chipName];
        }

        // 首先检查下载器类是否已经在全局范围内可用（静态加载）
        const DownloaderClass = window[chipConfig.downloaderClass];
        console.log(`🔍 检查下载器类: ${chipConfig.downloaderClass}`);
        console.log(`- window[${chipConfig.downloaderClass}]:`, typeof DownloaderClass);
        console.log(`- 是否为函数:`, typeof DownloaderClass === 'function');
        
        if (DownloaderClass && typeof DownloaderClass === 'function') {
            console.log(`✅ 下载器类 ${chipConfig.downloaderClass} 已静态加载`);
            this.loadedDownloaders[chipName] = DownloaderClass;
            return DownloaderClass;
        } else {
            console.log(`❌ 下载器类 ${chipConfig.downloaderClass} 未找到，需要动态加载`);
        }

        try {
            // 动态加载脚本
            console.log(`📥 动态加载下载器脚本: ${chipConfig.scriptPath}`);
            const script = document.createElement('script');
            script.src = chipConfig.scriptPath;
            
            return new Promise((resolve, reject) => {
                script.onload = () => {
                    // 检查下载器类是否已加载
                    const LoadedClass = window[chipConfig.downloaderClass];
                    if (LoadedClass) {
                        console.log(`✅ 下载器类 ${chipConfig.downloaderClass} 动态加载成功`);
                        this.loadedDownloaders[chipName] = LoadedClass;
                        resolve(LoadedClass);
                    } else {
                        reject(new Error(`下载器类 ${chipConfig.downloaderClass} 未找到`));
                    }
                };
                
                script.onerror = () => {
                    reject(new Error(`加载下载器脚本失败: ${chipConfig.scriptPath}`));
                };
                
                document.head.appendChild(script);
            });
        } catch (error) {
            throw new Error(`加载下载器失败: ${error.message}`);
        }
    }

    /**
     * 创建下载器实例
     */
    async createDownloader(chipName, serialPort, debugCallback) {
        if (!this.isChipSupported(chipName)) {
            throw new Error(`不支持的芯片类型: ${chipName}`);
        }

        // 加载下载器类
        const DownloaderClass = await this.loadDownloaderScript(chipName);
        
        // 创建实例
        const downloader = new DownloaderClass(serialPort, debugCallback);
        
        return downloader;
    }

    /**
     * 获取芯片信息
     */
    getChipInfo(chipName) {
        if (!this.isChipSupported(chipName)) {
            return null;
        }
        
        return this.supportedChips[chipName];
    }

    /**
     * 添加新的芯片支持
     */
    addChipSupport(chipName, config) {
        this.supportedChips[chipName] = {
            name: chipName,
            displayName: config.displayName || chipName,
            description: config.description || `${chipName}系列芯片`,
            downloaderClass: config.downloaderClass,
            scriptPath: config.scriptPath
        };
    }

    /**
     * 移除芯片支持
     */
    removeChipSupport(chipName) {
        delete this.supportedChips[chipName];
        delete this.loadedDownloaders[chipName];
    }

    /**
     * 获取所有已加载的下载器
     */
    getLoadedDownloaders() {
        return Object.keys(this.loadedDownloaders);
    }

    /**
     * 清理所有已加载的下载器
     */
    clearLoadedDownloaders() {
        this.loadedDownloaders = {};
    }

    initializeSupportedChips() {
        const deviceSelect = document.getElementById('deviceSelect');
        if (!deviceSelect) {
            console.warn('Device select element not found');
            return;
        }

        // 清空现有选项
        deviceSelect.innerHTML = '';

        // 使用统一的可见芯片列表
        const visibleChips = this.getVisibleChips();

        // 按order字段排序获取支持的芯片，但只显示指定的设备
        const sortedChips = Object.keys(this.supportedChips)
            .filter(chipId => visibleChips.includes(chipId)) // 只显示指定设备
            .map(chipId => ({
                id: chipId,
                ...this.supportedChips[chipId]
            }))
            .sort((a, b) => a.order - b.order);

        // 添加选项
        sortedChips.forEach(chip => {
            const option = document.createElement('option');
            option.value = chip.id;
            option.textContent = chip.displayName;
            deviceSelect.appendChild(option);
        });

        console.log('Visible chips initialized:', sortedChips);
        console.log('All supported chips (including hidden):', Object.keys(this.supportedChips));
    }
}

// 创建全局实例
if (typeof window !== 'undefined') {
    window.DownloaderManager = DownloaderManager;
    window.downloaderManager = new DownloaderManager();
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DownloaderManager;
} 