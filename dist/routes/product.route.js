"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const constants_1 = require("../constants");
const { productRoute } = constants_1.RoutePath;
const router = (0, express_1.Router)();
router.get(productRoute.webAppList, controllers_1.ProductController.webAppList);
router.get(productRoute.findOne, controllers_1.ProductController.findOne);
router.post(productRoute.createNewOne, controllers_1.ProductController.createNewOne);
exports.default = {
    mainRouter: router,
    path: productRoute.root,
};
