以上[实战](/learn/tuyaopen-ide-practice-1)中大部分操作都可以用 TuyaOpen IDE 直接安装的 **Skills** 完成，大大提高开发效率。下面按场景给你可以直接复制粘贴的提示词。

![Vibe Coding 技能总览](/img/ide/get-started/vibe-coding-skills-overview.png)

<section id="hardware" className="section">

## 1. 硬件外设（最推荐先玩）

触发 **`hardware-vibe-coding`**，它会先读板子的引脚资源、跟你确认、再写代码。任何"让硬件动起来"的需求都走这里。

```text
在板子上点亮 LED，做呼吸灯效果。
初始化一个按键，短按切换开关、长按复位。
这块板子带 3.5 寸 LCD，在屏幕中央显示 "Hello Tuya" 并每秒刷新一个计数。
通过串口（UART）每秒打印一行 "alive"，我在 PC 上能看到。
读一个 ADC 引脚的电压，把值打印到日志。
```

</section>

<section id="product" className="section">

## 2. 端到端做一个 IoT 产品

触发 **`smart-product-dev`**，从需求一路带到平台建产品、建 DP、生成固件。

```text
我想做一个"智能小夜灯"，带开关、亮度调节、定时关灯，帮我从头做到能烧录。
下一步该干什么？（它会根据当前 scaffolded 状态给出后续步骤。）
```

</section>

<section id="platform" className="section">

## 3. Tuya 开发者平台操作（产品 / DP / PID）

触发 **`tuya-iot-platform`**，通过 CLI 操作你绑定的产品。

```text
查一下我当前绑定的产品 sqgdjgvuhuqc7qa2 有哪些功能点（DP）。
给这个产品新增一个 DP：bool 类型，code 叫 switch_1，名称"开关"。
列出我在平台上有哪些产品。
```

</section>

<section id="dev-loop" className="section">

## 4. 构建 / 烧录 / 调试闭环

触发 **`tuyaopen-dev-loop`**、**`tuyaopen-build`**、**`tuyaopen-debug-helper`**。

```text
帮我编译一下固件。
后台开始抓设备串口日志，跑起来后告诉我有没有 ERROR。
进入开发闭环：构建 → 烧录 → 监控日志，分析报错并迭代修复。
检查一下代码格式是否合规。
```

</section>

<section id="panel" className="section">

## 5. 小程序 / 设备面板（如果后续要做 App 侧）

触发 **`smart-panel-dev`**（总入口），它会再分流到灯具、插座、扫地机、IPC 等品类。

```text
帮我给这个设备做一个控制面板小程序。
在面板里加一个用电量统计图表（触发 charts-library / energy-stats）。
帮我写一份这个设备的小程序面板 PRD 需求文档。
```

</section>

<section id="next" className="section">

## 下一步

准备好自建云端 Agent？参阅 [Agent 开发指南](/learn/tuyaopen-ide-agent-dev)。

</section>
