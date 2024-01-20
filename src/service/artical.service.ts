import ArticalModel from "../models/artical.model";
import { CommonParameter } from '../constants'

const {
    defaultListingParameter
} = CommonParameter


export const createNewOne =async (inputData:any) => {
    return await ArticalModel.create(inputData)
}

export const findList = async ({
  query = defaultListingParameter.query,
  projection = defaultListingParameter.projection,
  sort = defaultListingParameter.sort,
  skip = defaultListingParameter.skip,
  limit = defaultListingParameter.limit,
  population = []
}) => {
  return await ArticalModel.find(query, projection).sort(sort)
      .skip(skip).limit(limit).populate(population).lean()
}

export const updateOne = async ({ query = defaultListingParameter.query, dataToUpdate = {}, options = { new: true } }) => {
  return await ArticalModel.findOneAndUpdate(query, { $set: dataToUpdate }, options)
}

export const deleteOne = async ({ query = defaultListingParameter.query }) => {
  return await ArticalModel.deleteOne(query)
}


export const findOne = async ({ query = defaultListingParameter.query,
  projection = defaultListingParameter.projection ,  population = []}) => {
  return await ArticalModel.findOne(query, projection).populate(population).lean()
}

export const itemCount = async ({ query = defaultListingParameter.query }) => {
  return await ArticalModel.find(query).countDocuments()
}

export const webAppListing = async ({
  query = defaultListingParameter.query,
  skip = defaultListingParameter.skip,
  limit = defaultListingParameter.limit,
  sort = defaultListingParameter.sortObj,
  searchQuery = defaultListingParameter.orQuery
}) => {
  const listFindPipeline: any[] = [
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
                      { $ne: [ { $size: "$records" }, 0 ] },
                      { $arrayElemAt: [ "$records.totalResult", 0 ] },
                      0
                  ]
              }
          }
      }
  ]

  const productList: any[] = await ArticalModel.aggregate(listFindPipeline)

  return productList[0]
}


export default {
  createNewOne,
  findList,
  updateOne,
  deleteOne,
  findOne,
  itemCount,
  webAppListing
};