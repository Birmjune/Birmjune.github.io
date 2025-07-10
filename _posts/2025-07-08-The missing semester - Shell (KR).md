---
title: The missing semester - Shell (KR)
date: 2025-07-08 08:00:00 +09:00
categories: [Etc]
tags: []       
math: true
layout: post
author: birm
---

최근에 여러 프로젝트를 하면서, 이론도 중요하지만.. 실제로 사용되는 여러 tool을 익히는 것이 중요하다는 생각이 들었다.               
그러한 의미에서 Docker? Conda? Git? Vim? Terminal? 이런 것들을 정리해보려고 한다.                      
MIT의 missing semester 강좌와 웹서핑으로 얻은 정보를 정리할 것이다. (https://missing.csail.mit.edu/)        

이번 post에서는 Shell에 대해 정리한다.

### What is the shell?
Shell이란? 요즘 컴퓨터들은 fancy한 graphic interface들을 제공하나, 이런 것들은 할 수 있는 작업의 범위를 제한함. 컴퓨터의 모든 기능을 활용하기 위해서는 Shell이라고 하는 textual interface를 사용해야 한다.                 

즉, shell에서 text를 통해 program run / input / output을 할 수 있는 느낌.            
shell은 일종의 programming environment이다.                
여러 종류가 있으나, bash (Bourne Again SHell) 에 대해서 다룬다.             

### Using the shell
**$ echo hello**와 같이 명령 실행             
echo 와 같은 명령을 shell이 어떻게 알 수 있는가?             
shell 자체에 built-in 된 명령일 수 있음. 그렇지 않은 경우, **$PATH 라고 하는 env variable**에서 echo라는 이름을 가지는 file을 찾고 실행하는 것.             
$ /bin/echo hello 와 같이 절대 경로로 실행할 명령 file을 지정하고 사용할 수도 있다.            

### Navigating in the shell
A path on the shell is a delimited list of directories : directory의 list라고 생각하면 됨.              
Linux의 경우에는, / 로 구분되어 있으며 최상위 path는 / 이다.                
Window의 경우는 \으로 구분, C:\ 혹은 D:\와 같은 각 disk가 최상위 path가 된다.               
앞으로는 Linux 기준으로 이야기한다.         
절대 경로 (absolute path) 는 /로 시작하는 path이고, 상대 경로는 나머지를 말한다.     

**pwd**: print working directory, 현재 dir 표시      
**cd**: change directory, dir을 바꿈. `..` 은 상위 dir을, `.`은 현재 dir을 의미.     
예를 들어, 현재 /home 에서 $ cd missing 을 하면 /home/missing으로 간다.     
**ls**: 현재 directory의 내용 표시     
**ls -l** : 내용과 권한(rwx)을 같이 표시     
**mv, cp, mkdir, man** 등..



