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

    // 리디렉션을 수행
    return {
        statusCode: 301,
        headers: {
            Location: 'http://naver.com/', // 리디렉션할 URL
        },
    };
};
