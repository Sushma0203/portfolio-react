"use strict";

// src/vercel-request-context.ts
var SYMBOL_FOR_REQ_CONTEXT = Symbol.for("@vercel/request-context");
function getContext() {
  const fromSymbol = globalThis;
  return fromSymbol[SYMBOL_FOR_REQ_CONTEXT]?.get?.() ?? {};
}

// src/next-request-context.ts
var import_async_hooks = require("async_hooks");
var name = "@next/request-context";
var NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for(name);
var INTERNAL_STORAGE_FIELD_SYMBOL = Symbol.for("internal.storage");
function getOrCreateContextSingleton() {
  const _globalThis = globalThis;
  if (!_globalThis[NEXT_REQUEST_CONTEXT_SYMBOL]) {
    const storage = new import_async_hooks.AsyncLocalStorage();
    const Context = {
      get: () => storage.getStore(),
      [INTERNAL_STORAGE_FIELD_SYMBOL]: storage
    };
    _globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = Context;
  }
  return _globalThis[NEXT_REQUEST_CONTEXT_SYMBOL];
}
var NextRequestContext = getOrCreateContextSingleton();
function withNextRequestContext(value, callback) {
  const storage = NextRequestContext[INTERNAL_STORAGE_FIELD_SYMBOL];
  return storage.run(value, callback);
}

// src/edge-function-source/to-plain-headers.ts
function toPlainHeaders(headers) {
  const result = {};
  if (!headers)
    return result;
  headers.forEach((value, key) => {
    result[key] = value;
    if (key.toLowerCase() === "set-cookie") {
      result[key] = splitCookiesString(value);
    }
  });
  return result;
}
function splitCookiesString(cookiesString) {
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos)))
      pos += 1;
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

// src/middleware-launcher.ts
process.chdir(__dirname);
var region = process.env.VERCEL_REGION || process.env.NOW_REGION;
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = region === "dev1" ? "development" : "production";
}
if (process.env.NODE_ENV !== "production" && region !== "dev1") {
  console.warn(
    `Warning: NODE_ENV was incorrectly set to "${process.env.NODE_ENV}", this value is being overridden to "production"`
  );
  process.env.NODE_ENV = "production";
}
const conf = {"distDir":".next","cacheComponents":false,"htmlLimitedBots":"[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight","assetPrefix":"","trailingSlash":false,"images":{"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","loaderFile":"","domains":[],"disableStaticImages":false,"minimumCacheTTL":14400,"formats":["image/webp"],"maximumRedirects":3,"dangerouslyAllowLocalIP":false,"dangerouslyAllowSVG":false,"contentSecurityPolicy":"script-src 'none'; frame-src 'none'; sandbox;","contentDispositionType":"attachment","localPatterns":[{"pathname":"**","search":""}],"remotePatterns":[],"qualities":[75],"unoptimized":false},"reactMaxHeadersLength":6000,"cacheLife":{"default":{"stale":300,"revalidate":900,"expire":4294967294},"seconds":{"stale":30,"revalidate":1,"expire":60},"minutes":{"stale":300,"revalidate":60,"expire":3600},"hours":{"stale":300,"revalidate":3600,"expire":86400},"days":{"stale":300,"revalidate":86400,"expire":604800},"weeks":{"stale":300,"revalidate":604800,"expire":2592000},"max":{"stale":300,"revalidate":2592000,"expire":31536000}},"basePath":"","expireTime":31536000,"generateEtags":true,"poweredByHeader":true,"cacheHandlers":{},"cacheMaxMemorySize":52428800,"compress":false,"i18n":null,"httpAgentOptions":{"keepAlive":true},"pageExtensions":["tsx","ts","jsx","js"],"useFileSystemPublicRoutes":true,"experimental":{"ppr":false,"staleTimes":{"dynamic":0,"static":300},"dynamicOnHover":false,"inlineCss":false,"authInterrupts":false,"fetchCacheKeyPrefix":"","isrFlushToDisk":true,"optimizeCss":false,"nextScriptWorkers":false,"disableOptimizedLoading":false,"largePageDataBytes":128000,"serverComponentsHmrCache":true,"caseSensitiveRoutes":false,"validateRSCRequestHeaders":false,"useSkewCookie":false,"preloadEntriesOnStart":true,"hideLogsAfterAbort":false,"removeUncaughtErrorAndRejectionListeners":false,"imgOptConcurrency":null,"imgOptMaxInputPixels":268402689,"imgOptSequentialRead":null,"imgOptSkipMetadata":null,"imgOptTimeoutInSeconds":7,"proxyClientMaxBodySize":10485760,"trustHostHeader":true,"isExperimentalCompile":false}};
globalThis.AsyncLocalStorage = require("async_hooks").AsyncLocalStorage;
var middlewareModule = require("./.next/server/middleware.js");
var serve = async (request) => {
  const context = getContext();
  return await withNextRequestContext(
    { waitUntil: context.waitUntil },
    async () => {
      let middlewareHandler = await middlewareModule;
      middlewareHandler = middlewareHandler.default || middlewareHandler;
      const result = await middlewareHandler({
        request: {
          url: request.url,
          method: request.method,
          headers: toPlainHeaders(request.headers),
          nextConfig: conf,
          page: "/middleware",
          body: request.method !== "GET" && request.method !== "HEAD" ? request.body : void 0,
          waitUntil: context.waitUntil
        }
      });
      if (result.waitUntil && context.waitUntil) {
        context.waitUntil(result.waitUntil);
      }
      return result.response;
    }
  );
};
module.exports = serve;
