# cf-edge

Practice cloudflare workers.

Cloudflare Workers provides a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.

and We start as FREE.

## Quickstart

Superfast.

### 1. wrangler login

```bash
wrangler login
```

### 2-1. wrangler generate

```bash
wrangler generate <project-name>
```

### 2-2. or create own project

```bash
mkdir <project-name>
```

### 3. wrangler init

If you start with `generate`, you don't need this.

```bash
wrangler init
```

and there is created `wrangler.toml` file.

specify your cloudflare workers options at `wragler.toml`.

As you see, `type` is very important.

`type` can has some types.

- javascript
- webpack
- ...

If you have to return web html pages, you can use `webpack`.

```toml
type = "webpack"
```

But also you can use `javascript` such as service-worker.

```toml
type = "javascript"
```

### 4. typescript

you can use typescript.

```bash
yarn add -D typescript
```

```bash
yarn tsc --init
```

and you set `tsconfig.json` file.

```json
{
  "lib": ["ESNext"],
  "module": "ESNext",
  "types": ["@cloudflare/workers-types"]
}
```

if you need to use `node`, you have to add `node` in `types`.

```json
{
  ...,
  "types": [
    "node",
    "@cloudflare/workers-types"
  ]
}
```

and run `tsc`

### 5. implements handler

We need to implement `handler` function in `cloudflare workers`

```ts
addEventListener('fetch', (event) => {
  event.respondWith(handler(event.request));
});

async function handler(request: Request): Promise<Response> {
  return new Response('Hello World!');
}
```

### 6. dev

you can run for development.

```bash
wrangler dev
```

```bash
👂  Listening on http://127.0.0.1:8787
🌀  Detected changes...
💁  Ignoring stale first change

[2021-12-26 19:24:37] GET cf-edge.seo-edge.workers.dev/example/pot HTTP/1.1 200 OK
```

### 7. publish

To Cloudflare Workers, you can publish.

```bash
$ wrangler publish
✨  Built successfully, built project size is 8 KiB.
✨  Successfully published your script to
 https://cf-edge.seo-edge.workers.dev
```

Um... done?

## Let's see official docs about various examples.

- https://developers.cloudflare.com/workers/get-started/quickstarts
- https://developers.cloudflare.com/workers/examples

## Why to use

서버리스 플랫폼을 Cloudflare에서 cloudflare-workers라는 이름으로 제공한다.

특히 클라우드플레어 서버리스 장점으로 보이는 것은 콜드스타트를 없앴다고 한다.

TLS 핸드쉐이크 구간이 커넥션을 맺을 때 반드시 필요하지만 시간이 꽤 걸린다는 것은 대부분 사람들은 알 것이다.

클라우드플레어는 이 구간을 현명하게 이용했다.

클라우드플레어는 TLS 핸드쉐이크 동안 서버리스 기능을 미리 가동하여 이 문제를 해결했다.

핸드쉐이크를 완료하는데 필요한 시간보다 훨씬 짧은 시간에 가동을 마무리한다.

또한, 클라우드플레어는 다양한 놀라운 기능들을 가지고 있다. 대부분 무료로 시작해볼 수 있다.

## LICENSE

[MIT](./LICENSE)
