(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.exports = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global,Buffer){(function (){
'use strict';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../../../../usr/local/lib/node_modules/@codahq/packs-sdk/node_modules/mersenne-twister/src/mersenne-twister.js
var require_mersenne_twister = __commonJS({
  "../../../../../usr/local/lib/node_modules/@codahq/packs-sdk/node_modules/mersenne-twister/src/mersenne-twister.js"(exports2, module2) {
    init_crypto_shim();
    var MersenneTwister2 = /* @__PURE__ */ __name(function(seed) {
      if (seed == void 0) {
        seed = (/* @__PURE__ */ new Date()).getTime();
      }
      this.N = 624;
      this.M = 397;
      this.MATRIX_A = 2567483615;
      this.UPPER_MASK = 2147483648;
      this.LOWER_MASK = 2147483647;
      this.mt = new Array(this.N);
      this.mti = this.N + 1;
      if (seed.constructor == Array) {
        this.init_by_array(seed, seed.length);
      } else {
        this.init_seed(seed);
      }
    }, "MersenneTwister");
    MersenneTwister2.prototype.init_seed = function(s) {
      this.mt[0] = s >>> 0;
      for (this.mti = 1; this.mti < this.N; this.mti++) {
        var s = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
        this.mt[this.mti] = (((s & 4294901760) >>> 16) * 1812433253 << 16) + (s & 65535) * 1812433253 + this.mti;
        this.mt[this.mti] >>>= 0;
      }
    };
    MersenneTwister2.prototype.init_by_array = function(init_key, key_length) {
      var i, j, k;
      this.init_seed(19650218);
      i = 1;
      j = 0;
      k = this.N > key_length ? this.N : key_length;
      for (; k; k--) {
        var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
        this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1664525 << 16) + (s & 65535) * 1664525) + init_key[j] + j;
        this.mt[i] >>>= 0;
        i++;
        j++;
        if (i >= this.N) {
          this.mt[0] = this.mt[this.N - 1];
          i = 1;
        }
        if (j >= key_length)
          j = 0;
      }
      for (k = this.N - 1; k; k--) {
        var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
        this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1566083941 << 16) + (s & 65535) * 1566083941) - i;
        this.mt[i] >>>= 0;
        i++;
        if (i >= this.N) {
          this.mt[0] = this.mt[this.N - 1];
          i = 1;
        }
      }
      this.mt[0] = 2147483648;
    };
    MersenneTwister2.prototype.random_int = function() {
      var y;
      var mag01 = new Array(0, this.MATRIX_A);
      if (this.mti >= this.N) {
        var kk;
        if (this.mti == this.N + 1)
          this.init_seed(5489);
        for (kk = 0; kk < this.N - this.M; kk++) {
          y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
          this.mt[kk] = this.mt[kk + this.M] ^ y >>> 1 ^ mag01[y & 1];
        }
        for (; kk < this.N - 1; kk++) {
          y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
          this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y >>> 1 ^ mag01[y & 1];
        }
        y = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
        this.mt[this.N - 1] = this.mt[this.M - 1] ^ y >>> 1 ^ mag01[y & 1];
        this.mti = 0;
      }
      y = this.mt[this.mti++];
      y ^= y >>> 11;
      y ^= y << 7 & 2636928640;
      y ^= y << 15 & 4022730752;
      y ^= y >>> 18;
      return y >>> 0;
    };
    MersenneTwister2.prototype.random_int31 = function() {
      return this.random_int() >>> 1;
    };
    MersenneTwister2.prototype.random_incl = function() {
      return this.random_int() * (1 / 4294967295);
    };
    MersenneTwister2.prototype.random = function() {
      return this.random_int() * (1 / 4294967296);
    };
    MersenneTwister2.prototype.random_excl = function() {
      return (this.random_int() + 0.5) * (1 / 4294967296);
    };
    MersenneTwister2.prototype.random_long = function() {
      var a = this.random_int() >>> 5, b = this.random_int() >>> 6;
      return (a * 67108864 + b) * (1 / 9007199254740992);
    };
    module2.exports = MersenneTwister2;
  }
});

// ../../../../../usr/local/lib/node_modules/@codahq/packs-sdk/dist/testing/injections/crypto_shim.js
function getRandomValues(abv) {
  var l = abv.length;
  while (l--) {
    abv[l] = Math.floor(randomFloat() * 256);
  }
  return abv;
}
function randomFloat() {
  return twister.random();
}
var MersenneTwister, twister, crypto;
var init_crypto_shim = __esm({
  "../../../../../usr/local/lib/node_modules/@codahq/packs-sdk/dist/testing/injections/crypto_shim.js"() {
    MersenneTwister = require_mersenne_twister();
    twister = new MersenneTwister(Math.random() * Number.MAX_SAFE_INTEGER);
    __name(getRandomValues, "getRandomValues");
    __name(randomFloat, "randomFloat");
    crypto = {
      getRandomValues
    };
    if (!global.crypto?.getRandomValues) {
      global.crypto = crypto;
    }
  }
});

// ../node_modules/@codahq/packs-sdk/dist/types.js
var require_types = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/types.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.HttpStatusCode = exports2.SyncInterval = exports2.QuotaLimitType = exports2.FeatureSet = exports2.ReservedAuthenticationNames = exports2.TokenExchangeCredentialsLocation = exports2.PostSetupType = exports2.AuthenticationType = exports2.PackCategory = void 0;
    var PackCategory;
    (function(PackCategory2) {
      PackCategory2["CRM"] = "CRM";
      PackCategory2["Calendar"] = "Calendar";
      PackCategory2["Communication"] = "Communication";
      PackCategory2["DataStorage"] = "DataStorage";
      PackCategory2["Design"] = "Design";
      PackCategory2["Financial"] = "Financial";
      PackCategory2["Fun"] = "Fun";
      PackCategory2["Geo"] = "Geo";
      PackCategory2["IT"] = "IT";
      PackCategory2["Mathematics"] = "Mathematics";
      PackCategory2["Organization"] = "Organization";
      PackCategory2["Recruiting"] = "Recruiting";
      PackCategory2["Shopping"] = "Shopping";
      PackCategory2["Social"] = "Social";
      PackCategory2["Sports"] = "Sports";
      PackCategory2["Travel"] = "Travel";
      PackCategory2["Weather"] = "Weather";
    })(PackCategory || (exports2.PackCategory = PackCategory = {}));
    var AuthenticationType2;
    (function(AuthenticationType3) {
      AuthenticationType3["None"] = "None";
      AuthenticationType3["HeaderBearerToken"] = "HeaderBearerToken";
      AuthenticationType3["CustomHeaderToken"] = "CustomHeaderToken";
      AuthenticationType3["MultiHeaderToken"] = "MultiHeaderToken";
      AuthenticationType3["QueryParamToken"] = "QueryParamToken";
      AuthenticationType3["MultiQueryParamToken"] = "MultiQueryParamToken";
      AuthenticationType3["OAuth2"] = "OAuth2";
      AuthenticationType3["OAuth2ClientCredentials"] = "OAuth2ClientCredentials";
      AuthenticationType3["WebBasic"] = "WebBasic";
      AuthenticationType3["Custom"] = "Custom";
      AuthenticationType3["AWSAccessKey"] = "AWSAccessKey";
      AuthenticationType3["AWSAssumeRole"] = "AWSAssumeRole";
      AuthenticationType3["CodaApiHeaderBearerToken"] = "CodaApiHeaderBearerToken";
      AuthenticationType3["GoogleDomainWideDelegation"] = "GoogleDomainWideDelegation";
      AuthenticationType3["GoogleServiceAccount"] = "GoogleServiceAccount";
      AuthenticationType3["Various"] = "Various";
    })(AuthenticationType2 || (exports2.AuthenticationType = AuthenticationType2 = {}));
    var PostSetupType;
    (function(PostSetupType2) {
      PostSetupType2["SetEndpoint"] = "SetEndPoint";
    })(PostSetupType || (exports2.PostSetupType = PostSetupType = {}));
    var TokenExchangeCredentialsLocation;
    (function(TokenExchangeCredentialsLocation2) {
      TokenExchangeCredentialsLocation2["Automatic"] = "Automatic";
      TokenExchangeCredentialsLocation2["Body"] = "Body";
      TokenExchangeCredentialsLocation2["AuthorizationHeader"] = "AuthorizationHeader";
    })(TokenExchangeCredentialsLocation || (exports2.TokenExchangeCredentialsLocation = TokenExchangeCredentialsLocation = {}));
    var ReservedAuthenticationNames;
    (function(ReservedAuthenticationNames2) {
      ReservedAuthenticationNames2["Default"] = "defaultUserAuthentication";
      ReservedAuthenticationNames2["System"] = "systemAuthentication";
    })(ReservedAuthenticationNames || (exports2.ReservedAuthenticationNames = ReservedAuthenticationNames = {}));
    var FeatureSet;
    (function(FeatureSet2) {
      FeatureSet2["Basic"] = "Basic";
      FeatureSet2["Pro"] = "Pro";
      FeatureSet2["Team"] = "Team";
      FeatureSet2["Enterprise"] = "Enterprise";
    })(FeatureSet || (exports2.FeatureSet = FeatureSet = {}));
    var QuotaLimitType;
    (function(QuotaLimitType2) {
      QuotaLimitType2["Action"] = "Action";
      QuotaLimitType2["Getter"] = "Getter";
      QuotaLimitType2["Sync"] = "Sync";
      QuotaLimitType2["Metadata"] = "Metadata";
    })(QuotaLimitType || (exports2.QuotaLimitType = QuotaLimitType = {}));
    var SyncInterval;
    (function(SyncInterval2) {
      SyncInterval2["Manual"] = "Manual";
      SyncInterval2["Daily"] = "Daily";
      SyncInterval2["Hourly"] = "Hourly";
      SyncInterval2["EveryTenMinutes"] = "EveryTenMinutes";
    })(SyncInterval || (exports2.SyncInterval = SyncInterval = {}));
    var HttpStatusCode;
    (function(HttpStatusCode2) {
      HttpStatusCode2[HttpStatusCode2["Ok"] = 200] = "Ok";
      HttpStatusCode2[HttpStatusCode2["Created"] = 201] = "Created";
      HttpStatusCode2[HttpStatusCode2["Accepted"] = 202] = "Accepted";
      HttpStatusCode2[HttpStatusCode2["NoContent"] = 204] = "NoContent";
      HttpStatusCode2[HttpStatusCode2["MovedPermanently"] = 301] = "MovedPermanently";
      HttpStatusCode2[HttpStatusCode2["RedirectFound"] = 302] = "RedirectFound";
      HttpStatusCode2[HttpStatusCode2["PermanentRedirect"] = 308] = "PermanentRedirect";
      HttpStatusCode2[HttpStatusCode2["BadRequest"] = 400] = "BadRequest";
      HttpStatusCode2[HttpStatusCode2["Unauthorized"] = 401] = "Unauthorized";
      HttpStatusCode2[HttpStatusCode2["PaymentRequired"] = 402] = "PaymentRequired";
      HttpStatusCode2[HttpStatusCode2["Forbidden"] = 403] = "Forbidden";
      HttpStatusCode2[HttpStatusCode2["NotFound"] = 404] = "NotFound";
      HttpStatusCode2[HttpStatusCode2["NotAcceptable"] = 406] = "NotAcceptable";
      HttpStatusCode2[HttpStatusCode2["Conflict"] = 409] = "Conflict";
      HttpStatusCode2[HttpStatusCode2["Gone"] = 410] = "Gone";
      HttpStatusCode2[HttpStatusCode2["PayloadTooLarge"] = 413] = "PayloadTooLarge";
      HttpStatusCode2[HttpStatusCode2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
      HttpStatusCode2[HttpStatusCode2["Locked"] = 423] = "Locked";
      HttpStatusCode2[HttpStatusCode2["ClientClosedRequest"] = 499] = "ClientClosedRequest";
      HttpStatusCode2[HttpStatusCode2["NotImplemented"] = 501] = "NotImplemented";
      HttpStatusCode2[HttpStatusCode2["TooManyRequests"] = 429] = "TooManyRequests";
      HttpStatusCode2[HttpStatusCode2["InternalServer"] = 500] = "InternalServer";
      HttpStatusCode2[HttpStatusCode2["BadGateway"] = 502] = "BadGateway";
      HttpStatusCode2[HttpStatusCode2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    })(HttpStatusCode || (exports2.HttpStatusCode = HttpStatusCode = {}));
  }
});

// ../node_modules/@codahq/packs-sdk/dist/api_types.js
var require_api_types = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/api_types.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TableRole = exports2.OptionsType = exports2.FutureLiveDates = exports2.PastLiveDates = exports2.AllPrecannedDates = exports2.PrecannedDate = exports2.FromNowDateRanges = exports2.PastLiveDateRanges = exports2.UntilNowDateRanges = exports2.PrecannedDateRange = exports2.isSyncExecutionContext = exports2.InvocationSource = exports2.InvocationErrorType = exports2.PermissionSyncMode = exports2.ValidFetchMethods = exports2.NetworkConnection = exports2.ConnectionRequirement = exports2.ParameterTypeInputMap = exports2.ParameterType = exports2.fileArray = exports2.imageArray = exports2.htmlArray = exports2.dateArray = exports2.booleanArray = exports2.numberArray = exports2.stringArray = exports2.isArrayType = exports2.Type = void 0;
    var Type;
    (function(Type2) {
      Type2[Type2["string"] = 0] = "string";
      Type2[Type2["number"] = 1] = "number";
      Type2[Type2["object"] = 2] = "object";
      Type2[Type2["boolean"] = 3] = "boolean";
      Type2[Type2["date"] = 4] = "date";
      Type2[Type2["html"] = 5] = "html";
      Type2[Type2["image"] = 6] = "image";
      Type2[Type2["file"] = 7] = "file";
      Type2[Type2["markdown"] = 8] = "markdown";
    })(Type || (exports2.Type = Type = {}));
    function isArrayType(obj) {
      return obj && obj.type === "array" && typeof obj.items === "number";
    }
    __name(isArrayType, "isArrayType");
    exports2.isArrayType = isArrayType;
    exports2.stringArray = {
      type: "array",
      items: Type.string
    };
    exports2.numberArray = {
      type: "array",
      items: Type.number
    };
    exports2.booleanArray = {
      type: "array",
      items: Type.boolean
    };
    exports2.dateArray = {
      type: "array",
      items: Type.date
    };
    exports2.htmlArray = {
      type: "array",
      items: Type.html
    };
    exports2.imageArray = {
      type: "array",
      items: Type.image
    };
    exports2.fileArray = {
      type: "array",
      items: Type.file
    };
    var ParameterType2;
    (function(ParameterType3) {
      ParameterType3["String"] = "string";
      ParameterType3["Number"] = "number";
      ParameterType3["Boolean"] = "boolean";
      ParameterType3["Date"] = "date";
      ParameterType3["Html"] = "html";
      ParameterType3["Image"] = "image";
      ParameterType3["File"] = "file";
      ParameterType3["Markdown"] = "markdown";
      ParameterType3["StringArray"] = "stringArray";
      ParameterType3["SparseStringArray"] = "sparseStringArray";
      ParameterType3["NumberArray"] = "numberArray";
      ParameterType3["SparseNumberArray"] = "sparseNumberArray";
      ParameterType3["BooleanArray"] = "booleanArray";
      ParameterType3["SparseBooleanArray"] = "sparseBooleanArray";
      ParameterType3["DateArray"] = "dateArray";
      ParameterType3["SparseDateArray"] = "sparseDateArray";
      ParameterType3["HtmlArray"] = "htmlArray`";
      ParameterType3["SparseHtmlArray"] = "sparseHtmlArray";
      ParameterType3["ImageArray"] = "imageArray";
      ParameterType3["SparseImageArray"] = "sparseImageArray";
      ParameterType3["FileArray"] = "fileArray";
      ParameterType3["SparseFileArray"] = "sparseFileArray";
      ParameterType3["MarkdownArray"] = "markdownArray`";
      ParameterType3["SparseMarkdownArray"] = "sparseMarkdownArray";
    })(ParameterType2 || (exports2.ParameterType = ParameterType2 = {}));
    exports2.ParameterTypeInputMap = {
      [ParameterType2.String]: Type.string,
      [ParameterType2.Number]: Type.number,
      [ParameterType2.Boolean]: Type.boolean,
      [ParameterType2.Date]: Type.date,
      [ParameterType2.Html]: Type.html,
      [ParameterType2.Image]: Type.image,
      [ParameterType2.File]: Type.file,
      [ParameterType2.Markdown]: Type.markdown,
      [ParameterType2.StringArray]: { type: "array", items: Type.string },
      [ParameterType2.NumberArray]: { type: "array", items: Type.number },
      [ParameterType2.BooleanArray]: { type: "array", items: Type.boolean },
      [ParameterType2.DateArray]: { type: "array", items: Type.date },
      [ParameterType2.HtmlArray]: { type: "array", items: Type.html },
      [ParameterType2.ImageArray]: { type: "array", items: Type.image },
      [ParameterType2.FileArray]: { type: "array", items: Type.file },
      [ParameterType2.MarkdownArray]: { type: "array", items: Type.markdown },
      [ParameterType2.SparseStringArray]: { type: "array", items: Type.string, allowEmpty: true },
      [ParameterType2.SparseNumberArray]: { type: "array", items: Type.number, allowEmpty: true },
      [ParameterType2.SparseBooleanArray]: { type: "array", items: Type.boolean, allowEmpty: true },
      [ParameterType2.SparseDateArray]: { type: "array", items: Type.date, allowEmpty: true },
      [ParameterType2.SparseHtmlArray]: { type: "array", items: Type.html, allowEmpty: true },
      [ParameterType2.SparseImageArray]: { type: "array", items: Type.image, allowEmpty: true },
      [ParameterType2.SparseFileArray]: { type: "array", items: Type.file, allowEmpty: true },
      [ParameterType2.SparseMarkdownArray]: { type: "array", items: Type.markdown, allowEmpty: true }
    };
    var ConnectionRequirement;
    (function(ConnectionRequirement2) {
      ConnectionRequirement2["None"] = "none";
      ConnectionRequirement2["Optional"] = "optional";
      ConnectionRequirement2["Required"] = "required";
    })(ConnectionRequirement || (exports2.ConnectionRequirement = ConnectionRequirement = {}));
    var NetworkConnection;
    (function(NetworkConnection2) {
      NetworkConnection2["None"] = "none";
      NetworkConnection2["Optional"] = "optional";
      NetworkConnection2["Required"] = "required";
    })(NetworkConnection || (exports2.NetworkConnection = NetworkConnection = {}));
    exports2.ValidFetchMethods = ["GET", "PATCH", "POST", "PUT", "DELETE", "HEAD"];
    var PermissionSyncMode;
    (function(PermissionSyncMode2) {
      PermissionSyncMode2["Personal"] = "Personal";
      PermissionSyncMode2["PermissionAware"] = "PermissionAware";
    })(PermissionSyncMode || (exports2.PermissionSyncMode = PermissionSyncMode = {}));
    var InvocationErrorType;
    (function(InvocationErrorType2) {
      InvocationErrorType2["Timeout"] = "Timeout";
      InvocationErrorType2["ResponseTooLarge"] = "ResponseTooLarge";
      InvocationErrorType2["HttpStatusError"] = "HttpStatusError";
      InvocationErrorType2["RateLimitExceeded"] = "RateLimitExceeded";
      InvocationErrorType2["Unknown"] = "Unknown";
    })(InvocationErrorType || (exports2.InvocationErrorType = InvocationErrorType = {}));
    var InvocationSource;
    (function(InvocationSource2) {
      InvocationSource2["Brain"] = "Brain";
      InvocationSource2["Doc"] = "Doc";
      InvocationSource2["NativeIntegration"] = "NativeIntegration";
    })(InvocationSource || (exports2.InvocationSource = InvocationSource = {}));
    function isSyncExecutionContext(context) {
      return context.hasOwnProperty("sync") && context.hasOwnProperty("syncStateService");
    }
    __name(isSyncExecutionContext, "isSyncExecutionContext");
    exports2.isSyncExecutionContext = isSyncExecutionContext;
    var PrecannedDateRange;
    (function(PrecannedDateRange2) {
      PrecannedDateRange2["Yesterday"] = "yesterday";
      PrecannedDateRange2["Last7Days"] = "last_7_days";
      PrecannedDateRange2["Last30Days"] = "last_30_days";
      PrecannedDateRange2["Last90Days"] = "last_90_days";
      PrecannedDateRange2["Last180Days"] = "last_180_days";
      PrecannedDateRange2["Last365Days"] = "last_365_days";
      PrecannedDateRange2["LastWeek"] = "last_week";
      PrecannedDateRange2["LastMonth"] = "last_month";
      PrecannedDateRange2["Last3Months"] = "last_3_months";
      PrecannedDateRange2["Last6Months"] = "last_6_months";
      PrecannedDateRange2["LastYear"] = "last_year";
      PrecannedDateRange2["Today"] = "today";
      PrecannedDateRange2["ThisWeek"] = "this_week";
      PrecannedDateRange2["ThisMonth"] = "this_month";
      PrecannedDateRange2["YearToDate"] = "year_to_date";
      PrecannedDateRange2["ThisYear"] = "this_year";
      PrecannedDateRange2["Last7AndNext7Days"] = "last_7_and_next_7_days";
      PrecannedDateRange2["Last30AndNext30Days"] = "last_30_and_next_30_days";
      PrecannedDateRange2["Last90AndNext90Days"] = "last_90_and_next_90_days";
      PrecannedDateRange2["Tomorrow"] = "tomorrow";
      PrecannedDateRange2["Next7Days"] = "next_7_days";
      PrecannedDateRange2["Next30Days"] = "next_30_days";
      PrecannedDateRange2["Next90Days"] = "next_90_days";
      PrecannedDateRange2["Next180Days"] = "next_180_days";
      PrecannedDateRange2["Next365Days"] = "next_365_days";
      PrecannedDateRange2["NextWeek"] = "next_week";
      PrecannedDateRange2["NextMonth"] = "next_month";
      PrecannedDateRange2["Next3Months"] = "next_3_months";
      PrecannedDateRange2["Next6Months"] = "next_6_months";
      PrecannedDateRange2["NextYear"] = "next_year";
      PrecannedDateRange2["Everything"] = "everything";
    })(PrecannedDateRange || (exports2.PrecannedDateRange = PrecannedDateRange = {}));
    exports2.UntilNowDateRanges = [
      PrecannedDateRange.Today,
      PrecannedDateRange.Last7Days,
      PrecannedDateRange.Last30Days,
      PrecannedDateRange.Last90Days,
      PrecannedDateRange.Last180Days,
      PrecannedDateRange.Last365Days,
      PrecannedDateRange.YearToDate
    ];
    exports2.PastLiveDateRanges = [
      ...exports2.UntilNowDateRanges,
      PrecannedDateRange.Yesterday,
      PrecannedDateRange.LastWeek,
      PrecannedDateRange.LastMonth,
      PrecannedDateRange.LastYear,
      PrecannedDateRange.ThisWeek,
      PrecannedDateRange.ThisMonth,
      PrecannedDateRange.ThisYear,
      PrecannedDateRange.Everything
    ];
    exports2.FromNowDateRanges = [
      PrecannedDateRange.Today,
      PrecannedDateRange.Next7Days,
      PrecannedDateRange.Next30Days,
      PrecannedDateRange.Next90Days,
      PrecannedDateRange.Next180Days,
      PrecannedDateRange.Next365Days
    ];
    var PrecannedDate;
    (function(PrecannedDate2) {
      PrecannedDate2["Today"] = "today";
      PrecannedDate2["Yesterday"] = "yesterday";
      PrecannedDate2["Tomorrow"] = "tomorrow";
      PrecannedDate2["DaysAgo7"] = "7_days_ago";
      PrecannedDate2["DaysAgo30"] = "30_days_ago";
      PrecannedDate2["DaysAgo90"] = "90_days_ago";
      PrecannedDate2["DaysAgo180"] = "180_days_ago";
      PrecannedDate2["DaysAgo365"] = "365_days_ago";
      PrecannedDate2["DaysAhead7"] = "7_days_ahead";
      PrecannedDate2["DaysAhead30"] = "30_days_ahead";
      PrecannedDate2["DaysAhead90"] = "90_days_ahead";
      PrecannedDate2["DaysAhead180"] = "180_days_ahead";
      PrecannedDate2["DaysAhead365"] = "365_days_ahead";
    })(PrecannedDate || (exports2.PrecannedDate = PrecannedDate = {}));
    exports2.AllPrecannedDates = Object.values(PrecannedDate);
    exports2.PastLiveDates = [
      PrecannedDate.Today,
      PrecannedDate.Yesterday,
      PrecannedDate.DaysAgo7,
      PrecannedDate.DaysAgo30,
      PrecannedDate.DaysAgo90,
      PrecannedDate.DaysAgo180,
      PrecannedDate.DaysAgo365
    ];
    exports2.FutureLiveDates = [
      PrecannedDate.Today,
      PrecannedDate.Tomorrow,
      PrecannedDate.DaysAhead7,
      PrecannedDate.DaysAhead30,
      PrecannedDate.DaysAhead90,
      PrecannedDate.DaysAhead180,
      PrecannedDate.DaysAhead365
    ];
    var OptionsType;
    (function(OptionsType2) {
      OptionsType2["Dynamic"] = "__coda_dynamic__";
    })(OptionsType || (exports2.OptionsType = OptionsType = {}));
    var TableRole;
    (function(TableRole2) {
      TableRole2["Users"] = "users";
      TableRole2["GroupMembers"] = "groupMembers";
    })(TableRole || (exports2.TableRole = TableRole = {}));
  }
});

// ../node_modules/@codahq/packs-sdk/dist/helpers/ensure.js
var require_ensure = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/helpers/ensure.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ensureNever = exports2.assertCondition = exports2.ensureExists = exports2.ensureNonEmptyString = exports2.ensureUnreachable = void 0;
    var api_1 = require_api();
    function ensureUnreachable(value, message) {
      throw new Error(message || `Unreachable code hit with value ${String(value)}`);
    }
    __name(ensureUnreachable, "ensureUnreachable");
    exports2.ensureUnreachable = ensureUnreachable;
    function ensureNonEmptyString(value, message) {
      if (typeof value !== "string" || value.length === 0) {
        throw new (getErrorConstructor(message))(message || `Expected non-empty string for ${String(value)}`);
      }
      return value;
    }
    __name(ensureNonEmptyString, "ensureNonEmptyString");
    exports2.ensureNonEmptyString = ensureNonEmptyString;
    function ensureExists(value, message) {
      if (typeof value === "undefined" || value === null) {
        throw new (getErrorConstructor(message))(message || `Expected value for ${String(value)}`);
      }
      return value;
    }
    __name(ensureExists, "ensureExists");
    exports2.ensureExists = ensureExists;
    function getErrorConstructor(message) {
      return message ? api_1.UserVisibleError : Error;
    }
    __name(getErrorConstructor, "getErrorConstructor");
    function assertCondition(condition, message) {
      if (!condition) {
        throw new (getErrorConstructor(message))(message || "Assertion failed");
      }
    }
    __name(assertCondition, "assertCondition");
    exports2.assertCondition = assertCondition;
    function ensureNever(_) {
    }
    __name(ensureNever, "ensureNever");
    exports2.ensureNever = ensureNever;
  }
});

// ../node_modules/@codahq/packs-sdk/dist/helpers/object_utils.js
var require_object_utils = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/helpers/object_utils.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isPromise = exports2.deepCopy = exports2.isNil = exports2.isDefined = exports2.deepFreeze = void 0;
    function deepFreeze(obj) {
      Object.freeze(obj);
      for (const k of Object.keys(obj)) {
        const key = k;
        const value = obj[key];
        if (value !== null && (typeof value === "object" || typeof value === "function") && !Object.isFrozen(value)) {
          deepFreeze(value);
        }
      }
      return obj;
    }
    __name(deepFreeze, "deepFreeze");
    exports2.deepFreeze = deepFreeze;
    function isDefined(obj) {
      return !isNil(obj);
    }
    __name(isDefined, "isDefined");
    exports2.isDefined = isDefined;
    function isNil(obj) {
      return typeof obj === "undefined" || obj === null;
    }
    __name(isNil, "isNil");
    exports2.isNil = isNil;
    function deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    __name(deepCopy, "deepCopy");
    exports2.deepCopy = deepCopy;
    function isPromise(obj) {
      return obj && typeof obj === "object" && "then" in obj;
    }
    __name(isPromise, "isPromise");
    exports2.isPromise = isPromise;
  }
});

// ../node_modules/@codahq/packs-sdk/dist/helpers/migration.js
var require_migration = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/helpers/migration.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.postSetupMetadataHelper = exports2.setEndpointDefHelper = exports2.setEndpointHelper = exports2.paramDefHelper = exports2.objectSchemaHelper = void 0;
    var ensure_1 = require_ensure();
    var ensure_2 = require_ensure();
    function objectSchemaHelper(schema) {
      return new ObjectSchemaHelper(schema);
    }
    __name(objectSchemaHelper, "objectSchemaHelper");
    exports2.objectSchemaHelper = objectSchemaHelper;
    var _ObjectSchemaHelper = class _ObjectSchemaHelper {
      constructor(schema) {
        this._schema = schema;
        this._checkAgainstAllProperties(schema);
      }
      // This method doesn't do anything, but it gives developers a chance to double-check if they've forgotten
      // to update a client of ObjectSchemaHelper when they add a new property to ObjectSchemaDefinition.
      // For example, coda.makeReferenceSchemaFromObjectSchema() depends on ObjectSchemaHelper so if you
      // add a new schema option related to property options you would likely need to add it to ObjectSchemaHelper
      // and propagate it through coda.makeReferenceSchemaFromObjectSchema() also.
      _checkAgainstAllProperties(schema) {
        const {
          // Properties needed by ObjectSchemaHelper clients.
          id,
          idProperty,
          primary,
          displayProperty,
          featuredProperties,
          featured,
          identity,
          options,
          properties,
          type,
          attribution,
          codaType,
          requireForUpdates,
          // Properties not needed by ObjectSchemaHelper clients.
          includeUnknownProperties,
          titleProperty,
          linkProperty,
          subtitleProperties,
          snippetProperty,
          imageProperty,
          description,
          createdAtProperty,
          createdByProperty,
          modifiedAtProperty,
          modifiedByProperty,
          userEmailProperty,
          userIdProperty,
          groupIdProperty,
          memberGroupIdProperty,
          versionProperty,
          index,
          parent,
          ...rest
        } = schema;
        (0, ensure_2.ensureNever)();
      }
      get id() {
        var _a;
        return (_a = this._schema.idProperty) !== null && _a !== void 0 ? _a : this._schema.id;
      }
      get primary() {
        var _a;
        return (_a = this._schema.displayProperty) !== null && _a !== void 0 ? _a : this._schema.primary;
      }
      get featured() {
        var _a;
        return (_a = this._schema.featuredProperties) !== null && _a !== void 0 ? _a : this._schema.featured;
      }
      get identity() {
        return this._schema.identity;
      }
      get options() {
        return this._schema.options;
      }
      get properties() {
        return this._schema.properties;
      }
      get type() {
        return this._schema.type;
      }
      get attribution() {
        var _a, _b;
        return (_a = this._schema.attribution) !== null && _a !== void 0 ? _a : (_b = this._schema.identity) === null || _b === void 0 ? void 0 : _b.attribution;
      }
      get codaType() {
        return this._schema.codaType;
      }
      get requireForUpdates() {
        return this._schema.requireForUpdates;
      }
      get titleProperty() {
        var _a;
        return (_a = this._schema.titleProperty) !== null && _a !== void 0 ? _a : this._schema.displayProperty;
      }
    };
    __name(_ObjectSchemaHelper, "ObjectSchemaHelper");
    var ObjectSchemaHelper = _ObjectSchemaHelper;
    function paramDefHelper(def) {
      return new ParamDefHelper(def);
    }
    __name(paramDefHelper, "paramDefHelper");
    exports2.paramDefHelper = paramDefHelper;
    var _ParamDefHelper = class _ParamDefHelper {
      constructor(def) {
        this._def = def;
      }
      get defaultValue() {
        var _a;
        return (_a = this._def.suggestedValue) !== null && _a !== void 0 ? _a : this._def.defaultValue;
      }
    };
    __name(_ParamDefHelper, "ParamDefHelper");
    var ParamDefHelper = _ParamDefHelper;
    function setEndpointHelper(step) {
      return new SetEndpointHelper(step);
    }
    __name(setEndpointHelper, "setEndpointHelper");
    exports2.setEndpointHelper = setEndpointHelper;
    var _SetEndpointHelper = class _SetEndpointHelper {
      constructor(step) {
        this._step = step;
      }
      get getOptions() {
        var _a;
        return (0, ensure_1.ensureExists)((_a = this._step.getOptions) !== null && _a !== void 0 ? _a : this._step.getOptionsFormula);
      }
    };
    __name(_SetEndpointHelper, "SetEndpointHelper");
    var SetEndpointHelper = _SetEndpointHelper;
    function setEndpointDefHelper(step) {
      return new SetEndpointDefHelper(step);
    }
    __name(setEndpointDefHelper, "setEndpointDefHelper");
    exports2.setEndpointDefHelper = setEndpointDefHelper;
    var _SetEndpointDefHelper = class _SetEndpointDefHelper {
      constructor(step) {
        this._step = step;
      }
      get getOptions() {
        var _a;
        return (0, ensure_1.ensureExists)((_a = this._step.getOptions) !== null && _a !== void 0 ? _a : this._step.getOptionsFormula);
      }
    };
    __name(_SetEndpointDefHelper, "SetEndpointDefHelper");
    var SetEndpointDefHelper = _SetEndpointDefHelper;
    function postSetupMetadataHelper(metadata) {
      return new PostSetupMetadataHelper(metadata);
    }
    __name(postSetupMetadataHelper, "postSetupMetadataHelper");
    exports2.postSetupMetadataHelper = postSetupMetadataHelper;
    var _PostSetupMetadataHelper = class _PostSetupMetadataHelper {
      constructor(metadata) {
        this._metadata = metadata;
      }
      get getOptions() {
        var _a;
        return (0, ensure_1.ensureExists)((_a = this._metadata.getOptions) !== null && _a !== void 0 ? _a : this._metadata.getOptionsFormula);
      }
    };
    __name(_PostSetupMetadataHelper, "PostSetupMetadataHelper");
    var PostSetupMetadataHelper = _PostSetupMetadataHelper;
  }
});

// ../node_modules/pascalcase/index.js
var require_pascalcase = __commonJS({
  "../node_modules/pascalcase/index.js"(exports2, module2) {
    init_crypto_shim();
    var titlecase = /* @__PURE__ */ __name((input) => input[0].toLocaleUpperCase() + input.slice(1), "titlecase");
    module2.exports = (value) => {
      if (value === null || value === void 0)
        return "";
      if (typeof value.toString !== "function")
        return "";
      let input = value.toString().trim();
      if (input === "")
        return "";
      if (input.length === 1)
        return input.toLocaleUpperCase();
      let match = input.match(/[a-zA-Z0-9]+/g);
      if (match) {
        return match.map((m) => titlecase(m)).join("");
      }
      return input;
    };
  }
});

// ../node_modules/@codahq/packs-sdk/dist/schema.js
var require_schema = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/schema.js"(exports2) {
    "use strict";
    init_crypto_shim();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.throwOnDynamicSchemaWithJsOptionsFunction = exports2.withIdentity = exports2.makeReferenceSchemaFromObjectSchema = exports2.normalizeObjectSchema = exports2.normalizeSchema = exports2.normalizePropertyValuePathIntoSchemaPath = exports2.isCustomIndexDefinition = exports2.isCategorizationIndexDefinition = exports2.normalizeSchemaKeyPath = exports2.normalizeSchemaKey = exports2.makeObjectSchema = exports2.makeSchema = exports2.generateSchema = exports2.maybeUnwrapArraySchema = exports2.maybeSchemaOptionsValue = exports2.unwrappedSchemaSupportsOptions = exports2.isArray = exports2.isObject = exports2.makeAttributionNode = exports2.AttributionNodeType = exports2.PermissionType = exports2.PrincipalType = exports2.LifecycleBehavior = exports2.PermissionsBehavior = exports2.ContentCategorizationType = exports2.IndexingStrategy = exports2.PropertyLabelValueTemplate = exports2.SimpleStringHintValueTypes = exports2.DurationUnit = exports2.ImageShapeStyle = exports2.ImageCornerStyle = exports2.ImageOutline = exports2.LinkDisplayType = exports2.EmailDisplayType = exports2.ScaleIconSet = exports2.CurrencyFormat = exports2.AutocompleteHintValueTypes = exports2.ObjectHintValueTypes = exports2.BooleanHintValueTypes = exports2.NumberHintValueTypes = exports2.StringHintValueTypes = exports2.ValueHintType = exports2.ValueType = void 0;
    var ensure_1 = require_ensure();
    var object_utils_1 = require_object_utils();
    var ensure_2 = require_ensure();
    var ensure_3 = require_ensure();
    var ensure_4 = require_ensure();
    var ensure_5 = require_ensure();
    var migration_1 = require_migration();
    var pascalcase_1 = __importDefault(require_pascalcase());
    var ValueType2;
    (function(ValueType3) {
      ValueType3["Boolean"] = "boolean";
      ValueType3["Number"] = "number";
      ValueType3["String"] = "string";
      ValueType3["Array"] = "array";
      ValueType3["Object"] = "object";
    })(ValueType2 || (exports2.ValueType = ValueType2 = {}));
    var ValueHintType2;
    (function(ValueHintType3) {
      ValueHintType3["Date"] = "date";
      ValueHintType3["Time"] = "time";
      ValueHintType3["DateTime"] = "datetime";
      ValueHintType3["Duration"] = "duration";
      ValueHintType3["Email"] = "email";
      ValueHintType3["Person"] = "person";
      ValueHintType3["Percent"] = "percent";
      ValueHintType3["Currency"] = "currency";
      ValueHintType3["ImageReference"] = "image";
      ValueHintType3["ImageAttachment"] = "imageAttachment";
      ValueHintType3["Url"] = "url";
      ValueHintType3["Markdown"] = "markdown";
      ValueHintType3["Html"] = "html";
      ValueHintType3["Embed"] = "embed";
      ValueHintType3["Reference"] = "reference";
      ValueHintType3["Attachment"] = "attachment";
      ValueHintType3["Slider"] = "slider";
      ValueHintType3["Scale"] = "scale";
      ValueHintType3["ProgressBar"] = "progressBar";
      ValueHintType3["Toggle"] = "toggle";
      ValueHintType3["CodaInternalRichText"] = "codaInternalRichText";
      ValueHintType3["SelectList"] = "selectList";
    })(ValueHintType2 || (exports2.ValueHintType = ValueHintType2 = {}));
    exports2.StringHintValueTypes = [
      ValueHintType2.Attachment,
      ValueHintType2.Date,
      ValueHintType2.Time,
      ValueHintType2.DateTime,
      ValueHintType2.Duration,
      ValueHintType2.Email,
      ValueHintType2.Embed,
      ValueHintType2.Html,
      ValueHintType2.ImageReference,
      ValueHintType2.ImageAttachment,
      ValueHintType2.Markdown,
      ValueHintType2.Url,
      ValueHintType2.CodaInternalRichText,
      ValueHintType2.SelectList
    ];
    exports2.NumberHintValueTypes = [
      ValueHintType2.Date,
      ValueHintType2.Time,
      ValueHintType2.DateTime,
      ValueHintType2.Duration,
      ValueHintType2.Percent,
      ValueHintType2.Currency,
      ValueHintType2.Slider,
      ValueHintType2.ProgressBar,
      ValueHintType2.Scale
    ];
    exports2.BooleanHintValueTypes = [ValueHintType2.Toggle];
    exports2.ObjectHintValueTypes = [ValueHintType2.Person, ValueHintType2.Reference, ValueHintType2.SelectList];
    exports2.AutocompleteHintValueTypes = [ValueHintType2.SelectList, ValueHintType2.Reference];
    var CurrencyFormat;
    (function(CurrencyFormat2) {
      CurrencyFormat2["Currency"] = "currency";
      CurrencyFormat2["Accounting"] = "accounting";
      CurrencyFormat2["Financial"] = "financial";
    })(CurrencyFormat || (exports2.CurrencyFormat = CurrencyFormat = {}));
    var ScaleIconSet;
    (function(ScaleIconSet2) {
      ScaleIconSet2["Star"] = "star";
      ScaleIconSet2["Circle"] = "circle";
      ScaleIconSet2["Fire"] = "fire";
      ScaleIconSet2["Bug"] = "bug";
      ScaleIconSet2["Diamond"] = "diamond";
      ScaleIconSet2["Bell"] = "bell";
      ScaleIconSet2["ThumbsUp"] = "thumbsup";
      ScaleIconSet2["Heart"] = "heart";
      ScaleIconSet2["Chili"] = "chili";
      ScaleIconSet2["Smiley"] = "smiley";
      ScaleIconSet2["Lightning"] = "lightning";
      ScaleIconSet2["Currency"] = "currency";
      ScaleIconSet2["Coffee"] = "coffee";
      ScaleIconSet2["Person"] = "person";
      ScaleIconSet2["Battery"] = "battery";
      ScaleIconSet2["Cocktail"] = "cocktail";
      ScaleIconSet2["Cloud"] = "cloud";
      ScaleIconSet2["Sun"] = "sun";
      ScaleIconSet2["Checkmark"] = "checkmark";
      ScaleIconSet2["LightBulb"] = "lightbulb";
    })(ScaleIconSet || (exports2.ScaleIconSet = ScaleIconSet = {}));
    var EmailDisplayType;
    (function(EmailDisplayType2) {
      EmailDisplayType2["IconAndEmail"] = "iconAndEmail";
      EmailDisplayType2["IconOnly"] = "iconOnly";
      EmailDisplayType2["EmailOnly"] = "emailOnly";
    })(EmailDisplayType || (exports2.EmailDisplayType = EmailDisplayType = {}));
    var LinkDisplayType;
    (function(LinkDisplayType2) {
      LinkDisplayType2["IconOnly"] = "iconOnly";
      LinkDisplayType2["Url"] = "url";
      LinkDisplayType2["Title"] = "title";
      LinkDisplayType2["Card"] = "card";
      LinkDisplayType2["Embed"] = "embed";
    })(LinkDisplayType || (exports2.LinkDisplayType = LinkDisplayType = {}));
    var ImageOutline;
    (function(ImageOutline2) {
      ImageOutline2["Disabled"] = "disabled";
      ImageOutline2["Solid"] = "solid";
    })(ImageOutline || (exports2.ImageOutline = ImageOutline = {}));
    var ImageCornerStyle;
    (function(ImageCornerStyle2) {
      ImageCornerStyle2["Rounded"] = "rounded";
      ImageCornerStyle2["Square"] = "square";
    })(ImageCornerStyle || (exports2.ImageCornerStyle = ImageCornerStyle = {}));
    var ImageShapeStyle;
    (function(ImageShapeStyle2) {
      ImageShapeStyle2["Auto"] = "auto";
      ImageShapeStyle2["Circle"] = "circle";
    })(ImageShapeStyle || (exports2.ImageShapeStyle = ImageShapeStyle = {}));
    var DurationUnit;
    (function(DurationUnit2) {
      DurationUnit2["Days"] = "days";
      DurationUnit2["Hours"] = "hours";
      DurationUnit2["Minutes"] = "minutes";
      DurationUnit2["Seconds"] = "seconds";
    })(DurationUnit || (exports2.DurationUnit = DurationUnit = {}));
    exports2.SimpleStringHintValueTypes = [
      ValueHintType2.Attachment,
      ValueHintType2.Html,
      ValueHintType2.Markdown,
      ValueHintType2.Url,
      ValueHintType2.Email,
      ValueHintType2.CodaInternalRichText
    ];
    exports2.PropertyLabelValueTemplate = "{VALUE}";
    var IndexingStrategy;
    (function(IndexingStrategy2) {
      IndexingStrategy2["Standard"] = "standard";
      IndexingStrategy2["Raw"] = "raw";
    })(IndexingStrategy || (exports2.IndexingStrategy = IndexingStrategy = {}));
    var ContentCategorizationType;
    (function(ContentCategorizationType2) {
      ContentCategorizationType2["Messaging"] = "Messaging";
      ContentCategorizationType2["Document"] = "Document";
      ContentCategorizationType2["Email"] = "Email";
      ContentCategorizationType2["Comment"] = "Comment";
    })(ContentCategorizationType || (exports2.ContentCategorizationType = ContentCategorizationType = {}));
    var PermissionsBehavior;
    (function(PermissionsBehavior2) {
      PermissionsBehavior2["Inherit"] = "Inherit";
    })(PermissionsBehavior || (exports2.PermissionsBehavior = PermissionsBehavior = {}));
    var LifecycleBehavior;
    (function(LifecycleBehavior2) {
      LifecycleBehavior2["Inherit"] = "Inherit";
    })(LifecycleBehavior || (exports2.LifecycleBehavior = LifecycleBehavior = {}));
    var PrincipalType;
    (function(PrincipalType2) {
      PrincipalType2["User"] = "user";
      PrincipalType2["Group"] = "group";
      PrincipalType2["Anyone"] = "anyone";
      PrincipalType2["AllUsers"] = "allUsers";
      PrincipalType2["Domain"] = "domain";
    })(PrincipalType || (exports2.PrincipalType = PrincipalType = {}));
    var PermissionType;
    (function(PermissionType2) {
      PermissionType2["Delegated"] = "delegated";
      PermissionType2["Direct"] = "direct";
    })(PermissionType || (exports2.PermissionType = PermissionType = {}));
    var AttributionNodeType;
    (function(AttributionNodeType2) {
      AttributionNodeType2[AttributionNodeType2["Text"] = 1] = "Text";
      AttributionNodeType2[AttributionNodeType2["Link"] = 2] = "Link";
      AttributionNodeType2[AttributionNodeType2["Image"] = 3] = "Image";
    })(AttributionNodeType || (exports2.AttributionNodeType = AttributionNodeType = {}));
    function makeAttributionNode(node) {
      return node;
    }
    __name(makeAttributionNode, "makeAttributionNode");
    exports2.makeAttributionNode = makeAttributionNode;
    function isObject(val) {
      return Boolean(val && val.type === ValueType2.Object);
    }
    __name(isObject, "isObject");
    exports2.isObject = isObject;
    function isArray(val) {
      return Boolean(val && val.type === ValueType2.Array);
    }
    __name(isArray, "isArray");
    exports2.isArray = isArray;
    function unwrappedSchemaSupportsOptions(schema) {
      return Boolean(schema === null || schema === void 0 ? void 0 : schema.codaType) && [ValueHintType2.SelectList, ValueHintType2.Reference].includes(schema.codaType);
    }
    __name(unwrappedSchemaSupportsOptions, "unwrappedSchemaSupportsOptions");
    exports2.unwrappedSchemaSupportsOptions = unwrappedSchemaSupportsOptions;
    function maybeSchemaOptionsValue(schema) {
      const unwrappedSchema = maybeUnwrapArraySchema(schema);
      if (unwrappedSchemaSupportsOptions(unwrappedSchema)) {
        return unwrappedSchema.options;
      }
    }
    __name(maybeSchemaOptionsValue, "maybeSchemaOptionsValue");
    exports2.maybeSchemaOptionsValue = maybeSchemaOptionsValue;
    function maybeUnwrapArraySchema(val) {
      if (!isArray(val)) {
        return val;
      }
      if (!isArray(val.items)) {
        return val.items;
      }
    }
    __name(maybeUnwrapArraySchema, "maybeUnwrapArraySchema");
    exports2.maybeUnwrapArraySchema = maybeUnwrapArraySchema;
    function generateSchema(obj) {
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          throw new Error("Must have representative value.");
        }
        return { type: ValueType2.Array, items: generateSchema(obj[0]) };
      }
      if (typeof obj === "object") {
        const properties = {};
        if (obj === null) {
          return { type: ValueType2.String };
        }
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            properties[key] = generateSchema(obj[key]);
          }
        }
        return { type: ValueType2.Object, properties };
      } else if (typeof obj === "string") {
        return { type: ValueType2.String };
      } else if (typeof obj === "boolean") {
        return { type: ValueType2.Boolean };
      } else if (typeof obj === "number") {
        return { type: ValueType2.Number };
      }
      return (0, ensure_5.ensureUnreachable)(obj);
    }
    __name(generateSchema, "generateSchema");
    exports2.generateSchema = generateSchema;
    function makeSchema(schema) {
      return schema;
    }
    __name(makeSchema, "makeSchema");
    exports2.makeSchema = makeSchema;
    function makeObjectSchema2(schemaDef) {
      const schema = { ...schemaDef, type: ValueType2.Object };
      for (const key of Object.keys(schema.properties)) {
        if (key !== "type") {
          const typedKey = key;
          const schemaForOptions = maybeUnwrapArraySchema(schema.properties[key]);
          const optionsValue = schemaForOptions === null || schemaForOptions === void 0 ? void 0 : schemaForOptions.options;
          const optionsFunction = typeof optionsValue === "function" ? optionsValue : void 0;
          schema.properties[typedKey] = (0, object_utils_1.deepCopy)(schema.properties[key]);
          if (optionsFunction) {
            const schemaCopyForOptions = maybeUnwrapArraySchema(schema.properties[typedKey]);
            (0, ensure_2.ensureExists)(schemaCopyForOptions, "deepCopy() broke maybeUnwrapArraySchema?...");
            schemaCopyForOptions.options = optionsFunction;
          }
        }
      }
      validateObjectSchema(schema);
      return schema;
    }
    __name(makeObjectSchema2, "makeObjectSchema");
    exports2.makeObjectSchema = makeObjectSchema2;
    function validateObjectSchema(schema) {
      if (schema.codaType === ValueHintType2.Reference) {
        const { id, identity, primary } = (0, migration_1.objectSchemaHelper)(schema);
        checkRequiredFieldInObjectSchema(id, "idProperty", schema.codaType);
        checkRequiredFieldInObjectSchema(identity, "identity", schema.codaType);
        checkRequiredFieldInObjectSchema(primary, "displayProperty", schema.codaType);
        checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(id), schema, "idProperty");
        checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(primary), schema, "displayProperty");
      }
      if (schema.codaType === ValueHintType2.Person) {
        const { id } = (0, migration_1.objectSchemaHelper)(schema);
        checkRequiredFieldInObjectSchema(id, "idProperty", schema.codaType);
        checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(id), schema, "idProperty");
      }
      for (const [_propertyKey, propertySchema] of Object.entries(schema.properties)) {
        if (propertySchema.type === ValueType2.Object) {
          validateObjectSchema(propertySchema);
        }
      }
    }
    __name(validateObjectSchema, "validateObjectSchema");
    function checkRequiredFieldInObjectSchema(field, fieldName, codaType) {
      (0, ensure_2.ensureExists)(field, `Objects with codaType "${codaType}" require a "${fieldName}" property in the schema definition.`);
    }
    __name(checkRequiredFieldInObjectSchema, "checkRequiredFieldInObjectSchema");
    function checkSchemaPropertyIsRequired(field, schema, referencedByPropertyName) {
      const { properties, codaType } = schema;
      (0, ensure_1.assertCondition)(properties[field], `${referencedByPropertyName} set to undefined field "${field}"`);
      (0, ensure_1.assertCondition)(properties[field].required, `Field "${field}" must be marked as required in schema with codaType "${codaType}".`);
    }
    __name(checkSchemaPropertyIsRequired, "checkSchemaPropertyIsRequired");
    function normalizeSchemaKey(key) {
      return (0, pascalcase_1.default)(key).replace(/:/g, "_");
    }
    __name(normalizeSchemaKey, "normalizeSchemaKey");
    exports2.normalizeSchemaKey = normalizeSchemaKey;
    function normalizeSchemaKeyPath(key, normalizedProperties) {
      if (normalizedProperties.hasOwnProperty(normalizeSchemaKey(key))) {
        return normalizeSchemaKey(key);
      }
      return key.split(".").map((val) => {
        let partToNormalize = val;
        let partToIgnoreNormalization = "";
        if (val.includes("[")) {
          partToNormalize = val.substring(0, val.indexOf("["));
          partToIgnoreNormalization = val.substring(val.indexOf("["));
        }
        return normalizeSchemaKey(partToNormalize) + partToIgnoreNormalization;
      }).join(".");
    }
    __name(normalizeSchemaKeyPath, "normalizeSchemaKeyPath");
    exports2.normalizeSchemaKeyPath = normalizeSchemaKeyPath;
    function normalizeSchemaPropertyIdentifier(key, normalizedProperties) {
      if (typeof key === "string") {
        return normalizeSchemaKeyPath(key, normalizedProperties);
      }
      const { label, property: value, placeholder, ...rest } = key;
      (0, ensure_3.ensureNever)();
      return {
        property: normalizeSchemaKeyPath(value, normalizedProperties),
        label,
        placeholder
      };
    }
    __name(normalizeSchemaPropertyIdentifier, "normalizeSchemaPropertyIdentifier");
    function normalizeIndexProperty(value, normalizedProperties) {
      if (typeof value === "object" && "strategy" in value) {
        const { property, strategy, ...rest } = value;
        (0, ensure_3.ensureNever)();
        return {
          property: normalizeSchemaPropertyIdentifier(property, normalizedProperties),
          strategy
        };
      }
      return normalizeSchemaPropertyIdentifier(value, normalizedProperties);
    }
    __name(normalizeIndexProperty, "normalizeIndexProperty");
    function normalizeContentCategorization(value, normalizedProperties) {
      switch (value.type) {
        case ContentCategorizationType.Messaging:
        case ContentCategorizationType.Document:
        case ContentCategorizationType.Comment: {
          const { type, ...rest } = value;
          (0, ensure_3.ensureNever)();
          return { type };
        }
        case ContentCategorizationType.Email: {
          const { type, toProperty, fromProperty, subjectProperty, htmlBodyProperty, plainTextBodyProperty, ...rest } = value;
          (0, ensure_3.ensureNever)();
          return {
            type,
            toProperty: normalizeSchemaPropertyIdentifier(toProperty, normalizedProperties),
            fromProperty: normalizeSchemaPropertyIdentifier(fromProperty, normalizedProperties),
            subjectProperty: normalizeSchemaPropertyIdentifier(subjectProperty, normalizedProperties),
            htmlBodyProperty: normalizeSchemaPropertyIdentifier(htmlBodyProperty, normalizedProperties),
            plainTextBodyProperty: normalizeSchemaPropertyIdentifier(plainTextBodyProperty, normalizedProperties)
          };
        }
        default:
          return (0, ensure_5.ensureUnreachable)(value);
      }
    }
    __name(normalizeContentCategorization, "normalizeContentCategorization");
    function isCategorizationIndexDefinition(index) {
      return "contentCategorization" in index;
    }
    __name(isCategorizationIndexDefinition, "isCategorizationIndexDefinition");
    exports2.isCategorizationIndexDefinition = isCategorizationIndexDefinition;
    function isCustomIndexDefinition(index) {
      return "properties" in index;
    }
    __name(isCustomIndexDefinition, "isCustomIndexDefinition");
    exports2.isCustomIndexDefinition = isCustomIndexDefinition;
    function normalizeIndexDefinition(index, normalizedProperties) {
      if (isCategorizationIndexDefinition(index)) {
        const { contentCategorization, authorityNormProperty: authorityNormProperty2, popularityNormProperty: popularityNormProperty2, filterableProperties: filterableProperties2, ...rest2 } = index;
        (0, ensure_3.ensureNever)();
        return {
          contentCategorization: normalizeContentCategorization(contentCategorization, normalizedProperties),
          authorityNormProperty: authorityNormProperty2 ? normalizeSchemaPropertyIdentifier(authorityNormProperty2, normalizedProperties) : void 0,
          popularityNormProperty: popularityNormProperty2 ? normalizeSchemaPropertyIdentifier(popularityNormProperty2, normalizedProperties) : void 0,
          filterableProperties: filterableProperties2 === null || filterableProperties2 === void 0 ? void 0 : filterableProperties2.map((prop) => normalizeSchemaPropertyIdentifier(prop, normalizedProperties))
        };
      }
      const { properties, contextProperties, authorityNormProperty, popularityNormProperty, filterableProperties, ...rest } = index;
      (0, ensure_3.ensureNever)();
      return {
        properties: properties.map((prop) => normalizeIndexProperty(prop, normalizedProperties)),
        contextProperties: contextProperties ? contextProperties.map((prop) => normalizeSchemaPropertyIdentifier(prop, normalizedProperties)) : void 0,
        authorityNormProperty: authorityNormProperty ? normalizeSchemaPropertyIdentifier(authorityNormProperty, normalizedProperties) : void 0,
        popularityNormProperty: popularityNormProperty ? normalizeSchemaPropertyIdentifier(popularityNormProperty, normalizedProperties) : void 0,
        filterableProperties: filterableProperties === null || filterableProperties === void 0 ? void 0 : filterableProperties.map((prop) => normalizeSchemaPropertyIdentifier(prop, normalizedProperties))
      };
    }
    __name(normalizeIndexDefinition, "normalizeIndexDefinition");
    function normalizeParentDefinition(parent, normalizedProperties) {
      return {
        parentIdProperty: normalizeSchemaPropertyIdentifier(parent.parentIdProperty, normalizedProperties),
        permissions: parent.permissions,
        lifecycle: parent.lifecycle
      };
    }
    __name(normalizeParentDefinition, "normalizeParentDefinition");
    function normalizePropertyValuePathIntoSchemaPath(propertyValue) {
      const normalizedValue = propertyValue.split(".").map((val) => {
        return val.replace(/\[(.*?)\]/, ".items");
      }).join(".properties.");
      return normalizedValue;
    }
    __name(normalizePropertyValuePathIntoSchemaPath, "normalizePropertyValuePathIntoSchemaPath");
    exports2.normalizePropertyValuePathIntoSchemaPath = normalizePropertyValuePathIntoSchemaPath;
    function normalizeSchema(schema) {
      if (isArray(schema)) {
        return {
          ...schema,
          type: ValueType2.Array,
          items: normalizeSchema(schema.items)
        };
      } else if (isObject(schema)) {
        return normalizeObjectSchema(schema);
      }
      return { ...schema };
    }
    __name(normalizeSchema, "normalizeSchema");
    exports2.normalizeSchema = normalizeSchema;
    function normalizeObjectSchema(schema) {
      const normalizedProperties = {};
      const {
        attribution,
        options,
        requireForUpdates,
        codaType,
        description,
        displayProperty,
        featured,
        featuredProperties,
        id,
        identity,
        idProperty,
        imageProperty,
        includeUnknownProperties,
        linkProperty,
        primary,
        properties,
        snippetProperty,
        subtitleProperties,
        titleProperty,
        type,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __packId,
        createdAtProperty,
        createdByProperty,
        modifiedAtProperty,
        modifiedByProperty,
        userEmailProperty,
        userIdProperty,
        groupIdProperty,
        memberGroupIdProperty,
        versionProperty,
        index,
        parent,
        ...rest
      } = schema;
      (0, ensure_3.ensureNever)();
      for (const key of Object.keys(properties)) {
        const normalizedKey = normalizeSchemaKey(key);
        const property = properties[key];
        const { displayName, fixedId, fromKey, mutable, originalKey, required } = property;
        if (originalKey) {
          throw new Error("Original key is only for internal use.");
        }
        const normalizedPropertyAttrs = {
          displayName,
          fixedId,
          fromKey: fromKey || (normalizedKey !== key ? key : void 0),
          mutable,
          originalKey: key,
          required
        };
        normalizedProperties[normalizedKey] = Object.assign(normalizeSchema(property), normalizedPropertyAttrs);
      }
      return {
        attribution,
        options,
        requireForUpdates,
        codaType,
        description,
        displayProperty: displayProperty ? normalizeSchemaKey(displayProperty) : void 0,
        featured: featured ? featured.map(normalizeSchemaKey) : void 0,
        featuredProperties: featuredProperties ? featuredProperties.map(normalizeSchemaKey) : void 0,
        id: id ? normalizeSchemaKey(id) : void 0,
        identity,
        idProperty: idProperty ? normalizeSchemaKey(idProperty) : void 0,
        imageProperty: imageProperty ? normalizeSchemaPropertyIdentifier(imageProperty, normalizedProperties) : void 0,
        includeUnknownProperties,
        linkProperty: linkProperty ? normalizeSchemaPropertyIdentifier(linkProperty, normalizedProperties) : void 0,
        primary: primary ? normalizeSchemaKey(primary) : void 0,
        properties: normalizedProperties,
        snippetProperty: snippetProperty ? normalizeSchemaPropertyIdentifier(snippetProperty, normalizedProperties) : void 0,
        subtitleProperties: subtitleProperties ? subtitleProperties.map((subProp) => normalizeSchemaPropertyIdentifier(subProp, normalizedProperties)) : void 0,
        titleProperty: titleProperty ? normalizeSchemaPropertyIdentifier(titleProperty, normalizedProperties) : void 0,
        createdAtProperty: createdAtProperty ? normalizeSchemaPropertyIdentifier(createdAtProperty, normalizedProperties) : void 0,
        createdByProperty: createdByProperty ? normalizeSchemaPropertyIdentifier(createdByProperty, normalizedProperties) : void 0,
        modifiedAtProperty: modifiedAtProperty ? normalizeSchemaPropertyIdentifier(modifiedAtProperty, normalizedProperties) : void 0,
        modifiedByProperty: modifiedByProperty ? normalizeSchemaPropertyIdentifier(modifiedByProperty, normalizedProperties) : void 0,
        userEmailProperty: userEmailProperty ? normalizeSchemaPropertyIdentifier(userEmailProperty, normalizedProperties) : void 0,
        userIdProperty: userIdProperty ? normalizeSchemaPropertyIdentifier(userIdProperty, normalizedProperties) : void 0,
        groupIdProperty: groupIdProperty ? normalizeSchemaPropertyIdentifier(groupIdProperty, normalizedProperties) : void 0,
        memberGroupIdProperty: memberGroupIdProperty ? normalizeSchemaPropertyIdentifier(memberGroupIdProperty, normalizedProperties) : void 0,
        versionProperty: versionProperty ? normalizeSchemaPropertyIdentifier(versionProperty, normalizedProperties) : void 0,
        index: index ? normalizeIndexDefinition(index, normalizedProperties) : void 0,
        parent: parent ? normalizeParentDefinition(parent, normalizedProperties) : void 0,
        type: ValueType2.Object
      };
    }
    __name(normalizeObjectSchema, "normalizeObjectSchema");
    exports2.normalizeObjectSchema = normalizeObjectSchema;
    function makeReferenceSchemaFromObjectSchema(schema, identityName) {
      const { type, id, primary, identity, properties, options, requireForUpdates } = (0, migration_1.objectSchemaHelper)(schema);
      const { mutable } = schema;
      (0, ensure_2.ensureExists)(identity || identityName, "Source schema must have an identity field, or you must provide an identity name for the reference.");
      const validId = (0, ensure_2.ensureExists)(id);
      const referenceProperties = { [validId]: properties[validId] };
      if (primary && primary !== id) {
        (0, ensure_2.ensureExists)(properties[primary], `Display property "${primary}" must refer to a valid property schema.`);
        referenceProperties[primary] = properties[primary];
      }
      const referenceSchema = {
        codaType: ValueHintType2.Reference,
        displayProperty: primary,
        identity: identity || { name: (0, ensure_2.ensureExists)(identityName) },
        idProperty: id,
        mutable,
        options,
        properties: referenceProperties,
        type,
        requireForUpdates
      };
      return makeObjectSchema2(referenceSchema);
    }
    __name(makeReferenceSchemaFromObjectSchema, "makeReferenceSchemaFromObjectSchema");
    exports2.makeReferenceSchemaFromObjectSchema = makeReferenceSchemaFromObjectSchema;
    function withIdentity(schema, identityName) {
      return makeObjectSchema2({
        ...(0, object_utils_1.deepCopy)(schema),
        identity: { name: (0, ensure_4.ensureNonEmptyString)(identityName) }
      });
    }
    __name(withIdentity, "withIdentity");
    exports2.withIdentity = withIdentity;
    function throwOnDynamicSchemaWithJsOptionsFunction(dynamicSchema, parentKey) {
      if (!dynamicSchema) {
        return;
      }
      if (Array.isArray(dynamicSchema)) {
        dynamicSchema.forEach((item) => throwOnDynamicSchemaWithJsOptionsFunction(item));
        return;
      }
      if (typeof dynamicSchema === "object") {
        for (const key of Object.keys(dynamicSchema)) {
          throwOnDynamicSchemaWithJsOptionsFunction(dynamicSchema[key], key);
        }
      }
      if (typeof dynamicSchema === "function" && parentKey === "options") {
        throw new Error('Sync tables with dynamic schemas must use "options: OptionsType.Dynamic" instead of "options: () => {...}');
      }
    }
    __name(throwOnDynamicSchemaWithJsOptionsFunction, "throwOnDynamicSchemaWithJsOptionsFunction");
    exports2.throwOnDynamicSchemaWithJsOptionsFunction = throwOnDynamicSchemaWithJsOptionsFunction;
  }
});

// ../node_modules/clone/clone.js
var require_clone = __commonJS({
  "../node_modules/clone/clone.js"(exports2, module2) {
    init_crypto_shim();
    var clone = function() {
      "use strict";
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      __name(_instanceof, "_instanceof");
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = /* @__PURE__ */ __name(function() {
        }, "nativeMap");
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = /* @__PURE__ */ __name(function() {
        }, "nativeSet");
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = /* @__PURE__ */ __name(function() {
        }, "nativePromise");
      }
      function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === "object") {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != "undefined";
        if (typeof circular == "undefined")
          circular = true;
        if (typeof depth == "undefined")
          depth = Infinity;
        function _clone(parent2, depth2) {
          if (parent2 === null)
            return null;
          if (depth2 === 0)
            return parent2;
          var child;
          var proto;
          if (typeof parent2 != "object") {
            return parent2;
          }
          if (_instanceof(parent2, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent2, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent2, nativePromise)) {
            child = new nativePromise(function(resolve, reject) {
              parent2.then(function(value) {
                resolve(_clone(value, depth2 - 1));
              }, function(err) {
                reject(_clone(err, depth2 - 1));
              });
            });
          } else if (clone2.__isArray(parent2)) {
            child = [];
          } else if (clone2.__isRegExp(parent2)) {
            child = new RegExp(parent2.source, __getRegExpFlags(parent2));
            if (parent2.lastIndex)
              child.lastIndex = parent2.lastIndex;
          } else if (clone2.__isDate(parent2)) {
            child = new Date(parent2.getTime());
          } else if (useBuffer && Buffer.isBuffer(parent2)) {
            if (Buffer.allocUnsafe) {
              child = Buffer.allocUnsafe(parent2.length);
            } else {
              child = new Buffer(parent2.length);
            }
            parent2.copy(child);
            return child;
          } else if (_instanceof(parent2, Error)) {
            child = Object.create(parent2);
          } else {
            if (typeof prototype == "undefined") {
              proto = Object.getPrototypeOf(parent2);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }
          if (circular) {
            var index = allParents.indexOf(parent2);
            if (index != -1) {
              return allChildren[index];
            }
            allParents.push(parent2);
            allChildren.push(child);
          }
          if (_instanceof(parent2, nativeMap)) {
            parent2.forEach(function(value, key) {
              var keyChild = _clone(key, depth2 - 1);
              var valueChild = _clone(value, depth2 - 1);
              child.set(keyChild, valueChild);
            });
          }
          if (_instanceof(parent2, nativeSet)) {
            parent2.forEach(function(value) {
              var entryChild = _clone(value, depth2 - 1);
              child.add(entryChild);
            });
          }
          for (var i in parent2) {
            var attrs;
            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }
            if (attrs && attrs.set == null) {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent2);
            for (var i = 0; i < symbols.length; i++) {
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }
              child[symbol] = _clone(parent2[symbol], depth2 - 1);
              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }
          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent2);
            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
              if (descriptor && descriptor.enumerable) {
                continue;
              }
              child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }
          return child;
        }
        __name(_clone, "_clone");
        return _clone(parent, depth);
      }
      __name(clone2, "clone");
      clone2.clonePrototype = /* @__PURE__ */ __name(function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = /* @__PURE__ */ __name(function() {
        }, "c");
        c.prototype = parent;
        return new c();
      }, "clonePrototype");
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      __name(__objToStr, "__objToStr");
      clone2.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      __name(__isDate, "__isDate");
      clone2.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      __name(__isArray, "__isArray");
      clone2.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      __name(__isRegExp, "__isRegExp");
      clone2.__isRegExp = __isRegExp;
      function __getRegExpFlags(re) {
        var flags = "";
        if (re.global)
          flags += "g";
        if (re.ignoreCase)
          flags += "i";
        if (re.multiline)
          flags += "m";
        return flags;
      }
      __name(__getRegExpFlags, "__getRegExpFlags");
      clone2.__getRegExpFlags = __getRegExpFlags;
      return clone2;
    }();
    if (typeof module2 === "object" && module2.exports) {
      module2.exports = clone;
    }
  }
});

// ../node_modules/es-errors/type.js
var require_type = __commonJS({
  "../node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = TypeError;
  }
});

// ../node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "../node_modules/object-inspect/util.inspect.js"(exports2, module2) {
    init_crypto_shim();
    module2.exports = require("util").inspect;
  }
});

// ../node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "../node_modules/object-inspect/index.js"(exports2, module2) {
    init_crypto_shim();
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    __name(addNumericSeparator, "addNumericSeparator");
    var utilInspect = require_util_inspect();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    var quotes = {
      __proto__: null,
      "double": '"',
      single: "'"
    };
    var quoteREs = {
      __proto__: null,
      "double": /(["\\])/g,
      single: /(['\\])/g
    };
    module2.exports = /* @__PURE__ */ __name(function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      __name(inspect, "inspect");
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    }, "inspect_");
    function wrapQuotes(s, defaultStyle, opts) {
      var style = opts.quoteStyle || defaultStyle;
      var quoteChar = quotes[style];
      return quoteChar + s + quoteChar;
    }
    __name(wrapQuotes, "wrapQuotes");
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    __name(quote, "quote");
    function canTrustToString(obj) {
      return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
    }
    __name(canTrustToString, "canTrustToString");
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && canTrustToString(obj);
    }
    __name(isArray, "isArray");
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && canTrustToString(obj);
    }
    __name(isDate, "isDate");
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
    }
    __name(isRegExp, "isRegExp");
    function isError(obj) {
      return toStr(obj) === "[object Error]" && canTrustToString(obj);
    }
    __name(isError, "isError");
    function isString(obj) {
      return toStr(obj) === "[object String]" && canTrustToString(obj);
    }
    __name(isString, "isString");
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && canTrustToString(obj);
    }
    __name(isNumber, "isNumber");
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
    }
    __name(isBoolean, "isBoolean");
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    __name(isSymbol, "isSymbol");
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    __name(isBigInt, "isBigInt");
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    __name(has, "has");
    function toStr(obj) {
      return objectToString.call(obj);
    }
    __name(toStr, "toStr");
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    __name(nameOf, "nameOf");
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    __name(indexOf, "indexOf");
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    __name(isMap, "isMap");
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    __name(isWeakMap, "isWeakMap");
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    __name(isWeakRef, "isWeakRef");
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    __name(isSet, "isSet");
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    __name(isWeakSet, "isWeakSet");
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    __name(isElement, "isElement");
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var quoteRE = quoteREs[opts.quoteStyle || "single"];
      quoteRE.lastIndex = 0;
      var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    __name(inspectString, "inspectString");
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    __name(lowbyte, "lowbyte");
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    __name(markBoxed, "markBoxed");
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    __name(weakCollectionOf, "weakCollectionOf");
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    __name(collectionOf, "collectionOf");
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    __name(singleLineValues, "singleLineValues");
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    __name(getIndent, "getIndent");
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    __name(indentedJoin, "indentedJoin");
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
    __name(arrObjKeys, "arrObjKeys");
  }
});

// ../node_modules/side-channel-list/index.js
var require_side_channel_list = __commonJS({
  "../node_modules/side-channel-list/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var listGetNode = /* @__PURE__ */ __name(function(list, key, isDelete) {
      var prev = list;
      var curr;
      for (; (curr = prev.next) != null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          if (!isDelete) {
            curr.next = /** @type {NonNullable<typeof list.next>} */
            list.next;
            list.next = curr;
          }
          return curr;
        }
      }
    }, "listGetNode");
    var listGet = /* @__PURE__ */ __name(function(objects, key) {
      if (!objects) {
        return void 0;
      }
      var node = listGetNode(objects, key);
      return node && node.value;
    }, "listGet");
    var listSet = /* @__PURE__ */ __name(function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
        {
          // eslint-disable-line no-param-reassign, no-extra-parens
          key,
          next: objects.next,
          value
        };
      }
    }, "listSet");
    var listHas = /* @__PURE__ */ __name(function(objects, key) {
      if (!objects) {
        return false;
      }
      return !!listGetNode(objects, key);
    }, "listHas");
    var listDelete = /* @__PURE__ */ __name(function(objects, key) {
      if (objects) {
        return listGetNode(objects, key, true);
      }
    }, "listDelete");
    module2.exports = /* @__PURE__ */ __name(function getSideChannelList() {
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          var root = $o && $o.next;
          var deletedNode = listDelete($o, key);
          if (deletedNode && root && root === deletedNode) {
            $o = void 0;
          }
          return !!deletedNode;
        },
        get: function(key) {
          return listGet($o, key);
        },
        has: function(key) {
          return listHas($o, key);
        },
        set: function(key, value) {
          if (!$o) {
            $o = {
              next: void 0
            };
          }
          listSet(
            /** @type {NonNullable<typeof $o>} */
            $o,
            key,
            value
          );
        }
      };
      return channel;
    }, "getSideChannelList");
  }
});

// ../node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "../node_modules/es-object-atoms/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Object;
  }
});

// ../node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "../node_modules/es-errors/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Error;
  }
});

// ../node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "../node_modules/es-errors/eval.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = EvalError;
  }
});

// ../node_modules/es-errors/range.js
var require_range = __commonJS({
  "../node_modules/es-errors/range.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = RangeError;
  }
});

// ../node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "../node_modules/es-errors/ref.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = ReferenceError;
  }
});

// ../node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "../node_modules/es-errors/syntax.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = SyntaxError;
  }
});

// ../node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "../node_modules/es-errors/uri.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = URIError;
  }
});

// ../node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "../node_modules/math-intrinsics/abs.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Math.abs;
  }
});

// ../node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "../node_modules/math-intrinsics/floor.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Math.floor;
  }
});

// ../node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "../node_modules/math-intrinsics/max.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Math.max;
  }
});

// ../node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "../node_modules/math-intrinsics/min.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Math.min;
  }
});

// ../node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "../node_modules/math-intrinsics/pow.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Math.pow;
  }
});

// ../node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "../node_modules/math-intrinsics/round.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Math.round;
  }
});

// ../node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "../node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Number.isNaN || /* @__PURE__ */ __name(function isNaN2(a) {
      return a !== a;
    }, "isNaN");
  }
});

// ../node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "../node_modules/math-intrinsics/sign.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var $isNaN = require_isNaN();
    module2.exports = /* @__PURE__ */ __name(function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    }, "sign");
  }
});

// ../node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "../node_modules/gopd/gOPD.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Object.getOwnPropertyDescriptor;
  }
});

// ../node_modules/gopd/index.js
var require_gopd = __commonJS({
  "../node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  }
});

// ../node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "../node_modules/es-define-property/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  }
});

// ../node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "../node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = /* @__PURE__ */ __name(function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    }, "hasSymbols");
  }
});

// ../node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "../node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = /* @__PURE__ */ __name(function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    }, "hasNativeSymbols");
  }
});

// ../node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "../node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// ../node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "../node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var $Object = require_es_object_atoms();
    module2.exports = $Object.getPrototypeOf || null;
  }
});

// ../node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "../node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = /* @__PURE__ */ __name(function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    }, "concatty");
    var slicy = /* @__PURE__ */ __name(function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    }, "slicy");
    var joiny = /* @__PURE__ */ __name(function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    }, "joiny");
    module2.exports = /* @__PURE__ */ __name(function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = /* @__PURE__ */ __name(function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      }, "binder");
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = /* @__PURE__ */ __name(function Empty2() {
        }, "Empty");
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    }, "bind");
  }
});

// ../node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "../node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// ../node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "../node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Function.prototype.call;
  }
});

// ../node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "../node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Function.prototype.apply;
  }
});

// ../node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "../node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// ../node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "../node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var bind = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module2.exports = $reflectApply || bind.call($call, $apply);
  }
});

// ../node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "../node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var bind = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module2.exports = /* @__PURE__ */ __name(function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind, $call, args);
    }, "callBindBasic");
  }
});

// ../node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "../node_modules/dunder-proto/get.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e) {
      if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
        throw e;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      /* @__PURE__ */ __name(function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }, "getDunder")
    ) : false;
  }
});

// ../node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "../node_modules/get-proto/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module2.exports = reflectGetProto ? /* @__PURE__ */ __name(function getProto(O) {
      return reflectGetProto(O);
    }, "getProto") : originalGetProto ? /* @__PURE__ */ __name(function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    }, "getProto") : getDunderProto ? /* @__PURE__ */ __name(function getProto(O) {
      return getDunderProto(O);
    }, "getProto") : null;
  }
});

// ../node_modules/hasown/index.js
var require_hasown = __commonJS({
  "../node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  }
});

// ../node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "../node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = /* @__PURE__ */ __name(function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    }, "getEvalledConstructor");
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = /* @__PURE__ */ __name(function() {
      throw new $TypeError();
    }, "throwTypeError");
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = /* @__PURE__ */ __name(function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    }, "doEval");
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = /* @__PURE__ */ __name(function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    }, "stringToPath");
    var getBaseIntrinsic = /* @__PURE__ */ __name(function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    }, "getBaseIntrinsic");
    module2.exports = /* @__PURE__ */ __name(function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    }, "GetIntrinsic");
  }
});

// ../node_modules/call-bound/index.js
var require_call_bound = __commonJS({
  "../node_modules/call-bound/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var GetIntrinsic = require_get_intrinsic();
    var callBindBasic = require_call_bind_apply_helpers();
    var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
    module2.exports = /* @__PURE__ */ __name(function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = (
        /** @type {(this: unknown, ...args: unknown[]) => unknown} */
        GetIntrinsic(name, !!allowMissing)
      );
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBindBasic(
          /** @type {const} */
          [intrinsic]
        );
      }
      return intrinsic;
    }, "callBoundIntrinsic");
  }
});

// ../node_modules/side-channel-map/index.js
var require_side_channel_map = __commonJS({
  "../node_modules/side-channel-map/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var $Map = GetIntrinsic("%Map%", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var $mapDelete = callBound("Map.prototype.delete", true);
    var $mapSize = callBound("Map.prototype.size", true);
    module2.exports = !!$Map && /** @type {Exclude<import('.'), false>} */
    /* @__PURE__ */ __name(function getSideChannelMap() {
      var $m;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          if ($m) {
            var result = $mapDelete($m, key);
            if ($mapSize($m) === 0) {
              $m = void 0;
            }
            return result;
          }
          return false;
        },
        get: function(key) {
          if ($m) {
            return $mapGet($m, key);
          }
        },
        has: function(key) {
          if ($m) {
            return $mapHas($m, key);
          }
          return false;
        },
        set: function(key, value) {
          if (!$m) {
            $m = new $Map();
          }
          $mapSet($m, key, value);
        }
      };
      return channel;
    }, "getSideChannelMap");
  }
});

// ../node_modules/side-channel-weakmap/index.js
var require_side_channel_weakmap = __commonJS({
  "../node_modules/side-channel-weakmap/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_call_bound();
    var inspect = require_object_inspect();
    var getSideChannelMap = require_side_channel_map();
    var $TypeError = require_type();
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
    module2.exports = $WeakMap ? (
      /** @type {Exclude<import('.'), false>} */
      /* @__PURE__ */ __name(function getSideChannelWeakMap() {
        var $wm;
        var $m;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapDelete($wm, key);
              }
            } else if (getSideChannelMap) {
              if ($m) {
                return $m["delete"](key);
              }
            }
            return false;
          },
          get: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapGet($wm, key);
              }
            }
            return $m && $m.get(key);
          },
          has: function(key) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if ($wm) {
                return $weakMapHas($wm, key);
              }
            }
            return !!$m && $m.has(key);
          },
          set: function(key, value) {
            if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
              if (!$wm) {
                $wm = new $WeakMap();
              }
              $weakMapSet($wm, key, value);
            } else if (getSideChannelMap) {
              if (!$m) {
                $m = getSideChannelMap();
              }
              $m.set(key, value);
            }
          }
        };
        return channel;
      }, "getSideChannelWeakMap")
    ) : getSideChannelMap;
  }
});

// ../node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "../node_modules/side-channel/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var $TypeError = require_type();
    var inspect = require_object_inspect();
    var getSideChannelList = require_side_channel_list();
    var getSideChannelMap = require_side_channel_map();
    var getSideChannelWeakMap = require_side_channel_weakmap();
    var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
    module2.exports = /* @__PURE__ */ __name(function getSideChannel() {
      var $channelData;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        "delete": function(key) {
          return !!$channelData && $channelData["delete"](key);
        },
        get: function(key) {
          return $channelData && $channelData.get(key);
        },
        has: function(key) {
          return !!$channelData && $channelData.has(key);
        },
        set: function(key, value) {
          if (!$channelData) {
            $channelData = makeChannel();
          }
          $channelData.set(key, value);
        }
      };
      return channel;
    }, "getSideChannel");
  }
});

// ../node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "../node_modules/qs/lib/formats.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// ../node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "../node_modules/qs/lib/utils.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = /* @__PURE__ */ __name(function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    }, "compactQueue");
    var arrayToObject = /* @__PURE__ */ __name(function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    }, "arrayToObject");
    var merge = /* @__PURE__ */ __name(function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    }, "merge");
    var assign = /* @__PURE__ */ __name(function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    }, "assignSingleSource");
    var decode = /* @__PURE__ */ __name(function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    }, "decode");
    var encode = /* @__PURE__ */ __name(function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
          out += string.charAt(i);
          continue;
        }
        if (c < 128) {
          out = out + hexTable[c];
          continue;
        }
        if (c < 2048) {
          out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
          continue;
        }
        if (c < 55296 || c >= 57344) {
          out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
          continue;
        }
        i += 1;
        c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
      return out;
    }, "encode");
    var compact = /* @__PURE__ */ __name(function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    }, "compact");
    var isRegExp = /* @__PURE__ */ __name(function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    }, "isRegExp");
    var isBuffer = /* @__PURE__ */ __name(function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    }, "isBuffer");
    var combine = /* @__PURE__ */ __name(function combine2(a, b) {
      return [].concat(a, b);
    }, "combine");
    var maybeMap = /* @__PURE__ */ __name(function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    }, "maybeMap");
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// ../node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "../node_modules/qs/lib/stringify.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: /* @__PURE__ */ __name(function brackets(prefix) {
        return prefix + "[]";
      }, "brackets"),
      comma: "comma",
      indices: /* @__PURE__ */ __name(function indices(prefix, key) {
        return prefix + "[" + key + "]";
      }, "indices"),
      repeat: /* @__PURE__ */ __name(function repeat(prefix) {
        return prefix;
      }, "repeat")
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = /* @__PURE__ */ __name(function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    }, "pushToArray");
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: /* @__PURE__ */ __name(function serializeDate(date) {
        return toISO.call(date);
      }, "serializeDate"),
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = /* @__PURE__ */ __name(function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    }, "isNonNullishPrimitive");
    var sentinel = {};
    var stringify = /* @__PURE__ */ __name(function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = utils.maybeMap(obj, encoder);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + "[]" : prefix;
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          commaRoundTrip,
          strictNullHandling,
          skipNulls,
          generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel
        ));
      }
      return values;
    }, "stringify");
    var normalizeStringifyOptions = /* @__PURE__ */ __name(function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    }, "normalizeStringifyOptions");
    module2.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(keys, stringify(
          obj[key],
          key,
          generateArrayPrefix,
          commaRoundTrip,
          options.strictNullHandling,
          options.skipNulls,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel
        ));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// ../node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "../node_modules/qs/lib/parse.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = /* @__PURE__ */ __name(function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    }, "interpretNumericEntities");
    var parseArrayValue = /* @__PURE__ */ __name(function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    }, "parseArrayValue");
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = /* @__PURE__ */ __name(function parseQueryStringValues(str, options) {
      var obj = { __proto__: null };
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(part.slice(pos + 1), options),
            function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    }, "parseQueryStringValues");
    var parseObject = /* @__PURE__ */ __name(function(chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
            obj = [];
            obj[index] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    }, "parseObject");
    var parseKeys = /* @__PURE__ */ __name(function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options, valuesParsed);
    }, "parseQueryStringKeys");
    var normalizeParseOptions = /* @__PURE__ */ __name(function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    }, "normalizeParseOptions");
    module2.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// ../node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "../node_modules/qs/lib/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// ../node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "../node_modules/requires-port/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = /* @__PURE__ */ __name(function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port)
        return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    }, "required");
  }
});

// ../node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "../node_modules/querystringify/index.js"(exports2) {
    "use strict";
    init_crypto_shim();
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    __name(decode, "decode");
    function encode(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    __name(encode, "encode");
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode(part[1]), value = decode(part[2]);
        if (key === null || value === null || key in result)
          continue;
        result[key] = value;
      }
      return result;
    }
    __name(querystring, "querystring");
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix)
        prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode(key);
          value = encode(value);
          if (key === null || value === null)
            continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    __name(querystringify, "querystringify");
    exports2.stringify = querystringify;
    exports2.parse = querystring;
  }
});

// ../node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "../node_modules/url-parse/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    __name(trimLeft, "trimLeft");
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      /* @__PURE__ */ __name(function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      }, "sanitize"),
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined")
        globalVar = window;
      else if (typeof global !== "undefined")
        globalVar = global;
      else if (typeof self !== "undefined")
        globalVar = self;
      else
        globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore)
          delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore)
            continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    __name(lolcation, "lolcation");
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    __name(isSpecial, "isSpecial");
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    __name(extractProtocol, "extractProtocol");
    function resolve(relative, base) {
      if (relative === "")
        return base;
      var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path[i] === ".") {
          path.splice(i, 1);
        } else if (path[i] === "..") {
          path.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0)
            unshift = true;
          path.splice(i, 1);
          up--;
        }
      }
      if (unshift)
        path.unshift("");
      if (last === "." || last === "..")
        path.push("");
      return path.join("/");
    }
    __name(resolve, "resolve");
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser)
        parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse = instruction[0];
        key = instruction[1];
        if (parse !== parse) {
          url[key] = address;
        } else if ("string" === typeof parse) {
          index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse.exec(address)) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4])
          url[key] = url[key].toLowerCase();
      }
      if (parser)
        url.query = parser(url.query);
      if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
      }
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
    }
    __name(Url, "Url");
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port)
            value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4])
          url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
      return url;
    }
    __name(set, "set");
    function toString(stringify) {
      if (!stringify || "function" !== typeof stringify)
        stringify = qs.stringify;
      var query, url = this, host = url.host, protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":")
        protocol += ":";
      var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password)
          result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
        host += ":";
      }
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify(url.query) : url.query;
      if (query)
        result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash)
        result += url.hash;
      return result;
    }
    __name(toString, "toString");
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  }
});

// ../node_modules/@codahq/packs-sdk/dist/helpers/url.js
var require_url = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/helpers/url.js"(exports2) {
    "use strict";
    init_crypto_shim();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.join = exports2.getQueryParams = exports2.withQueryParams = void 0;
    var ensure_1 = require_ensure();
    var qs_1 = __importDefault(require_lib());
    var url_parse_1 = __importDefault(require_url_parse());
    function withQueryParams(url, params) {
      if (!params) {
        return url;
      }
      const parsedUrl = (0, url_parse_1.default)(url);
      const updatedParams = Object.assign({}, qs_1.default.parse(parsedUrl.query, { ignoreQueryPrefix: true }), params);
      parsedUrl.set("query", qs_1.default.stringify(JSON.parse(JSON.stringify(updatedParams)), { addQueryPrefix: true }));
      return parsedUrl.toString();
    }
    __name(withQueryParams, "withQueryParams");
    exports2.withQueryParams = withQueryParams;
    function getQueryParams(url) {
      const parsedUrl = (0, url_parse_1.default)(url);
      return qs_1.default.parse(parsedUrl.query, { ignoreQueryPrefix: true });
    }
    __name(getQueryParams, "getQueryParams");
    exports2.getQueryParams = getQueryParams;
    function join(...tokens) {
      if (!tokens || !tokens.length) {
        return "";
      }
      const combinedTokens = [];
      for (const token of tokens) {
        (0, ensure_1.ensureNonEmptyString)(token);
        if (combinedTokens.length === 0) {
          combinedTokens.push(token);
        } else {
          combinedTokens.push(token.replace(/^\/+/, ""));
        }
        if (!token.endsWith("/")) {
          combinedTokens.push("/");
        }
      }
      const combined = combinedTokens.join("");
      if (!tokens[tokens.length - 1].endsWith("/")) {
        return combined.slice(0, combined.length - 1);
      }
      return combined;
    }
    __name(join, "join");
    exports2.join = join;
  }
});

// ../node_modules/@codahq/packs-sdk/dist/handler_templates.js
var require_handler_templates = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/handler_templates.js"(exports2) {
    "use strict";
    init_crypto_shim();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateObjectResponseHandler = exports2.untransformKeys = exports2.untransformBody = exports2.transformBody = exports2.generateRequestHandler = void 0;
    var clone_1 = __importDefault(require_clone());
    var object_utils_1 = require_object_utils();
    var ensure_1 = require_ensure();
    var schema_1 = require_schema();
    var schema_2 = require_schema();
    var url_1 = require_url();
    function generateParamMap(keys, nameToValueMap, optionalNames) {
      const map = {};
      keys.forEach((key) => {
        let val = nameToValueMap[key];
        if (typeof val === "undefined") {
          if (optionalNames && optionalNames.has(key)) {
            return;
          }
          val = "";
        }
        map[key] = val;
      });
      return map;
    }
    __name(generateParamMap, "generateParamMap");
    function generateQueryParamMap(keys, nameToValueMap, optionalNames) {
      const map = {};
      keys.forEach((key) => {
        let val = nameToValueMap[key];
        if (typeof val === "undefined") {
          if (optionalNames && optionalNames.has(key)) {
            return;
          }
          val = "";
        }
        map[key] = encodeURIComponent(String(val));
      });
      return map;
    }
    __name(generateQueryParamMap, "generateQueryParamMap");
    function formatString(template, params) {
      let result = template;
      for (const [key, value] of Object.entries(params)) {
        result = result.replace(`{${key}}`, value);
      }
      return result;
    }
    __name(formatString, "formatString");
    function generateRequestHandler(request, parameters) {
      const { url, queryParams, nameMapping: paramNameMapping, bodyTemplate, bodyParams, method, headers, transforms } = request;
      const indexToNameMap = /* @__PURE__ */ new Map();
      const names = /* @__PURE__ */ new Set();
      const optionalNames = /* @__PURE__ */ new Set();
      parameters.forEach((arg, index) => {
        const name = paramNameMapping && paramNameMapping[arg.name] || arg.name;
        if (names.has(name)) {
          throw new Error(`Duplicate name ${name} detected`);
        }
        names.add(name);
        if (arg.optional) {
          optionalNames.add(name);
        }
        indexToNameMap.set(index, name);
      });
      const hasQueryParams = Boolean(queryParams && queryParams.length);
      const hasBodyParams = Boolean(bodyParams && bodyParams.length);
      return /* @__PURE__ */ __name(function requestHandler(params) {
        const nameMapping = {};
        params.forEach((param, index) => {
          const paramName = (0, ensure_1.ensureExists)(indexToNameMap.get(index));
          const paramTransform = transforms ? transforms[paramName] : void 0;
          if (paramTransform) {
            const transformResult = paramTransform(param);
            if (transformResult && typeof transformResult === "object") {
              Object.assign(nameMapping, transformResult);
            } else {
              nameMapping[paramName] = transformResult;
            }
          } else {
            nameMapping[paramName] = param;
          }
        });
        const baseUrl = formatString(url, generateQueryParamMap(Object.keys(nameMapping), nameMapping));
        const fullUrl = hasQueryParams ? (0, url_1.withQueryParams)(baseUrl, generateQueryParamMap((0, ensure_1.ensureExists)(queryParams), nameMapping, optionalNames)) : baseUrl;
        let body;
        if (bodyTemplate) {
          body = (0, clone_1.default)(bodyTemplate);
        }
        if (hasBodyParams) {
          const currentBodyParams = generateParamMap((0, ensure_1.ensureExists)(bodyParams), nameMapping, optionalNames);
          body = body ? { ...body, ...currentBodyParams } : currentBodyParams;
        }
        return {
          url: fullUrl,
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers
          },
          body: body ? JSON.stringify(body) : void 0
        };
      }, "requestHandler");
    }
    __name(generateRequestHandler, "generateRequestHandler");
    exports2.generateRequestHandler = generateRequestHandler;
    function mapKeys(obj, schema) {
      if (!(schema && (0, schema_2.isObject)(schema))) {
        return obj;
      }
      const { properties } = schema;
      const remappedKeys = /* @__PURE__ */ new Map();
      for (const key in properties) {
        if (properties.hasOwnProperty(key) && properties[key].fromKey) {
          const fromKey = (0, ensure_1.ensureExists)(properties[key].fromKey);
          remappedKeys.set(fromKey, [...remappedKeys.get(fromKey) || [], key]);
        }
      }
      const remappedObject = {};
      for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        const mappedKeys = remappedKeys.get(key) || [key];
        for (const newKey of mappedKeys) {
          if (!schema.properties[newKey] && !schema.includeUnknownProperties) {
            continue;
          }
          remappedObject[newKey] = mappedKeys.length > 1 ? (0, object_utils_1.deepCopy)(obj[key]) : obj[key];
          const keySchema = schema.properties[newKey];
          const currentValue = remappedObject[newKey];
          if (Array.isArray(currentValue) && (0, schema_1.isArray)(keySchema) && (0, schema_2.isObject)(keySchema.items)) {
            remappedObject[newKey] = currentValue.map((val) => mapKeys(val, keySchema.items));
          } else if (typeof currentValue === "object" && (0, schema_2.isObject)(keySchema)) {
            remappedObject[newKey] = mapKeys(currentValue, keySchema);
          }
        }
      }
      return remappedObject;
    }
    __name(mapKeys, "mapKeys");
    function transformBody(body, schema) {
      if ((0, schema_1.isArray)(schema) && (0, schema_2.isObject)(schema.items)) {
        const objects = body;
        const mappedObjs = objects.map((obj) => mapKeys(obj, schema.items));
        return mappedObjs;
      }
      if ((0, schema_2.isObject)(schema)) {
        return mapKeys(body, schema);
      }
      return body;
    }
    __name(transformBody, "transformBody");
    exports2.transformBody = transformBody;
    function getUnmapKeyLookup(schema) {
      const remappedKeys = /* @__PURE__ */ new Map();
      if (!(schema && (0, schema_2.isObject)(schema))) {
        return remappedKeys;
      }
      const { properties } = schema;
      for (const key in properties) {
        if (properties.hasOwnProperty(key) && properties[key].fromKey) {
          const fromKey = (0, ensure_1.ensureExists)(properties[key].fromKey);
          remappedKeys.set(key, fromKey);
        }
      }
      return remappedKeys;
    }
    __name(getUnmapKeyLookup, "getUnmapKeyLookup");
    function unmapKeys(obj, schema) {
      if (!(schema && (0, schema_2.isObject)(schema))) {
        return obj;
      }
      const remappedKeys = getUnmapKeyLookup(schema);
      const remappedObject = {};
      for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        const newKey = remappedKeys.get(key) || key;
        if (!schema.properties[key] && !schema.includeUnknownProperties) {
          continue;
        }
        remappedObject[newKey] = (0, object_utils_1.deepCopy)(obj[key]);
        const keySchema = schema.properties[key];
        const currentValue = remappedObject[newKey];
        if (Array.isArray(currentValue) && (0, schema_1.isArray)(keySchema) && (0, schema_2.isObject)(keySchema.items)) {
          remappedObject[newKey] = currentValue.map((val) => unmapKeys(val, keySchema.items));
        } else if (typeof currentValue === "object" && (0, schema_2.isObject)(keySchema)) {
          remappedObject[newKey] = unmapKeys(currentValue, keySchema);
        }
      }
      return remappedObject;
    }
    __name(unmapKeys, "unmapKeys");
    function untransformBody(body, schema) {
      if ((0, schema_1.isArray)(schema) && (0, schema_2.isObject)(schema.items)) {
        const objects = body;
        const mappedObjs = objects.map((obj) => unmapKeys(obj, schema.items));
        return mappedObjs;
      }
      if ((0, schema_2.isObject)(schema)) {
        return unmapKeys(body, schema);
      }
      return body;
    }
    __name(untransformBody, "untransformBody");
    exports2.untransformBody = untransformBody;
    function untransformKeys(keys, schema) {
      const schemaObject = (0, schema_1.isArray)(schema) && (0, schema_2.isObject)(schema.items) ? schema.items : schema;
      const remappedKeys = getUnmapKeyLookup(schemaObject);
      return keys.map((key) => remappedKeys.get(key) || key);
    }
    __name(untransformKeys, "untransformKeys");
    exports2.untransformKeys = untransformKeys;
    function generateObjectResponseHandler(response) {
      const { projectKey } = response;
      return /* @__PURE__ */ __name(function objectResponseHandler(resp) {
        const { body } = resp;
        if (typeof body !== "object") {
          return body;
        }
        const projectedBody = projectKey ? body[projectKey] : body;
        return projectedBody;
      }, "objectResponseHandler");
    }
    __name(generateObjectResponseHandler, "generateObjectResponseHandler");
    exports2.generateObjectResponseHandler = generateObjectResponseHandler;
  }
});

// ../node_modules/@codahq/packs-sdk/dist/api.js
var require_api = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/api.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.maybeRewriteConnectionForFormula = exports2.maybeRewriteConnectionForNamedPropertyOptions = exports2.makeEmptyFormula = exports2.makeTranslateObjectFormula = exports2.makeDynamicSyncTable = exports2.makeSyncTableLegacy = exports2.makeSyncTable = exports2.makeObjectFormula = exports2.makeSimpleAutocompleteMetadataFormula = exports2.autocompleteSearchObjects = exports2.simpleAutocomplete = exports2.makePropertyOptionsFormula = exports2.makeMetadataFormula = exports2.normalizePropertyOptionsResults = exports2.makeFormula = exports2.makeStringFormula = exports2.makeNumericFormula = exports2.UpdateOutcome = exports2.isSyncPackFormula = exports2.isStringPackFormula = exports2.isObjectPackFormula = exports2.check = exports2.makeUserVisibleError = exports2.makeFileArrayParameter = exports2.makeFileParameter = exports2.makeImageArrayParameter = exports2.makeImageParameter = exports2.makeHtmlArrayParameter = exports2.makeHtmlParameter = exports2.makeDateArrayParameter = exports2.makeDateParameter = exports2.makeBooleanArrayParameter = exports2.makeBooleanParameter = exports2.makeNumericArrayParameter = exports2.makeNumericParameter = exports2.makeStringArrayParameter = exports2.makeStringParameter = exports2.makeParameter = exports2.wrapGetSchema = exports2.wrapMetadataFunction = exports2.isDynamicSyncTable = exports2.isUserVisibleError = exports2.ResponseSizeTooLargeError = exports2.GoogleDwdError = exports2.MissingScopesError = exports2.StatusCodeError = exports2.UserVisibleError = void 0;
    var api_types_1 = require_api_types();
    var api_types_2 = require_api_types();
    var api_types_3 = require_api_types();
    var api_types_4 = require_api_types();
    var api_types_5 = require_api_types();
    var api_types_6 = require_api_types();
    var schema_1 = require_schema();
    var schema_2 = require_schema();
    var ensure_1 = require_ensure();
    var api_types_7 = require_api_types();
    var api_types_8 = require_api_types();
    var object_utils_1 = require_object_utils();
    var ensure_2 = require_ensure();
    var api_types_9 = require_api_types();
    var handler_templates_1 = require_handler_templates();
    var handler_templates_2 = require_handler_templates();
    var api_types_10 = require_api_types();
    var api_types_11 = require_api_types();
    var object_utils_2 = require_object_utils();
    var schema_3 = require_schema();
    var schema_4 = require_schema();
    var schema_5 = require_schema();
    var schema_6 = require_schema();
    var api_types_12 = require_api_types();
    var migration_1 = require_migration();
    var api_types_13 = require_api_types();
    var schema_7 = require_schema();
    var _UserVisibleError = class _UserVisibleError extends Error {
      /**
       * Use to construct a user-visible error.
       */
      constructor(message, internalError) {
        super(message);
        this.isUserVisible = true;
        this.internalError = internalError;
      }
    };
    __name(_UserVisibleError, "UserVisibleError");
    var UserVisibleError2 = _UserVisibleError;
    exports2.UserVisibleError = UserVisibleError2;
    var _StatusCodeError = class _StatusCodeError extends Error {
      /** @hidden */
      constructor(statusCode, body, options, response) {
        super(`${statusCode} - ${JSON.stringify(body)}`);
        this.name = "StatusCodeError";
        this.statusCode = statusCode;
        this.body = body;
        this.error = body;
        this.options = options;
        let responseBody = response === null || response === void 0 ? void 0 : response.body;
        if (typeof responseBody === "object") {
          responseBody = JSON.stringify(responseBody);
        }
        this.response = { ...response, body: responseBody };
      }
      /** Returns if the error is an instance of StatusCodeError. Note that `instanceof` may not work. */
      static isStatusCodeError(err) {
        return "name" in err && err.name === _StatusCodeError.name;
      }
    };
    __name(_StatusCodeError, "StatusCodeError");
    var StatusCodeError = _StatusCodeError;
    exports2.StatusCodeError = StatusCodeError;
    var _MissingScopesError = class _MissingScopesError extends Error {
      /** @hidden */
      constructor(message) {
        super(message || "Additional permissions are required");
        this.name = "MissingScopesError";
      }
      /** Returns if the error is an instance of MissingScopesError. Note that `instanceof` may not work. */
      static isMissingScopesError(err) {
        return "name" in err && err.name === _MissingScopesError.name;
      }
    };
    __name(_MissingScopesError, "MissingScopesError");
    var MissingScopesError = _MissingScopesError;
    exports2.MissingScopesError = MissingScopesError;
    var _GoogleDwdError = class _GoogleDwdError extends Error {
      /** @hidden */
      constructor(message) {
        super(message || "Google DWD error");
        this.name = "GoogleDwdError";
      }
      static isGoogleDwdError(err) {
        return "name" in err && err.name === _GoogleDwdError.name;
      }
    };
    __name(_GoogleDwdError, "GoogleDwdError");
    var GoogleDwdError = _GoogleDwdError;
    exports2.GoogleDwdError = GoogleDwdError;
    var _ResponseSizeTooLargeError = class _ResponseSizeTooLargeError extends Error {
      /** @hidden */
      constructor(message) {
        super(message || "Response size too large");
        this.name = "ResponseSizeTooLargeError";
      }
      /** Returns if the error is an instance of ResponseSizeTooLargeError. Note that `instanceof` may not work. */
      static isResponseSizeTooLargeError(err) {
        return "name" in err && err.name === _ResponseSizeTooLargeError.name;
      }
    };
    __name(_ResponseSizeTooLargeError, "ResponseSizeTooLargeError");
    var ResponseSizeTooLargeError = _ResponseSizeTooLargeError;
    exports2.ResponseSizeTooLargeError = ResponseSizeTooLargeError;
    function isUserVisibleError(error) {
      return "isUserVisible" in error && error.isUserVisible;
    }
    __name(isUserVisibleError, "isUserVisibleError");
    exports2.isUserVisibleError = isUserVisibleError;
    function isDynamicSyncTable(syncTable) {
      return "isDynamic" in syncTable;
    }
    __name(isDynamicSyncTable, "isDynamicSyncTable");
    exports2.isDynamicSyncTable = isDynamicSyncTable;
    function wrapMetadataFunction(fnOrFormula) {
      return typeof fnOrFormula === "function" ? makeMetadataFormula(fnOrFormula) : fnOrFormula;
    }
    __name(wrapMetadataFunction, "wrapMetadataFunction");
    exports2.wrapMetadataFunction = wrapMetadataFunction;
    function transformToArraySchema(schema) {
      if ((schema === null || schema === void 0 ? void 0 : schema.type) === schema_2.ValueType.Array) {
        return schema;
      } else {
        return {
          type: schema_2.ValueType.Array,
          items: schema
        };
      }
    }
    __name(transformToArraySchema, "transformToArraySchema");
    function wrapGetSchema(getSchema) {
      if (!getSchema) {
        return;
      }
      return {
        ...getSchema,
        execute(params, context) {
          const schema = getSchema.execute(params, context);
          if ((0, object_utils_2.isPromise)(schema)) {
            return schema.then((value) => transformToArraySchema(value));
          } else {
            return transformToArraySchema(schema);
          }
        }
      };
    }
    __name(wrapGetSchema, "wrapGetSchema");
    exports2.wrapGetSchema = wrapGetSchema;
    function makeParameter2(paramDefinition) {
      const { type, autocomplete: autocompleteDefOrItems, crawlStrategy: crawlStrategyDef, allowManualInput: allowManualInputDef, ...rest } = paramDefinition;
      const actualType = api_types_4.ParameterTypeInputMap[type];
      let autocomplete;
      if (Array.isArray(autocompleteDefOrItems)) {
        const autocompleteDef = makeSimpleAutocompleteMetadataFormula(autocompleteDefOrItems);
        autocomplete = wrapMetadataFunction(autocompleteDef);
      } else {
        autocomplete = wrapMetadataFunction(autocompleteDefOrItems);
      }
      let crawlStrategy;
      if (crawlStrategyDef) {
        if (crawlStrategyDef.parentTable) {
          const { tableName, propertyKey, inheritPermissions } = crawlStrategyDef.parentTable;
          crawlStrategy = {
            parentTable: {
              tableName,
              propertyKey: (0, schema_6.normalizeSchemaKey)(propertyKey),
              inheritPermissions
            }
          };
        } else {
          crawlStrategy = crawlStrategyDef;
        }
      }
      const allowManualInput = !(allowManualInputDef === false);
      return Object.freeze({
        ...rest,
        allowManualInput,
        autocomplete,
        type: actualType,
        crawlStrategy
      });
    }
    __name(makeParameter2, "makeParameter");
    exports2.makeParameter = makeParameter2;
    function makeStringParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_6.Type.string });
    }
    __name(makeStringParameter, "makeStringParameter");
    exports2.makeStringParameter = makeStringParameter;
    function makeStringArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_13.stringArray });
    }
    __name(makeStringArrayParameter, "makeStringArrayParameter");
    exports2.makeStringArrayParameter = makeStringArrayParameter;
    function makeNumericParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_6.Type.number });
    }
    __name(makeNumericParameter, "makeNumericParameter");
    exports2.makeNumericParameter = makeNumericParameter;
    function makeNumericArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_12.numberArray });
    }
    __name(makeNumericArrayParameter, "makeNumericArrayParameter");
    exports2.makeNumericArrayParameter = makeNumericArrayParameter;
    function makeBooleanParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_6.Type.boolean });
    }
    __name(makeBooleanParameter, "makeBooleanParameter");
    exports2.makeBooleanParameter = makeBooleanParameter;
    function makeBooleanArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_7.booleanArray });
    }
    __name(makeBooleanArrayParameter, "makeBooleanArrayParameter");
    exports2.makeBooleanArrayParameter = makeBooleanArrayParameter;
    function makeDateParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_6.Type.date });
    }
    __name(makeDateParameter, "makeDateParameter");
    exports2.makeDateParameter = makeDateParameter;
    function makeDateArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_8.dateArray });
    }
    __name(makeDateArrayParameter, "makeDateArrayParameter");
    exports2.makeDateArrayParameter = makeDateArrayParameter;
    function makeHtmlParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_6.Type.html });
    }
    __name(makeHtmlParameter, "makeHtmlParameter");
    exports2.makeHtmlParameter = makeHtmlParameter;
    function makeHtmlArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_10.htmlArray });
    }
    __name(makeHtmlArrayParameter, "makeHtmlArrayParameter");
    exports2.makeHtmlArrayParameter = makeHtmlArrayParameter;
    function makeImageParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_6.Type.image });
    }
    __name(makeImageParameter, "makeImageParameter");
    exports2.makeImageParameter = makeImageParameter;
    function makeImageArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_11.imageArray });
    }
    __name(makeImageArrayParameter, "makeImageArrayParameter");
    exports2.makeImageArrayParameter = makeImageArrayParameter;
    function makeFileParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_6.Type.file });
    }
    __name(makeFileParameter, "makeFileParameter");
    exports2.makeFileParameter = makeFileParameter;
    function makeFileArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_9.fileArray });
    }
    __name(makeFileArrayParameter, "makeFileArrayParameter");
    exports2.makeFileArrayParameter = makeFileArrayParameter;
    function makeUserVisibleError(msg) {
      return new UserVisibleError2(msg);
    }
    __name(makeUserVisibleError, "makeUserVisibleError");
    exports2.makeUserVisibleError = makeUserVisibleError;
    function check(condition, msg) {
      if (!condition) {
        throw makeUserVisibleError(msg);
      }
    }
    __name(check, "check");
    exports2.check = check;
    function isObjectPackFormula(fn) {
      return fn.resultType === api_types_6.Type.object;
    }
    __name(isObjectPackFormula, "isObjectPackFormula");
    exports2.isObjectPackFormula = isObjectPackFormula;
    function isStringPackFormula(fn) {
      return fn.resultType === api_types_6.Type.string;
    }
    __name(isStringPackFormula, "isStringPackFormula");
    exports2.isStringPackFormula = isStringPackFormula;
    function isSyncPackFormula(fn) {
      return Boolean(fn.isSyncFormula);
    }
    __name(isSyncPackFormula, "isSyncPackFormula");
    exports2.isSyncPackFormula = isSyncPackFormula;
    var UpdateOutcome;
    (function(UpdateOutcome2) {
      UpdateOutcome2["Success"] = "success";
      UpdateOutcome2["Error"] = "error";
    })(UpdateOutcome || (exports2.UpdateOutcome = UpdateOutcome = {}));
    function makeNumericFormula(definition) {
      return Object.assign({}, definition, { resultType: api_types_6.Type.number });
    }
    __name(makeNumericFormula, "makeNumericFormula");
    exports2.makeNumericFormula = makeNumericFormula;
    function makeStringFormula(definition) {
      const { response } = definition;
      return Object.assign({}, definition, {
        resultType: api_types_6.Type.string,
        ...response && { schema: response.schema }
      });
    }
    __name(makeStringFormula, "makeStringFormula");
    exports2.makeStringFormula = makeStringFormula;
    function makeFormula(fullDefinition) {
      let formula;
      switch (fullDefinition.resultType) {
        case schema_2.ValueType.String: {
          const def = {
            ...fullDefinition,
            codaType: "codaType" in fullDefinition ? fullDefinition.codaType : void 0,
            formulaSchema: "schema" in fullDefinition ? fullDefinition.schema : void 0
          };
          const { onError: _, resultType: unused, codaType, formulaSchema, ...rest } = def;
          (0, ensure_1.assertCondition)(codaType !== schema_1.ValueHintType.SelectList, "ValueHintType.SelectList is not supported for formula result types.");
          const stringFormula = {
            ...rest,
            resultType: api_types_6.Type.string,
            schema: formulaSchema || (codaType ? { type: schema_2.ValueType.String, codaType } : void 0)
          };
          formula = stringFormula;
          break;
        }
        case schema_2.ValueType.Number: {
          const def = {
            ...fullDefinition,
            codaType: "codaType" in fullDefinition ? fullDefinition.codaType : void 0,
            formulaSchema: "schema" in fullDefinition ? fullDefinition.schema : void 0
          };
          const { onError: _, resultType: unused, codaType, formulaSchema, ...rest } = def;
          const numericFormula = {
            ...rest,
            resultType: api_types_6.Type.number,
            schema: formulaSchema || (codaType ? { type: schema_2.ValueType.Number, codaType } : void 0)
          };
          formula = numericFormula;
          break;
        }
        case schema_2.ValueType.Boolean: {
          const { onError: _, resultType: unused, ...rest } = fullDefinition;
          const booleanFormula = {
            ...rest,
            resultType: api_types_6.Type.boolean
          };
          formula = booleanFormula;
          break;
        }
        case schema_2.ValueType.Array: {
          const { onError: _, resultType: unused, items, ...rest } = fullDefinition;
          const arrayFormula = {
            ...rest,
            // TypeOf<SchemaType<ArraySchema<SchemaT>>> is always Type.object but TS can't infer this.
            resultType: api_types_6.Type.object,
            // The deepCopy() is here to drop property option functions, which have no effect on non-sync formulas.
            schema: (0, object_utils_1.deepCopy)((0, schema_5.normalizeSchema)({ type: schema_2.ValueType.Array, items }))
          };
          formula = arrayFormula;
          break;
        }
        case schema_2.ValueType.Object: {
          const { onError: _, resultType: unused, schema, ...rest } = fullDefinition;
          const objectFormula = {
            ...rest,
            resultType: api_types_6.Type.object,
            // The deepCopy() is here to drop property option functions, which have no effect on non-sync formulas.
            schema: (0, object_utils_1.deepCopy)((0, schema_5.normalizeSchema)(schema))
          };
          formula = objectFormula;
          break;
        }
        default:
          return (0, ensure_2.ensureUnreachable)(fullDefinition);
      }
      const onError = fullDefinition.onError;
      if (onError) {
        const wrappedExecute = formula.execute;
        formula.execute = async function(params, context) {
          try {
            return await wrappedExecute(params, context);
          } catch (err) {
            return onError(err);
          }
        };
      }
      return maybeRewriteConnectionForFormula(formula, fullDefinition.connectionRequirement);
    }
    __name(makeFormula, "makeFormula");
    exports2.makeFormula = makeFormula;
    function normalizePropertyOptionsResultsArray(results) {
      return results.map((r) => {
        if (typeof r === "object" && Object.keys(r).length === 2 && "display" in r && "value" in r) {
          return { display: r.display, value: r.value };
        }
        return { display: void 0, value: r };
      });
    }
    __name(normalizePropertyOptionsResultsArray, "normalizePropertyOptionsResultsArray");
    function normalizePropertyOptionsResults(results) {
      if (Array.isArray(results)) {
        return {
          results: normalizePropertyOptionsResultsArray(results)
        };
      }
      const { result: resultsArray, ...otherProps } = results;
      return {
        results: normalizePropertyOptionsResultsArray(resultsArray),
        ...otherProps
      };
    }
    __name(normalizePropertyOptionsResults, "normalizePropertyOptionsResults");
    exports2.normalizePropertyOptionsResults = normalizePropertyOptionsResults;
    function makeMetadataFormula(execute, options) {
      return makeObjectFormula({
        name: "getMetadata",
        description: "Gets metadata",
        // Formula context is serialized here because we do not want to pass objects into
        // regular pack functions (which this is)
        execute([search, serializedFormulaContext], context) {
          let formulaContext = {};
          try {
            formulaContext = JSON.parse(serializedFormulaContext || "");
          } catch (err) {
          }
          return execute(context, search, formulaContext);
        },
        parameters: [
          makeParameter2({
            type: api_types_3.ParameterType.String,
            name: "search",
            description: "Metadata to search for.",
            optional: true
          }),
          makeParameter2({
            type: api_types_3.ParameterType.String,
            name: "formulaContext",
            description: "Serialized JSON for metadata.",
            optional: true
          })
        ],
        examples: [],
        connectionRequirement: (options === null || options === void 0 ? void 0 : options.connectionRequirement) || api_types_1.ConnectionRequirement.Optional
      });
    }
    __name(makeMetadataFormula, "makeMetadataFormula");
    exports2.makeMetadataFormula = makeMetadataFormula;
    function makePropertyOptionsFormula({ execute, schema, name }) {
      if (!(execute instanceof Function)) {
        throw new Error(`Value for execute must be a function`);
      }
      const executeRetyped = execute;
      const innerExecute = /* @__PURE__ */ __name(async ([], context) => executeRetyped(context), "innerExecute");
      const formulaDefn = {
        connectionRequirement: api_types_1.ConnectionRequirement.Optional,
        execute: innerExecute,
        name,
        description: `A property options function for ${name}`,
        parameters: [],
        resultType: schema_2.ValueType.Array,
        items: schema
      };
      const formula = makeFormula(formulaDefn);
      return formula;
    }
    __name(makePropertyOptionsFormula, "makePropertyOptionsFormula");
    exports2.makePropertyOptionsFormula = makePropertyOptionsFormula;
    function simpleAutocomplete(search, options) {
      const normalizedSearch = (search || "").toLowerCase();
      const filtered = options.filter((option) => {
        const display = typeof option === "string" || typeof option === "number" ? option : option.display;
        return display.toString().toLowerCase().includes(normalizedSearch);
      });
      const metadataResults = [];
      for (const option of filtered) {
        if (typeof option === "string") {
          metadataResults.push({
            value: option,
            display: option
          });
        } else if (typeof option === "number") {
          metadataResults.push({
            value: option,
            display: option.toString()
          });
        } else {
          metadataResults.push(option);
        }
      }
      return Promise.resolve(metadataResults);
    }
    __name(simpleAutocomplete, "simpleAutocomplete");
    exports2.simpleAutocomplete = simpleAutocomplete;
    async function autocompleteSearchObjects(search, objs, displayKey, valueKey) {
      if (typeof search !== "string") {
        throw new TypeError(`Expecting a string for "search" parameter but received ${search}`);
      }
      const normalizedSearch = search.toLowerCase();
      const metadataResults = [];
      for (const obj of objs) {
        const display = obj[displayKey];
        if (!display.toLowerCase().includes(normalizedSearch)) {
          continue;
        }
        const value = obj[valueKey];
        metadataResults.push({ display, value });
      }
      return metadataResults;
    }
    __name(autocompleteSearchObjects, "autocompleteSearchObjects");
    exports2.autocompleteSearchObjects = autocompleteSearchObjects;
    function makeSimpleAutocompleteMetadataFormula(options) {
      return makeMetadataFormula((_context, search) => simpleAutocomplete(search, options), {
        // A connection won't be used here, but if the parent formula uses a connection
        // the execution code is going to try to pass it here. We should fix that.
        connectionRequirement: api_types_1.ConnectionRequirement.Optional
      });
    }
    __name(makeSimpleAutocompleteMetadataFormula, "makeSimpleAutocompleteMetadataFormula");
    exports2.makeSimpleAutocompleteMetadataFormula = makeSimpleAutocompleteMetadataFormula;
    function isResponseHandlerTemplate(obj) {
      return obj && obj.schema;
    }
    __name(isResponseHandlerTemplate, "isResponseHandlerTemplate");
    function isResponseExampleTemplate(obj) {
      return obj && obj.example;
    }
    __name(isResponseExampleTemplate, "isResponseExampleTemplate");
    function makeObjectFormula({ response, ...definition }) {
      let schema;
      if (response) {
        if (isResponseHandlerTemplate(response) && response.schema) {
          const inputSchema = (0, object_utils_1.deepCopy)(response.schema);
          response.schema = (0, schema_5.normalizeSchema)(inputSchema);
          schema = response.schema;
        } else if (isResponseExampleTemplate(response)) {
        }
      }
      let execute = definition.execute;
      if (isResponseHandlerTemplate(response)) {
        const { onError } = response;
        const wrappedExecute = execute;
        const responseHandler = (0, handler_templates_1.generateObjectResponseHandler)(response);
        execute = /* @__PURE__ */ __name(async function exec(params, context) {
          let result;
          try {
            result = await wrappedExecute(params, context);
          } catch (err) {
            if (onError) {
              result = onError(err);
            } else {
              throw err;
            }
          }
          return responseHandler({ body: result || {}, status: 200, headers: {} });
        }, "exec");
      }
      return Object.assign({}, definition, {
        resultType: api_types_6.Type.object,
        execute,
        schema
      });
    }
    __name(makeObjectFormula, "makeObjectFormula");
    exports2.makeObjectFormula = makeObjectFormula;
    function makeSyncTable({ name, displayName, description, identityName, schema: inputSchema, formula, connectionRequirement, dynamicOptions = {}, role }) {
      const { getSchema: getSchemaDef, entityName, defaultAddDynamicColumns } = dynamicOptions;
      const { execute: wrappedExecute, executeUpdate: wrappedExecuteUpdate, executeGetPermissions, onError, ...definition } = maybeRewriteConnectionForFormula(formula, connectionRequirement);
      const schemaDef = (0, object_utils_1.deepCopy)(inputSchema);
      if (!identityName) {
        throw new Error(`Sync table schemas must set an identityName`);
      }
      if (schemaDef.identity) {
        if (schemaDef.identity.name && schemaDef.identity.name !== identityName) {
          throw new Error(`Identity name mismatch for sync table ${name}. Either remove the schema's identity.name (${schemaDef.identity.name}) or ensure it matches the table's identityName (${identityName}).`);
        }
        schemaDef.identity = { ...schemaDef.identity, name: identityName };
      } else {
        schemaDef.identity = { name: identityName };
      }
      if (role === api_types_5.TableRole.Users) {
        if (!schemaDef.userEmailProperty) {
          throw new Error(`Sync table schemas with role ${api_types_5.TableRole.Users} must set a userEmailProperty`);
        }
        if (!schemaDef.userIdProperty) {
          throw new Error(`Sync table schemas with role ${api_types_5.TableRole.Users} must set a userIdProperty`);
        }
      }
      if (role === api_types_5.TableRole.GroupMembers) {
        if (!schemaDef.groupIdProperty) {
          throw new Error(`Sync table schemas with role ${api_types_5.TableRole.GroupMembers} must set a groupIdProperty`);
        }
        if (!schemaDef.userIdProperty && !schemaDef.memberGroupIdProperty) {
          throw new Error(`Sync table schemas with role ${api_types_5.TableRole.GroupMembers} must set a userIdProperty or memberGroupIdProperty`);
        }
      }
      const getSchema = wrapGetSchema(wrapMetadataFunction(getSchemaDef));
      const schema = (0, schema_3.makeObjectSchema)(schemaDef);
      let namedPropertyOptions = moveJsPropertyOptionsFunctionsToFormulas({
        inputSchema,
        schema,
        identityName
      });
      if (dynamicOptions.propertyOptions) {
        namedPropertyOptions !== null && namedPropertyOptions !== void 0 ? namedPropertyOptions : namedPropertyOptions = {};
        namedPropertyOptions[api_types_2.OptionsType.Dynamic] = makePropertyOptionsFormula({
          execute: dynamicOptions.propertyOptions,
          schema: (0, schema_3.makeObjectSchema)({
            // A dynamic autocomplete formula can return different result types depending
            // on which property is being autocompleted, so there's no accurate schema
            // type to set on the formula. We just use an empty object schema, but it could
            // be anything.
            properties: {}
          }),
          name: `${identityName}.DynamicPropertyOptions`
        });
      }
      const normalizedSchema = (0, schema_5.normalizeSchema)(schema);
      const formulaSchema = getSchema ? void 0 : { type: schema_2.ValueType.Array, items: normalizedSchema };
      const { identity, id, primary } = (0, migration_1.objectSchemaHelper)(schema);
      if (!(primary && id)) {
        throw new Error(`Sync table schemas should have defined properties for idProperty and displayProperty`);
      }
      if (!identity) {
        throw new Error(`Unknown error creating sync table identity`);
      }
      if (name.includes(" ")) {
        throw new Error("Sync table name should not include spaces");
      }
      const responseHandler = (0, handler_templates_1.generateObjectResponseHandler)({ schema: formulaSchema });
      const execute = /* @__PURE__ */ __name(async function exec(params, context) {
        let syncResult;
        try {
          syncResult = await wrappedExecute(params, context) || {};
        } catch (err) {
          onError === null || onError === void 0 ? void 0 : onError(err);
          throw err;
        }
        const appliedSchema = context.sync.schema;
        const result = responseHandler({ body: syncResult.result || [], status: 200, headers: {} }, appliedSchema);
        const { continuation, completion, deletedItemIds, deletedRowIds, permissionsContext } = syncResult;
        const returnValue = {
          result
        };
        if (continuation) {
          returnValue.continuation = continuation;
        }
        if (completion) {
          returnValue.completion = completion;
        }
        if (deletedRowIds !== null && deletedRowIds !== void 0 ? deletedRowIds : deletedItemIds) {
          returnValue.deletedRowIds = deletedRowIds !== null && deletedRowIds !== void 0 ? deletedRowIds : deletedItemIds;
          returnValue.deletedItemIds = returnValue.deletedRowIds;
        }
        if (permissionsContext) {
          returnValue.permissionsContext = permissionsContext;
        }
        return returnValue;
      }, "exec");
      const executeUpdate = wrappedExecuteUpdate ? /* @__PURE__ */ __name(async function execUpdate(params, updates, context) {
        const { result } = await wrappedExecuteUpdate(params, updates, context) || {};
        const appliedSchema = context.sync.schema;
        return {
          result: responseHandler({ body: result || [], status: 200, headers: {} }, appliedSchema)
        };
      }, "execUpdate") : void 0;
      return {
        name,
        displayName,
        description,
        schema: normalizedSchema,
        identityName,
        getter: {
          ...definition,
          cacheTtlSecs: 0,
          execute,
          executeUpdate,
          schema: formulaSchema,
          isSyncFormula: true,
          supportsUpdates: Boolean(executeUpdate),
          supportsGetPermissions: Boolean(executeGetPermissions),
          connectionRequirement: definition.connectionRequirement || connectionRequirement,
          resultType: api_types_6.Type.object,
          executeGetPermissions
        },
        getSchema: maybeRewriteConnectionForFormula(getSchema, connectionRequirement),
        entityName,
        defaultAddDynamicColumns,
        namedPropertyOptions: maybeRewriteConnectionForNamedPropertyOptions(namedPropertyOptions, connectionRequirement),
        role
      };
    }
    __name(makeSyncTable, "makeSyncTable");
    exports2.makeSyncTable = makeSyncTable;
    function makeSyncTableLegacy(name, schema, formula, connectionRequirement, dynamicOptions = {}, displayName) {
      var _a;
      if (!((_a = schema.identity) === null || _a === void 0 ? void 0 : _a.name)) {
        throw new Error("Legacy sync tables must specify identity.name");
      }
      if (schema.__packId) {
        throw new Error("Do not use the __packId field, it is only for internal Coda use.");
      }
      return makeSyncTable({
        name,
        displayName,
        identityName: schema.identity.name,
        schema,
        formula,
        connectionRequirement,
        dynamicOptions
      });
    }
    __name(makeSyncTableLegacy, "makeSyncTableLegacy");
    exports2.makeSyncTableLegacy = makeSyncTableLegacy;
    function makeDynamicSyncTable({ name, displayName, description, getName: getNameDef, getSchema: getSchemaDef, identityName, getDisplayUrl: getDisplayUrlDef, formula, listDynamicUrls: listDynamicUrlsDef, searchDynamicUrls: searchDynamicUrlsDef, entityName, connectionRequirement, defaultAddDynamicColumns, placeholderSchema: placeholderSchemaInput, propertyOptions }) {
      const placeholderSchema = placeholderSchemaInput || // default placeholder only shows a column of id, which will be replaced later by the dynamic schema.
      (0, schema_3.makeObjectSchema)({
        type: schema_2.ValueType.Object,
        idProperty: "id",
        displayProperty: "id",
        identity: { name: identityName },
        properties: {
          id: { type: schema_2.ValueType.String }
        }
      });
      const getName = wrapMetadataFunction(getNameDef);
      const getSchema = wrapMetadataFunction(getSchemaDef);
      const getDisplayUrl = wrapMetadataFunction(getDisplayUrlDef);
      const listDynamicUrls = wrapMetadataFunction(listDynamicUrlsDef);
      const searchDynamicUrls = wrapMetadataFunction(searchDynamicUrlsDef);
      const table = makeSyncTable({
        name,
        displayName,
        description,
        identityName,
        schema: placeholderSchema,
        formula,
        connectionRequirement,
        dynamicOptions: { getSchema, entityName, defaultAddDynamicColumns, propertyOptions }
      });
      return {
        ...table,
        isDynamic: true,
        getDisplayUrl: maybeRewriteConnectionForFormula(getDisplayUrl, connectionRequirement),
        listDynamicUrls: maybeRewriteConnectionForFormula(listDynamicUrls, connectionRequirement),
        searchDynamicUrls: maybeRewriteConnectionForFormula(searchDynamicUrls, connectionRequirement),
        getName: maybeRewriteConnectionForFormula(getName, connectionRequirement)
      };
    }
    __name(makeDynamicSyncTable, "makeDynamicSyncTable");
    exports2.makeDynamicSyncTable = makeDynamicSyncTable;
    function makeTranslateObjectFormula({ response, ...definition }) {
      const { request, ...rest } = definition;
      const { parameters } = rest;
      response.schema = response.schema ? (0, schema_5.normalizeSchema)(response.schema) : void 0;
      const { onError } = response;
      const requestHandler = (0, handler_templates_2.generateRequestHandler)(request, parameters);
      const responseHandler = (0, handler_templates_1.generateObjectResponseHandler)(response);
      function execute(params, context) {
        return context.fetcher.fetch(requestHandler(params)).catch((err) => {
          onError === null || onError === void 0 ? void 0 : onError(err);
          throw err;
        }).then(responseHandler);
      }
      __name(execute, "execute");
      return Object.assign({}, rest, {
        execute,
        resultType: api_types_6.Type.object,
        schema: response.schema
      });
    }
    __name(makeTranslateObjectFormula, "makeTranslateObjectFormula");
    exports2.makeTranslateObjectFormula = makeTranslateObjectFormula;
    function makeEmptyFormula(definition) {
      const { request, ...rest } = definition;
      const { parameters } = rest;
      const requestHandler = (0, handler_templates_2.generateRequestHandler)(request, parameters);
      function execute(params, context) {
        return context.fetcher.fetch(requestHandler(params)).then(() => "");
      }
      __name(execute, "execute");
      return Object.assign({}, rest, {
        execute,
        resultType: api_types_6.Type.string
      });
    }
    __name(makeEmptyFormula, "makeEmptyFormula");
    exports2.makeEmptyFormula = makeEmptyFormula;
    function maybeRewriteConnectionForNamedPropertyOptions(namedPropertyOptions, connectionRequirement) {
      if (!namedPropertyOptions) {
        return namedPropertyOptions;
      }
      const result = {};
      for (const name of Object.keys(namedPropertyOptions)) {
        result[name] = maybeRewriteConnectionForFormula(namedPropertyOptions[name], connectionRequirement);
      }
      return result;
    }
    __name(maybeRewriteConnectionForNamedPropertyOptions, "maybeRewriteConnectionForNamedPropertyOptions");
    exports2.maybeRewriteConnectionForNamedPropertyOptions = maybeRewriteConnectionForNamedPropertyOptions;
    function maybeRewriteConnectionForFormula(formula, connectionRequirement) {
      var _a;
      if (formula && connectionRequirement) {
        return {
          ...formula,
          parameters: formula.parameters.map((param) => {
            return {
              ...param,
              autocomplete: param.autocomplete ? maybeRewriteConnectionForFormula(param.autocomplete, connectionRequirement) : void 0
            };
          }),
          varargParameters: (_a = formula.varargParameters) === null || _a === void 0 ? void 0 : _a.map((param) => {
            return {
              ...param,
              autocomplete: param.autocomplete ? maybeRewriteConnectionForFormula(param.autocomplete, connectionRequirement) : void 0
            };
          }),
          connectionRequirement
        };
      }
      return formula;
    }
    __name(maybeRewriteConnectionForFormula, "maybeRewriteConnectionForFormula");
    exports2.maybeRewriteConnectionForFormula = maybeRewriteConnectionForFormula;
    function listPropertiesWithOptionsFunctions(schema) {
      const result = [];
      for (const propertyName of Object.keys(schema.properties)) {
        const propertySchema = (0, schema_4.maybeUnwrapArraySchema)(schema.properties[propertyName]);
        if (!propertySchema || !("options" in propertySchema)) {
          continue;
        }
        const { options } = propertySchema;
        if (!options) {
          continue;
        }
        if (typeof options !== "function") {
          continue;
        }
        result.push(propertyName);
      }
      return result;
    }
    __name(listPropertiesWithOptionsFunctions, "listPropertiesWithOptionsFunctions");
    function moveJsPropertyOptionsFunctionsToFormulas({
      inputSchema,
      // DO NOT MUTATE inputSchema!
      schema,
      identityName
    }) {
      const namedPropertyOptions = {};
      const propertiesWithOptionsFunctions = listPropertiesWithOptionsFunctions(inputSchema);
      if (!propertiesWithOptionsFunctions.length) {
        return void 0;
      }
      for (const propertyName of propertiesWithOptionsFunctions) {
        const inputSchemaWithoutArray = (0, schema_4.maybeUnwrapArraySchema)(inputSchema.properties[propertyName]);
        const outputSchema = (0, schema_4.maybeUnwrapArraySchema)(schema.properties[propertyName]);
        (0, ensure_1.assertCondition)((0, schema_7.unwrappedSchemaSupportsOptions)(inputSchemaWithoutArray), `Property "${propertyName}" must have codaType of ValueHintType.SelectList or ValueHintType.Reference to configure property options`);
        (0, ensure_1.assertCondition)((0, schema_7.unwrappedSchemaSupportsOptions)(outputSchema), `Property "${propertyName}" lost codaType on deep copy?...`);
        outputSchema.options = propertyName;
        namedPropertyOptions[propertyName] = makePropertyOptionsFormula({
          execute: inputSchemaWithoutArray.options,
          schema: schema.properties[propertyName],
          name: `${identityName}.${propertyName}.Options`
        });
      }
      return namedPropertyOptions;
    }
    __name(moveJsPropertyOptionsFunctionsToFormulas, "moveJsPropertyOptionsFunctionsToFormulas");
  }
});

// ../node_modules/@codahq/packs-sdk/dist/builder.js
var require_builder = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/builder.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PackDefinitionBuilder = exports2.newPack = void 0;
    var types_1 = require_types();
    var api_types_1 = require_api_types();
    var api_1 = require_api();
    var api_2 = require_api();
    var api_3 = require_api();
    var api_4 = require_api();
    var api_5 = require_api();
    var api_6 = require_api();
    var migration_1 = require_migration();
    var api_7 = require_api();
    function newPack2(definition) {
      return new PackDefinitionBuilder(definition);
    }
    __name(newPack2, "newPack");
    exports2.newPack = newPack2;
    var _PackDefinitionBuilder = class _PackDefinitionBuilder {
      /**
       * Constructs a {@link PackDefinitionBuilder}. However, `coda.newPack()` should be used instead
       * rather than constructing a builder directly.
       */
      constructor(definition) {
        const { formulas, formats, syncTables, networkDomains, defaultAuthentication, systemConnectionAuthentication, version, formulaNamespace } = definition || {};
        this.formulas = formulas || [];
        this.formats = formats || [];
        this.syncTables = syncTables || [];
        this.networkDomains = networkDomains || [];
        this.defaultAuthentication = defaultAuthentication;
        this.systemConnectionAuthentication = systemConnectionAuthentication;
        this.version = version;
        this.formulaNamespace = formulaNamespace || "Deprecated";
      }
      /**
       * Adds a formula definition to this pack.
       *
       * In the web editor, the `/Formula` shortcut will insert a snippet of a skeleton formula.
       *
       * @example
       * ```
       * pack.addFormula({
       *   resultType: ValueType.String,
       *    name: 'MyFormula',
       *    description: 'My description.',
       *    parameters: [
       *      makeParameter({
       *        type: ParameterType.String,
       *        name: 'myParam',
       *        description: 'My param description.',
       *      }),
       *    ],
       *    execute: async ([param]) => {
       *      return `Hello ${param}`;
       *    },
       * });
       * ```
       */
      addFormula(definition) {
        const formula = (0, api_3.makeFormula)({
          ...definition,
          connectionRequirement: definition.connectionRequirement || this._defaultConnectionRequirement
        });
        this.formulas.push(formula);
        return this;
      }
      /**
       * Adds a sync table definition to this pack.
       *
       * In the web editor, the `/SyncTable` shortcut will insert a snippet of a skeleton sync table.
       *
       * @example
       * ```
       * pack.addSyncTable({
       *   name: 'MySyncTable',
       *   identityName: 'EntityName',
       *   schema: coda.makeObjectSchema({
       *     ...
       *   }),
       *   formula: {
       *     ...
       *   },
       * });
       * ```
       */
      addSyncTable(definition) {
        const connectionRequirementToUse = definition.connectionRequirement || this._defaultConnectionRequirement;
        const syncTable = (0, api_4.makeSyncTable)({
          ...definition,
          connectionRequirement: connectionRequirementToUse
        });
        this.syncTables.push(syncTable);
        return this;
      }
      /**
       * Adds a dynamic sync table definition to this pack.
       *
       * In the web editor, the `/DynamicSyncTable` shortcut will insert a snippet of a skeleton sync table.
       *
       * @example
       * ```
       * pack.addDynamicSyncTable({
       *   name: "MySyncTable",
       *   getName: async funciton (context) => {
       *     const response = await context.fetcher.fetch({method: "GET", url: context.sync.dynamicUrl});
       *     return response.body.name;
       *   },
       *   getName: async function (context) => {
       *     const response = await context.fetcher.fetch({method: "GET", url: context.sync.dynamicUrl});
       *     return response.body.browserLink;
       *   },
       *   ...
       * });
       * ```
       */
      addDynamicSyncTable(definition) {
        const dynamicSyncTable = (0, api_2.makeDynamicSyncTable)({
          ...definition,
          connectionRequirement: definition.connectionRequirement || this._defaultConnectionRequirement
        });
        this.syncTables.push(dynamicSyncTable);
        return this;
      }
      /**
       * Adds a column format definition to this pack.
       *
       * In the web editor, the `/ColumnFormat` shortcut will insert a snippet of a skeleton format.
       *
       * @example
       * ```
       * pack.addColumnFormat({
       *   name: 'MyColumn',
       *   formulaName: 'MyFormula',
       * });
       * ```
       */
      addColumnFormat(format) {
        this.formats.push(format);
        return this;
      }
      _wrapAuthenticationFunctions(authentication) {
        const { getConnectionName: getConnectionNameDef, getConnectionUserId: getConnectionUserIdDef, postSetup: postSetupDef, ...rest } = authentication;
        const getConnectionName = (0, api_7.wrapMetadataFunction)(getConnectionNameDef);
        const getConnectionUserId = (0, api_7.wrapMetadataFunction)(getConnectionUserIdDef);
        const postSetup = postSetupDef === null || postSetupDef === void 0 ? void 0 : postSetupDef.map((step) => {
          const getOptions = (0, api_7.wrapMetadataFunction)((0, migration_1.setEndpointDefHelper)(step).getOptions);
          const getOptionsFormula = (0, api_7.wrapMetadataFunction)(step.getOptionsFormula);
          return { ...step, getOptions, getOptionsFormula };
        });
        return { ...rest, getConnectionName, getConnectionUserId, postSetup };
      }
      /**
       * Sets this pack to use authentication for individual users, using the
       * authentication method is the given definition.
       *
       * Each user will need to register an account in order to use this pack.
       *
       * In the web editor, the `/UserAuthentication` shortcut will insert a snippet of a skeleton
       * authentication definition.
       *
       * By default, this will set a default connection (account) requirement, making a user account
       * required to invoke all formulas in this pack unless you specify differently on a particular
       * formula. To change the default, you can pass a `defaultConnectionRequirement` option into
       * this method.
       *
       * @example
       * ```
       * pack.setUserAuthentication({
       *   type: AuthenticationType.HeaderBearerToken,
       * });
       * ```
       */
      setUserAuthentication(authDef) {
        const { defaultConnectionRequirement = api_types_1.ConnectionRequirement.Required, ...authentication } = authDef;
        if (authentication.type === types_1.AuthenticationType.None || authentication.type === types_1.AuthenticationType.Various) {
          this.defaultAuthentication = authentication;
        } else {
          this.defaultAuthentication = this._wrapAuthenticationFunctions(authentication);
        }
        if (authentication.type !== types_1.AuthenticationType.None) {
          this._setDefaultConnectionRequirement(defaultConnectionRequirement);
        }
        return this;
      }
      /**
       * Sets this pack to use authentication provided by you as the maker of this pack.
       *
       * You will need to register credentials to use with this pack. When users use the
       * pack, their requests will be authenticated with those system credentials, they need
       * not register their own account.
       *
       * In the web editor, the `/SystemAuthentication` shortcut will insert a snippet of a skeleton
       * authentication definition.
       *
       * @example
       * ```
       * pack.setSystemAuthentication({
       *   type: AuthenticationType.HeaderBearerToken,
       * });
       * ```
       */
      setSystemAuthentication(systemAuthentication) {
        this.systemConnectionAuthentication = this._wrapAuthenticationFunctions(systemAuthentication);
        return this;
      }
      /**
       * TODO(patrick): Unhide this
       * @hidden
       */
      addAdminAuthentication(adminAuth) {
        if (!this.adminAuthentications) {
          this.adminAuthentications = [];
        }
        this.adminAuthentications.push({
          ...adminAuth,
          authentication: this._wrapAuthenticationFunctions(adminAuth.authentication)
        });
        return this;
      }
      /**
       * Adds the domain that this pack makes HTTP requests to.
       * For example, if your pack makes HTTP requests to "api.example.com",
       * use "example.com" as your network domain.
       *
       * If your pack make HTTP requests, it must declare a network domain,
       * for security purposes. Coda enforces that your pack cannot make requests to
       * any undeclared domains.
       *
       * You are allowed one network domain per pack by default. If your pack needs
       * to connect to multiple domains, contact Coda Support for approval.
       *
       * @example
       * ```
       * pack.addNetworkDomain('example.com');
       * ```
       */
      addNetworkDomain(...domain) {
        this.networkDomains.push(...domain);
        return this;
      }
      /**
       * Sets the semantic version of this pack version, e.g. `'1.2.3'`.
       *
       * This is optional, and you only need to provide a version if you are manually doing
       * semantic versioning, or using the CLI. If using the web editor, you can omit this
       * and the web editor will automatically provide an appropriate semantic version
       * each time you build a version.
       *
       * @example
       * ```
       * pack.setVersion('1.2.3');
       * ```
       */
      setVersion(version) {
        this.version = version;
        return this;
      }
      _setDefaultConnectionRequirement(connectionRequirement) {
        this._defaultConnectionRequirement = connectionRequirement;
        this.formulas = this.formulas.map((formula) => {
          return formula.connectionRequirement ? formula : (0, api_5.maybeRewriteConnectionForFormula)(formula, connectionRequirement);
        });
        this.syncTables = this.syncTables.map((syncTable) => {
          if (syncTable.getter.connectionRequirement) {
            return syncTable;
          } else if ((0, api_1.isDynamicSyncTable)(syncTable)) {
            return {
              ...syncTable,
              getter: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getter, connectionRequirement),
              // These 4 are metadata formulas, so they use ConnectionRequirement.Required
              // by default if you don't specify a connection requirement (a legacy behavior
              // that is confusing and perhaps undesirable now that we have better builders).
              // We don't know if the maker set Required explicitly or if was just the default,
              // so we don't know if we should overwrite the connection requirement. For lack
              // of a better option, we'll override it here regardless. This ensure that these
              // dynamic sync table metadata formulas have the same connetion requirement as the
              // sync table itself, which seems desirable basically 100% of the time and should
              // always work, but it does give rise to confusing behavior that calling
              // setDefaultConnectionRequirement() can wipe away an explicit connection
              // requirement override set on one of these 4 metadata formulas.
              getName: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getName, connectionRequirement),
              getDisplayUrl: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getDisplayUrl, connectionRequirement),
              getSchema: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getSchema, connectionRequirement),
              listDynamicUrls: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.listDynamicUrls, connectionRequirement),
              searchDynamicUrls: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.searchDynamicUrls, connectionRequirement),
              namedPropertyOptions: (0, api_6.maybeRewriteConnectionForNamedPropertyOptions)(syncTable.namedPropertyOptions, connectionRequirement)
            };
          } else {
            return {
              ...syncTable,
              getter: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getter, connectionRequirement),
              getSchema: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getSchema, connectionRequirement),
              namedPropertyOptions: (0, api_6.maybeRewriteConnectionForNamedPropertyOptions)(syncTable.namedPropertyOptions, connectionRequirement)
            };
          }
        });
        return this;
      }
    };
    __name(_PackDefinitionBuilder, "PackDefinitionBuilder");
    var PackDefinitionBuilder = _PackDefinitionBuilder;
    exports2.PackDefinitionBuilder = PackDefinitionBuilder;
  }
});

// ../node_modules/@codahq/packs-sdk/dist/helpers/schema.js
var require_schema2 = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/helpers/schema.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getEffectivePropertyKeysFromSchema = void 0;
    var schema_1 = require_schema();
    function getEffectivePropertyKeysFromSchema(schema) {
      if (schema.type === schema_1.ValueType.Array) {
        schema = schema.items;
      }
      if (schema.type !== schema_1.ValueType.Object) {
        return;
      }
      return [...new Set(Object.entries(schema.properties).map(([key, property]) => property.fromKey || key))];
    }
    __name(getEffectivePropertyKeysFromSchema, "getEffectivePropertyKeysFromSchema");
    exports2.getEffectivePropertyKeysFromSchema = getEffectivePropertyKeysFromSchema;
  }
});

// ../node_modules/@codahq/packs-sdk/dist/helpers/svg.js
var require_svg = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/helpers/svg.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SvgConstants = void 0;
    var SvgConstants;
    (function(SvgConstants2) {
      SvgConstants2.DarkModeFragmentId = "DarkMode";
      SvgConstants2.DataUrlPrefix = "data:image/svg+xml;base64,";
      SvgConstants2.DataUrlPrefixWithDarkModeSupport = "data:image/svg+xml;supportsDarkMode=1;base64,";
    })(SvgConstants || (exports2.SvgConstants = SvgConstants = {}));
  }
});

// ../node_modules/@codahq/packs-sdk/dist/index.js
var require_dist = __commonJS({
  "../node_modules/@codahq/packs-sdk/dist/index.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.makeObjectSchema = exports2.makeAttributionNode = exports2.generateSchema = exports2.ValueType = exports2.ValueHintType = exports2.ScaleIconSet = exports2.PropertyLabelValueTemplate = exports2.LinkDisplayType = exports2.IndexingStrategy = exports2.ImageOutline = exports2.ImageShapeStyle = exports2.ImageCornerStyle = exports2.EmailDisplayType = exports2.DurationUnit = exports2.CurrencyFormat = exports2.AttributionNodeType = exports2.ensureUnreachable = exports2.ensureNonEmptyString = exports2.ensureExists = exports2.assertCondition = exports2.SvgConstants = exports2.getEffectivePropertyKeysFromSchema = exports2.withQueryParams = exports2.joinUrl = exports2.getQueryParams = exports2.simpleAutocomplete = exports2.makeSimpleAutocompleteMetadataFormula = exports2.autocompleteSearchObjects = exports2.makeParameter = exports2.makeTranslateObjectFormula = exports2.makeSyncTable = exports2.makeFormula = exports2.makeEmptyFormula = exports2.makeDynamicSyncTable = exports2.makePropertyOptionsFormula = exports2.makeMetadataFormula = exports2.UserVisibleError = exports2.Type = exports2.MissingScopesError = exports2.StatusCodeError = exports2.PrecannedDateRange = exports2.ParameterType = exports2.NetworkConnection = exports2.UpdateOutcome = exports2.ConnectionRequirement = exports2.OptionsType = exports2.PackDefinitionBuilder = exports2.newPack = exports2.PostSetupType = exports2.AuthenticationType = void 0;
    exports2.TokenExchangeCredentialsLocation = exports2.ValidFetchMethods = exports2.withIdentity = exports2.makeSchema = exports2.makeReferenceSchemaFromObjectSchema = void 0;
    var types_1 = require_types();
    Object.defineProperty(exports2, "AuthenticationType", { enumerable: true, get: function() {
      return types_1.AuthenticationType;
    } });
    var types_2 = require_types();
    Object.defineProperty(exports2, "PostSetupType", { enumerable: true, get: function() {
      return types_2.PostSetupType;
    } });
    var builder_1 = require_builder();
    Object.defineProperty(exports2, "newPack", { enumerable: true, get: function() {
      return builder_1.newPack;
    } });
    var builder_2 = require_builder();
    Object.defineProperty(exports2, "PackDefinitionBuilder", { enumerable: true, get: function() {
      return builder_2.PackDefinitionBuilder;
    } });
    var api_types_1 = require_api_types();
    Object.defineProperty(exports2, "OptionsType", { enumerable: true, get: function() {
      return api_types_1.OptionsType;
    } });
    var api_types_2 = require_api_types();
    Object.defineProperty(exports2, "ConnectionRequirement", { enumerable: true, get: function() {
      return api_types_2.ConnectionRequirement;
    } });
    var api_1 = require_api();
    Object.defineProperty(exports2, "UpdateOutcome", { enumerable: true, get: function() {
      return api_1.UpdateOutcome;
    } });
    var api_types_3 = require_api_types();
    Object.defineProperty(exports2, "NetworkConnection", { enumerable: true, get: function() {
      return api_types_3.NetworkConnection;
    } });
    var api_types_4 = require_api_types();
    Object.defineProperty(exports2, "ParameterType", { enumerable: true, get: function() {
      return api_types_4.ParameterType;
    } });
    var api_types_5 = require_api_types();
    Object.defineProperty(exports2, "PrecannedDateRange", { enumerable: true, get: function() {
      return api_types_5.PrecannedDateRange;
    } });
    var api_2 = require_api();
    Object.defineProperty(exports2, "StatusCodeError", { enumerable: true, get: function() {
      return api_2.StatusCodeError;
    } });
    var api_3 = require_api();
    Object.defineProperty(exports2, "MissingScopesError", { enumerable: true, get: function() {
      return api_3.MissingScopesError;
    } });
    var api_types_6 = require_api_types();
    Object.defineProperty(exports2, "Type", { enumerable: true, get: function() {
      return api_types_6.Type;
    } });
    var api_4 = require_api();
    Object.defineProperty(exports2, "UserVisibleError", { enumerable: true, get: function() {
      return api_4.UserVisibleError;
    } });
    var api_5 = require_api();
    Object.defineProperty(exports2, "makeMetadataFormula", { enumerable: true, get: function() {
      return api_5.makeMetadataFormula;
    } });
    var api_6 = require_api();
    Object.defineProperty(exports2, "makePropertyOptionsFormula", { enumerable: true, get: function() {
      return api_6.makePropertyOptionsFormula;
    } });
    var api_7 = require_api();
    Object.defineProperty(exports2, "makeDynamicSyncTable", { enumerable: true, get: function() {
      return api_7.makeDynamicSyncTable;
    } });
    var api_8 = require_api();
    Object.defineProperty(exports2, "makeEmptyFormula", { enumerable: true, get: function() {
      return api_8.makeEmptyFormula;
    } });
    var api_9 = require_api();
    Object.defineProperty(exports2, "makeFormula", { enumerable: true, get: function() {
      return api_9.makeFormula;
    } });
    var api_10 = require_api();
    Object.defineProperty(exports2, "makeSyncTable", { enumerable: true, get: function() {
      return api_10.makeSyncTable;
    } });
    var api_11 = require_api();
    Object.defineProperty(exports2, "makeTranslateObjectFormula", { enumerable: true, get: function() {
      return api_11.makeTranslateObjectFormula;
    } });
    var api_12 = require_api();
    Object.defineProperty(exports2, "makeParameter", { enumerable: true, get: function() {
      return api_12.makeParameter;
    } });
    var api_13 = require_api();
    Object.defineProperty(exports2, "autocompleteSearchObjects", { enumerable: true, get: function() {
      return api_13.autocompleteSearchObjects;
    } });
    var api_14 = require_api();
    Object.defineProperty(exports2, "makeSimpleAutocompleteMetadataFormula", { enumerable: true, get: function() {
      return api_14.makeSimpleAutocompleteMetadataFormula;
    } });
    var api_15 = require_api();
    Object.defineProperty(exports2, "simpleAutocomplete", { enumerable: true, get: function() {
      return api_15.simpleAutocomplete;
    } });
    var url_1 = require_url();
    Object.defineProperty(exports2, "getQueryParams", { enumerable: true, get: function() {
      return url_1.getQueryParams;
    } });
    var url_2 = require_url();
    Object.defineProperty(exports2, "joinUrl", { enumerable: true, get: function() {
      return url_2.join;
    } });
    var url_3 = require_url();
    Object.defineProperty(exports2, "withQueryParams", { enumerable: true, get: function() {
      return url_3.withQueryParams;
    } });
    var schema_1 = require_schema2();
    Object.defineProperty(exports2, "getEffectivePropertyKeysFromSchema", { enumerable: true, get: function() {
      return schema_1.getEffectivePropertyKeysFromSchema;
    } });
    var svg_1 = require_svg();
    Object.defineProperty(exports2, "SvgConstants", { enumerable: true, get: function() {
      return svg_1.SvgConstants;
    } });
    var ensure_1 = require_ensure();
    Object.defineProperty(exports2, "assertCondition", { enumerable: true, get: function() {
      return ensure_1.assertCondition;
    } });
    var ensure_2 = require_ensure();
    Object.defineProperty(exports2, "ensureExists", { enumerable: true, get: function() {
      return ensure_2.ensureExists;
    } });
    var ensure_3 = require_ensure();
    Object.defineProperty(exports2, "ensureNonEmptyString", { enumerable: true, get: function() {
      return ensure_3.ensureNonEmptyString;
    } });
    var ensure_4 = require_ensure();
    Object.defineProperty(exports2, "ensureUnreachable", { enumerable: true, get: function() {
      return ensure_4.ensureUnreachable;
    } });
    var schema_2 = require_schema();
    Object.defineProperty(exports2, "AttributionNodeType", { enumerable: true, get: function() {
      return schema_2.AttributionNodeType;
    } });
    var schema_3 = require_schema();
    Object.defineProperty(exports2, "CurrencyFormat", { enumerable: true, get: function() {
      return schema_3.CurrencyFormat;
    } });
    var schema_4 = require_schema();
    Object.defineProperty(exports2, "DurationUnit", { enumerable: true, get: function() {
      return schema_4.DurationUnit;
    } });
    var schema_5 = require_schema();
    Object.defineProperty(exports2, "EmailDisplayType", { enumerable: true, get: function() {
      return schema_5.EmailDisplayType;
    } });
    var schema_6 = require_schema();
    Object.defineProperty(exports2, "ImageCornerStyle", { enumerable: true, get: function() {
      return schema_6.ImageCornerStyle;
    } });
    var schema_7 = require_schema();
    Object.defineProperty(exports2, "ImageShapeStyle", { enumerable: true, get: function() {
      return schema_7.ImageShapeStyle;
    } });
    var schema_8 = require_schema();
    Object.defineProperty(exports2, "ImageOutline", { enumerable: true, get: function() {
      return schema_8.ImageOutline;
    } });
    var schema_9 = require_schema();
    Object.defineProperty(exports2, "IndexingStrategy", { enumerable: true, get: function() {
      return schema_9.IndexingStrategy;
    } });
    var schema_10 = require_schema();
    Object.defineProperty(exports2, "LinkDisplayType", { enumerable: true, get: function() {
      return schema_10.LinkDisplayType;
    } });
    var schema_11 = require_schema();
    Object.defineProperty(exports2, "PropertyLabelValueTemplate", { enumerable: true, get: function() {
      return schema_11.PropertyLabelValueTemplate;
    } });
    var schema_12 = require_schema();
    Object.defineProperty(exports2, "ScaleIconSet", { enumerable: true, get: function() {
      return schema_12.ScaleIconSet;
    } });
    var schema_13 = require_schema();
    Object.defineProperty(exports2, "ValueHintType", { enumerable: true, get: function() {
      return schema_13.ValueHintType;
    } });
    var schema_14 = require_schema();
    Object.defineProperty(exports2, "ValueType", { enumerable: true, get: function() {
      return schema_14.ValueType;
    } });
    var schema_15 = require_schema();
    Object.defineProperty(exports2, "generateSchema", { enumerable: true, get: function() {
      return schema_15.generateSchema;
    } });
    var schema_16 = require_schema();
    Object.defineProperty(exports2, "makeAttributionNode", { enumerable: true, get: function() {
      return schema_16.makeAttributionNode;
    } });
    var schema_17 = require_schema();
    Object.defineProperty(exports2, "makeObjectSchema", { enumerable: true, get: function() {
      return schema_17.makeObjectSchema;
    } });
    var schema_18 = require_schema();
    Object.defineProperty(exports2, "makeReferenceSchemaFromObjectSchema", { enumerable: true, get: function() {
      return schema_18.makeReferenceSchemaFromObjectSchema;
    } });
    var schema_19 = require_schema();
    Object.defineProperty(exports2, "makeSchema", { enumerable: true, get: function() {
      return schema_19.makeSchema;
    } });
    var schema_20 = require_schema();
    Object.defineProperty(exports2, "withIdentity", { enumerable: true, get: function() {
      return schema_20.withIdentity;
    } });
    var api_types_7 = require_api_types();
    Object.defineProperty(exports2, "ValidFetchMethods", { enumerable: true, get: function() {
      return api_types_7.ValidFetchMethods;
    } });
    var types_3 = require_types();
    Object.defineProperty(exports2, "TokenExchangeCredentialsLocation", { enumerable: true, get: function() {
      return types_3.TokenExchangeCredentialsLocation;
    } });
  }
});

// pack.ts
var pack_exports = {};
__export(pack_exports, {
  pack: () => pack
});
module.exports = __toCommonJS(pack_exports);
init_crypto_shim();
var coda = __toESM(require_dist());
var pack = coda.newPack();
pack.setUserAuthentication({
  type: coda.AuthenticationType.WebBasic,
  instructionsUrl: "https://docs.ngpvan.com/docs/authentication",
  uxConfig: {
    placeholderUsername: "Application Name",
    placeholderPassword: "API Key"
  },
  getConnectionName: async function(context) {
    try {
      const response = await context.fetcher.fetch({
        method: "GET",
        url: "https://api.securevan.com/v4/people/self"
      });
      const user = response.body;
      return user.displayName || user.firstName + " " + user.lastName || "EveryAction User";
    } catch (error) {
      return "EveryAction Connection";
    }
  }
});
pack.addNetworkDomain("api.securevan.com");
var ContactSchema = coda.makeObjectSchema({
  properties: {
    vanId: {
      type: coda.ValueType.Number,
      description: "The unique identifier for the contact in EveryAction"
    },
    firstName: {
      type: coda.ValueType.String,
      description: "Contact's first name"
    },
    middleName: {
      type: coda.ValueType.String,
      description: "Contact's middle name"
    },
    lastName: {
      type: coda.ValueType.String,
      description: "Contact's last name"
    },
    commonName: {
      type: coda.ValueType.String,
      description: "Common name for organizations"
    },
    officialName: {
      type: coda.ValueType.String,
      description: "Official name for organizations"
    },
    email: {
      type: coda.ValueType.String,
      description: "Primary email address"
    },
    phoneNumber: {
      type: coda.ValueType.String,
      description: "Primary phone number"
    },
    streetAddress: {
      type: coda.ValueType.String,
      description: "Street address"
    },
    city: {
      type: coda.ValueType.String,
      description: "City"
    },
    stateOrProvince: {
      type: coda.ValueType.String,
      description: "State or province code"
    },
    zipOrPostalCode: {
      type: coda.ValueType.String,
      description: "ZIP or postal code"
    },
    contactMode: {
      type: coda.ValueType.String,
      description: "Contact mode (Individual, Organization, etc.)"
    },
    dateCreated: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the contact was created"
    },
    dateModified: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the contact was last modified"
    }
  },
  displayProperty: "firstName",
  idProperty: "vanId",
  featuredProperties: ["firstName", "lastName", "email", "phoneNumber"]
});
var EventSchema = coda.makeObjectSchema({
  properties: {
    eventId: {
      type: coda.ValueType.Number,
      description: "The unique identifier for the event in EveryAction"
    },
    name: {
      type: coda.ValueType.String,
      description: "Event name"
    },
    shortName: {
      type: coda.ValueType.String,
      description: "Event short name"
    },
    description: {
      type: coda.ValueType.String,
      description: "Event description"
    },
    eventType: {
      type: coda.ValueType.String,
      description: "Type of event (e.g., Fundraiser, Training, etc.)"
    },
    startDate: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Event start date and time"
    },
    endDate: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Event end date and time"
    },
    publicWebsiteUrl: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Url,
      description: "Public website URL for the event"
    },
    voterRegistrationBatches: {
      type: coda.ValueType.Array,
      items: { type: coda.ValueType.String },
      description: "Voter registration batch IDs"
    },
    notes: {
      type: coda.ValueType.String,
      description: "Event notes"
    },
    dateCreated: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the event was created"
    },
    dateModified: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the event was last modified"
    }
  },
  displayProperty: "name",
  idProperty: "eventId",
  featuredProperties: ["name", "eventType", "startDate", "endDate"]
});
var EventSignupSchema = coda.makeObjectSchema({
  properties: {
    eventSignupId: {
      type: coda.ValueType.Number,
      description: "The unique identifier for the event signup"
    },
    personVanId: {
      type: coda.ValueType.Number,
      description: "VAN ID of the person signed up"
    },
    personName: {
      type: coda.ValueType.String,
      description: "Name of the person signed up"
    },
    eventId: {
      type: coda.ValueType.Number,
      description: "ID of the event"
    },
    eventName: {
      type: coda.ValueType.String,
      description: "Name of the event"
    },
    status: {
      type: coda.ValueType.String,
      description: "Signup status (Invited, Scheduled, Confirmed, Completed, Declined, No Show, etc.)"
    },
    role: {
      type: coda.ValueType.String,
      description: "Role for this signup"
    },
    roleId: {
      type: coda.ValueType.Number,
      description: "Role ID for this signup"
    },
    shift: {
      type: coda.ValueType.String,
      description: "Shift for this signup"
    },
    eventShiftId: {
      type: coda.ValueType.Number,
      description: "Shift ID for this signup"
    },
    startTime: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Signup start time"
    },
    endTime: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Signup end time"
    },
    location: {
      type: coda.ValueType.String,
      description: "Location for this signup (if multi-location event)"
    },
    dateCreated: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the signup was created"
    },
    dateModified: {
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      description: "Date the signup was last modified"
    }
  },
  displayProperty: "personName",
  idProperty: "eventSignupId",
  featuredProperties: ["personName", "eventName", "status", "role", "shift"]
});
pack.addFormula({
  name: "GetContact",
  description: "Retrieve a contact from EveryAction by VAN ID",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "vanId",
      description: "The VAN ID of the contact to retrieve"
    })
  ],
  resultType: coda.ValueType.Object,
  schema: ContactSchema,
  execute: async function([vanId], context) {
    const BASE_URL = "https://api.securevan.com/v4";
    const encodedUrl = `${BASE_URL}/people/${vanId}?%24expand=emails,phones,addresses`;
    console.log({ url: encodedUrl });
    const response = await context.fetcher.fetch({
      method: "GET",
      url: encodedUrl
    });
    const contact = response.body;
    return {
      vanId: contact.vanId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.emails?.[0]?.email
    };
  }
});
pack.addFormula({
  name: "CreateContact",
  description: "Create a new contact in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "firstName",
      description: "Contact's first name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "lastName",
      description: "Contact's last name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "email",
      description: "Contact's email address",
      optional: true
    })
  ],
  resultType: coda.ValueType.Number,
  execute: async function([firstName, lastName, email], context) {
    const contactData = {
      firstName,
      lastName,
      emails: email ? [{ email, type: "P" }] : []
    };
    const response = await context.fetcher.fetch({
      method: "POST",
      url: "https://api.securevan.com/v4/people",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactData)
    });
    return response.body;
  }
});
pack.addFormula({
  name: "CreateEvent",
  description: "Create a new event in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "name",
      description: "Event name"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "startDate",
      description: "Event start date and time (ISO 8601 format, e.g., 2015-06-02T15:00:00-04:00)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "endDate",
      description: "Event end date and time (ISO 8601 format, e.g., 2015-06-02T20:00:00-04:00)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventTypeId",
      description: "Event type ID (required)"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "shortName",
      description: "Event short name",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "description",
      description: "Event description",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "locationId",
      description: "Location ID for the event",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "isOnlyEditableByCreatingUser",
      description: "Whether only the creating user can edit this event (default: false)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "roleId",
      description: "Role ID for event volunteers (required - get from EveryAction admin)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "roleName",
      description: "Role name (e.g., 'Host', 'Volunteer')",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Boolean,
      name: "isEventLead",
      description: "Whether this role is an event lead (default: false)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "shiftName",
      description: "Shift name (e.g., 'Setup', 'Main Event', 'Cleanup')",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "shiftStartTime",
      description: "Shift start date and time (ISO 8601 format, e.g., '2015-06-01T15:00:00-04:00')",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "shiftEndTime",
      description: "Shift end date and time (ISO 8601 format, e.g., '2015-06-01T20:00:00-04:00')",
      optional: true
    })
  ],
  resultType: coda.ValueType.Number,
  execute: async function([name, startDate, endDate, eventTypeId, shortName, description, locationId, isOnlyEditableByCreatingUser, roleId, roleName, isEventLead, shiftName, shiftStartTime, shiftEndTime], context) {
    const eventData = {
      name,
      startDate,
      endDate,
      eventType: {
        eventTypeId
      },
      isOnlyEditableByCreatingUser: isOnlyEditableByCreatingUser || false,
      roles: [
        {
          roleId: roleId || 1,
          // Default role ID if not provided
          name: roleName || "Volunteer",
          // Default role name
          isEventLead: isEventLead || false
        }
      ],
      shifts: [
        {
          name: shiftName || "Main Event",
          startTime: shiftStartTime || startDate,
          endTime: shiftEndTime || endDate
        }
      ]
    };
    if (shortName) {
      eventData.shortName = shortName;
    }
    if (description) {
      eventData.description = description;
    }
    if (locationId) {
      eventData.locations = [
        {
          locationId
        }
      ];
    }
    console.log({ createEventRequest: eventData });
    const response = await context.fetcher.fetch({
      method: "POST",
      url: "https://api.securevan.com/v4/events",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventData)
    });
    const locationHeader = response.headers?.location;
    if (!locationHeader) {
      throw new coda.UserVisibleError("No Location header found in response");
    }
    const location = Array.isArray(locationHeader) ? locationHeader[0] : locationHeader;
    const eventIdMatch = location.match(/\/events\/(\d+)$/);
    if (!eventIdMatch) {
      throw new coda.UserVisibleError("Could not extract event ID from Location header: " + location);
    }
    const eventId = parseInt(eventIdMatch[1], 10);
    return eventId;
  }
});
pack.addFormula({
  name: "CreateEventSignup",
  description: "Create a new event signup in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "vanId",
      description: "VAN ID of the person to sign up"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventId",
      description: "ID of the event to sign up for"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "roleId",
      description: "Role ID for the signup"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventShiftId",
      description: "Shift ID for the signup"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "status",
      description: "Signup status (default: Invited)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "locationId",
      description: "Location ID (for multi-location events)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "startTime",
      description: "Start time (ISO format or HH:MM)",
      optional: true
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "endTime",
      description: "End time (ISO format or HH:MM)",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: EventSignupSchema,
  execute: async function([vanId, eventId, roleId, eventShiftId, status, locationId, startTime, endTime], context) {
    const signupData = {
      person: {
        vanId
      },
      event: {
        eventId
      },
      role: {
        roleId
      },
      shift: {
        eventShiftId
      },
      status: {
        statusId: status || "Invited"
      }
    };
    if (locationId) {
      signupData.location = {
        locationId
      };
    }
    if (startTime) {
      signupData.startTime = startTime;
    }
    if (endTime) {
      signupData.endTime = endTime;
    }
    const response = await context.fetcher.fetch({
      method: "POST",
      url: "https://api.securevan.com/v4/signups",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupData)
    });
    const eventSignupId = response.body;
    const signupResponse = await context.fetcher.fetch({
      method: "GET",
      url: `https://api.securevan.com/v4/signups?eventId=${eventId}&vanId=${vanId}`
    });
    const signups = signupResponse.body.items || [];
    const signup = signups.find((s) => s.eventSignupId === eventSignupId);
    if (signup) {
      return {
        eventSignupId: signup.eventSignupId,
        personVanId: signup.person?.vanId,
        personName: `${signup.person?.firstName} ${signup.person?.lastName}`.trim(),
        eventId: signup.event?.eventId,
        eventName: signup.event?.name,
        status: signup.status?.name,
        role: signup.role?.name,
        roleId: signup.role?.roleId,
        shift: signup.shift?.name,
        eventShiftId: signup.shift?.eventShiftId,
        startTime: signup.startTime,
        endTime: signup.endTime,
        location: signup.location?.name,
        dateCreated: signup.dateCreated,
        dateModified: signup.dateModified
      };
    }
    return {
      eventSignupId,
      personVanId: vanId,
      personName: "Unknown",
      eventId,
      eventName: "Unknown",
      status: status || "Invited",
      role: "Unknown",
      roleId,
      shift: "Unknown",
      eventShiftId,
      startTime,
      endTime,
      location: locationId ? "Unknown" : void 0,
      dateCreated: (/* @__PURE__ */ new Date()).toISOString(),
      dateModified: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});
pack.addFormula({
  name: "UpdateEventSignup",
  description: "Update an existing event signup status in EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventSignupId",
      description: "ID of the event signup to update"
    }),
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "status",
      description: "New signup status ID"
    })
  ],
  resultType: coda.ValueType.Object,
  schema: EventSignupSchema,
  execute: async function([eventSignupId, status], context) {
    console.log({
      updateEventSignupInput: {
        eventSignupId,
        status
      }
    });
    const getResp = await context.fetcher.fetch({
      method: "GET",
      url: `https://api.securevan.com/v4/signups/${eventSignupId}`
    });
    console.log({
      getSignupResponse: {
        status: getResp.status,
        body: getResp.body
      }
    });
    const existing = getResp.body;
    if (!existing || !existing.eventSignupId) {
      throw new coda.UserVisibleError("Could not retrieve existing signup details for update.");
    }
    console.log({
      existingSignupDataKeys: Object.keys(existing || {}),
      hasEventSignupId: !!existing?.eventSignupId,
      hasPerson: !!existing?.person,
      hasEvent: !!existing?.event,
      hasRole: !!existing?.role,
      hasShift: !!existing?.shift,
      hasStatus: !!existing?.status
    });
    const updateData = {
      eventSignupId: existing.eventSignupId,
      person: { vanId: existing.person?.vanId },
      event: { eventId: existing.event?.eventId },
      shift: { eventShiftId: existing.shift?.eventShiftId },
      role: { roleId: existing.role?.roleId },
      status: { statusId: status || existing.status?.statusId }
    };
    if (existing.location?.locationId) {
      updateData.location = { locationId: existing.location.locationId };
    }
    console.log({ updateEventSignupRequest: updateData });
    const updateResponse = await context.fetcher.fetch({
      method: "PUT",
      url: `https://api.securevan.com/v4/signups/${eventSignupId}`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData)
    });
    console.log({
      updateEventSignupResponse: {
        status: updateResponse.status,
        hasBody: !!updateResponse.body,
        body: updateResponse.body || "No response body"
      }
    });
    return {
      eventSignupId,
      personVanId: existing.person?.vanId,
      personName: `${existing.person?.firstName} ${existing.person?.lastName}`.trim(),
      eventId: existing.event?.eventId,
      eventName: existing.event?.name,
      status: status || existing.status?.name,
      role: existing.role?.name,
      roleId: existing.role?.roleId,
      shift: existing.shift?.name,
      eventShiftId: existing.shift?.eventShiftId,
      startTime: existing.startTime,
      endTime: existing.endTime,
      location: existing.location?.name,
      dateCreated: existing.dateCreated,
      dateModified: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
});
pack.addFormula({
  name: "DeleteEventSignup",
  description: "Delete an event signup from EveryAction",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventSignupId",
      description: "ID of the event signup to delete"
    })
  ],
  resultType: coda.ValueType.String,
  execute: async function([eventSignupId], context) {
    await context.fetcher.fetch({
      method: "DELETE",
      url: `https://api.securevan.com/v4/signups/${eventSignupId}`
    });
    return `Event signup ${eventSignupId} deleted successfully`;
  }
});
pack.addSyncTable({
  name: "Contacts",
  description: "Sync contacts from EveryAction",
  identityName: "Contact",
  schema: ContactSchema,
  formula: {
    name: "SyncContacts",
    description: "Sync contacts from EveryAction",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "firstName",
        description: "Filter by first name (required - matches contacts with first names starting with this value)",
        optional: false
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "lastName",
        description: "Filter by last name (optional)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "email",
        description: "Filter by email (optional - matches emails starting with this value)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "phoneNumber",
        description: "Filter by phone number (optional)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "city",
        description: "Filter by city (optional)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "stateOrProvince",
        description: "Filter by state or province code (optional)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "zipOrPostalCode",
        description: "Filter by ZIP or postal code (optional)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "contactMode",
        description: "Filter by contact mode (Individual, Organization, etc.) (optional)",
        optional: true
      })
    ],
    execute: async function([firstName, lastName, email, phoneNumber, city, stateOrProvince, zipOrPostalCode, contactMode], context) {
      let url = "https://api.securevan.com/v4/people";
      const queryParams = [];
      if (firstName) {
        queryParams.push(`firstName=${encodeURIComponent(firstName)}`);
      }
      if (lastName) {
        queryParams.push(`lastName=${encodeURIComponent(lastName)}`);
      }
      if (email) {
        queryParams.push(`email=${encodeURIComponent(email)}`);
      }
      if (phoneNumber) {
        queryParams.push(`phoneNumber=${encodeURIComponent(phoneNumber)}`);
      }
      if (city) {
        queryParams.push(`city=${encodeURIComponent(city)}`);
      }
      if (stateOrProvince) {
        queryParams.push(`stateOrProvince=${encodeURIComponent(stateOrProvince)}`);
      }
      if (zipOrPostalCode) {
        queryParams.push(`zipOrPostalCode=${encodeURIComponent(zipOrPostalCode)}`);
      }
      if (contactMode) {
        queryParams.push(`contactMode=${encodeURIComponent(contactMode)}`);
      }
      queryParams.push("$top=50");
      if (context.sync.continuation) {
        queryParams.push(`$skip=${context.sync.continuation.skip}`);
      }
      queryParams.push("$expand=Addresses,Districts,Emails,Phones");
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      const response = await context.fetcher.fetch({
        method: "GET",
        url
      });
      const data = response.body;
      const contacts = data.items || [];
      const result = contacts.map((contact) => {
        const primaryAddress = contact.addresses?.find((addr) => addr.isPreferred) || contact.addresses?.[0];
        const primaryEmail = contact.emails?.find((email2) => email2.isPreferred) || contact.emails?.[0];
        const primaryPhone = contact.phones?.find((phone) => phone.isPreferred) || contact.phones?.[0];
        return {
          vanId: contact.vanId,
          firstName: contact.firstName,
          middleName: contact.middleName,
          lastName: contact.lastName,
          commonName: contact.commonName,
          officialName: contact.officialName,
          email: primaryEmail?.email,
          phoneNumber: primaryPhone?.phoneNumber,
          streetAddress: primaryAddress?.addressLine1,
          city: primaryAddress?.city,
          stateOrProvince: primaryAddress?.stateOrProvince,
          zipOrPostalCode: primaryAddress?.zipOrPostalCode,
          contactMode: contact.contactMode,
          dateCreated: contact.dateCreated,
          dateModified: contact.dateModified
        };
      });
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: skipMatch[1] };
        }
      }
      return {
        result,
        continuation
      };
    }
  }
});
pack.addSyncTable({
  name: "Events",
  description: "Sync events from EveryAction",
  identityName: "Event",
  schema: EventSchema,
  formula: {
    name: "SyncEvents",
    description: "Sync events from EveryAction",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "eventType",
        description: "Filter by event type (optional)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "startDate",
        description: "Filter events starting from this date (YYYY-MM-DD format, optional)",
        optional: true
      })
    ],
    execute: async function([eventType, startDate], context) {
      let url = "https://api.securevan.com/v4/events";
      const queryParams = [];
      if (eventType) {
        queryParams.push(`eventType=${encodeURIComponent(eventType)}`);
      }
      if (startDate) {
        queryParams.push(`startingAfter=${encodeURIComponent(startDate)}`);
      }
      queryParams.push("$top=50");
      if (context.sync.continuation) {
        queryParams.push(`$skip=${context.sync.continuation.skip}`);
      }
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      const response = await context.fetcher.fetch({
        method: "GET",
        url
      });
      const data = response.body;
      const events = data.items || [];
      const result = events.map((event) => ({
        eventId: event.eventId,
        name: event.name,
        shortName: event.shortName,
        description: event.description,
        eventType: event.eventType?.name,
        startDate: event.startDate,
        endDate: event.endDate,
        publicWebsiteUrl: event.publicWebsiteUrl,
        voterRegistrationBatches: event.voterRegistrationBatches || [],
        notes: event.notes,
        dateCreated: event.dateCreated,
        dateModified: event.dateModified
      }));
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: skipMatch[1] };
        }
      }
      return {
        result,
        continuation
      };
    }
  }
});
pack.addSyncTable({
  name: "EventSignups",
  description: "Sync event signups from EveryAction",
  identityName: "EventSignup",
  schema: EventSignupSchema,
  formula: {
    name: "SyncEventSignups",
    description: "Sync event signups from EveryAction",
    parameters: [
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "eventId",
        description: "Filter by specific event ID (optional)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.Number,
        name: "vanId",
        description: "Filter by specific person VAN ID (optional)",
        optional: true
      }),
      coda.makeParameter({
        type: coda.ParameterType.String,
        name: "status",
        description: "Filter by signup status (optional)",
        optional: true
      })
    ],
    execute: async function([eventId, vanId, status], context) {
      if (!eventId && !vanId) {
        throw new coda.UserVisibleError("Either eventId or vanId parameter must be specified");
      }
      let url = "https://api.securevan.com/v4/signups";
      const queryParams = [];
      if (eventId) {
        queryParams.push(`eventId=${encodeURIComponent(eventId.toString())}`);
      }
      if (vanId) {
        queryParams.push(`vanId=${encodeURIComponent(vanId.toString())}`);
      }
      queryParams.push("$top=50");
      if (context.sync.continuation) {
        queryParams.push(`$skip=${context.sync.continuation.skip}`);
      }
      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }
      const response = await context.fetcher.fetch({
        method: "GET",
        url
      });
      const data = response.body;
      const signups = data.items || [];
      const filteredSignups = status ? signups.filter((signup) => signup.status?.name === status) : signups;
      const result = filteredSignups.map((signup) => ({
        eventSignupId: signup.eventSignupId,
        personVanId: signup.person?.vanId,
        personName: `${signup.person?.firstName} ${signup.person?.lastName}`.trim(),
        eventId: signup.event?.eventId,
        eventName: signup.event?.name,
        status: signup.status?.name,
        role: signup.role?.name,
        roleId: signup.role?.roleId,
        // Add roleId
        shift: signup.shift?.name,
        eventShiftId: signup.shift?.eventShiftId,
        // Add eventShiftId
        startTime: signup.startTime,
        endTime: signup.endTime,
        location: signup.location?.name,
        dateCreated: signup.dateCreated,
        dateModified: signup.dateModified
      }));
      let continuation;
      if (data.nextPageLink) {
        const skipMatch = data.nextPageLink.match(/\$skip=(\d+)/);
        if (skipMatch) {
          continuation = { skip: skipMatch[1] };
        }
      }
      return {
        result,
        continuation
      };
    }
  }
});
pack.addFormula({
  name: "GetEventSignupCount",
  description: "Get the count of event signups for a given event and status.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventId",
      description: "ID of the event to count signups for"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "status",
      description: "Signup status to count (e.g., Completed, Sched-Web, etc.)"
    })
  ],
  resultType: coda.ValueType.Number,
  execute: async function([eventId, status], context) {
    let url = `https://api.securevan.com/v4/signups?eventId=${encodeURIComponent(eventId)}`;
    url += `&$top=1000`;
    const response = await context.fetcher.fetch({
      method: "GET",
      url
    });
    const signups = response.body.items || [];
    const count = signups.filter((s) => (s.status?.name || "").toLowerCase() === status.toLowerCase()).length;
    return count;
  }
});
pack.addFormula({
  name: "GetEventSignupBreakdown",
  description: "Get a breakdown of event signups for a given event, including total and per-status counts, or just for a specific status.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Number,
      name: "eventId",
      description: "ID of the event to get signup breakdown for"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "status",
      description: "(Optional) Signup status to count (e.g., Completed, Sched-Web, etc.). If provided, only the count for this status is returned.",
      optional: true
    })
  ],
  resultType: coda.ValueType.Object,
  schema: coda.makeObjectSchema({
    properties: {
      total: { type: coda.ValueType.Number, description: "Total number of signups (or for the given status if specified)" },
      breakdown: coda.makeObjectSchema({
        properties: {},
        description: "Breakdown of signups by status (dynamic keys, omitted if status is provided)"
      }),
      status: { type: coda.ValueType.String, description: "Status filter applied (if any)" }
    },
    displayProperty: "total"
  }),
  execute: async function([eventId, status], context) {
    let url = `https://api.securevan.com/v4/signups?eventId=${encodeURIComponent(eventId)}&$top=1000`;
    const response = await context.fetcher.fetch({
      method: "GET",
      url
    });
    const signups = response.body.items || [];
    if (status) {
      const filtered = signups.filter((s) => (s.status?.name || "").toLowerCase() === status.toLowerCase());
      return {
        total: filtered.length,
        status
      };
    } else {
      const breakdown = {};
      for (const s of signups) {
        const st = s.status?.name || "Unknown";
        breakdown[st] = (breakdown[st] || 0) + 1;
      }
      return {
        total: signups.length,
        breakdown
      };
    }
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pack
});
/*! Bundled license information:

pascalcase/index.js:
  (*!
   * pascalcase <https://github.com/jonschlinkert/pascalcase>
   *
   * Copyright (c) 2015-present, Jon ("Schlink") Schlinkert.
   * Licensed under the MIT License.
   *)
*/


}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)

},{"buffer":4,"util":51}],2:[function(require,module,exports){
(function (global){(function (){
'use strict';

var possibleNames = require('possible-typed-array-names');

var g = typeof globalThis === 'undefined' ? global : globalThis;

/** @type {import('.')} */
module.exports = function availableTypedArrays() {
	var /** @type {ReturnType<typeof availableTypedArrays>} */ out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			// @ts-expect-error
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"possible-typed-array-names":46}],3:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],4:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)

},{"base64-js":3,"buffer":4,"ieee754":35}],5:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

var $apply = require('./functionApply');
var $call = require('./functionCall');
var $reflectApply = require('./reflectApply');

/** @type {import('./actualApply')} */
module.exports = $reflectApply || bind.call($call, $apply);

},{"./functionApply":7,"./functionCall":8,"./reflectApply":10,"function-bind":26}],6:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var $apply = require('./functionApply');
var actualApply = require('./actualApply');

/** @type {import('./applyBind')} */
module.exports = function applyBind() {
	return actualApply(bind, $apply, arguments);
};

},{"./actualApply":5,"./functionApply":7,"function-bind":26}],7:[function(require,module,exports){
'use strict';

/** @type {import('./functionApply')} */
module.exports = Function.prototype.apply;

},{}],8:[function(require,module,exports){
'use strict';

/** @type {import('./functionCall')} */
module.exports = Function.prototype.call;

},{}],9:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var $TypeError = require('es-errors/type');

var $call = require('./functionCall');
var $actualApply = require('./actualApply');

/** @type {import('.')} */
module.exports = function callBindBasic(args) {
	if (args.length < 1 || typeof args[0] !== 'function') {
		throw new $TypeError('a function is required');
	}
	return $actualApply(bind, $call, args);
};

},{"./actualApply":5,"./functionCall":8,"es-errors/type":21,"function-bind":26}],10:[function(require,module,exports){
'use strict';

/** @type {import('./reflectApply')} */
module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;

},{}],11:[function(require,module,exports){
'use strict';

var setFunctionLength = require('set-function-length');

var $defineProperty = require('es-define-property');

var callBindBasic = require('call-bind-apply-helpers');
var applyBind = require('call-bind-apply-helpers/applyBind');

module.exports = function callBind(originalFunction) {
	var func = callBindBasic(arguments);
	var adjustedLength = originalFunction.length - (arguments.length - 1);
	return setFunctionLength(
		func,
		1 + (adjustedLength > 0 ? adjustedLength : 0),
		true
	);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"call-bind-apply-helpers":9,"call-bind-apply-helpers/applyBind":6,"es-define-property":15,"set-function-length":48}],12:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBindBasic = require('call-bind-apply-helpers');

/** @type {(thisArg: string, searchString: string, position?: number) => number} */
var $indexOf = callBindBasic([GetIntrinsic('%String.prototype.indexOf%')]);

/** @type {import('.')} */
module.exports = function callBoundIntrinsic(name, allowMissing) {
	// eslint-disable-next-line no-extra-parens
	var intrinsic = /** @type {Parameters<typeof callBindBasic>[0][0]} */ (GetIntrinsic(name, !!allowMissing));
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBindBasic([intrinsic]);
	}
	return intrinsic;
};

},{"call-bind-apply-helpers":9,"get-intrinsic":27}],13:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');

var gopd = require('gopd');

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};

},{"es-define-property":15,"es-errors/syntax":20,"es-errors/type":21,"gopd":29}],14:[function(require,module,exports){
'use strict';

var callBind = require('call-bind-apply-helpers');
var gOPD = require('gopd');

var hasProtoAccessor;
try {
	// eslint-disable-next-line no-extra-parens, no-proto
	hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ ([]).__proto__ === Array.prototype;
} catch (e) {
	if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
		throw e;
	}
}

// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ ('__proto__'));

var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;

/** @type {import('./get')} */
module.exports = desc && typeof desc.get === 'function'
	? callBind([desc.get])
	: typeof $getPrototypeOf === 'function'
		? /** @type {import('./get')} */ function getDunder(value) {
			// eslint-disable-next-line eqeqeq
			return $getPrototypeOf(value == null ? value : $Object(value));
		}
		: false;

},{"call-bind-apply-helpers":9,"gopd":29}],15:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;

},{}],16:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],17:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],18:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],19:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],20:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],21:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],22:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],23:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],24:[function(require,module,exports){
'use strict';

var isCallable = require('is-callable');

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;

},{"is-callable":38}],25:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],26:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":25}],27:[function(require,module,exports){
'use strict';

var undefined;

var $Object = require('es-object-atoms');

var $Error = require('es-errors');
var $EvalError = require('es-errors/eval');
var $RangeError = require('es-errors/range');
var $ReferenceError = require('es-errors/ref');
var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');
var $URIError = require('es-errors/uri');

var abs = require('math-intrinsics/abs');
var floor = require('math-intrinsics/floor');
var max = require('math-intrinsics/max');
var min = require('math-intrinsics/min');
var pow = require('math-intrinsics/pow');

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = require('gopd');
var $defineProperty = require('es-define-property');

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();
var getDunderProto = require('dunder-proto/get');

var getProto = (typeof Reflect === 'function' && Reflect.getPrototypeOf)
	|| $Object.getPrototypeOf
	|| getDunderProto;

var $apply = require('call-bind-apply-helpers/functionApply');
var $call = require('call-bind-apply-helpers/functionCall');

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': $Object,
	'%Object.getOwnPropertyDescriptor%': $gOPD,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,

	'%Function.prototype.call%': $call,
	'%Function.prototype.apply%': $apply,
	'%Object.defineProperty%': $defineProperty,
	'%Math.abs%': abs,
	'%Math.floor%': floor,
	'%Math.max%': max,
	'%Math.min%': min,
	'%Math.pow%': pow
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('hasown');
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"call-bind-apply-helpers/functionApply":7,"call-bind-apply-helpers/functionCall":8,"dunder-proto/get":14,"es-define-property":15,"es-errors":17,"es-errors/eval":16,"es-errors/range":18,"es-errors/ref":19,"es-errors/syntax":20,"es-errors/type":21,"es-errors/uri":22,"es-object-atoms":23,"function-bind":26,"gopd":29,"has-symbols":31,"hasown":34,"math-intrinsics/abs":41,"math-intrinsics/floor":42,"math-intrinsics/max":43,"math-intrinsics/min":44,"math-intrinsics/pow":45}],28:[function(require,module,exports){
'use strict';

/** @type {import('./gOPD')} */
module.exports = Object.getOwnPropertyDescriptor;

},{}],29:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
var $gOPD = require('./gOPD');

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"./gOPD":28}],30:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;

},{"es-define-property":15}],31:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

/** @type {import('.')} */
module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":32}],32:[function(require,module,exports){
'use strict';

/** @type {import('./shams')} */
/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	/** @type {{ [k in symbol]?: unknown }} */
	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (var _ in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		// eslint-disable-next-line no-extra-parens
		var descriptor = /** @type {PropertyDescriptor} */ (Object.getOwnPropertyDescriptor(obj, sym));
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],33:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":32}],34:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":26}],35:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],36:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],37:[function(require,module,exports){
'use strict';

var hasToStringTag = require('has-tostringtag/shams')();
var callBound = require('call-bound');

var $toString = callBound('Object.prototype.toString');

/** @type {import('.')} */
var isStandardArguments = function isArguments(value) {
	if (
		hasToStringTag
		&& value
		&& typeof value === 'object'
		&& Symbol.toStringTag in value
	) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

/** @type {import('.')} */
var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null
		&& typeof value === 'object'
		&& 'length' in value
		&& typeof value.length === 'number'
		&& value.length >= 0
		&& $toString(value) !== '[object Array]'
		&& 'callee' in value
		&& $toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

// @ts-expect-error TODO make this not error
isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

/** @type {import('.')} */
module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{"call-bound":12,"has-tostringtag/shams":33}],38:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};

},{}],39:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = require('has-tostringtag/shams')();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};

},{"has-tostringtag/shams":33}],40:[function(require,module,exports){
'use strict';

var whichTypedArray = require('which-typed-array');

/** @type {import('.')} */
module.exports = function isTypedArray(value) {
	return !!whichTypedArray(value);
};

},{"which-typed-array":52}],41:[function(require,module,exports){
'use strict';

/** @type {import('./abs')} */
module.exports = Math.abs;

},{}],42:[function(require,module,exports){
'use strict';

/** @type {import('./floor')} */
module.exports = Math.floor;

},{}],43:[function(require,module,exports){
'use strict';

/** @type {import('./max')} */
module.exports = Math.max;

},{}],44:[function(require,module,exports){
'use strict';

/** @type {import('./min')} */
module.exports = Math.min;

},{}],45:[function(require,module,exports){
'use strict';

/** @type {import('./pow')} */
module.exports = Math.pow;

},{}],46:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = [
	'Float32Array',
	'Float64Array',
	'Int8Array',
	'Int16Array',
	'Int32Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Uint16Array',
	'Uint32Array',
	'BigInt64Array',
	'BigUint64Array'
];

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');
var define = require('define-data-property');
var hasDescriptors = require('has-property-descriptors')();
var gOPD = require('gopd');

var $TypeError = require('es-errors/type');
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};

},{"define-data-property":13,"es-errors/type":21,"get-intrinsic":27,"gopd":29,"has-property-descriptors":30}],49:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],50:[function(require,module,exports){
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9

'use strict';

var isArgumentsObject = require('is-arguments');
var isGeneratorFunction = require('is-generator-function');
var whichTypedArray = require('which-typed-array');
var isTypedArray = require('is-typed-array');

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});

},{"is-arguments":37,"is-generator-function":39,"is-typed-array":40,"which-typed-array":52}],51:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = require('./support/types');

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

}).call(this)}).call(this,require('_process'))

},{"./support/isBuffer":49,"./support/types":50,"_process":47,"inherits":36}],52:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('for-each');
var availableTypedArrays = require('available-typed-arrays');
var callBind = require('call-bind');
var callBound = require('call-bound');
var gOPD = require('gopd');

/** @type {(O: object) => string} */
var $toString = callBound('Object.prototype.toString');
var hasToStringTag = require('has-tostringtag/shams')();

var g = typeof globalThis === 'undefined' ? global : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');

/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */
var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};

/** @typedef {(receiver: import('.').TypedArray) => string | typeof Uint8Array.prototype.slice.call | typeof Uint8Array.prototype.set.call} Getter */
/** @type {{ [k in `\$${import('.').TypedArrayName}`]?: Getter } & { __proto__: null }} */
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			// @ts-expect-error TS won't narrow inside a closure
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				// @ts-expect-error TS won't narrow inside a closure
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			// @ts-expect-error TODO: fix
			cache['$' + typedArray] = callBind(descriptor.get);
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			// @ts-expect-error TODO: fix
			cache['$' + typedArray] = callBind(fn);
		}
	});
}

/** @type {(value: object) => false | import('.').TypedArrayName} */
var tryTypedArrays = function tryAllTypedArrays(value) {
	/** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
	forEach(
		// eslint-disable-next-line no-extra-parens
		/** @type {Record<`\$${TypedArrayName}`, Getter>} */ /** @type {any} */ (cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
		function (getter, typedArray) {
			if (!found) {
				try {
				// @ts-expect-error TODO: fix
					if ('$' + getter(value) === typedArray) {
						found = $slice(typedArray, 1);
					}
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {(value: object) => false | import('.').TypedArrayName} */
var trySlices = function tryAllSlices(value) {
	/** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
	forEach(
		// eslint-disable-next-line no-extra-parens
		/** @type {Record<`\$${TypedArrayName}`, Getter>} */ /** @type {any} */ (cache),
		/** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */ function (getter, name) {
			if (!found) {
				try {
					// @ts-expect-error TODO: fix
					getter(value);
					found = $slice(name, 1);
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {import('.')} */
module.exports = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		/** @type {string} */
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"available-typed-arrays":2,"call-bind":11,"call-bound":12,"for-each":24,"gopd":29,"has-tostringtag/shams":33}]},{},[1])(1)
});
//# sourceMappingURL=browserify-bundle.js.map
