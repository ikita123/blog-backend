import {model, Schema} from 'mongoose'
import { CommonParameter } from '../constants'

const {
    schemaOptions,databaseModelNames
} = CommonParameter

const articleSchema :Schema = new Schema({
      name :{
        type :String,
        require :true,
        trim: true,
        index:'text'
      },
      image:{
        type :Object,
        default:null,
      },
      description:{
        type :String,
        index:'text'
      },
      isDeleted:{
        type:Boolean,
        default:false      
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: databaseModelNames.user,
        default: null
        },
        updatedBy: {
        type: Schema.Types.ObjectId,
        ref: databaseModelNames.user,
        default: null
        },

},
schemaOptions ) 

const articleModel = model(databaseModelNames.artical, articleSchema)
export default articleModel