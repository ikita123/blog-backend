"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
exports.dbConnection = {
    url: "mongodb+srv://nikitasharma:nikita-sharma@cluster1.poqels0.mongodb.net/blog?retryWrites=true&w=majority",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
};
