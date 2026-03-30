import mongoose, {Schema, Document} from 'mongoose';
import { kMaxLength } from 'node:buffer';

export interface IFeedback extends Document{
    title: string;
    description:string;
    category:'Bug' |'Feature request'| 'Improvement'|'Other';
    status:'Open'| 'In Review'|'Resolved';
    submitterName?: string;
    submitterEmail?:string;
    ai_category?:string;
    ai_sentiment?: 'Positive' | 'Neutral' | 'Negative';
    ai_priority?:number;
    ai_summary?:string;
    ai_tags?: string[];
    ai_processed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const FeedbackSchema: Schema =new Schema({
    title:{type:String, required: true, maxlength: 120},
    description: {type:String, required: true, maxlength: 20},
    category:{
        type: String,
        enum: ['Bug', 'Feature request', 'Improvement', 'Other'],
        required: true
    },
    status:{
        type: String,
        enum:['New', 'In Review', 'Resolved'],
        default:'New'
    },
    sumbitterName:{type:String, requred: false},
    submitterEmail:{type:String, required:false}, //need to add email validation

    //AI fileds
    //after gemini responds
    ai_category:{type:String},
    ai_sentiment:{type:String, enum:['Positive', 'Neutral','Negative']},
    ai_priority:{type:Number, min: 1, max:10},
    ai_summary:{type:String},
    ai_tags:{type:[String]},
    ai_processed:{type:Boolean, default:false}
},{
    timestamps:true //automatically handels createAt, updateAt
});

//add mongodb indexes 
//query performance
FeedbackSchema.index({status: 1});
FeedbackSchema.index({category:1});
FeedbackSchema.index({ai_priority:-1}); //sorting priority
FeedbackSchema.index({createdAt:-1});

export default mongoose.model<IFeedback>('Feedback',FeedbackSchema);
