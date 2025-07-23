---
title: CS Tools - Docker (KR)
date: 2025-07-23 08:00:00 +09:00
categories: [Etc]
tags: []       
math: true
layout: post
author: birm
---

## Docker
Docker란? "실행 환경"을 온라인에 올려두는 tool로, 같은 실행 환경을 다른 서버에서도 쓸 수 있게끔 도와주는 역할을 한다.             
정확히는 모르지만, 일종의 가상화 플랫폼 느낌인 듯? container 등의 개념도 알아야 하는 듯 하다.              

### Docker Image
“리눅스 프로그램 + 라이브러리 + 설정” 을 한 덩어리로 묶은 실행 패키지 느낌.              
우리가 아는 사진 이미지가 아니다..        
실제로 https://hub.docker.com/ 에서 다른 사람들이 올려놓은 image들을 볼 수 있다.           

Docker Image를 실제로 만들기 위해서는 Dockerfile과 .dockerignore 파일을 설정한 뒤,         
`docker build` 명령어를 활용하여 image를 build할 수 있다.          
`docker push`를 활용하여 원하는 저장소에 push를 할 수 있고, Kubernetes 등의 플랫폼에서 저장된 docker image를 사용할 수 있는 것이다.               
