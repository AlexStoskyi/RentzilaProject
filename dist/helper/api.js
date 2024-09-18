"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiHelper = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class ApiHelper {
    request;
    token = null;
    constructor(request) {
        this.request = request;
    }
    bUrl = process.env.BASE_URL;
    adminPassword = process.env.ADMIN_PASSWORD;
    async createAdminToken() {
        const response = await this.request.post(this.bUrl + '/api/auth/jwt/create/', {
            data: {
                email: 'txt2021@ukr.net',
                password: 'Qwerty123+',
            },
        });
        const data = await this.handleResponse(response);
        this.token = data.access;
        return data;
    }
    async getFeedbackList() {
        if (!this.token) {
            throw new Error('Token is not available. Please call postRequest first.');
        }
        const response = await this.request.get('https://dev.rentzila.com.ua/api/backcall/', {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        return await this.handleResponse(response);
    }
    async handleResponse(response) {
        if (response.ok()) {
            return await response.json();
        }
        else {
            throw new Error(`Request failed with status ${response.status()}: ${response.statusText()}`);
        }
    }
}
exports.ApiHelper = ApiHelper;
