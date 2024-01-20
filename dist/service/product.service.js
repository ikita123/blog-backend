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
exports.webAppListing = exports.itemCount = exports.findOne = exports.deleteOne = exports.updateOne = exports.findList = exports.createNewOne = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const constants_1 = require("../constants");
const { defaultListingParameter } = constants_1.CommonParameter;
const createNewOne = (inputData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.create(inputData);
});
exports.createNewOne = createNewOne;
const findList = ({ query = defaultListingParameter.query, projection = defaultListingParameter.projection, sort = defaultListingParameter.sort, skip = defaultListingParameter.skip, limit = defaultListingParameter.limit, population = [] }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.find(query, projection).sort(sort)
        .skip(skip).limit(limit).populate(population).lean();
});
exports.findList = findList;
const updateOne = ({ query = defaultListingParameter.query, dataToUpdate = {}, options = { new: true } }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findOneAndUpdate(query, { $set: dataToUpdate }, options);
});
exports.updateOne = updateOne;
const deleteOne = ({ query = defaultListingParameter.query }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.deleteOne(query);
});
exports.deleteOne = deleteOne;
const findOne = ({ query = defaultListingParameter.query, projection = defaultListingParameter.projection, population = [] }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findOne(query, projection).populate(population).lean();
});
exports.findOne = findOne;
const itemCount = ({ query = defaultListingParameter.query }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.find(query).countDocuments();
});
exports.itemCount = itemCount;
const webAppListing = ({ query = defaultListingParameter.query, skip = defaultListingParameter.skip, limit = defaultListingParameter.limit, sort = defaultListingParameter.sortObj, searchQuery = defaultListingParameter.orQuery }) => __awaiter(void 0, void 0, void 0, function* () {
    const listFindPipeline = [
        {
            $match: {
                $expr: query
            }
        },
        {
            $match: (searchQuery.$or.length > 0 ? {
                $expr: searchQuery
            } : {})
        },
        {
            $facet: {
                records: [
                    {
                        $count: "totalResult"
                    },
                    {
                        $set: {
                            totalResult: {
                                $ifNull: ["$totalResult", 0]
                            }
                        }
                    }
                ],
                list: [
                    {
                        $sort: sort
                    },
                    {
                        $skip: Number(skip)
                    },
                    {
                        $limit: Number(limit)
                    }
                ]
            }
        },
        {
            $set: {
                records: {
                    $cond: [
                        { $ne: [{ $size: "$records" }, 0] },
                        { $arrayElemAt: ["$records.totalResult", 0] },
                        0
                    ]
                }
            }
        }
    ];
    const productList = yield product_model_1.default.aggregate(listFindPipeline);
    return productList[0];
});
exports.webAppListing = webAppListing;
exports.default = {
    createNewOne: exports.createNewOne,
    findList: exports.findList,
    updateOne: exports.updateOne,
    deleteOne: exports.deleteOne,
    findOne: exports.findOne,
    itemCount: exports.itemCount,
    webAppListing: exports.webAppListing
};
