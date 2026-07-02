// 多语言验证工具
class I18nValidator {
    constructor() {
        this.requiredKeys = new Set();
        this.languageData = {};
        this.errors = [];
        this.warnings = [];
    }
    
    // 添加必需的翻译键
    addRequiredKeys(keys) {
        keys.forEach(key => this.requiredKeys.add(key));
    }
    
    // 添加语言数据
    addLanguage(langCode, data) {
        this.languageData[langCode] = data;
        
        // 如果这是第一个语言，将其键作为必需键
        if (this.requiredKeys.size === 0) {
            Object.keys(data).forEach(key => this.requiredKeys.add(key));
        }
    }
    
    // 验证所有语言
    validate() {
        this.errors = [];
        this.warnings = [];
        
        const languages = Object.keys(this.languageData);
        const baseLanguage = 'zh'; // 使用中文作为基准
        
        if (!this.languageData[baseLanguage]) {
            this.errors.push(`Base language '${baseLanguage}' not found`);
            return this.getValidationResult();
        }
        
        // 验证每种语言
        languages.forEach(langCode => {
            this.validateLanguage(langCode, baseLanguage);
        });
        
        return this.getValidationResult();
    }
    
    // 验证单个语言
    validateLanguage(langCode, baseLanguage) {
        const data = this.languageData[langCode];
        const baseData = this.languageData[baseLanguage];
        
        // 检查缺失的键
        this.requiredKeys.forEach(key => {
            if (!data[key]) {
                this.errors.push(`Language '${langCode}': Missing key '${key}'`);
            }
        });
        
        // 检查多余的键
        Object.keys(data).forEach(key => {
            if (!this.requiredKeys.has(key)) {
                this.warnings.push(`Language '${langCode}': Extra key '${key}'`);
            }
        });
        
        // 检查占位符匹配
        Object.keys(data).forEach(key => {
            if (baseData[key] && data[key]) {
                this.validatePlaceholders(langCode, key, baseData[key], data[key]);
            }
        });
        
        // 检查空值
        Object.keys(data).forEach(key => {
            if (!data[key] || data[key].trim() === '') {
                this.warnings.push(`Language '${langCode}': Empty value for key '${key}'`);
            }
        });
    }
    
    // 验证占位符
    validatePlaceholders(langCode, key, baseText, text) {
        const basePlaceholders = this.extractPlaceholders(baseText);
        const placeholders = this.extractPlaceholders(text);
        
        // 检查占位符数量
        if (basePlaceholders.length !== placeholders.length) {
            this.warnings.push(
                `Language '${langCode}', key '${key}': Placeholder count mismatch. ` +
                `Expected ${basePlaceholders.length}, got ${placeholders.length}`
            );
            return;
        }
        
        // 检查占位符顺序
        for (let i = 0; i < basePlaceholders.length; i++) {
            if (basePlaceholders[i] !== placeholders[i]) {
                this.warnings.push(
                    `Language '${langCode}', key '${key}': Placeholder mismatch. ` +
                    `Expected '${basePlaceholders[i]}', got '${placeholders[i]}'`
                );
            }
        }
    }
    
    // 提取占位符
    extractPlaceholders(text) {
        const placeholderRegex = /\{(\d+)\}/g;
        const placeholders = [];
        let match;
        
        while ((match = placeholderRegex.exec(text)) !== null) {
            placeholders.push(match[0]);
        }
        
        return placeholders.sort();
    }
    
    // 获取验证结果
    getValidationResult() {
        return {
            isValid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings,
            stats: this.getStatistics()
        };
    }
    
    // 获取统计信息
    getStatistics() {
        const languages = Object.keys(this.languageData);
        const stats = {
            totalLanguages: languages.length,
            totalKeys: this.requiredKeys.size,
            completeness: {}
        };
        
        languages.forEach(langCode => {
            const data = this.languageData[langCode];
            const completedKeys = Array.from(this.requiredKeys).filter(key => 
                data[key] && data[key].trim() !== ''
            ).length;
            
            stats.completeness[langCode] = {
                completed: completedKeys,
                total: this.requiredKeys.size,
                percentage: Math.round((completedKeys / this.requiredKeys.size) * 100)
            };
        });
        
        return stats;
    }
    
    // 生成报告
    generateReport() {
        const result = this.validate();
        let report = '# 多语言验证报告\n\n';
        
        // 总体状态
        report += `## 验证状态: ${result.isValid ? '✅ 通过' : '❌ 失败'}\n\n`;
        
        // 统计信息
        report += '## 统计信息\n';
        report += `- 总语言数: ${result.stats.totalLanguages}\n`;
        report += `- 总键数: ${result.stats.totalKeys}\n\n`;
        
        // 完成度
        report += '## 语言完成度\n';
        Object.entries(result.stats.completeness).forEach(([lang, stats]) => {
            const status = stats.percentage === 100 ? '✅' : stats.percentage >= 90 ? '⚠️' : '❌';
            report += `- ${lang}: ${status} ${stats.completed}/${stats.total} (${stats.percentage}%)\n`;
        });
        report += '\n';
        
        // 错误
        if (result.errors.length > 0) {
            report += '## ❌ 错误\n';
            result.errors.forEach(error => {
                report += `- ${error}\n`;
            });
            report += '\n';
        }
        
        // 警告
        if (result.warnings.length > 0) {
            report += '## ⚠️ 警告\n';
            result.warnings.forEach(warning => {
                report += `- ${warning}\n`;
            });
            report += '\n';
        }
        
        return report;
    }
}

// 如果在浏览器环境中，添加到全局
if (typeof window !== 'undefined') {
    window.I18nValidator = I18nValidator;
} 