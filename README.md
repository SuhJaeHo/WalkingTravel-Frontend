# 🚶 WalkingTravel

AR모드를 제공하는 길찾기 어플리케이션입니다.

<br />

# 💡 Motivation

낯선 장소로 여행을 떠나면 핸드폰에서 지도를 켜서 길 찾기를 합니다.
하지만 지도에 목적지까지의 경로가 표시되어도 여러 갈림길이 있을 때 어느 방향으로 가야되는지 헷갈리는 경우가 많았습니다.

단순하게 지도에 경로가 표시되는 것 외에 핸드폰 화면에 화살표로 어느 방향으로 가라고 직접적으로 알려주면 길을 헤메는 사람도 쉽게 길을 찾을 수 있겠다는 생각을 하여서 이번 프로젝트를 기획하게 되었습니다.

<br />

# 🛠 Tech Stack

- Frontend
  - React Native
  - React Navigation
  - Redux-Toolkit
  - Firebase Authentication
- Backend
  - Node.js
  - Express
  - MongoDB
  - Mongoose

<br />
  
# 🗓 Schedule
### 1. 1주차
- 아이디어 조사
- 기술 조사 및 선정
- 아이디어 선정
- Mockup 작성
- KanBan 작성
- Git Repository 생성

### 2. 2, 3주차

- 기능 구현
- 배포

<br />

# 🌅 Features

|                                                                 실행화면                                                                 |                                                  내용                                                  |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
| <img width=200 height=400 src="https://user-images.githubusercontent.com/68631561/179698723-ca0253b9-fe25-4fa0-8d88-192f531d35b5.gif" /> | 다음 구간에 도달하기 위해 현재 진행 방향에서 **오른쪽**으로 이동해야 할 때 오른쪽 화살표가 표시됩니다. |
| <img width=200 height=400 src="https://user-images.githubusercontent.com/68631561/179699947-a12fbe6a-c66c-4b84-9440-8a4c7034e478.gif" /> |   다음 구간에 도달하기 위해 현재 진행 방향에서 **왼쪽**으로 이동해야 할 때 왼쪽 화살표가 표시됩니다.   |
| <img width=200 height=400 src="https://user-images.githubusercontent.com/68631561/179707361-b3406ad0-6387-47fa-8a14-2e3ccc42151c.gif" /> |                    다음 구간까지의 거리가 30m 이상 남은 경우 **직진**이 표시됩니다.                    |
| <img width=200 height=400 src="https://user-images.githubusercontent.com/68631561/179752178-16f20897-9c58-4fa1-ad88-c0696c6383bc.gif" /> | 경로의 마지막 포인트의 좌표와 유저의 현재 위치와의 거리가 가까울 경우 **도착**했다고 핑이 표시됩니다.  |

<br />

# ⚙️ Deploy

- Frontend

  - 플레이 스토어

- Backend
  - AWS Elastic Beanstalk
