# Credential 링크 테스트

이 프로젝트는 **Netlify 서버리스 함수**를 이용해 **Credential** 값을 쿼리 파라미터로 전달하고, 해당 값에 따라 **리디렉션**을 수행하는 예제입니다. 두 가지 링크가 제공되며, 각각 **Credential이 없는 링크**와 **Credential이 있는 링크**로 이동합니다.

## 프로젝트 구조
```bash
├── project-root
│   ├── index.html
│   ├── netlify
│   │   ├── redirect.js

```

### index.html

`index.html`은 기본적인 HTML 구조로, 두 개의 링크를 제공합니다:
- **Credential 없이 이동**
- **Credential이 있는 링크로 이동**

링크를 클릭하면 **Credential 값**이 쿼리 파라미터로 포함된 URL을 호출합니다.

### Netlify 서버리스 함수

`redirect.js`는 Netlify 서버리스 함수로, **Credential**을 쿼리 파라미터로 받아서 특정 값이 일치할 경우 **301 리디렉션**을 수행합니다. 기본적으로 `credential=naver`일 때만 리디렉션이 수행되며, 다른 경우는 `403 Unauthorized` 상태 코드와 함께 오류 메시지가 반환됩니다.

## 사용법

### 1. **index.html**

`index.html` 파일에서 두 개의 링크를 클릭할 수 있습니다.

- **Credential 없이 이동**:
    - 해당 링크를 클릭하면 서버리스 함수에 아무 값 없이 요청이 전달됩니다.
    - `credential` 값이 없으면 `403 Unauthorized`가 반환됩니다.

- **Credential이 있는 링크로 이동**:
    - 해당 링크를 클릭하면 쿼리 파라미터로 `credential=naver`를 전달하면서 서버리스 함수에 요청을 보냅니다.
    - 만약 `credential` 값이 `naver`일 경우, `https://naver.com/`으로 리디렉션됩니다.

### 2. **redirect.js** (Netlify 서버리스 함수)

`redirect.js` 파일은 서버리스 함수로, **credential** 값에 따라 리디렉션을 처리합니다.

#### 코드 설명

```javascript
exports.handler = async function (event, context) {
    const params = event.queryStringParameters || {};  // 쿼리 파라미터 가져오기
    const credential = params.credential;  // credential 파라미터 가져오기

    // credential이 'naver'일 때만 리디렉션 수행
    if (credential === 'naver') {
        return {
            statusCode: 301,
            headers: {
                Location: 'https://naver.com/',  // 리디렉션할 URL
            },
        };
    } else {
        // credential이 없거나 잘못된 값일 경우 Unauthorized 처리
        return {
            statusCode: 403,
            body: 'Unauthorized',
        };
    }
};
```

#### 동작 방식
- credential 파라미터가 'naver'일 경우, 301 Moved Permanently 상태 코드와 함께 https://naver.com/으로 리디렉션합니다.
- 다른 값이거나 credential 파라미터가 없을 경우, 403 Unauthorized 상태 코드와 함께 오류 메시지를 반환합니다.


## 외부(앱)에서 참고시
 - 외부 페이지에서 credential 값에 맞는 리디렉션 호출
``` javascript
function redirectToPage(credential) {
    fetch('https://paris-redirect.netlify.app/.netlify/functions/redirect?credential=' + credential)
        .then(response => {
            if (response.status === 301) {
                window.location.href = response.headers.get('Location');
            } else {
                alert('Unauthorized');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// 예시: credential이 'naver'일 경우 리디렉션
redirectToPage('naver');
```

  
