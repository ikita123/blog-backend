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
exports.findOne = exports.webAppList = exports.createNewOne = void 0;
const service_1 = require("../service");
const constants_1 = require("../constants");
const constants_2 = require("../constants");
const utils_1 = require("../utils");
const { searchReg, httpErrorType, } = constants_2.CommonParameter;
const { catchAsync, generalServerSuccessResponse } = utils_1.CommonFunction;
exports.createNewOne = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const preProcessingData = req.body;
    const announcement = yield service_1.ProductService.createNewOne(preProcessingData);
    return generalServerSuccessResponse({
        message: constants_1.Messages.product.success.created,
        data: announcement
    }, req, res);
}));
exports.webAppList = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userSiteDepartment = res.locals.usd;
    const { search, page, limit, sort } = req.query;
    const dbQuery = {
        $and: [
            {
                $eq: ['$isDeleted', false]
            },
        ]
    };
    const dbSubQuery = { $or: [] };
    req.query.skip = (page - 1) * limit;
    if (sort && sort.length > 0) {
        const sortSplit = sort.split('-');
        req.query.sort = {};
        req.query.sort[sortSplit[1] || sortSplit[0]] = sortSplit.length > 1 ? -1 : 1;
        req.query.sort._id = -1;
    }
    if (search && search.length > 0) {
        const searchRegex = new RegExp(search.replace(searchReg.FIRST, searchReg.SECOND), searchReg.THIRD);
        dbSubQuery.$or.push({ $regexMatch: { input: '$userID.firstName', regex: searchRegex } });
    }
    const result = yield service_1.ProductService.webAppListing(Object.assign(Object.assign({}, req.query), { query: dbQuery, searchQuery: dbSubQuery }));
    return generalServerSuccessResponse({
        data: result
    }, req, res);
}));
exports.findOne = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const prdocutID = req.params.id;
    const result = yield service_1.ProductService.findOne({
        query: {
            isDeleted: false,
            _id: prdocutID
        },
        projection: 'name description'
    });
    return generalServerSuccessResponse({
        data: result
    }, req, res);
}));
exports.default = {
    createNewOne: exports.createNewOne,
    webAppList: exports.webAppList,
    findOne: exports.findOne
};
