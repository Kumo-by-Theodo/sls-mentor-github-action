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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const https_1 = __importDefault(require("https"));
const request = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const req = https_1.default
            .request(url, options, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                var _a;
                if ((_a = res.statusCode) !== null && _a !== void 0 ? _a : 0 >= 400) {
                    const err = new Error(`Received status code ${res.statusCode}`);
                    reject(err);
                }
                else {
                    resolve({ res, data: JSON.parse(data) });
                }
            });
        })
            .on('error', reject);
        if (options.body) {
            req.end(JSON.stringify(options.body));
        }
        else {
            req.end();
        }
    });
});
exports.request = request;
