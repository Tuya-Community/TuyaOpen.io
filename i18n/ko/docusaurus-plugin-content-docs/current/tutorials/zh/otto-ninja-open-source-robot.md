---
title: "오토 닌자 로봇"
noindex: true
---


# 오토 닌자 오픈 소스 로봇
![오토 닌자](https://images.tuyacn.com/fe-static/docs/img/402dea40-bf93-43ae-ab9a-e502233e8604.png)


## 1. 프로젝트 개요

Otto Ninja는 **Walking Mode**와 **Wheeled Racing Mode** 사이의 수요를 전환하는 듀얼 모드 오픈 소스 로봇입니다. **Otto DIY** 생태계에 내장되어 Tuya의 T5 OTTO 개발 보드에서 실행됩니다. 부품을 인쇄하고, 펌웨어를 플래시하고, Tuya Smart App에서 구동 - schematics, code 및 STEP 파일은 모두 이차 개발을위한 개방입니다.

프로젝트에는 3개의 핵심 이점이 있습니다:



1. **Low-Cost 제작**: 재료에 쉽게 조립 구성 요소 및 명확한 조달 채널을 가진 완벽한 3D 프린팅 구조;

2. **Full-Stack Open Source**: 소프트웨어/하드웨어 코드, 하드웨어 schematics 및 3D 모델 파일, 보조 오픈 소스 개발 지원;

3. ** 리치 기능 **: GC9D01 전시 운전사와 호환이 되는, 확장 가능한 감지기와 더불어 음성 상호 작용과 자세 통제 기능 통합.

## 설치 데모 자습서

[오토 닌자 설치 데모 자습서](https://b23.tv/dKEJ69n)

## 2. 핵심 자원 명부

### 1. 코드 저장소 (Tuya Open Platform)
* **Main Code Repository** (핵심 논리 및 드라이버 포함)

  [TuyaOpen/apps/tuya.ai/your\ otto\ robot/src/otto\ ninja](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)

* ** 키 코드 파일 설명 **



|파일 이름|기능 묘사|
| -------------------------- | -------------------------------------------------------------- |
| `otto_ninja_main.c/h`      |로봇 메인 컨트롤 논리 (모드 스위칭, 모션 스케줄링)|
| `otto_ninja_app_servo.c/h` |서보 드라이버 프로그램 (360°/180° 서보 좌표 제어)|
| `gc9d01_display.c/h`       |GC9D01 디스플레이 드라이버 (OLED 화면 데이터 렌더링 및 디스플레이)|



* ** 빠른 시작 문서**

  [https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your\ otto\ robot/README.md 는](https://github.com/tuya/TuyaOpen/blob/master/apps/tuya.ai/your_otto_robot/README.md)(환경 설정 및 코드 컴파일 튜토리얼 포함)

### 2. 오픈 소스 하드웨어 리소스
* **Schematic 및 PCB 디자인 ** (LCEDA 플랫폼)

  [오토 닌자 하드웨어 프로젝트](https://oshwhub.com/robben.wang/ottorobot_ninja)

:::note
주요 제어 모듈, 서보 인터페이스, 디스플레이 인터페이스 및 전력 관리 모듈의 전체 디자인을 포함, 생산 파일의 직접 수출 지원.
:::

### 3. 3D 인쇄 모델 파일
* ** 모델 저장소 주소**

  [TuyaOpen/apps/tuya.ai/your\ otto\ robot/src/otto\ ninja/3D\ 모델](https://github.com/tuya/TuyaOpen/tree/master/apps/tuya.ai/your_otto_robot/src/otto_ninja)(입력 후 다운로드를 위한 "3D\ Models" subdirectory로 점프하는 것이 좋습니다)

* ** 파일 목록 포함 **



|파일 형식|관련 제품|제품정보|
| --------------- | ----------------------------------------------------------- | --------------------------------------------------------------- |
|STL 체재|맨 위 포탄, limb 합동, 설치 baseplate, 피마자 부류|3D 인쇄 (추천 층 고도를 위해 직접 사용해: 0.2mm)|
|STEP 형식|OTTO NINJA.단계|편집 가능한 CAD 소스 파일 (구조 수정 용)|
|Auxiliary 부속|모듈 형 눈 판, ninja 장식적인 벨트|외관 증진 및 기능 확장|

## 3. 물자 (BOM)의 빌
|부품 이름|명세 (키 모수 보충교재)|제품 정보|구매 링크|이름 *|
| ------------------- | ----------------------------------------------------------- | --------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
|고무 씰링 링|O 반지, 70\*5 (5개 조각)|견적 요청| [Taobao 링크](https://e.tb.cn/h.SwzLdCs7xnQF7FB?tk=ajRffNdG3MQ) |바퀴 발을 위해 사용하는|
|제품정보|360° 서보 (MG90S) + 180° 서보 (MG90S)|4 각| [Taobao 링크](https://item.taobao.com/item.htm?id=39376480811) |륜 구동을위한 360°, 180° 걷는 관절|
|OLED 디스플레이|0.71 인치, 12P 플러그 인, SPI 인터페이스, GC9D01 호환|2개 조각| [Taobao 링크](https://item.taobao.com/item.htm?id=866988150753) |표시 자세 데이터 및 상호 작용 정보|
|배터리 부품|3.7V 리튬 전지, 1.25mm 빨간 까만 끝 연결관|1 세트|Taobao에 구매|그것은 보호 널을 가진 리튬 전지를 선택하는 것이 좋습니다|
|스피커 모듈|2030 스퀘어 4R3W1.25 200MM 1.25 마개|1개 PC| [Taobao 링크](https://e.tb.cn/h.6aQKt3qWEBJ70iY?tk=zKwNeq6Y2fm) |음성 상호 작용 및 오디오 재생|
|마이크 모듈|모형 6027의 아날로그 신호, 1.25mm 맨끝, 방수 IP65|1개 조각| [Taobao 링크](https://item.taobao.com/item.htm?id=764269727410) |음성 상호 작용 기능을 위해 사용하는|
|주요 제어반|T5 OTTO 개발 보드 / 재료 세트 완료|1개 조각| [Taobao 링크](https://tuyasmart.taobao.com/?spm=a1z10.5-c-s.0.0.223d5cb0RYr5fX) |자료실|

:::note
물자의 양은 인쇄한 모형 버전에 따라 조정될 수 있습니다. 처음 제작을 위해 "1 세트"를 구입하는 것이 좋습니다. 1-2 개의 예비 취약점 부품 ( 서보 및 씰링 링과 같은).
:::

## 4. 핵심 기능 및 특징

### 1. 이중 모드 모션 시스템
|형태 유형|제어 Logic|적용 Scenarios|
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------- |
|걷는 형태|180° 서보 컨트롤 limb 관절은 "걷기" 자세를 시뮬레이션|복잡한 지형 (예, 데스크탑, 카펫)|
|휠 레이싱 모드|360° 서보 드라이브 캐스터는 고속 선형/스티어링 운동을 위한|플랫 표면 (예 : 나무 바닥, 타일)|

> 엇바꾸기 방법: App 통제 공용영역을 통해 1 누르기 엇바꾸기, 또는 부호에서 형성된 단축키를 통해 방아쇠.

### 2. 모듈 확장 기능
* **센서 확장 **:

* **Appearance Customization**: 3D 인쇄된 성분 지원 개인화한 수정 (예를들면, 머리 모양을 대체하고, 장식적인 부속을 추가하십시오);

* **기능 추가**: Code는 custom logic(e.g., add "follow mode", "obstacle avoidance mode").

### 3. 오픈 소스 호환성
* **Platform Adaptation**: Tuya Open Platform을 기반으로 개발, Tuya IoT 생태계에 대한 연결을 지원 (예 : 음성 조수, 앱 원격 제어);

* ** 커뮤니티 지원 **: 더 창조적인 사례와 기술 지원을 위한 글로벌 오토 DIY 커뮤니티에 접근 가능.

## 5. 빠른 시작 가이드

### 1. 임명과 회의
* ** 3D 인쇄 준비**: 0.2mm의 층 고도를 가진 PLA 물자를 이용하고 모든 STL 성분을 인쇄하기 위하여 20%-30%의 infill 비율을 (그것은 “시험 부속”를 첫째로 차원을 확인하기 위하여 추천됩니다);

* **Assembly Tutorial**: 비디오 데모 참조[오토 닌자 설치 데모 자습서](https://b23.tv/dKEJ69n)(키 단계: 자동 귀환 제어 장치 구경 집합 → 주요 제어반 고정 → 전시 임명);

* ** 통화 포인트 **: 조립 후 서보 중립점은 모션 편차를 피하기 위해 코드를 통해 측정해야합니다 (측정 방법은 README 문서를 참조하십시오).

### 2. 펌웨어 레코딩 및 네트워크 구성
#### 단계 1: 펌웨어 Burning Authorization
1. 다운로드 및 설치[Tyutool (Windows 버전)](https://developer.tuya.com/cn/docs/developer/windows_tyutool_gui?id=Kew1ks0xuct2p);

2. USB 케이블을 통해 컴퓨터에 메인 컨트롤 보드를 연결, 선택 "Otto Ninja Firmware" (프로젝트 컴파일에서 얻은 확인);

3. 툴 프롬프트에 따라 인증 및 레코딩 완료 ( Tuya Developer Platform의 프로젝트를 사전에 작성해야합니다).

#### 단계 2: 앱 네트워크 구성 및 제어
1. 다운로드 "Tuya Smart" App (또는 프로젝트 맞춤형 앱), 등록 및 로그인;

2. App 네트워크 설정 페이지를 입력하면 "Auto Discover Devices"를 선택하십시오. (주요 제어 보드는 네트워크 구성 모드에서 유지);

3. 성공적인 네트워크 윤곽 후에, 통제 공용영역을 입력하십시오:

* Dial: 로봇의 앞으로/뒤로/스티어링 통제;

* 모드 스위치 단추: "Walking"/ "Wheeled" 형태 사이에서 전환하는 것을 클릭하십시오;

## 6. 오픈 소스 라이센스 및 성명



* **Open-Source License**: **CC BY-NC-SA 4.0 License** (비 상업적 사용, 수정 및 공유, 원본 저자 및 배포와 같은 라이센스에 기여);

* ** 적응 플랫폼 ** : Tuya Open Platform (플랫폼 개발자 사양을 준수);

* **Update Time**: 2025-12-06 (보통 업데이트는 코드 저장소에 "CHANGELOG.md" 파일에 동기화됩니다);

* **Author Information**: 오토 DIY 오픈 소스 프로젝트를 기반으로 Robben에 의해 최적화. 원본 저자는 Sebastian Coddington, txp666 등 (모든 기여자에 감사);

* ** 면책**: 이 프로젝트는 학습 및 비 상업적 용도로만 사용됩니다. 안전 precautions는 하드웨어 제조 (예를들면, 리튬 전지 사용법 명세, 정확한 자동 귀환 제어 장치 배선) 도중 가지고 가야 합니다.

## 7. 자주 묻는 질문 (FAQ)
1. **Q: 자동 귀환 제어 장치가 붙어 있거나 탈선하면 어떻게해야합니까?**

A: 자동 귀환 제어 장치 배선이 정확한 경우에 체크 (전력 공급, 신호 핀), 그리고 부호를 통해서 자동 귀환 제어 장치 중립 점을 재 조정하십시오.

2. **Q: 디스플레이가 켜지지 않는 경우 문제 해결 방법?**

A: GC9D01 드라이버 코드가 올바르게 컴파일되었는지 확인, 디스플레이 배선 확인 (SDA / SCL 핀은 메인 컨트롤 보드와 일치), 및 펌웨어를 다시 부팅 시도.
