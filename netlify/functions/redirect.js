exports.handler = async function (event, context) {
    const params = event.queryStringParameters || {};
    const credential = params.credential;

    if (credential === 'naver') {
        return {
            statusCode: 301,
            headers: {
                Location: 'https://naver.com/',  // 리디렉션할 URL을 naver.com으로 변경
            },
        };
    } else {
        return {
            statusCode: 403,
            body: 'Unauthorized',
        };
    }
};
