// functions/redirect.js
exports.handler = async function (event, context) {
    const { headers } = event;

    // 헤더에 'Credential'이 'naver'인지 확인
    if (headers['credential'] !== 'naver') {
        return {
            statusCode: 403,
            body: JSON.stringify({ message: 'Unauthorized' })
        };
    }

    // 리디렉션을 수행 (naver.com으로)
    return {
        statusCode: 301,
        headers: {
            'Location': 'https://naver.com/',  // 리디렉션할 URL을 naver.com으로 변경
            'Access-Control-Allow-Origin': '*',  // 모든 출처에서 접근 허용
            'Access-Control-Allow-Methods': 'GET',  // GET 메소드 허용
            'Access-Control-Allow-Headers': 'Credential'  // 'Credential' 헤더 허용
        },
    };
};
