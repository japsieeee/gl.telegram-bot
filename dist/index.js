"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var promises_1 = require("fs/promises");
var path_1 = require("path");
var TelegramBot = /** @class */ (function () {
    function TelegramBot(botToken) {
        this.BOT_TOKEN = '';
        this.SCRIPT_DIR = 'scripts';
        this.BOT_TOKEN = botToken;
    }
    /**
     * Sends a message to a group or channel
     * You can pass an array of group ids or a single group id
     *
     * @param {string} message
     * @param {string} channelID
     */
    TelegramBot.prototype.sendMessage = function (message, channelID) {
        var e_1, _a;
        var FILE_NAME = 'telegram-send-message.sh';
        var SCRIPT_PATH = path_1.default.join(this.SCRIPT_DIR, FILE_NAME);
        if (typeof channelID === 'string') {
            (0, child_process_1.exec)("bash ".concat(SCRIPT_PATH, " \"").concat(this.BOT_TOKEN, "\" \"").concat(message, "\" \"").concat(channelID, "\""));
        }
        if (typeof channelID === 'object') {
            try {
                for (var channelID_1 = __values(channelID), channelID_1_1 = channelID_1.next(); !channelID_1_1.done; channelID_1_1 = channelID_1.next()) {
                    var id = channelID_1_1.value;
                    (0, child_process_1.exec)("bash ".concat(SCRIPT_PATH, " \"").concat(this.BOT_TOKEN, "\" \"").concat(message, "\" \"").concat(id, "\""));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (channelID_1_1 && !channelID_1_1.done && (_a = channelID_1.return)) _a.call(channelID_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    /**
     * Returns recent updates from telegram bot
     *
     * @returns Promise<object>
     */
    TelegramBot.prototype.getUpdates = function () {
        var _this = this;
        return new Promise(function (res) {
            (0, child_process_1.exec)("bash ".concat(_this.SCRIPT_DIR, "telegram-get-updates.sh \"").concat(_this.BOT_TOKEN, "\""), function (err, stdout) { return __awaiter(_this, void 0, void 0, function () {
                var result, jsonResult;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!err) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, promises_1.readFile)("get_updates_".concat(this.BOT_TOKEN, ".json"))];
                        case 1:
                            result = _a.sent();
                            jsonResult = JSON.parse(result.toString());
                            res(jsonResult);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    /**
     * Returns group IDs from telegram bot
     *
     * @returns Promise<number[]>
     */
    TelegramBot.prototype.getGroupIDs = function () {
        var _this = this;
        return new Promise(function (res) {
            (0, child_process_1.exec)("bash ".concat(_this.SCRIPT_DIR, "telegram-get-updates.sh \"").concat(_this.BOT_TOKEN, "\""), function (err, stdout) { return __awaiter(_this, void 0, void 0, function () {
                var result, jsonResult, idSet_1, arrayOfID;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!err) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, promises_1.readFile)("get_updates_".concat(this.BOT_TOKEN, ".json"))];
                        case 1:
                            result = _a.sent();
                            jsonResult = JSON.parse(result.toString());
                            idSet_1 = new Set([]);
                            jsonResult.result.forEach(function (v) {
                                var _a;
                                var chatID = (_a = v.message) === null || _a === void 0 ? void 0 : _a.chat.id;
                                if (chatID && !idSet_1.has(chatID))
                                    idSet_1.add(chatID);
                            });
                            arrayOfID = __spreadArray([], __read(idSet_1), false);
                            res(arrayOfID);
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    return TelegramBot;
}());
exports.default = TelegramBot;
//# sourceMappingURL=index.js.map