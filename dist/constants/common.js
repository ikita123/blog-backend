"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTaskEndTimeAndDate = exports.routePermissionCheck = exports.taskCommentType = exports.generalServerResponse = exports.defaultErrorObject = exports.httpErrorType = exports.searchReg = exports.defaultListingParameter = exports.schemaOptions = exports.databaseModelNames = void 0;
exports.databaseModelNames = {
    product: 'product'
};
exports.schemaOptions = {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updateAt: 'modifiedAt',
    }
};
exports.defaultListingParameter = {
    query: {},
    andQuery: { $and: [] },
    orQuery: { $or: [] },
    projection: '',
    skip: 0,
    sort: '-_id',
    sortObj: {
        _id: -1
    },
    limit: 10,
    population: '',
    populationArray: [],
    page: 1
};
exports.searchReg = {
    FIRST: /[-\/\\^$*+?.()|[\]{}]/g,
    SECOND: '\\$&',
    THIRD: 'ig'
};
exports.httpErrorType = {
    internalServerError: {
        code: 500,
        message: 'Something went wrong, please try again later',
        errorType: 'InternalServerError'
    },
    badRequest: {
        code: 400,
        message: 'Something is missing in request, please check your request.',
        errorType: 'BadRequest'
    },
    unauthorized: {
        code: 401,
        message: 'You are not authenticated, please login again.',
        errorType: 'Unauthorized'
    },
    forbidden: {
        code: 403,
        message: 'You are not authorized to access this route.',
        errorType: 'Unauthorized'
    }
};
exports.defaultErrorObject = {
    code: 400,
    message: '',
    errorType: ''
};
exports.generalServerResponse = {
    code: 200,
    status: 'Success',
    message: '',
    data: {}
};
exports.taskCommentType = {
    text: 'TEXT',
    image: 'IMAGE',
};
exports.routePermissionCheck = {
    routeName: {
        task: 'tasks'
    },
    permission: {
        read: 'read'
    }
};
exports.defaultTaskEndTimeAndDate = {
    endUTCHours: 23,
    endUTCMinutes: 59,
    endUTCSeconds: 59
};
exports.default = {
    databaseModelNames: exports.databaseModelNames,
    schemaOptions: exports.schemaOptions,
    defaultListingParameter: exports.defaultListingParameter,
    searchReg: exports.searchReg,
    httpErrorType: exports.httpErrorType,
    defaultErrorObject: exports.defaultErrorObject,
    generalServerResponse: exports.generalServerResponse,
    taskCommentType: exports.taskCommentType,
    routePermissionCheck: exports.routePermissionCheck,
    defaultTaskEndTimeAndDate: exports.defaultTaskEndTimeAndDate
};
