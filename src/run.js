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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const exec_1 = require("@actions/exec");
const request_1 = require("./request");
const { GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN } = process.env;
const event = require(GITHUB_EVENT_PATH !== null && GITHUB_EVENT_PATH !== void 0 ? GITHUB_EVENT_PATH : '');
let { after: sha } = event;
if (!sha) {
    sha = GITHUB_SHA;
}
const { repository } = event;
const { owner: { login: owner } } = repository;
const { name: repo } = repository;
const checkName = 'Sls-mentor check';
const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.antiope-preview+json',
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': 'sls-mentor-action'
};
function createCheck() {
    return __awaiter(this, void 0, void 0, function* () {
        const body = {
            name: checkName,
            head_sha: sha,
            status: 'in_progress',
            started_at: new Date()
        };
        const { data } = yield (0, request_1.request)(`https://api.github.com/repos/${owner}/${repo}/check-runs`, {
            method: 'POST',
            headers,
            body
        });
        const { id } = data;
        return id;
    });
}
function slsMentor() {
    return __awaiter(this, void 0, void 0, function* () {
        const exitCode = yield (0, exec_1.exec)('npm run sls-mentor');
        console.log('exit code of action run', exitCode);
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = createCheck();
        try {
            const result = slsMentor();
            console.log(result);
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
    });
}
run();
