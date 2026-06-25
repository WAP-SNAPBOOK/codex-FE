# SnapBook FE Deployment

## 배포 방식

이 프론트엔드는 Vite 기반 SPA라서 정적 호스팅으로 배포합니다.

- 권장 호스팅: Netlify
- 빌드 결과물: `dist`
- SPA 라우팅 fallback: `public/_redirects`
- 권장 Node 버전: `20.19.0`

현재 백엔드 레포 `../BE` 기준으로 운영 배포 값은 아래와 맞물려 있습니다.

- API 서버: `https://snapbook.store`
- WebSocket/SockJS 엔드포인트: `https://snapbook.store/ws-connect`
- 프론트 운영 URL: `https://snapbook-web.netlify.app`
- 카카오 Redirect URI: `https://snapbook-web.netlify.app/auth`

## 프런트 환경변수

운영 배포 기준 예시는 [`../.env.production.example`](../.env.production.example) 파일을 그대로 쓰면 됩니다.

필수값:

- `VITE_API_BASE_URL`
- `VITE_SOCKET_URL`
- `VITE_KAKAO_REST_API_KEY`
- `VITE_KAKAO_REDIRECT_URI`
- `VITE_KAKAO_LOGIN_MODE`

로컬 개발 기준 예시는 [`../.env.local.example`](../.env.local.example) 파일을 참고하면 됩니다.

## Netlify 설정

이 레포에는 Netlify용 설정 파일 [`../netlify.toml`](../netlify.toml) 이 포함되어 있습니다.

Netlify 프로젝트 설정값:

- Base directory: 비움
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20.19.0`

SPA fallback은 [`../public/_redirects`](../public/_redirects) 로 처리됩니다.

## 배포 순서

1. Netlify에 이 FE 레포를 연결합니다.
2. 환경변수는 [`../.env.production.example`](../.env.production.example) 기준으로 등록합니다.
3. 첫 배포 후 프런트 URL이 `https://snapbook-web.netlify.app` 와 다르면, 백엔드와 카카오 설정을 함께 수정합니다.
4. `/`, `/auth`, `/s/test`, `/chat/1` 직접 접근이 모두 열리는지 확인합니다.

## 백엔드와 같이 바꿔야 하는 값

프런트 도메인을 `snapbook-web.netlify.app` 그대로 쓰지 않으면 백엔드도 같이 수정해야 합니다.

백엔드 확인 기준:

- 운영 프런트 URL: `../BE/src/main/resources/application.yml`
- 카카오 운영 Redirect URI: `../BE/src/main/resources/application.yml`
- CORS 허용 오리진: `../BE/src/main/java/com/example/easybooking/auth/SecurityConfig.java`
- 공개 링크 리다이렉트 대상: `../BE/src/main/java/com/example/easybooking/link/ShortLinkController.java`

수정 포인트:

- `frontend-base-url`
- `spring.kakao.auth.redirect`
- `SecurityConfig.corsConfigurationSource()` 의 `allowedOriginPatterns`

참고로 공개 링크는 백엔드가 `https://snapbook.store/s/{slugOrCode}` 형태로 만들고, 그 요청을 다시 프런트 `/s/{slugOrCode}` 로 넘깁니다. 그래서 프런트 도메인만 바꾸면 끝나지 않습니다.

## 검증 체크리스트

- 카카오 로그인 시작 후 `https://<frontend-domain>/auth?code=...` 로 돌아온다.
- 프런트에서 `POST /oauth/login/kakao` 호출이 200으로 끝난다.
- 프런트에서 `POST /auth/refresh` 호출이 정상 동작한다.
- `GET /s/{slugOrCode}` 로 진입했을 때 프런트 `/s/{slugOrCode}` 로 연결된다.
- 채팅방 진입 시 SockJS 연결이 `https://<api-domain>/ws-connect` 로 성공한다.
- 이미지 업로드가 `POST /api/files/upload` 에서 정상 동작한다.

## 도메인을 바꿀 때 예시

예를 들어 프런트를 `https://app.snapbook.store` 로 바꾸려면 아래를 같이 맞춰야 합니다.

- FE `VITE_KAKAO_REDIRECT_URI=https://app.snapbook.store/auth`
- BE `frontend-base-url=https://app.snapbook.store`
- BE `spring.kakao.auth.redirect=https://app.snapbook.store/auth`
- BE CORS 허용 오리진에 `https://app.snapbook.store` 추가
- 카카오 개발자 콘솔 Redirect URI에 `https://app.snapbook.store/auth` 등록
