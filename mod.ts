import { HTTPHeaderLink } from "https://raw.githubusercontent.com/hugoalh/http-header-link-es/v1.0.3/mod.ts";
import { HTTPHeaderRetryAfter } from "https://raw.githubusercontent.com/hugoalh/http-header-retry-after-es/v1.1.0/mod.ts";
const userAgentExFetch: string = `exFetch/0.6.0`;
/**
 * exFetch redirect event payload.
 */
export interface ExFetchEventRedirectPayload {
	/**
	 * Current count of the redirects, begin from `1`.
	 */
	countCurrent: number;
	/**
	 * Maximum number of the redirects allowed.
	 */
	countMaximum: number;
	/**
	 * Wait time before proceed the redirect, in milliseconds.
	 */
	timeWait: number;
	/**
	 * URL of redirect from.
	 */
	urlFrom: URL;
	/**
	 * URL of redirect to.
	 */
	urlTo: URL;
}
/**
 * exFetch retry event payload.
 */
export interface ExFetchEventRetryPayload {
	/**
	 * Current count of the retries, begin from `1`.
	 */
	countCurrent: number;
	/**
	 * Maximum number of the retries allowed.
	 */
	countMaximum: number;
	/**
	 * Status code of the current request response.
	 */
	statusCode: Response["status"];
	/**
	 * Status text of the current request response.
	 */
	statusText: Response["statusText"];
	/**
	 * Wait time before retry the request, in milliseconds.
	 */
	timeWait: number;
	/**
	 * URL of the request.
	 */
	url: URL;
}
/**
 * exFetch URL paginate event payload.
 */
export interface ExFetchEventURLPaginatePayload {
	/**
	 * Current count of the paginates, begin from `2`.
	 */
	countCurrent: number;
	/**
	 * Maximum number of the paginates allowed.
	 */
	countMaximum: number;
	/**
	 * Wait time before request the next paginate, in milliseconds.
	 */
	timeWait: number;
	/**
	 * URL of the current paginate.
	 */
	urlCurrent: URL;
	/**
	 * URL of the next paginate.
	 */
	urlNext: URL;
}
/**
 * exFetch timespan options.
 */
export interface ExFetchTimespanOptions {
	/**
	 * Maximum timespan, in milliseconds.
	 */
	maximum?: number;
	/**
	 * Minimum timespan, in milliseconds.
	 */
	minimum?: number;
}
type ExFetchTimespanOptionsInternal = Required<ExFetchTimespanOptions>;
const timespanImmediately: ExFetchTimespanOptionsInternal = {
	maximum: 0,
	minimum: 0
};
/**
 * exFetch URL paginate linker payload.
 */
export interface ExFetchURLPaginateLinkerPayload {
	/**
	 * Header `Link` of the current URL paginate.
	 */
	link: HTTPHeaderLink;
	/**
	 * URL of the current URL paginate.
	 */
	urlCurrent: URL;
}
/**
 * exFetch paginate options.
 */
export interface ExFetchPaginateOptions<TS extends number | ExFetchTimespanOptions | ExFetchTimespanOptionsInternal = number | ExFetchTimespanOptions> {
	/**
	 * Maximum amount of the paginates to allow.
	 * @default {Infinity}
	 */
	maximum?: number;
	/**
	 * Event listener for the URL paginates, will trigger before the wait time between the paginates.
	 * @param {ExFetchEventURLPaginatePayload} param Event payload of the paginate.
	 * @returns {void}
	 */
	onURLPaginate?(param: ExFetchEventURLPaginatePayload): void;
	/**
	 * Whether to throw error when the response provide an invalid HTTP header `Link`.
	 * @default {true}
	 */
	throwOnInvalidHeaderLink?: boolean;
	/**
	 * Wait time between the paginates, in milliseconds. By default, it is "immediately", or more accurately, the next event cycle.
	 */
	timeWait?: TS;
	/**
	 * Custom function for correctly link to the next URL paginate, useful for the endpoints which not correctly return an absolute or relative URL.
	 * @param {ExFetchURLPaginateLinkerPayload} param Linker payload of the URL paginate.
	 * @returns {URL | null | undefined} URL of the next URL paginate.
	 */
	urlLinker?(param: ExFetchURLPaginateLinkerPayload): URL | null | undefined;
}
type ExFetchPaginateOptionsInternal = Required<Omit<ExFetchPaginateOptions<ExFetchTimespanOptionsInternal>, "onURLPaginate">> & Pick<ExFetchPaginateOptions<ExFetchTimespanOptionsInternal>, "onURLPaginate">;
/**
 * exFetch redirect options.
 */
export interface ExFetchRedirectOptions<TS extends number | ExFetchTimespanOptions | ExFetchTimespanOptionsInternal = number | ExFetchTimespanOptions> {
	/**
	 * Maximum amount of the redirects to allow.
	 * @default {Infinity}
	 */
	maximum?: number;
	/**
	 * Event listener for the redirects, will trigger before the wait time between the redirects.
	 * @param {ExFetchEventRedirectPayload} param Event payload of the redirect.
	 * @returns {void}
	 */
	onRedirect?(param: ExFetchEventRedirectPayload): void;
	/**
	 * Wait time between the redirects, in milliseconds. By default, it is "immediately", or more accurately, the next event cycle.
	 */
	timeWait?: TS;
}
type ExFetchRedirectOptionsInternal = Required<Omit<ExFetchRedirectOptions<ExFetchTimespanOptionsInternal>, "onRedirect">> & Pick<ExFetchRedirectOptions<ExFetchTimespanOptionsInternal>, "onRedirect">;
/**
 * exFetch retry options.
 */
export interface ExFetchRetryOptions<TS extends number | ExFetchTimespanOptions | ExFetchTimespanOptionsInternal = number | ExFetchTimespanOptions> {
	/**
	 * Maximum amount of the retries to allow.
	 * @default {3}
	 */
	maximum?: number;
	/**
	 * Event listener for the retries, will trigger before the wait time between the retries.
	 * @param {ExFetchEventRetryPayload} param Event payload of the retry.
	 * @returns {void}
	 */
	onRetry?(param: ExFetchEventRetryPayload): void;
	/**
	 * Wait time between the retries, in milliseconds. By default, it is defined by the endpoint which provide retry information in the response.
	 */
	timeWait?: TS;
}
type ExFetchRetryOptionsInternal = Required<Omit<ExFetchRetryOptions<ExFetchTimespanOptionsInternal>, "onRetry">> & Pick<ExFetchRetryOptions<ExFetchTimespanOptionsInternal>, "onRetry">;
/**
 * exFetch status codes options.
 */
export interface ExFetchStatusCodesOptions {
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	301?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	302?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	303?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	307?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	308?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	408?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	429?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	500?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	502?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	503?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	504?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	506?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	507?: boolean;
	/**
	 * Whether to allow {@linkcode ExFetch} handle the responses which have the status code.
	 * @default {true}
	 */
	508?: boolean;
}
export interface ExFetchOptions {
	/**
	 * Whether to cache suitable {@linkcode Request}-{@linkcode Response}`s.
	 * 
	 * - `false`: Disable cache.
	 * - `true`: Enable cache with default cache storage name, manage automatically.
	 * - `string`: Enable cache with specify cache storage name, manage automatically.
	 * - `Cache`: Enable cache, manage manually.
	 * @default {false}
	 */
	cacheStorage?: boolean | string | Cache;
	/**
	 * Paginate options.
	 */
	paginate?: ExFetchPaginateOptions;
	/**
	 * Redirect options; Only apply when the request property {@linkcode RequestInit.redirect} is `"follow"` and option property {@linkcode ExFetchRedirectOptions.maximum} is defined.
	 */
	redirect?: ExFetchRedirectOptions;
	/**
	 * Retry options.
	 */
	retry?: ExFetchRetryOptions;
	/**
	 * Status codes options.
	 */
	statusCodes?: ExFetchStatusCodesOptions;
	/**
	 * Timeout of the request (include the redirects and the retries), in milliseconds.
	 * @default {Infinity}
	 */
	timeout?: number;
	/**
	 * Customize user agent; Only apply to the requests which not defined.
	 */
	userAgent?: string;
	/**
	 * Whether to append the exFetch information to each requests.
	 * @default {true}
	 */
	userAgentExFetchInfo?: boolean;
}
function resolveTimespanOptions(parameterName: string, input: number | ExFetchTimespanOptions, original: ExFetchTimespanOptionsInternal): ExFetchTimespanOptionsInternal {
	if (typeof input === "number") {
		if (!(Number.isSafeInteger(input) && input >= 0)) {
			throw new RangeError(`\`${input}\` (parameter \`${parameterName}\`) is not a number which is integer, positive, and safe!`);
		}
		return {
			maximum: input,
			minimum: input
		};
	}
	let {
		maximum,
		minimum
	}: ExFetchTimespanOptionsInternal = original;
	if (typeof input.maximum !== "undefined") {
		if (!(Number.isSafeInteger(input.maximum) && input.maximum >= 0)) {
			throw new RangeError(`\`${input.maximum}\` (parameter \`${parameterName}.maximum\`) is not a number which is integer, positive, and safe!`);
		}
		maximum = input.maximum;
	}
	if (typeof input.minimum !== "undefined") {
		if (!(Number.isSafeInteger(input.minimum) && input.minimum >= 0)) {
			throw new RangeError(`\`${input.minimum}\` (parameter \`${parameterName}.minimum\`) is not a number which is integer, positive, and safe!`);
		}
		minimum = input.minimum;
	}
	if (!(minimum <= maximum)) {
		throw new RangeError(`\`${minimum}\` (parameter \`${parameterName}.minimum\`) is large than \`${maximum}\` (parameter \`${parameterName}.maximum\`)!`);
	}
	return {
		maximum,
		minimum
	};
}
function resolveTimespanTime(timespan: ExFetchTimespanOptionsInternal): number {
	const {
		maximum,
		minimum
	}: ExFetchTimespanOptionsInternal = timespan;
	if (maximum === minimum) {
		return maximum;
	}
	return (Math.random() * (maximum - minimum) + minimum);
}
/**
 * Start a `Promise` based delay with `AbortSignal`.
 * @param {number} value Time of the delay, by milliseconds. `0` means execute "immediately", or more accurately, the next event cycle.
 * @param {AbortSignal} [signal] A signal object that allow to communicate with a DOM request and abort it if required via an `AbortController` object.
 * @returns {Promise<void>}
 */
function setTimer(value: number, signal?: AbortSignal): Promise<void> {
	if (value <= 0) {
		return Promise.resolve();
	}
	if (signal?.aborted) {
		return Promise.reject(signal.reason);
	}
	return new Promise((resolve, reject): void => {
		function abort(): void {
			clearTimeout(id);
			reject(signal?.reason);
		}
		function done(): void {
			signal?.removeEventListener("abort", abort);
			resolve();
		}
		const id: number = setTimeout(done, value);
		signal?.addEventListener("abort", abort, { once: true });
	});
}
/**
 * Extend `fetch`.
 */
export class ExFetch {
	#cacheStorage?: Cache;
	#cacheStorageSettle?: Promise<Cache>;
	#paginate: ExFetchPaginateOptionsInternal;
	#redirect: ExFetchRedirectOptionsInternal;
	#retry: ExFetchRetryOptionsInternal;
	#statusCodes: Required<ExFetchStatusCodesOptions>;
	#timeout: number;
	#userAgent: string;
	#userAgentExFetchInfo: boolean;
	/**
	 * Create a new extend `fetch` instance.
	 * @param {ExFetchOptions} [options={}] Options.
	 */
	constructor(options: ExFetchOptions = {}) {
		const {
			cacheStorage = false,
			paginate = {},
			redirect = {},
			retry = {},
			statusCodes = {},
			timeout = Infinity,
			userAgent,
			userAgentExFetchInfo = true
		} = options;
		if (typeof globalThis.Cache !== "undefined") {
			if (cacheStorage instanceof globalThis.Cache) {
				this.#cacheStorage = cacheStorage;
			} else if (typeof cacheStorage === "boolean") {
				if (cacheStorage) {
					this.#cacheStorageSettle = globalThis.caches.open("exFetch");
				}
			} else {
				this.#cacheStorageSettle = globalThis.caches.open(cacheStorage);
			}
		}
		if (typeof paginate.maximum !== "undefined") {
			if (!(
				paginate.maximum === Infinity ||
				(Number.isSafeInteger(paginate.maximum) && paginate.maximum > 0)
			)) {
				throw new RangeError(`\`${paginate.maximum}\` (parameter \`options.paginate.maximum\`) is not \`Infinity\`, or a number which is integer, safe, and > 0!`);
			}
		}
		this.#paginate = {
			maximum: paginate.maximum ?? Infinity,
			onURLPaginate: paginate.onURLPaginate,
			throwOnInvalidHeaderLink: paginate.throwOnInvalidHeaderLink ?? true,
			timeWait: (typeof paginate.timeWait !== "undefined") ? resolveTimespanOptions(`options.paginate.timeWait`, paginate.timeWait, timespanImmediately) : timespanImmediately,
			urlLinker: paginate.urlLinker ?? (({
				link,
				urlCurrent
			}: ExFetchURLPaginateLinkerPayload): URL | undefined => {
				const result: string | undefined = link.getByRel("next")[0]?.[0] ?? undefined;
				return ((typeof result !== "undefined") ? new URL(result, urlCurrent) : undefined);
			})
		};
		if (typeof redirect.maximum !== "undefined") {
			if (!(
				redirect.maximum === Infinity ||
				(Number.isSafeInteger(redirect.maximum) && redirect.maximum >= 0)
			)) {
				throw new RangeError(`\`${redirect.maximum}\` (parameter \`options.redirect.maximum\`) is not \`Infinity\`, or a number which is integer, positive, and safe!`);
			}
		}
		this.#redirect = {
			maximum: redirect.maximum ?? Infinity,
			onRedirect: redirect.onRedirect,
			timeWait: (typeof redirect.timeWait !== "undefined") ? resolveTimespanOptions(`options.redirect.timeWait`, redirect.timeWait, timespanImmediately) : timespanImmediately
		};
		if (typeof retry.maximum !== "undefined") {
			if (!(Number.isSafeInteger(retry.maximum) && retry.maximum >= 0)) {
				throw new RangeError(`\`${retry.maximum}\` (parameter \`options.retry.maximum\`) is not a number which is integer, positive, and safe!`);
			}
		}
		this.#retry = {
			maximum: retry.maximum ?? 3,
			onRetry: retry.onRetry,
			timeWait: (typeof retry.timeWait !== "undefined") ? resolveTimespanOptions(`options.retry.timeWait`, retry.timeWait, timespanImmediately) : timespanImmediately
		};
		if (!(
			timeout === Infinity ||
			(Number.isSafeInteger(timeout) && timeout > 0)
		)) {
			throw new RangeError(`\`${timeout}\` (parameter \`options.timeout\`) is not \`Infinity\`, or a number which is integer, safe, and > 0!`);
		}
		this.#statusCodes = {
			301: statusCodes[301] ?? true,
			302: statusCodes[302] ?? true,
			303: statusCodes[303] ?? true,
			307: statusCodes[307] ?? true,
			308: statusCodes[308] ?? true,
			408: statusCodes[408] ?? true,
			429: statusCodes[429] ?? true,
			500: statusCodes[500] ?? true,
			502: statusCodes[502] ?? true,
			503: statusCodes[503] ?? true,
			504: statusCodes[504] ?? true,
			506: statusCodes[506] ?? true,
			507: statusCodes[507] ?? true,
			508: statusCodes[508] ?? true
		};
		this.#timeout = timeout;
		this.#userAgent = userAgent ?? navigator?.userAgent ?? "";
		this.#userAgentExFetchInfo = userAgentExFetchInfo;
	}
	async #settleCacheStorage(): Promise<void> {
		if (typeof this.#cacheStorageSettle !== "undefined") {
			this.#cacheStorage = await this.#cacheStorageSettle;
			this.#cacheStorageSettle = undefined;
		}
	}
	async #addCache(condition: boolean, request: RequestInfo, response: Response): Promise<void> {
		if (!condition) {
			return;
		}
		await this.#settleCacheStorage();
		return this.#cacheStorage?.put(request, response).catch((): void => { });
	}
	async #getCache(condition: boolean, request: RequestInfo): Promise<Response | undefined> {
		if (!condition) {
			return undefined;
		}
		await this.#settleCacheStorage();
		return this.#cacheStorage?.match(request).catch((): undefined => {
			return undefined;
		});
	}
	/**
	 * Fetch single resource from the network.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Network \[Deno: `net`\]
	 * >   - *Resources*
	 * @param {string | URL} input URL of the resource.
	 * @param {RequestInit} [init] Custom setting that apply to the request.
	 * @returns {Promise<Response>} Response.
	 */
	async single(input: string | URL, init?: RequestInit): Promise<Response> {
		const inputFmt: URL = new URL(input);
		if (inputFmt.protocol === "file:") {
			return fetch(input, init);
		}
		const controlCache: boolean = inputFmt.protocol === "https:" && init?.cache !== "no-store" && (
			typeof init === "undefined" ||
			typeof init.method === "undefined" ||
			init.method.toUpperCase() === "GET"
		);
		const controlRedirect: boolean = this.#redirect.maximum !== Infinity && (
			typeof init === "undefined" ||
			typeof init.redirect === "undefined" ||
			init.redirect === "follow"
		);
		const requestFuzzy: Request = new Request(inputFmt, {
			...init,
			cache: undefined,
			keepalive: undefined,
			mode: undefined,
			redirect: undefined,
			signal: undefined,
			window: undefined
		});
		const responseCached: Response | undefined = await this.#getCache(controlCache && init?.cache !== "reload", requestFuzzy);
		if (init?.cache === "force-cache" && typeof responseCached !== "undefined") {
			return responseCached;
		}
		const responseCachedETag: string | undefined = responseCached?.headers.get("ETag") ?? undefined;
		const responseCachedLastModified: string | undefined = responseCached?.headers.get("Last-Modified") ?? undefined;
		let responseCachedIsValid: boolean = false;
		const requestHeaders: Headers = new Headers(init?.headers);
		if (!requestHeaders.has("If-Match") && !requestHeaders.has("If-None-Match") && !requestHeaders.has("If-Range") && typeof responseCachedETag !== "undefined") {
			responseCachedIsValid = true;
			requestHeaders.set("If-None-Match", responseCachedETag);
		}
		if (!requestHeaders.has("If-Modified-Since") && !requestHeaders.has("If-Unmodified-Since") && !requestHeaders.has("If-Range") && typeof responseCachedLastModified !== "undefined") {
			responseCachedIsValid = true;
			requestHeaders.set("If-Modified-Since", responseCachedLastModified);
		}
		if (!requestHeaders.has("User-Agent") && this.#userAgent.length > 0) {
			requestHeaders.set("User-Agent", this.#userAgent);
		}
		if (this.#userAgentExFetchInfo) {
			const uaValues: string[] = [];
			const uaOriginal: string | null = requestHeaders.get("User-Agent");
			if (uaOriginal !== null) {
				uaValues.push(uaOriginal);
			}
			uaValues.push(userAgentExFetch);
			requestHeaders.set("User-Agent", uaValues.join(" "));
		}
		const requestSignal: AbortSignal | undefined = init?.signal ?? ((this.#timeout === Infinity) ? undefined : AbortSignal.timeout(this.#timeout));
		let requestFetchInput: string | URL = inputFmt;
		const requestFetchInit: RequestInit = {
			...init,
			headers: requestHeaders,
			redirect: controlRedirect ? "manual" : init?.redirect,
			signal: requestSignal
		};
		let countRedirects: number = 0;
		let countRetries: number = 0;
		let response: Response;
		while (true) {
			response = await fetch(requestFetchInput, requestFetchInit);
			if (response.status === 304) {
				if (typeof responseCached !== "undefined" && responseCachedIsValid) {
					return responseCached;
				}
				break;
			}
			if ((
				response.status === 301 ||
				response.status === 302 ||
				response.status === 303 ||
				response.status === 307 ||
				response.status === 308
			) && this.#statusCodes[response.status] && controlRedirect && countRedirects < this.#redirect.maximum) {
				const redirectURL: string | null = response.headers.get("Location");
				if (redirectURL === null) {
					break;
				}
				try {
					requestFetchInput = new URL(redirectURL, inputFmt);
				} catch {
					break;
				}
				countRedirects += 1;
				const timeWait: number = resolveTimespanTime(this.#redirect.timeWait);
				this.#redirect.onRedirect?.({
					countCurrent: countRedirects,
					countMaximum: this.#redirect.maximum,
					timeWait,
					urlFrom: new URL(inputFmt),
					urlTo: new URL(requestFetchInput)
				});
				await setTimer(timeWait, requestSignal);
				continue;
			}
			if ((
				response.status === 408 ||
				response.status === 429 ||
				response.status === 500 ||
				response.status === 502 ||
				response.status === 503 ||
				response.status === 504 ||
				response.status === 506 ||
				response.status === 507 ||
				response.status === 508
			) && this.#statusCodes[response.status] && countRetries < this.#retry.maximum) {
				countRetries += 1;
				let timeWait: number;
				try {
					timeWait = new HTTPHeaderRetryAfter(response).getRemainTimeMilliseconds();
				} catch {
					timeWait = resolveTimespanTime(this.#retry.timeWait);
				}
				this.#retry.onRetry?.({
					countCurrent: countRetries,
					countMaximum: this.#retry.maximum,
					statusCode: response.status,
					statusText: response.statusText,
					timeWait,
					url: new URL(requestFetchInput)
				});
				await setTimer(timeWait, requestSignal);
				continue;
			}
			break;
		}
		this.#addCache(controlCache && response.ok && (
			response.headers.has("ETag") ||
			response.headers.has("Last-Modified")
		), requestFuzzy, response);
		return response;
	}
	/**
	 * Fetch URL paginate resources from the network.
	 * 
	 * > **🛡️ Runtime Permissions**
	 * > 
	 * > - Network \[Deno: `net`\]
	 * >   - *Resources*
	 * @param {string | URL} input URL of the first page of the resources.
	 * @param {RequestInit} init Custom setting that apply to each request.
	 * @returns {Promise<Response[]>} Responses.
	 */
	async urlPaginate(input: string | URL, init?: RequestInit): Promise<Response[]> {
		const responses: Response[] = [];
		for (let countCurrent: number = 1, urlCurrent: URL | null | undefined = undefined, urlNext: URL | null | undefined = new URL(input); countCurrent <= this.#paginate.maximum && typeof urlNext !== "undefined" && urlNext !== null; countCurrent += 1) {
			if (countCurrent > 1) {
				const timeWait: number = resolveTimespanTime(this.#paginate.timeWait);
				this.#paginate.onURLPaginate?.({
					countCurrent,
					countMaximum: this.#paginate.maximum,
					timeWait,
					urlCurrent: new URL(urlCurrent!),
					urlNext: new URL(urlNext)
				});
				await setTimer(timeWait, init?.signal ?? undefined);
			}
			urlCurrent = urlNext;
			urlNext = undefined;
			const response: Response = await this.single(urlCurrent, init);
			responses.push(response);
			if (response.ok) {
				let responseHeaderLink: HTTPHeaderLink | undefined = undefined;
				try {
					responseHeaderLink = HTTPHeaderLink.parse(response);
				} catch (error) {
					if (this.#paginate.throwOnInvalidHeaderLink) {
						throw new SyntaxError(`Unable to parse the response header \`Link\` from \`${urlCurrent.toString()}\`: ${(error as Error)?.message ?? error}`);
					}
				}
				if (typeof responseHeaderLink !== "undefined") {
					urlNext = this.#paginate.urlLinker({
						link: responseHeaderLink,
						urlCurrent
					});
				}
			}
		}
		return responses;
	}
}
export default ExFetch;
/**
 * Fetch a resource from the network.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Network \[Deno: `net`\]
 * >   - *Resources*
 * @param {string | URL} input URL of the resource.
 * @param {RequestInit} init Custom setting that apply to the request.
 * @param {ExFetchOptions} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
export function exFetch(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response> {
	return new ExFetch(options).single(input, init);
}
/**
 * Fetch URL paginate resources from the network.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - Network \[Deno: `net`\]
 * >   - *Resources*
 * @param {string | URL} input URL of the first page of the resources.
 * @param {RequestInit} init Custom setting that apply to each request.
 * @param {ExFetchOptions} [options={}] Options.
 * @returns {Promise<Response[]>} Responses.
 */
export function exFetchURLPaginate(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response[]> {
	return new ExFetch(options).urlPaginate(input, init);
}
