// this is server-action file we implemented
'use server'
import Event from '@/database/event.model';
import connectToDatabase from '@/lib/mongodb';


// in this function we find similar event by id or tags and show on frontend under the details page event
export const getSimilarEventsBySlug=async(slug:string)=>{
    try{
        connectToDatabase();
        const event=await Event.findOne({slug});
        return await Event.find({_id:{ $ne: event?._id}, tags: {$in:event ?.tags }}).lean(); 
    }catch{
        return[];
    }
}