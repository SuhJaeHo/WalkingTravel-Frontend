## 🚶🏻 WalkingTravel

<p align="center">
  <img width="600" alt="Logo" src="https://user-images.githubusercontent.com/68631561/183117506-0bf47293-732e-4a3f-9f42-fc558a6d527a.png">
</p>
<p align="center">
AR 모드를 제공하는 길찾기 어플리케이션입니다.
</p>
<p align="center">
갈림길에서 어느 방향으로 가야하는지 헷갈릴 때 AR 모드에 표시되는 화살표를 따라가보세요!
</p>

<br />

## 📱 Play Store

https://play.google.com/store/apps/details?id=com.walkingtravel

<br />

## 📚 Contents

- 💡 [Motivation](#-motivation)
- 🌄 [Features](#-features)
- 🗓 [Schedule](#-schedule)
- 🛠 [Tech Stack](#-tech-stack)
- 🎬 [Getting Started](#-getting-started)
- 📉 [Difficulties](#-difficulties)
- 📝 [Retrospect](#-retrospect)

<br />

## 💡 Motivation

낯선 장소로 여행을 떠나면 핸드폰에서 지도를 켜서 길 찾기를 합니다.
하지만 지도에 목적지까지의 경로가 표시되어도 여러 갈림길이 있을 때 어느 방향으로 가야 하는지 헷갈리는 경우가 많았습니다.

단순하게 지도에 경로가 표시되는 것 외에 핸드폰 화면에 화살표로 어느 방향으로 가라고 직접적으로 알려주면 길을 헤매는 사람도 쉽게 길을 찾을 수 있겠다고 생각하여서 이번 프로젝트를 기획하게 되었습니다.

<br />

## 🌄 Features

|                                                                  실행화면                                                                  |                                   내용                                    |
| :----------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------: |
| <image width=200 height=350 src="https://user-images.githubusercontent.com/68631561/183127190-7fcaf6de-bc54-4c59-852c-a6f1f6ea6a6c.gif" /> |     핸드폰을 올리면 AR 모드가 실행되고 내리면 일반 지도가 보여집니다      |
| <image width=200 height=350 src="https://user-images.githubusercontent.com/68631561/183129477-03762bdb-79ae-484d-9f38-b0add39392b9.gif" /> |      **오른쪽**으로 이동해야 할 때 오른쪽 방향의 화살표가 표시됩니다      |
| <image width=200 height=350 src="https://user-images.githubusercontent.com/68631561/183129483-3601075e-7b02-428a-80c4-ff0de6d1842c.gif" /> |        **왼쪽**으로 이동해야 할 때 왼쪽 방향의 화살표가 표시됩니다        |
| <image width=200 height=350 src="https://user-images.githubusercontent.com/68631561/183129488-7ada4132-099d-4214-a87f-fb8f80c74b8a.gif" /> | 다음 구간까지의 거리가 30m 이상 남은 경우 직진 방향의 화살표가 표시됩니다 |
| <image width=200 height=350 src="https://user-images.githubusercontent.com/68631561/183129491-6ca2f8e9-353d-4c63-949f-dbdb7beef625.gif" /> |            경로의 마지막 구간에 도달했을 경우 도착 표시됩니다             |

<br />

## 🗓 Schedule

### 2022/06/27 ~ 2022/07/02

- 아이디어 선정 및 기술 스택 검증
- 목업 및 칸반 작성

### 2022/07/03 ~ 2022/07/15

- 코드 작성 및 배포

<br />

## 🛠 Tech Stack

### Frontend

- React Native
- React Navigation
- Redux-Toolkit
- Firebase Authentication

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

<br />

## 🎬 Getting Started

### Client

```
git clone https://github.com/SuhJaeHo/WalkingTravel-Frontend.git
npm install
npx react-native run-android
```

### Server

```
https://github.com/SuhJaeHo/WalkingTravel-Backend.git
npm install
npm start
```

<br />

## 🔐 env

### Client

```
SERVER_URL=<SERVER_URL>
WEB_CLIENT_ID=<YOUR_WEB_CLIENT_ID>
GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
TMAP_APP_KEY=<YOUR_TMAP_APP_KEY>
```

### Server

```
PORT=<YOUR_PORT>
MONGODB_URL=<YOUR_MONGODB_URL>
```

<br />

## 📉 Difficulties

### 1. api 데이터의 불충분성

tmap API로부터 목적지까지의 경로에 대한 데이터에 경로의 좌표와 함께 방향을 오른쪽 또는 왼쪽으로 꺾어야 하는 부분에서 진행해야 하는 방향을 알려주는 데이터가 포함되어 있어 해당 데이터를 이용하여 화살표의 방향을 표시하려 했지만 방향을 꺾어야 하는 모든 구간이 포함되어 있지 않다는 문제가 있었습니다.

따라서 다른 방법으로 AR 모드의 화살표의 방향을 표시해야 했고 방법을 고안해내는 부분에서 어려움을 겪었습니다. 그러다 인접한 두 좌표를 통해서 방위각을 구할 수 있었고, 방위 360도를 90도로 4등분하여 보행자가 바라보는 방위와 진행해야 하는 방위를 비교해 어느 방향으로 진행해야 하는지 도출할 수 있는 일정한 규칙을 찾을 수 있었습니다.

### 2. 나침반 센서의 부정확함

처음에는 핸드폰의 나침반 센서를 활용하여 유저가 바라보고 있는 방향과 다음 구간의 진행 방향을 비교하여 방향 안내를 하려고 했지만 핸드폰을 들고 움직이다 보면 나침반이 부정확한 방향을 가리키게 되는 경우가 잦아져서 오차를 줄일 방법에 대해 고민해야 했습니다.

실제 사용자의 입장이 되어서 앱을 사용한다고 생각해보니까 보행자가 갈림길에서 어느 방향으로 가야 하는지 헷갈릴 때 현재 진행 방향의 정면에서 AR 모드를 실행하겠다고 생각하게 되었습니다. 이 점을 이용하여 이전 구간의 방위와 다음 구간의 방위를 비교하여 AR 모드의 화살표의 방향을 도출하였고 부정확한 나침반 센서에 의존하여 생겼던 오차를 개선하였습니다.

### 3. 함수형 프로그래밍

유틸 함수를 실행함으로써 생기는 side effect를 최대한 줄이기 위해 순수 함수로 작성하기 위해 노력하였습니다. 함수의 크기가 커지는 것을 방지하기 위하여 선언형 함수로 작성하기 위해 노력하였고,
기존에 작성하였던 하나의 함수를 여러 순수 함수로 분리하는 작업을 진행하는 부분에서 어려움을 겪었습니다.

api로부터 받은 경로 데이터를 다듬는 과정에서 의도하지 않은 에러가 발생했을 때 세부적인 기능별로 함수를 분리하다 보니까 에러가 어디에서 발생했는지 찾기가 훨씬 수월하였고, 함수형 프로그래밍으로 코드를 작성하는 것의 이점을 조금 느낄 수 있었던 것 같습니다.

<br />

## 📝 Retrospect

프로젝트를 기획할 때 기술 조사를 하면서 핵심적인 기능을 어떻게 구현할 수 있을까에 대해서 생각해보면서 과연 할 수 있을까? 라는 의구심이 들면서도 한번 부딪혀보자 라는 생각을 가지고 프로젝트에 임하였던 것 같습니다.

하지만 머릿속에서 생각했던 것들을 실제로 적용하여 개발해보니 핸드폰의 나침반 센서의 방향이 정확하지 않거나 api로부터 받은 경로 데이터에 의존해야 하는 상황에서 생기는 문제점 등 기획 단계에서는 내다보지 못했던 에러 사항들을 마주하게 되었고 기획의 중요성을 다시 한번 느낄 수 있었습니다.

팀 프로젝트 할 때는 난관에 부딪혔을 때 팀원들과 토의하면서 해결책을 찾을 수 있었는데 개인 프로젝트의 경우 혼자서 계속해서 고민해야 했기 때문에 이 부분에서 부담감을 많이 느꼈고 팀원의 소중함을 느낄 수 있었습니다. 또한 자기 생각을 팀원에게 잘 설명할 수 있는 개발자가 되기 위해 노력해야 하겠다고 생각하게 되었습니다.

핵심 기능 구현에 어려움을 겪게 되어 딜레이가 생기다 보니 구현하고자 했던 기능을 전부 구현하지 못한 아쉬움이 있지만 실제로 밖에서 걸어보면서 작성한 로직을 테스트 해보고 특정 구간에서 잘못된 방향을 가리키면 문제를 분석하고 조금씩 해결해 나가는 과정 자체가 저에게는 좋은 경험이었고 밑거름이 되어 앞으로 더 성장하는 개발자가 되고 싶습니다.
