---
title: 设备自控指令
---
# **设备自控指令**
# **概念介绍**

### 自控指令

**自控指令** 是指通过用户与设备自身的对话，直接驱动设备执行对应操作的指令集合。适用于具备语音或文本交互能力的智能设备，例如 AI 娃娃、AI 机器人、智能饮水机等。

举例来说，当用户向机器人发出 “向前走”、“跳个舞” 的指令，或对 AI 娃娃说 “把声音调低”、“电量还有多少” 时，系统需要将这些自然语言转化为设备能够识别并执行的控制指令。这些控制能力的实现依赖于设备云端预先设置的自控指令，其作用是在完成语义识别后精准下发指令。

### 表达式

表达式是一组多样化的指令表述，用于匹配用户的自然语言输入。它们与自控指令一一对应，能够提升系统对用户指令的识别率和匹配命中率。

例如，自控指令 “打开灯” 可能对应多个表达式，如 “把灯打开”、“灯开一下”、“开启灯光”、“打开房间灯” 等。通过维护丰富的表达式集合，系统能够识别用户在不同语境下的多样表达方式，并准确触发相应的设备控制动作。

### 自控指令和被控指令的区别

| 类型 | 定义 | 典型场景及表达式 | 指令配置主体 | 控制触发方式 |
| --- | --- | --- | --- | --- |
| **自控指令** | 当前设备 **自己识别语义并执行指令**，用于设备与用户直接对话控制自身功能 | • AI 娃娃：把音量调大、电量查询
• 机器人：向前走、向后走、跳个舞 | 当前设备本身 | 用户对设备说话（语音/文本） |
| **他控指令** | 当前设备 **被其他设备控制**，用于构建跨设备联动控制场景，如音响控制空调等 | • 智能音响控制空调：把空调温度调高
• 灯：把灯光调亮**注意：必须说明控制目标对象** | 被控设备，例如音响控制灯，则灯需要配置被控指令，才能够被音响控制 | 用户对主控设备说话（语音/文本）发起设备控制 |

### 自控指令应用场景

当设备需要具备 **自主理解并响应用户语音/文本指令** 的能力时，应配置自控指令。适用于以下典型场景：

- 设备具备语音交互能力，用户直接与设备对话。如 AI 娃娃、机器人、饮水机等。
    
    示例：“声音调低”、“还剩多少电”
    
- 设备内置控制能力强，可控制自身硬件行为。定制化语义需求强，需支持多种表达说法。
    
    示例：“播放故事”、“跳个舞”、“加热水”。
    
- 支持通过平台自定义表达式、意图和槽位配置。

### 使用案例

**家庭灯光控制**

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1743404357232c546097c.png)

**温控器控制**

当设备对应的 PID 配置了 AI 自控指令，比如温控器、设置了温度指令且智能体配置了 “设备自控” 插件时，与 AI 对话即可实现设备控制。

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1743404481a00087a879c.png)

### 使用条件

- 请使用 [Wukong SDK v3.12.12](https://developer.tuya.com/cn/docs/iot-device-dev/wukongai_version_release?id=Kegae21edhfyb) 及以上版本开发固件，低于该版本不支持自控技能。
- 若使用小程序、面板控制设备，需要使用 App v6.7.0 以上版本。
- 平台配置要求：
    - 产品 AI 能力中绑定智能体，且该智能体已添加 **设备自控技能**。
        
        ![设备自控指令](https://images.tuyacn.com/content-platform/hestia/17501519971947c51b3bb.png)
        
    - 产品完成自控指令 **配置并发布**。**注意，发布后预计 20 分钟左右生效**。

# **第一步：配置 DP 指令**

配置 DP 指令是实现设备自控的基础。

首先，进入 [涂鸦开发者平台](https://platform.tuya.com/)，单击左侧菜单栏上的 **智能体** > **智能体配置** > **AI 控制指令配置**，进入 [**AI 产品指令配置**](https://platform.tuya.com/exp/voice/ai) 页面，然后单击 **自控指令**。

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1750238180bac1eeba1a6.png)

如当前产品已有指令配置，会在页面显示品类已配置的功能指令。可以单击页面下方的 **修改指令方案** 对现有版本的修改进行确认，然后单击 **确定** 并开始指令配置的流程。**请注意，指令方案修改后需要重新发布。**

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1750312103abe9a8cce03.png)

然后，根据需要选择添加 DP 指令或者非 DP 指令。详细配置步骤，请分别参考以下内容：

- [添加 DP 指令](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#DP)
- [添加非 DP 指令](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#NonDP)

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1750146949a2a20a00319.png)

### 添加 DP 指令

DP 指令为用于控制设备的功能点，例如开关、调节亮度、设置模式等。完成 DP 的结构和类型定义后，平台即可自动完成意图解析和指令下发。

首先，单击 **添加指令**，选择 **DP 指令**，然后在 **创建自控指令** 页面完成以下指令配置：

- [选择语种](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#language)
- [选择 DP](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#dp)
- [设置指令类型](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#type)
- [配置同义词](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#synonym)
- [配置表达式](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#expression)
- [表达式配置示例](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#example)
- [保存指令配置](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#save)

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1750238978bab22b1f70d.png)

### 选择语种

选择该指令需要支持的语种，用于后续表达式的本地化匹配。例如：

- 若希望用户以中文进行交互，则需选择 **中文**，并补充中文的表达式。
- 若支持多语种控制，可按需添加多个语种，并为每个语种配置相应表达式。

语言选择影响表达式的匹配效果，请务必根据实际用户使用语言进行配置。

### 选择 DP

在设备的功能定义中选择需要控制的 DP，平台支持以下 DP 类型：

- `Bool`：布尔类型
- `Enum`：枚举类型
- `Value`：数值类型
- `String`：字符串类型

目前暂不支持 `Raw` 类型。

### 设置指令类型

不同的 DP 类型可配置的指令类型不同，详见下表：

| DP 类型 | 可选指令类型 |
| --- | --- |
| Bool | 设置（如：打开、关闭） |
| Enum | 设置（如：切换到某一模式） |
| Value | 设置、调高、调低（如：设置亮度为 80%，调高温度） |
| String | 设置（如：播放特定歌曲） |

### 配置同义词

配置 DP 值的同义词，能够实现表达的统一归一化，让用户用多样化的表述方式都可以准确命中正确指令。

例如：

- DP 值为 `on`，可配置同义词为：`启动`、`激活`、`开启`
- DP 值为 `off`，可配置同义词为：`关闭`、`休眠`、`停止`

配置方式：

- 在每个 DP 值下添加多个同义词。
- 在表达式中使用 `#dpValue#` 占位符动态引用匹配的同义词。

仅布尔、枚举类 DP 支持维护同义词。

### 配置表达式

表达式用于匹配用户的自然语言输入，并触发对应指令。配置建议如下：

- 每条表达式对应一种典型说法，例如：
    - “打开卧室灯”
    - “把风扇调到三档”
- 表达式中可使用占位符提升复用性，如：
    - `#percentValue#` 表示百分比值，适用于数值型 DP。
    - `#dpValue#` 表示 DP 值同义词。

### 表达式配置示例

| 设备类型 | 指令类型 | DP 类型 | 表达式举例（中文） | 表达式举例（英文） | 下发值说明 |
| --- | --- | --- | --- | --- | --- |
| AI 娃娃 | DP | 数值 | 把音量调到#number# | Set the volume to #dpValue# | DP：volume（如 DP ID：101），值 = #number# |
|  | DP | 数值 | 音量调高一点 | Increase the volume a bit | DP：volume，值 = 当前值 + 10（示例） |
|  | DP | 数值 | 降低音量 | Lower the volume | DP：volume，值 = 当前值 - 10（示例） |
| 机器人 | 非DP | - | 向前走 | Move forward | 开发者自定义下发值：forward（示例） |
|  | 非DP | - | 向后退 | Move backward | 开发者自定义下发值：backward（示例） |
|  | 非DP | - | 给我跳个舞 | Do a dance for me | 开发者自定义下发值：dance（示例） |
|  | 非DP | - | 向左转 | Turn left | 开发者自定义下发值：left（示例） |
|  | 非DP | - | 往右边走几步 | Walk a few steps to the right | 开发者自定义下发值：walk（示例） |
- DP 类指令对应设备（如 AI 娃娃）：由平台下发具体的 DP（如 volume），结合表达式中的 `#dpValue#` 占位符动态赋值。
- 非 DP 类型设备（如机器人）：可以自定义动作指令的标识，如 `forward`、`dance`，在设备端进行解析执行。

### 保存指令配置

完成以上配置后，点击保存指令配置，即可在方案列表中看到指令信息。

### 添加非 DP 指令

非 DP 指令适用于特定场景，在此类场景中，设备无需依赖平台定义的 DP，而是借助自定义的控制指令来完成交互。例如机器人、机械臂等具备自定义协议解析能力的设备，就可使用非 DP 指令进行交互。

首先，单击 **添加指令**，选择 **非 DP 指令**。然后，在 **创建自控指令** 页面完成以下配置：

- [选择语种](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#nondplanguage)
- [配置自定义指令 Code](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#nondpcode)
- [配置表达式](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#nondpexpression)
- [配置下发值](https://developer.tuya.com/cn/docs/iot/Self-control?id=Kep3yhifdrvah#nondpvalue)

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1750312605c027e5eb149.png)

### 选择语种

选择指令支持的语种，便于构建多语言的自然语言交互能力。每种语种需要配置对应的表达式。

例如：

- 若设备用户使用中文，则必须配置中文表达式。
- 若支持英文控制，可同时配置英文表达式。

### 配置自定义指令 Code

为每条非 DP 指令配置一个自定义的指令 Code，用于标识设备要执行的具体动作。

**指令 Code** 是设备识别该指令的唯一标识，建议保持其简洁明了。

### 配置表达式

为每个指令配置多个表达式，以支持用户的多样化语音或文字输入。

示例：

| 表达式（中文） | 表达式（英文） |
| --- | --- |
| 向前走 | Move forward |
| 给我跳个舞 | Do a dance for me |
| 向右转一下 | Turn right |

可以使用占位符（如 `#dpValue#`）提升表达式通用性和扩展性。

### 配置下发值

非 DP 指令支持自定义下发值，由设备端自主解析：

- 可下发一个自定义 JSON、字符串或特定协议格式的值。
- 该值由设备开发者定义并实现解析逻辑。

示例：

| 指令 Code | 下发内容（示例） | 说明 |
| --- | --- | --- |
| forward | `{ "action": "move", "dir": "fwd" }` | 向前移动 |
| dance | `"action_dance"` | 执行舞蹈动作（字符串命令） |
| turn_left | `{ "cmd": "turn", "value": "left" }` | 左转动作命令 |
- 平台仅负责将下发值透传给设备，具体执行逻辑需由设备端实现。
- 非 DP 指令提供更大的控制灵活性，适用于自定义协议设备。通过 “自定义表达式 + 指令 Code + 下发值” 的组合，开发者可构建丰富、灵活的人机交互能力。

完成指令方案的配置后，单击页面下方的 **确认配置，前往体验**。

# **第二步：体验配置**

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/175031292138a1c79eefc.png)

参考以下流程进行指令的体验：

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1750299856b5e4fd1d3dc.png)

1. 配置体验账号：单击 **体验账号** 下的 **新增体验账号**，然后在 **配置体验账号** 页面选择要体验语音能力的应用并添加体验账号并保存。最多能配置三个体验账号（白名单账号）。
2. 添加虚拟设备：请使用 OEM App 或者 **智能生活** App 扫码添加虚拟设备。
3. 扫码测试：通过 App 扫码进入 AI 智能助手进行测试。

# **第三步：发布生效**

测试完成后，单击页面下方的 **下一步：发布生效** 来发布指令使其生效。请注意，发布后则无法撤回。确认无误，单击 **确定**。发布后，页面会显示为 **发布生效**。

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1750300008a46302678dc.png)

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/175031329543447a94587.png)

# **版本管理**

可以通过单击 **版本管理** 进入 **历史版本** 页面来查看和编辑指令的发布版本。

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/175031356836e2e1b4cdc.png)

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/1742980696634e83a324e.png)

也可以单击 **新增版本** 来体验配置并发布新的指令版本。

![设备自控指令](https://images.tuyacn.com/content-platform/hestia/17429810955246a10ec9b.png)