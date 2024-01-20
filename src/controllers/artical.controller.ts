import { Request, Response, NextFunction } from 'express';
import { ArticalService } from '../service';
import { Messages } from '../constants';
import { CommonParameter } from '../constants'
import { CommonFunction } from '../utils';

const {
    searchReg,
    httpErrorType,
} = CommonParameter

const {
    catchAsync,
    generalServerSuccessResponse
} = CommonFunction


export const createNewOne = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const preProcessingData = req.body

    const announcement = await ArticalService.createNewOne(preProcessingData)
    return generalServerSuccessResponse({
        message: Messages.artical.success.created,
        data:announcement
    }, req, res)
})

export const webAppList = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const userSiteDepartment = res.locals.usd
    const { search, page, limit, sort } = req.query;

    const dbQuery: any = {
        $and: [
            {
                $eq: ['$isDeleted', false]
            },
        ]
    }

    const dbSubQuery: any = { $or: [] };
    req.query.skip = (page - 1) * limit;


    if (sort && sort.length > 0) {
        const sortSplit: string[] = sort.split('-');
        req.query.sort = {};
        req.query.sort[sortSplit[1] || sortSplit[0]] = sortSplit.length > 1 ? -1 : 1;
        req.query.sort._id = -1
    }

    if (search && search.length > 0) {
        const searchRegex = new RegExp(search.replace(searchReg.FIRST, searchReg.SECOND), searchReg.THIRD);
        dbSubQuery.$or.push({ $regexMatch: { input: '$userID.firstName', regex: searchRegex } });
    }

    const result = await ArticalService.webAppListing({
        ...req.query,
        query: dbQuery,
        searchQuery: dbSubQuery
    })

    return generalServerSuccessResponse({
        data: result
    }, req, res)

})

export const findOne = catchAsync (async (req: Request, res: Response, next: NextFunction) => {
	const prdocutID = req.params.id

	const result = await ArticalService.findOne({ 
		query: {
			isDeleted: false,
			_id: prdocutID
		},
		projection: 'name description' 
	})

	return generalServerSuccessResponse({
		data: result
	}, req, res)
})

export default {
    createNewOne,
    webAppList,
    findOne
}
