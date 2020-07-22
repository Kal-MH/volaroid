Cloning Youtube with NodeJS

1. IncomingMessage

- localStrategy에서 joinFunction으로 값을 넘겨받을 때, IncomingMessage로 넘겨받는다.

2. this

- Arrow function에서는 this가 정의되지 않는다.

3. multer

- multer는 upload를 먼저하고, req를 채워준다.

4. Cannot set headers after they are sent to the client

- https://velog.io/@kim-macbook/Cannot-set-headers-after-they-are-sent-to-the-client
- userController.js에서 user 객체 찾는 부분을 if문 안에 넣으니 해결.

5. "copyAll": "shx XCOPY src\\static\\_ build\\static\\_ /e /h /k /y && shx XCOPY src\\views\\_ build\\views\\_ /e /h /k /y",
