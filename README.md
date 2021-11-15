# Cloning Youtube with NodeJS (현재 서비스 중지)

### 사용한 스택

- Node JS (express)
- MongoDB & AWS S3(storage)
- Pug(view)

### 기능 구현

1. 사용자 기능
   - 회원가입
   - 로그인
   - 프로필 편집
2. 게시글 기능
   - 올리기
   - 편집하기
   - 삭제하기

### 추가 기능 정리

1. 사용자 보안
2. 배포 과정(실행가능한 코드로 변환)
   - build:server : js코드를 ES6 이전 버전으로 변환하고 build폴더에 저장
   - build:assets : 클라이언트 코드(프론트 코드) 빌드 -> 모든 코드가 한 줄로 압축되어 표현되는 것을 볼 수 있다.(대부분의 브라우저에서 이해할 수 있게)
   - heroku에 서버 배포
     - 주의사항 : heroku는 깃 히스토리를 보기 때문에 commit하지 않은 코드는 볼 수 없다.
     - copyAll : view파일을 heroku에서도 build 파일 안으로 모두 copy한다.
       - 리눅스 기반에 heroku에서 unix command를 사용하기 위해서 shx라는 모듈 사용
