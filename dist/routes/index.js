"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = __importDefault(require("./product.route"));
const constants_1 = require("../constants");
const { apiV1 } = constants_1.RoutePath;
const routesList = [
    product_route_1.default,
];
const router = (0, express_1.Router)();
routesList.forEach((route) => router.use(`${apiV1}${route.path}`, route.mainRouter));
exports.default = router;
