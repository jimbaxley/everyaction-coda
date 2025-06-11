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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvbm9kZV9tb2R1bGVzL21lcnNlbm5lLXR3aXN0ZXIvc3JjL21lcnNlbm5lLXR3aXN0ZXIuanMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvZGlzdC90ZXN0aW5nL2luamVjdGlvbnMvY3J5cHRvX3NoaW0uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bjb2RhaHEvcGFja3Mtc2RrL2Rpc3QvdHlwZXMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0Bjb2RhaHEvcGFja3Mtc2RrL2Rpc3QvYXBpX3R5cGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvZW5zdXJlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvb2JqZWN0X3V0aWxzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvbWlncmF0aW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9wYXNjYWxjYXNlL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L3NjaGVtYS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvY2xvbmUvY2xvbmUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy90eXBlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9vYmplY3QtaW5zcGVjdC91dGlsLmluc3BlY3QuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zaWRlLWNoYW5uZWwtbGlzdC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZXMtb2JqZWN0LWF0b21zL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lcy1lcnJvcnMvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy9ldmFsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lcy1lcnJvcnMvcmFuZ2UuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy9yZWYuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy9zeW50YXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy91cmkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL21hdGgtaW50cmluc2ljcy9hYnMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL21hdGgtaW50cmluc2ljcy9mbG9vci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvbWF0aC1pbnRyaW5zaWNzL21heC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvbWF0aC1pbnRyaW5zaWNzL21pbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvbWF0aC1pbnRyaW5zaWNzL3Bvdy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvbWF0aC1pbnRyaW5zaWNzL3JvdW5kLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9tYXRoLWludHJpbnNpY3MvaXNOYU4uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL21hdGgtaW50cmluc2ljcy9zaWduLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9nb3BkL2dPUEQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2dvcGQvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VzLWRlZmluZS1wcm9wZXJ0eS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaGFzLXN5bWJvbHMvc2hhbXMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9nZXQtcHJvdG8vUmVmbGVjdC5nZXRQcm90b3R5cGVPZi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL09iamVjdC5nZXRQcm90b3R5cGVPZi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbXBsZW1lbnRhdGlvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kLWFwcGx5LWhlbHBlcnMvZnVuY3Rpb25DYWxsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQtYXBwbHktaGVscGVycy9mdW5jdGlvbkFwcGx5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQtYXBwbHktaGVscGVycy9yZWZsZWN0QXBwbHkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC1hcHBseS1oZWxwZXJzL2FjdHVhbEFwcGx5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQtYXBwbHktaGVscGVycy9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZHVuZGVyLXByb3RvL2dldC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZ2V0LXByb3RvL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9oYXNvd24vaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2dldC1pbnRyaW5zaWMvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2NhbGwtYm91bmQvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NpZGUtY2hhbm5lbC1tYXAvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NpZGUtY2hhbm5lbC13ZWFrbWFwL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zaWRlLWNoYW5uZWwvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9yZXF1aXJlcy1wb3J0L2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZ2lmeS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvdXJsLXBhcnNlL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvdXJsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hhbmRsZXJfdGVtcGxhdGVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2FwaS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvZGlzdC9idWlsZGVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvc2NoZW1hLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvc3ZnLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2luZGV4LmpzIiwgIi4uL3BhY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qXG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9iYW5rc2VhbiB3cmFwcGVkIE1ha290byBNYXRzdW1vdG8gYW5kIFRha3VqaSBOaXNoaW11cmEncyBjb2RlIGluIGEgbmFtZXNwYWNlXG4gIHNvIGl0J3MgYmV0dGVyIGVuY2Fwc3VsYXRlZC4gTm93IHlvdSBjYW4gaGF2ZSBtdWx0aXBsZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvcnNcbiAgYW5kIHRoZXkgd29uJ3Qgc3RvbXAgYWxsIG92ZXIgZWFjaG90aGVyJ3Mgc3RhdGUuXG5cbiAgSWYgeW91IHdhbnQgdG8gdXNlIHRoaXMgYXMgYSBzdWJzdGl0dXRlIGZvciBNYXRoLnJhbmRvbSgpLCB1c2UgdGhlIHJhbmRvbSgpXG4gIG1ldGhvZCBsaWtlIHNvOlxuXG4gIHZhciBtID0gbmV3IE1lcnNlbm5lVHdpc3RlcigpO1xuICB2YXIgcmFuZG9tTnVtYmVyID0gbS5yYW5kb20oKTtcblxuICBZb3UgY2FuIGFsc28gY2FsbCB0aGUgb3RoZXIgZ2VucmFuZF97Zm9vfSgpIG1ldGhvZHMgb24gdGhlIGluc3RhbmNlLlxuXG4gIElmIHlvdSB3YW50IHRvIHVzZSBhIHNwZWNpZmljIHNlZWQgaW4gb3JkZXIgdG8gZ2V0IGEgcmVwZWF0YWJsZSByYW5kb21cbiAgc2VxdWVuY2UsIHBhc3MgYW4gaW50ZWdlciBpbnRvIHRoZSBjb25zdHJ1Y3RvcjpcblxuICB2YXIgbSA9IG5ldyBNZXJzZW5uZVR3aXN0ZXIoMTIzKTtcblxuICBhbmQgdGhhdCB3aWxsIGFsd2F5cyBwcm9kdWNlIHRoZSBzYW1lIHJhbmRvbSBzZXF1ZW5jZS5cblxuICBTZWFuIE1jQ3VsbG91Z2ggKGJhbmtzZWFuQGdtYWlsLmNvbSlcbiovXG5cbi8qXG4gICBBIEMtcHJvZ3JhbSBmb3IgTVQxOTkzNywgd2l0aCBpbml0aWFsaXphdGlvbiBpbXByb3ZlZCAyMDAyLzEvMjYuXG4gICBDb2RlZCBieSBUYWt1amkgTmlzaGltdXJhIGFuZCBNYWtvdG8gTWF0c3Vtb3RvLlxuXG4gICBCZWZvcmUgdXNpbmcsIGluaXRpYWxpemUgdGhlIHN0YXRlIGJ5IHVzaW5nIGluaXRfc2VlZChzZWVkKVxuICAgb3IgaW5pdF9ieV9hcnJheShpbml0X2tleSwga2V5X2xlbmd0aCkuXG5cbiAgIENvcHlyaWdodCAoQykgMTk5NyAtIDIwMDIsIE1ha290byBNYXRzdW1vdG8gYW5kIFRha3VqaSBOaXNoaW11cmEsXG4gICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG4gICBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAgIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uc1xuICAgYXJlIG1ldDpcblxuICAgICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cbiAgICAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAgICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICAgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG4gICAgIDMuIFRoZSBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBub3QgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGVcbiAgICAgICAgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuXG4gICAgICAgIHBlcm1pc3Npb24uXG5cbiAgIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlNcbiAgIFwiQVMgSVNcIiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1RcbiAgIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUlxuICAgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SXG4gICBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCxcbiAgIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTyxcbiAgIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRlxuICAgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkdcbiAgIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuICAgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG5cblxuICAgQW55IGZlZWRiYWNrIGlzIHZlcnkgd2VsY29tZS5cbiAgIGh0dHA6Ly93d3cubWF0aC5zY2kuaGlyb3NoaW1hLXUuYWMuanAvfm0tbWF0L01UL2VtdC5odG1sXG4gICBlbWFpbDogbS1tYXQgQCBtYXRoLnNjaS5oaXJvc2hpbWEtdS5hYy5qcCAocmVtb3ZlIHNwYWNlKVxuKi9cblxudmFyIE1lcnNlbm5lVHdpc3RlciA9IGZ1bmN0aW9uKHNlZWQpIHtcblx0aWYgKHNlZWQgPT0gdW5kZWZpbmVkKSB7XG5cdFx0c2VlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHR9XG5cblx0LyogUGVyaW9kIHBhcmFtZXRlcnMgKi9cblx0dGhpcy5OID0gNjI0O1xuXHR0aGlzLk0gPSAzOTc7XG5cdHRoaXMuTUFUUklYX0EgPSAweDk5MDhiMGRmOyAgIC8qIGNvbnN0YW50IHZlY3RvciBhICovXG5cdHRoaXMuVVBQRVJfTUFTSyA9IDB4ODAwMDAwMDA7IC8qIG1vc3Qgc2lnbmlmaWNhbnQgdy1yIGJpdHMgKi9cblx0dGhpcy5MT1dFUl9NQVNLID0gMHg3ZmZmZmZmZjsgLyogbGVhc3Qgc2lnbmlmaWNhbnQgciBiaXRzICovXG5cblx0dGhpcy5tdCA9IG5ldyBBcnJheSh0aGlzLk4pOyAvKiB0aGUgYXJyYXkgZm9yIHRoZSBzdGF0ZSB2ZWN0b3IgKi9cblx0dGhpcy5tdGk9dGhpcy5OKzE7IC8qIG10aT09TisxIG1lYW5zIG10W05dIGlzIG5vdCBpbml0aWFsaXplZCAqL1xuXG5cdGlmIChzZWVkLmNvbnN0cnVjdG9yID09IEFycmF5KSB7XG5cdFx0dGhpcy5pbml0X2J5X2FycmF5KHNlZWQsIHNlZWQubGVuZ3RoKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0aGlzLmluaXRfc2VlZChzZWVkKTtcblx0fVxufVxuXG4vKiBpbml0aWFsaXplcyBtdFtOXSB3aXRoIGEgc2VlZCAqL1xuLyogb3JpZ2luIG5hbWUgaW5pdF9nZW5yYW5kICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLmluaXRfc2VlZCA9IGZ1bmN0aW9uKHMpIHtcblx0dGhpcy5tdFswXSA9IHMgPj4+IDA7XG5cdGZvciAodGhpcy5tdGk9MTsgdGhpcy5tdGk8dGhpcy5OOyB0aGlzLm10aSsrKSB7XG5cdFx0dmFyIHMgPSB0aGlzLm10W3RoaXMubXRpLTFdIF4gKHRoaXMubXRbdGhpcy5tdGktMV0gPj4+IDMwKTtcblx0XHR0aGlzLm10W3RoaXMubXRpXSA9ICgoKCgocyAmIDB4ZmZmZjAwMDApID4+PiAxNikgKiAxODEyNDMzMjUzKSA8PCAxNikgKyAocyAmIDB4MDAwMGZmZmYpICogMTgxMjQzMzI1Mylcblx0XHQrIHRoaXMubXRpO1xuXHRcdC8qIFNlZSBLbnV0aCBUQU9DUCBWb2wyLiAzcmQgRWQuIFAuMTA2IGZvciBtdWx0aXBsaWVyLiAqL1xuXHRcdC8qIEluIHRoZSBwcmV2aW91cyB2ZXJzaW9ucywgTVNCcyBvZiB0aGUgc2VlZCBhZmZlY3QgICAqL1xuXHRcdC8qIG9ubHkgTVNCcyBvZiB0aGUgYXJyYXkgbXRbXS4gICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qIDIwMDIvMDEvMDkgbW9kaWZpZWQgYnkgTWFrb3RvIE1hdHN1bW90byAgICAgICAgICAgICAqL1xuXHRcdHRoaXMubXRbdGhpcy5tdGldID4+Pj0gMDtcblx0XHQvKiBmb3IgPjMyIGJpdCBtYWNoaW5lcyAqL1xuXHR9XG59XG5cbi8qIGluaXRpYWxpemUgYnkgYW4gYXJyYXkgd2l0aCBhcnJheS1sZW5ndGggKi9cbi8qIGluaXRfa2V5IGlzIHRoZSBhcnJheSBmb3IgaW5pdGlhbGl6aW5nIGtleXMgKi9cbi8qIGtleV9sZW5ndGggaXMgaXRzIGxlbmd0aCAqL1xuLyogc2xpZ2h0IGNoYW5nZSBmb3IgQysrLCAyMDA0LzIvMjYgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUuaW5pdF9ieV9hcnJheSA9IGZ1bmN0aW9uKGluaXRfa2V5LCBrZXlfbGVuZ3RoKSB7XG5cdHZhciBpLCBqLCBrO1xuXHR0aGlzLmluaXRfc2VlZCgxOTY1MDIxOCk7XG5cdGk9MTsgaj0wO1xuXHRrID0gKHRoaXMuTj5rZXlfbGVuZ3RoID8gdGhpcy5OIDoga2V5X2xlbmd0aCk7XG5cdGZvciAoOyBrOyBrLS0pIHtcblx0XHR2YXIgcyA9IHRoaXMubXRbaS0xXSBeICh0aGlzLm10W2ktMV0gPj4+IDMwKVxuXHRcdHRoaXMubXRbaV0gPSAodGhpcy5tdFtpXSBeICgoKCgocyAmIDB4ZmZmZjAwMDApID4+PiAxNikgKiAxNjY0NTI1KSA8PCAxNikgKyAoKHMgJiAweDAwMDBmZmZmKSAqIDE2NjQ1MjUpKSlcblx0XHQrIGluaXRfa2V5W2pdICsgajsgLyogbm9uIGxpbmVhciAqL1xuXHRcdHRoaXMubXRbaV0gPj4+PSAwOyAvKiBmb3IgV09SRFNJWkUgPiAzMiBtYWNoaW5lcyAqL1xuXHRcdGkrKzsgaisrO1xuXHRcdGlmIChpPj10aGlzLk4pIHsgdGhpcy5tdFswXSA9IHRoaXMubXRbdGhpcy5OLTFdOyBpPTE7IH1cblx0XHRpZiAoaj49a2V5X2xlbmd0aCkgaj0wO1xuXHR9XG5cdGZvciAoaz10aGlzLk4tMTsgazsgay0tKSB7XG5cdFx0dmFyIHMgPSB0aGlzLm10W2ktMV0gXiAodGhpcy5tdFtpLTFdID4+PiAzMCk7XG5cdFx0dGhpcy5tdFtpXSA9ICh0aGlzLm10W2ldIF4gKCgoKChzICYgMHhmZmZmMDAwMCkgPj4+IDE2KSAqIDE1NjYwODM5NDEpIDw8IDE2KSArIChzICYgMHgwMDAwZmZmZikgKiAxNTY2MDgzOTQxKSlcblx0XHQtIGk7IC8qIG5vbiBsaW5lYXIgKi9cblx0XHR0aGlzLm10W2ldID4+Pj0gMDsgLyogZm9yIFdPUkRTSVpFID4gMzIgbWFjaGluZXMgKi9cblx0XHRpKys7XG5cdFx0aWYgKGk+PXRoaXMuTikgeyB0aGlzLm10WzBdID0gdGhpcy5tdFt0aGlzLk4tMV07IGk9MTsgfVxuXHR9XG5cblx0dGhpcy5tdFswXSA9IDB4ODAwMDAwMDA7IC8qIE1TQiBpcyAxOyBhc3N1cmluZyBub24temVybyBpbml0aWFsIGFycmF5ICovXG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMHhmZmZmZmZmZl0taW50ZXJ2YWwgKi9cbi8qIG9yaWdpbiBuYW1lIGdlbnJhbmRfaW50MzIgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUucmFuZG9tX2ludCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgeTtcblx0dmFyIG1hZzAxID0gbmV3IEFycmF5KDB4MCwgdGhpcy5NQVRSSVhfQSk7XG5cdC8qIG1hZzAxW3hdID0geCAqIE1BVFJJWF9BICBmb3IgeD0wLDEgKi9cblxuXHRpZiAodGhpcy5tdGkgPj0gdGhpcy5OKSB7IC8qIGdlbmVyYXRlIE4gd29yZHMgYXQgb25lIHRpbWUgKi9cblx0XHR2YXIga2s7XG5cblx0XHRpZiAodGhpcy5tdGkgPT0gdGhpcy5OKzEpICAvKiBpZiBpbml0X3NlZWQoKSBoYXMgbm90IGJlZW4gY2FsbGVkLCAqL1xuXHRcdFx0dGhpcy5pbml0X3NlZWQoNTQ4OSk7ICAvKiBhIGRlZmF1bHQgaW5pdGlhbCBzZWVkIGlzIHVzZWQgKi9cblxuXHRcdGZvciAoa2s9MDtrazx0aGlzLk4tdGhpcy5NO2trKyspIHtcblx0XHRcdHkgPSAodGhpcy5tdFtra10mdGhpcy5VUFBFUl9NQVNLKXwodGhpcy5tdFtraysxXSZ0aGlzLkxPV0VSX01BU0spO1xuXHRcdFx0dGhpcy5tdFtra10gPSB0aGlzLm10W2trK3RoaXMuTV0gXiAoeSA+Pj4gMSkgXiBtYWcwMVt5ICYgMHgxXTtcblx0XHR9XG5cdFx0Zm9yICg7a2s8dGhpcy5OLTE7a2srKykge1xuXHRcdFx0eSA9ICh0aGlzLm10W2trXSZ0aGlzLlVQUEVSX01BU0spfCh0aGlzLm10W2trKzFdJnRoaXMuTE9XRVJfTUFTSyk7XG5cdFx0XHR0aGlzLm10W2trXSA9IHRoaXMubXRba2srKHRoaXMuTS10aGlzLk4pXSBeICh5ID4+PiAxKSBeIG1hZzAxW3kgJiAweDFdO1xuXHRcdH1cblx0XHR5ID0gKHRoaXMubXRbdGhpcy5OLTFdJnRoaXMuVVBQRVJfTUFTSyl8KHRoaXMubXRbMF0mdGhpcy5MT1dFUl9NQVNLKTtcblx0XHR0aGlzLm10W3RoaXMuTi0xXSA9IHRoaXMubXRbdGhpcy5NLTFdIF4gKHkgPj4+IDEpIF4gbWFnMDFbeSAmIDB4MV07XG5cblx0XHR0aGlzLm10aSA9IDA7XG5cdH1cblxuXHR5ID0gdGhpcy5tdFt0aGlzLm10aSsrXTtcblxuXHQvKiBUZW1wZXJpbmcgKi9cblx0eSBePSAoeSA+Pj4gMTEpO1xuXHR5IF49ICh5IDw8IDcpICYgMHg5ZDJjNTY4MDtcblx0eSBePSAoeSA8PCAxNSkgJiAweGVmYzYwMDAwO1xuXHR5IF49ICh5ID4+PiAxOCk7XG5cblx0cmV0dXJuIHkgPj4+IDA7XG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMHg3ZmZmZmZmZl0taW50ZXJ2YWwgKi9cbi8qIG9yaWdpbiBuYW1lIGdlbnJhbmRfaW50MzEgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUucmFuZG9tX2ludDMxID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiAodGhpcy5yYW5kb21faW50KCk+Pj4xKTtcbn1cblxuLyogZ2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBvbiBbMCwxXS1yZWFsLWludGVydmFsICovXG4vKiBvcmlnaW4gbmFtZSBnZW5yYW5kX3JlYWwxICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLnJhbmRvbV9pbmNsID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnJhbmRvbV9pbnQoKSooMS4wLzQyOTQ5NjcyOTUuMCk7XG5cdC8qIGRpdmlkZWQgYnkgMl4zMi0xICovXG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMSktcmVhbC1pbnRlcnZhbCAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5yYW5kb20gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMucmFuZG9tX2ludCgpKigxLjAvNDI5NDk2NzI5Ni4wKTtcblx0LyogZGl2aWRlZCBieSAyXjMyICovXG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gKDAsMSktcmVhbC1pbnRlcnZhbCAqL1xuLyogb3JpZ2luIG5hbWUgZ2VucmFuZF9yZWFsMyAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5yYW5kb21fZXhjbCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gKHRoaXMucmFuZG9tX2ludCgpICsgMC41KSooMS4wLzQyOTQ5NjcyOTYuMCk7XG5cdC8qIGRpdmlkZWQgYnkgMl4zMiAqL1xufVxuXG4vKiBnZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIG9uIFswLDEpIHdpdGggNTMtYml0IHJlc29sdXRpb24qL1xuLyogb3JpZ2luIG5hbWUgZ2VucmFuZF9yZXM1MyAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5yYW5kb21fbG9uZyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgYT10aGlzLnJhbmRvbV9pbnQoKT4+PjUsIGI9dGhpcy5yYW5kb21faW50KCk+Pj42O1xuXHRyZXR1cm4oYSo2NzEwODg2NC4wK2IpKigxLjAvOTAwNzE5OTI1NDc0MDk5Mi4wKTtcbn1cblxuLyogVGhlc2UgcmVhbCB2ZXJzaW9ucyBhcmUgZHVlIHRvIElzYWt1IFdhZGEsIDIwMDIvMDEvMDkgYWRkZWQgKi9cblxubW9kdWxlLmV4cG9ydHMgPSBNZXJzZW5uZVR3aXN0ZXI7XG4iLCAiLy8gaXZtIGRvZW5zJ3QgaGF2ZSBhIGNyeXB0byBpbXBsZW1lbnRhdGlvbi4gc2luY2Ugd2UgYnJvd3NlcmlmeSBtb2R1bGVzIGFscmVhZHksIHRoaXMgc2hpbSBpbXBsZW1lbnRzIHRoZSBicm93c2VyIGNyeXB0byBpbnRlcmZhY2UuXG4vLyBpbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20va3VtYXZpcy9wb2x5ZmlsbC1jcnlwdG8uZ2V0cmFuZG9tdmFsdWVzL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5cbnZhciBNZXJzZW5uZVR3aXN0ZXIgPSByZXF1aXJlKCdtZXJzZW5uZS10d2lzdGVyJyk7XG5cbnZhciB0d2lzdGVyID0gbmV3IE1lcnNlbm5lVHdpc3RlcihNYXRoLnJhbmRvbSgpICogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21WYWx1ZXMoYWJ2KSB7XG4gIHZhciBsID0gYWJ2Lmxlbmd0aDtcbiAgd2hpbGUgKGwtLSkge1xuICAgIGFidltsXSA9IE1hdGguZmxvb3IocmFuZG9tRmxvYXQoKSAqIDI1Nik7XG4gIH1cbiAgcmV0dXJuIGFidjtcbn1cblxuZnVuY3Rpb24gcmFuZG9tRmxvYXQoKSB7XG4gIHJldHVybiB0d2lzdGVyLnJhbmRvbSgpO1xufVxuXG5leHBvcnQgY29uc3QgY3J5cHRvID0ge1xuICBnZXRSYW5kb21WYWx1ZXMsXG59O1xuXG4vLyBlc2J1aWxkIGlzbid0IGluamVjdGluZyB0aGUgc2hpbSBleHBvcnRzIGludG8gZ2xvYmFsLiBpbiB0aGlzIHBhcnRpY3VsYXIgY2FzZSwgY3J5cHRvXG4vLyBsaWJyYXJ5IGlzIHVzdWFsbHkgdXNlZCBhcyBnbG9iYWwuY3J5cHRvIHdoaWNoIHJldHVybnMgdW5kZWZpbmVkIG90aGVyd2lzZS5cbi8vXG4vLyBhbHRlcm5hdGl2ZWx5IGEgZmV3IG90aGVyIGFwcHJvYWNoZXMgYXJlIHRyaWVkOlxuLy8gLSBzaGltIGdsb2JhbDogd2hpY2ggZG9lc24ndCB3b3JrIHdpdGggVk0gc29tZWhvdyBzaW5jZSB0aGUgVk0gbWFuYWdlcyBjb250ZXh0Lmdsb2JhbCB3aGljaFxuLy8gICBzZWVtcyBhIGRpZmZlcmVudCBvYmplY3QgZnJvbSB0aGUgZ2xvYmFsIGhlcmUuIGNhdXNpbmcgbWFuaWZlc3QgdG8gYmUgdW5kZWZpbmVkLlxuLy8gLSB1c2UgZXNidWlsZCBkZWZpbmUgZ2xvYmFsLmNyeXB0bzogY3J5cHRvLiBkaWRuJ3Qgd29yay5cbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL2V2YW53L2VzYnVpbGQvaXNzdWVzLzI5NiBEaWRuJ3Qgd29yayBzaW5jZSB3ZSBiYW5uZWQgZXZhbCBpbiBWTS5cbi8vXG4vLyBMYXN0bHksIHdlIGNhbiBtb3ZlIHRoaXMgc2hpbSB0byB0aHVuayBidW5kbGUgYW5kIHJlZ2lzdGVyIGl0IGludG8gZ2xvYmFsIGZyb20gdGhlIHRodW5rIGJ1bmRsZS5cbi8vIEl0IGhhcyB0aGUgc2FtZSBzaWRlIGVmZmVjdCBvZiB0aGUgc2hpbSB0aG91Z2guXG4vL1xuLy8gcGxlYXNlIG5vdGUgdGhhdCB0aGlzIGNhdXNlcyBhIGdsb2JhbCBsZWFrIGFuZCBuZWVkcyBiZSBpZ25vcmVkIGluIHNvbWUgY29uZmlncy5cbi8vIE5vZGUgMTkgaGFzIG5hdGl2ZSBzdXBwb3J0IGZvciB0aGUgY3J5cHRvIG1vZHVsZS5cbmlmICghZ2xvYmFsLmNyeXB0bz8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIGdsb2JhbC5jcnlwdG8gPSBjcnlwdG87XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkh0dHBTdGF0dXNDb2RlID0gZXhwb3J0cy5TeW5jSW50ZXJ2YWwgPSBleHBvcnRzLlF1b3RhTGltaXRUeXBlID0gZXhwb3J0cy5GZWF0dXJlU2V0ID0gZXhwb3J0cy5SZXNlcnZlZEF1dGhlbnRpY2F0aW9uTmFtZXMgPSBleHBvcnRzLlRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uID0gZXhwb3J0cy5Qb3N0U2V0dXBUeXBlID0gZXhwb3J0cy5BdXRoZW50aWNhdGlvblR5cGUgPSBleHBvcnRzLlBhY2tDYXRlZ29yeSA9IHZvaWQgMDtcbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xudmFyIFBhY2tDYXRlZ29yeTtcbihmdW5jdGlvbiAoUGFja0NhdGVnb3J5KSB7XG4gICAgUGFja0NhdGVnb3J5W1wiQ1JNXCJdID0gXCJDUk1cIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJDYWxlbmRhclwiXSA9IFwiQ2FsZW5kYXJcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJDb21tdW5pY2F0aW9uXCJdID0gXCJDb21tdW5pY2F0aW9uXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiRGF0YVN0b3JhZ2VcIl0gPSBcIkRhdGFTdG9yYWdlXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiRGVzaWduXCJdID0gXCJEZXNpZ25cIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJGaW5hbmNpYWxcIl0gPSBcIkZpbmFuY2lhbFwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIkZ1blwiXSA9IFwiRnVuXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiR2VvXCJdID0gXCJHZW9cIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJJVFwiXSA9IFwiSVRcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJNYXRoZW1hdGljc1wiXSA9IFwiTWF0aGVtYXRpY3NcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJPcmdhbml6YXRpb25cIl0gPSBcIk9yZ2FuaXphdGlvblwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIlJlY3J1aXRpbmdcIl0gPSBcIlJlY3J1aXRpbmdcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJTaG9wcGluZ1wiXSA9IFwiU2hvcHBpbmdcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJTb2NpYWxcIl0gPSBcIlNvY2lhbFwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIlNwb3J0c1wiXSA9IFwiU3BvcnRzXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiVHJhdmVsXCJdID0gXCJUcmF2ZWxcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJXZWF0aGVyXCJdID0gXCJXZWF0aGVyXCI7XG59KShQYWNrQ2F0ZWdvcnkgfHwgKGV4cG9ydHMuUGFja0NhdGVnb3J5ID0gUGFja0NhdGVnb3J5ID0ge30pKTtcbi8qKlxuICogQXV0aGVudGljYXRpb24gdHlwZXMgc3VwcG9ydGVkIGJ5IENvZGEgUGFja3MuXG4gKlxuICogQHNlZSBbQXV0aGVudGljYXRpbmcgd2l0aCBvdGhlciBzZXJ2aWNlc10oaHR0cHM6Ly9jb2RhLmlvL3BhY2tzL2J1aWxkL2xhdGVzdC9ndWlkZXMvYmFzaWNzL2F1dGhlbnRpY2F0aW9uLylcbiAqIEBzZWUgW0F1dGhlbnRpY2F0aW9uIHNhbXBsZXNdKGh0dHBzOi8vY29kYS5pby9wYWNrcy9idWlsZC9sYXRlc3Qvc2FtcGxlcy90b3BpYy9hdXRoZW50aWNhdGlvbi8pXG4gKi9cbnZhciBBdXRoZW50aWNhdGlvblR5cGU7XG4oZnVuY3Rpb24gKEF1dGhlbnRpY2F0aW9uVHlwZSkge1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGlzIHBhY2sgZG9lcyBub3QgdXNlIGF1dGhlbnRpY2F0aW9uLiBZb3UgbWF5IGFsc28gb21pdCBhbiBhdXRoZW50aWNhdGlvbiBkZWNsYXJhdGlvbiBlbnRpcmVseS5cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJOb25lXCJdID0gXCJOb25lXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHVzaW5nIGFuIEhUVFAgaGVhZGVyIG9mIHRoZSBmb3JtIGBBdXRob3JpemF0aW9uOiBCZWFyZXIgPHRva2VuPmAuXG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBIZWFkZXJCZWFyZXJUb2tlbkF1dGhlbnRpY2F0aW9ufVxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIkhlYWRlckJlYXJlclRva2VuXCJdID0gXCJIZWFkZXJCZWFyZXJUb2tlblwiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSB1c2luZyBhbiBIVFRQIGhlYWRlciB3aXRoIGEgY3VzdG9tIG5hbWUgYW5kIHRva2VuIHByZWZpeCB0aGF0IHlvdSBzcGVjaWZ5LlxuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgQ3VzdG9tSGVhZGVyVG9rZW5BdXRoZW50aWNhdGlvbn1cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJDdXN0b21IZWFkZXJUb2tlblwiXSA9IFwiQ3VzdG9tSGVhZGVyVG9rZW5cIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgdXNpbmcgbXVsdGlwbGUgSFRUUCBoZWFkZXJzIHRoYXQgeW91IHNwZWNpZnkuXG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBNdWx0aUhlYWRlclRva2VuQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiTXVsdGlIZWFkZXJUb2tlblwiXSA9IFwiTXVsdGlIZWFkZXJUb2tlblwiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSB1c2luZyBhIHRva2VuIHRoYXQgaXMgcGFzc2VkIGFzIGEgVVJMIHBhcmFtZXRlciB3aXRoIGVhY2ggcmVxdWVzdCwgZS5nLlxuICAgICAqIGBodHRwczovL2V4YW1wbGUuY29tL2FwaT9wYXJhbU5hbWU9dG9rZW5gLlxuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgUXVlcnlQYXJhbVRva2VuQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiUXVlcnlQYXJhbVRva2VuXCJdID0gXCJRdWVyeVBhcmFtVG9rZW5cIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgdXNpbmcgbXVsdGlwbGUgdG9rZW5zLCBlYWNoIHBhc3NlZCBhcyBhIGRpZmZlcmVudCBVUkwgcGFyYW1ldGVyLCBlLmcuXG4gICAgICogYGh0dHBzOi8vZXhhbXBsZS5jb20vYXBpP3BhcmFtMT10b2tlbjEmcGFyYW0yPXRva2VuMmBcbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIE11bHRpUXVlcnlQYXJhbVRva2VuQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiTXVsdGlRdWVyeVBhcmFtVG9rZW5cIl0gPSBcIk11bHRpUXVlcnlQYXJhbVRva2VuXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHVzaW5nIE9BdXRoMi4gVGhpcyBpcyB0aGUgbW9zdCBjb21tb24gdHlwZSBvZiBPQXV0aDIsIHdoaWNoIGludm9sdmVzIHRoZSB1c2VyIGFwcHJvdmluZyBhY2Nlc3MgdG9cbiAgICAgKiB0aGVpciBhY2NvdW50IGJlZm9yZSBiZWluZyBncmFudGVkIGEgdG9rZW4uXG4gICAgICogVGhlIEFQSSBtdXN0IHVzZSBhIChsYXJnZWx5KSBzdGFuZGFyZHMtY29tcGxpYW50IGltcGxlbWVudGF0aW9uIG9mIE9BdXRoMi5cbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIE9BdXRoMkF1dGhlbnRpY2F0aW9ufVxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIk9BdXRoMlwiXSA9IFwiT0F1dGgyXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHVzaW5nIE9BdXRoMiBjbGllbnQgY3JlZGVudGlhbHMuIFRoaXMgaXMgYSBsZXNzIGNvbW1vbiB0eXBlIG9mIE9BdXRoMixcbiAgICAgKiB3aGljaCBpbnZvbHZlcyBleGNoYW5naW5nIGEgY2xpZW50IElEIGFuZCBzZWNyZXQgZm9yIGEgdGVtcG9yYXJ5IGFjY2VzcyB0b2tlbi5cbiAgICAgKlxuICAgICAqIEBzZWUgW09BdXRoMiBjbGllbnQgY3JlZGVudGlhbHMgc3BlY10oaHR0cHM6Ly9vYXV0aC5uZXQvMi9ncmFudC10eXBlcy9jbGllbnQtY3JlZGVudGlhbHMvKVxuICAgICAqIEBzZWUge0BsaW5rIE9BdXRoMkNsaWVudENyZWRlbnRpYWxzfVxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIk9BdXRoMkNsaWVudENyZWRlbnRpYWxzXCJdID0gXCJPQXV0aDJDbGllbnRDcmVkZW50aWFsc1wiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSB1c2luZyBIVFRQIEJhc2ljIGF1dGhvcml6YXRpb24uIFRoZSB1c2VyIHByb3ZpZGVzIGEgdXNlcm5hbWUgYW5kIHBhc3N3b3JkXG4gICAgICogKHNvbWV0aW1lcyBvcHRpb25hbCkgd2hpY2ggYXJlIGluY2x1ZGVkIGFzIGFuIEhUVFAgaGVhZGVyIGFjY29yZGluZyB0byB0aGUgQmFzaWMgYXV0aCBzdGFuZGFyZC5cbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIFdlYkJhc2ljQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiV2ViQmFzaWNcIl0gPSBcIldlYkJhc2ljXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIGluIGEgY3VzdG9tIHdheSBieSBoYXZpbmcgb25lIG9yIG1vcmUgYXJiaXRyYXJ5IHNlY3JldCB2YWx1ZXMgaW5zZXJ0ZWQgaW50byB0aGUgcmVxdWVzdCBVUkwsIGJvZHksXG4gICAgICogaGVhZGVycywgb3IgdGhlIGZvcm0gZGF0YSB1c2luZyB0ZW1wbGF0ZSByZXBsYWNlbWVudC4gQXBwcm92YWwgZnJvbSBDb2RhIGlzIHJlcXVpcmVkLlxuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgQ3VzdG9tQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiQ3VzdG9tXCJdID0gXCJDdXN0b21cIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgdG8gQW1hem9uIFdlYiBTZXJ2aWNlcyB1c2luZyBhbiBJQU0gYWNjZXNzIGtleSBpZCAmIHNlY3JldCBhY2Nlc3Mga2V5IHBhaXIuXG4gICAgICpcbiAgICAgKiBAc2VlIHtAbGluayBBV1NBY2Nlc3NLZXlBdXRoZW50aWNhdGlvbn1cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJBV1NBY2Nlc3NLZXlcIl0gPSBcIkFXU0FjY2Vzc0tleVwiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSB0byBBbWF6b24gV2ViIFNlcnZpY2VzIGJ5IGFzc3VtaW5nIGFuIElBTSByb2xlLlxuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgQVdTQXNzdW1lUm9sZUF1dGhlbnRpY2F0aW9ufVxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIkFXU0Fzc3VtZVJvbGVcIl0gPSBcIkFXU0Fzc3VtZVJvbGVcIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgdXNpbmcgYSBDb2RhIFJFU1QgQVBJIHRva2VuLCBzZW50IGFzIGFuIEhUVFAgaGVhZGVyLlxuICAgICAqXG4gICAgICogQHNlZSB7QGxpbmsgQ29kYUFwaUJlYXJlclRva2VuQXV0aGVudGljYXRpb259XG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiQ29kYUFwaUhlYWRlckJlYXJlclRva2VuXCJdID0gXCJDb2RhQXBpSGVhZGVyQmVhcmVyVG9rZW5cIjtcbiAgICAvKipcbiAgICAgKiBPbmx5IGZvciB1c2UgYnkgQ29kYS1hdXRob3JlZCBwYWNrcy5cbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIEdvb2dsZURvbWFpbldpZGVEZWxlZ2F0aW9uQXV0aGVudGljYXRpb259XG4gICAgICogVE9ETyhuZWFsKTogVW5oaWRlLlxuICAgICAqIEBoaWRkZW5cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJHb29nbGVEb21haW5XaWRlRGVsZWdhdGlvblwiXSA9IFwiR29vZ2xlRG9tYWluV2lkZURlbGVnYXRpb25cIjtcbiAgICAvKipcbiAgICAgKiBPbmx5IGZvciB1c2UgYnkgQ29kYS1hdXRob3JlZCBwYWNrcy5cbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIEdvb2dsZVNlcnZpY2VBY2NvdW50QXV0aGVudGljYXRpb259XG4gICAgICogVE9ETyhuZWFsKTogVW5oaWRlLlxuICAgICAqIEBoaWRkZW5cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJHb29nbGVTZXJ2aWNlQWNjb3VudFwiXSA9IFwiR29vZ2xlU2VydmljZUFjY291bnRcIjtcbiAgICAvKipcbiAgICAgKiBPbmx5IGZvciB1c2UgYnkgQ29kYS1hdXRob3JlZCBwYWNrcy5cbiAgICAgKlxuICAgICAqIEBzZWUge0BsaW5rIFZhcmlvdXNBdXRoZW50aWNhdGlvbn1cbiAgICAgKiBAaGlkZGVuXG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiVmFyaW91c1wiXSA9IFwiVmFyaW91c1wiO1xufSkoQXV0aGVudGljYXRpb25UeXBlIHx8IChleHBvcnRzLkF1dGhlbnRpY2F0aW9uVHlwZSA9IEF1dGhlbnRpY2F0aW9uVHlwZSA9IHt9KSk7XG4vKipcbiAqIEVudW1lcmF0aW9uIG9mIHBvc3QtYWNjb3VudC1zZXR1cCBzdGVwIHR5cGVzLiBTZWUge0BsaW5rIFBvc3RTZXR1cH0uXG4gKi9cbnZhciBQb3N0U2V0dXBUeXBlO1xuKGZ1bmN0aW9uIChQb3N0U2V0dXBUeXBlKSB7XG4gICAgLyoqXG4gICAgICogU2VlIHtAbGluayBTZXRFbmRwb2ludH0uXG4gICAgICovXG4gICAgUG9zdFNldHVwVHlwZVtcIlNldEVuZHBvaW50XCJdID0gXCJTZXRFbmRQb2ludFwiO1xufSkoUG9zdFNldHVwVHlwZSB8fCAoZXhwb3J0cy5Qb3N0U2V0dXBUeXBlID0gUG9zdFNldHVwVHlwZSA9IHt9KSk7XG4vKipcbiAqIFdoZXJlIHRvIHBhc3MgdGhlIGNsaWVudCBjcmVkZW50aWFscyAoY2xpZW50IElEIGFuZCBjbGllbnQgc2VjcmV0KSB3aGVuIG1ha2luZyB0aGUgT0F1dGgyIHRva2VuXG4gKiBleGNoYW5nZSByZXF1ZXN0LiBVc2VkIGluIHtAbGluayBPQXV0aDJBdXRoZW50aWNhdGlvbi5jcmVkZW50aWFsc0xvY2F0aW9ufS5cbiAqL1xudmFyIFRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uO1xuKGZ1bmN0aW9uIChUb2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbikge1xuICAgIC8qKlxuICAgICAqIEFsbG93IENvZGEgdG8gZGV0ZXJtaW5lIHRoaXMgYXV0b21hdGljYWxseS4gQ3VycmVudGx5IHRoYXQgbWVhbnMgQ29kYSB0cmllcyBwYXNzaW5nIHRoZVxuICAgICAqIGNyZWRlbnRpYWxzIGluIHRoZSBib2R5IGZpcnN0LCBhbmQgaWYgdGhhdCBmYWlscyB0aGVuIHRyaWVzIHBhc3NpbmcgdGhlbSBpbiB0aGUgQXV0aG9yaXphdGlvblxuICAgICAqIGhlYWRlci5cbiAgICAgKi9cbiAgICBUb2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbltcIkF1dG9tYXRpY1wiXSA9IFwiQXV0b21hdGljXCI7XG4gICAgLyoqXG4gICAgICogVGhlIGNyZWRlbnRpYWxzIGFyZSBwYXNzZWQgaW4gdGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QsIGVuY29kZWQgYXNcbiAgICAgKiBgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkYCBhbG9uZyB3aXRoIHRoZSBvdGhlciBwYXJhbWV0ZXJzLlxuICAgICAqL1xuICAgIFRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uW1wiQm9keVwiXSA9IFwiQm9keVwiO1xuICAgIC8qKlxuICAgICAqIFRoZSBjcmVkZW50aWFscyBhcmUgcGFzc2VkIGluIHRoZSBBdXRob3JpemF0aW9uIGhlYWRlciB1c2luZyB0aGUgYEJhc2ljYCBzY2hlbWUuXG4gICAgICovXG4gICAgVG9rZW5FeGNoYW5nZUNyZWRlbnRpYWxzTG9jYXRpb25bXCJBdXRob3JpemF0aW9uSGVhZGVyXCJdID0gXCJBdXRob3JpemF0aW9uSGVhZGVyXCI7XG59KShUb2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbiB8fCAoZXhwb3J0cy5Ub2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbiA9IFRva2VuRXhjaGFuZ2VDcmVkZW50aWFsc0xvY2F0aW9uID0ge30pKTtcbi8qKlxuICogQGhpZGRlblxuICovXG52YXIgUmVzZXJ2ZWRBdXRoZW50aWNhdGlvbk5hbWVzO1xuKGZ1bmN0aW9uIChSZXNlcnZlZEF1dGhlbnRpY2F0aW9uTmFtZXMpIHtcbiAgICAvKipcbiAgICAgKiBSZWZlcmVuY2VzIHRoZSBkZWZhdWx0IHVzZXIgYXV0aGVudGljYXRpb24gb2YgdGhlIHBhY2suXG4gICAgICovXG4gICAgUmVzZXJ2ZWRBdXRoZW50aWNhdGlvbk5hbWVzW1wiRGVmYXVsdFwiXSA9IFwiZGVmYXVsdFVzZXJBdXRoZW50aWNhdGlvblwiO1xuICAgIC8qKlxuICAgICAqIFJlZmVyZW5jZXMgdGhlIHN5c3RlbSBhdXRoZW50aWNhdGlvbiBvZiB0aGUgcGFjay5cbiAgICAgKi9cbiAgICBSZXNlcnZlZEF1dGhlbnRpY2F0aW9uTmFtZXNbXCJTeXN0ZW1cIl0gPSBcInN5c3RlbUF1dGhlbnRpY2F0aW9uXCI7XG59KShSZXNlcnZlZEF1dGhlbnRpY2F0aW9uTmFtZXMgfHwgKGV4cG9ydHMuUmVzZXJ2ZWRBdXRoZW50aWNhdGlvbk5hbWVzID0gUmVzZXJ2ZWRBdXRoZW50aWNhdGlvbk5hbWVzID0ge30pKTtcbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqIEBpZ25vcmVcbiAqL1xudmFyIEZlYXR1cmVTZXQ7XG4oZnVuY3Rpb24gKEZlYXR1cmVTZXQpIHtcbiAgICBGZWF0dXJlU2V0W1wiQmFzaWNcIl0gPSBcIkJhc2ljXCI7XG4gICAgRmVhdHVyZVNldFtcIlByb1wiXSA9IFwiUHJvXCI7XG4gICAgRmVhdHVyZVNldFtcIlRlYW1cIl0gPSBcIlRlYW1cIjtcbiAgICBGZWF0dXJlU2V0W1wiRW50ZXJwcmlzZVwiXSA9IFwiRW50ZXJwcmlzZVwiO1xufSkoRmVhdHVyZVNldCB8fCAoZXhwb3J0cy5GZWF0dXJlU2V0ID0gRmVhdHVyZVNldCA9IHt9KSk7XG4vKipcbiAqIEBpZ25vcmVcbiAqIEBkZXByZWNhdGVkXG4gKi9cbnZhciBRdW90YUxpbWl0VHlwZTtcbihmdW5jdGlvbiAoUXVvdGFMaW1pdFR5cGUpIHtcbiAgICBRdW90YUxpbWl0VHlwZVtcIkFjdGlvblwiXSA9IFwiQWN0aW9uXCI7XG4gICAgUXVvdGFMaW1pdFR5cGVbXCJHZXR0ZXJcIl0gPSBcIkdldHRlclwiO1xuICAgIFF1b3RhTGltaXRUeXBlW1wiU3luY1wiXSA9IFwiU3luY1wiO1xuICAgIFF1b3RhTGltaXRUeXBlW1wiTWV0YWRhdGFcIl0gPSBcIk1ldGFkYXRhXCI7XG59KShRdW90YUxpbWl0VHlwZSB8fCAoZXhwb3J0cy5RdW90YUxpbWl0VHlwZSA9IFF1b3RhTGltaXRUeXBlID0ge30pKTtcbi8qKlxuICogQGlnbm9yZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xudmFyIFN5bmNJbnRlcnZhbDtcbihmdW5jdGlvbiAoU3luY0ludGVydmFsKSB7XG4gICAgU3luY0ludGVydmFsW1wiTWFudWFsXCJdID0gXCJNYW51YWxcIjtcbiAgICBTeW5jSW50ZXJ2YWxbXCJEYWlseVwiXSA9IFwiRGFpbHlcIjtcbiAgICBTeW5jSW50ZXJ2YWxbXCJIb3VybHlcIl0gPSBcIkhvdXJseVwiO1xuICAgIFN5bmNJbnRlcnZhbFtcIkV2ZXJ5VGVuTWludXRlc1wiXSA9IFwiRXZlcnlUZW5NaW51dGVzXCI7XG59KShTeW5jSW50ZXJ2YWwgfHwgKGV4cG9ydHMuU3luY0ludGVydmFsID0gU3luY0ludGVydmFsID0ge30pKTtcbnZhciBIdHRwU3RhdHVzQ29kZTtcbihmdW5jdGlvbiAoSHR0cFN0YXR1c0NvZGUpIHtcbiAgICBIdHRwU3RhdHVzQ29kZVtIdHRwU3RhdHVzQ29kZVtcIk9rXCJdID0gMjAwXSA9IFwiT2tcIjtcbiAgICBIdHRwU3RhdHVzQ29kZVtIdHRwU3RhdHVzQ29kZVtcIkNyZWF0ZWRcIl0gPSAyMDFdID0gXCJDcmVhdGVkXCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJBY2NlcHRlZFwiXSA9IDIwMl0gPSBcIkFjY2VwdGVkXCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJOb0NvbnRlbnRcIl0gPSAyMDRdID0gXCJOb0NvbnRlbnRcIjtcbiAgICBIdHRwU3RhdHVzQ29kZVtIdHRwU3RhdHVzQ29kZVtcIk1vdmVkUGVybWFuZW50bHlcIl0gPSAzMDFdID0gXCJNb3ZlZFBlcm1hbmVudGx5XCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJSZWRpcmVjdEZvdW5kXCJdID0gMzAyXSA9IFwiUmVkaXJlY3RGb3VuZFwiO1xuICAgIEh0dHBTdGF0dXNDb2RlW0h0dHBTdGF0dXNDb2RlW1wiUGVybWFuZW50UmVkaXJlY3RcIl0gPSAzMDhdID0gXCJQZXJtYW5lbnRSZWRpcmVjdFwiO1xuICAgIEh0dHBTdGF0dXNDb2RlW0h0dHBTdGF0dXNDb2RlW1wiQmFkUmVxdWVzdFwiXSA9IDQwMF0gPSBcIkJhZFJlcXVlc3RcIjtcbiAgICBIdHRwU3RhdHVzQ29kZVtIdHRwU3RhdHVzQ29kZVtcIlVuYXV0aG9yaXplZFwiXSA9IDQwMV0gPSBcIlVuYXV0aG9yaXplZFwiO1xuICAgIEh0dHBTdGF0dXNDb2RlW0h0dHBTdGF0dXNDb2RlW1wiUGF5bWVudFJlcXVpcmVkXCJdID0gNDAyXSA9IFwiUGF5bWVudFJlcXVpcmVkXCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJGb3JiaWRkZW5cIl0gPSA0MDNdID0gXCJGb3JiaWRkZW5cIjtcbiAgICBIdHRwU3RhdHVzQ29kZVtIdHRwU3RhdHVzQ29kZVtcIk5vdEZvdW5kXCJdID0gNDA0XSA9IFwiTm90Rm91bmRcIjtcbiAgICBIdHRwU3RhdHVzQ29kZVtIdHRwU3RhdHVzQ29kZVtcIk5vdEFjY2VwdGFibGVcIl0gPSA0MDZdID0gXCJOb3RBY2NlcHRhYmxlXCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJDb25mbGljdFwiXSA9IDQwOV0gPSBcIkNvbmZsaWN0XCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJHb25lXCJdID0gNDEwXSA9IFwiR29uZVwiO1xuICAgIEh0dHBTdGF0dXNDb2RlW0h0dHBTdGF0dXNDb2RlW1wiUGF5bG9hZFRvb0xhcmdlXCJdID0gNDEzXSA9IFwiUGF5bG9hZFRvb0xhcmdlXCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJVbnByb2Nlc3NhYmxlRW50aXR5XCJdID0gNDIyXSA9IFwiVW5wcm9jZXNzYWJsZUVudGl0eVwiO1xuICAgIEh0dHBTdGF0dXNDb2RlW0h0dHBTdGF0dXNDb2RlW1wiTG9ja2VkXCJdID0gNDIzXSA9IFwiTG9ja2VkXCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJDbGllbnRDbG9zZWRSZXF1ZXN0XCJdID0gNDk5XSA9IFwiQ2xpZW50Q2xvc2VkUmVxdWVzdFwiO1xuICAgIEh0dHBTdGF0dXNDb2RlW0h0dHBTdGF0dXNDb2RlW1wiTm90SW1wbGVtZW50ZWRcIl0gPSA1MDFdID0gXCJOb3RJbXBsZW1lbnRlZFwiO1xuICAgIEh0dHBTdGF0dXNDb2RlW0h0dHBTdGF0dXNDb2RlW1wiVG9vTWFueVJlcXVlc3RzXCJdID0gNDI5XSA9IFwiVG9vTWFueVJlcXVlc3RzXCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJJbnRlcm5hbFNlcnZlclwiXSA9IDUwMF0gPSBcIkludGVybmFsU2VydmVyXCI7XG4gICAgSHR0cFN0YXR1c0NvZGVbSHR0cFN0YXR1c0NvZGVbXCJCYWRHYXRld2F5XCJdID0gNTAyXSA9IFwiQmFkR2F0ZXdheVwiO1xuICAgIEh0dHBTdGF0dXNDb2RlW0h0dHBTdGF0dXNDb2RlW1wiU2VydmljZVVuYXZhaWxhYmxlXCJdID0gNTAzXSA9IFwiU2VydmljZVVuYXZhaWxhYmxlXCI7XG59KShIdHRwU3RhdHVzQ29kZSB8fCAoZXhwb3J0cy5IdHRwU3RhdHVzQ29kZSA9IEh0dHBTdGF0dXNDb2RlID0ge30pKTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVGFibGVSb2xlID0gZXhwb3J0cy5PcHRpb25zVHlwZSA9IGV4cG9ydHMuRnV0dXJlTGl2ZURhdGVzID0gZXhwb3J0cy5QYXN0TGl2ZURhdGVzID0gZXhwb3J0cy5BbGxQcmVjYW5uZWREYXRlcyA9IGV4cG9ydHMuUHJlY2FubmVkRGF0ZSA9IGV4cG9ydHMuRnJvbU5vd0RhdGVSYW5nZXMgPSBleHBvcnRzLlBhc3RMaXZlRGF0ZVJhbmdlcyA9IGV4cG9ydHMuVW50aWxOb3dEYXRlUmFuZ2VzID0gZXhwb3J0cy5QcmVjYW5uZWREYXRlUmFuZ2UgPSBleHBvcnRzLmlzU3luY0V4ZWN1dGlvbkNvbnRleHQgPSBleHBvcnRzLkludm9jYXRpb25Tb3VyY2UgPSBleHBvcnRzLkludm9jYXRpb25FcnJvclR5cGUgPSBleHBvcnRzLlBlcm1pc3Npb25TeW5jTW9kZSA9IGV4cG9ydHMuVmFsaWRGZXRjaE1ldGhvZHMgPSBleHBvcnRzLk5ldHdvcmtDb25uZWN0aW9uID0gZXhwb3J0cy5Db25uZWN0aW9uUmVxdWlyZW1lbnQgPSBleHBvcnRzLlBhcmFtZXRlclR5cGVJbnB1dE1hcCA9IGV4cG9ydHMuUGFyYW1ldGVyVHlwZSA9IGV4cG9ydHMuZmlsZUFycmF5ID0gZXhwb3J0cy5pbWFnZUFycmF5ID0gZXhwb3J0cy5odG1sQXJyYXkgPSBleHBvcnRzLmRhdGVBcnJheSA9IGV4cG9ydHMuYm9vbGVhbkFycmF5ID0gZXhwb3J0cy5udW1iZXJBcnJheSA9IGV4cG9ydHMuc3RyaW5nQXJyYXkgPSBleHBvcnRzLmlzQXJyYXlUeXBlID0gZXhwb3J0cy5UeXBlID0gdm9pZCAwO1xuLyoqXG4gKiBNYXJrZXJzIHVzZWQgaW50ZXJuYWxseSB0byByZXByZXNlbnQgZGF0YSB0eXBlcyBmb3IgcGFyYW1ldGVycyBhbmQgcmV0dXJuIHZhbHVlcy5cbiAqIEl0IHNob3VsZCBub3QgYmUgbmVjZXNzYXJ5IHRvIGV2ZXIgdXNlIHRoZXNlIHZhbHVlcyBkaXJlY3RseS5cbiAqXG4gKiBXaGVuIGRlZmluaW5nIGEgcGFyYW1ldGVyLCB1c2Uge0BsaW5rIFBhcmFtZXRlclR5cGV9LiBXaGVuIGRlZmluaW5nXG4gKiBhIGZvcm11bGEgcmV0dXJuIHZhbHVlLCBvciBwcm9wZXJ0aWVzIHdpdGhpbiBhbiBvYmplY3QgcmV0dXJuIHZhbHVlLFxuICogdXNlIHtAbGluayBWYWx1ZVR5cGV9LlxuICovXG52YXIgVHlwZTtcbihmdW5jdGlvbiAoVHlwZSkge1xuICAgIFR5cGVbVHlwZVtcInN0cmluZ1wiXSA9IDBdID0gXCJzdHJpbmdcIjtcbiAgICBUeXBlW1R5cGVbXCJudW1iZXJcIl0gPSAxXSA9IFwibnVtYmVyXCI7XG4gICAgVHlwZVtUeXBlW1wib2JqZWN0XCJdID0gMl0gPSBcIm9iamVjdFwiO1xuICAgIFR5cGVbVHlwZVtcImJvb2xlYW5cIl0gPSAzXSA9IFwiYm9vbGVhblwiO1xuICAgIFR5cGVbVHlwZVtcImRhdGVcIl0gPSA0XSA9IFwiZGF0ZVwiO1xuICAgIFR5cGVbVHlwZVtcImh0bWxcIl0gPSA1XSA9IFwiaHRtbFwiO1xuICAgIFR5cGVbVHlwZVtcImltYWdlXCJdID0gNl0gPSBcImltYWdlXCI7XG4gICAgVHlwZVtUeXBlW1wiZmlsZVwiXSA9IDddID0gXCJmaWxlXCI7XG4gICAgVHlwZVtUeXBlW1wibWFya2Rvd25cIl0gPSA4XSA9IFwibWFya2Rvd25cIjtcbn0pKFR5cGUgfHwgKGV4cG9ydHMuVHlwZSA9IFR5cGUgPSB7fSkpO1xuZnVuY3Rpb24gaXNBcnJheVR5cGUob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmoudHlwZSA9PT0gJ2FycmF5JyAmJiB0eXBlb2Ygb2JqLml0ZW1zID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNBcnJheVR5cGUgPSBpc0FycmF5VHlwZTtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0cy5zdHJpbmdBcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLnN0cmluZyxcbn07XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydHMubnVtYmVyQXJyYXkgPSB7XG4gICAgdHlwZTogJ2FycmF5JyxcbiAgICBpdGVtczogVHlwZS5udW1iZXIsXG59O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnRzLmJvb2xlYW5BcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLmJvb2xlYW4sXG59O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnRzLmRhdGVBcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLmRhdGUsXG59O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnRzLmh0bWxBcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLmh0bWwsXG59O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnRzLmltYWdlQXJyYXkgPSB7XG4gICAgdHlwZTogJ2FycmF5JyxcbiAgICBpdGVtczogVHlwZS5pbWFnZSxcbn07XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydHMuZmlsZUFycmF5ID0ge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgaXRlbXM6IFR5cGUuZmlsZSxcbn07XG4vKipcbiAqIEVudW1lcmF0aW9uIG9mIHR5cGVzIG9mIGZvcm11bGEgcGFyYW1ldGVycy4gVGhlc2UgZGVzY3JpYmUgQ29kYSB2YWx1ZSB0eXBlcyAoYXMgb3Bwb3NlZCB0byBKYXZhU2NyaXB0IHZhbHVlIHR5cGVzKS5cbiAqL1xudmFyIFBhcmFtZXRlclR5cGU7XG4oZnVuY3Rpb24gKFBhcmFtZXRlclR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgdGV4dCB2YWx1ZS5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiU3RyaW5nXCJdID0gXCJzdHJpbmdcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgbnVtYmVyIHZhbHVlLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJOdW1iZXJcIl0gPSBcIm51bWJlclwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgQ29kYSBib29sZWFuIHZhbHVlLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJCb29sZWFuXCJdID0gXCJib29sZWFuXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBDb2RhIGRhdGUgdmFsdWUgKHdoaWNoIGluY2x1ZGVzIHRpbWUgYW5kIGRhdGV0aW1lIHZhbHVlcykuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkRhdGVcIl0gPSBcImRhdGVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgcmljaCB0ZXh0IHZhbHVlIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgcGFjayBhcyBIVE1MLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJIdG1sXCJdID0gXCJodG1sXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBDb2RhIGltYWdlLiBUaGUgcGFjayBpcyBwYXNzZWQgYW4gaW1hZ2UgVVJMLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJJbWFnZVwiXSA9IFwiaW1hZ2VcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgZmlsZS4gVGhlIHBhY2sgaXMgcGFzc2VkIGEgZmlsZSBVUkwuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkZpbGVcIl0gPSBcImZpbGVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgcmljaCB0ZXh0IHZhbHVlIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgcGFjayBhcyBNYXJrZG93bi5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiTWFya2Rvd25cIl0gPSBcIm1hcmtkb3duXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBsaXN0IG9mIENvZGEgdGV4dCB2YWx1ZXMuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIlN0cmluZ0FycmF5XCJdID0gXCJzdHJpbmdBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBTdHJpbmdBcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VTdHJpbmdBcnJheVwiXSA9IFwic3BhcnNlU3RyaW5nQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSBudW1iZXIgdmFsdWVzLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJOdW1iZXJBcnJheVwiXSA9IFwibnVtYmVyQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgTnVtYmVyQXJyYXl9IHRoYXQgYWNjZXB0cyB1bnBhcnNhYmxlIHZhbHVlcyBhcyBgdW5kZWZpbmVkYC5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiU3BhcnNlTnVtYmVyQXJyYXlcIl0gPSBcInNwYXJzZU51bWJlckFycmF5XCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBsaXN0IG9mIENvZGEgYm9vbGVhbiB2YWx1ZXMuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkJvb2xlYW5BcnJheVwiXSA9IFwiYm9vbGVhbkFycmF5XCI7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIEJvb2xlYW5BcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VCb29sZWFuQXJyYXlcIl0gPSBcInNwYXJzZUJvb2xlYW5BcnJheVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgbGlzdCBvZiBDb2RhIGRhdGUgdmFsdWVzICh3aGljaCBpbmNsdWRlcyB0aW1lIGFuZCBkYXRldGltZSB2YWx1ZXMpLlxuICAgICAqXG4gICAgICogQ3VycmVudGx5LCB3aGVuIHN1Y2ggYSBwYXJhbWV0ZXIgaXMgdXNlZCB3aXRoIGEgc3luYyB0YWJsZSBmb3JtdWxhIG9yIGFuIGFjdGlvbiBmb3JtdWxhXG4gICAgICogKHtAbGluayBCYXNlRm9ybXVsYURlZi5pc0FjdGlvbn0pLCB3aGljaCB3aWxsIGdlbmVyYXRlIGEgYnVpbGRlciBVSSBmb3Igc2VsZWN0aW5nIHBhcmFtZXRlcnMsIGEgZGF0ZSBhcnJheVxuICAgICAqIHBhcmFtZXRlciB3aWxsIGFsd2F5cyByZW5kZXIgYXMgYSBkYXRlIHJhbmdlIHNlbGVjdG9yLiBBIGRhdGUgcmFuZ2Ugd2lsbCBhbHdheXMgYmUgcGFzc2VkIHRvIGEgcGFjayBmb3JtdWxhXG4gICAgICogYXMgYSBsaXN0IG9mIHR3byBlbGVtZW50cywgdGhlIGJlZ2lubmluZyBvZiB0aGUgcmFuZ2UgYW5kIHRoZSBlbmQgb2YgdGhlIHJhbmdlLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJEYXRlQXJyYXlcIl0gPSBcImRhdGVBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBEYXRlQXJyYXl9IHRoYXQgYWNjZXB0cyB1bnBhcnNhYmxlIHZhbHVlcyBhcyBgdW5kZWZpbmVkYC5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiU3BhcnNlRGF0ZUFycmF5XCJdID0gXCJzcGFyc2VEYXRlQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSByaWNoIHRleHQgdmFsdWVzIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgcGFjayBhcyBIVE1MLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJIdG1sQXJyYXlcIl0gPSBcImh0bWxBcnJheWBcIjtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgSHRtbEFycmF5fSB0aGF0IGFjY2VwdHMgdW5wYXJzYWJsZSB2YWx1ZXMgYXMgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIlNwYXJzZUh0bWxBcnJheVwiXSA9IFwic3BhcnNlSHRtbEFycmF5XCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBsaXN0IG9mIENvZGEgaW1hZ2UgdmFsdWVzLiBUaGUgcGFjayBpcyBwYXNzZWQgYSBsaXN0IG9mIGltYWdlIFVSTHMuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkltYWdlQXJyYXlcIl0gPSBcImltYWdlQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgSW1hZ2VBcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VJbWFnZUFycmF5XCJdID0gXCJzcGFyc2VJbWFnZUFycmF5XCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBsaXN0IG9mIENvZGEgZmlsZSB2YWx1ZXMuIFRoZSBwYWNrIGlzIHBhc3NlZCBhIGxpc3Qgb2YgZmlsZSBVUkxzLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJGaWxlQXJyYXlcIl0gPSBcImZpbGVBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBGaWxlQXJyYXl9IHRoYXQgYWNjZXB0cyB1bnBhcnNhYmxlIHZhbHVlcyBhcyBgdW5kZWZpbmVkYC5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiU3BhcnNlRmlsZUFycmF5XCJdID0gXCJzcGFyc2VGaWxlQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSByaWNoIHRleHQgdmFsdWVzIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgcGFjayBhcyBNYXJrZG93bi5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiTWFya2Rvd25BcnJheVwiXSA9IFwibWFya2Rvd25BcnJheWBcIjtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgTWFya2Rvd25BcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VNYXJrZG93bkFycmF5XCJdID0gXCJzcGFyc2VNYXJrZG93bkFycmF5XCI7XG59KShQYXJhbWV0ZXJUeXBlIHx8IChleHBvcnRzLlBhcmFtZXRlclR5cGUgPSBQYXJhbWV0ZXJUeXBlID0ge30pKTtcbmV4cG9ydHMuUGFyYW1ldGVyVHlwZUlucHV0TWFwID0ge1xuICAgIFtQYXJhbWV0ZXJUeXBlLlN0cmluZ106IFR5cGUuc3RyaW5nLFxuICAgIFtQYXJhbWV0ZXJUeXBlLk51bWJlcl06IFR5cGUubnVtYmVyLFxuICAgIFtQYXJhbWV0ZXJUeXBlLkJvb2xlYW5dOiBUeXBlLmJvb2xlYW4sXG4gICAgW1BhcmFtZXRlclR5cGUuRGF0ZV06IFR5cGUuZGF0ZSxcbiAgICBbUGFyYW1ldGVyVHlwZS5IdG1sXTogVHlwZS5odG1sLFxuICAgIFtQYXJhbWV0ZXJUeXBlLkltYWdlXTogVHlwZS5pbWFnZSxcbiAgICBbUGFyYW1ldGVyVHlwZS5GaWxlXTogVHlwZS5maWxlLFxuICAgIFtQYXJhbWV0ZXJUeXBlLk1hcmtkb3duXTogVHlwZS5tYXJrZG93bixcbiAgICBbUGFyYW1ldGVyVHlwZS5TdHJpbmdBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuc3RyaW5nIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuTnVtYmVyQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLm51bWJlciB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLkJvb2xlYW5BcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuYm9vbGVhbiB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLkRhdGVBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuZGF0ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLkh0bWxBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuaHRtbCB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLkltYWdlQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmltYWdlIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuRmlsZUFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5maWxlIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuTWFya2Rvd25BcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUubWFya2Rvd24gfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5TcGFyc2VTdHJpbmdBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuc3RyaW5nLCBhbGxvd0VtcHR5OiB0cnVlIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuU3BhcnNlTnVtYmVyQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLm51bWJlciwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZUJvb2xlYW5BcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuYm9vbGVhbiwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZURhdGVBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuZGF0ZSwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZUh0bWxBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuaHRtbCwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZUltYWdlQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmltYWdlLCBhbGxvd0VtcHR5OiB0cnVlIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuU3BhcnNlRmlsZUFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5maWxlLCBhbGxvd0VtcHR5OiB0cnVlIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuU3BhcnNlTWFya2Rvd25BcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUubWFya2Rvd24sIGFsbG93RW1wdHk6IHRydWUgfSxcbn07XG4vKipcbiAqIEVudW1lcmF0aW9uIG9mIHJlcXVpcmVtZW50IHN0YXRlcyBmb3Igd2hldGhlciBhIGdpdmVuIGZvcm11bGEgb3Igc3luYyB0YWJsZSByZXF1aXJlc1xuICogYSBjb25uZWN0aW9uIChhY2NvdW50KSB0byB1c2UuXG4gKi9cbnZhciBDb25uZWN0aW9uUmVxdWlyZW1lbnQ7XG4oZnVuY3Rpb24gKENvbm5lY3Rpb25SZXF1aXJlbWVudCkge1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGlzIGJ1aWxkaW5nIGJsb2NrIGRvZXMgbm90IG1ha2UgdXNlIG9mIGFuIGFjY291bnQuXG4gICAgICovXG4gICAgQ29ubmVjdGlvblJlcXVpcmVtZW50W1wiTm9uZVwiXSA9IFwibm9uZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoaXMgYnVpbGRpbmcgYmxvY2sgY2FuIGJlIHVzZWQgd2l0aCBvciB3aXRob3V0IGFuIGFjY291bnQuXG4gICAgICpcbiAgICAgKiBBbiBvcHRpb25hbCBwYXJhbWV0ZXIgd2lsbCBiZSBhZGRlZCB0byB0aGUgZm9ybXVsYSAob3Igc3luYyBmb3JtdWxhKSBmb3IgdGhlIGNhbGxpbmcgdXNlclxuICAgICAqIHRvIHNwZWNpZnkgYW4gYWNjb3VudCB0byB1c2UuXG4gICAgICovXG4gICAgQ29ubmVjdGlvblJlcXVpcmVtZW50W1wiT3B0aW9uYWxcIl0gPSBcIm9wdGlvbmFsXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoYXQgdGhpcyBidWlsZGluZyBibG9jayBtdXN0IGJlIHVzZWQgd2l0aCBhbiBhY2NvdW50LlxuICAgICAqXG4gICAgICogQSByZXF1aXJlZCBwYXJhbWV0ZXIgd2lsbCBiZSBhZGRlZCB0byB0aGUgZm9ybXVsYSAob3Igc3luYyBmb3JtdWxhKSBmb3IgdGhlIGNhbGxpbmcgdXNlclxuICAgICAqIHRvIHNwZWNpZnkgYW4gYWNjb3VudCB0byB1c2UuXG4gICAgICovXG4gICAgQ29ubmVjdGlvblJlcXVpcmVtZW50W1wiUmVxdWlyZWRcIl0gPSBcInJlcXVpcmVkXCI7XG59KShDb25uZWN0aW9uUmVxdWlyZW1lbnQgfHwgKGV4cG9ydHMuQ29ubmVjdGlvblJlcXVpcmVtZW50ID0gQ29ubmVjdGlvblJlcXVpcmVtZW50ID0ge30pKTtcbi8qKiBAZGVwcmVjYXRlZCB1c2UgYENvbm5lY3Rpb25SZXF1aXJlbWVudGAgaW5zdGVhZCAqL1xudmFyIE5ldHdvcmtDb25uZWN0aW9uO1xuKGZ1bmN0aW9uIChOZXR3b3JrQ29ubmVjdGlvbikge1xuICAgIE5ldHdvcmtDb25uZWN0aW9uW1wiTm9uZVwiXSA9IFwibm9uZVwiO1xuICAgIE5ldHdvcmtDb25uZWN0aW9uW1wiT3B0aW9uYWxcIl0gPSBcIm9wdGlvbmFsXCI7XG4gICAgTmV0d29ya0Nvbm5lY3Rpb25bXCJSZXF1aXJlZFwiXSA9IFwicmVxdWlyZWRcIjtcbn0pKE5ldHdvcmtDb25uZWN0aW9uIHx8IChleHBvcnRzLk5ldHdvcmtDb25uZWN0aW9uID0gTmV0d29ya0Nvbm5lY3Rpb24gPSB7fSkpO1xuLyoqIFRoZSBIVFRQIG1ldGhvZHMgKHZlcmJzKSBzdXBwb3J0ZWQgYnkgdGhlIGZldGNoZXIuICovXG5leHBvcnRzLlZhbGlkRmV0Y2hNZXRob2RzID0gWydHRVQnLCAnUEFUQ0gnLCAnUE9TVCcsICdQVVQnLCAnREVMRVRFJywgJ0hFQUQnXTtcbi8qKlxuICogVE9ETyhwYXRyaWNrKTogVW5oaWRlIHRoaXNcbiAqIEBoaWRkZW5cbiAqL1xudmFyIFBlcm1pc3Npb25TeW5jTW9kZTtcbihmdW5jdGlvbiAoUGVybWlzc2lvblN5bmNNb2RlKSB7XG4gICAgUGVybWlzc2lvblN5bmNNb2RlW1wiUGVyc29uYWxcIl0gPSBcIlBlcnNvbmFsXCI7XG4gICAgUGVybWlzc2lvblN5bmNNb2RlW1wiUGVybWlzc2lvbkF3YXJlXCJdID0gXCJQZXJtaXNzaW9uQXdhcmVcIjtcbn0pKFBlcm1pc3Npb25TeW5jTW9kZSB8fCAoZXhwb3J0cy5QZXJtaXNzaW9uU3luY01vZGUgPSBQZXJtaXNzaW9uU3luY01vZGUgPSB7fSkpO1xudmFyIEludm9jYXRpb25FcnJvclR5cGU7XG4oZnVuY3Rpb24gKEludm9jYXRpb25FcnJvclR5cGUpIHtcbiAgICBJbnZvY2F0aW9uRXJyb3JUeXBlW1wiVGltZW91dFwiXSA9IFwiVGltZW91dFwiO1xuICAgIEludm9jYXRpb25FcnJvclR5cGVbXCJSZXNwb25zZVRvb0xhcmdlXCJdID0gXCJSZXNwb25zZVRvb0xhcmdlXCI7XG4gICAgSW52b2NhdGlvbkVycm9yVHlwZVtcIkh0dHBTdGF0dXNFcnJvclwiXSA9IFwiSHR0cFN0YXR1c0Vycm9yXCI7XG4gICAgLyoqXG4gICAgICogQ291bGQgbWVhbiAzcmQgcGFydHkgQVBJIHJhdGUgbGltaXQgb3IgYSByYXRlIGxpbWl0IGltcG9zZWQgYnkgQ29kYS5cbiAgICAgKi9cbiAgICBJbnZvY2F0aW9uRXJyb3JUeXBlW1wiUmF0ZUxpbWl0RXhjZWVkZWRcIl0gPSBcIlJhdGVMaW1pdEV4Y2VlZGVkXCI7XG4gICAgSW52b2NhdGlvbkVycm9yVHlwZVtcIlVua25vd25cIl0gPSBcIlVua25vd25cIjtcbn0pKEludm9jYXRpb25FcnJvclR5cGUgfHwgKGV4cG9ydHMuSW52b2NhdGlvbkVycm9yVHlwZSA9IEludm9jYXRpb25FcnJvclR5cGUgPSB7fSkpO1xuLyoqXG4gKiBUT0RPKHBhdHJpY2spOiBVbmhpZGUgdGhpc1xuICogQGhpZGRlblxuICovXG52YXIgSW52b2NhdGlvblNvdXJjZTtcbihmdW5jdGlvbiAoSW52b2NhdGlvblNvdXJjZSkge1xuICAgIEludm9jYXRpb25Tb3VyY2VbXCJCcmFpblwiXSA9IFwiQnJhaW5cIjtcbiAgICBJbnZvY2F0aW9uU291cmNlW1wiRG9jXCJdID0gXCJEb2NcIjtcbiAgICBJbnZvY2F0aW9uU291cmNlW1wiTmF0aXZlSW50ZWdyYXRpb25cIl0gPSBcIk5hdGl2ZUludGVncmF0aW9uXCI7XG59KShJbnZvY2F0aW9uU291cmNlIHx8IChleHBvcnRzLkludm9jYXRpb25Tb3VyY2UgPSBJbnZvY2F0aW9uU291cmNlID0ge30pKTtcbi8qKlxuICogQSBmdW5jdGlvbiB0byBjaGVjayBpZiBhIGdpdmVuIHtAbGluayBFeGVjdXRpb25Db250ZXh0fSBpcyBhIHtAbGluayBTeW5jRXhlY3V0aW9uQ29udGV4dH0uXG4gKi9cbmZ1bmN0aW9uIGlzU3luY0V4ZWN1dGlvbkNvbnRleHQoY29udGV4dCkge1xuICAgIHJldHVybiBjb250ZXh0Lmhhc093blByb3BlcnR5KCdzeW5jJykgJiYgY29udGV4dC5oYXNPd25Qcm9wZXJ0eSgnc3luY1N0YXRlU2VydmljZScpO1xufVxuZXhwb3J0cy5pc1N5bmNFeGVjdXRpb25Db250ZXh0ID0gaXNTeW5jRXhlY3V0aW9uQ29udGV4dDtcbi8vIEEgbWFwcGluZyBleGlzdHMgaW4gY29kYSB0aGF0IGFsbG93cyB0aGVzZSB0byBzaG93IHVwIGluIHRoZSBVSS5cbi8vIElmIGFkZGluZyBuZXcgdmFsdWVzIGhlcmUsIGFkZCB0aGVtIHRvIHRoYXQgbWFwcGluZyBhbmQgdmljZSB2ZXJzYS5cbi8qKlxuICogU3BlY2lhbCBcImxpdmVcIiBkYXRlIHJhbmdlIHZhbHVlcyB0aGF0IGNhbiBiZSB1c2VkIGFzIHRoZSB7QGxpbmsgUGFyYW1EZWYuc3VnZ2VzdGVkVmFsdWV9XG4gKiBmb3IgYSBkYXRlIGFycmF5IHBhcmFtZXRlci5cbiAqXG4gKiBEYXRlIGFycmF5IHBhcmFtZXRlcnMgYXJlIG1lYW50IHRvIHJlcHJlc2VudCBkYXRlIHJhbmdlcy4gQSBkYXRlIHJhbmdlIGNhblxuICogYmUgYSBmaXhlZCByYW5nZSwgZS5nLiBBcHJpbCAxLCAyMDIwIC0gTWF5IDE1LCAyMDIwLCBvciBpdCBjYW4gYmUgYSBcImxpdmVcIlxuICogcmFuZ2UsIGxpa2UgXCJsYXN0IDMwIGRheXNcIi5cbiAqXG4gKiBBdCBleGVjdXRpb24gdGltZSwgYSBkYXRlIHJhbmdlIHdpbGwgYWx3YXlzIGJlIHBhc3NlZCB0byBhIHBhY2sgYXMgYW5cbiAqIGFycmF5IG9mIHR3byBzcGVjaWZpYyBkYXRlcywgYnV0IGZvciBtYW55IHVzZSBjYXNlcywgaXQgaXMgbmVjZXNzYXJ5XG4gKiB0byBwcm92aWRlIGEgZGVmYXVsdCB2YWx1ZSB0aGF0IGlzIGEgXCJsaXZlXCIgcmFuZ2UgcmF0aGVyIHRoYW4gaGFyZGNvZGVkXG4gKiBvbmUuIEZvciBleGFtcGxlLCBpZiB5b3VyIHBhY2sgaGFzIGEgdGFibGUgdGhhdCBzeW5jcyByZWNlbnQgZW1haWxzLFxuICogeW91IG1pZ2h0IHdhbnQgdG8gaGF2ZSBhIGRhdGUgcmFuZ2UgcGFyYW1ldGVyIHRoYXQgZGVmYXVsdCB0b1xuICogXCJsYXN0IDcgZGF5c1wiLiBEZWZhdWx0aW5nIHRvIGEgaGFyZGNvZGVkIGRhdGUgcmFuZ2Ugd291bGQgbm90IGJlIHVzZWZ1bFxuICogYW5kIHJlcXVpcmluZyB0aGUgdXNlciB0byBhbHdheXMgc3BlY2lmeSBhIGRhdGUgcmFuZ2UgbWF5IGJlIGluY29udmVuaWVudC5cbiAqL1xudmFyIFByZWNhbm5lZERhdGVSYW5nZTtcbihmdW5jdGlvbiAoUHJlY2FubmVkRGF0ZVJhbmdlKSB7XG4gICAgLy8gUGFzdFxuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlllc3RlcmRheVwiXSA9IFwieWVzdGVyZGF5XCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdDdEYXlzXCJdID0gXCJsYXN0XzdfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3QzMERheXNcIl0gPSBcImxhc3RfMzBfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3Q5MERheXNcIl0gPSBcImxhc3RfOTBfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3QxODBEYXlzXCJdID0gXCJsYXN0XzE4MF9kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdDM2NURheXNcIl0gPSBcImxhc3RfMzY1X2RheXNcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJMYXN0V2Vla1wiXSA9IFwibGFzdF93ZWVrXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdE1vbnRoXCJdID0gXCJsYXN0X21vbnRoXCI7XG4gICAgLyoqIEBkZXByZWNhdGVkICovXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdDNNb250aHNcIl0gPSBcImxhc3RfM19tb250aHNcIjtcbiAgICAvKiogQGRlcHJlY2F0ZWQgKi9cbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJMYXN0Nk1vbnRoc1wiXSA9IFwibGFzdF82X21vbnRoc1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3RZZWFyXCJdID0gXCJsYXN0X3llYXJcIjtcbiAgICAvLyBQcmVzZW50XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiVG9kYXlcIl0gPSBcInRvZGF5XCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiVGhpc1dlZWtcIl0gPSBcInRoaXNfd2Vla1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlRoaXNNb250aFwiXSA9IFwidGhpc19tb250aFwiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlllYXJUb0RhdGVcIl0gPSBcInllYXJfdG9fZGF0ZVwiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlRoaXNZZWFyXCJdID0gXCJ0aGlzX3llYXJcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJMYXN0N0FuZE5leHQ3RGF5c1wiXSA9IFwibGFzdF83X2FuZF9uZXh0XzdfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3QzMEFuZE5leHQzMERheXNcIl0gPSBcImxhc3RfMzBfYW5kX25leHRfMzBfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3Q5MEFuZE5leHQ5MERheXNcIl0gPSBcImxhc3RfOTBfYW5kX25leHRfOTBfZGF5c1wiO1xuICAgIC8vIEZ1dHVyZVxuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlRvbW9ycm93XCJdID0gXCJ0b21vcnJvd1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHQ3RGF5c1wiXSA9IFwibmV4dF83X2RheXNcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJOZXh0MzBEYXlzXCJdID0gXCJuZXh0XzMwX2RheXNcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJOZXh0OTBEYXlzXCJdID0gXCJuZXh0XzkwX2RheXNcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJOZXh0MTgwRGF5c1wiXSA9IFwibmV4dF8xODBfZGF5c1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHQzNjVEYXlzXCJdID0gXCJuZXh0XzM2NV9kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTmV4dFdlZWtcIl0gPSBcIm5leHRfd2Vla1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHRNb250aFwiXSA9IFwibmV4dF9tb250aFwiO1xuICAgIC8qKiBAZGVwcmVjYXRlZCAqL1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHQzTW9udGhzXCJdID0gXCJuZXh0XzNfbW9udGhzXCI7XG4gICAgLyoqIEBkZXByZWNhdGVkICovXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTmV4dDZNb250aHNcIl0gPSBcIm5leHRfNl9tb250aHNcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJOZXh0WWVhclwiXSA9IFwibmV4dF95ZWFyXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgZGF0ZSByYW5nZSBiZWdpbm5pbmcgaW4gdGhlIHZlcnkgZGlzdGFudCBwYXN0IChlLmcuIDEvMS8xLCBha2EgMSBBLkQuKVxuICAgICAqIGFuZCBlbmRpbmcgaW4gdGhlIGRpc3RhbnQgZnV0dXJlIChlLmcuIDEyLzMxLzM5OTkpLiBFeGFjdCBkYXRlcyBhcmUgc3ViamVjdCB0byBjaGFuZ2UuXG4gICAgICovXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiRXZlcnl0aGluZ1wiXSA9IFwiZXZlcnl0aGluZ1wiO1xufSkoUHJlY2FubmVkRGF0ZVJhbmdlIHx8IChleHBvcnRzLlByZWNhbm5lZERhdGVSYW5nZSA9IFByZWNhbm5lZERhdGVSYW5nZSA9IHt9KSk7XG4vKipcbiAqIFRoZSBzZXQgb2YgZGF0ZSByYW5nZXMgd2hvc2UgZW5kIGRhdGVzIGFyZSB0b2RheS5cbiAqL1xuZXhwb3J0cy5VbnRpbE5vd0RhdGVSYW5nZXMgPSBbXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlLlRvZGF5LFxuICAgIFByZWNhbm5lZERhdGVSYW5nZS5MYXN0N0RheXMsXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlLkxhc3QzMERheXMsXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlLkxhc3Q5MERheXMsXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlLkxhc3QxODBEYXlzLFxuICAgIFByZWNhbm5lZERhdGVSYW5nZS5MYXN0MzY1RGF5cyxcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2UuWWVhclRvRGF0ZSxcbl07XG4vKipcbiAqIFRoZSBzZXQgb2YgZGF0ZSByYW5nZXMgdGhhdCBhcmUgdXNlZnVsIGZvciBmaWx0ZXJpbmcgZGF0YXNldHMgdGhhdCBkb24ndCBpbmNsdWRlXG4gKiBmdXR1cmUgZGF0ZXMuXG4gKi9cbmV4cG9ydHMuUGFzdExpdmVEYXRlUmFuZ2VzID0gW1xuICAgIC4uLmV4cG9ydHMuVW50aWxOb3dEYXRlUmFuZ2VzLFxuICAgIFByZWNhbm5lZERhdGVSYW5nZS5ZZXN0ZXJkYXksXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlLkxhc3RXZWVrLFxuICAgIFByZWNhbm5lZERhdGVSYW5nZS5MYXN0TW9udGgsXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlLkxhc3RZZWFyLFxuICAgIFByZWNhbm5lZERhdGVSYW5nZS5UaGlzV2VlayxcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2UuVGhpc01vbnRoLFxuICAgIFByZWNhbm5lZERhdGVSYW5nZS5UaGlzWWVhcixcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2UuRXZlcnl0aGluZyxcbl07XG4vKipcbiAqIFRoZSBzZXQgb2YgZGF0ZSByYW5nZXMgd2hvc2Ugc3RhcnQgZGF0ZXMgYXJlIHRvZGF5LlxuICovXG5leHBvcnRzLkZyb21Ob3dEYXRlUmFuZ2VzID0gW1xuICAgIFByZWNhbm5lZERhdGVSYW5nZS5Ub2RheSxcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2UuTmV4dDdEYXlzLFxuICAgIFByZWNhbm5lZERhdGVSYW5nZS5OZXh0MzBEYXlzLFxuICAgIFByZWNhbm5lZERhdGVSYW5nZS5OZXh0OTBEYXlzLFxuICAgIFByZWNhbm5lZERhdGVSYW5nZS5OZXh0MTgwRGF5cyxcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2UuTmV4dDM2NURheXMsXG5dO1xuLyoqXG4gKiBTb21lIEFQSXMgcmVxdWlyZSByZWxhdGl2ZSBkYXRlcyBvbmx5LCBhc3N1bWluZyBcIm5vd1wiIGFzIGVpdGhlciB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBlZmZlY3RpdmUgcmFuZ2UuXG4gKiBCZWZvcmUgd2Ugc3VwcG9ydGVkIHtAbGluayBQYXJhbURlZi5hbGxvd2VkUHJlc2V0VmFsdWVzfSwgc29tZSBwYWNrcyBkZWNpZGVkIHRvIHVzZSBhIERhdGUgcGFyYW1ldGVyXG4gKiBmb3IgYW4gaW5wdXQgbGlrZSB0aGlzLCBiZWNhdXNlIG5vdCBhbGwge0BsaW5rIFByZWNhbm5lZERhdGVSYW5nZX0gdmFsdWVzIHdlcmUgdmFsaWQuXG4gKlxuICogV2Ugd2FudCBzdWNoIHBhY2tzIHRvIGJlIGFibGUgdG8gdXNlIHJlbGF0aXZlIGRhdGUgcmFuZ2VzIHdpdGhvdXQgbmVlZGluZyB0byBjaGFuZ2UgdGhlaXJcbiAqIHBhcmFtZXRlciB0eXBlLCB0byBtYWludGFpbiBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAqL1xudmFyIFByZWNhbm5lZERhdGU7XG4oZnVuY3Rpb24gKFByZWNhbm5lZERhdGUpIHtcbiAgICBQcmVjYW5uZWREYXRlW1wiVG9kYXlcIl0gPSBcInRvZGF5XCI7XG4gICAgUHJlY2FubmVkRGF0ZVtcIlllc3RlcmRheVwiXSA9IFwieWVzdGVyZGF5XCI7XG4gICAgUHJlY2FubmVkRGF0ZVtcIlRvbW9ycm93XCJdID0gXCJ0b21vcnJvd1wiO1xuICAgIFByZWNhbm5lZERhdGVbXCJEYXlzQWdvN1wiXSA9IFwiN19kYXlzX2Fnb1wiO1xuICAgIFByZWNhbm5lZERhdGVbXCJEYXlzQWdvMzBcIl0gPSBcIjMwX2RheXNfYWdvXCI7XG4gICAgUHJlY2FubmVkRGF0ZVtcIkRheXNBZ285MFwiXSA9IFwiOTBfZGF5c19hZ29cIjtcbiAgICBQcmVjYW5uZWREYXRlW1wiRGF5c0FnbzE4MFwiXSA9IFwiMTgwX2RheXNfYWdvXCI7XG4gICAgUHJlY2FubmVkRGF0ZVtcIkRheXNBZ28zNjVcIl0gPSBcIjM2NV9kYXlzX2Fnb1wiO1xuICAgIFByZWNhbm5lZERhdGVbXCJEYXlzQWhlYWQ3XCJdID0gXCI3X2RheXNfYWhlYWRcIjtcbiAgICBQcmVjYW5uZWREYXRlW1wiRGF5c0FoZWFkMzBcIl0gPSBcIjMwX2RheXNfYWhlYWRcIjtcbiAgICBQcmVjYW5uZWREYXRlW1wiRGF5c0FoZWFkOTBcIl0gPSBcIjkwX2RheXNfYWhlYWRcIjtcbiAgICBQcmVjYW5uZWREYXRlW1wiRGF5c0FoZWFkMTgwXCJdID0gXCIxODBfZGF5c19haGVhZFwiO1xuICAgIFByZWNhbm5lZERhdGVbXCJEYXlzQWhlYWQzNjVcIl0gPSBcIjM2NV9kYXlzX2FoZWFkXCI7XG59KShQcmVjYW5uZWREYXRlIHx8IChleHBvcnRzLlByZWNhbm5lZERhdGUgPSBQcmVjYW5uZWREYXRlID0ge30pKTtcbmV4cG9ydHMuQWxsUHJlY2FubmVkRGF0ZXMgPSBPYmplY3QudmFsdWVzKFByZWNhbm5lZERhdGUpO1xuLyoqXG4gKiBUaGUgc2V0IG9mIGxpdmUvcHJlY2FubmVkIGRhdGVzIHRoYXQgYXJlIHRvZGF5IG9yIGVhcmxpZXIuXG4gKi9cbmV4cG9ydHMuUGFzdExpdmVEYXRlcyA9IFtcbiAgICBQcmVjYW5uZWREYXRlLlRvZGF5LFxuICAgIFByZWNhbm5lZERhdGUuWWVzdGVyZGF5LFxuICAgIFByZWNhbm5lZERhdGUuRGF5c0FnbzcsXG4gICAgUHJlY2FubmVkRGF0ZS5EYXlzQWdvMzAsXG4gICAgUHJlY2FubmVkRGF0ZS5EYXlzQWdvOTAsXG4gICAgUHJlY2FubmVkRGF0ZS5EYXlzQWdvMTgwLFxuICAgIFByZWNhbm5lZERhdGUuRGF5c0FnbzM2NSxcbl07XG4vKipcbiAqIFRoZSBzZXQgb2YgbGl2ZS9wcmVjYW5uZWQgZGF0ZXMgdGhhdCBhcmUgdG9kYXkgb3IgbGF0ZXIuXG4gKi9cbmV4cG9ydHMuRnV0dXJlTGl2ZURhdGVzID0gW1xuICAgIFByZWNhbm5lZERhdGUuVG9kYXksXG4gICAgUHJlY2FubmVkRGF0ZS5Ub21vcnJvdyxcbiAgICBQcmVjYW5uZWREYXRlLkRheXNBaGVhZDcsXG4gICAgUHJlY2FubmVkRGF0ZS5EYXlzQWhlYWQzMCxcbiAgICBQcmVjYW5uZWREYXRlLkRheXNBaGVhZDkwLFxuICAgIFByZWNhbm5lZERhdGUuRGF5c0FoZWFkMTgwLFxuICAgIFByZWNhbm5lZERhdGUuRGF5c0FoZWFkMzY1LFxuXTtcbi8qKlxuICogQW4gZW51bSBkZWZpbmluZyBzcGVjaWFsIHR5cGVzIG9wdGlvbnMgaGFuZGxpbmcgZm9yIHByb3BlcnRpZXMuXG4gKi9cbnZhciBPcHRpb25zVHlwZTtcbihmdW5jdGlvbiAoT3B0aW9uc1R5cGUpIHtcbiAgICAvLyBUaGVzZSBhcmUgc3BlY2lhbCBzZW50aW5lbCB2YWx1ZXMgZm9yIHByb3BlcnR5IG9wdGlvbnMgZnVuY3Rpb25zIHRoYXQgYXJlbid0IG5hbWVkXG4gICAgLy8gYWZ0ZXIgdXNlci1kZWZpbmVkIHNjaGVtYSBwcm9wZXJ0aWVzLiBNYWtlIHN1cmUgdGhlIHZhbHVlcyBhcmVuJ3QgbGlrZWx5IHRvIGNvbGxpZGUgd2l0aFxuICAgIC8vIHVzZXItZGVmaW5lZCBwcm9wZXJ0aWVzLlxuICAgIC8qKlxuICAgICAqIFRoZSBwcm9wZXJ0eSdzIG9wdGlvbnMgc2hvdWxkIGJlIGdlbmVyYXRlZCBieSB0aGUgc3luYyB0YWJsZSdzXG4gICAgICoge0BsaW5rIER5bmFtaWNTeW5jVGFibGVPcHRpb25zLnByb3BlcnR5T3B0aW9uc30gZnVuY3Rpb24uXG4gICAgICovXG4gICAgT3B0aW9uc1R5cGVbXCJEeW5hbWljXCJdID0gXCJfX2NvZGFfZHluYW1pY19fXCI7XG59KShPcHRpb25zVHlwZSB8fCAoZXhwb3J0cy5PcHRpb25zVHlwZSA9IE9wdGlvbnNUeXBlID0ge30pKTtcbnZhciBUYWJsZVJvbGU7XG4oZnVuY3Rpb24gKFRhYmxlUm9sZSkge1xuICAgIFRhYmxlUm9sZVtcIlVzZXJzXCJdID0gXCJ1c2Vyc1wiO1xuICAgIFRhYmxlUm9sZVtcIkdyb3VwTWVtYmVyc1wiXSA9IFwiZ3JvdXBNZW1iZXJzXCI7XG59KShUYWJsZVJvbGUgfHwgKGV4cG9ydHMuVGFibGVSb2xlID0gVGFibGVSb2xlID0ge30pKTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZW5zdXJlTmV2ZXIgPSBleHBvcnRzLmFzc2VydENvbmRpdGlvbiA9IGV4cG9ydHMuZW5zdXJlRXhpc3RzID0gZXhwb3J0cy5lbnN1cmVOb25FbXB0eVN0cmluZyA9IGV4cG9ydHMuZW5zdXJlVW5yZWFjaGFibGUgPSB2b2lkIDA7XG5jb25zdCBhcGlfMSA9IHJlcXVpcmUoXCIuLi9hcGlcIik7XG4vKipcbiAqIEhlbHBlciBmb3IgVHlwZVNjcmlwdCB0byBtYWtlIHN1cmUgdGhhdCBoYW5kbGluZyBvZiBjb2RlIGZvcmtzIGlzIGV4aGF1c3RpdmUsXG4gKiBtb3N0IGNvbW1vbmx5IHdpdGggYSBgc3dpdGNoYCBzdGF0ZW1lbnQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogZW51bSBNeUVudW0ge1xuICogICBGb28gPSAnRm9vJyxcbiAqICAgQmFyID0gJ0JhcicsXG4gKiB9XG4gKlxuICogZnVuY3Rpb24gaGFuZGxlRW51bSh2YWx1ZTogTXlFbnVtKSB7XG4gKiAgIHN3aXRjaCh2YWx1ZSkge1xuICogICAgIGNhc2UgTXlFbnVtLkZvbzpcbiAqICAgICAgIHJldHVybiAnZm9vJztcbiAqICAgICBjYXNlIE15RW51bS5CYXI6XG4gKiAgICAgICByZXR1cm4gJ2Jhcic7XG4gKiAgICAgZGVmYXVsdDpcbiAqICAgICAgIC8vIFRoaXMgY29kZSBpcyB1bnJlYWNoYWJsZSBzaW5jZSB0aGUgdHdvIGNhc2VzIGFib3ZlIGFyZSBleGhhdXN0aXZlLlxuICogICAgICAgLy8gSG93ZXZlciwgaWYgYSB0aGlyZCB2YWx1ZSB3ZXJlIGFkZGVkIHRvIE15RW51bSwgVHlwZVNjcmlwdCB3b3VsZCBmbGFnXG4gKiAgICAgICAvLyBhbiBlcnJvciBhdCB0aGlzIGxpbmUsIGluZm9ybWluZyB5b3UgdGhhdCB5b3UgbmVlZCB0byB1cGRhdGUgdGhpcyBwaWVjZSBvZiBjb2RlLlxuICogICAgICAgcmV0dXJuIGVuc3VyZVVucmVhY2hhYmxlKHZhbHVlKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmZ1bmN0aW9uIGVuc3VyZVVucmVhY2hhYmxlKHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgYFVucmVhY2hhYmxlIGNvZGUgaGl0IHdpdGggdmFsdWUgJHtTdHJpbmcodmFsdWUpfWApO1xufVxuZXhwb3J0cy5lbnN1cmVVbnJlYWNoYWJsZSA9IGVuc3VyZVVucmVhY2hhYmxlO1xuLyoqXG4gKiBIZWxwZXIgdG8gY2hlY2sgdGhhdCBhIGdpdmVuIHZhbHVlIGlzIGEgc3RyaW5nLCBhbmQgaXMgbm90IHRoZSBlbXB0eSBzdHJpbmcuXG4gKiBJZiB0aGUgdmFsdWUgaXMgbm90IGEgc3RyaW5nIG9yIGlzIGVtcHR5LCBhbiBlcnJvciB3aWxsIGJlIHJhaXNlZCBhdCBydW50aW1lLlxuICovXG5mdW5jdGlvbiBlbnN1cmVOb25FbXB0eVN0cmluZyh2YWx1ZSwgbWVzc2FnZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgKGdldEVycm9yQ29uc3RydWN0b3IobWVzc2FnZSkpKG1lc3NhZ2UgfHwgYEV4cGVjdGVkIG5vbi1lbXB0eSBzdHJpbmcgZm9yICR7U3RyaW5nKHZhbHVlKX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0cy5lbnN1cmVOb25FbXB0eVN0cmluZyA9IGVuc3VyZU5vbkVtcHR5U3RyaW5nO1xuLyoqXG4gKiBIZWxwZXIgdG8gY2hlY2sgdGhhdCBhIGdpdmVuIHZhbHVlIGlzIGRlZmluZWQsIHRoYXQgaXMsIGlzIG5laXRoZXIgYHVuZGVmaW5lZGAgbm9yIGBudWxsYC5cbiAqIElmIHRoZSB2YWx1ZSBpcyBgdW5kZWZpbmVkYCBvciBgbnVsbGAsIGFuIGVycm9yIHdpbGwgYmUgcmFpc2VkIGF0IHJ1bnRpbWUuXG4gKlxuICogVGhpcyBpcyB0eXBpY2FsbHkgdXNlZCB0byBpbmZvcm0gVHlwZVNjcmlwdCB0aGF0IHlvdSBleHBlY3QgYSBnaXZlbiB2YWx1ZSB0byBhbHdheXMgZXhpc3QuXG4gKiBDYWxsaW5nIHRoaXMgZnVuY3Rpb24gcmVmaW5lcyBhIHR5cGUgdGhhdCBjYW4gb3RoZXJ3aXNlIGJlIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5mdW5jdGlvbiBlbnN1cmVFeGlzdHModmFsdWUsIG1lc3NhZ2UpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgKGdldEVycm9yQ29uc3RydWN0b3IobWVzc2FnZSkpKG1lc3NhZ2UgfHwgYEV4cGVjdGVkIHZhbHVlIGZvciAke1N0cmluZyh2YWx1ZSl9YCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydHMuZW5zdXJlRXhpc3RzID0gZW5zdXJlRXhpc3RzO1xuZnVuY3Rpb24gZ2V0RXJyb3JDb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2UgPyBhcGlfMS5Vc2VyVmlzaWJsZUVycm9yIDogRXJyb3I7XG59XG4vKipcbiAqIEhlbHBlciB0byBhcHBseSBhIFR5cGVTY3JpcHQgYXNzZXJ0aW9uIHRvIHN1YnNlcXVlbnQgY29kZS4gVHlwZVNjcmlwdCBjYW4gaW5mZXJcbiAqIHR5cGUgaW5mb3JtYXRpb24gZnJvbSBtYW55IGV4cHJlc3Npb25zLCBhbmQgdGhpcyBoZWxwZXIgYXBwbGllcyB0aG9zZSBpbmZlcmVuY2VzXG4gKiB0byBhbGwgY29kZSB0aGF0IGZvbGxvd3MgY2FsbCB0byB0aGlzIGZ1bmN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL3d3dy50eXBlc2NyaXB0bGFuZy5vcmcvZG9jcy9oYW5kYm9vay9yZWxlYXNlLW5vdGVzL3R5cGVzY3JpcHQtMy03Lmh0bWwjYXNzZXJ0aW9uLWZ1bmN0aW9uc1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGZ1bmN0aW9uIGZvbyh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gKiAgIGFzc2VydENvbmR0aW9uKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpO1xuICogICAvLyBUeXBlU2NyaXB0IHdvdWxkIG90aGVyd2lzZSBjb21wYWxpbiwgYmVjYXVzZSBgdmFsdWVgIGNvdWxkIGhhdmUgYmVlbiBudW1iZXIsXG4gKiAgIC8vIGJ1dCB0aGUgYWJvdmUgYXNzZXJ0aW9uIHJlZmluZXMgdGhlIHR5cGUgYmFzZWQgb24gdGhlIGB0eXBlb2ZgIGV4cHJlc3Npb24uXG4gKiAgIHJldHVybiB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICogfVxuICogYGBgXG4gKi9cbmZ1bmN0aW9uIGFzc2VydENvbmRpdGlvbihjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgKGdldEVycm9yQ29uc3RydWN0b3IobWVzc2FnZSkpKG1lc3NhZ2UgfHwgJ0Fzc2VydGlvbiBmYWlsZWQnKTtcbiAgICB9XG59XG5leHBvcnRzLmFzc2VydENvbmRpdGlvbiA9IGFzc2VydENvbmRpdGlvbjtcbi8qKlxuICogSGVscGVyIHRvIGNoZWNrIHRoYXQgYSBnaXZlbiB0eXBlIGlzIGVtcHR5L25ldmVyIGF0IGNvbXBpbGUgdGltZS5cbiAqIEluIHBhcnRpY3VsYXIsIHVzZWZ1bCB0byBjaGVjayB3aGV0aGVyIGEgZ2l2ZW4gYSBvYmplY3QgaXMgZW1wdHkgdmlhIGBlbnN1cmVOZXZlcjxrZXlvZiB0eXBlb2Ygb2JqPigpYC5cbiAqL1xuZnVuY3Rpb24gZW5zdXJlTmV2ZXIoXykgeyB9XG5leHBvcnRzLmVuc3VyZU5ldmVyID0gZW5zdXJlTmV2ZXI7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmlzUHJvbWlzZSA9IGV4cG9ydHMuZGVlcENvcHkgPSBleHBvcnRzLmlzTmlsID0gZXhwb3J0cy5pc0RlZmluZWQgPSBleHBvcnRzLmRlZXBGcmVlemUgPSB2b2lkIDA7XG5mdW5jdGlvbiBkZWVwRnJlZXplKG9iaikge1xuICAgIE9iamVjdC5mcmVlemUob2JqKTtcbiAgICBmb3IgKGNvbnN0IGsgb2YgT2JqZWN0LmtleXMob2JqKSkge1xuICAgICAgICBjb25zdCBrZXkgPSBrO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSAmJiAhT2JqZWN0LmlzRnJvemVuKHZhbHVlKSkge1xuICAgICAgICAgICAgZGVlcEZyZWV6ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmV4cG9ydHMuZGVlcEZyZWV6ZSA9IGRlZXBGcmVlemU7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgdmFsdWUgaXMgYWN0dWFsbHkgZGVmaW5lZCwgaS5lLiBpcyBhbnl0aGluZyBvdGhlciB0aGFuIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5mdW5jdGlvbiBpc0RlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuICFpc05pbChvYmopO1xufVxuZXhwb3J0cy5pc0RlZmluZWQgPSBpc0RlZmluZWQ7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgdmFsdWUgaGFzIG5vdCBiZWVuIGRlZmluZWQsIGkuZS4gaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmZ1bmN0aW9uIGlzTmlsKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJyB8fCBvYmogPT09IG51bGw7XG59XG5leHBvcnRzLmlzTmlsID0gaXNOaWw7XG5mdW5jdGlvbiBkZWVwQ29weShvYmopIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cbmV4cG9ydHMuZGVlcENvcHkgPSBkZWVwQ29weTtcbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBhIFByb21pc2UuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICd0aGVuJyBpbiBvYmo7XG59XG5leHBvcnRzLmlzUHJvbWlzZSA9IGlzUHJvbWlzZTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucG9zdFNldHVwTWV0YWRhdGFIZWxwZXIgPSBleHBvcnRzLnNldEVuZHBvaW50RGVmSGVscGVyID0gZXhwb3J0cy5zZXRFbmRwb2ludEhlbHBlciA9IGV4cG9ydHMucGFyYW1EZWZIZWxwZXIgPSBleHBvcnRzLm9iamVjdFNjaGVtYUhlbHBlciA9IHZvaWQgMDtcbmNvbnN0IGVuc3VyZV8xID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvZW5zdXJlXCIpO1xuY29uc3QgZW5zdXJlXzIgPSByZXF1aXJlKFwiLi4vaGVscGVycy9lbnN1cmVcIik7XG5mdW5jdGlvbiBvYmplY3RTY2hlbWFIZWxwZXIoc2NoZW1hKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RTY2hlbWFIZWxwZXIoc2NoZW1hKTtcbn1cbmV4cG9ydHMub2JqZWN0U2NoZW1hSGVscGVyID0gb2JqZWN0U2NoZW1hSGVscGVyO1xuY2xhc3MgT2JqZWN0U2NoZW1hSGVscGVyIHtcbiAgICBjb25zdHJ1Y3RvcihzY2hlbWEpIHtcbiAgICAgICAgdGhpcy5fc2NoZW1hID0gc2NoZW1hO1xuICAgICAgICB0aGlzLl9jaGVja0FnYWluc3RBbGxQcm9wZXJ0aWVzKHNjaGVtYSk7XG4gICAgfVxuICAgIC8vIFRoaXMgbWV0aG9kIGRvZXNuJ3QgZG8gYW55dGhpbmcsIGJ1dCBpdCBnaXZlcyBkZXZlbG9wZXJzIGEgY2hhbmNlIHRvIGRvdWJsZS1jaGVjayBpZiB0aGV5J3ZlIGZvcmdvdHRlblxuICAgIC8vIHRvIHVwZGF0ZSBhIGNsaWVudCBvZiBPYmplY3RTY2hlbWFIZWxwZXIgd2hlbiB0aGV5IGFkZCBhIG5ldyBwcm9wZXJ0eSB0byBPYmplY3RTY2hlbWFEZWZpbml0aW9uLlxuICAgIC8vIEZvciBleGFtcGxlLCBjb2RhLm1ha2VSZWZlcmVuY2VTY2hlbWFGcm9tT2JqZWN0U2NoZW1hKCkgZGVwZW5kcyBvbiBPYmplY3RTY2hlbWFIZWxwZXIgc28gaWYgeW91XG4gICAgLy8gYWRkIGEgbmV3IHNjaGVtYSBvcHRpb24gcmVsYXRlZCB0byBwcm9wZXJ0eSBvcHRpb25zIHlvdSB3b3VsZCBsaWtlbHkgbmVlZCB0byBhZGQgaXQgdG8gT2JqZWN0U2NoZW1hSGVscGVyXG4gICAgLy8gYW5kIHByb3BhZ2F0ZSBpdCB0aHJvdWdoIGNvZGEubWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWEoKSBhbHNvLlxuICAgIF9jaGVja0FnYWluc3RBbGxQcm9wZXJ0aWVzKHNjaGVtYSkge1xuICAgICAgICBjb25zdCB7IFxuICAgICAgICAvLyBQcm9wZXJ0aWVzIG5lZWRlZCBieSBPYmplY3RTY2hlbWFIZWxwZXIgY2xpZW50cy5cbiAgICAgICAgaWQsIGlkUHJvcGVydHksIHByaW1hcnksIGRpc3BsYXlQcm9wZXJ0eSwgZmVhdHVyZWRQcm9wZXJ0aWVzLCBmZWF0dXJlZCwgaWRlbnRpdHksIG9wdGlvbnMsIHByb3BlcnRpZXMsIHR5cGUsIGF0dHJpYnV0aW9uLCBjb2RhVHlwZSwgcmVxdWlyZUZvclVwZGF0ZXMsIFxuICAgICAgICAvLyBQcm9wZXJ0aWVzIG5vdCBuZWVkZWQgYnkgT2JqZWN0U2NoZW1hSGVscGVyIGNsaWVudHMuXG4gICAgICAgIGluY2x1ZGVVbmtub3duUHJvcGVydGllcywgdGl0bGVQcm9wZXJ0eSwgbGlua1Byb3BlcnR5LCBzdWJ0aXRsZVByb3BlcnRpZXMsIHNuaXBwZXRQcm9wZXJ0eSwgaW1hZ2VQcm9wZXJ0eSwgZGVzY3JpcHRpb24sIGNyZWF0ZWRBdFByb3BlcnR5LCBjcmVhdGVkQnlQcm9wZXJ0eSwgbW9kaWZpZWRBdFByb3BlcnR5LCBtb2RpZmllZEJ5UHJvcGVydHksIHVzZXJFbWFpbFByb3BlcnR5LCB1c2VySWRQcm9wZXJ0eSwgZ3JvdXBJZFByb3BlcnR5LCBtZW1iZXJHcm91cElkUHJvcGVydHksIHZlcnNpb25Qcm9wZXJ0eSwgaW5kZXgsIHBhcmVudCwgLi4ucmVzdCB9ID0gc2NoZW1hO1xuICAgICAgICAoMCwgZW5zdXJlXzIuZW5zdXJlTmV2ZXIpKCk7XG4gICAgfVxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5fc2NoZW1hLmlkUHJvcGVydHkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX3NjaGVtYS5pZDtcbiAgICB9XG4gICAgZ2V0IHByaW1hcnkoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuX3NjaGVtYS5kaXNwbGF5UHJvcGVydHkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX3NjaGVtYS5wcmltYXJ5O1xuICAgIH1cbiAgICBnZXQgZmVhdHVyZWQoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuX3NjaGVtYS5mZWF0dXJlZFByb3BlcnRpZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX3NjaGVtYS5mZWF0dXJlZDtcbiAgICB9XG4gICAgZ2V0IGlkZW50aXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NoZW1hLmlkZW50aXR5O1xuICAgIH1cbiAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVtYS5vcHRpb25zO1xuICAgIH1cbiAgICBnZXQgcHJvcGVydGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVtYS5wcm9wZXJ0aWVzO1xuICAgIH1cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVtYS50eXBlO1xuICAgIH1cbiAgICBnZXQgYXR0cmlidXRpb24oKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLl9zY2hlbWEuYXR0cmlidXRpb24pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IChfYiA9IHRoaXMuX3NjaGVtYS5pZGVudGl0eSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmF0dHJpYnV0aW9uO1xuICAgIH1cbiAgICBnZXQgY29kYVR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2hlbWEuY29kYVR5cGU7XG4gICAgfVxuICAgIGdldCByZXF1aXJlRm9yVXBkYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVtYS5yZXF1aXJlRm9yVXBkYXRlcztcbiAgICB9XG4gICAgZ2V0IHRpdGxlUHJvcGVydHkoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuX3NjaGVtYS50aXRsZVByb3BlcnR5KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0aGlzLl9zY2hlbWEuZGlzcGxheVByb3BlcnR5O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBhcmFtRGVmSGVscGVyKGRlZikge1xuICAgIHJldHVybiBuZXcgUGFyYW1EZWZIZWxwZXIoZGVmKTtcbn1cbmV4cG9ydHMucGFyYW1EZWZIZWxwZXIgPSBwYXJhbURlZkhlbHBlcjtcbmNsYXNzIFBhcmFtRGVmSGVscGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZWYpIHtcbiAgICAgICAgdGhpcy5fZGVmID0gZGVmO1xuICAgIH1cbiAgICBnZXQgZGVmYXVsdFZhbHVlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLl9kZWYuc3VnZ2VzdGVkVmFsdWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX2RlZi5kZWZhdWx0VmFsdWU7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0RW5kcG9pbnRIZWxwZXIoc3RlcCkge1xuICAgIHJldHVybiBuZXcgU2V0RW5kcG9pbnRIZWxwZXIoc3RlcCk7XG59XG5leHBvcnRzLnNldEVuZHBvaW50SGVscGVyID0gc2V0RW5kcG9pbnRIZWxwZXI7XG5jbGFzcyBTZXRFbmRwb2ludEhlbHBlciB7XG4gICAgY29uc3RydWN0b3Ioc3RlcCkge1xuICAgICAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB9XG4gICAgZ2V0IGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKChfYSA9IHRoaXMuX3N0ZXAuZ2V0T3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc3RlcC5nZXRPcHRpb25zRm9ybXVsYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0RW5kcG9pbnREZWZIZWxwZXIoc3RlcCkge1xuICAgIHJldHVybiBuZXcgU2V0RW5kcG9pbnREZWZIZWxwZXIoc3RlcCk7XG59XG5leHBvcnRzLnNldEVuZHBvaW50RGVmSGVscGVyID0gc2V0RW5kcG9pbnREZWZIZWxwZXI7XG5jbGFzcyBTZXRFbmRwb2ludERlZkhlbHBlciB7XG4gICAgY29uc3RydWN0b3Ioc3RlcCkge1xuICAgICAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB9XG4gICAgZ2V0IGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKChfYSA9IHRoaXMuX3N0ZXAuZ2V0T3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc3RlcC5nZXRPcHRpb25zRm9ybXVsYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcG9zdFNldHVwTWV0YWRhdGFIZWxwZXIobWV0YWRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFBvc3RTZXR1cE1ldGFkYXRhSGVscGVyKG1ldGFkYXRhKTtcbn1cbmV4cG9ydHMucG9zdFNldHVwTWV0YWRhdGFIZWxwZXIgPSBwb3N0U2V0dXBNZXRhZGF0YUhlbHBlcjtcbmNsYXNzIFBvc3RTZXR1cE1ldGFkYXRhSGVscGVyIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRhZGF0YSkge1xuICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgIH1cbiAgICBnZXQgZ2V0T3B0aW9ucygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKDAsIGVuc3VyZV8xLmVuc3VyZUV4aXN0cykoKF9hID0gdGhpcy5fbWV0YWRhdGEuZ2V0T3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fbWV0YWRhdGEuZ2V0T3B0aW9uc0Zvcm11bGEpO1xuICAgIH1cbn1cbiIsICIvKiFcbiAqIHBhc2NhbGNhc2UgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3Bhc2NhbGNhc2U+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEpvbiAoXCJTY2hsaW5rXCIpIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgdGl0bGVjYXNlID0gaW5wdXQgPT4gaW5wdXRbMF0udG9Mb2NhbGVVcHBlckNhc2UoKSArIGlucHV0LnNsaWNlKDEpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDApIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuICcnO1xuXG4gIGxldCBpbnB1dCA9IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICBpZiAoaW5wdXQgPT09ICcnKSByZXR1cm4gJyc7XG4gIGlmIChpbnB1dC5sZW5ndGggPT09IDEpIHJldHVybiBpbnB1dC50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuXG4gIGxldCBtYXRjaCA9IGlucHV0Lm1hdGNoKC9bYS16QS1aMC05XSsvZyk7XG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiBtYXRjaC5tYXAobSA9PiB0aXRsZWNhc2UobSkpLmpvaW4oJycpO1xuICB9XG5cbiAgcmV0dXJuIGlucHV0O1xufTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGhyb3dPbkR5bmFtaWNTY2hlbWFXaXRoSnNPcHRpb25zRnVuY3Rpb24gPSBleHBvcnRzLndpdGhJZGVudGl0eSA9IGV4cG9ydHMubWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWEgPSBleHBvcnRzLm5vcm1hbGl6ZU9iamVjdFNjaGVtYSA9IGV4cG9ydHMubm9ybWFsaXplU2NoZW1hID0gZXhwb3J0cy5ub3JtYWxpemVQcm9wZXJ0eVZhbHVlUGF0aEludG9TY2hlbWFQYXRoID0gZXhwb3J0cy5pc0N1c3RvbUluZGV4RGVmaW5pdGlvbiA9IGV4cG9ydHMuaXNDYXRlZ29yaXphdGlvbkluZGV4RGVmaW5pdGlvbiA9IGV4cG9ydHMubm9ybWFsaXplU2NoZW1hS2V5UGF0aCA9IGV4cG9ydHMubm9ybWFsaXplU2NoZW1hS2V5ID0gZXhwb3J0cy5tYWtlT2JqZWN0U2NoZW1hID0gZXhwb3J0cy5tYWtlU2NoZW1hID0gZXhwb3J0cy5nZW5lcmF0ZVNjaGVtYSA9IGV4cG9ydHMubWF5YmVVbndyYXBBcnJheVNjaGVtYSA9IGV4cG9ydHMubWF5YmVTY2hlbWFPcHRpb25zVmFsdWUgPSBleHBvcnRzLnVud3JhcHBlZFNjaGVtYVN1cHBvcnRzT3B0aW9ucyA9IGV4cG9ydHMuaXNBcnJheSA9IGV4cG9ydHMuaXNPYmplY3QgPSBleHBvcnRzLm1ha2VBdHRyaWJ1dGlvbk5vZGUgPSBleHBvcnRzLkF0dHJpYnV0aW9uTm9kZVR5cGUgPSBleHBvcnRzLlBlcm1pc3Npb25UeXBlID0gZXhwb3J0cy5QcmluY2lwYWxUeXBlID0gZXhwb3J0cy5MaWZlY3ljbGVCZWhhdmlvciA9IGV4cG9ydHMuUGVybWlzc2lvbnNCZWhhdmlvciA9IGV4cG9ydHMuQ29udGVudENhdGVnb3JpemF0aW9uVHlwZSA9IGV4cG9ydHMuSW5kZXhpbmdTdHJhdGVneSA9IGV4cG9ydHMuUHJvcGVydHlMYWJlbFZhbHVlVGVtcGxhdGUgPSBleHBvcnRzLlNpbXBsZVN0cmluZ0hpbnRWYWx1ZVR5cGVzID0gZXhwb3J0cy5EdXJhdGlvblVuaXQgPSBleHBvcnRzLkltYWdlU2hhcGVTdHlsZSA9IGV4cG9ydHMuSW1hZ2VDb3JuZXJTdHlsZSA9IGV4cG9ydHMuSW1hZ2VPdXRsaW5lID0gZXhwb3J0cy5MaW5rRGlzcGxheVR5cGUgPSBleHBvcnRzLkVtYWlsRGlzcGxheVR5cGUgPSBleHBvcnRzLlNjYWxlSWNvblNldCA9IGV4cG9ydHMuQ3VycmVuY3lGb3JtYXQgPSBleHBvcnRzLkF1dG9jb21wbGV0ZUhpbnRWYWx1ZVR5cGVzID0gZXhwb3J0cy5PYmplY3RIaW50VmFsdWVUeXBlcyA9IGV4cG9ydHMuQm9vbGVhbkhpbnRWYWx1ZVR5cGVzID0gZXhwb3J0cy5OdW1iZXJIaW50VmFsdWVUeXBlcyA9IGV4cG9ydHMuU3RyaW5nSGludFZhbHVlVHlwZXMgPSBleHBvcnRzLlZhbHVlSGludFR5cGUgPSBleHBvcnRzLlZhbHVlVHlwZSA9IHZvaWQgMDtcbmNvbnN0IGVuc3VyZV8xID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5jb25zdCBvYmplY3RfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvb2JqZWN0X3V0aWxzXCIpO1xuY29uc3QgZW5zdXJlXzIgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbmNvbnN0IGVuc3VyZV8zID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5jb25zdCBlbnN1cmVfNCA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuY29uc3QgZW5zdXJlXzUgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbmNvbnN0IG1pZ3JhdGlvbl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9taWdyYXRpb25cIik7XG5jb25zdCBwYXNjYWxjYXNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInBhc2NhbGNhc2VcIikpO1xuLy8gRGVmaW5lcyBhIHN1YnNldCBvZiB0aGUgSlNPTiBPYmplY3Qgc2NoZW1hIGZvciB1c2UgaW4gYW5ub3RhdGluZyBBUEkgcmVzdWx0cy5cbi8vIGh0dHA6Ly9qc29uLXNjaGVtYS5vcmcvbGF0ZXN0L2pzb24tc2NoZW1hLWNvcmUuaHRtbCNyZmMuc2VjdGlvbi44LjJcbi8qKlxuICogVGhlIHNldCBvZiBwcmltaXRpdmUgdmFsdWUgdHlwZXMgdGhhdCBjYW4gYmUgdXNlZCBhcyByZXR1cm4gdmFsdWVzIGZvciBmb3JtdWxhc1xuICogb3IgaW4gb2JqZWN0IHNjaGVtYXMuXG4gKi9cbnZhciBWYWx1ZVR5cGU7XG4oZnVuY3Rpb24gKFZhbHVlVHlwZSkge1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIEphdmFTY3JpcHQgYm9vbGVhbiAodHJ1ZS9mYWxzZSkgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIFZhbHVlVHlwZVtcIkJvb2xlYW5cIl0gPSBcImJvb2xlYW5cIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBKYXZhU2NyaXB0IG51bWJlciBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICovXG4gICAgVmFsdWVUeXBlW1wiTnVtYmVyXCJdID0gXCJudW1iZXJcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBKYXZhU2NyaXB0IHN0cmluZyBzaG91bGQgYmUgcmV0dXJuZWQuXG4gICAgICovXG4gICAgVmFsdWVUeXBlW1wiU3RyaW5nXCJdID0gXCJzdHJpbmdcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBKYXZhU2NyaXB0IGFycmF5IHNob3VsZCBiZSByZXR1cm5lZC4gVGhlIHNjaGVtYSBvZiB0aGUgYXJyYXkgaXRlbXMgbXVzdCBhbHNvIGJlIHNwZWNpZmllZC5cbiAgICAgKi9cbiAgICBWYWx1ZVR5cGVbXCJBcnJheVwiXSA9IFwiYXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBKYXZhU2NyaXB0IG9iamVjdCBzaG91bGQgYmUgcmV0dXJuZWQuIFRoZSBzY2hlbWEgb2YgZWFjaCBvYmplY3QgcHJvcGVydHkgbXVzdCBhbHNvIGJlIHNwZWNpZmllZC5cbiAgICAgKi9cbiAgICBWYWx1ZVR5cGVbXCJPYmplY3RcIl0gPSBcIm9iamVjdFwiO1xufSkoVmFsdWVUeXBlIHx8IChleHBvcnRzLlZhbHVlVHlwZSA9IFZhbHVlVHlwZSA9IHt9KSk7XG4vKipcbiAqIFN5bnRoZXRpYyB0eXBlcyB0aGF0IGluc3RydWN0IENvZGEgaG93IHRvIGNvZXJjZSB2YWx1ZXMgZnJvbSBwcmltaXRpdmVzIGF0IGluZ2VzdGlvbiB0aW1lLlxuICovXG52YXIgVmFsdWVIaW50VHlwZTtcbihmdW5jdGlvbiAoVmFsdWVIaW50VHlwZSkge1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgdGhlIHZhbHVlIGFzIGEgZGF0ZSAoZS5nLiBNYXJjaCAzLCAyMDIxKS5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiRGF0ZVwiXSA9IFwiZGF0ZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgdGhlIHZhbHVlIGFzIGEgdGltZSAoZS5nLiA1OjI0cG0pLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJUaW1lXCJdID0gXCJ0aW1lXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCB0aGUgdmFsdWUgYXMgYSBkYXRldGltZSAoZS5nLiBNYXJjaCAzLCAyMDIxIGF0IDU6MjRwbSkuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkRhdGVUaW1lXCJdID0gXCJkYXRldGltZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgdGhlIHZhbHVlIGFzIGEgZHVyYXRpb24gKGUuZy4gMyBob3VycykuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkR1cmF0aW9uXCJdID0gXCJkdXJhdGlvblwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgdGhlIHZhbHVlIGFzIGFuIGVtYWlsIGFkZHJlc3MgKGUuZy4gam9lQGZvby5jb20pLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJFbWFpbFwiXSA9IFwiZW1haWxcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgdGhlIHZhbHVlIGFzIGEgQ29kYSBwZXJzb24gcmVmZXJlbmNlLiBUaGUgcHJvdmlkZWQgdmFsdWUgc2hvdWxkIGJlXG4gICAgICogYW4gb2JqZWN0IHdob3NlIGBpZGAgcHJvcGVydHkgaXMgYW4gZW1haWwgYWRkcmVzcywgd2hpY2ggQ29kYSB3aWxsIHRyeSB0byByZXNvbHZlIHRvIGEgdXNlclxuICAgICAqIGFuZCByZW5kZXIgYW4gQC1yZWZlcmVuY2UgdG8gdGhlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIG1ha2VPYmplY3RTY2hlbWEoe1xuICAgICAqICAgdHlwZTogVmFsdWVUeXBlLk9iamVjdCxcbiAgICAgKiAgIGNvZGFUeXBlOiBWYWx1ZUhpbnRUeXBlLlBlcnNvbixcbiAgICAgKiAgIGlkOiAnZW1haWwnLFxuICAgICAqICAgcHJpbWFyeTogJ25hbWUnLFxuICAgICAqICAgcHJvcGVydGllczoge1xuICAgICAqICAgICBlbWFpbDoge3R5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAgICAgKiAgICAgbmFtZToge3R5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAgICAgKiAgIH0sXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIlBlcnNvblwiXSA9IFwicGVyc29uXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCBhbmQgcmVuZGVyIHRoZSB2YWx1ZSBhcyBhIHBlcmNlbnRhZ2UuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIlBlcmNlbnRcIl0gPSBcInBlcmNlbnRcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgdGhlIHZhbHVlIGFzIGEgY3VycmVuY3kgdmFsdWUuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkN1cnJlbmN5XCJdID0gXCJjdXJyZW5jeVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgYW5kIHJlbmRlciB0aGUgdmFsdWUgYXMgYW4gaW1hZ2UuIFRoZSBwcm92aWRlZCB2YWx1ZSBzaG91bGQgYmUgYSBVUkwgdGhhdFxuICAgICAqIHBvaW50cyB0byBhbiBpbWFnZS4gQ29kYSB3aWxsIGhvdGxpbmsgdG8gdGhlIGltYWdlIHdoZW4gcmVuZGVyaW5nIGl0IGEgZG9jLlxuICAgICAqXG4gICAgICogVXNpbmcge0BsaW5rIEltYWdlQXR0YWNobWVudH0gaXMgcmVjb21tZW5kZWQgaW5zdGVhZCwgc28gdGhhdCB0aGUgaW1hZ2UgaXMgYWx3YXlzIGFjY2Vzc2libGVcbiAgICAgKiBhbmQgd29uJ3QgYXBwZWFyIGFzIGJyb2tlbiBpZiB0aGUgc291cmNlIGltYWdlIGlzIGxhdGVyIGRlbGV0ZWQuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkltYWdlUmVmZXJlbmNlXCJdID0gXCJpbWFnZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgYW5kIHJlbmRlciB0aGUgdmFsdWUgYXMgYW4gaW1hZ2UuIFRoZSBwcm92aWRlZCB2YWx1ZSBzaG91bGQgYmUgYSBVUkwgdGhhdFxuICAgICAqIHBvaW50cyB0byBhbiBpbWFnZS4gQ29kYSB3aWxsIGluZ2VzdCB0aGUgaW1hZ2UgYW5kIGhvc3QgaXQgZnJvbSBDb2RhIGluZnJhc3RydWN0dXJlLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJJbWFnZUF0dGFjaG1lbnRcIl0gPSBcImltYWdlQXR0YWNobWVudFwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgYW5kIHJlbmRlciB0aGUgdmFsdWUgYXMgYSBVUkwgbGluay5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiVXJsXCJdID0gXCJ1cmxcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGEgdGV4dCB2YWx1ZSBhcyBNYXJrZG93biwgd2hpY2ggd2lsbCBiZSBjb252ZXJ0ZWQgYW5kIHJlbmRlcmVkIGFzIENvZGEgcmljaCB0ZXh0LlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJNYXJrZG93blwiXSA9IFwibWFya2Rvd25cIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGEgdGV4dCB2YWx1ZSBhcyBIVE1MLCB3aGljaCB3aWxsIGJlIGNvbnZlcnRlZCBhbmQgcmVuZGVyZWQgYXMgQ29kYSByaWNoIHRleHQuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkh0bWxcIl0gPSBcImh0bWxcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgYSB2YWx1ZSBhcyBhbiBlbWJlZC4gVGhlIHByb3ZpZGVkIHZhbHVlIHNob3VsZCBiZSBhIFVSTCBwb2ludGluZ1xuICAgICAqIHRvIGFuIGVtYmVkZGFibGUgd2ViIHBhZ2UuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkVtYmVkXCJdID0gXCJlbWJlZFwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgYW5kIHJlbmRlciB0aGUgdmFsdWUgYXMgYSBDb2RhIEAtcmVmZXJlbmNlIHRvIGEgdGFibGUgcm93LiBUaGUgcHJvdmlkZWQgdmFsdWUgc2hvdWxkXG4gICAgICogYmUgYW4gb2JqZWN0IHdob3NlIGBpZGAgdmFsdWUgbWF0Y2hlcyB0aGUgaWQgb2Ygc29tZSByb3cgaW4gYSBzeW5jIHRhYmxlLiBUaGUgc2NoZW1hIHdoZXJlIHRoaXMgaGludCB0eXBlIGlzXG4gICAgICogdXNlZCBtdXN0IHNwZWNpZnkgYW4gaWRlbnRpdHkgdGhhdCBzcGVjaWZpZXMgdGhlIGRlc2lyZWQgc3luYyB0YWJsZS5cbiAgICAgKlxuICAgICAqIE5vcm1hbGx5IGEgcmVmZXJlbmNlIHNjaGVtYSBpcyBjb25zdHJ1Y3RlZCBmcm9tIHRoZSBzY2hlbWEgb2JqZWN0IGJlaW5nIHJlZmVyZW5jZWQgdXNpbmcgdGhlIGhlbHBlclxuICAgICAqIHtAbGluayBtYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYX0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIG1ha2VPYmplY3RTY2hlbWEoe1xuICAgICAqICAgdHlwZTogVmFsdWVUeXBlLk9iamVjdCxcbiAgICAgKiAgIGNvZGFUeXBlOiBWYWx1ZUhpbnRUeXBlLlJlZmVyZW5jZSxcbiAgICAgKiAgIGlkZW50aXR5OiB7XG4gICAgICogICAgIG5hbWU6IFwiU29tZVN5bmNUYWJsZUlkZW50aXR5XCJcbiAgICAgKiAgIH0sXG4gICAgICogICBpZDogJ2lkZW50aWZpZXInLFxuICAgICAqICAgcHJpbWFyeTogJ25hbWUnLFxuICAgICAqICAgcHJvcGVydGllczoge1xuICAgICAqICAgICBpZGVudGlmaWVyOiB7dHlwZTogVmFsdWVUeXBlLk51bWJlciwgcmVxdWlyZWQ6IHRydWV9LFxuICAgICAqICAgICBuYW1lOiB7dHlwZTogVmFsdWVUeXBlLlN0cmluZywgcmVxdWlyZWQ6IHRydWV9LFxuICAgICAqICAgfSxcbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiUmVmZXJlbmNlXCJdID0gXCJyZWZlcmVuY2VcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgYSB2YWx1ZSBhcyBhIGZpbGUgYXR0YWNobWVudC4gVGhlIHByb3ZpZGVkIHZhbHVlIHNob3VsZCBiZSBhIFVSTFxuICAgICAqIHBvaW50aW5nIHRvIGEgZmlsZSBvZiBhIENvZGEtc3VwcG9ydGVkIHR5cGUuIENvZGEgd2lsbCBpbmdlc3QgdGhlIGZpbGUgYW5kIGhvc3QgaXQgZnJvbSBDb2RhIGluZnJhc3RydWN0dXJlLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJBdHRhY2htZW50XCJdID0gXCJhdHRhY2htZW50XCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIHJlbmRlciBhIG51bWVyaWMgdmFsdWUgYXMgYSBzbGlkZXIgVUkgY29tcG9uZW50LlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJTbGlkZXJcIl0gPSBcInNsaWRlclwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byByZW5kZXIgYSBudW1lcmljIHZhbHVlIGFzIGEgc2NhbGUgVUkgY29tcG9uZW50IChlLmcuIGEgc3RhciByYXRpbmcpLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJTY2FsZVwiXSA9IFwic2NhbGVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gcmVuZGVyIGEgbnVtZXJpYyB2YWx1ZSBhcyBhIHByb2dyZXNzIGJhciBVSSBjb21wb25lbnQuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIlByb2dyZXNzQmFyXCJdID0gXCJwcm9ncmVzc0JhclwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byByZW5kZXIgYSBib29sZWFuIHZhbHVlIGFzIGEgdG9nZ2xlLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJUb2dnbGVcIl0gPSBcInRvZ2dsZVwiO1xuICAgIC8qKiBAaGlkZGVuICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkNvZGFJbnRlcm5hbFJpY2hUZXh0XCJdID0gXCJjb2RhSW50ZXJuYWxSaWNoVGV4dFwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byByZW5kZXIgYSB2YWx1ZSBhcyBhIHNlbGVjdCBsaXN0LlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJTZWxlY3RMaXN0XCJdID0gXCJzZWxlY3RMaXN0XCI7XG59KShWYWx1ZUhpbnRUeXBlIHx8IChleHBvcnRzLlZhbHVlSGludFR5cGUgPSBWYWx1ZUhpbnRUeXBlID0ge30pKTtcbmV4cG9ydHMuU3RyaW5nSGludFZhbHVlVHlwZXMgPSBbXG4gICAgVmFsdWVIaW50VHlwZS5BdHRhY2htZW50LFxuICAgIFZhbHVlSGludFR5cGUuRGF0ZSxcbiAgICBWYWx1ZUhpbnRUeXBlLlRpbWUsXG4gICAgVmFsdWVIaW50VHlwZS5EYXRlVGltZSxcbiAgICBWYWx1ZUhpbnRUeXBlLkR1cmF0aW9uLFxuICAgIFZhbHVlSGludFR5cGUuRW1haWwsXG4gICAgVmFsdWVIaW50VHlwZS5FbWJlZCxcbiAgICBWYWx1ZUhpbnRUeXBlLkh0bWwsXG4gICAgVmFsdWVIaW50VHlwZS5JbWFnZVJlZmVyZW5jZSxcbiAgICBWYWx1ZUhpbnRUeXBlLkltYWdlQXR0YWNobWVudCxcbiAgICBWYWx1ZUhpbnRUeXBlLk1hcmtkb3duLFxuICAgIFZhbHVlSGludFR5cGUuVXJsLFxuICAgIFZhbHVlSGludFR5cGUuQ29kYUludGVybmFsUmljaFRleHQsXG4gICAgVmFsdWVIaW50VHlwZS5TZWxlY3RMaXN0LFxuXTtcbmV4cG9ydHMuTnVtYmVySGludFZhbHVlVHlwZXMgPSBbXG4gICAgVmFsdWVIaW50VHlwZS5EYXRlLFxuICAgIFZhbHVlSGludFR5cGUuVGltZSxcbiAgICBWYWx1ZUhpbnRUeXBlLkRhdGVUaW1lLFxuICAgIFZhbHVlSGludFR5cGUuRHVyYXRpb24sXG4gICAgVmFsdWVIaW50VHlwZS5QZXJjZW50LFxuICAgIFZhbHVlSGludFR5cGUuQ3VycmVuY3ksXG4gICAgVmFsdWVIaW50VHlwZS5TbGlkZXIsXG4gICAgVmFsdWVIaW50VHlwZS5Qcm9ncmVzc0JhcixcbiAgICBWYWx1ZUhpbnRUeXBlLlNjYWxlLFxuXTtcbmV4cG9ydHMuQm9vbGVhbkhpbnRWYWx1ZVR5cGVzID0gW1ZhbHVlSGludFR5cGUuVG9nZ2xlXTtcbmV4cG9ydHMuT2JqZWN0SGludFZhbHVlVHlwZXMgPSBbVmFsdWVIaW50VHlwZS5QZXJzb24sIFZhbHVlSGludFR5cGUuUmVmZXJlbmNlLCBWYWx1ZUhpbnRUeXBlLlNlbGVjdExpc3RdO1xuZXhwb3J0cy5BdXRvY29tcGxldGVIaW50VmFsdWVUeXBlcyA9IFtWYWx1ZUhpbnRUeXBlLlNlbGVjdExpc3QsIFZhbHVlSGludFR5cGUuUmVmZXJlbmNlXTtcbi8qKlxuICogRW51bWVyYXRpb24gb2YgZm9ybWF0cyBzdXBwb3J0ZWQgYnkgc2NoZW1hcyB0aGF0IHVzZSB7QGxpbmsgVmFsdWVIaW50VHlwZS5DdXJyZW5jeX0uXG4gKlxuICogVGhlc2UgYWZmZWN0IGhvdyBhIG51bWVyaWMgdmFsdWUgaXMgcmVuZGVyZWQgaW4gZG9jcy5cbiAqL1xudmFyIEN1cnJlbmN5Rm9ybWF0O1xuKGZ1bmN0aW9uIChDdXJyZW5jeUZvcm1hdCkge1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGUgdmFsdWUgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgbnVtYmVyIHdpdGggYSBjdXJyZW5jeSBzeW1ib2wgYXMgYSBwcmVmaXgsIGUuZy4gYCQyLjUwYC5cbiAgICAgKi9cbiAgICBDdXJyZW5jeUZvcm1hdFtcIkN1cnJlbmN5XCJdID0gXCJjdXJyZW5jeVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGUgdmFsdWUgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgbnVtYmVyIHdpdGggYSBjdXJyZW5jeSBzeW1ib2wgYXMgYSBwcmVmaXgsIGJ1dCBwYWRkZWRcbiAgICAgKiB0byBhbGxvdyB0aGUgbnVtZXJpYyB2YWx1ZXMgdG8gbGluZSB1cCB2ZXJ0aWNhbGx5LCBlLmcuXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAkICAgICAgIDIuNTBcbiAgICAgKiAkICAgICAgMjkuOTlcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBDdXJyZW5jeUZvcm1hdFtcIkFjY291bnRpbmdcIl0gPSBcImFjY291bnRpbmdcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIHZhbHVlIHNob3VsZCBiZSByZW5kZXJlZCBhcyBhIG51bWJlciB3aXRob3V0IGEgY3VycmVuY3kgc3ltYm9sLCBlLmcuIGAyLjUwYC5cbiAgICAgKi9cbiAgICBDdXJyZW5jeUZvcm1hdFtcIkZpbmFuY2lhbFwiXSA9IFwiZmluYW5jaWFsXCI7XG59KShDdXJyZW5jeUZvcm1hdCB8fCAoZXhwb3J0cy5DdXJyZW5jeUZvcm1hdCA9IEN1cnJlbmN5Rm9ybWF0ID0ge30pKTtcbi8qKlxuICogSWNvbnMgdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGEge0BsaW5rIFNjYWxlU2NoZW1hfS5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgdG8gcmVuZGVyIGEgc3RhciByYXRpbmcsIHVzZSBhIHtAbGluayBTY2FsZVNjaGVtYX0gd2l0aCBgaWNvbjogY29kYS5TY2FsZUljb25TZXQuU3RhcmAuXG4gKi9cbnZhciBTY2FsZUljb25TZXQ7XG4oZnVuY3Rpb24gKFNjYWxlSWNvblNldCkge1xuICAgIFNjYWxlSWNvblNldFtcIlN0YXJcIl0gPSBcInN0YXJcIjtcbiAgICBTY2FsZUljb25TZXRbXCJDaXJjbGVcIl0gPSBcImNpcmNsZVwiO1xuICAgIFNjYWxlSWNvblNldFtcIkZpcmVcIl0gPSBcImZpcmVcIjtcbiAgICBTY2FsZUljb25TZXRbXCJCdWdcIl0gPSBcImJ1Z1wiO1xuICAgIFNjYWxlSWNvblNldFtcIkRpYW1vbmRcIl0gPSBcImRpYW1vbmRcIjtcbiAgICBTY2FsZUljb25TZXRbXCJCZWxsXCJdID0gXCJiZWxsXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiVGh1bWJzVXBcIl0gPSBcInRodW1ic3VwXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiSGVhcnRcIl0gPSBcImhlYXJ0XCI7XG4gICAgU2NhbGVJY29uU2V0W1wiQ2hpbGlcIl0gPSBcImNoaWxpXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiU21pbGV5XCJdID0gXCJzbWlsZXlcIjtcbiAgICBTY2FsZUljb25TZXRbXCJMaWdodG5pbmdcIl0gPSBcImxpZ2h0bmluZ1wiO1xuICAgIFNjYWxlSWNvblNldFtcIkN1cnJlbmN5XCJdID0gXCJjdXJyZW5jeVwiO1xuICAgIFNjYWxlSWNvblNldFtcIkNvZmZlZVwiXSA9IFwiY29mZmVlXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiUGVyc29uXCJdID0gXCJwZXJzb25cIjtcbiAgICBTY2FsZUljb25TZXRbXCJCYXR0ZXJ5XCJdID0gXCJiYXR0ZXJ5XCI7XG4gICAgU2NhbGVJY29uU2V0W1wiQ29ja3RhaWxcIl0gPSBcImNvY2t0YWlsXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiQ2xvdWRcIl0gPSBcImNsb3VkXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiU3VuXCJdID0gXCJzdW5cIjtcbiAgICBTY2FsZUljb25TZXRbXCJDaGVja21hcmtcIl0gPSBcImNoZWNrbWFya1wiO1xuICAgIFNjYWxlSWNvblNldFtcIkxpZ2h0QnVsYlwiXSA9IFwibGlnaHRidWxiXCI7XG59KShTY2FsZUljb25TZXQgfHwgKGV4cG9ydHMuU2NhbGVJY29uU2V0ID0gU2NhbGVJY29uU2V0ID0ge30pKTtcbi8qKlxuICogRGlzcGxheSB0eXBlcyB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYW4ge0BsaW5rIEVtYWlsU2NoZW1hfS5cbiAqL1xudmFyIEVtYWlsRGlzcGxheVR5cGU7XG4oZnVuY3Rpb24gKEVtYWlsRGlzcGxheVR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IGJvdGggaWNvbiBhbmQgZW1haWwgKGRlZmF1bHQpLlxuICAgICAqL1xuICAgIEVtYWlsRGlzcGxheVR5cGVbXCJJY29uQW5kRW1haWxcIl0gPSBcImljb25BbmRFbWFpbFwiO1xuICAgIC8qKlxuICAgICAqIERpc3BsYXkgaWNvbiBvbmx5LlxuICAgICAqL1xuICAgIEVtYWlsRGlzcGxheVR5cGVbXCJJY29uT25seVwiXSA9IFwiaWNvbk9ubHlcIjtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IGVtYWlsIGFkZHJlc3Mgb25seS5cbiAgICAgKi9cbiAgICBFbWFpbERpc3BsYXlUeXBlW1wiRW1haWxPbmx5XCJdID0gXCJlbWFpbE9ubHlcIjtcbn0pKEVtYWlsRGlzcGxheVR5cGUgfHwgKGV4cG9ydHMuRW1haWxEaXNwbGF5VHlwZSA9IEVtYWlsRGlzcGxheVR5cGUgPSB7fSkpO1xuLyoqXG4gKiBEaXNwbGF5IHR5cGVzIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBhIHtAbGluayBMaW5rU2NoZW1hfS5cbiAqL1xudmFyIExpbmtEaXNwbGF5VHlwZTtcbihmdW5jdGlvbiAoTGlua0Rpc3BsYXlUeXBlKSB7XG4gICAgLyoqXG4gICAgICogRGlzcGxheSBpY29uIG9ubHkuXG4gICAgICovXG4gICAgTGlua0Rpc3BsYXlUeXBlW1wiSWNvbk9ubHlcIl0gPSBcImljb25Pbmx5XCI7XG4gICAgLyoqXG4gICAgICogRGlzcGxheSBVUkwuXG4gICAgICovXG4gICAgTGlua0Rpc3BsYXlUeXBlW1wiVXJsXCJdID0gXCJ1cmxcIjtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHdlYiBwYWdlIHRpdGxlLlxuICAgICAqL1xuICAgIExpbmtEaXNwbGF5VHlwZVtcIlRpdGxlXCJdID0gXCJ0aXRsZVwiO1xuICAgIC8qKlxuICAgICAqIERpc3BsYXkgdGhlIHJlZmVyZW5jZWQgd2ViIHBhZ2UgYXMgYSBjYXJkLlxuICAgICAqL1xuICAgIExpbmtEaXNwbGF5VHlwZVtcIkNhcmRcIl0gPSBcImNhcmRcIjtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHRoZSByZWZlcmVuY2VkIHdlYiBwYWdlIGFzIGFuIGVtYmVkLlxuICAgICAqL1xuICAgIExpbmtEaXNwbGF5VHlwZVtcIkVtYmVkXCJdID0gXCJlbWJlZFwiO1xufSkoTGlua0Rpc3BsYXlUeXBlIHx8IChleHBvcnRzLkxpbmtEaXNwbGF5VHlwZSA9IExpbmtEaXNwbGF5VHlwZSA9IHt9KSk7XG4vKipcbiAqIFN0YXRlIG9mIG91dGxpbmUgb24gaW1hZ2VzIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBhIHtAbGluayBJbWFnZVNjaGVtYX0uXG4gKi9cbnZhciBJbWFnZU91dGxpbmU7XG4oZnVuY3Rpb24gKEltYWdlT3V0bGluZSkge1xuICAgIC8qKiBJbWFnZSBpcyByZW5kZXJlZCB3aXRob3V0IG91dGxpbmUuICovXG4gICAgSW1hZ2VPdXRsaW5lW1wiRGlzYWJsZWRcIl0gPSBcImRpc2FibGVkXCI7XG4gICAgLyoqIEltYWdlIGlzIHJlbmRlcmVkIHdpdGggb3V0bGluZS4gKi9cbiAgICBJbWFnZU91dGxpbmVbXCJTb2xpZFwiXSA9IFwic29saWRcIjtcbn0pKEltYWdlT3V0bGluZSB8fCAoZXhwb3J0cy5JbWFnZU91dGxpbmUgPSBJbWFnZU91dGxpbmUgPSB7fSkpO1xuLyoqXG4gKiBTdGF0ZSBvZiBjb3JuZXJzIG9uIGltYWdlcyB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYSB7QGxpbmsgSW1hZ2VTY2hlbWF9LlxuICovXG52YXIgSW1hZ2VDb3JuZXJTdHlsZTtcbihmdW5jdGlvbiAoSW1hZ2VDb3JuZXJTdHlsZSkge1xuICAgIC8qKiBJbWFnZSBpcyByZW5kZXJlZCB3aXRoIHJvdW5kZWQgY29ybmVycy4gKi9cbiAgICBJbWFnZUNvcm5lclN0eWxlW1wiUm91bmRlZFwiXSA9IFwicm91bmRlZFwiO1xuICAgIC8qKiBJbWFnZSBpcyByZW5kZXJlZCB3aXRoIHNxdWFyZSBjb3JuZXJzLiAqL1xuICAgIEltYWdlQ29ybmVyU3R5bGVbXCJTcXVhcmVcIl0gPSBcInNxdWFyZVwiO1xufSkoSW1hZ2VDb3JuZXJTdHlsZSB8fCAoZXhwb3J0cy5JbWFnZUNvcm5lclN0eWxlID0gSW1hZ2VDb3JuZXJTdHlsZSA9IHt9KSk7XG4vKipcbiAqIEltYWdlIHNoYXBlIHN0eWxlcyBzdXBwb3J0ZWQgYnkge0BsaW5rIEltYWdlU2NoZW1hfS5cbiAqL1xudmFyIEltYWdlU2hhcGVTdHlsZTtcbihmdW5jdGlvbiAoSW1hZ2VTaGFwZVN0eWxlKSB7XG4gICAgLyoqIEltYWdlIGlzIHJlbmRlcmVkIG5vcm1hbGx5LiAqL1xuICAgIEltYWdlU2hhcGVTdHlsZVtcIkF1dG9cIl0gPSBcImF1dG9cIjtcbiAgICAvKiogSW1hZ2UgaXMgcmVuZGVyZWQgYXMgYSBjaXJjbGUuICovXG4gICAgSW1hZ2VTaGFwZVN0eWxlW1wiQ2lyY2xlXCJdID0gXCJjaXJjbGVcIjtcbn0pKEltYWdlU2hhcGVTdHlsZSB8fCAoZXhwb3J0cy5JbWFnZVNoYXBlU3R5bGUgPSBJbWFnZVNoYXBlU3R5bGUgPSB7fSkpO1xuLyoqXG4gKiBFbnVtZXJhdGlvbiBvZiB1bml0cyBzdXBwb3J0ZWQgYnkgZHVyYXRpb24gc2NoZW1hcy4gU2VlIHtAbGluayBEdXJhdGlvblNjaGVtYS5tYXhVbml0fS5cbiAqL1xudmFyIER1cmF0aW9uVW5pdDtcbihmdW5jdGlvbiAoRHVyYXRpb25Vbml0KSB7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGlvbnMgYSBkdXJhdGlvbiBhcyBhIG51bWJlciBvZiBkYXlzLlxuICAgICAqL1xuICAgIER1cmF0aW9uVW5pdFtcIkRheXNcIl0gPSBcImRheXNcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0aW9ucyBhIGR1cmF0aW9uIGFzIGEgbnVtYmVyIG9mIGhvdXJzLlxuICAgICAqL1xuICAgIER1cmF0aW9uVW5pdFtcIkhvdXJzXCJdID0gXCJob3Vyc1wiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRpb25zIGEgZHVyYXRpb24gYXMgYSBudW1iZXIgb2YgbWludXRlcy5cbiAgICAgKi9cbiAgICBEdXJhdGlvblVuaXRbXCJNaW51dGVzXCJdID0gXCJtaW51dGVzXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGlvbnMgYSBkdXJhdGlvbiBhcyBhIG51bWJlciBvZiBzZWNvbmRzLlxuICAgICAqL1xuICAgIER1cmF0aW9uVW5pdFtcIlNlY29uZHNcIl0gPSBcInNlY29uZHNcIjtcbn0pKER1cmF0aW9uVW5pdCB8fCAoZXhwb3J0cy5EdXJhdGlvblVuaXQgPSBEdXJhdGlvblVuaXQgPSB7fSkpO1xuLyoqXG4gKiBUaGUgc3Vic2V0IG9mIFN0cmluZ0hpbnRUeXBlcyB0aGF0IGRvbid0IGhhdmUgc3BlY2lmaWMgc2NoZW1hIGF0dHJpYnV0ZXMuXG4gKi9cbmV4cG9ydHMuU2ltcGxlU3RyaW5nSGludFZhbHVlVHlwZXMgPSBbXG4gICAgVmFsdWVIaW50VHlwZS5BdHRhY2htZW50LFxuICAgIFZhbHVlSGludFR5cGUuSHRtbCxcbiAgICBWYWx1ZUhpbnRUeXBlLk1hcmtkb3duLFxuICAgIFZhbHVlSGludFR5cGUuVXJsLFxuICAgIFZhbHVlSGludFR5cGUuRW1haWwsXG4gICAgVmFsdWVIaW50VHlwZS5Db2RhSW50ZXJuYWxSaWNoVGV4dCxcbl07XG4vKipcbiAqIEFuIGlkZW50aWZpZXIgZm9yIHRoZSB2YWx1ZSBvZiBhIHByb3BlcnR5IGZvciB1c2UgaW4gdGhlIHtAbGluayBQcm9wZXJ0eUlkZW50aWZpZXJEZXRhaWxzLmxhYmVsfSBmaWVsZC5cbiAqIFdoZW4gdXNlZCwgdGhpcyB3aWxsIGJlIHN1YnN0aXR1dGVkIHdpdGggdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBmb3IgdGhlIGZpbmFsIG91dHB1dCBvZiB0aGUgbGFiZWwuXG4gKlxuICogSWYgbm90IHByZXNlbnQsIHRoZSBsYWJlbCB3aWxsIGJlIHVzZWQgYXMtaXMgaW4gdGhlIGRlZmF1bHQgbGFiZWwgZm9ybWF0IG9mICdcXHtsYWJlbFxcfTogXFx7VkFMVUVcXH0nLlxuICovXG5leHBvcnRzLlByb3BlcnR5TGFiZWxWYWx1ZVRlbXBsYXRlID0gJ3tWQUxVRX0nO1xuLyoqXG4gKiBTcGVjaWZpZXMgaG93IHRoaXMgcHJvcGVydHkgc2hvdWxkIGJlIGluZGV4ZWQuXG4gKiBAaGlkZGVuXG4gKi9cbnZhciBJbmRleGluZ1N0cmF0ZWd5O1xuKGZ1bmN0aW9uIChJbmRleGluZ1N0cmF0ZWd5KSB7XG4gICAgSW5kZXhpbmdTdHJhdGVneVtcIlN0YW5kYXJkXCJdID0gXCJzdGFuZGFyZFwiO1xuICAgIEluZGV4aW5nU3RyYXRlZ3lbXCJSYXdcIl0gPSBcInJhd1wiO1xufSkoSW5kZXhpbmdTdHJhdGVneSB8fCAoZXhwb3J0cy5JbmRleGluZ1N0cmF0ZWd5ID0gSW5kZXhpbmdTdHJhdGVneSA9IHt9KSk7XG4vKipcbiAqIFRoZSB0eXBlIG9mIGNvbnRlbnQgYmVpbmcgaW5kZXhlZCwgd2hpY2ggZGV0ZXJtaW5lcyBob3cgdGhlIHByb3BlcnR5IGlzIHByb2Nlc3NlZCBhbmQgcXVlcmllZC5cbiAqIEBoaWRkZW5cbiAqL1xudmFyIENvbnRlbnRDYXRlZ29yaXphdGlvblR5cGU7XG4oZnVuY3Rpb24gKENvbnRlbnRDYXRlZ29yaXphdGlvblR5cGUpIHtcbiAgICAvKiogTWVzc2FnaW5nOiBDaGF0IG9yIGluc3RhbnQgbWVzc2FnaW5nIGNvbnRlbnQgKi9cbiAgICBDb250ZW50Q2F0ZWdvcml6YXRpb25UeXBlW1wiTWVzc2FnaW5nXCJdID0gXCJNZXNzYWdpbmdcIjtcbiAgICAvKiogRG9jdW1lbnQ6IEdlbmVyYWwgZG9jdW1lbnQgY29udGVudCAqL1xuICAgIENvbnRlbnRDYXRlZ29yaXphdGlvblR5cGVbXCJEb2N1bWVudFwiXSA9IFwiRG9jdW1lbnRcIjtcbiAgICAvKiogRW1haWw6IEVtYWlsIG1lc3NhZ2UgY29udGVudCAqL1xuICAgIENvbnRlbnRDYXRlZ29yaXphdGlvblR5cGVbXCJFbWFpbFwiXSA9IFwiRW1haWxcIjtcbiAgICAvKiogQ29tbWVudDogVXNlciBjb21tZW50cyBvciBmZWVkYmFjayAqL1xuICAgIENvbnRlbnRDYXRlZ29yaXphdGlvblR5cGVbXCJDb21tZW50XCJdID0gXCJDb21tZW50XCI7XG59KShDb250ZW50Q2F0ZWdvcml6YXRpb25UeXBlIHx8IChleHBvcnRzLkNvbnRlbnRDYXRlZ29yaXphdGlvblR5cGUgPSBDb250ZW50Q2F0ZWdvcml6YXRpb25UeXBlID0ge30pKTtcbi8qKlxuICogRGV0ZXJtaW5lcyBob3cgcGVybWlzc2lvbnMgYXJlIGhhbmRsZWQgZm9yIHRoaXMgb2JqZWN0LlxuICovXG52YXIgUGVybWlzc2lvbnNCZWhhdmlvcjtcbihmdW5jdGlvbiAoUGVybWlzc2lvbnNCZWhhdmlvcikge1xuICAgIC8qKlxuICAgICAqIFRoZSBvYmplY3Qgd2lsbCBpbmhlcml0IHBlcm1pc3Npb25zIGZyb20gaXRzIHBhcmVudC5cbiAgICAgKi9cbiAgICBQZXJtaXNzaW9uc0JlaGF2aW9yW1wiSW5oZXJpdFwiXSA9IFwiSW5oZXJpdFwiO1xufSkoUGVybWlzc2lvbnNCZWhhdmlvciB8fCAoZXhwb3J0cy5QZXJtaXNzaW9uc0JlaGF2aW9yID0gUGVybWlzc2lvbnNCZWhhdmlvciA9IHt9KSk7XG4vKipcbiAqIERldGVybWluZXMgaG93IHRoZSBsaWZlY3ljbGUgb2YgdGhlIGNoaWxkIG9iamVjdHMgaXMgaGFuZGxlZC5cbiAqL1xudmFyIExpZmVjeWNsZUJlaGF2aW9yO1xuKGZ1bmN0aW9uIChMaWZlY3ljbGVCZWhhdmlvcikge1xuICAgIC8qKlxuICAgICAqIFRoZSBjaGlsZCBvYmplY3RzIHNob3VsZCBiZSBkZWxldGVkIHdoZW4gdGhlIHBhcmVudCBvYmplY3QgaXMgZGVsZXRlZC5cbiAgICAgKi9cbiAgICBMaWZlY3ljbGVCZWhhdmlvcltcIkluaGVyaXRcIl0gPSBcIkluaGVyaXRcIjtcbn0pKExpZmVjeWNsZUJlaGF2aW9yIHx8IChleHBvcnRzLkxpZmVjeWNsZUJlaGF2aW9yID0gTGlmZWN5Y2xlQmVoYXZpb3IgPSB7fSkpO1xuLyoqXG4gKiBUaGUgdHlwZSBvZiBwcmluY2lwYWwgdGhhdCBjYW4gYmUgYXBwbGllZCB0byBhIHBlcm1pc3Npb24uXG4gKlxuICogVE9ETyhzYW0pOiBVbmhpZGUgdGhpc1xuICogQGhpZGRlblxuICovXG52YXIgUHJpbmNpcGFsVHlwZTtcbihmdW5jdGlvbiAoUHJpbmNpcGFsVHlwZSkge1xuICAgIFByaW5jaXBhbFR5cGVbXCJVc2VyXCJdID0gXCJ1c2VyXCI7XG4gICAgUHJpbmNpcGFsVHlwZVtcIkdyb3VwXCJdID0gXCJncm91cFwiO1xuICAgIFByaW5jaXBhbFR5cGVbXCJBbnlvbmVcIl0gPSBcImFueW9uZVwiO1xuICAgIFByaW5jaXBhbFR5cGVbXCJBbGxVc2Vyc1wiXSA9IFwiYWxsVXNlcnNcIjtcbiAgICBQcmluY2lwYWxUeXBlW1wiRG9tYWluXCJdID0gXCJkb21haW5cIjtcbn0pKFByaW5jaXBhbFR5cGUgfHwgKGV4cG9ydHMuUHJpbmNpcGFsVHlwZSA9IFByaW5jaXBhbFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBUaGUgdHlwZSBvZiBwZXJtaXNzaW9uLlxuICogRGVsZWdhdGVkIHBlcm1pc3Npb25zIGFyZSBwZXJtaXNzaW9ucyB0aGF0IGFyZSBpbmhlcml0ZWQgZnJvbSBhbm90aGVyIG9iamVjdCB0aGF0IGFyZW4ndFxuICogd2l0aGluIHRoZSBzYW1lIHN5bmMgdGFibGUuXG4gKiBEaXJlY3QgcGVybWlzc2lvbnMgYXJlIHBlcm1pc3Npb25zIHRoYXQgYXJlIGRpcmVjdGx5IGFwcGxpZWQgdG8gdGhlIG9iamVjdC4gRS5nLiBhIHVzZXIgb3IgZ3JvdXAsIGV0Y1xuICogVE9ETyhkcmV3KTogVW5oaWRlIHRoaXNcbiAqIEBoaWRkZW5cbiAqL1xudmFyIFBlcm1pc3Npb25UeXBlO1xuKGZ1bmN0aW9uIChQZXJtaXNzaW9uVHlwZSkge1xuICAgIFBlcm1pc3Npb25UeXBlW1wiRGVsZWdhdGVkXCJdID0gXCJkZWxlZ2F0ZWRcIjtcbiAgICBQZXJtaXNzaW9uVHlwZVtcIkRpcmVjdFwiXSA9IFwiZGlyZWN0XCI7XG59KShQZXJtaXNzaW9uVHlwZSB8fCAoZXhwb3J0cy5QZXJtaXNzaW9uVHlwZSA9IFBlcm1pc3Npb25UeXBlID0ge30pKTtcbi8qKlxuICogVGhlIHR5cGUgb2YgY29udGVudCBpbiB0aGlzIGF0dHJpYnV0aW9uIG5vZGUuXG4gKlxuICogTXVsdGlwbGUgYXR0cmlidXRpb24gbm9kZXMgY2FuIGJlIHJlbmRlcmVkIGFsbCB0b2dldGhlciwgZm9yIGV4YW1wbGUgdG8gaGF2ZVxuICogYXR0cmlidXRpb24gdGhhdCBjb250YWlucyBib3RoIHRleHQgYW5kIGEgbG9nbyBpbWFnZS5cbiAqXG4gKiBAc2VlIFtTdHJ1Y3R1cmluZyBkYXRhIHdpdGggc2NoZW1hcyAtIERhdGEgYXR0cmlidXRpb25dKGh0dHBzOi8vY29kYS5pby9wYWNrcy9idWlsZC9sYXRlc3QvZ3VpZGVzL2FkdmFuY2VkL3NjaGVtYXMvI2F0dHJpYnV0aW9uKVxuICovXG52YXIgQXR0cmlidXRpb25Ob2RlVHlwZTtcbihmdW5jdGlvbiAoQXR0cmlidXRpb25Ob2RlVHlwZSkge1xuICAgIC8qKlxuICAgICAqIFRleHQgYXR0cmlidXRpb24gY29udGVudC5cbiAgICAgKi9cbiAgICBBdHRyaWJ1dGlvbk5vZGVUeXBlW0F0dHJpYnV0aW9uTm9kZVR5cGVbXCJUZXh0XCJdID0gMV0gPSBcIlRleHRcIjtcbiAgICAvKipcbiAgICAgKiBBIGh5cGVybGluayBwb2ludGluZyB0byB0aGUgZGF0YSBzb3VyY2UuXG4gICAgICovXG4gICAgQXR0cmlidXRpb25Ob2RlVHlwZVtBdHRyaWJ1dGlvbk5vZGVUeXBlW1wiTGlua1wiXSA9IDJdID0gXCJMaW5rXCI7XG4gICAgLyoqXG4gICAgICogQW4gaW1hZ2UsIG9mdGVuIGEgbG9nbyBvZiB0aGUgZGF0YSBzb3VyY2UuXG4gICAgICovXG4gICAgQXR0cmlidXRpb25Ob2RlVHlwZVtBdHRyaWJ1dGlvbk5vZGVUeXBlW1wiSW1hZ2VcIl0gPSAzXSA9IFwiSW1hZ2VcIjtcbn0pKEF0dHJpYnV0aW9uTm9kZVR5cGUgfHwgKGV4cG9ydHMuQXR0cmlidXRpb25Ob2RlVHlwZSA9IEF0dHJpYnV0aW9uTm9kZVR5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIGhlbHBlciBmb3IgY29uc3RydWN0aW5nIGF0dHJpYnV0aW9uIHRleHQsIGxpbmtzLCBvciBpbWFnZXMgdGhhdCByZW5kZXIgYWxvbmcgd2l0aCBhIFBhY2sgdmFsdWUuXG4gKlxuICogTWFueSBBUElzIGhhdmUgbGljZW5zaW5nIHJlcXVpcmVtZW50cyB0aGF0IGFzayBmb3Igc3BlY2lmaWMgYXR0cmlidXRpb24gdG8gYmUgaW5jbHVkZWRcbiAqIHdoZW4gdXNpbmcgdGhlaXIgZGF0YS4gRm9yIGV4YW1wbGUsIGEgc3RvY2sgcGhvdG8gQVBJIG1heSByZXF1aXJlIGF0dHJpYnV0aW9uIHRleHRcbiAqIGFuZCBhIGxvZ28uXG4gKlxuICogQW55IHtAbGluayBJZGVudGl0eURlZmluaXRpb259IGNhbiBpbmNsdWRlIG9uZSBvciBtb3JlIGF0dHJpYnV0aW9uIG5vZGVzIHRoYXQgd2lsbCBiZVxuICogcmVuZGVyZWQgYW55IHRpbWUgYSB2YWx1ZSB3aXRoIHRoYXQgaWRlbnRpdHkgaXMgcmVuZGVyZWQgaW4gYSBkb2MuXG4gKi9cbmZ1bmN0aW9uIG1ha2VBdHRyaWJ1dGlvbk5vZGUobm9kZSkge1xuICAgIHJldHVybiBub2RlO1xufVxuZXhwb3J0cy5tYWtlQXR0cmlidXRpb25Ob2RlID0gbWFrZUF0dHJpYnV0aW9uTm9kZTtcbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICAgIHJldHVybiBCb29sZWFuKHZhbCAmJiB2YWwudHlwZSA9PT0gVmFsdWVUeXBlLk9iamVjdCk7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICAgIHJldHVybiBCb29sZWFuKHZhbCAmJiB2YWwudHlwZSA9PT0gVmFsdWVUeXBlLkFycmF5KTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5mdW5jdGlvbiB1bndyYXBwZWRTY2hlbWFTdXBwb3J0c09wdGlvbnMoc2NoZW1hKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4oc2NoZW1hID09PSBudWxsIHx8IHNjaGVtYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2NoZW1hLmNvZGFUeXBlKSAmJiBbVmFsdWVIaW50VHlwZS5TZWxlY3RMaXN0LCBWYWx1ZUhpbnRUeXBlLlJlZmVyZW5jZV0uaW5jbHVkZXMoc2NoZW1hLmNvZGFUeXBlKTtcbn1cbmV4cG9ydHMudW53cmFwcGVkU2NoZW1hU3VwcG9ydHNPcHRpb25zID0gdW53cmFwcGVkU2NoZW1hU3VwcG9ydHNPcHRpb25zO1xuZnVuY3Rpb24gbWF5YmVTY2hlbWFPcHRpb25zVmFsdWUoc2NoZW1hKSB7XG4gICAgY29uc3QgdW53cmFwcGVkU2NoZW1hID0gbWF5YmVVbndyYXBBcnJheVNjaGVtYShzY2hlbWEpO1xuICAgIGlmICh1bndyYXBwZWRTY2hlbWFTdXBwb3J0c09wdGlvbnModW53cmFwcGVkU2NoZW1hKSkge1xuICAgICAgICByZXR1cm4gdW53cmFwcGVkU2NoZW1hLm9wdGlvbnM7XG4gICAgfVxufVxuZXhwb3J0cy5tYXliZVNjaGVtYU9wdGlvbnNWYWx1ZSA9IG1heWJlU2NoZW1hT3B0aW9uc1ZhbHVlO1xuLyoqXG4gKiBQdWxscyBvdXQgdGhlIGl0ZW0gdHlwZSBvZiBhbiBBcnJheSBzY2hlbWEsIHJldHVybmluZyB1bmRlZmluZWQgaWYgdGhlIEFycmF5IGNvbnRhaW5zIGFub3RoZXIgQXJyYXkuXG4gKi9cbmZ1bmN0aW9uIG1heWJlVW53cmFwQXJyYXlTY2hlbWEodmFsKSB7XG4gICAgaWYgKCFpc0FycmF5KHZhbCkpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgaWYgKCFpc0FycmF5KHZhbC5pdGVtcykpIHtcbiAgICAgICAgcmV0dXJuIHZhbC5pdGVtcztcbiAgICB9XG59XG5leHBvcnRzLm1heWJlVW53cmFwQXJyYXlTY2hlbWEgPSBtYXliZVVud3JhcEFycmF5U2NoZW1hO1xuLyoqXG4gKiBVdGlsaXR5IHRoYXQgZXhhbWluZXMgYSBKYXZhU2NyaXB0IHZhbHVlIGFuZCBhdHRlbXB0cyB0byBpbmZlciBhIHNjaGVtYSBkZWZpbml0aW9uXG4gKiB0aGF0IGRlc2NyaWJlcyBpdC5cbiAqXG4gKiBJdCBpcyB2YXN0bHkgcHJlZmVyYWJsZSB0byBkZWZpbmUgYSBzY2hlbWEgbWFudWFsbHkuIEEgY2xlYXIgYW5kIGFjY3VyYXRlIHNjaGVtYSBpcyBvbmUgb2YgdGhlXG4gKiBmdW5kYW1lbnRhbHMgb2YgYSBnb29kIHBhY2suIEhvd2V2ZXIsIGZvciBkYXRhIHRoYXQgaXMgdHJ1bHkgZHluYW1pYyBmb3Igd2hpY2ggYSBzY2hlbWEgY2FuJ3RcbiAqIGJlIGtub3duIGluIGFkdmFuY2Ugbm9yIGNhbiBhIGZ1bmN0aW9uIGJlIHdyaXR0ZW4gdG8gZ2VuZXJhdGUgYSBkeW5hbWljIHNjaGVtYSBmcm9tIG90aGVyXG4gKiBpbnB1dHMsIGl0IG1heSBiZSB1c2VmdWwgdG8gdXMgdGhpcyBoZWxwZXIgdG8gc25pZmYgdGhlIHJldHVybiB2YWx1ZSBhbmQgZ2VuZXJhdGUgYSBiYXNpY1xuICogaW5mZXJyZWQgc2NoZW1hIGZyb20gaXQuXG4gKlxuICogVGhpcyB1dGlsaXR5IGRvZXMgTk9UIGF0dGVtcHQgdG8gZGV0ZXJtaW5lIHtAbGluayBPYmplY3RTY2hlbWFEZWZpbml0aW9uLmlkUHJvcGVydHl9IG9yXG4gKiB7QGxpbmsgT2JqZWN0U2NoZW1hRGVmaW5pdGlvbi5kaXNwbGF5UHJvcGVydHl9IGF0dHJpYnV0ZXMgZm9yXG4gKiBhbiBvYmplY3Qgc2NoZW1hLCB0aG9zZSBhcmUgbGVmdCB1bmRlZmluZWQuXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlU2NoZW1hKG9iaikge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgaWYgKG9iai5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTXVzdCBoYXZlIHJlcHJlc2VudGF0aXZlIHZhbHVlLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5BcnJheSwgaXRlbXM6IGdlbmVyYXRlU2NoZW1hKG9ialswXSkgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gRGVmYXVsdCBudWxscyB0byBzdHJpbmcgd2hpY2ggaXMgdGhlIGxlYXN0IGNvbW1vbiBkZW5vbWluYXRvci5cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5TdHJpbmcgfTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNba2V5XSA9IGdlbmVyYXRlU2NoZW1hKG9ialtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0eXBlOiBWYWx1ZVR5cGUuT2JqZWN0LCBwcm9wZXJ0aWVzIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5TdHJpbmcgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5Cb29sZWFuIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5OdW1iZXIgfTtcbiAgICB9XG4gICAgcmV0dXJuICgwLCBlbnN1cmVfNS5lbnN1cmVVbnJlYWNoYWJsZSkob2JqKTtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVTY2hlbWEgPSBnZW5lcmF0ZVNjaGVtYTtcbi8qKlxuICogQSB3cmFwcGVyIGZvciBjcmVhdGluZyBhbnkgc2NoZW1hIGRlZmluaXRpb24uXG4gKlxuICogSWYgeW91IGFyZSBjcmVhdGluZyBhIHNjaGVtYSBmb3IgYW4gb2JqZWN0IChhcyBvcHBvc2VkIHRvIGEgc2NhbGFyIG9yIGFycmF5KSxcbiAqIHVzZSB0aGUgbW9yZSBzcGVjaWZpYyB7QGxpbmsgbWFrZU9iamVjdFNjaGVtYX0uXG4gKlxuICogSXQgaXMgYWx3YXlzIHJlY29tbWVuZGVkIHRvIHVzZSB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgY3JlYXRpbmcgdG9wLWxldmVsIHNjaGVtYVxuICogb2JqZWN0cyByYXRoZXIgdGhhbiBzcGVjaWZ5aW5nIG9iamVjdCBsaXRlcmFscy4gV3JhcHBlcnMgdmFsaWRhdGUgeW91ciBzY2hlbWFzXG4gKiBhdCBjcmVhdGlvbiB0aW1lLCBwcm92aWRlIGJldHRlciBUeXBlU2NyaXB0IHR5cGUgaW5mZXJlbmNlLCBhbmQgY2FuIHJlZHVjZVxuICogYm9pbGVycGxhdGUuXG4gKlxuICogQXQgdGhpcyB0aW1lLCB0aGlzIHdyYXBwZXIgcHJvdmlkZXMgb25seSBiZXR0ZXIgVHlwZVNjcmlwdCB0eXBlIGluZmVyZW5jZSxcbiAqIGJ1dCBpdCBtYXkgZG8gdmFsaWRhdGlvbiBpbiBhIGZ1dHVyZSBTREsgdmVyc2lvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBjb2RhLm1ha2VTY2hlbWEoe1xuICogICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5BcnJheSxcbiAqICAgaXRlbXM6IHt0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmd9LFxuICogfSk7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gbWFrZVNjaGVtYShzY2hlbWEpIHtcbiAgICByZXR1cm4gc2NoZW1hO1xufVxuZXhwb3J0cy5tYWtlU2NoZW1hID0gbWFrZVNjaGVtYTtcbi8qKlxuICogQSB3cmFwcGVyIGZvciBjcmVhdGluZyBhIHNjaGVtYSBkZWZpbml0aW9uIGZvciBhbiBvYmplY3QgdmFsdWUuXG4gKlxuICogSXQgaXMgYWx3YXlzIHJlY29tbWVuZGVkIHRvIHVzZSB3cmFwcGVyIGZ1bmN0aW9ucyBmb3IgY3JlYXRpbmcgdG9wLWxldmVsIHNjaGVtYVxuICogb2JqZWN0cyByYXRoZXIgdGhhbiBzcGVjaWZ5aW5nIG9iamVjdCBsaXRlcmFscy4gV3JhcHBlcnMgdmFsaWRhdGUgeW91ciBzY2hlbWFzXG4gKiBhdCBjcmVhdGlvbiB0aW1lLCBwcm92aWRlIGJldHRlciBUeXBlU2NyaXB0IHR5cGUgaW5mZXJlbmNlLCBhbmQgY2FuIHJlZHVjZVxuICogYm9pbGVycGxhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogY29kYS5tYWtlT2JqZWN0U2NoZW1hKHtcbiAqICAgaWQ6IFwiZW1haWxcIixcbiAqICAgcHJpbWFyeTogXCJuYW1lXCIsXG4gKiAgIHByb3BlcnRpZXM6IHtcbiAqICAgICBlbWFpbDoge3R5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZywgcmVxdWlyZWQ6IHRydWV9LFxuICogICAgIG5hbWU6IHt0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAqICAgfSxcbiAqIH0pO1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIG1ha2VPYmplY3RTY2hlbWEoc2NoZW1hRGVmKSB7XG4gICAgY29uc3Qgc2NoZW1hID0geyAuLi5zY2hlbWFEZWYsIHR5cGU6IFZhbHVlVHlwZS5PYmplY3QgfTtcbiAgICAvLyBJbiBjYXNlIGEgc2luZ2xlIHNjaGVtYSBvYmplY3Qgd2FzIHVzZWQgZm9yIG11bHRpcGxlIHByb3BlcnRpZXMsIG1ha2UgY29waWVzIGZvciBlYWNoIG9mIHRoZW0uXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMpKSB7XG4gICAgICAgIC8vICd0eXBlJyB3YXMganVzdCBjcmVhdGVkIGZyb20gc2NyYXRjaCBhYm92ZVxuICAgICAgICBpZiAoa2V5ICE9PSAndHlwZScpIHtcbiAgICAgICAgICAgIC8vIFR5cGVzY3JpcHQgZG9lc24ndCBsaWtlIHRoZSByYXcgc2NoZW1hLnByb3BlcnRpZXNba2V5XSAob24gdGhlIGxlZnQgb25seSB0aG91Z2guLi4pXG4gICAgICAgICAgICBjb25zdCB0eXBlZEtleSA9IGtleTtcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYUZvck9wdGlvbnMgPSBtYXliZVVud3JhcEFycmF5U2NoZW1hKHNjaGVtYS5wcm9wZXJ0aWVzW2tleV0pO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uc1ZhbHVlID0gc2NoZW1hRm9yT3B0aW9ucyA9PT0gbnVsbCB8fCBzY2hlbWFGb3JPcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2hlbWFGb3JPcHRpb25zLm9wdGlvbnM7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zRnVuY3Rpb24gPSB0eXBlb2Ygb3B0aW9uc1ZhbHVlID09PSAnZnVuY3Rpb24nID8gb3B0aW9uc1ZhbHVlIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNbdHlwZWRLZXldID0gKDAsIG9iamVjdF91dGlsc18xLmRlZXBDb3B5KShzY2hlbWEucHJvcGVydGllc1trZXldKTtcbiAgICAgICAgICAgIC8vIE9wdGlvbnMgZ2V0cyBtYW51YWxseSBjb3BpZWQgb3ZlciBiZWNhdXNlIGl0IG1heSBiZSBhIGZ1bmN0aW9uLCB3aGljaCBkZWVwQ29weSB3b3VsZG4ndFxuICAgICAgICAgICAgLy8gc3VwcG9ydC5cbiAgICAgICAgICAgIGlmIChvcHRpb25zRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY2hlbWFDb3B5Rm9yT3B0aW9ucyA9IG1heWJlVW53cmFwQXJyYXlTY2hlbWEoc2NoZW1hLnByb3BlcnRpZXNbdHlwZWRLZXldKTtcbiAgICAgICAgICAgICAgICAoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShzY2hlbWFDb3B5Rm9yT3B0aW9ucywgJ2RlZXBDb3B5KCkgYnJva2UgbWF5YmVVbndyYXBBcnJheVNjaGVtYT8uLi4nKTtcbiAgICAgICAgICAgICAgICBzY2hlbWFDb3B5Rm9yT3B0aW9ucy5vcHRpb25zID0gb3B0aW9uc0Z1bmN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlT2JqZWN0U2NoZW1hKHNjaGVtYSk7XG4gICAgcmV0dXJuIHNjaGVtYTtcbn1cbmV4cG9ydHMubWFrZU9iamVjdFNjaGVtYSA9IG1ha2VPYmplY3RTY2hlbWE7XG5mdW5jdGlvbiB2YWxpZGF0ZU9iamVjdFNjaGVtYShzY2hlbWEpIHtcbiAgICAvLyBUT0RPKGpvbmF0aGFuKTogVGhlc2Ugc2hvdWxkIGFsbCBtb3ZlIHRvIHVwbG9hZF92YWxpZGF0aW9uIGNoZWNrcywgc2luY2UgdGhlc2UgYXJlbid0IGdldHRpbmdcbiAgICAvLyBlbmZvcmNlZCBvbiB1cGxvYWQgYW5kIGEgaGFja2VkIENMSSBjb3VsZCBqdXN0IGJ5cGFzcyB0aGVzZS5cbiAgICAvLyBUaGVzZSBhcmVuJ3QgcGFydGljdWxhcmx5IGltcG9ydGFudCBjaGVja3MsIHRoZXkncmUgbW9yZSBqdXN0IGFpZHMgZm9yIHRoZSBtYWtlclxuICAgIC8vIHNvIHRoYXQgdGhlaXIgcmVmZXJlbmNlIGFuZCBwZW9wbGUgdmFsdWVzIHdvbid0IGJlIGJyb2tlbiBhdCBydW50aW1lLlxuICAgIGlmIChzY2hlbWEuY29kYVR5cGUgPT09IFZhbHVlSGludFR5cGUuUmVmZXJlbmNlKSB7XG4gICAgICAgIGNvbnN0IHsgaWQsIGlkZW50aXR5LCBwcmltYXJ5IH0gPSAoMCwgbWlncmF0aW9uXzEub2JqZWN0U2NoZW1hSGVscGVyKShzY2hlbWEpO1xuICAgICAgICBjaGVja1JlcXVpcmVkRmllbGRJbk9iamVjdFNjaGVtYShpZCwgJ2lkUHJvcGVydHknLCBzY2hlbWEuY29kYVR5cGUpO1xuICAgICAgICBjaGVja1JlcXVpcmVkRmllbGRJbk9iamVjdFNjaGVtYShpZGVudGl0eSwgJ2lkZW50aXR5Jywgc2NoZW1hLmNvZGFUeXBlKTtcbiAgICAgICAgY2hlY2tSZXF1aXJlZEZpZWxkSW5PYmplY3RTY2hlbWEocHJpbWFyeSwgJ2Rpc3BsYXlQcm9wZXJ0eScsIHNjaGVtYS5jb2RhVHlwZSk7XG4gICAgICAgIGNoZWNrU2NoZW1hUHJvcGVydHlJc1JlcXVpcmVkKCgwLCBlbnN1cmVfMi5lbnN1cmVFeGlzdHMpKGlkKSwgc2NoZW1hLCAnaWRQcm9wZXJ0eScpO1xuICAgICAgICBjaGVja1NjaGVtYVByb3BlcnR5SXNSZXF1aXJlZCgoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShwcmltYXJ5KSwgc2NoZW1hLCAnZGlzcGxheVByb3BlcnR5Jyk7XG4gICAgfVxuICAgIGlmIChzY2hlbWEuY29kYVR5cGUgPT09IFZhbHVlSGludFR5cGUuUGVyc29uKSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9ICgwLCBtaWdyYXRpb25fMS5vYmplY3RTY2hlbWFIZWxwZXIpKHNjaGVtYSk7XG4gICAgICAgIGNoZWNrUmVxdWlyZWRGaWVsZEluT2JqZWN0U2NoZW1hKGlkLCAnaWRQcm9wZXJ0eScsIHNjaGVtYS5jb2RhVHlwZSk7XG4gICAgICAgIGNoZWNrU2NoZW1hUHJvcGVydHlJc1JlcXVpcmVkKCgwLCBlbnN1cmVfMi5lbnN1cmVFeGlzdHMpKGlkKSwgc2NoZW1hLCAnaWRQcm9wZXJ0eScpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IFtfcHJvcGVydHlLZXksIHByb3BlcnR5U2NoZW1hXSBvZiBPYmplY3QuZW50cmllcyhzY2hlbWEucHJvcGVydGllcykpIHtcbiAgICAgICAgaWYgKHByb3BlcnR5U2NoZW1hLnR5cGUgPT09IFZhbHVlVHlwZS5PYmplY3QpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlT2JqZWN0U2NoZW1hKHByb3BlcnR5U2NoZW1hKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGNoZWNrUmVxdWlyZWRGaWVsZEluT2JqZWN0U2NoZW1hKGZpZWxkLCBmaWVsZE5hbWUsIGNvZGFUeXBlKSB7XG4gICAgKDAsIGVuc3VyZV8yLmVuc3VyZUV4aXN0cykoZmllbGQsIGBPYmplY3RzIHdpdGggY29kYVR5cGUgXCIke2NvZGFUeXBlfVwiIHJlcXVpcmUgYSBcIiR7ZmllbGROYW1lfVwiIHByb3BlcnR5IGluIHRoZSBzY2hlbWEgZGVmaW5pdGlvbi5gKTtcbn1cbmZ1bmN0aW9uIGNoZWNrU2NoZW1hUHJvcGVydHlJc1JlcXVpcmVkKGZpZWxkLCBzY2hlbWEsIHJlZmVyZW5jZWRCeVByb3BlcnR5TmFtZSkge1xuICAgIGNvbnN0IHsgcHJvcGVydGllcywgY29kYVR5cGUgfSA9IHNjaGVtYTtcbiAgICAoMCwgZW5zdXJlXzEuYXNzZXJ0Q29uZGl0aW9uKShwcm9wZXJ0aWVzW2ZpZWxkXSwgYCR7cmVmZXJlbmNlZEJ5UHJvcGVydHlOYW1lfSBzZXQgdG8gdW5kZWZpbmVkIGZpZWxkIFwiJHtmaWVsZH1cImApO1xuICAgICgwLCBlbnN1cmVfMS5hc3NlcnRDb25kaXRpb24pKHByb3BlcnRpZXNbZmllbGRdLnJlcXVpcmVkLCBgRmllbGQgXCIke2ZpZWxkfVwiIG11c3QgYmUgbWFya2VkIGFzIHJlcXVpcmVkIGluIHNjaGVtYSB3aXRoIGNvZGFUeXBlIFwiJHtjb2RhVHlwZX1cIi5gKTtcbn1cbi8qKlxuICogTm9ybWFsaXplcyBhIHNjaGVtYSBrZXkgaW50byBQYXNjYWxDYXNlLlxuICovXG5mdW5jdGlvbiBub3JtYWxpemVTY2hlbWFLZXkoa2V5KSB7XG4gICAgLy8gQ29sb25zIGNhdXNlIHByb2JsZW1zIGluIG91ciBmb3JtdWxhIGhhbmRsaW5nLlxuICAgIHJldHVybiAoMCwgcGFzY2FsY2FzZV8xLmRlZmF1bHQpKGtleSkucmVwbGFjZSgvOi9nLCAnXycpO1xufVxuZXhwb3J0cy5ub3JtYWxpemVTY2hlbWFLZXkgPSBub3JtYWxpemVTY2hlbWFLZXk7XG4vKipcbiAqIE5vcm1hbGl6ZXMgYSBzY2hlbWEgcHJvcGVydHkga2V5IHBhdGguIFRoaXMgaW50ZXJwcmV0cyBcIi5cInMgYXMgYWNjZXNzaW5nIG9iamVjdCBwcm9wZXJ0aWVzXG4gKiBhbmQgXCJbXVwiIGFzIGFjY2Vzc2luZyBhcnJheSBpdGVtcy4gVXNlcyBub3JtYWxpemVTY2hlbWFLZXkgdG8gbm9ybWFsaXplIGVhY2ggcGFydCBpbi1iZXR3ZWVuLlxuICpcbiAqIFRoaXMgaXMgdXNlZCBmb3Igb2JqZWN0IHNjaGVtYSBwcm9wZXJ0aWVzIHRoYXQgc3VwcG9ydCBwYXRoIHByb2plY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVNjaGVtYUtleVBhdGgoa2V5LCBub3JtYWxpemVkUHJvcGVydGllcykge1xuICAgIC8vIFRyeSBhbiBleGFjdCBtYXRjaCBvbiB0aGUgcHJvcGVydGllcyBmaXJzdC5cbiAgICBpZiAobm9ybWFsaXplZFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkobm9ybWFsaXplU2NoZW1hS2V5KGtleSkpKSB7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVTY2hlbWFLZXkoa2V5KTtcbiAgICB9XG4gICAgLy8gVHJ5IHNwbGl0dGluZyBieSAuIHRvIGhhbmRsZSBqc29uIHBhdGhzLlxuICAgIHJldHVybiBrZXlcbiAgICAgICAgLnNwbGl0KCcuJylcbiAgICAgICAgLm1hcCh2YWwgPT4ge1xuICAgICAgICBsZXQgcGFydFRvTm9ybWFsaXplID0gdmFsO1xuICAgICAgICBsZXQgcGFydFRvSWdub3JlTm9ybWFsaXphdGlvbiA9ICcnO1xuICAgICAgICAvLyBIYW5kbGVzIGFycmF5IHBhdGhpbmcuXG4gICAgICAgIGlmICh2YWwuaW5jbHVkZXMoJ1snKSkge1xuICAgICAgICAgICAgcGFydFRvTm9ybWFsaXplID0gdmFsLnN1YnN0cmluZygwLCB2YWwuaW5kZXhPZignWycpKTtcbiAgICAgICAgICAgIHBhcnRUb0lnbm9yZU5vcm1hbGl6YXRpb24gPSB2YWwuc3Vic3RyaW5nKHZhbC5pbmRleE9mKCdbJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub3JtYWxpemVTY2hlbWFLZXkocGFydFRvTm9ybWFsaXplKSArIHBhcnRUb0lnbm9yZU5vcm1hbGl6YXRpb247XG4gICAgfSlcbiAgICAgICAgLmpvaW4oJy4nKTtcbn1cbmV4cG9ydHMubm9ybWFsaXplU2NoZW1hS2V5UGF0aCA9IG5vcm1hbGl6ZVNjaGVtYUtleVBhdGg7XG4vKipcbiAqIE5vcm1hbGl6ZXMgYSBzY2hlbWEgUHJvcGVydHlJZGVudGlmaWVyIGJ5IGNvbnZlcnRpbmcgaXQgdG8gUGFzY2FsQ2FzZS5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKGtleSwgbm9ybWFsaXplZFByb3BlcnRpZXMpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVNjaGVtYUtleVBhdGgoa2V5LCBub3JtYWxpemVkUHJvcGVydGllcyk7XG4gICAgfVxuICAgIGNvbnN0IHsgbGFiZWwsIHByb3BlcnR5OiB2YWx1ZSwgcGxhY2Vob2xkZXIsIC4uLnJlc3QgfSA9IGtleTtcbiAgICAoMCwgZW5zdXJlXzMuZW5zdXJlTmV2ZXIpKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcGVydHk6IG5vcm1hbGl6ZVNjaGVtYUtleVBhdGgodmFsdWUsIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKSxcbiAgICAgICAgbGFiZWwsXG4gICAgICAgIHBsYWNlaG9sZGVyLFxuICAgIH07XG59XG5mdW5jdGlvbiBub3JtYWxpemVJbmRleFByb3BlcnR5KHZhbHVlLCBub3JtYWxpemVkUHJvcGVydGllcykge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICdzdHJhdGVneScgaW4gdmFsdWUpIHtcbiAgICAgICAgY29uc3QgeyBwcm9wZXJ0eSwgc3RyYXRlZ3ksIC4uLnJlc3QgfSA9IHZhbHVlO1xuICAgICAgICAoMCwgZW5zdXJlXzMuZW5zdXJlTmV2ZXIpKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcm9wZXJ0eTogbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKHByb3BlcnR5LCBub3JtYWxpemVkUHJvcGVydGllcyksXG4gICAgICAgICAgICBzdHJhdGVneSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcih2YWx1ZSwgbm9ybWFsaXplZFByb3BlcnRpZXMpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplQ29udGVudENhdGVnb3JpemF0aW9uKHZhbHVlLCBub3JtYWxpemVkUHJvcGVydGllcykge1xuICAgIHN3aXRjaCAodmFsdWUudHlwZSkge1xuICAgICAgICBjYXNlIENvbnRlbnRDYXRlZ29yaXphdGlvblR5cGUuTWVzc2FnaW5nOlxuICAgICAgICBjYXNlIENvbnRlbnRDYXRlZ29yaXphdGlvblR5cGUuRG9jdW1lbnQ6XG4gICAgICAgIGNhc2UgQ29udGVudENhdGVnb3JpemF0aW9uVHlwZS5Db21tZW50OiB7XG4gICAgICAgICAgICBjb25zdCB7IHR5cGUsIC4uLnJlc3QgfSA9IHZhbHVlO1xuICAgICAgICAgICAgKDAsIGVuc3VyZV8zLmVuc3VyZU5ldmVyKSgpO1xuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZSB9O1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ29udGVudENhdGVnb3JpemF0aW9uVHlwZS5FbWFpbDoge1xuICAgICAgICAgICAgY29uc3QgeyB0eXBlLCB0b1Byb3BlcnR5LCBmcm9tUHJvcGVydHksIHN1YmplY3RQcm9wZXJ0eSwgaHRtbEJvZHlQcm9wZXJ0eSwgcGxhaW5UZXh0Qm9keVByb3BlcnR5LCAuLi5yZXN0IH0gPSB2YWx1ZTtcbiAgICAgICAgICAgICgwLCBlbnN1cmVfMy5lbnN1cmVOZXZlcikoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICB0b1Byb3BlcnR5OiBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIodG9Qcm9wZXJ0eSwgbm9ybWFsaXplZFByb3BlcnRpZXMpLFxuICAgICAgICAgICAgICAgIGZyb21Qcm9wZXJ0eTogbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKGZyb21Qcm9wZXJ0eSwgbm9ybWFsaXplZFByb3BlcnRpZXMpLFxuICAgICAgICAgICAgICAgIHN1YmplY3RQcm9wZXJ0eTogbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKHN1YmplY3RQcm9wZXJ0eSwgbm9ybWFsaXplZFByb3BlcnRpZXMpLFxuICAgICAgICAgICAgICAgIGh0bWxCb2R5UHJvcGVydHk6IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihodG1sQm9keVByb3BlcnR5LCBub3JtYWxpemVkUHJvcGVydGllcyksXG4gICAgICAgICAgICAgICAgcGxhaW5UZXh0Qm9keVByb3BlcnR5OiBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIocGxhaW5UZXh0Qm9keVByb3BlcnR5LCBub3JtYWxpemVkUHJvcGVydGllcyksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gKDAsIGVuc3VyZV81LmVuc3VyZVVucmVhY2hhYmxlKSh2YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gaXNDYXRlZ29yaXphdGlvbkluZGV4RGVmaW5pdGlvbihpbmRleCkge1xuICAgIHJldHVybiAnY29udGVudENhdGVnb3JpemF0aW9uJyBpbiBpbmRleDtcbn1cbmV4cG9ydHMuaXNDYXRlZ29yaXphdGlvbkluZGV4RGVmaW5pdGlvbiA9IGlzQ2F0ZWdvcml6YXRpb25JbmRleERlZmluaXRpb247XG5mdW5jdGlvbiBpc0N1c3RvbUluZGV4RGVmaW5pdGlvbihpbmRleCkge1xuICAgIHJldHVybiAncHJvcGVydGllcycgaW4gaW5kZXg7XG59XG5leHBvcnRzLmlzQ3VzdG9tSW5kZXhEZWZpbml0aW9uID0gaXNDdXN0b21JbmRleERlZmluaXRpb247XG5mdW5jdGlvbiBub3JtYWxpemVJbmRleERlZmluaXRpb24oaW5kZXgsIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKSB7XG4gICAgLy8gSGFuZGxlIGNhdGVnb3JpemF0aW9uIGluZGV4IGRlZmluaXRpb25zLlxuICAgIGlmIChpc0NhdGVnb3JpemF0aW9uSW5kZXhEZWZpbml0aW9uKGluZGV4KSkge1xuICAgICAgICBjb25zdCB7IGNvbnRlbnRDYXRlZ29yaXphdGlvbiwgYXV0aG9yaXR5Tm9ybVByb3BlcnR5LCBwb3B1bGFyaXR5Tm9ybVByb3BlcnR5LCBmaWx0ZXJhYmxlUHJvcGVydGllcywgLi4ucmVzdCB9ID0gaW5kZXg7XG4gICAgICAgICgwLCBlbnN1cmVfMy5lbnN1cmVOZXZlcikoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRlbnRDYXRlZ29yaXphdGlvbjogbm9ybWFsaXplQ29udGVudENhdGVnb3JpemF0aW9uKGNvbnRlbnRDYXRlZ29yaXphdGlvbiwgbm9ybWFsaXplZFByb3BlcnRpZXMpLFxuICAgICAgICAgICAgYXV0aG9yaXR5Tm9ybVByb3BlcnR5OiBhdXRob3JpdHlOb3JtUHJvcGVydHlcbiAgICAgICAgICAgICAgICA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihhdXRob3JpdHlOb3JtUHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcG9wdWxhcml0eU5vcm1Qcm9wZXJ0eTogcG9wdWxhcml0eU5vcm1Qcm9wZXJ0eVxuICAgICAgICAgICAgICAgID8gbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKHBvcHVsYXJpdHlOb3JtUHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZmlsdGVyYWJsZVByb3BlcnRpZXM6IGZpbHRlcmFibGVQcm9wZXJ0aWVzID09PSBudWxsIHx8IGZpbHRlcmFibGVQcm9wZXJ0aWVzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBmaWx0ZXJhYmxlUHJvcGVydGllcy5tYXAocHJvcCA9PiBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIocHJvcCwgbm9ybWFsaXplZFByb3BlcnRpZXMpKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gSGFuZGxlIGN1c3RvbSBpbmRleCBkZWZpbml0aW9ucy5cbiAgICBjb25zdCB7IHByb3BlcnRpZXMsIGNvbnRleHRQcm9wZXJ0aWVzLCBhdXRob3JpdHlOb3JtUHJvcGVydHksIHBvcHVsYXJpdHlOb3JtUHJvcGVydHksIGZpbHRlcmFibGVQcm9wZXJ0aWVzLCAuLi5yZXN0IH0gPSBpbmRleDtcbiAgICAoMCwgZW5zdXJlXzMuZW5zdXJlTmV2ZXIpKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllcy5tYXAocHJvcCA9PiBub3JtYWxpemVJbmRleFByb3BlcnR5KHByb3AsIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKSksXG4gICAgICAgIGNvbnRleHRQcm9wZXJ0aWVzOiBjb250ZXh0UHJvcGVydGllc1xuICAgICAgICAgICAgPyBjb250ZXh0UHJvcGVydGllcy5tYXAocHJvcCA9PiBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIocHJvcCwgbm9ybWFsaXplZFByb3BlcnRpZXMpKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGF1dGhvcml0eU5vcm1Qcm9wZXJ0eTogYXV0aG9yaXR5Tm9ybVByb3BlcnR5XG4gICAgICAgICAgICA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihhdXRob3JpdHlOb3JtUHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIHBvcHVsYXJpdHlOb3JtUHJvcGVydHk6IHBvcHVsYXJpdHlOb3JtUHJvcGVydHlcbiAgICAgICAgICAgID8gbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKHBvcHVsYXJpdHlOb3JtUHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGZpbHRlcmFibGVQcm9wZXJ0aWVzOiBmaWx0ZXJhYmxlUHJvcGVydGllcyA9PT0gbnVsbCB8fCBmaWx0ZXJhYmxlUHJvcGVydGllcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogZmlsdGVyYWJsZVByb3BlcnRpZXMubWFwKHByb3AgPT4gbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKHByb3AsIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKSksXG4gICAgfTtcbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZVBhcmVudERlZmluaXRpb24ocGFyZW50LCBub3JtYWxpemVkUHJvcGVydGllcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBhcmVudElkUHJvcGVydHk6IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihwYXJlbnQucGFyZW50SWRQcm9wZXJ0eSwgbm9ybWFsaXplZFByb3BlcnRpZXMpLFxuICAgICAgICBwZXJtaXNzaW9uczogcGFyZW50LnBlcm1pc3Npb25zLFxuICAgICAgICBsaWZlY3ljbGU6IHBhcmVudC5saWZlY3ljbGUsXG4gICAgfTtcbn1cbi8qKlxuICogQXR0ZW1wdHMgdG8gdHJhbnNmb3JtIGEgcHJvcGVydHkgdmFsdWUgKHdoaWNoIG1heSBiZSBhIGpzb24tcGF0aCBzdHJpbmcgb3IgYSBub3JtYWwgb2JqZWN0IHNjaGVtYSBwcm9wZXJ0eSkgaW50b1xuICogYSBwYXRoIHRvIGFjY2VzcyB0aGUgcmVsZXZhbnQgc2NoZW1hLiBTcGVjaWZpY2FsbHkgdGhpcyBoYW5kbGVzIHRoZSBjYXNlIG9mXG4gKiAgIDEpIG9iamVjdCBzY2hlbWFzIHdoaWNoIGhhdmUgYW4gaW50ZXJtZWRpYXRlIGBwcm9wZXJ0aWVzYCBvYmplY3QgYW5kXG4gKiAgIDIpIGFycmF5IHNjaGVtYXMgd2hpY2ggaGF2ZSBhbiBpbnRlcm1lZGlhdGUgYGl0ZW1zYCBvYmplY3QgdG8gdHJhdmVyc2UuXG4gKi9cbmZ1bmN0aW9uIG5vcm1hbGl6ZVByb3BlcnR5VmFsdWVQYXRoSW50b1NjaGVtYVBhdGgocHJvcGVydHlWYWx1ZSkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IHByb3BlcnR5VmFsdWVcbiAgICAgICAgLnNwbGl0KCcuJylcbiAgICAgICAgLm1hcCh2YWwgPT4ge1xuICAgICAgICByZXR1cm4gdmFsLnJlcGxhY2UoL1xcWyguKj8pXFxdLywgJy5pdGVtcycpO1xuICAgIH0pXG4gICAgICAgIC5qb2luKCcucHJvcGVydGllcy4nKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZFZhbHVlO1xufVxuZXhwb3J0cy5ub3JtYWxpemVQcm9wZXJ0eVZhbHVlUGF0aEludG9TY2hlbWFQYXRoID0gbm9ybWFsaXplUHJvcGVydHlWYWx1ZVBhdGhJbnRvU2NoZW1hUGF0aDtcbmZ1bmN0aW9uIG5vcm1hbGl6ZVNjaGVtYShzY2hlbWEpIHtcbiAgICBpZiAoaXNBcnJheShzY2hlbWEpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zY2hlbWEsXG4gICAgICAgICAgICB0eXBlOiBWYWx1ZVR5cGUuQXJyYXksXG4gICAgICAgICAgICBpdGVtczogbm9ybWFsaXplU2NoZW1hKHNjaGVtYS5pdGVtcyksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JqZWN0KHNjaGVtYSkpIHtcbiAgICAgICAgLy8gVGhlIGBhcyBUYCBoZXJlIHNlZW1zIGxpa2UgYSB0eXBlc2NyaXB0IGJ1Zy4uLiBzaG91bGRuJ3QgdGhlIGFib3ZlIHR5cGVndWFyZCBiZVxuICAgICAgICAvLyBzdWZmaWNpZW50IHRvIGRlZmluZSBUID09PSBHZW5lcmljT2JqZWN0U2NoZW1hP1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplT2JqZWN0U2NoZW1hKHNjaGVtYSk7XG4gICAgfVxuICAgIC8vIFdlIGFsd2F5cyBtYWtlIGEgY29weSBvZiB0aGUgaW5wdXQgc2NoZW1hIHNvIHdlIG5ldmVyIGFjY2lkZW50YWxseSBtdXRhdGUgaXQuXG4gICAgcmV0dXJuIHsgLi4uc2NoZW1hIH07XG59XG5leHBvcnRzLm5vcm1hbGl6ZVNjaGVtYSA9IG5vcm1hbGl6ZVNjaGVtYTtcbmZ1bmN0aW9uIG5vcm1hbGl6ZU9iamVjdFNjaGVtYShzY2hlbWEpIHtcbiAgICBjb25zdCBub3JtYWxpemVkUHJvcGVydGllcyA9IHt9O1xuICAgIGNvbnN0IHsgYXR0cmlidXRpb24sIG9wdGlvbnMsIHJlcXVpcmVGb3JVcGRhdGVzLCBjb2RhVHlwZSwgZGVzY3JpcHRpb24sIGRpc3BsYXlQcm9wZXJ0eSwgZmVhdHVyZWQsIGZlYXR1cmVkUHJvcGVydGllcywgaWQsIGlkZW50aXR5LCBpZFByb3BlcnR5LCBpbWFnZVByb3BlcnR5LCBpbmNsdWRlVW5rbm93blByb3BlcnRpZXMsIGxpbmtQcm9wZXJ0eSwgcHJpbWFyeSwgcHJvcGVydGllcywgc25pcHBldFByb3BlcnR5LCBzdWJ0aXRsZVByb3BlcnRpZXMsIHRpdGxlUHJvcGVydHksIHR5cGUsIFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb25cbiAgICBfX3BhY2tJZCwgY3JlYXRlZEF0UHJvcGVydHksIGNyZWF0ZWRCeVByb3BlcnR5LCBtb2RpZmllZEF0UHJvcGVydHksIG1vZGlmaWVkQnlQcm9wZXJ0eSwgdXNlckVtYWlsUHJvcGVydHksIHVzZXJJZFByb3BlcnR5LCBncm91cElkUHJvcGVydHksIG1lbWJlckdyb3VwSWRQcm9wZXJ0eSwgdmVyc2lvblByb3BlcnR5LCBpbmRleCwgcGFyZW50LCAuLi5yZXN0IH0gPSBzY2hlbWE7XG4gICAgLy8gSGF2ZSBUUyBlbnN1cmUgd2UgZG9uJ3QgZm9yZ2V0IGFib3V0IG5ldyBmaWVsZHMgaW4gdGhpcyBmdW5jdGlvbi5cbiAgICAoMCwgZW5zdXJlXzMuZW5zdXJlTmV2ZXIpKCk7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocHJvcGVydGllcykpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZEtleSA9IG5vcm1hbGl6ZVNjaGVtYUtleShrZXkpO1xuICAgICAgICBjb25zdCBwcm9wZXJ0eSA9IHByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgY29uc3QgeyBkaXNwbGF5TmFtZSwgZml4ZWRJZCwgZnJvbUtleSwgbXV0YWJsZSwgb3JpZ2luYWxLZXksIHJlcXVpcmVkIH0gPSBwcm9wZXJ0eTtcbiAgICAgICAgaWYgKG9yaWdpbmFsS2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09yaWdpbmFsIGtleSBpcyBvbmx5IGZvciBpbnRlcm5hbCB1c2UuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFByb3BlcnR5QXR0cnMgPSB7XG4gICAgICAgICAgICBkaXNwbGF5TmFtZSxcbiAgICAgICAgICAgIGZpeGVkSWQsXG4gICAgICAgICAgICBmcm9tS2V5OiBmcm9tS2V5IHx8IChub3JtYWxpemVkS2V5ICE9PSBrZXkgPyBrZXkgOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgbXV0YWJsZSxcbiAgICAgICAgICAgIG9yaWdpbmFsS2V5OiBrZXksXG4gICAgICAgICAgICByZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICAgICAgbm9ybWFsaXplZFByb3BlcnRpZXNbbm9ybWFsaXplZEtleV0gPSBPYmplY3QuYXNzaWduKG5vcm1hbGl6ZVNjaGVtYShwcm9wZXJ0eSksIG5vcm1hbGl6ZWRQcm9wZXJ0eUF0dHJzKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXR0cmlidXRpb24sXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHJlcXVpcmVGb3JVcGRhdGVzLFxuICAgICAgICBjb2RhVHlwZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGRpc3BsYXlQcm9wZXJ0eTogZGlzcGxheVByb3BlcnR5ID8gbm9ybWFsaXplU2NoZW1hS2V5KGRpc3BsYXlQcm9wZXJ0eSkgOiB1bmRlZmluZWQsXG4gICAgICAgIGZlYXR1cmVkOiBmZWF0dXJlZCA/IGZlYXR1cmVkLm1hcChub3JtYWxpemVTY2hlbWFLZXkpIDogdW5kZWZpbmVkLFxuICAgICAgICBmZWF0dXJlZFByb3BlcnRpZXM6IGZlYXR1cmVkUHJvcGVydGllcyA/IGZlYXR1cmVkUHJvcGVydGllcy5tYXAobm9ybWFsaXplU2NoZW1hS2V5KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgaWQ6IGlkID8gbm9ybWFsaXplU2NoZW1hS2V5KGlkKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgaWRlbnRpdHksXG4gICAgICAgIGlkUHJvcGVydHk6IGlkUHJvcGVydHkgPyBub3JtYWxpemVTY2hlbWFLZXkoaWRQcm9wZXJ0eSkgOiB1bmRlZmluZWQsXG4gICAgICAgIGltYWdlUHJvcGVydHk6IGltYWdlUHJvcGVydHkgPyBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIoaW1hZ2VQcm9wZXJ0eSwgbm9ybWFsaXplZFByb3BlcnRpZXMpIDogdW5kZWZpbmVkLFxuICAgICAgICBpbmNsdWRlVW5rbm93blByb3BlcnRpZXMsXG4gICAgICAgIGxpbmtQcm9wZXJ0eTogbGlua1Byb3BlcnR5ID8gbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKGxpbmtQcm9wZXJ0eSwgbm9ybWFsaXplZFByb3BlcnRpZXMpIDogdW5kZWZpbmVkLFxuICAgICAgICBwcmltYXJ5OiBwcmltYXJ5ID8gbm9ybWFsaXplU2NoZW1hS2V5KHByaW1hcnkpIDogdW5kZWZpbmVkLFxuICAgICAgICBwcm9wZXJ0aWVzOiBub3JtYWxpemVkUHJvcGVydGllcyxcbiAgICAgICAgc25pcHBldFByb3BlcnR5OiBzbmlwcGV0UHJvcGVydHlcbiAgICAgICAgICAgID8gbm9ybWFsaXplU2NoZW1hUHJvcGVydHlJZGVudGlmaWVyKHNuaXBwZXRQcm9wZXJ0eSwgbm9ybWFsaXplZFByb3BlcnRpZXMpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgc3VidGl0bGVQcm9wZXJ0aWVzOiBzdWJ0aXRsZVByb3BlcnRpZXNcbiAgICAgICAgICAgID8gc3VidGl0bGVQcm9wZXJ0aWVzLm1hcChzdWJQcm9wID0+IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihzdWJQcm9wLCBub3JtYWxpemVkUHJvcGVydGllcykpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGl0bGVQcm9wZXJ0eTogdGl0bGVQcm9wZXJ0eSA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcih0aXRsZVByb3BlcnR5LCBub3JtYWxpemVkUHJvcGVydGllcykgOiB1bmRlZmluZWQsXG4gICAgICAgIGNyZWF0ZWRBdFByb3BlcnR5OiBjcmVhdGVkQXRQcm9wZXJ0eVxuICAgICAgICAgICAgPyBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIoY3JlYXRlZEF0UHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGNyZWF0ZWRCeVByb3BlcnR5OiBjcmVhdGVkQnlQcm9wZXJ0eVxuICAgICAgICAgICAgPyBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIoY3JlYXRlZEJ5UHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIG1vZGlmaWVkQXRQcm9wZXJ0eTogbW9kaWZpZWRBdFByb3BlcnR5XG4gICAgICAgICAgICA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihtb2RpZmllZEF0UHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIG1vZGlmaWVkQnlQcm9wZXJ0eTogbW9kaWZpZWRCeVByb3BlcnR5XG4gICAgICAgICAgICA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihtb2RpZmllZEJ5UHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIHVzZXJFbWFpbFByb3BlcnR5OiB1c2VyRW1haWxQcm9wZXJ0eVxuICAgICAgICAgICAgPyBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIodXNlckVtYWlsUHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIHVzZXJJZFByb3BlcnR5OiB1c2VySWRQcm9wZXJ0eVxuICAgICAgICAgICAgPyBub3JtYWxpemVTY2hlbWFQcm9wZXJ0eUlkZW50aWZpZXIodXNlcklkUHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGdyb3VwSWRQcm9wZXJ0eTogZ3JvdXBJZFByb3BlcnR5XG4gICAgICAgICAgICA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihncm91cElkUHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIG1lbWJlckdyb3VwSWRQcm9wZXJ0eTogbWVtYmVyR3JvdXBJZFByb3BlcnR5XG4gICAgICAgICAgICA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcihtZW1iZXJHcm91cElkUHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIHZlcnNpb25Qcm9wZXJ0eTogdmVyc2lvblByb3BlcnR5XG4gICAgICAgICAgICA/IG5vcm1hbGl6ZVNjaGVtYVByb3BlcnR5SWRlbnRpZmllcih2ZXJzaW9uUHJvcGVydHksIG5vcm1hbGl6ZWRQcm9wZXJ0aWVzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIGluZGV4OiBpbmRleCA/IG5vcm1hbGl6ZUluZGV4RGVmaW5pdGlvbihpbmRleCwgbm9ybWFsaXplZFByb3BlcnRpZXMpIDogdW5kZWZpbmVkLFxuICAgICAgICBwYXJlbnQ6IHBhcmVudCA/IG5vcm1hbGl6ZVBhcmVudERlZmluaXRpb24ocGFyZW50LCBub3JtYWxpemVkUHJvcGVydGllcykgOiB1bmRlZmluZWQsXG4gICAgICAgIHR5cGU6IFZhbHVlVHlwZS5PYmplY3QsXG4gICAgfTtcbn1cbmV4cG9ydHMubm9ybWFsaXplT2JqZWN0U2NoZW1hID0gbm9ybWFsaXplT2JqZWN0U2NoZW1hO1xuLyoqXG4gKiBDb252ZW5pZW5jZSBmb3IgY3JlYXRpbmcgYSByZWZlcmVuY2Ugb2JqZWN0IHNjaGVtYSBmcm9tIGFuIGV4aXN0aW5nIHNjaGVtYSBmb3IgdGhlXG4gKiBvYmplY3QuIENvcGllcyBvdmVyIHRoZSBpZGVudGl0eSwgaWRQcm9wZXJ0eSwgYW5kIGRpc3BsYXlQcm9wZXJ0eSBmcm9tIHRoZSBzY2hlbWEsXG4gKiBhbmQgdGhlIHN1YnNldCBvZiBwcm9wZXJ0aWVzIGluZGljYXRlZCBieSB0aGUgaWRQcm9wZXJ0eSBhbmQgZGlzcGxheVByb3BlcnR5LlxuICogQSByZWZlcmVuY2Ugc2NoZW1hIGNhbiBhbHdheXMgYmUgZGVmaW5lZCBkaXJlY3RseSwgYnV0IGlmIHlvdSBhbHJlYWR5IGhhdmUgYW4gb2JqZWN0XG4gKiBzY2hlbWEgaXQgcHJvdmlkZXMgYmV0dGVyIGNvZGUgcmV1c2UgdG8gZGVyaXZlIGEgcmVmZXJlbmNlIHNjaGVtYSBpbnN0ZWFkLlxuICovXG5mdW5jdGlvbiBtYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYShzY2hlbWEsIGlkZW50aXR5TmFtZSkge1xuICAgIGNvbnN0IHsgdHlwZSwgaWQsIHByaW1hcnksIGlkZW50aXR5LCBwcm9wZXJ0aWVzLCBvcHRpb25zLCByZXF1aXJlRm9yVXBkYXRlcyB9ID0gKDAsIG1pZ3JhdGlvbl8xLm9iamVjdFNjaGVtYUhlbHBlcikoc2NoZW1hKTtcbiAgICBjb25zdCB7IG11dGFibGUgfSA9IHNjaGVtYTtcbiAgICAoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShpZGVudGl0eSB8fCBpZGVudGl0eU5hbWUsICdTb3VyY2Ugc2NoZW1hIG11c3QgaGF2ZSBhbiBpZGVudGl0eSBmaWVsZCwgb3IgeW91IG11c3QgcHJvdmlkZSBhbiBpZGVudGl0eSBuYW1lIGZvciB0aGUgcmVmZXJlbmNlLicpO1xuICAgIGNvbnN0IHZhbGlkSWQgPSAoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShpZCk7XG4gICAgY29uc3QgcmVmZXJlbmNlUHJvcGVydGllcyA9IHsgW3ZhbGlkSWRdOiBwcm9wZXJ0aWVzW3ZhbGlkSWRdIH07XG4gICAgaWYgKHByaW1hcnkgJiYgcHJpbWFyeSAhPT0gaWQpIHtcbiAgICAgICAgKDAsIGVuc3VyZV8yLmVuc3VyZUV4aXN0cykocHJvcGVydGllc1twcmltYXJ5XSwgYERpc3BsYXkgcHJvcGVydHkgXCIke3ByaW1hcnl9XCIgbXVzdCByZWZlciB0byBhIHZhbGlkIHByb3BlcnR5IHNjaGVtYS5gKTtcbiAgICAgICAgcmVmZXJlbmNlUHJvcGVydGllc1twcmltYXJ5XSA9IHByb3BlcnRpZXNbcHJpbWFyeV07XG4gICAgfVxuICAgIGNvbnN0IHJlZmVyZW5jZVNjaGVtYSA9IHtcbiAgICAgICAgY29kYVR5cGU6IFZhbHVlSGludFR5cGUuUmVmZXJlbmNlLFxuICAgICAgICBkaXNwbGF5UHJvcGVydHk6IHByaW1hcnksXG4gICAgICAgIGlkZW50aXR5OiBpZGVudGl0eSB8fCB7IG5hbWU6ICgwLCBlbnN1cmVfMi5lbnN1cmVFeGlzdHMpKGlkZW50aXR5TmFtZSkgfSxcbiAgICAgICAgaWRQcm9wZXJ0eTogaWQsXG4gICAgICAgIG11dGFibGUsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHByb3BlcnRpZXM6IHJlZmVyZW5jZVByb3BlcnRpZXMsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHJlcXVpcmVGb3JVcGRhdGVzLFxuICAgIH07XG4gICAgcmV0dXJuIG1ha2VPYmplY3RTY2hlbWEocmVmZXJlbmNlU2NoZW1hKTtcbn1cbmV4cG9ydHMubWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWEgPSBtYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYTtcbi8qKlxuICogQ29udmVuaWVuY2UgZm9yIGRlZmluaW5nIHRoZSByZXN1bHQgc2NoZW1hIGZvciBhbiBhY3Rpb24uIFRoZSBpZGVudGl0eSBlbmFibGVzIENvZGEgdG9cbiAqIHVwZGF0ZSB0aGUgY29ycmVzcG9uZGluZyBzeW5jIHRhYmxlIHJvdywgaWYgaXQgZXhpc3RzLlxuICogWW91IGNvdWxkIGFkZCB0aGUgaWRlbnRpdHkgZGlyZWN0bHksIGJ1dCB0aGF0IHdvdWxkIG1ha2UgdGhlIHNjaGVtYSBsZXNzIHJlLXVzYWJsZS5cbiAqL1xuZnVuY3Rpb24gd2l0aElkZW50aXR5KHNjaGVtYSwgaWRlbnRpdHlOYW1lKSB7XG4gICAgcmV0dXJuIG1ha2VPYmplY3RTY2hlbWEoe1xuICAgICAgICAuLi4oMCwgb2JqZWN0X3V0aWxzXzEuZGVlcENvcHkpKHNjaGVtYSksXG4gICAgICAgIGlkZW50aXR5OiB7IG5hbWU6ICgwLCBlbnN1cmVfNC5lbnN1cmVOb25FbXB0eVN0cmluZykoaWRlbnRpdHlOYW1lKSB9LFxuICAgIH0pO1xufVxuZXhwb3J0cy53aXRoSWRlbnRpdHkgPSB3aXRoSWRlbnRpdHk7XG4vKipcbiAqIElmIHNvbWVvbmUgdHJpZXMgdG8gcHV0IGEganMgZnVuY3Rpb24gaW50byBhIGdldFNjaGVtYSByZXN1bHQgaW4gYSBkeW5hbWljIHNjaGVtYSwgaXQncyBub3QgZ29pbmcgdG8gd29yay5cbiAqIFRoaXMgbWV0aG9kIGlzIHRvIGRldGVjdCB0aGlzIHByb2FjdGl2ZWx5IGFuZCBnaXZlIGEgY2xlYXIsIHVzZXItdmlzaWJsZSBlcnJvciBtZXNzYWdlLiBPdGhlcndpc2UgdGhlIGVycm9yXG4gKiB0aGV5J2QgZ2V0IHdvdWxkIGJlIGFuIGludGVybmFsIGVycm9yLCBhbmQgdGhlIHBhY2sgbWFrZXIgdG9vbHMgbG9ncyB3b3VsZCBqdXN0IG1lbnRpb24gdGhhdCBzdHJ1Y3R1cmVkIGNsb25lXG4gKiBmYWlsZWQgdG8gY29weSBhIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB0aHJvd09uRHluYW1pY1NjaGVtYVdpdGhKc09wdGlvbnNGdW5jdGlvbihkeW5hbWljU2NoZW1hLCBwYXJlbnRLZXkpIHtcbiAgICBpZiAoIWR5bmFtaWNTY2hlbWEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShkeW5hbWljU2NoZW1hKSkge1xuICAgICAgICBkeW5hbWljU2NoZW1hLmZvckVhY2goaXRlbSA9PiB0aHJvd09uRHluYW1pY1NjaGVtYVdpdGhKc09wdGlvbnNGdW5jdGlvbihpdGVtKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkeW5hbWljU2NoZW1hID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkeW5hbWljU2NoZW1hKSkge1xuICAgICAgICAgICAgdGhyb3dPbkR5bmFtaWNTY2hlbWFXaXRoSnNPcHRpb25zRnVuY3Rpb24oZHluYW1pY1NjaGVtYVtrZXldLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZHluYW1pY1NjaGVtYSA9PT0gJ2Z1bmN0aW9uJyAmJiBwYXJlbnRLZXkgPT09ICdvcHRpb25zJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N5bmMgdGFibGVzIHdpdGggZHluYW1pYyBzY2hlbWFzIG11c3QgdXNlIFwib3B0aW9uczogT3B0aW9uc1R5cGUuRHluYW1pY1wiIGluc3RlYWQgb2YgXCJvcHRpb25zOiAoKSA9PiB7Li4ufScpO1xuICAgIH1cbn1cbmV4cG9ydHMudGhyb3dPbkR5bmFtaWNTY2hlbWFXaXRoSnNPcHRpb25zRnVuY3Rpb24gPSB0aHJvd09uRHluYW1pY1NjaGVtYVdpdGhKc09wdGlvbnNGdW5jdGlvbjtcbiIsICJ2YXIgY2xvbmUgPSAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9pbnN0YW5jZW9mKG9iaiwgdHlwZSkge1xuICByZXR1cm4gdHlwZSAhPSBudWxsICYmIG9iaiBpbnN0YW5jZW9mIHR5cGU7XG59XG5cbnZhciBuYXRpdmVNYXA7XG50cnkge1xuICBuYXRpdmVNYXAgPSBNYXA7XG59IGNhdGNoKF8pIHtcbiAgLy8gbWF5YmUgYSByZWZlcmVuY2UgZXJyb3IgYmVjYXVzZSBubyBgTWFwYC4gR2l2ZSBpdCBhIGR1bW15IHZhbHVlIHRoYXQgbm9cbiAgLy8gdmFsdWUgd2lsbCBldmVyIGJlIGFuIGluc3RhbmNlb2YuXG4gIG5hdGl2ZU1hcCA9IGZ1bmN0aW9uKCkge307XG59XG5cbnZhciBuYXRpdmVTZXQ7XG50cnkge1xuICBuYXRpdmVTZXQgPSBTZXQ7XG59IGNhdGNoKF8pIHtcbiAgbmF0aXZlU2V0ID0gZnVuY3Rpb24oKSB7fTtcbn1cblxudmFyIG5hdGl2ZVByb21pc2U7XG50cnkge1xuICBuYXRpdmVQcm9taXNlID0gUHJvbWlzZTtcbn0gY2F0Y2goXykge1xuICBuYXRpdmVQcm9taXNlID0gZnVuY3Rpb24oKSB7fTtcbn1cblxuLyoqXG4gKiBDbG9uZXMgKGNvcGllcykgYW4gT2JqZWN0IHVzaW5nIGRlZXAgY29weWluZy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHN1cHBvcnRzIGNpcmN1bGFyIHJlZmVyZW5jZXMgYnkgZGVmYXVsdCwgYnV0IGlmIHlvdSBhcmUgY2VydGFpblxuICogdGhlcmUgYXJlIG5vIGNpcmN1bGFyIHJlZmVyZW5jZXMgaW4geW91ciBvYmplY3QsIHlvdSBjYW4gc2F2ZSBzb21lIENQVSB0aW1lXG4gKiBieSBjYWxsaW5nIGNsb25lKG9iaiwgZmFsc2UpLlxuICpcbiAqIENhdXRpb246IGlmIGBjaXJjdWxhcmAgaXMgZmFsc2UgYW5kIGBwYXJlbnRgIGNvbnRhaW5zIGNpcmN1bGFyIHJlZmVyZW5jZXMsXG4gKiB5b3VyIHByb2dyYW0gbWF5IGVudGVyIGFuIGluZmluaXRlIGxvb3AgYW5kIGNyYXNoLlxuICpcbiAqIEBwYXJhbSBgcGFyZW50YCAtIHRoZSBvYmplY3QgdG8gYmUgY2xvbmVkXG4gKiBAcGFyYW0gYGNpcmN1bGFyYCAtIHNldCB0byB0cnVlIGlmIHRoZSBvYmplY3QgdG8gYmUgY2xvbmVkIG1heSBjb250YWluXG4gKiAgICBjaXJjdWxhciByZWZlcmVuY2VzLiAob3B0aW9uYWwgLSB0cnVlIGJ5IGRlZmF1bHQpXG4gKiBAcGFyYW0gYGRlcHRoYCAtIHNldCB0byBhIG51bWJlciBpZiB0aGUgb2JqZWN0IGlzIG9ubHkgdG8gYmUgY2xvbmVkIHRvXG4gKiAgICBhIHBhcnRpY3VsYXIgZGVwdGguIChvcHRpb25hbCAtIGRlZmF1bHRzIHRvIEluZmluaXR5KVxuICogQHBhcmFtIGBwcm90b3R5cGVgIC0gc2V0cyB0aGUgcHJvdG90eXBlIHRvIGJlIHVzZWQgd2hlbiBjbG9uaW5nIGFuIG9iamVjdC5cbiAqICAgIChvcHRpb25hbCAtIGRlZmF1bHRzIHRvIHBhcmVudCBwcm90b3R5cGUpLlxuICogQHBhcmFtIGBpbmNsdWRlTm9uRW51bWVyYWJsZWAgLSBzZXQgdG8gdHJ1ZSBpZiB0aGUgbm9uLWVudW1lcmFibGUgcHJvcGVydGllc1xuICogICAgc2hvdWxkIGJlIGNsb25lZCBhcyB3ZWxsLiBOb24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9uIHRoZSBwcm90b3R5cGVcbiAqICAgIGNoYWluIHdpbGwgYmUgaWdub3JlZC4gKG9wdGlvbmFsIC0gZmFsc2UgYnkgZGVmYXVsdClcbiovXG5mdW5jdGlvbiBjbG9uZShwYXJlbnQsIGNpcmN1bGFyLCBkZXB0aCwgcHJvdG90eXBlLCBpbmNsdWRlTm9uRW51bWVyYWJsZSkge1xuICBpZiAodHlwZW9mIGNpcmN1bGFyID09PSAnb2JqZWN0Jykge1xuICAgIGRlcHRoID0gY2lyY3VsYXIuZGVwdGg7XG4gICAgcHJvdG90eXBlID0gY2lyY3VsYXIucHJvdG90eXBlO1xuICAgIGluY2x1ZGVOb25FbnVtZXJhYmxlID0gY2lyY3VsYXIuaW5jbHVkZU5vbkVudW1lcmFibGU7XG4gICAgY2lyY3VsYXIgPSBjaXJjdWxhci5jaXJjdWxhcjtcbiAgfVxuICAvLyBtYWludGFpbiB0d28gYXJyYXlzIGZvciBjaXJjdWxhciByZWZlcmVuY2VzLCB3aGVyZSBjb3JyZXNwb25kaW5nIHBhcmVudHNcbiAgLy8gYW5kIGNoaWxkcmVuIGhhdmUgdGhlIHNhbWUgaW5kZXhcbiAgdmFyIGFsbFBhcmVudHMgPSBbXTtcbiAgdmFyIGFsbENoaWxkcmVuID0gW107XG5cbiAgdmFyIHVzZUJ1ZmZlciA9IHR5cGVvZiBCdWZmZXIgIT0gJ3VuZGVmaW5lZCc7XG5cbiAgaWYgKHR5cGVvZiBjaXJjdWxhciA9PSAndW5kZWZpbmVkJylcbiAgICBjaXJjdWxhciA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBkZXB0aCA9PSAndW5kZWZpbmVkJylcbiAgICBkZXB0aCA9IEluZmluaXR5O1xuXG4gIC8vIHJlY3Vyc2UgdGhpcyBmdW5jdGlvbiBzbyB3ZSBkb24ndCByZXNldCBhbGxQYXJlbnRzIGFuZCBhbGxDaGlsZHJlblxuICBmdW5jdGlvbiBfY2xvbmUocGFyZW50LCBkZXB0aCkge1xuICAgIC8vIGNsb25pbmcgbnVsbCBhbHdheXMgcmV0dXJucyBudWxsXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbClcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgaWYgKGRlcHRoID09PSAwKVxuICAgICAgcmV0dXJuIHBhcmVudDtcblxuICAgIHZhciBjaGlsZDtcbiAgICB2YXIgcHJvdG87XG4gICAgaWYgKHR5cGVvZiBwYXJlbnQgIT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfVxuXG4gICAgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlTWFwKSkge1xuICAgICAgY2hpbGQgPSBuZXcgbmF0aXZlTWFwKCk7XG4gICAgfSBlbHNlIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZVNldCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IG5hdGl2ZVNldCgpO1xuICAgIH0gZWxzZSBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVQcm9taXNlKSkge1xuICAgICAgY2hpbGQgPSBuZXcgbmF0aXZlUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHBhcmVudC50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgcmVzb2x2ZShfY2xvbmUodmFsdWUsIGRlcHRoIC0gMSkpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICByZWplY3QoX2Nsb25lKGVyciwgZGVwdGggLSAxKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChjbG9uZS5fX2lzQXJyYXkocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBbXTtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNSZWdFeHAocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBuZXcgUmVnRXhwKHBhcmVudC5zb3VyY2UsIF9fZ2V0UmVnRXhwRmxhZ3MocGFyZW50KSk7XG4gICAgICBpZiAocGFyZW50Lmxhc3RJbmRleCkgY2hpbGQubGFzdEluZGV4ID0gcGFyZW50Lmxhc3RJbmRleDtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNEYXRlKHBhcmVudCkpIHtcbiAgICAgIGNoaWxkID0gbmV3IERhdGUocGFyZW50LmdldFRpbWUoKSk7XG4gICAgfSBlbHNlIGlmICh1c2VCdWZmZXIgJiYgQnVmZmVyLmlzQnVmZmVyKHBhcmVudCkpIHtcbiAgICAgIGlmIChCdWZmZXIuYWxsb2NVbnNhZmUpIHtcbiAgICAgICAgLy8gTm9kZS5qcyA+PSA0LjUuMFxuICAgICAgICBjaGlsZCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShwYXJlbnQubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE9sZGVyIE5vZGUuanMgdmVyc2lvbnNcbiAgICAgICAgY2hpbGQgPSBuZXcgQnVmZmVyKHBhcmVudC5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgcGFyZW50LmNvcHkoY2hpbGQpO1xuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH0gZWxzZSBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBFcnJvcikpIHtcbiAgICAgIGNoaWxkID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHByb3RvdHlwZSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwYXJlbnQpO1xuICAgICAgICBjaGlsZCA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNoaWxkID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuICAgICAgICBwcm90byA9IHByb3RvdHlwZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2lyY3VsYXIpIHtcbiAgICAgIHZhciBpbmRleCA9IGFsbFBhcmVudHMuaW5kZXhPZihwYXJlbnQpO1xuXG4gICAgICBpZiAoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGFsbENoaWxkcmVuW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGFsbFBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgYWxsQ2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgfVxuXG4gICAgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlTWFwKSkge1xuICAgICAgcGFyZW50LmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICB2YXIga2V5Q2hpbGQgPSBfY2xvbmUoa2V5LCBkZXB0aCAtIDEpO1xuICAgICAgICB2YXIgdmFsdWVDaGlsZCA9IF9jbG9uZSh2YWx1ZSwgZGVwdGggLSAxKTtcbiAgICAgICAgY2hpbGQuc2V0KGtleUNoaWxkLCB2YWx1ZUNoaWxkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVTZXQpKSB7XG4gICAgICBwYXJlbnQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICB2YXIgZW50cnlDaGlsZCA9IF9jbG9uZSh2YWx1ZSwgZGVwdGggLSAxKTtcbiAgICAgICAgY2hpbGQuYWRkKGVudHJ5Q2hpbGQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSBpbiBwYXJlbnQpIHtcbiAgICAgIHZhciBhdHRycztcbiAgICAgIGlmIChwcm90bykge1xuICAgICAgICBhdHRycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXR0cnMgJiYgYXR0cnMuc2V0ID09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjaGlsZFtpXSA9IF9jbG9uZShwYXJlbnRbaV0sIGRlcHRoIC0gMSk7XG4gICAgfVxuXG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgIHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhwYXJlbnQpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIERvbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgY2xvbmluZyBhIHN5bWJvbCBiZWNhdXNlIGl0IGlzIGEgcHJpbWl0aXZlLFxuICAgICAgICAvLyBsaWtlIGEgbnVtYmVyIG9yIHN0cmluZy5cbiAgICAgICAgdmFyIHN5bWJvbCA9IHN5bWJvbHNbaV07XG4gICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwYXJlbnQsIHN5bWJvbCk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmICFkZXNjcmlwdG9yLmVudW1lcmFibGUgJiYgIWluY2x1ZGVOb25FbnVtZXJhYmxlKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY2hpbGRbc3ltYm9sXSA9IF9jbG9uZShwYXJlbnRbc3ltYm9sXSwgZGVwdGggLSAxKTtcbiAgICAgICAgaWYgKCFkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2hpbGQsIHN5bWJvbCwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbmNsdWRlTm9uRW51bWVyYWJsZSkge1xuICAgICAgdmFyIGFsbFByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwYXJlbnQpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxQcm9wZXJ0eU5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSBhbGxQcm9wZXJ0eU5hbWVzW2ldO1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocGFyZW50LCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZFtwcm9wZXJ0eU5hbWVdID0gX2Nsb25lKHBhcmVudFtwcm9wZXJ0eU5hbWVdLCBkZXB0aCAtIDEpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2hpbGQsIHByb3BlcnR5TmFtZSwge1xuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGlsZDtcbiAgfVxuXG4gIHJldHVybiBfY2xvbmUocGFyZW50LCBkZXB0aCk7XG59XG5cbi8qKlxuICogU2ltcGxlIGZsYXQgY2xvbmUgdXNpbmcgcHJvdG90eXBlLCBhY2NlcHRzIG9ubHkgb2JqZWN0cywgdXNlZnVsbCBmb3IgcHJvcGVydHlcbiAqIG92ZXJyaWRlIG9uIEZMQVQgY29uZmlndXJhdGlvbiBvYmplY3QgKG5vIG5lc3RlZCBwcm9wcykuXG4gKlxuICogVVNFIFdJVEggQ0FVVElPTiEgVGhpcyBtYXkgbm90IGJlaGF2ZSBhcyB5b3Ugd2lzaCBpZiB5b3UgZG8gbm90IGtub3cgaG93IHRoaXNcbiAqIHdvcmtzLlxuICovXG5jbG9uZS5jbG9uZVByb3RvdHlwZSA9IGZ1bmN0aW9uIGNsb25lUHJvdG90eXBlKHBhcmVudCkge1xuICBpZiAocGFyZW50ID09PSBudWxsKVxuICAgIHJldHVybiBudWxsO1xuXG4gIHZhciBjID0gZnVuY3Rpb24gKCkge307XG4gIGMucHJvdG90eXBlID0gcGFyZW50O1xuICByZXR1cm4gbmV3IGMoKTtcbn07XG5cbi8vIHByaXZhdGUgdXRpbGl0eSBmdW5jdGlvbnNcblxuZnVuY3Rpb24gX19vYmpUb1N0cihvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5jbG9uZS5fX29ialRvU3RyID0gX19vYmpUb1N0cjtcblxuZnVuY3Rpb24gX19pc0RhdGUobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIF9fb2JqVG9TdHIobykgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmNsb25lLl9faXNEYXRlID0gX19pc0RhdGU7XG5cbmZ1bmN0aW9uIF9faXNBcnJheShvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cbmNsb25lLl9faXNBcnJheSA9IF9faXNBcnJheTtcblxuZnVuY3Rpb24gX19pc1JlZ0V4cChvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5jbG9uZS5fX2lzUmVnRXhwID0gX19pc1JlZ0V4cDtcblxuZnVuY3Rpb24gX19nZXRSZWdFeHBGbGFncyhyZSkge1xuICB2YXIgZmxhZ3MgPSAnJztcbiAgaWYgKHJlLmdsb2JhbCkgZmxhZ3MgKz0gJ2cnO1xuICBpZiAocmUuaWdub3JlQ2FzZSkgZmxhZ3MgKz0gJ2knO1xuICBpZiAocmUubXVsdGlsaW5lKSBmbGFncyArPSAnbSc7XG4gIHJldHVybiBmbGFncztcbn1cbmNsb25lLl9fZ2V0UmVnRXhwRmxhZ3MgPSBfX2dldFJlZ0V4cEZsYWdzO1xuXG5yZXR1cm4gY2xvbmU7XG59KSgpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3R5cGUnKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gVHlwZUVycm9yO1xuIiwgIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgndXRpbCcpLmluc3BlY3Q7XG4iLCAidmFyIGhhc01hcCA9IHR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgTWFwLnByb3RvdHlwZTtcbnZhciBtYXBTaXplRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgaGFzTWFwID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihNYXAucHJvdG90eXBlLCAnc2l6ZScpIDogbnVsbDtcbnZhciBtYXBTaXplID0gaGFzTWFwICYmIG1hcFNpemVEZXNjcmlwdG9yICYmIHR5cGVvZiBtYXBTaXplRGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbicgPyBtYXBTaXplRGVzY3JpcHRvci5nZXQgOiBudWxsO1xudmFyIG1hcEZvckVhY2ggPSBoYXNNYXAgJiYgTWFwLnByb3RvdHlwZS5mb3JFYWNoO1xudmFyIGhhc1NldCA9IHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgU2V0LnByb3RvdHlwZTtcbnZhciBzZXRTaXplRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgaGFzU2V0ID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihTZXQucHJvdG90eXBlLCAnc2l6ZScpIDogbnVsbDtcbnZhciBzZXRTaXplID0gaGFzU2V0ICYmIHNldFNpemVEZXNjcmlwdG9yICYmIHR5cGVvZiBzZXRTaXplRGVzY3JpcHRvci5nZXQgPT09ICdmdW5jdGlvbicgPyBzZXRTaXplRGVzY3JpcHRvci5nZXQgOiBudWxsO1xudmFyIHNldEZvckVhY2ggPSBoYXNTZXQgJiYgU2V0LnByb3RvdHlwZS5mb3JFYWNoO1xudmFyIGhhc1dlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrTWFwLnByb3RvdHlwZTtcbnZhciB3ZWFrTWFwSGFzID0gaGFzV2Vha01hcCA/IFdlYWtNYXAucHJvdG90eXBlLmhhcyA6IG51bGw7XG52YXIgaGFzV2Vha1NldCA9IHR5cGVvZiBXZWFrU2V0ID09PSAnZnVuY3Rpb24nICYmIFdlYWtTZXQucHJvdG90eXBlO1xudmFyIHdlYWtTZXRIYXMgPSBoYXNXZWFrU2V0ID8gV2Vha1NldC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbnZhciBoYXNXZWFrUmVmID0gdHlwZW9mIFdlYWtSZWYgPT09ICdmdW5jdGlvbicgJiYgV2Vha1JlZi5wcm90b3R5cGU7XG52YXIgd2Vha1JlZkRlcmVmID0gaGFzV2Vha1JlZiA/IFdlYWtSZWYucHJvdG90eXBlLmRlcmVmIDogbnVsbDtcbnZhciBib29sZWFuVmFsdWVPZiA9IEJvb2xlYW4ucHJvdG90eXBlLnZhbHVlT2Y7XG52YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgJG1hdGNoID0gU3RyaW5nLnByb3RvdHlwZS5tYXRjaDtcbnZhciAkc2xpY2UgPSBTdHJpbmcucHJvdG90eXBlLnNsaWNlO1xudmFyICRyZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyICR0b1VwcGVyQ2FzZSA9IFN0cmluZy5wcm90b3R5cGUudG9VcHBlckNhc2U7XG52YXIgJHRvTG93ZXJDYXNlID0gU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZTtcbnZhciAkdGVzdCA9IFJlZ0V4cC5wcm90b3R5cGUudGVzdDtcbnZhciAkY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdDtcbnZhciAkam9pbiA9IEFycmF5LnByb3RvdHlwZS5qb2luO1xudmFyICRhcnJTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciAkZmxvb3IgPSBNYXRoLmZsb29yO1xudmFyIGJpZ0ludFZhbHVlT2YgPSB0eXBlb2YgQmlnSW50ID09PSAnZnVuY3Rpb24nID8gQmlnSW50LnByb3RvdHlwZS52YWx1ZU9mIDogbnVsbDtcbnZhciBnT1BTID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBzeW1Ub1N0cmluZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcgPyBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nIDogbnVsbDtcbnZhciBoYXNTaGFtbWVkU3ltYm9scyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ29iamVjdCc7XG4vLyBpZSwgYGhhcy10b3N0cmluZ3RhZy9zaGFtc1xudmFyIHRvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcgJiYgKHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09IGhhc1NoYW1tZWRTeW1ib2xzID8gJ29iamVjdCcgOiAnc3ltYm9sJylcbiAgICA/IFN5bWJvbC50b1N0cmluZ1RhZ1xuICAgIDogbnVsbDtcbnZhciBpc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG52YXIgZ1BPID0gKHR5cGVvZiBSZWZsZWN0ID09PSAnZnVuY3Rpb24nID8gUmVmbGVjdC5nZXRQcm90b3R5cGVPZiA6IE9iamVjdC5nZXRQcm90b3R5cGVPZikgfHwgKFxuICAgIFtdLl9fcHJvdG9fXyA9PT0gQXJyYXkucHJvdG90eXBlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cbiAgICAgICAgPyBmdW5jdGlvbiAoTykge1xuICAgICAgICAgICAgcmV0dXJuIE8uX19wcm90b19fOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG4gICAgICAgIH1cbiAgICAgICAgOiBudWxsXG4pO1xuXG5mdW5jdGlvbiBhZGROdW1lcmljU2VwYXJhdG9yKG51bSwgc3RyKSB7XG4gICAgaWYgKFxuICAgICAgICBudW0gPT09IEluZmluaXR5XG4gICAgICAgIHx8IG51bSA9PT0gLUluZmluaXR5XG4gICAgICAgIHx8IG51bSAhPT0gbnVtXG4gICAgICAgIHx8IChudW0gJiYgbnVtID4gLTEwMDAgJiYgbnVtIDwgMTAwMClcbiAgICAgICAgfHwgJHRlc3QuY2FsbCgvZS8sIHN0cilcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgdmFyIHNlcFJlZ2V4ID0gL1swLTldKD89KD86WzAtOV17M30pKyg/IVswLTldKSkvZztcbiAgICBpZiAodHlwZW9mIG51bSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgdmFyIGludCA9IG51bSA8IDAgPyAtJGZsb29yKC1udW0pIDogJGZsb29yKG51bSk7IC8vIHRydW5jKG51bSlcbiAgICAgICAgaWYgKGludCAhPT0gbnVtKSB7XG4gICAgICAgICAgICB2YXIgaW50U3RyID0gU3RyaW5nKGludCk7XG4gICAgICAgICAgICB2YXIgZGVjID0gJHNsaWNlLmNhbGwoc3RyLCBpbnRTdHIubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChpbnRTdHIsIHNlcFJlZ2V4LCAnJCZfJykgKyAnLicgKyAkcmVwbGFjZS5jYWxsKCRyZXBsYWNlLmNhbGwoZGVjLCAvKFswLTldezN9KS9nLCAnJCZfJyksIC9fJC8sICcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChzdHIsIHNlcFJlZ2V4LCAnJCZfJyk7XG59XG5cbnZhciB1dGlsSW5zcGVjdCA9IHJlcXVpcmUoJy4vdXRpbC5pbnNwZWN0Jyk7XG52YXIgaW5zcGVjdEN1c3RvbSA9IHV0aWxJbnNwZWN0LmN1c3RvbTtcbnZhciBpbnNwZWN0U3ltYm9sID0gaXNTeW1ib2woaW5zcGVjdEN1c3RvbSkgPyBpbnNwZWN0Q3VzdG9tIDogbnVsbDtcblxudmFyIHF1b3RlcyA9IHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgJ2RvdWJsZSc6ICdcIicsXG4gICAgc2luZ2xlOiBcIidcIlxufTtcbnZhciBxdW90ZVJFcyA9IHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgJ2RvdWJsZSc6IC8oW1wiXFxcXF0pL2csXG4gICAgc2luZ2xlOiAvKFsnXFxcXF0pL2dcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5zcGVjdF8ob2JqLCBvcHRpb25zLCBkZXB0aCwgc2Vlbikge1xuICAgIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIGlmIChoYXMob3B0cywgJ3F1b3RlU3R5bGUnKSAmJiAhaGFzKHF1b3Rlcywgb3B0cy5xdW90ZVN0eWxlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJxdW90ZVN0eWxlXCIgbXVzdCBiZSBcInNpbmdsZVwiIG9yIFwiZG91YmxlXCInKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgICBoYXMob3B0cywgJ21heFN0cmluZ0xlbmd0aCcpICYmICh0eXBlb2Ygb3B0cy5tYXhTdHJpbmdMZW5ndGggPT09ICdudW1iZXInXG4gICAgICAgICAgICA/IG9wdHMubWF4U3RyaW5nTGVuZ3RoIDwgMCAmJiBvcHRzLm1heFN0cmluZ0xlbmd0aCAhPT0gSW5maW5pdHlcbiAgICAgICAgICAgIDogb3B0cy5tYXhTdHJpbmdMZW5ndGggIT09IG51bGxcbiAgICAgICAgKVxuICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJtYXhTdHJpbmdMZW5ndGhcIiwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyLCBJbmZpbml0eSwgb3IgYG51bGxgJyk7XG4gICAgfVxuICAgIHZhciBjdXN0b21JbnNwZWN0ID0gaGFzKG9wdHMsICdjdXN0b21JbnNwZWN0JykgPyBvcHRzLmN1c3RvbUluc3BlY3QgOiB0cnVlO1xuICAgIGlmICh0eXBlb2YgY3VzdG9tSW5zcGVjdCAhPT0gJ2Jvb2xlYW4nICYmIGN1c3RvbUluc3BlY3QgIT09ICdzeW1ib2wnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcImN1c3RvbUluc3BlY3RcIiwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYHRydWVgLCBgZmFsc2VgLCBvciBgXFwnc3ltYm9sXFwnYCcpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgaGFzKG9wdHMsICdpbmRlbnQnKVxuICAgICAgICAmJiBvcHRzLmluZGVudCAhPT0gbnVsbFxuICAgICAgICAmJiBvcHRzLmluZGVudCAhPT0gJ1xcdCdcbiAgICAgICAgJiYgIShwYXJzZUludChvcHRzLmluZGVudCwgMTApID09PSBvcHRzLmluZGVudCAmJiBvcHRzLmluZGVudCA+IDApXG4gICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcImluZGVudFwiIG11c3QgYmUgXCJcXFxcdFwiLCBhbiBpbnRlZ2VyID4gMCwgb3IgYG51bGxgJyk7XG4gICAgfVxuICAgIGlmIChoYXMob3B0cywgJ251bWVyaWNTZXBhcmF0b3InKSAmJiB0eXBlb2Ygb3B0cy5udW1lcmljU2VwYXJhdG9yICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwibnVtZXJpY1NlcGFyYXRvclwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBgdHJ1ZWAgb3IgYGZhbHNlYCcpO1xuICAgIH1cbiAgICB2YXIgbnVtZXJpY1NlcGFyYXRvciA9IG9wdHMubnVtZXJpY1NlcGFyYXRvcjtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gb2JqID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGluc3BlY3RTdHJpbmcob2JqLCBvcHRzKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmIChvYmogPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBJbmZpbml0eSAvIG9iaiA+IDAgPyAnMCcgOiAnLTAnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdHIgPSBTdHJpbmcob2JqKTtcbiAgICAgICAgcmV0dXJuIG51bWVyaWNTZXBhcmF0b3IgPyBhZGROdW1lcmljU2VwYXJhdG9yKG9iaiwgc3RyKSA6IHN0cjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdiaWdpbnQnKSB7XG4gICAgICAgIHZhciBiaWdJbnRTdHIgPSBTdHJpbmcob2JqKSArICduJztcbiAgICAgICAgcmV0dXJuIG51bWVyaWNTZXBhcmF0b3IgPyBhZGROdW1lcmljU2VwYXJhdG9yKG9iaiwgYmlnSW50U3RyKSA6IGJpZ0ludFN0cjtcbiAgICB9XG5cbiAgICB2YXIgbWF4RGVwdGggPSB0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ3VuZGVmaW5lZCcgPyA1IDogb3B0cy5kZXB0aDtcbiAgICBpZiAodHlwZW9mIGRlcHRoID09PSAndW5kZWZpbmVkJykgeyBkZXB0aCA9IDA7IH1cbiAgICBpZiAoZGVwdGggPj0gbWF4RGVwdGggJiYgbWF4RGVwdGggPiAwICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnW0FycmF5XScgOiAnW09iamVjdF0nO1xuICAgIH1cblxuICAgIHZhciBpbmRlbnQgPSBnZXRJbmRlbnQob3B0cywgZGVwdGgpO1xuXG4gICAgaWYgKHR5cGVvZiBzZWVuID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzZWVuID0gW107XG4gICAgfSBlbHNlIGlmIChpbmRleE9mKHNlZW4sIG9iaikgPj0gMCkge1xuICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3BlY3QodmFsdWUsIGZyb20sIG5vSW5kZW50KSB7XG4gICAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgICAgICBzZWVuID0gJGFyclNsaWNlLmNhbGwoc2Vlbik7XG4gICAgICAgICAgICBzZWVuLnB1c2goZnJvbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vSW5kZW50KSB7XG4gICAgICAgICAgICB2YXIgbmV3T3B0cyA9IHtcbiAgICAgICAgICAgICAgICBkZXB0aDogb3B0cy5kZXB0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChoYXMob3B0cywgJ3F1b3RlU3R5bGUnKSkge1xuICAgICAgICAgICAgICAgIG5ld09wdHMucXVvdGVTdHlsZSA9IG9wdHMucXVvdGVTdHlsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbnNwZWN0Xyh2YWx1ZSwgbmV3T3B0cywgZGVwdGggKyAxLCBzZWVuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5zcGVjdF8odmFsdWUsIG9wdHMsIGRlcHRoICsgMSwgc2Vlbik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicgJiYgIWlzUmVnRXhwKG9iaikpIHsgLy8gaW4gb2xkZXIgZW5naW5lcywgcmVnZXhlcyBhcmUgY2FsbGFibGVcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lT2Yob2JqKTtcbiAgICAgICAgdmFyIGtleXMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIHJldHVybiAnW0Z1bmN0aW9uJyArIChuYW1lID8gJzogJyArIG5hbWUgOiAnIChhbm9ueW1vdXMpJykgKyAnXScgKyAoa2V5cy5sZW5ndGggPiAwID8gJyB7ICcgKyAkam9pbi5jYWxsKGtleXMsICcsICcpICsgJyB9JyA6ICcnKTtcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKG9iaikpIHtcbiAgICAgICAgdmFyIHN5bVN0cmluZyA9IGhhc1NoYW1tZWRTeW1ib2xzID8gJHJlcGxhY2UuY2FsbChTdHJpbmcob2JqKSwgL14oU3ltYm9sXFwoLipcXCkpX1teKV0qJC8sICckMScpIDogc3ltVG9TdHJpbmcuY2FsbChvYmopO1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgIWhhc1NoYW1tZWRTeW1ib2xzID8gbWFya0JveGVkKHN5bVN0cmluZykgOiBzeW1TdHJpbmc7XG4gICAgfVxuICAgIGlmIChpc0VsZW1lbnQob2JqKSkge1xuICAgICAgICB2YXIgcyA9ICc8JyArICR0b0xvd2VyQ2FzZS5jYWxsKFN0cmluZyhvYmoubm9kZU5hbWUpKTtcbiAgICAgICAgdmFyIGF0dHJzID0gb2JqLmF0dHJpYnV0ZXMgfHwgW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHMgKz0gJyAnICsgYXR0cnNbaV0ubmFtZSArICc9JyArIHdyYXBRdW90ZXMocXVvdGUoYXR0cnNbaV0udmFsdWUpLCAnZG91YmxlJywgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgcyArPSAnPic7XG4gICAgICAgIGlmIChvYmouY2hpbGROb2RlcyAmJiBvYmouY2hpbGROb2Rlcy5sZW5ndGgpIHsgcyArPSAnLi4uJzsgfVxuICAgICAgICBzICs9ICc8LycgKyAkdG9Mb3dlckNhc2UuY2FsbChTdHJpbmcob2JqLm5vZGVOYW1lKSkgKyAnPic7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgIGlmIChvYmoubGVuZ3RoID09PSAwKSB7IHJldHVybiAnW10nOyB9XG4gICAgICAgIHZhciB4cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0KTtcbiAgICAgICAgaWYgKGluZGVudCAmJiAhc2luZ2xlTGluZVZhbHVlcyh4cykpIHtcbiAgICAgICAgICAgIHJldHVybiAnWycgKyBpbmRlbnRlZEpvaW4oeHMsIGluZGVudCkgKyAnXSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdbICcgKyAkam9pbi5jYWxsKHhzLCAnLCAnKSArICcgXSc7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKG9iaikpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICBpZiAoISgnY2F1c2UnIGluIEVycm9yLnByb3RvdHlwZSkgJiYgJ2NhdXNlJyBpbiBvYmogJiYgIWlzRW51bWVyYWJsZS5jYWxsKG9iaiwgJ2NhdXNlJykpIHtcbiAgICAgICAgICAgIHJldHVybiAneyBbJyArIFN0cmluZyhvYmopICsgJ10gJyArICRqb2luLmNhbGwoJGNvbmNhdC5jYWxsKCdbY2F1c2VdOiAnICsgaW5zcGVjdChvYmouY2F1c2UpLCBwYXJ0cyksICcsICcpICsgJyB9JztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKSB7IHJldHVybiAnWycgKyBTdHJpbmcob2JqKSArICddJzsgfVxuICAgICAgICByZXR1cm4gJ3sgWycgKyBTdHJpbmcob2JqKSArICddICcgKyAkam9pbi5jYWxsKHBhcnRzLCAnLCAnKSArICcgfSc7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBjdXN0b21JbnNwZWN0KSB7XG4gICAgICAgIGlmIChpbnNwZWN0U3ltYm9sICYmIHR5cGVvZiBvYmpbaW5zcGVjdFN5bWJvbF0gPT09ICdmdW5jdGlvbicgJiYgdXRpbEluc3BlY3QpIHtcbiAgICAgICAgICAgIHJldHVybiB1dGlsSW5zcGVjdChvYmosIHsgZGVwdGg6IG1heERlcHRoIC0gZGVwdGggfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VzdG9tSW5zcGVjdCAhPT0gJ3N5bWJvbCcgJiYgdHlwZW9mIG9iai5pbnNwZWN0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqLmluc3BlY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNNYXAob2JqKSkge1xuICAgICAgICB2YXIgbWFwUGFydHMgPSBbXTtcbiAgICAgICAgaWYgKG1hcEZvckVhY2gpIHtcbiAgICAgICAgICAgIG1hcEZvckVhY2guY2FsbChvYmosIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgbWFwUGFydHMucHVzaChpbnNwZWN0KGtleSwgb2JqLCB0cnVlKSArICcgPT4gJyArIGluc3BlY3QodmFsdWUsIG9iaikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25PZignTWFwJywgbWFwU2l6ZS5jYWxsKG9iaiksIG1hcFBhcnRzLCBpbmRlbnQpO1xuICAgIH1cbiAgICBpZiAoaXNTZXQob2JqKSkge1xuICAgICAgICB2YXIgc2V0UGFydHMgPSBbXTtcbiAgICAgICAgaWYgKHNldEZvckVhY2gpIHtcbiAgICAgICAgICAgIHNldEZvckVhY2guY2FsbChvYmosIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNldFBhcnRzLnB1c2goaW5zcGVjdCh2YWx1ZSwgb2JqKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbk9mKCdTZXQnLCBzZXRTaXplLmNhbGwob2JqKSwgc2V0UGFydHMsIGluZGVudCk7XG4gICAgfVxuICAgIGlmIChpc1dlYWtNYXAob2JqKSkge1xuICAgICAgICByZXR1cm4gd2Vha0NvbGxlY3Rpb25PZignV2Vha01hcCcpO1xuICAgIH1cbiAgICBpZiAoaXNXZWFrU2V0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoJ1dlYWtTZXQnKTtcbiAgICB9XG4gICAgaWYgKGlzV2Vha1JlZihvYmopKSB7XG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKCdXZWFrUmVmJyk7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoaW5zcGVjdChOdW1iZXIob2JqKSkpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdJbnQob2JqKSkge1xuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QoYmlnSW50VmFsdWVPZi5jYWxsKG9iaikpKTtcbiAgICB9XG4gICAgaWYgKGlzQm9vbGVhbihvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoYm9vbGVhblZhbHVlT2YuY2FsbChvYmopKTtcbiAgICB9XG4gICAgaWYgKGlzU3RyaW5nKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0KFN0cmluZyhvYmopKSk7XG4gICAgfVxuICAgIC8vIG5vdGU6IGluIElFIDgsIHNvbWV0aW1lcyBgZ2xvYmFsICE9PSB3aW5kb3dgIGJ1dCBib3RoIGFyZSB0aGUgcHJvdG90eXBlcyBvZiBlYWNoIG90aGVyXG4gICAgLyogZXNsaW50LWVudiBicm93c2VyICovXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIG9iaiA9PT0gd2luZG93KSB7XG4gICAgICAgIHJldHVybiAneyBbb2JqZWN0IFdpbmRvd10gfSc7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICAgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyAmJiBvYmogPT09IGdsb2JhbFRoaXMpXG4gICAgICAgIHx8ICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyAmJiBvYmogPT09IGdsb2JhbClcbiAgICApIHtcbiAgICAgICAgcmV0dXJuICd7IFtvYmplY3QgZ2xvYmFsVGhpc10gfSc7XG4gICAgfVxuICAgIGlmICghaXNEYXRlKG9iaikgJiYgIWlzUmVnRXhwKG9iaikpIHtcbiAgICAgICAgdmFyIHlzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICB2YXIgaXNQbGFpbk9iamVjdCA9IGdQTyA/IGdQTyhvYmopID09PSBPYmplY3QucHJvdG90eXBlIDogb2JqIGluc3RhbmNlb2YgT2JqZWN0IHx8IG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgICAgICB2YXIgcHJvdG9UYWcgPSBvYmogaW5zdGFuY2VvZiBPYmplY3QgPyAnJyA6ICdudWxsIHByb3RvdHlwZSc7XG4gICAgICAgIHZhciBzdHJpbmdUYWcgPSAhaXNQbGFpbk9iamVjdCAmJiB0b1N0cmluZ1RhZyAmJiBPYmplY3Qob2JqKSA9PT0gb2JqICYmIHRvU3RyaW5nVGFnIGluIG9iaiA/ICRzbGljZS5jYWxsKHRvU3RyKG9iaiksIDgsIC0xKSA6IHByb3RvVGFnID8gJ09iamVjdCcgOiAnJztcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9yVGFnID0gaXNQbGFpbk9iamVjdCB8fCB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nID8gJycgOiBvYmouY29uc3RydWN0b3IubmFtZSA/IG9iai5jb25zdHJ1Y3Rvci5uYW1lICsgJyAnIDogJyc7XG4gICAgICAgIHZhciB0YWcgPSBjb25zdHJ1Y3RvclRhZyArIChzdHJpbmdUYWcgfHwgcHJvdG9UYWcgPyAnWycgKyAkam9pbi5jYWxsKCRjb25jYXQuY2FsbChbXSwgc3RyaW5nVGFnIHx8IFtdLCBwcm90b1RhZyB8fCBbXSksICc6ICcpICsgJ10gJyA6ICcnKTtcbiAgICAgICAgaWYgKHlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdGFnICsgJ3t9JzsgfVxuICAgICAgICBpZiAoaW5kZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGFnICsgJ3snICsgaW5kZW50ZWRKb2luKHlzLCBpbmRlbnQpICsgJ30nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YWcgKyAneyAnICsgJGpvaW4uY2FsbCh5cywgJywgJykgKyAnIH0nO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nKG9iaik7XG59O1xuXG5mdW5jdGlvbiB3cmFwUXVvdGVzKHMsIGRlZmF1bHRTdHlsZSwgb3B0cykge1xuICAgIHZhciBzdHlsZSA9IG9wdHMucXVvdGVTdHlsZSB8fCBkZWZhdWx0U3R5bGU7XG4gICAgdmFyIHF1b3RlQ2hhciA9IHF1b3Rlc1tzdHlsZV07XG4gICAgcmV0dXJuIHF1b3RlQ2hhciArIHMgKyBxdW90ZUNoYXI7XG59XG5cbmZ1bmN0aW9uIHF1b3RlKHMpIHtcbiAgICByZXR1cm4gJHJlcGxhY2UuY2FsbChTdHJpbmcocyksIC9cIi9nLCAnJnF1b3Q7Jyk7XG59XG5cbmZ1bmN0aW9uIGNhblRydXN0VG9TdHJpbmcob2JqKSB7XG4gICAgcmV0dXJuICF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICh0b1N0cmluZ1RhZyBpbiBvYmogfHwgdHlwZW9mIG9ialt0b1N0cmluZ1RhZ10gIT09ICd1bmRlZmluZWQnKSk7XG59XG5mdW5jdGlvbiBpc0FycmF5KG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7IH1cbmZ1bmN0aW9uIGlzRGF0ZShvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJyAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7IH1cbmZ1bmN0aW9uIGlzUmVnRXhwKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXScgJiYgY2FuVHJ1c3RUb1N0cmluZyhvYmopOyB9XG5mdW5jdGlvbiBpc0Vycm9yKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyAmJiBjYW5UcnVzdFRvU3RyaW5nKG9iaik7IH1cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXScgJiYgY2FuVHJ1c3RUb1N0cmluZyhvYmopOyB9XG5mdW5jdGlvbiBpc051bWJlcihvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmIGNhblRydXN0VG9TdHJpbmcob2JqKTsgfVxuZnVuY3Rpb24gaXNCb29sZWFuKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICYmIGNhblRydXN0VG9TdHJpbmcob2JqKTsgfVxuXG4vLyBTeW1ib2wgYW5kIEJpZ0ludCBkbyBoYXZlIFN5bWJvbC50b1N0cmluZ1RhZyBieSBzcGVjLCBzbyB0aGF0IGNhbid0IGJlIHVzZWQgdG8gZWxpbWluYXRlIGZhbHNlIHBvc2l0aXZlc1xuZnVuY3Rpb24gaXNTeW1ib2wob2JqKSB7XG4gICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqIGluc3RhbmNlb2YgU3ltYm9sO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8ICFzeW1Ub1N0cmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHN5bVRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzQmlnSW50KG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8ICFiaWdJbnRWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgYmlnSW50VmFsdWVPZi5jYWxsKG9iaik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSB8fCBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgaW4gdGhpczsgfTtcbmZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICAgIHJldHVybiBoYXNPd24uY2FsbChvYmosIGtleSk7XG59XG5cbmZ1bmN0aW9uIHRvU3RyKG9iaikge1xuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKG9iaik7XG59XG5cbmZ1bmN0aW9uIG5hbWVPZihmKSB7XG4gICAgaWYgKGYubmFtZSkgeyByZXR1cm4gZi5uYW1lOyB9XG4gICAgdmFyIG0gPSAkbWF0Y2guY2FsbChmdW5jdGlvblRvU3RyaW5nLmNhbGwoZiksIC9eZnVuY3Rpb25cXHMqKFtcXHckXSspLyk7XG4gICAgaWYgKG0pIHsgcmV0dXJuIG1bMV07IH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaW5kZXhPZih4cywgeCkge1xuICAgIGlmICh4cy5pbmRleE9mKSB7IHJldHVybiB4cy5pbmRleE9mKHgpOyB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKHhzW2ldID09PSB4KSB7IHJldHVybiBpOyB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gaXNNYXAoeCkge1xuICAgIGlmICghbWFwU2l6ZSB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBtYXBTaXplLmNhbGwoeCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRTaXplLmNhbGwoeCk7XG4gICAgICAgIH0gY2F0Y2ggKHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgTWFwOyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNXZWFrTWFwKHgpIHtcbiAgICBpZiAoIXdlYWtNYXBIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgd2Vha01hcEhhcy5jYWxsKHgsIHdlYWtNYXBIYXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2Vha1NldEhhcy5jYWxsKHgsIHdlYWtTZXRIYXMpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdlYWtNYXA7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1dlYWtSZWYoeCkge1xuICAgIGlmICghd2Vha1JlZkRlcmVmIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHdlYWtSZWZEZXJlZi5jYWxsKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNTZXQoeCkge1xuICAgIGlmICghc2V0U2l6ZSB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBzZXRTaXplLmNhbGwoeCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtYXBTaXplLmNhbGwoeCk7XG4gICAgICAgIH0gY2F0Y2ggKG0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgU2V0OyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNXZWFrU2V0KHgpIHtcbiAgICBpZiAoIXdlYWtTZXRIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgd2Vha1NldEhhcy5jYWxsKHgsIHdlYWtTZXRIYXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2Vha01hcEhhcy5jYWxsKHgsIHdlYWtNYXBIYXMpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdlYWtTZXQ7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc0VsZW1lbnQoeCkge1xuICAgIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHgubm9kZU5hbWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB4LmdldEF0dHJpYnV0ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaW5zcGVjdFN0cmluZyhzdHIsIG9wdHMpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA+IG9wdHMubWF4U3RyaW5nTGVuZ3RoKSB7XG4gICAgICAgIHZhciByZW1haW5pbmcgPSBzdHIubGVuZ3RoIC0gb3B0cy5tYXhTdHJpbmdMZW5ndGg7XG4gICAgICAgIHZhciB0cmFpbGVyID0gJy4uLiAnICsgcmVtYWluaW5nICsgJyBtb3JlIGNoYXJhY3RlcicgKyAocmVtYWluaW5nID4gMSA/ICdzJyA6ICcnKTtcbiAgICAgICAgcmV0dXJuIGluc3BlY3RTdHJpbmcoJHNsaWNlLmNhbGwoc3RyLCAwLCBvcHRzLm1heFN0cmluZ0xlbmd0aCksIG9wdHMpICsgdHJhaWxlcjtcbiAgICB9XG4gICAgdmFyIHF1b3RlUkUgPSBxdW90ZVJFc1tvcHRzLnF1b3RlU3R5bGUgfHwgJ3NpbmdsZSddO1xuICAgIHF1b3RlUkUubGFzdEluZGV4ID0gMDtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuICAgIHZhciBzID0gJHJlcGxhY2UuY2FsbCgkcmVwbGFjZS5jYWxsKHN0ciwgcXVvdGVSRSwgJ1xcXFwkMScpLCAvW1xceDAwLVxceDFmXS9nLCBsb3dieXRlKTtcbiAgICByZXR1cm4gd3JhcFF1b3RlcyhzLCAnc2luZ2xlJywgb3B0cyk7XG59XG5cbmZ1bmN0aW9uIGxvd2J5dGUoYykge1xuICAgIHZhciBuID0gYy5jaGFyQ29kZUF0KDApO1xuICAgIHZhciB4ID0ge1xuICAgICAgICA4OiAnYicsXG4gICAgICAgIDk6ICd0JyxcbiAgICAgICAgMTA6ICduJyxcbiAgICAgICAgMTI6ICdmJyxcbiAgICAgICAgMTM6ICdyJ1xuICAgIH1bbl07XG4gICAgaWYgKHgpIHsgcmV0dXJuICdcXFxcJyArIHg7IH1cbiAgICByZXR1cm4gJ1xcXFx4JyArIChuIDwgMHgxMCA/ICcwJyA6ICcnKSArICR0b1VwcGVyQ2FzZS5jYWxsKG4udG9TdHJpbmcoMTYpKTtcbn1cblxuZnVuY3Rpb24gbWFya0JveGVkKHN0cikge1xuICAgIHJldHVybiAnT2JqZWN0KCcgKyBzdHIgKyAnKSc7XG59XG5cbmZ1bmN0aW9uIHdlYWtDb2xsZWN0aW9uT2YodHlwZSkge1xuICAgIHJldHVybiB0eXBlICsgJyB7ID8gfSc7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3Rpb25PZih0eXBlLCBzaXplLCBlbnRyaWVzLCBpbmRlbnQpIHtcbiAgICB2YXIgam9pbmVkRW50cmllcyA9IGluZGVudCA/IGluZGVudGVkSm9pbihlbnRyaWVzLCBpbmRlbnQpIDogJGpvaW4uY2FsbChlbnRyaWVzLCAnLCAnKTtcbiAgICByZXR1cm4gdHlwZSArICcgKCcgKyBzaXplICsgJykgeycgKyBqb2luZWRFbnRyaWVzICsgJ30nO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVMaW5lVmFsdWVzKHhzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaW5kZXhPZih4c1tpXSwgJ1xcbicpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5kZW50KG9wdHMsIGRlcHRoKSB7XG4gICAgdmFyIGJhc2VJbmRlbnQ7XG4gICAgaWYgKG9wdHMuaW5kZW50ID09PSAnXFx0Jykge1xuICAgICAgICBiYXNlSW5kZW50ID0gJ1xcdCc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5pbmRlbnQgPT09ICdudW1iZXInICYmIG9wdHMuaW5kZW50ID4gMCkge1xuICAgICAgICBiYXNlSW5kZW50ID0gJGpvaW4uY2FsbChBcnJheShvcHRzLmluZGVudCArIDEpLCAnICcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBiYXNlOiBiYXNlSW5kZW50LFxuICAgICAgICBwcmV2OiAkam9pbi5jYWxsKEFycmF5KGRlcHRoICsgMSksIGJhc2VJbmRlbnQpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaW5kZW50ZWRKb2luKHhzLCBpbmRlbnQpIHtcbiAgICBpZiAoeHMubGVuZ3RoID09PSAwKSB7IHJldHVybiAnJzsgfVxuICAgIHZhciBsaW5lSm9pbmVyID0gJ1xcbicgKyBpbmRlbnQucHJldiArIGluZGVudC5iYXNlO1xuICAgIHJldHVybiBsaW5lSm9pbmVyICsgJGpvaW4uY2FsbCh4cywgJywnICsgbGluZUpvaW5lcikgKyAnXFxuJyArIGluZGVudC5wcmV2O1xufVxuXG5mdW5jdGlvbiBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCkge1xuICAgIHZhciBpc0FyciA9IGlzQXJyYXkob2JqKTtcbiAgICB2YXIgeHMgPSBbXTtcbiAgICBpZiAoaXNBcnIpIHtcbiAgICAgICAgeHMubGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHhzW2ldID0gaGFzKG9iaiwgaSkgPyBpbnNwZWN0KG9ialtpXSwgb2JqKSA6ICcnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBzeW1zID0gdHlwZW9mIGdPUFMgPT09ICdmdW5jdGlvbicgPyBnT1BTKG9iaikgOiBbXTtcbiAgICB2YXIgc3ltTWFwO1xuICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scykge1xuICAgICAgICBzeW1NYXAgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzeW1zLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBzeW1NYXBbJyQnICsgc3ltc1trXV0gPSBzeW1zW2tdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICAgIGlmICghaGFzKG9iaiwga2V5KSkgeyBjb250aW51ZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby1jb250aW51ZVxuICAgICAgICBpZiAoaXNBcnIgJiYgU3RyaW5nKE51bWJlcihrZXkpKSA9PT0ga2V5ICYmIGtleSA8IG9iai5sZW5ndGgpIHsgY29udGludWU7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tY29udGludWVcbiAgICAgICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzICYmIHN5bU1hcFsnJCcgKyBrZXldIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIHRvIHByZXZlbnQgc2hhbW1lZCBTeW1ib2xzLCB3aGljaCBhcmUgc3RvcmVkIGFzIHN0cmluZ3MsIGZyb20gYmVpbmcgaW5jbHVkZWQgaW4gdGhlIHN0cmluZyBrZXkgc2VjdGlvblxuICAgICAgICAgICAgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLWNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoJHRlc3QuY2FsbCgvW15cXHckXS8sIGtleSkpIHtcbiAgICAgICAgICAgIHhzLnB1c2goaW5zcGVjdChrZXksIG9iaikgKyAnOiAnICsgaW5zcGVjdChvYmpba2V5XSwgb2JqKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4cy5wdXNoKGtleSArICc6ICcgKyBpbnNwZWN0KG9ialtrZXldLCBvYmopKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGdPUFMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzeW1zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoaXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW1zW2pdKSkge1xuICAgICAgICAgICAgICAgIHhzLnB1c2goJ1snICsgaW5zcGVjdChzeW1zW2pdKSArICddOiAnICsgaW5zcGVjdChvYmpbc3ltc1tqXV0sIG9iaikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4cztcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBpbnNwZWN0ID0gcmVxdWlyZSgnb2JqZWN0LWluc3BlY3QnKTtcblxudmFyICRUeXBlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvdHlwZScpO1xuXG4vKlxuKiBUaGlzIGZ1bmN0aW9uIHRyYXZlcnNlcyB0aGUgbGlzdCByZXR1cm5pbmcgdGhlIG5vZGUgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW4ga2V5LlxuKlxuKiBUaGF0IG5vZGUgaXMgYWxzbyBtb3ZlZCB0byB0aGUgaGVhZCBvZiB0aGUgbGlzdCwgc28gdGhhdCBpZiBpdCdzIGFjY2Vzc2VkIGFnYWluIHdlIGRvbid0IG5lZWQgdG8gdHJhdmVyc2UgdGhlIHdob2xlIGxpc3QuXG4qIEJ5IGRvaW5nIHNvLCBhbGwgdGhlIHJlY2VudGx5IHVzZWQgbm9kZXMgY2FuIGJlIGFjY2Vzc2VkIHJlbGF0aXZlbHkgcXVpY2tseS5cbiovXG4vKiogQHR5cGUge2ltcG9ydCgnLi9saXN0LmQudHMnKS5saXN0R2V0Tm9kZX0gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxudmFyIGxpc3RHZXROb2RlID0gZnVuY3Rpb24gKGxpc3QsIGtleSwgaXNEZWxldGUpIHtcblx0LyoqIEB0eXBlIHt0eXBlb2YgbGlzdCB8IE5vbk51bGxhYmxlPCh0eXBlb2YgbGlzdClbJ25leHQnXT59ICovXG5cdHZhciBwcmV2ID0gbGlzdDtcblx0LyoqIEB0eXBlIHsodHlwZW9mIGxpc3QpWyduZXh0J119ICovXG5cdHZhciBjdXJyO1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGZvciAoOyAoY3VyciA9IHByZXYubmV4dCkgIT0gbnVsbDsgcHJldiA9IGN1cnIpIHtcblx0XHRpZiAoY3Vyci5rZXkgPT09IGtleSkge1xuXHRcdFx0cHJldi5uZXh0ID0gY3Vyci5uZXh0O1xuXHRcdFx0aWYgKCFpc0RlbGV0ZSkge1xuXHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXG5cdFx0XHRcdGN1cnIubmV4dCA9IC8qKiBAdHlwZSB7Tm9uTnVsbGFibGU8dHlwZW9mIGxpc3QubmV4dD59ICovIChsaXN0Lm5leHQpO1xuXHRcdFx0XHRsaXN0Lm5leHQgPSBjdXJyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY3Vycjtcblx0XHR9XG5cdH1cbn07XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2xpc3QuZC50cycpLmxpc3RHZXR9ICovXG52YXIgbGlzdEdldCA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXkpIHtcblx0aWYgKCFvYmplY3RzKSB7XG5cdFx0cmV0dXJuIHZvaWQgdW5kZWZpbmVkO1xuXHR9XG5cdHZhciBub2RlID0gbGlzdEdldE5vZGUob2JqZWN0cywga2V5KTtcblx0cmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZTtcbn07XG4vKiogQHR5cGUge2ltcG9ydCgnLi9saXN0LmQudHMnKS5saXN0U2V0fSAqL1xudmFyIGxpc3RTZXQgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5LCB2YWx1ZSkge1xuXHR2YXIgbm9kZSA9IGxpc3RHZXROb2RlKG9iamVjdHMsIGtleSk7XG5cdGlmIChub2RlKSB7XG5cdFx0bm9kZS52YWx1ZSA9IHZhbHVlO1xuXHR9IGVsc2Uge1xuXHRcdC8vIFByZXBlbmQgdGhlIG5ldyBub2RlIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3Rcblx0XHRvYmplY3RzLm5leHQgPSAvKiogQHR5cGUge2ltcG9ydCgnLi9saXN0LmQudHMnKS5MaXN0Tm9kZTx0eXBlb2YgdmFsdWUsIHR5cGVvZiBrZXk+fSAqLyAoeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduLCBuby1leHRyYS1wYXJlbnNcblx0XHRcdGtleToga2V5LFxuXHRcdFx0bmV4dDogb2JqZWN0cy5uZXh0LFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fSk7XG5cdH1cbn07XG4vKiogQHR5cGUge2ltcG9ydCgnLi9saXN0LmQudHMnKS5saXN0SGFzfSAqL1xudmFyIGxpc3RIYXMgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5KSB7XG5cdGlmICghb2JqZWN0cykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gISFsaXN0R2V0Tm9kZShvYmplY3RzLCBrZXkpO1xufTtcbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2xpc3QuZC50cycpLmxpc3REZWxldGV9ICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBsaXN0RGVsZXRlID0gZnVuY3Rpb24gKG9iamVjdHMsIGtleSkge1xuXHRpZiAob2JqZWN0cykge1xuXHRcdHJldHVybiBsaXN0R2V0Tm9kZShvYmplY3RzLCBrZXksIHRydWUpO1xuXHR9XG59O1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRTaWRlQ2hhbm5lbExpc3QoKSB7XG5cdC8qKiBAdHlwZWRlZiB7UmV0dXJuVHlwZTx0eXBlb2YgZ2V0U2lkZUNoYW5uZWxMaXN0Pn0gQ2hhbm5lbCAqL1xuXHQvKiogQHR5cGVkZWYge1BhcmFtZXRlcnM8Q2hhbm5lbFsnZ2V0J10+WzBdfSBLICovXG5cdC8qKiBAdHlwZWRlZiB7UGFyYW1ldGVyczxDaGFubmVsWydzZXQnXT5bMV19IFYgKi9cblxuXHQvKiogQHR5cGUge2ltcG9ydCgnLi9saXN0LmQudHMnKS5Sb290Tm9kZTxWLCBLPiB8IHVuZGVmaW5lZH0gKi8gdmFyICRvO1xuXG5cdC8qKiBAdHlwZSB7Q2hhbm5lbH0gKi9cblx0dmFyIGNoYW5uZWwgPSB7XG5cdFx0YXNzZXJ0OiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRpZiAoIWNoYW5uZWwuaGFzKGtleSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1NpZGUgY2hhbm5lbCBkb2VzIG5vdCBjb250YWluICcgKyBpbnNwZWN0KGtleSkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J2RlbGV0ZSc6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHZhciByb290ID0gJG8gJiYgJG8ubmV4dDtcblx0XHRcdHZhciBkZWxldGVkTm9kZSA9IGxpc3REZWxldGUoJG8sIGtleSk7XG5cdFx0XHRpZiAoZGVsZXRlZE5vZGUgJiYgcm9vdCAmJiByb290ID09PSBkZWxldGVkTm9kZSkge1xuXHRcdFx0XHQkbyA9IHZvaWQgdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICEhZGVsZXRlZE5vZGU7XG5cdFx0fSxcblx0XHRnZXQ6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBsaXN0R2V0KCRvLCBrZXkpO1xuXHRcdH0sXG5cdFx0aGFzOiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRyZXR1cm4gbGlzdEhhcygkbywga2V5KTtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdGlmICghJG8pIHtcblx0XHRcdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgbGlua2VkIGxpc3QgYXMgYW4gZW1wdHkgbm9kZSwgc28gdGhhdCB3ZSBkb24ndCBoYXZlIHRvIHNwZWNpYWwtY2FzZSBoYW5kbGluZyBvZiB0aGUgZmlyc3Qgbm9kZTogd2UgY2FuIGFsd2F5cyByZWZlciB0byBpdCBhcyAocHJldmlvdXMgbm9kZSkubmV4dCwgaW5zdGVhZCBvZiBzb21ldGhpbmcgbGlrZSAobGlzdCkuaGVhZFxuXHRcdFx0XHQkbyA9IHtcblx0XHRcdFx0XHRuZXh0OiB2b2lkIHVuZGVmaW5lZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dHJhLXBhcmVuc1xuXHRcdFx0bGlzdFNldCgvKiogQHR5cGUge05vbk51bGxhYmxlPHR5cGVvZiAkbz59ICovICgkbyksIGtleSwgdmFsdWUpO1xuXHRcdH1cblx0fTtcblx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUT0RPOiBmaWd1cmUgb3V0IHdoeSB0aGlzIGlzIGVycm9yaW5nXG5cdHJldHVybiBjaGFubmVsO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdDtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IEVycm9yO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vZXZhbCcpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBFdmFsRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9yYW5nZScpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBSYW5nZUVycm9yO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vcmVmJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IFJlZmVyZW5jZUVycm9yO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vc3ludGF4Jyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IFN5bnRheEVycm9yO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vdXJpJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IFVSSUVycm9yO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vYWJzJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGguYWJzO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vZmxvb3InKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gTWF0aC5mbG9vcjtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL21heCcpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBNYXRoLm1heDtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL21pbicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBNYXRoLm1pbjtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3BvdycpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBNYXRoLnBvdztcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3JvdW5kJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGgucm91bmQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9pc05hTicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gaXNOYU4oYSkge1xuXHRyZXR1cm4gYSAhPT0gYTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJGlzTmFOID0gcmVxdWlyZSgnLi9pc05hTicpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9zaWduJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNpZ24obnVtYmVyKSB7XG5cdGlmICgkaXNOYU4obnVtYmVyKSB8fCBudW1iZXIgPT09IDApIHtcblx0XHRyZXR1cm4gbnVtYmVyO1xuXHR9XG5cdHJldHVybiBudW1iZXIgPCAwID8gLTEgOiArMTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9nT1BEJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xudmFyICRnT1BEID0gcmVxdWlyZSgnLi9nT1BEJyk7XG5cbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKFtdLCAnbGVuZ3RoJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBnT1BEXG5cdFx0JGdPUEQgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gJGdPUEQ7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmYWxzZTtcbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0dHJ5IHtcblx0XHQkZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyB2YWx1ZTogMSB9KTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGRlZmluZVByb3BlcnR5XG5cdFx0JGRlZmluZVByb3BlcnR5ID0gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSAkZGVmaW5lUHJvcGVydHk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9zaGFtcycpfSAqL1xuLyogZXNsaW50IGNvbXBsZXhpdHk6IFsyLCAxOF0sIG1heC1zdGF0ZW1lbnRzOiBbMiwgMzNdICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1N5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcpIHsgcmV0dXJuIHRydWU7IH1cblxuXHQvKiogQHR5cGUge3sgW2sgaW4gc3ltYm9sXT86IHVua25vd24gfX0gKi9cblx0dmFyIG9iaiA9IHt9O1xuXHR2YXIgc3ltID0gU3ltYm9sKCd0ZXN0Jyk7XG5cdHZhciBzeW1PYmogPSBPYmplY3Qoc3ltKTtcblx0aWYgKHR5cGVvZiBzeW0gPT09ICdzdHJpbmcnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltT2JqKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9vYmplY3QuYXNzaWduL2lzc3Vlcy8xN1xuXHQvLyBpZiAoc3ltIGluc3RhbmNlb2YgU3ltYm9sKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMvaXNzdWVzLzRcblx0Ly8gaWYgKCEoc3ltT2JqIGluc3RhbmNlb2YgU3ltYm9sKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyBpZiAodHlwZW9mIFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIGlmIChTdHJpbmcoc3ltKSAhPT0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bVZhbCA9IDQyO1xuXHRvYmpbc3ltXSA9IHN5bVZhbDtcblx0Zm9yICh2YXIgXyBpbiBvYmopIHsgcmV0dXJuIGZhbHNlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLXVucmVhY2hhYmxlLWxvb3Bcblx0aWYgKHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1zID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopO1xuXHRpZiAoc3ltcy5sZW5ndGggIT09IDEgfHwgc3ltc1swXSAhPT0gc3ltKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXG5cdFx0dmFyIGRlc2NyaXB0b3IgPSAvKiogQHR5cGUge1Byb3BlcnR5RGVzY3JpcHRvcn0gKi8gKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBzeW0pKTtcblx0XHRpZiAoZGVzY3JpcHRvci52YWx1ZSAhPT0gc3ltVmFsIHx8IGRlc2NyaXB0b3IuZW51bWVyYWJsZSAhPT0gdHJ1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBvcmlnU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sO1xudmFyIGhhc1N5bWJvbFNoYW0gPSByZXF1aXJlKCcuL3NoYW1zJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc05hdGl2ZVN5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCgnZm9vJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCgnYmFyJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHJldHVybiBoYXNTeW1ib2xTaGFtKCk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vUmVmbGVjdC5nZXRQcm90b3R5cGVPZicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSAodHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3QuZ2V0UHJvdG90eXBlT2YpIHx8IG51bGw7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJ2VzLW9iamVjdC1hdG9tcycpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9PYmplY3QuZ2V0UHJvdG90eXBlT2YnKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gJE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBudWxsO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IG5vLWludmFsaWQtdGhpczogMSAqL1xuXG52YXIgRVJST1JfTUVTU0FHRSA9ICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICc7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIGZ1bmNUeXBlID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxudmFyIGNvbmNhdHR5ID0gZnVuY3Rpb24gY29uY2F0dHkoYSwgYikge1xuICAgIHZhciBhcnIgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhcnJbaV0gPSBhW2ldO1xuICAgIH1cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGIubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgYXJyW2ogKyBhLmxlbmd0aF0gPSBiW2pdO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG59O1xuXG52YXIgc2xpY3kgPSBmdW5jdGlvbiBzbGljeShhcnJMaWtlLCBvZmZzZXQpIHtcbiAgICB2YXIgYXJyID0gW107XG4gICAgZm9yICh2YXIgaSA9IG9mZnNldCB8fCAwLCBqID0gMDsgaSA8IGFyckxpa2UubGVuZ3RoOyBpICs9IDEsIGogKz0gMSkge1xuICAgICAgICBhcnJbal0gPSBhcnJMaWtlW2ldO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufTtcblxudmFyIGpvaW55ID0gZnVuY3Rpb24gKGFyciwgam9pbmVyKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHN0ciArPSBhcnJbaV07XG4gICAgICAgIGlmIChpICsgMSA8IGFyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0ciArPSBqb2luZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZCh0aGF0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXM7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdmdW5jdGlvbicgfHwgdG9TdHIuYXBwbHkodGFyZ2V0KSAhPT0gZnVuY1R5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJPUl9NRVNTQUdFICsgdGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBzbGljeShhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBiaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBjb25jYXR0eShhcmdzLCBhcmd1bWVudHMpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhcmdldC5hcHBseShcbiAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICBjb25jYXR0eShhcmdzLCBhcmd1bWVudHMpXG4gICAgICAgICk7XG5cbiAgICB9O1xuXG4gICAgdmFyIGJvdW5kTGVuZ3RoID0gbWF4KDAsIHRhcmdldC5sZW5ndGggLSBhcmdzLmxlbmd0aCk7XG4gICAgdmFyIGJvdW5kQXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICBib3VuZEFyZ3NbaV0gPSAnJCcgKyBpO1xuICAgIH1cblxuICAgIGJvdW5kID0gRnVuY3Rpb24oJ2JpbmRlcicsICdyZXR1cm4gZnVuY3Rpb24gKCcgKyBqb2lueShib3VuZEFyZ3MsICcsJykgKyAnKXsgcmV0dXJuIGJpbmRlci5hcHBseSh0aGlzLGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgaWYgKHRhcmdldC5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIEVtcHR5ID0gZnVuY3Rpb24gRW1wdHkoKSB7fTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBpbXBsZW1lbnRhdGlvbjtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2Z1bmN0aW9uQ2FsbCcpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2Z1bmN0aW9uQXBwbHknKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vcmVmbGVjdEFwcGx5Jyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBSZWZsZWN0ICYmIFJlZmxlY3QuYXBwbHk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcblxudmFyICRhcHBseSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25BcHBseScpO1xudmFyICRjYWxsID0gcmVxdWlyZSgnLi9mdW5jdGlvbkNhbGwnKTtcbnZhciAkcmVmbGVjdEFwcGx5ID0gcmVxdWlyZSgnLi9yZWZsZWN0QXBwbHknKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4vYWN0dWFsQXBwbHknKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gJHJlZmxlY3RBcHBseSB8fCBiaW5kLmNhbGwoJGNhbGwsICRhcHBseSk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciAkVHlwZUVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzL3R5cGUnKTtcblxudmFyICRjYWxsID0gcmVxdWlyZSgnLi9mdW5jdGlvbkNhbGwnKTtcbnZhciAkYWN0dWFsQXBwbHkgPSByZXF1aXJlKCcuL2FjdHVhbEFwcGx5Jyk7XG5cbi8qKiBAdHlwZSB7KGFyZ3M6IFtGdW5jdGlvbiwgdGhpc0FyZz86IHVua25vd24sIC4uLmFyZ3M6IHVua25vd25bXV0pID0+IEZ1bmN0aW9ufSBUT0RPIEZJWE1FLCBmaW5kIGEgd2F5IHRvIHVzZSBpbXBvcnQoJy4nKSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQmluZEJhc2ljKGFyZ3MpIHtcblx0aWYgKGFyZ3MubGVuZ3RoIDwgMSB8fCB0eXBlb2YgYXJnc1swXSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdhIGZ1bmN0aW9uIGlzIHJlcXVpcmVkJyk7XG5cdH1cblx0cmV0dXJuICRhY3R1YWxBcHBseShiaW5kLCAkY2FsbCwgYXJncyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kLWFwcGx5LWhlbHBlcnMnKTtcbnZhciBnT1BEID0gcmVxdWlyZSgnZ29wZCcpO1xuXG52YXIgaGFzUHJvdG9BY2Nlc3NvcjtcbnRyeSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnMsIG5vLXByb3RvXG5cdGhhc1Byb3RvQWNjZXNzb3IgPSAvKiogQHR5cGUge3sgX19wcm90b19fPzogdHlwZW9mIEFycmF5LnByb3RvdHlwZSB9fSAqLyAoW10pLl9fcHJvdG9fXyA9PT0gQXJyYXkucHJvdG90eXBlO1xufSBjYXRjaCAoZSkge1xuXHRpZiAoIWUgfHwgdHlwZW9mIGUgIT09ICdvYmplY3QnIHx8ICEoJ2NvZGUnIGluIGUpIHx8IGUuY29kZSAhPT0gJ0VSUl9QUk9UT19BQ0NFU1MnKSB7XG5cdFx0dGhyb3cgZTtcblx0fVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXG52YXIgZGVzYyA9ICEhaGFzUHJvdG9BY2Nlc3NvciAmJiBnT1BEICYmIGdPUEQoT2JqZWN0LnByb3RvdHlwZSwgLyoqIEB0eXBlIHtrZXlvZiB0eXBlb2YgT2JqZWN0LnByb3RvdHlwZX0gKi8gKCdfX3Byb3RvX18nKSk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyICRnZXRQcm90b3R5cGVPZiA9ICRPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL2dldCcpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBkZXNjICYmIHR5cGVvZiBkZXNjLmdldCA9PT0gJ2Z1bmN0aW9uJ1xuXHQ/IGNhbGxCaW5kKFtkZXNjLmdldF0pXG5cdDogdHlwZW9mICRnZXRQcm90b3R5cGVPZiA9PT0gJ2Z1bmN0aW9uJ1xuXHRcdD8gLyoqIEB0eXBlIHtpbXBvcnQoJy4vZ2V0Jyl9ICovIGZ1bmN0aW9uIGdldER1bmRlcih2YWx1ZSkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuXHRcdFx0cmV0dXJuICRnZXRQcm90b3R5cGVPZih2YWx1ZSA9PSBudWxsID8gdmFsdWUgOiAkT2JqZWN0KHZhbHVlKSk7XG5cdFx0fVxuXHRcdDogZmFsc2U7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVmbGVjdEdldFByb3RvID0gcmVxdWlyZSgnLi9SZWZsZWN0LmdldFByb3RvdHlwZU9mJyk7XG52YXIgb3JpZ2luYWxHZXRQcm90byA9IHJlcXVpcmUoJy4vT2JqZWN0LmdldFByb3RvdHlwZU9mJyk7XG5cbnZhciBnZXREdW5kZXJQcm90byA9IHJlcXVpcmUoJ2R1bmRlci1wcm90by9nZXQnKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gcmVmbGVjdEdldFByb3RvXG5cdD8gZnVuY3Rpb24gZ2V0UHJvdG8oTykge1xuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgY2FuJ3QgbmFycm93IGluc2lkZSBhIGNsb3N1cmUsIGZvciBzb21lIHJlYXNvblxuXHRcdHJldHVybiByZWZsZWN0R2V0UHJvdG8oTyk7XG5cdH1cblx0OiBvcmlnaW5hbEdldFByb3RvXG5cdFx0PyBmdW5jdGlvbiBnZXRQcm90byhPKSB7XG5cdFx0XHRpZiAoIU8gfHwgKHR5cGVvZiBPICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgTyAhPT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignZ2V0UHJvdG86IG5vdCBhbiBvYmplY3QnKTtcblx0XHRcdH1cblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgY2FuJ3QgbmFycm93IGluc2lkZSBhIGNsb3N1cmUsIGZvciBzb21lIHJlYXNvblxuXHRcdFx0cmV0dXJuIG9yaWdpbmFsR2V0UHJvdG8oTyk7XG5cdFx0fVxuXHRcdDogZ2V0RHVuZGVyUHJvdG9cblx0XHRcdD8gZnVuY3Rpb24gZ2V0UHJvdG8oTykge1xuXHRcdFx0XHQvLyBAdHMtZXhwZWN0LWVycm9yIFRTIGNhbid0IG5hcnJvdyBpbnNpZGUgYSBjbG9zdXJlLCBmb3Igc29tZSByZWFzb25cblx0XHRcdFx0cmV0dXJuIGdldER1bmRlclByb3RvKE8pO1xuXHRcdFx0fVxuXHRcdFx0OiBudWxsO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcbnZhciAkaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBiaW5kLmNhbGwoY2FsbCwgJGhhc093bik7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdW5kZWZpbmVkO1xuXG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJ2VzLW9iamVjdC1hdG9tcycpO1xuXG52YXIgJEVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzJyk7XG52YXIgJEV2YWxFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy9ldmFsJyk7XG52YXIgJFJhbmdlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvcmFuZ2UnKTtcbnZhciAkUmVmZXJlbmNlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvcmVmJyk7XG52YXIgJFN5bnRheEVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzL3N5bnRheCcpO1xudmFyICRUeXBlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvdHlwZScpO1xudmFyICRVUklFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy91cmknKTtcblxudmFyIGFicyA9IHJlcXVpcmUoJ21hdGgtaW50cmluc2ljcy9hYnMnKTtcbnZhciBmbG9vciA9IHJlcXVpcmUoJ21hdGgtaW50cmluc2ljcy9mbG9vcicpO1xudmFyIG1heCA9IHJlcXVpcmUoJ21hdGgtaW50cmluc2ljcy9tYXgnKTtcbnZhciBtaW4gPSByZXF1aXJlKCdtYXRoLWludHJpbnNpY3MvbWluJyk7XG52YXIgcG93ID0gcmVxdWlyZSgnbWF0aC1pbnRyaW5zaWNzL3BvdycpO1xudmFyIHJvdW5kID0gcmVxdWlyZSgnbWF0aC1pbnRyaW5zaWNzL3JvdW5kJyk7XG52YXIgc2lnbiA9IHJlcXVpcmUoJ21hdGgtaW50cmluc2ljcy9zaWduJyk7XG5cbnZhciAkRnVuY3Rpb24gPSBGdW5jdGlvbjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG52YXIgZ2V0RXZhbGxlZENvbnN0cnVjdG9yID0gZnVuY3Rpb24gKGV4cHJlc3Npb25TeW50YXgpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gJEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjsgcmV0dXJuICgnICsgZXhwcmVzc2lvblN5bnRheCArICcpLmNvbnN0cnVjdG9yOycpKCk7XG5cdH0gY2F0Y2ggKGUpIHt9XG59O1xuXG52YXIgJGdPUEQgPSByZXF1aXJlKCdnb3BkJyk7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnZXMtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbnZhciB0aHJvd1R5cGVFcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoKTtcbn07XG52YXIgVGhyb3dUeXBlRXJyb3IgPSAkZ09QRFxuXHQ/IChmdW5jdGlvbiAoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLWNhbGxlciwgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG5cdFx0XHRhcmd1bWVudHMuY2FsbGVlOyAvLyBJRSA4IGRvZXMgbm90IHRocm93IGhlcmVcblx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHR9IGNhdGNoIChjYWxsZWVUaHJvd3MpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIElFIDggdGhyb3dzIG9uIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXJndW1lbnRzLCAnJylcblx0XHRcdFx0cmV0dXJuICRnT1BEKGFyZ3VtZW50cywgJ2NhbGxlZScpLmdldDtcblx0XHRcdH0gY2F0Y2ggKGdPUER0aHJvd3MpIHtcblx0XHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fSgpKVxuXHQ6IHRocm93VHlwZUVycm9yO1xuXG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzJykoKTtcblxudmFyIGdldFByb3RvID0gcmVxdWlyZSgnZ2V0LXByb3RvJyk7XG52YXIgJE9iamVjdEdQTyA9IHJlcXVpcmUoJ2dldC1wcm90by9PYmplY3QuZ2V0UHJvdG90eXBlT2YnKTtcbnZhciAkUmVmbGVjdEdQTyA9IHJlcXVpcmUoJ2dldC1wcm90by9SZWZsZWN0LmdldFByb3RvdHlwZU9mJyk7XG5cbnZhciAkYXBwbHkgPSByZXF1aXJlKCdjYWxsLWJpbmQtYXBwbHktaGVscGVycy9mdW5jdGlvbkFwcGx5Jyk7XG52YXIgJGNhbGwgPSByZXF1aXJlKCdjYWxsLWJpbmQtYXBwbHktaGVscGVycy9mdW5jdGlvbkNhbGwnKTtcblxudmFyIG5lZWRzRXZhbCA9IHt9O1xuXG52YXIgVHlwZWRBcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyB8fCAhZ2V0UHJvdG8gPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdF9fcHJvdG9fXzogbnVsbCxcblx0JyVBZ2dyZWdhdGVFcnJvciUnOiB0eXBlb2YgQWdncmVnYXRlRXJyb3IgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQWdncmVnYXRlRXJyb3IsXG5cdCclQXJyYXklJzogQXJyYXksXG5cdCclQXJyYXlCdWZmZXIlJzogdHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFycmF5QnVmZmVyLFxuXHQnJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyAmJiBnZXRQcm90byA/IGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGcm9tU3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Z1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiBuZWVkc0V2YWwsXG5cdCclQXRvbWljcyUnOiB0eXBlb2YgQXRvbWljcyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBdG9taWNzLFxuXHQnJUJpZ0ludCUnOiB0eXBlb2YgQmlnSW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEJpZ0ludCxcblx0JyVCaWdJbnQ2NEFycmF5JSc6IHR5cGVvZiBCaWdJbnQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEJpZ0ludDY0QXJyYXksXG5cdCclQmlnVWludDY0QXJyYXklJzogdHlwZW9mIEJpZ1VpbnQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEJpZ1VpbnQ2NEFycmF5LFxuXHQnJUJvb2xlYW4lJzogQm9vbGVhbixcblx0JyVEYXRhVmlldyUnOiB0eXBlb2YgRGF0YVZpZXcgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRGF0YVZpZXcsXG5cdCclRGF0ZSUnOiBEYXRlLFxuXHQnJWRlY29kZVVSSSUnOiBkZWNvZGVVUkksXG5cdCclZGVjb2RlVVJJQ29tcG9uZW50JSc6IGRlY29kZVVSSUNvbXBvbmVudCxcblx0JyVlbmNvZGVVUkklJzogZW5jb2RlVVJJLFxuXHQnJWVuY29kZVVSSUNvbXBvbmVudCUnOiBlbmNvZGVVUklDb21wb25lbnQsXG5cdCclRXJyb3IlJzogJEVycm9yLFxuXHQnJWV2YWwlJzogZXZhbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG5cdCclRXZhbEVycm9yJSc6ICRFdmFsRXJyb3IsXG5cdCclRmxvYXQxNkFycmF5JSc6IHR5cGVvZiBGbG9hdDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQxNkFycmF5LFxuXHQnJUZsb2F0MzJBcnJheSUnOiB0eXBlb2YgRmxvYXQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0MzJBcnJheSxcblx0JyVGbG9hdDY0QXJyYXklJzogdHlwZW9mIEZsb2F0NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDY0QXJyYXksXG5cdCclRmluYWxpemF0aW9uUmVnaXN0cnklJzogdHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZpbmFsaXphdGlvblJlZ2lzdHJ5LFxuXHQnJUZ1bmN0aW9uJSc6ICRGdW5jdGlvbixcblx0JyVHZW5lcmF0b3JGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclSW50OEFycmF5JSc6IHR5cGVvZiBJbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50OEFycmF5LFxuXHQnJUludDE2QXJyYXklJzogdHlwZW9mIEludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MTZBcnJheSxcblx0JyVJbnQzMkFycmF5JSc6IHR5cGVvZiBJbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDMyQXJyYXksXG5cdCclaXNGaW5pdGUlJzogaXNGaW5pdGUsXG5cdCclaXNOYU4lJzogaXNOYU4sXG5cdCclSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyAmJiBnZXRQcm90byA/IGdldFByb3RvKGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkpIDogdW5kZWZpbmVkLFxuXHQnJUpTT04lJzogdHlwZW9mIEpTT04gPT09ICdvYmplY3QnID8gSlNPTiA6IHVuZGVmaW5lZCxcblx0JyVNYXAlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBNYXAsXG5cdCclTWFwSXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgfHwgIWdldFByb3RvID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWF0aCUnOiBNYXRoLFxuXHQnJU51bWJlciUnOiBOdW1iZXIsXG5cdCclT2JqZWN0JSc6ICRPYmplY3QsXG5cdCclT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciUnOiAkZ09QRCxcblx0JyVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCclcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCclUHJvbWlzZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLFxuXHQnJVByb3h5JSc6IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm94eSxcblx0JyVSYW5nZUVycm9yJSc6ICRSYW5nZUVycm9yLFxuXHQnJVJlZmVyZW5jZUVycm9yJSc6ICRSZWZlcmVuY2VFcnJvcixcblx0JyVSZWZsZWN0JSc6IHR5cGVvZiBSZWZsZWN0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFJlZmxlY3QsXG5cdCclUmVnRXhwJSc6IFJlZ0V4cCxcblx0JyVTZXQlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTZXQsXG5cdCclU2V0SXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgfHwgIWdldFByb3RvID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyAmJiBnZXRQcm90byA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogJFVSSUVycm9yLFxuXHQnJVdlYWtNYXAlJzogdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha01hcCxcblx0JyVXZWFrUmVmJSc6IHR5cGVvZiBXZWFrUmVmID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtSZWYsXG5cdCclV2Vha1NldCUnOiB0eXBlb2YgV2Vha1NldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrU2V0LFxuXG5cdCclRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwlJzogJGNhbGwsXG5cdCclRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5JSc6ICRhcHBseSxcblx0JyVPYmplY3QuZGVmaW5lUHJvcGVydHklJzogJGRlZmluZVByb3BlcnR5LFxuXHQnJU9iamVjdC5nZXRQcm90b3R5cGVPZiUnOiAkT2JqZWN0R1BPLFxuXHQnJU1hdGguYWJzJSc6IGFicyxcblx0JyVNYXRoLmZsb29yJSc6IGZsb29yLFxuXHQnJU1hdGgubWF4JSc6IG1heCxcblx0JyVNYXRoLm1pbiUnOiBtaW4sXG5cdCclTWF0aC5wb3clJzogcG93LFxuXHQnJU1hdGgucm91bmQlJzogcm91bmQsXG5cdCclTWF0aC5zaWduJSc6IHNpZ24sXG5cdCclUmVmbGVjdC5nZXRQcm90b3R5cGVPZiUnOiAkUmVmbGVjdEdQT1xufTtcblxuaWYgKGdldFByb3RvKSB7XG5cdHRyeSB7XG5cdFx0bnVsbC5lcnJvcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXNoYWRvd3JlYWxtL3B1bGwvMzg0I2lzc3VlY29tbWVudC0xMzY0MjY0MjI5XG5cdFx0dmFyIGVycm9yUHJvdG8gPSBnZXRQcm90byhnZXRQcm90byhlKSk7XG5cdFx0SU5UUklOU0lDU1snJUVycm9yLnByb3RvdHlwZSUnXSA9IGVycm9yUHJvdG87XG5cdH1cbn1cblxudmFyIGRvRXZhbCA9IGZ1bmN0aW9uIGRvRXZhbChuYW1lKSB7XG5cdHZhciB2YWx1ZTtcblx0aWYgKG5hbWUgPT09ICclQXN5bmNGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2Z1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3IlJykge1xuXHRcdHZhciBmbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJyk7XG5cdFx0aWYgKGZuKSB7XG5cdFx0XHR2YWx1ZSA9IGZuLnByb3RvdHlwZTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJScpIHtcblx0XHR2YXIgZ2VuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3IlJyk7XG5cdFx0aWYgKGdlbiAmJiBnZXRQcm90bykge1xuXHRcdFx0dmFsdWUgPSBnZXRQcm90byhnZW4ucHJvdG90eXBlKTtcblx0XHR9XG5cdH1cblxuXHRJTlRSSU5TSUNTW25hbWVdID0gdmFsdWU7XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxudmFyIExFR0FDWV9BTElBU0VTID0ge1xuXHRfX3Byb3RvX186IG51bGwsXG5cdCclQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvdHlwZSUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG9fZW50cmllcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdlbnRyaWVzJ10sXG5cdCclQXJyYXlQcm90b19mb3JFYWNoJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2ZvckVhY2gnXSxcblx0JyVBcnJheVByb3RvX2tleXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAna2V5cyddLFxuXHQnJUFycmF5UHJvdG9fdmFsdWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ3ZhbHVlcyddLFxuXHQnJUFzeW5jRnVuY3Rpb25Qcm90b3R5cGUlJzogWydBc3luY0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUJvb2xlYW5Qcm90b3R5cGUlJzogWydCb29sZWFuJywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGFWaWV3UHJvdG90eXBlJSc6IFsnRGF0YVZpZXcnLCAncHJvdG90eXBlJ10sXG5cdCclRGF0ZVByb3RvdHlwZSUnOiBbJ0RhdGUnLCAncHJvdG90eXBlJ10sXG5cdCclRXJyb3JQcm90b3R5cGUlJzogWydFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVFdmFsRXJyb3JQcm90b3R5cGUlJzogWydFdmFsRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQzMkFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0NjRBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0NjRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvciUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQ4QXJyYXlQcm90b3R5cGUlJzogWydJbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ0ludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ0ludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSlNPTlBhcnNlJSc6IFsnSlNPTicsICdwYXJzZSddLFxuXHQnJUpTT05TdHJpbmdpZnklJzogWydKU09OJywgJ3N0cmluZ2lmeSddLFxuXHQnJU1hcFByb3RvdHlwZSUnOiBbJ01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVOdW1iZXJQcm90b3R5cGUlJzogWydOdW1iZXInLCAncHJvdG90eXBlJ10sXG5cdCclT2JqZWN0UHJvdG90eXBlJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZSddLFxuXHQnJU9ialByb3RvX3RvU3RyaW5nJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd0b1N0cmluZyddLFxuXHQnJU9ialByb3RvX3ZhbHVlT2YlJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3ZhbHVlT2YnXSxcblx0JyVQcm9taXNlUHJvdG90eXBlJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnXSxcblx0JyVQcm9taXNlUHJvdG9fdGhlbiUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJywgJ3RoZW4nXSxcblx0JyVQcm9taXNlX2FsbCUnOiBbJ1Byb21pc2UnLCAnYWxsJ10sXG5cdCclUHJvbWlzZV9yZWplY3QlJzogWydQcm9taXNlJywgJ3JlamVjdCddLFxuXHQnJVByb21pc2VfcmVzb2x2ZSUnOiBbJ1Byb21pc2UnLCAncmVzb2x2ZSddLFxuXHQnJVJhbmdlRXJyb3JQcm90b3R5cGUlJzogWydSYW5nZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZmVyZW5jZUVycm9yUHJvdG90eXBlJSc6IFsnUmVmZXJlbmNlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVnRXhwUHJvdG90eXBlJSc6IFsnUmVnRXhwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVNldFByb3RvdHlwZSUnOiBbJ1NldCcsICdwcm90b3R5cGUnXSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ1NoYXJlZEFycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN0cmluZ1Byb3RvdHlwZSUnOiBbJ1N0cmluZycsICdwcm90b3R5cGUnXSxcblx0JyVTeW1ib2xQcm90b3R5cGUlJzogWydTeW1ib2wnLCAncHJvdG90eXBlJ10sXG5cdCclU3ludGF4RXJyb3JQcm90b3R5cGUlJzogWydTeW50YXhFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVHlwZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlRXJyb3JQcm90b3R5cGUlJzogWydUeXBlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhDbGFtcGVkQXJyYXlQcm90b3R5cGUlJzogWydVaW50OENsYW1wZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnVWludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVVJJRXJyb3JQcm90b3R5cGUlJzogWydVUklFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrTWFwUHJvdG90eXBlJSc6IFsnV2Vha01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrU2V0UHJvdG90eXBlJSc6IFsnV2Vha1NldCcsICdwcm90b3R5cGUnXVxufTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnaGFzb3duJyk7XG52YXIgJGNvbmNhdCA9IGJpbmQuY2FsbCgkY2FsbCwgQXJyYXkucHJvdG90eXBlLmNvbmNhdCk7XG52YXIgJHNwbGljZUFwcGx5ID0gYmluZC5jYWxsKCRhcHBseSwgQXJyYXkucHJvdG90eXBlLnNwbGljZSk7XG52YXIgJHJlcGxhY2UgPSBiaW5kLmNhbGwoJGNhbGwsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG52YXIgJHN0clNsaWNlID0gYmluZC5jYWxsKCRjYWxsLCBTdHJpbmcucHJvdG90eXBlLnNsaWNlKTtcbnZhciAkZXhlYyA9IGJpbmQuY2FsbCgkY2FsbCwgUmVnRXhwLnByb3RvdHlwZS5leGVjKTtcblxuLyogYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvNC4xNy4xNS9kaXN0L2xvZGFzaC5qcyNMNjczNS1MNjc0NCAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14lLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCUkKSkvZztcbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZzsgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgc3RyaW5nVG9QYXRoID0gZnVuY3Rpb24gc3RyaW5nVG9QYXRoKHN0cmluZykge1xuXHR2YXIgZmlyc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAwLCAxKTtcblx0dmFyIGxhc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAtMSk7XG5cdGlmIChmaXJzdCA9PT0gJyUnICYmIGxhc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgY2xvc2luZyBgJWAnKTtcblx0fSBlbHNlIGlmIChsYXN0ID09PSAnJScgJiYgZmlyc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgb3BlbmluZyBgJWAnKTtcblx0fVxuXHR2YXIgcmVzdWx0ID0gW107XG5cdCRyZXBsYWNlKHN0cmluZywgcmVQcm9wTmFtZSwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcblx0XHRyZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBxdW90ZSA/ICRyZXBsYWNlKHN1YlN0cmluZywgcmVFc2NhcGVDaGFyLCAnJDEnKSA6IG51bWJlciB8fCBtYXRjaDtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuLyogZW5kIGFkYXB0YXRpb24gKi9cblxudmFyIGdldEJhc2VJbnRyaW5zaWMgPSBmdW5jdGlvbiBnZXRCYXNlSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljTmFtZSA9IG5hbWU7XG5cdHZhciBhbGlhcztcblx0aWYgKGhhc093bihMRUdBQ1lfQUxJQVNFUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHRhbGlhcyA9IExFR0FDWV9BTElBU0VTW2ludHJpbnNpY05hbWVdO1xuXHRcdGludHJpbnNpY05hbWUgPSAnJScgKyBhbGlhc1swXSArICclJztcblx0fVxuXG5cdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHR2YXIgdmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY05hbWVdO1xuXHRcdGlmICh2YWx1ZSA9PT0gbmVlZHNFdmFsKSB7XG5cdFx0XHR2YWx1ZSA9IGRvRXZhbChpbnRyaW5zaWNOYW1lKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiYgIWFsbG93TWlzc2luZykge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGZpbGUgYW4gaXNzdWUhJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGFsaWFzOiBhbGlhcyxcblx0XHRcdG5hbWU6IGludHJpbnNpY05hbWUsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHR9XG5cblx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBkb2VzIG5vdCBleGlzdCEnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gR2V0SW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhbGxvd01pc3NpbmcgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdcImFsbG93TWlzc2luZ1wiIGFyZ3VtZW50IG11c3QgYmUgYSBib29sZWFuJyk7XG5cdH1cblxuXHRpZiAoJGV4ZWMoL14lP1teJV0qJT8kLywgbmFtZSkgPT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdgJWAgbWF5IG5vdCBiZSBwcmVzZW50IGFueXdoZXJlIGJ1dCBhdCB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgdGhlIGludHJpbnNpYyBuYW1lJyk7XG5cdH1cblx0dmFyIHBhcnRzID0gc3RyaW5nVG9QYXRoKG5hbWUpO1xuXHR2YXIgaW50cmluc2ljQmFzZU5hbWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHNbMF0gOiAnJztcblxuXHR2YXIgaW50cmluc2ljID0gZ2V0QmFzZUludHJpbnNpYygnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJywgYWxsb3dNaXNzaW5nKTtcblx0dmFyIGludHJpbnNpY1JlYWxOYW1lID0gaW50cmluc2ljLm5hbWU7XG5cdHZhciB2YWx1ZSA9IGludHJpbnNpYy52YWx1ZTtcblx0dmFyIHNraXBGdXJ0aGVyQ2FjaGluZyA9IGZhbHNlO1xuXG5cdHZhciBhbGlhcyA9IGludHJpbnNpYy5hbGlhcztcblx0aWYgKGFsaWFzKSB7XG5cdFx0aW50cmluc2ljQmFzZU5hbWUgPSBhbGlhc1swXTtcblx0XHQkc3BsaWNlQXBwbHkocGFydHMsICRjb25jYXQoWzAsIDFdLCBhbGlhcykpO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDEsIGlzT3duID0gdHJ1ZTsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIHBhcnQgPSBwYXJ0c1tpXTtcblx0XHR2YXIgZmlyc3QgPSAkc3RyU2xpY2UocGFydCwgMCwgMSk7XG5cdFx0dmFyIGxhc3QgPSAkc3RyU2xpY2UocGFydCwgLTEpO1xuXHRcdGlmIChcblx0XHRcdChcblx0XHRcdFx0KGZpcnN0ID09PSAnXCInIHx8IGZpcnN0ID09PSBcIidcIiB8fCBmaXJzdCA9PT0gJ2AnKVxuXHRcdFx0XHR8fCAobGFzdCA9PT0gJ1wiJyB8fCBsYXN0ID09PSBcIidcIiB8fCBsYXN0ID09PSAnYCcpXG5cdFx0XHQpXG5cdFx0XHQmJiBmaXJzdCAhPT0gbGFzdFxuXHRcdCkge1xuXHRcdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcigncHJvcGVydHkgbmFtZXMgd2l0aCBxdW90ZXMgbXVzdCBoYXZlIG1hdGNoaW5nIHF1b3RlcycpO1xuXHRcdH1cblx0XHRpZiAocGFydCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCAhaXNPd24pIHtcblx0XHRcdHNraXBGdXJ0aGVyQ2FjaGluZyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW50cmluc2ljQmFzZU5hbWUgKz0gJy4nICsgcGFydDtcblx0XHRpbnRyaW5zaWNSZWFsTmFtZSA9ICclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnO1xuXG5cdFx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNSZWFsTmFtZSkpIHtcblx0XHRcdHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV07XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoIShwYXJ0IGluIHZhbHVlKSkge1xuXHRcdFx0XHRpZiAoIWFsbG93TWlzc2luZykge1xuXHRcdFx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdiYXNlIGludHJpbnNpYyBmb3IgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IHRoZSBwcm9wZXJ0eSBpcyBub3QgYXZhaWxhYmxlLicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2b2lkIHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHRcdGlmICgkZ09QRCAmJiAoaSArIDEpID49IHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgZGVzYyA9ICRnT1BEKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0aXNPd24gPSAhIWRlc2M7XG5cblx0XHRcdFx0Ly8gQnkgY29udmVudGlvbiwgd2hlbiBhIGRhdGEgcHJvcGVydHkgaXMgY29udmVydGVkIHRvIGFuIGFjY2Vzc29yXG5cdFx0XHRcdC8vIHByb3BlcnR5IHRvIGVtdWxhdGUgYSBkYXRhIHByb3BlcnR5IHRoYXQgZG9lcyBub3Qgc3VmZmVyIGZyb21cblx0XHRcdFx0Ly8gdGhlIG92ZXJyaWRlIG1pc3Rha2UsIHRoYXQgYWNjZXNzb3IncyBnZXR0ZXIgaXMgbWFya2VkIHdpdGhcblx0XHRcdFx0Ly8gYW4gYG9yaWdpbmFsVmFsdWVgIHByb3BlcnR5LiBIZXJlLCB3aGVuIHdlIGRldGVjdCB0aGlzLCB3ZVxuXHRcdFx0XHQvLyB1cGhvbGQgdGhlIGlsbHVzaW9uIGJ5IHByZXRlbmRpbmcgdG8gc2VlIHRoYXQgb3JpZ2luYWwgZGF0YVxuXHRcdFx0XHQvLyBwcm9wZXJ0eSwgaS5lLiwgcmV0dXJuaW5nIHRoZSB2YWx1ZSByYXRoZXIgdGhhbiB0aGUgZ2V0dGVyXG5cdFx0XHRcdC8vIGl0c2VsZi5cblx0XHRcdFx0aWYgKGlzT3duICYmICdnZXQnIGluIGRlc2MgJiYgISgnb3JpZ2luYWxWYWx1ZScgaW4gZGVzYy5nZXQpKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBkZXNjLmdldDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpc093biA9IGhhc093bih2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc093biAmJiAhc2tpcEZ1cnRoZXJDYWNoaW5nKSB7XG5cdFx0XHRcdElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgY2FsbEJpbmRCYXNpYyA9IHJlcXVpcmUoJ2NhbGwtYmluZC1hcHBseS1oZWxwZXJzJyk7XG5cbi8qKiBAdHlwZSB7KHRoaXNBcmc6IHN0cmluZywgc2VhcmNoU3RyaW5nOiBzdHJpbmcsIHBvc2l0aW9uPzogbnVtYmVyKSA9PiBudW1iZXJ9ICovXG52YXIgJGluZGV4T2YgPSBjYWxsQmluZEJhc2ljKFtHZXRJbnRyaW5zaWMoJyVTdHJpbmcucHJvdG90eXBlLmluZGV4T2YlJyldKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHQvKiBlc2xpbnQgbm8tZXh0cmEtcGFyZW5zOiAwICovXG5cblx0dmFyIGludHJpbnNpYyA9IC8qKiBAdHlwZSB7KHRoaXM6IHVua25vd24sIC4uLmFyZ3M6IHVua25vd25bXSkgPT4gdW5rbm93bn0gKi8gKEdldEludHJpbnNpYyhuYW1lLCAhIWFsbG93TWlzc2luZykpO1xuXHRpZiAodHlwZW9mIGludHJpbnNpYyA9PT0gJ2Z1bmN0aW9uJyAmJiAkaW5kZXhPZihuYW1lLCAnLnByb3RvdHlwZS4nKSA+IC0xKSB7XG5cdFx0cmV0dXJuIGNhbGxCaW5kQmFzaWMoLyoqIEB0eXBlIHtjb25zdH0gKi8gKFtpbnRyaW5zaWNdKSk7XG5cdH1cblx0cmV0dXJuIGludHJpbnNpYztcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYm91bmQnKTtcbnZhciBpbnNwZWN0ID0gcmVxdWlyZSgnb2JqZWN0LWluc3BlY3QnKTtcblxudmFyICRUeXBlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvdHlwZScpO1xudmFyICRNYXAgPSBHZXRJbnRyaW5zaWMoJyVNYXAlJywgdHJ1ZSk7XG5cbi8qKiBAdHlwZSB7PEssIFY+KHRoaXNBcmc6IE1hcDxLLCBWPiwga2V5OiBLKSA9PiBWfSAqL1xudmFyICRtYXBHZXQgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuZ2V0JywgdHJ1ZSk7XG4vKiogQHR5cGUgezxLLCBWPih0aGlzQXJnOiBNYXA8SywgVj4sIGtleTogSywgdmFsdWU6IFYpID0+IHZvaWR9ICovXG52YXIgJG1hcFNldCA9IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5zZXQnLCB0cnVlKTtcbi8qKiBAdHlwZSB7PEssIFY+KHRoaXNBcmc6IE1hcDxLLCBWPiwga2V5OiBLKSA9PiBib29sZWFufSAqL1xudmFyICRtYXBIYXMgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuaGFzJywgdHJ1ZSk7XG4vKiogQHR5cGUgezxLLCBWPih0aGlzQXJnOiBNYXA8SywgVj4sIGtleTogSykgPT4gYm9vbGVhbn0gKi9cbnZhciAkbWFwRGVsZXRlID0gY2FsbEJvdW5kKCdNYXAucHJvdG90eXBlLmRlbGV0ZScsIHRydWUpO1xuLyoqIEB0eXBlIHs8SywgVj4odGhpc0FyZzogTWFwPEssIFY+KSA9PiBudW1iZXJ9ICovXG52YXIgJG1hcFNpemUgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuc2l6ZScsIHRydWUpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSAhISRNYXAgJiYgLyoqIEB0eXBlIHtFeGNsdWRlPGltcG9ydCgnLicpLCBmYWxzZT59ICovIGZ1bmN0aW9uIGdldFNpZGVDaGFubmVsTWFwKCkge1xuXHQvKiogQHR5cGVkZWYge1JldHVyblR5cGU8dHlwZW9mIGdldFNpZGVDaGFubmVsTWFwPn0gQ2hhbm5lbCAqL1xuXHQvKiogQHR5cGVkZWYge1BhcmFtZXRlcnM8Q2hhbm5lbFsnZ2V0J10+WzBdfSBLICovXG5cdC8qKiBAdHlwZWRlZiB7UGFyYW1ldGVyczxDaGFubmVsWydzZXQnXT5bMV19IFYgKi9cblxuXHQvKiogQHR5cGUge01hcDxLLCBWPiB8IHVuZGVmaW5lZH0gKi8gdmFyICRtO1xuXG5cdC8qKiBAdHlwZSB7Q2hhbm5lbH0gKi9cblx0dmFyIGNoYW5uZWwgPSB7XG5cdFx0YXNzZXJ0OiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRpZiAoIWNoYW5uZWwuaGFzKGtleSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1NpZGUgY2hhbm5lbCBkb2VzIG5vdCBjb250YWluICcgKyBpbnNwZWN0KGtleSkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0J2RlbGV0ZSc6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmICgkbSkge1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gJG1hcERlbGV0ZSgkbSwga2V5KTtcblx0XHRcdFx0aWYgKCRtYXBTaXplKCRtKSA9PT0gMCkge1xuXHRcdFx0XHRcdCRtID0gdm9pZCB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXHRcdGdldDogZnVuY3Rpb24gKGtleSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG5cdFx0XHRpZiAoJG0pIHtcblx0XHRcdFx0cmV0dXJuICRtYXBHZXQoJG0sIGtleSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRoYXM6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmICgkbSkge1xuXHRcdFx0XHRyZXR1cm4gJG1hcEhhcygkbSwga2V5KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdGlmICghJG0pIHtcblx0XHRcdFx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUUyBjYW4ndCBoYW5kbGUgbmFycm93aW5nIGEgdmFyaWFibGUgaW5zaWRlIGEgY2xvc3VyZVxuXHRcdFx0XHQkbSA9IG5ldyAkTWFwKCk7XG5cdFx0XHR9XG5cdFx0XHQkbWFwU2V0KCRtLCBrZXksIHZhbHVlKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUT0RPOiBmaWd1cmUgb3V0IHdoeSBUUyBpcyBlcnJvcmluZyBoZXJlXG5cdHJldHVybiBjaGFubmVsO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1ib3VuZCcpO1xudmFyIGluc3BlY3QgPSByZXF1aXJlKCdvYmplY3QtaW5zcGVjdCcpO1xudmFyIGdldFNpZGVDaGFubmVsTWFwID0gcmVxdWlyZSgnc2lkZS1jaGFubmVsLW1hcCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy90eXBlJyk7XG52YXIgJFdlYWtNYXAgPSBHZXRJbnRyaW5zaWMoJyVXZWFrTWFwJScsIHRydWUpO1xuXG4vKiogQHR5cGUgezxLIGV4dGVuZHMgb2JqZWN0LCBWPih0aGlzQXJnOiBXZWFrTWFwPEssIFY+LCBrZXk6IEspID0+IFZ9ICovXG52YXIgJHdlYWtNYXBHZXQgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLmdldCcsIHRydWUpO1xuLyoqIEB0eXBlIHs8SyBleHRlbmRzIG9iamVjdCwgVj4odGhpc0FyZzogV2Vha01hcDxLLCBWPiwga2V5OiBLLCB2YWx1ZTogVikgPT4gdm9pZH0gKi9cbnZhciAkd2Vha01hcFNldCA9IGNhbGxCb3VuZCgnV2Vha01hcC5wcm90b3R5cGUuc2V0JywgdHJ1ZSk7XG4vKiogQHR5cGUgezxLIGV4dGVuZHMgb2JqZWN0LCBWPih0aGlzQXJnOiBXZWFrTWFwPEssIFY+LCBrZXk6IEspID0+IGJvb2xlYW59ICovXG52YXIgJHdlYWtNYXBIYXMgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLmhhcycsIHRydWUpO1xuLyoqIEB0eXBlIHs8SyBleHRlbmRzIG9iamVjdCwgVj4odGhpc0FyZzogV2Vha01hcDxLLCBWPiwga2V5OiBLKSA9PiBib29sZWFufSAqL1xudmFyICR3ZWFrTWFwRGVsZXRlID0gY2FsbEJvdW5kKCdXZWFrTWFwLnByb3RvdHlwZS5kZWxldGUnLCB0cnVlKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gJFdlYWtNYXBcblx0PyAvKiogQHR5cGUge0V4Y2x1ZGU8aW1wb3J0KCcuJyksIGZhbHNlPn0gKi8gZnVuY3Rpb24gZ2V0U2lkZUNoYW5uZWxXZWFrTWFwKCkge1xuXHRcdC8qKiBAdHlwZWRlZiB7UmV0dXJuVHlwZTx0eXBlb2YgZ2V0U2lkZUNoYW5uZWxXZWFrTWFwPn0gQ2hhbm5lbCAqL1xuXHRcdC8qKiBAdHlwZWRlZiB7UGFyYW1ldGVyczxDaGFubmVsWydnZXQnXT5bMF19IEsgKi9cblx0XHQvKiogQHR5cGVkZWYge1BhcmFtZXRlcnM8Q2hhbm5lbFsnc2V0J10+WzFdfSBWICovXG5cblx0XHQvKiogQHR5cGUge1dlYWtNYXA8SyAmIG9iamVjdCwgVj4gfCB1bmRlZmluZWR9ICovIHZhciAkd207XG5cdFx0LyoqIEB0eXBlIHtDaGFubmVsIHwgdW5kZWZpbmVkfSAqLyB2YXIgJG07XG5cblx0XHQvKiogQHR5cGUge0NoYW5uZWx9ICovXG5cdFx0dmFyIGNoYW5uZWwgPSB7XG5cdFx0XHRhc3NlcnQ6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0aWYgKCFjaGFubmVsLmhhcyhrZXkpKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1NpZGUgY2hhbm5lbCBkb2VzIG5vdCBjb250YWluICcgKyBpbnNwZWN0KGtleSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0J2RlbGV0ZSc6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0XHRpZiAoJHdtKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJHdlYWtNYXBEZWxldGUoJHdtLCBrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChnZXRTaWRlQ2hhbm5lbE1hcCkge1xuXHRcdFx0XHRcdGlmICgkbSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICRtWydkZWxldGUnXShrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdFx0aWYgKCR3bSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuICR3ZWFrTWFwR2V0KCR3bSwga2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuICRtICYmICRtLmdldChrZXkpO1xuXHRcdFx0fSxcblx0XHRcdGhhczogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRpZiAoJFdlYWtNYXAgJiYga2V5ICYmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0JyB8fCB0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0XHRcdGlmICgkd20pIHtcblx0XHRcdFx0XHRcdHJldHVybiAkd2Vha01hcEhhcygkd20sIGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAhISRtICYmICRtLmhhcyhrZXkpO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0XHRpZiAoISR3bSkge1xuXHRcdFx0XHRcdFx0JHdtID0gbmV3ICRXZWFrTWFwKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCR3ZWFrTWFwU2V0KCR3bSwga2V5LCB2YWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZ2V0U2lkZUNoYW5uZWxNYXApIHtcblx0XHRcdFx0XHRpZiAoISRtKSB7XG5cdFx0XHRcdFx0XHQkbSA9IGdldFNpZGVDaGFubmVsTWFwKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRyYS1wYXJlbnNcblx0XHRcdFx0XHQvKiogQHR5cGUge05vbk51bGxhYmxlPHR5cGVvZiAkbT59ICovICgkbSkuc2V0KGtleSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVE9ETzogZmlndXJlIG91dCB3aHkgdGhpcyBpcyBlcnJvcmluZ1xuXHRcdHJldHVybiBjaGFubmVsO1xuXHR9XG5cdDogZ2V0U2lkZUNoYW5uZWxNYXA7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJFR5cGVFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy90eXBlJyk7XG52YXIgaW5zcGVjdCA9IHJlcXVpcmUoJ29iamVjdC1pbnNwZWN0Jyk7XG52YXIgZ2V0U2lkZUNoYW5uZWxMaXN0ID0gcmVxdWlyZSgnc2lkZS1jaGFubmVsLWxpc3QnKTtcbnZhciBnZXRTaWRlQ2hhbm5lbE1hcCA9IHJlcXVpcmUoJ3NpZGUtY2hhbm5lbC1tYXAnKTtcbnZhciBnZXRTaWRlQ2hhbm5lbFdlYWtNYXAgPSByZXF1aXJlKCdzaWRlLWNoYW5uZWwtd2Vha21hcCcpO1xuXG52YXIgbWFrZUNoYW5uZWwgPSBnZXRTaWRlQ2hhbm5lbFdlYWtNYXAgfHwgZ2V0U2lkZUNoYW5uZWxNYXAgfHwgZ2V0U2lkZUNoYW5uZWxMaXN0O1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRTaWRlQ2hhbm5lbCgpIHtcblx0LyoqIEB0eXBlZGVmIHtSZXR1cm5UeXBlPHR5cGVvZiBnZXRTaWRlQ2hhbm5lbD59IENoYW5uZWwgKi9cblxuXHQvKiogQHR5cGUge0NoYW5uZWwgfCB1bmRlZmluZWR9ICovIHZhciAkY2hhbm5lbERhdGE7XG5cblx0LyoqIEB0eXBlIHtDaGFubmVsfSAqL1xuXHR2YXIgY2hhbm5lbCA9IHtcblx0XHRhc3NlcnQ6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmICghY2hhbm5lbC5oYXMoa2V5KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignU2lkZSBjaGFubmVsIGRvZXMgbm90IGNvbnRhaW4gJyArIGluc3BlY3Qoa2V5KSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQnZGVsZXRlJzogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuICEhJGNoYW5uZWxEYXRhICYmICRjaGFubmVsRGF0YVsnZGVsZXRlJ10oa2V5KTtcblx0XHR9LFxuXHRcdGdldDogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuICRjaGFubmVsRGF0YSAmJiAkY2hhbm5lbERhdGEuZ2V0KGtleSk7XG5cdFx0fSxcblx0XHRoYXM6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiAhISRjaGFubmVsRGF0YSAmJiAkY2hhbm5lbERhdGEuaGFzKGtleSk7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdFx0XHRpZiAoISRjaGFubmVsRGF0YSkge1xuXHRcdFx0XHQkY2hhbm5lbERhdGEgPSBtYWtlQ2hhbm5lbCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQkY2hhbm5lbERhdGEuc2V0KGtleSwgdmFsdWUpO1xuXHRcdH1cblx0fTtcblx0Ly8gQHRzLWV4cGVjdC1lcnJvciBUT0RPOiBmaWd1cmUgb3V0IHdoeSB0aGlzIGlzIGVycm9yaW5nXG5cdHJldHVybiBjaGFubmVsO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxudmFyIEZvcm1hdCA9IHtcbiAgICBSRkMxNzM4OiAnUkZDMTczOCcsXG4gICAgUkZDMzk4NjogJ1JGQzM5ODYnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6IEZvcm1hdC5SRkMzOTg2LFxuICAgIGZvcm1hdHRlcnM6IHtcbiAgICAgICAgUkZDMTczODogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIFJGQzM5ODY6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJGQzE3Mzg6IEZvcm1hdC5SRkMxNzM4LFxuICAgIFJGQzM5ODY6IEZvcm1hdC5SRkMzOTg2XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiAwICovXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICgob3B0aW9ucyAmJiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpKSB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgIWlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmIGlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SXRlbSA9IHRhcmdldFtpXTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SXRlbSAmJiB0eXBlb2YgdGFyZ2V0SXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gbWVyZ2UodGFyZ2V0SXRlbSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0ciwgZGVjb2RlciwgY2hhcnNldCkge1xuICAgIHZhciBzdHJXaXRob3V0UGx1cyA9IHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIC8vIHVuZXNjYXBlIG5ldmVyIHRocm93cywgbm8gdHJ5Li4uY2F0Y2ggbmVlZGVkOlxuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXMucmVwbGFjZSgvJVswLTlhLWZdezJ9L2dpLCB1bmVzY2FwZSk7XG4gICAgfVxuICAgIC8vIHV0Zi04XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHJXaXRob3V0UGx1cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXM7XG4gICAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIsIGRlZmF1bHRFbmNvZGVyLCBjaGFyc2V0LCBraW5kLCBmb3JtYXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHN0cjtcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgc3RyaW5nID0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN0cik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzdHJpbmcgPSBTdHJpbmcoc3RyKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICAgICB8fCAoZm9ybWF0ID09PSBmb3JtYXRzLlJGQzE3MzggJiYgKGMgPT09IDB4MjggfHwgYyA9PT0gMHgyOSkpIC8vICggKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIGhleFRhYmxlW2NdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IChjID4+IDYpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IChjID4+IDEyKV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNGRikgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpKTtcbiAgICAgICAgLyogZXNsaW50IG9wZXJhdG9yLWxpbmVicmVhazogWzIsIFwiYmVmb3JlXCJdICovXG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcGFjdFF1ZXVlKHF1ZXVlKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBpc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxudmFyIGNvbWJpbmUgPSBmdW5jdGlvbiBjb21iaW5lKGEsIGIpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KGEsIGIpO1xufTtcblxudmFyIG1heWJlTWFwID0gZnVuY3Rpb24gbWF5YmVNYXAodmFsLCBmbikge1xuICAgIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgICAgdmFyIG1hcHBlZCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgbWFwcGVkLnB1c2goZm4odmFsW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcHBlZDtcbiAgICB9XG4gICAgcmV0dXJuIGZuKHZhbCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhcnJheVRvT2JqZWN0OiBhcnJheVRvT2JqZWN0LFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGNvbWJpbmU6IGNvbWJpbmUsXG4gICAgY29tcGFjdDogY29tcGFjdCxcbiAgICBkZWNvZGU6IGRlY29kZSxcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gICAgaXNSZWdFeHA6IGlzUmVnRXhwLFxuICAgIG1heWJlTWFwOiBtYXliZU1hcCxcbiAgICBtZXJnZTogbWVyZ2Vcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2lkZUNoYW5uZWwgPSByZXF1aXJlKCdzaWRlLWNoYW5uZWwnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgICBicmFja2V0czogZnVuY3Rpb24gYnJhY2tldHMocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgIH0sXG4gICAgY29tbWE6ICdjb21tYScsXG4gICAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkge1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgIH0sXG4gICAgcmVwZWF0OiBmdW5jdGlvbiByZXBlYXQocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIHB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcbnZhciBwdXNoVG9BcnJheSA9IGZ1bmN0aW9uIChhcnIsIHZhbHVlT3JBcnJheSkge1xuICAgIHB1c2guYXBwbHkoYXJyLCBpc0FycmF5KHZhbHVlT3JBcnJheSkgPyB2YWx1ZU9yQXJyYXkgOiBbdmFsdWVPckFycmF5XSk7XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRGb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWRkUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGZvcm1hdHRlcjogZm9ybWF0cy5mb3JtYXR0ZXJzW2RlZmF1bHRGb3JtYXRdLFxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBpbmRpY2VzOiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpc05vbk51bGxpc2hQcmltaXRpdmUgPSBmdW5jdGlvbiBpc05vbk51bGxpc2hQcmltaXRpdmUodikge1xuICAgIHJldHVybiB0eXBlb2YgdiA9PT0gJ3N0cmluZydcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdudW1iZXInXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnYm9vbGVhbidcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdzeW1ib2wnXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnYmlnaW50Jztcbn07XG5cbnZhciBzZW50aW5lbCA9IHt9O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KFxuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBjb21tYVJvdW5kVHJpcCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0LFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgIGNoYXJzZXQsXG4gICAgc2lkZUNoYW5uZWxcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG5cbiAgICB2YXIgdG1wU2MgPSBzaWRlQ2hhbm5lbDtcbiAgICB2YXIgc3RlcCA9IDA7XG4gICAgdmFyIGZpbmRGbGFnID0gZmFsc2U7XG4gICAgd2hpbGUgKCh0bXBTYyA9IHRtcFNjLmdldChzZW50aW5lbCkpICE9PSB2b2lkIHVuZGVmaW5lZCAmJiAhZmluZEZsYWcpIHtcbiAgICAgICAgLy8gV2hlcmUgb2JqZWN0IGxhc3QgYXBwZWFyZWQgaW4gdGhlIHJlZiB0cmVlXG4gICAgICAgIHZhciBwb3MgPSB0bXBTYy5nZXQob2JqZWN0KTtcbiAgICAgICAgc3RlcCArPSAxO1xuICAgICAgICBpZiAodHlwZW9mIHBvcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChwb3MgPT09IHN0ZXApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQ3ljbGljIG9iamVjdCB2YWx1ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaW5kRmxhZyA9IHRydWU7IC8vIEJyZWFrIHdoaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0bXBTYy5nZXQoc2VudGluZWwpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc3RlcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSB1dGlscy5tYXliZU1hcChvYmosIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemVEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAna2V5JywgZm9ybWF0KSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmIChpc05vbk51bGxpc2hQcmltaXRpdmUob2JqKSB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknLCBmb3JtYXQpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAndmFsdWUnLCBmb3JtYXQpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIGpvaW4gZWxlbWVudHMgaW5cbiAgICAgICAgaWYgKGVuY29kZVZhbHVlc09ubHkgJiYgZW5jb2Rlcikge1xuICAgICAgICAgICAgb2JqID0gdXRpbHMubWF5YmVNYXAob2JqLCBlbmNvZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBvYmpLZXlzID0gW3sgdmFsdWU6IG9iai5sZW5ndGggPiAwID8gb2JqLmpvaW4oJywnKSB8fCBudWxsIDogdm9pZCB1bmRlZmluZWQgfV07XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICB2YXIgYWRqdXN0ZWRQcmVmaXggPSBjb21tYVJvdW5kVHJpcCAmJiBpc0FycmF5KG9iaikgJiYgb2JqLmxlbmd0aCA9PT0gMSA/IHByZWZpeCArICdbXScgOiBwcmVmaXg7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iaktleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbal07XG4gICAgICAgIHZhciB2YWx1ZSA9IHR5cGVvZiBrZXkgPT09ICdvYmplY3QnICYmIHR5cGVvZiBrZXkudmFsdWUgIT09ICd1bmRlZmluZWQnID8ga2V5LnZhbHVlIDogb2JqW2tleV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5UHJlZml4ID0gaXNBcnJheShvYmopXG4gICAgICAgICAgICA/IHR5cGVvZiBnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnZnVuY3Rpb24nID8gZ2VuZXJhdGVBcnJheVByZWZpeChhZGp1c3RlZFByZWZpeCwga2V5KSA6IGFkanVzdGVkUHJlZml4XG4gICAgICAgICAgICA6IGFkanVzdGVkUHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyk7XG5cbiAgICAgICAgc2lkZUNoYW5uZWwuc2V0KG9iamVjdCwgc3RlcCk7XG4gICAgICAgIHZhciB2YWx1ZVNpZGVDaGFubmVsID0gZ2V0U2lkZUNoYW5uZWwoKTtcbiAgICAgICAgdmFsdWVTaWRlQ2hhbm5lbC5zZXQoc2VudGluZWwsIHNpZGVDaGFubmVsKTtcbiAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGtleVByZWZpeCxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBjb21tYVJvdW5kVHJpcCxcbiAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgZW5jb2RlVmFsdWVzT25seSAmJiBpc0FycmF5KG9iaikgPyBudWxsIDogZW5jb2RlcixcbiAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgZm9ybWF0LFxuICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgIGNoYXJzZXQsXG4gICAgICAgICAgICB2YWx1ZVNpZGVDaGFubmVsXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG52YXIgbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZW5jb2RlciAhPT0gbnVsbCAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRzLmNoYXJzZXQgfHwgZGVmYXVsdHMuY2hhcnNldDtcbiAgICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICBpZiAodHlwZW9mIG9wdHMuZm9ybWF0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIWhhcy5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0cy5mb3JtYXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0ID0gb3B0cy5mb3JtYXQ7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcblxuICAgIHZhciBmaWx0ZXIgPSBkZWZhdWx0cy5maWx0ZXI7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJyB8fCBpc0FycmF5KG9wdHMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRzLmZpbHRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRRdWVyeVByZWZpeDogdHlwZW9mIG9wdHMuYWRkUXVlcnlQcmVmaXggPT09ICdib29sZWFuJyA/IG9wdHMuYWRkUXVlcnlQcmVmaXggOiBkZWZhdWx0cy5hZGRRdWVyeVByZWZpeCxcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRzLmRlbGltaXRlcixcbiAgICAgICAgZW5jb2RlOiB0eXBlb2Ygb3B0cy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlLFxuICAgICAgICBlbmNvZGVyOiB0eXBlb2Ygb3B0cy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcixcbiAgICAgICAgZW5jb2RlVmFsdWVzT25seTogdHlwZW9mIG9wdHMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICAgICAgc29ydDogdHlwZW9mIG9wdHMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc29ydCA6IG51bGwsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcblxuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG4gICAgaWYgKG9wdHMgJiYgJ2NvbW1hUm91bmRUcmlwJyBpbiBvcHRzICYmIHR5cGVvZiBvcHRzLmNvbW1hUm91bmRUcmlwICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYGNvbW1hUm91bmRUcmlwYCBtdXN0IGJlIGEgYm9vbGVhbiwgb3IgYWJzZW50Jyk7XG4gICAgfVxuICAgIHZhciBjb21tYVJvdW5kVHJpcCA9IGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgb3B0cyAmJiBvcHRzLmNvbW1hUm91bmRUcmlwO1xuXG4gICAgaWYgKCFvYmpLZXlzKSB7XG4gICAgICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICAgICAgb2JqS2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG4gICAgfVxuXG4gICAgdmFyIHNpZGVDaGFubmVsID0gZ2V0U2lkZUNoYW5uZWwoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoVG9BcnJheShrZXlzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBjb21tYVJvdW5kVHJpcCxcbiAgICAgICAgICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgb3B0aW9ucy5za2lwTnVsbHMsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZSA/IG9wdGlvbnMuZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBvcHRpb25zLmZpbHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuc29ydCxcbiAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dEb3RzLFxuICAgICAgICAgICAgb3B0aW9ucy5zZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgb3B0aW9ucy5mb3JtYXQsXG4gICAgICAgICAgICBvcHRpb25zLmZvcm1hdHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgIG9wdGlvbnMuY2hhcnNldCxcbiAgICAgICAgICAgIHNpZGVDaGFubmVsXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JyksIHRoZSBcIm51bWVyaWMgZW50aXR5XCIgcmVwcmVzZW50YXRpb24gb2YgYSBjaGVja21hcmtcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lMjYlMjMxMDAwMyUzQiYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCdcdTI3MTMnKVxuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhbGxvd1NwYXJzZTogZmFsc2UsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGNvbW1hOiBmYWxzZSxcbiAgICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgaWdub3JlUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogZmFsc2UsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gICAgcGFyc2VBcnJheXM6IHRydWUsXG4gICAgcGxhaW5PYmplY3RzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uICgkMCwgbnVtYmVyU3RyKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG51bWJlclN0ciwgMTApKTtcbiAgICB9KTtcbn07XG5cbnZhciBwYXJzZUFycmF5VmFsdWUgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLmNvbW1hICYmIHZhbC5pbmRleE9mKCcsJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdmFsLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbn07XG5cbi8vIFRoaXMgaXMgd2hhdCBicm93c2VycyB3aWxsIHN1Ym1pdCB3aGVuIHRoZSBcdTI3MTMgY2hhcmFjdGVyIG9jY3VycyBpbiBhblxuLy8gYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIGJvZHkgYW5kIHRoZSBlbmNvZGluZyBvZiB0aGUgcGFnZSBjb250YWluaW5nXG4vLyB0aGUgZm9ybSBpcyBpc28tODg1OS0xLCBvciB3aGVuIHRoZSBzdWJtaXR0ZWQgZm9ybSBoYXMgYW4gYWNjZXB0LWNoYXJzZXRcbi8vIGF0dHJpYnV0ZSBvZiBpc28tODg1OS0xLiBQcmVzdW1hYmx5IGFsc28gd2l0aCBvdGhlciBjaGFyc2V0cyB0aGF0IGRvIG5vdCBjb250YWluXG4vLyB0aGUgXHUyNzEzIGNoYXJhY3Rlciwgc3VjaCBhcyB1cy1hc2NpaS5cbnZhciBpc29TZW50aW5lbCA9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpXG5cbi8vIFRoZXNlIGFyZSB0aGUgcGVyY2VudC1lbmNvZGVkIHV0Zi04IG9jdGV0cyByZXByZXNlbnRpbmcgYSBjaGVja21hcmssIGluZGljYXRpbmcgdGhhdCB0aGUgcmVxdWVzdCBhY3R1YWxseSBpcyB1dGYtOCBlbmNvZGVkLlxudmFyIGNoYXJzZXRTZW50aW5lbCA9ICd1dGY4PSVFMiU5QyU5Myc7IC8vIGVuY29kZVVSSUNvbXBvbmVudCgnXHUyNzEzJylcblxudmFyIHBhcnNlVmFsdWVzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ1ZhbHVlcyhzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0geyBfX3Byb3RvX186IG51bGwgfTtcblxuICAgIHZhciBjbGVhblN0ciA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPyBzdHIucmVwbGFjZSgvXlxcPy8sICcnKSA6IHN0cjtcbiAgICB2YXIgbGltaXQgPSBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQ7XG4gICAgdmFyIHBhcnRzID0gY2xlYW5TdHIuc3BsaXQob3B0aW9ucy5kZWxpbWl0ZXIsIGxpbWl0KTtcbiAgICB2YXIgc2tpcEluZGV4ID0gLTE7IC8vIEtlZXAgdHJhY2sgb2Ygd2hlcmUgdGhlIHV0Zjggc2VudGluZWwgd2FzIGZvdW5kXG4gICAgdmFyIGk7XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdGlvbnMuY2hhcnNldDtcbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFydHNbaV0uaW5kZXhPZigndXRmOD0nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpXSA9PT0gY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAndXRmLTgnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV0gPT09IGlzb1NlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAnaXNvLTg4NTktMSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNraXBJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaSA9IHBhcnRzLmxlbmd0aDsgLy8gVGhlIGVzbGludCBzZXR0aW5ncyBkbyBub3QgYWxsb3cgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGkgPT09IHNraXBJbmRleCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcblxuICAgICAgICB2YXIgYnJhY2tldEVxdWFsc1BvcyA9IHBhcnQuaW5kZXhPZignXT0nKTtcbiAgICAgICAgdmFyIHBvcyA9IGJyYWNrZXRFcXVhbHNQb3MgPT09IC0xID8gcGFydC5pbmRleE9mKCc9JykgOiBicmFja2V0RXF1YWxzUG9zICsgMTtcblxuICAgICAgICB2YXIga2V5LCB2YWw7XG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydCwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAna2V5Jyk7XG4gICAgICAgICAgICB2YWwgPSB1dGlscy5tYXliZU1hcChcbiAgICAgICAgICAgICAgICBwYXJzZUFycmF5VmFsdWUocGFydC5zbGljZShwb3MgKyAxKSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVuY29kZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZGVjb2RlcihlbmNvZGVkVmFsLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAndmFsdWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCAmJiBvcHRpb25zLmludGVycHJldE51bWVyaWNFbnRpdGllcyAmJiBjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIHZhbCA9IGludGVycHJldE51bWVyaWNFbnRpdGllcyh2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnQuaW5kZXhPZignW109JykgPiAtMSkge1xuICAgICAgICAgICAgdmFsID0gaXNBcnJheSh2YWwpID8gW3ZhbF0gOiB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHV0aWxzLmNvbWJpbmUob2JqW2tleV0sIHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgdmFyIGxlYWYgPSB2YWx1ZXNQYXJzZWQgPyB2YWwgOiBwYXJzZUFycmF5VmFsdWUodmFsLCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nICYmIG9wdGlvbnMucGFyc2VBcnJheXMpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucGFyc2VBcnJheXMgJiYgY2xlYW5Sb290ID09PSAnJykge1xuICAgICAgICAgICAgICAgIG9iaiA9IHsgMDogbGVhZiB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAhaXNOYU4oaW5kZXgpXG4gICAgICAgICAgICAgICAgJiYgcm9vdCAhPT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgU3RyaW5nKGluZGV4KSA9PT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICYmIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgICAgIG9ialtpbmRleF0gPSBsZWFmO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGVhblJvb3QgIT09ICdfX3Byb3RvX18nKSB7XG4gICAgICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBsZWFmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGVhZiA9IG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVhZjtcbn07XG5cbnZhciBwYXJzZUtleXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nS2V5cyhnaXZlbktleSwgdmFsLCBvcHRpb25zLCB2YWx1ZXNQYXJzZWQpIHtcbiAgICBpZiAoIWdpdmVuS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2Zvcm0gZG90IG5vdGF0aW9uIHRvIGJyYWNrZXQgbm90YXRpb25cbiAgICB2YXIga2V5ID0gb3B0aW9ucy5hbGxvd0RvdHMgPyBnaXZlbktleS5yZXBsYWNlKC9cXC4oW14uW10rKS9nLCAnWyQxXScpIDogZ2l2ZW5LZXk7XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgYnJhY2tldHMgPSAvKFxcW1teW1xcXV0qXSkvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15bXFxdXSpdKS9nO1xuXG4gICAgLy8gR2V0IHRoZSBwYXJlbnRcblxuICAgIHZhciBzZWdtZW50ID0gb3B0aW9ucy5kZXB0aCA+IDAgJiYgYnJhY2tldHMuZXhlYyhrZXkpO1xuICAgIHZhciBwYXJlbnQgPSBzZWdtZW50ID8ga2V5LnNsaWNlKDAsIHNlZ21lbnQuaW5kZXgpIDoga2V5O1xuXG4gICAgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICAgIHZhciBrZXlzID0gW107XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgdXNpbmcgcGxhaW4gb2JqZWN0cywgb3B0aW9uYWxseSBwcmVmaXgga2V5cyB0aGF0IHdvdWxkIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBwYXJlbnQpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAga2V5cy5wdXNoKHBhcmVudCk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKG9wdGlvbnMuZGVwdGggPiAwICYmIChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc2VnbWVudFsxXS5zbGljZSgxLCAtMSkpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGtleXMucHVzaChzZWdtZW50WzFdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcmVtYWluZGVyLCBqdXN0IGFkZCB3aGF0ZXZlciBpcyBsZWZ0XG5cbiAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VPYmplY3Qoa2V5cywgdmFsLCBvcHRpb25zLCB2YWx1ZXNQYXJzZWQpO1xufTtcblxudmFyIG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyhvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5kZWNvZGVyICE9PSBudWxsICYmIG9wdHMuZGVjb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRzLmRlY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRGVjb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHZhciBjaGFyc2V0ID0gdHlwZW9mIG9wdHMuY2hhcnNldCA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5jaGFyc2V0IDogb3B0cy5jaGFyc2V0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgYWxsb3dQcm90b3R5cGVzOiB0eXBlb2Ygb3B0cy5hbGxvd1Byb3RvdHlwZXMgPT09ICdib29sZWFuJyA/IG9wdHMuYWxsb3dQcm90b3R5cGVzIDogZGVmYXVsdHMuYWxsb3dQcm90b3R5cGVzLFxuICAgICAgICBhbGxvd1NwYXJzZTogdHlwZW9mIG9wdHMuYWxsb3dTcGFyc2UgPT09ICdib29sZWFuJyA/IG9wdHMuYWxsb3dTcGFyc2UgOiBkZWZhdWx0cy5hbGxvd1NwYXJzZSxcbiAgICAgICAgYXJyYXlMaW1pdDogdHlwZW9mIG9wdHMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0LFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGNvbW1hOiB0eXBlb2Ygb3B0cy5jb21tYSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jb21tYSA6IGRlZmF1bHRzLmNvbW1hLFxuICAgICAgICBkZWNvZGVyOiB0eXBlb2Ygb3B0cy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcixcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdHMuZGVsaW1pdGVyKSA/IG9wdHMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyLFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb24sIG5vLWV4dHJhLXBhcmVuc1xuICAgICAgICBkZXB0aDogKHR5cGVvZiBvcHRzLmRlcHRoID09PSAnbnVtYmVyJyB8fCBvcHRzLmRlcHRoID09PSBmYWxzZSkgPyArb3B0cy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoLFxuICAgICAgICBpZ25vcmVRdWVyeVByZWZpeDogb3B0cy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZSxcbiAgICAgICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiB0eXBlb2Ygb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgPT09ICdib29sZWFuJyA/IG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzIDogZGVmYXVsdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzLFxuICAgICAgICBwYXJhbWV0ZXJMaW1pdDogdHlwZW9mIG9wdHMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0cy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0LFxuICAgICAgICBwYXJzZUFycmF5czogb3B0cy5wYXJzZUFycmF5cyAhPT0gZmFsc2UsXG4gICAgICAgIHBsYWluT2JqZWN0czogdHlwZW9mIG9wdHMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRzLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cyxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucywgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpO1xuICAgICAgICBvYmogPSB1dGlscy5tZXJnZShvYmosIG5ld09iaiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuYWxsb3dTcGFyc2UgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGlmIHdlJ3JlIHJlcXVpcmVkIHRvIGFkZCBhIHBvcnQgbnVtYmVyLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkZWZhdWx0LXBvcnRcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gcG9ydCBQb3J0IG51bWJlciB3ZSBuZWVkIHRvIGNoZWNrXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvdG9jb2wgUHJvdG9jb2wgd2UgbmVlZCB0byBjaGVjayBhZ2FpbnN0LlxuICogQHJldHVybnMge0Jvb2xlYW59IElzIGl0IGEgZGVmYXVsdCBwb3J0IGZvciB0aGUgZ2l2ZW4gcHJvdG9jb2xcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcXVpcmVkKHBvcnQsIHByb3RvY29sKSB7XG4gIHByb3RvY29sID0gcHJvdG9jb2wuc3BsaXQoJzonKVswXTtcbiAgcG9ydCA9ICtwb3J0O1xuXG4gIGlmICghcG9ydCkgcmV0dXJuIGZhbHNlO1xuXG4gIHN3aXRjaCAocHJvdG9jb2wpIHtcbiAgICBjYXNlICdodHRwJzpcbiAgICBjYXNlICd3cyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDgwO1xuXG4gICAgY2FzZSAnaHR0cHMnOlxuICAgIGNhc2UgJ3dzcyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDQ0MztcblxuICAgIGNhc2UgJ2Z0cCc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDIxO1xuXG4gICAgY2FzZSAnZ29waGVyJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gNzA7XG5cbiAgICBjYXNlICdmaWxlJzpcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcG9ydCAhPT0gMDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHVuZGVmO1xuXG4vKipcbiAqIERlY29kZSBhIFVSSSBlbmNvZGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFVSSSBlbmNvZGVkIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd8TnVsbH0gVGhlIGRlY29kZWQgc3RyaW5nLlxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoaW5wdXQucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBlbmNvZGUgYSBnaXZlbiBpbnB1dC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyB0aGF0IG5lZWRzIHRvIGJlIGVuY29kZWQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfE51bGx9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogU2ltcGxlIHF1ZXJ5IHN0cmluZyBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBxdWVyeSBzdHJpbmcgdGhhdCBuZWVkcyB0byBiZSBwYXJzZWQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcXVlcnlzdHJpbmcocXVlcnkpIHtcbiAgdmFyIHBhcnNlciA9IC8oW149PyMmXSspPT8oW14mXSopL2dcbiAgICAsIHJlc3VsdCA9IHt9XG4gICAgLCBwYXJ0O1xuXG4gIHdoaWxlIChwYXJ0ID0gcGFyc2VyLmV4ZWMocXVlcnkpKSB7XG4gICAgdmFyIGtleSA9IGRlY29kZShwYXJ0WzFdKVxuICAgICAgLCB2YWx1ZSA9IGRlY29kZShwYXJ0WzJdKTtcblxuICAgIC8vXG4gICAgLy8gUHJldmVudCBvdmVycmlkaW5nIG9mIGV4aXN0aW5nIHByb3BlcnRpZXMuIFRoaXMgZW5zdXJlcyB0aGF0IGJ1aWxkLWluXG4gICAgLy8gbWV0aG9kcyBsaWtlIGB0b1N0cmluZ2Agb3IgX19wcm90b19fIGFyZSBub3Qgb3ZlcnJpZGVuIGJ5IG1hbGljaW91c1xuICAgIC8vIHF1ZXJ5c3RyaW5ncy5cbiAgICAvL1xuICAgIC8vIEluIHRoZSBjYXNlIGlmIGZhaWxlZCBkZWNvZGluZywgd2Ugd2FudCB0byBvbWl0IHRoZSBrZXkvdmFsdWUgcGFpcnNcbiAgICAvLyBmcm9tIHRoZSByZXN1bHQuXG4gICAgLy9cbiAgICBpZiAoa2V5ID09PSBudWxsIHx8IHZhbHVlID09PSBudWxsIHx8IGtleSBpbiByZXN1bHQpIGNvbnRpbnVlO1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHF1ZXJ5IHN0cmluZyB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBPYmplY3QgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJlZml4IE9wdGlvbmFsIHByZWZpeC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZ2lmeShvYmosIHByZWZpeCkge1xuICBwcmVmaXggPSBwcmVmaXggfHwgJyc7XG5cbiAgdmFyIHBhaXJzID0gW11cbiAgICAsIHZhbHVlXG4gICAgLCBrZXk7XG5cbiAgLy9cbiAgLy8gT3B0aW9uYWxseSBwcmVmaXggd2l0aCBhICc/JyBpZiBuZWVkZWRcbiAgLy9cbiAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgcHJlZml4KSBwcmVmaXggPSAnPyc7XG5cbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgdmFsdWUgPSBvYmpba2V5XTtcblxuICAgICAgLy9cbiAgICAgIC8vIEVkZ2UgY2FzZXMgd2hlcmUgd2UgYWN0dWFsbHkgd2FudCB0byBlbmNvZGUgdGhlIHZhbHVlIHRvIGFuIGVtcHR5XG4gICAgICAvLyBzdHJpbmcgaW5zdGVhZCBvZiB0aGUgc3RyaW5naWZpZWQgdmFsdWUuXG4gICAgICAvL1xuICAgICAgaWYgKCF2YWx1ZSAmJiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmIHx8IGlzTmFOKHZhbHVlKSkpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgIH1cblxuICAgICAga2V5ID0gZW5jb2RlKGtleSk7XG4gICAgICB2YWx1ZSA9IGVuY29kZSh2YWx1ZSk7XG5cbiAgICAgIC8vXG4gICAgICAvLyBJZiB3ZSBmYWlsZWQgdG8gZW5jb2RlIHRoZSBzdHJpbmdzLCB3ZSBzaG91bGQgYmFpbCBvdXQgYXMgd2UgZG9uJ3RcbiAgICAgIC8vIHdhbnQgdG8gYWRkIGludmFsaWQgc3RyaW5ncyB0byB0aGUgcXVlcnkuXG4gICAgICAvL1xuICAgICAgaWYgKGtleSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICBwYWlycy5wdXNoKGtleSArJz0nKyB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmxlbmd0aCA/IHByZWZpeCArIHBhaXJzLmpvaW4oJyYnKSA6ICcnO1xufVxuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuZXhwb3J0cy5zdHJpbmdpZnkgPSBxdWVyeXN0cmluZ2lmeTtcbmV4cG9ydHMucGFyc2UgPSBxdWVyeXN0cmluZztcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciByZXF1aXJlZCA9IHJlcXVpcmUoJ3JlcXVpcmVzLXBvcnQnKVxuICAsIHFzID0gcmVxdWlyZSgncXVlcnlzdHJpbmdpZnknKVxuICAsIGNvbnRyb2xPcldoaXRlc3BhY2UgPSAvXltcXHgwMC1cXHgyMFxcdTAwYTBcXHUxNjgwXFx1MjAwMC1cXHUyMDBhXFx1MjAyOFxcdTIwMjlcXHUyMDJmXFx1MjA1ZlxcdTMwMDBcXHVmZWZmXSsvXG4gICwgQ1JIVExGID0gL1tcXG5cXHJcXHRdL2dcbiAgLCBzbGFzaGVzID0gL15bQS1aYS16XVtBLVphLXowLTkrLS5dKjpcXC9cXC8vXG4gICwgcG9ydCA9IC86XFxkKyQvXG4gICwgcHJvdG9jb2xyZSA9IC9eKFthLXpdW2EtejAtOS4rLV0qOik/KFxcL1xcLyk/KFtcXFxcL10rKT8oW1xcU1xcc10qKS9pXG4gICwgd2luZG93c0RyaXZlTGV0dGVyID0gL15bYS16QS1aXTovO1xuXG4vKipcbiAqIFJlbW92ZSBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHdoaXRlc3BhY2UgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gc3RyIFN0cmluZyB0byB0cmltLlxuICogQHJldHVybnMge1N0cmluZ30gQSBuZXcgc3RyaW5nIHJlcHJlc2VudGluZyBgc3RyYCBzdHJpcHBlZCBvZiBjb250cm9sXG4gKiAgICAgY2hhcmFjdGVycyBhbmQgd2hpdGVzcGFjZSBmcm9tIGl0cyBiZWdpbm5pbmcuXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRyaW1MZWZ0KHN0cikge1xuICByZXR1cm4gKHN0ciA/IHN0ciA6ICcnKS50b1N0cmluZygpLnJlcGxhY2UoY29udHJvbE9yV2hpdGVzcGFjZSwgJycpO1xufVxuXG4vKipcbiAqIFRoZXNlIGFyZSB0aGUgcGFyc2UgcnVsZXMgZm9yIHRoZSBVUkwgcGFyc2VyLCBpdCBpbmZvcm1zIHRoZSBwYXJzZXJcbiAqIGFib3V0OlxuICpcbiAqIDAuIFRoZSBjaGFyIGl0IE5lZWRzIHRvIHBhcnNlLCBpZiBpdCdzIGEgc3RyaW5nIGl0IHNob3VsZCBiZSBkb25lIHVzaW5nXG4gKiAgICBpbmRleE9mLCBSZWdFeHAgdXNpbmcgZXhlYyBhbmQgTmFOIG1lYW5zIHNldCBhcyBjdXJyZW50IHZhbHVlLlxuICogMS4gVGhlIHByb3BlcnR5IHdlIHNob3VsZCBzZXQgd2hlbiBwYXJzaW5nIHRoaXMgdmFsdWUuXG4gKiAyLiBJbmRpY2F0aW9uIGlmIGl0J3MgYmFja3dhcmRzIG9yIGZvcndhcmQgcGFyc2luZywgd2hlbiBzZXQgYXMgbnVtYmVyIGl0J3NcbiAqICAgIHRoZSB2YWx1ZSBvZiBleHRyYSBjaGFycyB0aGF0IHNob3VsZCBiZSBzcGxpdCBvZmYuXG4gKiAzLiBJbmhlcml0IGZyb20gbG9jYXRpb24gaWYgbm9uIGV4aXN0aW5nIGluIHRoZSBwYXJzZXIuXG4gKiA0LiBgdG9Mb3dlckNhc2VgIHRoZSByZXN1bHRpbmcgdmFsdWUuXG4gKi9cbnZhciBydWxlcyA9IFtcbiAgWycjJywgJ2hhc2gnXSwgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnPycsICdxdWVyeSddLCAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBmdW5jdGlvbiBzYW5pdGl6ZShhZGRyZXNzLCB1cmwpIHsgICAgIC8vIFNhbml0aXplIHdoYXQgaXMgbGVmdCBvZiB0aGUgYWRkcmVzc1xuICAgIHJldHVybiBpc1NwZWNpYWwodXJsLnByb3RvY29sKSA/IGFkZHJlc3MucmVwbGFjZSgvXFxcXC9nLCAnLycpIDogYWRkcmVzcztcbiAgfSxcbiAgWycvJywgJ3BhdGhuYW1lJ10sICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnQCcsICdhdXRoJywgMV0sICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBmcm9udC5cbiAgW05hTiwgJ2hvc3QnLCB1bmRlZmluZWQsIDEsIDFdLCAgICAgICAvLyBTZXQgbGVmdCBvdmVyIHZhbHVlLlxuICBbLzooXFxkKikkLywgJ3BvcnQnLCB1bmRlZmluZWQsIDFdLCAgICAvLyBSZWdFeHAgdGhlIGJhY2suXG4gIFtOYU4sICdob3N0bmFtZScsIHVuZGVmaW5lZCwgMSwgMV0gICAgLy8gU2V0IGxlZnQgb3Zlci5cbl07XG5cbi8qKlxuICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgbm90IGJlIGNvcGllZCBvciBpbmhlcml0ZWQgZnJvbS4gVGhpcyBpcyBvbmx5IG5lZWRlZFxuICogZm9yIGFsbCBub24gYmxvYiBVUkwncyBhcyBhIGJsb2IgVVJMIGRvZXMgbm90IGluY2x1ZGUgYSBoYXNoLCBvbmx5IHRoZVxuICogb3JpZ2luLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgaWdub3JlID0geyBoYXNoOiAxLCBxdWVyeTogMSB9O1xuXG4vKipcbiAqIFRoZSBsb2NhdGlvbiBvYmplY3QgZGlmZmVycyB3aGVuIHlvdXIgY29kZSBpcyBsb2FkZWQgdGhyb3VnaCBhIG5vcm1hbCBwYWdlLFxuICogV29ya2VyIG9yIHRocm91Z2ggYSB3b3JrZXIgdXNpbmcgYSBibG9iLiBBbmQgd2l0aCB0aGUgYmxvYmJsZSBiZWdpbnMgdGhlXG4gKiB0cm91YmxlIGFzIHRoZSBsb2NhdGlvbiBvYmplY3Qgd2lsbCBjb250YWluIHRoZSBVUkwgb2YgdGhlIGJsb2IsIG5vdCB0aGVcbiAqIGxvY2F0aW9uIG9mIHRoZSBwYWdlIHdoZXJlIG91ciBjb2RlIGlzIGxvYWRlZCBpbi4gVGhlIGFjdHVhbCBvcmlnaW4gaXNcbiAqIGVuY29kZWQgaW4gdGhlIGBwYXRobmFtZWAgc28gd2UgY2FuIHRoYW5rZnVsbHkgZ2VuZXJhdGUgYSBnb29kIFwiZGVmYXVsdFwiXG4gKiBsb2NhdGlvbiBmcm9tIGl0IHNvIHdlIGNhbiBnZW5lcmF0ZSBwcm9wZXIgcmVsYXRpdmUgVVJMJ3MgYWdhaW4uXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBsb2MgT3B0aW9uYWwgZGVmYXVsdCBsb2NhdGlvbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBsb2xjYXRpb24gb2JqZWN0LlxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBsb2xjYXRpb24obG9jKSB7XG4gIHZhciBnbG9iYWxWYXI7XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSBnbG9iYWxWYXIgPSB3aW5kb3c7XG4gIGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSBnbG9iYWxWYXIgPSBnbG9iYWw7XG4gIGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgZ2xvYmFsVmFyID0gc2VsZjtcbiAgZWxzZSBnbG9iYWxWYXIgPSB7fTtcblxuICB2YXIgbG9jYXRpb24gPSBnbG9iYWxWYXIubG9jYXRpb24gfHwge307XG4gIGxvYyA9IGxvYyB8fCBsb2NhdGlvbjtcblxuICB2YXIgZmluYWxkZXN0aW5hdGlvbiA9IHt9XG4gICAgLCB0eXBlID0gdHlwZW9mIGxvY1xuICAgICwga2V5O1xuXG4gIGlmICgnYmxvYjonID09PSBsb2MucHJvdG9jb2wpIHtcbiAgICBmaW5hbGRlc3RpbmF0aW9uID0gbmV3IFVybCh1bmVzY2FwZShsb2MucGF0aG5hbWUpLCB7fSk7XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGUpIHtcbiAgICBmaW5hbGRlc3RpbmF0aW9uID0gbmV3IFVybChsb2MsIHt9KTtcbiAgICBmb3IgKGtleSBpbiBpZ25vcmUpIGRlbGV0ZSBmaW5hbGRlc3RpbmF0aW9uW2tleV07XG4gIH0gZWxzZSBpZiAoJ29iamVjdCcgPT09IHR5cGUpIHtcbiAgICBmb3IgKGtleSBpbiBsb2MpIHtcbiAgICAgIGlmIChrZXkgaW4gaWdub3JlKSBjb250aW51ZTtcbiAgICAgIGZpbmFsZGVzdGluYXRpb25ba2V5XSA9IGxvY1trZXldO1xuICAgIH1cblxuICAgIGlmIChmaW5hbGRlc3RpbmF0aW9uLnNsYXNoZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZmluYWxkZXN0aW5hdGlvbi5zbGFzaGVzID0gc2xhc2hlcy50ZXN0KGxvYy5ocmVmKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmluYWxkZXN0aW5hdGlvbjtcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgcHJvdG9jb2wgc2NoZW1lIGlzIHNwZWNpYWwuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFRoZSBwcm90b2NvbCBzY2hlbWUgb2YgdGhlIFVSTFxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcm90b2NvbCBzY2hlbWUgaXMgc3BlY2lhbCwgZWxzZSBgZmFsc2VgXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1NwZWNpYWwoc2NoZW1lKSB7XG4gIHJldHVybiAoXG4gICAgc2NoZW1lID09PSAnZmlsZTonIHx8XG4gICAgc2NoZW1lID09PSAnZnRwOicgfHxcbiAgICBzY2hlbWUgPT09ICdodHRwOicgfHxcbiAgICBzY2hlbWUgPT09ICdodHRwczonIHx8XG4gICAgc2NoZW1lID09PSAnd3M6JyB8fFxuICAgIHNjaGVtZSA9PT0gJ3dzczonXG4gICk7XG59XG5cbi8qKlxuICogQHR5cGVkZWYgUHJvdG9jb2xFeHRyYWN0XG4gKiBAdHlwZSBPYmplY3RcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwcm90b2NvbCBQcm90b2NvbCBtYXRjaGVkIGluIHRoZSBVUkwsIGluIGxvd2VyY2FzZS5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc2xhc2hlcyBgdHJ1ZWAgaWYgcHJvdG9jb2wgaXMgZm9sbG93ZWQgYnkgXCIvL1wiLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcmVzdCBSZXN0IG9mIHRoZSBVUkwgdGhhdCBpcyBub3QgcGFydCBvZiB0aGUgcHJvdG9jb2wuXG4gKi9cblxuLyoqXG4gKiBFeHRyYWN0IHByb3RvY29sIGluZm9ybWF0aW9uIGZyb20gYSBVUkwgd2l0aC93aXRob3V0IGRvdWJsZSBzbGFzaCAoXCIvL1wiKS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBleHRyYWN0IGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gbG9jYXRpb25cbiAqIEByZXR1cm4ge1Byb3RvY29sRXh0cmFjdH0gRXh0cmFjdGVkIGluZm9ybWF0aW9uLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFByb3RvY29sKGFkZHJlc3MsIGxvY2F0aW9uKSB7XG4gIGFkZHJlc3MgPSB0cmltTGVmdChhZGRyZXNzKTtcbiAgYWRkcmVzcyA9IGFkZHJlc3MucmVwbGFjZShDUkhUTEYsICcnKTtcbiAgbG9jYXRpb24gPSBsb2NhdGlvbiB8fCB7fTtcblxuICB2YXIgbWF0Y2ggPSBwcm90b2NvbHJlLmV4ZWMoYWRkcmVzcyk7XG4gIHZhciBwcm90b2NvbCA9IG1hdGNoWzFdID8gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSA6ICcnO1xuICB2YXIgZm9yd2FyZFNsYXNoZXMgPSAhIW1hdGNoWzJdO1xuICB2YXIgb3RoZXJTbGFzaGVzID0gISFtYXRjaFszXTtcbiAgdmFyIHNsYXNoZXNDb3VudCA9IDA7XG4gIHZhciByZXN0O1xuXG4gIGlmIChmb3J3YXJkU2xhc2hlcykge1xuICAgIGlmIChvdGhlclNsYXNoZXMpIHtcbiAgICAgIHJlc3QgPSBtYXRjaFsyXSArIG1hdGNoWzNdICsgbWF0Y2hbNF07XG4gICAgICBzbGFzaGVzQ291bnQgPSBtYXRjaFsyXS5sZW5ndGggKyBtYXRjaFszXS5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3QgPSBtYXRjaFsyXSArIG1hdGNoWzRdO1xuICAgICAgc2xhc2hlc0NvdW50ID0gbWF0Y2hbMl0ubGVuZ3RoO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAob3RoZXJTbGFzaGVzKSB7XG4gICAgICByZXN0ID0gbWF0Y2hbM10gKyBtYXRjaFs0XTtcbiAgICAgIHNsYXNoZXNDb3VudCA9IG1hdGNoWzNdLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdCA9IG1hdGNoWzRdXG4gICAgfVxuICB9XG5cbiAgaWYgKHByb3RvY29sID09PSAnZmlsZTonKSB7XG4gICAgaWYgKHNsYXNoZXNDb3VudCA+PSAyKSB7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZSgyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTcGVjaWFsKHByb3RvY29sKSkge1xuICAgIHJlc3QgPSBtYXRjaFs0XTtcbiAgfSBlbHNlIGlmIChwcm90b2NvbCkge1xuICAgIGlmIChmb3J3YXJkU2xhc2hlcykge1xuICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoMik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNsYXNoZXNDb3VudCA+PSAyICYmIGlzU3BlY2lhbChsb2NhdGlvbi5wcm90b2NvbCkpIHtcbiAgICByZXN0ID0gbWF0Y2hbNF07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb3RvY29sOiBwcm90b2NvbCxcbiAgICBzbGFzaGVzOiBmb3J3YXJkU2xhc2hlcyB8fCBpc1NwZWNpYWwocHJvdG9jb2wpLFxuICAgIHNsYXNoZXNDb3VudDogc2xhc2hlc0NvdW50LFxuICAgIHJlc3Q6IHJlc3RcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlIGEgcmVsYXRpdmUgVVJMIHBhdGhuYW1lIGFnYWluc3QgYSBiYXNlIFVSTCBwYXRobmFtZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpdmUgUGF0aG5hbWUgb2YgdGhlIHJlbGF0aXZlIFVSTC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlIFBhdGhuYW1lIG9mIHRoZSBiYXNlIFVSTC5cbiAqIEByZXR1cm4ge1N0cmluZ30gUmVzb2x2ZWQgcGF0aG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZXNvbHZlKHJlbGF0aXZlLCBiYXNlKSB7XG4gIGlmIChyZWxhdGl2ZSA9PT0gJycpIHJldHVybiBiYXNlO1xuXG4gIHZhciBwYXRoID0gKGJhc2UgfHwgJy8nKS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5jb25jYXQocmVsYXRpdmUuc3BsaXQoJy8nKSlcbiAgICAsIGkgPSBwYXRoLmxlbmd0aFxuICAgICwgbGFzdCA9IHBhdGhbaSAtIDFdXG4gICAgLCB1bnNoaWZ0ID0gZmFsc2VcbiAgICAsIHVwID0gMDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWYgKHBhdGhbaV0gPT09ICcuJykge1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChwYXRoW2ldID09PSAnLi4nKSB7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgaWYgKGkgPT09IDApIHVuc2hpZnQgPSB0cnVlO1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICh1bnNoaWZ0KSBwYXRoLnVuc2hpZnQoJycpO1xuICBpZiAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHBhdGgucHVzaCgnJyk7XG5cbiAgcmV0dXJuIHBhdGguam9pbignLycpO1xufVxuXG4vKipcbiAqIFRoZSBhY3R1YWwgVVJMIGluc3RhbmNlLiBJbnN0ZWFkIG9mIHJldHVybmluZyBhbiBvYmplY3Qgd2UndmUgb3B0ZWQtaW4gdG9cbiAqIGNyZWF0ZSBhbiBhY3R1YWwgY29uc3RydWN0b3IgYXMgaXQncyBtdWNoIG1vcmUgbWVtb3J5IGVmZmljaWVudCBhbmRcbiAqIGZhc3RlciBhbmQgaXQgcGxlYXNlcyBteSBPQ0QuXG4gKlxuICogSXQgaXMgd29ydGggbm90aW5nIHRoYXQgd2Ugc2hvdWxkIG5vdCB1c2UgYFVSTGAgYXMgY2xhc3MgbmFtZSB0byBwcmV2ZW50XG4gKiBjbGFzaGVzIHdpdGggdGhlIGdsb2JhbCBVUkwgaW5zdGFuY2UgdGhhdCBnb3QgaW50cm9kdWNlZCBpbiBicm93c2Vycy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIFVSTCB3ZSB3YW50IHRvIHBhcnNlLlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBbbG9jYXRpb25dIExvY2F0aW9uIGRlZmF1bHRzIGZvciByZWxhdGl2ZSBwYXRocy5cbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gW3BhcnNlcl0gUGFyc2VyIGZvciB0aGUgcXVlcnkgc3RyaW5nLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gVXJsKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpIHtcbiAgYWRkcmVzcyA9IHRyaW1MZWZ0KGFkZHJlc3MpO1xuICBhZGRyZXNzID0gYWRkcmVzcy5yZXBsYWNlKENSSFRMRiwgJycpO1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBVcmwpKSB7XG4gICAgcmV0dXJuIG5ldyBVcmwoYWRkcmVzcywgbG9jYXRpb24sIHBhcnNlcik7XG4gIH1cblxuICB2YXIgcmVsYXRpdmUsIGV4dHJhY3RlZCwgcGFyc2UsIGluc3RydWN0aW9uLCBpbmRleCwga2V5XG4gICAgLCBpbnN0cnVjdGlvbnMgPSBydWxlcy5zbGljZSgpXG4gICAgLCB0eXBlID0gdHlwZW9mIGxvY2F0aW9uXG4gICAgLCB1cmwgPSB0aGlzXG4gICAgLCBpID0gMDtcblxuICAvL1xuICAvLyBUaGUgZm9sbG93aW5nIGlmIHN0YXRlbWVudHMgYWxsb3dzIHRoaXMgbW9kdWxlIHR3byBoYXZlIGNvbXBhdGliaWxpdHkgd2l0aFxuICAvLyAyIGRpZmZlcmVudCBBUEk6XG4gIC8vXG4gIC8vIDEuIE5vZGUuanMncyBgdXJsLnBhcnNlYCBhcGkgd2hpY2ggYWNjZXB0cyBhIFVSTCwgYm9vbGVhbiBhcyBhcmd1bWVudHNcbiAgLy8gICAgd2hlcmUgdGhlIGJvb2xlYW4gaW5kaWNhdGVzIHRoYXQgdGhlIHF1ZXJ5IHN0cmluZyBzaG91bGQgYWxzbyBiZSBwYXJzZWQuXG4gIC8vXG4gIC8vIDIuIFRoZSBgVVJMYCBpbnRlcmZhY2Ugb2YgdGhlIGJyb3dzZXIgd2hpY2ggYWNjZXB0cyBhIFVSTCwgb2JqZWN0IGFzXG4gIC8vICAgIGFyZ3VtZW50cy4gVGhlIHN1cHBsaWVkIG9iamVjdCB3aWxsIGJlIHVzZWQgYXMgZGVmYXVsdCB2YWx1ZXMgLyBmYWxsLWJhY2tcbiAgLy8gICAgZm9yIHJlbGF0aXZlIHBhdGhzLlxuICAvL1xuICBpZiAoJ29iamVjdCcgIT09IHR5cGUgJiYgJ3N0cmluZycgIT09IHR5cGUpIHtcbiAgICBwYXJzZXIgPSBsb2NhdGlvbjtcbiAgICBsb2NhdGlvbiA9IG51bGw7XG4gIH1cblxuICBpZiAocGFyc2VyICYmICdmdW5jdGlvbicgIT09IHR5cGVvZiBwYXJzZXIpIHBhcnNlciA9IHFzLnBhcnNlO1xuXG4gIGxvY2F0aW9uID0gbG9sY2F0aW9uKGxvY2F0aW9uKTtcblxuICAvL1xuICAvLyBFeHRyYWN0IHByb3RvY29sIGluZm9ybWF0aW9uIGJlZm9yZSBydW5uaW5nIHRoZSBpbnN0cnVjdGlvbnMuXG4gIC8vXG4gIGV4dHJhY3RlZCA9IGV4dHJhY3RQcm90b2NvbChhZGRyZXNzIHx8ICcnLCBsb2NhdGlvbik7XG4gIHJlbGF0aXZlID0gIWV4dHJhY3RlZC5wcm90b2NvbCAmJiAhZXh0cmFjdGVkLnNsYXNoZXM7XG4gIHVybC5zbGFzaGVzID0gZXh0cmFjdGVkLnNsYXNoZXMgfHwgcmVsYXRpdmUgJiYgbG9jYXRpb24uc2xhc2hlcztcbiAgdXJsLnByb3RvY29sID0gZXh0cmFjdGVkLnByb3RvY29sIHx8IGxvY2F0aW9uLnByb3RvY29sIHx8ICcnO1xuICBhZGRyZXNzID0gZXh0cmFjdGVkLnJlc3Q7XG5cbiAgLy9cbiAgLy8gV2hlbiB0aGUgYXV0aG9yaXR5IGNvbXBvbmVudCBpcyBhYnNlbnQgdGhlIFVSTCBzdGFydHMgd2l0aCBhIHBhdGhcbiAgLy8gY29tcG9uZW50LlxuICAvL1xuICBpZiAoXG4gICAgZXh0cmFjdGVkLnByb3RvY29sID09PSAnZmlsZTonICYmIChcbiAgICAgIGV4dHJhY3RlZC5zbGFzaGVzQ291bnQgIT09IDIgfHwgd2luZG93c0RyaXZlTGV0dGVyLnRlc3QoYWRkcmVzcykpIHx8XG4gICAgKCFleHRyYWN0ZWQuc2xhc2hlcyAmJlxuICAgICAgKGV4dHJhY3RlZC5wcm90b2NvbCB8fFxuICAgICAgICBleHRyYWN0ZWQuc2xhc2hlc0NvdW50IDwgMiB8fFxuICAgICAgICAhaXNTcGVjaWFsKHVybC5wcm90b2NvbCkpKVxuICApIHtcbiAgICBpbnN0cnVjdGlvbnNbM10gPSBbLyguKikvLCAncGF0aG5hbWUnXTtcbiAgfVxuXG4gIGZvciAoOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgaW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbnNbaV07XG5cbiAgICBpZiAodHlwZW9mIGluc3RydWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhZGRyZXNzID0gaW5zdHJ1Y3Rpb24oYWRkcmVzcywgdXJsKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHBhcnNlID0gaW5zdHJ1Y3Rpb25bMF07XG4gICAga2V5ID0gaW5zdHJ1Y3Rpb25bMV07XG5cbiAgICBpZiAocGFyc2UgIT09IHBhcnNlKSB7XG4gICAgICB1cmxba2V5XSA9IGFkZHJlc3M7XG4gICAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHBhcnNlKSB7XG4gICAgICBpbmRleCA9IHBhcnNlID09PSAnQCdcbiAgICAgICAgPyBhZGRyZXNzLmxhc3RJbmRleE9mKHBhcnNlKVxuICAgICAgICA6IGFkZHJlc3MuaW5kZXhPZihwYXJzZSk7XG5cbiAgICAgIGlmICh+aW5kZXgpIHtcbiAgICAgICAgaWYgKCdudW1iZXInID09PSB0eXBlb2YgaW5zdHJ1Y3Rpb25bMl0pIHtcbiAgICAgICAgICB1cmxba2V5XSA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKGluZGV4ICsgaW5zdHJ1Y3Rpb25bMl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybFtrZXldID0gYWRkcmVzcy5zbGljZShpbmRleCk7XG4gICAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgoaW5kZXggPSBwYXJzZS5leGVjKGFkZHJlc3MpKSkge1xuICAgICAgdXJsW2tleV0gPSBpbmRleFsxXTtcbiAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4LmluZGV4KTtcbiAgICB9XG5cbiAgICB1cmxba2V5XSA9IHVybFtrZXldIHx8IChcbiAgICAgIHJlbGF0aXZlICYmIGluc3RydWN0aW9uWzNdID8gbG9jYXRpb25ba2V5XSB8fCAnJyA6ICcnXG4gICAgKTtcblxuICAgIC8vXG4gICAgLy8gSG9zdG5hbWUsIGhvc3QgYW5kIHByb3RvY29sIHNob3VsZCBiZSBsb3dlcmNhc2VkIHNvIHRoZXkgY2FuIGJlIHVzZWQgdG9cbiAgICAvLyBjcmVhdGUgYSBwcm9wZXIgYG9yaWdpbmAuXG4gICAgLy9cbiAgICBpZiAoaW5zdHJ1Y3Rpb25bNF0pIHVybFtrZXldID0gdXJsW2tleV0udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIEFsc28gcGFyc2UgdGhlIHN1cHBsaWVkIHF1ZXJ5IHN0cmluZyBpbiB0byBhbiBvYmplY3QuIElmIHdlJ3JlIHN1cHBsaWVkXG4gIC8vIHdpdGggYSBjdXN0b20gcGFyc2VyIGFzIGZ1bmN0aW9uIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgYnVpbGQtaW5cbiAgLy8gcGFyc2VyLlxuICAvL1xuICBpZiAocGFyc2VyKSB1cmwucXVlcnkgPSBwYXJzZXIodXJsLnF1ZXJ5KTtcblxuICAvL1xuICAvLyBJZiB0aGUgVVJMIGlzIHJlbGF0aXZlLCByZXNvbHZlIHRoZSBwYXRobmFtZSBhZ2FpbnN0IHRoZSBiYXNlIFVSTC5cbiAgLy9cbiAgaWYgKFxuICAgICAgcmVsYXRpdmVcbiAgICAmJiBsb2NhdGlvbi5zbGFzaGVzXG4gICAgJiYgdXJsLnBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nXG4gICAgJiYgKHVybC5wYXRobmFtZSAhPT0gJycgfHwgbG9jYXRpb24ucGF0aG5hbWUgIT09ICcnKVxuICApIHtcbiAgICB1cmwucGF0aG5hbWUgPSByZXNvbHZlKHVybC5wYXRobmFtZSwgbG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgLy9cbiAgLy8gRGVmYXVsdCB0byBhIC8gZm9yIHBhdGhuYW1lIGlmIG5vbmUgZXhpc3RzLiBUaGlzIG5vcm1hbGl6ZXMgdGhlIFVSTFxuICAvLyB0byBhbHdheXMgaGF2ZSBhIC9cbiAgLy9cbiAgaWYgKHVybC5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJyAmJiBpc1NwZWNpYWwodXJsLnByb3RvY29sKSkge1xuICAgIHVybC5wYXRobmFtZSA9ICcvJyArIHVybC5wYXRobmFtZTtcbiAgfVxuXG4gIC8vXG4gIC8vIFdlIHNob3VsZCBub3QgYWRkIHBvcnQgbnVtYmVycyBpZiB0aGV5IGFyZSBhbHJlYWR5IHRoZSBkZWZhdWx0IHBvcnQgbnVtYmVyXG4gIC8vIGZvciBhIGdpdmVuIHByb3RvY29sLiBBcyB0aGUgaG9zdCBhbHNvIGNvbnRhaW5zIHRoZSBwb3J0IG51bWJlciB3ZSdyZSBnb2luZ1xuICAvLyBvdmVycmlkZSBpdCB3aXRoIHRoZSBob3N0bmFtZSB3aGljaCBjb250YWlucyBubyBwb3J0IG51bWJlci5cbiAgLy9cbiAgaWYgKCFyZXF1aXJlZCh1cmwucG9ydCwgdXJsLnByb3RvY29sKSkge1xuICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgIHVybC5wb3J0ID0gJyc7XG4gIH1cblxuICAvL1xuICAvLyBQYXJzZSBkb3duIHRoZSBgYXV0aGAgZm9yIHRoZSB1c2VybmFtZSBhbmQgcGFzc3dvcmQuXG4gIC8vXG4gIHVybC51c2VybmFtZSA9IHVybC5wYXNzd29yZCA9ICcnO1xuXG4gIGlmICh1cmwuYXV0aCkge1xuICAgIGluZGV4ID0gdXJsLmF1dGguaW5kZXhPZignOicpO1xuXG4gICAgaWYgKH5pbmRleCkge1xuICAgICAgdXJsLnVzZXJuYW1lID0gdXJsLmF1dGguc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgdXJsLnVzZXJuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlY29kZVVSSUNvbXBvbmVudCh1cmwudXNlcm5hbWUpKTtcblxuICAgICAgdXJsLnBhc3N3b3JkID0gdXJsLmF1dGguc2xpY2UoaW5kZXggKyAxKTtcbiAgICAgIHVybC5wYXNzd29yZCA9IGVuY29kZVVSSUNvbXBvbmVudChkZWNvZGVVUklDb21wb25lbnQodXJsLnBhc3N3b3JkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsLnVzZXJuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlY29kZVVSSUNvbXBvbmVudCh1cmwuYXV0aCkpO1xuICAgIH1cblxuICAgIHVybC5hdXRoID0gdXJsLnBhc3N3b3JkID8gdXJsLnVzZXJuYW1lICsnOicrIHVybC5wYXNzd29yZCA6IHVybC51c2VybmFtZTtcbiAgfVxuXG4gIHVybC5vcmlnaW4gPSB1cmwucHJvdG9jb2wgIT09ICdmaWxlOicgJiYgaXNTcGVjaWFsKHVybC5wcm90b2NvbCkgJiYgdXJsLmhvc3RcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICAvL1xuICAvLyBUaGUgaHJlZiBpcyBqdXN0IHRoZSBjb21waWxlZCByZXN1bHQuXG4gIC8vXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogVGhpcyBpcyBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNoYW5naW5nIHByb3BlcnRpZXMgaW4gdGhlIFVSTCBpbnN0YW5jZSB0b1xuICogaW5zdXJlIHRoYXQgdGhleSBhbGwgcHJvcGFnYXRlIGNvcnJlY3RseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFydCAgICAgICAgICBQcm9wZXJ0eSB3ZSBuZWVkIHRvIGFkanVzdC5cbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlICAgICAgICAgIFRoZSBuZXdseSBhc3NpZ25lZCB2YWx1ZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gZm4gIFdoZW4gc2V0dGluZyB0aGUgcXVlcnksIGl0IHdpbGwgYmUgdGhlIGZ1bmN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkIHRvIHBhcnNlIHRoZSBxdWVyeS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdoZW4gc2V0dGluZyB0aGUgcHJvdG9jb2wsIGRvdWJsZSBzbGFzaCB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGZpbmFsIHVybCBpZiBpdCBpcyB0cnVlLlxuICogQHJldHVybnMge1VSTH0gVVJMIGluc3RhbmNlIGZvciBjaGFpbmluZy5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gc2V0KHBhcnQsIHZhbHVlLCBmbikge1xuICB2YXIgdXJsID0gdGhpcztcblxuICBzd2l0Y2ggKHBhcnQpIHtcbiAgICBjYXNlICdxdWVyeSc6XG4gICAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFsdWUgPSAoZm4gfHwgcXMucGFyc2UpKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BvcnQnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICghcmVxdWlyZWQodmFsdWUsIHVybC5wcm90b2NvbCkpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWU7XG4gICAgICAgIHVybFtwYXJ0XSA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZSArJzonKyB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdob3N0bmFtZSc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKHVybC5wb3J0KSB2YWx1ZSArPSAnOicrIHVybC5wb3J0O1xuICAgICAgdXJsLmhvc3QgPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdCc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKHBvcnQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICB1cmwucG9ydCA9IHZhbHVlLnBvcCgpO1xuICAgICAgICB1cmwuaG9zdG5hbWUgPSB2YWx1ZS5qb2luKCc6Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmwuaG9zdG5hbWUgPSB2YWx1ZTtcbiAgICAgICAgdXJsLnBvcnQgPSAnJztcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwcm90b2NvbCc6XG4gICAgICB1cmwucHJvdG9jb2wgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdXJsLnNsYXNoZXMgPSAhZm47XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BhdGhuYW1lJzpcbiAgICBjYXNlICdoYXNoJzpcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB2YXIgY2hhciA9IHBhcnQgPT09ICdwYXRobmFtZScgPyAnLycgOiAnIyc7XG4gICAgICAgIHVybFtwYXJ0XSA9IHZhbHVlLmNoYXJBdCgwKSAhPT0gY2hhciA/IGNoYXIgKyB2YWx1ZSA6IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3VzZXJuYW1lJzpcbiAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICB1cmxbcGFydF0gPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdhdXRoJzpcbiAgICAgIHZhciBpbmRleCA9IHZhbHVlLmluZGV4T2YoJzonKTtcblxuICAgICAgaWYgKH5pbmRleCkge1xuICAgICAgICB1cmwudXNlcm5hbWUgPSB2YWx1ZS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgIHVybC51c2VybmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChkZWNvZGVVUklDb21wb25lbnQodXJsLnVzZXJuYW1lKSk7XG5cbiAgICAgICAgdXJsLnBhc3N3b3JkID0gdmFsdWUuc2xpY2UoaW5kZXggKyAxKTtcbiAgICAgICAgdXJsLnBhc3N3b3JkID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlY29kZVVSSUNvbXBvbmVudCh1cmwucGFzc3dvcmQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybC51c2VybmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zID0gcnVsZXNbaV07XG5cbiAgICBpZiAoaW5zWzRdKSB1cmxbaW5zWzFdXSA9IHVybFtpbnNbMV1dLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICB1cmwuYXV0aCA9IHVybC5wYXNzd29yZCA/IHVybC51c2VybmFtZSArJzonKyB1cmwucGFzc3dvcmQgOiB1cmwudXNlcm5hbWU7XG5cbiAgdXJsLm9yaWdpbiA9IHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6JyAmJiBpc1NwZWNpYWwodXJsLnByb3RvY29sKSAmJiB1cmwuaG9zdFxuICAgID8gdXJsLnByb3RvY29sICsnLy8nKyB1cmwuaG9zdFxuICAgIDogJ251bGwnO1xuXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIHByb3BlcnRpZXMgYmFjayBpbiB0byBhIHZhbGlkIGFuZCBmdWxsIFVSTCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5naWZ5IE9wdGlvbmFsIHF1ZXJ5IHN0cmluZ2lmeSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IENvbXBpbGVkIHZlcnNpb24gb2YgdGhlIFVSTC5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcoc3RyaW5naWZ5KSB7XG4gIGlmICghc3RyaW5naWZ5IHx8ICdmdW5jdGlvbicgIT09IHR5cGVvZiBzdHJpbmdpZnkpIHN0cmluZ2lmeSA9IHFzLnN0cmluZ2lmeTtcblxuICB2YXIgcXVlcnlcbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIGhvc3QgPSB1cmwuaG9zdFxuICAgICwgcHJvdG9jb2wgPSB1cmwucHJvdG9jb2w7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLmNoYXJBdChwcm90b2NvbC5sZW5ndGggLSAxKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgdmFyIHJlc3VsdCA9XG4gICAgcHJvdG9jb2wgK1xuICAgICgodXJsLnByb3RvY29sICYmIHVybC5zbGFzaGVzKSB8fCBpc1NwZWNpYWwodXJsLnByb3RvY29sKSA/ICcvLycgOiAnJyk7XG5cbiAgaWYgKHVybC51c2VybmFtZSkge1xuICAgIHJlc3VsdCArPSB1cmwudXNlcm5hbWU7XG4gICAgaWYgKHVybC5wYXNzd29yZCkgcmVzdWx0ICs9ICc6JysgdXJsLnBhc3N3b3JkO1xuICAgIHJlc3VsdCArPSAnQCc7XG4gIH0gZWxzZSBpZiAodXJsLnBhc3N3b3JkKSB7XG4gICAgcmVzdWx0ICs9ICc6JysgdXJsLnBhc3N3b3JkO1xuICAgIHJlc3VsdCArPSAnQCc7XG4gIH0gZWxzZSBpZiAoXG4gICAgdXJsLnByb3RvY29sICE9PSAnZmlsZTonICYmXG4gICAgaXNTcGVjaWFsKHVybC5wcm90b2NvbCkgJiZcbiAgICAhaG9zdCAmJlxuICAgIHVybC5wYXRobmFtZSAhPT0gJy8nXG4gICkge1xuICAgIC8vXG4gICAgLy8gQWRkIGJhY2sgdGhlIGVtcHR5IHVzZXJpbmZvLCBvdGhlcndpc2UgdGhlIG9yaWdpbmFsIGludmFsaWQgVVJMXG4gICAgLy8gbWlnaHQgYmUgdHJhbnNmb3JtZWQgaW50byBhIHZhbGlkIG9uZSB3aXRoIGB1cmwucGF0aG5hbWVgIGFzIGhvc3QuXG4gICAgLy9cbiAgICByZXN1bHQgKz0gJ0AnO1xuICB9XG5cbiAgLy9cbiAgLy8gVHJhaWxpbmcgY29sb24gaXMgcmVtb3ZlZCBmcm9tIGB1cmwuaG9zdGAgd2hlbiBpdCBpcyBwYXJzZWQuIElmIGl0IHN0aWxsXG4gIC8vIGVuZHMgd2l0aCBhIGNvbG9uLCB0aGVuIGFkZCBiYWNrIHRoZSB0cmFpbGluZyBjb2xvbiB0aGF0IHdhcyByZW1vdmVkLiBUaGlzXG4gIC8vIHByZXZlbnRzIGFuIGludmFsaWQgVVJMIGZyb20gYmVpbmcgdHJhbnNmb3JtZWQgaW50byBhIHZhbGlkIG9uZS5cbiAgLy9cbiAgaWYgKGhvc3RbaG9zdC5sZW5ndGggLSAxXSA9PT0gJzonIHx8IChwb3J0LnRlc3QodXJsLmhvc3RuYW1lKSAmJiAhdXJsLnBvcnQpKSB7XG4gICAgaG9zdCArPSAnOic7XG4gIH1cblxuICByZXN1bHQgKz0gaG9zdCArIHVybC5wYXRobmFtZTtcblxuICBxdWVyeSA9ICdvYmplY3QnID09PSB0eXBlb2YgdXJsLnF1ZXJ5ID8gc3RyaW5naWZ5KHVybC5xdWVyeSkgOiB1cmwucXVlcnk7XG4gIGlmIChxdWVyeSkgcmVzdWx0ICs9ICc/JyAhPT0gcXVlcnkuY2hhckF0KDApID8gJz8nKyBxdWVyeSA6IHF1ZXJ5O1xuXG4gIGlmICh1cmwuaGFzaCkgcmVzdWx0ICs9IHVybC5oYXNoO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblVybC5wcm90b3R5cGUgPSB7IHNldDogc2V0LCB0b1N0cmluZzogdG9TdHJpbmcgfTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgVVJMIHBhcnNlciBhbmQgc29tZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgdGhhdCBtaWdodCBiZSB1c2VmdWwgZm9yXG4vLyBvdGhlcnMgb3IgdGVzdGluZy5cbi8vXG5VcmwuZXh0cmFjdFByb3RvY29sID0gZXh0cmFjdFByb3RvY29sO1xuVXJsLmxvY2F0aW9uID0gbG9sY2F0aW9uO1xuVXJsLnRyaW1MZWZ0ID0gdHJpbUxlZnQ7XG5VcmwucXMgPSBxcztcblxubW9kdWxlLmV4cG9ydHMgPSBVcmw7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmpvaW4gPSBleHBvcnRzLmdldFF1ZXJ5UGFyYW1zID0gZXhwb3J0cy53aXRoUXVlcnlQYXJhbXMgPSB2b2lkIDA7XG5jb25zdCBlbnN1cmVfMSA9IHJlcXVpcmUoXCIuL2Vuc3VyZVwiKTtcbmNvbnN0IHFzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInFzXCIpKTtcbmNvbnN0IHVybF9wYXJzZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ1cmwtcGFyc2VcIikpO1xuLyoqXG4gKiBIZWxwZXIgdG8gY3JlYXRlIGEgbmV3IFVSTCBieSBhcHBlbmRpbmcgcGFyYW1ldGVycyB0byBhIGJhc2UgVVJMLlxuICpcbiAqIFRoZSBpbnB1dCBVUkwgbWF5IG9yIG1heSBub3QgaGF2aW5nIGV4aXN0aW5nIHBhcmFtZXRlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogLy8gUmV0dXJucyBgXCIvc29tZUFwaS9zb21lRW5kcG9pbnQ/dG9rZW49YXNkZiZsaW1pdD01XCJgXG4gKiBsZXQgdXJsID0gd2l0aFF1ZXJ5UGFyYW1zKFwiL3NvbWVBcGkvc29tZUVuZHBvaW50XCIsIHt0b2tlbjogXCJhc2RmXCIsIGxpbWl0OiA1fSk7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gd2l0aFF1ZXJ5UGFyYW1zKHVybCwgcGFyYW1zKSB7XG4gICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkVXJsID0gKDAsIHVybF9wYXJzZV8xLmRlZmF1bHQpKHVybCk7XG4gICAgLy8gTWVyZ2UgdGhlIHBhcmFtcyB0b2dldGhlclxuICAgIGNvbnN0IHVwZGF0ZWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBxc18xLmRlZmF1bHQucGFyc2UocGFyc2VkVXJsLnF1ZXJ5LCB7IGlnbm9yZVF1ZXJ5UHJlZml4OiB0cnVlIH0pLCBwYXJhbXMpO1xuICAgIHBhcnNlZFVybC5zZXQoJ3F1ZXJ5JywgcXNfMS5kZWZhdWx0LnN0cmluZ2lmeShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRQYXJhbXMpKSwgeyBhZGRRdWVyeVByZWZpeDogdHJ1ZSB9KSk7XG4gICAgcmV0dXJuIHBhcnNlZFVybC50b1N0cmluZygpO1xufVxuZXhwb3J0cy53aXRoUXVlcnlQYXJhbXMgPSB3aXRoUXVlcnlQYXJhbXM7XG4vKipcbiAqIEhlbHBlciB0byB0YWtlIGEgVVJMIHN0cmluZyBhbmQgcmV0dXJuIHRoZSBwYXJhbWV0ZXJzIChpZiBhbnkpIGFzIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogLy8gUmV0dXJucyBge3Rva2VuOiBcImFzZGZcIiwgbGltaXQ6IFwiNVwifWBcbiAqIGxldCBwYXJhbXMgPSBnZXRRdWVyeVBhcmFtcyhcIi9zb21lQXBpL3NvbWVFbmRwb2ludD90b2tlbj1hc2RmJmxpbWl0PTVcIik7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gZ2V0UXVlcnlQYXJhbXModXJsKSB7XG4gICAgY29uc3QgcGFyc2VkVXJsID0gKDAsIHVybF9wYXJzZV8xLmRlZmF1bHQpKHVybCk7XG4gICAgLy8gTWVyZ2UgdGhlIHBhcmFtcyB0b2dldGhlclxuICAgIHJldHVybiBxc18xLmRlZmF1bHQucGFyc2UocGFyc2VkVXJsLnF1ZXJ5LCB7IGlnbm9yZVF1ZXJ5UHJlZml4OiB0cnVlIH0pO1xufVxuZXhwb3J0cy5nZXRRdWVyeVBhcmFtcyA9IGdldFF1ZXJ5UGFyYW1zO1xuLyoqXG4gKiBKb2lucyBhbGwgdGhlIHRva2VucyBpbnRvIGEgc2luZ2xlIFVSTCBzdHJpbmcgc2VwYXJhdGVkIGJ5ICcvJy4gWmVybyBsZW5ndGggdG9rZW5zIGNhdXNlIGVycm9ycy5cbiAqIEBwYXJhbSB0b2tlbnMgWmVybyBvciBtb3JlIHRva2VucyB0byBiZSBjb21iaW5lZC4gSWYgdG9rZW4gZG9lc24ndCBlbmQgd2l0aCAnLycsIG9uZSB3aWxsIGJlIGFkZGVkIGFzIHRoZSBzZXBhcmF0b3JcbiAqL1xuZnVuY3Rpb24gam9pbiguLi50b2tlbnMpIHtcbiAgICBpZiAoIXRva2VucyB8fCAhdG9rZW5zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IGNvbWJpbmVkVG9rZW5zID0gW107XG4gICAgZm9yIChjb25zdCB0b2tlbiBvZiB0b2tlbnMpIHtcbiAgICAgICAgKDAsIGVuc3VyZV8xLmVuc3VyZU5vbkVtcHR5U3RyaW5nKSh0b2tlbik7XG4gICAgICAgIGlmIChjb21iaW5lZFRva2Vucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbWJpbmVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRW5zdXJlIHRva2VucyAob3RoZXIgdGhhbiB0aGUgZmlyc3QpIGRvbid0IGhhdmUgbGVhZGluZyBzbGFzaGVzXG4gICAgICAgICAgICBjb21iaW5lZFRva2Vucy5wdXNoKHRva2VuLnJlcGxhY2UoL15cXC8rLywgJycpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRva2VuLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIGNvbWJpbmVkVG9rZW5zLnB1c2goJy8nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb21iaW5lZCA9IGNvbWJpbmVkVG9rZW5zLmpvaW4oJycpO1xuICAgIGlmICghdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXS5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIC8vIFVzZXIgZGlkbid0IHByb3ZpZGUgdG9rZW4gd2l0aCAvLCBzdHJpcCBvdXQgdGhlIGxhc3Qgb25lXG4gICAgICAgIHJldHVybiBjb21iaW5lZC5zbGljZSgwLCBjb21iaW5lZC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbWJpbmVkO1xufVxuZXhwb3J0cy5qb2luID0gam9pbjtcbiIsICJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGVPYmplY3RSZXNwb25zZUhhbmRsZXIgPSBleHBvcnRzLnVudHJhbnNmb3JtS2V5cyA9IGV4cG9ydHMudW50cmFuc2Zvcm1Cb2R5ID0gZXhwb3J0cy50cmFuc2Zvcm1Cb2R5ID0gZXhwb3J0cy5nZW5lcmF0ZVJlcXVlc3RIYW5kbGVyID0gdm9pZCAwO1xuY29uc3QgY2xvbmVfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiY2xvbmVcIikpO1xuY29uc3Qgb2JqZWN0X3V0aWxzXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL29iamVjdF91dGlsc1wiKTtcbmNvbnN0IGVuc3VyZV8xID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5jb25zdCBzY2hlbWFfMSA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbmNvbnN0IHNjaGVtYV8yID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuY29uc3QgdXJsXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL3VybFwiKTtcbmZ1bmN0aW9uIGdlbmVyYXRlUGFyYW1NYXAoa2V5cywgbmFtZVRvVmFsdWVNYXAsIG9wdGlvbmFsTmFtZXMpIHtcbiAgICBjb25zdCBtYXAgPSB7fTtcbiAgICBrZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgbGV0IHZhbCA9IG5hbWVUb1ZhbHVlTWFwW2tleV07XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbmFsTmFtZXMgJiYgb3B0aW9uYWxOYW1lcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5ldmVyIHBhc3MgdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFsID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgbWFwW2tleV0gPSB2YWw7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hcDtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUXVlcnlQYXJhbU1hcChrZXlzLCBuYW1lVG9WYWx1ZU1hcCwgb3B0aW9uYWxOYW1lcykge1xuICAgIGNvbnN0IG1hcCA9IHt9O1xuICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgdmFsID0gbmFtZVRvVmFsdWVNYXBba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uYWxOYW1lcyAmJiBvcHRpb25hbE5hbWVzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTmV2ZXIgcGFzcyB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YWwgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBtYXBba2V5XSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodmFsKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hcDtcbn1cbi8vIEEgcXVpY2sgaW1wbGVtZW5hdGlvbiBvZiBzdHJpbmctdGVtcGxhdGUuIE5lZWQgdG8gcmVtb3ZlIHRoZSBwYWNrYWdlIGJlY2F1c2UgaXQgdXNlcyB0aGVcbi8vIGBuZXcgRnVuY3Rpb24oPGNvZGU+KWAgc3ludGF4LlxuZnVuY3Rpb24gZm9ybWF0U3RyaW5nKHRlbXBsYXRlLCBwYXJhbXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gdGVtcGxhdGU7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMocGFyYW1zKSkge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShgeyR7a2V5fX1gLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZVJlcXVlc3RIYW5kbGVyKHJlcXVlc3QsIHBhcmFtZXRlcnMpIHtcbiAgICBjb25zdCB7IHVybCwgcXVlcnlQYXJhbXMsIG5hbWVNYXBwaW5nOiBwYXJhbU5hbWVNYXBwaW5nLCBib2R5VGVtcGxhdGUsIGJvZHlQYXJhbXMsIG1ldGhvZCwgaGVhZGVycywgdHJhbnNmb3JtcywgfSA9IHJlcXVlc3Q7XG4gICAgLy8gR2VuZXJhdGUgYSBtYXAgZnJvbSBpbmRleCB0byBuYW1lIHRoYXQgd2Ugd2lsbCB1c2UgdG8gYmluZCBhcmdzIHRvIHRoZSBhcHByb3ByaWF0ZSBzcG90cy5cbiAgICBjb25zdCBpbmRleFRvTmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBuYW1lcyA9IG5ldyBTZXQoKTtcbiAgICBjb25zdCBvcHRpb25hbE5hbWVzID0gbmV3IFNldCgpO1xuICAgIC8vIFRPRE86IFJlbW92ZSB0aGlzIGNhc3Qgb25jZSBUUyB1bmRlcnN0YW5kcyBhbiBhcnJheSBvZiBzaXplIDAgaW4gdGhlIHR5cGVkZWYuXG4gICAgcGFyYW1ldGVycy5mb3JFYWNoKChhcmcsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIENvbnZlcnQgcGFyYW1ldGVyIG5hbWUgdG8gaW50ZXJuYWwgbmFtZSwgaWYgbmVjZXNzYXJ5LlxuICAgICAgICBjb25zdCBuYW1lID0gKHBhcmFtTmFtZU1hcHBpbmcgJiYgcGFyYW1OYW1lTWFwcGluZ1thcmcubmFtZV0pIHx8IGFyZy5uYW1lO1xuICAgICAgICBpZiAobmFtZXMuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZSBuYW1lICR7bmFtZX0gZGV0ZWN0ZWRgKTtcbiAgICAgICAgfVxuICAgICAgICBuYW1lcy5hZGQobmFtZSk7XG4gICAgICAgIGlmIChhcmcub3B0aW9uYWwpIHtcbiAgICAgICAgICAgIG9wdGlvbmFsTmFtZXMuYWRkKG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4VG9OYW1lTWFwLnNldChpbmRleCwgbmFtZSk7XG4gICAgfSk7XG4gICAgY29uc3QgaGFzUXVlcnlQYXJhbXMgPSBCb29sZWFuKHF1ZXJ5UGFyYW1zICYmIHF1ZXJ5UGFyYW1zLmxlbmd0aCk7XG4gICAgY29uc3QgaGFzQm9keVBhcmFtcyA9IEJvb2xlYW4oYm9keVBhcmFtcyAmJiBib2R5UGFyYW1zLmxlbmd0aCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RIYW5kbGVyKHBhcmFtcykge1xuICAgICAgICBjb25zdCBuYW1lTWFwcGluZyA9IHt9O1xuICAgICAgICBwYXJhbXMuZm9yRWFjaCgocGFyYW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbU5hbWUgPSAoMCwgZW5zdXJlXzEuZW5zdXJlRXhpc3RzKShpbmRleFRvTmFtZU1hcC5nZXQoaW5kZXgpKTtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtVHJhbnNmb3JtID0gdHJhbnNmb3JtcyA/IHRyYW5zZm9ybXNbcGFyYW1OYW1lXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChwYXJhbVRyYW5zZm9ybSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zZm9ybVJlc3VsdCA9IHBhcmFtVHJhbnNmb3JtKHBhcmFtKTtcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNmb3JtUmVzdWx0ICYmIHR5cGVvZiB0cmFuc2Zvcm1SZXN1bHQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1lcmdlIHRoZXNlIHJlc3VsdHMgaW50byB0aGUgbmFtZSBtYXBwaW5nIHNpbmNlIHdlIGFyZSBzcGxheWluZyBvdXQgcmVzdWx0cy5cbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihuYW1lTWFwcGluZywgdHJhbnNmb3JtUmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVNYXBwaW5nW3BhcmFtTmFtZV0gPSB0cmFuc2Zvcm1SZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbmFtZU1hcHBpbmdbcGFyYW1OYW1lXSA9IHBhcmFtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gV2UgZG9uJ3Qga25vdyBhIHByaW9yaSB3aGljaCBwYXJhbXMgYXJlIHVzZWQgd2l0aGluIHRoZSBVUkwsIHNvIGdlbmVyYXRlIGEgbWFwIGZvciBhbGwgb2YgdGhlbS5cbiAgICAgICAgY29uc3QgYmFzZVVybCA9IGZvcm1hdFN0cmluZyh1cmwsIGdlbmVyYXRlUXVlcnlQYXJhbU1hcChPYmplY3Qua2V5cyhuYW1lTWFwcGluZyksIG5hbWVNYXBwaW5nKSk7XG4gICAgICAgIGNvbnN0IGZ1bGxVcmwgPSBoYXNRdWVyeVBhcmFtc1xuICAgICAgICAgICAgPyAoMCwgdXJsXzEud2l0aFF1ZXJ5UGFyYW1zKShiYXNlVXJsLCBnZW5lcmF0ZVF1ZXJ5UGFyYW1NYXAoKDAsIGVuc3VyZV8xLmVuc3VyZUV4aXN0cykocXVlcnlQYXJhbXMpLCBuYW1lTWFwcGluZywgb3B0aW9uYWxOYW1lcykpXG4gICAgICAgICAgICA6IGJhc2VVcmw7XG4gICAgICAgIGxldCBib2R5O1xuICAgICAgICBpZiAoYm9keVRlbXBsYXRlKSB7XG4gICAgICAgICAgICBib2R5ID0gKDAsIGNsb25lXzEuZGVmYXVsdCkoYm9keVRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzQm9keVBhcmFtcykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEJvZHlQYXJhbXMgPSBnZW5lcmF0ZVBhcmFtTWFwKCgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKGJvZHlQYXJhbXMpLCBuYW1lTWFwcGluZywgb3B0aW9uYWxOYW1lcyk7XG4gICAgICAgICAgICAvLyBNZXJnZSB0aGUgcGFyYW0gaWYgbmVlZGVkLlxuICAgICAgICAgICAgYm9keSA9IGJvZHkgPyB7IC4uLmJvZHksIC4uLmN1cnJlbnRCb2R5UGFyYW1zIH0gOiBjdXJyZW50Qm9keVBhcmFtcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiBmdWxsVXJsLFxuICAgICAgICAgICAgbWV0aG9kLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgLi4uaGVhZGVycyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgfTtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVSZXF1ZXN0SGFuZGxlciA9IGdlbmVyYXRlUmVxdWVzdEhhbmRsZXI7XG5mdW5jdGlvbiBtYXBLZXlzKG9iaiwgc2NoZW1hKSB7XG4gICAgaWYgKCEoc2NoZW1hICYmICgwLCBzY2hlbWFfMi5pc09iamVjdCkoc2NoZW1hKSkpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgY29uc3QgeyBwcm9wZXJ0aWVzIH0gPSBzY2hlbWE7XG4gICAgLy8gTG9vayBhdCB0aGUgcHJvcGVydGllcyBvZiB0aGUgc2NoZW1hIGFuZCBpbnZlcnQgYW55IGtleXMgaWYgcHJlc2VudC5cbiAgICBjb25zdCByZW1hcHBlZEtleXMgPSBuZXcgTWFwKCk7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHByb3BlcnRpZXNba2V5XS5mcm9tS2V5KSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tS2V5ID0gKDAsIGVuc3VyZV8xLmVuc3VyZUV4aXN0cykocHJvcGVydGllc1trZXldLmZyb21LZXkpO1xuICAgICAgICAgICAgcmVtYXBwZWRLZXlzLnNldChmcm9tS2V5LCBbLi4uKHJlbWFwcGVkS2V5cy5nZXQoZnJvbUtleSkgfHwgW10pLCBrZXldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCByZW1hcHBlZE9iamVjdCA9IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtYXBwZWRLZXlzID0gcmVtYXBwZWRLZXlzLmdldChrZXkpIHx8IFtrZXldO1xuICAgICAgICBmb3IgKGNvbnN0IG5ld0tleSBvZiBtYXBwZWRLZXlzKSB7XG4gICAgICAgICAgICBpZiAoIXNjaGVtYS5wcm9wZXJ0aWVzW25ld0tleV0gJiYgIXNjaGVtYS5pbmNsdWRlVW5rbm93blByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlbWFwcGVkT2JqZWN0W25ld0tleV0gPSBtYXBwZWRLZXlzLmxlbmd0aCA+IDEgPyAoMCwgb2JqZWN0X3V0aWxzXzEuZGVlcENvcHkpKG9ialtrZXldKSA6IG9ialtrZXldO1xuICAgICAgICAgICAgY29uc3Qga2V5U2NoZW1hID0gc2NoZW1hLnByb3BlcnRpZXNbbmV3S2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHJlbWFwcGVkT2JqZWN0W25ld0tleV07XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50VmFsdWUpICYmICgwLCBzY2hlbWFfMS5pc0FycmF5KShrZXlTY2hlbWEpICYmICgwLCBzY2hlbWFfMi5pc09iamVjdCkoa2V5U2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgICAgICAgIHJlbWFwcGVkT2JqZWN0W25ld0tleV0gPSBjdXJyZW50VmFsdWUubWFwKHZhbCA9PiBtYXBLZXlzKHZhbCwga2V5U2NoZW1hLml0ZW1zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgY3VycmVudFZhbHVlID09PSAnb2JqZWN0JyAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKGtleVNjaGVtYSkpIHtcbiAgICAgICAgICAgICAgICByZW1hcHBlZE9iamVjdFtuZXdLZXldID0gbWFwS2V5cyhjdXJyZW50VmFsdWUsIGtleVNjaGVtYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbWFwcGVkT2JqZWN0O1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtQm9keShib2R5LCBzY2hlbWEpIHtcbiAgICBpZiAoKDAsIHNjaGVtYV8xLmlzQXJyYXkpKHNjaGVtYSkgJiYgKDAsIHNjaGVtYV8yLmlzT2JqZWN0KShzY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgIGNvbnN0IG9iamVjdHMgPSBib2R5O1xuICAgICAgICBjb25zdCBtYXBwZWRPYmpzID0gb2JqZWN0cy5tYXAob2JqID0+IG1hcEtleXMob2JqLCBzY2hlbWEuaXRlbXMpKTtcbiAgICAgICAgcmV0dXJuIG1hcHBlZE9ianM7XG4gICAgfVxuICAgIGlmICgoMCwgc2NoZW1hXzIuaXNPYmplY3QpKHNjaGVtYSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcEtleXMoYm9keSwgc2NoZW1hKTtcbiAgICB9XG4gICAgcmV0dXJuIGJvZHk7XG59XG5leHBvcnRzLnRyYW5zZm9ybUJvZHkgPSB0cmFuc2Zvcm1Cb2R5O1xuZnVuY3Rpb24gZ2V0VW5tYXBLZXlMb29rdXAoc2NoZW1hKSB7XG4gICAgY29uc3QgcmVtYXBwZWRLZXlzID0gbmV3IE1hcCgpO1xuICAgIGlmICghKHNjaGVtYSAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKHNjaGVtYSkpKSB7XG4gICAgICAgIHJldHVybiByZW1hcHBlZEtleXM7XG4gICAgfVxuICAgIGNvbnN0IHsgcHJvcGVydGllcyB9ID0gc2NoZW1hO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwcm9wZXJ0aWVzW2tleV0uZnJvbUtleSkge1xuICAgICAgICAgICAgY29uc3QgZnJvbUtleSA9ICgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKHByb3BlcnRpZXNba2V5XS5mcm9tS2V5KTtcbiAgICAgICAgICAgIHJlbWFwcGVkS2V5cy5zZXQoa2V5LCBmcm9tS2V5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVtYXBwZWRLZXlzO1xufVxuZnVuY3Rpb24gdW5tYXBLZXlzKG9iaiwgc2NoZW1hKSB7XG4gICAgaWYgKCEoc2NoZW1hICYmICgwLCBzY2hlbWFfMi5pc09iamVjdCkoc2NoZW1hKSkpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgLy8gTG9vayBhdCB0aGUgcHJvcGVydGllcyBvZiB0aGUgc2NoZW1hIGFuZCBpbnZlcnQgYW55IGtleXMgaWYgcHJlc2VudC5cbiAgICBjb25zdCByZW1hcHBlZEtleXMgPSBnZXRVbm1hcEtleUxvb2t1cChzY2hlbWEpO1xuICAgIGNvbnN0IHJlbWFwcGVkT2JqZWN0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IHJlbWFwcGVkS2V5cy5nZXQoa2V5KSB8fCBrZXk7XG4gICAgICAgIGlmICghc2NoZW1hLnByb3BlcnRpZXNba2V5XSAmJiAhc2NoZW1hLmluY2x1ZGVVbmtub3duUHJvcGVydGllcykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcmVtYXBwZWRPYmplY3RbbmV3S2V5XSA9ICgwLCBvYmplY3RfdXRpbHNfMS5kZWVwQ29weSkob2JqW2tleV0pO1xuICAgICAgICBjb25zdCBrZXlTY2hlbWEgPSBzY2hlbWEucHJvcGVydGllc1trZXldO1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSByZW1hcHBlZE9iamVjdFtuZXdLZXldO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjdXJyZW50VmFsdWUpICYmICgwLCBzY2hlbWFfMS5pc0FycmF5KShrZXlTY2hlbWEpICYmICgwLCBzY2hlbWFfMi5pc09iamVjdCkoa2V5U2NoZW1hLml0ZW1zKSkge1xuICAgICAgICAgICAgcmVtYXBwZWRPYmplY3RbbmV3S2V5XSA9IGN1cnJlbnRWYWx1ZS5tYXAodmFsID0+IHVubWFwS2V5cyh2YWwsIGtleVNjaGVtYS5pdGVtcykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdvYmplY3QnICYmICgwLCBzY2hlbWFfMi5pc09iamVjdCkoa2V5U2NoZW1hKSkge1xuICAgICAgICAgICAgcmVtYXBwZWRPYmplY3RbbmV3S2V5XSA9IHVubWFwS2V5cyhjdXJyZW50VmFsdWUsIGtleVNjaGVtYSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlbWFwcGVkT2JqZWN0O1xufVxuZnVuY3Rpb24gdW50cmFuc2Zvcm1Cb2R5KGJvZHksIHNjaGVtYSkge1xuICAgIGlmICgoMCwgc2NoZW1hXzEuaXNBcnJheSkoc2NoZW1hKSAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0cyA9IGJvZHk7XG4gICAgICAgIGNvbnN0IG1hcHBlZE9ianMgPSBvYmplY3RzLm1hcChvYmogPT4gdW5tYXBLZXlzKG9iaiwgc2NoZW1hLml0ZW1zKSk7XG4gICAgICAgIHJldHVybiBtYXBwZWRPYmpzO1xuICAgIH1cbiAgICBpZiAoKDAsIHNjaGVtYV8yLmlzT2JqZWN0KShzY2hlbWEpKSB7XG4gICAgICAgIHJldHVybiB1bm1hcEtleXMoYm9keSwgc2NoZW1hKTtcbiAgICB9XG4gICAgcmV0dXJuIGJvZHk7XG59XG5leHBvcnRzLnVudHJhbnNmb3JtQm9keSA9IHVudHJhbnNmb3JtQm9keTtcbi8qKlxuICogUmV2ZXJzZXMgdGhlIHRyYW5zZm9ybWF0aW9uIG9mIHNjaGVtYSBvYmplY3Qga2V5cyB0byB0aGUgdmFsdWVzIGV4cGVjdGVkIGJ5IHRoZSBwYWNrLlxuICogVXNlZnVsIHdoZW4gcGFzc2luZyBpbiBhIGxpc3Qgb2Yga2V5cyBmcm9tIENvZGEgLT4gUGFjaywgc3VjaCBhcyB3aGVuIHNlbmRpbmcgdGhlIGFnZ3JlZ2F0ZWRcbiAqIHN5bmMgdGFibGUgdXBkYXRlIHBheWxvYWQuXG4gKi9cbmZ1bmN0aW9uIHVudHJhbnNmb3JtS2V5cyhrZXlzLCBzY2hlbWEpIHtcbiAgICBjb25zdCBzY2hlbWFPYmplY3QgPSAoMCwgc2NoZW1hXzEuaXNBcnJheSkoc2NoZW1hKSAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKHNjaGVtYS5pdGVtcykgPyBzY2hlbWEuaXRlbXMgOiBzY2hlbWE7XG4gICAgY29uc3QgcmVtYXBwZWRLZXlzID0gZ2V0VW5tYXBLZXlMb29rdXAoc2NoZW1hT2JqZWN0KTtcbiAgICByZXR1cm4ga2V5cy5tYXAoa2V5ID0+IHJlbWFwcGVkS2V5cy5nZXQoa2V5KSB8fCBrZXkpO1xufVxuZXhwb3J0cy51bnRyYW5zZm9ybUtleXMgPSB1bnRyYW5zZm9ybUtleXM7XG5mdW5jdGlvbiBnZW5lcmF0ZU9iamVjdFJlc3BvbnNlSGFuZGxlcihyZXNwb25zZSkge1xuICAgIGNvbnN0IHsgcHJvamVjdEtleSB9ID0gcmVzcG9uc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9iamVjdFJlc3BvbnNlSGFuZGxlcihyZXNwKSB7XG4gICAgICAgIGNvbnN0IHsgYm9keSB9ID0gcmVzcDtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBlcnJvciwgd2UnbGwgZmxhZyBpdCBkdXJpbmcgdmFsaWRhdGlvbi5cbiAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb2plY3RlZEJvZHkgPSBwcm9qZWN0S2V5ID8gYm9keVtwcm9qZWN0S2V5XSA6IGJvZHk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0ZWRCb2R5O1xuICAgIH07XG59XG5leHBvcnRzLmdlbmVyYXRlT2JqZWN0UmVzcG9uc2VIYW5kbGVyID0gZ2VuZXJhdGVPYmplY3RSZXNwb25zZUhhbmRsZXI7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhID0gZXhwb3J0cy5tYXliZVJld3JpdGVDb25uZWN0aW9uRm9yTmFtZWRQcm9wZXJ0eU9wdGlvbnMgPSBleHBvcnRzLm1ha2VFbXB0eUZvcm11bGEgPSBleHBvcnRzLm1ha2VUcmFuc2xhdGVPYmplY3RGb3JtdWxhID0gZXhwb3J0cy5tYWtlRHluYW1pY1N5bmNUYWJsZSA9IGV4cG9ydHMubWFrZVN5bmNUYWJsZUxlZ2FjeSA9IGV4cG9ydHMubWFrZVN5bmNUYWJsZSA9IGV4cG9ydHMubWFrZU9iamVjdEZvcm11bGEgPSBleHBvcnRzLm1ha2VTaW1wbGVBdXRvY29tcGxldGVNZXRhZGF0YUZvcm11bGEgPSBleHBvcnRzLmF1dG9jb21wbGV0ZVNlYXJjaE9iamVjdHMgPSBleHBvcnRzLnNpbXBsZUF1dG9jb21wbGV0ZSA9IGV4cG9ydHMubWFrZVByb3BlcnR5T3B0aW9uc0Zvcm11bGEgPSBleHBvcnRzLm1ha2VNZXRhZGF0YUZvcm11bGEgPSBleHBvcnRzLm5vcm1hbGl6ZVByb3BlcnR5T3B0aW9uc1Jlc3VsdHMgPSBleHBvcnRzLm1ha2VGb3JtdWxhID0gZXhwb3J0cy5tYWtlU3RyaW5nRm9ybXVsYSA9IGV4cG9ydHMubWFrZU51bWVyaWNGb3JtdWxhID0gZXhwb3J0cy5VcGRhdGVPdXRjb21lID0gZXhwb3J0cy5pc1N5bmNQYWNrRm9ybXVsYSA9IGV4cG9ydHMuaXNTdHJpbmdQYWNrRm9ybXVsYSA9IGV4cG9ydHMuaXNPYmplY3RQYWNrRm9ybXVsYSA9IGV4cG9ydHMuY2hlY2sgPSBleHBvcnRzLm1ha2VVc2VyVmlzaWJsZUVycm9yID0gZXhwb3J0cy5tYWtlRmlsZUFycmF5UGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlRmlsZVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZUltYWdlQXJyYXlQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VJbWFnZVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZUh0bWxBcnJheVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZUh0bWxQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VEYXRlQXJyYXlQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VEYXRlUGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlQm9vbGVhbkFycmF5UGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlQm9vbGVhblBhcmFtZXRlciA9IGV4cG9ydHMubWFrZU51bWVyaWNBcnJheVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZU51bWVyaWNQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VTdHJpbmdBcnJheVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZVN0cmluZ1BhcmFtZXRlciA9IGV4cG9ydHMubWFrZVBhcmFtZXRlciA9IGV4cG9ydHMud3JhcEdldFNjaGVtYSA9IGV4cG9ydHMud3JhcE1ldGFkYXRhRnVuY3Rpb24gPSBleHBvcnRzLmlzRHluYW1pY1N5bmNUYWJsZSA9IGV4cG9ydHMuaXNVc2VyVmlzaWJsZUVycm9yID0gZXhwb3J0cy5SZXNwb25zZVNpemVUb29MYXJnZUVycm9yID0gZXhwb3J0cy5Hb29nbGVEd2RFcnJvciA9IGV4cG9ydHMuTWlzc2luZ1Njb3Blc0Vycm9yID0gZXhwb3J0cy5TdGF0dXNDb2RlRXJyb3IgPSBleHBvcnRzLlVzZXJWaXNpYmxlRXJyb3IgPSB2b2lkIDA7XG5jb25zdCBhcGlfdHlwZXNfMSA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IGFwaV90eXBlc18yID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgYXBpX3R5cGVzXzMgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5jb25zdCBhcGlfdHlwZXNfNCA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IGFwaV90eXBlc181ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgYXBpX3R5cGVzXzYgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5jb25zdCBzY2hlbWFfMSA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbmNvbnN0IHNjaGVtYV8yID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuY29uc3QgZW5zdXJlXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbmNvbnN0IGFwaV90eXBlc183ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgYXBpX3R5cGVzXzggPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5jb25zdCBvYmplY3RfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvb2JqZWN0X3V0aWxzXCIpO1xuY29uc3QgZW5zdXJlXzIgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbmNvbnN0IGFwaV90eXBlc185ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgaGFuZGxlcl90ZW1wbGF0ZXNfMSA9IHJlcXVpcmUoXCIuL2hhbmRsZXJfdGVtcGxhdGVzXCIpO1xuY29uc3QgaGFuZGxlcl90ZW1wbGF0ZXNfMiA9IHJlcXVpcmUoXCIuL2hhbmRsZXJfdGVtcGxhdGVzXCIpO1xuY29uc3QgYXBpX3R5cGVzXzEwID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgYXBpX3R5cGVzXzExID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3Qgb2JqZWN0X3V0aWxzXzIgPSByZXF1aXJlKFwiLi9oZWxwZXJzL29iamVjdF91dGlsc1wiKTtcbmNvbnN0IHNjaGVtYV8zID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuY29uc3Qgc2NoZW1hXzQgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5jb25zdCBzY2hlbWFfNSA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbmNvbnN0IHNjaGVtYV82ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuY29uc3QgYXBpX3R5cGVzXzEyID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgbWlncmF0aW9uXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL21pZ3JhdGlvblwiKTtcbmNvbnN0IGFwaV90eXBlc18xMyA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IHNjaGVtYV83ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuLyoqXG4gKiBBbiBlcnJvciB3aG9zZSBtZXNzYWdlIHdpbGwgYmUgc2hvd24gdG8gdGhlIGVuZCB1c2VyIGluIHRoZSBVSSB3aGVuIGl0IG9jY3Vycy5cbiAqIElmIGFuIGVycm9yIGlzIGVuY291bnRlcmVkIGluIGEgZm9ybXVsYSBhbmQgeW91IHdhbnQgdG8gZGVzY3JpYmUgdGhlIGVycm9yXG4gKiB0byB0aGUgZW5kIHVzZXIsIHRocm93IGEgVXNlclZpc2libGVFcnJvciB3aXRoIGEgdXNlci1mcmllbmRseSBtZXNzYWdlXG4gKiBhbmQgdGhlIENvZGEgVUkgd2lsbCBkaXNwbGF5IHRoZSBtZXNzYWdlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGlmICghdXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSkge1xuICogICB0aHJvdyBuZXcgY29kYS5Vc2VyVmlzaWJsZUVycm9yKFwiUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCB1cmwuXCIpO1xuICogfVxuICogYGBgXG4gKlxuICogQHNlZVxuICogLSBbSGFuZGxpbmcgZXJyb3JzIC0gVXNlci12aXNpYmxlIGVycm9yc10oaHR0cHM6Ly9jb2RhLmlvL3BhY2tzL2J1aWxkL2xhdGVzdC9ndWlkZXMvYWR2YW5jZWQvZXJyb3JzLyN1c2VyLXZpc2libGUtZXJyb3JzKVxuICovXG5jbGFzcyBVc2VyVmlzaWJsZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIC8qKlxuICAgICAqIFVzZSB0byBjb25zdHJ1Y3QgYSB1c2VyLXZpc2libGUgZXJyb3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobWVzc2FnZSwgaW50ZXJuYWxFcnJvcikge1xuICAgICAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAgICAgLyoqIEBoaWRkZW4gKi9cbiAgICAgICAgdGhpcy5pc1VzZXJWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbnRlcm5hbEVycm9yID0gaW50ZXJuYWxFcnJvcjtcbiAgICB9XG59XG5leHBvcnRzLlVzZXJWaXNpYmxlRXJyb3IgPSBVc2VyVmlzaWJsZUVycm9yO1xuLy8gU3RhdHVzQ29kZUVycm9yIGlzIGEgc2ltcGxlIHZlcnNpb24gb2YgU3RhdHVzQ29kZUVycm9yIGluIHJlcXVlc3QtcHJvbWlzZSB0byBrZWVwIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuLy8gVGhpcyB0cmllcyB0byByZXBsaWNhdGUgaXRzIGV4YWN0IHN0cnVjdHVyZSwgbWFzc2FnaW5nIGFzIG5lY2Vzc2FyeSB0byBoYW5kbGUgdGhlIHZhcmlvdXMgdHJhbnNmb3Jtc1xuLy8gaW4gb3VyIHN0YWNrLlxuLy9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yZXF1ZXN0L3Byb21pc2UtY29yZS9ibG9iL21hc3Rlci9saWIvZXJyb3JzLmpzI0wyMlxuLyoqXG4gKiBBbiBlcnJvciB0aGF0IHdpbGwgYmUgdGhyb3duIGJ5IHtAbGluayBGZXRjaGVyLmZldGNofSB3aGVuIHRoZSBmZXRjaGVyIHJlc3BvbnNlIGhhcyBhblxuICogSFRUUCBzdGF0dXMgY29kZSBvZiA0MDAgb3IgZ3JlYXRlci5cbiAqXG4gKiBUaGlzIGNsYXNzIGxhcmdlbHkgbW9kZWxzIHRoZSBgU3RhdHVzQ29kZUVycm9yYCBmcm9tIHRoZSAobm93IGRlcHJlY2F0ZWQpIGByZXF1ZXN0LXByb21pc2VgIGxpYnJhcnksXG4gKiB3aGljaCBoYXMgYSBxdWlya3kgc3RydWN0dXJlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogbGV0IHJlc3BvbnNlO1xuICogdHJ5IHtcbiAqICAgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe1xuICogICAgIG1ldGhvZDogXCJHRVRcIixcbiAqICAgICAvLyBPcGVuIHRoaXMgVVJMIGluIHlvdXIgYnJvd3NlciB0byBzZWUgd2hhdCB0aGUgZGF0YSBsb29rcyBsaWtlLlxuICogICAgIHVybDogXCJodHRwczovL2FwaS5hcnRpYy5lZHUvYXBpL3YxL2FydHdvcmtzLzEyM1wiLFxuICogICB9KTtcbiAqIH0gY2F0Y2ggKGVycm9yKSB7XG4gKiAgIC8vIElmIHRoZSByZXF1ZXN0IGZhaWxlZCBiZWNhdXNlIHRoZSBzZXJ2ZXIgcmV0dXJuZWQgYSAzMDArIHN0YXR1cyBjb2RlLlxuICogICBpZiAoY29kYS5TdGF0dXNDb2RlRXJyb3IuaXNTdGF0dXNDb2RlRXJyb3IoZXJyb3IpKSB7XG4gKiAgICAgLy8gQ2FzdCB0aGUgZXJyb3IgYXMgYSBTdGF0dXNDb2RlRXJyb3IsIGZvciBiZXR0ZXIgaW50ZWxsaXNlbnNlLlxuICogICAgIGxldCBzdGF0dXNFcnJvciA9IGVycm9yIGFzIGNvZGEuU3RhdHVzQ29kZUVycm9yO1xuICogICAgIC8vIElmIHRoZSBBUEkgcmV0dXJuZWQgYW4gZXJyb3IgbWVzc2FnZSBpbiB0aGUgYm9keSwgc2hvdyBpdCB0byB0aGUgdXNlci5cbiAqICAgICBsZXQgbWVzc2FnZSA9IHN0YXR1c0Vycm9yLmJvZHk/LmRldGFpbDtcbiAqICAgICBpZiAobWVzc2FnZSkge1xuICogICAgICAgdGhyb3cgbmV3IGNvZGEuVXNlclZpc2libGVFcnJvcihtZXNzYWdlKTtcbiAqICAgICB9XG4gKiAgIH1cbiAqICAgLy8gVGhlIHJlcXVlc3QgZmFpbGVkIGZvciBzb21lIG90aGVyIHJlYXNvbi4gUmUtdGhyb3cgdGhlIGVycm9yIHNvIHRoYXQgaXRcbiAqICAgLy8gYnViYmxlcyB1cC5cbiAqICAgdGhyb3cgZXJyb3I7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAc2VlIFtGZXRjaGluZyByZW1vdGUgZGF0YSAtIEVycm9yc10oaHR0cHM6Ly9jb2RhLmlvL3BhY2tzL2J1aWxkL2xhdGVzdC9ndWlkZXMvYmFzaWNzL2ZldGNoZXIvI2Vycm9ycylcbiAqL1xuY2xhc3MgU3RhdHVzQ29kZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3Ioc3RhdHVzQ29kZSwgYm9keSwgb3B0aW9ucywgcmVzcG9uc2UpIHtcbiAgICAgICAgc3VwZXIoYCR7c3RhdHVzQ29kZX0gLSAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWApO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIGVycm9yLCBmb3IgaWRlbnRpZmljYXRpb24gcHVycG9zZXMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm5hbWUgPSAnU3RhdHVzQ29kZUVycm9yJztcbiAgICAgICAgdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICAgICAgdGhpcy5lcnJvciA9IGJvZHk7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIGxldCByZXNwb25zZUJvZHkgPSByZXNwb25zZSA9PT0gbnVsbCB8fCByZXNwb25zZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzcG9uc2UuYm9keTtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZUJvZHkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAvLyBcInJlcXVlc3QtcHJvbWlzZVwiJ3MgZXJyb3IucmVzcG9uc2UuYm9keSBpcyBhbHdheXMgdGhlIG9yaWdpbmFsLCB1bnBhcnNlZCByZXNwb25zZSBib2R5LFxuICAgICAgICAgICAgLy8gd2hpbGUgb3VyIGZldGNoZXIgc2VydmljZSBtYXkgYXR0ZW1wdCBhIEpTT04ucGFyc2UgZm9yIGFueSByZXNwb25zZSBib2R5IGFuZCBhbHRlciB0aGUgYmVoYXZpb3IuXG4gICAgICAgICAgICAvLyBIZXJlIHdlIGF0dGVtcHQgdG8gcmVzdG9yZSB0aGUgb3JpZ2luYWwgcmVzcG9uc2UgYm9keSBmb3IgYSBmZXcgdjEgcGFja3MgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgICAgIHJlc3BvbnNlQm9keSA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlQm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHsgLi4ucmVzcG9uc2UsIGJvZHk6IHJlc3BvbnNlQm9keSB9O1xuICAgIH1cbiAgICAvKiogUmV0dXJucyBpZiB0aGUgZXJyb3IgaXMgYW4gaW5zdGFuY2Ugb2YgU3RhdHVzQ29kZUVycm9yLiBOb3RlIHRoYXQgYGluc3RhbmNlb2ZgIG1heSBub3Qgd29yay4gKi9cbiAgICBzdGF0aWMgaXNTdGF0dXNDb2RlRXJyb3IoZXJyKSB7XG4gICAgICAgIHJldHVybiAnbmFtZScgaW4gZXJyICYmIGVyci5uYW1lID09PSBTdGF0dXNDb2RlRXJyb3IubmFtZTtcbiAgICB9XG59XG5leHBvcnRzLlN0YXR1c0NvZGVFcnJvciA9IFN0YXR1c0NvZGVFcnJvcjtcbi8qKlxuICogVGhyb3cgdGhpcyBlcnJvciBpZiB0aGUgdXNlciBuZWVkcyB0byByZS1hdXRoZW50aWNhdGUgdG8gZ2FpbiBPQXV0aCBzY29wZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWRcbiAqIHRvIHRoZSBwYWNrIHNpbmNlIHRoZWlyIGNvbm5lY3Rpb24gd2FzIGNyZWF0ZWQsIG9yIHNjb3BlcyB0aGF0IGFyZSBzcGVjaWZpYyB0byBhIGNlcnRhaW4gZm9ybXVsYS5cbiAqIFRoaXMgaXMgdXNlZnVsIGJlY2F1c2UgQ29kYSB3aWxsIGFsd2F5cyBhdHRlbXB0IHRvIGV4ZWN1dGUgYSBmb3JtdWxhIGV2ZW4gaWYgYSB1c2VyIGhhcyBub3QgeWV0XG4gKiByZS1hdXRoZW50aWNhdGVkIHdpdGggYWxsIHJlbGV2YW50IHNjb3Blcy5cbiAqXG4gKiBZb3UgZG9uJ3QgKmFsd2F5cyogbmVlZCB0byB0aHJvdyB0aGlzIHNwZWNpZmljIGVycm9yLCBhcyBDb2RhIHdpbGwgaW50ZXJwcmV0IGEgNDAzIChGb3JiaWRkZW4pXG4gKiBzdGF0dXMgY29kZSBlcnJvciBhcyBhIE1pc3NpbmdTY29wZXNFcnJvciB3aGVuIHRoZSB1c2VyJ3MgY29ubmVjdGlvbiB3YXMgbWFkZSB3aXRob3V0IGFsbFxuICogY3VycmVudGx5IHJlbGV2YW50IHNjb3Blcy4gVGhpcyBlcnJvciBleGlzdHMgYmVjYXVzZSB0aGF0IGRlZmF1bHQgYmVoYXZpb3IgaXMgaW5zdWZmaWNpZW50IGlmXG4gKiB0aGUgT0F1dGggc2VydmljZSBkb2VzIG5vdCBzZXQgYSA0MDMgc3RhdHVzIGNvZGUgKHRoZSBPQXV0aCBzcGVjIGRvZXNuJ3Qgc3BlY2lmaWNhbGx5IHJlcXVpcmVcbiAqIHRoZW0gdG8sIGFmdGVyIGFsbCkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiB0cnkge1xuICogICBsZXQgcmVzcG9uc2UgPSBjb250ZXh0LmZldGNoZXIuZmV0Y2goe1xuICogICAgIC8vIC4uLlxuICogICB9KTtcbiAqIH0gY2F0Y2ggKGVycm9yKSB7XG4gKiAgIC8vIERldGVybWluZSBpZiB0aGUgZXJyb3IgaXMgZHVlIHRvIG1pc3Npbmcgc2NvcGVzLlxuICogICBpZiAoZXJyb3Iuc3RhdHVzQ29kZSA9PSA0MDAgJiYgZXJyb3IuYm9keT8ubWVzc2FnZS5pbmNsdWRlcyhcInBlcm1pc3Npb25cIikpIHtcbiAqICAgICB0aHJvdyBuZXcgY29kYS5NaXNzaW5nU2NvcGVzRXJyb3IoKTtcbiAqICAgfVxuICogICAvLyBFbHNlIGhhbmRsZSBvciB0aHJvdyB0aGUgZXJyb3IgYXMgbm9ybWFsLlxuICogfVxuICogYGBgXG4gKlxuICogQHNlZVxuICogLSBbR3VpZGU6IEF1dGhlbnRpY2F0aW5nIHVzaW5nIE9BdXRoXShodHRwczovL2NvZGEuaW8vcGFja3MvYnVpbGQvbGF0ZXN0L2d1aWRlcy9iYXNpY3MvYXV0aGVudGljYXRpb24vb2F1dGgyLyN0cmlnZ2VyaW5nLWEtcHJvbXB0KVxuICovXG5jbGFzcyBNaXNzaW5nU2NvcGVzRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgJ0FkZGl0aW9uYWwgcGVybWlzc2lvbnMgYXJlIHJlcXVpcmVkJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZXJyb3IsIGZvciBpZGVudGlmaWNhdGlvbiBwdXJwb3Nlcy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmFtZSA9ICdNaXNzaW5nU2NvcGVzRXJyb3InO1xuICAgIH1cbiAgICAvKiogUmV0dXJucyBpZiB0aGUgZXJyb3IgaXMgYW4gaW5zdGFuY2Ugb2YgTWlzc2luZ1Njb3Blc0Vycm9yLiBOb3RlIHRoYXQgYGluc3RhbmNlb2ZgIG1heSBub3Qgd29yay4gKi9cbiAgICBzdGF0aWMgaXNNaXNzaW5nU2NvcGVzRXJyb3IoZXJyKSB7XG4gICAgICAgIHJldHVybiAnbmFtZScgaW4gZXJyICYmIGVyci5uYW1lID09PSBNaXNzaW5nU2NvcGVzRXJyb3IubmFtZTtcbiAgICB9XG59XG5leHBvcnRzLk1pc3NpbmdTY29wZXNFcnJvciA9IE1pc3NpbmdTY29wZXNFcnJvcjtcbi8qKlxuICogVGhpcyBlcnJvciB3aWxsIGJlIHRocm93biBieSB0aGUgZmV0Y2hlciBpZiBpdCBmYWlscyB0byBnZW5lcmF0ZSBhIHZhbGlkIERXRCBpbXBlcnNvbmF0aW9uIHRva2VuLlxuICovXG5jbGFzcyBHb29nbGVEd2RFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCAnR29vZ2xlIERXRCBlcnJvcicpO1xuICAgICAgICB0aGlzLm5hbWUgPSAnR29vZ2xlRHdkRXJyb3InO1xuICAgIH1cbiAgICBzdGF0aWMgaXNHb29nbGVEd2RFcnJvcihlcnIpIHtcbiAgICAgICAgcmV0dXJuICduYW1lJyBpbiBlcnIgJiYgZXJyLm5hbWUgPT09IEdvb2dsZUR3ZEVycm9yLm5hbWU7XG4gICAgfVxufVxuZXhwb3J0cy5Hb29nbGVEd2RFcnJvciA9IEdvb2dsZUR3ZEVycm9yO1xuLyoqXG4gKiBBbiBlcnJvciB0aGF0IHdpbGwgYmUgdGhyb3duIGJ5IHtAbGluayBGZXRjaGVyLmZldGNofSB3aGVuIHRoZSByZXNwb25zZSBib2R5IGZyb20gdGhlIGV4dGVybmFsIHN5c3RlbVxuICogZXhjZWVkcyBwYWNrcyBwbGF0Zm9ybSBsaW1pdHNcbiAqXG4gKiBUaGlzIGVycm9yIGNhbiBiZSBjYXVnaHQgYW5kIHJldHJpZWQgYnkgcmVxdWVzdGluZyBsZXNzIGRhdGEgZnJvbSB0aGUgZXh0ZXJuYWwgc3lzdGVtIHRocm91Z2hcbiAqIGEgc21hbGxlciBwYWdlIHNpemUgb3Igb21pdHRpbmcgbGFyZ2UgZmllbGRzLlxuICpcbiAqIEBoaWRkZW5cbiAqL1xuY2xhc3MgUmVzcG9uc2VTaXplVG9vTGFyZ2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCAnUmVzcG9uc2Ugc2l6ZSB0b28gbGFyZ2UnKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBlcnJvciwgZm9yIGlkZW50aWZpY2F0aW9uIHB1cnBvc2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uYW1lID0gJ1Jlc3BvbnNlU2l6ZVRvb0xhcmdlRXJyb3InO1xuICAgIH1cbiAgICAvKiogUmV0dXJucyBpZiB0aGUgZXJyb3IgaXMgYW4gaW5zdGFuY2Ugb2YgUmVzcG9uc2VTaXplVG9vTGFyZ2VFcnJvci4gTm90ZSB0aGF0IGBpbnN0YW5jZW9mYCBtYXkgbm90IHdvcmsuICovXG4gICAgc3RhdGljIGlzUmVzcG9uc2VTaXplVG9vTGFyZ2VFcnJvcihlcnIpIHtcbiAgICAgICAgcmV0dXJuICduYW1lJyBpbiBlcnIgJiYgZXJyLm5hbWUgPT09IFJlc3BvbnNlU2l6ZVRvb0xhcmdlRXJyb3IubmFtZTtcbiAgICB9XG59XG5leHBvcnRzLlJlc3BvbnNlU2l6ZVRvb0xhcmdlRXJyb3IgPSBSZXNwb25zZVNpemVUb29MYXJnZUVycm9yO1xuLyoqXG4gKiBIZWxwZXIgdG8gZGV0ZXJtaW5lIGlmIGFuIGVycm9yIGlzIGNvbnNpZGVyZWQgdXNlci12aXNpYmxlIGFuZCBjYW4gYmUgc2hvd24gaW4gdGhlIFVJLlxuICogU2VlIHtAbGluayBVc2VyVmlzaWJsZUVycm9yfS5cbiAqIEBwYXJhbSBlcnJvciBBbnkgZXJyb3Igb2JqZWN0LlxuICovXG5mdW5jdGlvbiBpc1VzZXJWaXNpYmxlRXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4gJ2lzVXNlclZpc2libGUnIGluIGVycm9yICYmIGVycm9yLmlzVXNlclZpc2libGU7XG59XG5leHBvcnRzLmlzVXNlclZpc2libGVFcnJvciA9IGlzVXNlclZpc2libGVFcnJvcjtcbmZ1bmN0aW9uIGlzRHluYW1pY1N5bmNUYWJsZShzeW5jVGFibGUpIHtcbiAgICByZXR1cm4gJ2lzRHluYW1pYycgaW4gc3luY1RhYmxlO1xufVxuZXhwb3J0cy5pc0R5bmFtaWNTeW5jVGFibGUgPSBpc0R5bmFtaWNTeW5jVGFibGU7XG5mdW5jdGlvbiB3cmFwTWV0YWRhdGFGdW5jdGlvbihmbk9yRm9ybXVsYSkge1xuICAgIHJldHVybiB0eXBlb2YgZm5PckZvcm11bGEgPT09ICdmdW5jdGlvbicgPyBtYWtlTWV0YWRhdGFGb3JtdWxhKGZuT3JGb3JtdWxhKSA6IGZuT3JGb3JtdWxhO1xufVxuZXhwb3J0cy53cmFwTWV0YWRhdGFGdW5jdGlvbiA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uO1xuZnVuY3Rpb24gdHJhbnNmb3JtVG9BcnJheVNjaGVtYShzY2hlbWEpIHtcbiAgICBpZiAoKHNjaGVtYSA9PT0gbnVsbCB8fCBzY2hlbWEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHNjaGVtYS50eXBlKSA9PT0gc2NoZW1hXzIuVmFsdWVUeXBlLkFycmF5KSB7XG4gICAgICAgIHJldHVybiBzY2hlbWE7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogc2NoZW1hXzIuVmFsdWVUeXBlLkFycmF5LFxuICAgICAgICAgICAgaXRlbXM6IHNjaGVtYSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5mdW5jdGlvbiB3cmFwR2V0U2NoZW1hKGdldFNjaGVtYSkge1xuICAgIGlmICghZ2V0U2NoZW1hKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZ2V0U2NoZW1hLFxuICAgICAgICBleGVjdXRlKHBhcmFtcywgY29udGV4dCkge1xuICAgICAgICAgICAgY29uc3Qgc2NoZW1hID0gZ2V0U2NoZW1hLmV4ZWN1dGUocGFyYW1zLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmICgoMCwgb2JqZWN0X3V0aWxzXzIuaXNQcm9taXNlKShzY2hlbWEpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYS50aGVuKHZhbHVlID0+IHRyYW5zZm9ybVRvQXJyYXlTY2hlbWEodmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1Ub0FycmF5U2NoZW1hKHNjaGVtYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn1cbmV4cG9ydHMud3JhcEdldFNjaGVtYSA9IHdyYXBHZXRTY2hlbWE7XG4vKipcbiAqIENyZWF0ZSBhIGRlZmluaXRpb24gZm9yIGEgcGFyYW1ldGVyIGZvciBhIGZvcm11bGEgb3Igc3luYy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBtYWtlUGFyYW1ldGVyKHt0eXBlOiBQYXJhbWV0ZXJUeXBlLlN0cmluZywgbmFtZTogJ215UGFyYW0nLCBkZXNjcmlwdGlvbjogJ015IGRlc2NyaXB0aW9uJ30pO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZVBhcmFtZXRlcih7dHlwZTogUGFyYW1ldGVyVHlwZS5TdHJpbmdBcnJheSwgbmFtZTogJ215QXJyYXlQYXJhbScsIGRlc2NyaXB0aW9uOiAnTXkgZGVzY3JpcHRpb24nfSk7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gbWFrZVBhcmFtZXRlcihwYXJhbURlZmluaXRpb24pIHtcbiAgICBjb25zdCB7IHR5cGUsIGF1dG9jb21wbGV0ZTogYXV0b2NvbXBsZXRlRGVmT3JJdGVtcywgY3Jhd2xTdHJhdGVneTogY3Jhd2xTdHJhdGVneURlZiwgYWxsb3dNYW51YWxJbnB1dDogYWxsb3dNYW51YWxJbnB1dERlZiwgLi4ucmVzdCB9ID0gcGFyYW1EZWZpbml0aW9uO1xuICAgIGNvbnN0IGFjdHVhbFR5cGUgPSBhcGlfdHlwZXNfNC5QYXJhbWV0ZXJUeXBlSW5wdXRNYXBbdHlwZV07XG4gICAgbGV0IGF1dG9jb21wbGV0ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhdXRvY29tcGxldGVEZWZPckl0ZW1zKSkge1xuICAgICAgICBjb25zdCBhdXRvY29tcGxldGVEZWYgPSBtYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhKGF1dG9jb21wbGV0ZURlZk9ySXRlbXMpO1xuICAgICAgICBhdXRvY29tcGxldGUgPSB3cmFwTWV0YWRhdGFGdW5jdGlvbihhdXRvY29tcGxldGVEZWYpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXV0b2NvbXBsZXRlID0gd3JhcE1ldGFkYXRhRnVuY3Rpb24oYXV0b2NvbXBsZXRlRGVmT3JJdGVtcyk7XG4gICAgfVxuICAgIGxldCBjcmF3bFN0cmF0ZWd5O1xuICAgIGlmIChjcmF3bFN0cmF0ZWd5RGVmKSB7XG4gICAgICAgIGlmIChjcmF3bFN0cmF0ZWd5RGVmLnBhcmVudFRhYmxlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHRhYmxlTmFtZSwgcHJvcGVydHlLZXksIGluaGVyaXRQZXJtaXNzaW9ucyB9ID0gY3Jhd2xTdHJhdGVneURlZi5wYXJlbnRUYWJsZTtcbiAgICAgICAgICAgIGNyYXdsU3RyYXRlZ3kgPSB7XG4gICAgICAgICAgICAgICAgcGFyZW50VGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eUtleTogKDAsIHNjaGVtYV82Lm5vcm1hbGl6ZVNjaGVtYUtleSkocHJvcGVydHlLZXkpLFxuICAgICAgICAgICAgICAgICAgICBpbmhlcml0UGVybWlzc2lvbnMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjcmF3bFN0cmF0ZWd5ID0gY3Jhd2xTdHJhdGVneURlZjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBEZWZhdWx0IHRvIHRydWUgaWYgbm90IHNwZWNpZmllZC5cbiAgICBjb25zdCBhbGxvd01hbnVhbElucHV0ID0gIShhbGxvd01hbnVhbElucHV0RGVmID09PSBmYWxzZSk7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoe1xuICAgICAgICAuLi5yZXN0LFxuICAgICAgICBhbGxvd01hbnVhbElucHV0LFxuICAgICAgICBhdXRvY29tcGxldGUsXG4gICAgICAgIHR5cGU6IGFjdHVhbFR5cGUsXG4gICAgICAgIGNyYXdsU3RyYXRlZ3ksXG4gICAgfSk7XG59XG5leHBvcnRzLm1ha2VQYXJhbWV0ZXIgPSBtYWtlUGFyYW1ldGVyO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlU3RyaW5nUGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfNi5UeXBlLnN0cmluZyB9KTtcbn1cbmV4cG9ydHMubWFrZVN0cmluZ1BhcmFtZXRlciA9IG1ha2VTdHJpbmdQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VTdHJpbmdBcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzEzLnN0cmluZ0FycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlU3RyaW5nQXJyYXlQYXJhbWV0ZXIgPSBtYWtlU3RyaW5nQXJyYXlQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VOdW1lcmljUGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfNi5UeXBlLm51bWJlciB9KTtcbn1cbmV4cG9ydHMubWFrZU51bWVyaWNQYXJhbWV0ZXIgPSBtYWtlTnVtZXJpY1BhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZU51bWVyaWNBcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzEyLm51bWJlckFycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlTnVtZXJpY0FycmF5UGFyYW1ldGVyID0gbWFrZU51bWVyaWNBcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUJvb2xlYW5QYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc182LlR5cGUuYm9vbGVhbiB9KTtcbn1cbmV4cG9ydHMubWFrZUJvb2xlYW5QYXJhbWV0ZXIgPSBtYWtlQm9vbGVhblBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUJvb2xlYW5BcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzcuYm9vbGVhbkFycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlQm9vbGVhbkFycmF5UGFyYW1ldGVyID0gbWFrZUJvb2xlYW5BcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZURhdGVQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc182LlR5cGUuZGF0ZSB9KTtcbn1cbmV4cG9ydHMubWFrZURhdGVQYXJhbWV0ZXIgPSBtYWtlRGF0ZVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZURhdGVBcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzguZGF0ZUFycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlRGF0ZUFycmF5UGFyYW1ldGVyID0gbWFrZURhdGVBcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUh0bWxQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc182LlR5cGUuaHRtbCB9KTtcbn1cbmV4cG9ydHMubWFrZUh0bWxQYXJhbWV0ZXIgPSBtYWtlSHRtbFBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUh0bWxBcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzEwLmh0bWxBcnJheSB9KTtcbn1cbmV4cG9ydHMubWFrZUh0bWxBcnJheVBhcmFtZXRlciA9IG1ha2VIdG1sQXJyYXlQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VJbWFnZVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzYuVHlwZS5pbWFnZSB9KTtcbn1cbmV4cG9ydHMubWFrZUltYWdlUGFyYW1ldGVyID0gbWFrZUltYWdlUGFyYW1ldGVyO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlSW1hZ2VBcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzExLmltYWdlQXJyYXkgfSk7XG59XG5leHBvcnRzLm1ha2VJbWFnZUFycmF5UGFyYW1ldGVyID0gbWFrZUltYWdlQXJyYXlQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VGaWxlUGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfNi5UeXBlLmZpbGUgfSk7XG59XG5leHBvcnRzLm1ha2VGaWxlUGFyYW1ldGVyID0gbWFrZUZpbGVQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VGaWxlQXJyYXlQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc185LmZpbGVBcnJheSB9KTtcbn1cbmV4cG9ydHMubWFrZUZpbGVBcnJheVBhcmFtZXRlciA9IG1ha2VGaWxlQXJyYXlQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VVc2VyVmlzaWJsZUVycm9yKG1zZykge1xuICAgIHJldHVybiBuZXcgVXNlclZpc2libGVFcnJvcihtc2cpO1xufVxuZXhwb3J0cy5tYWtlVXNlclZpc2libGVFcnJvciA9IG1ha2VVc2VyVmlzaWJsZUVycm9yO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBjaGVjayhjb25kaXRpb24sIG1zZykge1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIHRocm93IG1ha2VVc2VyVmlzaWJsZUVycm9yKG1zZyk7XG4gICAgfVxufVxuZXhwb3J0cy5jaGVjayA9IGNoZWNrO1xuZnVuY3Rpb24gaXNPYmplY3RQYWNrRm9ybXVsYShmbikge1xuICAgIHJldHVybiBmbi5yZXN1bHRUeXBlID09PSBhcGlfdHlwZXNfNi5UeXBlLm9iamVjdDtcbn1cbmV4cG9ydHMuaXNPYmplY3RQYWNrRm9ybXVsYSA9IGlzT2JqZWN0UGFja0Zvcm11bGE7XG5mdW5jdGlvbiBpc1N0cmluZ1BhY2tGb3JtdWxhKGZuKSB7XG4gICAgcmV0dXJuIGZuLnJlc3VsdFR5cGUgPT09IGFwaV90eXBlc182LlR5cGUuc3RyaW5nO1xufVxuZXhwb3J0cy5pc1N0cmluZ1BhY2tGb3JtdWxhID0gaXNTdHJpbmdQYWNrRm9ybXVsYTtcbmZ1bmN0aW9uIGlzU3luY1BhY2tGb3JtdWxhKGZuKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4oZm4uaXNTeW5jRm9ybXVsYSk7XG59XG5leHBvcnRzLmlzU3luY1BhY2tGb3JtdWxhID0gaXNTeW5jUGFja0Zvcm11bGE7XG4vKipcbiAqIFBvc3NpYmxlIG91dGNvbWVzIGZvciBhIHNpbmdsZSBzeW5jIHVwZGF0ZS5cbiAqIEBoaWRkZW5cbiAqL1xudmFyIFVwZGF0ZU91dGNvbWU7XG4oZnVuY3Rpb24gKFVwZGF0ZU91dGNvbWUpIHtcbiAgICBVcGRhdGVPdXRjb21lW1wiU3VjY2Vzc1wiXSA9IFwic3VjY2Vzc1wiO1xuICAgIFVwZGF0ZU91dGNvbWVbXCJFcnJvclwiXSA9IFwiZXJyb3JcIjtcbn0pKFVwZGF0ZU91dGNvbWUgfHwgKGV4cG9ydHMuVXBkYXRlT3V0Y29tZSA9IFVwZGF0ZU91dGNvbWUgPSB7fSkpO1xuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICpcbiAqIEhlbHBlciBmb3IgcmV0dXJuaW5nIHRoZSBkZWZpbml0aW9uIG9mIGEgZm9ybXVsYSB0aGF0IHJldHVybnMgYSBudW1iZXIuIEFkZHMgcmVzdWx0IHR5cGUgaW5mb3JtYXRpb25cbiAqIHRvIGEgZ2VuZXJpYyBmb3JtdWxhIGRlZmluaXRpb24uXG4gKlxuICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgYSBmb3JtdWxhIHRoYXQgcmV0dXJucyBhIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gbWFrZU51bWVyaWNGb3JtdWxhKGRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmaW5pdGlvbiwgeyByZXN1bHRUeXBlOiBhcGlfdHlwZXNfNi5UeXBlLm51bWJlciB9KTtcbn1cbmV4cG9ydHMubWFrZU51bWVyaWNGb3JtdWxhID0gbWFrZU51bWVyaWNGb3JtdWxhO1xuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICpcbiAqIEhlbHBlciBmb3IgcmV0dXJuaW5nIHRoZSBkZWZpbml0aW9uIG9mIGEgZm9ybXVsYSB0aGF0IHJldHVybnMgYSBzdHJpbmcuIEFkZHMgcmVzdWx0IHR5cGUgaW5mb3JtYXRpb25cbiAqIHRvIGEgZ2VuZXJpYyBmb3JtdWxhIGRlZmluaXRpb24uXG4gKlxuICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgYSBmb3JtdWxhIHRoYXQgcmV0dXJucyBhIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gbWFrZVN0cmluZ0Zvcm11bGEoZGVmaW5pdGlvbikge1xuICAgIGNvbnN0IHsgcmVzcG9uc2UgfSA9IGRlZmluaXRpb247XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmluaXRpb24sIHtcbiAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzYuVHlwZS5zdHJpbmcsXG4gICAgICAgIC4uLihyZXNwb25zZSAmJiB7IHNjaGVtYTogcmVzcG9uc2Uuc2NoZW1hIH0pLFxuICAgIH0pO1xufVxuZXhwb3J0cy5tYWtlU3RyaW5nRm9ybXVsYSA9IG1ha2VTdHJpbmdGb3JtdWxhO1xuLyoqXG4gKiBDcmVhdGVzIGEgZm9ybXVsYSBkZWZpbml0aW9uLlxuICpcbiAqIFlvdSBtdXN0IGluZGljYXRlIHRoZSBraW5kIG9mIHZhbHVlIHRoYXQgdGhpcyBmb3JtdWxhIHJldHVybnMgKHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBhcnJheSwgb3Igb2JqZWN0KVxuICogdXNpbmcgdGhlIGByZXN1bHRUeXBlYCBmaWVsZC5cbiAqXG4gKiBGb3JtdWxhcyBhbHdheXMgcmV0dXJuIGJhc2ljIHR5cGVzLCBidXQgeW91IG1heSBvcHRpb25hbGx5IGdpdmUgYSB0eXBlIGhpbnQgdXNpbmdcbiAqIGBjb2RhVHlwZWAgdG8gdGVsbCBDb2RhIGhvdyB0byBpbnRlcnByZXQgYSBnaXZlbiB2YWx1ZS4gRm9yIGV4YW1wbGUsIHlvdSBjYW4gcmV0dXJuXG4gKiBhIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYSBkYXRlLCBidXQgdXNlIGBjb2RhVHlwZTogVmFsdWVUeXBlLkRhdGVgIHRvIHRlbGwgQ29kYVxuICogdG8gaW50ZXJwcmV0IGFzIGEgZGF0ZSBpbiBhIGRvY3VtZW50LlxuICpcbiAqIElmIHlvdXIgZm9ybXVsYSByZXR1cm5zIGFuIG9iamVjdCwgeW91IG11c3QgcHJvdmlkZSBhIGBzY2hlbWFgIHByb3BlcnR5IHRoYXQgZGVzY3JpYmVzXG4gKiB0aGUgc3RydWN0dXJlIG9mIHRoZSBvYmplY3QuIFNlZSB7QGxpbmsgbWFrZU9iamVjdFNjaGVtYX0gZm9yIGhvdyB0byBjb25zdHJ1Y3QgYW4gb2JqZWN0IHNjaGVtYS5cbiAqXG4gKiBJZiB5b3VyIGZvcm11bGEgcmV0dXJucyBhIGxpc3QgKGFycmF5KSwgeW91IG11c3QgcHJvdmlkZSBhbiBgaXRlbXNgIHByb3BlcnR5IHRoYXQgZGVzY3JpYmVzXG4gKiB3aGF0IHRoZSBlbGVtZW50cyBvZiB0aGUgYXJyYXkgYXJlLiBUaGlzIGNvdWxkIGJlIGEgc2ltcGxlIHNjaGVtYSBsaWtlIGB7dHlwZTogVmFsdWVUeXBlLlN0cmluZ31gXG4gKiBpbmRpY2F0aW5nIHRoYXQgdGhlIGFycmF5IGVsZW1lbnRzIGFyZSBhbGwganVzdCBzdHJpbmdzLCBvciBpdCBjb3VsZCBiZSBhbiBvYmplY3Qgc2NoZW1hXG4gKiBjcmVhdGVkIHVzaW5nIHtAbGluayBtYWtlT2JqZWN0U2NoZW1hfSBpZiB0aGUgZWxlbWVudHMgYXJlIG9iamVjdHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZUZvcm11bGEoe3Jlc3VsdFR5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIG5hbWU6ICdIZWxsbycsIC4uLn0pO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZUZvcm11bGEoe3Jlc3VsdFR5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIGNvZGFUeXBlOiBWYWx1ZVR5cGUuSHRtbCwgbmFtZTogJ0hlbGxvSHRtbCcsIC4uLn0pO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZUZvcm11bGEoe3Jlc3VsdFR5cGU6IFZhbHVlVHlwZS5BcnJheSwgaXRlbXM6IHt0eXBlOiBWYWx1ZVR5cGUuU3RyaW5nfSwgbmFtZTogJ0hlbGxvU3RyaW5nQXJyYXknLCAuLi59KTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIG1ha2VGb3JtdWxhKHtcbiAqICAgcmVzdWx0VHlwZTogVmFsdWVUeXBlLk9iamVjdCxcbiAqICAgc2NoZW1hOiBtYWtlT2JqZWN0U2NoZW1hKHt0eXBlOiBWYWx1ZVR5cGUuT2JqZWN0LCBwcm9wZXJ0aWVzOiB7Li4ufX0pLFxuICogICBuYW1lOiAnSGVsbG9PYmplY3QnLFxuICogICAuLi5cbiAqIH0pO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZUZvcm11bGEoe1xuICogICByZXN1bHRUeXBlOiBWYWx1ZVR5cGUuQXJyYXksXG4gKiAgIGl0ZW1zOiBtYWtlT2JqZWN0U2NoZW1hKHt0eXBlOiBWYWx1ZVR5cGUuT2JqZWN0LCBwcm9wZXJ0aWVzOiB7Li4ufX0pLFxuICogICBuYW1lOiAnSGVsbG9PYmplY3RBcnJheScsXG4gKiAgIC4uLlxuICogfSk7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gbWFrZUZvcm11bGEoZnVsbERlZmluaXRpb24pIHtcbiAgICBsZXQgZm9ybXVsYTtcbiAgICBzd2l0Y2ggKGZ1bGxEZWZpbml0aW9uLnJlc3VsdFR5cGUpIHtcbiAgICAgICAgY2FzZSBzY2hlbWFfMi5WYWx1ZVR5cGUuU3RyaW5nOiB7XG4gICAgICAgICAgICAvLyB2ZXJ5IHN0cmFuZ2UgdHMga25vd3MgdGhhdCBmdWxsRGVmaW5pdGlvbi5jb2RhVHlwZSBpcyBTdHJpbmdIaW50VHlwZXMgYnV0IGRvZXNuJ3Qga25vdyBpZlxuICAgICAgICAgICAgLy8gZnVsbERlZmluaXRpb24gaXMgU3RyaW5nRm9ybXVsYURlZlYyLlxuICAgICAgICAgICAgY29uc3QgZGVmID0ge1xuICAgICAgICAgICAgICAgIC4uLmZ1bGxEZWZpbml0aW9uLFxuICAgICAgICAgICAgICAgIGNvZGFUeXBlOiAnY29kYVR5cGUnIGluIGZ1bGxEZWZpbml0aW9uID8gZnVsbERlZmluaXRpb24uY29kYVR5cGUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgZm9ybXVsYVNjaGVtYTogJ3NjaGVtYScgaW4gZnVsbERlZmluaXRpb24gPyBmdWxsRGVmaW5pdGlvbi5zY2hlbWEgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgeyBvbkVycm9yOiBfLCByZXN1bHRUeXBlOiB1bnVzZWQsIGNvZGFUeXBlLCBmb3JtdWxhU2NoZW1hLCAuLi5yZXN0IH0gPSBkZWY7XG4gICAgICAgICAgICAoMCwgZW5zdXJlXzEuYXNzZXJ0Q29uZGl0aW9uKShjb2RhVHlwZSAhPT0gc2NoZW1hXzEuVmFsdWVIaW50VHlwZS5TZWxlY3RMaXN0LCAnVmFsdWVIaW50VHlwZS5TZWxlY3RMaXN0IGlzIG5vdCBzdXBwb3J0ZWQgZm9yIGZvcm11bGEgcmVzdWx0IHR5cGVzLicpO1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nRm9ybXVsYSA9IHtcbiAgICAgICAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgICAgICAgIHJlc3VsdFR5cGU6IGFwaV90eXBlc182LlR5cGUuc3RyaW5nLFxuICAgICAgICAgICAgICAgIHNjaGVtYTogZm9ybXVsYVNjaGVtYSB8fCAoY29kYVR5cGUgPyB7IHR5cGU6IHNjaGVtYV8yLlZhbHVlVHlwZS5TdHJpbmcsIGNvZGFUeXBlIH0gOiB1bmRlZmluZWQpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvcm11bGEgPSBzdHJpbmdGb3JtdWxhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBzY2hlbWFfMi5WYWx1ZVR5cGUuTnVtYmVyOiB7XG4gICAgICAgICAgICBjb25zdCBkZWYgPSB7XG4gICAgICAgICAgICAgICAgLi4uZnVsbERlZmluaXRpb24sXG4gICAgICAgICAgICAgICAgY29kYVR5cGU6ICdjb2RhVHlwZScgaW4gZnVsbERlZmluaXRpb24gPyBmdWxsRGVmaW5pdGlvbi5jb2RhVHlwZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBmb3JtdWxhU2NoZW1hOiAnc2NoZW1hJyBpbiBmdWxsRGVmaW5pdGlvbiA/IGZ1bGxEZWZpbml0aW9uLnNjaGVtYSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCB7IG9uRXJyb3I6IF8sIHJlc3VsdFR5cGU6IHVudXNlZCwgY29kYVR5cGUsIGZvcm11bGFTY2hlbWEsIC4uLnJlc3QgfSA9IGRlZjtcbiAgICAgICAgICAgIGNvbnN0IG51bWVyaWNGb3JtdWxhID0ge1xuICAgICAgICAgICAgICAgIC4uLnJlc3QsXG4gICAgICAgICAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzYuVHlwZS5udW1iZXIsXG4gICAgICAgICAgICAgICAgc2NoZW1hOiBmb3JtdWxhU2NoZW1hIHx8IChjb2RhVHlwZSA/IHsgdHlwZTogc2NoZW1hXzIuVmFsdWVUeXBlLk51bWJlciwgY29kYVR5cGUgfSA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9ybXVsYSA9IG51bWVyaWNGb3JtdWxhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBzY2hlbWFfMi5WYWx1ZVR5cGUuQm9vbGVhbjoge1xuICAgICAgICAgICAgY29uc3QgeyBvbkVycm9yOiBfLCByZXN1bHRUeXBlOiB1bnVzZWQsIC4uLnJlc3QgfSA9IGZ1bGxEZWZpbml0aW9uO1xuICAgICAgICAgICAgY29uc3QgYm9vbGVhbkZvcm11bGEgPSB7XG4gICAgICAgICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgICAgICAgICByZXN1bHRUeXBlOiBhcGlfdHlwZXNfNi5UeXBlLmJvb2xlYW4sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9ybXVsYSA9IGJvb2xlYW5Gb3JtdWxhO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBzY2hlbWFfMi5WYWx1ZVR5cGUuQXJyYXk6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25FcnJvcjogXywgcmVzdWx0VHlwZTogdW51c2VkLCBpdGVtcywgLi4ucmVzdCB9ID0gZnVsbERlZmluaXRpb247XG4gICAgICAgICAgICBjb25zdCBhcnJheUZvcm11bGEgPSB7XG4gICAgICAgICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgICAgICAgICAvLyBUeXBlT2Y8U2NoZW1hVHlwZTxBcnJheVNjaGVtYTxTY2hlbWFUPj4+IGlzIGFsd2F5cyBUeXBlLm9iamVjdCBidXQgVFMgY2FuJ3QgaW5mZXIgdGhpcy5cbiAgICAgICAgICAgICAgICByZXN1bHRUeXBlOiBhcGlfdHlwZXNfNi5UeXBlLm9iamVjdCxcbiAgICAgICAgICAgICAgICAvLyBUaGUgZGVlcENvcHkoKSBpcyBoZXJlIHRvIGRyb3AgcHJvcGVydHkgb3B0aW9uIGZ1bmN0aW9ucywgd2hpY2ggaGF2ZSBubyBlZmZlY3Qgb24gbm9uLXN5bmMgZm9ybXVsYXMuXG4gICAgICAgICAgICAgICAgc2NoZW1hOiAoMCwgb2JqZWN0X3V0aWxzXzEuZGVlcENvcHkpKCgwLCBzY2hlbWFfNS5ub3JtYWxpemVTY2hlbWEpKHsgdHlwZTogc2NoZW1hXzIuVmFsdWVUeXBlLkFycmF5LCBpdGVtcyB9KSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9ybXVsYSA9IGFycmF5Rm9ybXVsYTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2Ugc2NoZW1hXzIuVmFsdWVUeXBlLk9iamVjdDoge1xuICAgICAgICAgICAgY29uc3QgeyBvbkVycm9yOiBfLCByZXN1bHRUeXBlOiB1bnVzZWQsIHNjaGVtYSwgLi4ucmVzdCB9ID0gZnVsbERlZmluaXRpb247XG4gICAgICAgICAgICAvLyBuZWVkIGEgZm9yY2UgY2FzdCBzaW5jZSBleGVjdXRlIGhhcyBhIGRpZmZlcmVudCByZXR1cm4gdmFsdWUgZHVlIHRvIGtleSBub3JtYWxpemF0aW9uLlxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0Rm9ybXVsYSA9IHtcbiAgICAgICAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgICAgICAgIHJlc3VsdFR5cGU6IGFwaV90eXBlc182LlR5cGUub2JqZWN0LFxuICAgICAgICAgICAgICAgIC8vIFRoZSBkZWVwQ29weSgpIGlzIGhlcmUgdG8gZHJvcCBwcm9wZXJ0eSBvcHRpb24gZnVuY3Rpb25zLCB3aGljaCBoYXZlIG5vIGVmZmVjdCBvbiBub24tc3luYyBmb3JtdWxhcy5cbiAgICAgICAgICAgICAgICBzY2hlbWE6ICgwLCBvYmplY3RfdXRpbHNfMS5kZWVwQ29weSkoKDAsIHNjaGVtYV81Lm5vcm1hbGl6ZVNjaGVtYSkoc2NoZW1hKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9ybXVsYSA9IG9iamVjdEZvcm11bGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICgwLCBlbnN1cmVfMi5lbnN1cmVVbnJlYWNoYWJsZSkoZnVsbERlZmluaXRpb24pO1xuICAgIH1cbiAgICBjb25zdCBvbkVycm9yID0gZnVsbERlZmluaXRpb24ub25FcnJvcjtcbiAgICBpZiAob25FcnJvcikge1xuICAgICAgICBjb25zdCB3cmFwcGVkRXhlY3V0ZSA9IGZvcm11bGEuZXhlY3V0ZTtcbiAgICAgICAgZm9ybXVsYS5leGVjdXRlID0gYXN5bmMgZnVuY3Rpb24gKHBhcmFtcywgY29udGV4dCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgd3JhcHBlZEV4ZWN1dGUocGFyYW1zLCBjb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEoZm9ybXVsYSwgZnVsbERlZmluaXRpb24uY29ubmVjdGlvblJlcXVpcmVtZW50KTtcbn1cbmV4cG9ydHMubWFrZUZvcm11bGEgPSBtYWtlRm9ybXVsYTtcbmZ1bmN0aW9uIG5vcm1hbGl6ZVByb3BlcnR5T3B0aW9uc1Jlc3VsdHNBcnJheShyZXN1bHRzKSB7XG4gICAgcmV0dXJuIHJlc3VsdHMubWFwKHIgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKHIpLmxlbmd0aCA9PT0gMiAmJiAnZGlzcGxheScgaW4gciAmJiAndmFsdWUnIGluIHIpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGRpc3BsYXk6IHIuZGlzcGxheSwgdmFsdWU6IHIudmFsdWUgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBkaXNwbGF5OiB1bmRlZmluZWQsIHZhbHVlOiByIH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVQcm9wZXJ0eU9wdGlvbnNSZXN1bHRzKHJlc3VsdHMpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHRzKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVzdWx0czogbm9ybWFsaXplUHJvcGVydHlPcHRpb25zUmVzdWx0c0FycmF5KHJlc3VsdHMpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB7IHJlc3VsdDogcmVzdWx0c0FycmF5LCAuLi5vdGhlclByb3BzIH0gPSByZXN1bHRzO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdHM6IG5vcm1hbGl6ZVByb3BlcnR5T3B0aW9uc1Jlc3VsdHNBcnJheShyZXN1bHRzQXJyYXkpLFxuICAgICAgICAuLi5vdGhlclByb3BzLFxuICAgIH07XG59XG5leHBvcnRzLm5vcm1hbGl6ZVByb3BlcnR5T3B0aW9uc1Jlc3VsdHMgPSBub3JtYWxpemVQcm9wZXJ0eU9wdGlvbnNSZXN1bHRzO1xuLyoqXG4gKiBBIHdyYXBwZXIgdGhhdCBnZW5lcmF0ZXMgYSBmb3JtdWxhIGRlZmluaXRpb24gZnJvbSB0aGUgZnVuY3Rpb24gdGhhdCBpbXBsZW1lbnRzIGEgbWV0YWRhdGEgZm9ybXVsYS5cbiAqIEl0IGlzIHVuY29tbW9uIHRvIGV2ZXIgbmVlZCB0byBjYWxsIHRoaXMgZGlyZWN0bHksIG5vcm1hbGx5IHlvdSB3b3VsZCBqdXN0IGRlZmluZSB0aGUgSmF2YVNjcmlwdFxuICogZnVuY3Rpb24gaW1wbGVtZW50YXRpb24sIGFuZCBDb2RhIHdpbGwgd3JhcCBpdCB3aXRoIHRoaXMgdG8gZ2VuZXJhdGUgYSBmdWxsIG1ldGFkYXRhIGZvcm11bGFcbiAqIGRlZmluaXRpb24uXG4gKlxuICogQWxsIGZ1bmN0aW9uLWxpa2UgYmVoYXZpb3IgaW4gYSBwYWNrIGlzIHVsdGltYXRlbHkgaW1wbGVtZW50ZWQgdXNpbmcgZm9ybXVsYXMsIGxpa2UgeW91IHdvdWxkXG4gKiBkZWZpbmUgdXNpbmcge0BsaW5rIG1ha2VGb3JtdWxhfS4gVGhhdCBpcywgYSBmb3JtdWxhIHdpdGggYSBuYW1lLCBkZXNjcmlwdGlvbiwgcGFyYW1ldGVyIGxpc3QsXG4gKiBhbmQgYW4gYGV4ZWN1dGVgIGZ1bmN0aW9uIGJvZHkuIFRoaXMgaW5jbHVkZXMgc3VwcG9ydGluZyB1dGlsaXRpZXMgbGlrZSBwYXJhbWV0ZXIgYXV0b2NvbXBsZXRlIGZ1bmN0aW9ucy5cbiAqIFRoaXMgd3JhcHBlciBzaW1wbHkgYWRkcyB0aGUgc3Vycm91bmRpbmcgYm9pbGVycGxhdGUgZm9yIGEgZ2l2ZW4gSmF2YVNjcmlwdCBmdW5jdGlvbiBzbyB0aGF0XG4gKiBpdCBpcyBzaGFwZWQgbGlrZSBhIENvZGEgZm9ybXVsYSB0byBiZSB1c2VkIGF0IHJ1bnRpbWUuXG4gKi9cbmZ1bmN0aW9uIG1ha2VNZXRhZGF0YUZvcm11bGEoZXhlY3V0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBtYWtlT2JqZWN0Rm9ybXVsYSh7XG4gICAgICAgIG5hbWU6ICdnZXRNZXRhZGF0YScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnR2V0cyBtZXRhZGF0YScsXG4gICAgICAgIC8vIEZvcm11bGEgY29udGV4dCBpcyBzZXJpYWxpemVkIGhlcmUgYmVjYXVzZSB3ZSBkbyBub3Qgd2FudCB0byBwYXNzIG9iamVjdHMgaW50b1xuICAgICAgICAvLyByZWd1bGFyIHBhY2sgZnVuY3Rpb25zICh3aGljaCB0aGlzIGlzKVxuICAgICAgICBleGVjdXRlKFtzZWFyY2gsIHNlcmlhbGl6ZWRGb3JtdWxhQ29udGV4dF0sIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGxldCBmb3JtdWxhQ29udGV4dCA9IHt9O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3JtdWxhQ29udGV4dCA9IEpTT04ucGFyc2Uoc2VyaWFsaXplZEZvcm11bGFDb250ZXh0IHx8ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyAgSWdub3JlLlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVE9ETyhvbGVnKTogb25jZSBNZXRhZGF0YUZ1bmN0aW9uIHR5cGVzIGFyZSBmaXhlZCwgcmVtb3ZlIG5vbi1udWxsIGFzc2VydGlvbi5cbiAgICAgICAgICAgIHJldHVybiBleGVjdXRlKGNvbnRleHQsIHNlYXJjaCwgZm9ybXVsYUNvbnRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAgICBtYWtlUGFyYW1ldGVyKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBhcGlfdHlwZXNfMy5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2VhcmNoJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ01ldGFkYXRhIHRvIHNlYXJjaCBmb3IuJyxcbiAgICAgICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFrZVBhcmFtZXRlcih7XG4gICAgICAgICAgICAgICAgdHlwZTogYXBpX3R5cGVzXzMuUGFyYW1ldGVyVHlwZS5TdHJpbmcsXG4gICAgICAgICAgICAgICAgbmFtZTogJ2Zvcm11bGFDb250ZXh0JyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NlcmlhbGl6ZWQgSlNPTiBmb3IgbWV0YWRhdGEuJyxcbiAgICAgICAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICBleGFtcGxlczogW10sXG4gICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jb25uZWN0aW9uUmVxdWlyZW1lbnQpIHx8IGFwaV90eXBlc18xLkNvbm5lY3Rpb25SZXF1aXJlbWVudC5PcHRpb25hbCxcbiAgICB9KTtcbn1cbmV4cG9ydHMubWFrZU1ldGFkYXRhRm9ybXVsYSA9IG1ha2VNZXRhZGF0YUZvcm11bGE7XG4vKipcbiAqIEJ1aWxkcyBhIGZvcm11bGEgdG8gc3RvcmUgaW4ge0BsaW5rIFN5bmNUYWJsZVByb3BlcnR5T3B0aW9uc30uXG4gKiBAaGlkZGVuXG4gKi9cbmZ1bmN0aW9uIG1ha2VQcm9wZXJ0eU9wdGlvbnNGb3JtdWxhKHsgZXhlY3V0ZSwgc2NoZW1hLCBuYW1lLCB9KSB7XG4gICAgaWYgKCEoZXhlY3V0ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFZhbHVlIGZvciBleGVjdXRlIG11c3QgYmUgYSBmdW5jdGlvbmApO1xuICAgIH1cbiAgICAvLyBUaGlzIGNhc3QgaXMgbmVjZXNzYXJ5IGZvciB0d28gcmVhc29uczpcbiAgICAvLyAxKSBUaGUgdHlwZSBTY2hlbWFUeXBlPEFycmF5U2NoZW1hPFQ+PiBpcyBlcXVpdmFsZW50IHRvIEFycmF5PFNjaGVtYVR5cGU8VD4+LCBidXQgdHlwZXNjcmlwdCBkb2Vzbid0IGtub3cgdGhhdC5cbiAgICAvLyAyKSBUaGlzIG1ldGFkYXRhIGZ1bmN0aW9uIGl0c2VsZiBoYXMgYSBmbGV4aWJsZSByZXR1cm4gdHlwZSBvZiBlaXRoZXIgQXJyYXk8UmVzdWx0VHlwZT4gb3JcbiAgICAvLyAgICB7cmVzdWx0czogQXJyYXk8UmVzdWx0VHlwZT4sIGNhY2hlVHRsU2VjczogbnVtYmVyfSwgd2hpY2ggaXMgbm90IHNvbWV0aGluZyBhIHBhY2sgc2NoZW1hIGNhbiBuYXRpdmVseSByZXByZXNlbnQuXG4gICAgY29uc3QgZXhlY3V0ZVJldHlwZWQgPSBleGVjdXRlO1xuICAgIC8vIEJlbmQgdGhlIHR5cGUgdG8gc2F0aXNmeSBQYWNrRm9ybXVsYURlZidzIGRlY2xhcmF0aW9uLlxuICAgIGNvbnN0IGlubmVyRXhlY3V0ZSA9IGFzeW5jIChbXSwgY29udGV4dCkgPT4gZXhlY3V0ZVJldHlwZWQoY29udGV4dCk7XG4gICAgY29uc3QgZm9ybXVsYURlZm4gPSB7XG4gICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogYXBpX3R5cGVzXzEuQ29ubmVjdGlvblJlcXVpcmVtZW50Lk9wdGlvbmFsLFxuICAgICAgICBleGVjdXRlOiBpbm5lckV4ZWN1dGUsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgQSBwcm9wZXJ0eSBvcHRpb25zIGZ1bmN0aW9uIGZvciAke25hbWV9YCxcbiAgICAgICAgcGFyYW1ldGVyczogW10sXG4gICAgICAgIHJlc3VsdFR5cGU6IHNjaGVtYV8yLlZhbHVlVHlwZS5BcnJheSxcbiAgICAgICAgaXRlbXM6IHNjaGVtYSxcbiAgICB9O1xuICAgIGNvbnN0IGZvcm11bGEgPSBtYWtlRm9ybXVsYShmb3JtdWxhRGVmbik7XG4gICAgcmV0dXJuIGZvcm11bGE7XG59XG5leHBvcnRzLm1ha2VQcm9wZXJ0eU9wdGlvbnNGb3JtdWxhID0gbWFrZVByb3BlcnR5T3B0aW9uc0Zvcm11bGE7XG4vKipcbiAqIFV0aWxpdHkgdG8gc2VhcmNoIG92ZXIgYW4gYXJyYXkgb2YgYXV0b2NvbXBsZXRlIHJlc3VsdHMgYW5kIHJldHVybiBvbmx5IHRob3NlIHRoYXRcbiAqIG1hdGNoIHRoZSBnaXZlbiBzZWFyY2ggc3RyaW5nLlxuICpcbiAqIFlvdSBjYW4gZG8gdGhpcyB5b3Vyc2VsZiBidXQgdGhpcyBmdW5jdGlvbiBoZWxwcyBzaW1wbGlmeSBtYW55IGNvbW1vbiBzY2VuYXJpb3MuXG4gKiBOb3RlIHRoYXQgaWYgeW91IGhhdmUgYSBoYXJkY29kZWQgbGlzdCBvZiBhdXRvY29tcGxldGUgb3B0aW9ucywgeW91IGNhbiBzaW1wbHkgc3BlY2lmeVxuICogdGhlbSBkaXJlY3RseSBhcyBhIGxpc3QsIHlvdSBuZWVkIG5vdCBhY3R1YWxseSBpbXBsZW1lbnQgYW4gYXV0b2NvbXBsZXRlIGZ1bmN0aW9uLlxuICpcbiAqIFRoZSBwcmltYXJ5IHVzZSBjYXNlIGhlcmUgaXMgZmV0Y2hpbmcgYSBsaXN0IG9mIGFsbCBwb3NzaWJsZSByZXN1bHRzIGZyb20gYW4gQVBJXG4gKiBhbmQgdGhlbiByZWZpbmluZyB0aGVtIHVzaW5nIHRoZSB1c2VyJ3MgY3VycmVudCBzZWFyY2ggc3RyaW5nLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGF1dG9jb21wbGV0ZTogYXN5bmMgZnVuY3Rpb24oY29udGV4dCwgc2VhcmNoKSB7XG4gKiAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHttZXRob2Q6IFwiR0VUXCIsIHVybDogXCIvYXBpL2VudGl0aWVzXCJ9KTtcbiAqICAgY29uc3QgYWxsT3B0aW9ucyA9IHJlc3BvbnNlLmJvZHkuZW50aXRpZXMubWFwKGVudGl0eSA9PiBlbnRpdHkubmFtZSk7XG4gKiAgIHJldHVybiBjb2RhLnNpbXBsZUF1dG9jb21wbGV0ZShzZWFyY2gsIGFsbE9wdGlvbnMpO1xuICogfVxuICogYGBgXG4gKi9cbmZ1bmN0aW9uIHNpbXBsZUF1dG9jb21wbGV0ZShzZWFyY2gsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBub3JtYWxpemVkU2VhcmNoID0gKHNlYXJjaCB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBmaWx0ZXJlZCA9IG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSB0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb3B0aW9uID09PSAnbnVtYmVyJyA/IG9wdGlvbiA6IG9wdGlvbi5kaXNwbGF5O1xuICAgICAgICByZXR1cm4gZGlzcGxheS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobm9ybWFsaXplZFNlYXJjaCk7XG4gICAgfSk7XG4gICAgY29uc3QgbWV0YWRhdGFSZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZmlsdGVyZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXRhZGF0YVJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbixcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBvcHRpb24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3B0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgbWV0YWRhdGFSZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb24sXG4gICAgICAgICAgICAgICAgZGlzcGxheTogb3B0aW9uLnRvU3RyaW5nKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1ldGFkYXRhUmVzdWx0cy5wdXNoKG9wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXRhZGF0YVJlc3VsdHMpO1xufVxuZXhwb3J0cy5zaW1wbGVBdXRvY29tcGxldGUgPSBzaW1wbGVBdXRvY29tcGxldGU7XG4vKipcbiAqIEEgaGVscGVyIHRvIHNlYXJjaCBvdmVyIGEgbGlzdCBvZiBvYmplY3RzIHJlcHJlc2VudGluZyBjYW5kaWRhdGUgc2VhcmNoIHJlc3VsdHMsXG4gKiBmaWx0ZXJpbmcgdG8gb25seSB0aG9zZSB0aGF0IG1hdGNoIGEgc2VhcmNoIHN0cmluZywgYW5kIGNvbnZlcnRpbmcgdGhlIG1hdGNoaW5nXG4gKiBvYmplY3RzIGludG8gdGhlIGZvcm1hdCBuZWVkZWQgZm9yIGF1dG9jb21wbGV0ZSByZXN1bHRzLlxuICpcbiAqIEEgY2FzZS1pbnNlbnNpdGl2ZSBzZWFyY2ggaXMgcGVyZm9ybWVkIG92ZXIgZWFjaCBvYmplY3QncyBgZGlzcGxheUtleWAgcHJvcGVydHkuXG4gKlxuICogQSBjb21tb24gcGF0dGVybiBmb3IgaW1wbGVtZW50aW5nIGF1dG9jb21wbGV0ZSBmb3IgYSBmb3JtdWxhIHBhdHRlcm4gaXMgdG9cbiAqIG1ha2UgYSByZXF1ZXN0IHRvIGFuIEFQSSBlbmRwb2ludCB0aGF0IHJldHVybnMgYSBsaXN0IG9mIGFsbCBlbnRpdGllcyxcbiAqIGFuZCB0aGVuIHRvIHRha2UgdGhlIHVzZXIncyBwYXJ0aWFsIGlucHV0IGFuZCBzZWFyY2ggb3ZlciB0aG9zZSBlbnRpdGllc1xuICogZm9yIG1hdGNoZXMuIFRoZSBoZWxwZXIgZ2VuZXJhbGl6ZXMgdGhpcyB1c2UgY2FzZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICogICB0eXBlOiBQYXJhbWV0ZXJUeXBlLk51bWJlcixcbiAqICAgbmFtZTogXCJ1c2VySWRcIixcbiAqICAgZGVzY3JpcHRpb246IFwiVGhlIElEIG9mIGEgdXNlci5cIixcbiAqICAgYXV0b2NvbXBsZXRlOiBhc3luYyBmdW5jdGlvbihjb250ZXh0LCBzZWFyY2gpIHtcbiAqICAgICAvLyBTdXBwb3NlIHRoaXMgZW5kcG9pbnQgcmV0dXJucyBhIGxpc3Qgb2YgdXNlcnMgdGhhdCBoYXZlIHRoZSBmb3JtXG4gKiAgICAgLy8gYHtuYW1lOiBcIkphbmUgRG9lXCIsIHVzZXJJZDogMTIzLCBlbWFpbDogXCJqYW5lQGRvZS5jb21cIn1gXG4gKiAgICAgY29uc3QgdXNlcnNSZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaChcIi9hcGkvdXNlcnNcIik7XG4gKiAgICAgLy8gVGhpcyB3aWxsIHNlYXJjaCBvdmVyIHRoZSBuYW1lIHByb3BlcnR5IG9mIGVhY2ggb2JqZWN0IGFuZCBmaWx0ZXIgdG8gb25seVxuICogICAgIC8vIHRob3NlIHRoYXQgbWF0Y2guIFRoZW4gaXQgd2lsbCB0cmFuc2Zvcm0gdGhlIG1hdGNoaW5nIG9iamVjdHMgaW50byB0aGUgZm9ybVxuICogICAgIC8vIGB7ZGlzcGxheTogXCJKYW5lIERvZVwiLCB2YWx1ZTogMTIzfWAgd2hpY2ggaXMgd2hhdCBpcyByZXF1aXJlZCB0byByZW5kZXJcbiAqICAgICAvLyBhdXRvY29tcGxldGUgcmVzcG9uc2VzLlxuICogICAgIHJldHVybiBjb2RhLmF1dG9jb21wbGV0ZVNlYXJjaE9iamVjdHMoc2VhcmNoLCB1c2Vyc1Jlc3BvbnNlLmJvZHksIFwibmFtZVwiLCBcInVzZXJJZFwiKTtcbiAqICAgfVxuICogfSk7XG4gKiBgYGBcbiAqL1xuYXN5bmMgZnVuY3Rpb24gYXV0b2NvbXBsZXRlU2VhcmNoT2JqZWN0cyhzZWFyY2gsIG9ianMsIGRpc3BsYXlLZXksIHZhbHVlS2V5KSB7XG4gICAgaWYgKHR5cGVvZiBzZWFyY2ggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGluZyBhIHN0cmluZyBmb3IgXCJzZWFyY2hcIiBwYXJhbWV0ZXIgYnV0IHJlY2VpdmVkICR7c2VhcmNofWApO1xuICAgIH1cbiAgICBjb25zdCBub3JtYWxpemVkU2VhcmNoID0gc2VhcmNoLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgbWV0YWRhdGFSZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBvYmogb2Ygb2Jqcykge1xuICAgICAgICBjb25zdCBkaXNwbGF5ID0gb2JqW2Rpc3BsYXlLZXldO1xuICAgICAgICBpZiAoIWRpc3BsYXkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhub3JtYWxpemVkU2VhcmNoKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBvYmpbdmFsdWVLZXldO1xuICAgICAgICBtZXRhZGF0YVJlc3VsdHMucHVzaCh7IGRpc3BsYXksIHZhbHVlIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbWV0YWRhdGFSZXN1bHRzO1xufVxuZXhwb3J0cy5hdXRvY29tcGxldGVTZWFyY2hPYmplY3RzID0gYXV0b2NvbXBsZXRlU2VhcmNoT2JqZWN0cztcbi8qKlxuICogQGRlcHJlY2F0ZWQgSWYgeW91IGhhdmUgYSBoYXJkY29kZWQgYXJyYXkgb2YgYXV0b2NvbXBsZXRlIG9wdGlvbnMsIHNpbXBseSBpbmNsdWRlIHRoYXQgYXJyYXlcbiAqIGFzIHRoZSB2YWx1ZSBvZiB0aGUgYGF1dG9jb21wbGV0ZWAgcHJvcGVydHkgaW4geW91ciBwYXJhbWV0ZXIgZGVmaW5pdGlvbi4gVGhlcmUgaXMgbm8gbG9uZ2VyXG4gKiBhbnkgbmVlZGVkIHRvIHdyYXAgYSB2YWx1ZSB3aXRoIHRoaXMgZm9ybXVsYS5cbiAqL1xuZnVuY3Rpb24gbWFrZVNpbXBsZUF1dG9jb21wbGV0ZU1ldGFkYXRhRm9ybXVsYShvcHRpb25zKSB7XG4gICAgcmV0dXJuIG1ha2VNZXRhZGF0YUZvcm11bGEoKF9jb250ZXh0LCBzZWFyY2gpID0+IHNpbXBsZUF1dG9jb21wbGV0ZShzZWFyY2gsIG9wdGlvbnMpLCB7XG4gICAgICAgIC8vIEEgY29ubmVjdGlvbiB3b24ndCBiZSB1c2VkIGhlcmUsIGJ1dCBpZiB0aGUgcGFyZW50IGZvcm11bGEgdXNlcyBhIGNvbm5lY3Rpb25cbiAgICAgICAgLy8gdGhlIGV4ZWN1dGlvbiBjb2RlIGlzIGdvaW5nIHRvIHRyeSB0byBwYXNzIGl0IGhlcmUuIFdlIHNob3VsZCBmaXggdGhhdC5cbiAgICAgICAgY29ubmVjdGlvblJlcXVpcmVtZW50OiBhcGlfdHlwZXNfMS5Db25uZWN0aW9uUmVxdWlyZW1lbnQuT3B0aW9uYWwsXG4gICAgfSk7XG59XG5leHBvcnRzLm1ha2VTaW1wbGVBdXRvY29tcGxldGVNZXRhZGF0YUZvcm11bGEgPSBtYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhO1xuZnVuY3Rpb24gaXNSZXNwb25zZUhhbmRsZXJUZW1wbGF0ZShvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5zY2hlbWE7XG59XG5mdW5jdGlvbiBpc1Jlc3BvbnNlRXhhbXBsZVRlbXBsYXRlKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLmV4YW1wbGU7XG59XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VPYmplY3RGb3JtdWxhKHsgcmVzcG9uc2UsIC4uLmRlZmluaXRpb24gfSkge1xuICAgIGxldCBzY2hlbWE7XG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChpc1Jlc3BvbnNlSGFuZGxlclRlbXBsYXRlKHJlc3BvbnNlKSAmJiByZXNwb25zZS5zY2hlbWEpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBzY2hlbWEgbWF5IGJlIHJlLXVzZWQsIG1ha2UgYSBjb3B5LlxuICAgICAgICAgICAgY29uc3QgaW5wdXRTY2hlbWEgPSAoMCwgb2JqZWN0X3V0aWxzXzEuZGVlcENvcHkpKHJlc3BvbnNlLnNjaGVtYSk7XG4gICAgICAgICAgICByZXNwb25zZS5zY2hlbWEgPSAoMCwgc2NoZW1hXzUubm9ybWFsaXplU2NoZW1hKShpbnB1dFNjaGVtYSk7XG4gICAgICAgICAgICBzY2hlbWEgPSByZXNwb25zZS5zY2hlbWE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNSZXNwb25zZUV4YW1wbGVUZW1wbGF0ZShyZXNwb25zZSkpIHtcbiAgICAgICAgICAgIC8vIFRPRE8oYWxleGQpOiBGaWd1cmUgb3V0IHdoYXQgdG8gZG8gd2l0aCBleGFtcGxlcy5cbiAgICAgICAgICAgIC8vIHNjaGVtYSA9IGdlbmVyYXRlU2NoZW1hKHJlc3BvbnNlLmV4YW1wbGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBleGVjdXRlID0gZGVmaW5pdGlvbi5leGVjdXRlO1xuICAgIGlmIChpc1Jlc3BvbnNlSGFuZGxlclRlbXBsYXRlKHJlc3BvbnNlKSkge1xuICAgICAgICBjb25zdCB7IG9uRXJyb3IgfSA9IHJlc3BvbnNlO1xuICAgICAgICBjb25zdCB3cmFwcGVkRXhlY3V0ZSA9IGV4ZWN1dGU7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlSGFuZGxlciA9ICgwLCBoYW5kbGVyX3RlbXBsYXRlc18xLmdlbmVyYXRlT2JqZWN0UmVzcG9uc2VIYW5kbGVyKShyZXNwb25zZSk7XG4gICAgICAgIGV4ZWN1dGUgPSBhc3luYyBmdW5jdGlvbiBleGVjKHBhcmFtcywgY29udGV4dCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgd3JhcHBlZEV4ZWN1dGUocGFyYW1zLCBjb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBvbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlSGFuZGxlcih7IGJvZHk6IHJlc3VsdCB8fCB7fSwgc3RhdHVzOiAyMDAsIGhlYWRlcnM6IHt9IH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmaW5pdGlvbiwge1xuICAgICAgICByZXN1bHRUeXBlOiBhcGlfdHlwZXNfNi5UeXBlLm9iamVjdCxcbiAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgc2NoZW1hLFxuICAgIH0pO1xufVxuZXhwb3J0cy5tYWtlT2JqZWN0Rm9ybXVsYSA9IG1ha2VPYmplY3RGb3JtdWxhO1xuLyoqXG4gKiBXcmFwcGVyIHRvIHByb2R1Y2UgYSBzeW5jIHRhYmxlIGRlZmluaXRpb24uIEFsbCAobm9uLWR5bmFtaWMpIHN5bmMgdGFibGVzIHNob3VsZCBiZSBjcmVhdGVkXG4gKiB1c2luZyB0aGlzIHdyYXBwZXIgcmF0aGVyIHRoYW4gZGVjbGFyaW5nIGEgc3luYyB0YWJsZSBkZWZpbml0aW9uIG9iamVjdCBkaXJlY3RseS5cbiAqXG4gKiBUaGlzIHdyYXBwZXIgZG9lcyBhIHZhcmlldHkgb2YgaGVscGZ1bCB0aGluZ3MsIGluY2x1ZGluZ1xuICogKiBEb2luZyBiYXNpYyB2YWxpZGF0aW9uIG9mIHRoZSBwcm92aWRlZCBkZWZpbml0aW9uLlxuICogKiBOb3JtYWxpemluZyB0aGUgc2NoZW1hIGRlZmluaXRpb24gdG8gY29uZm9ybSB0byBDb2RhLXJlY29tbWVuZGVkIHN5bnRheC5cbiAqICogV3JhcHBpbmcgdGhlIGV4ZWN1dGUgZm9ybXVsYSB0byBub3JtYWxpemUgcmV0dXJuIHZhbHVlcyB0byBtYXRjaCB0aGUgbm9ybWFsaXplZCBzY2hlbWEuXG4gKlxuICogU2VlIFtOb3JtYWxpemF0aW9uXShodHRwczovL2NvZGEuaW8vcGFja3MvYnVpbGQvbGF0ZXN0L2d1aWRlcy9hZHZhbmNlZC9zY2hlbWFzLyNub3JtYWxpemF0aW9uKSBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBzY2hlbWEgbm9ybWFsaXphdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWFrZVN5bmNUYWJsZSh7IG5hbWUsIGRpc3BsYXlOYW1lLCBkZXNjcmlwdGlvbiwgaWRlbnRpdHlOYW1lLCBzY2hlbWE6IGlucHV0U2NoZW1hLCBmb3JtdWxhLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQsIGR5bmFtaWNPcHRpb25zID0ge30sIHJvbGUsIH0pIHtcbiAgICBjb25zdCB7IGdldFNjaGVtYTogZ2V0U2NoZW1hRGVmLCBlbnRpdHlOYW1lLCBkZWZhdWx0QWRkRHluYW1pY0NvbHVtbnMgfSA9IGR5bmFtaWNPcHRpb25zO1xuICAgIGNvbnN0IHsgZXhlY3V0ZTogd3JhcHBlZEV4ZWN1dGUsIGV4ZWN1dGVVcGRhdGU6IHdyYXBwZWRFeGVjdXRlVXBkYXRlLCBleGVjdXRlR2V0UGVybWlzc2lvbnMsIG9uRXJyb3IsIC4uLmRlZmluaXRpb24gfSA9IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKGZvcm11bGEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCk7XG4gICAgLy8gU2luY2Ugd2UgbXV0YXRlIHNjaGVtYURlZiwgd2UgbmVlZCB0byBtYWtlIGEgY29weSBzbyB0aGUgaW5wdXQgc2NoZW1hIGNhbiBiZSByZXVzZWQgYWNyb3NzIHN5bmMgdGFibGVzLlxuICAgIGNvbnN0IHNjaGVtYURlZiA9ICgwLCBvYmplY3RfdXRpbHNfMS5kZWVwQ29weSkoaW5wdXRTY2hlbWEpO1xuICAgIC8vIEh5ZHJhdGUgdGhlIHNjaGVtYSdzIGlkZW50aXR5LlxuICAgIGlmICghaWRlbnRpdHlOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU3luYyB0YWJsZSBzY2hlbWFzIG11c3Qgc2V0IGFuIGlkZW50aXR5TmFtZWApO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hRGVmLmlkZW50aXR5KSB7XG4gICAgICAgIGlmIChzY2hlbWFEZWYuaWRlbnRpdHkubmFtZSAmJiBzY2hlbWFEZWYuaWRlbnRpdHkubmFtZSAhPT0gaWRlbnRpdHlOYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYElkZW50aXR5IG5hbWUgbWlzbWF0Y2ggZm9yIHN5bmMgdGFibGUgJHtuYW1lfS4gRWl0aGVyIHJlbW92ZSB0aGUgc2NoZW1hJ3MgaWRlbnRpdHkubmFtZSAoJHtzY2hlbWFEZWYuaWRlbnRpdHkubmFtZX0pIG9yIGVuc3VyZSBpdCBtYXRjaGVzIHRoZSB0YWJsZSdzIGlkZW50aXR5TmFtZSAoJHtpZGVudGl0eU5hbWV9KS5gKTtcbiAgICAgICAgfVxuICAgICAgICBzY2hlbWFEZWYuaWRlbnRpdHkgPSB7IC4uLnNjaGVtYURlZi5pZGVudGl0eSwgbmFtZTogaWRlbnRpdHlOYW1lIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzY2hlbWFEZWYuaWRlbnRpdHkgPSB7IG5hbWU6IGlkZW50aXR5TmFtZSB9O1xuICAgIH1cbiAgICBpZiAocm9sZSA9PT0gYXBpX3R5cGVzXzUuVGFibGVSb2xlLlVzZXJzKSB7XG4gICAgICAgIGlmICghc2NoZW1hRGVmLnVzZXJFbWFpbFByb3BlcnR5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5bmMgdGFibGUgc2NoZW1hcyB3aXRoIHJvbGUgJHthcGlfdHlwZXNfNS5UYWJsZVJvbGUuVXNlcnN9IG11c3Qgc2V0IGEgdXNlckVtYWlsUHJvcGVydHlgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXNjaGVtYURlZi51c2VySWRQcm9wZXJ0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTeW5jIHRhYmxlIHNjaGVtYXMgd2l0aCByb2xlICR7YXBpX3R5cGVzXzUuVGFibGVSb2xlLlVzZXJzfSBtdXN0IHNldCBhIHVzZXJJZFByb3BlcnR5YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJvbGUgPT09IGFwaV90eXBlc181LlRhYmxlUm9sZS5Hcm91cE1lbWJlcnMpIHtcbiAgICAgICAgaWYgKCFzY2hlbWFEZWYuZ3JvdXBJZFByb3BlcnR5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5bmMgdGFibGUgc2NoZW1hcyB3aXRoIHJvbGUgJHthcGlfdHlwZXNfNS5UYWJsZVJvbGUuR3JvdXBNZW1iZXJzfSBtdXN0IHNldCBhIGdyb3VwSWRQcm9wZXJ0eWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2NoZW1hRGVmLnVzZXJJZFByb3BlcnR5ICYmICFzY2hlbWFEZWYubWVtYmVyR3JvdXBJZFByb3BlcnR5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5bmMgdGFibGUgc2NoZW1hcyB3aXRoIHJvbGUgJHthcGlfdHlwZXNfNS5UYWJsZVJvbGUuR3JvdXBNZW1iZXJzfSBtdXN0IHNldCBhIHVzZXJJZFByb3BlcnR5IG9yIG1lbWJlckdyb3VwSWRQcm9wZXJ0eWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGdldFNjaGVtYSA9IHdyYXBHZXRTY2hlbWEod3JhcE1ldGFkYXRhRnVuY3Rpb24oZ2V0U2NoZW1hRGVmKSk7XG4gICAgY29uc3Qgc2NoZW1hID0gKDAsIHNjaGVtYV8zLm1ha2VPYmplY3RTY2hlbWEpKHNjaGVtYURlZik7XG4gICAgbGV0IG5hbWVkUHJvcGVydHlPcHRpb25zID0gbW92ZUpzUHJvcGVydHlPcHRpb25zRnVuY3Rpb25zVG9Gb3JtdWxhcyh7XG4gICAgICAgIGlucHV0U2NoZW1hLFxuICAgICAgICBzY2hlbWEsXG4gICAgICAgIGlkZW50aXR5TmFtZSxcbiAgICB9KTtcbiAgICBpZiAoZHluYW1pY09wdGlvbnMucHJvcGVydHlPcHRpb25zKSB7XG4gICAgICAgIG5hbWVkUHJvcGVydHlPcHRpb25zICE9PSBudWxsICYmIG5hbWVkUHJvcGVydHlPcHRpb25zICE9PSB2b2lkIDAgPyBuYW1lZFByb3BlcnR5T3B0aW9ucyA6IChuYW1lZFByb3BlcnR5T3B0aW9ucyA9IHt9KTtcbiAgICAgICAgbmFtZWRQcm9wZXJ0eU9wdGlvbnNbYXBpX3R5cGVzXzIuT3B0aW9uc1R5cGUuRHluYW1pY10gPSBtYWtlUHJvcGVydHlPcHRpb25zRm9ybXVsYSh7XG4gICAgICAgICAgICBleGVjdXRlOiBkeW5hbWljT3B0aW9ucy5wcm9wZXJ0eU9wdGlvbnMsXG4gICAgICAgICAgICBzY2hlbWE6ICgwLCBzY2hlbWFfMy5tYWtlT2JqZWN0U2NoZW1hKSh7XG4gICAgICAgICAgICAgICAgLy8gQSBkeW5hbWljIGF1dG9jb21wbGV0ZSBmb3JtdWxhIGNhbiByZXR1cm4gZGlmZmVyZW50IHJlc3VsdCB0eXBlcyBkZXBlbmRpbmdcbiAgICAgICAgICAgICAgICAvLyBvbiB3aGljaCBwcm9wZXJ0eSBpcyBiZWluZyBhdXRvY29tcGxldGVkLCBzbyB0aGVyZSdzIG5vIGFjY3VyYXRlIHNjaGVtYVxuICAgICAgICAgICAgICAgIC8vIHR5cGUgdG8gc2V0IG9uIHRoZSBmb3JtdWxhLiBXZSBqdXN0IHVzZSBhbiBlbXB0eSBvYmplY3Qgc2NoZW1hLCBidXQgaXQgY291bGRcbiAgICAgICAgICAgICAgICAvLyBiZSBhbnl0aGluZy5cbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzOiB7fSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmFtZTogYCR7aWRlbnRpdHlOYW1lfS5EeW5hbWljUHJvcGVydHlPcHRpb25zYCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IG5vcm1hbGl6ZWRTY2hlbWEgPSAoMCwgc2NoZW1hXzUubm9ybWFsaXplU2NoZW1hKShzY2hlbWEpO1xuICAgIGNvbnN0IGZvcm11bGFTY2hlbWEgPSBnZXRTY2hlbWFcbiAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgOiB7IHR5cGU6IHNjaGVtYV8yLlZhbHVlVHlwZS5BcnJheSwgaXRlbXM6IG5vcm1hbGl6ZWRTY2hlbWEgfTtcbiAgICBjb25zdCB7IGlkZW50aXR5LCBpZCwgcHJpbWFyeSB9ID0gKDAsIG1pZ3JhdGlvbl8xLm9iamVjdFNjaGVtYUhlbHBlcikoc2NoZW1hKTtcbiAgICBpZiAoIShwcmltYXJ5ICYmIGlkKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5bmMgdGFibGUgc2NoZW1hcyBzaG91bGQgaGF2ZSBkZWZpbmVkIHByb3BlcnRpZXMgZm9yIGlkUHJvcGVydHkgYW5kIGRpc3BsYXlQcm9wZXJ0eWApO1xuICAgIH1cbiAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBlcnJvciBjcmVhdGluZyBzeW5jIHRhYmxlIGlkZW50aXR5YCk7XG4gICAgfVxuICAgIGlmIChuYW1lLmluY2x1ZGVzKCcgJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTeW5jIHRhYmxlIG5hbWUgc2hvdWxkIG5vdCBpbmNsdWRlIHNwYWNlcycpO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZUhhbmRsZXIgPSAoMCwgaGFuZGxlcl90ZW1wbGF0ZXNfMS5nZW5lcmF0ZU9iamVjdFJlc3BvbnNlSGFuZGxlcikoeyBzY2hlbWE6IGZvcm11bGFTY2hlbWEgfSk7XG4gICAgY29uc3QgZXhlY3V0ZSA9IGFzeW5jIGZ1bmN0aW9uIGV4ZWMocGFyYW1zLCBjb250ZXh0KSB7XG4gICAgICAgIGxldCBzeW5jUmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3luY1Jlc3VsdCA9IChhd2FpdCB3cmFwcGVkRXhlY3V0ZShwYXJhbXMsIGNvbnRleHQpKSB8fCB7fTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBvbkVycm9yIHNob3VsZCB0aHJvdywgYnV0IGlmIGl0IGRvZXNuJ3Qgd2UnbGwganVzdCByZXRocm93IHRoZSBvcmlnaW5hbCBlcnJvci5cbiAgICAgICAgICAgIG9uRXJyb3IgPT09IG51bGwgfHwgb25FcnJvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFwcGxpZWRTY2hlbWEgPSBjb250ZXh0LnN5bmMuc2NoZW1hO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZXNwb25zZUhhbmRsZXIoeyBib2R5OiBzeW5jUmVzdWx0LnJlc3VsdCB8fCBbXSwgc3RhdHVzOiAyMDAsIGhlYWRlcnM6IHt9IH0sIGFwcGxpZWRTY2hlbWEpO1xuICAgICAgICBjb25zdCB7IGNvbnRpbnVhdGlvbiwgY29tcGxldGlvbiwgZGVsZXRlZEl0ZW1JZHMsIGRlbGV0ZWRSb3dJZHMsIHBlcm1pc3Npb25zQ29udGV4dCB9ID0gc3luY1Jlc3VsdDtcbiAgICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSB7XG4gICAgICAgICAgICByZXN1bHQsXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjb250aW51YXRpb24pIHtcbiAgICAgICAgICAgIHJldHVyblZhbHVlLmNvbnRpbnVhdGlvbiA9IGNvbnRpbnVhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcGxldGlvbikge1xuICAgICAgICAgICAgcmV0dXJuVmFsdWUuY29tcGxldGlvbiA9IGNvbXBsZXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlbGV0ZWRSb3dJZHMgIT09IG51bGwgJiYgZGVsZXRlZFJvd0lkcyAhPT0gdm9pZCAwID8gZGVsZXRlZFJvd0lkcyA6IGRlbGV0ZWRJdGVtSWRzKSB7XG4gICAgICAgICAgICByZXR1cm5WYWx1ZS5kZWxldGVkUm93SWRzID0gZGVsZXRlZFJvd0lkcyAhPT0gbnVsbCAmJiBkZWxldGVkUm93SWRzICE9PSB2b2lkIDAgPyBkZWxldGVkUm93SWRzIDogZGVsZXRlZEl0ZW1JZHM7XG4gICAgICAgICAgICByZXR1cm5WYWx1ZS5kZWxldGVkSXRlbUlkcyA9IHJldHVyblZhbHVlLmRlbGV0ZWRSb3dJZHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBlcm1pc3Npb25zQ29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuVmFsdWUucGVybWlzc2lvbnNDb250ZXh0ID0gcGVybWlzc2lvbnNDb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9O1xuICAgIGNvbnN0IGV4ZWN1dGVVcGRhdGUgPSB3cmFwcGVkRXhlY3V0ZVVwZGF0ZVxuICAgICAgICA/IGFzeW5jIGZ1bmN0aW9uIGV4ZWNVcGRhdGUocGFyYW1zLCB1cGRhdGVzLCBjb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB7IHJlc3VsdCB9ID0gKGF3YWl0IHdyYXBwZWRFeGVjdXRlVXBkYXRlKHBhcmFtcywgdXBkYXRlcywgY29udGV4dCkpIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgYXBwbGllZFNjaGVtYSA9IGNvbnRleHQuc3luYy5zY2hlbWE7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzcG9uc2VIYW5kbGVyKHsgYm9keTogcmVzdWx0IHx8IFtdLCBzdGF0dXM6IDIwMCwgaGVhZGVyczoge30gfSwgYXBwbGllZFNjaGVtYSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGRpc3BsYXlOYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgc2NoZW1hOiBub3JtYWxpemVkU2NoZW1hLFxuICAgICAgICBpZGVudGl0eU5hbWUsXG4gICAgICAgIGdldHRlcjoge1xuICAgICAgICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgICAgICAgIGNhY2hlVHRsU2VjczogMCxcbiAgICAgICAgICAgIGV4ZWN1dGUsXG4gICAgICAgICAgICBleGVjdXRlVXBkYXRlLFxuICAgICAgICAgICAgc2NoZW1hOiBmb3JtdWxhU2NoZW1hLFxuICAgICAgICAgICAgaXNTeW5jRm9ybXVsYTogdHJ1ZSxcbiAgICAgICAgICAgIHN1cHBvcnRzVXBkYXRlczogQm9vbGVhbihleGVjdXRlVXBkYXRlKSxcbiAgICAgICAgICAgIHN1cHBvcnRzR2V0UGVybWlzc2lvbnM6IEJvb2xlYW4oZXhlY3V0ZUdldFBlcm1pc3Npb25zKSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogZGVmaW5pdGlvbi5jb25uZWN0aW9uUmVxdWlyZW1lbnQgfHwgY29ubmVjdGlvblJlcXVpcmVtZW50LFxuICAgICAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzYuVHlwZS5vYmplY3QsXG4gICAgICAgICAgICBleGVjdXRlR2V0UGVybWlzc2lvbnM6IGV4ZWN1dGVHZXRQZXJtaXNzaW9ucyxcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2NoZW1hOiBtYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYShnZXRTY2hlbWEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgIGVudGl0eU5hbWUsXG4gICAgICAgIGRlZmF1bHRBZGREeW5hbWljQ29sdW1ucyxcbiAgICAgICAgbmFtZWRQcm9wZXJ0eU9wdGlvbnM6IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JOYW1lZFByb3BlcnR5T3B0aW9ucyhuYW1lZFByb3BlcnR5T3B0aW9ucywgY29ubmVjdGlvblJlcXVpcmVtZW50KSxcbiAgICAgICAgcm9sZSxcbiAgICB9O1xufVxuZXhwb3J0cy5tYWtlU3luY1RhYmxlID0gbWFrZVN5bmNUYWJsZTtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZVN5bmNUYWJsZUxlZ2FjeShuYW1lLCBzY2hlbWEsIGZvcm11bGEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCwgZHluYW1pY09wdGlvbnMgPSB7fSwgZGlzcGxheU5hbWUpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCEoKF9hID0gc2NoZW1hLmlkZW50aXR5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMZWdhY3kgc3luYyB0YWJsZXMgbXVzdCBzcGVjaWZ5IGlkZW50aXR5Lm5hbWUnKTtcbiAgICB9XG4gICAgaWYgKHNjaGVtYS5fX3BhY2tJZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgdGhlIF9fcGFja0lkIGZpZWxkLCBpdCBpcyBvbmx5IGZvciBpbnRlcm5hbCBDb2RhIHVzZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VTeW5jVGFibGUoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBkaXNwbGF5TmFtZSxcbiAgICAgICAgaWRlbnRpdHlOYW1lOiBzY2hlbWEuaWRlbnRpdHkubmFtZSxcbiAgICAgICAgc2NoZW1hLFxuICAgICAgICBmb3JtdWxhLFxuICAgICAgICBjb25uZWN0aW9uUmVxdWlyZW1lbnQsXG4gICAgICAgIGR5bmFtaWNPcHRpb25zLFxuICAgIH0pO1xufVxuZXhwb3J0cy5tYWtlU3luY1RhYmxlTGVnYWN5ID0gbWFrZVN5bmNUYWJsZUxlZ2FjeTtcbi8qKlxuICogQ3JlYXRlcyBhIGR5bmFtaWMgc3luYyB0YWJsZSBkZWZpbml0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGNvZGEubWFrZUR5bmFtaWNTeW5jVGFibGUoe1xuICogICBuYW1lOiBcIk15U3luY1RhYmxlXCIsXG4gKiAgIGdldE5hbWU6IGFzeW5jIGZ1bmN0aW9uKGNvbnRleHQpID0+IHtcbiAqICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaCh7bWV0aG9kOiBcIkdFVFwiLCB1cmw6IGNvbnRleHQuc3luYy5keW5hbWljVXJsfSk7XG4gKiAgICAgcmV0dXJuIHJlc3BvbnNlLmJvZHkubmFtZTtcbiAqICAgfSxcbiAqICAgZ2V0TmFtZTogYXN5bmMgZnVuY3Rpb24oY29udGV4dCkgPT4ge1xuICogICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHttZXRob2Q6IFwiR0VUXCIsIHVybDogY29udGV4dC5zeW5jLmR5bmFtaWNVcmx9KTtcbiAqICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5icm93c2VyTGluaztcbiAqICAgfSxcbiAqICAgLi4uXG4gKiB9KTtcbiAqIGBgYFxuICovXG5mdW5jdGlvbiBtYWtlRHluYW1pY1N5bmNUYWJsZSh7IG5hbWUsIGRpc3BsYXlOYW1lLCBkZXNjcmlwdGlvbiwgZ2V0TmFtZTogZ2V0TmFtZURlZiwgZ2V0U2NoZW1hOiBnZXRTY2hlbWFEZWYsIGlkZW50aXR5TmFtZSwgZ2V0RGlzcGxheVVybDogZ2V0RGlzcGxheVVybERlZiwgZm9ybXVsYSwgbGlzdER5bmFtaWNVcmxzOiBsaXN0RHluYW1pY1VybHNEZWYsIHNlYXJjaER5bmFtaWNVcmxzOiBzZWFyY2hEeW5hbWljVXJsc0RlZiwgZW50aXR5TmFtZSwgY29ubmVjdGlvblJlcXVpcmVtZW50LCBkZWZhdWx0QWRkRHluYW1pY0NvbHVtbnMsIHBsYWNlaG9sZGVyU2NoZW1hOiBwbGFjZWhvbGRlclNjaGVtYUlucHV0LCBwcm9wZXJ0eU9wdGlvbnMsIH0pIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlclNjaGVtYSA9IHBsYWNlaG9sZGVyU2NoZW1hSW5wdXQgfHxcbiAgICAgICAgLy8gZGVmYXVsdCBwbGFjZWhvbGRlciBvbmx5IHNob3dzIGEgY29sdW1uIG9mIGlkLCB3aGljaCB3aWxsIGJlIHJlcGxhY2VkIGxhdGVyIGJ5IHRoZSBkeW5hbWljIHNjaGVtYS5cbiAgICAgICAgKDAsIHNjaGVtYV8zLm1ha2VPYmplY3RTY2hlbWEpKHtcbiAgICAgICAgICAgIHR5cGU6IHNjaGVtYV8yLlZhbHVlVHlwZS5PYmplY3QsXG4gICAgICAgICAgICBpZFByb3BlcnR5OiAnaWQnLFxuICAgICAgICAgICAgZGlzcGxheVByb3BlcnR5OiAnaWQnLFxuICAgICAgICAgICAgaWRlbnRpdHk6IHsgbmFtZTogaWRlbnRpdHlOYW1lIH0sXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogc2NoZW1hXzIuVmFsdWVUeXBlLlN0cmluZyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgY29uc3QgZ2V0TmFtZSA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldE5hbWVEZWYpO1xuICAgIGNvbnN0IGdldFNjaGVtYSA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldFNjaGVtYURlZik7XG4gICAgY29uc3QgZ2V0RGlzcGxheVVybCA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldERpc3BsYXlVcmxEZWYpO1xuICAgIGNvbnN0IGxpc3REeW5hbWljVXJscyA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGxpc3REeW5hbWljVXJsc0RlZik7XG4gICAgY29uc3Qgc2VhcmNoRHluYW1pY1VybHMgPSB3cmFwTWV0YWRhdGFGdW5jdGlvbihzZWFyY2hEeW5hbWljVXJsc0RlZik7XG4gICAgY29uc3QgdGFibGUgPSBtYWtlU3luY1RhYmxlKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGlzcGxheU5hbWUsXG4gICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICBpZGVudGl0eU5hbWUsXG4gICAgICAgIHNjaGVtYTogcGxhY2Vob2xkZXJTY2hlbWEsXG4gICAgICAgIGZvcm11bGEsXG4gICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudCxcbiAgICAgICAgZHluYW1pY09wdGlvbnM6IHsgZ2V0U2NoZW1hLCBlbnRpdHlOYW1lLCBkZWZhdWx0QWRkRHluYW1pY0NvbHVtbnMsIHByb3BlcnR5T3B0aW9ucyB9LFxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIC4uLnRhYmxlLFxuICAgICAgICBpc0R5bmFtaWM6IHRydWUsXG4gICAgICAgIGdldERpc3BsYXlVcmw6IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKGdldERpc3BsYXlVcmwsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgIGxpc3REeW5hbWljVXJsczogbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEobGlzdER5bmFtaWNVcmxzLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICBzZWFyY2hEeW5hbWljVXJsczogbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEoc2VhcmNoRHluYW1pY1VybHMsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgIGdldE5hbWU6IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKGdldE5hbWUsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgfTtcbn1cbmV4cG9ydHMubWFrZUR5bmFtaWNTeW5jVGFibGUgPSBtYWtlRHluYW1pY1N5bmNUYWJsZTtcbi8qKlxuICogSGVscGVyIHRvIGdlbmVyYXRlIGEgZm9ybXVsYSB0aGF0IGZldGNoZXMgYSBsaXN0IG9mIGVudGl0aWVzIGZyb20gYSBnaXZlbiBVUkwgYW5kIHJldHVybnMgdGhlbS5cbiAqXG4gKiBPbmUgb2YgdGhlIHNpbXBsZXN0IGJ1dCBtb3N0IGNvbW1vbiB1c2UgY2FzZXMgZm9yIGEgcGFjayBmb3JtdWxhIGlzIHRvIG1ha2UgYSByZXF1ZXN0IHRvIGFuIEFQSVxuICogZW5kcG9pbnQgdGhhdCByZXR1cm5zIGEgbGlzdCBvZiBvYmplY3RzLCBhbmQgdGhlbiByZXR1cm4gdGhvc2Ugb2JqZWN0cyBlaXRoZXIgYXMtaXNcbiAqIG9yIHdpdGggc2xpZ2h0IHRyYW5zZm9ybWF0aW9ucy4gVGhlIGNhbiBiZSBhY2NvbXBsaXNoZWQgd2l0aCBhbiBgZXhlY3V0ZWAgZnVuY3Rpb24gdGhhdCBkb2VzXG4gKiBleGFjdGx5IHRoYXQsIGJ1dCBhbHRlcm5hdGl2ZWx5IHlvdSBjb3VsZCB1c2UgYG1ha2VUcmFuc2xhdGVPYmplY3RGb3JtdWxhYCBhbmQgYW5cbiAqIGBleGVjdXRlYCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIGdlbmVyYXRlZCBmb3IgeW91LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIG1ha2VUcmFuc2xhdGVPYmplY3RGb3JtdWxhKHtcbiAqICAgbmFtZTogXCJVc2Vyc1wiLFxuICogICBkZXNjcmlwdGlvbjogXCJSZXR1cm5zIGEgbGlzdCBvZiB1c2Vycy5cIlxuICogICAvLyBUaGlzIHdpbGwgZ2VuZXJhdGUgYW4gYGV4ZWN1dGVgIGZ1bmN0aW9uIHRoYXQgbWFrZXMgYSBHRVQgcmVxdWVzdCB0byB0aGUgZ2l2ZW4gVVJMLlxuICogICByZXF1ZXN0OiB7XG4gKiAgICAgbWV0aG9kOiAnR0VUJyxcbiAqICAgICB1cmw6ICdodHRwczovL2FwaS5leGFtcGxlLmNvbS91c2VycycsXG4gKiAgIH0sXG4gKiAgIHJlc3BvbnNlOiB7XG4gKiAgICAgLy8gU3VwcG9zZSB0aGUgcmVzcG9uc2UgYm9keSBoYXMgdGhlIGZvcm0gYHt1c2VyczogW3sgLi4udXNlcjEgfSwgeyAuLi51c2VyMiB9XX1gLlxuICogICAgIC8vIFRoaXMgXCJwcm9qZWN0aW9uXCIga2V5IHRlbGxzIHRoZSBgZXhlY3V0ZWAgZnVuY3Rpb24gdGhhdCB0aGUgbGlzdCBvZiByZXN1bHRzIHRvIHJldHVyblxuICogICAgIC8vIGNhbiBiZSBmb3VuZCBpbiB0aGUgb2JqZWN0IHByb3BlcnR5IGB1c2Vyc2AuIElmIG9taXR0ZWQsIHRoZSByZXNwb25zZSBib2R5IGl0c2VsZlxuICogICAgIC8vIHNob3VsZCBiZSB0aGUgbGlzdCBvZiByZXN1bHRzLlxuICogICAgIHByb2plY3RLZXk6ICd1c2VycycsXG4gKiAgICAgc2NoZW1hOiBVc2VyU2NoZW1hLFxuICogICB9LFxuICogfSk7XG4gKi9cbmZ1bmN0aW9uIG1ha2VUcmFuc2xhdGVPYmplY3RGb3JtdWxhKHsgcmVzcG9uc2UsIC4uLmRlZmluaXRpb24gfSkge1xuICAgIGNvbnN0IHsgcmVxdWVzdCwgLi4ucmVzdCB9ID0gZGVmaW5pdGlvbjtcbiAgICBjb25zdCB7IHBhcmFtZXRlcnMgfSA9IHJlc3Q7XG4gICAgcmVzcG9uc2Uuc2NoZW1hID0gcmVzcG9uc2Uuc2NoZW1hID8gKDAsIHNjaGVtYV81Lm5vcm1hbGl6ZVNjaGVtYSkocmVzcG9uc2Uuc2NoZW1hKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7IG9uRXJyb3IgfSA9IHJlc3BvbnNlO1xuICAgIGNvbnN0IHJlcXVlc3RIYW5kbGVyID0gKDAsIGhhbmRsZXJfdGVtcGxhdGVzXzIuZ2VuZXJhdGVSZXF1ZXN0SGFuZGxlcikocmVxdWVzdCwgcGFyYW1ldGVycyk7XG4gICAgY29uc3QgcmVzcG9uc2VIYW5kbGVyID0gKDAsIGhhbmRsZXJfdGVtcGxhdGVzXzEuZ2VuZXJhdGVPYmplY3RSZXNwb25zZUhhbmRsZXIpKHJlc3BvbnNlKTtcbiAgICBmdW5jdGlvbiBleGVjdXRlKHBhcmFtcywgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gY29udGV4dC5mZXRjaGVyXG4gICAgICAgICAgICAuZmV0Y2gocmVxdWVzdEhhbmRsZXIocGFyYW1zKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgLy8gb25FcnJvciBzaG91bGQgdGhyb3csIGJ1dCBpZiBpdCBkb2Vzbid0IHdlJ2xsIGp1c3QgcmV0aHJvdyB0aGUgb3JpZ2luYWwgZXJyb3IuXG4gICAgICAgICAgICBvbkVycm9yID09PSBudWxsIHx8IG9uRXJyb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlSGFuZGxlcik7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZXN0LCB7XG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIHJlc3VsdFR5cGU6IGFwaV90eXBlc182LlR5cGUub2JqZWN0LFxuICAgICAgICBzY2hlbWE6IHJlc3BvbnNlLnNjaGVtYSxcbiAgICB9KTtcbn1cbmV4cG9ydHMubWFrZVRyYW5zbGF0ZU9iamVjdEZvcm11bGEgPSBtYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYTtcbi8vIFRPRE8oam9uYXRoYW4vZWtvbGVkYSk6IEZsZXNoIG91dCBhIGd1aWRlIGZvciBlbXB0eSBmb3JtdWxhcyBpZiB0aGlzIGlzIHNvbWV0aGluZyB3ZSBjYXJlIHRvIHN1cHBvcnQuXG4vLyBXZSBwcm9iYWJseSBhbHNvIG5lZWQgdGhlIGJ1aWxkZXIncyBhZGRGb3JtdWxhKCkgbWV0aG9kIHRvIHN1cHBvcnQgZW1wdHkgZm9ybXVsYSBkZWZzIGlmIGl0IGRvZXNuJ3QgYWxyZWFkeS5cbi8qKlxuICogQ3JlYXRlcyB0aGUgZGVmaW5pdGlvbiBvZiBhbiBcImVtcHR5XCIgZm9ybXVsYSwgdGhhdCBpcywgYSBmb3JtdWxhIHRoYXQgdXNlcyBhIHtAbGluayBSZXF1ZXN0SGFuZGxlclRlbXBsYXRlfVxuICogdG8gZGVmaW5lIGFuIGltcGxlbWVudGF0aW9uIGZvciB0aGUgZm9ybXVsYSByYXRoZXIgdGhhbiBpbXBsZW1lbnRpbmcgYW4gYWN0dWFsIGBleGVjdXRlYCBmdW5jdGlvblxuICogaW4gSmF2YVNjcmlwdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBjb2RhLm1ha2VFbXB0eUZvcm11bGEoe1xuICAgIG5hbWU6IFwiR2V0V2lkZ2V0XCIsXG4gICAgZGVzY3JpcHRpb246IFwiR2V0cyBhIHdpZGdldC5cIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICB1cmw6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbS93aWRnZXRzL3tpZH1cIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB9LFxuICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgIGNvZGEubWFrZVBhcmFtZXRlcih7dHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLk51bWJlciwgbmFtZTogXCJpZFwiLCBkZXNjcmlwdGlvbjogXCJUaGUgSUQgb2YgdGhlIHdpZGdldCB0byBnZXQuXCJ9KSxcbiAgICBdLFxuICB9KSxcbiAqIGBgYFxuICovXG5mdW5jdGlvbiBtYWtlRW1wdHlGb3JtdWxhKGRlZmluaXRpb24pIHtcbiAgICBjb25zdCB7IHJlcXVlc3QsIC4uLnJlc3QgfSA9IGRlZmluaXRpb247XG4gICAgY29uc3QgeyBwYXJhbWV0ZXJzIH0gPSByZXN0O1xuICAgIGNvbnN0IHJlcXVlc3RIYW5kbGVyID0gKDAsIGhhbmRsZXJfdGVtcGxhdGVzXzIuZ2VuZXJhdGVSZXF1ZXN0SGFuZGxlcikocmVxdWVzdCwgcGFyYW1ldGVycyk7XG4gICAgZnVuY3Rpb24gZXhlY3V0ZShwYXJhbXMsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuZmV0Y2hlci5mZXRjaChyZXF1ZXN0SGFuZGxlcihwYXJhbXMpKS50aGVuKCgpID0+ICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHJlc3QsIHtcbiAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzYuVHlwZS5zdHJpbmcsXG4gICAgfSk7XG59XG5leHBvcnRzLm1ha2VFbXB0eUZvcm11bGEgPSBtYWtlRW1wdHlGb3JtdWxhO1xuZnVuY3Rpb24gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvck5hbWVkUHJvcGVydHlPcHRpb25zKG5hbWVkUHJvcGVydHlPcHRpb25zLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpIHtcbiAgICBpZiAoIW5hbWVkUHJvcGVydHlPcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuYW1lZFByb3BlcnR5T3B0aW9ucztcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKG5hbWVkUHJvcGVydHlPcHRpb25zKSkge1xuICAgICAgICByZXN1bHRbbmFtZV0gPSBtYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYShuYW1lZFByb3BlcnR5T3B0aW9uc1tuYW1lXSwgY29ubmVjdGlvblJlcXVpcmVtZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvck5hbWVkUHJvcGVydHlPcHRpb25zID0gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvck5hbWVkUHJvcGVydHlPcHRpb25zO1xuZnVuY3Rpb24gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEoZm9ybXVsYSwgY29ubmVjdGlvblJlcXVpcmVtZW50KSB7XG4gICAgdmFyIF9hO1xuICAgIGlmIChmb3JtdWxhICYmIGNvbm5lY3Rpb25SZXF1aXJlbWVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZm9ybXVsYSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IGZvcm11bGEucGFyYW1ldGVycy5tYXAoKHBhcmFtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucGFyYW0sXG4gICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogcGFyYW0uYXV0b2NvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKHBhcmFtLmF1dG9jb21wbGV0ZSwgY29ubmVjdGlvblJlcXVpcmVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmFyYXJnUGFyYW1ldGVyczogKF9hID0gZm9ybXVsYS52YXJhcmdQYXJhbWV0ZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKChwYXJhbSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnBhcmFtLFxuICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IHBhcmFtLmF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYShwYXJhbS5hdXRvY29tcGxldGUsIGNvbm5lY3Rpb25SZXF1aXJlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm11bGE7XG59XG5leHBvcnRzLm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhID0gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGE7XG4vLyBUaGlzIGhlbHBlciBtZXRob2QgZmluZHMgYW55IGlubGluZSBvcHRpb25zIGZ1bmN0aW9ucyBpbiBhIHN0YXRpYyBzeW5jIHRhYmxlIHNjaGVtYS5cbi8vIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIG5lZWQgdG8gYmUgZXh0cmFjdGVkIGludG8gdGhlIFwibmFtZWRQcm9wZXJ0eU9wdGlvbnNcIiBwcm9wZXJ0eSBvbiB0aGUgc3luY1xuLy8gdGFibGUgYW5kIHJlcGxhY2VkIHdpdGggc3RyaW5ncy5cbi8vXG4vLyBOb3QgdGhhdCB3ZSB3b24ndCBkZXRlY3Qgb3B0aW9ucyBmdW5jdGlvbnMgd2l0aGluIG5lc3RlZCBvYmplY3Qgc2NoZW1hcywgYnV0IHRoYXQncyBub3QgbmVjZXNzYXJ5XG4vLyBoZXJlOiB0aGUgb25seSB0eXBlcyB5b3UgY2FuIG9wdGlvbnMgaW4gYSAyLXdheSBzY2hlbWEgYXJlIHRoZSB0b3AtbGV2ZWwgb25lcy5cbmZ1bmN0aW9uIGxpc3RQcm9wZXJ0aWVzV2l0aE9wdGlvbnNGdW5jdGlvbnMoc2NoZW1hKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eU5hbWUgb2YgT2JqZWN0LmtleXMoc2NoZW1hLnByb3BlcnRpZXMpKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5U2NoZW1hID0gKDAsIHNjaGVtYV80Lm1heWJlVW53cmFwQXJyYXlTY2hlbWEpKHNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0pO1xuICAgICAgICBpZiAoIXByb3BlcnR5U2NoZW1hIHx8ICEoJ29wdGlvbnMnIGluIHByb3BlcnR5U2NoZW1hKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSBwcm9wZXJ0eVNjaGVtYTtcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKHByb3BlcnR5TmFtZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4vLyBUT0RPKGR3ZWl0em1hbik6IFVzZSBmaXhlZElkIGZvciB0aGUgYXV0b2NvbXBsZXRlIG5hbWUgd2hlbiBhdmFpbGFibGUgdG8gc3VwcG9ydCBwcm9wZXJ0eSByZW5hbWVzLlxuLy8gRmluZHMgYW55IGlubGluZSBvcHRpb25zIGZ1bmN0aW9ucyB3aXRoaW4gdGhlIGlucHV0U2NoZW1hIGFuZCByZXBsYWNlcyB0aGVtXG4vLyB3aXRoIHN0cmluZ3MgcmVmZXJlbmNlcyBpbnRvIHRoZSByZXR1cm5lZCBuYW1lZFByb3BlcnR5T3B0aW9ucy5cbmZ1bmN0aW9uIG1vdmVKc1Byb3BlcnR5T3B0aW9uc0Z1bmN0aW9uc1RvRm9ybXVsYXMoeyBpbnB1dFNjaGVtYSwgLy8gRE8gTk9UIE1VVEFURSBpbnB1dFNjaGVtYSFcbnNjaGVtYSwgaWRlbnRpdHlOYW1lLCB9KSB7XG4gICAgLy8gQ29udmVydGluZyBKUyBmdW5jdGlvbnMgdG8gc3RyaW5ncyBoYXBwZW5zIG9uIGlucHV0U2NoZW1hIGluc3RlYWQgb2YgdGhlIGRlZXAgY29waWVkIHZlcnNpb24gYmVjYXVzZSB0aGVcbiAgICAvLyBkZWVwIGNvcHkgd2lsbCBoYXZlIGFscmVhZHkgdGhyb3duIGF3YXkgYW55IEpTIGZ1bmN0aW9ucy5cbiAgICBjb25zdCBuYW1lZFByb3BlcnR5T3B0aW9ucyA9IHt9O1xuICAgIGNvbnN0IHByb3BlcnRpZXNXaXRoT3B0aW9uc0Z1bmN0aW9ucyA9IGxpc3RQcm9wZXJ0aWVzV2l0aE9wdGlvbnNGdW5jdGlvbnMoaW5wdXRTY2hlbWEpO1xuICAgIGlmICghcHJvcGVydGllc1dpdGhPcHRpb25zRnVuY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5TmFtZSBvZiBwcm9wZXJ0aWVzV2l0aE9wdGlvbnNGdW5jdGlvbnMpIHtcbiAgICAgICAgY29uc3QgaW5wdXRTY2hlbWFXaXRob3V0QXJyYXkgPSAoMCwgc2NoZW1hXzQubWF5YmVVbndyYXBBcnJheVNjaGVtYSkoaW5wdXRTY2hlbWEucHJvcGVydGllc1twcm9wZXJ0eU5hbWVdKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0U2NoZW1hID0gKDAsIHNjaGVtYV80Lm1heWJlVW53cmFwQXJyYXlTY2hlbWEpKHNjaGVtYS5wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0pO1xuICAgICAgICAoMCwgZW5zdXJlXzEuYXNzZXJ0Q29uZGl0aW9uKSgoMCwgc2NoZW1hXzcudW53cmFwcGVkU2NoZW1hU3VwcG9ydHNPcHRpb25zKShpbnB1dFNjaGVtYVdpdGhvdXRBcnJheSksIGBQcm9wZXJ0eSBcIiR7cHJvcGVydHlOYW1lfVwiIG11c3QgaGF2ZSBjb2RhVHlwZSBvZiBWYWx1ZUhpbnRUeXBlLlNlbGVjdExpc3Qgb3IgVmFsdWVIaW50VHlwZS5SZWZlcmVuY2UgdG8gY29uZmlndXJlIHByb3BlcnR5IG9wdGlvbnNgKTtcbiAgICAgICAgKDAsIGVuc3VyZV8xLmFzc2VydENvbmRpdGlvbikoKDAsIHNjaGVtYV83LnVud3JhcHBlZFNjaGVtYVN1cHBvcnRzT3B0aW9ucykob3V0cHV0U2NoZW1hKSwgYFByb3BlcnR5IFwiJHtwcm9wZXJ0eU5hbWV9XCIgbG9zdCBjb2RhVHlwZSBvbiBkZWVwIGNvcHk/Li4uYCk7XG4gICAgICAgIG91dHB1dFNjaGVtYS5vcHRpb25zID0gcHJvcGVydHlOYW1lO1xuICAgICAgICBuYW1lZFByb3BlcnR5T3B0aW9uc1twcm9wZXJ0eU5hbWVdID0gbWFrZVByb3BlcnR5T3B0aW9uc0Zvcm11bGEoe1xuICAgICAgICAgICAgZXhlY3V0ZTogaW5wdXRTY2hlbWFXaXRob3V0QXJyYXkub3B0aW9ucyxcbiAgICAgICAgICAgIHNjaGVtYTogc2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHlOYW1lXSxcbiAgICAgICAgICAgIG5hbWU6IGAke2lkZW50aXR5TmFtZX0uJHtwcm9wZXJ0eU5hbWV9Lk9wdGlvbnNgLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVkUHJvcGVydHlPcHRpb25zO1xufVxuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5QYWNrRGVmaW5pdGlvbkJ1aWxkZXIgPSBleHBvcnRzLm5ld1BhY2sgPSB2b2lkIDA7XG5jb25zdCB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XG5jb25zdCBhcGlfdHlwZXNfMSA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuY29uc3QgYXBpXzIgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5jb25zdCBhcGlfMyA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IGFwaV80ID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuY29uc3QgYXBpXzUgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5jb25zdCBhcGlfNiA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IG1pZ3JhdGlvbl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9taWdyYXRpb25cIik7XG5jb25zdCBhcGlfNyA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBza2VsZXRvbiBwYWNrIGRlZmluaXRpb24gdGhhdCBjYW4gYmUgYWRkZWQgdG8uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogZXhwb3J0IGNvbnN0IHBhY2sgPSBuZXdQYWNrKCk7XG4gKiBwYWNrLmFkZEZvcm11bGEoe3Jlc3VsdFR5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIG5hbWU6ICdNeUZvcm11bGEnLCAuLi59KTtcbiAqIHBhY2suYWRkU3luY1RhYmxlKCdNeVRhYmxlJywgLi4uKTtcbiAqIHBhY2suc2V0VXNlckF1dGhlbnRpY2F0aW9uKHt0eXBlOiBBdXRoZW50aWNhdGlvblR5cGUuSGVhZGVyQmVhcmVyVG9rZW59KTtcbiAqIGBgYFxuICovXG5mdW5jdGlvbiBuZXdQYWNrKGRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gbmV3IFBhY2tEZWZpbml0aW9uQnVpbGRlcihkZWZpbml0aW9uKTtcbn1cbmV4cG9ydHMubmV3UGFjayA9IG5ld1BhY2s7XG4vKipcbiAqIEEgY2xhc3MgdGhhdCBhc3Npc3RzIGluIGNvbnN0cnVjdGluZyBhIHBhY2sgZGVmaW5pdGlvbi4gVXNlIHtAbGluayBuZXdQYWNrfSB0byBjcmVhdGUgb25lLlxuICovXG5jbGFzcyBQYWNrRGVmaW5pdGlvbkJ1aWxkZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSB7QGxpbmsgUGFja0RlZmluaXRpb25CdWlsZGVyfS4gSG93ZXZlciwgYGNvZGEubmV3UGFjaygpYCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkXG4gICAgICogcmF0aGVyIHRoYW4gY29uc3RydWN0aW5nIGEgYnVpbGRlciBkaXJlY3RseS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IHsgZm9ybXVsYXMsIGZvcm1hdHMsIHN5bmNUYWJsZXMsIG5ldHdvcmtEb21haW5zLCBkZWZhdWx0QXV0aGVudGljYXRpb24sIHN5c3RlbUNvbm5lY3Rpb25BdXRoZW50aWNhdGlvbiwgdmVyc2lvbiwgZm9ybXVsYU5hbWVzcGFjZSwgfSA9IGRlZmluaXRpb24gfHwge307XG4gICAgICAgIHRoaXMuZm9ybXVsYXMgPSBmb3JtdWxhcyB8fCBbXTtcbiAgICAgICAgdGhpcy5mb3JtYXRzID0gZm9ybWF0cyB8fCBbXTtcbiAgICAgICAgdGhpcy5zeW5jVGFibGVzID0gc3luY1RhYmxlcyB8fCBbXTtcbiAgICAgICAgdGhpcy5uZXR3b3JrRG9tYWlucyA9IG5ldHdvcmtEb21haW5zIHx8IFtdO1xuICAgICAgICB0aGlzLmRlZmF1bHRBdXRoZW50aWNhdGlvbiA9IGRlZmF1bHRBdXRoZW50aWNhdGlvbjtcbiAgICAgICAgdGhpcy5zeXN0ZW1Db25uZWN0aW9uQXV0aGVudGljYXRpb24gPSBzeXN0ZW1Db25uZWN0aW9uQXV0aGVudGljYXRpb247XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuZm9ybXVsYU5hbWVzcGFjZSA9IGZvcm11bGFOYW1lc3BhY2UgfHwgJ0RlcHJlY2F0ZWQnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZm9ybXVsYSBkZWZpbml0aW9uIHRvIHRoaXMgcGFjay5cbiAgICAgKlxuICAgICAqIEluIHRoZSB3ZWIgZWRpdG9yLCB0aGUgYC9Gb3JtdWxhYCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvbiBmb3JtdWxhLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBwYWNrLmFkZEZvcm11bGEoe1xuICAgICAqICAgcmVzdWx0VHlwZTogVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgKiAgICBuYW1lOiAnTXlGb3JtdWxhJyxcbiAgICAgKiAgICBkZXNjcmlwdGlvbjogJ015IGRlc2NyaXB0aW9uLicsXG4gICAgICogICAgcGFyYW1ldGVyczogW1xuICAgICAqICAgICAgbWFrZVBhcmFtZXRlcih7XG4gICAgICogICAgICAgIHR5cGU6IFBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAqICAgICAgICBuYW1lOiAnbXlQYXJhbScsXG4gICAgICogICAgICAgIGRlc2NyaXB0aW9uOiAnTXkgcGFyYW0gZGVzY3JpcHRpb24uJyxcbiAgICAgKiAgICAgIH0pLFxuICAgICAqICAgIF0sXG4gICAgICogICAgZXhlY3V0ZTogYXN5bmMgKFtwYXJhbV0pID0+IHtcbiAgICAgKiAgICAgIHJldHVybiBgSGVsbG8gJHtwYXJhbX1gO1xuICAgICAqICAgIH0sXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYWRkRm9ybXVsYShkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IGZvcm11bGEgPSAoMCwgYXBpXzMubWFrZUZvcm11bGEpKHtcbiAgICAgICAgICAgIC4uLmRlZmluaXRpb24sXG4gICAgICAgICAgICBjb25uZWN0aW9uUmVxdWlyZW1lbnQ6IGRlZmluaXRpb24uY29ubmVjdGlvblJlcXVpcmVtZW50IHx8IHRoaXMuX2RlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZvcm11bGFzLnB1c2goZm9ybXVsYSk7IC8vIFdURlxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIHN5bmMgdGFibGUgZGVmaW5pdGlvbiB0byB0aGlzIHBhY2suXG4gICAgICpcbiAgICAgKiBJbiB0aGUgd2ViIGVkaXRvciwgdGhlIGAvU3luY1RhYmxlYCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvbiBzeW5jIHRhYmxlLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBwYWNrLmFkZFN5bmNUYWJsZSh7XG4gICAgICogICBuYW1lOiAnTXlTeW5jVGFibGUnLFxuICAgICAqICAgaWRlbnRpdHlOYW1lOiAnRW50aXR5TmFtZScsXG4gICAgICogICBzY2hlbWE6IGNvZGEubWFrZU9iamVjdFNjaGVtYSh7XG4gICAgICogICAgIC4uLlxuICAgICAqICAgfSksXG4gICAgICogICBmb3JtdWxhOiB7XG4gICAgICogICAgIC4uLlxuICAgICAqICAgfSxcbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhZGRTeW5jVGFibGUoZGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBjb25uZWN0aW9uUmVxdWlyZW1lbnRUb1VzZSA9IGRlZmluaXRpb24uY29ubmVjdGlvblJlcXVpcmVtZW50IHx8IHRoaXMuX2RlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQ7XG4gICAgICAgIGNvbnN0IHN5bmNUYWJsZSA9ICgwLCBhcGlfNC5tYWtlU3luY1RhYmxlKSh7XG4gICAgICAgICAgICAuLi5kZWZpbml0aW9uLFxuICAgICAgICAgICAgY29ubmVjdGlvblJlcXVpcmVtZW50OiBjb25uZWN0aW9uUmVxdWlyZW1lbnRUb1VzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3luY1RhYmxlcy5wdXNoKHN5bmNUYWJsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZHluYW1pYyBzeW5jIHRhYmxlIGRlZmluaXRpb24gdG8gdGhpcyBwYWNrLlxuICAgICAqXG4gICAgICogSW4gdGhlIHdlYiBlZGl0b3IsIHRoZSBgL0R5bmFtaWNTeW5jVGFibGVgIHNob3J0Y3V0IHdpbGwgaW5zZXJ0IGEgc25pcHBldCBvZiBhIHNrZWxldG9uIHN5bmMgdGFibGUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIHBhY2suYWRkRHluYW1pY1N5bmNUYWJsZSh7XG4gICAgICogICBuYW1lOiBcIk15U3luY1RhYmxlXCIsXG4gICAgICogICBnZXROYW1lOiBhc3luYyBmdW5jaXRvbiAoY29udGV4dCkgPT4ge1xuICAgICAqICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaCh7bWV0aG9kOiBcIkdFVFwiLCB1cmw6IGNvbnRleHQuc3luYy5keW5hbWljVXJsfSk7XG4gICAgICogICAgIHJldHVybiByZXNwb25zZS5ib2R5Lm5hbWU7XG4gICAgICogICB9LFxuICAgICAqICAgZ2V0TmFtZTogYXN5bmMgZnVuY3Rpb24gKGNvbnRleHQpID0+IHtcbiAgICAgKiAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe21ldGhvZDogXCJHRVRcIiwgdXJsOiBjb250ZXh0LnN5bmMuZHluYW1pY1VybH0pO1xuICAgICAqICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5icm93c2VyTGluaztcbiAgICAgKiAgIH0sXG4gICAgICogICAuLi5cbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhZGREeW5hbWljU3luY1RhYmxlKGRlZmluaXRpb24pIHtcbiAgICAgICAgY29uc3QgZHluYW1pY1N5bmNUYWJsZSA9ICgwLCBhcGlfMi5tYWtlRHluYW1pY1N5bmNUYWJsZSkoe1xuICAgICAgICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogZGVmaW5pdGlvbi5jb25uZWN0aW9uUmVxdWlyZW1lbnQgfHwgdGhpcy5fZGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3luY1RhYmxlcy5wdXNoKGR5bmFtaWNTeW5jVGFibGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGNvbHVtbiBmb3JtYXQgZGVmaW5pdGlvbiB0byB0aGlzIHBhY2suXG4gICAgICpcbiAgICAgKiBJbiB0aGUgd2ViIGVkaXRvciwgdGhlIGAvQ29sdW1uRm9ybWF0YCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvbiBmb3JtYXQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIHBhY2suYWRkQ29sdW1uRm9ybWF0KHtcbiAgICAgKiAgIG5hbWU6ICdNeUNvbHVtbicsXG4gICAgICogICBmb3JtdWxhTmFtZTogJ015Rm9ybXVsYScsXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYWRkQ29sdW1uRm9ybWF0KGZvcm1hdCkge1xuICAgICAgICB0aGlzLmZvcm1hdHMucHVzaChmb3JtYXQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3dyYXBBdXRoZW50aWNhdGlvbkZ1bmN0aW9ucyhhdXRoZW50aWNhdGlvbikge1xuICAgICAgICBjb25zdCB7IGdldENvbm5lY3Rpb25OYW1lOiBnZXRDb25uZWN0aW9uTmFtZURlZiwgZ2V0Q29ubmVjdGlvblVzZXJJZDogZ2V0Q29ubmVjdGlvblVzZXJJZERlZiwgcG9zdFNldHVwOiBwb3N0U2V0dXBEZWYsIC4uLnJlc3QgfSA9IGF1dGhlbnRpY2F0aW9uO1xuICAgICAgICBjb25zdCBnZXRDb25uZWN0aW9uTmFtZSA9ICgwLCBhcGlfNy53cmFwTWV0YWRhdGFGdW5jdGlvbikoZ2V0Q29ubmVjdGlvbk5hbWVEZWYpO1xuICAgICAgICBjb25zdCBnZXRDb25uZWN0aW9uVXNlcklkID0gKDAsIGFwaV83LndyYXBNZXRhZGF0YUZ1bmN0aW9uKShnZXRDb25uZWN0aW9uVXNlcklkRGVmKTtcbiAgICAgICAgY29uc3QgcG9zdFNldHVwID0gcG9zdFNldHVwRGVmID09PSBudWxsIHx8IHBvc3RTZXR1cERlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9zdFNldHVwRGVmLm1hcChzdGVwID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGdldE9wdGlvbnMgPSAoMCwgYXBpXzcud3JhcE1ldGFkYXRhRnVuY3Rpb24pKCgwLCBtaWdyYXRpb25fMS5zZXRFbmRwb2ludERlZkhlbHBlcikoc3RlcCkuZ2V0T3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBnZXRPcHRpb25zRm9ybXVsYSA9ICgwLCBhcGlfNy53cmFwTWV0YWRhdGFGdW5jdGlvbikoc3RlcC5nZXRPcHRpb25zRm9ybXVsYSk7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGVwLCBnZXRPcHRpb25zLCBnZXRPcHRpb25zRm9ybXVsYSB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgLi4ucmVzdCwgZ2V0Q29ubmVjdGlvbk5hbWUsIGdldENvbm5lY3Rpb25Vc2VySWQsIHBvc3RTZXR1cCB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoaXMgcGFjayB0byB1c2UgYXV0aGVudGljYXRpb24gZm9yIGluZGl2aWR1YWwgdXNlcnMsIHVzaW5nIHRoZVxuICAgICAqIGF1dGhlbnRpY2F0aW9uIG1ldGhvZCBpcyB0aGUgZ2l2ZW4gZGVmaW5pdGlvbi5cbiAgICAgKlxuICAgICAqIEVhY2ggdXNlciB3aWxsIG5lZWQgdG8gcmVnaXN0ZXIgYW4gYWNjb3VudCBpbiBvcmRlciB0byB1c2UgdGhpcyBwYWNrLlxuICAgICAqXG4gICAgICogSW4gdGhlIHdlYiBlZGl0b3IsIHRoZSBgL1VzZXJBdXRoZW50aWNhdGlvbmAgc2hvcnRjdXQgd2lsbCBpbnNlcnQgYSBzbmlwcGV0IG9mIGEgc2tlbGV0b25cbiAgICAgKiBhdXRoZW50aWNhdGlvbiBkZWZpbml0aW9uLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCwgdGhpcyB3aWxsIHNldCBhIGRlZmF1bHQgY29ubmVjdGlvbiAoYWNjb3VudCkgcmVxdWlyZW1lbnQsIG1ha2luZyBhIHVzZXIgYWNjb3VudFxuICAgICAqIHJlcXVpcmVkIHRvIGludm9rZSBhbGwgZm9ybXVsYXMgaW4gdGhpcyBwYWNrIHVubGVzcyB5b3Ugc3BlY2lmeSBkaWZmZXJlbnRseSBvbiBhIHBhcnRpY3VsYXJcbiAgICAgKiBmb3JtdWxhLiBUbyBjaGFuZ2UgdGhlIGRlZmF1bHQsIHlvdSBjYW4gcGFzcyBhIGBkZWZhdWx0Q29ubmVjdGlvblJlcXVpcmVtZW50YCBvcHRpb24gaW50b1xuICAgICAqIHRoaXMgbWV0aG9kLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBwYWNrLnNldFVzZXJBdXRoZW50aWNhdGlvbih7XG4gICAgICogICB0eXBlOiBBdXRoZW50aWNhdGlvblR5cGUuSGVhZGVyQmVhcmVyVG9rZW4sXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgc2V0VXNlckF1dGhlbnRpY2F0aW9uKGF1dGhEZWYpIHtcbiAgICAgICAgY29uc3QgeyBkZWZhdWx0Q29ubmVjdGlvblJlcXVpcmVtZW50ID0gYXBpX3R5cGVzXzEuQ29ubmVjdGlvblJlcXVpcmVtZW50LlJlcXVpcmVkLCAuLi5hdXRoZW50aWNhdGlvbiB9ID0gYXV0aERlZjtcbiAgICAgICAgaWYgKGF1dGhlbnRpY2F0aW9uLnR5cGUgPT09IHR5cGVzXzEuQXV0aGVudGljYXRpb25UeXBlLk5vbmUgfHwgYXV0aGVudGljYXRpb24udHlwZSA9PT0gdHlwZXNfMS5BdXRoZW50aWNhdGlvblR5cGUuVmFyaW91cykge1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0QXV0aGVudGljYXRpb24gPSBhdXRoZW50aWNhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEF1dGhlbnRpY2F0aW9uID0gdGhpcy5fd3JhcEF1dGhlbnRpY2F0aW9uRnVuY3Rpb25zKGF1dGhlbnRpY2F0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXV0aGVudGljYXRpb24udHlwZSAhPT0gdHlwZXNfMS5BdXRoZW50aWNhdGlvblR5cGUuTm9uZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0RGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudChkZWZhdWx0Q29ubmVjdGlvblJlcXVpcmVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGlzIHBhY2sgdG8gdXNlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVkIGJ5IHlvdSBhcyB0aGUgbWFrZXIgb2YgdGhpcyBwYWNrLlxuICAgICAqXG4gICAgICogWW91IHdpbGwgbmVlZCB0byByZWdpc3RlciBjcmVkZW50aWFscyB0byB1c2Ugd2l0aCB0aGlzIHBhY2suIFdoZW4gdXNlcnMgdXNlIHRoZVxuICAgICAqIHBhY2ssIHRoZWlyIHJlcXVlc3RzIHdpbGwgYmUgYXV0aGVudGljYXRlZCB3aXRoIHRob3NlIHN5c3RlbSBjcmVkZW50aWFscywgdGhleSBuZWVkXG4gICAgICogbm90IHJlZ2lzdGVyIHRoZWlyIG93biBhY2NvdW50LlxuICAgICAqXG4gICAgICogSW4gdGhlIHdlYiBlZGl0b3IsIHRoZSBgL1N5c3RlbUF1dGhlbnRpY2F0aW9uYCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvblxuICAgICAqIGF1dGhlbnRpY2F0aW9uIGRlZmluaXRpb24uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIHBhY2suc2V0U3lzdGVtQXV0aGVudGljYXRpb24oe1xuICAgICAqICAgdHlwZTogQXV0aGVudGljYXRpb25UeXBlLkhlYWRlckJlYXJlclRva2VuLFxuICAgICAqIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHNldFN5c3RlbUF1dGhlbnRpY2F0aW9uKHN5c3RlbUF1dGhlbnRpY2F0aW9uKSB7XG4gICAgICAgIC8vIFRPRE8ocGF0cmljayk6IFJlbW92ZSB0aGlzIGNhc3RcbiAgICAgICAgdGhpcy5zeXN0ZW1Db25uZWN0aW9uQXV0aGVudGljYXRpb24gPSB0aGlzLl93cmFwQXV0aGVudGljYXRpb25GdW5jdGlvbnMoc3lzdGVtQXV0aGVudGljYXRpb24pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVE9ETyhwYXRyaWNrKTogVW5oaWRlIHRoaXNcbiAgICAgKiBAaGlkZGVuXG4gICAgICovXG4gICAgYWRkQWRtaW5BdXRoZW50aWNhdGlvbihhZG1pbkF1dGgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkbWluQXV0aGVudGljYXRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmFkbWluQXV0aGVudGljYXRpb25zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZG1pbkF1dGhlbnRpY2F0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIC4uLmFkbWluQXV0aCxcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiB0aGlzLl93cmFwQXV0aGVudGljYXRpb25GdW5jdGlvbnMoYWRtaW5BdXRoLmF1dGhlbnRpY2F0aW9uKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBkb21haW4gdGhhdCB0aGlzIHBhY2sgbWFrZXMgSFRUUCByZXF1ZXN0cyB0by5cbiAgICAgKiBGb3IgZXhhbXBsZSwgaWYgeW91ciBwYWNrIG1ha2VzIEhUVFAgcmVxdWVzdHMgdG8gXCJhcGkuZXhhbXBsZS5jb21cIixcbiAgICAgKiB1c2UgXCJleGFtcGxlLmNvbVwiIGFzIHlvdXIgbmV0d29yayBkb21haW4uXG4gICAgICpcbiAgICAgKiBJZiB5b3VyIHBhY2sgbWFrZSBIVFRQIHJlcXVlc3RzLCBpdCBtdXN0IGRlY2xhcmUgYSBuZXR3b3JrIGRvbWFpbixcbiAgICAgKiBmb3Igc2VjdXJpdHkgcHVycG9zZXMuIENvZGEgZW5mb3JjZXMgdGhhdCB5b3VyIHBhY2sgY2Fubm90IG1ha2UgcmVxdWVzdHMgdG9cbiAgICAgKiBhbnkgdW5kZWNsYXJlZCBkb21haW5zLlxuICAgICAqXG4gICAgICogWW91IGFyZSBhbGxvd2VkIG9uZSBuZXR3b3JrIGRvbWFpbiBwZXIgcGFjayBieSBkZWZhdWx0LiBJZiB5b3VyIHBhY2sgbmVlZHNcbiAgICAgKiB0byBjb25uZWN0IHRvIG11bHRpcGxlIGRvbWFpbnMsIGNvbnRhY3QgQ29kYSBTdXBwb3J0IGZvciBhcHByb3ZhbC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogcGFjay5hZGROZXR3b3JrRG9tYWluKCdleGFtcGxlLmNvbScpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGFkZE5ldHdvcmtEb21haW4oLi4uZG9tYWluKSB7XG4gICAgICAgIHRoaXMubmV0d29ya0RvbWFpbnMucHVzaCguLi5kb21haW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2VtYW50aWMgdmVyc2lvbiBvZiB0aGlzIHBhY2sgdmVyc2lvbiwgZS5nLiBgJzEuMi4zJ2AuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG9wdGlvbmFsLCBhbmQgeW91IG9ubHkgbmVlZCB0byBwcm92aWRlIGEgdmVyc2lvbiBpZiB5b3UgYXJlIG1hbnVhbGx5IGRvaW5nXG4gICAgICogc2VtYW50aWMgdmVyc2lvbmluZywgb3IgdXNpbmcgdGhlIENMSS4gSWYgdXNpbmcgdGhlIHdlYiBlZGl0b3IsIHlvdSBjYW4gb21pdCB0aGlzXG4gICAgICogYW5kIHRoZSB3ZWIgZWRpdG9yIHdpbGwgYXV0b21hdGljYWxseSBwcm92aWRlIGFuIGFwcHJvcHJpYXRlIHNlbWFudGljIHZlcnNpb25cbiAgICAgKiBlYWNoIHRpbWUgeW91IGJ1aWxkIGEgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogcGFjay5zZXRWZXJzaW9uKCcxLjIuMycpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHNldFZlcnNpb24odmVyc2lvbikge1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3NldERlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQoY29ubmVjdGlvblJlcXVpcmVtZW50KSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQgPSBjb25uZWN0aW9uUmVxdWlyZW1lbnQ7XG4gICAgICAgIC8vIFJld3JpdGUgYW55IGZvcm11bGFzIG9yIHN5bmMgdGFibGVzIHRoYXQgd2VyZSBhbHJlYWR5IGRlZmluZWQsIGluIGNhc2UgdGhlIG1ha2VyIHNldHMgdGhlIGRlZmF1bHRcbiAgICAgICAgLy8gYWZ0ZXIgdGhlIGZhY3QuXG4gICAgICAgIHRoaXMuZm9ybXVsYXMgPSB0aGlzLmZvcm11bGFzLm1hcChmb3JtdWxhID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtdWxhLmNvbm5lY3Rpb25SZXF1aXJlbWVudCA/IGZvcm11bGEgOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKGZvcm11bGEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN5bmNUYWJsZXMgPSB0aGlzLnN5bmNUYWJsZXMubWFwKHN5bmNUYWJsZSA9PiB7XG4gICAgICAgICAgICBpZiAoc3luY1RhYmxlLmdldHRlci5jb25uZWN0aW9uUmVxdWlyZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3luY1RhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKDAsIGFwaV8xLmlzRHluYW1pY1N5bmNUYWJsZSkoc3luY1RhYmxlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN5bmNUYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0dGVyOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXR0ZXIsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZXNlIDQgYXJlIG1ldGFkYXRhIGZvcm11bGFzLCBzbyB0aGV5IHVzZSBDb25uZWN0aW9uUmVxdWlyZW1lbnQuUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gYnkgZGVmYXVsdCBpZiB5b3UgZG9uJ3Qgc3BlY2lmeSBhIGNvbm5lY3Rpb24gcmVxdWlyZW1lbnQgKGEgbGVnYWN5IGJlaGF2aW9yXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoYXQgaXMgY29uZnVzaW5nIGFuZCBwZXJoYXBzIHVuZGVzaXJhYmxlIG5vdyB0aGF0IHdlIGhhdmUgYmV0dGVyIGJ1aWxkZXJzKS5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qga25vdyBpZiB0aGUgbWFrZXIgc2V0IFJlcXVpcmVkIGV4cGxpY2l0bHkgb3IgaWYgd2FzIGp1c3QgdGhlIGRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IGtub3cgaWYgd2Ugc2hvdWxkIG92ZXJ3cml0ZSB0aGUgY29ubmVjdGlvbiByZXF1aXJlbWVudC4gRm9yIGxhY2tcbiAgICAgICAgICAgICAgICAgICAgLy8gb2YgYSBiZXR0ZXIgb3B0aW9uLCB3ZSdsbCBvdmVycmlkZSBpdCBoZXJlIHJlZ2FyZGxlc3MuIFRoaXMgZW5zdXJlIHRoYXQgdGhlc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gZHluYW1pYyBzeW5jIHRhYmxlIG1ldGFkYXRhIGZvcm11bGFzIGhhdmUgdGhlIHNhbWUgY29ubmV0aW9uIHJlcXVpcmVtZW50IGFzIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBzeW5jIHRhYmxlIGl0c2VsZiwgd2hpY2ggc2VlbXMgZGVzaXJhYmxlIGJhc2ljYWxseSAxMDAlIG9mIHRoZSB0aW1lIGFuZCBzaG91bGRcbiAgICAgICAgICAgICAgICAgICAgLy8gYWx3YXlzIHdvcmssIGJ1dCBpdCBkb2VzIGdpdmUgcmlzZSB0byBjb25mdXNpbmcgYmVoYXZpb3IgdGhhdCBjYWxsaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldERlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQoKSBjYW4gd2lwZSBhd2F5IGFuIGV4cGxpY2l0IGNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVxdWlyZW1lbnQgb3ZlcnJpZGUgc2V0IG9uIG9uZSBvZiB0aGVzZSA0IG1ldGFkYXRhIGZvcm11bGFzLlxuICAgICAgICAgICAgICAgICAgICBnZXROYW1lOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXROYW1lLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBnZXREaXNwbGF5VXJsOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXREaXNwbGF5VXJsLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBnZXRTY2hlbWE6ICgwLCBhcGlfNS5tYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYSkoc3luY1RhYmxlLmdldFNjaGVtYSwgY29ubmVjdGlvblJlcXVpcmVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgbGlzdER5bmFtaWNVcmxzOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5saXN0RHluYW1pY1VybHMsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaER5bmFtaWNVcmxzOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5zZWFyY2hEeW5hbWljVXJscywgY29ubmVjdGlvblJlcXVpcmVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZWRQcm9wZXJ0eU9wdGlvbnM6ICgwLCBhcGlfNi5tYXliZVJld3JpdGVDb25uZWN0aW9uRm9yTmFtZWRQcm9wZXJ0eU9wdGlvbnMpKHN5bmNUYWJsZS5uYW1lZFByb3BlcnR5T3B0aW9ucywgY29ubmVjdGlvblJlcXVpcmVtZW50KSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3luY1RhYmxlLFxuICAgICAgICAgICAgICAgICAgICBnZXR0ZXI6ICgwLCBhcGlfNS5tYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYSkoc3luY1RhYmxlLmdldHRlciwgY29ubmVjdGlvblJlcXVpcmVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0U2NoZW1hOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXRTY2hlbWEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIG5hbWVkUHJvcGVydHlPcHRpb25zOiAoMCwgYXBpXzYubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvck5hbWVkUHJvcGVydHlPcHRpb25zKShzeW5jVGFibGUubmFtZWRQcm9wZXJ0eU9wdGlvbnMsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cbmV4cG9ydHMuUGFja0RlZmluaXRpb25CdWlsZGVyID0gUGFja0RlZmluaXRpb25CdWlsZGVyO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRFZmZlY3RpdmVQcm9wZXJ0eUtleXNGcm9tU2NoZW1hID0gdm9pZCAwO1xuY29uc3Qgc2NoZW1hXzEgPSByZXF1aXJlKFwiLi4vc2NoZW1hXCIpO1xuLyoqXG4gKiBBIGhlbHBlciB0byBleHRyYWN0IHByb3BlcnRpZXMgZnJvbUtleXMgZnJvbSBhIHNjaGVtYSBvYmplY3QuIFRoaXMgaXMgbW9zdGx5IHVzZWZ1bFxuICogaW4gcHJvY2Vzc2luZyB0aGUgY29udGV4dC5zeW5jLnNjaGVtYSBpbiBhIHN5bmMgZm9ybXVsYSwgd2hlcmUgdGhlIHNjaGVtYSB3b3VsZCBvbmx5XG4gKiBpbmNsdWRlIGEgc3Vic2V0IG9mIHByb3BlcnRpZXMgd2hpY2ggd2VyZSBtYW51YWxseSBzZWxlY3RlZCBieSB0aGUgUGFjayB1c2VyLlxuICovXG5mdW5jdGlvbiBnZXRFZmZlY3RpdmVQcm9wZXJ0eUtleXNGcm9tU2NoZW1hKHNjaGVtYSkge1xuICAgIC8vIG1ha2UgaXQgZWFzaWVyIGlmIHRoZSBjYWxsZXIgc2ltcGx5IHBhc3NlZCBpbiB0aGUgZnVsbCBzeW5jIHNjaGVtYS5cbiAgICBpZiAoc2NoZW1hLnR5cGUgPT09IHNjaGVtYV8xLlZhbHVlVHlwZS5BcnJheSkge1xuICAgICAgICBzY2hlbWEgPSBzY2hlbWEuaXRlbXM7XG4gICAgfVxuICAgIGlmIChzY2hlbWEudHlwZSAhPT0gc2NoZW1hXzEuVmFsdWVUeXBlLk9iamVjdCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBbLi4ubmV3IFNldChPYmplY3QuZW50cmllcyhzY2hlbWEucHJvcGVydGllcykubWFwKChba2V5LCBwcm9wZXJ0eV0pID0+IHByb3BlcnR5LmZyb21LZXkgfHwga2V5KSldO1xufVxuZXhwb3J0cy5nZXRFZmZlY3RpdmVQcm9wZXJ0eUtleXNGcm9tU2NoZW1hID0gZ2V0RWZmZWN0aXZlUHJvcGVydHlLZXlzRnJvbVNjaGVtYTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU3ZnQ29uc3RhbnRzID0gdm9pZCAwO1xuLyoqIENvbnN0YW50cyBmb3Igd29ya2luZyB3aXRoIFNWRyBpbWFnZXMuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxudmFyIFN2Z0NvbnN0YW50cztcbihmdW5jdGlvbiAoU3ZnQ29uc3RhbnRzKSB7XG4gICAgLyoqIElEIG9mIHRoZSBub2RlIGluIGEgcmV0dXJuZWQgU1ZHIGZpbGUgdGhhdCBpcyB0YXJnZXRlZCB3aGVuIERhcmsgTW9kZSBpcyBlbmFibGVkIGluIENvZGEuICovXG4gICAgU3ZnQ29uc3RhbnRzLkRhcmtNb2RlRnJhZ21lbnRJZCA9ICdEYXJrTW9kZSc7XG4gICAgLyoqIFByZWZpeCB0byB1c2UgZm9yIGJhc2UtNjQgZW5jb2RlZCBTVkdzIHJldHVybmVkIGJ5IGZvcm11bGFzLiAqL1xuICAgIFN2Z0NvbnN0YW50cy5EYXRhVXJsUHJlZml4ID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJztcbiAgICAvKiogUHJlZml4IHRvIHVzZSBmb3IgYmFzZS02NCBlbmNvZGVkIFNWR3MgKHRoYXQgc3VwcG9ydCBEYXJrIE1vZGUpIHJldHVybmVkIGJ5IGZvcm11bGFzLiAqL1xuICAgIFN2Z0NvbnN0YW50cy5EYXRhVXJsUHJlZml4V2l0aERhcmtNb2RlU3VwcG9ydCA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7c3VwcG9ydHNEYXJrTW9kZT0xO2Jhc2U2NCwnO1xufSkoU3ZnQ29uc3RhbnRzIHx8IChleHBvcnRzLlN2Z0NvbnN0YW50cyA9IFN2Z0NvbnN0YW50cyA9IHt9KSk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIFRoZSBjb3JlIGNvbXBvbmVudHMgb2YgdGhlIFBhY2sgU0RLLiBUaGVzZSBmdW5jdGlvbnMgYW5kIHR5cGVzIGFyZSB1c2VkIHRvXG4gKiBkZWZpbmUgeW91ciBQYWNrLCBpdCdzIGJ1aWxkaW5nIGJsb2NrcywgYW5kIHRoZWlyIGxvZ2ljLlxuICpcbiAqIFRoaXMgbW9kdWxlIGlzIGltcG9ydGVkIHVzaW5nIHRoZSBmb2xsb3dpbmcgY29kZTpcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0ICogYXMgY29kYSBmcm9tIFwiQGNvZGFocS9wYWNrcy1zZGtcIjtcbiAqIGBgYFxuICpcbiAqIEBtb2R1bGUgY29yZVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1ha2VPYmplY3RTY2hlbWEgPSBleHBvcnRzLm1ha2VBdHRyaWJ1dGlvbk5vZGUgPSBleHBvcnRzLmdlbmVyYXRlU2NoZW1hID0gZXhwb3J0cy5WYWx1ZVR5cGUgPSBleHBvcnRzLlZhbHVlSGludFR5cGUgPSBleHBvcnRzLlNjYWxlSWNvblNldCA9IGV4cG9ydHMuUHJvcGVydHlMYWJlbFZhbHVlVGVtcGxhdGUgPSBleHBvcnRzLkxpbmtEaXNwbGF5VHlwZSA9IGV4cG9ydHMuSW5kZXhpbmdTdHJhdGVneSA9IGV4cG9ydHMuSW1hZ2VPdXRsaW5lID0gZXhwb3J0cy5JbWFnZVNoYXBlU3R5bGUgPSBleHBvcnRzLkltYWdlQ29ybmVyU3R5bGUgPSBleHBvcnRzLkVtYWlsRGlzcGxheVR5cGUgPSBleHBvcnRzLkR1cmF0aW9uVW5pdCA9IGV4cG9ydHMuQ3VycmVuY3lGb3JtYXQgPSBleHBvcnRzLkF0dHJpYnV0aW9uTm9kZVR5cGUgPSBleHBvcnRzLmVuc3VyZVVucmVhY2hhYmxlID0gZXhwb3J0cy5lbnN1cmVOb25FbXB0eVN0cmluZyA9IGV4cG9ydHMuZW5zdXJlRXhpc3RzID0gZXhwb3J0cy5hc3NlcnRDb25kaXRpb24gPSBleHBvcnRzLlN2Z0NvbnN0YW50cyA9IGV4cG9ydHMuZ2V0RWZmZWN0aXZlUHJvcGVydHlLZXlzRnJvbVNjaGVtYSA9IGV4cG9ydHMud2l0aFF1ZXJ5UGFyYW1zID0gZXhwb3J0cy5qb2luVXJsID0gZXhwb3J0cy5nZXRRdWVyeVBhcmFtcyA9IGV4cG9ydHMuc2ltcGxlQXV0b2NvbXBsZXRlID0gZXhwb3J0cy5tYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhID0gZXhwb3J0cy5hdXRvY29tcGxldGVTZWFyY2hPYmplY3RzID0gZXhwb3J0cy5tYWtlUGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYSA9IGV4cG9ydHMubWFrZVN5bmNUYWJsZSA9IGV4cG9ydHMubWFrZUZvcm11bGEgPSBleHBvcnRzLm1ha2VFbXB0eUZvcm11bGEgPSBleHBvcnRzLm1ha2VEeW5hbWljU3luY1RhYmxlID0gZXhwb3J0cy5tYWtlUHJvcGVydHlPcHRpb25zRm9ybXVsYSA9IGV4cG9ydHMubWFrZU1ldGFkYXRhRm9ybXVsYSA9IGV4cG9ydHMuVXNlclZpc2libGVFcnJvciA9IGV4cG9ydHMuVHlwZSA9IGV4cG9ydHMuTWlzc2luZ1Njb3Blc0Vycm9yID0gZXhwb3J0cy5TdGF0dXNDb2RlRXJyb3IgPSBleHBvcnRzLlByZWNhbm5lZERhdGVSYW5nZSA9IGV4cG9ydHMuUGFyYW1ldGVyVHlwZSA9IGV4cG9ydHMuTmV0d29ya0Nvbm5lY3Rpb24gPSBleHBvcnRzLlVwZGF0ZU91dGNvbWUgPSBleHBvcnRzLkNvbm5lY3Rpb25SZXF1aXJlbWVudCA9IGV4cG9ydHMuT3B0aW9uc1R5cGUgPSBleHBvcnRzLlBhY2tEZWZpbml0aW9uQnVpbGRlciA9IGV4cG9ydHMubmV3UGFjayA9IGV4cG9ydHMuUG9zdFNldHVwVHlwZSA9IGV4cG9ydHMuQXV0aGVudGljYXRpb25UeXBlID0gdm9pZCAwO1xuZXhwb3J0cy5Ub2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbiA9IGV4cG9ydHMuVmFsaWRGZXRjaE1ldGhvZHMgPSBleHBvcnRzLndpdGhJZGVudGl0eSA9IGV4cG9ydHMubWFrZVNjaGVtYSA9IGV4cG9ydHMubWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWEgPSB2b2lkIDA7XG52YXIgdHlwZXNfMSA9IHJlcXVpcmUoXCIuL3R5cGVzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQXV0aGVudGljYXRpb25UeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0eXBlc18xLkF1dGhlbnRpY2F0aW9uVHlwZTsgfSB9KTtcbnZhciB0eXBlc18yID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJQb3N0U2V0dXBUeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0eXBlc18yLlBvc3RTZXR1cFR5cGU7IH0gfSk7XG52YXIgYnVpbGRlcl8xID0gcmVxdWlyZShcIi4vYnVpbGRlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5ld1BhY2tcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJ1aWxkZXJfMS5uZXdQYWNrOyB9IH0pO1xudmFyIGJ1aWxkZXJfMiA9IHJlcXVpcmUoXCIuL2J1aWxkZXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJQYWNrRGVmaW5pdGlvbkJ1aWxkZXJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJ1aWxkZXJfMi5QYWNrRGVmaW5pdGlvbkJ1aWxkZXI7IH0gfSk7XG52YXIgYXBpX3R5cGVzXzEgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJPcHRpb25zVHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpX3R5cGVzXzEuT3B0aW9uc1R5cGU7IH0gfSk7XG52YXIgYXBpX3R5cGVzXzIgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDb25uZWN0aW9uUmVxdWlyZW1lbnRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV90eXBlc18yLkNvbm5lY3Rpb25SZXF1aXJlbWVudDsgfSB9KTtcbnZhciBhcGlfMSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlVwZGF0ZU91dGNvbWVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV8xLlVwZGF0ZU91dGNvbWU7IH0gfSk7XG52YXIgYXBpX3R5cGVzXzMgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOZXR3b3JrQ29ubmVjdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpX3R5cGVzXzMuTmV0d29ya0Nvbm5lY3Rpb247IH0gfSk7XG52YXIgYXBpX3R5cGVzXzQgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJQYXJhbWV0ZXJUeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfdHlwZXNfNC5QYXJhbWV0ZXJUeXBlOyB9IH0pO1xudmFyIGFwaV90eXBlc181ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHJlY2FubmVkRGF0ZVJhbmdlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfdHlwZXNfNS5QcmVjYW5uZWREYXRlUmFuZ2U7IH0gfSk7XG52YXIgYXBpXzIgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTdGF0dXNDb2RlRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV8yLlN0YXR1c0NvZGVFcnJvcjsgfSB9KTtcbnZhciBhcGlfMyA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk1pc3NpbmdTY29wZXNFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzMuTWlzc2luZ1Njb3Blc0Vycm9yOyB9IH0pO1xudmFyIGFwaV90eXBlc182ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpX3R5cGVzXzYuVHlwZTsgfSB9KTtcbnZhciBhcGlfNCA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlVzZXJWaXNpYmxlRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV80LlVzZXJWaXNpYmxlRXJyb3I7IH0gfSk7XG4vLyBGb3JtdWxhIGRlZmluaXRpb24gaGVscGVyc1xudmFyIGFwaV81ID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZU1ldGFkYXRhRm9ybXVsYVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzUubWFrZU1ldGFkYXRhRm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfNiA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VQcm9wZXJ0eU9wdGlvbnNGb3JtdWxhXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfNi5tYWtlUHJvcGVydHlPcHRpb25zRm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfNyA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VEeW5hbWljU3luY1RhYmxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfNy5tYWtlRHluYW1pY1N5bmNUYWJsZTsgfSB9KTtcbnZhciBhcGlfOCA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VFbXB0eUZvcm11bGFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV84Lm1ha2VFbXB0eUZvcm11bGE7IH0gfSk7XG52YXIgYXBpXzkgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlRm9ybXVsYVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzkubWFrZUZvcm11bGE7IH0gfSk7XG52YXIgYXBpXzEwID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVN5bmNUYWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzEwLm1ha2VTeW5jVGFibGU7IH0gfSk7XG52YXIgYXBpXzExID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVRyYW5zbGF0ZU9iamVjdEZvcm11bGFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV8xMS5tYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfMTIgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlUGFyYW1ldGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMTIubWFrZVBhcmFtZXRlcjsgfSB9KTtcbnZhciBhcGlfMTMgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhdXRvY29tcGxldGVTZWFyY2hPYmplY3RzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMTMuYXV0b2NvbXBsZXRlU2VhcmNoT2JqZWN0czsgfSB9KTtcbnZhciBhcGlfMTQgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMTQubWFrZVNpbXBsZUF1dG9jb21wbGV0ZU1ldGFkYXRhRm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfMTUgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzaW1wbGVBdXRvY29tcGxldGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV8xNS5zaW1wbGVBdXRvY29tcGxldGU7IH0gfSk7XG4vLyBVUkwgaGVscGVycy5cbnZhciB1cmxfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvdXJsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0UXVlcnlQYXJhbXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVybF8xLmdldFF1ZXJ5UGFyYW1zOyB9IH0pO1xudmFyIHVybF8yID0gcmVxdWlyZShcIi4vaGVscGVycy91cmxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJqb2luVXJsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB1cmxfMi5qb2luOyB9IH0pO1xudmFyIHVybF8zID0gcmVxdWlyZShcIi4vaGVscGVycy91cmxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ3aXRoUXVlcnlQYXJhbXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVybF8zLndpdGhRdWVyeVBhcmFtczsgfSB9KTtcbi8vIFNjaGVtYSBoZWxwZXJzLlxudmFyIHNjaGVtYV8xID0gcmVxdWlyZShcIi4vaGVscGVycy9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZXRFZmZlY3RpdmVQcm9wZXJ0eUtleXNGcm9tU2NoZW1hXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMS5nZXRFZmZlY3RpdmVQcm9wZXJ0eUtleXNGcm9tU2NoZW1hOyB9IH0pO1xuLy8gU1ZHIGNvbnN0YW50cy5cbnZhciBzdmdfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvc3ZnXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU3ZnQ29uc3RhbnRzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdmdfMS5TdmdDb25zdGFudHM7IH0gfSk7XG4vLyBHZW5lcmFsIFV0aWxpdGllc1xudmFyIGVuc3VyZV8xID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhc3NlcnRDb25kaXRpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuc3VyZV8xLmFzc2VydENvbmRpdGlvbjsgfSB9KTtcbnZhciBlbnN1cmVfMiA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZW5zdXJlRXhpc3RzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbnN1cmVfMi5lbnN1cmVFeGlzdHM7IH0gfSk7XG52YXIgZW5zdXJlXzMgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImVuc3VyZU5vbkVtcHR5U3RyaW5nXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbnN1cmVfMy5lbnN1cmVOb25FbXB0eVN0cmluZzsgfSB9KTtcbnZhciBlbnN1cmVfNCA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZW5zdXJlVW5yZWFjaGFibGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuc3VyZV80LmVuc3VyZVVucmVhY2hhYmxlOyB9IH0pO1xudmFyIHNjaGVtYV8yID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQXR0cmlidXRpb25Ob2RlVHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzIuQXR0cmlidXRpb25Ob2RlVHlwZTsgfSB9KTtcbnZhciBzY2hlbWFfMyA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkN1cnJlbmN5Rm9ybWF0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMy5DdXJyZW5jeUZvcm1hdDsgfSB9KTtcbnZhciBzY2hlbWFfNCA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkR1cmF0aW9uVW5pdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzQuRHVyYXRpb25Vbml0OyB9IH0pO1xudmFyIHNjaGVtYV81ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiRW1haWxEaXNwbGF5VHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzUuRW1haWxEaXNwbGF5VHlwZTsgfSB9KTtcbnZhciBzY2hlbWFfNiA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkltYWdlQ29ybmVyU3R5bGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV82LkltYWdlQ29ybmVyU3R5bGU7IH0gfSk7XG52YXIgc2NoZW1hXzcgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJJbWFnZVNoYXBlU3R5bGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV83LkltYWdlU2hhcGVTdHlsZTsgfSB9KTtcbnZhciBzY2hlbWFfOCA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkltYWdlT3V0bGluZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzguSW1hZ2VPdXRsaW5lOyB9IH0pO1xudmFyIHNjaGVtYV85ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiSW5kZXhpbmdTdHJhdGVneVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzkuSW5kZXhpbmdTdHJhdGVneTsgfSB9KTtcbnZhciBzY2hlbWFfMTAgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJMaW5rRGlzcGxheVR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xMC5MaW5rRGlzcGxheVR5cGU7IH0gfSk7XG52YXIgc2NoZW1hXzExID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUHJvcGVydHlMYWJlbFZhbHVlVGVtcGxhdGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xMS5Qcm9wZXJ0eUxhYmVsVmFsdWVUZW1wbGF0ZTsgfSB9KTtcbnZhciBzY2hlbWFfMTIgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTY2FsZUljb25TZXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xMi5TY2FsZUljb25TZXQ7IH0gfSk7XG52YXIgc2NoZW1hXzEzID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmFsdWVIaW50VHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzEzLlZhbHVlSGludFR5cGU7IH0gfSk7XG52YXIgc2NoZW1hXzE0ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmFsdWVUeXBlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMTQuVmFsdWVUeXBlOyB9IH0pO1xudmFyIHNjaGVtYV8xNSA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImdlbmVyYXRlU2NoZW1hXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMTUuZ2VuZXJhdGVTY2hlbWE7IH0gfSk7XG52YXIgc2NoZW1hXzE2ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZUF0dHJpYnV0aW9uTm9kZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzE2Lm1ha2VBdHRyaWJ1dGlvbk5vZGU7IH0gfSk7XG52YXIgc2NoZW1hXzE3ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZU9iamVjdFNjaGVtYVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzE3Lm1ha2VPYmplY3RTY2hlbWE7IH0gfSk7XG52YXIgc2NoZW1hXzE4ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xOC5tYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYTsgfSB9KTtcbnZhciBzY2hlbWFfMTkgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlU2NoZW1hXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMTkubWFrZVNjaGVtYTsgfSB9KTtcbnZhciBzY2hlbWFfMjAgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ3aXRoSWRlbnRpdHlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8yMC53aXRoSWRlbnRpdHk7IH0gfSk7XG4vLyBFeHBvcnRzIGZvciBpbnRlcm1lZGlhdGUgZW50aXRpZXMgd2Ugd2FudCBpbmNsdWRlZCBpbiB0aGUgVHlwZURvYyBkb2N1bWVudGF0aW9uXG4vLyBidXQgb3RoZXJ3aXNlIHdvdWxkbid0IGNhcmUgYWJvdXQgaW5jbHVkaW5nIGFzIHRvcC1sZXZlbCBleHBvcnRzIG9mIHRoZSBTREtcbnZhciBhcGlfdHlwZXNfNyA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZhbGlkRmV0Y2hNZXRob2RzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfdHlwZXNfNy5WYWxpZEZldGNoTWV0aG9kczsgfSB9KTtcbnZhciB0eXBlc18zID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJUb2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHlwZXNfMy5Ub2tlbkV4Y2hhbmdlQ3JlZGVudGlhbHNMb2NhdGlvbjsgfSB9KTtcbiIsICJpbXBvcnQgKiBhcyBjb2RhIGZyb20gXCJAY29kYWhxL3BhY2tzLXNka1wiO1xuXG5leHBvcnQgY29uc3QgcGFjayA9IGNvZGEubmV3UGFjaygpO1xuXG4vLyBQYWNrIG1ldGFkYXRhXG5wYWNrLnNldFVzZXJBdXRoZW50aWNhdGlvbih7XG4gIHR5cGU6IGNvZGEuQXV0aGVudGljYXRpb25UeXBlLldlYkJhc2ljLFxuICBpbnN0cnVjdGlvbnNVcmw6IFwiaHR0cHM6Ly9kb2NzLm5ncHZhbi5jb20vZG9jcy9hdXRoZW50aWNhdGlvblwiLFxuICB1eENvbmZpZzoge1xuICAgIHBsYWNlaG9sZGVyVXNlcm5hbWU6IFwiQXBwbGljYXRpb24gTmFtZVwiLFxuICAgIHBsYWNlaG9sZGVyUGFzc3dvcmQ6IFwiQVBJIEtleVwiLFxuICB9LFxuICBnZXRDb25uZWN0aW9uTmFtZTogYXN5bmMgZnVuY3Rpb24oY29udGV4dCkge1xuICAgIC8vIEdldCB1c2VyIGluZm8gdG8gc2V0IGEgbWVhbmluZ2Z1bCBjb25uZWN0aW9uIG5hbWVcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIHVybDogXCJodHRwczovL2FwaS5zZWN1cmV2YW4uY29tL3Y0L3Blb3BsZS9zZWxmXCIsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHVzZXIgPSByZXNwb25zZS5ib2R5O1xuICAgICAgcmV0dXJuIHVzZXIuZGlzcGxheU5hbWUgfHwgdXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWUgfHwgXCJFdmVyeUFjdGlvbiBVc2VyXCI7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIEZhbGxiYWNrIGlmIHRoZSB1c2VyIGVuZHBvaW50IGZhaWxzXG4gICAgICByZXR1cm4gXCJFdmVyeUFjdGlvbiBDb25uZWN0aW9uXCI7XG4gICAgfVxuICB9LFxufSk7XG5cbnBhY2suYWRkTmV0d29ya0RvbWFpbihcImFwaS5zZWN1cmV2YW4uY29tXCIpO1xuXG4vLyBDb250YWN0IHNjaGVtYVxuY29uc3QgQ29udGFjdFNjaGVtYSA9IGNvZGEubWFrZU9iamVjdFNjaGVtYSh7XG4gIHByb3BlcnRpZXM6IHtcbiAgICB2YW5JZDoge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuTnVtYmVyLFxuICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgY29udGFjdCBpbiBFdmVyeUFjdGlvblwiLFxuICAgIH0sXG4gICAgZmlyc3ROYW1lOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBkZXNjcmlwdGlvbjogXCJDb250YWN0J3MgZmlyc3QgbmFtZVwiLFxuICAgIH0sXG4gICAgbWlkZGxlTmFtZToge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgZGVzY3JpcHRpb246IFwiQ29udGFjdCdzIG1pZGRsZSBuYW1lXCIsXG4gICAgfSxcbiAgICBsYXN0TmFtZToge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgZGVzY3JpcHRpb246IFwiQ29udGFjdCdzIGxhc3QgbmFtZVwiLFxuICAgIH0sXG4gICAgY29tbW9uTmFtZToge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgZGVzY3JpcHRpb246IFwiQ29tbW9uIG5hbWUgZm9yIG9yZ2FuaXphdGlvbnNcIixcbiAgICB9LFxuICAgIG9mZmljaWFsTmFtZToge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgZGVzY3JpcHRpb246IFwiT2ZmaWNpYWwgbmFtZSBmb3Igb3JnYW5pemF0aW9uc1wiLFxuICAgIH0sXG4gICAgZW1haWw6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlByaW1hcnkgZW1haWwgYWRkcmVzc1wiLFxuICAgIH0sXG4gICAgcGhvbmVOdW1iZXI6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlByaW1hcnkgcGhvbmUgbnVtYmVyXCIsXG4gICAgfSxcbiAgICBzdHJlZXRBZGRyZXNzOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBkZXNjcmlwdGlvbjogXCJTdHJlZXQgYWRkcmVzc1wiLFxuICAgIH0sXG4gICAgY2l0eToge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgZGVzY3JpcHRpb246IFwiQ2l0eVwiLFxuICAgIH0sXG4gICAgc3RhdGVPclByb3ZpbmNlOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBkZXNjcmlwdGlvbjogXCJTdGF0ZSBvciBwcm92aW5jZSBjb2RlXCIsXG4gICAgfSxcbiAgICB6aXBPclBvc3RhbENvZGU6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlpJUCBvciBwb3N0YWwgY29kZVwiLFxuICAgIH0sXG4gICAgY29udGFjdE1vZGU6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbnRhY3QgbW9kZSAoSW5kaXZpZHVhbCwgT3JnYW5pemF0aW9uLCBldGMuKVwiLFxuICAgIH0sXG4gICAgZGF0ZUNyZWF0ZWQ6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGNvZGFUeXBlOiBjb2RhLlZhbHVlSGludFR5cGUuRGF0ZVRpbWUsXG4gICAgICBkZXNjcmlwdGlvbjogXCJEYXRlIHRoZSBjb250YWN0IHdhcyBjcmVhdGVkXCIsXG4gICAgfSxcbiAgICBkYXRlTW9kaWZpZWQ6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGNvZGFUeXBlOiBjb2RhLlZhbHVlSGludFR5cGUuRGF0ZVRpbWUsXG4gICAgICBkZXNjcmlwdGlvbjogXCJEYXRlIHRoZSBjb250YWN0IHdhcyBsYXN0IG1vZGlmaWVkXCIsXG4gICAgfSxcbiAgfSxcbiAgZGlzcGxheVByb3BlcnR5OiBcImZpcnN0TmFtZVwiLFxuICBpZFByb3BlcnR5OiBcInZhbklkXCIsXG4gIGZlYXR1cmVkUHJvcGVydGllczogW1wiZmlyc3ROYW1lXCIsIFwibGFzdE5hbWVcIiwgXCJlbWFpbFwiLCBcInBob25lTnVtYmVyXCJdLFxufSk7XG5cbi8vIEV2ZW50IHNjaGVtYVxuY29uc3QgRXZlbnRTY2hlbWEgPSBjb2RhLm1ha2VPYmplY3RTY2hlbWEoe1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgZXZlbnRJZDoge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuTnVtYmVyLFxuICAgICAgZGVzY3JpcHRpb246IFwiVGhlIHVuaXF1ZSBpZGVudGlmaWVyIGZvciB0aGUgZXZlbnQgaW4gRXZlcnlBY3Rpb25cIixcbiAgICB9LFxuICAgIG5hbWU6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkV2ZW50IG5hbWVcIixcbiAgICB9LFxuICAgIHNob3J0TmFtZToge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgZGVzY3JpcHRpb246IFwiRXZlbnQgc2hvcnQgbmFtZVwiLFxuICAgIH0sXG4gICAgZGVzY3JpcHRpb246IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkV2ZW50IGRlc2NyaXB0aW9uXCIsXG4gICAgfSxcbiAgICBldmVudFR5cGU6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlR5cGUgb2YgZXZlbnQgKGUuZy4sIEZ1bmRyYWlzZXIsIFRyYWluaW5nLCBldGMuKVwiLFxuICAgIH0sXG4gICAgc3RhcnREYXRlOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBjb2RhVHlwZTogY29kYS5WYWx1ZUhpbnRUeXBlLkRhdGVUaW1lLFxuICAgICAgZGVzY3JpcHRpb246IFwiRXZlbnQgc3RhcnQgZGF0ZSBhbmQgdGltZVwiLFxuICAgIH0sXG4gICAgZW5kRGF0ZToge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgY29kYVR5cGU6IGNvZGEuVmFsdWVIaW50VHlwZS5EYXRlVGltZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkV2ZW50IGVuZCBkYXRlIGFuZCB0aW1lXCIsXG4gICAgfSxcbiAgICBwdWJsaWNXZWJzaXRlVXJsOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBjb2RhVHlwZTogY29kYS5WYWx1ZUhpbnRUeXBlLlVybCxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlB1YmxpYyB3ZWJzaXRlIFVSTCBmb3IgdGhlIGV2ZW50XCIsXG4gICAgfSxcbiAgICB2b3RlclJlZ2lzdHJhdGlvbkJhdGNoZXM6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLkFycmF5LFxuICAgICAgaXRlbXM6IHsgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nIH0sXG4gICAgICBkZXNjcmlwdGlvbjogXCJWb3RlciByZWdpc3RyYXRpb24gYmF0Y2ggSURzXCIsXG4gICAgfSxcbiAgICBub3Rlczoge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgZGVzY3JpcHRpb246IFwiRXZlbnQgbm90ZXNcIixcbiAgICB9LFxuICAgIGRhdGVDcmVhdGVkOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBjb2RhVHlwZTogY29kYS5WYWx1ZUhpbnRUeXBlLkRhdGVUaW1lLFxuICAgICAgZGVzY3JpcHRpb246IFwiRGF0ZSB0aGUgZXZlbnQgd2FzIGNyZWF0ZWRcIixcbiAgICB9LFxuICAgIGRhdGVNb2RpZmllZDoge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgY29kYVR5cGU6IGNvZGEuVmFsdWVIaW50VHlwZS5EYXRlVGltZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkRhdGUgdGhlIGV2ZW50IHdhcyBsYXN0IG1vZGlmaWVkXCIsXG4gICAgfSxcbiAgfSxcbiAgZGlzcGxheVByb3BlcnR5OiBcIm5hbWVcIixcbiAgaWRQcm9wZXJ0eTogXCJldmVudElkXCIsXG4gIGZlYXR1cmVkUHJvcGVydGllczogW1wibmFtZVwiLCBcImV2ZW50VHlwZVwiLCBcInN0YXJ0RGF0ZVwiLCBcImVuZERhdGVcIl0sXG59KTtcblxuLy8gRXZlbnRTaWdudXAgc2NoZW1hXG5jb25zdCBFdmVudFNpZ251cFNjaGVtYSA9IGNvZGEubWFrZU9iamVjdFNjaGVtYSh7XG4gIHByb3BlcnRpZXM6IHtcbiAgICBldmVudFNpZ251cElkOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5OdW1iZXIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJUaGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHRoZSBldmVudCBzaWdudXBcIixcbiAgICB9LFxuICAgIHBlcnNvblZhbklkOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5OdW1iZXIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJWQU4gSUQgb2YgdGhlIHBlcnNvbiBzaWduZWQgdXBcIixcbiAgICB9LFxuICAgIHBlcnNvbk5hbWU6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk5hbWUgb2YgdGhlIHBlcnNvbiBzaWduZWQgdXBcIixcbiAgICB9LFxuICAgIGV2ZW50SWQ6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLk51bWJlcixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIklEIG9mIHRoZSBldmVudFwiLFxuICAgIH0sXG4gICAgZXZlbnROYW1lOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBkZXNjcmlwdGlvbjogXCJOYW1lIG9mIHRoZSBldmVudFwiLFxuICAgIH0sXG4gICAgc3RhdHVzOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBkZXNjcmlwdGlvbjogXCJTaWdudXAgc3RhdHVzIChJbnZpdGVkLCBTY2hlZHVsZWQsIENvbmZpcm1lZCwgQ29tcGxldGVkLCBEZWNsaW5lZCwgTm8gU2hvdywgZXRjLilcIixcbiAgICB9LFxuICAgIHJvbGU6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlJvbGUgZm9yIHRoaXMgc2lnbnVwXCIsXG4gICAgfSxcbiAgICByb2xlSWQ6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLk51bWJlcixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlJvbGUgSUQgZm9yIHRoaXMgc2lnbnVwXCIsXG4gICAgfSxcbiAgICBzaGlmdDoge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgZGVzY3JpcHRpb246IFwiU2hpZnQgZm9yIHRoaXMgc2lnbnVwXCIsXG4gICAgfSxcbiAgICBldmVudFNoaWZ0SWQ6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLk51bWJlcixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNoaWZ0IElEIGZvciB0aGlzIHNpZ251cFwiLFxuICAgIH0sXG4gICAgc3RhcnRUaW1lOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBjb2RhVHlwZTogY29kYS5WYWx1ZUhpbnRUeXBlLkRhdGVUaW1lLFxuICAgICAgZGVzY3JpcHRpb246IFwiU2lnbnVwIHN0YXJ0IHRpbWVcIixcbiAgICB9LFxuICAgIGVuZFRpbWU6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGNvZGFUeXBlOiBjb2RhLlZhbHVlSGludFR5cGUuRGF0ZVRpbWUsXG4gICAgICBkZXNjcmlwdGlvbjogXCJTaWdudXAgZW5kIHRpbWVcIixcbiAgICB9LFxuICAgIGxvY2F0aW9uOiB7XG4gICAgICB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsXG4gICAgICBkZXNjcmlwdGlvbjogXCJMb2NhdGlvbiBmb3IgdGhpcyBzaWdudXAgKGlmIG11bHRpLWxvY2F0aW9uIGV2ZW50KVwiLFxuICAgIH0sXG4gICAgZGF0ZUNyZWF0ZWQ6IHtcbiAgICAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgIGNvZGFUeXBlOiBjb2RhLlZhbHVlSGludFR5cGUuRGF0ZVRpbWUsXG4gICAgICBkZXNjcmlwdGlvbjogXCJEYXRlIHRoZSBzaWdudXAgd2FzIGNyZWF0ZWRcIixcbiAgICB9LFxuICAgIGRhdGVNb2RpZmllZDoge1xuICAgICAgdHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICAgICAgY29kYVR5cGU6IGNvZGEuVmFsdWVIaW50VHlwZS5EYXRlVGltZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkRhdGUgdGhlIHNpZ251cCB3YXMgbGFzdCBtb2RpZmllZFwiLFxuICAgIH0sXG4gIH0sXG4gIGRpc3BsYXlQcm9wZXJ0eTogXCJwZXJzb25OYW1lXCIsXG4gIGlkUHJvcGVydHk6IFwiZXZlbnRTaWdudXBJZFwiLFxuICBmZWF0dXJlZFByb3BlcnRpZXM6IFtcInBlcnNvbk5hbWVcIiwgXCJldmVudE5hbWVcIiwgXCJzdGF0dXNcIiwgXCJyb2xlXCIsIFwic2hpZnRcIl0sXG59KTtcblxuLy8gR2V0IENvbnRhY3QgZm9ybXVsYVxucGFjay5hZGRGb3JtdWxhKHtcbiAgbmFtZTogXCJHZXRDb250YWN0XCIsXG4gIGRlc2NyaXB0aW9uOiBcIlJldHJpZXZlIGEgY29udGFjdCBmcm9tIEV2ZXJ5QWN0aW9uIGJ5IFZBTiBJRFwiLFxuICBwYXJhbWV0ZXJzOiBbXG4gICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5OdW1iZXIsXG4gICAgICBuYW1lOiBcInZhbklkXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJUaGUgVkFOIElEIG9mIHRoZSBjb250YWN0IHRvIHJldHJpZXZlXCIsXG4gICAgfSksXG4gIF0sXG4gIHJlc3VsdFR5cGU6IGNvZGEuVmFsdWVUeXBlLk9iamVjdCxcbiAgc2NoZW1hOiBDb250YWN0U2NoZW1hLFxuICBleGVjdXRlOiBhc3luYyBmdW5jdGlvbiAoW3ZhbklkXSwgY29udGV4dCkge1xuICAgIGNvbnN0IEJBU0VfVVJMID0gXCJodHRwczovL2FwaS5zZWN1cmV2YW4uY29tL3Y0XCI7XG4gICAgY29uc3QgZW5jb2RlZFVybCA9IGAke0JBU0VfVVJMfS9wZW9wbGUvJHt2YW5JZH0/JTI0ZXhwYW5kPWVtYWlscyxwaG9uZXMsYWRkcmVzc2VzYDtcbiAgICAvLyBMb2cgdGhlIFVSTCB1c2luZyB0aGUgc2FtZSBsb2dpYyBhcyB0aGUgcmV0dXJuZWQgb2JqZWN0XG4gICAgY29uc29sZS5sb2coeyB1cmw6IGVuY29kZWRVcmwgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaCh7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB1cmw6IGVuY29kZWRVcmwsXG4gICAgfSk7XG4gICAgY29uc3QgY29udGFjdCA9IHJlc3BvbnNlLmJvZHk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbklkOiBjb250YWN0LnZhbklkLFxuICAgICAgZmlyc3ROYW1lOiBjb250YWN0LmZpcnN0TmFtZSxcbiAgICAgIGxhc3ROYW1lOiBjb250YWN0Lmxhc3ROYW1lLFxuICAgICAgZW1haWw6IGNvbnRhY3QuZW1haWxzPy5bMF0/LmVtYWlsLFxuICAgIH07XG4gIH0sXG59KTtcblxuLy8gQ3JlYXRlIENvbnRhY3QgZm9ybXVsYVxucGFjay5hZGRGb3JtdWxhKHtcbiAgbmFtZTogXCJDcmVhdGVDb250YWN0XCIsXG4gIGRlc2NyaXB0aW9uOiBcIkNyZWF0ZSBhIG5ldyBjb250YWN0IGluIEV2ZXJ5QWN0aW9uXCIsXG4gIHBhcmFtZXRlcnM6IFtcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgIG5hbWU6IFwiZmlyc3ROYW1lXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJDb250YWN0J3MgZmlyc3QgbmFtZVwiLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgbmFtZTogXCJsYXN0TmFtZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiQ29udGFjdCdzIGxhc3QgbmFtZVwiLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgbmFtZTogXCJlbWFpbFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiQ29udGFjdCdzIGVtYWlsIGFkZHJlc3NcIixcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgIH0pLFxuICBdLFxuICByZXN1bHRUeXBlOiBjb2RhLlZhbHVlVHlwZS5OdW1iZXIsXG4gIGV4ZWN1dGU6IGFzeW5jIGZ1bmN0aW9uIChbZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWxdLCBjb250ZXh0KSB7XG4gICAgY29uc3QgY29udGFjdERhdGEgPSB7XG4gICAgICBmaXJzdE5hbWUsXG4gICAgICBsYXN0TmFtZSxcbiAgICAgIGVtYWlsczogZW1haWwgPyBbeyBlbWFpbCwgdHlwZTogXCJQXCIgfV0gOiBbXSxcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IFwiaHR0cHM6Ly9hcGkuc2VjdXJldmFuLmNvbS92NC9wZW9wbGVcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdERhdGEpLFxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiByZXNwb25zZS5ib2R5OyAvLyBSZXR1cm5zIHRoZSBuZXcgVkFOIElEXG4gIH0sXG59KTtcblxuLy8gQ3JlYXRlIEV2ZW50IGZvcm11bGFcbnBhY2suYWRkRm9ybXVsYSh7XG4gIG5hbWU6IFwiQ3JlYXRlRXZlbnRcIixcbiAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIGEgbmV3IGV2ZW50IGluIEV2ZXJ5QWN0aW9uXCIsXG4gIHBhcmFtZXRlcnM6IFtcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgIG5hbWU6IFwibmFtZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiRXZlbnQgbmFtZVwiLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgbmFtZTogXCJzdGFydERhdGVcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkV2ZW50IHN0YXJ0IGRhdGUgYW5kIHRpbWUgKElTTyA4NjAxIGZvcm1hdCwgZS5nLiwgMjAxNS0wNi0wMlQxNTowMDowMC0wNDowMClcIixcbiAgICB9KSxcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgIG5hbWU6IFwiZW5kRGF0ZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiRXZlbnQgZW5kIGRhdGUgYW5kIHRpbWUgKElTTyA4NjAxIGZvcm1hdCwgZS5nLiwgMjAxNS0wNi0wMlQyMDowMDowMC0wNDowMClcIixcbiAgICB9KSxcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLk51bWJlcixcbiAgICAgIG5hbWU6IFwiZXZlbnRUeXBlSWRcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkV2ZW50IHR5cGUgSUQgKHJlcXVpcmVkKVwiLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgbmFtZTogXCJzaG9ydE5hbWVcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkV2ZW50IHNob3J0IG5hbWVcIixcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgbmFtZTogXCJkZXNjcmlwdGlvblwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiRXZlbnQgZGVzY3JpcHRpb25cIixcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuTnVtYmVyLFxuICAgICAgbmFtZTogXCJsb2NhdGlvbklkXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJMb2NhdGlvbiBJRCBmb3IgdGhlIGV2ZW50XCIsXG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLkJvb2xlYW4sXG4gICAgICBuYW1lOiBcImlzT25seUVkaXRhYmxlQnlDcmVhdGluZ1VzZXJcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIldoZXRoZXIgb25seSB0aGUgY3JlYXRpbmcgdXNlciBjYW4gZWRpdCB0aGlzIGV2ZW50IChkZWZhdWx0OiBmYWxzZSlcIixcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuTnVtYmVyLFxuICAgICAgbmFtZTogXCJyb2xlSWRcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlJvbGUgSUQgZm9yIGV2ZW50IHZvbHVudGVlcnMgKHJlcXVpcmVkIC0gZ2V0IGZyb20gRXZlcnlBY3Rpb24gYWRtaW4pXCIsXG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgIG5hbWU6IFwicm9sZU5hbWVcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlJvbGUgbmFtZSAoZS5nLiwgJ0hvc3QnLCAnVm9sdW50ZWVyJylcIixcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuQm9vbGVhbixcbiAgICAgIG5hbWU6IFwiaXNFdmVudExlYWRcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIldoZXRoZXIgdGhpcyByb2xlIGlzIGFuIGV2ZW50IGxlYWQgKGRlZmF1bHQ6IGZhbHNlKVwiLFxuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgfSksXG4gICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5TdHJpbmcsXG4gICAgICBuYW1lOiBcInNoaWZ0TmFtZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiU2hpZnQgbmFtZSAoZS5nLiwgJ1NldHVwJywgJ01haW4gRXZlbnQnLCAnQ2xlYW51cCcpXCIsXG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgIG5hbWU6IFwic2hpZnRTdGFydFRpbWVcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNoaWZ0IHN0YXJ0IGRhdGUgYW5kIHRpbWUgKElTTyA4NjAxIGZvcm1hdCwgZS5nLiwgJzIwMTUtMDYtMDFUMTU6MDA6MDAtMDQ6MDAnKVwiLFxuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgfSksXG4gICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5TdHJpbmcsXG4gICAgICBuYW1lOiBcInNoaWZ0RW5kVGltZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiU2hpZnQgZW5kIGRhdGUgYW5kIHRpbWUgKElTTyA4NjAxIGZvcm1hdCwgZS5nLiwgJzIwMTUtMDYtMDFUMjA6MDA6MDAtMDQ6MDAnKVwiLFxuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIHJlc3VsdFR5cGU6IGNvZGEuVmFsdWVUeXBlLk51bWJlcixcbiAgZXhlY3V0ZTogYXN5bmMgZnVuY3Rpb24gKFtuYW1lLCBzdGFydERhdGUsIGVuZERhdGUsIGV2ZW50VHlwZUlkLCBzaG9ydE5hbWUsIGRlc2NyaXB0aW9uLCBsb2NhdGlvbklkLCBpc09ubHlFZGl0YWJsZUJ5Q3JlYXRpbmdVc2VyLCByb2xlSWQsIHJvbGVOYW1lLCBpc0V2ZW50TGVhZCwgc2hpZnROYW1lLCBzaGlmdFN0YXJ0VGltZSwgc2hpZnRFbmRUaW1lXSwgY29udGV4dCkge1xuICAgIGNvbnN0IGV2ZW50RGF0YTogYW55ID0ge1xuICAgICAgbmFtZSxcbiAgICAgIHN0YXJ0RGF0ZSxcbiAgICAgIGVuZERhdGUsXG4gICAgICBldmVudFR5cGU6IHtcbiAgICAgICAgZXZlbnRUeXBlSWQsXG4gICAgICB9LFxuICAgICAgaXNPbmx5RWRpdGFibGVCeUNyZWF0aW5nVXNlcjogaXNPbmx5RWRpdGFibGVCeUNyZWF0aW5nVXNlciB8fCBmYWxzZSxcbiAgICAgIHJvbGVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICByb2xlSWQ6IHJvbGVJZCB8fCAxLCAvLyBEZWZhdWx0IHJvbGUgSUQgaWYgbm90IHByb3ZpZGVkXG4gICAgICAgICAgbmFtZTogcm9sZU5hbWUgfHwgXCJWb2x1bnRlZXJcIiwgLy8gRGVmYXVsdCByb2xlIG5hbWVcbiAgICAgICAgICBpc0V2ZW50TGVhZDogaXNFdmVudExlYWQgfHwgZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgc2hpZnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBzaGlmdE5hbWUgfHwgXCJNYWluIEV2ZW50XCIsXG4gICAgICAgICAgc3RhcnRUaW1lOiBzaGlmdFN0YXJ0VGltZSB8fCBzdGFydERhdGUsXG4gICAgICAgICAgZW5kVGltZTogc2hpZnRFbmRUaW1lIHx8IGVuZERhdGUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICBpZiAoc2hvcnROYW1lKSB7XG4gICAgICBldmVudERhdGEuc2hvcnROYW1lID0gc2hvcnROYW1lO1xuICAgIH1cblxuICAgIGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgZXZlbnREYXRhLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgaWYgKGxvY2F0aW9uSWQpIHtcbiAgICAgIGV2ZW50RGF0YS5sb2NhdGlvbnMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBsb2NhdGlvbklkLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICB9XG5cbiAgICAvLyBMb2cgdGhlIHJlcXVlc3QgYm9keSBmb3IgZGVidWdnaW5nXG4gICAgY29uc29sZS5sb2coeyBjcmVhdGVFdmVudFJlcXVlc3Q6IGV2ZW50RGF0YSB9KTtcblxuICAgIC8vIENyZWF0ZSB0aGUgZXZlbnQgKHdpdGggc2hpZnQgaW5jbHVkZWQpXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIHVybDogXCJodHRwczovL2FwaS5zZWN1cmV2YW4uY29tL3Y0L2V2ZW50c1wiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudERhdGEpLFxuICAgIH0pO1xuXG4gICAgLy8gRXh0cmFjdCBldmVudCBJRCBmcm9tIHRoZSBMb2NhdGlvbiBoZWFkZXIgKGUuZy4sIFwiaHR0cHM6Ly9hcGkuc2VjdXJldmFuLmNvbS92NC9ldmVudHMvNDUwODIzXCIpXG4gICAgY29uc3QgbG9jYXRpb25IZWFkZXIgPSByZXNwb25zZS5oZWFkZXJzPy5sb2NhdGlvbjtcbiAgICBpZiAoIWxvY2F0aW9uSGVhZGVyKSB7XG4gICAgICB0aHJvdyBuZXcgY29kYS5Vc2VyVmlzaWJsZUVycm9yKFwiTm8gTG9jYXRpb24gaGVhZGVyIGZvdW5kIGluIHJlc3BvbnNlXCIpO1xuICAgIH1cbiAgICBjb25zdCBsb2NhdGlvbiA9IEFycmF5LmlzQXJyYXkobG9jYXRpb25IZWFkZXIpID8gbG9jYXRpb25IZWFkZXJbMF0gOiBsb2NhdGlvbkhlYWRlcjtcbiAgICBjb25zdCBldmVudElkTWF0Y2ggPSBsb2NhdGlvbi5tYXRjaCgvXFwvZXZlbnRzXFwvKFxcZCspJC8pO1xuICAgIGlmICghZXZlbnRJZE1hdGNoKSB7XG4gICAgICB0aHJvdyBuZXcgY29kYS5Vc2VyVmlzaWJsZUVycm9yKFwiQ291bGQgbm90IGV4dHJhY3QgZXZlbnQgSUQgZnJvbSBMb2NhdGlvbiBoZWFkZXI6IFwiICsgbG9jYXRpb24pO1xuICAgIH1cbiAgICBjb25zdCBldmVudElkID0gcGFyc2VJbnQoZXZlbnRJZE1hdGNoWzFdLCAxMCk7XG5cbiAgICAvLyBPcHRpb25hbGx5LCBmZXRjaCB0aGUgZXZlbnQgdG8gZ2V0IHRoZSBldmVudFNoaWZ0SWQgKGZpcnN0IHNoaWZ0KVxuICAgIC8vIChVbmNvbW1lbnQgaWYgeW91IHdhbnQgdG8gcmV0dXJuIGV2ZW50U2hpZnRJZCBhcyB3ZWxsKVxuICAgIC8vIGNvbnN0IGV2ZW50UmVzcCA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaCh7XG4gICAgLy8gICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgLy8gICB1cmw6IGBodHRwczovL2FwaS5zZWN1cmV2YW4uY29tL3Y0L2V2ZW50cy8ke2V2ZW50SWR9YCxcbiAgICAvLyB9KTtcbiAgICAvLyBjb25zdCBldmVudCA9IGV2ZW50UmVzcC5ib2R5O1xuICAgIC8vIGNvbnN0IGV2ZW50U2hpZnRJZCA9IGV2ZW50LnNoaWZ0cz8uWzBdPy5ldmVudFNoaWZ0SWQ7XG4gICAgLy8gcmV0dXJuIHsgZXZlbnRJZCwgZXZlbnRTaGlmdElkIH07XG5cbiAgICAvLyBSZXR1cm4ganVzdCB0aGUgZXZlbnQgSURcbiAgICByZXR1cm4gZXZlbnRJZDtcbiAgfSxcbn0pO1xuXG4vLyBDcmVhdGUgRXZlbnRTaWdudXAgZm9ybXVsYVxucGFjay5hZGRGb3JtdWxhKHtcbiAgbmFtZTogXCJDcmVhdGVFdmVudFNpZ251cFwiLFxuICBkZXNjcmlwdGlvbjogXCJDcmVhdGUgYSBuZXcgZXZlbnQgc2lnbnVwIGluIEV2ZXJ5QWN0aW9uXCIsXG4gIHBhcmFtZXRlcnM6IFtcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLk51bWJlcixcbiAgICAgIG5hbWU6IFwidmFuSWRcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlZBTiBJRCBvZiB0aGUgcGVyc29uIHRvIHNpZ24gdXBcIixcbiAgICB9KSxcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLk51bWJlcixcbiAgICAgIG5hbWU6IFwiZXZlbnRJZFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiSUQgb2YgdGhlIGV2ZW50IHRvIHNpZ24gdXAgZm9yXCIsXG4gICAgfSksXG4gICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5OdW1iZXIsXG4gICAgICBuYW1lOiBcInJvbGVJZFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiUm9sZSBJRCBmb3IgdGhlIHNpZ251cFwiLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuTnVtYmVyLFxuICAgICAgbmFtZTogXCJldmVudFNoaWZ0SWRcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNoaWZ0IElEIGZvciB0aGUgc2lnbnVwXCIsXG4gICAgfSksXG4gICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5TdHJpbmcsXG4gICAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgICAgZGVzY3JpcHRpb246IFwiU2lnbnVwIHN0YXR1cyAoZGVmYXVsdDogSW52aXRlZClcIixcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuTnVtYmVyLFxuICAgICAgbmFtZTogXCJsb2NhdGlvbklkXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJMb2NhdGlvbiBJRCAoZm9yIG11bHRpLWxvY2F0aW9uIGV2ZW50cylcIixcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgbmFtZTogXCJzdGFydFRpbWVcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlN0YXJ0IHRpbWUgKElTTyBmb3JtYXQgb3IgSEg6TU0pXCIsXG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICB9KSxcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgIG5hbWU6IFwiZW5kVGltZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiRW5kIHRpbWUgKElTTyBmb3JtYXQgb3IgSEg6TU0pXCIsXG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzdWx0VHlwZTogY29kYS5WYWx1ZVR5cGUuT2JqZWN0LFxuICBzY2hlbWE6IEV2ZW50U2lnbnVwU2NoZW1hLFxuICBleGVjdXRlOiBhc3luYyBmdW5jdGlvbiAoW3ZhbklkLCBldmVudElkLCByb2xlSWQsIGV2ZW50U2hpZnRJZCwgc3RhdHVzLCBsb2NhdGlvbklkLCBzdGFydFRpbWUsIGVuZFRpbWVdLCBjb250ZXh0KSB7XG4gICAgY29uc3Qgc2lnbnVwRGF0YTogYW55ID0ge1xuICAgICAgcGVyc29uOiB7XG4gICAgICAgIHZhbklkOiB2YW5JZCxcbiAgICAgIH0sXG4gICAgICBldmVudDoge1xuICAgICAgICBldmVudElkOiBldmVudElkLFxuICAgICAgfSxcbiAgICAgIHJvbGU6IHtcbiAgICAgICAgcm9sZUlkOiByb2xlSWQsXG4gICAgICB9LFxuICAgICAgc2hpZnQ6IHtcbiAgICAgICAgZXZlbnRTaGlmdElkOiBldmVudFNoaWZ0SWQsXG4gICAgICB9LFxuICAgICAgc3RhdHVzOiB7XG4gICAgICAgIHN0YXR1c0lkOiBzdGF0dXMgfHwgXCJJbnZpdGVkXCIsXG4gICAgICB9LFxuICAgIH07XG4gICAgXG4gICAgaWYgKGxvY2F0aW9uSWQpIHtcbiAgICAgIHNpZ251cERhdGEubG9jYXRpb24gPSB7XG4gICAgICAgIGxvY2F0aW9uSWQ6IGxvY2F0aW9uSWQsXG4gICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBpZiAoc3RhcnRUaW1lKSB7XG4gICAgICBzaWdudXBEYXRhLnN0YXJ0VGltZSA9IHN0YXJ0VGltZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGVuZFRpbWUpIHtcbiAgICAgIHNpZ251cERhdGEuZW5kVGltZSA9IGVuZFRpbWU7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICB1cmw6IFwiaHR0cHM6Ly9hcGkuc2VjdXJldmFuLmNvbS92NC9zaWdudXBzXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNpZ251cERhdGEpLFxuICAgIH0pO1xuICAgIFxuICAgIC8vIFRoZSBBUEkgcmV0dXJucyB0aGUgZXZlbnRTaWdudXBJZFxuICAgIGNvbnN0IGV2ZW50U2lnbnVwSWQgPSByZXNwb25zZS5ib2R5O1xuICAgIFxuICAgIC8vIEZldGNoIHRoZSBjcmVhdGVkIHNpZ251cCB0byByZXR1cm4gZnVsbCBkZXRhaWxzXG4gICAgY29uc3Qgc2lnbnVwUmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuc2VjdXJldmFuLmNvbS92NC9zaWdudXBzP2V2ZW50SWQ9JHtldmVudElkfSZ2YW5JZD0ke3ZhbklkfWAsXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3Qgc2lnbnVwcyA9IHNpZ251cFJlc3BvbnNlLmJvZHkuaXRlbXMgfHwgW107XG4gICAgY29uc3Qgc2lnbnVwID0gc2lnbnVwcy5maW5kKChzOiBhbnkpID0+IHMuZXZlbnRTaWdudXBJZCA9PT0gZXZlbnRTaWdudXBJZCk7XG4gICAgXG4gICAgaWYgKHNpZ251cCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZXZlbnRTaWdudXBJZDogc2lnbnVwLmV2ZW50U2lnbnVwSWQsXG4gICAgICAgIHBlcnNvblZhbklkOiBzaWdudXAucGVyc29uPy52YW5JZCxcbiAgICAgICAgcGVyc29uTmFtZTogYCR7c2lnbnVwLnBlcnNvbj8uZmlyc3ROYW1lfSAke3NpZ251cC5wZXJzb24/Lmxhc3ROYW1lfWAudHJpbSgpLFxuICAgICAgICBldmVudElkOiBzaWdudXAuZXZlbnQ/LmV2ZW50SWQsXG4gICAgICAgIGV2ZW50TmFtZTogc2lnbnVwLmV2ZW50Py5uYW1lLFxuICAgICAgICBzdGF0dXM6IHNpZ251cC5zdGF0dXM/Lm5hbWUsXG4gICAgICAgIHJvbGU6IHNpZ251cC5yb2xlPy5uYW1lLFxuICAgICAgICByb2xlSWQ6IHNpZ251cC5yb2xlPy5yb2xlSWQsXG4gICAgICAgIHNoaWZ0OiBzaWdudXAuc2hpZnQ/Lm5hbWUsXG4gICAgICAgIGV2ZW50U2hpZnRJZDogc2lnbnVwLnNoaWZ0Py5ldmVudFNoaWZ0SWQsXG4gICAgICAgIHN0YXJ0VGltZTogc2lnbnVwLnN0YXJ0VGltZSxcbiAgICAgICAgZW5kVGltZTogc2lnbnVwLmVuZFRpbWUsXG4gICAgICAgIGxvY2F0aW9uOiBzaWdudXAubG9jYXRpb24/Lm5hbWUsXG4gICAgICAgIGRhdGVDcmVhdGVkOiBzaWdudXAuZGF0ZUNyZWF0ZWQsXG4gICAgICAgIGRhdGVNb2RpZmllZDogc2lnbnVwLmRhdGVNb2RpZmllZCxcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIC8vIEZhbGxiYWNrIGlmIHdlIGNhbid0IGZldGNoIHRoZSBkZXRhaWxzXG4gICAgcmV0dXJuIHtcbiAgICAgIGV2ZW50U2lnbnVwSWQ6IGV2ZW50U2lnbnVwSWQsXG4gICAgICBwZXJzb25WYW5JZDogdmFuSWQsXG4gICAgICBwZXJzb25OYW1lOiBcIlVua25vd25cIixcbiAgICAgIGV2ZW50SWQ6IGV2ZW50SWQsXG4gICAgICBldmVudE5hbWU6IFwiVW5rbm93blwiLFxuICAgICAgc3RhdHVzOiBzdGF0dXMgfHwgXCJJbnZpdGVkXCIsXG4gICAgICByb2xlOiBcIlVua25vd25cIixcbiAgICAgIHJvbGVJZDogcm9sZUlkLFxuICAgICAgc2hpZnQ6IFwiVW5rbm93blwiLFxuICAgICAgZXZlbnRTaGlmdElkOiBldmVudFNoaWZ0SWQsXG4gICAgICBzdGFydFRpbWU6IHN0YXJ0VGltZSxcbiAgICAgIGVuZFRpbWU6IGVuZFRpbWUsXG4gICAgICBsb2NhdGlvbjogbG9jYXRpb25JZCA/IFwiVW5rbm93blwiIDogdW5kZWZpbmVkLFxuICAgICAgZGF0ZUNyZWF0ZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIGRhdGVNb2RpZmllZDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgIH07XG4gIH0sXG59KTtcblxuLy8gVXBkYXRlIEV2ZW50U2lnbnVwIGZvcm11bGFcbnBhY2suYWRkRm9ybXVsYSh7XG4gIG5hbWU6IFwiVXBkYXRlRXZlbnRTaWdudXBcIixcbiAgZGVzY3JpcHRpb246IFwiVXBkYXRlIGFuIGV4aXN0aW5nIGV2ZW50IHNpZ251cCBzdGF0dXMgaW4gRXZlcnlBY3Rpb25cIixcbiAgcGFyYW1ldGVyczogW1xuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuTnVtYmVyLFxuICAgICAgbmFtZTogXCJldmVudFNpZ251cElkXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJJRCBvZiB0aGUgZXZlbnQgc2lnbnVwIHRvIHVwZGF0ZVwiLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuTnVtYmVyLFxuICAgICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIk5ldyBzaWdudXAgc3RhdHVzIElEXCIsXG4gICAgfSksXG4gIF0sXG4gIHJlc3VsdFR5cGU6IGNvZGEuVmFsdWVUeXBlLk9iamVjdCxcbiAgc2NoZW1hOiBFdmVudFNpZ251cFNjaGVtYSxcbiAgZXhlY3V0ZTogYXN5bmMgZnVuY3Rpb24gKFtldmVudFNpZ251cElkLCBzdGF0dXNdLCBjb250ZXh0KSB7XG4gICAgLy8gTG9nIGlucHV0IHBhcmFtZXRlcnNcbiAgICBjb25zb2xlLmxvZyh7IFxuICAgICAgdXBkYXRlRXZlbnRTaWdudXBJbnB1dDogeyBcbiAgICAgICAgZXZlbnRTaWdudXBJZCwgc3RhdHVzXG4gICAgICB9IFxuICAgIH0pO1xuICAgIFxuICAgIC8vIEZldGNoIHRoZSBleGlzdGluZyBzaWdudXAgdG8gZ2V0IHJlcXVpcmVkIGZpZWxkc1xuICAgIGNvbnN0IGdldFJlc3AgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgdXJsOiBgaHR0cHM6Ly9hcGkuc2VjdXJldmFuLmNvbS92NC9zaWdudXBzLyR7ZXZlbnRTaWdudXBJZH1gLFxuICAgIH0pO1xuICAgIFxuICAgIC8vIExvZyB0aGUgR0VUIHJlc3BvbnNlXG4gICAgY29uc29sZS5sb2coeyBcbiAgICAgIGdldFNpZ251cFJlc3BvbnNlOiB7IFxuICAgICAgICBzdGF0dXM6IGdldFJlc3Auc3RhdHVzLCBcbiAgICAgICAgYm9keTogZ2V0UmVzcC5ib2R5IFxuICAgICAgfSBcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBleGlzdGluZyA9IGdldFJlc3AuYm9keTtcbiAgICBpZiAoIWV4aXN0aW5nIHx8ICFleGlzdGluZy5ldmVudFNpZ251cElkKSB7XG4gICAgICB0aHJvdyBuZXcgY29kYS5Vc2VyVmlzaWJsZUVycm9yKFwiQ291bGQgbm90IHJldHJpZXZlIGV4aXN0aW5nIHNpZ251cCBkZXRhaWxzIGZvciB1cGRhdGUuXCIpO1xuICAgIH1cbiAgICBcbiAgICAvLyBMb2cgdGhlIGV4aXN0aW5nIHNpZ251cCBkYXRhIHN0cnVjdHVyZSAoc2FmZWx5KVxuICAgIGNvbnNvbGUubG9nKHsgXG4gICAgICBleGlzdGluZ1NpZ251cERhdGFLZXlzOiBPYmplY3Qua2V5cyhleGlzdGluZyB8fCB7fSksXG4gICAgICBoYXNFdmVudFNpZ251cElkOiAhIWV4aXN0aW5nPy5ldmVudFNpZ251cElkLFxuICAgICAgaGFzUGVyc29uOiAhIWV4aXN0aW5nPy5wZXJzb24sXG4gICAgICBoYXNFdmVudDogISFleGlzdGluZz8uZXZlbnQsXG4gICAgICBoYXNSb2xlOiAhIWV4aXN0aW5nPy5yb2xlLFxuICAgICAgaGFzU2hpZnQ6ICEhZXhpc3Rpbmc/LnNoaWZ0LFxuICAgICAgaGFzU3RhdHVzOiAhIWV4aXN0aW5nPy5zdGF0dXNcbiAgICB9KTtcbiAgICBcbiAgICAvLyBCdWlsZCBtaW5pbWFsIHVwZGF0ZSBkYXRhIHdpdGggb25seSB0aGUgY29yZSByZXF1aXJlZCBmaWVsZHNcbiAgICBjb25zdCB1cGRhdGVEYXRhOiBhbnkgPSB7XG4gICAgICBldmVudFNpZ251cElkOiBleGlzdGluZy5ldmVudFNpZ251cElkLFxuICAgICAgcGVyc29uOiB7IHZhbklkOiBleGlzdGluZy5wZXJzb24/LnZhbklkIH0sXG4gICAgICBldmVudDogeyBldmVudElkOiBleGlzdGluZy5ldmVudD8uZXZlbnRJZCB9LFxuICAgICAgc2hpZnQ6IHsgZXZlbnRTaGlmdElkOiBleGlzdGluZy5zaGlmdD8uZXZlbnRTaGlmdElkIH0sXG4gICAgICByb2xlOiB7IHJvbGVJZDogZXhpc3Rpbmcucm9sZT8ucm9sZUlkIH0sXG4gICAgICBzdGF0dXM6IHsgc3RhdHVzSWQ6IHN0YXR1cyB8fCBleGlzdGluZy5zdGF0dXM/LnN0YXR1c0lkIH0sXG4gICAgfTtcbiAgICBcbiAgICAvLyBJbmNsdWRlIGxvY2F0aW9uIGlmIGl0IGV4aXN0c1xuICAgIGlmIChleGlzdGluZy5sb2NhdGlvbj8ubG9jYXRpb25JZCkge1xuICAgICAgdXBkYXRlRGF0YS5sb2NhdGlvbiA9IHsgbG9jYXRpb25JZDogZXhpc3RpbmcubG9jYXRpb24ubG9jYXRpb25JZCB9O1xuICAgIH1cbiAgICBcbiAgICAvLyBMb2cgdGhlIHVwZGF0ZSByZXF1ZXN0IGZvciBkZWJ1Z2dpbmdcbiAgICBjb25zb2xlLmxvZyh7IHVwZGF0ZUV2ZW50U2lnbnVwUmVxdWVzdDogdXBkYXRlRGF0YSB9KTtcbiAgICBcbiAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaCh7XG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICB1cmw6IGBodHRwczovL2FwaS5zZWN1cmV2YW4uY29tL3Y0L3NpZ251cHMvJHtldmVudFNpZ251cElkfWAsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1cGRhdGVEYXRhKSxcbiAgICB9KTtcbiAgICBcbiAgICAvLyBMb2cgdGhlIHJlc3BvbnNlIGZvciBkZWJ1Z2dpbmdcbiAgICBjb25zb2xlLmxvZyh7IFxuICAgICAgdXBkYXRlRXZlbnRTaWdudXBSZXNwb25zZToge1xuICAgICAgICBzdGF0dXM6IHVwZGF0ZVJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgaGFzQm9keTogISF1cGRhdGVSZXNwb25zZS5ib2R5LFxuICAgICAgICBib2R5OiB1cGRhdGVSZXNwb25zZS5ib2R5IHx8IFwiTm8gcmVzcG9uc2UgYm9keVwiXG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gUmV0dXJuIHVwZGF0ZWQgaW5mbyAoYmVzdCBlZmZvcnQpXG4gICAgcmV0dXJuIHtcbiAgICAgIGV2ZW50U2lnbnVwSWQsXG4gICAgICBwZXJzb25WYW5JZDogZXhpc3RpbmcucGVyc29uPy52YW5JZCxcbiAgICAgIHBlcnNvbk5hbWU6IGAke2V4aXN0aW5nLnBlcnNvbj8uZmlyc3ROYW1lfSAke2V4aXN0aW5nLnBlcnNvbj8ubGFzdE5hbWV9YC50cmltKCksXG4gICAgICBldmVudElkOiBleGlzdGluZy5ldmVudD8uZXZlbnRJZCxcbiAgICAgIGV2ZW50TmFtZTogZXhpc3RpbmcuZXZlbnQ/Lm5hbWUsXG4gICAgICBzdGF0dXM6IHN0YXR1cyB8fCBleGlzdGluZy5zdGF0dXM/Lm5hbWUsXG4gICAgICByb2xlOiBleGlzdGluZy5yb2xlPy5uYW1lLFxuICAgICAgcm9sZUlkOiBleGlzdGluZy5yb2xlPy5yb2xlSWQsXG4gICAgICBzaGlmdDogZXhpc3Rpbmcuc2hpZnQ/Lm5hbWUsXG4gICAgICBldmVudFNoaWZ0SWQ6IGV4aXN0aW5nLnNoaWZ0Py5ldmVudFNoaWZ0SWQsXG4gICAgICBzdGFydFRpbWU6IGV4aXN0aW5nLnN0YXJ0VGltZSxcbiAgICAgIGVuZFRpbWU6IGV4aXN0aW5nLmVuZFRpbWUsXG4gICAgICBsb2NhdGlvbjogZXhpc3RpbmcubG9jYXRpb24/Lm5hbWUsXG4gICAgICBkYXRlQ3JlYXRlZDogZXhpc3RpbmcuZGF0ZUNyZWF0ZWQsXG4gICAgICBkYXRlTW9kaWZpZWQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICB9O1xuICB9LFxufSk7XG5cbi8vIERlbGV0ZSBFdmVudFNpZ251cCBmb3JtdWxhICBcbnBhY2suYWRkRm9ybXVsYSh7XG4gIG5hbWU6IFwiRGVsZXRlRXZlbnRTaWdudXBcIixcbiAgZGVzY3JpcHRpb246IFwiRGVsZXRlIGFuIGV2ZW50IHNpZ251cCBmcm9tIEV2ZXJ5QWN0aW9uXCIsXG4gIHBhcmFtZXRlcnM6IFtcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLk51bWJlcixcbiAgICAgIG5hbWU6IFwiZXZlbnRTaWdudXBJZFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiSUQgb2YgdGhlIGV2ZW50IHNpZ251cCB0byBkZWxldGVcIixcbiAgICB9KSxcbiAgXSxcbiAgcmVzdWx0VHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICBleGVjdXRlOiBhc3luYyBmdW5jdGlvbiAoW2V2ZW50U2lnbnVwSWRdLCBjb250ZXh0KSB7XG4gICAgYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHtcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIHVybDogYGh0dHBzOi8vYXBpLnNlY3VyZXZhbi5jb20vdjQvc2lnbnVwcy8ke2V2ZW50U2lnbnVwSWR9YCxcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gYEV2ZW50IHNpZ251cCAke2V2ZW50U2lnbnVwSWR9IGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5YDtcbiAgfSxcbn0pO1xuXG4vLyBDb250YWN0cyBzeW5jIHRhYmxlXG5wYWNrLmFkZFN5bmNUYWJsZSh7XG4gIG5hbWU6IFwiQ29udGFjdHNcIixcbiAgZGVzY3JpcHRpb246IFwiU3luYyBjb250YWN0cyBmcm9tIEV2ZXJ5QWN0aW9uXCIsXG4gIGlkZW50aXR5TmFtZTogXCJDb250YWN0XCIsXG4gIHNjaGVtYTogQ29udGFjdFNjaGVtYSxcbiAgZm9ybXVsYToge1xuICAgIG5hbWU6IFwiU3luY0NvbnRhY3RzXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU3luYyBjb250YWN0cyBmcm9tIEV2ZXJ5QWN0aW9uXCIsXG4gICAgcGFyYW1ldGVyczogW1xuICAgICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgICAgbmFtZTogXCJmaXJzdE5hbWVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRmlsdGVyIGJ5IGZpcnN0IG5hbWUgKHJlcXVpcmVkIC0gbWF0Y2hlcyBjb250YWN0cyB3aXRoIGZpcnN0IG5hbWVzIHN0YXJ0aW5nIHdpdGggdGhpcyB2YWx1ZSlcIixcbiAgICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgfSksXG4gICAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgICBuYW1lOiBcImxhc3ROYW1lXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkZpbHRlciBieSBsYXN0IG5hbWUgKG9wdGlvbmFsKVwiLFxuICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgICAgbmFtZTogXCJlbWFpbFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJGaWx0ZXIgYnkgZW1haWwgKG9wdGlvbmFsIC0gbWF0Y2hlcyBlbWFpbHMgc3RhcnRpbmcgd2l0aCB0aGlzIHZhbHVlKVwiLFxuICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgICAgbmFtZTogXCJwaG9uZU51bWJlclwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJGaWx0ZXIgYnkgcGhvbmUgbnVtYmVyIChvcHRpb25hbClcIixcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5TdHJpbmcsXG4gICAgICAgIG5hbWU6IFwiY2l0eVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJGaWx0ZXIgYnkgY2l0eSAob3B0aW9uYWwpXCIsXG4gICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgfSksXG4gICAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgICBuYW1lOiBcInN0YXRlT3JQcm92aW5jZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJGaWx0ZXIgYnkgc3RhdGUgb3IgcHJvdmluY2UgY29kZSAob3B0aW9uYWwpXCIsXG4gICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgfSksXG4gICAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgICBuYW1lOiBcInppcE9yUG9zdGFsQ29kZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJGaWx0ZXIgYnkgWklQIG9yIHBvc3RhbCBjb2RlIChvcHRpb25hbClcIixcbiAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5TdHJpbmcsXG4gICAgICAgIG5hbWU6IFwiY29udGFjdE1vZGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRmlsdGVyIGJ5IGNvbnRhY3QgbW9kZSAoSW5kaXZpZHVhbCwgT3JnYW5pemF0aW9uLCBldGMuKSAob3B0aW9uYWwpXCIsXG4gICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgICBleGVjdXRlOiBhc3luYyBmdW5jdGlvbiAoW2ZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBwaG9uZU51bWJlciwgY2l0eSwgc3RhdGVPclByb3ZpbmNlLCB6aXBPclBvc3RhbENvZGUsIGNvbnRhY3RNb2RlXSwgY29udGV4dCkge1xuICAgICAgbGV0IHVybCA9IFwiaHR0cHM6Ly9hcGkuc2VjdXJldmFuLmNvbS92NC9wZW9wbGVcIjtcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gW107XG4gICAgICBcbiAgICAgIC8vIGZpcnN0TmFtZSBpcyByZXF1aXJlZFxuICAgICAgaWYgKGZpcnN0TmFtZSkge1xuICAgICAgICBxdWVyeVBhcmFtcy5wdXNoKGBmaXJzdE5hbWU9JHtlbmNvZGVVUklDb21wb25lbnQoZmlyc3ROYW1lKX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGxhc3ROYW1lKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYGxhc3ROYW1lPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGxhc3ROYW1lKX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGVtYWlsKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYGVtYWlsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGVtYWlsKX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHBob25lTnVtYmVyKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYHBob25lTnVtYmVyPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHBob25lTnVtYmVyKX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGNpdHkpIHtcbiAgICAgICAgcXVlcnlQYXJhbXMucHVzaChgY2l0eT0ke2VuY29kZVVSSUNvbXBvbmVudChjaXR5KX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHN0YXRlT3JQcm92aW5jZSkge1xuICAgICAgICBxdWVyeVBhcmFtcy5wdXNoKGBzdGF0ZU9yUHJvdmluY2U9JHtlbmNvZGVVUklDb21wb25lbnQoc3RhdGVPclByb3ZpbmNlKX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHppcE9yUG9zdGFsQ29kZSkge1xuICAgICAgICBxdWVyeVBhcmFtcy5wdXNoKGB6aXBPclBvc3RhbENvZGU9JHtlbmNvZGVVUklDb21wb25lbnQoemlwT3JQb3N0YWxDb2RlKX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGNvbnRhY3RNb2RlKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYGNvbnRhY3RNb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNvbnRhY3RNb2RlKX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQWRkIHBhZ2luYXRpb25cbiAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goXCIkdG9wPTUwXCIpO1xuICAgICAgaWYgKGNvbnRleHQuc3luYy5jb250aW51YXRpb24pIHtcbiAgICAgICAgcXVlcnlQYXJhbXMucHVzaChgJHNraXA9JHtjb250ZXh0LnN5bmMuY29udGludWF0aW9uLnNraXB9YCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEFkZCBleHBhbnNpb24gZm9yIGFkZGl0aW9uYWwgY29udGFjdCBkZXRhaWxzXG4gICAgICBxdWVyeVBhcmFtcy5wdXNoKFwiJGV4cGFuZD1BZGRyZXNzZXMsRGlzdHJpY3RzLEVtYWlscyxQaG9uZXNcIik7XG4gICAgICBcbiAgICAgIGlmIChxdWVyeVBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHVybCArPSBgPyR7cXVlcnlQYXJhbXMuam9pbignJicpfWA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHtcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICB1cmw6IHVybCxcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuYm9keTtcbiAgICAgIGNvbnN0IGNvbnRhY3RzID0gZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgIFxuICAgICAgY29uc3QgcmVzdWx0ID0gY29udGFjdHMubWFwKChjb250YWN0OiBhbnkpID0+IHtcbiAgICAgICAgLy8gR2V0IHByaW1hcnkgYWRkcmVzc1xuICAgICAgICBjb25zdCBwcmltYXJ5QWRkcmVzcyA9IGNvbnRhY3QuYWRkcmVzc2VzPy5maW5kKChhZGRyOiBhbnkpID0+IGFkZHIuaXNQcmVmZXJyZWQpIHx8IGNvbnRhY3QuYWRkcmVzc2VzPy5bMF07XG4gICAgICAgIFxuICAgICAgICAvLyBHZXQgcHJpbWFyeSBlbWFpbCBhbmQgcGhvbmVcbiAgICAgICAgY29uc3QgcHJpbWFyeUVtYWlsID0gY29udGFjdC5lbWFpbHM/LmZpbmQoKGVtYWlsOiBhbnkpID0+IGVtYWlsLmlzUHJlZmVycmVkKSB8fCBjb250YWN0LmVtYWlscz8uWzBdO1xuICAgICAgICBjb25zdCBwcmltYXJ5UGhvbmUgPSBjb250YWN0LnBob25lcz8uZmluZCgocGhvbmU6IGFueSkgPT4gcGhvbmUuaXNQcmVmZXJyZWQpIHx8IGNvbnRhY3QucGhvbmVzPy5bMF07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbklkOiBjb250YWN0LnZhbklkLFxuICAgICAgICAgIGZpcnN0TmFtZTogY29udGFjdC5maXJzdE5hbWUsXG4gICAgICAgICAgbWlkZGxlTmFtZTogY29udGFjdC5taWRkbGVOYW1lLFxuICAgICAgICAgIGxhc3ROYW1lOiBjb250YWN0Lmxhc3ROYW1lLFxuICAgICAgICAgIGNvbW1vbk5hbWU6IGNvbnRhY3QuY29tbW9uTmFtZSxcbiAgICAgICAgICBvZmZpY2lhbE5hbWU6IGNvbnRhY3Qub2ZmaWNpYWxOYW1lLFxuICAgICAgICAgIGVtYWlsOiBwcmltYXJ5RW1haWw/LmVtYWlsLFxuICAgICAgICAgIHBob25lTnVtYmVyOiBwcmltYXJ5UGhvbmU/LnBob25lTnVtYmVyLFxuICAgICAgICAgIHN0cmVldEFkZHJlc3M6IHByaW1hcnlBZGRyZXNzPy5hZGRyZXNzTGluZTEsXG4gICAgICAgICAgY2l0eTogcHJpbWFyeUFkZHJlc3M/LmNpdHksXG4gICAgICAgICAgc3RhdGVPclByb3ZpbmNlOiBwcmltYXJ5QWRkcmVzcz8uc3RhdGVPclByb3ZpbmNlLFxuICAgICAgICAgIHppcE9yUG9zdGFsQ29kZTogcHJpbWFyeUFkZHJlc3M/LnppcE9yUG9zdGFsQ29kZSxcbiAgICAgICAgICBjb250YWN0TW9kZTogY29udGFjdC5jb250YWN0TW9kZSxcbiAgICAgICAgICBkYXRlQ3JlYXRlZDogY29udGFjdC5kYXRlQ3JlYXRlZCxcbiAgICAgICAgICBkYXRlTW9kaWZpZWQ6IGNvbnRhY3QuZGF0ZU1vZGlmaWVkLFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGxldCBjb250aW51YXRpb247XG4gICAgICBpZiAoZGF0YS5uZXh0UGFnZUxpbmspIHtcbiAgICAgICAgY29uc3Qgc2tpcE1hdGNoID0gZGF0YS5uZXh0UGFnZUxpbmsubWF0Y2goL1xcJHNraXA9KFxcZCspLyk7XG4gICAgICAgIGlmIChza2lwTWF0Y2gpIHtcbiAgICAgICAgICBjb250aW51YXRpb24gPSB7IHNraXA6IHNraXBNYXRjaFsxXSB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdCxcbiAgICAgICAgY29udGludWF0aW9uLFxuICAgICAgfTtcbiAgICB9LFxuICB9LFxufSk7XG5cbi8vIEV2ZW50cyBzeW5jIHRhYmxlXG5wYWNrLmFkZFN5bmNUYWJsZSh7XG4gIG5hbWU6IFwiRXZlbnRzXCIsXG4gIGRlc2NyaXB0aW9uOiBcIlN5bmMgZXZlbnRzIGZyb20gRXZlcnlBY3Rpb25cIixcbiAgaWRlbnRpdHlOYW1lOiBcIkV2ZW50XCIsXG4gIHNjaGVtYTogRXZlbnRTY2hlbWEsXG4gIGZvcm11bGE6IHtcbiAgICBuYW1lOiBcIlN5bmNFdmVudHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTeW5jIGV2ZW50cyBmcm9tIEV2ZXJ5QWN0aW9uXCIsXG4gICAgcGFyYW1ldGVyczogW1xuICAgICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgICAgbmFtZTogXCJldmVudFR5cGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRmlsdGVyIGJ5IGV2ZW50IHR5cGUgKG9wdGlvbmFsKVwiLFxuICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLlN0cmluZyxcbiAgICAgICAgbmFtZTogXCJzdGFydERhdGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRmlsdGVyIGV2ZW50cyBzdGFydGluZyBmcm9tIHRoaXMgZGF0ZSAoWVlZWS1NTS1ERCBmb3JtYXQsIG9wdGlvbmFsKVwiLFxuICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgZXhlY3V0ZTogYXN5bmMgZnVuY3Rpb24gKFtldmVudFR5cGUsIHN0YXJ0RGF0ZV0sIGNvbnRleHQpIHtcbiAgICAgIGxldCB1cmwgPSBcImh0dHBzOi8vYXBpLnNlY3VyZXZhbi5jb20vdjQvZXZlbnRzXCI7XG4gICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IFtdO1xuICAgICAgXG4gICAgICBpZiAoZXZlbnRUeXBlKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYGV2ZW50VHlwZT0ke2VuY29kZVVSSUNvbXBvbmVudChldmVudFR5cGUpfWApO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYHN0YXJ0aW5nQWZ0ZXI9JHtlbmNvZGVVUklDb21wb25lbnQoc3RhcnREYXRlKX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQWRkIHBhZ2luYXRpb25cbiAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goXCIkdG9wPTUwXCIpO1xuICAgICAgaWYgKGNvbnRleHQuc3luYy5jb250aW51YXRpb24pIHtcbiAgICAgICAgcXVlcnlQYXJhbXMucHVzaChgJHNraXA9JHtjb250ZXh0LnN5bmMuY29udGludWF0aW9uLnNraXB9YCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChxdWVyeVBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHVybCArPSBgPyR7cXVlcnlQYXJhbXMuam9pbignJicpfWA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHtcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICB1cmw6IHVybCxcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuYm9keTtcbiAgICAgIGNvbnN0IGV2ZW50cyA9IGRhdGEuaXRlbXMgfHwgW107XG4gICAgICBcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGV2ZW50cy5tYXAoKGV2ZW50OiBhbnkpID0+ICh7XG4gICAgICAgIGV2ZW50SWQ6IGV2ZW50LmV2ZW50SWQsXG4gICAgICAgIG5hbWU6IGV2ZW50Lm5hbWUsXG4gICAgICAgIHNob3J0TmFtZTogZXZlbnQuc2hvcnROYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbjogZXZlbnQuZGVzY3JpcHRpb24sXG4gICAgICAgIGV2ZW50VHlwZTogZXZlbnQuZXZlbnRUeXBlPy5uYW1lLFxuICAgICAgICBzdGFydERhdGU6IGV2ZW50LnN0YXJ0RGF0ZSxcbiAgICAgICAgZW5kRGF0ZTogZXZlbnQuZW5kRGF0ZSxcbiAgICAgICAgcHVibGljV2Vic2l0ZVVybDogZXZlbnQucHVibGljV2Vic2l0ZVVybCxcbiAgICAgICAgdm90ZXJSZWdpc3RyYXRpb25CYXRjaGVzOiBldmVudC52b3RlclJlZ2lzdHJhdGlvbkJhdGNoZXMgfHwgW10sXG4gICAgICAgIG5vdGVzOiBldmVudC5ub3RlcyxcbiAgICAgICAgZGF0ZUNyZWF0ZWQ6IGV2ZW50LmRhdGVDcmVhdGVkLFxuICAgICAgICBkYXRlTW9kaWZpZWQ6IGV2ZW50LmRhdGVNb2RpZmllZCxcbiAgICAgIH0pKTtcbiAgICAgIFxuICAgICAgbGV0IGNvbnRpbnVhdGlvbjtcbiAgICAgIGlmIChkYXRhLm5leHRQYWdlTGluaykge1xuICAgICAgICBjb25zdCBza2lwTWF0Y2ggPSBkYXRhLm5leHRQYWdlTGluay5tYXRjaCgvXFwkc2tpcD0oXFxkKykvKTtcbiAgICAgICAgaWYgKHNraXBNYXRjaCkge1xuICAgICAgICAgIGNvbnRpbnVhdGlvbiA9IHsgc2tpcDogc2tpcE1hdGNoWzFdIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdWx0LFxuICAgICAgICBjb250aW51YXRpb24sXG4gICAgICB9O1xuICAgIH0sXG4gIH0sXG59KTtcblxuLy8gRXZlbnRTaWdudXBzIHN5bmMgdGFibGVcbnBhY2suYWRkU3luY1RhYmxlKHtcbiAgbmFtZTogXCJFdmVudFNpZ251cHNcIixcbiAgZGVzY3JpcHRpb246IFwiU3luYyBldmVudCBzaWdudXBzIGZyb20gRXZlcnlBY3Rpb25cIixcbiAgaWRlbnRpdHlOYW1lOiBcIkV2ZW50U2lnbnVwXCIsXG4gIHNjaGVtYTogRXZlbnRTaWdudXBTY2hlbWEsXG4gIGZvcm11bGE6IHtcbiAgICBuYW1lOiBcIlN5bmNFdmVudFNpZ251cHNcIixcbiAgICBkZXNjcmlwdGlvbjogXCJTeW5jIGV2ZW50IHNpZ251cHMgZnJvbSBFdmVyeUFjdGlvblwiLFxuICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5OdW1iZXIsXG4gICAgICAgIG5hbWU6IFwiZXZlbnRJZFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJGaWx0ZXIgYnkgc3BlY2lmaWMgZXZlbnQgSUQgKG9wdGlvbmFsKVwiLFxuICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLk51bWJlcixcbiAgICAgICAgbmFtZTogXCJ2YW5JZFwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJGaWx0ZXIgYnkgc3BlY2lmaWMgcGVyc29uIFZBTiBJRCAob3B0aW9uYWwpXCIsXG4gICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgfSksXG4gICAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgICBuYW1lOiBcInN0YXR1c1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJGaWx0ZXIgYnkgc2lnbnVwIHN0YXR1cyAob3B0aW9uYWwpXCIsXG4gICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgICBleGVjdXRlOiBhc3luYyBmdW5jdGlvbiAoW2V2ZW50SWQsIHZhbklkLCBzdGF0dXNdLCBjb250ZXh0KSB7XG4gICAgICAvLyBFaXRoZXIgZXZlbnRJZCBvciB2YW5JZCBtdXN0IGJlIHNwZWNpZmllZCBhY2NvcmRpbmcgdG8gdGhlIEFQSVxuICAgICAgaWYgKCFldmVudElkICYmICF2YW5JZCkge1xuICAgICAgICB0aHJvdyBuZXcgY29kYS5Vc2VyVmlzaWJsZUVycm9yKFwiRWl0aGVyIGV2ZW50SWQgb3IgdmFuSWQgcGFyYW1ldGVyIG11c3QgYmUgc3BlY2lmaWVkXCIpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBsZXQgdXJsID0gXCJodHRwczovL2FwaS5zZWN1cmV2YW4uY29tL3Y0L3NpZ251cHNcIjtcbiAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gW107XG4gICAgICBcbiAgICAgIGlmIChldmVudElkKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYGV2ZW50SWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZXZlbnRJZC50b1N0cmluZygpKX1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHZhbklkKSB7XG4gICAgICAgIHF1ZXJ5UGFyYW1zLnB1c2goYHZhbklkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbklkLnRvU3RyaW5nKCkpfWApO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBBZGQgcGFnaW5hdGlvblxuICAgICAgcXVlcnlQYXJhbXMucHVzaChcIiR0b3A9NTBcIik7XG4gICAgICBpZiAoY29udGV4dC5zeW5jLmNvbnRpbnVhdGlvbikge1xuICAgICAgICBxdWVyeVBhcmFtcy5wdXNoKGAkc2tpcD0ke2NvbnRleHQuc3luYy5jb250aW51YXRpb24uc2tpcH1gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKHF1ZXJ5UGFyYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdXJsICs9IGA/JHtxdWVyeVBhcmFtcy5qb2luKCcmJyl9YDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIHVybDogdXJsLFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5ib2R5O1xuICAgICAgY29uc3Qgc2lnbnVwcyA9IGRhdGEuaXRlbXMgfHwgW107XG4gICAgICBcbiAgICAgIC8vIEZpbHRlciBieSBzdGF0dXMgaWYgc3BlY2lmaWVkXG4gICAgICBjb25zdCBmaWx0ZXJlZFNpZ251cHMgPSBzdGF0dXMgXG4gICAgICAgID8gc2lnbnVwcy5maWx0ZXIoKHNpZ251cDogYW55KSA9PiBzaWdudXAuc3RhdHVzPy5uYW1lID09PSBzdGF0dXMpXG4gICAgICAgIDogc2lnbnVwcztcbiAgICAgIFxuICAgICAgY29uc3QgcmVzdWx0ID0gZmlsdGVyZWRTaWdudXBzLm1hcCgoc2lnbnVwOiBhbnkpID0+ICh7XG4gICAgICAgIGV2ZW50U2lnbnVwSWQ6IHNpZ251cC5ldmVudFNpZ251cElkLFxuICAgICAgICBwZXJzb25WYW5JZDogc2lnbnVwLnBlcnNvbj8udmFuSWQsXG4gICAgICAgIHBlcnNvbk5hbWU6IGAke3NpZ251cC5wZXJzb24/LmZpcnN0TmFtZX0gJHtzaWdudXAucGVyc29uPy5sYXN0TmFtZX1gLnRyaW0oKSxcbiAgICAgICAgZXZlbnRJZDogc2lnbnVwLmV2ZW50Py5ldmVudElkLFxuICAgICAgICBldmVudE5hbWU6IHNpZ251cC5ldmVudD8ubmFtZSxcbiAgICAgICAgc3RhdHVzOiBzaWdudXAuc3RhdHVzPy5uYW1lLFxuICAgICAgICByb2xlOiBzaWdudXAucm9sZT8ubmFtZSxcbiAgICAgICAgcm9sZUlkOiBzaWdudXAucm9sZT8ucm9sZUlkLCAvLyBBZGQgcm9sZUlkXG4gICAgICAgIHNoaWZ0OiBzaWdudXAuc2hpZnQ/Lm5hbWUsXG4gICAgICAgIGV2ZW50U2hpZnRJZDogc2lnbnVwLnNoaWZ0Py5ldmVudFNoaWZ0SWQsIC8vIEFkZCBldmVudFNoaWZ0SWRcbiAgICAgICAgc3RhcnRUaW1lOiBzaWdudXAuc3RhcnRUaW1lLFxuICAgICAgICBlbmRUaW1lOiBzaWdudXAuZW5kVGltZSxcbiAgICAgICAgbG9jYXRpb246IHNpZ251cC5sb2NhdGlvbj8ubmFtZSxcbiAgICAgICAgZGF0ZUNyZWF0ZWQ6IHNpZ251cC5kYXRlQ3JlYXRlZCxcbiAgICAgICAgZGF0ZU1vZGlmaWVkOiBzaWdudXAuZGF0ZU1vZGlmaWVkLFxuICAgICAgfSkpO1xuICAgICAgXG4gICAgICBsZXQgY29udGludWF0aW9uO1xuICAgICAgaWYgKGRhdGEubmV4dFBhZ2VMaW5rKSB7XG4gICAgICAgIGNvbnN0IHNraXBNYXRjaCA9IGRhdGEubmV4dFBhZ2VMaW5rLm1hdGNoKC9cXCRza2lwPShcXGQrKS8pO1xuICAgICAgICBpZiAoc2tpcE1hdGNoKSB7XG4gICAgICAgICAgY29udGludWF0aW9uID0geyBza2lwOiBza2lwTWF0Y2hbMV0gfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXN1bHQsXG4gICAgICAgIGNvbnRpbnVhdGlvbixcbiAgICAgIH07XG4gICAgfSxcbiAgfSxcbn0pO1xuXG4vLyBBZGQgYSBmb3JtdWxhIHRvIGdldCBhIGNvdW50IG9mIHNpZ251cHMgZm9yIGFuIGV2ZW50IGJ5IHN0YXR1c1xucGFjay5hZGRGb3JtdWxhKHtcbiAgbmFtZTogXCJHZXRFdmVudFNpZ251cENvdW50XCIsXG4gIGRlc2NyaXB0aW9uOiBcIkdldCB0aGUgY291bnQgb2YgZXZlbnQgc2lnbnVwcyBmb3IgYSBnaXZlbiBldmVudCBhbmQgc3RhdHVzLlwiLFxuICBwYXJhbWV0ZXJzOiBbXG4gICAgY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAgICAgIHR5cGU6IGNvZGEuUGFyYW1ldGVyVHlwZS5OdW1iZXIsXG4gICAgICBuYW1lOiBcImV2ZW50SWRcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIklEIG9mIHRoZSBldmVudCB0byBjb3VudCBzaWdudXBzIGZvclwiLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNpZ251cCBzdGF0dXMgdG8gY291bnQgKGUuZy4sIENvbXBsZXRlZCwgU2NoZWQtV2ViLCBldGMuKVwiLFxuICAgIH0pLFxuICBdLFxuICByZXN1bHRUeXBlOiBjb2RhLlZhbHVlVHlwZS5OdW1iZXIsXG4gIGV4ZWN1dGU6IGFzeW5jIGZ1bmN0aW9uIChbZXZlbnRJZCwgc3RhdHVzXSwgY29udGV4dCkge1xuICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9hcGkuc2VjdXJldmFuLmNvbS92NC9zaWdudXBzP2V2ZW50SWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZXZlbnRJZCl9YDtcbiAgICAvLyBVc2UgYSBoaWdoICR0b3AgdG8gZ2V0IGFsbCBzaWdudXBzIGluIG9uZSBjYWxsIChBUEkgbWF5IGhhdmUgYSBtYXggbGltaXQpXG4gICAgdXJsICs9IGAmJHRvcD0xMDAwYDtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaCh7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB1cmw6IHVybCxcbiAgICB9KTtcbiAgICBjb25zdCBzaWdudXBzID0gcmVzcG9uc2UuYm9keS5pdGVtcyB8fCBbXTtcbiAgICAvLyBDb3VudCBzaWdudXBzIG1hdGNoaW5nIHRoZSBnaXZlbiBzdGF0dXMgKGNhc2UtaW5zZW5zaXRpdmUpXG4gICAgY29uc3QgY291bnQgPSBzaWdudXBzLmZpbHRlcigoczogYW55KSA9PiAocy5zdGF0dXM/Lm5hbWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKSA9PT0gc3RhdHVzLnRvTG93ZXJDYXNlKCkpLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQ7XG4gIH0sXG59KTtcblxuLy8gQWRkIGEgZm9ybXVsYSB0byBnZXQgYSBicmVha2Rvd24gb2Ygc2lnbnVwcyBmb3IgYW4gZXZlbnQgYnkgc3RhdHVzIGFuZCB0b3RhbCBjb3VudFxucGFjay5hZGRGb3JtdWxhKHtcbiAgbmFtZTogXCJHZXRFdmVudFNpZ251cEJyZWFrZG93blwiLFxuICBkZXNjcmlwdGlvbjogXCJHZXQgYSBicmVha2Rvd24gb2YgZXZlbnQgc2lnbnVwcyBmb3IgYSBnaXZlbiBldmVudCwgaW5jbHVkaW5nIHRvdGFsIGFuZCBwZXItc3RhdHVzIGNvdW50cywgb3IganVzdCBmb3IgYSBzcGVjaWZpYyBzdGF0dXMuXCIsXG4gIHBhcmFtZXRlcnM6IFtcbiAgICBjb2RhLm1ha2VQYXJhbWV0ZXIoe1xuICAgICAgdHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLk51bWJlcixcbiAgICAgIG5hbWU6IFwiZXZlbnRJZFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiSUQgb2YgdGhlIGV2ZW50IHRvIGdldCBzaWdudXAgYnJlYWtkb3duIGZvclwiLFxuICAgIH0pLFxuICAgIGNvZGEubWFrZVBhcmFtZXRlcih7XG4gICAgICB0eXBlOiBjb2RhLlBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAgbmFtZTogXCJzdGF0dXNcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIihPcHRpb25hbCkgU2lnbnVwIHN0YXR1cyB0byBjb3VudCAoZS5nLiwgQ29tcGxldGVkLCBTY2hlZC1XZWIsIGV0Yy4pLiBJZiBwcm92aWRlZCwgb25seSB0aGUgY291bnQgZm9yIHRoaXMgc3RhdHVzIGlzIHJldHVybmVkLlwiLFxuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIHJlc3VsdFR5cGU6IGNvZGEuVmFsdWVUeXBlLk9iamVjdCxcbiAgc2NoZW1hOiBjb2RhLm1ha2VPYmplY3RTY2hlbWEoe1xuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgIHRvdGFsOiB7IHR5cGU6IGNvZGEuVmFsdWVUeXBlLk51bWJlciwgZGVzY3JpcHRpb246IFwiVG90YWwgbnVtYmVyIG9mIHNpZ251cHMgKG9yIGZvciB0aGUgZ2l2ZW4gc3RhdHVzIGlmIHNwZWNpZmllZClcIiB9LFxuICAgICAgYnJlYWtkb3duOiBjb2RhLm1ha2VPYmplY3RTY2hlbWEoe1xuICAgICAgICBwcm9wZXJ0aWVzOiB7fSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQnJlYWtkb3duIG9mIHNpZ251cHMgYnkgc3RhdHVzIChkeW5hbWljIGtleXMsIG9taXR0ZWQgaWYgc3RhdHVzIGlzIHByb3ZpZGVkKVwiXG4gICAgICB9KSxcbiAgICAgIHN0YXR1czogeyB0eXBlOiBjb2RhLlZhbHVlVHlwZS5TdHJpbmcsIGRlc2NyaXB0aW9uOiBcIlN0YXR1cyBmaWx0ZXIgYXBwbGllZCAoaWYgYW55KVwiIH0sXG4gICAgfSxcbiAgICBkaXNwbGF5UHJvcGVydHk6IFwidG90YWxcIixcbiAgfSksXG4gIGV4ZWN1dGU6IGFzeW5jIGZ1bmN0aW9uIChbZXZlbnRJZCwgc3RhdHVzXSwgY29udGV4dCkge1xuICAgIGxldCB1cmwgPSBgaHR0cHM6Ly9hcGkuc2VjdXJldmFuLmNvbS92NC9zaWdudXBzP2V2ZW50SWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZXZlbnRJZCl9JiR0b3A9MTAwMGA7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgdXJsOiB1cmwsXG4gICAgfSk7XG4gICAgY29uc3Qgc2lnbnVwczogYW55W10gPSByZXNwb25zZS5ib2R5Lml0ZW1zIHx8IFtdO1xuICAgIGlmIChzdGF0dXMpIHtcbiAgICAgIC8vIENhc2UtaW5zZW5zaXRpdmUgbWF0Y2ggZm9yIHN0YXR1c1xuICAgICAgY29uc3QgZmlsdGVyZWQgPSBzaWdudXBzLmZpbHRlcigoczogYW55KSA9PiAocy5zdGF0dXM/Lm5hbWUgfHwgXCJcIikudG9Mb3dlckNhc2UoKSA9PT0gc3RhdHVzLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG90YWw6IGZpbHRlcmVkLmxlbmd0aCxcbiAgICAgICAgc3RhdHVzLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYnJlYWtkb3duOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gICAgICBmb3IgKGNvbnN0IHMgb2Ygc2lnbnVwcykge1xuICAgICAgICBjb25zdCBzdCA9IChzLnN0YXR1cz8ubmFtZSB8fCBcIlVua25vd25cIik7XG4gICAgICAgIGJyZWFrZG93bltzdF0gPSAoYnJlYWtkb3duW3N0XSB8fCAwKSArIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3RhbDogc2lnbnVwcy5sZW5ndGgsXG4gICAgICAgIGJyZWFrZG93bixcbiAgICAgIH07XG4gICAgfVxuICB9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLHNIQUFBQSxVQUFBQyxTQUFBO0FBQUE7QUFrRUEsUUFBSUMsbUJBQWtCLGdDQUFTLE1BQU07QUFDcEMsVUFBSSxRQUFRLFFBQVc7QUFDdEIsZ0JBQU8sb0JBQUksS0FBSyxHQUFFLFFBQVE7QUFBQSxNQUMzQjtBQUdBLFdBQUssSUFBSTtBQUNULFdBQUssSUFBSTtBQUNULFdBQUssV0FBVztBQUNoQixXQUFLLGFBQWE7QUFDbEIsV0FBSyxhQUFhO0FBRWxCLFdBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBQzFCLFdBQUssTUFBSSxLQUFLLElBQUU7QUFFaEIsVUFBSSxLQUFLLGVBQWUsT0FBTztBQUM5QixhQUFLLGNBQWMsTUFBTSxLQUFLLE1BQU07QUFBQSxNQUNyQyxPQUNLO0FBQ0osYUFBSyxVQUFVLElBQUk7QUFBQSxNQUNwQjtBQUFBLElBQ0QsR0FyQnNCO0FBeUJ0QixJQUFBQSxpQkFBZ0IsVUFBVSxZQUFZLFNBQVMsR0FBRztBQUNqRCxXQUFLLEdBQUcsQ0FBQyxJQUFJLE1BQU07QUFDbkIsV0FBSyxLQUFLLE1BQUksR0FBRyxLQUFLLE1BQUksS0FBSyxHQUFHLEtBQUssT0FBTztBQUM3QyxZQUFJLElBQUksS0FBSyxHQUFHLEtBQUssTUFBSSxDQUFDLElBQUssS0FBSyxHQUFHLEtBQUssTUFBSSxDQUFDLE1BQU07QUFDdkQsYUFBSyxHQUFHLEtBQUssR0FBRyxPQUFTLElBQUksZ0JBQWdCLE1BQU0sY0FBZSxPQUFPLElBQUksU0FBYyxhQUN6RixLQUFLO0FBS1AsYUFBSyxHQUFHLEtBQUssR0FBRyxPQUFPO0FBQUEsTUFFeEI7QUFBQSxJQUNEO0FBTUEsSUFBQUEsaUJBQWdCLFVBQVUsZ0JBQWdCLFNBQVMsVUFBVSxZQUFZO0FBQ3hFLFVBQUksR0FBRyxHQUFHO0FBQ1YsV0FBSyxVQUFVLFFBQVE7QUFDdkIsVUFBRTtBQUFHLFVBQUU7QUFDUCxVQUFLLEtBQUssSUFBRSxhQUFhLEtBQUssSUFBSTtBQUNsQyxhQUFPLEdBQUcsS0FBSztBQUNkLFlBQUksSUFBSSxLQUFLLEdBQUcsSUFBRSxDQUFDLElBQUssS0FBSyxHQUFHLElBQUUsQ0FBQyxNQUFNO0FBQ3pDLGFBQUssR0FBRyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsT0FBUyxJQUFJLGdCQUFnQixNQUFNLFdBQVksT0FBUSxJQUFJLFNBQWMsV0FDOUYsU0FBUyxDQUFDLElBQUk7QUFDaEIsYUFBSyxHQUFHLENBQUMsT0FBTztBQUNoQjtBQUFLO0FBQ0wsWUFBSSxLQUFHLEtBQUssR0FBRztBQUFFLGVBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLEtBQUssSUFBRSxDQUFDO0FBQUcsY0FBRTtBQUFBLFFBQUc7QUFDdEQsWUFBSSxLQUFHO0FBQVksY0FBRTtBQUFBLE1BQ3RCO0FBQ0EsV0FBSyxJQUFFLEtBQUssSUFBRSxHQUFHLEdBQUcsS0FBSztBQUN4QixZQUFJLElBQUksS0FBSyxHQUFHLElBQUUsQ0FBQyxJQUFLLEtBQUssR0FBRyxJQUFFLENBQUMsTUFBTTtBQUN6QyxhQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLE9BQVMsSUFBSSxnQkFBZ0IsTUFBTSxjQUFlLE9BQU8sSUFBSSxTQUFjLGNBQ2hHO0FBQ0YsYUFBSyxHQUFHLENBQUMsT0FBTztBQUNoQjtBQUNBLFlBQUksS0FBRyxLQUFLLEdBQUc7QUFBRSxlQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxLQUFLLElBQUUsQ0FBQztBQUFHLGNBQUU7QUFBQSxRQUFHO0FBQUEsTUFDdkQ7QUFFQSxXQUFLLEdBQUcsQ0FBQyxJQUFJO0FBQUEsSUFDZDtBQUlBLElBQUFBLGlCQUFnQixVQUFVLGFBQWEsV0FBVztBQUNqRCxVQUFJO0FBQ0osVUFBSSxRQUFRLElBQUksTUFBTSxHQUFLLEtBQUssUUFBUTtBQUd4QyxVQUFJLEtBQUssT0FBTyxLQUFLLEdBQUc7QUFDdkIsWUFBSTtBQUVKLFlBQUksS0FBSyxPQUFPLEtBQUssSUFBRTtBQUN0QixlQUFLLFVBQVUsSUFBSTtBQUVwQixhQUFLLEtBQUcsR0FBRSxLQUFHLEtBQUssSUFBRSxLQUFLLEdBQUUsTUFBTTtBQUNoQyxjQUFLLEtBQUssR0FBRyxFQUFFLElBQUUsS0FBSyxhQUFhLEtBQUssR0FBRyxLQUFHLENBQUMsSUFBRSxLQUFLO0FBQ3RELGVBQUssR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHLEtBQUcsS0FBSyxDQUFDLElBQUssTUFBTSxJQUFLLE1BQU0sSUFBSSxDQUFHO0FBQUEsUUFDN0Q7QUFDQSxlQUFNLEtBQUcsS0FBSyxJQUFFLEdBQUUsTUFBTTtBQUN2QixjQUFLLEtBQUssR0FBRyxFQUFFLElBQUUsS0FBSyxhQUFhLEtBQUssR0FBRyxLQUFHLENBQUMsSUFBRSxLQUFLO0FBQ3RELGVBQUssR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHLE1BQUksS0FBSyxJQUFFLEtBQUssRUFBRSxJQUFLLE1BQU0sSUFBSyxNQUFNLElBQUksQ0FBRztBQUFBLFFBQ3RFO0FBQ0EsWUFBSyxLQUFLLEdBQUcsS0FBSyxJQUFFLENBQUMsSUFBRSxLQUFLLGFBQWEsS0FBSyxHQUFHLENBQUMsSUFBRSxLQUFLO0FBQ3pELGFBQUssR0FBRyxLQUFLLElBQUUsQ0FBQyxJQUFJLEtBQUssR0FBRyxLQUFLLElBQUUsQ0FBQyxJQUFLLE1BQU0sSUFBSyxNQUFNLElBQUksQ0FBRztBQUVqRSxhQUFLLE1BQU07QUFBQSxNQUNaO0FBRUEsVUFBSSxLQUFLLEdBQUcsS0FBSyxLQUFLO0FBR3RCLFdBQU0sTUFBTTtBQUNaLFdBQU0sS0FBSyxJQUFLO0FBQ2hCLFdBQU0sS0FBSyxLQUFNO0FBQ2pCLFdBQU0sTUFBTTtBQUVaLGFBQU8sTUFBTTtBQUFBLElBQ2Q7QUFJQSxJQUFBQSxpQkFBZ0IsVUFBVSxlQUFlLFdBQVc7QUFDbkQsYUFBUSxLQUFLLFdBQVcsTUFBSTtBQUFBLElBQzdCO0FBSUEsSUFBQUEsaUJBQWdCLFVBQVUsY0FBYyxXQUFXO0FBQ2xELGFBQU8sS0FBSyxXQUFXLEtBQUcsSUFBSTtBQUFBLElBRS9CO0FBR0EsSUFBQUEsaUJBQWdCLFVBQVUsU0FBUyxXQUFXO0FBQzdDLGFBQU8sS0FBSyxXQUFXLEtBQUcsSUFBSTtBQUFBLElBRS9CO0FBSUEsSUFBQUEsaUJBQWdCLFVBQVUsY0FBYyxXQUFXO0FBQ2xELGNBQVEsS0FBSyxXQUFXLElBQUksUUFBTSxJQUFJO0FBQUEsSUFFdkM7QUFJQSxJQUFBQSxpQkFBZ0IsVUFBVSxjQUFjLFdBQVc7QUFDbEQsVUFBSSxJQUFFLEtBQUssV0FBVyxNQUFJLEdBQUcsSUFBRSxLQUFLLFdBQVcsTUFBSTtBQUNuRCxjQUFPLElBQUUsV0FBVyxNQUFJLElBQUk7QUFBQSxJQUM3QjtBQUlBLElBQUFELFFBQU8sVUFBVUM7QUFBQTtBQUFBOzs7QUMxTWpCLFNBQVMsZ0JBQWdCLEtBQUs7QUFDNUIsTUFBSSxJQUFJLElBQUk7QUFDWixTQUFPLEtBQUs7QUFDVixRQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sWUFBWSxJQUFJLEdBQUc7QUFBQSxFQUN6QztBQUNBLFNBQU87QUFDVDtBQUVBLFNBQVMsY0FBYztBQUNyQixTQUFPLFFBQVEsT0FBTztBQUN4QjtBQWpCQSxJQUdJLGlCQUVBLFNBY1M7QUFuQmI7QUFBQTtBQUdBLElBQUksa0JBQWtCO0FBRXRCLElBQUksVUFBVSxJQUFJLGdCQUFnQixLQUFLLE9BQU8sSUFBSSxPQUFPLGdCQUFnQjtBQUVoRTtBQVFBO0FBSUYsSUFBTSxTQUFTO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBZ0JBLFFBQUksQ0FBQyxPQUFPLFFBQVEsaUJBQWlCO0FBQ25DLGFBQU8sU0FBUztBQUFBLElBQ2xCO0FBQUE7QUFBQTs7O0FDdkNBO0FBQUEsb0RBQUFDLFVBQUE7QUFBQTtBQUFBO0FBQ0EsV0FBTyxlQUFlQSxVQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxJQUFBQSxTQUFRLGlCQUFpQkEsU0FBUSxlQUFlQSxTQUFRLGlCQUFpQkEsU0FBUSxhQUFhQSxTQUFRLDhCQUE4QkEsU0FBUSxtQ0FBbUNBLFNBQVEsZ0JBQWdCQSxTQUFRLHFCQUFxQkEsU0FBUSxlQUFlO0FBSTNQLFFBQUk7QUFDSixLQUFDLFNBQVVDLGVBQWM7QUFDckIsTUFBQUEsY0FBYSxLQUFLLElBQUk7QUFDdEIsTUFBQUEsY0FBYSxVQUFVLElBQUk7QUFDM0IsTUFBQUEsY0FBYSxlQUFlLElBQUk7QUFDaEMsTUFBQUEsY0FBYSxhQUFhLElBQUk7QUFDOUIsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxXQUFXLElBQUk7QUFDNUIsTUFBQUEsY0FBYSxLQUFLLElBQUk7QUFDdEIsTUFBQUEsY0FBYSxLQUFLLElBQUk7QUFDdEIsTUFBQUEsY0FBYSxJQUFJLElBQUk7QUFDckIsTUFBQUEsY0FBYSxhQUFhLElBQUk7QUFDOUIsTUFBQUEsY0FBYSxjQUFjLElBQUk7QUFDL0IsTUFBQUEsY0FBYSxZQUFZLElBQUk7QUFDN0IsTUFBQUEsY0FBYSxVQUFVLElBQUk7QUFDM0IsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxTQUFTLElBQUk7QUFBQSxJQUM5QixHQUFHLGlCQUFpQkQsU0FBUSxlQUFlLGVBQWUsQ0FBQyxFQUFFO0FBTzdELFFBQUlFO0FBQ0osS0FBQyxTQUFVQSxxQkFBb0I7QUFJM0IsTUFBQUEsb0JBQW1CLE1BQU0sSUFBSTtBQU03QixNQUFBQSxvQkFBbUIsbUJBQW1CLElBQUk7QUFNMUMsTUFBQUEsb0JBQW1CLG1CQUFtQixJQUFJO0FBTTFDLE1BQUFBLG9CQUFtQixrQkFBa0IsSUFBSTtBQU96QyxNQUFBQSxvQkFBbUIsaUJBQWlCLElBQUk7QUFPeEMsTUFBQUEsb0JBQW1CLHNCQUFzQixJQUFJO0FBUTdDLE1BQUFBLG9CQUFtQixRQUFRLElBQUk7QUFRL0IsTUFBQUEsb0JBQW1CLHlCQUF5QixJQUFJO0FBT2hELE1BQUFBLG9CQUFtQixVQUFVLElBQUk7QUFPakMsTUFBQUEsb0JBQW1CLFFBQVEsSUFBSTtBQU0vQixNQUFBQSxvQkFBbUIsY0FBYyxJQUFJO0FBTXJDLE1BQUFBLG9CQUFtQixlQUFlLElBQUk7QUFNdEMsTUFBQUEsb0JBQW1CLDBCQUEwQixJQUFJO0FBUWpELE1BQUFBLG9CQUFtQiw0QkFBNEIsSUFBSTtBQVFuRCxNQUFBQSxvQkFBbUIsc0JBQXNCLElBQUk7QUFPN0MsTUFBQUEsb0JBQW1CLFNBQVMsSUFBSTtBQUFBLElBQ3BDLEdBQUdBLHdCQUF1QkYsU0FBUSxxQkFBcUJFLHNCQUFxQixDQUFDLEVBQUU7QUFJL0UsUUFBSTtBQUNKLEtBQUMsU0FBVUMsZ0JBQWU7QUFJdEIsTUFBQUEsZUFBYyxhQUFhLElBQUk7QUFBQSxJQUNuQyxHQUFHLGtCQUFrQkgsU0FBUSxnQkFBZ0IsZ0JBQWdCLENBQUMsRUFBRTtBQUtoRSxRQUFJO0FBQ0osS0FBQyxTQUFVSSxtQ0FBa0M7QUFNekMsTUFBQUEsa0NBQWlDLFdBQVcsSUFBSTtBQUtoRCxNQUFBQSxrQ0FBaUMsTUFBTSxJQUFJO0FBSTNDLE1BQUFBLGtDQUFpQyxxQkFBcUIsSUFBSTtBQUFBLElBQzlELEdBQUcscUNBQXFDSixTQUFRLG1DQUFtQyxtQ0FBbUMsQ0FBQyxFQUFFO0FBSXpILFFBQUk7QUFDSixLQUFDLFNBQVVLLDhCQUE2QjtBQUlwQyxNQUFBQSw2QkFBNEIsU0FBUyxJQUFJO0FBSXpDLE1BQUFBLDZCQUE0QixRQUFRLElBQUk7QUFBQSxJQUM1QyxHQUFHLGdDQUFnQ0wsU0FBUSw4QkFBOEIsOEJBQThCLENBQUMsRUFBRTtBQUsxRyxRQUFJO0FBQ0osS0FBQyxTQUFVTSxhQUFZO0FBQ25CLE1BQUFBLFlBQVcsT0FBTyxJQUFJO0FBQ3RCLE1BQUFBLFlBQVcsS0FBSyxJQUFJO0FBQ3BCLE1BQUFBLFlBQVcsTUFBTSxJQUFJO0FBQ3JCLE1BQUFBLFlBQVcsWUFBWSxJQUFJO0FBQUEsSUFDL0IsR0FBRyxlQUFlTixTQUFRLGFBQWEsYUFBYSxDQUFDLEVBQUU7QUFLdkQsUUFBSTtBQUNKLEtBQUMsU0FBVU8saUJBQWdCO0FBQ3ZCLE1BQUFBLGdCQUFlLFFBQVEsSUFBSTtBQUMzQixNQUFBQSxnQkFBZSxRQUFRLElBQUk7QUFDM0IsTUFBQUEsZ0JBQWUsTUFBTSxJQUFJO0FBQ3pCLE1BQUFBLGdCQUFlLFVBQVUsSUFBSTtBQUFBLElBQ2pDLEdBQUcsbUJBQW1CUCxTQUFRLGlCQUFpQixpQkFBaUIsQ0FBQyxFQUFFO0FBS25FLFFBQUk7QUFDSixLQUFDLFNBQVVRLGVBQWM7QUFDckIsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxPQUFPLElBQUk7QUFDeEIsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxpQkFBaUIsSUFBSTtBQUFBLElBQ3RDLEdBQUcsaUJBQWlCUixTQUFRLGVBQWUsZUFBZSxDQUFDLEVBQUU7QUFDN0QsUUFBSTtBQUNKLEtBQUMsU0FBVVMsaUJBQWdCO0FBQ3ZCLE1BQUFBLGdCQUFlQSxnQkFBZSxJQUFJLElBQUksR0FBRyxJQUFJO0FBQzdDLE1BQUFBLGdCQUFlQSxnQkFBZSxTQUFTLElBQUksR0FBRyxJQUFJO0FBQ2xELE1BQUFBLGdCQUFlQSxnQkFBZSxVQUFVLElBQUksR0FBRyxJQUFJO0FBQ25ELE1BQUFBLGdCQUFlQSxnQkFBZSxXQUFXLElBQUksR0FBRyxJQUFJO0FBQ3BELE1BQUFBLGdCQUFlQSxnQkFBZSxrQkFBa0IsSUFBSSxHQUFHLElBQUk7QUFDM0QsTUFBQUEsZ0JBQWVBLGdCQUFlLGVBQWUsSUFBSSxHQUFHLElBQUk7QUFDeEQsTUFBQUEsZ0JBQWVBLGdCQUFlLG1CQUFtQixJQUFJLEdBQUcsSUFBSTtBQUM1RCxNQUFBQSxnQkFBZUEsZ0JBQWUsWUFBWSxJQUFJLEdBQUcsSUFBSTtBQUNyRCxNQUFBQSxnQkFBZUEsZ0JBQWUsY0FBYyxJQUFJLEdBQUcsSUFBSTtBQUN2RCxNQUFBQSxnQkFBZUEsZ0JBQWUsaUJBQWlCLElBQUksR0FBRyxJQUFJO0FBQzFELE1BQUFBLGdCQUFlQSxnQkFBZSxXQUFXLElBQUksR0FBRyxJQUFJO0FBQ3BELE1BQUFBLGdCQUFlQSxnQkFBZSxVQUFVLElBQUksR0FBRyxJQUFJO0FBQ25ELE1BQUFBLGdCQUFlQSxnQkFBZSxlQUFlLElBQUksR0FBRyxJQUFJO0FBQ3hELE1BQUFBLGdCQUFlQSxnQkFBZSxVQUFVLElBQUksR0FBRyxJQUFJO0FBQ25ELE1BQUFBLGdCQUFlQSxnQkFBZSxNQUFNLElBQUksR0FBRyxJQUFJO0FBQy9DLE1BQUFBLGdCQUFlQSxnQkFBZSxpQkFBaUIsSUFBSSxHQUFHLElBQUk7QUFDMUQsTUFBQUEsZ0JBQWVBLGdCQUFlLHFCQUFxQixJQUFJLEdBQUcsSUFBSTtBQUM5RCxNQUFBQSxnQkFBZUEsZ0JBQWUsUUFBUSxJQUFJLEdBQUcsSUFBSTtBQUNqRCxNQUFBQSxnQkFBZUEsZ0JBQWUscUJBQXFCLElBQUksR0FBRyxJQUFJO0FBQzlELE1BQUFBLGdCQUFlQSxnQkFBZSxnQkFBZ0IsSUFBSSxHQUFHLElBQUk7QUFDekQsTUFBQUEsZ0JBQWVBLGdCQUFlLGlCQUFpQixJQUFJLEdBQUcsSUFBSTtBQUMxRCxNQUFBQSxnQkFBZUEsZ0JBQWUsZ0JBQWdCLElBQUksR0FBRyxJQUFJO0FBQ3pELE1BQUFBLGdCQUFlQSxnQkFBZSxZQUFZLElBQUksR0FBRyxJQUFJO0FBQ3JELE1BQUFBLGdCQUFlQSxnQkFBZSxvQkFBb0IsSUFBSSxHQUFHLElBQUk7QUFBQSxJQUNqRSxHQUFHLG1CQUFtQlQsU0FBUSxpQkFBaUIsaUJBQWlCLENBQUMsRUFBRTtBQUFBO0FBQUE7OztBQ3ZQbkU7QUFBQSx3REFBQVUsVUFBQTtBQUFBO0FBQUE7QUFDQSxXQUFPLGVBQWVBLFVBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELElBQUFBLFNBQVEsWUFBWUEsU0FBUSxjQUFjQSxTQUFRLGtCQUFrQkEsU0FBUSxnQkFBZ0JBLFNBQVEsb0JBQW9CQSxTQUFRLGdCQUFnQkEsU0FBUSxvQkFBb0JBLFNBQVEscUJBQXFCQSxTQUFRLHFCQUFxQkEsU0FBUSxxQkFBcUJBLFNBQVEseUJBQXlCQSxTQUFRLG1CQUFtQkEsU0FBUSxzQkFBc0JBLFNBQVEscUJBQXFCQSxTQUFRLG9CQUFvQkEsU0FBUSxvQkFBb0JBLFNBQVEsd0JBQXdCQSxTQUFRLHdCQUF3QkEsU0FBUSxnQkFBZ0JBLFNBQVEsWUFBWUEsU0FBUSxhQUFhQSxTQUFRLFlBQVlBLFNBQVEsWUFBWUEsU0FBUSxlQUFlQSxTQUFRLGNBQWNBLFNBQVEsY0FBY0EsU0FBUSxjQUFjQSxTQUFRLE9BQU87QUFTbnNCLFFBQUk7QUFDSixLQUFDLFNBQVVDLE9BQU07QUFDYixNQUFBQSxNQUFLQSxNQUFLLFFBQVEsSUFBSSxDQUFDLElBQUk7QUFDM0IsTUFBQUEsTUFBS0EsTUFBSyxRQUFRLElBQUksQ0FBQyxJQUFJO0FBQzNCLE1BQUFBLE1BQUtBLE1BQUssUUFBUSxJQUFJLENBQUMsSUFBSTtBQUMzQixNQUFBQSxNQUFLQSxNQUFLLFNBQVMsSUFBSSxDQUFDLElBQUk7QUFDNUIsTUFBQUEsTUFBS0EsTUFBSyxNQUFNLElBQUksQ0FBQyxJQUFJO0FBQ3pCLE1BQUFBLE1BQUtBLE1BQUssTUFBTSxJQUFJLENBQUMsSUFBSTtBQUN6QixNQUFBQSxNQUFLQSxNQUFLLE9BQU8sSUFBSSxDQUFDLElBQUk7QUFDMUIsTUFBQUEsTUFBS0EsTUFBSyxNQUFNLElBQUksQ0FBQyxJQUFJO0FBQ3pCLE1BQUFBLE1BQUtBLE1BQUssVUFBVSxJQUFJLENBQUMsSUFBSTtBQUFBLElBQ2pDLEdBQUcsU0FBU0QsU0FBUSxPQUFPLE9BQU8sQ0FBQyxFQUFFO0FBQ3JDLGFBQVMsWUFBWSxLQUFLO0FBQ3RCLGFBQU8sT0FBTyxJQUFJLFNBQVMsV0FBVyxPQUFPLElBQUksVUFBVTtBQUFBLElBQy9EO0FBRlM7QUFHVCxJQUFBQSxTQUFRLGNBQWM7QUFFdEIsSUFBQUEsU0FBUSxjQUFjO0FBQUEsTUFDbEIsTUFBTTtBQUFBLE1BQ04sT0FBTyxLQUFLO0FBQUEsSUFDaEI7QUFFQSxJQUFBQSxTQUFRLGNBQWM7QUFBQSxNQUNsQixNQUFNO0FBQUEsTUFDTixPQUFPLEtBQUs7QUFBQSxJQUNoQjtBQUVBLElBQUFBLFNBQVEsZUFBZTtBQUFBLE1BQ25CLE1BQU07QUFBQSxNQUNOLE9BQU8sS0FBSztBQUFBLElBQ2hCO0FBRUEsSUFBQUEsU0FBUSxZQUFZO0FBQUEsTUFDaEIsTUFBTTtBQUFBLE1BQ04sT0FBTyxLQUFLO0FBQUEsSUFDaEI7QUFFQSxJQUFBQSxTQUFRLFlBQVk7QUFBQSxNQUNoQixNQUFNO0FBQUEsTUFDTixPQUFPLEtBQUs7QUFBQSxJQUNoQjtBQUVBLElBQUFBLFNBQVEsYUFBYTtBQUFBLE1BQ2pCLE1BQU07QUFBQSxNQUNOLE9BQU8sS0FBSztBQUFBLElBQ2hCO0FBRUEsSUFBQUEsU0FBUSxZQUFZO0FBQUEsTUFDaEIsTUFBTTtBQUFBLE1BQ04sT0FBTyxLQUFLO0FBQUEsSUFDaEI7QUFJQSxRQUFJRTtBQUNKLEtBQUMsU0FBVUEsZ0JBQWU7QUFJdEIsTUFBQUEsZUFBYyxRQUFRLElBQUk7QUFJMUIsTUFBQUEsZUFBYyxRQUFRLElBQUk7QUFJMUIsTUFBQUEsZUFBYyxTQUFTLElBQUk7QUFJM0IsTUFBQUEsZUFBYyxNQUFNLElBQUk7QUFJeEIsTUFBQUEsZUFBYyxNQUFNLElBQUk7QUFJeEIsTUFBQUEsZUFBYyxPQUFPLElBQUk7QUFJekIsTUFBQUEsZUFBYyxNQUFNLElBQUk7QUFJeEIsTUFBQUEsZUFBYyxVQUFVLElBQUk7QUFJNUIsTUFBQUEsZUFBYyxhQUFhLElBQUk7QUFJL0IsTUFBQUEsZUFBYyxtQkFBbUIsSUFBSTtBQUlyQyxNQUFBQSxlQUFjLGFBQWEsSUFBSTtBQUkvQixNQUFBQSxlQUFjLG1CQUFtQixJQUFJO0FBSXJDLE1BQUFBLGVBQWMsY0FBYyxJQUFJO0FBSWhDLE1BQUFBLGVBQWMsb0JBQW9CLElBQUk7QUFTdEMsTUFBQUEsZUFBYyxXQUFXLElBQUk7QUFJN0IsTUFBQUEsZUFBYyxpQkFBaUIsSUFBSTtBQUluQyxNQUFBQSxlQUFjLFdBQVcsSUFBSTtBQUk3QixNQUFBQSxlQUFjLGlCQUFpQixJQUFJO0FBSW5DLE1BQUFBLGVBQWMsWUFBWSxJQUFJO0FBSTlCLE1BQUFBLGVBQWMsa0JBQWtCLElBQUk7QUFJcEMsTUFBQUEsZUFBYyxXQUFXLElBQUk7QUFJN0IsTUFBQUEsZUFBYyxpQkFBaUIsSUFBSTtBQUluQyxNQUFBQSxlQUFjLGVBQWUsSUFBSTtBQUlqQyxNQUFBQSxlQUFjLHFCQUFxQixJQUFJO0FBQUEsSUFDM0MsR0FBR0EsbUJBQWtCRixTQUFRLGdCQUFnQkUsaUJBQWdCLENBQUMsRUFBRTtBQUNoRSxJQUFBRixTQUFRLHdCQUF3QjtBQUFBLE1BQzVCLENBQUNFLGVBQWMsTUFBTSxHQUFHLEtBQUs7QUFBQSxNQUM3QixDQUFDQSxlQUFjLE1BQU0sR0FBRyxLQUFLO0FBQUEsTUFDN0IsQ0FBQ0EsZUFBYyxPQUFPLEdBQUcsS0FBSztBQUFBLE1BQzlCLENBQUNBLGVBQWMsSUFBSSxHQUFHLEtBQUs7QUFBQSxNQUMzQixDQUFDQSxlQUFjLElBQUksR0FBRyxLQUFLO0FBQUEsTUFDM0IsQ0FBQ0EsZUFBYyxLQUFLLEdBQUcsS0FBSztBQUFBLE1BQzVCLENBQUNBLGVBQWMsSUFBSSxHQUFHLEtBQUs7QUFBQSxNQUMzQixDQUFDQSxlQUFjLFFBQVEsR0FBRyxLQUFLO0FBQUEsTUFDL0IsQ0FBQ0EsZUFBYyxXQUFXLEdBQUcsRUFBRSxNQUFNLFNBQVMsT0FBTyxLQUFLLE9BQU87QUFBQSxNQUNqRSxDQUFDQSxlQUFjLFdBQVcsR0FBRyxFQUFFLE1BQU0sU0FBUyxPQUFPLEtBQUssT0FBTztBQUFBLE1BQ2pFLENBQUNBLGVBQWMsWUFBWSxHQUFHLEVBQUUsTUFBTSxTQUFTLE9BQU8sS0FBSyxRQUFRO0FBQUEsTUFDbkUsQ0FBQ0EsZUFBYyxTQUFTLEdBQUcsRUFBRSxNQUFNLFNBQVMsT0FBTyxLQUFLLEtBQUs7QUFBQSxNQUM3RCxDQUFDQSxlQUFjLFNBQVMsR0FBRyxFQUFFLE1BQU0sU0FBUyxPQUFPLEtBQUssS0FBSztBQUFBLE1BQzdELENBQUNBLGVBQWMsVUFBVSxHQUFHLEVBQUUsTUFBTSxTQUFTLE9BQU8sS0FBSyxNQUFNO0FBQUEsTUFDL0QsQ0FBQ0EsZUFBYyxTQUFTLEdBQUcsRUFBRSxNQUFNLFNBQVMsT0FBTyxLQUFLLEtBQUs7QUFBQSxNQUM3RCxDQUFDQSxlQUFjLGFBQWEsR0FBRyxFQUFFLE1BQU0sU0FBUyxPQUFPLEtBQUssU0FBUztBQUFBLE1BQ3JFLENBQUNBLGVBQWMsaUJBQWlCLEdBQUcsRUFBRSxNQUFNLFNBQVMsT0FBTyxLQUFLLFFBQVEsWUFBWSxLQUFLO0FBQUEsTUFDekYsQ0FBQ0EsZUFBYyxpQkFBaUIsR0FBRyxFQUFFLE1BQU0sU0FBUyxPQUFPLEtBQUssUUFBUSxZQUFZLEtBQUs7QUFBQSxNQUN6RixDQUFDQSxlQUFjLGtCQUFrQixHQUFHLEVBQUUsTUFBTSxTQUFTLE9BQU8sS0FBSyxTQUFTLFlBQVksS0FBSztBQUFBLE1BQzNGLENBQUNBLGVBQWMsZUFBZSxHQUFHLEVBQUUsTUFBTSxTQUFTLE9BQU8sS0FBSyxNQUFNLFlBQVksS0FBSztBQUFBLE1BQ3JGLENBQUNBLGVBQWMsZUFBZSxHQUFHLEVBQUUsTUFBTSxTQUFTLE9BQU8sS0FBSyxNQUFNLFlBQVksS0FBSztBQUFBLE1BQ3JGLENBQUNBLGVBQWMsZ0JBQWdCLEdBQUcsRUFBRSxNQUFNLFNBQVMsT0FBTyxLQUFLLE9BQU8sWUFBWSxLQUFLO0FBQUEsTUFDdkYsQ0FBQ0EsZUFBYyxlQUFlLEdBQUcsRUFBRSxNQUFNLFNBQVMsT0FBTyxLQUFLLE1BQU0sWUFBWSxLQUFLO0FBQUEsTUFDckYsQ0FBQ0EsZUFBYyxtQkFBbUIsR0FBRyxFQUFFLE1BQU0sU0FBUyxPQUFPLEtBQUssVUFBVSxZQUFZLEtBQUs7QUFBQSxJQUNqRztBQUtBLFFBQUk7QUFDSixLQUFDLFNBQVVDLHdCQUF1QjtBQUk5QixNQUFBQSx1QkFBc0IsTUFBTSxJQUFJO0FBT2hDLE1BQUFBLHVCQUFzQixVQUFVLElBQUk7QUFPcEMsTUFBQUEsdUJBQXNCLFVBQVUsSUFBSTtBQUFBLElBQ3hDLEdBQUcsMEJBQTBCSCxTQUFRLHdCQUF3Qix3QkFBd0IsQ0FBQyxFQUFFO0FBRXhGLFFBQUk7QUFDSixLQUFDLFNBQVVJLG9CQUFtQjtBQUMxQixNQUFBQSxtQkFBa0IsTUFBTSxJQUFJO0FBQzVCLE1BQUFBLG1CQUFrQixVQUFVLElBQUk7QUFDaEMsTUFBQUEsbUJBQWtCLFVBQVUsSUFBSTtBQUFBLElBQ3BDLEdBQUcsc0JBQXNCSixTQUFRLG9CQUFvQixvQkFBb0IsQ0FBQyxFQUFFO0FBRTVFLElBQUFBLFNBQVEsb0JBQW9CLENBQUMsT0FBTyxTQUFTLFFBQVEsT0FBTyxVQUFVLE1BQU07QUFLNUUsUUFBSTtBQUNKLEtBQUMsU0FBVUsscUJBQW9CO0FBQzNCLE1BQUFBLG9CQUFtQixVQUFVLElBQUk7QUFDakMsTUFBQUEsb0JBQW1CLGlCQUFpQixJQUFJO0FBQUEsSUFDNUMsR0FBRyx1QkFBdUJMLFNBQVEscUJBQXFCLHFCQUFxQixDQUFDLEVBQUU7QUFDL0UsUUFBSTtBQUNKLEtBQUMsU0FBVU0sc0JBQXFCO0FBQzVCLE1BQUFBLHFCQUFvQixTQUFTLElBQUk7QUFDakMsTUFBQUEscUJBQW9CLGtCQUFrQixJQUFJO0FBQzFDLE1BQUFBLHFCQUFvQixpQkFBaUIsSUFBSTtBQUl6QyxNQUFBQSxxQkFBb0IsbUJBQW1CLElBQUk7QUFDM0MsTUFBQUEscUJBQW9CLFNBQVMsSUFBSTtBQUFBLElBQ3JDLEdBQUcsd0JBQXdCTixTQUFRLHNCQUFzQixzQkFBc0IsQ0FBQyxFQUFFO0FBS2xGLFFBQUk7QUFDSixLQUFDLFNBQVVPLG1CQUFrQjtBQUN6QixNQUFBQSxrQkFBaUIsT0FBTyxJQUFJO0FBQzVCLE1BQUFBLGtCQUFpQixLQUFLLElBQUk7QUFDMUIsTUFBQUEsa0JBQWlCLG1CQUFtQixJQUFJO0FBQUEsSUFDNUMsR0FBRyxxQkFBcUJQLFNBQVEsbUJBQW1CLG1CQUFtQixDQUFDLEVBQUU7QUFJekUsYUFBUyx1QkFBdUIsU0FBUztBQUNyQyxhQUFPLFFBQVEsZUFBZSxNQUFNLEtBQUssUUFBUSxlQUFlLGtCQUFrQjtBQUFBLElBQ3RGO0FBRlM7QUFHVCxJQUFBQSxTQUFRLHlCQUF5QjtBQW1CakMsUUFBSTtBQUNKLEtBQUMsU0FBVVEscUJBQW9CO0FBRTNCLE1BQUFBLG9CQUFtQixXQUFXLElBQUk7QUFDbEMsTUFBQUEsb0JBQW1CLFdBQVcsSUFBSTtBQUNsQyxNQUFBQSxvQkFBbUIsWUFBWSxJQUFJO0FBQ25DLE1BQUFBLG9CQUFtQixZQUFZLElBQUk7QUFDbkMsTUFBQUEsb0JBQW1CLGFBQWEsSUFBSTtBQUNwQyxNQUFBQSxvQkFBbUIsYUFBYSxJQUFJO0FBQ3BDLE1BQUFBLG9CQUFtQixVQUFVLElBQUk7QUFDakMsTUFBQUEsb0JBQW1CLFdBQVcsSUFBSTtBQUVsQyxNQUFBQSxvQkFBbUIsYUFBYSxJQUFJO0FBRXBDLE1BQUFBLG9CQUFtQixhQUFhLElBQUk7QUFDcEMsTUFBQUEsb0JBQW1CLFVBQVUsSUFBSTtBQUVqQyxNQUFBQSxvQkFBbUIsT0FBTyxJQUFJO0FBQzlCLE1BQUFBLG9CQUFtQixVQUFVLElBQUk7QUFDakMsTUFBQUEsb0JBQW1CLFdBQVcsSUFBSTtBQUNsQyxNQUFBQSxvQkFBbUIsWUFBWSxJQUFJO0FBQ25DLE1BQUFBLG9CQUFtQixVQUFVLElBQUk7QUFDakMsTUFBQUEsb0JBQW1CLG1CQUFtQixJQUFJO0FBQzFDLE1BQUFBLG9CQUFtQixxQkFBcUIsSUFBSTtBQUM1QyxNQUFBQSxvQkFBbUIscUJBQXFCLElBQUk7QUFFNUMsTUFBQUEsb0JBQW1CLFVBQVUsSUFBSTtBQUNqQyxNQUFBQSxvQkFBbUIsV0FBVyxJQUFJO0FBQ2xDLE1BQUFBLG9CQUFtQixZQUFZLElBQUk7QUFDbkMsTUFBQUEsb0JBQW1CLFlBQVksSUFBSTtBQUNuQyxNQUFBQSxvQkFBbUIsYUFBYSxJQUFJO0FBQ3BDLE1BQUFBLG9CQUFtQixhQUFhLElBQUk7QUFDcEMsTUFBQUEsb0JBQW1CLFVBQVUsSUFBSTtBQUNqQyxNQUFBQSxvQkFBbUIsV0FBVyxJQUFJO0FBRWxDLE1BQUFBLG9CQUFtQixhQUFhLElBQUk7QUFFcEMsTUFBQUEsb0JBQW1CLGFBQWEsSUFBSTtBQUNwQyxNQUFBQSxvQkFBbUIsVUFBVSxJQUFJO0FBS2pDLE1BQUFBLG9CQUFtQixZQUFZLElBQUk7QUFBQSxJQUN2QyxHQUFHLHVCQUF1QlIsU0FBUSxxQkFBcUIscUJBQXFCLENBQUMsRUFBRTtBQUkvRSxJQUFBQSxTQUFRLHFCQUFxQjtBQUFBLE1BQ3pCLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLE1BQ25CLG1CQUFtQjtBQUFBLElBQ3ZCO0FBS0EsSUFBQUEsU0FBUSxxQkFBcUI7QUFBQSxNQUN6QixHQUFHQSxTQUFRO0FBQUEsTUFDWCxtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxNQUNuQixtQkFBbUI7QUFBQSxJQUN2QjtBQUlBLElBQUFBLFNBQVEsb0JBQW9CO0FBQUEsTUFDeEIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsSUFDdkI7QUFTQSxRQUFJO0FBQ0osS0FBQyxTQUFVUyxnQkFBZTtBQUN0QixNQUFBQSxlQUFjLE9BQU8sSUFBSTtBQUN6QixNQUFBQSxlQUFjLFdBQVcsSUFBSTtBQUM3QixNQUFBQSxlQUFjLFVBQVUsSUFBSTtBQUM1QixNQUFBQSxlQUFjLFVBQVUsSUFBSTtBQUM1QixNQUFBQSxlQUFjLFdBQVcsSUFBSTtBQUM3QixNQUFBQSxlQUFjLFdBQVcsSUFBSTtBQUM3QixNQUFBQSxlQUFjLFlBQVksSUFBSTtBQUM5QixNQUFBQSxlQUFjLFlBQVksSUFBSTtBQUM5QixNQUFBQSxlQUFjLFlBQVksSUFBSTtBQUM5QixNQUFBQSxlQUFjLGFBQWEsSUFBSTtBQUMvQixNQUFBQSxlQUFjLGFBQWEsSUFBSTtBQUMvQixNQUFBQSxlQUFjLGNBQWMsSUFBSTtBQUNoQyxNQUFBQSxlQUFjLGNBQWMsSUFBSTtBQUFBLElBQ3BDLEdBQUcsa0JBQWtCVCxTQUFRLGdCQUFnQixnQkFBZ0IsQ0FBQyxFQUFFO0FBQ2hFLElBQUFBLFNBQVEsb0JBQW9CLE9BQU8sT0FBTyxhQUFhO0FBSXZELElBQUFBLFNBQVEsZ0JBQWdCO0FBQUEsTUFDcEIsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QsY0FBYztBQUFBLElBQ2xCO0FBSUEsSUFBQUEsU0FBUSxrQkFBa0I7QUFBQSxNQUN0QixjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsSUFDbEI7QUFJQSxRQUFJO0FBQ0osS0FBQyxTQUFVVSxjQUFhO0FBUXBCLE1BQUFBLGFBQVksU0FBUyxJQUFJO0FBQUEsSUFDN0IsR0FBRyxnQkFBZ0JWLFNBQVEsY0FBYyxjQUFjLENBQUMsRUFBRTtBQUMxRCxRQUFJO0FBQ0osS0FBQyxTQUFVVyxZQUFXO0FBQ2xCLE1BQUFBLFdBQVUsT0FBTyxJQUFJO0FBQ3JCLE1BQUFBLFdBQVUsY0FBYyxJQUFJO0FBQUEsSUFDaEMsR0FBRyxjQUFjWCxTQUFRLFlBQVksWUFBWSxDQUFDLEVBQUU7QUFBQTtBQUFBOzs7QUNsYnBEO0FBQUEsNkRBQUFZLFVBQUE7QUFBQTtBQUFBO0FBQ0EsV0FBTyxlQUFlQSxVQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxJQUFBQSxTQUFRLGNBQWNBLFNBQVEsa0JBQWtCQSxTQUFRLGVBQWVBLFNBQVEsdUJBQXVCQSxTQUFRLG9CQUFvQjtBQUNsSSxRQUFNLFFBQVE7QUEyQmQsYUFBUyxrQkFBa0IsT0FBTyxTQUFTO0FBQ3ZDLFlBQU0sSUFBSSxNQUFNLFdBQVcsbUNBQW1DLE9BQU8sS0FBSyxDQUFDLEVBQUU7QUFBQSxJQUNqRjtBQUZTO0FBR1QsSUFBQUEsU0FBUSxvQkFBb0I7QUFLNUIsYUFBUyxxQkFBcUIsT0FBTyxTQUFTO0FBQzFDLFVBQUksT0FBTyxVQUFVLFlBQVksTUFBTSxXQUFXLEdBQUc7QUFDakQsY0FBTSxLQUFLLG9CQUFvQixPQUFPLEdBQUcsV0FBVyxpQ0FBaUMsT0FBTyxLQUFLLENBQUMsRUFBRTtBQUFBLE1BQ3hHO0FBQ0EsYUFBTztBQUFBLElBQ1g7QUFMUztBQU1ULElBQUFBLFNBQVEsdUJBQXVCO0FBUS9CLGFBQVMsYUFBYSxPQUFPLFNBQVM7QUFDbEMsVUFBSSxPQUFPLFVBQVUsZUFBZSxVQUFVLE1BQU07QUFDaEQsY0FBTSxLQUFLLG9CQUFvQixPQUFPLEdBQUcsV0FBVyxzQkFBc0IsT0FBTyxLQUFLLENBQUMsRUFBRTtBQUFBLE1BQzdGO0FBQ0EsYUFBTztBQUFBLElBQ1g7QUFMUztBQU1ULElBQUFBLFNBQVEsZUFBZTtBQUN2QixhQUFTLG9CQUFvQixTQUFTO0FBQ2xDLGFBQU8sVUFBVSxNQUFNLG1CQUFtQjtBQUFBLElBQzlDO0FBRlM7QUFvQlQsYUFBUyxnQkFBZ0IsV0FBVyxTQUFTO0FBQ3pDLFVBQUksQ0FBQyxXQUFXO0FBQ1osY0FBTSxLQUFLLG9CQUFvQixPQUFPLEdBQUcsV0FBVyxrQkFBa0I7QUFBQSxNQUMxRTtBQUFBLElBQ0o7QUFKUztBQUtULElBQUFBLFNBQVEsa0JBQWtCO0FBSzFCLGFBQVMsWUFBWSxHQUFHO0FBQUEsSUFBRTtBQUFqQjtBQUNULElBQUFBLFNBQVEsY0FBYztBQUFBO0FBQUE7OztBQzFGdEI7QUFBQSxtRUFBQUMsVUFBQTtBQUFBO0FBQUE7QUFDQSxXQUFPLGVBQWVBLFVBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELElBQUFBLFNBQVEsWUFBWUEsU0FBUSxXQUFXQSxTQUFRLFFBQVFBLFNBQVEsWUFBWUEsU0FBUSxhQUFhO0FBQ2hHLGFBQVMsV0FBVyxLQUFLO0FBQ3JCLGFBQU8sT0FBTyxHQUFHO0FBQ2pCLGlCQUFXLEtBQUssT0FBTyxLQUFLLEdBQUcsR0FBRztBQUM5QixjQUFNLE1BQU07QUFDWixjQUFNLFFBQVEsSUFBSSxHQUFHO0FBQ3JCLFlBQUksVUFBVSxTQUFTLE9BQU8sVUFBVSxZQUFZLE9BQU8sVUFBVSxlQUFlLENBQUMsT0FBTyxTQUFTLEtBQUssR0FBRztBQUN6RyxxQkFBVyxLQUFLO0FBQUEsUUFDcEI7QUFBQSxNQUNKO0FBQ0EsYUFBTztBQUFBLElBQ1g7QUFWUztBQVdULElBQUFBLFNBQVEsYUFBYTtBQUlyQixhQUFTLFVBQVUsS0FBSztBQUNwQixhQUFPLENBQUMsTUFBTSxHQUFHO0FBQUEsSUFDckI7QUFGUztBQUdULElBQUFBLFNBQVEsWUFBWTtBQUlwQixhQUFTLE1BQU0sS0FBSztBQUNoQixhQUFPLE9BQU8sUUFBUSxlQUFlLFFBQVE7QUFBQSxJQUNqRDtBQUZTO0FBR1QsSUFBQUEsU0FBUSxRQUFRO0FBQ2hCLGFBQVMsU0FBUyxLQUFLO0FBQ25CLGFBQU8sS0FBSyxNQUFNLEtBQUssVUFBVSxHQUFHLENBQUM7QUFBQSxJQUN6QztBQUZTO0FBR1QsSUFBQUEsU0FBUSxXQUFXO0FBSW5CLGFBQVMsVUFBVSxLQUFLO0FBQ3BCLGFBQU8sT0FBTyxPQUFPLFFBQVEsWUFBWSxVQUFVO0FBQUEsSUFDdkQ7QUFGUztBQUdULElBQUFBLFNBQVEsWUFBWTtBQUFBO0FBQUE7OztBQ3ZDcEI7QUFBQSxnRUFBQUMsVUFBQTtBQUFBO0FBQUE7QUFDQSxXQUFPLGVBQWVBLFVBQVMsY0FBYyxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQzVELElBQUFBLFNBQVEsMEJBQTBCQSxTQUFRLHVCQUF1QkEsU0FBUSxvQkFBb0JBLFNBQVEsaUJBQWlCQSxTQUFRLHFCQUFxQjtBQUNuSixRQUFNLFdBQVc7QUFDakIsUUFBTSxXQUFXO0FBQ2pCLGFBQVMsbUJBQW1CLFFBQVE7QUFDaEMsYUFBTyxJQUFJLG1CQUFtQixNQUFNO0FBQUEsSUFDeEM7QUFGUztBQUdULElBQUFBLFNBQVEscUJBQXFCO0FBQzdCLFFBQU0sc0JBQU4sTUFBTSxvQkFBbUI7QUFBQSxNQUNyQixZQUFZLFFBQVE7QUFDaEIsYUFBSyxVQUFVO0FBQ2YsYUFBSywyQkFBMkIsTUFBTTtBQUFBLE1BQzFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BTUEsMkJBQTJCLFFBQVE7QUFDL0IsY0FBTTtBQUFBO0FBQUEsVUFFTjtBQUFBLFVBQUk7QUFBQSxVQUFZO0FBQUEsVUFBUztBQUFBLFVBQWlCO0FBQUEsVUFBb0I7QUFBQSxVQUFVO0FBQUEsVUFBVTtBQUFBLFVBQVM7QUFBQSxVQUFZO0FBQUEsVUFBTTtBQUFBLFVBQWE7QUFBQSxVQUFVO0FBQUE7QUFBQSxVQUVwSTtBQUFBLFVBQTBCO0FBQUEsVUFBZTtBQUFBLFVBQWM7QUFBQSxVQUFvQjtBQUFBLFVBQWlCO0FBQUEsVUFBZTtBQUFBLFVBQWE7QUFBQSxVQUFtQjtBQUFBLFVBQW1CO0FBQUEsVUFBb0I7QUFBQSxVQUFvQjtBQUFBLFVBQW1CO0FBQUEsVUFBZ0I7QUFBQSxVQUFpQjtBQUFBLFVBQXVCO0FBQUEsVUFBaUI7QUFBQSxVQUFPO0FBQUEsVUFBUSxHQUFHO0FBQUEsUUFBSyxJQUFJO0FBQzdULFNBQUMsR0FBRyxTQUFTLGFBQWE7QUFBQSxNQUM5QjtBQUFBLE1BQ0EsSUFBSSxLQUFLO0FBQ0wsWUFBSTtBQUNKLGdCQUFRLEtBQUssS0FBSyxRQUFRLGdCQUFnQixRQUFRLE9BQU8sU0FBUyxLQUFLLEtBQUssUUFBUTtBQUFBLE1BQ3hGO0FBQUEsTUFDQSxJQUFJLFVBQVU7QUFDVixZQUFJO0FBQ0osZ0JBQVEsS0FBSyxLQUFLLFFBQVEscUJBQXFCLFFBQVEsT0FBTyxTQUFTLEtBQUssS0FBSyxRQUFRO0FBQUEsTUFDN0Y7QUFBQSxNQUNBLElBQUksV0FBVztBQUNYLFlBQUk7QUFDSixnQkFBUSxLQUFLLEtBQUssUUFBUSx3QkFBd0IsUUFBUSxPQUFPLFNBQVMsS0FBSyxLQUFLLFFBQVE7QUFBQSxNQUNoRztBQUFBLE1BQ0EsSUFBSSxXQUFXO0FBQ1gsZUFBTyxLQUFLLFFBQVE7QUFBQSxNQUN4QjtBQUFBLE1BQ0EsSUFBSSxVQUFVO0FBQ1YsZUFBTyxLQUFLLFFBQVE7QUFBQSxNQUN4QjtBQUFBLE1BQ0EsSUFBSSxhQUFhO0FBQ2IsZUFBTyxLQUFLLFFBQVE7QUFBQSxNQUN4QjtBQUFBLE1BQ0EsSUFBSSxPQUFPO0FBQ1AsZUFBTyxLQUFLLFFBQVE7QUFBQSxNQUN4QjtBQUFBLE1BQ0EsSUFBSSxjQUFjO0FBQ2QsWUFBSSxJQUFJO0FBQ1IsZ0JBQVEsS0FBSyxLQUFLLFFBQVEsaUJBQWlCLFFBQVEsT0FBTyxTQUFTLE1BQU0sS0FBSyxLQUFLLFFBQVEsY0FBYyxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUc7QUFBQSxNQUNqSjtBQUFBLE1BQ0EsSUFBSSxXQUFXO0FBQ1gsZUFBTyxLQUFLLFFBQVE7QUFBQSxNQUN4QjtBQUFBLE1BQ0EsSUFBSSxvQkFBb0I7QUFDcEIsZUFBTyxLQUFLLFFBQVE7QUFBQSxNQUN4QjtBQUFBLE1BQ0EsSUFBSSxnQkFBZ0I7QUFDaEIsWUFBSTtBQUNKLGdCQUFRLEtBQUssS0FBSyxRQUFRLG1CQUFtQixRQUFRLE9BQU8sU0FBUyxLQUFLLEtBQUssUUFBUTtBQUFBLE1BQzNGO0FBQUEsSUFDSjtBQXhEeUI7QUFBekIsUUFBTSxxQkFBTjtBQXlEQSxhQUFTLGVBQWUsS0FBSztBQUN6QixhQUFPLElBQUksZUFBZSxHQUFHO0FBQUEsSUFDakM7QUFGUztBQUdULElBQUFBLFNBQVEsaUJBQWlCO0FBQ3pCLFFBQU0sa0JBQU4sTUFBTSxnQkFBZTtBQUFBLE1BQ2pCLFlBQVksS0FBSztBQUNiLGFBQUssT0FBTztBQUFBLE1BQ2hCO0FBQUEsTUFDQSxJQUFJLGVBQWU7QUFDZixZQUFJO0FBQ0osZ0JBQVEsS0FBSyxLQUFLLEtBQUssb0JBQW9CLFFBQVEsT0FBTyxTQUFTLEtBQUssS0FBSyxLQUFLO0FBQUEsTUFDdEY7QUFBQSxJQUNKO0FBUnFCO0FBQXJCLFFBQU0saUJBQU47QUFTQSxhQUFTLGtCQUFrQixNQUFNO0FBQzdCLGFBQU8sSUFBSSxrQkFBa0IsSUFBSTtBQUFBLElBQ3JDO0FBRlM7QUFHVCxJQUFBQSxTQUFRLG9CQUFvQjtBQUM1QixRQUFNLHFCQUFOLE1BQU0sbUJBQWtCO0FBQUEsTUFDcEIsWUFBWSxNQUFNO0FBQ2QsYUFBSyxRQUFRO0FBQUEsTUFDakI7QUFBQSxNQUNBLElBQUksYUFBYTtBQUNiLFlBQUk7QUFDSixnQkFBUSxHQUFHLFNBQVMsZUFBZSxLQUFLLEtBQUssTUFBTSxnQkFBZ0IsUUFBUSxPQUFPLFNBQVMsS0FBSyxLQUFLLE1BQU0saUJBQWlCO0FBQUEsTUFDaEk7QUFBQSxJQUNKO0FBUndCO0FBQXhCLFFBQU0sb0JBQU47QUFTQSxhQUFTLHFCQUFxQixNQUFNO0FBQ2hDLGFBQU8sSUFBSSxxQkFBcUIsSUFBSTtBQUFBLElBQ3hDO0FBRlM7QUFHVCxJQUFBQSxTQUFRLHVCQUF1QjtBQUMvQixRQUFNLHdCQUFOLE1BQU0sc0JBQXFCO0FBQUEsTUFDdkIsWUFBWSxNQUFNO0FBQ2QsYUFBSyxRQUFRO0FBQUEsTUFDakI7QUFBQSxNQUNBLElBQUksYUFBYTtBQUNiLFlBQUk7QUFDSixnQkFBUSxHQUFHLFNBQVMsZUFBZSxLQUFLLEtBQUssTUFBTSxnQkFBZ0IsUUFBUSxPQUFPLFNBQVMsS0FBSyxLQUFLLE1BQU0saUJBQWlCO0FBQUEsTUFDaEk7QUFBQSxJQUNKO0FBUjJCO0FBQTNCLFFBQU0sdUJBQU47QUFTQSxhQUFTLHdCQUF3QixVQUFVO0FBQ3ZDLGFBQU8sSUFBSSx3QkFBd0IsUUFBUTtBQUFBLElBQy9DO0FBRlM7QUFHVCxJQUFBQSxTQUFRLDBCQUEwQjtBQUNsQyxRQUFNLDJCQUFOLE1BQU0seUJBQXdCO0FBQUEsTUFDMUIsWUFBWSxVQUFVO0FBQ2xCLGFBQUssWUFBWTtBQUFBLE1BQ3JCO0FBQUEsTUFDQSxJQUFJLGFBQWE7QUFDYixZQUFJO0FBQ0osZ0JBQVEsR0FBRyxTQUFTLGVBQWUsS0FBSyxLQUFLLFVBQVUsZ0JBQWdCLFFBQVEsT0FBTyxTQUFTLEtBQUssS0FBSyxVQUFVLGlCQUFpQjtBQUFBLE1BQ3hJO0FBQUEsSUFDSjtBQVI4QjtBQUE5QixRQUFNLDBCQUFOO0FBQUE7QUFBQTs7O0FDN0dBO0FBQUEsd0NBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQU9BLFFBQU0sWUFBWSxrQ0FBUyxNQUFNLENBQUMsRUFBRSxrQkFBa0IsSUFBSSxNQUFNLE1BQU0sQ0FBQyxHQUFyRDtBQUVsQixJQUFBQSxRQUFPLFVBQVUsV0FBUztBQUN4QixVQUFJLFVBQVUsUUFBUSxVQUFVO0FBQVEsZUFBTztBQUMvQyxVQUFJLE9BQU8sTUFBTSxhQUFhO0FBQVksZUFBTztBQUVqRCxVQUFJLFFBQVEsTUFBTSxTQUFTLEVBQUUsS0FBSztBQUNsQyxVQUFJLFVBQVU7QUFBSSxlQUFPO0FBQ3pCLFVBQUksTUFBTSxXQUFXO0FBQUcsZUFBTyxNQUFNLGtCQUFrQjtBQUV2RCxVQUFJLFFBQVEsTUFBTSxNQUFNLGVBQWU7QUFDdkMsVUFBSSxPQUFPO0FBQ1QsZUFBTyxNQUFNLElBQUksT0FBSyxVQUFVLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUFBLE1BQzdDO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQTtBQUFBOzs7QUN2QkE7QUFBQSxxREFBQUMsVUFBQTtBQUFBO0FBQUE7QUFDQSxRQUFJLGtCQUFtQkEsWUFBUUEsU0FBSyxtQkFBb0IsU0FBVSxLQUFLO0FBQ25FLGFBQVEsT0FBTyxJQUFJLGFBQWMsTUFBTSxFQUFFLFdBQVcsSUFBSTtBQUFBLElBQzVEO0FBQ0EsV0FBTyxlQUFlQSxVQUFTLGNBQWMsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM1RCxJQUFBQSxTQUFRLDRDQUE0Q0EsU0FBUSxlQUFlQSxTQUFRLHNDQUFzQ0EsU0FBUSx3QkFBd0JBLFNBQVEsa0JBQWtCQSxTQUFRLDJDQUEyQ0EsU0FBUSwwQkFBMEJBLFNBQVEsa0NBQWtDQSxTQUFRLHlCQUF5QkEsU0FBUSxxQkFBcUJBLFNBQVEsbUJBQW1CQSxTQUFRLGFBQWFBLFNBQVEsaUJBQWlCQSxTQUFRLHlCQUF5QkEsU0FBUSwwQkFBMEJBLFNBQVEsaUNBQWlDQSxTQUFRLFVBQVVBLFNBQVEsV0FBV0EsU0FBUSxzQkFBc0JBLFNBQVEsc0JBQXNCQSxTQUFRLGlCQUFpQkEsU0FBUSxnQkFBZ0JBLFNBQVEsb0JBQW9CQSxTQUFRLHNCQUFzQkEsU0FBUSw0QkFBNEJBLFNBQVEsbUJBQW1CQSxTQUFRLDZCQUE2QkEsU0FBUSw2QkFBNkJBLFNBQVEsZUFBZUEsU0FBUSxrQkFBa0JBLFNBQVEsbUJBQW1CQSxTQUFRLGVBQWVBLFNBQVEsa0JBQWtCQSxTQUFRLG1CQUFtQkEsU0FBUSxlQUFlQSxTQUFRLGlCQUFpQkEsU0FBUSw2QkFBNkJBLFNBQVEsdUJBQXVCQSxTQUFRLHdCQUF3QkEsU0FBUSx1QkFBdUJBLFNBQVEsdUJBQXVCQSxTQUFRLGdCQUFnQkEsU0FBUSxZQUFZO0FBQ2h4QyxRQUFNLFdBQVc7QUFDakIsUUFBTSxpQkFBaUI7QUFDdkIsUUFBTSxXQUFXO0FBQ2pCLFFBQU0sV0FBVztBQUNqQixRQUFNLFdBQVc7QUFDakIsUUFBTSxXQUFXO0FBQ2pCLFFBQU0sY0FBYztBQUNwQixRQUFNLGVBQWUsZ0JBQWdCLG9CQUFxQjtBQU8xRCxRQUFJQztBQUNKLEtBQUMsU0FBVUEsWUFBVztBQUlsQixNQUFBQSxXQUFVLFNBQVMsSUFBSTtBQUl2QixNQUFBQSxXQUFVLFFBQVEsSUFBSTtBQUl0QixNQUFBQSxXQUFVLFFBQVEsSUFBSTtBQUl0QixNQUFBQSxXQUFVLE9BQU8sSUFBSTtBQUlyQixNQUFBQSxXQUFVLFFBQVEsSUFBSTtBQUFBLElBQzFCLEdBQUdBLGVBQWNELFNBQVEsWUFBWUMsYUFBWSxDQUFDLEVBQUU7QUFJcEQsUUFBSUM7QUFDSixLQUFDLFNBQVVBLGdCQUFlO0FBSXRCLE1BQUFBLGVBQWMsTUFBTSxJQUFJO0FBSXhCLE1BQUFBLGVBQWMsTUFBTSxJQUFJO0FBSXhCLE1BQUFBLGVBQWMsVUFBVSxJQUFJO0FBSTVCLE1BQUFBLGVBQWMsVUFBVSxJQUFJO0FBSTVCLE1BQUFBLGVBQWMsT0FBTyxJQUFJO0FBb0J6QixNQUFBQSxlQUFjLFFBQVEsSUFBSTtBQUkxQixNQUFBQSxlQUFjLFNBQVMsSUFBSTtBQUkzQixNQUFBQSxlQUFjLFVBQVUsSUFBSTtBQVE1QixNQUFBQSxlQUFjLGdCQUFnQixJQUFJO0FBS2xDLE1BQUFBLGVBQWMsaUJBQWlCLElBQUk7QUFJbkMsTUFBQUEsZUFBYyxLQUFLLElBQUk7QUFJdkIsTUFBQUEsZUFBYyxVQUFVLElBQUk7QUFJNUIsTUFBQUEsZUFBYyxNQUFNLElBQUk7QUFLeEIsTUFBQUEsZUFBYyxPQUFPLElBQUk7QUEwQnpCLE1BQUFBLGVBQWMsV0FBVyxJQUFJO0FBSzdCLE1BQUFBLGVBQWMsWUFBWSxJQUFJO0FBSTlCLE1BQUFBLGVBQWMsUUFBUSxJQUFJO0FBSTFCLE1BQUFBLGVBQWMsT0FBTyxJQUFJO0FBSXpCLE1BQUFBLGVBQWMsYUFBYSxJQUFJO0FBSS9CLE1BQUFBLGVBQWMsUUFBUSxJQUFJO0FBRTFCLE1BQUFBLGVBQWMsc0JBQXNCLElBQUk7QUFJeEMsTUFBQUEsZUFBYyxZQUFZLElBQUk7QUFBQSxJQUNsQyxHQUFHQSxtQkFBa0JGLFNBQVEsZ0JBQWdCRSxpQkFBZ0IsQ0FBQyxFQUFFO0FBQ2hFLElBQUFGLFNBQVEsdUJBQXVCO0FBQUEsTUFDM0JFLGVBQWM7QUFBQSxNQUNkQSxlQUFjO0FBQUEsTUFDZEEsZUFBYztBQUFBLE1BQ2RBLGVBQWM7QUFBQSxNQUNkQSxlQUFjO0FBQUEsTUFDZEEsZUFBYztBQUFBLE1BQ2RBLGVBQWM7QUFBQSxNQUNkQSxlQUFjO0FBQUEsTUFDZEEsZUFBYztBQUFBLE1BQ2RBLGVBQWM7QUFBQSxNQUNkQSxlQUFjO0FBQUEsTUFDZEEsZUFBYztBQUFBLE1BQ2RBLGVBQWM7QUFBQSxNQUNkQSxlQUFjO0FBQUEsSUFDbEI7QUFDQSxJQUFBRixTQUFRLHVCQUF1QjtBQUFBLE1BQzNCRSxlQUFjO0FBQUEsTUFDZEEsZUFBYztBQUFBLE1BQ2RBLGVBQWM7QUFBQSxNQUNkQSxlQUFjO0FBQUEsTUFDZEEsZUFBYztBQUFBLE1BQ2RBLGVBQWM7QUFBQSxNQUNkQSxlQUFjO0FBQUEsTUFDZEEsZUFBYztBQUFBLE1BQ2RBLGVBQWM7QUFBQSxJQUNsQjtBQUNBLElBQUFGLFNBQVEsd0JBQXdCLENBQUNFLGVBQWMsTUFBTTtBQUNyRCxJQUFBRixTQUFRLHVCQUF1QixDQUFDRSxlQUFjLFFBQVFBLGVBQWMsV0FBV0EsZUFBYyxVQUFVO0FBQ3ZHLElBQUFGLFNBQVEsNkJBQTZCLENBQUNFLGVBQWMsWUFBWUEsZUFBYyxTQUFTO0FBTXZGLFFBQUk7QUFDSixLQUFDLFNBQVVDLGlCQUFnQjtBQUl2QixNQUFBQSxnQkFBZSxVQUFVLElBQUk7QUFVN0IsTUFBQUEsZ0JBQWUsWUFBWSxJQUFJO0FBSS9CLE1BQUFBLGdCQUFlLFdBQVcsSUFBSTtBQUFBLElBQ2xDLEdBQUcsbUJBQW1CSCxTQUFRLGlCQUFpQixpQkFBaUIsQ0FBQyxFQUFFO0FBTW5FLFFBQUk7QUFDSixLQUFDLFNBQVVJLGVBQWM7QUFDckIsTUFBQUEsY0FBYSxNQUFNLElBQUk7QUFDdkIsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxNQUFNLElBQUk7QUFDdkIsTUFBQUEsY0FBYSxLQUFLLElBQUk7QUFDdEIsTUFBQUEsY0FBYSxTQUFTLElBQUk7QUFDMUIsTUFBQUEsY0FBYSxNQUFNLElBQUk7QUFDdkIsTUFBQUEsY0FBYSxVQUFVLElBQUk7QUFDM0IsTUFBQUEsY0FBYSxPQUFPLElBQUk7QUFDeEIsTUFBQUEsY0FBYSxPQUFPLElBQUk7QUFDeEIsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxXQUFXLElBQUk7QUFDNUIsTUFBQUEsY0FBYSxVQUFVLElBQUk7QUFDM0IsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxRQUFRLElBQUk7QUFDekIsTUFBQUEsY0FBYSxTQUFTLElBQUk7QUFDMUIsTUFBQUEsY0FBYSxVQUFVLElBQUk7QUFDM0IsTUFBQUEsY0FBYSxPQUFPLElBQUk7QUFDeEIsTUFBQUEsY0FBYSxLQUFLLElBQUk7QUFDdEIsTUFBQUEsY0FBYSxXQUFXLElBQUk7QUFDNUIsTUFBQUEsY0FBYSxXQUFXLElBQUk7QUFBQSxJQUNoQyxHQUFHLGlCQUFpQkosU0FBUSxlQUFlLGVBQWUsQ0FBQyxFQUFFO0FBSTdELFFBQUk7QUFDSixLQUFDLFNBQVVLLG1CQUFrQjtBQUl6QixNQUFBQSxrQkFBaUIsY0FBYyxJQUFJO0FBSW5DLE1BQUFBLGtCQUFpQixVQUFVLElBQUk7QUFJL0IsTUFBQUEsa0JBQWlCLFdBQVcsSUFBSTtBQUFBLElBQ3BDLEdBQUcscUJBQXFCTCxTQUFRLG1CQUFtQixtQkFBbUIsQ0FBQyxFQUFFO0FBSXpFLFFBQUk7QUFDSixLQUFDLFNBQVVNLGtCQUFpQjtBQUl4QixNQUFBQSxpQkFBZ0IsVUFBVSxJQUFJO0FBSTlCLE1BQUFBLGlCQUFnQixLQUFLLElBQUk7QUFJekIsTUFBQUEsaUJBQWdCLE9BQU8sSUFBSTtBQUkzQixNQUFBQSxpQkFBZ0IsTUFBTSxJQUFJO0FBSTFCLE1BQUFBLGlCQUFnQixPQUFPLElBQUk7QUFBQSxJQUMvQixHQUFHLG9CQUFvQk4sU0FBUSxrQkFBa0Isa0JBQWtCLENBQUMsRUFBRTtBQUl0RSxRQUFJO0FBQ0osS0FBQyxTQUFVTyxlQUFjO0FBRXJCLE1BQUFBLGNBQWEsVUFBVSxJQUFJO0FBRTNCLE1BQUFBLGNBQWEsT0FBTyxJQUFJO0FBQUEsSUFDNUIsR0FBRyxpQkFBaUJQLFNBQVEsZUFBZSxlQUFlLENBQUMsRUFBRTtBQUk3RCxRQUFJO0FBQ0osS0FBQyxTQUFVUSxtQkFBa0I7QUFFekIsTUFBQUEsa0JBQWlCLFNBQVMsSUFBSTtBQUU5QixNQUFBQSxrQkFBaUIsUUFBUSxJQUFJO0FBQUEsSUFDakMsR0FBRyxxQkFBcUJSLFNBQVEsbUJBQW1CLG1CQUFtQixDQUFDLEVBQUU7QUFJekUsUUFBSTtBQUNKLEtBQUMsU0FBVVMsa0JBQWlCO0FBRXhCLE1BQUFBLGlCQUFnQixNQUFNLElBQUk7QUFFMUIsTUFBQUEsaUJBQWdCLFFBQVEsSUFBSTtBQUFBLElBQ2hDLEdBQUcsb0JBQW9CVCxTQUFRLGtCQUFrQixrQkFBa0IsQ0FBQyxFQUFFO0FBSXRFLFFBQUk7QUFDSixLQUFDLFNBQVVVLGVBQWM7QUFJckIsTUFBQUEsY0FBYSxNQUFNLElBQUk7QUFJdkIsTUFBQUEsY0FBYSxPQUFPLElBQUk7QUFJeEIsTUFBQUEsY0FBYSxTQUFTLElBQUk7QUFJMUIsTUFBQUEsY0FBYSxTQUFTLElBQUk7QUFBQSxJQUM5QixHQUFHLGlCQUFpQlYsU0FBUSxlQUFlLGVBQWUsQ0FBQyxFQUFFO0FBSTdELElBQUFBLFNBQVEsNkJBQTZCO0FBQUEsTUFDakNFLGVBQWM7QUFBQSxNQUNkQSxlQUFjO0FBQUEsTUFDZEEsZUFBYztBQUFBLE1BQ2RBLGVBQWM7QUFBQSxNQUNkQSxlQUFjO0FBQUEsTUFDZEEsZUFBYztBQUFBLElBQ2xCO0FBT0EsSUFBQUYsU0FBUSw2QkFBNkI7QUFLckMsUUFBSTtBQUNKLEtBQUMsU0FBVVcsbUJBQWtCO0FBQ3pCLE1BQUFBLGtCQUFpQixVQUFVLElBQUk7QUFDL0IsTUFBQUEsa0JBQWlCLEtBQUssSUFBSTtBQUFBLElBQzlCLEdBQUcscUJBQXFCWCxTQUFRLG1CQUFtQixtQkFBbUIsQ0FBQyxFQUFFO0FBS3pFLFFBQUk7QUFDSixLQUFDLFNBQVVZLDRCQUEyQjtBQUVsQyxNQUFBQSwyQkFBMEIsV0FBVyxJQUFJO0FBRXpDLE1BQUFBLDJCQUEwQixVQUFVLElBQUk7QUFFeEMsTUFBQUEsMkJBQTBCLE9BQU8sSUFBSTtBQUVyQyxNQUFBQSwyQkFBMEIsU0FBUyxJQUFJO0FBQUEsSUFDM0MsR0FBRyw4QkFBOEJaLFNBQVEsNEJBQTRCLDRCQUE0QixDQUFDLEVBQUU7QUFJcEcsUUFBSTtBQUNKLEtBQUMsU0FBVWEsc0JBQXFCO0FBSTVCLE1BQUFBLHFCQUFvQixTQUFTLElBQUk7QUFBQSxJQUNyQyxHQUFHLHdCQUF3QmIsU0FBUSxzQkFBc0Isc0JBQXNCLENBQUMsRUFBRTtBQUlsRixRQUFJO0FBQ0osS0FBQyxTQUFVYyxvQkFBbUI7QUFJMUIsTUFBQUEsbUJBQWtCLFNBQVMsSUFBSTtBQUFBLElBQ25DLEdBQUcsc0JBQXNCZCxTQUFRLG9CQUFvQixvQkFBb0IsQ0FBQyxFQUFFO0FBTzVFLFFBQUk7QUFDSixLQUFDLFNBQVVlLGdCQUFlO0FBQ3RCLE1BQUFBLGVBQWMsTUFBTSxJQUFJO0FBQ3hCLE1BQUFBLGVBQWMsT0FBTyxJQUFJO0FBQ3pCLE1BQUFBLGVBQWMsUUFBUSxJQUFJO0FBQzFCLE1BQUFBLGVBQWMsVUFBVSxJQUFJO0FBQzVCLE1BQUFBLGVBQWMsUUFBUSxJQUFJO0FBQUEsSUFDOUIsR0FBRyxrQkFBa0JmLFNBQVEsZ0JBQWdCLGdCQUFnQixDQUFDLEVBQUU7QUFTaEUsUUFBSTtBQUNKLEtBQUMsU0FBVWdCLGlCQUFnQjtBQUN2QixNQUFBQSxnQkFBZSxXQUFXLElBQUk7QUFDOUIsTUFBQUEsZ0JBQWUsUUFBUSxJQUFJO0FBQUEsSUFDL0IsR0FBRyxtQkFBbUJoQixTQUFRLGlCQUFpQixpQkFBaUIsQ0FBQyxFQUFFO0FBU25FLFFBQUk7QUFDSixLQUFDLFNBQVVpQixzQkFBcUI7QUFJNUIsTUFBQUEscUJBQW9CQSxxQkFBb0IsTUFBTSxJQUFJLENBQUMsSUFBSTtBQUl2RCxNQUFBQSxxQkFBb0JBLHFCQUFvQixNQUFNLElBQUksQ0FBQyxJQUFJO0FBSXZELE1BQUFBLHFCQUFvQkEscUJBQW9CLE9BQU8sSUFBSSxDQUFDLElBQUk7QUFBQSxJQUM1RCxHQUFHLHdCQUF3QmpCLFNBQVEsc0JBQXNCLHNCQUFzQixDQUFDLEVBQUU7QUFXbEYsYUFBUyxvQkFBb0IsTUFBTTtBQUMvQixhQUFPO0FBQUEsSUFDWDtBQUZTO0FBR1QsSUFBQUEsU0FBUSxzQkFBc0I7QUFDOUIsYUFBUyxTQUFTLEtBQUs7QUFDbkIsYUFBTyxRQUFRLE9BQU8sSUFBSSxTQUFTQyxXQUFVLE1BQU07QUFBQSxJQUN2RDtBQUZTO0FBR1QsSUFBQUQsU0FBUSxXQUFXO0FBQ25CLGFBQVMsUUFBUSxLQUFLO0FBQ2xCLGFBQU8sUUFBUSxPQUFPLElBQUksU0FBU0MsV0FBVSxLQUFLO0FBQUEsSUFDdEQ7QUFGUztBQUdULElBQUFELFNBQVEsVUFBVTtBQUNsQixhQUFTLCtCQUErQixRQUFRO0FBQzVDLGFBQU8sUUFBUSxXQUFXLFFBQVEsV0FBVyxTQUFTLFNBQVMsT0FBTyxRQUFRLEtBQUssQ0FBQ0UsZUFBYyxZQUFZQSxlQUFjLFNBQVMsRUFBRSxTQUFTLE9BQU8sUUFBUTtBQUFBLElBQ25LO0FBRlM7QUFHVCxJQUFBRixTQUFRLGlDQUFpQztBQUN6QyxhQUFTLHdCQUF3QixRQUFRO0FBQ3JDLFlBQU0sa0JBQWtCLHVCQUF1QixNQUFNO0FBQ3JELFVBQUksK0JBQStCLGVBQWUsR0FBRztBQUNqRCxlQUFPLGdCQUFnQjtBQUFBLE1BQzNCO0FBQUEsSUFDSjtBQUxTO0FBTVQsSUFBQUEsU0FBUSwwQkFBMEI7QUFJbEMsYUFBUyx1QkFBdUIsS0FBSztBQUNqQyxVQUFJLENBQUMsUUFBUSxHQUFHLEdBQUc7QUFDZixlQUFPO0FBQUEsTUFDWDtBQUNBLFVBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxHQUFHO0FBQ3JCLGVBQU8sSUFBSTtBQUFBLE1BQ2Y7QUFBQSxJQUNKO0FBUFM7QUFRVCxJQUFBQSxTQUFRLHlCQUF5QjtBQWVqQyxhQUFTLGVBQWUsS0FBSztBQUN6QixVQUFJLE1BQU0sUUFBUSxHQUFHLEdBQUc7QUFDcEIsWUFBSSxJQUFJLFdBQVcsR0FBRztBQUNsQixnQkFBTSxJQUFJLE1BQU0saUNBQWlDO0FBQUEsUUFDckQ7QUFDQSxlQUFPLEVBQUUsTUFBTUMsV0FBVSxPQUFPLE9BQU8sZUFBZSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQUEsTUFDbEU7QUFDQSxVQUFJLE9BQU8sUUFBUSxVQUFVO0FBQ3pCLGNBQU0sYUFBYSxDQUFDO0FBQ3BCLFlBQUksUUFBUSxNQUFNO0FBRWQsaUJBQU8sRUFBRSxNQUFNQSxXQUFVLE9BQU87QUFBQSxRQUNwQztBQUNBLG1CQUFXLE9BQU8sS0FBSztBQUNuQixjQUFJLElBQUksZUFBZSxHQUFHLEdBQUc7QUFDekIsdUJBQVcsR0FBRyxJQUFJLGVBQWUsSUFBSSxHQUFHLENBQUM7QUFBQSxVQUM3QztBQUFBLFFBQ0o7QUFDQSxlQUFPLEVBQUUsTUFBTUEsV0FBVSxRQUFRLFdBQVc7QUFBQSxNQUNoRCxXQUNTLE9BQU8sUUFBUSxVQUFVO0FBQzlCLGVBQU8sRUFBRSxNQUFNQSxXQUFVLE9BQU87QUFBQSxNQUNwQyxXQUNTLE9BQU8sUUFBUSxXQUFXO0FBQy9CLGVBQU8sRUFBRSxNQUFNQSxXQUFVLFFBQVE7QUFBQSxNQUNyQyxXQUNTLE9BQU8sUUFBUSxVQUFVO0FBQzlCLGVBQU8sRUFBRSxNQUFNQSxXQUFVLE9BQU87QUFBQSxNQUNwQztBQUNBLGNBQVEsR0FBRyxTQUFTLG1CQUFtQixHQUFHO0FBQUEsSUFDOUM7QUE5QlM7QUErQlQsSUFBQUQsU0FBUSxpQkFBaUI7QUF1QnpCLGFBQVMsV0FBVyxRQUFRO0FBQ3hCLGFBQU87QUFBQSxJQUNYO0FBRlM7QUFHVCxJQUFBQSxTQUFRLGFBQWE7QUFxQnJCLGFBQVNrQixrQkFBaUIsV0FBVztBQUNqQyxZQUFNLFNBQVMsRUFBRSxHQUFHLFdBQVcsTUFBTWpCLFdBQVUsT0FBTztBQUV0RCxpQkFBVyxPQUFPLE9BQU8sS0FBSyxPQUFPLFVBQVUsR0FBRztBQUU5QyxZQUFJLFFBQVEsUUFBUTtBQUVoQixnQkFBTSxXQUFXO0FBQ2pCLGdCQUFNLG1CQUFtQix1QkFBdUIsT0FBTyxXQUFXLEdBQUcsQ0FBQztBQUN0RSxnQkFBTSxlQUFlLHFCQUFxQixRQUFRLHFCQUFxQixTQUFTLFNBQVMsaUJBQWlCO0FBQzFHLGdCQUFNLGtCQUFrQixPQUFPLGlCQUFpQixhQUFhLGVBQWU7QUFDNUUsaUJBQU8sV0FBVyxRQUFRLEtBQUssR0FBRyxlQUFlLFVBQVUsT0FBTyxXQUFXLEdBQUcsQ0FBQztBQUdqRixjQUFJLGlCQUFpQjtBQUNqQixrQkFBTSx1QkFBdUIsdUJBQXVCLE9BQU8sV0FBVyxRQUFRLENBQUM7QUFDL0UsYUFBQyxHQUFHLFNBQVMsY0FBYyxzQkFBc0IsNkNBQTZDO0FBQzlGLGlDQUFxQixVQUFVO0FBQUEsVUFDbkM7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUNBLDJCQUFxQixNQUFNO0FBQzNCLGFBQU87QUFBQSxJQUNYO0FBdkJTLFdBQUFpQixtQkFBQTtBQXdCVCxJQUFBbEIsU0FBUSxtQkFBbUJrQjtBQUMzQixhQUFTLHFCQUFxQixRQUFRO0FBS2xDLFVBQUksT0FBTyxhQUFhaEIsZUFBYyxXQUFXO0FBQzdDLGNBQU0sRUFBRSxJQUFJLFVBQVUsUUFBUSxLQUFLLEdBQUcsWUFBWSxvQkFBb0IsTUFBTTtBQUM1RSx5Q0FBaUMsSUFBSSxjQUFjLE9BQU8sUUFBUTtBQUNsRSx5Q0FBaUMsVUFBVSxZQUFZLE9BQU8sUUFBUTtBQUN0RSx5Q0FBaUMsU0FBUyxtQkFBbUIsT0FBTyxRQUFRO0FBQzVFLHVDQUErQixHQUFHLFNBQVMsY0FBYyxFQUFFLEdBQUcsUUFBUSxZQUFZO0FBQ2xGLHVDQUErQixHQUFHLFNBQVMsY0FBYyxPQUFPLEdBQUcsUUFBUSxpQkFBaUI7QUFBQSxNQUNoRztBQUNBLFVBQUksT0FBTyxhQUFhQSxlQUFjLFFBQVE7QUFDMUMsY0FBTSxFQUFFLEdBQUcsS0FBSyxHQUFHLFlBQVksb0JBQW9CLE1BQU07QUFDekQseUNBQWlDLElBQUksY0FBYyxPQUFPLFFBQVE7QUFDbEUsdUNBQStCLEdBQUcsU0FBUyxjQUFjLEVBQUUsR0FBRyxRQUFRLFlBQVk7QUFBQSxNQUN0RjtBQUNBLGlCQUFXLENBQUMsY0FBYyxjQUFjLEtBQUssT0FBTyxRQUFRLE9BQU8sVUFBVSxHQUFHO0FBQzVFLFlBQUksZUFBZSxTQUFTRCxXQUFVLFFBQVE7QUFDMUMsK0JBQXFCLGNBQWM7QUFBQSxRQUN2QztBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBdkJTO0FBd0JULGFBQVMsaUNBQWlDLE9BQU8sV0FBVyxVQUFVO0FBQ2xFLE9BQUMsR0FBRyxTQUFTLGNBQWMsT0FBTywwQkFBMEIsUUFBUSxnQkFBZ0IsU0FBUyxzQ0FBc0M7QUFBQSxJQUN2STtBQUZTO0FBR1QsYUFBUyw4QkFBOEIsT0FBTyxRQUFRLDBCQUEwQjtBQUM1RSxZQUFNLEVBQUUsWUFBWSxTQUFTLElBQUk7QUFDakMsT0FBQyxHQUFHLFNBQVMsaUJBQWlCLFdBQVcsS0FBSyxHQUFHLEdBQUcsd0JBQXdCLDRCQUE0QixLQUFLLEdBQUc7QUFDaEgsT0FBQyxHQUFHLFNBQVMsaUJBQWlCLFdBQVcsS0FBSyxFQUFFLFVBQVUsVUFBVSxLQUFLLHlEQUF5RCxRQUFRLElBQUk7QUFBQSxJQUNsSjtBQUpTO0FBUVQsYUFBUyxtQkFBbUIsS0FBSztBQUU3QixjQUFRLEdBQUcsYUFBYSxTQUFTLEdBQUcsRUFBRSxRQUFRLE1BQU0sR0FBRztBQUFBLElBQzNEO0FBSFM7QUFJVCxJQUFBRCxTQUFRLHFCQUFxQjtBQU83QixhQUFTLHVCQUF1QixLQUFLLHNCQUFzQjtBQUV2RCxVQUFJLHFCQUFxQixlQUFlLG1CQUFtQixHQUFHLENBQUMsR0FBRztBQUM5RCxlQUFPLG1CQUFtQixHQUFHO0FBQUEsTUFDakM7QUFFQSxhQUFPLElBQ0YsTUFBTSxHQUFHLEVBQ1QsSUFBSSxTQUFPO0FBQ1osWUFBSSxrQkFBa0I7QUFDdEIsWUFBSSw0QkFBNEI7QUFFaEMsWUFBSSxJQUFJLFNBQVMsR0FBRyxHQUFHO0FBQ25CLDRCQUFrQixJQUFJLFVBQVUsR0FBRyxJQUFJLFFBQVEsR0FBRyxDQUFDO0FBQ25ELHNDQUE0QixJQUFJLFVBQVUsSUFBSSxRQUFRLEdBQUcsQ0FBQztBQUFBLFFBQzlEO0FBQ0EsZUFBTyxtQkFBbUIsZUFBZSxJQUFJO0FBQUEsTUFDakQsQ0FBQyxFQUNJLEtBQUssR0FBRztBQUFBLElBQ2pCO0FBbkJTO0FBb0JULElBQUFBLFNBQVEseUJBQXlCO0FBSWpDLGFBQVMsa0NBQWtDLEtBQUssc0JBQXNCO0FBQ2xFLFVBQUksT0FBTyxRQUFRLFVBQVU7QUFDekIsZUFBTyx1QkFBdUIsS0FBSyxvQkFBb0I7QUFBQSxNQUMzRDtBQUNBLFlBQU0sRUFBRSxPQUFPLFVBQVUsT0FBTyxhQUFhLEdBQUcsS0FBSyxJQUFJO0FBQ3pELE9BQUMsR0FBRyxTQUFTLGFBQWE7QUFDMUIsYUFBTztBQUFBLFFBQ0gsVUFBVSx1QkFBdUIsT0FBTyxvQkFBb0I7QUFBQSxRQUM1RDtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQVhTO0FBWVQsYUFBUyx1QkFBdUIsT0FBTyxzQkFBc0I7QUFDekQsVUFBSSxPQUFPLFVBQVUsWUFBWSxjQUFjLE9BQU87QUFDbEQsY0FBTSxFQUFFLFVBQVUsVUFBVSxHQUFHLEtBQUssSUFBSTtBQUN4QyxTQUFDLEdBQUcsU0FBUyxhQUFhO0FBQzFCLGVBQU87QUFBQSxVQUNILFVBQVUsa0NBQWtDLFVBQVUsb0JBQW9CO0FBQUEsVUFDMUU7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUNBLGFBQU8sa0NBQWtDLE9BQU8sb0JBQW9CO0FBQUEsSUFDeEU7QUFWUztBQVdULGFBQVMsK0JBQStCLE9BQU8sc0JBQXNCO0FBQ2pFLGNBQVEsTUFBTSxNQUFNO0FBQUEsUUFDaEIsS0FBSywwQkFBMEI7QUFBQSxRQUMvQixLQUFLLDBCQUEwQjtBQUFBLFFBQy9CLEtBQUssMEJBQTBCLFNBQVM7QUFDcEMsZ0JBQU0sRUFBRSxNQUFNLEdBQUcsS0FBSyxJQUFJO0FBQzFCLFdBQUMsR0FBRyxTQUFTLGFBQWE7QUFDMUIsaUJBQU8sRUFBRSxLQUFLO0FBQUEsUUFDbEI7QUFBQSxRQUNBLEtBQUssMEJBQTBCLE9BQU87QUFDbEMsZ0JBQU0sRUFBRSxNQUFNLFlBQVksY0FBYyxpQkFBaUIsa0JBQWtCLHVCQUF1QixHQUFHLEtBQUssSUFBSTtBQUM5RyxXQUFDLEdBQUcsU0FBUyxhQUFhO0FBQzFCLGlCQUFPO0FBQUEsWUFDSDtBQUFBLFlBQ0EsWUFBWSxrQ0FBa0MsWUFBWSxvQkFBb0I7QUFBQSxZQUM5RSxjQUFjLGtDQUFrQyxjQUFjLG9CQUFvQjtBQUFBLFlBQ2xGLGlCQUFpQixrQ0FBa0MsaUJBQWlCLG9CQUFvQjtBQUFBLFlBQ3hGLGtCQUFrQixrQ0FBa0Msa0JBQWtCLG9CQUFvQjtBQUFBLFlBQzFGLHVCQUF1QixrQ0FBa0MsdUJBQXVCLG9CQUFvQjtBQUFBLFVBQ3hHO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFDSSxrQkFBUSxHQUFHLFNBQVMsbUJBQW1CLEtBQUs7QUFBQSxNQUNwRDtBQUFBLElBQ0o7QUF4QlM7QUF5QlQsYUFBUyxnQ0FBZ0MsT0FBTztBQUM1QyxhQUFPLDJCQUEyQjtBQUFBLElBQ3RDO0FBRlM7QUFHVCxJQUFBQSxTQUFRLGtDQUFrQztBQUMxQyxhQUFTLHdCQUF3QixPQUFPO0FBQ3BDLGFBQU8sZ0JBQWdCO0FBQUEsSUFDM0I7QUFGUztBQUdULElBQUFBLFNBQVEsMEJBQTBCO0FBQ2xDLGFBQVMseUJBQXlCLE9BQU8sc0JBQXNCO0FBRTNELFVBQUksZ0NBQWdDLEtBQUssR0FBRztBQUN4QyxjQUFNLEVBQUUsdUJBQXVCLHVCQUFBbUIsd0JBQXVCLHdCQUFBQyx5QkFBd0Isc0JBQUFDLHVCQUFzQixHQUFHQyxNQUFLLElBQUk7QUFDaEgsU0FBQyxHQUFHLFNBQVMsYUFBYTtBQUMxQixlQUFPO0FBQUEsVUFDSCx1QkFBdUIsK0JBQStCLHVCQUF1QixvQkFBb0I7QUFBQSxVQUNqRyx1QkFBdUJILHlCQUNqQixrQ0FBa0NBLHdCQUF1QixvQkFBb0IsSUFDN0U7QUFBQSxVQUNOLHdCQUF3QkMsMEJBQ2xCLGtDQUFrQ0EseUJBQXdCLG9CQUFvQixJQUM5RTtBQUFBLFVBQ04sc0JBQXNCQywwQkFBeUIsUUFBUUEsMEJBQXlCLFNBQVMsU0FBU0Esc0JBQXFCLElBQUksVUFBUSxrQ0FBa0MsTUFBTSxvQkFBb0IsQ0FBQztBQUFBLFFBQ3BNO0FBQUEsTUFDSjtBQUVBLFlBQU0sRUFBRSxZQUFZLG1CQUFtQix1QkFBdUIsd0JBQXdCLHNCQUFzQixHQUFHLEtBQUssSUFBSTtBQUN4SCxPQUFDLEdBQUcsU0FBUyxhQUFhO0FBQzFCLGFBQU87QUFBQSxRQUNILFlBQVksV0FBVyxJQUFJLFVBQVEsdUJBQXVCLE1BQU0sb0JBQW9CLENBQUM7QUFBQSxRQUNyRixtQkFBbUIsb0JBQ2Isa0JBQWtCLElBQUksVUFBUSxrQ0FBa0MsTUFBTSxvQkFBb0IsQ0FBQyxJQUMzRjtBQUFBLFFBQ04sdUJBQXVCLHdCQUNqQixrQ0FBa0MsdUJBQXVCLG9CQUFvQixJQUM3RTtBQUFBLFFBQ04sd0JBQXdCLHlCQUNsQixrQ0FBa0Msd0JBQXdCLG9CQUFvQixJQUM5RTtBQUFBLFFBQ04sc0JBQXNCLHlCQUF5QixRQUFRLHlCQUF5QixTQUFTLFNBQVMscUJBQXFCLElBQUksVUFBUSxrQ0FBa0MsTUFBTSxvQkFBb0IsQ0FBQztBQUFBLE1BQ3BNO0FBQUEsSUFDSjtBQWhDUztBQWlDVCxhQUFTLDBCQUEwQixRQUFRLHNCQUFzQjtBQUM3RCxhQUFPO0FBQUEsUUFDSCxrQkFBa0Isa0NBQWtDLE9BQU8sa0JBQWtCLG9CQUFvQjtBQUFBLFFBQ2pHLGFBQWEsT0FBTztBQUFBLFFBQ3BCLFdBQVcsT0FBTztBQUFBLE1BQ3RCO0FBQUEsSUFDSjtBQU5TO0FBYVQsYUFBUyx5Q0FBeUMsZUFBZTtBQUM3RCxZQUFNLGtCQUFrQixjQUNuQixNQUFNLEdBQUcsRUFDVCxJQUFJLFNBQU87QUFDWixlQUFPLElBQUksUUFBUSxhQUFhLFFBQVE7QUFBQSxNQUM1QyxDQUFDLEVBQ0ksS0FBSyxjQUFjO0FBQ3hCLGFBQU87QUFBQSxJQUNYO0FBUlM7QUFTVCxJQUFBckIsU0FBUSwyQ0FBMkM7QUFDbkQsYUFBUyxnQkFBZ0IsUUFBUTtBQUM3QixVQUFJLFFBQVEsTUFBTSxHQUFHO0FBQ2pCLGVBQU87QUFBQSxVQUNILEdBQUc7QUFBQSxVQUNILE1BQU1DLFdBQVU7QUFBQSxVQUNoQixPQUFPLGdCQUFnQixPQUFPLEtBQUs7QUFBQSxRQUN2QztBQUFBLE1BQ0osV0FDUyxTQUFTLE1BQU0sR0FBRztBQUd2QixlQUFPLHNCQUFzQixNQUFNO0FBQUEsTUFDdkM7QUFFQSxhQUFPLEVBQUUsR0FBRyxPQUFPO0FBQUEsSUFDdkI7QUFmUztBQWdCVCxJQUFBRCxTQUFRLGtCQUFrQjtBQUMxQixhQUFTLHNCQUFzQixRQUFRO0FBQ25DLFlBQU0sdUJBQXVCLENBQUM7QUFDOUIsWUFBTTtBQUFBLFFBQUU7QUFBQSxRQUFhO0FBQUEsUUFBUztBQUFBLFFBQW1CO0FBQUEsUUFBVTtBQUFBLFFBQWE7QUFBQSxRQUFpQjtBQUFBLFFBQVU7QUFBQSxRQUFvQjtBQUFBLFFBQUk7QUFBQSxRQUFVO0FBQUEsUUFBWTtBQUFBLFFBQWU7QUFBQSxRQUEwQjtBQUFBLFFBQWM7QUFBQSxRQUFTO0FBQUEsUUFBWTtBQUFBLFFBQWlCO0FBQUEsUUFBb0I7QUFBQSxRQUFlO0FBQUE7QUFBQSxRQUVqUjtBQUFBLFFBQVU7QUFBQSxRQUFtQjtBQUFBLFFBQW1CO0FBQUEsUUFBb0I7QUFBQSxRQUFvQjtBQUFBLFFBQW1CO0FBQUEsUUFBZ0I7QUFBQSxRQUFpQjtBQUFBLFFBQXVCO0FBQUEsUUFBaUI7QUFBQSxRQUFPO0FBQUEsUUFBUSxHQUFHO0FBQUEsTUFBSyxJQUFJO0FBRS9NLE9BQUMsR0FBRyxTQUFTLGFBQWE7QUFDMUIsaUJBQVcsT0FBTyxPQUFPLEtBQUssVUFBVSxHQUFHO0FBQ3ZDLGNBQU0sZ0JBQWdCLG1CQUFtQixHQUFHO0FBQzVDLGNBQU0sV0FBVyxXQUFXLEdBQUc7QUFDL0IsY0FBTSxFQUFFLGFBQWEsU0FBUyxTQUFTLFNBQVMsYUFBYSxTQUFTLElBQUk7QUFDMUUsWUFBSSxhQUFhO0FBQ2IsZ0JBQU0sSUFBSSxNQUFNLHdDQUF3QztBQUFBLFFBQzVEO0FBQ0EsY0FBTSwwQkFBMEI7QUFBQSxVQUM1QjtBQUFBLFVBQ0E7QUFBQSxVQUNBLFNBQVMsWUFBWSxrQkFBa0IsTUFBTSxNQUFNO0FBQUEsVUFDbkQ7QUFBQSxVQUNBLGFBQWE7QUFBQSxVQUNiO0FBQUEsUUFDSjtBQUNBLDZCQUFxQixhQUFhLElBQUksT0FBTyxPQUFPLGdCQUFnQixRQUFRLEdBQUcsdUJBQXVCO0FBQUEsTUFDMUc7QUFDQSxhQUFPO0FBQUEsUUFDSDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLGlCQUFpQixrQkFBa0IsbUJBQW1CLGVBQWUsSUFBSTtBQUFBLFFBQ3pFLFVBQVUsV0FBVyxTQUFTLElBQUksa0JBQWtCLElBQUk7QUFBQSxRQUN4RCxvQkFBb0IscUJBQXFCLG1CQUFtQixJQUFJLGtCQUFrQixJQUFJO0FBQUEsUUFDdEYsSUFBSSxLQUFLLG1CQUFtQixFQUFFLElBQUk7QUFBQSxRQUNsQztBQUFBLFFBQ0EsWUFBWSxhQUFhLG1CQUFtQixVQUFVLElBQUk7QUFBQSxRQUMxRCxlQUFlLGdCQUFnQixrQ0FBa0MsZUFBZSxvQkFBb0IsSUFBSTtBQUFBLFFBQ3hHO0FBQUEsUUFDQSxjQUFjLGVBQWUsa0NBQWtDLGNBQWMsb0JBQW9CLElBQUk7QUFBQSxRQUNyRyxTQUFTLFVBQVUsbUJBQW1CLE9BQU8sSUFBSTtBQUFBLFFBQ2pELFlBQVk7QUFBQSxRQUNaLGlCQUFpQixrQkFDWCxrQ0FBa0MsaUJBQWlCLG9CQUFvQixJQUN2RTtBQUFBLFFBQ04sb0JBQW9CLHFCQUNkLG1CQUFtQixJQUFJLGFBQVcsa0NBQWtDLFNBQVMsb0JBQW9CLENBQUMsSUFDbEc7QUFBQSxRQUNOLGVBQWUsZ0JBQWdCLGtDQUFrQyxlQUFlLG9CQUFvQixJQUFJO0FBQUEsUUFDeEcsbUJBQW1CLG9CQUNiLGtDQUFrQyxtQkFBbUIsb0JBQW9CLElBQ3pFO0FBQUEsUUFDTixtQkFBbUIsb0JBQ2Isa0NBQWtDLG1CQUFtQixvQkFBb0IsSUFDekU7QUFBQSxRQUNOLG9CQUFvQixxQkFDZCxrQ0FBa0Msb0JBQW9CLG9CQUFvQixJQUMxRTtBQUFBLFFBQ04sb0JBQW9CLHFCQUNkLGtDQUFrQyxvQkFBb0Isb0JBQW9CLElBQzFFO0FBQUEsUUFDTixtQkFBbUIsb0JBQ2Isa0NBQWtDLG1CQUFtQixvQkFBb0IsSUFDekU7QUFBQSxRQUNOLGdCQUFnQixpQkFDVixrQ0FBa0MsZ0JBQWdCLG9CQUFvQixJQUN0RTtBQUFBLFFBQ04saUJBQWlCLGtCQUNYLGtDQUFrQyxpQkFBaUIsb0JBQW9CLElBQ3ZFO0FBQUEsUUFDTix1QkFBdUIsd0JBQ2pCLGtDQUFrQyx1QkFBdUIsb0JBQW9CLElBQzdFO0FBQUEsUUFDTixpQkFBaUIsa0JBQ1gsa0NBQWtDLGlCQUFpQixvQkFBb0IsSUFDdkU7QUFBQSxRQUNOLE9BQU8sUUFBUSx5QkFBeUIsT0FBTyxvQkFBb0IsSUFBSTtBQUFBLFFBQ3ZFLFFBQVEsU0FBUywwQkFBMEIsUUFBUSxvQkFBb0IsSUFBSTtBQUFBLFFBQzNFLE1BQU1DLFdBQVU7QUFBQSxNQUNwQjtBQUFBLElBQ0o7QUEvRVM7QUFnRlQsSUFBQUQsU0FBUSx3QkFBd0I7QUFRaEMsYUFBUyxvQ0FBb0MsUUFBUSxjQUFjO0FBQy9ELFlBQU0sRUFBRSxNQUFNLElBQUksU0FBUyxVQUFVLFlBQVksU0FBUyxrQkFBa0IsS0FBSyxHQUFHLFlBQVksb0JBQW9CLE1BQU07QUFDMUgsWUFBTSxFQUFFLFFBQVEsSUFBSTtBQUNwQixPQUFDLEdBQUcsU0FBUyxjQUFjLFlBQVksY0FBYyxvR0FBb0c7QUFDekosWUFBTSxXQUFXLEdBQUcsU0FBUyxjQUFjLEVBQUU7QUFDN0MsWUFBTSxzQkFBc0IsRUFBRSxDQUFDLE9BQU8sR0FBRyxXQUFXLE9BQU8sRUFBRTtBQUM3RCxVQUFJLFdBQVcsWUFBWSxJQUFJO0FBQzNCLFNBQUMsR0FBRyxTQUFTLGNBQWMsV0FBVyxPQUFPLEdBQUcscUJBQXFCLE9BQU8sMENBQTBDO0FBQ3RILDRCQUFvQixPQUFPLElBQUksV0FBVyxPQUFPO0FBQUEsTUFDckQ7QUFDQSxZQUFNLGtCQUFrQjtBQUFBLFFBQ3BCLFVBQVVFLGVBQWM7QUFBQSxRQUN4QixpQkFBaUI7QUFBQSxRQUNqQixVQUFVLFlBQVksRUFBRSxPQUFPLEdBQUcsU0FBUyxjQUFjLFlBQVksRUFBRTtBQUFBLFFBQ3ZFLFlBQVk7QUFBQSxRQUNaO0FBQUEsUUFDQTtBQUFBLFFBQ0EsWUFBWTtBQUFBLFFBQ1o7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUNBLGFBQU9nQixrQkFBaUIsZUFBZTtBQUFBLElBQzNDO0FBdEJTO0FBdUJULElBQUFsQixTQUFRLHNDQUFzQztBQU05QyxhQUFTLGFBQWEsUUFBUSxjQUFjO0FBQ3hDLGFBQU9rQixrQkFBaUI7QUFBQSxRQUNwQixJQUFJLEdBQUcsZUFBZSxVQUFVLE1BQU07QUFBQSxRQUN0QyxVQUFVLEVBQUUsT0FBTyxHQUFHLFNBQVMsc0JBQXNCLFlBQVksRUFBRTtBQUFBLE1BQ3ZFLENBQUM7QUFBQSxJQUNMO0FBTFM7QUFNVCxJQUFBbEIsU0FBUSxlQUFlO0FBT3ZCLGFBQVMsMENBQTBDLGVBQWUsV0FBVztBQUN6RSxVQUFJLENBQUMsZUFBZTtBQUNoQjtBQUFBLE1BQ0o7QUFDQSxVQUFJLE1BQU0sUUFBUSxhQUFhLEdBQUc7QUFDOUIsc0JBQWMsUUFBUSxVQUFRLDBDQUEwQyxJQUFJLENBQUM7QUFDN0U7QUFBQSxNQUNKO0FBQ0EsVUFBSSxPQUFPLGtCQUFrQixVQUFVO0FBQ25DLG1CQUFXLE9BQU8sT0FBTyxLQUFLLGFBQWEsR0FBRztBQUMxQyxvREFBMEMsY0FBYyxHQUFHLEdBQUcsR0FBRztBQUFBLFFBQ3JFO0FBQUEsTUFDSjtBQUNBLFVBQUksT0FBTyxrQkFBa0IsY0FBYyxjQUFjLFdBQVc7QUFDaEUsY0FBTSxJQUFJLE1BQU0sMkdBQTJHO0FBQUEsTUFDL0g7QUFBQSxJQUNKO0FBaEJTO0FBaUJULElBQUFBLFNBQVEsNENBQTRDO0FBQUE7QUFBQTs7O0FDcDlCcEQ7QUFBQSxtQ0FBQXVCLFVBQUFDLFNBQUE7QUFBQTtBQUFBLFFBQUksUUFBUyxXQUFXO0FBQ3hCO0FBRUEsZUFBUyxZQUFZLEtBQUssTUFBTTtBQUM5QixlQUFPLFFBQVEsUUFBUSxlQUFlO0FBQUEsTUFDeEM7QUFGUztBQUlULFVBQUk7QUFDSixVQUFJO0FBQ0Ysb0JBQVk7QUFBQSxNQUNkLFNBQVEsR0FBRztBQUdULG9CQUFZLGtDQUFXO0FBQUEsUUFBQyxHQUFaO0FBQUEsTUFDZDtBQUVBLFVBQUk7QUFDSixVQUFJO0FBQ0Ysb0JBQVk7QUFBQSxNQUNkLFNBQVEsR0FBRztBQUNULG9CQUFZLGtDQUFXO0FBQUEsUUFBQyxHQUFaO0FBQUEsTUFDZDtBQUVBLFVBQUk7QUFDSixVQUFJO0FBQ0Ysd0JBQWdCO0FBQUEsTUFDbEIsU0FBUSxHQUFHO0FBQ1Qsd0JBQWdCLGtDQUFXO0FBQUEsUUFBQyxHQUFaO0FBQUEsTUFDbEI7QUF1QkEsZUFBU0MsT0FBTSxRQUFRLFVBQVUsT0FBTyxXQUFXLHNCQUFzQjtBQUN2RSxZQUFJLE9BQU8sYUFBYSxVQUFVO0FBQ2hDLGtCQUFRLFNBQVM7QUFDakIsc0JBQVksU0FBUztBQUNyQixpQ0FBdUIsU0FBUztBQUNoQyxxQkFBVyxTQUFTO0FBQUEsUUFDdEI7QUFHQSxZQUFJLGFBQWEsQ0FBQztBQUNsQixZQUFJLGNBQWMsQ0FBQztBQUVuQixZQUFJLFlBQVksT0FBTyxVQUFVO0FBRWpDLFlBQUksT0FBTyxZQUFZO0FBQ3JCLHFCQUFXO0FBRWIsWUFBSSxPQUFPLFNBQVM7QUFDbEIsa0JBQVE7QUFHVixpQkFBUyxPQUFPQyxTQUFRQyxRQUFPO0FBRTdCLGNBQUlELFlBQVc7QUFDYixtQkFBTztBQUVULGNBQUlDLFdBQVU7QUFDWixtQkFBT0Q7QUFFVCxjQUFJO0FBQ0osY0FBSTtBQUNKLGNBQUksT0FBT0EsV0FBVSxVQUFVO0FBQzdCLG1CQUFPQTtBQUFBLFVBQ1Q7QUFFQSxjQUFJLFlBQVlBLFNBQVEsU0FBUyxHQUFHO0FBQ2xDLG9CQUFRLElBQUksVUFBVTtBQUFBLFVBQ3hCLFdBQVcsWUFBWUEsU0FBUSxTQUFTLEdBQUc7QUFDekMsb0JBQVEsSUFBSSxVQUFVO0FBQUEsVUFDeEIsV0FBVyxZQUFZQSxTQUFRLGFBQWEsR0FBRztBQUM3QyxvQkFBUSxJQUFJLGNBQWMsU0FBVSxTQUFTLFFBQVE7QUFDbkQsY0FBQUEsUUFBTyxLQUFLLFNBQVMsT0FBTztBQUMxQix3QkFBUSxPQUFPLE9BQU9DLFNBQVEsQ0FBQyxDQUFDO0FBQUEsY0FDbEMsR0FBRyxTQUFTLEtBQUs7QUFDZix1QkFBTyxPQUFPLEtBQUtBLFNBQVEsQ0FBQyxDQUFDO0FBQUEsY0FDL0IsQ0FBQztBQUFBLFlBQ0gsQ0FBQztBQUFBLFVBQ0gsV0FBV0YsT0FBTSxVQUFVQyxPQUFNLEdBQUc7QUFDbEMsb0JBQVEsQ0FBQztBQUFBLFVBQ1gsV0FBV0QsT0FBTSxXQUFXQyxPQUFNLEdBQUc7QUFDbkMsb0JBQVEsSUFBSSxPQUFPQSxRQUFPLFFBQVEsaUJBQWlCQSxPQUFNLENBQUM7QUFDMUQsZ0JBQUlBLFFBQU87QUFBVyxvQkFBTSxZQUFZQSxRQUFPO0FBQUEsVUFDakQsV0FBV0QsT0FBTSxTQUFTQyxPQUFNLEdBQUc7QUFDakMsb0JBQVEsSUFBSSxLQUFLQSxRQUFPLFFBQVEsQ0FBQztBQUFBLFVBQ25DLFdBQVcsYUFBYSxPQUFPLFNBQVNBLE9BQU0sR0FBRztBQUMvQyxnQkFBSSxPQUFPLGFBQWE7QUFFdEIsc0JBQVEsT0FBTyxZQUFZQSxRQUFPLE1BQU07QUFBQSxZQUMxQyxPQUFPO0FBRUwsc0JBQVEsSUFBSSxPQUFPQSxRQUFPLE1BQU07QUFBQSxZQUNsQztBQUNBLFlBQUFBLFFBQU8sS0FBSyxLQUFLO0FBQ2pCLG1CQUFPO0FBQUEsVUFDVCxXQUFXLFlBQVlBLFNBQVEsS0FBSyxHQUFHO0FBQ3JDLG9CQUFRLE9BQU8sT0FBT0EsT0FBTTtBQUFBLFVBQzlCLE9BQU87QUFDTCxnQkFBSSxPQUFPLGFBQWEsYUFBYTtBQUNuQyxzQkFBUSxPQUFPLGVBQWVBLE9BQU07QUFDcEMsc0JBQVEsT0FBTyxPQUFPLEtBQUs7QUFBQSxZQUM3QixPQUNLO0FBQ0gsc0JBQVEsT0FBTyxPQUFPLFNBQVM7QUFDL0Isc0JBQVE7QUFBQSxZQUNWO0FBQUEsVUFDRjtBQUVBLGNBQUksVUFBVTtBQUNaLGdCQUFJLFFBQVEsV0FBVyxRQUFRQSxPQUFNO0FBRXJDLGdCQUFJLFNBQVMsSUFBSTtBQUNmLHFCQUFPLFlBQVksS0FBSztBQUFBLFlBQzFCO0FBQ0EsdUJBQVcsS0FBS0EsT0FBTTtBQUN0Qix3QkFBWSxLQUFLLEtBQUs7QUFBQSxVQUN4QjtBQUVBLGNBQUksWUFBWUEsU0FBUSxTQUFTLEdBQUc7QUFDbEMsWUFBQUEsUUFBTyxRQUFRLFNBQVMsT0FBTyxLQUFLO0FBQ2xDLGtCQUFJLFdBQVcsT0FBTyxLQUFLQyxTQUFRLENBQUM7QUFDcEMsa0JBQUksYUFBYSxPQUFPLE9BQU9BLFNBQVEsQ0FBQztBQUN4QyxvQkFBTSxJQUFJLFVBQVUsVUFBVTtBQUFBLFlBQ2hDLENBQUM7QUFBQSxVQUNIO0FBQ0EsY0FBSSxZQUFZRCxTQUFRLFNBQVMsR0FBRztBQUNsQyxZQUFBQSxRQUFPLFFBQVEsU0FBUyxPQUFPO0FBQzdCLGtCQUFJLGFBQWEsT0FBTyxPQUFPQyxTQUFRLENBQUM7QUFDeEMsb0JBQU0sSUFBSSxVQUFVO0FBQUEsWUFDdEIsQ0FBQztBQUFBLFVBQ0g7QUFFQSxtQkFBUyxLQUFLRCxTQUFRO0FBQ3BCLGdCQUFJO0FBQ0osZ0JBQUksT0FBTztBQUNULHNCQUFRLE9BQU8seUJBQXlCLE9BQU8sQ0FBQztBQUFBLFlBQ2xEO0FBRUEsZ0JBQUksU0FBUyxNQUFNLE9BQU8sTUFBTTtBQUM5QjtBQUFBLFlBQ0Y7QUFDQSxrQkFBTSxDQUFDLElBQUksT0FBT0EsUUFBTyxDQUFDLEdBQUdDLFNBQVEsQ0FBQztBQUFBLFVBQ3hDO0FBRUEsY0FBSSxPQUFPLHVCQUF1QjtBQUNoQyxnQkFBSSxVQUFVLE9BQU8sc0JBQXNCRCxPQUFNO0FBQ2pELHFCQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsUUFBUSxLQUFLO0FBR3ZDLGtCQUFJLFNBQVMsUUFBUSxDQUFDO0FBQ3RCLGtCQUFJLGFBQWEsT0FBTyx5QkFBeUJBLFNBQVEsTUFBTTtBQUMvRCxrQkFBSSxjQUFjLENBQUMsV0FBVyxjQUFjLENBQUMsc0JBQXNCO0FBQ2pFO0FBQUEsY0FDRjtBQUNBLG9CQUFNLE1BQU0sSUFBSSxPQUFPQSxRQUFPLE1BQU0sR0FBR0MsU0FBUSxDQUFDO0FBQ2hELGtCQUFJLENBQUMsV0FBVyxZQUFZO0FBQzFCLHVCQUFPLGVBQWUsT0FBTyxRQUFRO0FBQUEsa0JBQ25DLFlBQVk7QUFBQSxnQkFDZCxDQUFDO0FBQUEsY0FDSDtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBRUEsY0FBSSxzQkFBc0I7QUFDeEIsZ0JBQUksbUJBQW1CLE9BQU8sb0JBQW9CRCxPQUFNO0FBQ3hELHFCQUFTLElBQUksR0FBRyxJQUFJLGlCQUFpQixRQUFRLEtBQUs7QUFDaEQsa0JBQUksZUFBZSxpQkFBaUIsQ0FBQztBQUNyQyxrQkFBSSxhQUFhLE9BQU8seUJBQXlCQSxTQUFRLFlBQVk7QUFDckUsa0JBQUksY0FBYyxXQUFXLFlBQVk7QUFDdkM7QUFBQSxjQUNGO0FBQ0Esb0JBQU0sWUFBWSxJQUFJLE9BQU9BLFFBQU8sWUFBWSxHQUFHQyxTQUFRLENBQUM7QUFDNUQscUJBQU8sZUFBZSxPQUFPLGNBQWM7QUFBQSxnQkFDekMsWUFBWTtBQUFBLGNBQ2QsQ0FBQztBQUFBLFlBQ0g7QUFBQSxVQUNGO0FBRUEsaUJBQU87QUFBQSxRQUNUO0FBL0hTO0FBaUlULGVBQU8sT0FBTyxRQUFRLEtBQUs7QUFBQSxNQUM3QjtBQXZKUyxhQUFBRixRQUFBO0FBZ0tULE1BQUFBLE9BQU0saUJBQWlCLGdDQUFTLGVBQWUsUUFBUTtBQUNyRCxZQUFJLFdBQVc7QUFDYixpQkFBTztBQUVULFlBQUksSUFBSSxrQ0FBWTtBQUFBLFFBQUMsR0FBYjtBQUNSLFVBQUUsWUFBWTtBQUNkLGVBQU8sSUFBSSxFQUFFO0FBQUEsTUFDZixHQVB1QjtBQVd2QixlQUFTLFdBQVcsR0FBRztBQUNyQixlQUFPLE9BQU8sVUFBVSxTQUFTLEtBQUssQ0FBQztBQUFBLE1BQ3pDO0FBRlM7QUFHVCxNQUFBQSxPQUFNLGFBQWE7QUFFbkIsZUFBUyxTQUFTLEdBQUc7QUFDbkIsZUFBTyxPQUFPLE1BQU0sWUFBWSxXQUFXLENBQUMsTUFBTTtBQUFBLE1BQ3BEO0FBRlM7QUFHVCxNQUFBQSxPQUFNLFdBQVc7QUFFakIsZUFBUyxVQUFVLEdBQUc7QUFDcEIsZUFBTyxPQUFPLE1BQU0sWUFBWSxXQUFXLENBQUMsTUFBTTtBQUFBLE1BQ3BEO0FBRlM7QUFHVCxNQUFBQSxPQUFNLFlBQVk7QUFFbEIsZUFBUyxXQUFXLEdBQUc7QUFDckIsZUFBTyxPQUFPLE1BQU0sWUFBWSxXQUFXLENBQUMsTUFBTTtBQUFBLE1BQ3BEO0FBRlM7QUFHVCxNQUFBQSxPQUFNLGFBQWE7QUFFbkIsZUFBUyxpQkFBaUIsSUFBSTtBQUM1QixZQUFJLFFBQVE7QUFDWixZQUFJLEdBQUc7QUFBUSxtQkFBUztBQUN4QixZQUFJLEdBQUc7QUFBWSxtQkFBUztBQUM1QixZQUFJLEdBQUc7QUFBVyxtQkFBUztBQUMzQixlQUFPO0FBQUEsTUFDVDtBQU5TO0FBT1QsTUFBQUEsT0FBTSxtQkFBbUI7QUFFekIsYUFBT0E7QUFBQSxJQUNQLEVBQUc7QUFFSCxRQUFJLE9BQU9ELFlBQVcsWUFBWUEsUUFBTyxTQUFTO0FBQ2hELE1BQUFBLFFBQU8sVUFBVTtBQUFBLElBQ25CO0FBQUE7QUFBQTs7O0FDaFFBO0FBQUEsc0NBQUFJLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDSGpCO0FBQUEsbURBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBLElBQUFBLFFBQU8sVUFBVSxRQUFRLE1BQU0sRUFBRTtBQUFBO0FBQUE7OztBQ0FqQztBQUFBLDRDQUFBQyxVQUFBQyxTQUFBO0FBQUE7QUFBQSxRQUFJLFNBQVMsT0FBTyxRQUFRLGNBQWMsSUFBSTtBQUM5QyxRQUFJLG9CQUFvQixPQUFPLDRCQUE0QixTQUFTLE9BQU8seUJBQXlCLElBQUksV0FBVyxNQUFNLElBQUk7QUFDN0gsUUFBSSxVQUFVLFVBQVUscUJBQXFCLE9BQU8sa0JBQWtCLFFBQVEsYUFBYSxrQkFBa0IsTUFBTTtBQUNuSCxRQUFJLGFBQWEsVUFBVSxJQUFJLFVBQVU7QUFDekMsUUFBSSxTQUFTLE9BQU8sUUFBUSxjQUFjLElBQUk7QUFDOUMsUUFBSSxvQkFBb0IsT0FBTyw0QkFBNEIsU0FBUyxPQUFPLHlCQUF5QixJQUFJLFdBQVcsTUFBTSxJQUFJO0FBQzdILFFBQUksVUFBVSxVQUFVLHFCQUFxQixPQUFPLGtCQUFrQixRQUFRLGFBQWEsa0JBQWtCLE1BQU07QUFDbkgsUUFBSSxhQUFhLFVBQVUsSUFBSSxVQUFVO0FBQ3pDLFFBQUksYUFBYSxPQUFPLFlBQVksY0FBYyxRQUFRO0FBQzFELFFBQUksYUFBYSxhQUFhLFFBQVEsVUFBVSxNQUFNO0FBQ3RELFFBQUksYUFBYSxPQUFPLFlBQVksY0FBYyxRQUFRO0FBQzFELFFBQUksYUFBYSxhQUFhLFFBQVEsVUFBVSxNQUFNO0FBQ3RELFFBQUksYUFBYSxPQUFPLFlBQVksY0FBYyxRQUFRO0FBQzFELFFBQUksZUFBZSxhQUFhLFFBQVEsVUFBVSxRQUFRO0FBQzFELFFBQUksaUJBQWlCLFFBQVEsVUFBVTtBQUN2QyxRQUFJLGlCQUFpQixPQUFPLFVBQVU7QUFDdEMsUUFBSSxtQkFBbUIsU0FBUyxVQUFVO0FBQzFDLFFBQUksU0FBUyxPQUFPLFVBQVU7QUFDOUIsUUFBSSxTQUFTLE9BQU8sVUFBVTtBQUM5QixRQUFJLFdBQVcsT0FBTyxVQUFVO0FBQ2hDLFFBQUksZUFBZSxPQUFPLFVBQVU7QUFDcEMsUUFBSSxlQUFlLE9BQU8sVUFBVTtBQUNwQyxRQUFJLFFBQVEsT0FBTyxVQUFVO0FBQzdCLFFBQUksVUFBVSxNQUFNLFVBQVU7QUFDOUIsUUFBSSxRQUFRLE1BQU0sVUFBVTtBQUM1QixRQUFJLFlBQVksTUFBTSxVQUFVO0FBQ2hDLFFBQUksU0FBUyxLQUFLO0FBQ2xCLFFBQUksZ0JBQWdCLE9BQU8sV0FBVyxhQUFhLE9BQU8sVUFBVSxVQUFVO0FBQzlFLFFBQUksT0FBTyxPQUFPO0FBQ2xCLFFBQUksY0FBYyxPQUFPLFdBQVcsY0FBYyxPQUFPLE9BQU8sYUFBYSxXQUFXLE9BQU8sVUFBVSxXQUFXO0FBQ3BILFFBQUksb0JBQW9CLE9BQU8sV0FBVyxjQUFjLE9BQU8sT0FBTyxhQUFhO0FBRW5GLFFBQUksY0FBYyxPQUFPLFdBQVcsY0FBYyxPQUFPLGdCQUFnQixPQUFPLE9BQU8sZ0JBQWdCLG9CQUFvQixXQUFXLFlBQ2hJLE9BQU8sY0FDUDtBQUNOLFFBQUksZUFBZSxPQUFPLFVBQVU7QUFFcEMsUUFBSSxPQUFPLE9BQU8sWUFBWSxhQUFhLFFBQVEsaUJBQWlCLE9BQU8sb0JBQ3ZFLENBQUMsRUFBRSxjQUFjLE1BQU0sWUFDakIsU0FBVSxHQUFHO0FBQ1gsYUFBTyxFQUFFO0FBQUEsSUFDYixJQUNFO0FBR1YsYUFBUyxvQkFBb0IsS0FBSyxLQUFLO0FBQ25DLFVBQ0ksUUFBUSxZQUNMLFFBQVEsYUFDUixRQUFRLE9BQ1AsT0FBTyxNQUFNLFFBQVMsTUFBTSxPQUM3QixNQUFNLEtBQUssS0FBSyxHQUFHLEdBQ3hCO0FBQ0UsZUFBTztBQUFBLE1BQ1g7QUFDQSxVQUFJLFdBQVc7QUFDZixVQUFJLE9BQU8sUUFBUSxVQUFVO0FBQ3pCLFlBQUksTUFBTSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRztBQUM5QyxZQUFJLFFBQVEsS0FBSztBQUNiLGNBQUksU0FBUyxPQUFPLEdBQUc7QUFDdkIsY0FBSSxNQUFNLE9BQU8sS0FBSyxLQUFLLE9BQU8sU0FBUyxDQUFDO0FBQzVDLGlCQUFPLFNBQVMsS0FBSyxRQUFRLFVBQVUsS0FBSyxJQUFJLE1BQU0sU0FBUyxLQUFLLFNBQVMsS0FBSyxLQUFLLGVBQWUsS0FBSyxHQUFHLE1BQU0sRUFBRTtBQUFBLFFBQzFIO0FBQUEsTUFDSjtBQUNBLGFBQU8sU0FBUyxLQUFLLEtBQUssVUFBVSxLQUFLO0FBQUEsSUFDN0M7QUFwQlM7QUFzQlQsUUFBSSxjQUFjO0FBQ2xCLFFBQUksZ0JBQWdCLFlBQVk7QUFDaEMsUUFBSSxnQkFBZ0IsU0FBUyxhQUFhLElBQUksZ0JBQWdCO0FBRTlELFFBQUksU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLElBQ1o7QUFDQSxRQUFJLFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxJQUNaO0FBRUEsSUFBQUEsUUFBTyxVQUFVLGdDQUFTLFNBQVMsS0FBSyxTQUFTLE9BQU8sTUFBTTtBQUMxRCxVQUFJLE9BQU8sV0FBVyxDQUFDO0FBRXZCLFVBQUksSUFBSSxNQUFNLFlBQVksS0FBSyxDQUFDLElBQUksUUFBUSxLQUFLLFVBQVUsR0FBRztBQUMxRCxjQUFNLElBQUksVUFBVSxrREFBa0Q7QUFBQSxNQUMxRTtBQUNBLFVBQ0ksSUFBSSxNQUFNLGlCQUFpQixNQUFNLE9BQU8sS0FBSyxvQkFBb0IsV0FDM0QsS0FBSyxrQkFBa0IsS0FBSyxLQUFLLG9CQUFvQixXQUNyRCxLQUFLLG9CQUFvQixPQUVqQztBQUNFLGNBQU0sSUFBSSxVQUFVLHdGQUF3RjtBQUFBLE1BQ2hIO0FBQ0EsVUFBSSxnQkFBZ0IsSUFBSSxNQUFNLGVBQWUsSUFBSSxLQUFLLGdCQUFnQjtBQUN0RSxVQUFJLE9BQU8sa0JBQWtCLGFBQWEsa0JBQWtCLFVBQVU7QUFDbEUsY0FBTSxJQUFJLFVBQVUsK0VBQStFO0FBQUEsTUFDdkc7QUFFQSxVQUNJLElBQUksTUFBTSxRQUFRLEtBQ2YsS0FBSyxXQUFXLFFBQ2hCLEtBQUssV0FBVyxPQUNoQixFQUFFLFNBQVMsS0FBSyxRQUFRLEVBQUUsTUFBTSxLQUFLLFVBQVUsS0FBSyxTQUFTLElBQ2xFO0FBQ0UsY0FBTSxJQUFJLFVBQVUsMERBQTBEO0FBQUEsTUFDbEY7QUFDQSxVQUFJLElBQUksTUFBTSxrQkFBa0IsS0FBSyxPQUFPLEtBQUsscUJBQXFCLFdBQVc7QUFDN0UsY0FBTSxJQUFJLFVBQVUsbUVBQW1FO0FBQUEsTUFDM0Y7QUFDQSxVQUFJLG1CQUFtQixLQUFLO0FBRTVCLFVBQUksT0FBTyxRQUFRLGFBQWE7QUFDNUIsZUFBTztBQUFBLE1BQ1g7QUFDQSxVQUFJLFFBQVEsTUFBTTtBQUNkLGVBQU87QUFBQSxNQUNYO0FBQ0EsVUFBSSxPQUFPLFFBQVEsV0FBVztBQUMxQixlQUFPLE1BQU0sU0FBUztBQUFBLE1BQzFCO0FBRUEsVUFBSSxPQUFPLFFBQVEsVUFBVTtBQUN6QixlQUFPLGNBQWMsS0FBSyxJQUFJO0FBQUEsTUFDbEM7QUFDQSxVQUFJLE9BQU8sUUFBUSxVQUFVO0FBQ3pCLFlBQUksUUFBUSxHQUFHO0FBQ1gsaUJBQU8sV0FBVyxNQUFNLElBQUksTUFBTTtBQUFBLFFBQ3RDO0FBQ0EsWUFBSSxNQUFNLE9BQU8sR0FBRztBQUNwQixlQUFPLG1CQUFtQixvQkFBb0IsS0FBSyxHQUFHLElBQUk7QUFBQSxNQUM5RDtBQUNBLFVBQUksT0FBTyxRQUFRLFVBQVU7QUFDekIsWUFBSSxZQUFZLE9BQU8sR0FBRyxJQUFJO0FBQzlCLGVBQU8sbUJBQW1CLG9CQUFvQixLQUFLLFNBQVMsSUFBSTtBQUFBLE1BQ3BFO0FBRUEsVUFBSSxXQUFXLE9BQU8sS0FBSyxVQUFVLGNBQWMsSUFBSSxLQUFLO0FBQzVELFVBQUksT0FBTyxVQUFVLGFBQWE7QUFBRSxnQkFBUTtBQUFBLE1BQUc7QUFDL0MsVUFBSSxTQUFTLFlBQVksV0FBVyxLQUFLLE9BQU8sUUFBUSxVQUFVO0FBQzlELGVBQU8sUUFBUSxHQUFHLElBQUksWUFBWTtBQUFBLE1BQ3RDO0FBRUEsVUFBSSxTQUFTLFVBQVUsTUFBTSxLQUFLO0FBRWxDLFVBQUksT0FBTyxTQUFTLGFBQWE7QUFDN0IsZUFBTyxDQUFDO0FBQUEsTUFDWixXQUFXLFFBQVEsTUFBTSxHQUFHLEtBQUssR0FBRztBQUNoQyxlQUFPO0FBQUEsTUFDWDtBQUVBLGVBQVMsUUFBUSxPQUFPLE1BQU0sVUFBVTtBQUNwQyxZQUFJLE1BQU07QUFDTixpQkFBTyxVQUFVLEtBQUssSUFBSTtBQUMxQixlQUFLLEtBQUssSUFBSTtBQUFBLFFBQ2xCO0FBQ0EsWUFBSSxVQUFVO0FBQ1YsY0FBSSxVQUFVO0FBQUEsWUFDVixPQUFPLEtBQUs7QUFBQSxVQUNoQjtBQUNBLGNBQUksSUFBSSxNQUFNLFlBQVksR0FBRztBQUN6QixvQkFBUSxhQUFhLEtBQUs7QUFBQSxVQUM5QjtBQUNBLGlCQUFPLFNBQVMsT0FBTyxTQUFTLFFBQVEsR0FBRyxJQUFJO0FBQUEsUUFDbkQ7QUFDQSxlQUFPLFNBQVMsT0FBTyxNQUFNLFFBQVEsR0FBRyxJQUFJO0FBQUEsTUFDaEQ7QUFmUztBQWlCVCxVQUFJLE9BQU8sUUFBUSxjQUFjLENBQUMsU0FBUyxHQUFHLEdBQUc7QUFDN0MsWUFBSSxPQUFPLE9BQU8sR0FBRztBQUNyQixZQUFJLE9BQU8sV0FBVyxLQUFLLE9BQU87QUFDbEMsZUFBTyxlQUFlLE9BQU8sT0FBTyxPQUFPLGtCQUFrQixPQUFPLEtBQUssU0FBUyxJQUFJLFFBQVEsTUFBTSxLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQU87QUFBQSxNQUNsSTtBQUNBLFVBQUksU0FBUyxHQUFHLEdBQUc7QUFDZixZQUFJLFlBQVksb0JBQW9CLFNBQVMsS0FBSyxPQUFPLEdBQUcsR0FBRywwQkFBMEIsSUFBSSxJQUFJLFlBQVksS0FBSyxHQUFHO0FBQ3JILGVBQU8sT0FBTyxRQUFRLFlBQVksQ0FBQyxvQkFBb0IsVUFBVSxTQUFTLElBQUk7QUFBQSxNQUNsRjtBQUNBLFVBQUksVUFBVSxHQUFHLEdBQUc7QUFDaEIsWUFBSSxJQUFJLE1BQU0sYUFBYSxLQUFLLE9BQU8sSUFBSSxRQUFRLENBQUM7QUFDcEQsWUFBSSxRQUFRLElBQUksY0FBYyxDQUFDO0FBQy9CLGlCQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ25DLGVBQUssTUFBTSxNQUFNLENBQUMsRUFBRSxPQUFPLE1BQU0sV0FBVyxNQUFNLE1BQU0sQ0FBQyxFQUFFLEtBQUssR0FBRyxVQUFVLElBQUk7QUFBQSxRQUNyRjtBQUNBLGFBQUs7QUFDTCxZQUFJLElBQUksY0FBYyxJQUFJLFdBQVcsUUFBUTtBQUFFLGVBQUs7QUFBQSxRQUFPO0FBQzNELGFBQUssT0FBTyxhQUFhLEtBQUssT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJO0FBQ3RELGVBQU87QUFBQSxNQUNYO0FBQ0EsVUFBSSxRQUFRLEdBQUcsR0FBRztBQUNkLFlBQUksSUFBSSxXQUFXLEdBQUc7QUFBRSxpQkFBTztBQUFBLFFBQU07QUFDckMsWUFBSSxLQUFLLFdBQVcsS0FBSyxPQUFPO0FBQ2hDLFlBQUksVUFBVSxDQUFDLGlCQUFpQixFQUFFLEdBQUc7QUFDakMsaUJBQU8sTUFBTSxhQUFhLElBQUksTUFBTSxJQUFJO0FBQUEsUUFDNUM7QUFDQSxlQUFPLE9BQU8sTUFBTSxLQUFLLElBQUksSUFBSSxJQUFJO0FBQUEsTUFDekM7QUFDQSxVQUFJLFFBQVEsR0FBRyxHQUFHO0FBQ2QsWUFBSSxRQUFRLFdBQVcsS0FBSyxPQUFPO0FBQ25DLFlBQUksRUFBRSxXQUFXLE1BQU0sY0FBYyxXQUFXLE9BQU8sQ0FBQyxhQUFhLEtBQUssS0FBSyxPQUFPLEdBQUc7QUFDckYsaUJBQU8sUUFBUSxPQUFPLEdBQUcsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEtBQUssY0FBYyxRQUFRLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLElBQUk7QUFBQSxRQUNsSDtBQUNBLFlBQUksTUFBTSxXQUFXLEdBQUc7QUFBRSxpQkFBTyxNQUFNLE9BQU8sR0FBRyxJQUFJO0FBQUEsUUFBSztBQUMxRCxlQUFPLFFBQVEsT0FBTyxHQUFHLElBQUksT0FBTyxNQUFNLEtBQUssT0FBTyxJQUFJLElBQUk7QUFBQSxNQUNsRTtBQUNBLFVBQUksT0FBTyxRQUFRLFlBQVksZUFBZTtBQUMxQyxZQUFJLGlCQUFpQixPQUFPLElBQUksYUFBYSxNQUFNLGNBQWMsYUFBYTtBQUMxRSxpQkFBTyxZQUFZLEtBQUssRUFBRSxPQUFPLFdBQVcsTUFBTSxDQUFDO0FBQUEsUUFDdkQsV0FBVyxrQkFBa0IsWUFBWSxPQUFPLElBQUksWUFBWSxZQUFZO0FBQ3hFLGlCQUFPLElBQUksUUFBUTtBQUFBLFFBQ3ZCO0FBQUEsTUFDSjtBQUNBLFVBQUksTUFBTSxHQUFHLEdBQUc7QUFDWixZQUFJLFdBQVcsQ0FBQztBQUNoQixZQUFJLFlBQVk7QUFDWixxQkFBVyxLQUFLLEtBQUssU0FBVSxPQUFPLEtBQUs7QUFDdkMscUJBQVMsS0FBSyxRQUFRLEtBQUssS0FBSyxJQUFJLElBQUksU0FBUyxRQUFRLE9BQU8sR0FBRyxDQUFDO0FBQUEsVUFDeEUsQ0FBQztBQUFBLFFBQ0w7QUFDQSxlQUFPLGFBQWEsT0FBTyxRQUFRLEtBQUssR0FBRyxHQUFHLFVBQVUsTUFBTTtBQUFBLE1BQ2xFO0FBQ0EsVUFBSSxNQUFNLEdBQUcsR0FBRztBQUNaLFlBQUksV0FBVyxDQUFDO0FBQ2hCLFlBQUksWUFBWTtBQUNaLHFCQUFXLEtBQUssS0FBSyxTQUFVLE9BQU87QUFDbEMscUJBQVMsS0FBSyxRQUFRLE9BQU8sR0FBRyxDQUFDO0FBQUEsVUFDckMsQ0FBQztBQUFBLFFBQ0w7QUFDQSxlQUFPLGFBQWEsT0FBTyxRQUFRLEtBQUssR0FBRyxHQUFHLFVBQVUsTUFBTTtBQUFBLE1BQ2xFO0FBQ0EsVUFBSSxVQUFVLEdBQUcsR0FBRztBQUNoQixlQUFPLGlCQUFpQixTQUFTO0FBQUEsTUFDckM7QUFDQSxVQUFJLFVBQVUsR0FBRyxHQUFHO0FBQ2hCLGVBQU8saUJBQWlCLFNBQVM7QUFBQSxNQUNyQztBQUNBLFVBQUksVUFBVSxHQUFHLEdBQUc7QUFDaEIsZUFBTyxpQkFBaUIsU0FBUztBQUFBLE1BQ3JDO0FBQ0EsVUFBSSxTQUFTLEdBQUcsR0FBRztBQUNmLGVBQU8sVUFBVSxRQUFRLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFBQSxNQUN6QztBQUNBLFVBQUksU0FBUyxHQUFHLEdBQUc7QUFDZixlQUFPLFVBQVUsUUFBUSxjQUFjLEtBQUssR0FBRyxDQUFDLENBQUM7QUFBQSxNQUNyRDtBQUNBLFVBQUksVUFBVSxHQUFHLEdBQUc7QUFDaEIsZUFBTyxVQUFVLGVBQWUsS0FBSyxHQUFHLENBQUM7QUFBQSxNQUM3QztBQUNBLFVBQUksU0FBUyxHQUFHLEdBQUc7QUFDZixlQUFPLFVBQVUsUUFBUSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQUEsTUFDekM7QUFHQSxVQUFJLE9BQU8sV0FBVyxlQUFlLFFBQVEsUUFBUTtBQUNqRCxlQUFPO0FBQUEsTUFDWDtBQUNBLFVBQ0ssT0FBTyxlQUFlLGVBQWUsUUFBUSxjQUMxQyxPQUFPLFdBQVcsZUFBZSxRQUFRLFFBQy9DO0FBQ0UsZUFBTztBQUFBLE1BQ1g7QUFDQSxVQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRztBQUNoQyxZQUFJLEtBQUssV0FBVyxLQUFLLE9BQU87QUFDaEMsWUFBSSxnQkFBZ0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxPQUFPLFlBQVksZUFBZSxVQUFVLElBQUksZ0JBQWdCO0FBQ3ZHLFlBQUksV0FBVyxlQUFlLFNBQVMsS0FBSztBQUM1QyxZQUFJLFlBQVksQ0FBQyxpQkFBaUIsZUFBZSxPQUFPLEdBQUcsTUFBTSxPQUFPLGVBQWUsTUFBTSxPQUFPLEtBQUssTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksV0FBVyxXQUFXO0FBQ3BKLFlBQUksaUJBQWlCLGlCQUFpQixPQUFPLElBQUksZ0JBQWdCLGFBQWEsS0FBSyxJQUFJLFlBQVksT0FBTyxJQUFJLFlBQVksT0FBTyxNQUFNO0FBQ3ZJLFlBQUksTUFBTSxrQkFBa0IsYUFBYSxXQUFXLE1BQU0sTUFBTSxLQUFLLFFBQVEsS0FBSyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksT0FBTztBQUN2SSxZQUFJLEdBQUcsV0FBVyxHQUFHO0FBQUUsaUJBQU8sTUFBTTtBQUFBLFFBQU07QUFDMUMsWUFBSSxRQUFRO0FBQ1IsaUJBQU8sTUFBTSxNQUFNLGFBQWEsSUFBSSxNQUFNLElBQUk7QUFBQSxRQUNsRDtBQUNBLGVBQU8sTUFBTSxPQUFPLE1BQU0sS0FBSyxJQUFJLElBQUksSUFBSTtBQUFBLE1BQy9DO0FBQ0EsYUFBTyxPQUFPLEdBQUc7QUFBQSxJQUNyQixHQW5NaUI7QUFxTWpCLGFBQVMsV0FBVyxHQUFHLGNBQWMsTUFBTTtBQUN2QyxVQUFJLFFBQVEsS0FBSyxjQUFjO0FBQy9CLFVBQUksWUFBWSxPQUFPLEtBQUs7QUFDNUIsYUFBTyxZQUFZLElBQUk7QUFBQSxJQUMzQjtBQUpTO0FBTVQsYUFBUyxNQUFNLEdBQUc7QUFDZCxhQUFPLFNBQVMsS0FBSyxPQUFPLENBQUMsR0FBRyxNQUFNLFFBQVE7QUFBQSxJQUNsRDtBQUZTO0FBSVQsYUFBUyxpQkFBaUIsS0FBSztBQUMzQixhQUFPLENBQUMsZUFBZSxFQUFFLE9BQU8sUUFBUSxhQUFhLGVBQWUsT0FBTyxPQUFPLElBQUksV0FBVyxNQUFNO0FBQUEsSUFDM0c7QUFGUztBQUdULGFBQVMsUUFBUSxLQUFLO0FBQUUsYUFBTyxNQUFNLEdBQUcsTUFBTSxvQkFBb0IsaUJBQWlCLEdBQUc7QUFBQSxJQUFHO0FBQWhGO0FBQ1QsYUFBUyxPQUFPLEtBQUs7QUFBRSxhQUFPLE1BQU0sR0FBRyxNQUFNLG1CQUFtQixpQkFBaUIsR0FBRztBQUFBLElBQUc7QUFBOUU7QUFDVCxhQUFTLFNBQVMsS0FBSztBQUFFLGFBQU8sTUFBTSxHQUFHLE1BQU0scUJBQXFCLGlCQUFpQixHQUFHO0FBQUEsSUFBRztBQUFsRjtBQUNULGFBQVMsUUFBUSxLQUFLO0FBQUUsYUFBTyxNQUFNLEdBQUcsTUFBTSxvQkFBb0IsaUJBQWlCLEdBQUc7QUFBQSxJQUFHO0FBQWhGO0FBQ1QsYUFBUyxTQUFTLEtBQUs7QUFBRSxhQUFPLE1BQU0sR0FBRyxNQUFNLHFCQUFxQixpQkFBaUIsR0FBRztBQUFBLElBQUc7QUFBbEY7QUFDVCxhQUFTLFNBQVMsS0FBSztBQUFFLGFBQU8sTUFBTSxHQUFHLE1BQU0scUJBQXFCLGlCQUFpQixHQUFHO0FBQUEsSUFBRztBQUFsRjtBQUNULGFBQVMsVUFBVSxLQUFLO0FBQUUsYUFBTyxNQUFNLEdBQUcsTUFBTSxzQkFBc0IsaUJBQWlCLEdBQUc7QUFBQSxJQUFHO0FBQXBGO0FBR1QsYUFBUyxTQUFTLEtBQUs7QUFDbkIsVUFBSSxtQkFBbUI7QUFDbkIsZUFBTyxPQUFPLE9BQU8sUUFBUSxZQUFZLGVBQWU7QUFBQSxNQUM1RDtBQUNBLFVBQUksT0FBTyxRQUFRLFVBQVU7QUFDekIsZUFBTztBQUFBLE1BQ1g7QUFDQSxVQUFJLENBQUMsT0FBTyxPQUFPLFFBQVEsWUFBWSxDQUFDLGFBQWE7QUFDakQsZUFBTztBQUFBLE1BQ1g7QUFDQSxVQUFJO0FBQ0Esb0JBQVksS0FBSyxHQUFHO0FBQ3BCLGVBQU87QUFBQSxNQUNYLFNBQVMsR0FBRztBQUFBLE1BQUM7QUFDYixhQUFPO0FBQUEsSUFDWDtBQWZTO0FBaUJULGFBQVMsU0FBUyxLQUFLO0FBQ25CLFVBQUksQ0FBQyxPQUFPLE9BQU8sUUFBUSxZQUFZLENBQUMsZUFBZTtBQUNuRCxlQUFPO0FBQUEsTUFDWDtBQUNBLFVBQUk7QUFDQSxzQkFBYyxLQUFLLEdBQUc7QUFDdEIsZUFBTztBQUFBLE1BQ1gsU0FBUyxHQUFHO0FBQUEsTUFBQztBQUNiLGFBQU87QUFBQSxJQUNYO0FBVFM7QUFXVCxRQUFJLFNBQVMsT0FBTyxVQUFVLGtCQUFrQixTQUFVLEtBQUs7QUFBRSxhQUFPLE9BQU87QUFBQSxJQUFNO0FBQ3JGLGFBQVMsSUFBSSxLQUFLLEtBQUs7QUFDbkIsYUFBTyxPQUFPLEtBQUssS0FBSyxHQUFHO0FBQUEsSUFDL0I7QUFGUztBQUlULGFBQVMsTUFBTSxLQUFLO0FBQ2hCLGFBQU8sZUFBZSxLQUFLLEdBQUc7QUFBQSxJQUNsQztBQUZTO0FBSVQsYUFBUyxPQUFPLEdBQUc7QUFDZixVQUFJLEVBQUUsTUFBTTtBQUFFLGVBQU8sRUFBRTtBQUFBLE1BQU07QUFDN0IsVUFBSSxJQUFJLE9BQU8sS0FBSyxpQkFBaUIsS0FBSyxDQUFDLEdBQUcsc0JBQXNCO0FBQ3BFLFVBQUksR0FBRztBQUFFLGVBQU8sRUFBRSxDQUFDO0FBQUEsTUFBRztBQUN0QixhQUFPO0FBQUEsSUFDWDtBQUxTO0FBT1QsYUFBUyxRQUFRLElBQUksR0FBRztBQUNwQixVQUFJLEdBQUcsU0FBUztBQUFFLGVBQU8sR0FBRyxRQUFRLENBQUM7QUFBQSxNQUFHO0FBQ3hDLGVBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxRQUFRLElBQUksR0FBRyxLQUFLO0FBQ3ZDLFlBQUksR0FBRyxDQUFDLE1BQU0sR0FBRztBQUFFLGlCQUFPO0FBQUEsUUFBRztBQUFBLE1BQ2pDO0FBQ0EsYUFBTztBQUFBLElBQ1g7QUFOUztBQVFULGFBQVMsTUFBTSxHQUFHO0FBQ2QsVUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLE9BQU8sTUFBTSxVQUFVO0FBQ3pDLGVBQU87QUFBQSxNQUNYO0FBQ0EsVUFBSTtBQUNBLGdCQUFRLEtBQUssQ0FBQztBQUNkLFlBQUk7QUFDQSxrQkFBUSxLQUFLLENBQUM7QUFBQSxRQUNsQixTQUFTLEdBQUc7QUFDUixpQkFBTztBQUFBLFFBQ1g7QUFDQSxlQUFPLGFBQWE7QUFBQSxNQUN4QixTQUFTLEdBQUc7QUFBQSxNQUFDO0FBQ2IsYUFBTztBQUFBLElBQ1g7QUFkUztBQWdCVCxhQUFTLFVBQVUsR0FBRztBQUNsQixVQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssT0FBTyxNQUFNLFVBQVU7QUFDNUMsZUFBTztBQUFBLE1BQ1g7QUFDQSxVQUFJO0FBQ0EsbUJBQVcsS0FBSyxHQUFHLFVBQVU7QUFDN0IsWUFBSTtBQUNBLHFCQUFXLEtBQUssR0FBRyxVQUFVO0FBQUEsUUFDakMsU0FBUyxHQUFHO0FBQ1IsaUJBQU87QUFBQSxRQUNYO0FBQ0EsZUFBTyxhQUFhO0FBQUEsTUFDeEIsU0FBUyxHQUFHO0FBQUEsTUFBQztBQUNiLGFBQU87QUFBQSxJQUNYO0FBZFM7QUFnQlQsYUFBUyxVQUFVLEdBQUc7QUFDbEIsVUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssT0FBTyxNQUFNLFVBQVU7QUFDOUMsZUFBTztBQUFBLE1BQ1g7QUFDQSxVQUFJO0FBQ0EscUJBQWEsS0FBSyxDQUFDO0FBQ25CLGVBQU87QUFBQSxNQUNYLFNBQVMsR0FBRztBQUFBLE1BQUM7QUFDYixhQUFPO0FBQUEsSUFDWDtBQVRTO0FBV1QsYUFBUyxNQUFNLEdBQUc7QUFDZCxVQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssT0FBTyxNQUFNLFVBQVU7QUFDekMsZUFBTztBQUFBLE1BQ1g7QUFDQSxVQUFJO0FBQ0EsZ0JBQVEsS0FBSyxDQUFDO0FBQ2QsWUFBSTtBQUNBLGtCQUFRLEtBQUssQ0FBQztBQUFBLFFBQ2xCLFNBQVMsR0FBRztBQUNSLGlCQUFPO0FBQUEsUUFDWDtBQUNBLGVBQU8sYUFBYTtBQUFBLE1BQ3hCLFNBQVMsR0FBRztBQUFBLE1BQUM7QUFDYixhQUFPO0FBQUEsSUFDWDtBQWRTO0FBZ0JULGFBQVMsVUFBVSxHQUFHO0FBQ2xCLFVBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxPQUFPLE1BQU0sVUFBVTtBQUM1QyxlQUFPO0FBQUEsTUFDWDtBQUNBLFVBQUk7QUFDQSxtQkFBVyxLQUFLLEdBQUcsVUFBVTtBQUM3QixZQUFJO0FBQ0EscUJBQVcsS0FBSyxHQUFHLFVBQVU7QUFBQSxRQUNqQyxTQUFTLEdBQUc7QUFDUixpQkFBTztBQUFBLFFBQ1g7QUFDQSxlQUFPLGFBQWE7QUFBQSxNQUN4QixTQUFTLEdBQUc7QUFBQSxNQUFDO0FBQ2IsYUFBTztBQUFBLElBQ1g7QUFkUztBQWdCVCxhQUFTLFVBQVUsR0FBRztBQUNsQixVQUFJLENBQUMsS0FBSyxPQUFPLE1BQU0sVUFBVTtBQUFFLGVBQU87QUFBQSxNQUFPO0FBQ2pELFVBQUksT0FBTyxnQkFBZ0IsZUFBZSxhQUFhLGFBQWE7QUFDaEUsZUFBTztBQUFBLE1BQ1g7QUFDQSxhQUFPLE9BQU8sRUFBRSxhQUFhLFlBQVksT0FBTyxFQUFFLGlCQUFpQjtBQUFBLElBQ3ZFO0FBTlM7QUFRVCxhQUFTLGNBQWMsS0FBSyxNQUFNO0FBQzlCLFVBQUksSUFBSSxTQUFTLEtBQUssaUJBQWlCO0FBQ25DLFlBQUksWUFBWSxJQUFJLFNBQVMsS0FBSztBQUNsQyxZQUFJLFVBQVUsU0FBUyxZQUFZLHFCQUFxQixZQUFZLElBQUksTUFBTTtBQUM5RSxlQUFPLGNBQWMsT0FBTyxLQUFLLEtBQUssR0FBRyxLQUFLLGVBQWUsR0FBRyxJQUFJLElBQUk7QUFBQSxNQUM1RTtBQUNBLFVBQUksVUFBVSxTQUFTLEtBQUssY0FBYyxRQUFRO0FBQ2xELGNBQVEsWUFBWTtBQUVwQixVQUFJLElBQUksU0FBUyxLQUFLLFNBQVMsS0FBSyxLQUFLLFNBQVMsTUFBTSxHQUFHLGdCQUFnQixPQUFPO0FBQ2xGLGFBQU8sV0FBVyxHQUFHLFVBQVUsSUFBSTtBQUFBLElBQ3ZDO0FBWFM7QUFhVCxhQUFTLFFBQVEsR0FBRztBQUNoQixVQUFJLElBQUksRUFBRSxXQUFXLENBQUM7QUFDdEIsVUFBSSxJQUFJO0FBQUEsUUFDSixHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsUUFDSCxJQUFJO0FBQUEsUUFDSixJQUFJO0FBQUEsUUFDSixJQUFJO0FBQUEsTUFDUixFQUFFLENBQUM7QUFDSCxVQUFJLEdBQUc7QUFBRSxlQUFPLE9BQU87QUFBQSxNQUFHO0FBQzFCLGFBQU8sU0FBUyxJQUFJLEtBQU8sTUFBTSxNQUFNLGFBQWEsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDO0FBQUEsSUFDM0U7QUFYUztBQWFULGFBQVMsVUFBVSxLQUFLO0FBQ3BCLGFBQU8sWUFBWSxNQUFNO0FBQUEsSUFDN0I7QUFGUztBQUlULGFBQVMsaUJBQWlCLE1BQU07QUFDNUIsYUFBTyxPQUFPO0FBQUEsSUFDbEI7QUFGUztBQUlULGFBQVMsYUFBYSxNQUFNLE1BQU0sU0FBUyxRQUFRO0FBQy9DLFVBQUksZ0JBQWdCLFNBQVMsYUFBYSxTQUFTLE1BQU0sSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJO0FBQ3JGLGFBQU8sT0FBTyxPQUFPLE9BQU8sUUFBUSxnQkFBZ0I7QUFBQSxJQUN4RDtBQUhTO0FBS1QsYUFBUyxpQkFBaUIsSUFBSTtBQUMxQixlQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsUUFBUSxLQUFLO0FBQ2hDLFlBQUksUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssR0FBRztBQUMzQixpQkFBTztBQUFBLFFBQ1g7QUFBQSxNQUNKO0FBQ0EsYUFBTztBQUFBLElBQ1g7QUFQUztBQVNULGFBQVMsVUFBVSxNQUFNLE9BQU87QUFDNUIsVUFBSTtBQUNKLFVBQUksS0FBSyxXQUFXLEtBQU07QUFDdEIscUJBQWE7QUFBQSxNQUNqQixXQUFXLE9BQU8sS0FBSyxXQUFXLFlBQVksS0FBSyxTQUFTLEdBQUc7QUFDM0QscUJBQWEsTUFBTSxLQUFLLE1BQU0sS0FBSyxTQUFTLENBQUMsR0FBRyxHQUFHO0FBQUEsTUFDdkQsT0FBTztBQUNILGVBQU87QUFBQSxNQUNYO0FBQ0EsYUFBTztBQUFBLFFBQ0gsTUFBTTtBQUFBLFFBQ04sTUFBTSxNQUFNLEtBQUssTUFBTSxRQUFRLENBQUMsR0FBRyxVQUFVO0FBQUEsTUFDakQ7QUFBQSxJQUNKO0FBYlM7QUFlVCxhQUFTLGFBQWEsSUFBSSxRQUFRO0FBQzlCLFVBQUksR0FBRyxXQUFXLEdBQUc7QUFBRSxlQUFPO0FBQUEsTUFBSTtBQUNsQyxVQUFJLGFBQWEsT0FBTyxPQUFPLE9BQU8sT0FBTztBQUM3QyxhQUFPLGFBQWEsTUFBTSxLQUFLLElBQUksTUFBTSxVQUFVLElBQUksT0FBTyxPQUFPO0FBQUEsSUFDekU7QUFKUztBQU1ULGFBQVMsV0FBVyxLQUFLLFNBQVM7QUFDOUIsVUFBSSxRQUFRLFFBQVEsR0FBRztBQUN2QixVQUFJLEtBQUssQ0FBQztBQUNWLFVBQUksT0FBTztBQUNQLFdBQUcsU0FBUyxJQUFJO0FBQ2hCLGlCQUFTLElBQUksR0FBRyxJQUFJLElBQUksUUFBUSxLQUFLO0FBQ2pDLGFBQUcsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksUUFBUSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUk7QUFBQSxRQUNqRDtBQUFBLE1BQ0o7QUFDQSxVQUFJLE9BQU8sT0FBTyxTQUFTLGFBQWEsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNyRCxVQUFJO0FBQ0osVUFBSSxtQkFBbUI7QUFDbkIsaUJBQVMsQ0FBQztBQUNWLGlCQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQ2xDLGlCQUFPLE1BQU0sS0FBSyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7QUFBQSxRQUNsQztBQUFBLE1BQ0o7QUFFQSxlQUFTLE9BQU8sS0FBSztBQUNqQixZQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsR0FBRztBQUFFO0FBQUEsUUFBVTtBQUNoQyxZQUFJLFNBQVMsT0FBTyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sTUFBTSxJQUFJLFFBQVE7QUFBRTtBQUFBLFFBQVU7QUFDMUUsWUFBSSxxQkFBcUIsT0FBTyxNQUFNLEdBQUcsYUFBYSxRQUFRO0FBRTFEO0FBQUEsUUFDSixXQUFXLE1BQU0sS0FBSyxVQUFVLEdBQUcsR0FBRztBQUNsQyxhQUFHLEtBQUssUUFBUSxLQUFLLEdBQUcsSUFBSSxPQUFPLFFBQVEsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQUEsUUFDN0QsT0FBTztBQUNILGFBQUcsS0FBSyxNQUFNLE9BQU8sUUFBUSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFBQSxRQUMvQztBQUFBLE1BQ0o7QUFDQSxVQUFJLE9BQU8sU0FBUyxZQUFZO0FBQzVCLGlCQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQ2xDLGNBQUksYUFBYSxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRztBQUNqQyxlQUFHLEtBQUssTUFBTSxRQUFRLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxRQUFRLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFBQSxVQUN2RTtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQ0EsYUFBTztBQUFBLElBQ1g7QUF0Q1M7QUFBQTtBQUFBOzs7QUN6ZlQ7QUFBQSwrQ0FBQUMsVUFBQUMsU0FBQTtBQUFBO0FBQUE7QUFFQSxRQUFJLFVBQVU7QUFFZCxRQUFJLGFBQWE7QUFVakIsUUFBSSxjQUFjLGdDQUFVLE1BQU0sS0FBSyxVQUFVO0FBRWhELFVBQUksT0FBTztBQUVYLFVBQUk7QUFFSixjQUFRLE9BQU8sS0FBSyxTQUFTLE1BQU0sT0FBTyxNQUFNO0FBQy9DLFlBQUksS0FBSyxRQUFRLEtBQUs7QUFDckIsZUFBSyxPQUFPLEtBQUs7QUFDakIsY0FBSSxDQUFDLFVBQVU7QUFFZCxpQkFBSztBQUFBLFlBQXFELEtBQUs7QUFDL0QsaUJBQUssT0FBTztBQUFBLFVBQ2I7QUFDQSxpQkFBTztBQUFBLFFBQ1I7QUFBQSxNQUNEO0FBQUEsSUFDRCxHQWpCa0I7QUFvQmxCLFFBQUksVUFBVSxnQ0FBVSxTQUFTLEtBQUs7QUFDckMsVUFBSSxDQUFDLFNBQVM7QUFDYixlQUFPO0FBQUEsTUFDUjtBQUNBLFVBQUksT0FBTyxZQUFZLFNBQVMsR0FBRztBQUNuQyxhQUFPLFFBQVEsS0FBSztBQUFBLElBQ3JCLEdBTmM7QUFRZCxRQUFJLFVBQVUsZ0NBQVUsU0FBUyxLQUFLLE9BQU87QUFDNUMsVUFBSSxPQUFPLFlBQVksU0FBUyxHQUFHO0FBQ25DLFVBQUksTUFBTTtBQUNULGFBQUssUUFBUTtBQUFBLE1BQ2QsT0FBTztBQUVOLGdCQUFRO0FBQUEsUUFBZ0Y7QUFBQTtBQUFBLFVBQ3ZGO0FBQUEsVUFDQSxNQUFNLFFBQVE7QUFBQSxVQUNkO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxJQUNELEdBWmM7QUFjZCxRQUFJLFVBQVUsZ0NBQVUsU0FBUyxLQUFLO0FBQ3JDLFVBQUksQ0FBQyxTQUFTO0FBQ2IsZUFBTztBQUFBLE1BQ1I7QUFDQSxhQUFPLENBQUMsQ0FBQyxZQUFZLFNBQVMsR0FBRztBQUFBLElBQ2xDLEdBTGM7QUFRZCxRQUFJLGFBQWEsZ0NBQVUsU0FBUyxLQUFLO0FBQ3hDLFVBQUksU0FBUztBQUNaLGVBQU8sWUFBWSxTQUFTLEtBQUssSUFBSTtBQUFBLE1BQ3RDO0FBQUEsSUFDRCxHQUppQjtBQU9qQixJQUFBQSxRQUFPLFVBQVUsZ0NBQVMscUJBQXFCO0FBS2tCLFVBQUk7QUFHcEUsVUFBSSxVQUFVO0FBQUEsUUFDYixRQUFRLFNBQVUsS0FBSztBQUN0QixjQUFJLENBQUMsUUFBUSxJQUFJLEdBQUcsR0FBRztBQUN0QixrQkFBTSxJQUFJLFdBQVcsbUNBQW1DLFFBQVEsR0FBRyxDQUFDO0FBQUEsVUFDckU7QUFBQSxRQUNEO0FBQUEsUUFDQSxVQUFVLFNBQVUsS0FBSztBQUN4QixjQUFJLE9BQU8sTUFBTSxHQUFHO0FBQ3BCLGNBQUksY0FBYyxXQUFXLElBQUksR0FBRztBQUNwQyxjQUFJLGVBQWUsUUFBUSxTQUFTLGFBQWE7QUFDaEQsaUJBQUs7QUFBQSxVQUNOO0FBQ0EsaUJBQU8sQ0FBQyxDQUFDO0FBQUEsUUFDVjtBQUFBLFFBQ0EsS0FBSyxTQUFVLEtBQUs7QUFDbkIsaUJBQU8sUUFBUSxJQUFJLEdBQUc7QUFBQSxRQUN2QjtBQUFBLFFBQ0EsS0FBSyxTQUFVLEtBQUs7QUFDbkIsaUJBQU8sUUFBUSxJQUFJLEdBQUc7QUFBQSxRQUN2QjtBQUFBLFFBQ0EsS0FBSyxTQUFVLEtBQUssT0FBTztBQUMxQixjQUFJLENBQUMsSUFBSTtBQUVSLGlCQUFLO0FBQUEsY0FDSixNQUFNO0FBQUEsWUFDUDtBQUFBLFVBQ0Q7QUFFQTtBQUFBO0FBQUEsWUFBK0M7QUFBQSxZQUFLO0FBQUEsWUFBSztBQUFBLFVBQUs7QUFBQSxRQUMvRDtBQUFBLE1BQ0Q7QUFFQSxhQUFPO0FBQUEsSUFDUixHQXpDaUI7QUFBQTtBQUFBOzs7QUN2RWpCO0FBQUEsNkNBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDSGpCO0FBQUEsdUNBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDSGpCO0FBQUEsc0NBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDSGpCO0FBQUEsdUNBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDSGpCO0FBQUEscUNBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDSGpCO0FBQUEsd0NBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDSGpCO0FBQUEscUNBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVO0FBQUE7QUFBQTs7O0FDSGpCO0FBQUEsMkNBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVLEtBQUs7QUFBQTtBQUFBOzs7QUNIdEI7QUFBQSw2Q0FBQUMsVUFBQUMsU0FBQTtBQUFBO0FBQUE7QUFHQSxJQUFBQSxRQUFPLFVBQVUsS0FBSztBQUFBO0FBQUE7OztBQ0h0QjtBQUFBLDJDQUFBQyxVQUFBQyxTQUFBO0FBQUE7QUFBQTtBQUdBLElBQUFBLFFBQU8sVUFBVSxLQUFLO0FBQUE7QUFBQTs7O0FDSHRCO0FBQUEsMkNBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBR0EsSUFBQUEsUUFBTyxVQUFVLEtBQUs7QUFBQTtBQUFBOzs7QUNIdEI7QUFBQSwyQ0FBQUMsVUFBQUMsU0FBQTtBQUFBO0FBQUE7QUFHQSxJQUFBQSxRQUFPLFVBQVUsS0FBSztBQUFBO0FBQUE7OztBQ0h0QjtBQUFBLDZDQUFBQyxVQUFBQyxTQUFBO0FB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QVM7QUFBQSxFQUNsQjtBQUNGLENBQUM7QUFHRCxLQUFLLFdBQVc7QUFBQSxFQUNkLE1BQU07QUFBQSxFQUNOLGFBQWE7QUFBQSxFQUNiLFlBQVk7QUFBQSxJQUNMLG1CQUFjO0FBQUEsTUFDakIsTUFBVyxtQkFBYztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNJLG1CQUFjO0FBQUEsTUFDakIsTUFBVyxtQkFBYztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNJLG1CQUFjO0FBQUEsTUFDakIsTUFBVyxtQkFBYztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNJLG1CQUFjO0FBQUEsTUFDakIsTUFBVyxtQkFBYztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQSxJQUNJLG1CQUFjO0FBQUEsTUFDakIsTUFBVyxtQkFBYztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNJLG1CQUFjO0FBQUEsTUFDakIsTUFBVyxtQkFBYztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNJLG1CQUFjO0FBQUEsTUFDakIsTUFBVyxtQkFBYztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNJLG1CQUFjO0FBQUEsTUFDakIsTUFBVyxtQkFBYztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNJLG1CQUFjO0FBQUEsTUFDakIsTUFBVyxtQkFBYztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFVBQVU7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TUFDRCxRQUFRLEVBQUUsTUFBVyxlQUFVLFFBQVEsYUFBYSxpQ0FBaUM7QUFBQSxJQUN2RjtBQUFBLElBQ0EsaUJBQWlCO0FBQUEsRUFDbkIsQ0FBQztBQUFBLEVBQ0QsU0FBUyxlQUFnQixDQUFDLFNBQVMsTUFBTSxHQUFHLFNBQVM7QUFDbkQsUUFBSSxNQUFNLGdEQUFnRCxtQkFBbUIsT0FBTyxDQUFDO0FBQ3JGLFVBQU0sV0FBVyxNQUFNLFFBQVEsUUFBUSxNQUFNO0FBQUEsTUFDM0MsUUFBUTtBQUFBLE1BQ1I7QUFBQSxJQUNGLENBQUM7QUFDRCxVQUFNLFVBQWlCLFNBQVMsS0FBSyxTQUFTLENBQUM7QUFDL0MsUUFBSSxRQUFRO0FBRVYsWUFBTSxXQUFXLFFBQVEsT0FBTyxDQUFDLE9BQVksRUFBRSxRQUFRLFFBQVEsSUFBSSxZQUFZLE1BQU0sT0FBTyxZQUFZLENBQUM7QUFDekcsYUFBTztBQUFBLFFBQ0wsT0FBTyxTQUFTO0FBQUEsUUFDaEI7QUFBQSxNQUNGO0FBQUEsSUFDRixPQUFPO0FBQ0wsWUFBTSxZQUFvQyxDQUFDO0FBQzNDLGlCQUFXLEtBQUssU0FBUztBQUN2QixjQUFNLEtBQU0sRUFBRSxRQUFRLFFBQVE7QUFDOUIsa0JBQVUsRUFBRSxLQUFLLFVBQVUsRUFBRSxLQUFLLEtBQUs7QUFBQSxNQUN6QztBQUNBLGFBQU87QUFBQSxRQUNMLE9BQU8sUUFBUTtBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJleHBvcnRzIiwgIm1vZHVsZSIsICJNZXJzZW5uZVR3aXN0ZXIiLCAiZXhwb3J0cyIsICJQYWNrQ2F0ZWdvcnkiLCAiQXV0aGVudGljYXRpb25UeXBlIiwgIlBvc3RTZXR1cFR5cGUiLCAiVG9rZW5FeGNoYW5nZUNyZWRlbnRpYWxzTG9jYXRpb24iLCAiUmVzZXJ2ZWRBdXRoZW50aWNhdGlvbk5hbWVzIiwgIkZlYXR1cmVTZXQiLCAiUXVvdGFMaW1pdFR5cGUiLCAiU3luY0ludGVydmFsIiwgIkh0dHBTdGF0dXNDb2RlIiwgImV4cG9ydHMiLCAiVHlwZSIsICJQYXJhbWV0ZXJUeXBlIiwgIkNvbm5lY3Rpb25SZXF1aXJlbWVudCIsICJOZXR3b3JrQ29ubmVjdGlvbiIsICJQZXJtaXNzaW9uU3luY01vZGUiLCAiSW52b2NhdGlvbkVycm9yVHlwZSIsICJJbnZvY2F0aW9uU291cmNlIiwgIlByZWNhbm5lZERhdGVSYW5nZSIsICJQcmVjYW5uZWREYXRlIiwgIk9wdGlvbnNUeXBlIiwgIlRhYmxlUm9sZSIsICJleHBvcnRzIiwgImV4cG9ydHMiLCAiZXhwb3J0cyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIlZhbHVlVHlwZSIsICJWYWx1ZUhpbnRUeXBlIiwgIkN1cnJlbmN5Rm9ybWF0IiwgIlNjYWxlSWNvblNldCIsICJFbWFpbERpc3BsYXlUeXBlIiwgIkxpbmtEaXNwbGF5VHlwZSIsICJJbWFnZU91dGxpbmUiLCAiSW1hZ2VDb3JuZXJTdHlsZSIsICJJbWFnZVNoYXBlU3R5bGUiLCAiRHVyYXRpb25Vbml0IiwgIkluZGV4aW5nU3RyYXRlZ3kiLCAiQ29udGVudENhdGVnb3JpemF0aW9uVHlwZSIsICJQZXJtaXNzaW9uc0JlaGF2aW9yIiwgIkxpZmVjeWNsZUJlaGF2aW9yIiwgIlByaW5jaXBhbFR5cGUiLCAiUGVybWlzc2lvblR5cGUiLCAiQXR0cmlidXRpb25Ob2RlVHlwZSIsICJtYWtlT2JqZWN0U2NoZW1hIiwgImF1dGhvcml0eU5vcm1Qcm9wZXJ0eSIsICJwb3B1bGFyaXR5Tm9ybVByb3BlcnR5IiwgImZpbHRlcmFibGVQcm9wZXJ0aWVzIiwgInJlc3QiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiY2xvbmUiLCAicGFyZW50IiwgImRlcHRoIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImlzTmFOIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImNvbmNhdHR5IiwgInNsaWN5IiwgIkVtcHR5IiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgInVuZGVmaW5lZCIsICJkb0V2YWwiLCAic3RyaW5nVG9QYXRoIiwgImdldEJhc2VJbnRyaW5zaWMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiY29tcGFjdFF1ZXVlIiwgImFycmF5VG9PYmplY3QiLCAibWVyZ2UiLCAiZW5jb2RlIiwgImNvbXBhY3QiLCAiaXNSZWdFeHAiLCAiaXNCdWZmZXIiLCAiY29tYmluZSIsICJtYXliZU1hcCIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJpc05vbk51bGxpc2hQcmltaXRpdmUiLCAic3RyaW5naWZ5IiwgInZhbHVlIiwgIm5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAibm9ybWFsaXplUGFyc2VPcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJleHBvcnRzIiwgImV4cG9ydHMiLCAiVXNlclZpc2libGVFcnJvciIsICJtYWtlUGFyYW1ldGVyIiwgIlVwZGF0ZU91dGNvbWUiLCAiZXhwb3J0cyIsICJuZXdQYWNrIiwgInJlcXVpcmVfc2NoZW1hIiwgImV4cG9ydHMiLCAiZXhwb3J0cyIsICJTdmdDb25zdGFudHMiLCAiZXhwb3J0cyIsICJlbWFpbCJdCn0K
