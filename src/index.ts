import { Router } from 'itty-router';

const router = Router();

/**
 * GET index
 */
router.get('/', () => {
  return new Response('You are on the home page!@!');
});

type PathParams = {
  text: string;
};

/**
 * GET with path params
 *
 * @see https://github.com/cloudflare/worker-template-router/blob/master/index.js
 */
router.get('/example/:text', ({ params }: { params: PathParams }) => {
  // "hello%20world" -> "hello world"
  let input = decodeURIComponent(params.text);
  // construct buffer
  let buffer = Buffer.from(input, 'utf8');
  // serialize into base64
  let base64 = buffer.toString('base64');

  // return the HTML with the string to the client
  return new Response(`<p>Base64 encoding: <code>${base64}</code></p>`, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
});

/**
 * POST
 */
type ExtendRequest = Request & {
  cf: {
    asn: string;
    colo: string;
  };
};

router.post('/post', async (request: ExtendRequest) => {
  // create a base project with some fields.

  let fields = {
    asn: request.cf.asn,
    colo: request.cf.colo,
  };

  // If the post data is JSON then attach it to our response.
  if (request.headers.get('Content-Type') === 'application/json') {
    fields = {
      ...fields,
      ...(await request.json()),
    };
  }

  const returnData = JSON.stringify(fields, null, 2);

  return new Response(returnData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

/**
 * Catch-All Route
 */
router.all('*', () => new Response('404, not found', { status: 404 }));

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request));
});
