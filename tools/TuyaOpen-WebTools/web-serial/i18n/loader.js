// 多语言加载器
class I18nLoader {
    constructor() {
        this.loadedLanguages = new Set();
        this.availableLanguages = {
            'zh': 'i18n/languages/zh.js',
            'en': 'i18n/languages/en.js', 
            'ja': 'i18n/languages/ja.js',
            'zh-tw': 'i18n/languages/zh-tw.js',
            'ko': 'i18n/languages/ko.js',
            'ru': 'i18n/languages/ru.js',
            'pt': 'i18n/languages/pt.js',
            'es': 'i18n/languages/es.js',
            'de': 'i18n/languages/de.js',
            'fr': 'i18n/languages/fr.js'
        };
        this.currentLanguage = 'zh';
        
        // 初始化全局语言存储
        window.i18nLanguages = window.i18nLanguages || {};
    }
    
    // 异步加载语言文件
    async loadLanguage(langCode) {
        if (this.loadedLanguages.has(langCode)) {
            return true; // 已加载
        }
        
        const scriptPath = this.availableLanguages[langCode];
        if (!scriptPath) {
            console.warn(`Language ${langCode} not available`);
            return false;
        }
        
        try {
            await this.loadScript(scriptPath);
            this.loadedLanguages.add(langCode);
            console.log(`Language ${langCode} loaded successfully`);
            return true;
        } catch (error) {
            console.error(`Failed to load language ${langCode}:`, error);
            return false;
        }
    }
    
    // 动态加载脚本
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // 获取翻译文本
    t(key, ...args) {
        const langData = window.i18nLanguages[this.currentLanguage];
        if (!langData) {
            console.warn(`Language ${this.currentLanguage} not loaded`);
            return key;
        }
        
        let text = langData[key];
        if (!text) {
            // 回退到中文
            const fallbackData = window.i18nLanguages['zh'];
            text = fallbackData ? fallbackData[key] : key;
        }
        
        // 处理占位符替换
        if (text && args.length > 0) {
            args.forEach((arg, index) => {
                text = text.replace(`{${index}}`, arg);
            });
        }
        
        return text || key;
    }
    
    // 切换语言
    async setLanguage(langCode) {
        // 加载语言文件
        const loaded = await this.loadLanguage(langCode);
        if (loaded) {
            this.currentLanguage = langCode;
            // 统一使用 selectedLanguage 作为存储键名
            localStorage.setItem('selectedLanguage', langCode);
            this.updatePageText();
            this.updatePageTitle();
            
            // 触发语言变更事件
            const event = new CustomEvent('languageChanged', { 
                detail: { language: langCode } 
            });
            window.dispatchEvent(event);
            
            return true;
        }
        return false;
    }
    
    // 更新页面文本
    updatePageText() {
        // 更新所有带有 data-i18n 属性的元素
        this.updateElements();
        
        // 更新所有带有 data-i18n-placeholder 属性的元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // 更新所有带有 data-i18n-title 属性的元素
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
        
        // 动态更新页面标题
        this.updatePageTitle();
    }
    
    // 获取当前语言
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // 预加载常用语言
    async preloadLanguages(languages = ['zh', 'en']) {
        const promises = languages.map(lang => this.loadLanguage(lang));
        await Promise.all(promises);
    }
    
    // 获取已加载的语言列表
    getLoadedLanguages() {
        return Array.from(this.loadedLanguages);
    }
    
    // 获取可用语言列表
    getAvailableLanguages() {
        return Object.keys(this.availableLanguages);
    }
    
    // 检查语言是否已加载
    isLanguageLoaded(langCode) {
        return this.loadedLanguages.has(langCode);
    }
    
    // 检测系统默认语言
    detectSystemLanguage() {
        // 获取浏览器语言设置
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        console.log('检测到系统语言:', browserLang);
        
        // 语言映射表：将浏览器语言代码映射到我们支持的语言
        const languageMap = {
            'zh': 'zh',           // 中文
            'zh-CN': 'zh',        // 简体中文
            'zh-Hans': 'zh',      // 简体中文
            'zh-TW': 'zh-tw',     // 繁体中文
            'zh-Hant': 'zh-tw',   // 繁体中文
            'en': 'en',           // 英文
            'en-US': 'en',        // 美式英文
            'en-GB': 'en',        // 英式英文
            'ja': 'ja',           // 日文
            'ja-JP': 'ja',        // 日文
            'ko': 'ko',           // 韩文
            'ko-KR': 'ko',        // 韩文
            'fr': 'fr',           // 法文
            'fr-FR': 'fr',        // 法文
            'de': 'de',           // 德文
            'de-DE': 'de',        // 德文
            'es': 'es',           // 西班牙文
            'es-ES': 'es',        // 西班牙文
            'pt': 'pt',           // 葡萄牙文
            'pt-BR': 'pt',        // 巴西葡萄牙文
            'pt-PT': 'pt',        // 葡萄牙文
            'ru': 'ru',           // 俄文
            'ru-RU': 'ru'         // 俄文
        };
        
        // 首先尝试完整匹配
        let detectedLang = languageMap[browserLang];
        
        // 如果完整匹配失败，尝试匹配语言代码的前两位
        if (!detectedLang) {
            const langPrefix = browserLang.split('-')[0];
            detectedLang = languageMap[langPrefix];
        }
        
        // 如果仍然没有匹配，回退到英文
        if (!detectedLang) {
            console.log('系统语言不支持，回退到英文');
            detectedLang = 'en';
        }
        
        console.log('映射后的语言:', detectedLang);
        return detectedLang;
    }

    // 初始化
    async init() {
        // 检查URL参数中的语言设置
        const urlParams = new URLSearchParams(window.location.search);
        const langFromUrl = urlParams.get('lang');
        
        // 检查全局语言管理器
        const globalLang = window.globalLangManager ? window.globalLangManager.getCurrentLanguage() : null;
        
        // 从localStorage读取用户偏好语言
        const savedLang = localStorage.getItem('selectedLanguage');
        
        // 检测系统默认语言
        const systemLang = this.detectSystemLanguage();
        
        // 确定要使用的语言（优先级：URL参数 > 全局管理器 > 用户保存的偏好 > 系统语言）
        const targetLang = langFromUrl || globalLang || savedLang || systemLang;
        
        console.log('语言选择过程:', {
            urlParam: langFromUrl,
            globalManager: globalLang,
            savedPreference: savedLang,
            systemDetected: systemLang,
            finalChoice: targetLang
        });
        
        // 预加载中文（作为回退语言）
        await this.loadLanguage('zh');
        
        // 如果目标语言不是中文，也加载它
        if (targetLang !== 'zh') {
            const loaded = await this.loadLanguage(targetLang);
            if (!loaded) {
                // 如果目标语言加载失败，回退到英文
                console.warn(`语言 ${targetLang} 加载失败，回退到英文`);
                await this.loadLanguage('en');
                this.currentLanguage = 'en';
            } else {
                this.currentLanguage = targetLang;
            }
        } else {
            this.currentLanguage = targetLang;
        }
        
        // 如果URL中有语言参数，同步到全局管理器
        if (langFromUrl && window.globalLangManager) {
            window.globalLangManager.setLanguage(langFromUrl);
        } else if (!savedLang) {
            // 如果没有保存的偏好，保存检测到的语言
            localStorage.setItem('selectedLanguage', this.currentLanguage);
        }
        
        // 监听全局语言变化事件
        this.setupGlobalLanguageSync();
        
        // 更新页面文本
        this.updatePageText();
        
        // 触发语言设置完成事件，通知UI更新
        const event = new CustomEvent('i18nReady', { 
            detail: { language: this.currentLanguage } 
        });
        window.dispatchEvent(event);
        
        console.log('多语言系统初始化完成，当前语言:', this.currentLanguage);
    }
    
    // 设置全局语言同步
    setupGlobalLanguageSync() {
        window.addEventListener('globalLanguageChanged', (e) => {
            const newLanguage = e.detail.language;
            console.log('TuyaOpen接收到全局语言变化事件:', newLanguage);
            if (this.availableLanguages[newLanguage] && newLanguage !== this.currentLanguage) {
                this.setLanguage(newLanguage);
            }
        });
    }

    updatePageTitle() {
        // 更新页面标题
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement && titleElement.dataset.i18n) {
            const translatedTitle = this.t(titleElement.dataset.i18n);
            document.title = translatedTitle;
        }
    }

    updateElements() {
        // 更新所有带有 data-i18n 属性的元素（包括隐藏的元素）
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.t(key);
            
            // 对于option元素，需要特殊处理
            if (element.tagName.toLowerCase() === 'option') {
                element.textContent = text;
            } else {
                element.textContent = text;
            }
        });
    }
}

// 创建全局实例
window.i18nLoader = new I18nLoader();

// 为了兼容现有代码，创建简化的i18n对象
window.i18n = {
    t: (...args) => window.i18nLoader.t(...args),
    setLanguage: (lang) => window.i18nLoader.setLanguage(lang),
    getCurrentLanguage: () => window.i18nLoader.getCurrentLanguage(),
    updatePageText: () => window.i18nLoader.updatePageText()
}; 