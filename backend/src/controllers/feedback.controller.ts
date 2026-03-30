import {Request, Response} from  'express';
import Feedback from '../models/feedback.model';

export const createFeedback = async(req: Request, res: Response): Promise<void> =>{
    try{
        //validate incoming data
        const{title, description, category} =req.body;
        if(!title || !description || !category){
            res.status(400).json({success:false, error: 'Missing required fields'});
            return;
        }
        //save to db
        const newFeedback = new Feedback(req.body);
        const savedFeedback = await newFeedback.save();

        //return success response
        res.status(201).json({
            success:true,
            data: savedFeedback,
            message:'Feedback submitted successfully'
        });
        // TODO: trigger AI service
    } catch(error: any){
        res.status(500).json({success:false, error:error.message|| 'Server Error'});
    }
    
};