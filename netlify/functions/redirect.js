exports.handler = async function (event, context) {
    const params = event.queryStringParameters || {};
    const credential = params.credential;

    if (credential === 'chatbot') {
        return {
            statusCode: 301,
            headers: {
                Location: 'http://pf.kakao.com/_xfWbRn',  // 리디렉션할 URL을 naver.com으로 변경
            },
        };
    } else {
        return {
            statusCode: 403,
            body: 'Unauthorized',
        };
    }
};
