// @ts-check

// 프레임워크 없이 간단한 토이 프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용할 예정(JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API를 사용한다.
 */

const http = require('http');

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [{
        id: 'my_first_post',
        title: 'My first post',
        content: 'Hello!',
    },
    {
        id: 'my_second_post',
        title: 'My second post',
        content: 'World!',
    },
];

/**
 * Post
 * 
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
    const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/;
    const postIdRegexResult = req.url && POSTS_ID_REGEX.exec(req.url) || undefined;

    if (req.url === '/posts' && req.method === 'GET') {
        res.statusCode = 200;
        res.end('List of posts');
    } else if (postIdRegexResult) {
        const postId = postIdRegexResult[1];
        console.log(`postId: ${postId}`);
        res.statusCode = 200;
        res.end('Reading a post');
    } else if (req.url === '/posts' && req.method === 'POST') {
        res.statusCode = 200;
        res.end('Creating post');
    } else {
        res.statusCode = 404;
        res.end('Not Found.');
    }

});

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`The server is listening at port: ${PORT}`);
});