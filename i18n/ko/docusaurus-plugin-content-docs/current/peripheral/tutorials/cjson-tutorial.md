---
title: cJSON 추락 코스
description: "TuyaOpen의 cJSON 충돌 과정: 묶인 cJSON 도서관과 선택적인 TAL 걸이를 가진 MQTT/HTTP 탑재량을 위한 parse, traverse, 인쇄 및 자유로운 JSON."
keywords:
  - cjson
  - json parsing
  - mqtt
  - http
  - tuyaopen
---

## 제품정보
TuyaOpen 선박 cJSON (Dave Gamble, MIT) 아래`TuyaOpen/src/libcjson/cJSON/`. 클라우드 데모, AI 앱 및 프로토콜 예제는 MQTT/HTTP 페이로드를 파싱하고 요청 몸을 구축하는 데 사용됩니다. 이 튜토리얼은 TuyaOpen : Hooks, parse, traverse, print 및 무료의 최소 사용 경로를 제공합니다.

**오디오:** 이미 TuyaOpen 앱을 구축하고 다른 파서에서 끌어 당기지 않고 JSON이 필요합니다.

## 자주 묻는 질문
- [환경 설정](../../quick-start/enviroment-setup)컴파일하는 프로젝트
- 기본 C (포인트,`NULL`확인).

## 제품 정보
- `#include "cJSON.h"`(앱의 경로가 포함되는 libcjson 구성 요소의 헤더 경로).
- CMake 또는 Kconfig는 JSON을 사용하는 다른 앱과 같은 cJSON 라이브러리를 연결해야 합니다.`examples/protocols/http_client`또는`apps/tuya_cloud/switch_demo`).

## 한국어
### 1. 선택 사항 - TAL을 통해 cJSON 할당
TuyaOpen 앱 통화`cJSON_InitHooks`시작 중에 한 번`cJSON_Print`이름 *`cJSON_Parse`(주)`tal_malloc` / `tal_free`(또는 큰 JSON이 예상될 때 PSRAM 변형):

```c
#include "cJSON.h"
#include "tal_api.h"

void app_json_init(void)
{
    cJSON_InitHooks(&(cJSON_Hooks){.malloc_fn = tal_malloc, .free_fn = tal_free});
}
```

패스워드`NULL`으로`cJSON_InitHooks`기본 libc를 복원`malloc`/`free`. 당신은 PSRAM와 다른 단계를 위한 내부 렘 사이에서 전환하는 경우에, 당신 자유로운 어디에 allocator에 일치하십시오`cJSON_Print`산출 (단계를 보십시오 4). PSRAM의 배경을 보려면[Heap 할당 및 PSRAM](../memory/heap-allocation-and-psram).

:::note
`cJSON_InitHooks`그 과정에서 cJSON에 대한 글로벌 할당자 선택에 영향을 미치는; 당신이 그것에 의존하면 다른 cJSON API 전에 호출.
:::

### 2. 버퍼에서 JSON을 파는 것은 null-terminated 일 수 없습니다.
HTTP body, MQTT 페이로드, 또는 파일 펑크, 사용`cJSON_ParseWithLength`명시된 길이 (도 참조)[HTTP 클라이언트 튜토리얼](http-client-tutorial)):

```c
const char *buf = ...;
size_t len = ...;

cJSON *root = cJSON_ParseWithLength(buf, len);
if (root == NULL) {
    const char *ep = cJSON_GetErrorPtr();
    if (ep != NULL) {
        /* ep points near the failure; walk back a few chars when logging */
    }
    return;
}
/* ... use root ... */
cJSON_Delete(root);
```

null-terminated인 C 문자열의 경우`cJSON_Parse`뚱 베어

### 3. 유형 체크를 가진 목표 분야를 읽으십시오
`cJSON_GetObjectItem`키에 case-insensitive입니다. 공지사항`cJSON_Is*`읽기 전에`valuestring` / `valuedouble`:

```c
cJSON *ver = cJSON_GetObjectItem(root, "version");
if (cJSON_IsString(ver)) {
    const char *s = cJSON_GetStringValue(ver); /* or ver->valuestring when non-NULL is guaranteed */
    (void)s;
}

cJSON *code = cJSON_GetObjectItem(root, "code");
if (cJSON_IsNumber(code)) {
    double d = cJSON_GetNumberValue(code);
    (void)d;
}
```

배열을 위해, 사용`cJSON_GetArraySize`이름 *`cJSON_GetArrayItem`, 또는 도보`child`업스트림 cJSON docs에 링크.

### 4. JSON을 구축하고 텍스트로 전송
```c
cJSON *obj = cJSON_CreateObject();
if (obj == NULL) {
    return;
}
cJSON_AddStringToObject(obj, "cmd", "ping");
cJSON_AddNumberToObject(obj, "id", 42);

char *printed = cJSON_PrintUnformatted(obj);
cJSON_Delete(obj);
if (printed == NULL) {
    return;
}
/* send printed with length strlen(printed), then free with the same allocator as cJSON hooks */
tal_free(printed);
```

후크가 TAL로 설정되지 않은 경우, 무료 인쇄 문자열`cJSON_free`또는`free`빌드에 적합 (위의 의견 블록 참조)`cJSON_Parse`내 계정`cJSON.h`).

### 5. 소유권 규칙 (보이드 누출 및 이중없는)
- `cJSON_Parse*`→ 나무를 소유 → 호출`cJSON_Delete(root)`할 때.
- `cJSON_Print*`→ 당신은 반환`char *`→ 일치하는 allocator로 한 번 무료.
- `cJSON_AddItemToObject` / `cJSON_AddItemToArray`→ 부모는 아이를 소유; 하지 마십시오`Delete`아이는 별도로 당신 없이`Detach`처음.

## 현재 위치
TuyaOpen 앱에서 JSON을 파싱하고 방출할 수 있습니다.`cJSON_ParseWithLength`믿을 수 없는 길이 완충기를 위해,`cJSON_InitHooks`정렬하기`tal_malloc`/`tal_free`, 그리고 정확한`cJSON_Delete`/ 문자열 무료 페어링.

## 이름 *
- 머리:`TuyaOpen/src/libcjson/cJSON/cJSON.h`(업스트림 1.7.16 인 트리).
- [HTTP 클라이언트 튜토리얼](http-client-tutorial)— HTTP에 JSON.
- [Heap 할당 및 PSRAM](../memory/heap-allocation-and-psram)— 사용할 때`tal_psram_malloc`걸이에서.
- [예제 인덱스](../../examples/demo-generic-examples)— 검색`cJSON_`내 계정`examples/`이름 *`apps/`.
