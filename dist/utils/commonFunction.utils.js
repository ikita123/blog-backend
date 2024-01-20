"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = exports.newObjectIDGenerator = exports.generalServerSuccessResponse = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const { generalServerResponse } = constants_1.CommonParameter;
const generalServerSuccessResponse = (sendResponse = generalServerResponse, req, res) => {
    return res.json({
        status: sendResponse.status || generalServerResponse.status,
        message: sendResponse.message || generalServerResponse.message,
        data: sendResponse.data || generalServerResponse.data
    });
};
exports.generalServerSuccessResponse = generalServerSuccessResponse;
const newObjectIDGenerator = () => {
    return new mongoose_1.default.Types.ObjectId();
};
exports.newObjectIDGenerator = newObjectIDGenerator;
const catchAsync = (fun) => {
    return (req, res, next) => {
        fun(req, res, next).catch(next);
    };
};
exports.catchAsync = catchAsync;
exports.default = {
    generalServerSuccessResponse: exports.generalServerSuccessResponse,
    newObjectIDGenerator: exports.newObjectIDGenerator,
    catchAsync: exports.catchAsync
};
