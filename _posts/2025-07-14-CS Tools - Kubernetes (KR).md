## Kubernetes
학교에서 GPU 대여 서비스를 신청해 보니, Kubernetes (이하 Kube) 라는 tool을 사용하라고 하여 겸사겸사 Kube + 대여받은 GPU 사용법에 대해서도 정리해 보기로 했다.
### Outline
크게 보자면, CPU/GPU 사용하겠다는 요청을 보내면 알아서 실행 후 그 결과를 다시 전달하는 형태이다. 이를 통해 컴퓨팅 자원을 할당받을 수 있다.
Pod 형태로 실행하며, 실행이 끝나면 남아있는 데이터는 삭제됨. 

실제로 자원 사용 시, **Pod**와 **PVC** 사용한다:                       
**Pod**는 실행 엔진, 연산 자원 빌려 쓰는 1회성 단위 (Like Google Colab)                      
**PVC**는 계속 남아서 데이터를 보존하는 것. (Like Google Drive)               
즉 Pod로 실행하는 과정에서 PVC에 .pt 등 파일을 저장하게끔 하는 식으로 자원 유지 가능!
### Way to use
실제로 사용하는 방법은 [SGS](https://sgs-docs.snucse.org) 를 참고하면 되는데, 먼저 docker와 kubectl, kubelogin 등의 tool을 깔아야 한다. (나는 WSL로 쉽게 깔았음.) 

추천하는 GPU 사용하는 방법은 아래와 같음. (Recommended Workflow)
- 1. 코드 수정용 Working pod (GPU 없이) 를 만든다
- 2. GPU shell에서 코드가 제대로 돌아가는지 확인한다
- 3. GPU workload를 활용해 코드를 한번에 쭉 돌린다

실제로 위 과정을 진행하기 위해, 아래와 같은 설정을 진행해야 한다.

**PVC (PersistentVolumeClaim)** 
- Reboot 과정에서 data를 저장하는 역할을 함.
```
# persistent-volume.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: persistent-volume
spec:
  accessModes: [ReadWriteOnce]
  resources:
    requests:
      storage: 100Gi
```
- 위와 같이 .yaml 파일을 로컬 어딘가에 저장하고 
- `kubectl apply -f persistent-volume.yaml` 과 같이 실행하면 된다. (경로/용량은 자신의 상황에 맞게 지정)

**GPU shell**
- GPU 사용하는 코드를 test/debug.
- 일정 시간이 지나면 꺼짐 (debug 용이니, 제대로 실행되는지만 확인함)

**GPU workload**
- GPU shell에서 debug 완료된 코드를 실제로 실행하는 단계 (최종 프로그램 실행)
- 코드 실행이 완료되면 자동으로 종료됨.

### Using GPU via Colab
Colab의 환경에서 local GPU로 활용할 수도 있다!
