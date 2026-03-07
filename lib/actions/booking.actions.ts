'use server'
import Booking from "@/database/booking.model"
export const createBooking=async ({eventId,slug,email}:{eventId:string,slug:string,email:string})=>{
    try {
        await Booking.create({eventId,slug,email});
        return {success:true}; 
        
    } catch (e) {
        return {success:false};      
    }

}
