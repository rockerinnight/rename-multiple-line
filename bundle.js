(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
const vercelAnalytics = require("./node_modules/@vercel/analytics/dist/index.js");
const vercelSpeedInsights = require("./node_modules/@vercel/speed-insights/dist//index.js");
if (vercelAnalytics) vercelAnalytics.inject();
if (vercelSpeedInsights) vercelSpeedInsights.injectSpeedInsights();

},{"./node_modules/@vercel/analytics/dist/index.js":3,"./node_modules/@vercel/speed-insights/dist//index.js":4}],3:[function(require,module,exports){
(function (process){(function (){
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/generic.ts
var generic_exports = {};
__export(generic_exports, {
  DEV_SCRIPT_URL: () => DEV_SCRIPT_URL,
  PROD_SCRIPT_URL: () => PROD_SCRIPT_URL,
  default: () => generic_default,
  inject: () => inject,
  pageview: () => pageview,
  track: () => track
});
module.exports = __toCommonJS(generic_exports);

// package.json
var name = "@vercel/analytics";
var version = "1.2.2";

// src/queue.ts
var initQueue = () => {
  if (window.va)
    return;
  window.va = function a(...params) {
    (window.vaq = window.vaq || []).push(params);
  };
};

// src/utils.ts
function isBrowser() {
  return typeof window !== "undefined";
}
function detectEnvironment() {
  try {
    const env = process.env.NODE_ENV;
    if (env === "development" || env === "test") {
      return "development";
    }
  } catch (e) {
  }
  return "production";
}
function setMode(mode = "auto") {
  if (mode === "auto") {
    window.vam = detectEnvironment();
    return;
  }
  window.vam = mode;
}
function getMode() {
  const mode = isBrowser() ? window.vam : detectEnvironment();
  return mode || "production";
}
function isProduction() {
  return getMode() === "production";
}
function isDevelopment() {
  return getMode() === "development";
}
function removeKey(key, { [key]: _, ...rest }) {
  return rest;
}
function parseProperties(properties, options) {
  if (!properties)
    return void 0;
  let props = properties;
  const errorProperties = [];
  for (const [key, value] of Object.entries(properties)) {
    if (typeof value === "object" && value !== null) {
      if (options.strip) {
        props = removeKey(key, props);
      } else {
        errorProperties.push(key);
      }
    }
  }
  if (errorProperties.length > 0 && !options.strip) {
    throw Error(
      `The following properties are not valid: ${errorProperties.join(
        ", "
      )}. Only strings, numbers, booleans, and null are allowed.`
    );
  }
  return props;
}

// src/generic.ts
var DEV_SCRIPT_URL = "https://va.vercel-scripts.com/v1/script.debug.js";
var PROD_SCRIPT_URL = "/_vercel/insights/script.js";
function inject(props = {
  debug: true
}) {
  var _a;
  if (!isBrowser())
    return;
  setMode(props.mode);
  initQueue();
  if (props.beforeSend) {
    (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const src = props.scriptSrc || (isDevelopment() ? DEV_SCRIPT_URL : PROD_SCRIPT_URL);
  if (document.head.querySelector(`script[src*="${src}"]`))
    return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
  script.dataset.sdkv = version;
  if (props.disableAutoTrack) {
    script.dataset.disableAutoTrack = "1";
  }
  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  }
  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }
  script.onerror = () => {
    const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
    console.log(
      `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
    );
  };
  if (isDevelopment() && props.debug === false) {
    script.dataset.debug = "false";
  }
  document.head.appendChild(script);
}
function track(name2, properties) {
  var _a, _b;
  if (!isBrowser()) {
    const msg = "[Vercel Web Analytics] Please import `track` from `@vercel/analytics/server` when using this function in a server environment";
    if (isProduction()) {
      console.warn(msg);
    } else {
      throw new Error(msg);
    }
    return;
  }
  if (!properties) {
    (_a = window.va) == null ? void 0 : _a.call(window, "event", { name: name2 });
    return;
  }
  try {
    const props = parseProperties(properties, {
      strip: isProduction()
    });
    (_b = window.va) == null ? void 0 : _b.call(window, "event", {
      name: name2,
      data: props
    });
  } catch (err) {
    if (err instanceof Error && isDevelopment()) {
      console.error(err);
    }
  }
}
function pageview({ route, path }) {
  var _a;
  (_a = window.va) == null ? void 0 : _a.call(window, "pageview", {
    route,
    path
  });
}
var generic_default = {
  inject,
  track
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEV_SCRIPT_URL,
  PROD_SCRIPT_URL,
  inject,
  pageview,
  track
});

}).call(this)}).call(this,require('_process'))
},{"_process":1}],4:[function(require,module,exports){
(function (process){(function (){
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/generic.ts
var generic_exports = {};
__export(generic_exports, {
  computeRoute: () => computeRoute,
  default: () => generic_default,
  injectSpeedInsights: () => injectSpeedInsights
});
module.exports = __toCommonJS(generic_exports);

// package.json
var name = "@vercel/speed-insights";
var version = "1.0.10";

// src/queue.ts
var initQueue = () => {
  if (window.si)
    return;
  window.si = function a(...params) {
    (window.siq = window.siq || []).push(params);
  };
};

// src/utils.ts
function isBrowser() {
  return typeof window !== "undefined";
}
function detectEnvironment() {
  try {
    const env = process.env.NODE_ENV;
    if (env === "development" || env === "test") {
      return "development";
    }
  } catch (e) {
  }
  return "production";
}
function isDevelopment() {
  return detectEnvironment() === "development";
}
function computeRoute(pathname, pathParams) {
  if (!pathname || !pathParams) {
    return pathname;
  }
  let result = pathname;
  try {
    for (const [key, valueOrArray] of Object.entries(pathParams)) {
      const isValueArray = Array.isArray(valueOrArray);
      const value = isValueArray ? valueOrArray.join("/") : valueOrArray;
      const expr = isValueArray ? `...${key}` : key;
      const matcher = new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
      if (matcher.test(result)) {
        result = result.replace(matcher, `/[${expr}]`);
      }
    }
    return result;
  } catch (e) {
    return pathname;
  }
}
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// src/generic.ts
var SCRIPT_URL = `https://va.vercel-scripts.com/v1/speed-insights`;
var PROD_SCRIPT_URL = `${SCRIPT_URL}/script.js`;
var DEV_SCRIPT_URL = `${SCRIPT_URL}/script.debug.js`;
var PROXY_SCRIPT_URL = `/_vercel/speed-insights/script.js`;
function injectSpeedInsights(props = {}) {
  var _a;
  if (!isBrowser() || props.route === null)
    return null;
  initQueue();
  const isSelfHosted = Boolean(props.dsn);
  const productionScript = isSelfHosted ? PROD_SCRIPT_URL : PROXY_SCRIPT_URL;
  const src = props.scriptSrc || (isDevelopment() ? DEV_SCRIPT_URL : productionScript);
  if (document.head.querySelector(`script[src*="${src}"]`))
    return null;
  if (props.beforeSend) {
    (_a = window.si) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
  script.dataset.sdkv = version;
  if (props.sampleRate) {
    script.dataset.sampleRate = props.sampleRate.toString();
  }
  if (props.route) {
    script.dataset.route = props.route;
  }
  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  }
  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }
  if (isDevelopment() && props.debug === false) {
    script.dataset.debug = "false";
  }
  script.onerror = () => {
    console.log(
      `[Vercel Speed Insights] Failed to load script from ${src}. Please check if any content blockers are enabled and try again.`
    );
  };
  document.head.appendChild(script);
  return {
    setRoute: (route) => {
      script.dataset.route = route ?? void 0;
    }
  };
}
var generic_default = {
  injectSpeedInsights,
  computeRoute
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  computeRoute,
  injectSpeedInsights
});

}).call(this)}).call(this,require('_process'))
},{"_process":1}]},{},[2]);
