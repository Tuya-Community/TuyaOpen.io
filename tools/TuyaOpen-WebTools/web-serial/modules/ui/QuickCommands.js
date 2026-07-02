/**
 * 快捷命令管理模块
 * 负责快捷命令的增删改查、存储管理
 */
class QuickCommands {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.quickCommands = [];
        this.elements = {};
        
        this.initializeElements();
        this.bindEvents();
        this.initializeQuickCommands();
    }
    
    initializeElements() {
        // 快捷按钮相关元素
        this.elements.quickButtonsContainer = document.getElementById('quickButtons');
        this.elements.noQuickCommands = document.getElementById('noQuickCommands');
        this.elements.manageQuickBtn = document.getElementById('manageQuickBtn');
        
        // 快捷发送管理模态框元素
        this.elements.commandName = document.getElementById('commandName');
        this.elements.commandValue = document.getElementById('commandValue');
        this.elements.addCommandBtn = document.getElementById('addCommandBtn');
        this.elements.commandList = document.getElementById('commandList');
        this.elements.noCommands = document.getElementById('noCommands');
        this.elements.resetDefaultBtn = document.getElementById('resetDefaultBtn');
    }
    
    bindEvents() {
        // 快捷发送管理事件
        this.elements.manageQuickBtn?.addEventListener('click', () => {
            this.eventBus.emit('modal:quick-commands-show');
        });

        this.elements.addCommandBtn?.addEventListener('click', () => {
            this.addQuickCommand();
        });

        this.elements.resetDefaultBtn?.addEventListener('click', () => {
            this.resetDefaultCommands();
        });

        // 输入框回车添加命令
        this.elements.commandName?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.addQuickCommand();
            }
        });

        this.elements.commandValue?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.addQuickCommand();
            }
        });
        
        // 监听模块事件
        this.eventBus.on('quick-commands:render-list', () => {
            this.renderCommandList();
        });
        
        this.eventBus.on('quick-commands:add', (command) => {
            this.quickCommands.push(command);
            this.saveQuickCommands();
            this.renderQuickButtons();
        });
        
        this.eventBus.on('quick-commands:delete', (index) => {
            this.deleteCommand(index);
        });
        
        this.eventBus.on('quick-commands:edit', (index) => {
            this.editCommand(index);
        });
        
        this.eventBus.on('quick-commands:save', ({ index, command }) => {
            this.saveCommand(index, command);
        });
        
        this.eventBus.on('quick-commands:cancel-edit', (index) => {
            this.cancelEdit(index);
        });
    }
    
    // =============== 快捷发送管理功能 ===============

    /**
     * 初始化快捷命令
     */
    initializeQuickCommands() {
        // 从localStorage加载保存的命令，如果没有则使用默认命令
        this.quickCommands = this.loadQuickCommands();
        this.renderQuickButtons();
    }

    /**
     * 加载快捷命令
     */
    loadQuickCommands() {
        const saved = localStorage.getItem('quickCommands');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // 使用全局默认命令配置
        return window.DEFAULT_QUICK_COMMANDS || [
            { name: 'AT', value: 'AT' }
        ];
    }

    /**
     * 保存快捷命令
     */
    saveQuickCommands() {
        localStorage.setItem('quickCommands', JSON.stringify(this.quickCommands));
    }

    /**
     * 渲染快捷按钮
     */
    renderQuickButtons() {
        if (!this.elements.quickButtonsContainer) return;
        
        this.elements.quickButtonsContainer.innerHTML = '';
        
        if (this.quickCommands.length === 0) {
            this.elements.noQuickCommands.style.display = 'block';
            return;
        }
        
        this.elements.noQuickCommands.style.display = 'none';
        
        this.quickCommands.forEach((command, index) => {
            const button = document.createElement('button');
            button.className = 'btn btn-small quick-btn';
            button.textContent = command.name;
            button.setAttribute('data-command', command.value);
            button.setAttribute('data-index', index);
            
            button.addEventListener('click', () => {
                // 触发快捷命令执行事件
                this.eventBus.emit('quick-command:execute', {
                    name: command.name,
                    value: command.value
                });
            });
            
            this.elements.quickButtonsContainer.appendChild(button);
        });
    }

    /**
     * 渲染命令列表
     */
    renderCommandList() {
        if (!this.elements.commandList) return;
        
        this.elements.commandList.innerHTML = '';
        
        if (this.quickCommands.length === 0) {
            this.elements.noCommands.style.display = 'block';
            return;
        }
        
        this.elements.noCommands.style.display = 'none';
        
        this.quickCommands.forEach((command, index) => {
            const item = document.createElement('div');
            item.className = 'command-item';
            item.setAttribute('data-index', index);
            
            item.innerHTML = `
                <div class="command-info">
                    <div class="command-name">${this.escapeHtml(command.name)}</div>
                    <div class="command-value">${this.escapeHtml(command.value)}</div>
                </div>
                <div class="command-actions">
                    <button class="btn-edit" onclick="window.serialTerminal.quickCommands.editCommand(${index})">✏️</button>
                    <button class="btn-delete" onclick="window.serialTerminal.quickCommands.deleteCommand(${index})">🗑️</button>
                </div>
            `;
            
            this.elements.commandList.appendChild(item);
        });
    }

    /**
     * 清空添加表单
     */
    clearAddForm() {
        if (this.elements.commandName) {
            this.elements.commandName.value = '';
        }
        if (this.elements.commandValue) {
            this.elements.commandValue.value = '';
        }
        if (this.elements.commandName) {
            this.elements.commandName.focus();
        }
    }

    /**
     * 添加快捷命令
     */
    addQuickCommand() {
        const name = this.elements.commandName?.value.trim();
        const value = this.elements.commandValue?.value.trim();
        
        if (!name || !value) {
            this.eventBus.emit('error', { message: i18n.t('fill_complete_info') });
            return;
        }
        
        // 检查是否重复
        if (this.quickCommands.some(cmd => cmd.name === name)) {
            this.eventBus.emit('error', { message: i18n.t('command_name_exists') });
            return;
        }
        
        // 添加命令
        this.quickCommands.push({ name, value });
        this.saveQuickCommands();
        this.renderQuickButtons();
        this.renderCommandList();
        this.clearAddForm();
        
        this.eventBus.emit('quick-commands:added', { name, value });
    }

    /**
     * 编辑命令
     */
    editCommand(index) {
        const item = this.elements.commandList?.children[index];
        const command = this.quickCommands[index];
        
        if (!item || !command) return;
        
        // 切换到编辑模式
        item.classList.add('editing');
        item.innerHTML = `
            <div class="command-info">
                <input type="text" class="command-name" value="${this.escapeHtml(command.name)}" maxlength="20">
                <input type="text" class="command-value" value="${this.escapeHtml(command.value)}">
            </div>
            <div class="command-actions">
                <button class="btn-save" onclick="window.serialTerminal.quickCommands.saveCommand(${index})">💾</button>
                <button class="btn-cancel" onclick="window.serialTerminal.quickCommands.cancelEdit(${index})">❌</button>
            </div>
        `;
        
        // 聚焦到名称输入框
        const nameInput = item.querySelector('.command-name');
        nameInput?.focus();
        nameInput?.select();
    }

    /**
     * 保存命令编辑
     */
    saveCommand(index, commandData = null) {
        const item = this.elements.commandList?.children[index];
        
        let name, value;
        if (commandData) {
            name = commandData.name;
            value = commandData.value;
        } else {
            const nameInput = item?.querySelector('.command-name');
            const valueInput = item?.querySelector('.command-value');
            name = nameInput?.value.trim();
            value = valueInput?.value.trim();
        }
        
        if (!name || !value) {
            this.eventBus.emit('error', { message: i18n.t('fill_complete_info') });
            return;
        }
        
        // 检查是否与其他命令重复（排除自己）
        if (this.quickCommands.some((cmd, i) => i !== index && cmd.name === name)) {
            this.eventBus.emit('error', { message: i18n.t('command_name_exists') });
            return;
        }
        
        // 更新命令
        this.quickCommands[index] = { name, value };
        this.saveQuickCommands();
        this.renderQuickButtons();
        this.renderCommandList();
        
        this.eventBus.emit('quick-commands:updated', { index, name, value });
    }

    /**
     * 取消编辑
     */
    cancelEdit(index) {
        this.renderCommandList();
    }

    /**
     * 删除命令
     */
    deleteCommand(index) {
        if (confirm(i18n.t('delete_command_confirm'))) {
            const deletedCommand = this.quickCommands[index];
            this.quickCommands.splice(index, 1);
            this.saveQuickCommands();
            this.renderQuickButtons();
            this.renderCommandList();
            
            this.eventBus.emit('quick-commands:deleted', { index, command: deletedCommand });
        }
    }

    /**
     * 恢复默认命令
     */
    resetDefaultCommands() {
        if (confirm(i18n.t('reset_commands_confirm'))) {
            this.quickCommands = window.DEFAULT_QUICK_COMMANDS || [
                { name: 'AT', value: 'AT' }
            ];
            this.saveQuickCommands();
            this.renderQuickButtons();
            this.renderCommandList();
            
            this.eventBus.emit('quick-commands:reset');
        }
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
     * 获取所有快捷命令
     */
    getCommands() {
        return [...this.quickCommands];
    }
    
    /**
     * 销毁模块
     */
    destroy() {
        this.elements = {};
        this.quickCommands = [];
        this.eventBus = null;
    }
}

// 导出
if (typeof window !== 'undefined') {
    window.QuickCommands = QuickCommands;
} 