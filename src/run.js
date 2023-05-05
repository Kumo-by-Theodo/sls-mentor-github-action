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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.__esModule = true;
exports.slsMentor = void 0;
/* eslint-disable no-console */
var exec_1 = require("@actions/exec");
var request_1 = require("./request");
var _a = process.env, GITHUB_EVENT_PATH = _a.GITHUB_EVENT_PATH, GITHUB_SHA = _a.GITHUB_SHA, GITHUB_TOKEN = _a.GITHUB_TOKEN;
var event = require(GITHUB_EVENT_PATH !== null && GITHUB_EVENT_PATH !== void 0 ? GITHUB_EVENT_PATH : '');
var sha = event.after;
if (!sha) {
    sha = GITHUB_SHA;
}
console.log('event', event);
var repository = event.repository;
var owner = repository.owner, name = repository.name;
var checkName = 'Sls-mentor check';
var headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
    Authorization: "Bearer ".concat(GITHUB_TOKEN),
    'User-Agent': 'sls-mentor-action'
};
function createCheck() {
    return __awaiter(this, void 0, void 0, function () {
        var body, data, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        name: checkName,
                        head_sha: sha,
                        status: 'in_progress',
                        started_at: new Date()
                    };
                    return [4 /*yield*/, (0, request_1.request)("https://api.github.com/repos/".concat(owner, "/").concat(name, "/check-runs"), {
                            method: 'POST',
                            headers: headers,
                            body: body
                        })];
                case 1:
                    data = (_a.sent()).data;
                    id = data.id;
                    return [2 /*return*/, id];
            }
        });
    });
}
function slsMentor() {
    return __awaiter(this, void 0, void 0, function () {
        var exitCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exec_1.exec)('npm run sls-mentor')];
                case 1:
                    exitCode = _a.sent();
                    console.log('exit code of action run', exitCode);
                    return [2 /*return*/];
            }
        });
    });
}
exports.slsMentor = slsMentor;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            id = createCheck();
            try {
                slsMentor();
            }
            catch (err) {
                console.log(err);
                process.exit(1);
            }
            return [2 /*return*/];
        });
    });
}
run();
