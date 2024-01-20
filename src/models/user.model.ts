import {model, Schema} from 'mongoose'
import { CommonParameter } from '../constants'

const {
    schemaOptions,databaseModelNames
} = CommonParameter

const userSchema :Schema = new Schema({
      firstName :{
        type :String,
        require :true,
        trim: true,
        index:'text'
      },
      lastName :{
        type :String,
        require :true,
        trim: true,
      },
      profilePic:{
        type :Object,
        default:null,
      },
      email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		index: 'text'
    },
    isDeleted:{
        type:Boolean,
        default:false      
    },
    password: {
		type: String,
		default: null,
		trim: true,
		select: false,
		required:true
		
    },
    isEmailVerified: {
		type: Boolean,
		default: false,
    },
},
schemaOptions ) 

const userModel = model(databaseModelNames.user, userSchema)
export default userModel