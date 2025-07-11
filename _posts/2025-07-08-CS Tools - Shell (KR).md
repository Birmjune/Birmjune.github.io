---
title: CS Tools - Shell (KR)
date: 2025-07-08 08:00:00 +09:00
categories: [Etc]
tags: []       
math: true
layout: post
author: birm
---

최근에 여러 프로젝트를 하면서, 이론도 중요하지만.. 실제로 사용되는 여러 tool을 익히는 것이 중요하다는 생각이 들었다.               
그러한 의미에서 Docker? Conda? Git? Vim? Terminal? 이런 여러 가지 tool들을 정리해보려고 한다.                      

MIT의 missing semester 강좌의 내용과 추가적으로 궁금한 부분들에 대해 웹서핑으로 얻은 정보를 정리할 것이다.
(Link: [Missing semenster](https://missing.csail.mit.edu/))     

이번 post에서는 Shell에 대해 정리한다.

## Shell
### What is the shell?
Shell이란? 요즘 컴퓨터들은 fancy한 graphic interface들을 제공하나, 이런 것들은 할 수 있는 작업의 범위를 제한함. 컴퓨터의 모든 기능을 활용하기 위해서는 Shell이라고 하는 **textual interface**를 사용해야 한다.

즉, **shell에서 text를 통해 program run / input / output**을 할  수 있는 느낌.
shell은 일종의 programming environment이다.
여러 종류가 있으나, bash (Bourne Again SHell) 에 대해서 다룬다.
### Using the shell
`$ echo hello`와 같이 명령 실행
`echo` 와 같은 명령을 shell이 어떻게 알 수 있는가? 
shell 자체에 built-in 된 명령일 수 있음. 그렇지 않은 경우, **$PATH 라고 하는 env variable**에서 `echo`라는 이름을 가지는 file을 찾고 실행하는 것.
`$ /bin/echo hello` 와 같이 절대 경로로 실행할 명령 file을 지정하고 사용할 수도 있다.

즉, 기본적으로 built-in되지 않은 명령들은 **$PATH**에 등록 후 사용하는 것! 
예를 들어 `$ docker ~`, `$ kube ~` 등과 같은 명령들.
### Navigating in the shell
A path on the shell is a delimited list of directories : directory의 list라고 생각하면 됨.
Linux의 경우에는, / 로 구분되어 있으며 최상위 path는 / 이다. 
Window의 경우는 \으로 구분, C:\ 혹은 D:\와 같은 각 disk가 최상위 path가 된다. 
앞으로는 Linux 기준으로 이야기한다.

절대 경로 (absolute path) 는 /로 시작하는 path이고, 상대 경로는 나머지를 말한다.
후술할 여러 command를 통해 shell에서 file navigating을 할 수 있다.
### Basic Commands
**(기본적인 것들)**
**echo**: shell에 내용을 출력. (`$ echo hello`)
**cat**: 파일의 내용을 화면에 출력하거나, 여러 파일을 이어 붙여서 출력 (`$ cat a.txt b.txt > ab.txt`)
**man**: 명령어의 매뉴얼 페이지를 보여줌. ex) `$ man ls` → ls 명령의 사용법과 옵션 설명 확인
**grep**: global regular expression print, 파일/입력에서 특정 문자열과 일치하는 부분 찾기. ex) `$ grep 'error' logfile.txt` → logfile.txt에서 'error' 있는 부분 모두 찾음

**(File 관련)**
**pwd**: print working directory, 현재 디렉터리 경로 표시 (`$ pwd`)
**cd:** change directory, 디렉터리를 이동. `..` 은 상위 디렉터리, `.`은 현재 디렉터리.
- ex) /home에서 `$ cd missing` → /home/missing으로 이동
**ls**: 현재 디렉터리의 파일·디렉터리 목록 표시
- **ls -l**: 목록을 권한(rwx), 소유자, 크기, 수정 날짜 등 자세히 표시
**mv**: 파일이나 디렉터리를 이동하거나 이름 변경
- ex) `$ mv old.txt new.txt` → old.txt를 new.txt로 이름 변경
- ex) `$ mv file.txt /path/to/dir/` → file.txt를 해당 디렉터리로 이동
**cp**: 파일이나 디렉터리를 복사
- ex) `$ cp file.txt copy.txt` → 파일 복사
- 디렉터리 전체 복사 시 -r 옵션 사용: `$ cp -r src_dir/ dst_dir/`
**mkdir**: 새로운 dir 생성 (ex) `$ mkdir project` → project 디렉터리 생성)
### Connecting Programs
프로그램마다 기본적으로 데이터 통로(stream 이라고 함) 가 있음.
- **stdin**: 표준 입력, 기본값은 키보드. `$ cat < file.txt` 와 같이 `<` 연산자를 통해 file.txt에서 읽어오도록 할 수 있다.
- **stdout**: 표준 출력, 기본값은 터미널. `$ echo hello > file.txt` 와 같이 `>` 연산자를 통해 file.txt에 쓰도록 할 수 있다.

이떄 `<` 명령은 표준 입력을 지정된 파일에서 읽으며, `>` 명령은 표준 출력을 지정한 파일에 **덮어쓰고**, `>>` 명령은 표준 출력을 지정한 파일에 **이어쓴다**.

이런 I/O 상황은 pipe를 쓸 때 매우 유리하다. `|` 연산자를 사용하며, 왼쪽 프로그램의 표준출력을 오른쪽 프로그램의 표준입력으로 연결("chain")하는 역할이다.
ex) `ls -l / | tail -n1` : / (root dir) 의 내용을 나열한 뒤, 마지막 1개만 보여주는 것.

### sudo
"root" 사용자만 할 수 있는 작업들이 있음. 이는 sudo (super user do) 를 앞에 붙여 실행해야 한다! root 권한으로 프로그램을 실행하겠다~ 이런 뜻.

단, `|`, `>`, `<` 등의 명령은 program이 아니라 shell이 하기에 root 권한이 없음에 유의해야 한다. 즉 `$ sudo echo 3 > brightness` 는 안 된다. (brightness가 sudo 권한 필요할 때)
`$ echo 3 | sudo tee brightness` 와 같이 실행하여, `tee` program을 root 권한으로 실행하는 방식을 사용해야 한다!



