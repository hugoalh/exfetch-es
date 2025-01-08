# exFetch (ES)

[**⚖️** MIT](./LICENSE.md)

[![Deno Land: exfetch](https://img.shields.io/badge/dynamic/json?label=exfetch&labelColor=000000&logo=deno&logoColor=ffffff&style=flat&url=https%3A%2F%2Fapiland.deno.dev%2Fv2%2Fmodules%2Fexfetch&query=%24.latest_version "Deno Land: exfetch")](https://deno.land/x/exfetch)
[![GitHub: hugoalh/exfetch-es](https://img.shields.io/github/v/release/hugoalh/exfetch-es?label=hugoalh/exfetch-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/exfetch-es")](https://github.com/hugoalh/exfetch-es)
[![JSR: @hugoalh/exfetch](https://img.shields.io/jsr/v/@hugoalh/exfetch?label=@hugoalh/exfetch&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/exfetch")](https://jsr.io/@hugoalh/exfetch)
[![NPM: @hugoalh/exfetch](https://img.shields.io/npm/v/@hugoalh/exfetch?label=@hugoalh/exfetch&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/exfetch")](https://www.npmjs.com/package/@hugoalh/exfetch)

An ES (JavaScript & TypeScript) module to extend `fetch`.

## 🌟 Features

- Ability to cache suitable `Request`-`Response`s to reduce network usage and response time.
- Automatically retry on failure requests, preferentially obey the response header `Retry-After`.
- Redirect fine control.
- Simplify URL paginate requests.

## 🔰 Begin

### 🎯 Targets

|  | **Remote** | **JSR** | **NPM** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v1.42.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v18.12.0 | ❌ | ❓ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - Deno Land:**
  ```
  https://deno.land/x/exfetch[@{Tag}]/mod.ts
  ```
- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/exfetch-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/exfetch[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/exfetch[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

- Network \[Deno: `net`\]
  - *Resources*

## 🧩 APIs

- ```ts
  class ExFetch {
    constructor(options: ExFetchOptions = {});
    fetch(input: string | URL, init?: RequestInit): Promise<Response>;
    fetchPaginate(input: string | URL, init?: RequestInit, optionsOverride: ExFetchPaginateOptions = {}): Promise<Response[]>;
  }
  ```
- ```ts
  function exFetch(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response>;
  ```
- ```ts
  function exFetchPaginate(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response[]>;
  ```
- ```ts
  interface ExFetchDelayOptions {
    maximum?: number;
    minimum?: number;
  }
  ```
- ```ts
  interface ExFetchEventCommonPayload {
    statusCode: Response["status"];
    statusText: Response["statusText"];
  }
  ```
- ```ts
  interface ExFetchEventPaginatePayload {
    countCurrent: number;
    countMaximum: number;
    paginateAfter: number;
    paginateURL: URL;
  }
  ```
- ```ts
  interface ExFetchEventRedirectPayload extends ExFetchEventCommonPayload {
    countCurrent: number;
    countMaximum: number;
    redirectAfter: number;
    redirectURL: URL;
  }
  ```
- ```ts
  interface ExFetchEventRetryPayload extends ExFetchEventCommonPayload {
    countCurrent: number;
    countMaximum: number;
    retryAfter: number;
    retryURL: URL;
  }
  ```
- ```ts
  interface ExFetchOptions {
    cacheStorage?: boolean | string | Cache;
    httpStatusCodesRetryable?: number[] | Set<number>;
    paginate?: ExFetchPaginateOptions;
    redirect?: ExFetchRedirectOptions;
    retry?: ExFetchRetryOptions;
    timeout?: number;
    userAgent?: string;
  }
  ```
- ```ts
  interface ExFetchPaginateLinkUpPayload {
    currentHeaderLink: HTTPHeaderLink;
    currentURL: URL;
  }
  ```
- ```ts
  interface ExFetchPaginateOptions {
    delay?: number | ExFetchDelayOptions;
    linkUpNextPage?(param: ExFetchPaginateLinkUpPayload): URL | null | undefined;
    maximum?: number;
    onEvent?(param: ExFetchEventPaginatePayload): void;
    throwOnInvalidHeaderLink?: boolean;
  }
  ```
- ```ts
  interface ExFetchRedirectOptions {
    delay?: number | ExFetchDelayOptions;
    maximum?: number;
    onEvent?(param: ExFetchEventRedirectPayload): void;
  }
  ```
- ```ts
  interface ExFetchRetryOptions {
    delay?: number | ExFetchDelayOptions;
    maximum?: number;
    onEvent?(param: ExFetchEventRetryPayload): void;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [Deno Land](https://deno.land/x/exfetch)
>   - [JSR](https://jsr.io/@hugoalh/exfetch)

## ✍️ Examples

- ```ts
  const responses: Response[] = await exFetchPaginate("https://api.github.com/repos/microsoft/vscode/labels?per_page=100");

  responses.map((response: Response) => {
    return response.ok;
  }).includes(false);
  //=> false (`false` when no broken page, otherwise `true`)

  const result = [];
  for (const response of responses) {
    result.push(...(await response.json()));
  }
  result;
  /*=>
  [
    {
      "id": 2339554941,
      "node_id": "MDU6TGFiZWwyMzM5NTU0OTQx",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/:apple:%20si",
      "name": ":apple: si",
      "color": "e99695",
      "default": false,
      "description": "Issues related to apple silicon"
    },
    {
      "id": 421131022,
      "node_id": "MDU6TGFiZWw0MjExMzEwMjI=",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/*as-designed",
      "name": "*as-designed",
      "color": "E2A1C2",
      "default": false,
      "description": "Described behavior is as designed"
    },
    {
      "id": 409283388,
      "node_id": "MDU6TGFiZWw0MDkyODMzODg=",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/*caused-by-extension",
      "name": "*caused-by-extension",
      "color": "E2A1C2",
      "default": false,
      "description": "Issue identified to be caused by an extension"
    },
    {
      "id": 766755777,
      "node_id": "MDU6TGFiZWw3NjY3NTU3Nzc=",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/*dev-question",
      "name": "*dev-question",
      "color": "E2A1C2",
      "default": false,
      "description": "VS Code Extension Development Question"
    },
    {
      "id": 366106217,
      "node_id": "MDU6TGFiZWwzNjYxMDYyMTc=",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/*duplicate",
      "name": "*duplicate",
      "color": "E2A1C2",
      "default": false,
      "description": "Issue identified as a duplicate of another issue(s)"
    },
    ... +467
  ]
  */
  ```
