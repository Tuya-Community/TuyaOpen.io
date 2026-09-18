---
title: Lua 스크립팅
description: "TClaw 에이전트는 Lua 5.5 스크립트를 작성하고 lua run script MCP 도구 - sandbox 규칙, GPIO 및 지연 모듈을 통해 장치에서 실행합니다."
keywords:
  - tclaw
  - lua
  - lua_run_script
  - sandbox
  - mcp tool
---

# 루아 스크립트
TClaw는 ** 루아 5.5 ** 해석기를 포함 하 고 1 MCP로 에이전트에 노출
도구, `lua_run_script`. 에이전트는 앞의 상황에 대한 짧은 스크립트를 작성
그것의 장치가 실행하고, 어떤 스크립트 `print`s가 다시 온다
도구 결과.

노동의 부서는 흥미로운 부분입니다 :

- ** Lua 기능으로 장치 기능을 랩 - `gpio.set_level`,
`delay.delay_ms`, 그리고 당신이 추가하는 다른 어떤. 이것은 primitives입니다.
- ** 대리인 **는 그(것)들을 결합한 논리를, 순간 그것 필요로 합니다.

그것은 정상적인 MCP 공구에서 다른 모양입니다. 도구는 기능입니다.
예상, C에서 구현, 및 펌웨어에서 배송 — 한 호출, 한 고정
행동. 스크립트는 점*에 에이전트 *composes 기능입니다. 그래서 널
그것은 핀과 수면만 할 수 있습니다 여전히 버튼을 debounce, 타이밍을 방출
패턴, 레벨이 정착 될 때까지, 또는 변환 및 임계 값 읽기 - 없음
그것을 위해 작성된 도구, 그리고 reflash.

장치를 더 할 수있는 방법을 의미하는 것은 primitives를 추가하는 것입니다.
회사 소개 모든 Lua 기능 당신은 에이전트가 할 수있는 multiplies를 노출
그것에서 improvise.

## 그 장소를 적립할 때
좋은 적합:

- Arithmetic, 단위 변환, 끈 또는 테이블 조작, UTF-8 취급.
- 여러 변수를 하나의 결정으로 축소하고 답을 반환합니다.
- JSON 문자열에서 필드를 선택하면 다른 도구가 이미 fetched.
- 실제 논리와 GPIO 운전 - 루프, 조건, 타이밍 - 오히려 하나
도구 통화당 고정 작업.

Poor fits -이 샌드 박스가 제공하는 것 밖에있다 :

- Filesystem, 네트워크, 카메라 또는 디스플레이 액세스.
- 몇 초 이상 실행하는 것은 아무것도.
- 통화 사이의 이동 상태. 모든 invocation는 신선한 해석기를 가져옵니다;
글로벌 및 모듈은 생존하지 않습니다.

## 함께 맞는 방법
3개의 층, 그것은 또한 왜 늘리기 때문에:

```
Cloud LLM
   │  MCP tool call: lua_run_script { code, timeout_ms }
   ▼
tools/tool_lua.c          MCP wrapper — output capture, timeout, result string
   ▼
components/lua/port/      sandbox runtime — safe library subset, module loading,
                          print() capture, timeout hook, traceback
   ▼
components/lua/modules/   hardware modules — gpio, delay, and anything you add
   ▼
TuyaOpen tkl_* / tal_*    the actual hardware APIs
```

Modules는 init에서 작은 테이블에 등록
(`lua_module_register(name, luaopen_fn)`) 및 등록된 런타임로드
각 신선한 해석기에 단위. `LUA_MODULE_REGISTRY_MAX` (16) 단위까지.

## 각 통화에 무슨 일이 일어나는지
모든 `lua_run_script` 통화는 전체 해석기를 구축하고 소스를 실행하고,
그것을 멀리 던져:

1. ** `claw_malloc`-backed allocator와 함께 신선한 `lua_State`**를 선택하십시오.
스크립트 메모리는 `ENABLE_EXT_RAM`가 켜지면 PSRAM에서 온다.
2. ** sandboxed library subset** - 안전한 표준 라이브러리만 엽니다.
3. **로드 모든 등록 모듈 ** 그 상태로, 그래서 `gpio`, `delay` 및
당신이 추가한 것은 세계로 준비되어 있습니다.
4. ** `print()` ** 출력 버퍼에 추가 된 폐쇄
제품정보
5. ** 디버그 훅 ** 모든 100 바이트 코드 지침과 낙관
한 번의 벽시 마감이 전달됩니다.
6. ** 컴파일 및 실행 ** 텍스트 전용 모드에서 소스 - precompiled bytecode는
rejected — 그 후 상태를 닫고 캡처 된 출력을 반환합니다.

두 가지 것들은 다음과 같습니다. 런웨이 스크립트는 장치를 걸 수 없습니다 — 단계 5's
Hook은 무엇을 할 것인지에 관계없이 중단합니다. 스크립트가 남길 수 없습니다.
뒤에 무엇이든: 국가, 세계적인 및 단위는 해석기로, 이렇게 각 죽습니다
전화는 컨벤션에 의해 오히려 건축에 의해 자주적입니다.

## 그것을 활성화
그것은 걸립니다 ** 2 ** 옵션, 아니 하나. `ENABLE_LUA`는 해석기를 컴파일한다;
`ENABLE_LUA_TOOL`는 에이전트가 도달 할 수있는 MCP 도구를 등록합니다. 설치하기
첫 번째는 당신에게 해석가 아무것도 호출 할 수 있습니다.

```bash
CONFIG_ENABLE_LUA=y
CONFIG_ENABLE_LUA_TOOL=y             # required: registers lua_run_script
CONFIG_ENABLE_LUA_MODULE_GPIO=y      # optional: gpio.* in scripts
CONFIG_ENABLE_LUA_MODULE_DELAY=y     # optional: delay.* in scripts
```

`menuconfig`에서 그들은 다른 메뉴에 앉습니다: `ENABLE_LUA`와 2 단위
*Enable Embedded Lua 5.5 해석기 * 및 `ENABLE_LUA_TOOL` 아래 옵션
*Tools (Filesystem) 구성 *.

|옵션 정보|기본 정보|이름 *|
| :-- | :-- | :-- |
|`ENABLE_LUA`를|뚱 베어|루아 5.5 해석기 컴파일|
|`ENABLE_LUA_TOOL`를|뚱 베어|`lua_run_script` MCP 툴 등록 ( `ENABLE_LUA` 필요)|
|`LUA_OUTPUT_BUFFER_SIZE`를| `4096` |truncation의 앞에 `print()`에서 붙잡는 최대 바이트|
|`LUA_DEFAULT_TIMEOUT_MS`를| `3000` |모형이 1을 통과하지 않는 때 벽시 예산|
|`ENABLE_LUA_MODULE_GPIO`를|뚱 베어|노출 `gpio.*`|
|`ENABLE_LUA_MODULE_DELAY`를|뚱 베어|노출 `delay.*`|

`ENABLE_LUA`를 끄는 상태에서, 해석기 또는 공구 래퍼는 컴파일되지 않습니다
에서, 그래서 기능 비용 아무것도.

:::기사
배송되지 않은 보드 설정은 루아를 활성화하므로 ** 사전 제작 된 릴리스 이미지는하지 않습니다.
포함**. 이 기능을 사용하려면 소스 빌드가 필요합니다.
:::

## 샌드박스
해석기는 deliberately 작습니다 — 대리인은 당신이 가지고 있는 부호를 쓰고 있습니다
검토된, 그래서 폭발 반경은 건축 시간에 오히려 신뢰 보다는 조정됩니다
실행 시간. 유효한:

- 표준 라이브러리 하위 세트 : 기본, `string`, `table`, `math`, `utf8`, `coroutine`.
- `os` 서브셋 - ** `os.time()` 및 `os.date()`.

사용할 수 없음: `io`, `package` / `require`, `debug`, 어떤 네트워크 또는 포탄
접속하다 `os.execute`, `os.remove`, `os.rename`, `os.exit`, `os.getenv` 모두
제거. Pre-compiled bytecode는 거부됩니다. - 텍스트 소스 만.

:::워닝[Known gap]
기본 라이브러리는 현재 전체적으로로드되므로 `load`, `dofile` 및 `loadfile`
여전히 스크립트에 도달. `load`는 스크립트가 이미 없을 수 없다.
할, 그러나 `dofile`와 `loadfile`는 C `fopen`를 통해 이동 - Linux와 라즈베리에
실제 호스트 파일 시스템에 대한 액세스를 읽는 표적. 이 때까지
강화, 완전히 밀봉하는 것보다 "네트워크 없음, 쉘 없음"으로 sandbox를 치료.
:::

내부화의 두 가지 결과 :

- **`print()`는 출력 채널입니다.** 어떤 스크립트가 인쇄되지 않습니다
콜러에 보이지 않는. `LUA_OUTPUT_BUFFER_SIZE`를 넘어서 산출은 삭감되고,
결과 `[output truncated]`로 끝납니다.
- ** 모든 통화는 깨끗합니다.** 직업 당 신선한 `lua_State`, 이렇게 아무것도
호출 사이에 운반합니다.

## 공구 모수
`lua_run_script` 소요:

|제품 설명|제품정보|지원하다|
| :-- | :-- | :-- |
|`code`를|이름 *|Lua 5.5 소스, 일반 텍스트|
|`timeout_ms`를|뚱 베어|옵션. `LUA_DEFAULT_TIMEOUT_MS`에 기본, 범위 100–60000|

성공하면 캡처 된 `print()` 출력 또는
`Lua script completed with no output.` 스크립트가 아무것도 인쇄되면. 실패에
당신은 오류 전에 인쇄 된 것을 얻을, 다음 `ERROR: <message>` 및
로그백. 예산 인상 `execution timed out`.

## 하드웨어 모듈
이들은 컴파일될 때 글로벌로 로드됩니다.

### `gpio`를
```lua
gpio.set_direction(pin, mode)   -- "input" | "output" | "input_output"
                                -- "output_od" | "input_output_od" | "disable"
gpio.set_level(pin, level)      -- 1 = HIGH, 0 = LOW
local v = gpio.get_level(pin)   -- returns 0 or 1
```

핀 번호는 널 고유이고, 단위는 각 널에 `0..55`를 받아들입니다.
`set_level`와 `get_level`는 핀을 내부적으로 재initialise, 그래서 호출합니다
`set_direction`는 첫번째 선택적입니다.

### `delay`를
```lua
delay.delay_ms(ms)   -- yields the task
delay.delay_us(us)   -- blocking, capped at 1,000,000 us per call
```

`delay_ms`를 사용하여 두 번째 이상으로 스케줄러가 여전히 실행할 수 있습니다.
다른 작업. 스크립트의 타임아웃에 대한 두 개.

## 예
Blink 핀에 LED 20 3 배 및 보고 뒤:

```lua
local pin = 20
gpio.set_direction(pin, "output")
for i = 1, 3 do
  gpio.set_level(pin, 1)
  delay.delay_ms(200)
  gpio.set_level(pin, 0)
  delay.delay_ms(200)
end
print("blinked 3 times on pin " .. pin)
```

에이전트는 `blinked 3 times on pin 20`를받습니다.

## 자신의 모듈 추가
`gpio`와 `delay`는 단지 두 배입니다. 동일한 본은 PWM, I2C를, 가지고 갑니다
UART, ADC, 또는 샌드박스에 센서 드라이버 - 그리고 모든 모듈을 추가
대리인은 더 굳힌모 일 없이 improvise 할 수 있습니다.

새로운 `pwm` 단위, 끝에 끝:

1. ** `components/lua/modules/pwm/lua_module_pwm.c`에서 모듈**을 수정합니다. 계정 만들기
`luaopen_pwm()`의 C 기능 테이블은 TuyaOpen `tkl_*` / `tal_*`를 호출
그들과 자기 등록에서 API:

   ```c
   int luaopen_pwm(lua_State *L) {
       lua_newtable(L);
       lua_pushcfunction(L, lua_pwm_start); lua_setfield(L, -2, "start");
       return 1;
   }

   void lua_module_pwm_register(void) {
       lua_module_register("pwm", luaopen_pwm);
   }
   ```

2. ** 소스 추가 ** `components/lua/CMakeLists.txt`에서 조건으로, 추가
모듈 디렉토리에는 경로가 포함되어 있습니다.
3. ** Kconfig 스위치 추가 ** `ENABLE_LUA_MODULE_PWM`,
`depends on ENABLE_LUA`로.
4. ** `tools/tools_register.c`에서 레지스트라 **, 같은 가드 뒤에.
5. ** 널 설정에서 **를 활성화하십시오: `CONFIG_ENABLE_LUA_MODULE_PWM=y`.

그런 다음 모델이 존재합니다. — 아래를 참조하십시오. 모듈은 에이전트에 대해 모른다.
컴파일 할 수도 없습니다.

sandbox 내부 및 플랫폼 지원을 포함한 전체 walkthrough
매트릭스, 저장소에 `docs/lua-module-porting.md`에 있습니다.

## 그것을 사용하는 대리인 가르침
내장을 설정할 수 없습니다. 도구 설명은 이미 모델을 알려줍니다.
샌드박스가 제공하는 것, TClaw는 `lua_run`, `lua_gpio`, `lua_delay`를
** 붙박이 기술 ** `skill_loader`는 장치의 기술로 설치합니다
디렉토리 (`/sdcard/skills/`, 또는 SD 카드없이 보드에 `/skills/`) 첫 번째
부트. 그들의 summaries는 시스템 프롬프트로 이동하고, 대리인은 전체 텍스트를 읽습니다
`read_file`를 사용하면 세부 사항이 필요합니다.

추가된 모듈의 경우, 같은 두 가지가 내장되어 있습니다.

- `pwm.*` API를 `lua_run_script`에 요약한 선을 승인하십시오
`tools/tool_lua.c`에서 - 이것은 강한 신호, 모델은 항상 그것을 볼.
- 기술 파일 발송 (`docs/skills/lua_pwm.md`, 응축된 `BUILTIN_LUA_PWM`
전체 참조에 대한 `skills/skill_loader.c`).

더 넓은 기술에 대한 [hardware 주변 기술](./hardware-skill.md)
메커니즘 및 [사용자 지정 장치 MCP] (./custom-device-mcp.md) 기본 쓰기
대신 작업이 고정되고 Lua가 잘못된 수준입니다.
