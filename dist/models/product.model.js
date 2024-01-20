"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const { schemaOptions, databaseModelNames } = constants_1.CommonParameter;
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        index: 'text'
    },
    image: {
        type: Object,
        default: null,
    },
    description: {
        type: String,
        index: 'text'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, schemaOptions);
const productModel = (0, mongoose_1.model)(databaseModelNames.product, productSchema);
exports.default = productModel;
