"use client"
import {useState} from 'react'
import {createBooking} from "@/lib/actions/booking.actions"
import posthog from "posthog-js"
const BookEvents = ({eventId,slug}:{eventId:string,slug:string}) => {
    const[email,setEmail] = useState('');
    const[submitted,setSubmitted] = useState(false);

    const handleSubmit=async (e:React.FormEvent)=>{
        const {success}=await createBooking({eventId,slug,email});
        if(success){
            setSubmitted(true);
            posthog.capture("event_booked",{eventId,slug,email});
        }else{
            console.error("Booking creation failed");
            posthog.captureException('Booking creation failed');
        }

    }
  return (
    <div id="book-event">
        {submitted?(
            <p>Thank you for signing up! We look forward to seeing you at the event.</p>
        ):(
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email Adress</label>
                    <input type="email"
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='Enter your email address'
                    />
                </div>

                <button type="submit"  className="button-submit">Submit</button>
            </form>
            )}
    </div>
  )
}

export default BookEvents